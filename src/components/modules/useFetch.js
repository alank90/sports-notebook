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

  async function doFetch() {
    // reset state before fetching ..
    data.value = null;
    error.value = null;

    // resolve the url value synchrously so it's tracked as a
    // dependency by watchEffect()
    const urlValue = unref(url);

    try {
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      // unref() will return the ref value if it's a ref
      // otherwise the value will be returned as-is

      const res = await fetch(urlValue, requestOptions);
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    }
  }

  // Will refetch data if input url changes when url is a ref
  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(doFetch);
  } else {
    // otherwise, just fetch once
    doFetch();
  }
  return { data, error };
}
