
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface DebtInfoStepProps {
  formData: {
    debtCarPayment: string;
    debtCreditCards: string;
    debtStudentLoans: string;
    debtPersonalLoans: string;
    debtOther: string;
    homeGoal: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
}

const DebtInfoStep: React.FC<DebtInfoStepProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <Label className="text-base font-medium mb-3 block">
          What are your monthly debt payments?
        </Label>
        <p className="text-sm text-muted-foreground mb-4">
          Enter 0 if you don't have a particular type of debt
        </p>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="debtCarPayment" className="text-sm">Car Payment</Label>
            <Input
              id="debtCarPayment"
              name="debtCarPayment"
              placeholder="$ 0"
              value={formData.debtCarPayment}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="debtCreditCards" className="text-sm">Credit Card Payments (minimum monthly)</Label>
            <Input
              id="debtCreditCards"
              name="debtCreditCards"
              placeholder="$ 0"
              value={formData.debtCreditCards}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="debtStudentLoans" className="text-sm">Student Loan Payments</Label>
            <Input
              id="debtStudentLoans"
              name="debtStudentLoans"
              placeholder="$ 0"
              value={formData.debtStudentLoans}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="debtPersonalLoans" className="text-sm">Personal Loan Payments</Label>
            <Input
              id="debtPersonalLoans"
              name="debtPersonalLoans"
              placeholder="$ 0"
              value={formData.debtPersonalLoans}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="debtOther" className="text-sm">Other Monthly Debt</Label>
            <Input
              id="debtOther"
              name="debtOther"
              placeholder="$ 0"
              value={formData.debtOther}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="homeGoal">When would you like to buy a home?</Label>
        <TooltipProvider>
          <div className="flex items-center gap-2">
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
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Timeline information</span>
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>This helps us personalize your homebuying journey and set appropriate milestones for your dashboard.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DebtInfoStep;
