import type { CompanyInfoOutput, DetectUnusualEmailFormatOutput } from "@/ai/schema";

export type EmailAnalysis = DetectUnusualEmailFormatOutput;

export type ScrapedData = CompanyInfoOutput & {
  website: string;
  emailAnalysis: EmailAnalysis;
};

export type FormState = {
  data: ScrapedData | null;
  error: string | null;
};
