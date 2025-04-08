
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
  timestamp: Date;
}

const AIMentor: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your AI financial mentor. I can help answer questions about home buying, saving strategies, or improving your finances. What would you like to know?",
      role: "ai",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
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
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const aiResponses: {[key: string]: string} = {
        "mortgage": "Conventional mortgages typically require a 20% down payment to avoid PMI, but there are FHA loans that allow as little as 3.5% down. Your ideal mortgage type depends on your credit score, savings, and long-term plans.",
        "save": "The fastest way to save for a down payment is to reduce your largest expenses - consider a roommate to split rent, minimize eating out, and automate transfers to your savings account on payday.",
        "credit": "To improve your credit score quickly: pay down credit card balances below 30% utilization, don't close old accounts, check your report for errors, and ensure all payments are made on time.",
        "afford": "Rather than looking at the maximum loan you qualify for, calculate what you can comfortably afford by keeping your housing payment (including taxes and insurance) below 28% of your monthly income."
      };
      
      // Check input for keywords and provide relevant response
      let aiResponse = "I'd be happy to help with that! To give you the most personalized advice, could you provide more details about your specific situation?";
      
      const lowercaseInput = input.toLowerCase();
      for (const [keyword, response] of Object.entries(aiResponses)) {
        if (lowercaseInput.includes(keyword)) {
          aiResponse = response;
          break;
        }
      }
      
      const newAiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        role: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newAiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="border-muted/30 bg-appNavy">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-appPurple" />
          AI Financial Mentor
        </CardTitle>
        <CardDescription>
          Ask questions about finances, mortgages, or home buying
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[300px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
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
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              className="flex-1"
              placeholder="Ask about mortgages, saving strategies, or finances..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSendMessage} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIMentor;
