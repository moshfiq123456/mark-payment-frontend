import { ROUTES } from "../constants/Routes";
import axios from "axios";
import { performResponseData } from "../utils/api";
const headers = {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers':
    //   'Origin, X-Requested-With, Content-Type, Accept',
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  
  const onResponseSuccess = (response) => {
    const { data } = response;
  
    return Promise.resolve({
      ...response,
      data: performResponseData(data),
    });
  };
  
  const onResponseError = (error) => {
    if (error?.response?.status === 401) {
      
      window.location.replace(ROUTES.LOGIN);
    }
}

const api = axios.create({
    baseURL: `${process.env.REACT_APP_MI_BASE_URL}/`,
    headers,
  });
  
  api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization = 'Bearer ' + token;
    return config;
  });
  
  api.interceptors.response.use(onResponseSuccess, onResponseError);

  export default api;