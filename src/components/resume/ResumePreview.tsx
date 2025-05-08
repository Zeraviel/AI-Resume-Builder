import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  FileType,
} from "lucide-react";

interface ResumePreviewProps {
  template?: string;
  content?: {
    personalInfo?: {
      name?: string;
      email?: string;
      phone?: string;
      location?: string;
      title?: string;
    };
    summary?: string;
    experience?: Array<{
      company?: string;
      position?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
    }>;
    education?: Array<{
      institution?: string;
      degree?: string;
      field?: string;
      startDate?: string;
      endDate?: string;
    }>;
    skills?: string[];
  };
  progress?: number;
  optimizationTips?: string[];
  atsScore?: number;
  keywordMatches?: { matched: string[]; missing: string[] };
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  template = "modern",
  content = {
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "New York, NY",
      title: "Senior Software Engineer",
    },
    summary:
      "Experienced software engineer with 8+ years of experience in full-stack development, specializing in React, Node.js, and cloud infrastructure.",
    experience: [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        startDate: "Jan 2020",
        endDate: "Present",
        description:
          "Lead developer for customer-facing web applications. Improved site performance by 40% and implemented CI/CD pipeline.",
      },
      {
        company: "Digital Innovations",
        position: "Software Developer",
        startDate: "Mar 2017",
        endDate: "Dec 2019",
        description:
          "Developed and maintained multiple web applications using React and Node.js.",
      },
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "Sep 2013",
        endDate: "Jun 2017",
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "AWS",
      "Docker",
      "CI/CD",
      "Agile Methodologies",
    ],
  },
  progress = 75,
  optimizationTips = [
    "Add more quantifiable achievements to your experience",
    "Include relevant certifications",
    "Tailor your skills section to the job description",
  ],
  atsScore = 75,
  keywordMatches = {
    matched: ["React", "JavaScript", "TypeScript", "Node.js"],
    missing: ["Redux", "GraphQL", "AWS"],
  },
}) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex justify-between items-center mb-4 p-4 bg-white border-b">
        <div>
          <h3 className="text-lg font-medium">Resume Preview</h3>
          <div className="flex items-center mt-1">
            <Progress value={progress} className="w-40 h-2 mr-2" />
            <span className="text-sm text-gray-500">{progress}% Complete</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end mr-4">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">ATS Score:</span>
              <Badge variant={atsScore >= 70 ? "default" : "destructive"}>
                {atsScore}%
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => window.alert("Exporting as PDF...")}
                className="flex items-center cursor-pointer"
              >
                <FileText className="w-4 h-4 mr-2" /> Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.alert("Exporting as DOCX...")}
                className="flex items-center cursor-pointer"
              >
                <FileText className="w-4 h-4 mr-2" /> Export as DOCX
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.alert("Exporting as TXT...")}
                className="flex items-center cursor-pointer"
              >
                <FileType className="w-4 h-4 mr-2" /> Export as Plain Text
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Card className="w-full bg-white shadow-md">
          <CardContent
            className={`p-6 ${template === "modern" ? "font-sans" : template === "classic" ? "font-serif" : "font-mono"}`}
          >
            {/* Personal Info Section */}
            <div
              className={`mb-6 ${template === "modern" ? "border-l-4 border-primary pl-4" : template === "classic" ? "text-center" : ""}`}
            >
              <h1 className="text-2xl font-bold text-gray-900">
                {content.personalInfo?.name}
              </h1>
              <p className="text-lg text-gray-700">
                {content.personalInfo?.title}
              </p>
              <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                {content.personalInfo?.email && (
                  <span>{content.personalInfo.email}</span>
                )}
                {content.personalInfo?.phone && (
                  <span>• {content.personalInfo.phone}</span>
                )}
                {content.personalInfo?.location && (
                  <span>• {content.personalInfo.location}</span>
                )}
              </div>
            </div>

            {/* Summary Section */}
            {content.summary && (
              <div className="mb-6">
                <h2
                  className={`text-lg font-semibold mb-2 ${template === "modern" ? "text-primary" : ""}`}
                >
                  Professional Summary
                </h2>
                <p className="text-gray-700">{content.summary}</p>
              </div>
            )}

            {/* Experience Section */}
            {content.experience && content.experience.length > 0 && (
              <div className="mb-6">
                <h2
                  className={`text-lg font-semibold mb-3 ${template === "modern" ? "text-primary" : ""}`}
                >
                  Experience
                </h2>
                {content.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700">{exp.company}</p>
                    <p className="mt-1 text-sm text-gray-600">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {content.education && content.education.length > 0 && (
              <div className="mb-6">
                <h2
                  className={`text-lg font-semibold mb-3 ${template === "modern" ? "text-primary" : ""}`}
                >
                  Education
                </h2>
                {content.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">
                        {edu.institution}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {edu.degree} in {edu.field}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Section */}
            {content.skills && content.skills.length > 0 && (
              <div>
                <h2
                  className={`text-lg font-semibold mb-2 ${template === "modern" ? "text-primary" : ""}`}
                >
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {content.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant={template === "modern" ? "default" : "outline"}
                      className="text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ATS Optimization Section */}
      <div className="p-4 bg-white border-t">
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1 text-amber-500" />
            ATS Optimization
          </h4>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">
              ATS Compatibility Score
            </span>
            <span className="text-xs font-medium">{atsScore}%</span>
          </div>
          <Progress value={atsScore} className="h-1.5" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h5 className="text-xs font-medium mb-1 text-green-600">
              Matched Keywords
            </h5>
            <div className="flex flex-wrap gap-1">
              {keywordMatches.matched.map((keyword, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs bg-green-50 text-green-700 border-green-200"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-xs font-medium mb-1 text-red-600">
              Missing Keywords
            </h5>
            <div className="flex flex-wrap gap-1">
              {keywordMatches.missing.map((keyword, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs bg-red-50 text-red-700 border-red-200"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Optimization Tips */}
        {optimizationTips && optimizationTips.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1 text-amber-500" />
              Optimization Tips
            </h4>
            <ul className="text-xs space-y-1">
              {optimizationTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center text-gray-700">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-gray-400 flex-shrink-0" />
                          {tip}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to apply this suggestion</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
