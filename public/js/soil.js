// To toggle between dark and light theme
const toggleButton = document.querySelector(".dark-light");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
// Script for Soil Data
const soilData = async () => {
  const options = {
    method: "GET",
    url: "https://api.ambeedata.com/soil/latest/by-lat-lng",
    params: { lat: "12.9889055", lng: "77.574044" },
    headers: {
      "x-api-key":
        "38261bc4fb11d0885e76f72e498efd41f218003090250fabb2e472c45632a7ec",
      "Content-type": "application/json",
    },
  };
  axios
    .request(options)
    .then(function (res) {
      const response = res.data.data;
      console.log(response);
      document.getElementById(
        "scantime"
      ).innerHTML = `scantime : ${response[0].scantime}`;
      document.getElementById("soil_temperature").innerHTML =
        response[0].soil_temperature;
      document.getElementById(
        "soil_moisture"
      ).innerHTML = `soil_moisture : ${response[0].soil_moisture}`;
    })
    .catch(function (error) {
      console.error(error);
      return null;
    });
};

// soilData();
