import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppStorage, AppStorageKeys } from '../settings/AppStorage';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    // Carrega os dados do usuário do armazenamento local quando o componente é montado
    useEffect(() => {
        const loadUserData = async () => {
            const storedUserData = await AppStorage.read(AppStorageKeys.userData);
            if (storedUserData) {
                setUserData(storedUserData);
            }
        };

        loadUserData();
    }, []);

    const updateUserData = async (data) => {
        await AppStorage.write(AppStorageKeys.userData, data);
        setUserData(data);
    };

    const clearUserData = async () => {
        await AppStorage.clear(AppStorageKeys.userData);
        setUserData(null);
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData, clearUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);