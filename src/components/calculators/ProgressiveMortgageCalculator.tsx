
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "recharts";
import { fetchMortgageRates, fetchPropertyTaxRate, fetchHomeInsuranceEstimate } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";
import { Info, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/App";

const ProgressiveMortgageCalculator: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  
  // Initial basic inputs
  const [income, setIncome] = useState(0);
  const [location, setLocation] = useState({
    state: "",
    zipCode: ""
  });
  const [monthlyDebts, setMonthlyDebts] = useState(0);
  const [isInitialDataComplete, setIsInitialDataComplete] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  // Advanced inputs
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(5.5);
  const [propertyTax, setPropertyTax] = useState(1.2);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [loanType, setLoanType] = useState("conventional");
  
  // Calculated values
  const [affordability, setAffordability] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [tax, setTax] = useState(0);
  const [insurance, setInsurance] = useState(0);
  
  // Calculate initial affordability based on income and debts
  useEffect(() => {
    if (income > 0) {
      const monthlyIncome = income / 12;
      // 36% debt-to-income ratio (including mortgage)
      const maxMonthlyPayment = monthlyIncome * 0.36 - monthlyDebts;
      // Estimate home price based on typical payment ratios
      // This is simplified - in reality, we would need to consider interest rates, loan term, etc.
      const estimatedHomePrice = maxMonthlyPayment * 200; // Very rough estimate
      
      setAffordability(Math.round(estimatedHomePrice));
      
      // Set homePrice to the calculated affordability if it's not set yet
      if (!showAdvancedOptions) {
        setHomePrice(Math.round(estimatedHomePrice));
        setDownPayment(Math.round(estimatedHomePrice * 0.2));
      }
    }
  }, [income, monthlyDebts, showAdvancedOptions]);
  
  // Update downPayment when percentage changes
  useEffect(() => {
    setDownPayment(Math.round(homePrice * (downPaymentPercent / 100)));
  }, [homePrice, downPaymentPercent]);
  
  // Update downPaymentPercent when downPayment changes directly
  useEffect(() => {
    setDownPaymentPercent(Math.round((downPayment / homePrice) * 100));
  }, [downPayment, homePrice]);
  
  // Calculate mortgage payments
  useEffect(() => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Monthly principal and interest payment
    const monthlyPrincipalInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Monthly property tax
    const monthlyTax = (homePrice * (propertyTax / 100)) / 12;
    
    // Monthly home insurance
    const monthlyInsurance = homeInsurance / 12;
    
    // Total monthly payment
    const total = monthlyPrincipalInterest + monthlyTax + monthlyInsurance;
    
    setPrincipal(Math.round(monthlyPrincipalInterest - (loanAmount * monthlyRate)));
    setInterest(Math.round(loanAmount * monthlyRate));
    setTax(Math.round(monthlyTax));
    setInsurance(Math.round(monthlyInsurance));
    setMonthlyPayment(Math.round(total));
  }, [homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance]);
  
  // Check if initial data is complete
  useEffect(() => {
    if (income > 0 && location.state.trim() !== "") {
      setIsInitialDataComplete(true);
    } else {
      setIsInitialDataComplete(false);
    }
  }, [income, location.state]);
  
  // Function to fetch current mortgage rates
  const getRates = async () => {
    setIsLoadingRates(true);
    const ratesData = await fetchMortgageRates();
    setIsLoadingRates(false);
    
    if (ratesData) {
      // Find the relevant rate based on loan type
      const fhaRate = ratesData.mortgage_rates.rates.find(r => r.loan_type === "30-Year FHA");
      const conventionalRate = ratesData.mortgage_rates.rates.find(r => r.loan_type === "30-Year Conventional");
      
      if (loanType === "fha" && fhaRate) {
        setInterestRate(parseFloat(fhaRate.rate.replace('%', '')));
        toast({
          title: "FHA Rate Updated",
          description: `Current rate: ${fhaRate.rate} as of ${ratesData.mortgage_rates.date}`
        });
      } else if (loanType === "conventional" && conventionalRate) {
        setInterestRate(parseFloat(conventionalRate.rate.replace('%', '')));
        toast({
          title: "Conventional Rate Updated",
          description: `Current rate: ${conventionalRate.rate} as of ${ratesData.mortgage_rates.date}`
        });
      }
    }
  };
  
  // Fetch location-based property tax and insurance data
  const fetchLocationData = async () => {
    if (!location.state) {
      toast({
        title: "Location Required",
        description: "Please enter a state to get local tax and insurance rates.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Fetching Data",
      description: "Getting local property tax and insurance rates..."
    });
    
    // Get property tax rate
    const taxInfo = await fetchPropertyTaxRate(location.state, location.zipCode);
    if (taxInfo && taxInfo.average_rate) {
      // Convert percentage string to number (removing % sign)
      const taxRate = parseFloat(taxInfo.average_rate.replace('%', ''));
      if (!isNaN(taxRate)) {
        setPropertyTax(taxRate);
        toast({
          title: "Property Tax Updated",
          description: `Average rate for ${location.state}: ${taxInfo.average_rate}`
        });
      }
    }
    
    // Get insurance estimate if zipcode is provided
    if (location.zipCode && location.state) {
      const insuranceEstimate = await fetchHomeInsuranceEstimate(
        location.state,
        location.zipCode,
        homePrice
      );
      
      if (insuranceEstimate) {
        setHomeInsurance(insuranceEstimate);
        toast({
          title: "Insurance Estimate Updated",
          description: `Estimated annual cost: $${insuranceEstimate.toLocaleString()}`
        });
      }
    }
  };
  
  // Prepare data for pie chart
  const data = [
    { name: "Principal", value: principal, color: "#33C3F0" },
    { name: "Interest", value: interest, color: "#8B5CF6" },
    { name: "Property Tax", value: tax, color: "#F97316" },
    { name: "Insurance", value: insurance, color: "#10B981" }
  ];
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };
  
  return (
    <Card className="border-muted/30 bg-appNavy">
      <CardHeader>
        <CardTitle className="text-xl">Mortgage Calculator</CardTitle>
        <CardDescription>
          Tell us a little about yourself, and we'll help you understand what you can afford
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Basic information section */}
          <div className="p-4 bg-appCharcoal/40 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold mb-2">Let's Start With The Basics</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="income">Annual Income</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Your annual income is one of the most important factors in determining how much house you can afford.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                  <Input
                    id="income"
                    type="number"
                    placeholder="Enter your annual income"
                    value={income || ""}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="location">Location</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Your location affects property taxes, insurance rates, and housing prices.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="state"
                    placeholder="State (e.g. California)"
                    value={location.state}
                    onChange={(e) => setLocation({...location, state: e.target.value})}
                  />
                  <Input
                    id="zipCode"
                    placeholder="ZIP Code (optional)"
                    value={location.zipCode}
                    onChange={(e) => setLocation({...location, zipCode: e.target.value})}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-1 text-xs flex items-center gap-1"
                  onClick={fetchLocationData}
                >
                  <Search className="h-3 w-3" /> Get Local Rates
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="monthlyDebts">Monthly Debt Payments</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Include car loans, student loans, credit cards, and other regular debt payments.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                  <Input
                    id="monthlyDebts"
                    type="number"
                    placeholder="Enter your monthly debts"
                    value={monthlyDebts || ""}
                    onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Initial affordability estimate */}
          {isInitialDataComplete && affordability > 0 && (
            <div className="p-6 bg-appPurple/20 rounded-lg text-center animate-fade-in">
              <h3 className="text-lg font-medium mb-1">Based on your information</h3>
              <p className="text-3xl font-bold text-primary mb-2">{formatCurrency(affordability)}</p>
              <p className="text-sm text-muted-foreground">This is an estimate of how much home you might be able to afford.</p>
              <p className="text-sm mt-4">Want a more detailed calculation? Customize your options below.</p>
            </div>
          )}
          
          {/* Advanced options section */}
          {isInitialDataComplete && (
            <Collapsible 
              open={showAdvancedOptions} 
              onOpenChange={setShowAdvancedOptions}
              className="border border-muted/30 rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full justify-between items-center p-4 text-left"
                >
                  <span className="font-medium">Customize Your Options</span>
                  {showAdvancedOptions ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 space-y-6 bg-appCharcoal/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    {/* Home Price Input */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="homePrice">Home Price</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>The purchase price of the home you're considering.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                        <Input
                          id="homePrice"
                          type="number"
                          value={homePrice}
                          onChange={(e) => setHomePrice(Number(e.target.value))}
                          className="pl-7"
                        />
                      </div>
                    </div>
                    
                    {/* Down Payment */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="downPayment">Down Payment</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>A larger down payment means lower monthly payments and often better interest rates.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="text-sm text-muted-foreground">{downPaymentPercent}%</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                        <Input
                          id="downPayment"
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="pl-7"
                        />
                      </div>
                      <Slider
                        value={[downPaymentPercent]}
                        min={0}
                        max={50}
                        step={1}
                        onValueChange={(value) => setDownPaymentPercent(value[0])}
                      />
                    </div>
                    
                    {/* Loan Type & Term */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="loanType">Loan Type</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Different loan types have different requirements and benefits.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Select 
                          value={loanType} 
                          onValueChange={setLoanType}
                        >
                          <SelectTrigger id="loanType">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conventional">Conventional</SelectItem>
                            <SelectItem value="fha">FHA</SelectItem>
                            <SelectItem value="va">VA</SelectItem>
                            <SelectItem value="usda">USDA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="loanTerm">Loan Term</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Shorter terms mean higher monthly payments but less interest paid overall.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Select 
                          value={loanTerm.toString()} 
                          onValueChange={(value) => setLoanTerm(Number(value))}
                        >
                          <SelectTrigger id="loanTerm">
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 years</SelectItem>
                            <SelectItem value="20">20 years</SelectItem>
                            <SelectItem value="30">30 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Interest Rate */}
                    <div className="space-y-2 relative">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="interestRate">Interest Rate (%)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>Even small changes in interest rate can significantly impact your monthly payment.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="relative">
                        <Input
                          id="interestRate"
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          step={0.1}
                          className={isLoadingRates ? "pr-10" : ""}
                        />
                        {isLoadingRates && (
                          <div className="absolute right-3 inset-y-0 flex items-center">
                            <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-1 text-xs flex items-center gap-1"
                        onClick={getRates}
                        disabled={isLoadingRates}
                      >
                        <Search className="h-3 w-3" /> Get Current Rate
                      </Button>
                    </div>
                    
                    {/* Property Tax & Insurance */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="propertyTax">Property Tax Rate (%)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Property tax rates vary by location and can significantly impact your monthly payment.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="propertyTax"
                          type="number"
                          value={propertyTax}
                          onChange={(e) => setPropertyTax(Number(e.target.value))}
                          step={0.1}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="homeInsurance">Annual Insurance ($)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Insurance costs depend on the home's value, location, and coverage level.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="homeInsurance"
                          type="number"
                          value={homeInsurance}
                          onChange={(e) => setHomeInsurance(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between">
                    <div className="p-6 bg-muted/40 rounded-lg mb-4">
                      <h3 className="text-lg font-semibold mb-1">Monthly Payment</h3>
                      <p className="text-3xl font-bold text-primary mb-4">{formatCurrency(monthlyPayment)}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Principal & Interest:</span>
                          <span>{formatCurrency(principal + interest)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Property Tax:</span>
                          <span>{formatCurrency(tax)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Home Insurance:</span>
                          <span>{formatCurrency(insurance)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold pt-2 border-t border-muted/30">
                          <span>Loan Amount:</span>
                          <span>{formatCurrency(homePrice - downPayment)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-64">
                      <p className="text-sm text-center mb-2">Monthly Payment Breakdown</p>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
          
          {/* Educational tip */}
          {isInitialDataComplete && (
            <div className="p-4 bg-appBlue/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-appBlue/20 p-2 rounded-full mt-1">
                  <Info className="h-4 w-4 text-appBlue" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Mortgage Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    For every 0.25% decrease in interest rate, you can afford approximately 3% more house 
                    for the same monthly payment. Improving your credit score by just 20 points could help you 
                    qualify for a better rate!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressiveMortgageCalculator;
