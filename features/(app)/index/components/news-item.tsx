import Column from '@/components/Column';
import { PengumumanData } from '@/features/(app)/index/types/pengumuman-response';
import React from 'react';
import { Dimensions, Text } from 'react-native';

export default function NewsItem({ data }: { data: PengumumanData }) {
  const { width: screenWidth } = Dimensions.get('window');

  const totalWord = 100;

  const description = () => {
    return (data.pengumuman ?? '').length > totalWord
      ? (data.pengumuman ?? '').slice(0, totalWord) + '...'
      : data.pengumuman;
  };

  return (
    <Column
      style={{
        marginHorizontal: screenWidth * 0.05,
        width: screenWidth * 0.9,
        height: 155,
      }}
      className='rounded-md bg-[#213168] p-4'
    >
      <Text className='sfPro600-14 text-white'>{data.title}</Text>
      <Text className='sfPro400-12 mt-1 text-white'>{data.date}</Text>
      <Text className='sfPro300-14 mt-2 leading-normal text-white'>
        {description()}{' '}
        {(data.pengumuman ?? '').length > totalWord && (
          <Text
            className='sfPro300-14 text-[#2b6ccc] underline'
            onPress={() => console.log('Baca Selengkapnya')}
          >
            Baca Selengkapnya
          </Text>
        )}
      </Text>
    </Column>
  );
}
