import axios from 'axios';
import constants from '../utils/constants';

export default class {

    static getAll = async (token, userId) => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${constants.API_URL}/conversation/user/allTime/${userId}`, 
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

    static getById = async (token, postId) => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${constants.API_URL}/conversation/${postId}`,
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

    static create = async (token, data) => {
        let result = {
            data: null,
            error: null
        };

        await axios.conversation(`${constants.API_URL}/conversation/addnew`, data,
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

    static update = async (token, id, data) => {
        let result = {
            data: null,
            error: null
        };

        await axios.put(`${constants.API_URL}/conversation/${id}`, data,
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
}