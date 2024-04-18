import { ref } from "vue";

/** Description - Function takes in teamStandings.response array and breaks the array into
 *      each leagues respective teams by division
 *  @params - { array } - response array of team standings by league returned from API fetch
 *  @return - { object array } - object array of teams in each league boken down into divisions
 */

let divisions = ref({
    "AL East": [],
    "AL Central": [],
    "AL West": [],
    "NL East": [],
    "NL Central": [],
    "NL West": [],
});

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

    // Iterate thru teamStandingsByLeague array and place each team in the
    // appropriate divisions object aray
    teamStandingsByLeague.value.forEach((league) => {
        league.response[0].forEach((team) => {
            // Now, check if the current team(team.team.name) is in the
            // current mlbDivisions.teams object array
            mlbDivisions.forEach((division) => {
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
