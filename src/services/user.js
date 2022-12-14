import axios from 'axios';
import constants from '../utils/constants';

export default class {

    static getAll = async token => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${constants.API_URL}/users/all`, 
            { headers: { 'Authorization': token }})
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static getById = async (token, userId) => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${constants.API_URL}/users/byId/${userId}`,
        { headers: { 'Authorization': token }})
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static login = async (email, password) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            email: email,
            password: password
        };

        await axios.post(`${constants.API_URL}/users/login`, data)
            .then(resp => {
                if (resp.status === 200) {
                    // console.log("resp: ", JSON.stringify(resp));
                    result.data = resp.data;
                }
            })
            .catch(err => {
                // console.log("err: ", JSON.stringify(err));
                result.error = err.response.data;
            });

        return result;
    }

    static signup = async (firstname, lastname, email, password) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            role: 'user'
        };

        await axios.post(`${constants.API_URL}/users/save`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static updatePassword = async (token, currentPassword, newPassword) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            currentPassword,
            newPassword
        };

        await axios.post(`${constants.API_URL}/users/update-password`, data,
            { headers: { 'Authorization': token } })
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static update = async (token, id, data) => {
        let result = {
            data: null,
            error: null
        };

        await axios.put(`${constants.API_URL}/users/update/${id}`, data,
            { headers: { 'Authorization': token } })
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static updatePicture = async (token, file) => {
        let result = {
            data: null,
            error: null
        };

        const fd = new FormData();
        fd.append("file", file);

        await axios.post(`${constants.API_URL}/users/update-picture`, fd,
            { 
                headers: { 
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                } 
            })
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }
}