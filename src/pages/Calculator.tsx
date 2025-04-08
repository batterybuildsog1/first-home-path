
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import HomeAffordabilityCalculator from "@/components/calculators/HomeAffordabilityCalculator";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Search } from "lucide-react";

const Calculator = () => {
  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        <div>
          <h1 className="text-2xl font-bold">Financial Calculators</h1>
          <p className="text-muted-foreground">Tools to help you plan your home purchase</p>
        </div>
        
        <Card className="border-muted/30 bg-appNavy/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-appPurple/20 p-2 rounded-full mt-1">
                <Info className="h-4 w-4 text-appPurple" />
              </div>
              <div>
                <h3 className="font-medium mb-1">New: AI-Powered Calculators</h3>
                <p className="text-sm text-muted-foreground">
                  Our calculators use Gemini 2.5 Pro with Google Search to provide up-to-date mortgage rates and location-specific property tax and insurance estimates. Look for the <Search className="h-3 w-3 inline ml-1 mr-1" /> icon to access these features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="mortgage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="mortgage">Mortgage Calculator</TabsTrigger>
            <TabsTrigger value="affordability">Affordability Calculator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mortgage">
            <MortgageCalculator />
          </TabsContent>
          
          <TabsContent value="affordability">
            <HomeAffordabilityCalculator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Calculator;
