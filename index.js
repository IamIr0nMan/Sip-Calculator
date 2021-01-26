const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var monthlyInvestment = Number(req.body.monthlyInvestment);
  var expectedRateOfReturn = Number(req.body.expectedRateOfReturn) / 1200;
  var tenure = req.body.tenure;
  var investedAmount = 0;
  var totalInvestment = monthlyInvestment * tenure * 12;
  var internalRateOfReturn = 0;
  var finalAmount = 0;

  for (var i = 1; i <= tenure * 12; i++) {
    finalAmount += monthlyInvestment * Math.pow((1 + expectedRateOfReturn), i);
    investedAmount += monthlyInvestment;
  }
  res.send("The final amount of your investment is " + new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(finalAmount.toFixed(2)));
});

app.listen(3000);
