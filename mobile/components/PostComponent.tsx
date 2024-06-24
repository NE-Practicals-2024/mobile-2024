import { IPost } from '@/types';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from './CustomButton';
const PostComponent: React.FC<{
    post: IPost
}> = ({ post }) => {
    return (
        <View className='mx-auto my-2 w-full flex flex-col p-4 rounded-lg border border-slate-400'>
            <Text className='font-semibold'>{post.title}</Text>
            <Text className='my-1'>{post.body.slice(0, 50)}...</Text>
            <CustomButton
                title='Read More'
                handlePress={() => router.navigate(`/post/${post.id}`)}
                containerStyles='mb-3 bg-[#1967D2]'
            />
        </View>
    );
}

export default PostComponent
