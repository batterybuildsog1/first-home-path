
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

interface PersonalInfoStepProps {
  formData: {
    name: string;
    email: string;
    city: string;
    state: string;
    zipCode: string;
  };
  states: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  states,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
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
  );
};

export default PersonalInfoStep;
