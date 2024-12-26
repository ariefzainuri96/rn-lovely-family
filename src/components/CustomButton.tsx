import React, { ComponentPropsWithoutRef } from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type CustomButtonProps = {
  Icon?: React.ReactNode;
  label: string;
  textColor?: string;
  className?: string;
  rippleColor?: string;
  buttonHeight?: number;
} & ComponentPropsWithoutRef<typeof TouchableNativeFeedback>;

const CustomButton = ({
  Icon,
  label,
  className,
  rippleColor,
  textColor,
  buttonHeight = 53,
  ...props
}: CustomButtonProps) => {
  return (
    <View className={twMerge('overflow-hidden rounded-[8px] bg-primary', className)}>
      <TouchableNativeFeedback {...props}>
        <View
          style={{
            height: buttonHeight,
          }}
          className={twMerge('flex flex-row items-center justify-center', Icon && 'gap-4')}
        >
          <Text className={twMerge('font-SfPro500 text-[.875rem] text-white', textColor)}>
            {label}
          </Text>
          {Icon}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default CustomButton;
