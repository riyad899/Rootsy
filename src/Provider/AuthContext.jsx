import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    console.log(user);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const authData = {
        user,
        setUser,
        createUser,
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unSubscribe();
        }
    }, [])



    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};