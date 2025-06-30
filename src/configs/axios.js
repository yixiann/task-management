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
  // const baseURL = "http://localhost:8080";
  const baseURL =
    "https://gc3j5yercekva5s5fwsta45soq0ruozx.lambda-url.ap-southeast-1.on.aws";
  axios.defaults.baseURL = baseURL;
  const result = axios[method.toLowerCase()](endpoint, payload);
  return result;
}
