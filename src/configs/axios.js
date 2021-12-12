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
  // axios.defaults.baseURL = "http://localhost:10000";
  // axios.defaults.baseURL = "http://task-management-yixiann.vercel.app";
  const result = axios[method.toLowerCase()](endpoint, payload);
  return result.reject();
}
