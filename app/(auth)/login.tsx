import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import CustomInput from '@/src/components/CustomInput';
import useLogin from '@/src/features/(auth)/login/hooks/use-login';
import Column from '@/src/components/Column';
import React from 'react';
import CustomAppbar from '@/src/components/CustomAppbar';
import Row from '@/src/components/Row';
import { Link } from 'expo-router';
import AnimatedToast from '@/src/components/CustomToast';

const LoginPage = () => {
  const {
    form,
    handleLogin,
    showPassword,
    setShowPassword,
    errors,
    mutationLogin,
    toast,
    handleChange,
  } = useLogin();

  return (
    <>
      <AnimatedToast
        message={toast.toastMessage}
        visible={toast.toastVisible}
        onDismiss={() => toast.hideToast()}
      />
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
          <Text className='chickenPie-16 mt-4 text-[3rem]'>Welcome Back!</Text>
          <CustomInput
            className='mt-[2.5rem]'
            value={form.email}
            placeholder='Email'
            keyboardType='email-address'
            returnKeyType='next'
            onChange={(e) => handleChange('email', e.nativeEvent.text)}
            error={(errors ?? []).find((item) => item.path.includes('email'))?.message}
            editable={!mutationLogin.isPending}
          />
          <CustomInput
            className='mt-3'
            value={form.password}
            placeholder='Password'
            textType='password'
            onChange={(e) => handleChange('password', e.nativeEvent.text)}
            secureTextEntry={showPassword}
            error={(errors ?? []).find((item) => item.path.includes('password'))?.message}
            onSubmitEditing={() => handleLogin()}
            editable={!mutationLogin.isPending}
            onPasswordReveal={() => setShowPassword((prev) => !prev)}
          />
          <View className='relative mt-8 w-full items-center justify-center'>
            <View className='relative z-0 h-[1px] w-full bg-lineSeparator' />
            <Text className='sfPro400-12 absolute z-10 self-center bg-white px-4'>Or</Text>
          </View>

          <Row className='mt-10 justify-center gap-6'>
            <TouchableOpacity>
              <View className='rounded-md border border-black p-3'>
                <Image source={require('@/assets/images/img_facebook.png')} className='size-5' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className='rounded-md border border-black p-3'>
                <Image source={require('@/assets/images/img_google.png')} className='size-5' />
              </View>
            </TouchableOpacity>
          </Row>

          <Text className='sfPro400-14 mt-6 text-gray'>
            Don't have an account?{' '}
            <Link asChild href={'/(auth)/register'}>
              <Text className='sfPro500-14 text-black'>Sign up</Text>
            </Link>
          </Text>
        </Column>
      </ScrollView>
    </>
  );
};

export default LoginPage;
