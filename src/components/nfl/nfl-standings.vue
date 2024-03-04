<template>
  <h1>NFL Standings</h1>

  <div v-if="!nflStandings?.results && nflStandings?.errors.length !== 0">
    <p>Loading...</p>
    <img src="@/assets/img/loading.gif" alt="Loading Data" />
  </div>
  <div
    v-else-if="nflStandings !== null && nflStandings.errors.length === 0"
    class="container"
  >
    <h2>{{ afc[0].value[0].conference }}</h2>

    <!------------------------------ AFC Template ---------------------------------------------------------------- -->
    <template v-for="n in 4">
      <!-- eslint-disable-next-line vue/require-v-for-key  -->
      <table id="standings">
        <thead>
          <tr>
            <th scope="col" colspan="2">{{ afc[n - 1].value[0].division }}</th>
            <th scope="col">W</th>
            <th scope="col">L</th>
            <th scope="col">PCT</th>
            <th scope="col">GB</th>
            <th scope="col">Streak</th>
            <th scope="col">Div</th>
            <th scope="col">Home</th>
            <th scope="col">Away</th>
          </tr>
        </thead>

        <template v-for="i in 4">
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <tbody>
            <tr>
              <th scope="row" colspan="2">
                <img :src="afc[n - 1].value[i - 1].team.logo" />{{
                  afc[n - 1].value[i - 1].team.name
                }}
              </th>
              <td>{{ afc[n - 1].value[i - 1].won }}</td>
              <td>{{ afc[n - 1].value[i - 1].lost }}</td>
              <td v-if="afc[n - 1].value[i - 1].ties">
                {{ afc[n - 1].value[i - 1].ties }}
              </td>
              <td>
                {{
                  (
                    (parseInt(
                      afc[n - 1].value[i - 1].won +
                        0.5 * afc[n - 1].value[i - 1].ties
                    ) /
                      (parseInt(afc[n - 1].value[i - 1].won) +
                        parseInt(
                          afc[n - 1].value[i - 1].lost +
                            parseInt(afc[n - 1].value[i - 1].ties)
                        ))) *
                    100
                  ).toFixed(1)
                }}%
              </td>
              <td>{{ afc[n - 1].value[i - 1].gmsBk }}</td>
              <td>{{ afc[n - 1].value[i - 1].streak }}</td>
              <td>{{ afc[n - 1].value[i - 1].records.division }}</td>
              <td>{{ afc[n - 1].value[i - 1].records.home }}</td>
              <td>{{ afc[n - 1].value[i - 1].records.road }}</td>
            </tr>
          </tbody>
        </template>
      </table>
    </template>

    <!------------------------------ NFC Template ---------------------------------------------------------------- -->
    <h2>{{ nfc[0].value[0].conference }}</h2>

    <template v-for="n in 4">
      <!-- eslint-disable-next-line vue/require-v-for-key  -->
      <table id="standings">
        <thead>
          <tr>
            <th scope="col" colspan="2">{{ nfc[n - 1].value[0].division }}</th>
            <th scope="col">W</th>
            <th scope="col">L</th>
            <th scope="col">PCT</th>
            <th scope="col">GB</th>
            <th scope="col">Streak</th>
            <th scope="col">Div</th>
            <th scope="col">Home</th>
            <th scope="col">Away</th>
          </tr>
        </thead>

        <template v-for="i in 4">
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <tbody>
            <tr>
              <th scope="row" colspan="2">
                <img :src="nfc[n - 1].value[i - 1].team.logo" />{{
                  nfc[n - 1].value[i - 1].team.name
                }}
              </th>
              <td>{{ nfc[n - 1].value[i - 1].won }}</td>
              <td>{{ nfc[n - 1].value[i - 1].lost }}</td>
              <td v-if="nfc[n - 1].value[i - 1].ties">
                {{ nfc[n - 1].value[i - 1].ties }}
              </td>
              <td>
                {{
                  (
                    (parseInt(
                      nfc[n - 1].value[i - 1].won +
                        0.5 * nfc[n - 1].value[i - 1].ties
                    ) /
                      (parseInt(nfc[n - 1].value[i - 1].won) +
                        parseInt(
                          nfc[n - 1].value[i - 1].lost +
                            parseInt(nfc[n - 1].value[i - 1].ties)
                        ))) *
                    100
                  ).toFixed(1)
                }}%
              </td>
              <td>{{ nfc[n - 1].value[i - 1].gmsBk }}</td>
              <td>{{ nfc[n - 1].value[i - 1].streak }}</td>
              <td>{{ nfc[n - 1].value[i - 1].records.division }}</td>
              <td>{{ nfc[n - 1].value[i - 1].records.home }}</td>
              <td>{{ nfc[n - 1].value[i - 1].records.road }}</td>
            </tr>
          </tbody>
        </template>
      </table>
    </template>
  </div>
  <div v-else-if="nflStandings !== null">
    {{ nflStandings.errors.requests }}
  </div>
  <div v-else>Sorry. Your request failed. {{ error }}</div>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import { useFetch } from "../modules/useFetch.js";

  // ======= Variable Declarations ============ //
  const currentNFLSeason = "2023";
  const urlNFLStandings = `https://v1.american-football.api-sports.io/standings?league=1&season=${currentNFLSeason}`;
  const hostName = import.meta.env.VITE_API_HOST_FOOTBALL;

  let afc = ref();
  let nfc = ref();

  const { data: nflStandings, error } = useFetch(urlNFLStandings, hostName);

  // ======================================================================================= //
  // =============== Computed  & Watch values for team standings by Division ============== //
  // ====================================================================================== //
  const afcEastStandings = computed(() => {
    return nflStandings.value.response.filter(
      (team) => team.division === "AFC East"
    );
  });

  const afcNorthStandings = computed(() => {
    return nflStandings.value.response.filter(
      (team) => team.division === "AFC North"
    );
  });

  const afcSouthStandings = computed(() => {
    return nflStandings.value.response.filter(
      (team) => team.division === "AFC South"
    );
  });

  const afcWestStandings = computed(() => {
    return nflStandings.value.response.filter(
      (team) => team.division === "AFC West"
    );
  });

  const nfcEastStandings = computed(() => {
    return nflStandings.value.response.filter(
      (team) => team.division === "NFC East"
    );
  });

  const nfcNorthStandings = computed(() => {
    return nflStandings.value.response.filter(
      (team) => team.division === "NFC North"
    );
  });

  const nfcSouthStandings = computed(() => {
    return nflStandings.value.response.filter(
      (team) => team.division === "NFC South"
    );
  });

  const nfcWestStandings = computed(() => {
    return nflStandings.value.response.filter(
      (team) => team.division === "NFC West"
    );
  });

  watch(nflStandings, () => {
    if (nflStandings.value.response.length > 0) {
      calculateGamesBack(afc.value);
      calculateGamesBack(nfc.value);
    }
  });

  // ============================================================================= //
  // =============== End of Computed values for team standings by Division ======= //
  // ============================================================================= //

  // ------------------------------ Functions ------------------------------------------------------ //

  /** @Description - Function to calculate how many games back a team is
   *  @param {two-dimensional array} divisionalArray - a two-dimensional array of conference teams by division
   *  @extends {nflStandings.response} - Adds the gmsBk property to each team
   *  @calledBy - From a watch effect.
   */
  const calculateGamesBack = (conferenceArrayByDivision) => {
    let gamesBack = Number;
    //console.log("conferenceArrayByDivision", conferenceArrayByDivision[1].value[2].team.name);
    let firstPlaceTeam = {
      wins: null,
      losses: null,
      ties: null,
    };

    conferenceArrayByDivision.forEach((divisionalArrayByTeams) => {
      divisionalArrayByTeams.value.forEach((divisionalTeam) => {
        if (divisionalTeam.position === 1) {
          divisionalTeam.gmsBk = "--";
          // designate first place team in each division
          firstPlaceTeam.wins = divisionalTeam.won;
          firstPlaceTeam.losses = divisionalTeam.lost;
          firstPlaceTeam.ties = divisionalTeam.ties;
        } else {
          gamesBack =
            (firstPlaceTeam.wins -
              firstPlaceTeam.losses -
              (divisionalTeam.won - divisionalTeam.lost)) /
            2;

          if (gamesBack === 0) {
            divisionalTeam.gmsBk = "--";
            return;
          }
          divisionalTeam.gmsBk = gamesBack;
        }
      });
    });
  };
  // ------------------------------ End Functions ---------------------------------------------------- //

  // ============ Construct the Conference arrays ============================ //
  afc.value = [
    afcEastStandings,
    afcNorthStandings,
    afcSouthStandings,
    afcWestStandings,
  ];
  nfc.value = [
    nfcEastStandings,
    nfcNorthStandings,
    nfcSouthStandings,
    nfcWestStandings,
  ];
</script>

<style scoped>
  @import "../modules/table.css";

  h1 {
    font-size: 1.5rem;
  }

  .container {
    width: 85%;
    max-width: 900px;
    margin: 0 auto 5% auto;
  }

  table:not(:first-child) {
    margin-top: 20px;
  }

  div > p {
    font-size: 1.8rem;
  }
</style>
