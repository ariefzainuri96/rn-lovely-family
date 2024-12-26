import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { ComponentPropsWithoutRef, ReactNode, useCallback, useEffect, useRef } from 'react';
import { Dimensions, Pressable, Text, TouchableOpacity } from 'react-native';
import Column from './Column';
import Row from './Row';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useBottomSheetBackHandler } from '@/hooks/use-bottom-sheet-back-handler';

type CustomButtonBottomSheetProps = {
  label?: string;
  value?: string;
  error?: string;
  bottomSheetTitle?: string;
  children: ReactNode;
  className?: string;
  enable?: boolean;
};

export default function CustomButtonBottomSheet({
  label,
  value,
  error,
  children,
  enable = true,
  bottomSheetTitle = 'Pilih Item',
  className,
}: CustomButtonBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { handleSheetPositionChange } = useBottomSheetBackHandler(bottomSheetRef);

  const { height: screenHeight } = Dimensions.get('window');
  // const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  useEffect(() => {
    bottomSheetRef.current?.close();
  }, [value]);

  return (
    <>
      <Column className={twMerge('w-full', className)}>
        {label && <Text className='leading-none sfPro400-14 line-clamp-1 text-gray3'>{label}</Text>}
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Row
            className={twMerge(
              'mt-1 h-[3.25rem] w-full gap-2 rounded-[4px] border border-[#E0E0E0] px-4',
              !enable && 'bg-[#F8F8F8]'
            )}
          >
            <Text className='flex-1 leading-none sfPro300-14 line-clamp-1'>{value}</Text>
            <Ionicons name='chevron-down' size={16} color='#333333' />
          </Row>
        </TouchableOpacity>
        {error && <Text className='mt-1 font-SfPro300 text-[.75rem] text-red1'>{error}</Text>}
      </Column>
      <BottomSheetModal
        // leave it to empty if we want the height to be dynamic
        // snapPoints={snapPoints}
        ref={bottomSheetRef}
        onChange={handleSheetPositionChange}
        backdropComponent={renderBackdrop}
        maxDynamicContentSize={screenHeight * 0.5}
        handleComponent={null}
        enablePanDownToClose={false}
      >
        {/* Header */}
        <Row className='w-full gap-4 px-4 py-2'>
          <Pressable onPress={() => bottomSheetRef.current?.close()}>
            <Ionicons name='close' size={20} color={'#333333'} />
          </Pressable>
          <Text className='flex-1'>{bottomSheetTitle}</Text>
        </Row>
        {children}
      </BottomSheetModal>
    </>
  );
}
