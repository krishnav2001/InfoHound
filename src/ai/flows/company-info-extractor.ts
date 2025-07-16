
'use server';
/**
 * @fileOverview Extracts company information from a website URL.
 *
 * - extractCompanyInfo - A function that handles the company info extraction.
 */

import {ai} from '@/ai/genkit';
import { CompanyInfoInput, CompanyInfoInputSchema, CompanyInfoOutput, CompanyInfoOutputSchema } from '@/ai/schema';

export async function extractCompanyInfo(input: CompanyInfoInput): Promise<CompanyInfoOutput> {
  // In a real application, you would fetch the website content here.
  // For this example, we'll rely on the model's knowledge or simulate content.
  return extractCompanyInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractCompanyInfoPrompt',
  input: {schema: CompanyInfoInputSchema},
  output: {schema: CompanyInfoOutputSchema},
  prompt: `You are a web scraping expert. Your task is to extract key information about a company from their website.
  Given the URL, find the company name, a contact email, a phone number, a brief "About Us" summary, their technology stack, a list of current projects, and other relevant details.

  Website URL: {{{url}}}

  If the URL is a known placeholder or a non-company site, provide plausible mock data for a fictional tech company.
  For 'https://synergyinnovations.com', use 'Synergy Innovations Inc.', 'contact@synergyinnovations.com', '+91 91234 56789', a creative summary about being a leader in synergistic solutions, a tech stack of ['React', 'Node.js', 'Google Cloud'], projects like ['Project Phoenix', 'Odyssey Initiative'], and other details about their R&D in AI.
  For any URL containing 'baddomain', use 'Faulty Solutions Ltd.', 'info@baddomain.org', '+91 99999 88888', a summary about their questionable digital services, a tech stack of ['Legacy PHP', 'jQuery'], projects like ['Operation Downtime'], and details on their 'innovative' 404-page designs.
  
  Return the data in the specified JSON format.`,
});

const extractCompanyInfoFlow = ai.defineFlow(
  {
    name: 'extractCompanyInfoFlow',
    inputSchema: CompanyInfoInputSchema,
    outputSchema: CompanyInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
