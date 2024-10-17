import { cn } from '../../utils/utils';

export const Button = ({ children, className, href }) => {
  const classes = cn(
    'bg-purple-600 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300',
    className
  );

  return href ? (
    <a href={href} className={classes}>
      {children}
    </a>
  ) : (
    <button className={classes}>{children}</button>
  );
};
