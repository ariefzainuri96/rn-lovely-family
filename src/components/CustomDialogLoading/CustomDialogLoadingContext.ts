import { createContext, useCallback, useContext, useState } from 'react';

type TCustomDialogLoadingContext = ReturnType<typeof useCustomDialogLoading>;

export const CustomDialogLoadingContext = createContext<TCustomDialogLoadingContext | null>(null);

export function useCustomDialogLoadingContext() {
  const value = useContext(CustomDialogLoadingContext);

  if (!value) {
    throw new Error(
      'useCustomDialogLoadingContext must be used inside an <CustomDialogLoadingProvider />'
    );
  }

  return value;
}

export function useCustomDialogLoading() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>();

  const showLoading = useCallback((title?: string) => {
    setOpen(true);
    setTitle(title);
  }, []);

  const hideLoading = useCallback(() => {
    setOpen(false);
    setTitle(undefined);
  }, []);

  return { hideLoading, title, showLoading, open } as const;
}
