import axios from 'axios';
// import { Auth } from 'aws-amplify';

export const RequestMethod = Object.freeze({
    GET: 'get',
    POST: 'post'
});

export async function axiosRequest(endpoint, payload = null, method = RequestMethod.GET) {
    // const session = await Auth.currentSession();
    // axios.defaults.baseURL = app.Host;
    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['x-id-token'] = session.getIdToken().jwtToken;
    return axios[method.toLowerCase()](endpoint, payload);
}
