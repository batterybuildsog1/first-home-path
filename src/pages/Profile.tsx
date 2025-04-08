
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, CreditCard, Edit, UserCircle } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          <Button variant="outline">
            <UserCircle className="mr-2 h-4 w-4" /> Account Settings
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card className="border-muted/30 bg-appNavy">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                    <UserCircle className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-bold">Alex Johnson</h2>
                  <p className="text-muted-foreground">alex.johnson@example.com</p>
                  <div className="flex items-center mt-2 text-primary text-sm">
                    <Award className="mr-1 h-4 w-4" />
                    <span>Pro Member</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    <Edit className="mr-2 h-3 w-3" /> Edit Profile
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-muted/30">
                  <h3 className="text-sm font-medium mb-3">Profile Completion</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Personal Info</span>
                      <span className="text-appSuccess">Complete</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Financial Info</span>
                      <span className="text-appSuccess">Complete</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Home Preferences</span>
                      <span className="text-appWarning">Incomplete</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Document Upload</span>
                      <span className="text-appWarning">Incomplete</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="financial">Financial Profile</TabsTrigger>
                <TabsTrigger value="preferences">Home Preferences</TabsTrigger>
              </TabsList>
              
              {/* Personal Info Tab */}
              <TabsContent value="personal">
                <Card className="border-muted/30 bg-appNavy">
                  <CardHeader>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" defaultValue="Alex Johnson" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="(555) 123-4567" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Current Location</Label>
                          <Input id="location" defaultValue="Portland, OR" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Current Address</Label>
                        <Input id="address" defaultValue="123 Main Street, Apt 4B" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue="Portland" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Select defaultValue="OR">
                            <SelectTrigger id="state">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="OR">Oregon</SelectItem>
                              <SelectItem value="WA">Washington</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input id="zipCode" defaultValue="97210" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Financial Profile Tab */}
              <TabsContent value="financial">
                <Card className="border-muted/30 bg-appNavy">
                  <CardHeader>
                    <CardTitle className="text-xl">Financial Profile</CardTitle>
                    <CardDescription>Update your financial information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="income">Annual Income (Pre-Tax)</Label>
                          <div className="relative">
                            <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                            <Input id="income" className="pl-7" defaultValue="75000" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="additionalIncome">Additional Annual Income</Label>
                          <div className="relative">
                            <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                            <Input id="additionalIncome" className="pl-7" defaultValue="0" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="employmentStatus">Employment Status</Label>
                          <Select defaultValue="fullTime">
                            <SelectTrigger id="employmentStatus">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fullTime">Full-Time</SelectItem>
                              <SelectItem value="partTime">Part-Time</SelectItem>
                              <SelectItem value="selfEmployed">Self-Employed</SelectItem>
                              <SelectItem value="unemployed">Unemployed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employmentLength">Years at Current Job</Label>
                          <Input id="employmentLength" defaultValue="4" />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Current Debts</h3>
                        <div className="rounded-lg border border-muted/30 divide-y divide-muted/30">
                          <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Credit Card</p>
                                <p className="text-sm text-muted-foreground">18.99% APR</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$5,800</p>
                              <p className="text-sm text-muted-foreground">$140/mo minimum</p>
                            </div>
                          </div>
                          <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Car Loan</p>
                                <p className="text-sm text-muted-foreground">4.5% APR</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$12,500</p>
                              <p className="text-sm text-muted-foreground">$350/mo payment</p>
                            </div>
                          </div>
                          <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Student Loan</p>
                                <p className="text-sm text-muted-foreground">5.8% APR</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$6,700</p>
                              <p className="text-sm text-muted-foreground">$200/mo payment</p>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="mr-2 h-4 w-4" /> Add Debt
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="creditScore">Credit Score (Estimate)</Label>
                        <Input id="creditScore" defaultValue="680" />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Home Preferences Tab */}
              <TabsContent value="preferences">
                <Card className="border-muted/30 bg-appNavy">
                  <CardHeader>
                    <CardTitle className="text-xl">Home Preferences</CardTitle>
                    <CardDescription>Tell us about your ideal home</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="homeType">Preferred Home Type</Label>
                          <Select defaultValue="singleFamily">
                            <SelectTrigger id="homeType">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="singleFamily">Single Family Home</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="condo">Condominium</SelectItem>
                              <SelectItem value="multiFamily">Multi-Family</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priceRange">Price Range</Label>
                          <Select defaultValue="250000-350000">
                            <SelectTrigger id="priceRange">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under250000">Under $250,000</SelectItem>
                              <SelectItem value="250000-350000">$250,000 - $350,000</SelectItem>
                              <SelectItem value="350000-450000">$350,000 - $450,000</SelectItem>
                              <SelectItem value="450000-600000">$450,000 - $600,000</SelectItem>
                              <SelectItem value="over600000">Over $600,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bedrooms">Minimum Bedrooms</Label>
                          <Select defaultValue="3">
                            <SelectTrigger id="bedrooms">
                              <SelectValue placeholder="Select number" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1+</SelectItem>
                              <SelectItem value="2">2+</SelectItem>
                              <SelectItem value="3">3+</SelectItem>
                              <SelectItem value="4">4+</SelectItem>
                              <SelectItem value="5">5+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bathrooms">Minimum Bathrooms</Label>
                          <Select defaultValue="2">
                            <SelectTrigger id="bathrooms">
                              <SelectValue placeholder="Select number" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1+</SelectItem>
                              <SelectItem value="2">2+</SelectItem>
                              <SelectItem value="3">3+</SelectItem>
                              <SelectItem value="4">4+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="preferredLocations">Preferred Locations</Label>
                        <Input id="preferredLocations" placeholder="Enter neighborhoods or areas" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timeframe">Buying Timeframe</Label>
                        <Select defaultValue="6-12months">
                          <SelectTrigger id="timeframe">
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-6months">0-6 months</SelectItem>
                            <SelectItem value="6-12months">6-12 months</SelectItem>
                            <SelectItem value="1-2years">1-2 years</SelectItem>
                            <SelectItem value="2+years">2+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="additionalPreferences">Important Features</Label>
                        <Input id="additionalPreferences" placeholder="e.g., garage, backyard, updated kitchen" />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Save Preferences</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
