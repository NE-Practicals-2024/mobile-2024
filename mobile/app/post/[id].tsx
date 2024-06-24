import { deletePost, fetchPostData } from '@/services';
import { IComment, IPost } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export default function PostScreen() {

    const { id } = useLocalSearchParams()
    const [post, setPost] = useState<IPost>()
    const [comments, setComments] = useState<IComment[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const toast = useToast()

    const getPostData = async () => {
        await fetchPostData({ id: id as string, setPost, setComments, toast, setLoading })
    }

    const removePost = async () => {
        await deletePost({ id: id as string, toast, setLoading })
    }

    useEffect(() => {
        getPostData()
    }, [])

    return (
        <SafeAreaView className='w-full flex-1 flex-col flex pt-24 px-3'>
            <ScrollView>
                <Stack.Screen options={{ headerShown: false }} />
                <View className='w-full flex flex-row justify-between items-center'>
                <TouchableOpacity onPress={() => router.back()} className='ml-4 bg-primary rounded-full w-10 h-10 flex items-center justify-center'>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={removePost} className='mr-4 bg-red-600 rounded-full w-10 h-10 flex items-center justify-center'>
                    <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
                </View>
                <Text className='text-lg my-4 font-semibold'>{post?.title}</Text>
                <Text className='mb-4 italic text-slate-700'>Written By: John Doe</Text>
                <Image className='w-full h-44 rounded-lg' source={{ uri: "https://picsum.photos/500/500" }} />
                <Text className='my-4 text-[15px]'>{post?.body}</Text>
                <Text className='my-3 font-semibold'>Comments</Text>
                <View className='w-full'>
                    {comments.map((comment, index) => (
                        <View key={index} className='w-full bg-gray-300 p-3 my-2 rounded-lg'>
                            <Text className='text-sm'>{comment.body}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
