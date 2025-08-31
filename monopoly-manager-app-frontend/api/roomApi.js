// api/roomApi.js

// Replace with your computer's local IP address
const BASE_URL = "http://YOUR_COMPUTER_IP:4000/api";

/**
 * A professional, reusable fetch wrapper.
 * It handles success and error cases, and parses JSON automatically.
 */
const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST", // Default to POST for our use case
      headers: {
        "Content-Type": "application/json",
      },
      ...options, // Allow overriding method, headers, etc.
    });

    const data = await response.json();

    if (!response.ok) {
      // If server returns an error (4xx or 5xx), throw an error with the message from the backend
      throw new Error(data.message || "An unknown error occurred.");
    }

    return data;
  } catch (error) {
    // Re-throw the error to be caught by the calling function
    console.error(`API call failed: ${error.message}`);
    throw error;
  }
};

export const createRoom = async (playerName) => {
  const body = JSON.stringify({ playerName });
  const response = await apiFetch("/rooms/create", { body });
  return response.data; // Return just the 'data' part of the response
};

export const joinRoom = async (playerName, roomId) => {
  const body = JSON.stringify({ playerName, roomId });
  const response = await apiFetch("/rooms/join", { body });
  return response.data;
};
