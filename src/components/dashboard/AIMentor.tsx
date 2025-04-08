
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Send, MessageSquare, ThumbsUp, ThumbsDown, Lightbulb, FileText, ArrowRight, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { chatWithGemini } from "@/services/geminiService";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
  timestamp: Date;
}

interface FinancialTip {
  id: number;
  title: string;
  description: string;
  category: "savings" | "debt" | "mortgage" | "credit";
}

const AIMentor: React.FC = () => {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your AI financial mentor powered by Gemini 2.5 Pro. I can help answer questions about home buying, saving strategies, or improving your finances. What would you like to know?",
      role: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFinancialReport, setShowFinancialReport] = useState(false);
  const [useSearchGrounding, setUseSearchGrounding] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample financial tips
  const financialTips: FinancialTip[] = [
    {
      id: 1,
      title: "Down Payment Savings",
      description: "Consider opening a high-yield savings account specifically for your down payment. Automating transfers on payday can help you save consistently.",
      category: "savings"
    },
    {
      id: 2,
      title: "Debt-to-Income Ratio",
      description: "Lenders typically prefer your DTI ratio to be below 36%. Focus on paying down high-interest debt to improve your mortgage eligibility.",
      category: "debt"
    },
    {
      id: 3,
      title: "Credit Score Boost",
      description: "Pay down credit card balances to below 30% of your credit limit to see a quick improvement in your credit score.",
      category: "credit"
    },
    {
      id: 4,
      title: "First-Time Homebuyer Programs",
      description: "Many states offer down payment assistance for first-time buyers. These programs can help you get into a home with less savings.",
      category: "mortgage"
    },
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAnalyzing(true);
    
    // Convert messages for Gemini API format
    const messageHistory = messages
      .filter(msg => msg.id !== "welcome") // Skip welcome message if needed
      .map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        content: msg.content
      }));
    
    // Add the current user message
    messageHistory.push({
      role: "user",
      content: input
    });
    
    try {
      // Get response from Gemini
      const aiResponse = await chatWithGemini(messageHistory, useSearchGrounding);
      
      const newAiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        role: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Error with AI response:", error);
      
      // Fallback message in case of error
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        role: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeedback = (isPositive: boolean) => {
    toast({
      title: isPositive ? "Feedback Received" : "We'll Improve",
      description: isPositive 
        ? "Thank you for your positive feedback!" 
        : "Thank you for helping us improve our recommendations."
    });
  };

  const runFinancialAnalysis = () => {
    setShowFinancialReport(true);
  };

  return (
    <Card className="border-muted/30 bg-appNavy">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-appPurple" />
          AI Financial Mentor
        </CardTitle>
        <CardDescription className="flex justify-between items-center">
          <span>Ask questions about finances, mortgages, or home buying</span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center gap-1"
            onClick={runFinancialAnalysis}
          >
            <Lightbulb className="h-3 w-3" />
            <span>Get Personalized Analysis</span>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[340px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.role === "ai" && (
                    <div className="flex justify-end gap-2 mt-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => handleFeedback(true)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => handleFeedback(false)}
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAnalyzing && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted text-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-appPurple rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-appPurple rounded-full animate-pulse delay-150"></div>
                    <div className="h-2 w-2 bg-appPurple rounded-full animate-pulse delay-300"></div>
                    <span className="text-xs text-muted-foreground">Analyzing your question with Gemini...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {financialTips.length > 0 && (
            <>
              <Separator className="mb-4" />
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Lightbulb className="h-3 w-3 text-yellow-500" />
                  Personalized Financial Tips
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {financialTips.slice(0, 2).map((tip) => (
                    <div key={tip.id} className="bg-muted/20 p-2 rounded-md">
                      <p className="text-xs font-medium">{tip.title}</p>
                      <p className="text-xs text-muted-foreground">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-2">
              <Switch
                id="search-grounding"
                checked={useSearchGrounding}
                onCheckedChange={setUseSearchGrounding}
              />
              <Label htmlFor="search-grounding" className="text-xs flex items-center gap-1">
                <Search className="h-3 w-3" />
                Enable web search for up-to-date information
              </Label>
            </div>
            
            <div className="flex gap-2">
              <Input
                className="flex-1"
                placeholder="Ask about mortgages, saving strategies, or finances..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isAnalyzing}
              />
              <Button onClick={handleSendMessage} disabled={!input.trim() || isAnalyzing}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Dialog open={showFinancialReport} onOpenChange={setShowFinancialReport}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Your Personalized Financial Analysis</DialogTitle>
              <DialogDescription>
                Based on your financial profile, we've generated these insights and recommendations
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Homeownership Readiness Score: 68/100</h3>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className="h-2 bg-appPurple rounded-full" style={{ width: "68%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground">You're on your way! Your financial profile suggests you're making good progress toward homeownership.</p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-appPurple" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                        <ThumbsUp className="h-3 w-3 text-green-500" />
                      </div>
                      <span>Consistent income history</span>
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                        <ThumbsUp className="h-3 w-3 text-green-500" />
                      </div>
                      <span>Good credit score (680)</span>
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                        <ThumbsUp className="h-3 w-3 text-green-500" />
                      </div>
                      <span>Established savings habit</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-appPurple" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5">
                        <ArrowRight className="h-3 w-3 text-yellow-500" />
                      </div>
                      <span>Debt-to-income ratio slightly high (42%)</span>
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5">
                        <ArrowRight className="h-3 w-3 text-yellow-500" />
                      </div>
                      <span>Down payment savings below target (40%)</span>
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5">
                        <ArrowRight className="h-3 w-3 text-yellow-500" />
                      </div>
                      <span>Credit utilization could be lower</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium">Personalized Action Plan</h4>
                <ol className="space-y-2">
                  <li className="text-sm">
                    <span className="font-medium">Next 30 days:</span> Reduce credit card balances by $1,500 to lower utilization below 30%
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Next 90 days:</span> Increase monthly savings by $400 by reducing discretionary spending
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Next 6 months:</span> Pay off auto loan to improve debt-to-income ratio
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Next 12 months:</span> Research first-time homebuyer programs in your area
                  </li>
                </ol>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFinancialReport(false)}>Close</Button>
              <Button>Save Action Plan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AIMentor;
