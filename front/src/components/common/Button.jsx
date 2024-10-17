import { cva } from 'class-variance-authority';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/utils';

export const Button = ({ children, className, href, variant = 'default' }) => {
  const buttonVariants = cva(
    'font-bold py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300',
    {
      variants: {
        variant: {
          default: 'bg-purple-600 text-white',
          outline:
            'bg-transparent hover:bg-purple-100 text-purple-500 border border-purple-500 hover:border-purple-600',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  );

  return href ? (
    <Link
      to={href}
      className={cn([
        buttonVariants({
          variant,
          className,
        }),
      ])}
    >
      {children}
    </Link>
  ) : (
    <button
      className={cn([
        buttonVariants({
          variant,
          className,
        }),
      ])}
    >
      {children}
    </button>
  );
};
