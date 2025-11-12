import { clsx } from 'clsx';

export const Badge = ({ className, children, ...props }) => {
  return (
    <span
      className={clsx('text-xs font-semibold px-2 py-1 rounded-full', className)}
      style={{backgroundColor: '#fbbf24', color: '#1a1a1a'}}
      {...props}
    >
      {children}
    </span>
  );
};
