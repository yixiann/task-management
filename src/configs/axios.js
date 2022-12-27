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
  const baseURL = "https://stark-garden-74903.herokuapp.com/";
  // const baseURL = "http://localhost:8080"; This works
  const headers = {
    "Access-Control-Allow-Origin": baseURL,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
      "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
  };
  axios.defaults.baseURL = baseURL;
  const result = axios[method.toLowerCase()](endpoint, {
    ...payload,
    headers,
  });
  return result;
}
