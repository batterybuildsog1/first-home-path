
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  User, 
  Settings, 
  Bell, 
  Shield, 
  LogOut,
  PlusCircle,
  Pencil
} from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved."
    });
  };
  
  return (
    <div className="min-h-screen bg-appNavy flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4 md:px-6 space-y-8 pb-20 md:pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">AS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">Alex Smith</span>
              <span className="text-sm text-muted-foreground">Premium Member</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="finances" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Finances</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Preferences</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : (
                    <>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        disabled={!isEditing}
                        defaultValue="Alex"
                        className="bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        disabled={!isEditing}
                        defaultValue="Smith"
                        className="bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        disabled={!isEditing}
                        defaultValue="alex.smith@example.com"
                        type="email"
                        className="bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        disabled={!isEditing}
                        defaultValue="(555) 123-4567"
                        type="tel"
                        className="bg-muted/50"
                      />
                    </div>
                  </div>
                  
                  <Separator className="bg-muted/50" />
                  
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      disabled={!isEditing}
                      defaultValue="123 Main Street"
                      className="bg-muted/50"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        disabled={!isEditing}
                        defaultValue="San Francisco"
                        className="bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input
                        disabled={!isEditing}
                        defaultValue="CA"
                        className="bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ZIP Code</Label>
                      <Input
                        disabled={!isEditing}
                        defaultValue="94105"
                        className="bg-muted/50"
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
            
            <Card className="border-muted/30 bg-appNavy mt-6">
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage your connected financial accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Chase Bank</p>
                        <p className="text-sm text-muted-foreground">Connected 3 months ago</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Robinhood</p>
                        <p className="text-sm text-muted-foreground">Connected 1 month ago</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                      Active
                    </Badge>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Connect New Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Placeholder for other tabs */}
          <TabsContent value="finances">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
                <CardDescription>Manage your financial details and connected accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Financial information tab content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Notification settings tab content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and authentication methods</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Security settings tab content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card className="border-muted/30 bg-appNavy">
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Preferences tab content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
