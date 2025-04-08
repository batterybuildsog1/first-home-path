
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUp, PiggyBank, TrendingUp, Calendar, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const savingsData = [
  { month: 'Jun', savings: 8000 },
  { month: 'Jul', savings: 9200 },
  { month: 'Aug', savings: 10400 },
  { month: 'Sep', savings: 11000 },
  { month: 'Oct', savings: 11800 },
  { month: 'Nov', savings: 12000 },
  { month: 'Dec', savings: 13500 },
  { month: 'Jan', savings: 15000 },
  { month: 'Feb', savings: 17000 },
  { month: 'Mar', savings: 19000 },
  { month: 'Apr', savings: 21500 },
  { month: 'May', savings: 24000 },
];

const projectionData = [
  { month: 'May', savings: 24000, projection: 24000 },
  { month: 'Jun', savings: null, projection: 26500 },
  { month: 'Jul', savings: null, projection: 29000 },
  { month: 'Aug', savings: null, projection: 31500 },
  { month: 'Sep', savings: null, projection: 34000 },
  { month: 'Oct', savings: null, projection: 36500 },
  { month: 'Nov', savings: null, projection: 39000 },
  { month: 'Dec', savings: null, projection: 41500 },
];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const Savings = () => {
  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Savings Dashboard</h1>
            <p className="text-muted-foreground">Track your down payment and emergency funds</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Fund
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-muted/30 border-muted/30">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Savings</p>
                  <p className="text-3xl font-semibold text-primary">{formatCurrency(24000)}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <PiggyBank className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Growth Rate</span>
                  <span className="text-appSuccess">+12.5% monthly</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-appSuccess" />
                  <span>+$2,500 in the last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30 border-muted/30">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Down Payment Goal</p>
                  <p className="text-3xl font-semibold text-appPurple">{formatCurrency(60000)}</p>
                </div>
                <div className="bg-appPurple/10 p-2 rounded-full">
                  <Target className="h-5 w-5 text-appPurple" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-2" />
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Target Date: October 2026</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30 border-muted/30">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Emergency Fund</p>
                  <p className="text-3xl font-semibold text-appSuccess">{formatCurrency(12000)}</p>
                </div>
                <div className="bg-appSuccess/10 p-2 rounded-full">
                  <ArrowUp className="h-5 w-5 text-appSuccess" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Goal (3 months expenses)</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="h-2" />
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-appSuccess">
                    ✓ Fully funded! Consider focusing on your down payment.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="overview">Savings Overview</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader>
                <CardTitle className="text-xl">Savings Growth</CardTitle>
                <CardDescription>12-month history of your savings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={savingsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={value => formatCurrency(value)} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line 
                        type="monotone" 
                        dataKey="savings" 
                        name="Savings" 
                        stroke="#33C3F0" 
                        strokeWidth={3}
                        dot={{ stroke: '#33C3F0', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <Card className="bg-muted/20 border-muted/30">
                    <CardContent className="p-6">
                      <h3 className="text-sm font-medium mb-2">Monthly Contribution</h3>
                      <p className="text-2xl font-semibold text-primary">{formatCurrency(2500)}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        You're saving 48% of your monthly income after expenses.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/20 border-muted/30">
                    <CardContent className="p-6">
                      <h3 className="text-sm font-medium mb-2">Annual Growth</h3>
                      <p className="text-2xl font-semibold text-appSuccess">+200%</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Your savings have tripled over the past 12 months.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/20 border-muted/30">
                    <CardContent className="p-6">
                      <h3 className="text-sm font-medium mb-2">Milestone Alert</h3>
                      <p className="text-md font-medium">1 new milestone reached!</p>
                      <div className="flex items-center gap-2 mt-2 text-appSuccess text-sm">
                        <span className="bg-appSuccess/20 h-4 w-4 rounded-full flex items-center justify-center">
                          <span className="bg-appSuccess h-2 w-2 rounded-full"></span>
                        </span>
                        <span>Emergency Fund Complete</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Projections Tab */}
          <TabsContent value="projections" className="space-y-6">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader>
                <CardTitle className="text-xl">Savings Projections</CardTitle>
                <CardDescription>See when you'll reach your home buying goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={projectionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={value => formatCurrency(value)} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line 
                        type="monotone" 
                        dataKey="savings" 
                        name="Actual Savings" 
                        stroke="#33C3F0" 
                        strokeWidth={3}
                        dot={{ stroke: '#33C3F0', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="projection" 
                        name="Projected Savings" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={{ stroke: '#8B5CF6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card className="bg-muted/20 border-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Goal Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="bg-appPurple/20 h-4 w-4 rounded-full flex items-center justify-center">
                              <span className="bg-appPurple h-2 w-2 rounded-full"></span>
                            </span>
                            <span className="text-sm">Down Payment ($60,000)</span>
                          </span>
                          <span className="font-medium">Oct 2026</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="bg-primary/20 h-4 w-4 rounded-full flex items-center justify-center">
                              <span className="bg-primary h-2 w-2 rounded-full"></span>
                            </span>
                            <span className="text-sm">20% of $300k Home</span>
                          </span>
                          <span className="font-medium">Jul 2027</span>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground">
                            Based on your current saving rate of $2,500/month and projected home values.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/20 border-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Speed Up Your Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-muted/20 p-3 rounded-md">
                          <p className="text-sm font-medium">Increase Monthly Savings</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            Adding $500/mo could help you reach your goal 4 months earlier.
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            See How
                          </Button>
                        </div>
                        <div className="bg-muted/20 p-3 rounded-md">
                          <p className="text-sm font-medium">Consider an FHA Loan</p>
                          <p className="text-xs text-muted-foreground mb-2">
                            Only need 3.5% down ($10,500 for a $300k home)
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Savings;
