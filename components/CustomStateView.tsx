import { ActivityIndicator, Text, View } from 'react-native';
import Column from './Column';
import { Ionicons } from '@expo/vector-icons';
import { RequestState } from '@/helper/enums';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type CustomStateViewProps = {
  state: RequestState;
  Error?: React.ReactNode;
  Loading?: React.ReactNode;
  Content: React.ReactNode;
  onRetry?: () => void;
  errorMarginTop?: number;
  istextShouldWhite?: boolean;
  viewHeight?: number;
};

const CustomStateView = ({
  state,
  errorMarginTop,
  onRetry,
  Error,
  Loading,
  Content,
  istextShouldWhite = false,
  viewHeight,
}: CustomStateViewProps) => {
  return (
    <View style={{ height: viewHeight, flex: viewHeight ? 0 : 1, width: '100%' }}>
      {state === RequestState.LOADING ? (
        Loading ? (
          <>{Loading}</>
        ) : (
          <View className='flex flex-1 items-center justify-center'>
            <ActivityIndicator size={'small'} color={'#18469C'} />
          </View>
        )
      ) : null}

      {state === RequestState.ERROR ? (
        Error ? (
          <>{Error}</>
        ) : (
          <View className='flex w-full flex-1 items-center justify-center'>
            <Column className='items-center gap-2 rounded-md p-3'>
              <Ionicons name='warning-outline' size={24} color='red' />
              <Text
                className={twMerge(
                  'sfPro400-14 text-center text-gray1',
                  istextShouldWhite && 'text-white'
                )}
              >
                Failed to get data, please try again later.{' '}
                <Text
                  onPress={onRetry}
                  className={twMerge(
                    'sfPro600-14 text-primary underline',
                    istextShouldWhite && 'text-white'
                  )}
                >
                  Retry?
                </Text>
              </Text>
            </Column>
          </View>
        )
      ) : null}

      {state === RequestState.SUCCESS && <>{Content}</>}
    </View>
  );
};

export default CustomStateView;
