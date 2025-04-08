import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import Index from "./pages/Index";
import Finances from "./pages/Finances";
import Savings from "./pages/Savings";
import Calculator from "./pages/Calculator";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import { supabase } from "@/integrations/supabase/client";

type AuthContextType = {
  user: any | null;
  isLoading: boolean;
  hasCompletedOnboarding: boolean | null;
  signOut: () => Promise<void>;
  updateOnboardingStatus: (completed: boolean) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  hasCompletedOnboarding: null,
  signOut: async () => {},
  updateOnboardingStatus: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error checking session:", error);
        setIsLoading(false);
        return;
      }
      
      if (data.session) {
        setUser(data.session.user);
        // Check if user has completed onboarding
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('has_completed_onboarding')
          .eq('user_id', data.session.user.id)
          .single();
        
        setHasCompletedOnboarding(profileData?.has_completed_onboarding || false);
      }
      
      setIsLoading(false);
    };

    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        
        // Check if user has completed onboarding
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('has_completed_onboarding')
          .eq('user_id', session.user.id)
          .single();
        
        setHasCompletedOnboarding(profileData?.has_completed_onboarding || false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setHasCompletedOnboarding(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setHasCompletedOnboarding(null);
  };

  const updateOnboardingStatus = async (completed: boolean) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('user_profiles')
      .upsert({ 
        user_id: user.id, 
        has_completed_onboarding: completed 
      });
    
    if (error) {
      console.error("Error updating onboarding status:", error);
      return;
    }
    
    setHasCompletedOnboarding(completed);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ 
        user, 
        isLoading, 
        hasCompletedOnboarding,
        signOut,
        updateOnboardingStatus
      }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              {user ? (
                <>
                  <Route path="/" element={
                    hasCompletedOnboarding ? 
                      <Dashboard /> : 
                      <Onboarding />
                  } />
                  <Route path="/finances" element={<Finances />} />
                  <Route path="/savings" element={<Savings />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </>
              ) : (
                <Route path="/" element={<Index />} />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
