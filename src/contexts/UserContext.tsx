import { createContext, useContext, useState } from 'react'

export type User = {
  name: string
}

export const UserContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
  login: (name: string) => void
  logout: () => void
}>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
})

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)

  const login = (name: string) => {
    setUser({ name })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext value={{ user, setUser, login, logout }}>
      {children}
    </UserContext>
  )
}

export function useUser() {
  const userContext = useContext(UserContext)

  return userContext
}
