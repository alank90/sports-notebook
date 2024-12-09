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
        <th>Passing Comp</th>
        <th>Pass Total</th>
        <th>Yards/Pass</th>
        <th>Rushing Att</th>
        <th>Rushing Total</th>
        <th>Yards/Rush</th>
        <th>Total Yards</th>
        <th>Turnovers</th>
    </tr>

    <tr class="hidden gameStatsRow">
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].statistics.passing
                    .comp_att
            }}
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].statistics.passing
                    .total
            }}
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].statistics.passing
                    .yards_per_pass
            }}
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].statistics.rushings
                    .attempts
            }}
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].statistics.rushings
                    .total
            }}
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].statistics.rushings
                    .yards_per_rush
            }}
        </td>
        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].statistics.yards
                    .total
            }}
        </td>

        <td v-if="rowGameStats !== null" class="gameStatsItem">
            {{
                rowGameStats.value.response[props.prop_team].statistics
                    .turnovers.total
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
            console.log("in if");
            const url = `https://v1.american-football.api-sports.io/games/statistics/teams?id=${gameID}`;
            const { data, loadingState, error } = useFetch(
                url,
                props.prop_HOST_NAME
            );
            rowGameStats.value = data;
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

button {
    line-height: 0;
    transition: all 1s 0.5s;

    &:hover {
        line-height: 20px;
    }
}

#scores .gameStatsRowHeaders {
    & > th {
        font-size: 0.7rem;
        background-color: var(--blue);
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

#scores tbody tr {
    border-bottom: 1px solid #000;
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
