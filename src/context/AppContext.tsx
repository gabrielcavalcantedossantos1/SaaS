import { createContext, useContext, type ReactNode } from 'react'

// contexto para o projeto de organização de estudos, fornecendo informações globais sobre o aplicativo, como o nome do aplicativo.

type AppContextType = {
  appName: string,
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const value: AppContextType = {
    appName: 'StudyFlow',
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }

  return context
}
