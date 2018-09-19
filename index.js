let express = require("express");
let app = express();
let request = require("request");

function json(req, res) {
  request(
    {
      uri: encodeURI(req.body.url),
      headers: {
        Cookie: req.headers["cookie"],
        "User-Agent": req.headers["user-agent"]
      },
      strictSSL: false
    },
    function(err, response, body) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res
          .set({
            ...response.headers,
            "Access-Control-Allow-Origin": "*"
          })
          .status(200)
          .send(body);
      }
    }
  );
}

function simple(req, res) {
  console.log(req.query.url);
  request(
    {
      uri: req.query.url,
      strictSSL: false
    },
    function(err, response, body) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res
          .set({
            ...response.headers,
            "Access-Control-Allow-Origin": "*"
          })
          .status(200)
          .send(body);
      }
    }
  );
}

app.post("/", json);
app.get("/", simple);

app.listen(8060, () => {
  console.log("Proxy is Running on localhost:8060");
});
