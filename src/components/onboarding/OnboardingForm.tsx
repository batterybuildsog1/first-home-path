
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Loader2, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OnboardingFormProps {
  onComplete: (userData: any) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    income: "",
    savings: "",
    creditScore: "620-639",
    debt: "",
    homeGoal: "6-12 months",
    city: "",
    state: "",
    zipCode: ""
  });

  // List of US states for the dropdown
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  // Credit score ranges
  const creditScoreRanges = [
    "Below 550",
    "550-579",
    "580-599",
    "600-619",
    "620-639",
    "640-659",
    "660-679",
    "680-699",
    "700-719",
    "720-739",
    "740-759",
    "760-779",
    "780-799",
    "800+"
  ];

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
    const isStepValid = validateStep();
    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const validateStep = () => {
    // Basic validation for each step
    if (step === 1) {
      if (!formData.name || !formData.email) {
        toast({
          title: "Missing Information",
          description: "Please provide your name and email to continue.",
          variant: "destructive",
        });
        return false;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please provide a valid email address.",
          variant: "destructive",
        });
        return false;
      }
      
      // Validate location fields
      if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
        toast({
          title: "Invalid Zip Code",
          description: "Please enter a valid 5-digit zip code.",
          variant: "destructive",
        });
        return false;
      }
      
      // Require at least city or zip code
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
      // This validation was missing for the final step
      if (!formData.debt) {
        toast({
          title: "Missing Debt Information",
          description: "Please provide your monthly debt payments to continue.",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Important: Validate the current step before submission
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(formData);
      toast({
        title: "Onboarding Complete!",
        description: "Welcome to FirstHomePath. Your journey begins now!",
      });
    }, 1500);
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
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Where are you looking to buy a home?</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="city" className="text-xs">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="state" className="text-xs">State</Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => handleSelectChange("state", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <Label htmlFor="zipCode" className="text-xs">Zip Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      placeholder="12345"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      maxLength={5}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="income">What's your annual income?</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                          <HelpCircle className="h-4 w-4" />
                          <span className="sr-only">Income information</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>For mortgage purposes, this is your income AND your co-borrower, spouse, significant other or non-occupant co-borrower, etc.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="income"
                  name="income"
                  placeholder="$ 60,000"
                  value={formData.income}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="savings">How much do you have saved for a down payment?</Label>
                <Input
                  id="savings"
                  name="savings"
                  placeholder="$ 10,000"
                  value={formData.savings}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creditScore">What's your credit score range?</Label>
                <Select 
                  value={formData.creditScore} 
                  onValueChange={(value) => handleSelectChange("creditScore", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select credit score range" />
                  </SelectTrigger>
                  <SelectContent>
                    {creditScoreRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="debt">What's your total monthly debt payments?</Label>
                <Input
                  id="debt"
                  name="debt"
                  placeholder="$ 1,000"
                  value={formData.debt}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="homeGoal">When would you like to buy a home?</Label>
                <Select 
                  value={formData.homeGoal} 
                  onValueChange={(value) => handleSelectChange("homeGoal", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-6 months">0-6 months</SelectItem>
                    <SelectItem value="6-12 months">6-12 months</SelectItem>
                    <SelectItem value="1-2 years">1-2 years</SelectItem>
                    <SelectItem value="2+ years">2+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-2">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : (
              <div></div> // Empty div to maintain spacing
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
        </form>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;
