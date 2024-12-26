import React from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Column from '@/src/components/Column';
import CustomAppbar from '@/src/components/CustomAppbar';
import { useDashboard } from '@/src/features/(app)/index/hooks/use-dashboard';
import HeaderSection from '@/src/features/(app)/index/sections/header-section';

export default function DashboardPage() {
  const { menus } = useDashboard();

  return (
    <View className='relative flex-1'>
      <CustomAppbar
        options={{
          headerShown: false,
        }}
      />

      {/* background */}
      <View className='relative z-0 flex-1'>
        <Image
          source={require('@/assets/images/splash-background.png')}
          className='h-full w-full'
        />
      </View>

      {/* content */}
      <SafeAreaView className='absolute inset-0 z-10 flex-1'>
        <Column className='flex-1'>
          <HeaderSection />
        </Column>
      </SafeAreaView>
    </View>
  );
}
