
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeCardProps {
  username?: string;
  onStartJourney: () => void;
  isNewUser?: boolean;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ 
  username = "there", 
  onStartJourney, 
  isNewUser = true 
}) => {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-appNavy to-appCharcoal overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl md:text-3xl font-bold">
          <span className="text-white">Welcome, </span>
          <span className="bg-gradient-to-r from-appBlue to-appPurple bg-clip-text text-transparent">
            {username}
          </span>
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base">
          {isNewUser
            ? "Let's start your journey to homeownership"
            : "Continue your journey to homeownership"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm md:text-base">
            FirstHomePath is your personal guide to understanding, planning, and achieving your dream of owning a home. 
            We'll help you navigate the process step by step.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onStartJourney} 
              className="bg-gradient-to-r from-appBlue to-appPurple hover:opacity-90 transition-opacity"
            >
              {isNewUser ? "Begin Your Journey" : "Continue Your Journey"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {isNewUser && (
              <Button variant="outline" className="border-primary/30 hover:bg-muted/50">
                Watch How It Works
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
