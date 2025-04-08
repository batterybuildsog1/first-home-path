
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface FormNavigationProps {
  step: number;
  totalSteps: number;
  isSubmitting: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  totalSteps,
  isSubmitting,
  handlePrevious,
  handleNext,
}) => {
  return (
    <div className="flex justify-between pt-2">
      {step > 1 ? (
        <Button type="button" variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      ) : (
        <div></div>
      )}

      {step < totalSteps ? (
        <Button type="button" onClick={handleNext}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
