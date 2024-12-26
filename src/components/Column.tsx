import React, { ComponentPropsWithoutRef } from 'react';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type ColumnProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof View>;

const Column = ({ children, className, ...props }: ColumnProps) => {
  return (
    <View {...props} className={twMerge('flex flex-col items-start', className)}>
      {children}
    </View>
  );
};

export default Column;
