"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Load the logic component ONLY on the browser
const ResumeBuilderClient = dynamic(
  () => import('@/components/ResumeBuilderClient'), // Adjust path if needed
  { 
    ssr: false, 
    loading: () => (
      <div className="min-h-screen flex items-center justify-center font-black text-xl md:text-2xl bg-gray-50 uppercase italic tracking-tighter">
        INITIALIZING STUDIO...
      </div>
    )
  }
);

export default function ResumeBuilder() {
  return (
    <Suspense fallback={<div className="p-10 font-black">Loading Suspense...</div>}>
      <ResumeBuilderClient />
    </Suspense>
  );
}