import { createContext, useContext, useState, type ReactNode } from 'react'

// contexto para o projeto de organização de estudos, fornecendo informações globais sobre o aplicativo, como o nome do aplicativo.

type User = {
    id: string,
    name: string,
    email: string
}

type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => void
    logout: () => void
}

const AuthContent = createContext<AuthContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    function login(email: string, password: string) {
        console.log(email, password)

        setUser({
            id: '1',
            name: 'Gabriel',
            email: email
        })
    }

    function logout() {
        setUser(null)
    }


    const value: AuthContextType = {
        user,
        login,
        logout
    }
    return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>
}

export function useAuth() {
    const context = useContext(AuthContent)

    if (!context) {
        throw new Error('useAuth must be used within an AppProvider')
    }

    return context
}
