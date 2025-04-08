
import { useToast } from "@/hooks/use-toast";

export interface FormData {
  name: string;
  email: string;
  income: string;
  savings: string;
  creditScore: string;
  debtCarPayment: string;
  debtCreditCards: string;
  debtStudentLoans: string;
  debtPersonalLoans: string;
  debtOther: string;
  homeGoal: string;
  city: string;
  state: string;
  zipCode: string;
}

export const validateCurrentStep = (
  step: number, 
  formData: FormData, 
  toast: ReturnType<typeof useToast>["toast"]
) => {
  if (step === 1) {
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and email to continue.",
        variant: "destructive",
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please provide a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      toast({
        title: "Invalid Zip Code",
        description: "Please enter a valid 5-digit zip code.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.city && !formData.zipCode) {
      toast({
        title: "Location Required",
        description: "Please provide either a city or zip code for your home search area.",
        variant: "destructive",
      });
      return false;
    }
  } else if (step === 2) {
    if (!formData.income || !formData.savings || !formData.creditScore) {
      toast({
        title: "Missing Financial Information",
        description: "Please complete all financial fields to continue.",
        variant: "destructive",
      });
      return false;
    }
  } else if (step === 3) {
    if (!formData.debtCarPayment && 
        !formData.debtCreditCards && 
        !formData.debtStudentLoans && 
        !formData.debtPersonalLoans && 
        !formData.debtOther) {
      toast({
        title: "Debt Information Required",
        description: "Please provide your monthly debt payments (or enter 0 if none).",
        variant: "destructive",
      });
      return false;
    }
  }
  return true;
};

export const calculateTotalDebt = (formData: FormData) => {
  const total = [
    formData.debtCarPayment || "0",
    formData.debtCreditCards || "0",
    formData.debtStudentLoans || "0", 
    formData.debtPersonalLoans || "0",
    formData.debtOther || "0"
  ].map(val => parseFloat(val.replace(/[$,]/g, "")) || 0)
   .reduce((sum, val) => sum + val, 0)
   .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
   .replace(/\.00$/, '');

  return total;
};
