<template>
    <tr class="hidden gameStatsRowHeaders" id="MS01b">
        <th>Passing Comp</th>
        <th>Pass Total</th>
        <th>YPP</th>
    </tr>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["props_GameID"]);
console.log("gameID: ", props.props_GameID);
const count = ref(0);
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
