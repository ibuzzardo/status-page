export interface Endpoint {
  name: string;
  url: string;
  expectedStatus: number;
}

export interface StatusResult {
  name: string;
  url: string;
  status: "up" | "down";
  responseTime: number;
  checkedAt: string;
}