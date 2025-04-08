
import React from "react";
import Navbar from "@/components/layout/Navbar";
import OnboardingForm from "@/components/onboarding/OnboardingForm";
import { useAuth } from "../App";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const { updateOnboardingStatus } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCompleteOnboarding = async (userData: any) => {
    try {
      // For now, we'll just store the data in memory and mark onboarding as complete
      // Later, we'll implement the database storage functionality
      console.log("Onboarding data:", userData);
      
      // Mark onboarding as complete
      await updateOnboardingStatus(true);
      
      toast({
        title: "Onboarding Complete!",
        description: "Welcome to FirstHomePath. Your journey begins now!",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Onboarding error:", error);
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        <OnboardingForm onComplete={handleCompleteOnboarding} />
      </main>
    </div>
  );
};

export default Onboarding;
