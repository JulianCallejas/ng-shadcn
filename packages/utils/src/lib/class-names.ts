import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge Tailwind CSS classes with clsx and tailwind-merge.
 * It handles class conflicts and merges them according to Tailwind's specificity rules.
 * 
 * @example
 * // Basic usage
 * cn('text-red-500', 'bg-blue-500')
 * 
 * // With conditional classes
 * cn(
 *   'base-class',
 *   isActive && 'text-blue-500',
 *   isDisabled ? 'opacity-50' : 'opacity-100'
 * )
 * 
 * @param inputs - Class values to be merged
 * @returns A string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
