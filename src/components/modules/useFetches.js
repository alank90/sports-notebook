import { ref } from "vue";

/**
 * @Description - Vue composable function to do multiple fetches asynchrounosly
 * w/Promise.all
 * @param {array} urls
 * @returns {object} - Reactive variables: teamStandings, loadingState, error
 * @importedBy - nba-scores.vue & nba-standings-by-division.vue
 */

export function useFetches(urls) {
  let teamStandings = ref(null);
  let error = ref(null);
  let loadingState = ref(true);

  const doFetches = async () => {
    // reset state before fetching ..
    teamStandings.value = null;

    // ======= fetch the NBA team standings ============ //
    Promise.all(urls)
      .then((data) => {
        teamStandings.value = data;
      })
      .catch((err) => {
        console.error(err);
        error.value = err;
      })
      .finally(() => {
        console.log("fetch process completed");
      });

    loadingState.value = false;
  };

  doFetches();

  return { teamStandings, loadingState, error };
}
