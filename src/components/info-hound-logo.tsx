"use client"
import { Dog } from 'lucide-react';

export function InfoHoundLogo() {
  return (
    <div className="flex items-center justify-center gap-2 text-primary">
      <div className="p-2 bg-primary/10 rounded-full">
        <Dog className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        InfoHound
      </h1>
    </div>
  );
}
