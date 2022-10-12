import session from '../store/session';
import axios from 'axios';
import constants from '../utils/constants';
import keys from '../store/keys';

export default class {

    static getAll = async token => {
        let result = {
            data: null,
            error: null
        };
        let loginType = session.get(keys.loginType) || null; 
        await axios.get(loginType === 'organization' ? `${constants.API_URL}/club/posts/all` : `${constants.API_URL}/post/`, 
            { headers: { 'Authorization': token }})
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                alert(err)
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

        // await axios.get(`${constants.API_URL}/post/${postId}`,
        // { headers: { 'Authorization': token }})
        //     .then(resp => {
        //         if (resp.status === 200) {
        //             result.data = resp.data;
        //         }
        //     })
        //     .catch(err => {
        //         result.error = err.response.data;
        //     });

        return result;
    }

    static create = async (token, data) => {
        let result = {
            data: null,
            error: null
        };

        await axios.post(`${constants.API_URL}/post/add`, data,
            { headers: { 'Authorization': token }})
            .then(resp => {
                if (resp.status === 201) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static uploadPostImage = async (token, data) => {
        let result = {
            data: null,
            error: null
        };
        await axios.put(`${constants.API_URL}/image/uploadImages`, data,
            { headers: { 'Authorization': token ,'Content-Type': 'multipart/form-data' }})
            .then(resp => {
                if (resp.status === 201) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static update = async (token, id) => {
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
                result.error = err.response.data;
            });

        return result;
    }

    static addComment = async (token, data) => {
        let result = {
            data: null,
            error: null
        };

        let loginType = session.get(keys.loginType) || null; 
        await axios.post( loginType === 'organization' ? `${constants.API_URL}/club/posts/comment/add` : `${constants.API_URL}/post/comment`,data,
            { headers: { 'Authorization': token }})
            .then(resp => {
                if (resp.status === 201) {
                    alert(JSON.stringify(resp.data))
                    result.data = resp.data;
                }
            })
            .catch(err => {
                alert(err)
                result.error = err.response.data;
            });

        return result;
    }

    static getComments = async (token, postId) => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${constants.API_URL}/post/comments/${postId}`,
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