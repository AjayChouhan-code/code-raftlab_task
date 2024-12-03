import axios from 'axios';
import { useStore } from 'zustand';
//const BASE_URL="http://localhost:3000"
const BASE_URL="http://192.168.0.247:3000"
const PROPERTY = "/properties"
const PROFILE = "/profile"
const BOOKING = "/bookings"




const api = axios.create({
  baseURL: BASE_URL // Replace with your API base URL
});

export const fetchProperties = async () => {
  const response = await api.get(PROPERTY);
  return response.data;
};

export const fetchProile = async () => {
  const response = await api.get(PROFILE);
  return  response.data;
};

export const fetchBooking = async () => {
  const response = await api.get(BOOKING);
  return response.data;
};

export const addPropertyToApi = async (newProperty: any) => {
  const response = await api.post(BOOKING, newProperty);
  return response.data;
};








