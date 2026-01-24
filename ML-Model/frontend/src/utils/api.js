/**
 * API Utility Functions
 * Calls the backend server directly
 */

export const fetchAQIPrediction = async (state, area) => {
  try {
    // Call the predict endpoint through the proxy
    const response = await fetch(
      `/predict?state=${encodeURIComponent(state)}&area=${encodeURIComponent(area)}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      "Unable to fetch AQI prediction. Make sure the backend is running.",
    );
  }
};
