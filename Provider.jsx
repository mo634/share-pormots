// to wrap all components with session provider
"use client"
import {SessionProvider} from 'next-auth/react';

const Provider = ({ children,session}) => {
return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
)
}

export default Provider