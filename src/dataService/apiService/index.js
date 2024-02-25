import axios from "axios";

class apiService {
  constructor() {
    let service = axios.create();
    this.service = service;
  }

  async get(path, callback, data, params) {
    try {
      const response = await this.service.get(path, {
        ...data,
        params,
      });
      callback(response.status, response.data, response.headers);
    } catch (error) {
      callback(
        error.response?.status,
        error.response?.data?.message ||
          error.response?.data?.error_description ||
          "Something went wrong"
      );
    }
  }

  async patch(path, payload, callback) {
    const response = await this.service.request({
      method: "PATCH",
      url: path,
      responseType: "json",
      data: payload,
    });
    return callback(response.status, response.data);
  }

  async post(config, callback) {
    const { url, data, responseType, headers } = config;

    try {
      const response = await this.service.request({
        method: "POST",
        url,
        data,
        responseType,
        headers,
      });
      return callback(response.status, response.data, response.headers);
    } catch (error) {
      callback(
        error.response?.status,
        !!error.response?.data?.message
          ? error.response?.data?.message
          : "Something went wrong"
      );
    }
  }

  async put(config, callback) {
    const { url, data, responseType, headers } = config;

    try {
      const response = await this.service.request({
        method: "PUT",
        url,
        data,
        responseType,
        headers,
      });
      return callback(response.status, response.data);
    } catch (error) {
      callback(
        error.response?.status,
        error.response?.data?.error_description ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    }
  }

  async delete(path, callback) {
    try {
      const response = await this.service.delete(path);
      return callback(response?.status, response?.data);
    } catch (error) {
      return callback(error.response?.status, error?.message);
    }
  }

  async custom(config, callback) {
    const { url, method, data, responseType, headers } = config;

    try {
      const response = await this.service.request({
        url,
        method,
        data,
        responseType,
        headers,
      });
      return callback(response.status, response.data);
    } catch (error) {
      callback(
        error.response?.status,
        error.response?.data?.error_description ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    }
  }
}

export default new apiService();
