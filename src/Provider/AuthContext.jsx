import React, { createContext, use, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);




    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }


       const logOut=()=>{
          return signOut(auth);

    }

      

     function googleLogin() {
    return signInWithPopup(auth, GoogleAuthProvider)
  }



    const authData = {
        user,
        setUser,
        createUser,
       googleLogin,
        logOut,
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