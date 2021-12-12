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
  // axios.defaults.baseURL = "https://localhost:10000";
  const result = axios[method.toLowerCase()](endpoint, payload);
  // if(typeof result.data !== 'string'){
  //   return result.reject(typeof result ==='string');
  // }
  return result
}
