// import { Team } from "../models/Team";
// import dayjs from "dayjs"; // We'll use dayjs for date handling, but you can also use plain JavaScript Date objects

// /**
//  * Get the team assigned for a specific date, cycling through all teams in a round-robin fashion.
//  * @param {Date} requestDate - The specific date to get the team for.
//  * @returns {Object} The team assigned for the specified date.
//  */
// async function getAssignedTeamForDate(requestDate) {
//   // Fetch all teams from the database, sorted by created date
//   const teams = await Team.find().sort({ createdAt: 1 });

//   if (teams.length === 0) {
//     throw new Error("No teams found in the database.");
//   }

//   // Calculate a zero-based day index for the requested date
//   const startDate = dayjs("2024-11-09"); // Choose a fixed start date to maintain consistency in the cycle
//   const dayDifference = dayjs(requestDate).diff(startDate, 'day');

//   // Calculate the team index based on the number of days passed and the total number of teams
//   const teamIndex = dayDifference % teams.length;

//   return teams[teamIndex]; // Return the team assigned for the specific date
// }

// export { getAssignedTeamForDate };
import { Team } from "../models/Team";
import dayjs from "dayjs"; // Use dayjs for date handling

/**
 * Get the team assigned for a specific date, cycling through all teams in a round-robin fashion.
 * @param {Date} requestDate - The specific date to get the team for.
 * @returns {Object} The team assigned for the specified date.
 */
async function getAssignedTeamForDate(requestDate) {
  // Fetch all teams from the database, sorted by created date
  const teams = await Team.find().sort({ createdAt: 1 });

  if (teams.length === 0) {
    throw new Error("No teams found in the database.");
  }

  // Calculate a zero-based day index for the requested date
  const startDate = dayjs("2024-11-10"); // A fixed start date to maintain consistency in the cycle
  const dayDifference = dayjs(requestDate).diff(startDate, "day");

  // Calculate the team index based on the number of days passed and the total number of teams
  const teamIndex = dayDifference % teams.length;

  return teams[teamIndex]; // Return the team assigned for the specific date
}

export { getAssignedTeamForDate };
