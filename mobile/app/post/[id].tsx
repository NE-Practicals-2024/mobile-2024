import { deletePost, fetchPostData } from '@/services';
import { IComment, IPost } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export default function PostScreen() {
    const { id } = useLocalSearchParams()
    const [post, setPost] = useState<IPost>()
    const [comments, setComments] = useState<IComment[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
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

    const handleLoadMore = () => {
        if (comments.length < page * limit) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const renderComment = ({ item }: { item: IComment }) => (
        <View className='w-full bg-gray-300 p-3 my-2 rounded-lg'>
            <Text className='text-sm italic'>{item.body}</Text>
        </View>
    );

    return (
        <SafeAreaView className='flex-1 pt-12 px-3'>
            <Stack.Screen options={{ headerShown: false }} />
            <View className='flex-row justify-between items-center'>
                <TouchableOpacity onPress={() => router.back()} className='ml-4 bg-primary rounded-full w-10 h-10 flex items-center justify-center'>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={removePost} className='mr-4 bg-red-600 rounded-full w-10 h-10 flex items-center justify-center'>
                    <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text className='text-lg my-4 font-semibold'>{post?.title}</Text>
            <Text className='mb-4 italic text-slate-700'>Written By: John Doe</Text>
            <ScrollView>
                <Image className='w-full h-44 rounded-lg' source={{ uri: "https://picsum.photos/500/500" }} />
                <Text className='my-4 text-[15px]'>{post?.body}</Text>
                <Text className='my-3 font-semibold'>Comments</Text>
                <FlatList
                    data={comments.slice(0, page * limit)}
                    renderItem={renderComment}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    horizontal={false}
                    ListEmptyComponent={() => (
                        <View className='items-center py-3'>
                            <Text className='text-gray-700'>No comments available</Text>
                        </View>
                    )}
                    ListHeaderComponent={() => (
                        <></>
                    )}
                    ListFooterComponent={() => (
                        <></>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
