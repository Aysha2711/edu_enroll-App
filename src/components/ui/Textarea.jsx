import { clsx } from 'clsx';

export const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={clsx('input', className)}
      style={{minHeight: '80px', resize: 'vertical'}}
      {...props}
    />
  );
};
