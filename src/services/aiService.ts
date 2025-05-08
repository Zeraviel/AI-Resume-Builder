// AI Service for resume and cover letter generation

// Types for AI service responses
export interface AISuggestion {
  text: string;
  confidence: number; // 0-100 score of how confident the AI is
  keywords?: string[];
}

export interface ATSAnalysisResult {
  score: number; // 0-100 score
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface CoverLetterGeneration {
  coverLetter: string;
  tone: string;
  keywords: string[];
}

// In a real app, this would call an external API
// For demo purposes, we're using mock data
const mockDelay = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const aiService = {
  /**
   * Generate bullet points for resume experience based on job title and description
   */
  generateBulletPoints: async (
    jobTitle: string,
    companyName: string,
    jobDescription?: string,
  ): Promise<AISuggestion[]> => {
    try {
      // Simulate API call
      await mockDelay();

      // Mock response based on job title
      if (
        jobTitle.toLowerCase().includes("developer") ||
        jobTitle.toLowerCase().includes("engineer")
      ) {
        return [
          {
            text: `Led development of responsive web applications using React and TypeScript, resulting in a 40% improvement in user engagement.`,
            confidence: 95,
            keywords: ["React", "TypeScript", "responsive", "development"],
          },
          {
            text: `Collaborated with UX designers to implement user-centered design principles, improving customer satisfaction scores by 25%.`,
            confidence: 88,
            keywords: [
              "UX",
              "design",
              "collaboration",
              "customer satisfaction",
            ],
          },
          {
            text: `Optimized application performance through code refactoring and implementing best practices, reducing load times by 35%.`,
            confidence: 92,
            keywords: [
              "optimization",
              "performance",
              "refactoring",
              "best practices",
            ],
          },
        ];
      } else if (
        jobTitle.toLowerCase().includes("manager") ||
        jobTitle.toLowerCase().includes("lead")
      ) {
        return [
          {
            text: `Managed a cross-functional team of 8 professionals, delivering all projects on time and under budget.`,
            confidence: 94,
            keywords: ["management", "cross-functional", "delivery", "budget"],
          },
          {
            text: `Implemented agile methodologies that increased team productivity by 30% and reduced development cycles by 2 weeks.`,
            confidence: 91,
            keywords: ["agile", "productivity", "development cycles"],
          },
          {
            text: `Established strategic partnerships with key stakeholders, resulting in 45% increase in department resources.`,
            confidence: 87,
            keywords: ["strategic partnerships", "stakeholders", "resources"],
          },
        ];
      } else {
        return [
          {
            text: `Demonstrated expertise in ${jobTitle} role at ${companyName}, exceeding performance targets by 20%.`,
            confidence: 85,
            keywords: ["expertise", "performance", "targets"],
          },
          {
            text: `Collaborated with cross-functional teams to implement process improvements, resulting in 15% increased efficiency.`,
            confidence: 82,
            keywords: ["collaboration", "process improvements", "efficiency"],
          },
          {
            text: `Recognized for outstanding contributions to team objectives and company goals.`,
            confidence: 78,
            keywords: ["recognition", "contributions", "objectives", "goals"],
          },
        ];
      }
    } catch (error) {
      console.error("Error generating bullet points:", error);
      throw new Error("Failed to generate bullet points. Please try again.");
    }
  },

  /**
   * Analyze resume for ATS optimization based on job description
   */
  analyzeResumeForATS: async (
    resumeText: string,
    jobDescription: string,
  ): Promise<ATSAnalysisResult> => {
    try {
      // Simulate API call
      await mockDelay();

      // Extract keywords from job description (in a real app, this would be done by the API)
      const keywordsFromJob = [
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "API",
        "frontend",
        "responsive design",
        "Git",
        "agile",
        "testing",
      ];

      // Mock analysis of resume text against keywords
      const matched = [];
      const missing = [];

      for (const keyword of keywordsFromJob) {
        if (resumeText.toLowerCase().includes(keyword.toLowerCase())) {
          matched.push(keyword);
        } else {
          missing.push(keyword);
        }
      }

      // Calculate score based on matches
      const score = Math.round((matched.length / keywordsFromJob.length) * 100);

      // Generate suggestions based on missing keywords
      const suggestions = missing.map(
        (keyword) =>
          `Consider adding experience with ${keyword} to your resume.`,
      );

      return {
        score,
        matchedKeywords: matched,
        missingKeywords: missing,
        suggestions,
      };
    } catch (error) {
      console.error("Error analyzing resume for ATS:", error);
      throw new Error("Failed to analyze resume. Please try again.");
    }
  },

  /**
   * Generate a cover letter based on resume and job description
   */
  generateCoverLetter: async (
    resumeData: any,
    jobDescription: string,
    tone: "professional" | "conversational" | "enthusiastic" = "professional",
  ): Promise<CoverLetterGeneration> => {
    try {
      // Simulate API call
      await mockDelay();

      // Mock cover letter generation
      const name = resumeData.personalInfo?.name || "Applicant Name";
      const position = "the open position";
      const company = "your company";

      let coverLetterText = "";
      const keywords = ["experience", "skills", "qualified", "opportunity"];

      switch (tone) {
        case "conversational":
          coverLetterText = `Hi there,

I'm ${name}, and I'm really excited about ${position} at ${company}. When I saw the job posting, I immediately knew it was a perfect match for my skills and experience.

Throughout my career, I've developed expertise in [relevant skills from resume], which align perfectly with what you're looking for. I'm particularly proud of [achievement from resume], which demonstrates my ability to deliver results.

I'm excited about the opportunity to bring my unique perspective to ${company} and contribute to your team's success. I'd love to chat more about how my background and skills would be a great fit for this role.

Looking forward to hearing from you!

Best regards,
${name}`;
          break;

        case "enthusiastic":
          coverLetterText = `Dear Hiring Manager,

I am THRILLED to apply for ${position} at ${company}! This opportunity combines my passion for [industry/field] with my extensive experience in [relevant skills].

Your company's mission to [company goal/value] resonates deeply with me, and I'm EXCITED about the possibility of contributing to such important work. My background in [relevant experience] has prepared me perfectly for this role.

In my previous position at [previous company], I successfully [major achievement], which increased [relevant metric] by [percentage]. I'm confident I can bring this same level of ENTHUSIASM and RESULTS to ${company}.

I would be DELIGHTED to discuss how my unique combination of skills and passion makes me the IDEAL candidate for this position. Thank you for considering my application!

With great enthusiasm,
${name}`;
          break;

        default: // professional
          coverLetterText = `Dear Hiring Manager,

I am writing to express my interest in ${position} at ${company}, as advertised. With my background in [relevant field] and expertise in [relevant skills], I am confident in my ability to make a valuable contribution to your team.

Throughout my professional career, I have developed a strong skill set in [key skills from resume], which align well with the requirements outlined in your job description. In my previous role at [previous company], I successfully [key achievement], resulting in [positive outcome].

I am particularly drawn to ${company} because of [company value/mission/project]. Your commitment to [company focus] resonates with my professional values, and I am eager to be part of an organization that prioritizes these principles.

Thank you for considering my application. I welcome the opportunity to discuss how my experience and skills would benefit ${company}. I look forward to the possibility of contributing to your team.

Sincerely,
${name}`;
      }

      return {
        coverLetter: coverLetterText,
        tone,
        keywords,
      };
    } catch (error) {
      console.error("Error generating cover letter:", error);
      throw new Error("Failed to generate cover letter. Please try again.");
    }
  },
};
