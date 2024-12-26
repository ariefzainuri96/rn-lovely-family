import { type PropsWithChildren } from 'react';
import CustomDialogLoading from './CustomDialogLoading';
import { CustomDialogLoadingContext, useCustomDialogLoading } from './CustomDialogLoadingContext';

export function CustomDialogLoadingProvider({ children }: PropsWithChildren) {
  const hooks = useCustomDialogLoading();

  return (
    <CustomDialogLoadingContext.Provider value={hooks}>
      <CustomDialogLoading />
      {children}
    </CustomDialogLoadingContext.Provider>
  );
}
