// src/api/heroApi.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getSlides = () => {
  return axios.get(`${BASE_URL}/api/heroslides`);
};

export const uploadSlide = (data) => {
  return axios.post(`${BASE_URL}/api/heroslides`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
