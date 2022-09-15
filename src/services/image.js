import axios from 'axios';
import constants from '../utils/constants';

export default class {

    static create = async file => {
        let result = {
            data: null,
            error: null
        };

        const fd = new FormData();
        fd.append("image", file);

        await axios.put(`${constants.API_URL}/image/uploadImages`, fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(resp => {
                // console.log("resp: ", JSON.stringify(resp));
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                // console.log("err: ", JSON.stringify(err));
                result.error = err.response.data;
            });

        return result;
    }
}