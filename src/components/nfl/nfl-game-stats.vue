<template>
    <tr v-if="loadingState === true">
        Loading...
    </tr>
    <tbody v-else>
        <!--======================================================-->
        <!--============ Game Stats row for team ============-->
        <!--======================================================-->
        <tr class="gameStatsRowHeaders" id="MS01b">
            <th>Passing Comp</th>
            <th>Pass Total</th>
            <th>YPP</th>
        </tr>

        <tr class="gameStatsRow" id="MS02b">
            <td v-if="rowGameStats !== null" class="gameStatsItem">
                {{
                    rowGameStats.value.response[props.prop_team].statistics
                        .passing.comp_att
                }}
            </td>
            <td v-if="rowGameStats !== null" class="gameStatsItem">
                {{
                    rowGameStats.value.response[props.prop_team].statistics
                        .passing.total
                }}
            </td>
            <td v-if="rowGameStats !== null" class="gameStatsItem">
                {{
                    rowGameStats.value.response[props.prop_team].statistics
                        .passing.yards_per_pass
                }}
            </td>
        </tr>
    </tbody>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "../modules/useFetch.js";

const props = defineProps(["prop_HOST_NAME", "prop_team"]);
let rowGameStats = ref(null);

// ================================================================ //
// ====================== Methods ================================= //
// ================================================================ //

/** Description - Retrieves the game stats from  /games/statistics/teams endpoint
 *  @parameters {number, object } - the game id, the event object
 *  @returns { object } - This is a composable function that exposes the game statistics object
 */
const getStats = (gameID) => {
    // Fetch the Gamestats for given gameID.
    const url = `https://v1.american-football.api-sports.io/games/statistics/teams?id=${gameID}`;
    const { data, loadingState, error } = useFetch(url, props.prop_HOST_NAME);
    rowGameStats.value = data;
    console.log(rowGameStats.value);
};

defineExpose({ getStats });
</script>

<style lang="css" scoped>
#scores .gameStatsRowHeaders {
    & > th {
        font-size: 0.8rem;
        background-color: var(--light-blue);
        font-weight: 600;
    }
}

#scores .gameStatsRow {
    & > td {
        font-size: 0.8rem;
        font-weight: 650;
    }
    & td:last-child:not(:first-child) {
        font-weight: 650;
        font-size: 0.8rem;
    }
}
</style>
<!-- ================ Away markup========================== -->
<!-- <tr class="hidden gameStatsRowHeaders" id="MS01b">
    <th>Passing Comp</th>
    <th>Pass Total</th>
    <th>YPP</th>
</tr>

<tr class="hidden gameStatsRow" id="MS02b">
    <td
        v-if="gameStats !== null"
        class="gameStatsItem"
    >
        {{
            gameStats.gameStats.response[1]
                .statistics.passing.comp_att
        }}
    </td>
    <td
        v-if="gameStats !== null"
        class="gameStatsItem"
    >
        {{
            gameStats.gameStats.response[1]
                .statistics.passing.total
        }}
    </td>
    <td
        v-if="gameStats !== null"
        class="gameStatsItem"
    >
        {{
            gameStats.gameStats.response[1]
                .statistics.passing.yards_per_pass
        }}
    </td>
</tr> -->

<!--======================================================-->
<!--============ Game Stats row for home team ============-->
<!--======================================================-->
<!-- <tr class="hidden gameStatsRowHeaders" id="MS03b">
                                <th>Passing Comp</th>
                                <th>Pass Total</th>
                                <th>YPP</th>
                            </tr>

                            <tr
                                v-if="gameStats !== null"
                                class="gameStatsRow hidden"
                                id="MS04b"
                            >
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
                            </tr> -->
<!--======================================================-->
<!--========= End of Game Stats row for home team ========-->
<!--======================================================-->
