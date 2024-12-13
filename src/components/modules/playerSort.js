/** @Description - Takes the response array from call to API endpoint
 *   /https://v1.basketball.api-sports.io/games/statistics/players?id=${gameID}
 *   and maps them onto home and away team arrays.
 *   @parameter - { array } - Accepts the response array API call
 *   @returns - { arrays } - returns two arrays sorted by home or away team
 */

import { unref } from "vue";
const homeTeam = [];
const awayTeam = [];

export function sortPlayers(playerStatsArray) {
    const playerStatsArrayUnref = unref(playerStatsArray);
    console.log("team id: ", playerStatsArrayUnref.value);

    return { homeTeam, awayTeam };
}
