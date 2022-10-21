import axios from 'axios'
import constants from '../utils/constants'

export default class {
  static getAll = async token => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/users`, {headers: {Authorization: token}})
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

  static getById = async (token, userId) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/users/${userId}`, {
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

  static login = async (email, password, club) => {
    let result = {
      data: null,
      error: null
    }

    const data = {
      email: email,
      password: password,
      isClub: club
    }

    await axios
      .post(`${constants.API_URL}/users/login`, data)
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

  static signup = async (firstname, lastname, email, password) => {
    let result = {
      data: null,
      error: null
    }

    const data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      role: 'user'
    }

    await axios
      .post(`${constants.API_URL}/users/save`, data)
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

  static register = async (
    userName,
    email,
    password,
    dateOfBirth,
    mobileNumber
  ) => {
    let result = {
      data: null,
      error: null
    }

    const data = {
      name: userName,
      email: email,
      password: password
    }

    await axios
      .post(`${constants.API_URL}/registration/signup`, data)
      .then(resp => {
        console.log('resp', resp)
        if (resp.status === 201) {
          result.data = resp
        }
      })
      .catch(err => {
        if (err.response.data.code === 'VALIDATION_ERROR') {
          result.error = err.response.data.error.details
          console.log(err.response.data.error.details)
        } else {
          result.error = err.response.data
        }
      })

    return result
  }

  static updatePassword = async (token, currentPassword, newPassword) => {
    let result = {
      data: null,
      error: null
    }

    const data = {
      currentPassword,
      newPassword
    }

    await axios
      .post(`${constants.API_URL}/users/update-password`, data, {
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
      .put(`${constants.API_URL}/users/${id}`, data, {
        headers: {Authorization: token}
      })
      .then(resp => {
        if (resp.status === 200) {
          result.data = resp.data
        }
      })
      .catch(err => {
        if (err.response.data.code === 'VALIDATION_ERROR') {
          console.log(err.response.data.error.details)
          result.error = err.response.data.error.details
        } else {
          result.error = err.response.data
        }
      })

    return result
  }

  static updatePicture = async (token, file) => {
    let result = {
      data: null,
      error: null
    }

    const fd = new FormData()
    fd.append('file', file)

    await axios
      .post(`${constants.API_URL}/users/update-picture`, fd, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
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

  static forgetPassword = async (token, file) => {
    let result = {
      data: null,
      error: null
    }

    const data = {
      email: email,
      password: password
    }

    await axios
      .post(`${constants.API_URL}/users/login`, data)
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

  static sendOtp = async (email, code) => {
    let result = {
      data: null,
      error: null
    }

    const data = {
      email: email,
      otp: code
    }
    await axios
      .post(`${constants.API_URL}/registration/verifyRegistration`, data)
      .then(resp => {
        if (resp.status === 201) {
          result.data = resp.data
        }
      })
      .catch(err => {
        result.error = err.response.data
      })

    return result
  }

  static createUserProfile = async (token, id, data) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .put(`${constants.API_URL}/users/createProfile/${id}`, data, {
        headers: {Authorization: token}
      })
      .then(resp => {
        if (resp.status === 200) {
          result.data = resp.data
        }

        if (resp.status === 406) {
          result.data = resp.data.message
        }
      })
      .catch(err => {
        result.error = err.response.data
      })

    return result
  }
  static getProfilesByText = async (token, text) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .get(`${constants.API_URL}/users/search/${text}`, {
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

  static reportPost = async (token, data) => {
    let result = {
      data: null,
      error: null
    }

    await axios
      .post(`${constants.API_URL}/report/admin/bulkReport`, data, {
        headers: {Authorization: token}
      })
      .then(resp => {
        if (resp.status === 201) {
          result.data = resp.data
        }
      })
      .catch(err => {
        if (err.response.data.code === 'VALIDATION_ERROR') {
          result.error = err.response.data.error.details
        } else {
          result.error = err.response.data
        }
      })

    return result
  }


  static deleteComment = async (token, id,) => {
    let result = {
      data: null,
      error: null
    }
    await axios
      .put(`${constants.API_URL}/post/comments/delete/${id}`, {
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
