'use client';

import { cn } from '@/utils/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { FaCheck } from 'react-icons/fa6';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-purple-500 ring-offset-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-purple-300 data-[state=checked]:text-purple-500',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <AnimatePresence>
        <motion.div
          variants={{
            checked: {
              scale: 0.7,
              transition: {
                duration: 0.2,
              },
            },
          }}
          animate="checked"
        >
          <FaCheck className="h-4 w-4" />
        </motion.div>
      </AnimatePresence>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
