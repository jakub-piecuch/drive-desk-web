"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTheme } from "@/lib/theme-config";

export default function UnderConstruction() {
  const theme = getTheme('green');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex flex-col items-center justify-center p-4 text-gray-200">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md border-b border-gray-800 p-4 flex justify-between items-center">
        <div className="font-bold text-xl text-gray-100">Drive Desk</div>
        <Link href="/login">
          <Button 
            variant="outline" 
            className={`border-emerald-400 ${theme.colors.light} hover:bg-gray-800`}
          >
            Sign In
          </Button>
        </Link>
      </div>
      
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2">Drive Desk</h1>
        <div className="w-16 h-1 bg-emerald-500 mx-auto mb-6"></div>
        
        <p className="text-gray-300 mb-8">
          Our platform is currently under construction. We're working hard to bring you an amazing experience soon.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className={`${theme.colors.primary} ${theme.colors.text} border-0`}
          >
            Get Notified When We Launch
          </Button>
          <Link href="/login">
            <Button 
              variant="outline" 
              className={`${theme.colors.light} hover:bg-gray-700`}
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
      
      <footer className="mt-12 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Drive Desk. All rights reserved.
      </footer>
    </div>
  );
}