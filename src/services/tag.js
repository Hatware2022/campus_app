import axios from 'axios';
import constants from '../utils/constants';

export default class {
  static getAll = async token => {
    let result = {
        data: null,
        error: null
    };

    await axios.get(`${constants.API_URL}/tags`, 
        { headers: 
            { 
                'Authorization': token, 
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