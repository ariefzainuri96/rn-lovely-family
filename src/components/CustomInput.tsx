import React, { ComponentPropsWithoutRef } from 'react';
import { Text, TextInput, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import Column from './Column';
import Row from './Row';
import { Ionicons } from '@expo/vector-icons';

type CustomInputProps = {
  label?: string;
  className?: string;
  error?: string;
  minHeight?: number;
  maxHeight?: number;
  textType?: 'input' | 'password';
  onPasswordReveal?: () => void;
} & ComponentPropsWithoutRef<typeof TextInput>;

const CustomInput = ({
  label,
  error,
  className,
  minHeight,
  maxHeight,
  textType = 'input',
  onPasswordReveal,
  ...props
}: CustomInputProps) => {
  return (
    <Column className={twMerge('w-full', className)}>
      {label && <Text className='sfPro400-14 line-clamp-1 leading-none text-gray3'>{label}</Text>}
      <Row className='w-full rounded-[6px] border-[1px] border-black px-4'>
        <TextInput
          placeholderTextColor={'#455358'}
          style={{
            minHeight: minHeight,
            maxHeight: maxHeight,
            textAlignVertical: 'top',
          }}
          className={twMerge(
            'mt-1 flex-1 font-SfPro400 text-[.875rem] text-gray1',
            !(props.editable ?? true) && 'bg-[#F8F8F8]'
          )}
          {...props}
        />
        {textType === 'password' && (
          <Ionicons
            onPress={onPasswordReveal}
            name={props.secureTextEntry ? 'eye-off' : 'eye'}
            size={20}
            color={'#455358'}
          />
        )}
      </Row>
      {error && <Text className='mt-1 font-SfPro300 text-[.75rem] text-red1'>{error}</Text>}
    </Column>
  );
};

export default CustomInput;
