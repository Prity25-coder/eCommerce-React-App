import { config } from "../config";

const { apiUrl } = config;

// eg:- http://localhost:3000/post
function getApiEndpoint(endpoint){
  return `${apiUrl}/${endpoint}`;
}

export default getApiEndpoint;