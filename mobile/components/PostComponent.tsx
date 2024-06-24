import { IPost, IUser } from '@/types';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import CustomButton from './CustomButton';
import { getUser } from '@/services';
import { useToast } from 'react-native-toast-notifications';
const PostComponent: React.FC<{
    post: IPost
}> = ({ post }) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const [user, setUser] = React.useState<IUser>()

    const toast = useToast()

    const fetchUser = async () => {
        await getUser({ id: post.userId, setLoading, setUser, toast })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    // Generate random width btn 500-700
    const w = Math.ceil(Math.random() * 200 + 500)
    const h = Math.ceil(Math.random() * 200 + 500)
    const randomUrl = `https://picsum.photos/${w}/${h}?random=1`

    return (
        <View className='mx-auto my-2 w-full flex flex-col p-4 rounded-lg border border-slate-400'>
            <View className='flex flex-row my-3'>
                <Image
                    source={{ uri: randomUrl }}
                    className="w-12 h-12 rounded-full"
                />
                <View className='ml-2 flex'>
                    <Text className='font-semibold'>{user?.name}</Text>
                    <Text className='text-xs'>{user?.email}</Text>
                </View>
            </View>
            <Text className='font-semibold'>{post.title}</Text>
            <Text className='my-3'>{post.body.slice(0, 80)}...</Text>
            <CustomButton
                title='Read More'
                handlePress={() => router.navigate(`/post/${post.id}`)}
                containerStyles='mb-3 bg-[#1967D2]'
            />
        </View>
    );
}

export default PostComponent
