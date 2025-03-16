import axios from "axios";

const API_URL = "http://localhost:5000/teams";

/**
 * Fetch all teams for a given tournament.
 * @param {string} tournamentId - The tournament ID.
 * @returns {Promise<Array>} List of teams.
 */
export const fetchTeams = async (tournamentId) => {
  try {
    const response = await axios.get(`${API_URL}/${tournamentId}`);
    return response.data;
  } catch (error) {
    console.error("Error loading teams:", error);
    throw error;
  }
};

/**
 * Fetch team details by ID.
 * @param {string} teamId - The team ID.
 * @returns {Promise<Object>} Team data.
 */
export const fetchTeam = async (teamId) => {
  try {
    const response = await axios.get(`${API_URL}/single/${teamId}`);
    return response.data;
  } catch (error) {
    console.error("Error loading team:", error);
    throw error;
  }
};

/**
 * Update team name.
 * @param {string} teamId - The team ID.
 * @param {string} newName - New team name.
 * @returns {Promise<void>}
 */
export const updateTeamName = async (teamId, newName) => {
  try {
    await axios.put(`${API_URL}/${teamId}`, { name: newName });
  } catch (error) {
    console.error("Error updating team name:", error);
    throw error;
  }
};

/**
 * Delete a team by ID.
 * @param {string} teamId - The team ID.
 * @returns {Promise<void>}
 */
export const deleteTeam = async (teamId) => {
  try {
    await axios.delete(`${API_URL}/${teamId}`);
  } catch (error) {
    console.error("Error deleting team:", error);
    throw error;
  }
};

/**
 * Add a new team to a tournament.
 * @param {string} tournamentId - The tournament ID.
 * @param {string} name - The team name.
 * @returns {Promise<void>}
 */
export const createTeam = async (tournamentId, name) => {
  try {
    await axios.post(API_URL, { name, tournamentId });
  } catch (error) {
    console.error("Error adding team:", error);
    throw error;
  }
};
