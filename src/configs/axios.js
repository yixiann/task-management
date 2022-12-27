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
  return result;
}
