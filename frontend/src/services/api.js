import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services API
export const servicesAPI = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/services');
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  getById: async (serviceId) => {
    try {
      const response = await apiClient.get(`/services/${serviceId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  }
};

// Reviews API
export const reviewsAPI = {
  getAll: async (limit = 20) => {
    try {
      const response = await apiClient.get(`/reviews?limit=${limit}&approved_only=true`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  create: async (reviewData) => {
    try {
      const response = await apiClient.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }
};

// Booking API
export const bookingAPI = {
  create: async (bookingData) => {
    try {
      const response = await apiClient.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  getUnavailableDates: async () => {
    try {
      const response = await apiClient.get('/unavailable-dates');
      return response.data.unavailable_dates;
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
      throw error;
    }
  }
};

// Booking confirmation API
export const confirmationAPI = {
  getBookingDetails: async (bookingId) => {
    try {
      const response = await apiClient.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking details:', error);
      throw error;
    }
  }
};

// Helper function to handle API errors
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data.detail || 'An error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'No response from server. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

export default {
  services: servicesAPI,
  reviews: reviewsAPI,
  booking: bookingAPI,
  payment: paymentAPI,
  handleError: handleAPIError
};