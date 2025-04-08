
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CreditCard, DollarSign, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const spendingData = [
  { name: 'Rent', amount: 1400 },
  { name: 'Groceries', amount: 450 },
  { name: 'Car Payment', amount: 350 },
  { name: 'Utilities', amount: 250 },
  { name: 'Student Loan', amount: 200 },
  { name: 'Dining Out', amount: 300 },
  { name: 'Entertainment', amount: 150 },
  { name: 'Savings', amount: 400 },
];

const monthlyData = [
  { name: 'Jun', income: 5000, expenses: 3900 },
  { name: 'Jul', income: 5000, expenses: 4100 },
  { name: 'Aug', income: 5000, expenses: 3800 },
  { name: 'Sep', income: 5200, expenses: 3750 },
  { name: 'Oct', income: 5200, expenses: 3500 },
  { name: 'Nov', income: 5200, expenses: 3200 },
];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const Finances = () => {
  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Financial Dashboard</h1>
            <p className="text-muted-foreground">Track and manage your spending, income, and debt</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Connect Account
          </Button>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-muted/30 border-muted/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                  <p className="text-2xl font-semibold text-primary">$5,200</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs">
                <TrendingUp className="h-3 w-3 text-appSuccess mr-1" />
                <span className="text-appSuccess">+$200 from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30 border-muted/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                  <p className="text-2xl font-semibold text-appWarning">$3,200</p>
                </div>
                <div className="bg-appWarning/10 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-appWarning" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs">
                <TrendingDown className="h-3 w-3 text-appSuccess mr-1" />
                <span className="text-appSuccess">-$300 from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30 border-muted/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Savings Rate</p>
                  <p className="text-2xl font-semibold text-appSuccess">38%</p>
                </div>
                <div className="bg-appSuccess/10 p-2 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-appSuccess" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs">
                <TrendingUp className="h-3 w-3 text-appSuccess mr-1" />
                <span className="text-appSuccess">+12% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30 border-muted/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Debt Paydown</p>
                  <p className="text-2xl font-semibold text-appBlue">$550</p>
                </div>
                <div className="bg-appBlue/10 p-2 rounded-full">
                  <TrendingDown className="h-5 w-5 text-appBlue" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs">
                <TrendingUp className="h-3 w-3 text-appSuccess mr-1" />
                <span className="text-appSuccess">+$50 from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="spending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="income">Income & Expenses</TabsTrigger>
            <TabsTrigger value="debt">Debt Management</TabsTrigger>
          </TabsList>
          
          {/* Spending Tab */}
          <TabsContent value="spending" className="space-y-6">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader>
                <CardTitle className="text-xl">Monthly Spending Breakdown</CardTitle>
                <CardDescription>Where your money went this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={spendingData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis type="number" tickFormatter={value => formatCurrency(value)} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="amount" fill="#33C3F0" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Biggest Expenses</h4>
                    <div className="space-y-3">
                      {spendingData.slice(0, 3).map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span>{formatCurrency(item.amount)}</span>
                          </div>
                          <Progress value={(item.amount / spendingData[0].amount) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Potential Savings Opportunities</h4>
                    <div className="space-y-3">
                      <div className="bg-muted/20 p-3 rounded-md flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Dining Out</p>
                          <p className="text-xs text-muted-foreground">Reduce by 30%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-appSuccess">Save $90/mo</p>
                          <p className="text-xs text-muted-foreground">$1,080/year</p>
                        </div>
                      </div>
                      <div className="bg-muted/20 p-3 rounded-md flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">Entertainment</p>
                          <p className="text-xs text-muted-foreground">Reduce by 30%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-appSuccess">Save $45/mo</p>
                          <p className="text-xs text-muted-foreground">$540/year</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Income & Expenses Tab */}
          <TabsContent value="income" className="space-y-6">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader>
                <CardTitle className="text-xl">Income vs. Expenses</CardTitle>
                <CardDescription>6-month history of your cash flow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={value => formatCurrency(value)} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" name="Expenses" fill="#F97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card className="bg-muted/20 border-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Savings Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Monthly Savings</span>
                          <span className="font-medium">{formatCurrency(2000)}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Down Payment Progress</span>
                            <span>40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            At your current pace, you'll reach your down payment goal in 14 months.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/20 border-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Income Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-muted/20 p-3 rounded-md">
                          <p className="text-sm font-medium">Salary Negotiation</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            A 5% raise could add $260/month to your income
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            View Negotiation Tips
                          </Button>
                        </div>
                        <div className="bg-muted/20 p-3 rounded-md">
                          <p className="text-sm font-medium">Side Hustle</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            10 hours/week could add $400-800/month
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            Explore Options
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Debt Management Tab */}
          <TabsContent value="debt" className="space-y-6">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader>
                <CardTitle className="text-xl">Debt Payoff Strategy</CardTitle>
                <CardDescription>Optimize your debt payoff to save on interest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-muted/20 border-muted/30">
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-1">Total Debt</h3>
                        <p className="text-2xl font-semibold text-appWarning">{formatCurrency(25000)}</p>
                        <div className="flex items-center mt-2 text-xs">
                          <TrendingDown className="h-3 w-3 text-appSuccess mr-1" />
                          <span className="text-appSuccess">-$550 this month</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/20 border-muted/30">
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-1">Debt-to-Income</h3>
                        <p className="text-2xl font-semibold">28%</p>
                        <div className="flex items-center mt-2 text-xs">
                          <TrendingDown className="h-3 w-3 text-appSuccess mr-1" />
                          <span className="text-appSuccess">-2% from last month</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/20 border-muted/30">
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-1">Projected Payoff</h3>
                        <p className="text-2xl font-semibold">18 months</p>
                        <div className="flex items-center mt-2 text-xs">
                          <TrendingDown className="h-3 w-3 text-appSuccess mr-1" />
                          <span className="text-appSuccess">-2 months from previous</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Your Debts</h3>
                    <div className="space-y-3">
                      <Card className="bg-muted/20 border-muted/30">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Credit Card</h4>
                              <p className="text-sm text-muted-foreground">18.99% APR</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatCurrency(5800)}</p>
                              <p className="text-sm text-muted-foreground">Min: $140/mo</p>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Payoff Progress</span>
                              <span>35%</span>
                            </div>
                            <Progress value={35} className="h-2" />
                          </div>
                          <div className="flex justify-between mt-3 text-sm">
                            <span>Recommended Payment:</span>
                            <span className="font-medium text-primary">{formatCurrency(290)}/mo</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/20 border-muted/30">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Car Loan</h4>
                              <p className="text-sm text-muted-foreground">4.5% APR</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatCurrency(12500)}</p>
                              <p className="text-sm text-muted-foreground">Min: $350/mo</p>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Payoff Progress</span>
                              <span>40%</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                          <div className="flex justify-between mt-3 text-sm">
                            <span>Recommended Payment:</span>
                            <span className="font-medium text-primary">{formatCurrency(350)}/mo</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/20 border-muted/30">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Student Loan</h4>
                              <p className="text-sm text-muted-foreground">5.8% APR</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatCurrency(6700)}</p>
                              <p className="text-sm text-muted-foreground">Min: $200/mo</p>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Payoff Progress</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                          <div className="flex justify-between mt-3 text-sm">
                            <span>Recommended Payment:</span>
                            <span className="font-medium text-primary">{formatCurrency(200)}/mo</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Finances;
