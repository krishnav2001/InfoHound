"use client";

import React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Building2, Globe, Mail, Phone, Loader2, AlertTriangle, Search, Info, Layers, Lightbulb, FileText, Badge } from 'lucide-react';

import { scrapeCompanyInfo } from '@/app/actions';
import type { ScrapedData } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InfoHoundLogo } from '@/components/info-hound-logo';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Scraping...
        </>
      ) : (
        <>
          <Search className="mr-2 h-4 w-4" />
          Scrape
        </>
      )}
    </Button>
  );
}

function ResultsCard({ data }: { data: ScrapedData }) {
  return (
    <Card className="shadow-lg animate-in fade-in-0 zoom-in-95">
      <CardHeader>
        <CardTitle>Scraping Results</CardTitle>
        <CardDescription>
          Here is the information we found for the provided URL.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Company Name</p>
            <p className="font-semibold text-lg">{data.companyName}</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Info className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">About</p>
            <p className="text-base">{data.about}</p>
          </div>
        </div>
        <Separator />
         <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Technological Stack</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Projects</p>
             <div className="flex flex-wrap gap-2 mt-1">
              {data.currentProjects.map((project) => (
                 <span key={project} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                  {project}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Other Details</p>
            <p className="text-base">{data.otherDetails}</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Website URL</p>
            <p className="font-semibold text-lg break-all">{data.website}</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-start space-x-4">
           <div className="bg-primary/10 p-2 rounded-full">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="font-semibold text-lg">{data.email}</p>
            {!data.emailAnalysis.isStandardFormat && (
              <Alert variant="destructive" className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Unusual Email Format Detected</AlertTitle>
                <AlertDescription>
                  {data.emailAnalysis.reason}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <Separator />
        <div className="flex items-start space-x-4">
           <div className="bg-primary/10 p-2 rounded-full">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone Number</p>
            <p className="font-semibold text-lg">{data.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [state, formAction] = useActionState(scrapeCompanyInfo, initialState);
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
    if (state.data) {
        formRef.current?.reset();
    }
  }, [state, toast]);
  

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center space-y-2">
          <InfoHoundLogo />
          <p className="text-muted-foreground">
            Enter a website URL to scrape company information. The future of business intelligence.
          </p>
        </header>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Start a New Search</CardTitle>
            <CardDescription>Enter a full website URL (e.g., https://example.com) to begin.</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-4">
              <Input
                name="url"
                type="url"
                placeholder="https://example.com"
                required
                className="h-12 text-base"
              />
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {state.data && <ResultsCard data={state.data} />}
      </div>
    </main>
  );
}
