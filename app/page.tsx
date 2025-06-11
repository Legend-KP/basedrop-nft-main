"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const MintInterface = dynamic(
  () => import('./components/MintInterface').then(mod => ({ default: mod.MintInterface })),
  { ssr: false }
);

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MintInterface />
    </Suspense>
  );
}
