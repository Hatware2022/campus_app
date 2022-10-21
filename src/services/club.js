import axios from 'axios'
import constants from '../utils/constants'

export default class {
  static getClub = async token => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/club`, {
        headers: {
          Authorization: token,
          slug: 'develop'
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          result.data = resp.data
        }
      })
      .catch(err => {
        result.error = err.response.data
      })

    return result
  }

  static delete = async (token, id) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .put(
        `${constants.API_URL}/club/posts/delete/${id}`,
        {},
        {headers: {Authorization: token}}
      )
      .then(resp => {
        if (resp.status === 200) {
          result.data = resp.data
        }
      })
      .catch(err => {
        result.error = err.response.data
      })

    return result
  }

  static hide = async (token, id) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .put(
        `${constants.API_URL}/club/posts/hide/${id}`,
        {},
        {headers: {Authorization: token}}
      )
      .then(resp => {
        console.log(resp.data)
        if (resp.status === 200) {
          result.data = resp.data
        }
      })
      .catch(err => {
        console.log(err.response)
        result.error = err.response.data
      })

    return result
  }

  static join = async (token, id) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .post(
        `${constants.API_URL}/club/join/${id}`,
        {},
        {headers: {Authorization: token}}
      )
      .then(resp => {
        if (resp.status === 200) {
          result.data = resp.data
        }
      })
      .catch(err => {
        result.error = err.response.data
      })

    return result
  }

  static leave = async (token, id) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .delete(`${constants.API_URL}/club/leave/${id}`, {
        headers: {Authorization: token}
      })
      .then(resp => {
        if (resp.status === 200) {
          result.data = resp.data
        }
      })
      .catch(err => {
        result.error = err.response.data
      })

    return result
  }

  static like = async (token, id) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .post(
        `${constants.API_URL}/club/posts/${id}/like`,
        {},
        {headers: {Authorization: token}}
      )
      .then(resp => {
        console.log(resp)
        if (resp.status === 201) {
          result.data = resp.data
        }
      })
      .catch(err => {
        console.log(err)
        result.error = err.response.data
      })

    return result
  }

  static create = async (token, data) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .post(`${constants.API_URL}/club/posts/add`, data, {
        headers: {Authorization: token}
      })
      .then(resp => {
        if (resp.status === 201) {
          result.data = resp.data
        }
      })
      .catch(err => {
        if (err.response.data.code === 'VALIDATION_ERROR') {
          result.error = err.response.data.message
          console.log(err.response.data.error.details)
        } else {
          result.error = err.response.data
        }
      })

    return result
  }

  static getClubByUser = async token => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/club/byUserId/all`, {
        headers: {
          Authorization: token,
          slug: 'develop'
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          result.data = resp.data
        }
      })
      .catch(err => {
        result.error = err.response.data
      })

    return result
  }

  static getAllPosts = async token => {
    let result = {
      data: null,
      error: null
    }
    await axios
      .get(`${constants.API_URL}/club/posts/all`, {
        headers: {Authorization: token}
      })
      .then(resp => {
        if (resp.status === 200) {
          result.data = resp.data
        }
      })
      .catch(err => {
        alert(err)
        result.error = err.response.data
      })

    return result
  }
}
