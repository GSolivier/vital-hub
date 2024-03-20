import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppStorage = {
    write: write,
    read: read
}

export async function write<T>(key: string, data: T): Promise<void> {
  try {
    const dataStringified = JSON.stringify(data);
    await AsyncStorage.setItem(key, dataStringified);
  } catch (error) {
    console.error("Error writing to AsyncStorage:", error);
    throw error;
  }
}

export async function read<T>(key: string): Promise<T | null> {
  try {
    const dataConverted = await AsyncStorage.getItem(key);
    return dataConverted != null ? (JSON.parse(dataConverted) as T) : null;
  } catch (error) {
    console.error("Error reading from AsyncStorage:", error);
    throw error;
  }
}
