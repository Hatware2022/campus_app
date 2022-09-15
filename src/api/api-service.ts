import {useAuth} from '@/stores'
import {API_URL} from '@env'
import axios from 'axios'

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json'
  }
})

instance.interceptors.request.use(req => {
  const token = useAuth.getState().token
  if (typeof token === 'undefined') {
    return req
  }

  req.headers = {
    Authorization: `Bearer ${token}`
  }
  return req
})

export {instance}
