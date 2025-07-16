import { config } from 'dotenv';
config();

// This file is not needed for the main app, but is used for local development
// with the Genkit developer UI.
import './schema.ts';
import '@/ai/flows/email-format-detector.ts';
import '@/ai/flows/company-info-extractor.ts';
