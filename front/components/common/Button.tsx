import { cn } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';
import { CgSpinnerTwo } from "react-icons/cg";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: 'default' | 'outline';
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}

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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn([
          buttonVariants({
            variant,
            className,
          }),
          isLoading &&
            'hover:translate-y-0 animate-fade-in select-none pointer-events-none',
        ])}
        onClick={props.onClick}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        ref={ref}
        disabled={disabled || isLoading}
      >
        {!isLoading ? (
          children
        ) : (
          <div className="flex gap-2 w-full justify-center">
            <div role="status">
              <CgSpinnerTwo className='size-6 animate-spin'/>
              <span className="sr-only">Chargement...</span>
            </div>
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export interface ButtonLinkProps extends VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  className?: string;
  href: string;
}

const ButtonLink = ({
  variant,
  className,
  children,
  href,
}: ButtonLinkProps) => {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant,
          className,
        })
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export { Button, ButtonLink, buttonVariants };
