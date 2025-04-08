
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const HomeAffordabilityCalculator: React.FC = () => {
  // Financial inputs
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [monthlyDebt, setMonthlyDebt] = useState(500);
  const [downPayment, setDownPayment] = useState(30000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [insuranceRate, setInsuranceRate] = useState(0.4);
  
  // Calculated outputs
  const [maxAffordability, setMaxAffordability] = useState(0);
  const [conservativeAffordability, setConservativeAffordability] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(0);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };
  
  // Calculate affordability based on inputs
  useEffect(() => {
    // Monthly income
    const monthlyIncome = annualIncome / 12;
    
    // Calculate maximum monthly payment (36% of income minus existing debt)
    const maxMonthlyPayment = (monthlyIncome * 0.36) - monthlyDebt;
    
    // Calculate conservative monthly payment (28% of income minus existing debt)
    const conservativeMonthlyPayment = (monthlyIncome * 0.28) - monthlyDebt;
    
    // Current debt-to-income ratio
    const currentDTI = (monthlyDebt / monthlyIncome) * 100;
    setDebtToIncomeRatio(currentDTI);
    
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Number of payments
    const numberOfPayments = loanTerm * 12;
    
    // Calculate maximum loan amount based on monthly payment
    const calculateLoanAmount = (payment: number) => {
      // Estimate property tax and insurance for a typical house in this price range
      const estimatedHomeValue = 300000; // Starting estimate
      const estimatedMonthlyTax = (estimatedHomeValue * propertyTaxRate / 100) / 12;
      const estimatedMonthlyInsurance = (estimatedHomeValue * insuranceRate / 100) / 12;
      
      // Payment available for principal and interest
      const availableForPI = payment - estimatedMonthlyTax - estimatedMonthlyInsurance;
      
      // Calculate loan amount based on available PI payment
      if (availableForPI <= 0 || monthlyRate === 0) return 0;
      
      return availableForPI * ((1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate);
    };
    
    // Calculate home price (loan amount + down payment)
    const maxLoanAmount = calculateLoanAmount(maxMonthlyPayment);
    const conservativeLoanAmount = calculateLoanAmount(conservativeMonthlyPayment);
    
    // Set affordability values
    const maxHomePrice = maxLoanAmount + downPayment;
    const conservativeHomePrice = conservativeLoanAmount + downPayment;
    
    setMaxAffordability(Math.max(0, Math.round(maxHomePrice)));
    setConservativeAffordability(Math.max(0, Math.round(conservativeHomePrice)));
    
    // Calculate monthly payment for selected home price
    const selectedPrice = conservativeHomePrice; // Using conservative by default
    const loanAmount = selectedPrice - downPayment;
    
    if (loanAmount > 0) {
      const principalInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const monthlyTax = (selectedPrice * propertyTaxRate / 100) / 12;
      const monthlyInsurance = (selectedPrice * insuranceRate / 100) / 12;
      
      setMonthlyPayment(Math.round(principalInterest + monthlyTax + monthlyInsurance));
    } else {
      setMonthlyPayment(0);
    }
  }, [annualIncome, monthlyDebt, downPayment, interestRate, loanTerm, propertyTaxRate, insuranceRate]);
  
  return (
    <Card className="border-muted/30 bg-appNavy">
      <CardHeader>
        <CardTitle className="text-xl">Home Affordability Calculator</CardTitle>
        <CardDescription>
          Find out how much home you can comfortably afford based on your income and expenses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income */}
              <div className="space-y-2">
                <Label htmlFor="annualIncome" className="flex items-center">
                  Annual Income (Pre-Tax)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Your total annual household income before taxes.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>
              
              {/* Monthly Debt */}
              <div className="space-y-2">
                <Label htmlFor="monthlyDebt" className="flex items-center">
                  Monthly Debt Payments
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Total monthly payments for loans, credit cards, etc.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                  <Input
                    id="monthlyDebt"
                    type="number"
                    value={monthlyDebt}
                    onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>
              
              {/* Down Payment */}
              <div className="space-y-2">
                <Label htmlFor="downPayment">Available Down Payment</Label>
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
              </div>
              
              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="interestRate">Interest Rate</Label>
                  <span className="text-sm text-muted-foreground">{interestRate}%</span>
                </div>
                <Slider
                  id="interestRate"
                  value={[interestRate]}
                  min={2}
                  max={10}
                  step={0.1}
                  onValueChange={(value) => setInterestRate(value[0])}
                />
              </div>
              
              {/* Advanced Options */}
              <div className="col-span-1 md:col-span-2">
                <div className="text-sm font-medium mb-3">Advanced Options</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      min={15}
                      max={30}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyTaxRate">Property Tax Rate (%)</Label>
                    <Input
                      id="propertyTaxRate"
                      type="number"
                      value={propertyTaxRate}
                      onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceRate">Insurance Rate (%)</Label>
                    <Input
                      id="insuranceRate"
                      type="number"
                      value={insuranceRate}
                      onChange={(e) => setInsuranceRate(Number(e.target.value))}
                      step={0.1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-6">
              {/* Affordability Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/40 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 flex items-center">
                      Conservative Estimate
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Based on the 28% rule for housing expenses. This is what most financial advisors recommend.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </h3>
                    <p className="text-3xl font-bold text-primary">{formatCurrency(conservativeAffordability)}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">Estimated Monthly Payment</div>
                    <p className="text-xl font-semibold">{formatCurrency(monthlyPayment)}</p>
                  </div>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 flex items-center">
                      Maximum Affordability
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Based on the 36% rule for total debt payments. This is what banks might approve you for, but it may stretch your budget.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </h3>
                    <p className="text-3xl font-bold text-appPurple">{formatCurrency(maxAffordability)}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">Debt-to-Income Ratio</div>
                    <p className="text-xl font-semibold">{debtToIncomeRatio.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
              
              {/* Debt-to-Income Visual */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Your Debt-to-Income Ratio</h3>
                  <span className={`text-sm ${debtToIncomeRatio > 30 ? 'text-appWarning' : 'text-appSuccess'}`}>
                    {debtToIncomeRatio.toFixed(1)}%
                  </span>
                </div>
                <Progress value={debtToIncomeRatio} max={50} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>10%</span>
                  <span>20%</span>
                  <span>30%</span>
                  <span>40%</span>
                  <span>50%+</span>
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="bg-muted/20 rounded-lg p-4 mt-6">
                <h3 className="font-medium mb-2">Recommendations</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-appBlue/20 p-1 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-appBlue"></div>
                    </div>
                    <span>Consider the conservative estimate for long-term financial health.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-appBlue/20 p-1 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-appBlue"></div>
                    </div>
                    <span>Account for additional costs like maintenance, utilities, and HOA fees.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-appBlue/20 p-1 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-appBlue"></div>
                    </div>
                    <span>A larger down payment can help you afford more house or reduce monthly payments.</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HomeAffordabilityCalculator;
