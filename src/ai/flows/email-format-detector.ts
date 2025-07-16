
'use server';

/**
 * @fileOverview Email format detection flow using GenAI to identify unusual or invalid email formats.
 *
 * - detectUnusualEmailFormat - A function that checks if an email format is standard or unusual.
 */

import {ai} from '@/ai/genkit';
import { DetectUnusualEmailFormatInput, DetectUnusualEmailFormatInputSchema, DetectUnusualEmailFormatOutput, DetectUnusualEmailFormatOutputSchema } from '@/ai/schema';

export async function detectUnusualEmailFormat(input: DetectUnusualEmailFormatInput): Promise<DetectUnusualEmailFormatOutput> {
  return detectUnusualEmailFormatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectUnusualEmailFormatPrompt',
  input: {schema: DetectUnusualEmailFormatInputSchema},
  output: {schema: DetectUnusualEmailFormatOutputSchema},
  prompt: `You are an expert in email format validation.
  Your task is to determine if the given email address has a standard format or if it contains unusual patterns that might indicate an invalid or incorrect email.

  Email: {{{email}}}

  Respond with JSON in the following format:
  {
    "isStandardFormat": true|false,
    "reason": "Explanation if the format is unusual, otherwise omit this field"
  }`,
});

const detectUnusualEmailFormatFlow = ai.defineFlow(
  {
    name: 'detectUnusualEmailFormatFlow',
    inputSchema: DetectUnusualEmailFormatInputSchema,
    outputSchema: DetectUnusualEmailFormatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
