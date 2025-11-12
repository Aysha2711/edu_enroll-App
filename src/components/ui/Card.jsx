// import { clsx } from 'clsx';

// export const Card = ({ className, children, ...props }) => {
//   return (
//     <div className={clsx('card', className)} {...props}>
//       {children}
//     </div>
//   );
// };

// export const CardContent = ({ className, children, ...props }) => {
//   return (
//     <div className={clsx('card-content', className)} {...props}>
//       {children}
//     </div>
//   );
// };

// export const CardHeader = ({ className, children, ...props }) => {
//   return (
//     <div className={clsx('card-content', className)} {...props}>
//       {children}
//     </div>
//   );
// };

// export const CardTitle = ({ className, children, ...props }) => {
//   return (
//     <h3 className={clsx('font-bold text-lg', className)} {...props}>
//       {children}
//     </h3>
//   );
// };

// export const CardDescription = ({ className, children, ...props }) => {
//   return (
//     <p className={clsx('text-muted-foreground', className)} {...props}>
//       {children}
//     </p>
//   );
// };

// export const CardFooter = ({ className, children, ...props }) => {
//   return (
//     <div className={clsx('card-content', className)} {...props}>
//       {children}
//     </div>
//   );
// };
import { clsx } from "clsx";

/* --- Base Card --- */
export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx(
        "card bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* --- Header --- */
export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx(
        "card-header px-5 py-4 border-b border-gray-100 flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* --- Content --- */
export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={clsx("card-content px-5 py-4", className)} {...props}>
      {children}
    </div>
  );
};

/* --- Footer --- */
export const CardFooter = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx("card-footer px-5 py-3 border-t border-gray-100", className)}
      {...props}
    >
      {children}
    </div>
  );
};

/* --- Title --- */
export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3
      className={clsx("font-semibold text-gray-900 text-base", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

/* --- Description --- */
export const CardDescription = ({ className, children, ...props }) => {
  return (
    <p
      className={clsx("text-sm text-gray-500 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
};
