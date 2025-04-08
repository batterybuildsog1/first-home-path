import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, DollarSign, Home, Lightbulb, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const PiggyBank = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
    <path d="M2 9v1c0 1.1.9 2 2 2h1" />
    <path d="M16 11h0" />
  </svg>
);

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isComplete: boolean;
  isActive: boolean;
}

interface ProgressTrackerProps {
  steps: Step[];
  onStepClick: (stepId: number) => void;
}

const defaultSteps: Step[] = [
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
    icon: <PiggyBank size={16} />,
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
];

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  steps = defaultSteps, 
  onStepClick 
}) => {
  return (
    <Card className="border-muted/30 bg-appNavy">
      <CardHeader>
        <CardTitle className="text-xl">Your Homeownership Journey</CardTitle>
        <CardDescription>Track your progress toward homeownership</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.id} className="progress-item">
              <div className={`progress-indicator ${step.isComplete ? "progress-indicator-complete" : ""}`}>
                {step.isComplete ? (
                  <Check className="h-3 w-3" />
                ) : (
                  step.icon
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-medium flex items-center gap-2">
                  {step.title}
                  {step.isActive && !step.isComplete && (
                    <span className="inline-flex items-center rounded-full bg-primary/20 px-2 py-1 text-xs text-primary">
                      <Clock className="mr-1 h-3 w-3" />
                      In Progress
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                <Button 
                  variant={step.isComplete ? "outline" : step.isActive ? "default" : "ghost"} 
                  size="sm" 
                  className="mt-1 w-fit text-xs"
                  onClick={() => onStepClick(step.id)}
                >
                  {step.isComplete ? "Review" : step.isActive ? "Continue" : "Start"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
