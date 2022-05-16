const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const https = require("https");
const { json } = require("express/lib/response");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const url = "https://us18.api.mailchimp.com/3.0/lists/cd89e7c120"; //note: the 18 is the last number in your api key

  const options = {
    method: "POST",
    auth: "claudia:0837fc2ebe1b1a1dc185452c062ee36c-us18",
  };

  let jsonData = JSON.stringify(data);

  const request = https.request(url, options, function (response) {
    response.on("data", function () {
      console.log("hi");
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen("3000", function () {
  console.log("App listening on port 3000");
});

// note: api key
// 0837fc2ebe1b1a1dc185452c062ee36c-us18
// note: list Id
// cd89e7c120
