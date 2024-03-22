<template>
    <h1>MLB Standings</h1>
    <div v-if="!loadingState && teamStandings && !error">
        <table>
            <template v-for="(league, index) in baseballLeaguesST">
                <!-- eslint-disable-next-line vue/require-v-for-key  -->
                <thead>
                    <tr class="spacer"></tr>

                    <th>{{ league }} {{ index }}</th>
                    <tr>
                        <th scope="col" colspan="2">Team</th>
                        <th scope="col">W</th>
                        <th scope="col">L</th>
                        <th scope="col">PCT</th>
                    </tr>
                </thead>
                <!-- eslint-disable-next-line vue/require-v-for-key  -->
                <tbody>
                    <tr
                        v-for="team in teamStandings[index].response[0]"
                        :key="team.team.id"
                    >
                        <th scope="row" colspan="2">
                            <img :src="team.team.logo" />{{ team.team.name }}
                        </th>
                        <td>{{ team.games.win.total }}</td>
                        <td>{{ team.games.lose.total }}</td>
                        <td>
                            {{ team.games.win.percentage.replace(/^0+/, "") }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </table>
    </div>
</template>

<script setup>
import { inject } from "vue";
import { useFetches } from "../modules/useFetches";

// ========= Variable Declarations =================== //
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST_BASEBALL;
let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
};
const currentMLBSeason = inject("currentMLBSeason");
let urls = [];

const baseballLeaguesST = ["Cactus", "Grapefruit"];

// ---------- Create fetch array for the Baseball groups( Cactus, Grapefruit) ---------- //
fetch(
    `https://v1.baseball.api-sports.io/standings/groups?&league=1&season=${currentMLBSeason}`,
    requestOptions
)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

baseballLeaguesST.forEach((group) => {
    urls.push(
        fetch(
            `https://v1.baseball.api-sports.io/standings/?group=${group}&league=1&season=${currentMLBSeason}`,
            requestOptions
        ).then((res) => res.json())
    );
});
// ------------ Fetch the data from the endpoint -------------- //

let { apiData: teamStandings, loadingState, error } = useFetches(urls);

// -------------- End fetches --------------------------------- //
</script>

<style scoped>
@import "../../assets/css/table.css";

h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 auto;
}

thead > th:first-of-type {
    font-weight: 550;
    font-size: 1.3rem;
    text-align: left;
    background-color: #002d72;
}

.spacer {
    height: 25px;
}
</style>
