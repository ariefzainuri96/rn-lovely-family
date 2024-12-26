import React, { useState, useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';

type AnimatedToastProps = {
  message: string;
  visible: boolean;
  duration?: number;
  onDismiss: () => void;
};

const AnimatedToast = ({ message, visible, duration = 3000, onDismiss }: AnimatedToastProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Auto-hide the toast after the specified duration
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onDismiss && onDismiss();
          });
        }, duration);
      });
    }
  }, [visible, fadeAnim, duration, onDismiss]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      className='elevation-[5] absolute bottom-8 left-4 right-4 z-20 rounded-md bg-[#333] px-4 py-2.5'
      style={{ opacity: fadeAnim }}
    >
      <Text className='sfPro400-16 text-white'>{message}</Text>
    </Animated.View>
  );
};

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const hideToast = () => setToastVisible(false);

  return {
    toastMessage,
    toastVisible,
    showToast,
    hideToast,
  };
};

export default AnimatedToast;
