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
  return axios[method.toLowerCase()](endpoint, payload);
}
