import { ref } from "vue";

/** Description - Function takes in teamStandings.response array and breaks the array into
 *      each leagues respective teams by division
 *  @params - { array } - response array of team standings by league returned from API fetch
 *  @return - { array } - object array of teams in each league boken down into divisions
 */

export function useCreateDivisions(teamStandingsByLeague) {
    // ============ Vars ================= //
    const teamStandingsByDivision = ref(["Test1"]);
    const mlbDivisions = ref([
        ["AL East", "AL Central", "AL West"],
        ["NL East", "NL Central", "NL West"],
    ]);
    console.log(teamStandingsByLeague);

    
    return { teamStandingsByDivision };
}
