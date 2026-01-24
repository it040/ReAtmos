/**
 * API Utility Functions
 * Calls the backend server directly with CORS handling
 */

const BACKEND_URL = "http://43.205.238.114:5000";

export const fetchAQIPrediction = async (state, area) => {
  try {
    const url = `${BACKEND_URL}/predict?state=${encodeURIComponent(state)}&area=${encodeURIComponent(area)}`;

    console.log("Fetching from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);

      // Provide user-friendly error messages based on status code
      if (response.status === 404) {
        throw new Error(
          `Location not available. Please check if "${state}" and "${area}" are valid locations.`,
        );
      } else if (response.status === 400) {
        throw new Error(
          "Invalid location data. Please enter valid state and area names.",
        );
      } else if (response.status === 500) {
        throw new Error("Server issue. Please try again later.");
      } else {
        throw new Error(
          `Unable to fetch data for this location. Please try another location.`,
        );
      }
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error(
        "Data is not available for this location. Please try another location.",
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
