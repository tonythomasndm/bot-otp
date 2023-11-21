// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext(undefined);

export function UserProvider({ children }) {
    const [user, setUser] = useState({loggedIn: false, email: '', balance: 0 });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
