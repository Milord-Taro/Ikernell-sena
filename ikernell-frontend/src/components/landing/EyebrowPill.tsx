import { type ReactNode } from 'react';

interface EyebrowPillProps {
  children: ReactNode;
}

export function EyebrowPill({ children }: EyebrowPillProps) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[15px] font-medium border"
      style={{
        background: 'var(--primary-subtle)',
        color: 'var(--primary)',
        borderColor: 'var(--primary)',
      }}
    >
      <span
        className="size-2 rounded-full animate-pulse"
        style={{ background: 'var(--primary)' }}
      />
      {children}
    </span>
  );
}
