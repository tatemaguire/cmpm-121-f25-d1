import "./style.css";

document.body.innerHTML = `
  <header style="font-size:100px">Cheez-it Eating Simulator</header>
  <button id="tongue-button">😛</button>
  <div>You ate <span id="counter">0</span> cheez-its</div>
  <div>You are being fed <span id="chzitRate">0</span> cheez-its per second</div>
  <div>
    <button id="upgrade1" class="upgradeButton">AUTOFEEDER MK.I</button>
     MK.I's: <span id="upgrade1count">0</span>
  </div>
  <div>
    <button id="upgrade2" class="upgradeButton">AUTOFEEDER MK.II</button>
     MK.II's: <span id="upgrade2count">0</span>
  </div>
  <div>
    <button id="upgrade3" class="upgradeButton">AUTOFEEDER MK.III</button>
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
const rateElement = document.getElementById("chzitRate")!;

let cheezitCount = 0;
const upgrade1Price = 10;
const upgrade1Effect = 0.1;
let upgrade1Count = 0;
const upgrade2Price = 100;
const upgrade2Effect = 2;
let upgrade2Count = 0;
const upgrade3Price = 1000;
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
  }
});

upgrade2.addEventListener("click", () => {
  if (cheezitCount >= upgrade2Price) {
    cheezitCount -= upgrade2Price;
    upgrade2Count++;
    up2count.innerText = upgrade2Count.toString();
  }
});

upgrade3.addEventListener("click", () => {
  if (cheezitCount >= upgrade3Price) {
    cheezitCount -= upgrade3Price;
    upgrade3Count++;
    up3count.innerText = upgrade3Count.toString();
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
