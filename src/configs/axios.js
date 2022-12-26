import axios from "axios";

export const RequestMethod = Object.freeze({
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
});

export async function axiosRequest(
  endpoint,
  payload = null,
  method = RequestMethod.GET
) {
  // const baseURL ="https://stark-garden-74903.herokuapp.com/"
  // axios.defaults.baseURL = baseURL
  // axios.defaults.baseURL = "localhost:8080";
  const baseURL = "https://stark-garden-74903.herokuapp.com/";
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.common["Access-Control-Allow-Headers"] =
    "Origin, X-Requested, Content-Type, Accept Authorization";
  axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";
  const result = axios[method.toLowerCase()](endpoint, payload);
  return result;
}
