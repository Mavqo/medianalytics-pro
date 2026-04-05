import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary-600 hover:shadow-primary active:bg-primary-700',
        destructive:
          'bg-error text-white shadow-sm hover:bg-error-600 active:bg-error-700 focus-visible:ring-error/50',
        outline:
          'border-[1.5px] border-secondary-200 bg-white text-secondary-700 shadow-sm hover:bg-secondary-50 hover:border-secondary-300 active:bg-secondary-100',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-100 active:bg-secondary-200',
        ghost: 'text-primary hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100',
        link: 'text-primary underline-offset-4 hover:underline',
        accent:
          'bg-accent text-white shadow-accent hover:bg-accent-600 hover:shadow-accent-hover active:bg-accent-700 font-semibold'
      },
      size: {
        default: 'h-10 px-5 py-2.5 text-sm',
        xs: 'h-7 px-3 py-1.5 text-xs',
        sm: 'h-8 px-4 py-2 text-[13px]',
        lg: 'h-12 px-6 py-3 text-[15px]',
        xl: 'h-14 px-8 py-4 text-base',
        icon: 'size-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading,
  children,
  disabled,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  if (asChild) {
    return (
      <Slot
        data-slot='button'
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  // Normal button — no loading support, default shadcn behavior
  if (isLoading === undefined) {
    return (
      <button
        data-slot='button'
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }

  // Loading-aware button — grid overlap for zero layout shift.
  // Children are always wrapped in a span so has-[>svg] padding
  // stays consistent between loading and non-loading states.
  return (
    <button
      data-slot='button'
      className={cn(
        buttonVariants({ variant, size }),
        'grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1',
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      <span className={cn('inline-flex items-center gap-2', isLoading && 'invisible')}>
        {children}
      </span>
      <span className={cn('flex items-center justify-center', !isLoading && 'invisible')}>
        <Spinner />
      </span>
    </button>
  );
}

export { Button, buttonVariants };
