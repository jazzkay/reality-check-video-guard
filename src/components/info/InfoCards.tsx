
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, BookOpen, Info } from 'lucide-react';

const InfoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-security-blue" />
            <CardTitle className="text-lg">What Are Deepfakes?</CardTitle>
          </div>
          <CardDescription>Understanding AI-generated content</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Deepfakes are synthetic media created using artificial intelligence to replace a person's likeness with someone else's in images or videos. This technology can create realistic impersonations that are increasingly difficult to detect with the naked eye.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg">Detecting Fake Media</CardTitle>
          </div>
          <CardDescription>Key signs to look for</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Look for unnatural blinking, odd facial movements, inconsistent lighting, blurry areas around face edges, and audio that doesn't match lip movements. Modern deepfake detection tools use AI algorithms to identify manipulation patterns invisible to humans.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-security-teal" />
            <CardTitle className="text-lg">Protecting Yourself</CardTitle>
          </div>
          <CardDescription>Digital media literacy</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Verify content through multiple sources, check the original publisher, use reverse image search, and be skeptical of sensational content. Remember that advanced deepfakes are becoming increasingly difficult to detect without specialized tools.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoCards;
