import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";

interface RelativeTimeProps {
  date: string;
}

export function RelativeTime({ date }: RelativeTimeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="text-sm">{date}</span>;
  }

  return (
    <span className="text-sm">
      {formatDistance(new Date(date), new Date(), {
        addSuffix: true,
      })}
    </span>
  );
}
