import { ref, isRef, unref, watchEffect } from "vue";

/**
 * Description - Vue  composable function to fetch data
 * @param {string} url
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

    // resolve the url value synchrously so it's tracked as a
    // dependency by watchEffect()
    //const urlValues = unref(urls);

    try {
      // ======= fetch the NBA team standings ============ //
      Promise.all(urls).then((data) => {
        teamStandings.value = data;
      });
    } catch (e) {
      error.value = e;
      return { error };
    }

    loadingState.value = false;
  };

  doFetches();

  // Will refetch data if input url changes when url is a ref
  /* if (isRef(urls)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(doFetches);
  } else {
    // otherwise, just fetch once
    doFetches();
  } */

  return { teamStandings, loadingState, error };
}
