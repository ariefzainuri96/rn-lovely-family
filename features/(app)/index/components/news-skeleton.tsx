import { getRandomNumber } from '@/helper/utils';
import { Dimensions, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export default function NewsSkeleton() {
  const { width: screenWidth } = Dimensions.get('window');

  return (
    <View
      style={{
        marginHorizontal: screenWidth * 0.05,
        width: screenWidth * 0.9,
        height: 155,
      }}
      className='mt-[1.5rem] flex flex-col items-start rounded-md bg-[#213168] p-4'
    >
      <View className='flex w-full animate-pulse flex-col items-start'>
        <View className='h-3 w-[127px] rounded bg-slate-200' />
        <View className='mt-2 h-3 w-[91px] rounded bg-slate-200' />
        {Array.from({ length: getRandomNumber(3, 5) }).map((_, index) => (
          <View
            key={index}
            style={{
              width: getRandomNumber(200, screenWidth * 0.75),
            }}
            className={twMerge('h-3 rounded bg-slate-200', index === 0 ? 'mt-3' : 'mt-2')}
          />
        ))}
      </View>
    </View>
  );
}
