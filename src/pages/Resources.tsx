
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, GraduationCap, Lightbulb, Download, ExternalLink } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Resources = () => {
  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        <div>
          <h1 className="text-2xl font-bold">Financial Education Resources</h1>
          <p className="text-muted-foreground">Learn everything you need to know about homeownership</p>
        </div>
        
        <Tabs defaultValue="guides" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Card key={guide.title} className="bg-muted/30 border-muted/30 hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 p-2 rounded-full w-fit mb-2">
                      {guide.icon}
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Reading time</span>
                        <span>{guide.readingTime} min</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" /> Read Guide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="border-muted/30 bg-gradient-to-br from-appNavy to-appCharcoal overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-semibold">First-Time Homebuyer's Handbook</h3>
                    <p className="text-muted-foreground">Download our comprehensive guide with everything you need to know about buying your first home.</p>
                  </div>
                  <Button className="bg-gradient-to-r from-appBlue to-appPurple hover:opacity-90 transition-opacity">
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.title} className="bg-muted/30 border-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Topics covered:</h4>
                      <ul className="text-sm space-y-1">
                        {course.topics.map((topic, index) => (
                          <li key={index} className="flex items-start">
                            <span className="bg-primary/20 h-4 w-4 rounded-full flex items-center justify-center mr-2 mt-0.5">
                              <span className="bg-primary h-2 w-2 rounded-full"></span>
                            </span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Start Course
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-gradient-to-br from-appPurple/20 to-appBlue/20 border-muted/30">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Lightbulb className="h-10 w-10 text-appPurple" />
                  <h3 className="text-xl font-semibold">Looking for personalized guidance?</h3>
                  <p className="text-muted-foreground max-w-xl">
                    Our premium subscribers get access to one-on-one coaching sessions with financial experts.
                  </p>
                  <Button variant="outline">
                    Learn About Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about homebuying and mortgages</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-base font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-8 bg-muted/20 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="font-medium">Still have questions?</h3>
                    <p className="text-sm text-muted-foreground">Our support team is here to help you.</p>
                  </div>
                  <Button variant="outline">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* External Resources Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">External Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {externalResources.map((resource, index) => (
              <Card key={index} className="bg-muted/30 border-muted/30">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// Data for the resources page
const guides = [
  {
    title: "Understanding Mortgages",
    description: "Learn about different types of mortgages and how they work",
    readingTime: 15,
    icon: <FileText className="h-5 w-5 text-primary" />
  },
  {
    title: "Credit Score Improvement",
    description: "Practical steps to improve your credit score quickly",
    readingTime: 12,
    icon: <FileText className="h-5 w-5 text-primary" />
  },
  {
    title: "Down Payment Strategies",
    description: "Smart ways to save for your down payment faster",
    readingTime: 10,
    icon: <FileText className="h-5 w-5 text-primary" />
  },
  {
    title: "First-Time Homebuyer Programs",
    description: "Government programs to help first-time homebuyers",
    readingTime: 20,
    icon: <FileText className="h-5 w-5 text-primary" />
  },
  {
    title: "Home Inspection Checklist",
    description: "What to look for during a home inspection",
    readingTime: 8,
    icon: <FileText className="h-5 w-5 text-primary" />
  },
  {
    title: "Closing Costs Explained",
    description: "Understanding all the fees involved in closing",
    readingTime: 15,
    icon: <FileText className="h-5 w-5 text-primary" />
  }
];

const courses = [
  {
    title: "Homebuying 101",
    description: "A beginner's course to the entire homebuying process",
    lessons: 8,
    duration: "4 hours",
    topics: [
      "Understanding the housing market",
      "Finding the right location",
      "Working with real estate agents",
      "Making an offer",
      "Home inspections",
      "Closing process"
    ]
  },
  {
    title: "Mortgage Mastery",
    description: "Everything you need to know about mortgages and financing",
    lessons: 6,
    duration: "3 hours",
    topics: [
      "Types of mortgages",
      "Pre-qualification vs. pre-approval",
      "Understanding interest rates",
      "Points and closing costs",
      "Loan application process"
    ]
  },
  {
    title: "Financial Readiness",
    description: "Prepare your finances for homeownership",
    lessons: 5,
    duration: "2.5 hours",
    topics: [
      "Debt-to-income ratios",
      "Saving for a down payment",
      "Improving your credit score",
      "Creating a housing budget",
      "Emergency fund planning"
    ]
  },
  {
    title: "Home Maintenance Essentials",
    description: "Learn how to maintain your new home properly",
    lessons: 7,
    duration: "3.5 hours",
    topics: [
      "Seasonal maintenance checklist",
      "Basic home repairs",
      "When to call a professional",
      "Budgeting for maintenance",
      "Home warranty options"
    ]
  }
];

const faqs = [
  {
    question: "How much do I need for a down payment?",
    answer: "While 20% is often cited as the standard down payment, many loan programs are available with much lower requirements. FHA loans require as little as 3.5%, VA loans can require 0% down for eligible veterans, and conventional loans may be available with as little as 3% down. Your specific situation and loan program will determine your minimum down payment."
  },
  {
    question: "What credit score do I need to buy a house?",
    answer: "Credit score requirements vary by loan type. Conventional loans typically require a minimum score of 620, FHA loans may accept scores as low as 580, and VA loans have more flexible credit requirements. However, higher credit scores will qualify you for better interest rates, potentially saving you thousands over the life of your loan."
  },
  {
    question: "How long does the homebuying process take?",
    answer: "The homebuying process typically takes 2-3 months from start to finish, but this can vary significantly. Shopping for a home might take a few weeks to several months. Once you have an accepted offer, closing typically takes 30-45 days, depending on your financing, inspections, and other factors."
  },
  {
    question: "What are closing costs?",
    answer: "Closing costs are fees associated with finalizing your mortgage and real estate transaction. These typically range from 2-5% of the loan amount and may include lender fees, appraisal fees, title insurance, attorney fees, taxes, and insurance prepayments. Your lender will provide a Loan Estimate detailing these costs."
  },
  {
    question: "What's the difference between pre-qualification and pre-approval?",
    answer: "Pre-qualification is an informal estimate of how much you might be able to borrow based on self-reported information. Pre-approval is a more formal process where the lender verifies your financial information and credit, providing a more accurate indication of the loan amount you qualify for. Pre-approval carries more weight with sellers when making offers."
  },
  {
    question: "How much home can I afford?",
    answer: "A common guideline is that your housing expenses should not exceed 28% of your gross monthly income, and your total debt payments (including your mortgage) should not exceed 36%. Use our Home Affordability Calculator to get a personalized estimate based on your income, expenses, and other financial factors."
  }
];

const externalResources = [
  {
    title: "Consumer Financial Protection Bureau",
    description: "Government resources for homebuyers and mortgage education"
  },
  {
    title: "HUD.gov",
    description: "Information on first-time homebuyer programs and assistance"
  },
  {
    title: "myFICO",
    description: "Learn about credit scores and how to improve them"
  },
  {
    title: "National Association of Realtors",
    description: "Resources and guides for homebuyers from the official realtor association"
  }
];

export default Resources;
