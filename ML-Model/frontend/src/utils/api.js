/**
 * API Utility Functions
 * Centralized API endpoint configuration and requests
 */

const BACKEND_URL = "http://43.205.238.114:5000";

/**
 * Fetch AQI prediction from backend
 * @param {string} state - The state/region name
 * @param {string} area - The area/city name
 * @returns {Promise} - Response from the backend API
 */
export const fetchAQIPrediction = async (state, area) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/predict?state=${encodeURIComponent(state)}&area=${encodeURIComponent(area)}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message === "Network Error"
        ? "Unable to connect to the server. Make sure the Flask backend is running."
        : error.message,
    );
  }
};
