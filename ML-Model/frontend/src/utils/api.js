/**
 * API Utility Functions
 * Uses Vercel API proxy (HTTPS-safe)
 */

export const fetchAQIPrediction = async (state, area) => {
  try {
    const response = await fetch(
      `/api/predict?state=${encodeURIComponent(state)}&area=${encodeURIComponent(area)}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Unable to fetch AQI prediction");
  }
};
