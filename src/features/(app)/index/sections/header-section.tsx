import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import IcBell from '@/assets/icons/ic-bell.svg';

import { Link } from 'expo-router';
import Row from '@/src/components/Row';
import CustomBGGradientIcon from '@/src/components/CustomBGGradientIcon';
import { useAuth } from '@/src/features/auth-context';

const HeaderSection = () => {
  const auth = useAuth();

  return (
    <Row className='mt-4 gap-2 px-4'>
      <Text className='sfPro600-14 flex-1 text-[1.5rem] text-white'>SIMART</Text>
      <View className='size-[2.25rem] items-center justify-center rounded-full bg-[#FFFFFF26]'>
        <IcBell fill={'#fff'} />
      </View>
      {/* <Link href={'/(app)'}>
        <CustomBGGradientIcon startColor={'#F66565'} endColor={'#E53C3C'}>
          <Text className='text-white sfPro500-14'>S</Text>
        </CustomBGGradientIcon>
      </Link> */}

      <TouchableOpacity onPress={() => auth?.signOut()}>
        <CustomBGGradientIcon startColor={'#F66565'} endColor={'#E53C3C'}>
          <Text className='sfPro500-14 text-white'>S</Text>
        </CustomBGGradientIcon>
      </TouchableOpacity>
    </Row>
  );
};

export default HeaderSection;
