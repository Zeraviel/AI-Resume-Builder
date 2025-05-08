import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Palette, Type } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

interface TemplateProps {
  onSelectTemplate?: (templateId: string) => void;
  onExport?: (format: string) => void;
  onColorChange?: (color: string) => void;
  onFontChange?: (font: string) => void;
}

const TemplateSelector: React.FC<TemplateProps> = ({
  onSelectTemplate = () => {},
  onExport = () => {},
  onColorChange = () => {},
  onFontChange = () => {},
}) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<string>("professional");
  const [selectedColor, setSelectedColor] = useState<string>("blue");
  const [selectedFont, setSelectedFont] = useState<string>("inter");

  const templates: Template[] = [
    {
      id: "professional",
      name: "Professional",
      thumbnail:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
      description:
        "Clean and professional layout suitable for corporate positions",
    },
    {
      id: "creative",
      name: "Creative",
      thumbnail:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&q=80",
      description:
        "Modern design with creative elements for design and marketing roles",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      thumbnail:
        "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=400&q=80",
      description:
        "Minimalist approach focusing on content with elegant spacing",
    },
    {
      id: "academic",
      name: "Academic",
      thumbnail:
        "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&q=80",
      description:
        "Structured format ideal for academic and research positions",
    },
    {
      id: "modern",
      name: "Modern",
      thumbnail:
        "https://images.unsplash.com/photo-1618556450994-a6a5074bd0d3?w=400&q=80",
      description:
        "Contemporary design with bold elements and modern typography",
    },
    {
      id: "executive",
      name: "Executive",
      thumbnail:
        "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&q=80",
      description:
        "Sophisticated layout designed for senior management and executive roles",
    },
  ];

  const colorSchemes = [
    { id: "blue", name: "Blue", value: "#3b82f6" },
    { id: "green", name: "Green", value: "#10b981" },
    { id: "purple", name: "Purple", value: "#8b5cf6" },
    { id: "red", name: "Red", value: "#ef4444" },
    { id: "gray", name: "Gray", value: "#6b7280" },
    { id: "teal", name: "Teal", value: "#14b8a6" },
    { id: "amber", name: "Amber", value: "#f59e0b" },
    { id: "pink", name: "Pink", value: "#ec4899" },
  ];

  const fonts = [
    { id: "inter", name: "Inter" },
    { id: "roboto", name: "Roboto" },
    { id: "poppins", name: "Poppins" },
    { id: "merriweather", name: "Merriweather" },
    { id: "montserrat", name: "Montserrat" },
    { id: "playfair", name: "Playfair Display" },
    { id: "opensans", name: "Open Sans" },
    { id: "lato", name: "Lato" },
    { id: "raleway", name: "Raleway" },
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onSelectTemplate(templateId);
  };

  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);
    onColorChange(colorId);
  };

  const handleFontChange = (fontId: string) => {
    setSelectedFont(fontId);
    onFontChange(fontId);
  };

  const handleExport = (format: string) => {
    onExport(format);
  };

  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Template & Styling</h2>
      </div>

      <Tabs defaultValue="templates" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mx-4 mt-2">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="fonts">Fonts</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 p-4">
          <TabsContent value="templates" className="mt-0">
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:bg-accent"}`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-[8.5/11] w-full mb-3 overflow-hidden rounded-md">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="colors" className="mt-0">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Palette className="h-4 w-4" /> Color Scheme
              </h3>
              <RadioGroup
                value={selectedColor}
                onValueChange={handleColorChange}
                className="grid grid-cols-5 gap-2"
              >
                {colorSchemes.map((color) => (
                  <div
                    key={color.id}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={color.id}
                        id={`color-${color.id}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`color-${color.id}`}
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <div
                          className={`w-8 h-8 rounded-full ${selectedColor === color.id ? "ring-2 ring-primary ring-offset-2" : ""}`}
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="text-xs mt-1">{color.name}</span>
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="fonts" className="mt-0">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Type className="h-4 w-4" /> Typography
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="font-select">Font Family</Label>
                  <Select value={selectedFont} onValueChange={handleFontChange}>
                    <SelectTrigger id="font-select" className="w-full">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map((font) => (
                        <SelectItem key={font.id} value={font.id}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 border rounded-md">
                  <p className={`text-lg font-${selectedFont}`}>Sample Text</p>
                  <p
                    className={`text-sm font-${selectedFont} text-muted-foreground`}
                  >
                    This is how your selected font will appear on your resume.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <div className="p-4 border-t">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Download className="h-4 w-4" /> Export Resume
        </h3>
        <div className="flex gap-2">
          <Button onClick={() => handleExport("pdf")} className="flex-1">
            PDF
          </Button>
          <Button
            onClick={() => handleExport("docx")}
            variant="outline"
            className="flex-1"
          >
            DOCX
          </Button>
          <Button
            onClick={() => handleExport("txt")}
            variant="outline"
            className="flex-1"
          >
            TXT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
