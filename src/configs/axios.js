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
  // const baseURL = "localhost:8080";
  const baseURL = "https://stark-garden-74903.herokuapp.com/";
  axios.defaults.baseURL = baseURL;
  const result = axios[method.toLowerCase()](endpoint, payload);
  result.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
      "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
  };
  return result;
}
