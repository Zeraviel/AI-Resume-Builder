import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  GripVertical,
  Trash2,
  Edit,
  Sparkles,
  Plus,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeSectionProps {
  type:
    | "experience"
    | "education"
    | "skills"
    | "summary"
    | "projects"
    | "certifications";
  title?: string;
  content?: any;
  onDelete?: () => void;
  onEdit?: (content: any) => void;
  onMove?: (direction: "up" | "down") => void;
  onAiSuggestion?: () => void;
}

const ResumeSection = ({
  type = "experience",
  title = "Experience",
  content = getDefaultContent("experience"),
  onDelete = () => {},
  onEdit = () => {},
  onMove = () => {},
  onAiSuggestion = () => {},
}: ResumeSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onEdit(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const renderContent = () => {
    if (isEditing) {
      return renderEditForm();
    }

    switch (type) {
      case "experience":
        return renderExperienceContent();
      case "education":
        return renderEducationContent();
      case "skills":
        return renderSkillsContent();
      case "summary":
        return renderSummaryContent();
      case "projects":
        return renderProjectsContent();
      case "certifications":
        return renderCertificationsContent();
      default:
        return <div>Unknown section type</div>;
    }
  };

  const renderEditForm = () => {
    switch (type) {
      case "experience":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Company</label>
              <Input
                value={editedContent.company}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    company: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Position</label>
              <Input
                value={editedContent.position}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    position: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  value={editedContent.startDate}
                  onChange={(e) =>
                    setEditedContent({
                      ...editedContent,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <Input
                  value={editedContent.endDate}
                  onChange={(e) =>
                    setEditedContent({
                      ...editedContent,
                      endDate: e.target.value,
                    })
                  }
                  placeholder="Present (if current)"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={editedContent.description}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    description: e.target.value,
                  })
                }
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
            </div>
          </div>
        );
      case "education":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Institution</label>
              <Input
                value={editedContent.institution}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    institution: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Degree</label>
              <Input
                value={editedContent.degree}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, degree: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  value={editedContent.startDate}
                  onChange={(e) =>
                    setEditedContent({
                      ...editedContent,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <Input
                  value={editedContent.endDate}
                  onChange={(e) =>
                    setEditedContent({
                      ...editedContent,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">GPA/Achievements</label>
              <Textarea
                value={editedContent.achievements}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    achievements: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Skills (comma separated)
              </label>
              <Textarea
                value={editedContent.skills.join(", ")}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    skills: e.target.value
                      .split(",")
                      .map((s: string) => s.trim()),
                  })
                }
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
            </div>
          </div>
        );
      case "summary":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Professional Summary
              </label>
              <Textarea
                value={editedContent.summary}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    summary: e.target.value,
                  })
                }
                rows={5}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Project Name</label>
              <Input
                value={editedContent.name}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Input
                value={editedContent.role}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, role: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input
                value={editedContent.date}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={editedContent.description}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    description: e.target.value,
                  })
                }
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
            </div>
          </div>
        );
      case "certifications":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Certification Name</label>
              <Input
                value={editedContent.name}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Issuing Organization
              </label>
              <Input
                value={editedContent.issuer}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, issuer: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input
                value={editedContent.date}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, date: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
            </div>
          </div>
        );
      default:
        return <div>Unknown section type</div>;
    }
  };

  const renderExperienceContent = () => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{content.position}</h4>
          <p className="text-sm text-muted-foreground">{content.company}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {content.startDate} - {content.endDate || "Present"}
        </div>
      </div>
      <p className="text-sm">{content.description}</p>
    </div>
  );

  const renderEducationContent = () => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{content.institution}</h4>
          <p className="text-sm text-muted-foreground">{content.degree}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {content.startDate} - {content.endDate}
        </div>
      </div>
      <p className="text-sm">{content.achievements}</p>
    </div>
  );

  const renderSkillsContent = () => (
    <div className="flex flex-wrap gap-2">
      {content.skills.map((skill: string, index: number) => (
        <Badge key={index} variant="secondary">
          {skill}
        </Badge>
      ))}
    </div>
  );

  const renderSummaryContent = () => (
    <p className="text-sm">{content.summary}</p>
  );

  const renderProjectsContent = () => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{content.name}</h4>
          <p className="text-sm text-muted-foreground">{content.role}</p>
        </div>
        <div className="text-sm text-muted-foreground">{content.date}</div>
      </div>
      <p className="text-sm">{content.description}</p>
    </div>
  );

  const renderCertificationsContent = () => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{content.name}</h4>
          <p className="text-sm text-muted-foreground">{content.issuer}</p>
        </div>
        <div className="text-sm text-muted-foreground">{content.date}</div>
      </div>
    </div>
  );

  return (
    <Card className="bg-white mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="cursor-move p-1 rounded hover:bg-gray-100">
            <GripVertical className="h-4 w-4 text-gray-500" />
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onAiSuggestion}
            title="Get AI suggestions"
          >
            <Sparkles className="h-4 w-4 text-blue-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            title="Edit section"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            title="Delete section"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">{renderContent()}</CardContent>
    </Card>
  );
};

const getDefaultContent = (type: string) => {
  switch (type) {
    case "experience":
      return {
        company: "Company Name",
        position: "Job Title",
        startDate: "Jan 2020",
        endDate: "Present",
        description:
          "Describe your responsibilities and achievements in this role.",
      };
    case "education":
      return {
        institution: "University Name",
        degree: "Degree / Field of Study",
        startDate: "2016",
        endDate: "2020",
        achievements: "GPA: 3.8/4.0, Dean's List, Relevant Coursework",
      };
    case "skills":
      return {
        skills: ["JavaScript", "React", "Node.js", "CSS", "HTML", "Git"],
      };
    case "summary":
      return {
        summary:
          "Experienced software developer with a passion for creating user-friendly applications. Skilled in JavaScript, React, and Node.js with 5+ years of industry experience.",
      };
    case "projects":
      return {
        name: "Project Name",
        role: "Developer",
        date: "2021",
        description:
          "Describe the project, your role, and the technologies used.",
      };
    case "certifications":
      return {
        name: "Certification Name",
        issuer: "Issuing Organization",
        date: "June 2022",
      };
    default:
      return {};
  }
};

export default ResumeSection;
