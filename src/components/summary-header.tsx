import { StatusResult } from '@/lib/types';

interface SummaryHeaderProps {
  results: StatusResult[];
}

export default function SummaryHeader({ results }: SummaryHeaderProps): JSX.Element {
  const downServices = results.filter(result => result.status === 'down').length;
  const allUp = downServices === 0;
  
  const headerText = allUp 
    ? 'All Systems Operational' 
    : `${downServices} Service${downServices === 1 ? '' : 's'} Down`;
  
  const headerColor = allUp ? 'text-statusGreen' : 'text-statusRed';

  return (
    <div className="text-2xl font-semibold mb-4">
      <span className={headerColor}>{headerText}</span>
    </div>
  );
}