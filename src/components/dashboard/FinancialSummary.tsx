
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, DollarSign, TrendingDown, TrendingUp, CreditCard, Landmark } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FinancialSummaryProps {
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  debtTotal: number;
  savingsGoal: number;
  creditScore: number;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  monthlyIncome = 5000,
  monthlyExpenses = 3200,
  savings = 12000,
  debtTotal = 25000,
  savingsGoal = 30000,
  creditScore = 680
}) => {
  const savingsProgress = (savings / savingsGoal) * 100;
  const monthlyBalance = monthlyIncome - monthlyExpenses;
  const hasSurplus = monthlyBalance > 0;
  
  // Calculate credit score color
  let creditScoreColor = "text-appWarning";
  if (creditScore >= 740) creditScoreColor = "text-appSuccess";
  else if (creditScore >= 670) creditScoreColor = "text-appBlue";
  
  return (
    <Card className="border-muted/30 bg-appNavy">
      <CardHeader>
        <CardTitle className="text-xl">Financial Summary</CardTitle>
        <CardDescription>Your current financial snapshot</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Monthly Cash Flow */}
          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <span className="stat-label">Monthly Cash Flow</span>
              {hasSurplus ? (
                <TrendingUp className="h-4 w-4 text-appSuccess" />
              ) : (
                <TrendingDown className="h-4 w-4 text-appDanger" />
              )}
            </div>
            <span className={`stat-value ${hasSurplus ? 'text-appSuccess' : 'text-appDanger'}`}>
              {formatCurrency(monthlyBalance)}
            </span>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Income: {formatCurrency(monthlyIncome)}</span>
              <span>Expenses: {formatCurrency(monthlyExpenses)}</span>
            </div>
          </div>
          
          {/* Down Payment Savings */}
          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <span className="stat-label">Down Payment Savings</span>
              <DollarSign className="h-4 w-4 text-appBlue" />
            </div>
            <span className="stat-value">{formatCurrency(savings)}</span>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Goal: {formatCurrency(savingsGoal)}</span>
                <span>{Math.round(savingsProgress)}%</span>
              </div>
              <Progress value={savingsProgress} className="h-2" />
            </div>
          </div>
          
          {/* Total Debt */}
          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <span className="stat-label">Total Debt</span>
              <CreditCard className="h-4 w-4 text-appWarning" />
            </div>
            <span className="stat-value text-appWarning">{formatCurrency(debtTotal)}</span>
            <div className="flex items-center mt-2 text-xs">
              <TrendingDown className="h-3 w-3 text-appSuccess mr-1" />
              <span className="text-appSuccess">-$230 this month</span>
            </div>
          </div>
          
          {/* Credit Score */}
          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <span className="stat-label">Credit Score</span>
              <Landmark className="h-4 w-4 text-appBlue" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`stat-value ${creditScoreColor}`}>{creditScore}</span>
              <span className="text-xs text-muted-foreground">
                {creditScore < 670 ? 'Fair' : creditScore < 740 ? 'Good' : 'Excellent'}
              </span>
            </div>
            <div className="flex items-center mt-2 text-xs">
              <ArrowUpRight className="h-3 w-3 text-appSuccess mr-1" />
              <span className="text-appSuccess">+12 points in 30 days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;
