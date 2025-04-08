
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

interface FinancialInfoStepProps {
  formData: {
    income: string;
    savings: string;
    creditScore: string;
  };
  creditScoreRanges: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
}

const FinancialInfoStep: React.FC<FinancialInfoStepProps> = ({
  formData,
  creditScoreRanges,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="income">What's your annual income?</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Income information</span>
                </span>
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
  );
};

export default FinancialInfoStep;
