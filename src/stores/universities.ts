import create from 'zustand'
import {persist} from 'zustand/middleware'
import {University} from '@/models'
import AsyncStorage from '@react-native-community/async-storage'

type UniversitiesState = {
  universities: University[]
  selectedUniversity: University | undefined
  hasErrorFetchingUniversities: boolean
  isLoadingUniversities: boolean
  errors: any
  hasRehydrated: boolean
}

type UniversitiesActions = {
  fetchUniversities: () => void
  onRehydrateStorage: (hasRehydrated: boolean) => void
  clearUniversities: () => void
}

type UniversitiesStore = UniversitiesState & UniversitiesActions

export const useUniversities = create(
  persist<UniversitiesStore>(
    set => ({
      universities: [],
      selectedUniversity: undefined,
      hasErrorFetchingUniversities: false,
      isLoadingUniversities: false,
      errors: null,
      hasRehydrated: false,
      fetchUniversities: () => {
        set({
          universities: [],
          hasErrorFetchingUniversities: false,
          isLoadingUniversities: true,
          errors: null
        })
        try {
          setTimeout(() => {
            set({
              universities: [
                {
                  name: 'Chapman University'
                }
              ],
              isLoadingUniversities: false
            })
          }, 5000)
        } catch (error) {}
      },
      clearUniversities: () => {
        set({universities: [], isLoadingUniversities: false})
      },
      onRehydrateStorage: val => {
        set({hasRehydrated: val})
      }
    }),
    {
      name: 'universities-storage',
      getStorage: () => AsyncStorage,
      onRehydrateStorage: () => state => {
        state?.onRehydrateStorage(true)
      }
    }
  )
)
