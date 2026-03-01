import { NextResponse } from 'next/server';
import { endpoints } from '@/lib/config';
import { StatusResult } from '@/lib/types';

export async function GET(): Promise<NextResponse<StatusResult[]>> {
  const results: StatusResult[] = [];

  for (const endpoint of endpoints) {
    const startTime = Date.now();
    let status: 'up' | 'down' = 'down';
    let responseTime = 0;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(endpoint.url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Status-Page-Monitor/1.0',
        },
      });

      clearTimeout(timeoutId);
      responseTime = Date.now() - startTime;

      if (response.status === endpoint.expectedStatus) {
        status = 'up';
      }
    } catch (error) {
      responseTime = Date.now() - startTime;
      // If it took longer than 5 seconds, set to exactly 5000ms
      if (responseTime >= 5000) {
        responseTime = 5000;
      }
      status = 'down';
    }

    results.push({
      name: endpoint.name,
      url: endpoint.url,
      status,
      responseTime,
      checkedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json(results);
}