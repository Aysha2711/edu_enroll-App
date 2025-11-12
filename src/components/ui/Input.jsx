import { clsx } from 'clsx';

export const Input = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <input
        className={clsx('input', error && 'input-error', className)}
        {...props}
      />
      {error && (
        <span className="input-error-text">
          {error}
        </span>
      )}
    </div>
  );
};

export const Label = ({ className, children, ...props }) => {
  return (
    <label className={clsx('input-label', className)} {...props}>
      {children}
    </label>
  );
};
