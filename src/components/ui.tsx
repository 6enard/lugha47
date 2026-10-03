import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

/* ── ScreenHeader ───────────────────────────────────── */
interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  icon?: ReactNode;
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  backLabel = 'Back',
  icon,
}: ScreenHeaderProps) {
  return (
    <div className="mb-8">
      {onBack && (
        <button
          onClick={onBack}
          className="group flex items-center gap-1.5 text-forest-700 font-semibold text-sm mb-4 transition-all duration-200 hover:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-300 rounded-lg px-1"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          {backLabel}
        </button>
      )}
      <div className="flex items-start gap-3">
        {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-ink-500 mt-1 text-sm md:text-base">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── ProgressBar ────────────────────────────────────── */
interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const segments = Array.from({ length: total }, (_, i) => i);
  return (
    <div className={`flex gap-1.5 ${className}`}>
      {segments.map((idx) => (
        <div
          key={idx}
          className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
            idx < current
              ? 'bg-forest-500'
              : idx === current
              ? 'bg-forest-400'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

/* ── StatPill ───────────────────────────────────────── */
interface StatPillProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  variant?: 'forest' | 'sun' | 'lake';
}

export function StatPill({
  icon,
  label,
  value,
  variant = 'forest',
}: StatPillProps) {
  const styles = {
    forest: 'bg-forest-50 text-forest-700 border-forest-200',
    sun: 'bg-sun-50 text-sun-700 border-sun-200',
    lake: 'bg-lake-50 text-lake-700 border-lake-200',
  };
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-semibold text-sm ${styles[variant]}`}
    >
      {icon}
      <span className="text-xs text-ink-400 font-medium hidden sm:inline">{label}</span>
      <span>{value}</span>
    </div>
  );
}
