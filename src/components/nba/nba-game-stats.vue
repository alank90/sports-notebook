<template>
    <tr v-if="loadingState === true">
        Loading...
    </tr>
    <!--======================================================-->
    <!--============ Game Stats row for team ============-->
    <!--======================================================-->
    <tr
        v-else
        @click="getStats(props.prop_gameID, $event)"
        title="Click for Game Stats"
    >
        <td>
            <button type="button" class="button">
                <span>Stats</span>
            </button>
        </td>
    </tr>

    <tr class="hidden gameStatsRowHeaders">
        <th>FG/Md,FG/Att,FG/Pct</th>
        <th>FT/Md,FT/Att,FT/Pct</th>
        <th>Assts/Steals/Blocks</th>
        <th>Turnovers</th>
        <th>Rebs</th>
        <th>3pt/Att,3pt/Md,3pt/pct</th>
    </tr>
    <tr class="hidden gameStatsRow">
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].field_goals.total
            }}-

            {{
                rowGameStats.value.response[props.prop_team].field_goals
                    .attempts
            }}/

            {{
                rowGameStats.value.response[props.prop_team].field_goals
                    .percentage
            }}%
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].freethrows_goals
                    .total
            }}-

            {{
                rowGameStats.value.response[props.prop_team].freethrows_goals
                    .attempts
            }}/

            {{
                rowGameStats.value.response[props.prop_team].freethrows_goals
                    .percentage
            }}%
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{ rowGameStats.value.response[props.prop_team].assists }}/

            {{ rowGameStats.value.response[props.prop_team].steals }}/

            {{ rowGameStats.value.response[props.prop_team].blocks }}
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{ rowGameStats.value.response[props.prop_team].turnovers }}
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{ rowGameStats.value.response[props.prop_team].rebounds.total }}
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].threepoint_goals
                    .total
            }}-

            {{
                rowGameStats.value.response[props.prop_team].threepoint_goals
                    .attempts
            }}/

            {{
                rowGameStats.value.response[props.prop_team].threepoint_goals
                    .percentage
            }}%
        </td>
    </tr>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "../modules/useFetch.js";
import sortPlayersByTeam from "../modules/playersStats.js";

// ============== Vars ========================================== //
const props = defineProps([
    "prop_HOST_NAME",
    "prop_team",
    "prop_gameID",
    "prop_teamID",
]);
let rowGameStats = ref(null);
let playerGameStats = ref(null);

// ================================================================ //
// ====================== Methods ================================= //
// ================================================================ //

/** Description - Retrieves the game stats from  /games/statistics/teams endpoint
 *  @parameters {number, object } - the game id, the event object
 *  @returns { object } - This is a composable function that exposes the game statistics object
 */

const getStats = (gameID, event) => {
    const el = event.currentTarget;
    const elTarget = event.target;
    let elSibling = el.nextElementSibling;
    let elSiblings = [];

    // Fill elSiblings array
    for (let i = 0; i < 2; i++) {
        // push sibling of currentTarget onto array
        elSiblings.push(elSibling);
        elSibling = elSibling.nextElementSibling;
    }

    if (
        elTarget.tagName === "BUTTON" &&
        elSiblings[0].classList.contains("hidden")
    ) {
        // Fetch the Gamestats for given gameID if necessary.
        if (rowGameStats.value === null) {
            const url = `https://v1.basketball.api-sports.io/games/statistics/teams?id=${gameID}`;
            const { data, loadingState, error } = useFetch(
                url,
                props.prop_HOST_NAME
            );
            rowGameStats.value = data;

            // Get player game stats
            const urlPlayerStats = `https://v1.basketball.api-sports.io/games/statistics/players?id=${gameID}`;
            const {
                data: playerStats,
                loadingState: loadingStatePlayerStats,
                error: errorPlayerStats,
            } = useFetch(urlPlayerStats, props.prop_HOST_NAME);
            playerGameStats.value = playerStats;
        }

        // Loop through the stats rows and show them
        for (const child of elSiblings) {
            child.classList.add("shown");
            child.classList.remove("hidden");
        }
    } else if (
        elTarget.tagName === "BUTTON" &&
        elSiblings[0].classList.contains("shown")
    ) {
        // Loop thru stats rows and hide them
        for (const child of elSiblings) {
            child.classList.add("hidden");
            child.classList.remove("shown");
        }
    } else {
        console.error(
            "Error: No .hidden or .shown classes in the Stats table rows <tr> elements."
        );
    }

    sortPlayersByTeam(playerGameStats.value);
};
</script>

<style lang="css" scoped>
@import "../../assets/css/style.css";
@import "../../assets/css/table.css";
.shown {
    background-color: #eee;
    display: table-row;
}

.hidden {
    background-color: #eee;
    display: none;
}

.shown:not(.gameStatsRowHeaders) {
    border-bottom: 5px solid var(--main-dark);
}
table {
    width: 100%;

    & tbody tr:nth-child(6) {
        border-bottom: 3px black solid;
    }
}

.gameStatsRowHeaders {
    & > th {
        font-size: 0.8rem;
        background-color: var(--blue);
        font-weight: 600;
        border: solid 2px rgb(167, 210, 234);
    }
}

.gameStatsRow {
    & > td {
        font-size: 0.7rem;
        font-weight: 600;
    }
}

/* -------- Button stylings ------------------------ */
.button {
    display: inline-block;
    background-color: var(--light-blue);
    padding: 8px;
    text-align: center;
    color: rgba(0, 0, 0, 0.75);
    font-weight: 575;
    border-radius: 7px;
    border: 4px double #141414;
    border-radius: 8px;
    cursor: pointer;
    margin: 5px;
    -webkit-transition: all 0.5s; /* add this line, chrome, safari, etc */
    -moz-transition: all 0.5s; /* add this line, firefox */
    -o-transition: all 0.5s; /* add this line, opera */
    transition: all 0.8s;

    & span {
        cursor: not-allowed;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }

    & span::after {
        content: "\00bb";
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
    }

    &:hover span {
        padding-right: 25px;
    }

    &:hover span:after {
        opacity: 1;
        right: 0;
    }

    &:hover {
        background-color: rgba(118, 164, 240, 0.693);
    }
}

/* -------- End of Button stylings ------------------------ */
</style>
