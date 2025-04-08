
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import ProgressTracker from "@/components/dashboard/ProgressTracker";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import HomeInsights from "@/components/dashboard/HomeInsights";
import AIMentor from "@/components/dashboard/AIMentor";
import { useToast } from "@/hooks/use-toast";
import OnboardingForm from "@/components/onboarding/OnboardingForm";

const Index = () => {
  const { toast } = useToast();
  const [isNewUser, setIsNewUser] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const handleStartJourney = () => {
    if (isNewUser) {
      setShowOnboarding(true);
    } else {
      toast({
        title: "Welcome back!",
        description: "Continue your journey to homeownership."
      });
    }
  };
  
  const handleCompleteOnboarding = (userData: any) => {
    console.log("Onboarding completed with data:", userData);
    setIsNewUser(false);
    setShowOnboarding(false);
    
    toast({
      title: "Profile Created!",
      description: "Your personalized homeownership journey has been created."
    });
  };
  
  const handleStepClick = (stepId: number) => {
    console.log(`Step ${stepId} clicked`);
    // Would navigate to the appropriate page in a full implementation
  };

  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        {showOnboarding ? (
          <OnboardingForm onComplete={handleCompleteOnboarding} />
        ) : (
          <>
            <WelcomeCard 
              username={isNewUser ? "there" : "Alex"} 
              onStartJourney={handleStartJourney}
              isNewUser={isNewUser}
            />
            
            {!isNewUser && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <ProgressTracker 
                      steps={[
                        {
                          id: 1,
                          title: "Financial Assessment",
                          description: "Complete your financial profile",
                          icon: <DollarSign size={16} />,
                          isComplete: true,
                          isActive: false
                        },
                        {
                          id: 2,
                          title: "Debt Reduction Plan",
                          description: "Create a strategy to reduce debt",
                          icon: <Percent size={16} />,
                          isComplete: false,
                          isActive: true
                        },
                        {
                          id: 3,
                          title: "Savings Builder",
                          description: "Set up your down payment savings plan",
                          icon: null,
                          isComplete: false,
                          isActive: false
                        },
                        {
                          id: 4,
                          title: "Mortgage Education",
                          description: "Learn about mortgage options",
                          icon: <Lightbulb size={16} />,
                          isComplete: false,
                          isActive: false
                        },
                        {
                          id: 5,
                          title: "Home Shopping",
                          description: "Start searching for your dream home",
                          icon: <Home size={16} />,
                          isComplete: false,
                          isActive: false
                        }
                      ]}
                      onStepClick={handleStepClick} 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FinancialSummary 
                      monthlyIncome={5000}
                      monthlyExpenses={3200}
                      savings={12000}
                      debtTotal={25000}
                      savingsGoal={30000}
                      creditScore={680}
                    />
                  </div>
                </div>
                
                <HomeInsights />
                <AIMentor />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
