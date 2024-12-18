import React from 'react';
import { Image, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const AppInit = () => {
  return (
    <View className='flex h-screen w-screen items-center justify-center'>
      <View className='flex flex-col items-center'>
        <Image
          resizeMode='contain'
          source={require('@/assets/images/umby-logo.png')}
          width={126}
          height={126}
        />
        <Text className={twMerge('mt-2 text-[1rem] text-gray3')}>Loading asset...</Text>
      </View>
    </View>
  );
};

export default AppInit;
