import axios from "axios";

export const RequestMethod = Object.freeze({
  GET: "get",
  POST: "post",
  PUT: "put",
});

export async function axiosRequest(
  endpoint,
  payload = null,
  method = RequestMethod.GET
) {
  // const baseURL = "http://localhost:10000";
  const baseURL ="https://stark-garden-74903.herokuapp.com/"
  axios.defaults.baseURL = baseURL
  // axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  const result = axios[method.toLowerCase()](endpoint, payload);
  // const result = axios({
  //   method: method,
  //   url: endpoint,
  //   data: payload
  // })
  return result;
}
