import Column from '@/components/Column';
import { MenuModel } from '@/features/(app)/index/types/menu-model';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';

export default function MenuItem({ menu, index }: { menu: MenuModel; index: number }) {
  const router = useRouter();
  const itemWidth = Dimensions.get('window').width / 3 - 16;

  function routeTo() {
    switch (index) {
      case 0:
        router.push('/(app)/(manajemen-inventaris)');
        break;
      case 1:
        router.push('/(app)/manajemen-barang-pakai-habis');
        break;
      case 2:
        router.push('/(app)/manajemen-aset');
        break;
      case 3:
        router.push('/(app)/task-approval');
        break;
      default:
        break;
    }
  }

  return (
    <Pressable onPress={() => routeTo()}>
      <Column style={{ width: itemWidth }} className='m-1 items-center'>
        <View
          style={{ backgroundColor: menu.bgColor }}
          className='flex size-[3.5rem] items-center justify-center rounded-full'
        >
          <menu.icon />
        </View>
        <Text className='sfPro400-12 mt-2 text-center'>{menu.title}</Text>
      </Column>
    </Pressable>
  );
}
