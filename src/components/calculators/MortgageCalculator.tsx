
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { fetchMortgageRates, fetchPropertyTaxRate, fetchHomeInsuranceEstimate } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";

const MortgageCalculator: React.FC = () => {
  const { toast } = useToast();
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(5.5);
  const [propertyTax, setPropertyTax] = useState(1.2);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [loanType, setLoanType] = useState("conventional");
  const [location, setLocation] = useState({
    state: "",
    zipCode: ""
  });
  
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [tax, setTax] = useState(0);
  const [insurance, setInsurance] = useState(0);
  
  // Fetch current mortgage rates on component mount
  useEffect(() => {
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
    
    getRates();
  }, [loanType]);
  
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
          Calculate your monthly mortgage payment and see a breakdown of costs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Home Price Input */}
            <div className="space-y-2">
              <Label htmlFor="homePrice">Home Price</Label>
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
                <Label htmlFor="downPayment">Down Payment</Label>
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
                <Label htmlFor="loanType">Loan Type</Label>
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
                <Label htmlFor="loanTerm">Loan Term</Label>
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
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
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
                className="mt-1 text-xs"
                onClick={() => fetchMortgageRates()}
                disabled={isLoadingRates}
              >
                Get Current Rate
              </Button>
            </div>
            
            {/* Location for Property Tax & Insurance */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Location (for local rates)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="State (e.g. California)"
                    value={location.state}
                    onChange={(e) => setLocation({...location, state: e.target.value})}
                  />
                  <Input
                    placeholder="ZIP Code (optional)"
                    value={location.zipCode}
                    onChange={(e) => setLocation({...location, zipCode: e.target.value})}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-1 text-xs"
                  onClick={fetchLocationData}
                >
                  Get Local Rates
                </Button>
              </div>
            </div>
            
            {/* Property Tax & Insurance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyTax">Property Tax Rate (%)</Label>
                <Input
                  id="propertyTax"
                  type="number"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(Number(e.target.value))}
                  step={0.1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="homeInsurance">Annual Insurance ($)</Label>
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
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;
