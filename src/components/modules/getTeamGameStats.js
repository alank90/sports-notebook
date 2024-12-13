/** @Description - Retrives game stats for both teams
 *  @parameters - { url, string }- Is passed the API endpoint url and the hostName env variable
 *  @returns - As a composable it exposes logic. So the team stats object is
 *             available to the calling component.
 */

import { ref } from "vue";
import { useFetch } from "./useFetch";

// --------- Vars --------------------- //

export function useGetTeamStats(url, hostName) {
    const { data, loadingState, error } = useFetch(url, hostName);

    return { data };
}
