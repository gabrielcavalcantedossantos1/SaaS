import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { getAuthErrorMessage } from "../utils/firebaseErrors";
import { notify } from "../services/toast";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loading: boolean;
  initialLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Loading para ações (login, cadastro e logout)
  const [loading, setLoading] = useState(false);

  // Loading da verificação inicial da sessão
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName ?? "",
          email: firebaseUser.email ?? "",
        });
      } else {
        setUser(null);
      }

      setInitialLoading(false);
    });

    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const firebaseUser = credential.user;

      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.displayName ?? "",
        email: firebaseUser.email ?? "",
      });

      notify.success("Logado com sucesso!");
    } catch (error) {
      notify.error(getAuthErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const firebaseUser = credential.user;

      await updateProfile(firebaseUser, {
        displayName: name,
      });

      setUser({
        id: firebaseUser.uid,
        name,
        email: firebaseUser.email ?? "",
      });

      notify.success("Registrado com sucesso!");
    } catch (error) {
      notify.error(getAuthErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);

    try {
      await signOut(auth);

      setUser(null);

      notify.success("Deslogado com sucesso!");
    } catch (error) {
      notify.error(getAuthErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
        initialLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AppProvider");
  }

  return context;
}
