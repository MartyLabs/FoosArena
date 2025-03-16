import axios from "axios";

const API_URL = "http://localhost:5000/tournaments";

/**
 * Fetch all tournaments.
 * @returns {Promise<Array>} List of tournaments.
 */
export const fetchTournaments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error loading tournaments:", error);
    throw error;
  }
};

/**
 * Fetch tournament details by ID.
 * @param {string} tournamentId - The tournament ID.
 * @returns {Promise<Object>} Tournament data.
 * @throws {Error} Throws an error if the request fails.
 */
export const fetchTournament = async (tournamentId) => {
  try {
    const response = await axios.get(`${API_URL}/${tournamentId}`);
    return response.data;
  } catch (error) {
    console.error("Error loading tournament:", error);
    throw error;
  }
};

/**
 * Fetch tournament leaderboard.
 * @param {string} tournamentId - The tournament ID.
 * @returns {Promise<Array>} Leaderboard data.
 * @throws {Error} Throws an error if the request fails.
 */
export const fetchLeaderboard = async (tournamentId) => {
  try {
    const response = await axios.get(`${API_URL}/${tournamentId}/leaderboard`);
    return response.data;
  } catch (error) {
    console.error("Error loading the leaderboard:", error);
    throw error;
  }
};

/**
 * Delete a tournament by ID.
 * @param {string} tournamentId - The tournament ID.
 * @returns {Promise<void>}
 */
export const deleteTournament = async (tournamentId) => {
  try {
    await axios.delete(`${API_URL}/${tournamentId}`);
  } catch (error) {
    console.error("Error deleting tournament:", error);
    throw error;
  }
};

/**
 * Create a new tournament.
 * @param {Object} tournamentData - Tournament details (name, date, description).
 * @returns {Promise<Object>} Created tournament.
 */
export const createTournament = async (tournamentData) => {
  try {
    const response = await axios.post(API_URL, tournamentData);
    return response.data;
  } catch (error) {
    console.error("Tournament creation error:", error);
    throw error;
  }
};
