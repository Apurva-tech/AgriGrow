$(function () {
  $(".status-button:not(.open)").on("click", function (e) {
    $(".overlay-app").addClass("is-active");
  });
  $(".pop-up .close").click(function () {
    $(".overlay-app").removeClass("is-active");
  });
});

$(".status-button:not(.open)").click(function () {
  $(".pop-up").addClass("visible");
});

$(".pop-up .close").click(function () {
  $(".pop-up").removeClass("visible");
});

$(function () {
  $(".status-button1:not(.open1)").on("click", function (e) {
    $(".overlay-app").addClass("is-active");
  });
  $(".pop-up1 .close1").click(function () {
    $(".overlay-app").removeClass("is-active");
  });
});

$(".status-button1:not(.open1)").click(function () {
  $(".pop-up1").addClass("visible");
});

$(".pop-up1 .close1").click(function () {
  $(".pop-up1").removeClass("visible");
});
// Pop up for join room
$(function () {
  $(".status-button2:not(.open2)").on("click", function (e) {
    $(".overlay-app").addClass("is-active");
  });
  $(".pop-up2 .close2").click(function () {
    $(".overlay-app").removeClass("is-active");
  });
});

$(".status-button2:not(.open2)").click(function () {
  $(".pop-up2").addClass("visible");
});

$(".pop-up2 .close2").click(function () {
  $(".pop-up2").removeClass("visible");
});
const toggleButton = document.querySelector(".dark-light");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
    document.querySelector("#username").innerHTML =
      user?.displayName || "username"; //
    document.querySelector("#useremail").innerHTML = user?.email || "email"; //
    document.getElementById("profile-img").src = user?.photoURL;
  } else {
    document.querySelector("#username").innerHTML = "Not Signed in"; //
    document.querySelector("#useremail").innerHTML = ""; //
  }
});

// < -------------------- Reminder Scheduling -------------------- >
async function SendSchedule() {
  let obj = {};

  let emails;
  emails = validateMultipleEmails($("#emails").val());
  emails.push({ email: globaluser.email });
  let eventStart = $("#startday").val();
  let eventEnd = $("#endday").val();
  const meet_summary = $("#summary").val();

  obj["emails"] = emails;
  obj["eventStart"] = eventStart;
  obj["eventEnd"] = eventEnd;
  obj["summary"] = meet_summary;
  obj["organiser"] = globaluser.email;
  console.log(obj);

  let res = await fetch(`${window.location.origin}/invite`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "content-type": "application/json",
    },
  });
  let data = await res.json();
  // parse the response as JSON
  console.log("Response data: " + data["success"]);
  if (data["success"]) {
    document.getElementById("status").innerHTML = "Reminder has been scheduled";
  } else {
    document.getElementById("status").innerHTML = data["data"];
  }
  console.log(data);
}
function validateMultipleEmails(emailInput) {
  // Get value on emails input as a string
  let emails = emailInput;
  // Split string by comma into an array
  emails = emails.split(",");
  let valid = true;
  let regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let invalidEmails = [],
    validEmails = [];
  for (let i = 0; i < emails.length; i++) {
    // Trim whitespaces from email address
    emails[i] = emails[i].trim();
    // Check email against our regex to determine if email is valid
    if (emails[i] == "" || !regex.test(emails[i])) {
      invalidEmails.push(emails[i]);
    } else {
      validEmails.push({ email: emails[i] });
    }
  }
  // Output invalid emails
  $(".form-group .text-danger").remove();
  if (invalidEmails != 0) {
    $(".form-group").append(
      '<p class="text-danger">Invalid emails: ' +
        invalidEmails.join(", ") +
        "</p>"
    );
  }
  if (validEmails.length === emails.length) {
    return validEmails;
  } else return null;
}

const loadLocation = async () => {
  const options = {
    method: "GET",
    url: "https://api.ambeedata.com/weather/latest/by-lat-lng",
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
      debugger;
      document.getElementById(
        "humidity"
      ).innerHTML = `humidity : ${response.humidity}`;
      document.getElementById("summary").innerHTML = response.summary;
      document.getElementById(
        "pressure"
      ).innerHTML = `pressure : ${response.pressure}`;
      document.getElementById(
        "visibility"
      ).innerHTML = `visibility : ${response.visibility}`;
      document.getElementById(
        "visibility"
      ).innerHTML = `visibility : ${response.visibility}`;
      document.getElementById(
        "temperature"
      ).innerHTML = `temperature : ${response.temperature}`;
    })
    .catch(function (error) {
      console.error(error);
      return null;
    });
};

//loadLocation();
