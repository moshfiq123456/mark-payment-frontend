import { ROUTES } from "../constants/Routes";
import axios from "axios";
import { performResponseData } from "../utils/api";

const token = localStorage.getItem("accessToken");
const headers = {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers':
    //   'Origin, X-Requested-With, Content-Type, Accept',
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   Accept: 'application/json',
    
    'Authorization': `Bearer ${token}`
    
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

const downloadApi = axios.create({
    baseURL: `${process.env.REACT_APP_MI_BASE_URL}/`,
    headers:headers,
    responseType:"arraybuffer"
    
  });
  
  downloadApi.interceptors.request.use(function (config) {

    config.headers.Authorization = 'Bearer ' + token;
    return config;
  });
  
//   downloadApi.interceptors.response.use(onResponseSuccess, onResponseError);

  export default downloadApi;