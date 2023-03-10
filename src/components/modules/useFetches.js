import { ref } from "vue";

/**
 * @Description - Vue composable function to do multiple fetches asynchrounosly
 * w/Promise.all
 * @param {array} urls
 * @returns {object} - Reactive variables
 * @importedBy - nba-scores.vue
 */

export function useFetches(urls) {
  let teamStandings = ref(null);
  let error = ref(null);
  let loadingState = ref(true);

  const doFetches = async () => {
    // reset state before fetching ..
    teamStandings.value = null;
    error.value = null;

    try {
      // ======= fetch the NBA team standings ============ //
      Promise.all(urls).then((data) => {
        teamStandings.value = data;
      });
    } catch (e) {
      error.value = e;
    }

    loadingState.value = false;
  };

  doFetches();

  return { teamStandings, loadingState, error };
}
