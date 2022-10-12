import session from '../store/session'
import axios from 'axios'
import constants from '../utils/constants'
import keys from '../store/keys'

export default class {
  static addComment = async (token, data, apiPath = 'post/comment') => {
    let result = {
      data: null,
      error: null
    }

    let loginType = session.get(keys.loginType) || null
    await axios
      .post(
        loginType === 'organization'
          ? `${constants.API_URL}/club/posts/comment/add`
          : `${constants.API_URL}/${apiPath}`,
        data,
        {headers: {Authorization: token}}
      )
      .then(resp => {
        if (resp.status === 201) {
          result.data = resp.data
        }
      })
      .catch(err => {
        // alert(err)
        result.error = err.response.data
      })

    return result
  }
}
