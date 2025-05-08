import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  Sparkles,
  GripVertical,
  Trash2,
  FileText,
} from "lucide-react";
import AIAssistDialog from "./AIAssistDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ResumeSection {
  id: string;
  type: "personal" | "experience" | "education" | "skills" | "summary";
  title: string;
  content: any;
  order: number;
}

interface ResumeEditorProps {
  onUpdate?: (sections: ResumeSection[]) => void;
}

const ResumeEditor = ({ onUpdate = () => {} }: ResumeEditorProps) => {
  const [activeTab, setActiveTab] = useState("sections");
  const [sections, setSections] = useState<ResumeSection[]>([
    {
      id: "personal",
      type: "personal",
      title: "Personal Information",
      content: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
        location: "New York, NY",
        linkedin: "linkedin.com/in/johndoe",
      },
      order: 0,
    },
    {
      id: "summary",
      type: "summary",
      title: "Professional Summary",
      content: {
        text: "Experienced software developer with 5+ years of experience in web development, specializing in React and TypeScript.",
      },
      order: 1,
    },
    {
      id: "experience-1",
      type: "experience",
      title: "Work Experience",
      content: [
        {
          id: "exp-1",
          title: "Senior Frontend Developer",
          company: "Tech Solutions Inc.",
          location: "New York, NY",
          startDate: "2020-01",
          endDate: "Present",
          description:
            "Led development of responsive web applications using React and TypeScript.",
        },
      ],
      order: 2,
    },
    {
      id: "education-1",
      type: "education",
      title: "Education",
      content: [
        {
          id: "edu-1",
          degree: "Bachelor of Science in Computer Science",
          institution: "University of Technology",
          location: "Boston, MA",
          startDate: "2012-09",
          endDate: "2016-05",
          description:
            "Graduated with honors. Specialized in software engineering.",
        },
      ],
      order: 3,
    },
    {
      id: "skills-1",
      type: "skills",
      title: "Skills",
      content: {
        skills: [
          "React",
          "TypeScript",
          "JavaScript",
          "HTML/CSS",
          "Node.js",
          "Git",
          "Agile",
        ],
      },
      order: 4,
    },
  ]);

  const [completionPercentage, setCompletionPercentage] = useState(75);

  const handleSectionUpdate = (updatedSection: ResumeSection) => {
    const updatedSections = sections.map((section) =>
      section.id === updatedSection.id ? updatedSection : section,
    );
    setSections(updatedSections);
    onUpdate(updatedSections);
    calculateCompletionPercentage(updatedSections);
  };

  const handleAddSection = (type: ResumeSection["type"]) => {
    const newId = `${type}-${Date.now()}`;
    const newOrder = Math.max(...sections.map((s) => s.order)) + 1;

    let newSection: ResumeSection;

    switch (type) {
      case "experience":
        newSection = {
          id: newId,
          type,
          title: "Work Experience",
          content: [
            {
              id: `exp-${Date.now()}`,
              title: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ],
          order: newOrder,
        };
        break;
      case "education":
        newSection = {
          id: newId,
          type,
          title: "Education",
          content: [
            {
              id: `edu-${Date.now()}`,
              degree: "",
              institution: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ],
          order: newOrder,
        };
        break;
      case "skills":
        newSection = {
          id: newId,
          type,
          title: "Skills",
          content: {
            skills: [],
          },
          order: newOrder,
        };
        break;
      case "summary":
        newSection = {
          id: newId,
          type,
          title: "Professional Summary",
          content: {
            text: "",
          },
          order: newOrder,
        };
        break;
      default:
        return;
    }

    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    onUpdate(updatedSections);
    calculateCompletionPercentage(updatedSections);
  };

  const handleRemoveSection = (id: string) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
    onUpdate(updatedSections);
    calculateCompletionPercentage(updatedSections);
  };

  const handleReorderSections = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;

    const draggedIndex = sections.findIndex(
      (section) => section.id === draggedId,
    );
    const targetIndex = sections.findIndex(
      (section) => section.id === targetId,
    );

    const updatedSections = [...sections];
    const [draggedSection] = updatedSections.splice(draggedIndex, 1);
    updatedSections.splice(targetIndex, 0, draggedSection);

    // Update order values
    const reorderedSections = updatedSections.map((section, index) => ({
      ...section,
      order: index,
    }));

    setSections(reorderedSections);
    onUpdate(reorderedSections);
  };

  const handleAIAssist = async (sectionId: string, field?: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    let updatedSection = { ...section };

    try {
      if (section.type === "summary") {
        // For summary, we'll use a pre-defined suggestion for now
        updatedSection.content = {
          text: "Results-driven software engineer with 5+ years of experience developing scalable web applications. Proficient in React, TypeScript, and Node.js with a strong focus on creating responsive, user-friendly interfaces. Passionate about clean code and optimizing application performance.",
        };
        handleSectionUpdate(updatedSection);
      } else if (section.type === "experience") {
        // For experience items, use the AIAssistDialog to generate bullet points
        const expItem = section.content.find((item: any) => item.id === field);
        if (expItem) {
          // We'll handle this in the dialog component
          // The dialog will be shown by the button click in the UI
        }
      }
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
      // In a real app, you would show an error message to the user
    }
  };

  const handleApplySuggestion = (
    sectionId: string,
    field: string,
    suggestion: string,
  ) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    if (section.type === "experience") {
      const updatedContent = section.content.map((item: any) =>
        item.id === field ? { ...item, description: suggestion } : item,
      );

      handleSectionUpdate({
        ...section,
        content: updatedContent,
      });
    } else if (section.type === "summary") {
      handleSectionUpdate({
        ...section,
        content: { text: suggestion },
      });
    }
  };

  const calculateCompletionPercentage = (currentSections: ResumeSection[]) => {
    // Simple algorithm to calculate completion - can be made more sophisticated
    let totalFields = 0;
    let completedFields = 0;

    currentSections.forEach((section) => {
      if (section.type === "personal") {
        const fields = Object.values(section.content);
        totalFields += fields.length;
        completedFields += fields.filter(
          (field) => field && field.trim() !== "",
        ).length;
      } else if (section.type === "summary") {
        totalFields += 1;
        if (section.content.text && section.content.text.trim() !== "") {
          completedFields += 1;
        }
      } else if (
        section.type === "experience" ||
        section.type === "education"
      ) {
        section.content.forEach((item: any) => {
          const fields = Object.values(item).filter(
            (val) => typeof val === "string",
          );
          totalFields += fields.length;
          completedFields += fields.filter(
            (field) => field && field.toString().trim() !== "",
          ).length;
        });
      } else if (section.type === "skills") {
        totalFields += 1;
        if (section.content.skills && section.content.skills.length > 0) {
          completedFields += 1;
        }
      }
    });

    const percentage =
      totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
    setCompletionPercentage(percentage);
  };

  const renderSectionContent = (section: ResumeSection) => {
    switch (section.type) {
      case "personal":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={section.content.name || ""}
                  onChange={(e) =>
                    handleSectionUpdate({
                      ...section,
                      content: { ...section.content, name: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={section.content.email || ""}
                  onChange={(e) =>
                    handleSectionUpdate({
                      ...section,
                      content: { ...section.content, email: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={section.content.phone || ""}
                  onChange={(e) =>
                    handleSectionUpdate({
                      ...section,
                      content: { ...section.content, phone: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={section.content.location || ""}
                  onChange={(e) =>
                    handleSectionUpdate({
                      ...section,
                      content: { ...section.content, location: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn (optional)</Label>
              <Input
                id="linkedin"
                value={section.content.linkedin || ""}
                onChange={(e) =>
                  handleSectionUpdate({
                    ...section,
                    content: { ...section.content, linkedin: e.target.value },
                  })
                }
              />
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="summary">Professional Summary</Label>
                <AIAssistDialog
                  jobTitle={
                    sections.find((s) => s.type === "personal")?.content
                      ?.title || "Professional"
                  }
                  companyName="Your Company"
                  currentDescription={section.content.text || ""}
                  onSuggestionSelect={(suggestion) =>
                    handleApplySuggestion(section.id, "", suggestion)
                  }
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-xs"
                    >
                      <Sparkles className="h-3 w-3" />
                      AI Assist
                    </Button>
                  }
                />
              </div>
              <Textarea
                id="summary"
                value={section.content.text || ""}
                onChange={(e) =>
                  handleSectionUpdate({
                    ...section,
                    content: { ...section.content, text: e.target.value },
                  })
                }
                className="min-h-[100px]"
                placeholder="Write a brief professional summary highlighting your experience and strengths..."
              />
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-6">
            {section.content.map((exp: any, index: number) => (
              <div key={exp.id} className="space-y-4 border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  {section.content.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updatedContent = section.content.filter(
                          (item: any) => item.id !== exp.id,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`job-title-${exp.id}`}>Job Title</Label>
                    <Input
                      id={`job-title-${exp.id}`}
                      value={exp.title || ""}
                      onChange={(e) => {
                        const updatedContent = section.content.map(
                          (item: any) =>
                            item.id === exp.id
                              ? { ...item, title: e.target.value }
                              : item,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input
                      id={`company-${exp.id}`}
                      value={exp.company || ""}
                      onChange={(e) => {
                        const updatedContent = section.content.map(
                          (item: any) =>
                            item.id === exp.id
                              ? { ...item, company: e.target.value }
                              : item,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`location-${exp.id}`}>Location</Label>
                    <Input
                      id={`location-${exp.id}`}
                      value={exp.location || ""}
                      onChange={(e) => {
                        const updatedContent = section.content.map(
                          (item: any) =>
                            item.id === exp.id
                              ? { ...item, location: e.target.value }
                              : item,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${exp.id}`}
                      type="month"
                      value={exp.startDate || ""}
                      onChange={(e) => {
                        const updatedContent = section.content.map(
                          (item: any) =>
                            item.id === exp.id
                              ? { ...item, startDate: e.target.value }
                              : item,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                    <Input
                      id={`end-date-${exp.id}`}
                      type="month"
                      value={exp.endDate || ""}
                      placeholder="Present"
                      onChange={(e) => {
                        const updatedContent = section.content.map(
                          (item: any) =>
                            item.id === exp.id
                              ? { ...item, endDate: e.target.value }
                              : item,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`description-${exp.id}`}>Description</Label>
                    <AIAssistDialog
                      jobTitle={exp.title || ""}
                      companyName={exp.company || ""}
                      currentDescription={exp.description || ""}
                      onSuggestionSelect={(suggestion) =>
                        handleApplySuggestion(section.id, exp.id, suggestion)
                      }
                      trigger={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-xs"
                        >
                          <Sparkles className="h-3 w-3" />
                          AI Assist
                        </Button>
                      }
                    />
                  </div>
                  <Textarea
                    id={`description-${exp.id}`}
                    value={exp.description || ""}
                    onChange={(e) => {
                      const updatedContent = section.content.map((item: any) =>
                        item.id === exp.id
                          ? { ...item, description: e.target.value }
                          : item,
                      );
                      handleSectionUpdate({
                        ...section,
                        content: updatedContent,
                      });
                    }}
                    className="min-h-[100px]"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                const newExp = {
                  id: `exp-${Date.now()}`,
                  title: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                };
                handleSectionUpdate({
                  ...section,
                  content: [...section.content, newExp],
                });
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Another Experience
            </Button>
          </div>
        );

      case "education":
        return (
          <div className="space-y-6">
            {section.content.map((edu: any, index: number) => (
              <div key={edu.id} className="space-y-4 border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Education {index + 1}</h4>
                  {section.content.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updatedContent = section.content.filter(
                          (item: any) => item.id !== edu.id,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      value={edu.degree || ""}
                      onChange={(e) => {
                        const updatedContent = section.content.map(
                          (item: any) =>
                            item.id === edu.id
                              ? { ...item, degree: e.target.value }
                              : item,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution || ""}
                      onChange={(e) => {
                        const updatedContent = section.content.map(
                          (item: any) =>
                            item.id === edu.id
                              ? { ...item, institution: e.target.value }
                              : item,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`edu-location-${edu.id}`}>Location</Label>
                    <Input
                      id={`edu-location-${edu.id}`}
                      value={edu.location || ""}
                      onChange={(e) => {
                        const updatedContent = section.content.map(
                          (item: any) =>
                            item.id === edu.id
                              ? { ...item, location: e.target.value }
                              : item,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-start-date-${edu.id}`}>
                      Start Date
                    </Label>
                    <Input
                      id={`edu-start-date-${edu.id}`}
                      type="month"
                      value={edu.startDate || ""}
                      onChange={(e) => {
                        const updatedContent = section.content.map(
                          (item: any) =>
                            item.id === edu.id
                              ? { ...item, startDate: e.target.value }
                              : item,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-end-date-${edu.id}`}>End Date</Label>
                    <Input
                      id={`edu-end-date-${edu.id}`}
                      type="month"
                      value={edu.endDate || ""}
                      onChange={(e) => {
                        const updatedContent = section.content.map(
                          (item: any) =>
                            item.id === edu.id
                              ? { ...item, endDate: e.target.value }
                              : item,
                        );
                        handleSectionUpdate({
                          ...section,
                          content: updatedContent,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-description-${edu.id}`}>
                    Description (Optional)
                  </Label>
                  <Textarea
                    id={`edu-description-${edu.id}`}
                    value={edu.description || ""}
                    onChange={(e) => {
                      const updatedContent = section.content.map((item: any) =>
                        item.id === edu.id
                          ? { ...item, description: e.target.value }
                          : item,
                      );
                      handleSectionUpdate({
                        ...section,
                        content: updatedContent,
                      });
                    }}
                    placeholder="Honors, achievements, relevant coursework..."
                  />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                const newEdu = {
                  id: `edu-${Date.now()}`,
                  degree: "",
                  institution: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                };
                handleSectionUpdate({
                  ...section,
                  content: [...section.content, newEdu],
                });
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Another Education
            </Button>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Textarea
                id="skills"
                value={(section.content.skills || []).join(", ")}
                onChange={(e) => {
                  const skillsArray = e.target.value
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean);
                  handleSectionUpdate({
                    ...section,
                    content: { skills: skillsArray },
                  });
                }}
                placeholder="React, JavaScript, TypeScript, HTML, CSS, Node.js..."
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(section.content.skills || []).map(
                (skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ),
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm w-full max-w-2xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between border-b px-6 py-2">
          <TabsList>
            <TabsTrigger value="sections">Resume Sections</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">
              {completionPercentage}% Complete
            </div>
            <Progress value={completionPercentage} className="w-24 h-2" />
          </div>
        </div>

        <TabsContent value="sections" className="p-0">
          <ScrollArea className="h-[750px] px-6 py-4">
            <div className="space-y-6">
              {sections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <Card key={section.id} className="relative">
                    <div
                      className="absolute left-2 top-4 cursor-move p-1"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", section.id);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const draggedId = e.dataTransfer.getData("text/plain");
                        handleReorderSections(draggedId, section.id);
                      }}
                    >
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex justify-between items-center p-4 border-b">
                      <h3 className="font-medium pl-7">{section.title}</h3>
                      {section.type !== "personal" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSection(section.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <CardContent className="p-4">
                      {renderSectionContent(section)}
                    </CardContent>
                  </Card>
                ))}

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Add Section</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSection("summary")}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Summary
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSection("experience")}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Experience
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSection("education")}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Education
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSection("skills")}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Skills
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="settings" className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Resume Settings</h3>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="resume-title">Resume Title</Label>
              <Input id="resume-title" placeholder="My Professional Resume" />
            </div>
            <div className="space-y-2">
              <Label>Optimization Tips</Label>
              <Card className="p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    Tip
                  </Badge>
                  <p className="text-sm">
                    Use action verbs to start bullet points in your experience
                    section.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    Tip
                  </Badge>
                  <p className="text-sm">
                    Quantify your achievements with numbers and percentages when
                    possible.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    Tip
                  </Badge>
                  <p className="text-sm">
                    Tailor your skills section to match keywords from the job
                    description.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeEditor;
