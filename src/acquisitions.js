import Chart from 'chart.js/auto'
let value = 0;
let second1 = 0;
let second2 = 0;
let minute1 = 0;
let minute2 = 0;
let cost = 0;
async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
let appendval = 0
let shaval = 0
let btn1 = document.getElementById("btn1")
function hash(){
  appendval = document.getElementById("appendval").value
  shaval = sha256(appendval)
  shaval.then(function(result) {
    document.getElementById("shash").innerHTML = result
 })
}

btn1.addEventListener('click', hash)



  document.getElementById("minute2").innerHTML = minute2
  document.getElementById("seconds1").innerHTML = second1
  document.getElementById("seconds2").innerHTML = second2
  document.getElementById("deficit").innerHTML = cost;
  var myChart = new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      options: {
        responsive: true,
        scales:{
          x:{
            grid:{
              drawOnChartArea: false
            }
          }
        },
        animation: true,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: ["Average Canadian household per month", "Driving 100,000km (24.2 gas mileage)", "10,000,000 visa transactions", 
        "All ATM's in the world per day", "Bitcoin"],
        datasets: [
          {
            label: 'Kilowatt hours',
            data: [1200, 7700, 15000, 20000, value],
            backgroundColor: 'rgb(255, 99, 132)'

          }
        ]
      }
    }
  );
let numstorage = [1000000, 400000, 200000, 75000, 50000];
let labelstorage = ["average US citizens energy use during their life", "energy output of a coal power plant for 1 hour", "Netherlands energy useage per minute", "Burning 30 tonnes of coal", "Creation of 250 solar panels"];
setInterval(add_100ms, 1000);
setInterval(add_1000ms, 1000);
function add_1000ms(){
  second1+=1;
  cost += 64800;
  if (second1 == 10){
    second2 +=1;
    second1 = 0;
  }
  if (second2 == 6){
    minute1 +=1;
    second2 = 0;
  }
  if (minute1 == 10){
    minute2 +=1;
    minute1 = 0;
  }
  document.getElementById("minute1").innerHTML = minute1;
  document.getElementById("minute2").innerHTML = minute2;
  document.getElementById("seconds1").innerHTML = second1;
  document.getElementById("seconds2").innerHTML = second2;
  document.getElementById("deficit").innerHTML = (cost*0.75).toFixed(0);
}
  function add_100ms(){
    value += (4027);
    oilbarr = (value*(3/4)*(1/1700)).toFixed(2);
    if (value > numstorage.slice(-1) && numstorage.length != 0){
        let x = numstorage.pop();
        let y = labelstorage.pop();
        myChart.data.datasets[0].data.splice(0, 1);
        myChart.data.datasets[0].data.splice(3, 0, x);
        myChart.data.labels.splice(0, 1);
        myChart.data.labels.splice(3, 0, y);

    }
    myChart.data.datasets[0].data[4] = value;
    myChart.update();
    document.getElementById("oilbarr").innerHTML = oilbarr;
  }


