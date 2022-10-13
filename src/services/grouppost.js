import axios from 'axios'
import constants from '../utils/constants'

export default class {
  static getAll = async token => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/grouppost`, {
        headers: {
          Authorization: token,
          slug: constants.SLUG
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

  static getById = async (token, postId) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/grouppost/${postId}`, {
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

  static getByGroupId = async (token, groupId) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/grouppost/byGroupId/${groupId}`, {
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

  static add = async (token, data) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .post(`${constants.API_URL}/grouppost/add`, data, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
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

  static like = async (token, postId) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .post(`${constants.API_URL}/grouppost/like/${postId}`, '', {
        headers: {
          Authorization: token
        }
      })
      .then(resp => {
        if (resp.status === 200 || resp.status === 201) {
          result.data = resp.data
        }
      })
      .catch(err => {
        result.error = err.response.data
      })

    return result
  }
}
