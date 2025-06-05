import { Card } from '@/components/ui/card';
import React from 'react';


export const LoadingCard: React.FC = () => {
  return (
    <Card title="Loading...">
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0052FF]"></div>
      </div>
    </Card>
  );
}; 