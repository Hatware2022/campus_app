import axios from 'axios';
import constants from '../utils/constants';

export default class {

    static getAll = async token => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${constants.API_URL}/post/`, 
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

        await axios.get(`${constants.API_URL}/post/${postId}`,
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

        await axios.post(`${constants.API_URL}/post/addnew`, data,
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

        await axios.post(`${constants.API_URL}/post/like/${id}`,
            { headers: { 'Authorization': token }})
            .then(resp => {
                if (resp.status === 201) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                console.log(err.response)
                result.error = err.response.data;
            });

        return result;
    }
}