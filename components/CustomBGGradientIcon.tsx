import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Circle } from 'react-native-svg';

interface CustomBGGradientIconProps {
  startColor: string;
  endColor: string;
  children?: ReactNode;
}
const CustomBGGradientIcon = ({ startColor, endColor, children }: CustomBGGradientIconProps) => {
  const radius = Math.min(32, 32) / 2;

  return (
    <View style={styles.container}>
      <Svg height={radius * 2} width={radius * 2}>
        <Defs>
          <SvgLinearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
            <Stop offset='0%' stopColor={startColor} stopOpacity='1' />
            <Stop offset='100%' stopColor={endColor} stopOpacity='1' />
          </SvgLinearGradient>
        </Defs>
        <Circle cx={radius} cy={radius} r={radius} fill='url(#grad)' />
      </Svg>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  childrenContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomBGGradientIcon;
