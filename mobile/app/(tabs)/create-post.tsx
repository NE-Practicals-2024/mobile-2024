import { fetchUsers, createPost } from '@/services/index';
import { ICreatePostData, IUser } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from '@react-native-picker/picker';
import { Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import * as yup from 'yup';

export default function CreatePost() {


    const [loading, setLoading] = useState<boolean>(false)
    const [usersLoading, setUsersLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<IUser[]>([])

    const toast = useToast()

    const RegisterPostSchema = yup.object({
        userId: yup.number().required().label("User ID"),
        title: yup.string().required().label("Title"),
        body: yup.string().required().label("Body")
    })

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<ICreatePostData>({
        resolver: yupResolver(RegisterPostSchema) as Resolver<ICreatePostData, any>,
        mode: "onTouched"
    })

    const onSubmit: SubmitHandler<ICreatePostData> = async (data) => {
        await createPost({ toast, setLoading, data, reset })
    }

    const getUsers = async () => {
        await fetchUsers({ toast, setUsers, setLoading: setUsersLoading })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <SafeAreaView className='w-full flex-1 pt-24 bg-white'>
            <TouchableOpacity onPress={() => router.back()} className='absolute top-14 left-4'>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView className='w-full p-4'>
                <Text className='text-xl font-bold'>Create Post</Text>
                <View className='my-2 w-full'>
                    <View className='w-full flex flex-col my-2'>
                        <Text className='mb-1'>Title</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="e.g: Elections ahead, what's on the streets?"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    className='border w-full p-2 rounded-lg border-slate-400'
                                />
                            )}
                            name="title"
                        />
                        <Text className=' text-red-500'>{errors?.title?.message}</Text>
                    </View>
                    <View className='w-full flex flex-col my-2'>
                        <Text className='mb-1'>User</Text>
                        <Picker
                            selectedValue={
                                getValues("userId") || ""
                            }
                            onValueChange={(itemValue) => setValue("userId", parseInt(itemValue.toString()))}
                        >
                            {
                                users.map((user, index) => (
                                    <Picker.Item key={index} label={user.name} value={user.id} />
                                ))
                            }
                        </Picker>
                        <Text className=' text-red-500'>{errors?.userId?.message}</Text>
                    </View>
                    <View className='w-full flex flex-col my-2'>
                        <Text className='mb-1'>Body</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Enter your body here"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical='top'
                                    className='border w-full p-2 rounded-lg border-slate-400'
                                />
                            )}
                            name="body"
                        />
                        <Text className=' text-red-500'>{errors?.body?.message}</Text>
                    </View>

                </View>
                <TouchableOpacity className="flex items-center justify-center mx-auto w-10/12 bg-primary text-white rounded-lg p-2 my-2" onPress={handleSubmit(onSubmit)}>
                    <Text className='text-center text-white text-lg font-semibold'>
                        {
                            loading ?
                                <ActivityIndicator size='small' color='white' />
                                :
                                "Save"
                        }
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
