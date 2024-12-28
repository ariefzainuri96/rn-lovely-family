import React from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Column from '@/src/components/Column';
import CustomAppbar from '@/src/components/CustomAppbar';
import { useDashboard } from '@/src/features/(app)/index/hooks/use-dashboard';
import HeaderSection from '@/src/features/(app)/index/sections/header-section';

export default function DashboardPage() {
  const { queryImage } = useDashboard();
  const width = Dimensions.get('window').width;

  return (
    <>
      <CustomAppbar
        options={{
          headerTitle: 'Welcome Back!',
          headerShown: true,
        }}
      />
      <View className='flex-1 bg-white'>
        <FlatList
          data={queryImage.data}
          numColumns={2}
          keyExtractor={(item) => (item.id ?? 0).toString()}
          contentContainerStyle={{ paddingBottom: 10, paddingLeft: 10 }}
          columnWrapperStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View className='mt-2.5 rounded-md bg-white shadow-md'>
              <Image
                source={{ uri: item.imageUrl }}
                alt='image'
                style={{
                  objectFit: 'contain',
                }}
                className='h-[50vw] w-[45.75vw] rounded-md'
              />
            </View>
          )}
          className='flex-1'
        />
      </View>
    </>
  );
}
