const express = require("express");
const cheerio = require("cheerio")
const axios = require("axios")
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


async function Scrapeval(){
  const response = await axios.get("https://www.marketwatch.com/investing/cryptocurrency/btccad");
  const html = response.data;
  const $ = cheerio.load(html);
  const livePrice = $(".character").next().text();
  return livePrice
}
  
  io.on('connection',(socket) => {
    x = Scrapeval()
    axios.get("https://blockchain.info/latestblock")
    .then((response) => {
      y = response.data.hash
      io.emit('blockhash', y)
    })
    x.then(function(result){
      // this calculation represents the cost of a bitcoin, multiplied by the bitcoins per second generated (6.25bitcoins/10mins)/(10min*60sec)
      // giving money generated by bitcoin per second
      var realres = result.replace(",", "")
      var bitpersec = parseFloat(realres)*0.01041668
      // next we calculate the total hashes per second spent on the problem, estimated for now as 350 million TeraHashes/sec
      // divide bitpersec by 3.50 million to get cents per terahash
      var centperTH = bitpersec/3500000
      // the anteater 19 gets around 95TH/s
      // we now have cents per second generated by the anteater 19
      var antpersec = centperTH*95
      // we now want how much it can make in a day
      var antperday = (antpersec*3600*24)
      // the anteater will use on average 78kWh every day (3.25kW*24h)
      // 78kWh * cost/kWh = cost per day to run mining operation
      // cost/kWh = antperday/78kWh
      var costperkWh = (antperday)/78
      // final conversion to cents
      io.emit('bitcoin', costperkWh.toFixed(2))
      io.emit('bitcoinprice', parseFloat(realres))
    })
})




server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
