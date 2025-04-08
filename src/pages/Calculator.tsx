
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import HomeAffordabilityCalculator from "@/components/calculators/HomeAffordabilityCalculator";

const Calculator = () => {
  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        <div>
          <h1 className="text-2xl font-bold">Financial Calculators</h1>
          <p className="text-muted-foreground">Tools to help you plan your home purchase</p>
        </div>
        
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
