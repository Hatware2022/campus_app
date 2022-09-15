import AsyncStorage from '@react-native-community/async-storage'
import create from 'zustand'
import {persist} from 'zustand/middleware'

type Credentials = {
  email: string
  password: string
}

type AuthenticationState = {
  token: string | undefined
  hasErrorLoggingIn: boolean
  errors: any
  isAuthenticating: boolean
  hasRehydrated: boolean
}

type AuthenticationActions = {
  login: (credentials: Credentials) => void
  onRehydrateStorage: (state: boolean) => void
}

type AuthenticationStore = AuthenticationState & AuthenticationActions

export const useAuth = create(
  persist<AuthenticationStore>(
    set => ({
      token: undefined,
      hasErrorLoggingIn: false,
      errors: null,
      isAuthenticating: false,
      hasRehydrated: false,
      login: () => {},
      onRehydrateStorage: state => {
        set({hasRehydrated: state})
      }
    }),
    {
      name: 'authentication-storage',
      getStorage: () => AsyncStorage,
      onRehydrateStorage: () => state => {
        state?.onRehydrateStorage(true)
      }
    }
  )
)
