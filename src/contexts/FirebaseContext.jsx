import React, { useContext, useState, useEffect } from "react"
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import firebase, { auth } from "../firebase"


// =============================================================================
// CONTEXT
// =============================================================================
const AuthContext = React.createContext()
const FirebaseContext = React.createContext({ firebase: firebase })


// =============================================================================
// HOOKS
// =============================================================================
export function useAuth() {
    return useContext(AuthContext)
}

export function useFirebase() {
    return useContext(FirebaseContext)
}


// =============================================================================
// AUTH PROVIDER FUNCTIONS
// =============================================================================
export function AuthProvider({ children }) {
    // =========================================================================
    // STATES
    // =========================================================================
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [userSettings, setUserSettings] = useState(null)


    useEffect(() => {
        if (currentUser) {
            console.log('triggered')
            firebase.firestore().collection('users').doc(currentUser.uid).get().then((doc) => {
                if (doc.exists) {
                    setUserSettings(doc.data())
                }
            })
        }
    }, [currentUser])


    // =========================================================================
    // FUNCTIONS
    // =========================================================================
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        loading,
        userSettings
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

