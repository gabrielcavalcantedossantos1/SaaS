import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { auth } from '../services/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from 'firebase/auth'
import { Spinner } from '../components/spinner/Spinner'

// Cria um contexto global de autenticação para compartilhar dados e ações entre componentes.
// Esse contexto permite que qualquer parte da aplicação saiba quem está logado e execute ações como login, registro e logout.

// Define o formato do usuário usado dentro do app.
type User = {
    id: string,
    name: string,
    email: string
}

// Define a estrutura do contexto de autenticação.
// Aqui são expostos os dados e funções que qualquer componente pode consumir.
type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    loading: boolean
}

// Cria o contexto com um valor inicial indefinido.
// O provider abaixo vai preencher esse contexto com os dados reais de autenticação.
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider responsável por fornecer o estado e as funções de autenticação para toda a árvore de componentes.
export function AppProvider({ children }: { children: ReactNode }) {
    // Estado que guarda o usuário autenticado atualmente.
    // Quando ninguém está logado, o valor é null.
    const [user, setUser] = useState<User | null>(null)
    //Estado de carregamento
    const [loading, setLoading] = useState(true)

    // Realiza login com email e senha usando o Firebase.
    async function login(email: string, password: string) {
        // Faz a autenticação do usuário no Firebase.
        const credential = await signInWithEmailAndPassword(auth, email, password)

        // Pega o usuário retornado pelo Firebase.
        const firebaseUser = credential.user

        // Salva no estado do app somente os dados que precisamos usar na interface.
        setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName ?? '',
            email: firebaseUser.email ?? ''
        })
    }

    // funçao que verifica se o usuario esta authenticado ou não quando a paggina reinicia
    useEffect(() => {
        //esta const abaixo verifica se ha um usuario logado
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName ?? "",
                    email: firebaseUser.email ?? ''
                })
            } else {
                //se nao achou um usuario ele se torna nulo
                setUser(null)
            }

            //finalizando o carregamento
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    // Cria uma nova conta com nome, email e senha.
    async function register(name: string, email: string, password: string) {
        // Cria o usuário no Firebase.
        const credential = await createUserWithEmailAndPassword(auth, email, password)

        // Pega o usuário recém-criado.
        const firebaseUser = credential.user

        // Atualiza o perfil do usuário com o nome informado.
        await updateProfile(firebaseUser, {
            displayName: name
        })

        // Atualiza o estado local para refletir o usuário autenticado no app.
        setUser({
            id: firebaseUser.uid,
            name,
            email: firebaseUser.email ?? ''
        })
    }

    // Faz logout do usuário autenticado no Firebase e limpa o estado local.
    async function logout() {
        await signOut(auth)
        setUser(null)
    }

    // se estiver em estado de carregamento carrega o componente spinner
    if (loading) return <Spinner />

    // Objeto com todos os valores e funções que serão compartilhados pelo contexto.
    const value: AuthContextType = {
        user,
        login,
        logout,
        register,
        loading
    }

    // Entrega o valor do contexto para todos os componentes filhos.
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook customizado para consumir o contexto de autenticação de forma segura.
export function useAuth() {
    // Busca o valor atual do contexto.
    const context = useContext(AuthContext)

    // Garante que o hook só seja usado dentro do AppProvider.
    if (!context) {
        throw new Error('useAuth must be used within an AppProvider')
    }

    // Retorna o contexto para uso nos componentes.
    return context
}
