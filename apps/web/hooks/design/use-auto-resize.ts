import { RefObject, useEffect } from 'react';

/**
 * Hook to automatically adjust the height of a textarea as content changes.
 */
export function useAutoResize(
  ref: RefObject<HTMLTextAreaElement | null>,
  value: string,
) {
  useEffect(() => {
    const textarea = ref.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [ref, value]);
}
