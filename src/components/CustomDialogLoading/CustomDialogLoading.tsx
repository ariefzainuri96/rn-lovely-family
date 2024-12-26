import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { useCustomDialogLoadingContext } from './CustomDialogLoadingContext';
import Column from '../Column';

export default function CustomDialogLoading() {
  const { open, setOpen, title, setTitle } = useCustomDialogLoadingContext();

  return (
    <Modal
      visible={open}
      transparent
      animationType='fade'
      onRequestClose={() => {
        setOpen(false);
        setTitle(undefined);
      }}
    >
      <View className='relative flex-1'>
        <View className='relative z-0 flex-1 bg-[#00000040]' />
        <View className='absolute z-10 flex h-full w-full items-center justify-center'>
          <Column className='items-center gap-2 rounded-md bg-white px-4 py-2'>
            <ActivityIndicator size={'small'} color={'#18469C'} />
            {title && <Text className='sfPro400-16'>{title}</Text>}
          </Column>
        </View>
      </View>
    </Modal>
  );
}
