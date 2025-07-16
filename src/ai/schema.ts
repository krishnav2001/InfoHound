import { z } from 'zod';

/**
 * @fileOverview
 * This file contains the Zod schemas and TypeScript types for the AI flows.
 * Separating these from the flow definitions allows the flow files to use
 * the "use server" directive without exporting non-function values.
 */

// Schema for company information extraction
export const CompanyInfoInputSchema = z.object({
  url: z.string().url().describe('The URL of the company website to scrape.'),
});
export type CompanyInfoInput = z.infer<typeof CompanyInfoInputSchema>;

export const CompanyInfoOutputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  email: z.string().describe('The contact email address of the company.'),
  phone: z.string().describe('The contact phone number of the company.'),
  about: z.string().describe('A brief "About Us" summary of the company.'),
  techStack: z.array(z.string()).describe('A list of technologies in their stack.'),
  currentProjects: z.array(z.string()).describe('A list of current or notable projects.'),
  otherDetails: z.string().describe('Other relevant details about the company or its main services.'),
});
export type CompanyInfoOutput = z.infer<typeof CompanyInfoOutputSchema>;


// Schema for email format detection
export const DetectUnusualEmailFormatInputSchema = z.object({
  email: z.string().describe('The email address to validate.'),
});
export type DetectUnusualEmailFormatInput = z.infer<typeof DetectUnusualEmailFormatInputSchema>;

export const DetectUnusualEmailFormatOutputSchema = z.object({
  isStandardFormat: z.boolean().describe('True if the email format is standard, false otherwise.'),
  reason: z.string().optional().describe('Reason why the email format is considered unusual, if applicable.'),
});
export type DetectUnusualEmailFormatOutput = z.infer<typeof DetectUnusualEmailFormatOutputSchema>;
