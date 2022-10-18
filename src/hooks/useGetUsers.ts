import {useState, useEffect} from 'react'

import userService from '../services/user'
import session from '../store/session'
import keys from '../store/keys'

const useGetUsers = (members: number[]) => {
  const [membersDetails, setMembersDetails] = useState<any[]>([])
  const [error, setError] = useState<Error | any>(null)

  useEffect(() => {
    try {
      const membersData = members?.map(item =>
        userService.getById(session.get(keys.token), item)
      )
      Promise.all(membersData).then(res => {
        const membersDataDetails = res.map((member: any) => member?.data?.data)
        setMembersDetails(membersDataDetails)
      })
    } catch (_err: any) {
      setError(new Error(_err.message || 'Sorry, an unknown error occured.'))
    }
  }, [members])

  return [membersDetails, error]
}

export default useGetUsers
