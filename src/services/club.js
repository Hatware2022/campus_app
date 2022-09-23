import axios from 'axios';
import constants from '../utils/constants';

export default class {

    static getClub = async token => {
        
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${constants.API_URL}/club`, 
            { 
                headers: { 
                'Authorization': token,
                'slug': "develop" 
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

    // static getById = async (token, eventId) => {
    //     let result = {
    //         data: null,
    //         error: null
    //     };

    //     await axios.get(`${constants.API_URL}/event/${eventId}`,
    //     { headers: { 'Authorization': token }})
    //         .then(resp => {
    //             if (resp.status === 200) {
    //                 result.data = resp.data;
    //             }
    //         })
    //         .catch(err => {
    //             result.error = err.response.data;
    //         });

    //     return result;
    // }

    // static create = async (token, data) => {
    //     let result = {
    //         data: null,
    //         error: null
    //     };

    //     await axios.post(`${constants.API_URL}/event/addnew`, data,
    //         { headers: { 'Authorization': token }})
    //         .then(resp => {
    //             if (resp.status === 200) {
    //                 result.data = resp.data;
    //             }
    //         })
    //         .catch(err => {
    //             result.error = err.response.data;
    //         });

    //     return result;
    // }

    // static update = async (token, id, data) => {
    //     let result = {
    //         data: null,
    //         error: null
    //     };

    //     await axios.put(`${constants.API_URL}/event/${id}`, data,
    //         { headers: { 'Authorization': token }})
    //         .then(resp => {
    //             if (resp.status === 200) {
    //                 result.data = resp.data;
    //             }
    //         })
    //         .catch(err => {
    //             result.error = err.response.data;
    //         });

    //     return result;
    // }
}