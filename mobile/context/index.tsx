import { getData } from "@/utils/storage";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GlobalContext = createContext({});

export const useGlobal = () => useContext<any>(GlobalContext);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const user = useSelector((state: any) => state.userSlice.user)

    const [token, setToken] = useState<string>("");

    useEffect(() => {
        getData("token").then((token) => {
            if (token) {
                setToken(token);
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        })
    }, []);

    useEffect(() => {
        if (!token) {
            router.push("/")
        }
    }, [token])

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
