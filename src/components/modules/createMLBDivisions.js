import { ref } from "vue";

/** Description - Function takes in teamStandings.response array and breaks the array into
 *      each leagues respective teams by division
 *  @params - { array } - response array of team standings by league returned from API fetch
 *  @return - { array } - object array of teams in each league boken down into divisions
 */

export function useCreateDivisions(teamStandingsByLeague) {
    // ============ Vars ================= //
    const teamStandingsByDivision = ref({
        "AL East": [],
        "AL Central": [],
        "AL West": [],
        "NL East": [],
        "NL Central": [],
        "NL West": [],
    });

    const mlbDivisions = ref([
        {
            division: "AL East",
            teams: ["Yankees", "Orioles", "Red Sox", "Rays", "Blue Jays"],
        },
        {
            division: "AL Central",
            teams: ["Guardians", "Royals", "Tigers", "Twins", "White Sox"],
        },
        {
            division: "AL West",
            teams: ["Angels", "Astros", "Athletics", "Mariners", "Rangers"],
        },
        {
            division: "NL East",
            teams: ["Braves", "Marlins", "Mets", "Nationals", "Phillies"],
        },
        {
            division: "NL Central",
            teams: ["Brewers", "Cardinals", "Cubs", "Pirates", "Reds"],
        },
        {
            division: "NL West",
            teams: ["Diamondbacks", "Dodgers", "Giants", "Padres", "Rockies"],
        },
    ]);
    console.log(teamStandingsByLeague.value);

    /* teamStandingsByLeague[0].response.forEach((league) => {
        console.log(league);
    }); */

    return { teamStandingsByDivision };
}
