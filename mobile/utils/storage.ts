import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (e) {

    }
};

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {

    }
};

export const removeValue = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {

    }
}

export const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {

    }
}