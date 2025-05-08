import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Download, Settings, HelpCircle } from "lucide-react";
import ResumeEditor from "./resume/ResumeEditor";
import ResumePreview from "./resume/ResumePreview";
import TemplateSelector from "./resume/TemplateSelector";

const Home = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const [progress, setProgress] = useState(35); // Example progress percentage
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      location: "New York, NY",
      title: "Software Engineer",
    },
    sections: [
      {
        id: "1",
        type: "experience",
        items: [
          {
            id: "exp1",
            title: "Software Engineer",
            organization: "Tech Company Inc.",
            location: "San Francisco, CA",
            startDate: "2020-01",
            endDate: "Present",
            description:
              "Developed and maintained web applications using React and Node.js.",
          },
        ],
      },
      {
        id: "2",
        type: "education",
        items: [
          {
            id: "edu1",
            degree: "Bachelor of Science in Computer Science",
            institution: "University of Technology",
            location: "Boston, MA",
            startDate: "2016-09",
            endDate: "2020-05",
            description:
              "Graduated with honors. Specialized in software engineering.",
          },
        ],
      },
      {
        id: "3",
        type: "skills",
        items: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS"],
      },
    ],
    selectedTemplate: "modern",
    customization: {
      primaryColor: "#2563eb",
      fontFamily: "Inter",
      fontSize: "medium",
    },
  });

  const handleUpdateResume = (updatedData) => {
    setResumeData(updatedData);
    // Calculate new progress based on completeness
    const newProgress = calculateProgress(updatedData);
    setProgress(newProgress);
  };

  const calculateProgress = (data) => {
    // Simple progress calculation logic (would be more sophisticated in a real app)
    let total = 0;
    let filled = 0;

    // Check personal info
    const personalInfoFields = Object.keys(data.personalInfo).length;
    const filledPersonalInfo = Object.values(data.personalInfo).filter(
      (val) => val && val.trim() !== "",
    ).length;

    total += personalInfoFields;
    filled += filledPersonalInfo;

    // Check sections
    data.sections.forEach((section) => {
      if (section.type === "skills") {
        total += 1;
        filled += section.items.length > 0 ? 1 : 0;
      } else {
        section.items.forEach((item) => {
          const itemFields = Object.keys(item).length - 1; // Subtract 1 for the id field
          const filledItemFields = Object.entries(item).filter(
            ([key, val]) => key !== "id" && val && val.toString().trim() !== "",
          ).length;

          total += itemFields;
          filled += filledItemFields;
        });
      }
    });

    return Math.round((filled / total) * 100);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-xl text-primary">ResumeBuilder</div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Resume
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">Resume Completion</h2>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Template Selector */}
          <div className="col-span-12 md:col-span-3">
            <Card className="h-full">
              <CardContent className="p-4">
                <TemplateSelector
                  selectedTemplate={resumeData.selectedTemplate}
                  customization={resumeData.customization}
                  onTemplateChange={(template) =>
                    handleUpdateResume({
                      ...resumeData,
                      selectedTemplate: template,
                    })
                  }
                  onCustomizationChange={(customization) =>
                    handleUpdateResume({ ...resumeData, customization })
                  }
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 md:col-span-9">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <ResumeEditor
                      resumeData={resumeData}
                      onUpdate={handleUpdateResume}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <ResumePreview
                      resumeData={resumeData}
                      progress={progress}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © 2023 ResumeBuilder. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
