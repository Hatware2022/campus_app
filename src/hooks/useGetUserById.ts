import {useState, useEffect} from 'react'

import userService from '../services/user'
import session from '../store/session'
import keys from '../store/keys'

import type {TUser, TGetUserByIdResult} from '../types'

const useGetUsers = (userId: number, dependencies: any[] = []) => {
  const [record, setRecord] = useState<TUser | null>(null)
  const [error, setError] = useState<Error | any>(null)

  useEffect(() => {
    try {
      if (!userId) {
        return
      }
      userService
        .getById(session.get(keys.token), userId)
        .then((result: TGetUserByIdResult) => {
          if (result.data && result.data.success === true) {
            let r = result.data.data
            setRecord(r)
          }
        })
    } catch (_err: any) {
      setError(new Error(_err.message || 'Sorry, an unknown error occured.'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies])

  return [record, error]
}

export default useGetUsers
