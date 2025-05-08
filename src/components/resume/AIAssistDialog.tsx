import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { aiService, AISuggestion } from "@/services/aiService";

interface AIAssistDialogProps {
  jobTitle: string;
  companyName: string;
  currentDescription?: string;
  onSuggestionSelect: (suggestion: string) => void;
  trigger?: React.ReactNode;
}

const AIAssistDialog: React.FC<AIAssistDialogProps> = ({
  jobTitle,
  companyName,
  currentDescription = "",
  onSuggestionSelect,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobDesc, setJobDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSuggestions = async () => {
    if (!jobTitle.trim()) {
      setError("Please enter a job title");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await aiService.generateBulletPoints(
        jobTitle,
        companyName,
        jobDesc,
      );
      setSuggestions(results);
    } catch (err) {
      setError("Failed to generate suggestions. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-xs"
          >
            <Sparkles className="h-3 w-3" />
            AI Assist
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>AI Bullet Point Generator</DialogTitle>
          <DialogDescription>
            Generate professional bullet points for your resume based on your
            job title and company.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company</Label>
              <Input
                id="companyName"
                value={companyName}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description (Optional)</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here for more tailored suggestions..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {suggestions.length > 0 && (
            <div className="space-y-4">
              <Label>Suggested Bullet Points</Label>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-md hover:bg-accent cursor-pointer"
                  onClick={() => handleSelectSuggestion(suggestion.text)}
                >
                  <p className="text-sm mb-2">{suggestion.text}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {suggestion.keywords?.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <Badge
                      variant={
                        suggestion.confidence > 90 ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {suggestion.confidence}% match
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentDescription && (
            <div className="space-y-2">
              <Label>Current Description</Label>
              <div className="p-3 border rounded-md bg-muted">
                <p className="text-sm">{currentDescription}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerateSuggestions}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Generate Suggestions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistDialog;
