import { clsx } from 'clsx';

export const Select = ({ className, children, ...props }) => {
  return (
    <select
      className={clsx('input', className)}
      {...props}
    >
      {children}
    </select>
  );
};

export const SelectTrigger = ({ children, ...props }) => <div {...props}>{children}</div>;
export const SelectValue = ({ children, ...props }) => <span {...props}>{children}</span>;
export const SelectContent = ({ children, ...props }) => <div {...props}>{children}</div>;
export const SelectItem = ({ children, ...props }) => <option {...props}>{children}</option>;
