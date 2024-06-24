import CustomButton from '@/components/CustomButton'
import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'

const Onboarding = () => {
    const router = useRouter();
    return (
        <SafeAreaView
            className='bg-white'
        >
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <View className='h-full items-center justify-center px-6 font-rubik'>
                    <Image
                        source={require("../assets/images/post-something.png")}
                        resizeMode='contain'
                        className='w-[240px] h-[240px]'
                    />
                    <Text className='text-xl font-bold font-rubik'>Welcome to PostStack</Text>
                    <View className='w-full mt-8'>
                        <CustomButton
                            title='Go Home'
                            handlePress={() => router.navigate("(tabs)")}
                            containerStyles='mb-3'
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Onboarding