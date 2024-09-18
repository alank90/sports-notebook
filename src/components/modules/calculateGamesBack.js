/** 
  @Description - Module to calculate games back a team is
  @param  {object} contains object arrays of MLB divisions
  @returns {object} - Updated object array with added property of
                      games back value.
 */

export default function gamesBack(teams) {
    /* ======== Vars ============ */
    let offTheLead = Number;
    let firstPlaceTeam = {
        wins: null,
        losses: null,
        ties: null,
    };

    const divisions = Object.keys(teams);
    const updatedTeamsWithGB = Object.values(teams);
    console.log("divisions:", divisions);
    console.log("UpdatedTeams:", updatedTeamsWithGB);

    updatedTeamsWithGB.forEach((division) => {
        division.forEach((team, index) => {
            if (index === 0) {
                // designate first place team in each division
                firstPlaceTeam.wins = team.games.win.total;
                firstPlaceTeam.losses = team.games.lose.total;
                firstPlaceTeam.ties = team.games?.ties;
                teams.backFromDivisionLeader = "--";
                console.log(`team ${index}: ${team.team.name}`);
            } else {
                team.backFromDivisionLeader =
                    (firstPlaceTeam.wins -
                        firstPlaceTeam.losses -
                        (team.games.win.total - team.games.lose.total)) /
                    2;
                console.log(`team ${index}: ${team.team.name}`);
            }
        });
    });
    console.log("Division.values(teams):", teams);
    console.log("UpdatedTeams:", updatedTeamsWithGB);
    return teams;
}
