import { ref } from "vue";

// =========== Vars ========================== //
let divisions = ref({
    "AL East": [],
    "AL Central": [],
    "AL West": [],
    "NL East": [],
    "NL Central": [],
    "NL West": [],
});
// ------ counter is variable to track if useCreateDivisions() was called already.
//  Nice little use of Closures to keep track of function calls.
let counter = 0;

/**
 * @Description - Function takes in teamStandings.response array and breaks the object array(divisions)
 *   into baseball divisions.
 * @param { array } teamStandingsByLeague - response array of team standings by league returned from API fetch
 * @returns - { object array } - object array of teams in each league broken down into divisions
 */
export function useCreateDivisions(teamStandingsByLeague) {
    // ============ Vars ================= //

    const mlbDivisions = [
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
    ];

    // ============ End Var Declarations ==================== //

    counter += 1;

    // -- Do a quick check for errors or if useCreateDivisions has already
    //  been called and populated divisions object array.  ------ //
    if (teamStandingsByLeague.value[0].errors?.requests || counter > 1) {
        return;
    }
    // Iterate thru teamStandingsByLeague array and place each team in the
    // appropriate divisions object array

    teamStandingsByLeague.value.forEach((league) => {
        league.response[0].forEach((team) => {
            // Now, check if the current team(team.team.name) is in the
            // current mlbDivisions.teams object array
            mlbDivisions.forEach((division) => {
                // divisions object array is not populated yet
                // so let's build it.
                for (const array_item of division.teams) {
                    if (team.team.name.includes(array_item)) {
                        divisions.value[division.division].push(team);
                    }
                }
            });
        });
    });
}

export { divisions };
