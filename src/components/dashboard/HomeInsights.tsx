
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeInsightProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLabel: string;
  onAction: () => void;
}

const HomeInsightCard: React.FC<HomeInsightProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction
}) => {
  return (
    <Card className="border-muted/30 bg-appNavy card-hover-effect">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <Button variant="outline" size="sm" onClick={onAction} className="w-full">
              {actionLabel}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const HomeInsights: React.FC = () => {
  const handleAction = (action: string) => {
    console.log(`Action clicked: ${action}`);
  };

  return (
    <Card className="border-muted/30 bg-appNavy">
      <CardHeader>
        <CardTitle className="text-xl">Home Buying Insights</CardTitle>
        <CardDescription>Key insights to help you on your journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <HomeInsightCard
            title="Affordability Update"
            description="Based on your finances, you could afford a $225,000 home."
            icon={<Home className="h-5 w-5" />}
            actionLabel="See Details"
            onAction={() => handleAction("affordability")}
          />
          <HomeInsightCard
            title="Market Trends"
            description="Housing prices in your area increased 2.3% this month."
            icon={<TrendingUp className="h-5 w-5" />}
            actionLabel="View Trends"
            onAction={() => handleAction("market")}
          />
          <HomeInsightCard
            title="Timeline Estimate"
            description="At your current pace, you could be ready to buy in 18 months."
            icon={<Calendar className="h-5 w-5" />}
            actionLabel="View Timeline"
            onAction={() => handleAction("timeline")}
          />
          <HomeInsightCard
            title="Saving Opportunity"
            description="Reducing your streaming services could save $40/month."
            icon={<DollarSign className="h-5 w-5" />}
            actionLabel="See More Tips"
            onAction={() => handleAction("savings")}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeInsights;
