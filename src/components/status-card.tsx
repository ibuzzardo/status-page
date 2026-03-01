import { StatusResult } from '@/lib/types';

interface StatusCardProps {
  result: StatusResult;
}

export default function StatusCard({ result }: StatusCardProps): JSX.Element {
  const isUp = result.status === 'up';
  const statusColor = isUp ? 'text-statusGreen' : 'text-statusRed';
  const dotColor = isUp ? 'bg-statusGreen' : 'bg-statusRed';
  const statusText = isUp ? 'Operational' : 'Down';

  return (
    <div className="bg-cardBackground border border-border rounded-lg p-4 shadow-sm text-textPrimary">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{result.name}</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${dotColor}`}></div>
          <span className={`text-sm font-medium ${statusColor}`}>
            {statusText}
          </span>
        </div>
      </div>
      <div className="text-textSecondary text-sm space-y-1">
        <div>Response time: {result.responseTime}ms</div>
        <div>Last checked: {new Date(result.checkedAt).toLocaleString()}</div>
      </div>
    </div>
  );
}