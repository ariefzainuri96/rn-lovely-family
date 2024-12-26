import React from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type RowProps = {
  children: React.ReactNode;
  className?: string;
};

const Row = ({ children, className }: RowProps) => {
  return <View className={twMerge('flex flex-row items-center', className)}>{children}</View>;
};

export default Row;
