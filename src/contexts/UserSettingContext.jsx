import React, { useState } from "react"
// =============================================================================
// GLOBAL STATE
// =============================================================================
const initial = {
    language: 'en',
    current: 'usd'
}

// =============================================================================
// INITS
// =============================================================================
const UserSettingContext = React.createContext()

// =============================================================================
// PROVIDER
// =============================================================================
const UserSettings = ({ children }) => {
    const [state, dispatch] = useState({ ...initial })

    return (
        <UserSettingContext.Provider value={[state, dispatch]}>
            {children}
        </UserSettingContext.Provider>
    )
}

// =============================================================================
// HOOK
// =============================================================================
const useUserSettings = () => {
    const state = React.useContext(UserSettingContext)[0];
    const dispatch = React.useContext(UserSettingContext)[1];



    const update = () => {
        dispatch(state => {
            return {
                ...state,
                language: 'es'
            }
        })
    }

    const updateCurrent = () => {
        dispatch(state => {
            return {
                ...state,
                current: 'eur'
            }
        })
    }

    return {
        ...state,
        state,
        update,
        updateCurrent
    };
};


// =============================================================================
// EXPORTS
// =============================================================================
export { UserSettingContext, UserSettings, useUserSettings }