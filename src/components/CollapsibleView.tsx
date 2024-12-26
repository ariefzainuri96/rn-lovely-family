import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, Pressable, LayoutChangeEvent } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface CollapsibleViewProps {
  header: (expanded: boolean) => React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const CollapsibleView = ({ children, className, header }: CollapsibleViewProps) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (contentHeight !== null) {
      Animated.timing(animationValue, {
        toValue: expanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [contentHeight, expanded]);

  const handleContentLayout = async (event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height === 0) return;

    if (contentHeight === null) {
      const _height = event.nativeEvent.layout.height;

      setContentHeight(_height);
    }
  };

  const heightInterpolate = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight || 0],
  });

  return (
    <View className={twMerge('flex flex-col items-start', className)}>
      <Pressable onPress={() => setExpanded((prev) => !prev)}>{header(expanded)}</Pressable>
      <Animated.View
        style={{ height: contentHeight === null ? null : heightInterpolate, overflow: 'hidden' }}
      >
        <View style={{ opacity: contentHeight === null ? 0 : 1 }} onLayout={handleContentLayout}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default CollapsibleView;
