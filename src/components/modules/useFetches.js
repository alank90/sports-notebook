import { ref, isRef, unref, watchEffect } from "vue";

/**
 * Description - Vue  composable function to fetch data
 * @param {string} url
 * @returns {object} - Reactive variables
 * @importedBy - nba-scores.vue
 */

export function useFetch(url) {
  // ======= Variable Declarations ============ //
  const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
  const HOST_NAME = import.meta.env.VITE_API_HOST;
  let myHeaders = new Headers();

  myHeaders.append("x-apisports-key", API_KEY);
  myHeaders.append("x-rapidapi-host", HOST_NAME);

  const data = ref(null);
  const error = ref(null);

  async function doFetches() {
    // reset state before fetching ..
    data.value = null;
    error.value = null;
  }
}
