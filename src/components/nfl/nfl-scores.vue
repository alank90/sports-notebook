<template>
    <h1>NFL Scores</h1>
    <h2>As of {{ todayLocaleString }}</h2>

    <div v-if="loadingState">
        <p>Loading...</p>
        <img src="@/assets/img/loading.gif" alt="Loading Data" />
    </div>

    <!-- ========  If the fetch failed =========================== -->
    <div v-if="error">Oops. Looks like there was an error: {{ error }}</div>

    <!-- ===== Else lets generate the markup =============-->
    <!-- ===== Wrapper Div ============== -->
    <div v-else-if="gameScores !== null">
        <template v-for="n in gameScores.length">
            <div v-if="gameScores[n - 1]?.results > 0" :key="n">
                <h3>
                    {{ gameScores[n - 1].response[0]?.game.date.dayOfWeek }}
                    Game(s) -
                    {{
                        gameScores
                            ? gameScores[n - 1].response[0].game.week
                            : ""
                    }}
                </h3>

                <div class="container table-wrapper">
                    <table
                        v-for="gameInfo in gameScores[n - 1].response"
                        id="scores"
                        class="cell"
                        :key="gameInfo.game.id"
                    >
                        <thead>
                            <tr>
                                <th scope="row">
                                    {{ gameInfo.game.status.short }}
                                </th>
                                <th colspan="2"></th>
                                <th>Q1</th>
                                <th>Q2</th>
                                <th>Q3</th>
                                <th>Q4</th>
                                <th
                                    v-if="
                                        gameInfo.game.status.long === 'Final/OT'
                                    "
                                >
                                    O/T
                                </th>
                                <th scope="col" colspan="3">Final</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                @click="
                                    getTeamGameStats(gameInfo.game.id, $event)
                                "
                                title="Click for Game Stats"
                            >
                                <td>
                                    <button
                                        type="button"
                                        id="btnMSb"
                                        aria-expanded="false"
                                        aria-controls="MS01b MS02b MS03b"
                                        aria-label="3 more from"
                                        aria-labelledby="btnMSb lblMSb"
                                    >
                                        <svg
                                            xmlns='\http://www.w3.org/2000/svg"'
                                            viewBox="0 0 80 80"
                                            focusable="false"
                                        >
                                            <path
                                                d="M70.3 13.8L40 66.3 9.7 13.8z"
                                            ></path>
                                        </svg>
                                    </button>
                                </td>
                                <td><img :src="gameInfo.teams.away.logo" /></td>
                                <td scope="row" colspan="2">
                                    {{ gameInfo.teams.away.name }}
                                </td>
                                <td>{{ gameInfo.scores.away.quarter_1 }}</td>
                                <td>{{ gameInfo.scores.away.quarter_2 }}</td>
                                <td>{{ gameInfo.scores.away.quarter_3 }}</td>
                                <td>{{ gameInfo.scores.away.quarter_4 }}</td>
                                <td
                                    v-if="
                                        gameInfo.game.status.long === 'Final/OT'
                                    "
                                >
                                    {{ gameInfo.scores.away.overtime }}
                                </td>
                                <td
                                    :class="{
                                        winner:
                                            gameInfo.scores.away.total >
                                            gameInfo.scores.home.total,
                                    }"
                                    scope="col"
                                    colspan="3"
                                >
                                    {{ gameInfo.scores.away.total }}
                                </td>
                            </tr>

                            <!--======================================================-->
                            <!--============ Game Stats row for away team ============-->
                            <!--======================================================-->
                            <thead class="hidden">
                                <tr class="gameStatsRowHeaders">
                                    <th>
                                        <span class="visually-hidden"
                                            >Toggle</span
                                        >
                                    </th>
                                    <th>Passing Comp</th>
                                    <th>Pass Total</th>
                                    <th>YPP</th>
                                </tr>
                            </thead>

                            <tr
                                v-if="gameStats !== null"
                                class="gameStatsRow hidden"
                            >
                                <td
                                    v-if="gameStats.gamestats !== null"
                                    class="gameStatsItem"
                                >
                                    {{
                                        gameStats.gameStats.response[1]
                                            .statistics.passing.comp_att
                                    }}
                                </td>
                                <td class="gameStatsItem">
                                    {{
                                        gameStats.gameStats.response[1]
                                            .statistics.passing.total
                                    }}
                                </td>
                                <td class="gameStatsItem">
                                    {{
                                        gameStats.gameStats.response[1]
                                            .statistics.passing.yards_per_pass
                                    }}
                                </td>
                            </tr>
                            <!--======================================================-->
                            <!--============ End Game Stats row for away team ========-->
                            <!--======================================================-->

                            <tr
                                @click="
                                    getTeamGameStats(gameInfo.game.id, $event)
                                "
                                title="Click for Game Stats"
                            >
                                <td>
                                    <button
                                        type="button"
                                        id="btnMSb"
                                        aria-expanded="false"
                                        aria-controls="MS01b MS02b MS03b"
                                        aria-label="3 more from"
                                        aria-labelledby="btnMSb lblMSb"
                                    >
                                        <svg
                                            xmlns='\http://www.w3.org/2000/svg"'
                                            viewBox="0 0 80 80"
                                            focusable="false"
                                        >
                                            <path
                                                d="M70.3 13.8L40 66.3 9.7 13.8z"
                                            ></path>
                                        </svg>
                                    </button>
                                </td>
                                <td><img :src="gameInfo.teams.home.logo" /></td>
                                <td scope="row" colspan="2">
                                    {{ gameInfo.teams.home.name }}
                                </td>
                                <td>{{ gameInfo.scores.home.quarter_1 }}</td>
                                <td>{{ gameInfo.scores.home.quarter_2 }}</td>
                                <td>{{ gameInfo.scores.home.quarter_3 }}</td>
                                <td>{{ gameInfo.scores.home.quarter_4 }}</td>
                                <td
                                    v-if="
                                        gameInfo.game.status.long === 'Final/OT'
                                    "
                                >
                                    {{ gameInfo.scores.home.overtime }}
                                </td>
                                <td
                                    :class="{
                                        winner:
                                            gameInfo.scores.home.total >
                                            gameInfo.scores.away.total,
                                    }"
                                    scope="col"
                                    colspan="3"
                                >
                                    {{ gameInfo.scores.home.total }}
                                </td>
                            </tr>

                            <!--======================================================-->
                            <!--============ Game Stats row for home team ============-->
                            <!--======================================================-->
                            <thead class="hidden">
                                <tr class="gameStatsRowHeaders">
                                    <th>
                                        <span class="visually-hidden"
                                            >Toggle</span
                                        >
                                    </th>
                                    <th>Passing Comp</th>
                                    <th>Pass Total</th>
                                    <th>YPP</th>
                                </tr>
                            </thead>

                            <tr
                                v-if="gameStats !== null"
                                class="gameStatsRow hidden"
                            >
                                <td>
                                    <button
                                        type="button"
                                        id="btnMSb"
                                        aria-expanded="false"
                                        aria-controls="MS01b MS02b MS03b"
                                        aria-label="3 more from"
                                        aria-labelledby="btnMSb lblMSb"
                                    >
                                        <svg
                                            xmlns='\http://www.w3.org/2000/svg"'
                                            viewBox="0 0 80 80"
                                            focusable="false"
                                        >
                                            <path
                                                d="M70.3 13.8L40 66.3 9.7 13.8z"
                                            ></path>
                                        </svg>
                                    </button>
                                </td>
                                <td
                                    v-if="gameStats.gamestats !== null"
                                    class="gameStatsItem"
                                >
                                    {{
                                        gameStats.gameStats.response[0]
                                            .statistics.passing.comp_att
                                    }}
                                </td>
                                <td class="gameStatsItem">
                                    {{
                                        gameStats.gameStats.response[0]
                                            .statistics.passing.total
                                    }}
                                </td>
                                <td class="gameStatsItem">
                                    {{
                                        gameStats.gameStats.response[0]
                                            .statistics.passing.yards_per_pass
                                    }}
                                </td>
                            </tr>
                            <!--======================================================-->
                            <!--========= End of Game Stats row for home team ========-->
                            <!--======================================================-->
                        </tbody>

                        <tfoot v-align="center">
                            <tr>
                                <td colspan="8">
                                    Venue - {{ gameInfo.game.venue.city }} -
                                    {{ gameInfo.game.venue.name }}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <!-- ====== If an error for that particular day occurred print it out ===================== -->
            <div
                v-else-if="gameScores[n - 1]?.errors.length !== 0"
                :key="gameScores[n - 1].response?.game.id"
            >
                OOPS!. Error {{ gameScores[n - 1]?.errors }}
            </div>
        </template>
    </div>
</template>

<script setup>
import { inject, watch, ref } from "vue";
import { todayLocaleString, today } from "../modules/getDate.js";
import { getPreviousWeeksDates } from "../modules/getFootballDates.js";
import { useFetches } from "../modules/useFetches.js";
import { useGetTeamStats } from "../modules/getTeamGameStats.js";

// ======= Variable Declarations ============ //
const currentNFLSeason = inject("currentNFLSeason");
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST_FOOTBALL;
let gameStats = ref(null);

let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
};

let urls = [];
// Get Football game dates date
const {
    previousSundaysDateISOString,
    previousMondaysDateISOString,
    previousThursdaysDateISOString,
    previousSaturdaysDateISOString,
} = getPreviousWeeksDates(today);

const fetchPreviousSundaysNFLScores = fetch(
    `https://v1.american-football.api-sports.io/games?league=1&season=${currentNFLSeason}&date=${previousSundaysDateISOString}&timezone=America/New_York`,
    requestOptions
).then((res) => res.json());
const fetchPreviousMondaysNFLScores = fetch(
    `https://v1.american-football.api-sports.io/games?league=1&season=${currentNFLSeason}&date=${previousMondaysDateISOString}&timezone=America/New_York`,
    requestOptions
).then((res) => res.json());
const fetchPreviousThursdaysNFLScores = fetch(
    `https://v1.american-football.api-sports.io/games?league=1&season=${currentNFLSeason}&date=${previousThursdaysDateISOString}&timezone=America/New_York`,
    requestOptions
).then((res) => res.json());
const fetchPreviousSaturdaysNFLScores = fetch(
    `https://v1.american-football.api-sports.io/games?league=1&season=${currentNFLSeason}&date=${previousSaturdaysDateISOString}&timezone=America/New_York`,
    requestOptions
).then((res) => res.json());
urls.push(fetchPreviousThursdaysNFLScores);
urls.push(fetchPreviousSaturdaysNFLScores);
urls.push(fetchPreviousSundaysNFLScores);
urls.push(fetchPreviousMondaysNFLScores);

// Fetch scores
const { apiData: gameScores, loadingState, error } = useFetches(urls);

watch(gameScores, () => {
    gameScores.value.forEach((gameDay) => {
        if (gameDay.results > 0) {
            const getCorrectedDay = new Date(
                gameDay.response[0]?.game.date.date
            );
            getCorrectedDay.setDate(getCorrectedDay.getDate() + 1);
            const tempDayValue = getCorrectedDay.toLocaleDateString("en-US", {
                weekday: "long",
            });
            gameDay.response[0].game.date.dayOfWeek = tempDayValue;
        }
    });
});

// ============================== Methods ============================================= //
/** Description - Retrieves the game stats from  /games/statistics/teams endpoint
 *  @parameters {number, } - the game id, the event object
 *  @returns { object } - This is a composable function that exposes the game statistics object
 */
function getTeamGameStats(gameID, event) {
    const el = event.currentTarget;
    console.log("el.currentTarget: ", el);
    let elSiblings = [];
    console.log("element attr: ", el.getAttribute("aria-expanded"));
    console.log("Target tagName: ", el.target.tagName);
    // Get the siblings of el DOM object
    while ((el = el.nextElementSibling)) {
        elSiblings.push(el);
    }
    console.log("Siblings: ", elSiblings);

    if (
        el.target.tagName === "BUTTON" &&
        el.getAttribute("aria-expanded") === "false"
    ) {
        // Fetch the Gamestats for given gameID
        const url = `https://v1.american-football.api-sports.io/games/statistics/teams?id=${gameID}`;
        gameStats.value = useGetTeamStats(url, HOST_NAME);

        // Loop through the rows and show them
        for (const child of elSiblings) {
            console.log("child tagname", child.tagName);
            child.classList.add("shown");
            child.classList.remove("hidden");
        }

        // Now set the button to expanded
        el.target.setAttribute("aria-expanded", "true");
        // Otherwise button is not expanded...
    } else {
        // Loop thru stats and hide them
        for (const child of elSiblings) {
            child.classList.add("hidden");
            child.classList.remove("shown");
        }
        // Now set the button to collapsed
        el.target.setAttribute("aria-expanded", "false");
    }
}
</script>

<style scoped>
@import "../../assets/css/table.css";

h1 {
    font-size: 2rem;
    font-weight: 600;
}

h2 {
    font-size: 1.4rem;
    font-weight: 550;
    margin-left: -150px;
}

.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 15px 50px;
    justify-items: center;
    align-items: center;
    margin-bottom: 50px;
}

.winner {
    color: #a19923;
}
/* ----------- Table Stylings --------------------- */

/* .gameStatsRow,
.gameStatsRowHeaders {
    visibility: collapse;
} */

.gameStatsRow {
    font-size: 0.6rem;
}
.gameStatsRow > .gameStatsItem {
    font-size: 0.9rem;
}

table {
    margin: 1em 0;
    border-collapse: collapse;
}

th,
td {
    padding: 0.25em 0.5em 0.25em 1em;
    vertical-align: text-top;
    text-align: left;
    text-indent: -0.5em;
}

th {
    vertical-align: bottom;
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-weight: bold;
}

tr.shown,
tr.hidden {
    background-color: #eee;
    display: table-row;
}

tr.hidden {
    display: none;
}

.row button {
    background-color: transparent;
    border: 0.1em solid transparent;
    font: inherit;
    padding: 0.25em 0.5em 0.25em 0.25em;
    width: 100%;
    text-align: left;
}

.row button:focus,
.row button:hover {
    background-color: #ddd;
    outline: 0.2em solid #00f;
}

.row button svg {
    width: 0.8em;
    height: 0.8em;
    margin: 0 0 -0.05em 0;
    fill: #66f;
    transition: transform 0.25s ease-in;
    transform-origin: center 45%;
}

.row button:hover svg,
.row button:focus svg {
    fill: #00c;
}

/* Lean on programmatic state for styling */
.row button[aria-expanded="true"] svg {
    transform: rotate(180deg);
}

.cell button {
    font-size: 60%;
    color: #000;
    background-color: #00f;
    padding: 0.3em 0.2em 0 0.2em;
    border: 0.2em solid #00f;
    border-radius: 50%;
    line-height: 1;
    text-align: center;
    text-indent: 0;
    transform: rotate(270deg);
}

.cell button svg {
    width: 1.25em;
    height: 1.25em;
    fill: #fff;
    transition: transform 0.25s ease-in;
    transform-origin: center 45%;
}

.cell button:hover,
.cell button:focus {
    background-color: #fff;
    outline: none;
}

.cell button:hover svg,
.cell button:focus svg {
    fill: #00f;
}

/* Lean on programmatic state for styling */
.cell button[aria-expanded="true"] svg {
    transform: rotate(90deg);
}

/* ----------- End of Table Stylings -------------- */

/* --- Dialog styles ----- */
details {
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: 0.5em 0.5em 0;
}

summary {
    font-weight: bold;
    margin: -0.5em -0.5em 0;
    padding: 0.5em;
}

details[open] {
    padding: 0.5em;
}

details[open] summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: 0.5em;
}
/* End Dialog styles */

/* Responsive Styling */
@media screen and (max-width: 760px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>
