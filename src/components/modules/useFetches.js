import { ref, isRef, unref, watchEffect } from "vue";

/**
 * Description - Vue  composable function to fetch data
 * @param {string} url
 * @returns {object} - Reactive variables
 * @importedBy - nba-scores.vue
 */

export function useFetches(urls) {
  // ======= Variable Declarations ============ //
  /* const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
  const HOST_NAME = import.meta.env.VITE_API_HOST; */
  /* let myHeaders = new Headers();

  myHeaders.append("x-apisports-key", API_KEY);
  myHeaders.append("x-rapidapi-host", HOST_NAME);
 */
  let teamStandings = ref([]);
  let error = ref(null);
  let loadingState = ref(null);

  async function doFetches() {
    // reset state before fetching ..
    teamStandings.value = null;
    error.value = null;

    // resolve the url value synchrously so it's tracked as a
    // dependency by watchEffect()
    //const urlValues = unref(urls);

    try {
      /* const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }; */
      // unref() will return the ref value if it's a ref
      // otherwise the value will be returned as-is

      /* const res = await fetch(urlValues, requestOptions);
      data.value = await res.json(); */

      // ======= fetch the NBA team standings ============ //
      Promise.all(urls).then((data) => {
        teamStandings.value = data;
        loadingState.value = false;

      });
    } catch (e) {
      error.value = e;
      return { error };
    }
  }

  // Will refetch data if input url changes when url is a ref
  if (isRef(urls)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(doFetches);
  } else {
    // otherwise, just fetch once
    doFetches();
  }
  console.log(teamStandings);

  return { teamStandings, loadingState };

}
