import axios from "axios";

const api = axios.create({
    //baseURL: 'https://portal.trtexpress.com/api/',
    baseURL: 'https://localhost:5001/api/',
    headers: {"Accept": "*/*", 'Content-Type': 'application/json'},
    timeout: 10000,
});

export const getToken = () => {
    const username = 'kegax27028@byorby.com';
    const password = 'Password123!'
    return api.post('Token', {
        "email": username,
        "password": password,
        "grantType": "password",
        "rememberMe": false
    });
}

export const getCountries = (token: string) => {
    api.defaults.headers.common['Authorization'] = token
    return api.get("organizations/1/countries")
}

export const getDeliveryMethods = (token: string, countryCode: string) => {
    api.defaults.timeout = 15000;
    api.defaults.headers.common['Authorization'] = token
    return api.get(`organizations/1/deliveryMethods/country/${countryCode}/getDeliveryMethods`)
}


