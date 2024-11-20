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

    <tr class="gameStatsRowHeaders">
        <th>FG/Att,FG/Md,FG/Pct</th>
        <th>FT/Att,FT/Md,FT/Pct</th>
        <th>Tot Assts</th>
        <th>Blocks</th>
        <th>Rebs</th>
        <th>3pt/Att,3pt/Md,3pt/pct</th>
        <th>Steals</th>
        <th>Turnovers</th>
    </tr>

    <tr class="gameStatsRow">
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].field_goals
                    .attempts
            }}
        </td>
    </tr>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "../modules/useFetch.js";

const props = defineProps(["prop_HOST_NAME", "prop_team", "prop_gameID"]);
let rowGameStats = ref(null);

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

    console.log("gameID & el:", gameID, el);

    // Fetch the Gamestats for given gameID if necessary.
    if (rowGameStats.value === null) {
        const url = `https://v1.basketball.api-sports.io/games/statistics/teams?id=${gameID}`;
        const { data, loadingState, error } = useFetch(
            url,
            props.prop_HOST_NAME
        );
        rowGameStats.value = data;
    }
};
</script>

<style lang="css" scoped>
@import "../../assets/css/style.css";
@import "../../assets/css/table.css";

.gameStatsRowHeaders {
    & > th {
        font-size: 0.7rem;
        background-color: var(--blue);
        font-weight: 600;
    }
}
</style>
