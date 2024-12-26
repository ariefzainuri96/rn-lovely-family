import React from 'react';
import { Pressable, Text } from 'react-native';

type StandartBottomSheetItemProps = {
  onPress: () => void;
  content: string;
};

export default function StandartBottomSheetItem({
  onPress,
  content,
}: StandartBottomSheetItemProps) {
  return (
    <Pressable onPress={onPress}>
      <Text className='sfPro400-14'>{content}</Text>
    </Pressable>
  );
}
