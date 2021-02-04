import { useContext, createContext, useState } from 'react'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

const AppContextProvider = ({ children }) => {  
  const [isLoading, setIsLoading] = useState(false)
  return (
    <AppContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider