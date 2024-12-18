import Checkbox from 'expo-checkbox';
import React, { ComponentPropsWithoutRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type CustomCheckboxProps = {
  label?: string;
  className?: string;
  handleOnPress?: () => void;
} & ComponentPropsWithoutRef<typeof Checkbox>;

const CustomCheckbox = ({ label, handleOnPress, className, ...props }: CustomCheckboxProps) => {
  return (
    <Pressable className={className} onPress={handleOnPress}>
      <View className='flex flex-row items-center'>
        <Checkbox
          style={{
            width: 20,
            height: 20,
            borderWidth: 1.5,
            borderColor: '#BFBFBF',
            borderRadius: 4,
          }}
          color={props.value ? '#18469C' : '#BFBFBF'}
          {...props}
        />
        {label && (
          <Text className='ml-4 line-clamp-1 text-ellipsis font-SfPro500 text-[.875rem] text-textPrimary'>
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default CustomCheckbox;
