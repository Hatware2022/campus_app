import axios from 'axios'
import constants from '../utils/constants'

export default class {
  static getAll = async (token, conversationId) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/messages/conversation/${conversationId}`, {
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

  static getById = async (token, postId) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/message/${postId}`, {
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

  static create = async (token, data) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .post(`${constants.API_URL}/messages/add`, data, {
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

  static update = async (token, id, data) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .put(`${constants.API_URL}/message/${id}`, data, {
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
}
