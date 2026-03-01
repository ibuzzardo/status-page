'use client';

import { useEffect, useState } from 'react';
import { StatusResult } from '@/lib/types';
import StatusCard from '@/components/status-card';
import SummaryHeader from '@/components/summary-header';

function LoadingSkeleton(): JSX.Element {
  return (
    <div className="bg-cardBackground border border-border rounded-lg p-4 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 bg-border rounded w-24"></div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-border rounded-full"></div>
          <div className="h-4 bg-border rounded w-20"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-border rounded w-32"></div>
        <div className="h-4 bg-border rounded w-40"></div>
      </div>
    </div>
  );
}

export default function HomePage(): JSX.Element {
  const [results, setResults] = useState<StatusResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStatus = async (): Promise<void> => {
    try {
      const response = await fetch('/api/status');
      if (response.ok) {
        const data: StatusResult[] = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error('Failed to fetch status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (results.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-primary text-textPrimary">
        <div className="p-6">
          <div className="text-2xl font-semibold mb-4 text-textSecondary">
            No endpoints configured
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-textPrimary">
      <div className="p-6">
        {!loading && results.length > 0 && <SummaryHeader results={results} />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            : results.map((result) => (
                <StatusCard key={result.name} result={result} />
              ))}
        </div>
      </div>
    </div>
  );
}