/**
 * API Predict Handler
 * Proxies requests to the backend Flask server
 */

export default async function handler(req, res) {
  const { state, area } = req.query;

  if (!state || !area) {
    return res.status(400).json({
      status: "error",
      message: "Missing required parameters: state and area",
    });
  }

  try {
    const response = await fetch(
      `http://43.205.238.114:5000/predict?state=${encodeURIComponent(state)}&area=${encodeURIComponent(area)}`,
    );

    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch prediction from backend",
    });
  }
}
