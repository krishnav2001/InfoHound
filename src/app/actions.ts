'use server';

import { detectUnusualEmailFormat } from '@/ai/flows/email-format-detector';
import { extractCompanyInfo } from '@/ai/flows/company-info-extractor';
import { z } from 'zod';
import type { ScrapedData, FormState } from '@/app/types';

const ScrapeSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export async function scrapeCompanyInfo(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = ScrapeSchema.safeParse({
    url: formData.get('url'),
  });

  if (!validatedFields.success) {
    return { data: null, error: validatedFields.error.flatten().fieldErrors.url?.[0] || "Invalid input." };
  }

  const url = validatedFields.data.url;

  try {
    // Call the GenAI flow to extract company info
    const companyInfo = await extractCompanyInfo({ url });
    
    // Call the GenAI flow to analyze the email format
    const emailAnalysis = await detectUnusualEmailFormat({ email: companyInfo.email });

    const result: ScrapedData = {
      ...companyInfo,
      website: url,
      emailAnalysis,
    };
    
    // Simulate saving the scraped data to a database
    console.log('--- SCRAPED DATA (SIMULATED SAVE) ---');
    console.log({
      companyName: result.companyName,
      website: result.website,
      email: result.email,
      phone: result.phone,
      about: result.about,
      timestamp: new Date().toISOString()
    });
    console.log('------------------------------------');

    return { data: result, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : "An unknown error occurred.";
    console.error("Scraping failed:", error);
    return { data: null, error: "Failed to scrape the website. The server might be down or blocking requests." };
  }
}
