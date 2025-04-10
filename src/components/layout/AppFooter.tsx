
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AppFooter = () => {
  return (
    <footer className="w-full border-t bg-white dark:bg-slate-950 py-6 mt-12">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-security-blue" />
          <span className="text-lg font-semibold">RealityCheck</span>
        </div>
        <p className="text-sm text-muted-foreground text-center md:text-left">
          This is a simulated deepfake detection tool for educational purposes.
          No actual AI detection is performed.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link to="/contact" className="text-xs text-muted-foreground hover:text-primary">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
