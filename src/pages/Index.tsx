
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleStartJourney = () => {
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        <WelcomeCard 
          username="there" 
          onStartJourney={handleStartJourney}
          isNewUser={true}
        />
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Path to Homeownership Starts Here</h2>
          <p className="max-w-2xl mx-auto mb-8">
            FirstHomePath helps first-time homebuyers navigate the complex journey to homeownership. 
            From financial planning to mortgage education, we provide personalized guidance every step of the way.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-appCharcoal p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Financial Planning</h3>
              <p className="mb-4">Understand your finances and create a plan to afford your dream home.</p>
            </div>
            <div className="bg-appCharcoal p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Mortgage Education</h3>
              <p className="mb-4">Learn about mortgage options and find the best fit for your situation.</p>
            </div>
            <div className="bg-appCharcoal p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Home Shopping</h3>
              <p className="mb-4">Get guidance on finding and purchasing your perfect home.</p>
            </div>
          </div>
          
          <Button 
            onClick={handleStartJourney} 
            className="mt-8 bg-gradient-to-r from-appBlue to-appPurple hover:opacity-90 transition-opacity"
          >
            Create Your Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
