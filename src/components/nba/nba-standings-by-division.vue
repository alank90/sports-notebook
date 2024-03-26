<template>
    <div v-if="!loadingState && teamStandingsByDivision" class="container">
        <table>
            <caption>
                Eastern Conference
            </caption>
            <template v-for="item in easternConferenceTeams">
                <!-- eslint-disable-next-line vue/require-v-for-key  -->
                <thead>
                    <tr>
                        <th scope="col" colspan="2">
                            {{ item.parameters.group }}
                        </th>
                        <th scope="col">W</th>
                        <th scope="col">L</th>
                        <th scope="col">PCT</th>
                    </tr>
                </thead>
                <!-- eslint-disable-next-line vue/require-v-for-key  -->
                <tbody>
                    <tr v-for="team in item.response[0]" :key="team.team.id">
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

        <table>
            <caption>
                Western Conference
            </caption>
            <template v-for="item in westernConferenceTeams">
                <!-- eslint-disable-next-line vue/require-v-for-key  -->
                <thead>
                    <tr>
                        <th scope="col" colspan="2">
                            {{ item.parameters.group }}
                        </th>
                        <th scope="col">W</th>
                        <th scope="col">L</th>
                        <th scope="col">PCT</th>
                    </tr>
                </thead>
                <!-- eslint-disable-next-line vue/require-v-for-key  -->
                <tbody>
                    <tr v-for="team in item.response[0]" :key="team.team.id">
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
    <div v-else-if="loadingState">
        <p>Loading...</p>
        <img src="@/assets/img/loading.gif" alt="Loading Data" />
    </div>
    <div v-else>Sorry. Error retrieving data at this time. {{ error }}</div>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { useFetches } from "../modules/useFetches.js";

// ======= Variable Declarations ============ //
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST_BASKETBALL;
const currentNBASeason = inject("currentNBASeason");
const nbaDivisions = ref([
    ["Atlantic", "Southeast", "Central"],
    ["Northwest", "Pacific", "Southwest"],
]);

let easternConferenceTeams = ref([]);
let westernConferenceTeams = ref([]);

let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
};

let urls = [];

// Populate the urls array with url's of each division for API fetch's

for (let i = 0; i < nbaDivisions.value.length; i++) {
    for (let n = 0; n < nbaDivisions.value[i].length; n++) {
        urls.push(
            fetch(
                `https://v1.basketball.api-sports.io/standings/?league=12&group=${nbaDivisions.value[i][n]}&season=${currentNBASeason}`,
                requestOptions
            ).then((res) => res.json())
        );
    }
}

let {
    apiData: teamStandingsByDivision,
    loadingState,
    error,
} = useFetches(urls);

if (error.value) console.log("Error returned from doFetch() =>", error);

// ======== Computed Values ======================= //
easternConferenceTeams = computed(() => {
    return teamStandingsByDivision.value.filter((team) => {
        return nbaDivisions.value[0].includes(team.parameters.group);
    });
});

westernConferenceTeams = computed(() => {
    return teamStandingsByDivision.value.filter((team) => {
        return nbaDivisions.value[1].includes(team.parameters.group);
    });
});
</script>

<style scoped>
@import "../../assets/css/tableStandings.css";

div > p {
    font-size: 1.8rem;
}
</style>
