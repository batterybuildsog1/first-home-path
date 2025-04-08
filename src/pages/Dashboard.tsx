
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import ProgressTracker from "@/components/dashboard/ProgressTracker";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import HomeInsights from "@/components/dashboard/HomeInsights";
import AIMentor from "@/components/dashboard/AIMentor";
import { useToast } from "@/hooks/use-toast";
import { useAuth, supabase } from "../App";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isAIFullScreen, setIsAIFullScreen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user data from Supabase
  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (!user) return;
        
        // Get user profile data
        const { data: financialData, error } = await supabase
          .from('financial_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error) throw error;
        
        setUserData(financialData);
      } catch (error) {
        console.error("Error loading user data:", error);
        toast({
          title: "Error loading profile",
          description: "There was a problem loading your profile data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user, toast]);
  
  const handleStartJourney = () => {
    toast({
      title: "Welcome back!",
      description: "Continue your journey to homeownership."
    });
  };
  
  const handleStepClick = (stepId: number) => {
    console.log(`Step ${stepId} clicked`);
    // Would navigate to the appropriate page in a full implementation
    switch (stepId) {
      case 1:
        toast({
          title: "Financial Assessment",
          description: "Your financial profile is complete."
        });
        break;
      case 2:
        // Navigate to finances
        window.location.href = "/finances";
        break;
      case 3:
        // Navigate to savings
        window.location.href = "/savings";
        break;
      case 4:
        // Navigate to calculator
        window.location.href = "/calculator";
        break;
      default:
        break;
    }
  };

  const toggleAIFullScreen = () => {
    setIsAIFullScreen(!isAIFullScreen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-appNavy flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        <WelcomeCard 
          username={user?.user_metadata?.name || user?.email?.split('@')[0] || "there"} 
          onStartJourney={handleStartJourney}
          isNewUser={false}
        />
        
        {isAIFullScreen ? (
          <div className="animate-fade-in">
            <AIMentor isFullScreen={isAIFullScreen} onToggleFullScreen={toggleAIFullScreen} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <ProgressTracker 
                  steps={[
                    {
                      id: 1,
                      title: "Financial Assessment",
                      description: "Complete your financial profile",
                      icon: null,
                      isComplete: true,
                      isActive: false
                    },
                    {
                      id: 2,
                      title: "Debt Reduction Plan",
                      description: "Create a strategy to reduce debt",
                      icon: null,
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
                      icon: null,
                      isComplete: false,
                      isActive: false
                    },
                    {
                      id: 5,
                      title: "Home Shopping",
                      description: "Start searching for your dream home",
                      icon: null,
                      isComplete: false,
                      isActive: false
                    }
                  ]}
                  onStepClick={handleStepClick} 
                />
              </div>
              <div className="md:col-span-2">
                <FinancialSummary 
                  monthlyIncome={userData?.income || 0}
                  monthlyExpenses={userData?.total_debt || 0}
                  savings={userData?.savings || 0}
                  debtTotal={userData?.total_debt || 0}
                  savingsGoal={userData?.savings_goal || 30000}
                  creditScore={userData?.credit_score?.replace(/[^0-9-]/g, '') || "680"}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <AIMentor isFullScreen={isAIFullScreen} onToggleFullScreen={toggleAIFullScreen} />
              <HomeInsights />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
