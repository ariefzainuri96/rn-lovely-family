import Column from '@/src/components/Column';
import CustomAppbar from '@/src/components/CustomAppbar';
import Row from '@/src/components/Row';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, Image, Text, View } from 'react-native';

export default function Register() {
  const router = useRouter();

  return (
    <>
      <CustomAppbar />
      <ScrollView
        contentContainerStyle={{ padding: 0 }}
        keyboardShouldPersistTaps='always'
        className='flex-1 bg-white'
      >
        <Column
          style={{
            paddingTop: Constants.statusBarHeight,
          }}
          className='items-center px-[1.5rem] pb-[1.5rem]'
        >
          <Image
            source={require('@/assets/images/img_logo.png')}
            style={{ width: 100, height: 100 }}
            className='mt-8'
          />
          <Text className='chickenPie-16 mt-4 text-center text-[3rem]'>Create an Account</Text>

          <TouchableOpacity>
            <Row className='mt-10 w-full gap-4 rounded-md border border-black p-3'>
              <Image source={require('@/assets/images/img_facebook.png')} className='size-5' />
              <Text className='sfPro400-16 flex-1'>Continue with Facebook</Text>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity>
            <Row className='mt-4 w-full gap-4 rounded-md border border-black p-3'>
              <Image source={require('@/assets/images/img_google.png')} className='size-5' />
              <Text className='sfPro400-16 flex-1'>Continue with Google</Text>
            </Row>
          </TouchableOpacity>

          <View className='relative mt-8 w-full items-center justify-center'>
            <View className='relative z-0 h-[1px] w-full bg-lineSeparator' />
            <Text className='sfPro400-12 absolute z-10 self-center bg-white px-4'>Or</Text>
          </View>

          <TouchableOpacity>
            <Row className='mt-8 w-full gap-4 rounded-md border border-black p-3'>
              <Ionicons name='mail-outline' size={20} color='#333' />
              <Text className='sfPro400-16 flex-1'>Sign Up with Email</Text>
            </Row>
          </TouchableOpacity>

          <Text className='sfPro400-14 mt-6 text-gray'>
            Already have an account?{' '}
            <Text onPress={() => router.back()} className='sfPro600-14 text-black'>
              Login
            </Text>
          </Text>
        </Column>
      </ScrollView>
    </>
  );
}
