import axios from 'axios'
import constants from '../utils/constants'

export default class {
  static getAll = async token => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/event`, {
        headers: {
          Authorization: token,
          slug: constants.SLUG,
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

  static getById = async (token, eventId) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/event/${eventId}`, {
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
      .post(`${constants.API_URL}/event/add`, data, {
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
      .put(`${constants.API_URL}/event/${id}`, data, {
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
  static joinRSVP = async (token, id, data) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .post(`${constants.API_URL}/event/${id}/rsvp`, data, {
        headers: {
          Authorization: token
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

  static cancel = async (token, id) => {
    let result = {
      data: null,
      error: null
    }
    await axios
      .delete(`${constants.API_URL}/event/${id}/cancelRsvp`, {
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
