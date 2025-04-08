
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import PersonalInfoStep from "./PersonalInfoStep";
import FinancialInfoStep from "./FinancialInfoStep";
import DebtInfoStep from "./DebtInfoStep";
import FormNavigation from "./FormNavigation";
import { states, creditScoreRanges, initialFormData } from "./constants";
import { validateCurrentStep, calculateTotalDebt, FormData } from "./validation";

interface OnboardingFormProps {
  onComplete: (userData: any) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const isStepValid = validateCurrentStep(step, formData, toast);
    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep(step, formData, toast)) return;
    
    setIsSubmitting(true);
    
    const totalDebt = calculateTotalDebt(formData);

    const processedData = {
      ...formData,
      debt: totalDebt
    };
    
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(processedData);
      toast({
        title: "Onboarding Complete!",
        description: "Welcome to FirstHomePath. Your journey begins now!",
      });
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            states={states}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        );
      case 2:
        return (
          <FinancialInfoStep
            formData={formData}
            creditScoreRanges={creditScoreRanges}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        );
      case 3:
        return (
          <DebtInfoStep
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto border-muted/30 bg-appNavy">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to FirstHomePath</CardTitle>
        <CardDescription>
          Let's get to know you better to personalize your journey
        </CardDescription>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          <FormNavigation
            step={step}
            totalSteps={totalSteps}
            isSubmitting={isSubmitting}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;
