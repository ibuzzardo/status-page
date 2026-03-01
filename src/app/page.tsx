'use client';

import { useEffect, useState } from 'react';
import { StatusResult } from '@/lib/types';

interface StatusCardProps {
  result: StatusResult;
}

function StatusCard({ result }: StatusCardProps): JSX.Element {
  const isUp = result.status === 'up';
  
  return (
    <div className="bg-cardBackground text-textPrimary border border-border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{result.name}</h3>
        <div className="flex items-center gap-2">
          <div className={`inline-flex items-center justify-center w-3 h-3 rounded-full ${
            isUp ? 'bg-statusGreen' : 'bg-statusRed'
          }`} />
          <span className={`text-sm font-medium ${
            isUp ? 'text-statusGreen' : 'text-statusRed'
          }`}>
            {isUp ? 'Operational' : 'Down'}
          </span>
        </div>
      </div>
      <div className="text-textSecondary text-sm space-y-1">
        <div>Response time: {result.responseTime}ms</div>
        <div>Last checked: {new Date(result.checkedAt).toLocaleString()}</div>
        <div className="truncate">URL: {result.url}</div>
      </div>
    </div>
  );
}

function LoadingSkeleton(): JSX.Element {
  return (
    <div className="bg-cardBackground border border-border rounded-lg p-4 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 bg-border rounded w-24"></div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-border rounded-full"></div>
          <div className="h-4 bg-border rounded w-20"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-border rounded w-32"></div>
        <div className="h-4 bg-border rounded w-40"></div>
        <div className="h-4 bg-border rounded w-48"></div>
      </div>
    </div>
  );
}

export default function Dashboard(): JSX.Element {
  const [results, setResults] = useState<StatusResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async (): Promise<void> => {
    try {
      const response = await fetch('/api/status');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  const downServices = results.filter(result => result.status === 'down').length;
  const allUp = downServices === 0;

  const getSummaryText = (): string => {
    if (results.length === 0) return 'No endpoints configured';
    if (allUp) return 'All Systems Operational';
    return `${downServices} Service${downServices === 1 ? '' : 's'} Down`;
  };

  const getSummaryColor = (): string => {
    if (results.length === 0) return 'text-textSecondary';
    return allUp ? 'text-statusGreen' : 'text-statusRed';
  };

  return (
    <div className="min-h-screen bg-primary text-textPrimary">
      <header className="p-6">
        <h1 className={`text-2xl font-semibold mb-4 ${getSummaryColor()}`}>
          {getSummaryText()}
        </h1>
        {error && (
          <div className="text-statusRed text-sm mb-4">
            Error: {error}
          </div>
        )}
      </header>
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          // Show loading skeletons
          Array.from({ length: 3 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))
        ) : results.length === 0 ? (
          <div className="col-span-full text-center text-textSecondary py-8">
            No endpoints configured
          </div>
        ) : (
          results.map((result) => (
            <StatusCard key={result.name} result={result} />
          ))
        )}
      </main>
    </div>
  );
}