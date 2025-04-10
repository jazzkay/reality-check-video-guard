
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className="w-full border-b bg-white dark:bg-slate-950">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-security-blue" />
          <span className="text-xl font-bold bg-gradient-to-r from-security-blue to-security-teal bg-clip-text text-transparent">
            RealityCheck
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Detector
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium hover:text-primary">
            How It Works
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <Info className="h-4 w-4" />
            <span>Resources</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
