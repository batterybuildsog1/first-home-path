
import React from "react";
import Navbar from "@/components/layout/Navbar";
import OnboardingForm from "@/components/onboarding/OnboardingForm";
import { useAuth } from "../App";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Onboarding = () => {
  const { updateOnboardingStatus } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCompleteOnboarding = async (userData: any) => {
    try {
      // Save user data to Supabase
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new Error("User not authenticated");
      }
      
      // Save financial data
      const { error: financialError } = await supabase
        .from('financial_profiles')
        .upsert({
          user_id: user.user.id,
          income: parseFloat(userData.income.replace(/[^0-9.]/g, '')),
          savings: parseFloat(userData.savings.replace(/[^0-9.]/g, '')),
          credit_score: userData.creditScore,
          total_debt: parseFloat(userData.debt.replace(/[^0-9.]/g, '')),
          location: {
            city: userData.city,
            state: userData.state,
            zip_code: userData.zipCode
          }
        });
      
      if (financialError) throw financialError;
      
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
