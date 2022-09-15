import jwt_decode from "jwt-decode";

export default class {
    static decodeJwt = token => {
        if(!token) return null;
        return jwt_decode(token);
    } 
}