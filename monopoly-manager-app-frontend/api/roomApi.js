// api/roomApi.js

// Your computer's local IP address has been integrated here.
const BASE_URL = "http://192.168.43.8:4000/api";

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
      // Handle network errors that don't return JSON
      if (response.status === 404)
        throw new Error("Server endpoint not found.");
      throw new Error(data.message || "An unknown error occurred.");
    }

    return data;
  } catch (error) {
    // This will catch both network errors (e.g., server is off) and application errors
    console.error(`API call failed: ${error.message}`);
    // Provide a more user-friendly message for common network issues
    if (error.message.includes("Network request failed")) {
      throw new Error("Could not connect to the server. Is it running?");
    }
    throw error; // Re-throw the original error for specific handling
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
