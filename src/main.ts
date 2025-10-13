import "./style.css";

document.body.innerHTML = `
  <header style="font-size:100px">Cheez-it Eating Simulator</header>
  <button id="tongue-button">😛</button>
  <p>You ate <span id="counter">0</span> cheez-its</p>
  <p>You are being fed <span id="chzitRate">0</span> cheez-its per second</p>
  <h>AUTOFEEDERS</h>
  <div>
    <button id="upgrade1" class="upgradeButton">MK.I Price: <span id="price1">10</span></button>
     MK.I's: <span id="upgrade1count">0</span>
  </div>
  <div>
    <button id="upgrade2" class="upgradeButton">MK.II Price: <span id="price2">100</span></button>
     MK.II's: <span id="upgrade2count">0</span>
  </div>
  <div>
    <button id="upgrade3" class="upgradeButton">MK.III Price: <span id="price3">1000</span></button>
     MK.III's: <span id="upgrade3count">0</span>
  </div>
`;

const tongueButton = document.getElementById("tongue-button")!;
const counterElement = document.getElementById("counter")!;
const upgrade1 = document.getElementById("upgrade1")!;
const upgrade2 = document.getElementById("upgrade2")!;
const upgrade3 = document.getElementById("upgrade3")!;
const up1count = document.getElementById("upgrade1count")!;
const up2count = document.getElementById("upgrade2count")!;
const up3count = document.getElementById("upgrade3count")!;
const up1price = document.getElementById("price1")!;
const up2price = document.getElementById("price2")!;
const up3price = document.getElementById("price3")!;
const rateElement = document.getElementById("chzitRate")!;

let cheezitCount = 0;
let upgrade1Price = 10;
const upgrade1Effect = 0.1;
let upgrade1Count = 0;
let upgrade2Price = 100;
const upgrade2Effect = 2;
let upgrade2Count = 0;
let upgrade3Price = 1000;
const upgrade3Effect = 50;
let upgrade3Count = 0;

tongueButton.addEventListener("click", () => {
  increaseCheezitCount(1);
});

upgrade1.addEventListener("click", () => {
  if (cheezitCount >= upgrade1Price) {
    cheezitCount -= upgrade1Price;
    upgrade1Count++;
    up1count.innerText = upgrade1Count.toString();
    upgrade1Price *= 1.15;
    up1price.innerText = upgrade1Price.toFixed(2);
  }
});

upgrade2.addEventListener("click", () => {
  if (cheezitCount >= upgrade2Price) {
    cheezitCount -= upgrade2Price;
    upgrade2Count++;
    up2count.innerText = upgrade2Count.toString();
    upgrade2Price *= 1.15;
    up2price.innerText = upgrade2Price.toFixed(2);
  }
});

upgrade3.addEventListener("click", () => {
  if (cheezitCount >= upgrade3Price) {
    cheezitCount -= upgrade3Price;
    upgrade3Count++;
    up3count.innerText = upgrade3Count.toString();
    upgrade3Price *= 1.15;
    up3price.innerText = upgrade3Price.toFixed(2);
  }
});

function getAutofeederRate() {
  const autoFeederRate = upgrade1Count * upgrade1Effect +
    upgrade2Count * upgrade2Effect + upgrade3Count * upgrade3Effect;
  rateElement.innerText = autoFeederRate.toFixed(2);
  return autoFeederRate;
}

function increaseCheezitCount(count: number) {
  cheezitCount += count;
  counterElement.innerText = cheezitCount.toFixed(2);
}

let lastTimestamp: number;
function autofeederUpdate(timestamp: number) {
  const dt = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  increaseCheezitCount((dt / 1000) * getAutofeederRate());

  requestAnimationFrame(autofeederUpdate);
}
// initial request to initialize lastTimestamp
requestAnimationFrame((timestamp) => {
  lastTimestamp = timestamp;
  requestAnimationFrame(autofeederUpdate);
});
