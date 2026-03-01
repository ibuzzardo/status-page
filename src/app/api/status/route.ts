import { NextResponse } from 'next/server';
import { endpoints } from '@/lib/config';
import { StatusResult } from '@/lib/types';

export async function GET(): Promise<NextResponse<StatusResult[]>> {
  try {
    const results: StatusResult[] = await Promise.all(
      endpoints.map(async (endpoint) => {
        const startTime = Date.now();
        let status: 'up' | 'down' = 'down';
        let responseTime = 0;

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const response = await fetch(endpoint.url, {
            signal: controller.signal,
            method: 'GET',
          });

          clearTimeout(timeoutId);
          responseTime = Date.now() - startTime;

          if (response.status === endpoint.expectedStatus) {
            status = 'up';
          }
        } catch (error) {
          responseTime = Date.now() - startTime;
          if (responseTime >= 5000) {
            responseTime = 5000;
          }
        }

        return {
          name: endpoint.name,
          url: endpoint.url,
          status,
          responseTime,
          checkedAt: new Date().toISOString(),
        };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error checking status:', error);
    return NextResponse.json(
      { error: 'Failed to check status' },
      { status: 500 }
    );
  }
}