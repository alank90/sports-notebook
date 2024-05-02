import { ref } from "vue";

/**
 * @Description - Vue composable function to do multiple fetches asynchrounosly
 *   w/Promise.all
 * @param {array} urls
 * @returns {object} - Reactive variables: apiData, loadingState, error
 * @importedBy - nba-standings-by-division.vue, nba-standings-by-conference.vue, nfl-scores.vue, mlb- standings
 */

export function useFetches(urls) {
    let apiData = ref(null);
    let error = ref(null);
    let loadingState = ref(true);

    const doFetches = async () => {
        // reset state before fetching ...
        apiData.value = null;

        // ======= Fetch the NBA team standings ============ //
        Promise.all(urls)
            .then((data) => {
                apiData.value = data;
                if (apiData.value[0].errors?.requests) {
                    error.value = apiData.value[0].errors.requests;
                }
            })
            .catch((err) => {
                console.error(err);
                error.value = err;
            })
            .finally(() => {
                loadingState.value = false;
                console.log("fetch process completed");
            });
    };

    doFetches();

    return { apiData, loadingState, error };
}
