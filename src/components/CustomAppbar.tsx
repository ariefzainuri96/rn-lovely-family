import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

type CustomAppbarProps = {
  headerTitle?: string;
  headerTintColor?: string;
  backgroundColor?: string;
  translucent?: boolean;
  statusBarStyle?: 'light' | 'dark';
  statusBarColor?: string;
} & React.ComponentPropsWithoutRef<typeof Stack.Screen>;

const CustomAppbar = ({
  headerTitle,
  backgroundColor = '#1E3A8A',
  headerTintColor = '#FFF',
  translucent = true,
  statusBarStyle = 'light',
  statusBarColor = '#00000066',
  ...props
}: CustomAppbarProps) => {
  return (
    <>
      <StatusBar
        translucent={translucent}
        style={statusBarStyle}
        backgroundColor={statusBarColor}
      />

      <Stack.Screen
        options={{
          headerTitle: headerTitle,
          headerTitleStyle: {
            fontFamily: 'SfPro500',
            fontSize: 18,
          },
          headerTintColor: headerTintColor,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          ...props.options,
        }}
      />
    </>
  );
};

export default CustomAppbar;
