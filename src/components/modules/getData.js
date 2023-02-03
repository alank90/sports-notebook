// ======= Variable Declarations ============ //
export default async function getData(url) {
  const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
  const HOST_NAME = import.meta.env.VITE_API_HOST;
  let sportsData = [];
  let loadingStatus = Boolean;
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  myHeaders.append("x-rapidapi-host", HOST_NAME);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(url, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      sportsData = data;
      console.log("called procedure");
      loadingStatus = false;
    });

  return { sportsData, loadingStatus };
}
