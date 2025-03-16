import axios from "axios";

const API_URL = "http://localhost:5000/matches";

/**
 * Fetch all matches for a given tournament.
 * @param {string} tournamentId - The tournament ID.
 * @returns {Promise<Array>} List of matches.
 */
export const fetchMatches = async (tournamentId) => {
  try {
    const response = await axios.get(`${API_URL}/${tournamentId}`);
    return response.data.matches;
  } catch (error) {
    console.error("Error loading matches:", error);
    throw error;
  }
};

/**
 * Update the score of a specific match.
 * @param {string} matchId - The match ID.
 * @param {number} score1 - Score of team 1.
 * @param {number} score2 - Score of team 2.
 * @returns {Promise<void>}
 */
export const updateMatchScore = async (matchId, score1, score2) => {
  try {
    await axios.post(`${API_URL}/update-score/${matchId}`, {
      score1,
      score2,
    });
  } catch (error) {
    console.error("Error updating match score:", error);
    throw error;
  }
};

/**
 * Check if matches exist for a tournament.
 * @param {string} tournamentId - The tournament ID.
 * @returns {Promise<boolean>} Whether matches exist.
 */
export const checkExistingMatches = async (tournamentId) => {
  try {
    const response = await axios.get(`${API_URL}/${tournamentId}`);
    return response.data.matches.length > 0;
  } catch (error) {
    console.error("Error checking matches:", error);
    throw error;
  }
};

/**
 * Generate matches for a tournament.
 * @param {string} tournamentId - The tournament ID.
 * @param {boolean} forceGenerate - Whether to force match regeneration.
 * @returns {Promise<void>}
 */
export const generateMatches = async (tournamentId, forceGenerate) => {
  try {
    if (forceGenerate) {
      await axios.delete(`${API_URL}/${tournamentId}`);
    }
    await axios.post(`${API_URL}/generate/${tournamentId}`);
  } catch (error) {
    console.error("Error generating matches:", error);
    throw error;
  }
};

/**
 * Fetch all matches for a team.
 * @param {string} teamId - The team ID.
 * @returns {Promise<Array>} List of matches.
 */
export const fetchMatchesByTeam = async (teamId) => {
  try {
    const response = await axios.get(`${API_URL}/team/${teamId}`);
    return response.data.matches;
  } catch (error) {
    console.error("Error loading matches:", error);
    throw error;
  }
};

/**
 * Fetch match details by ID.
 * @param {string} matchId - The match ID.
 * @returns {Promise<Object>} Match data.
 */
export const fetchMatchDetails = async (matchId) => {
  try {
    const response = await axios.get(`${API_URL}/single/${matchId}`);
    return response.data.match;
  } catch (error) {
    console.error("Error loading match:", error);
    throw error;
  }
};
