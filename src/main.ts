// This is my project
// This is my comment

import "./style.css";

document.body.innerHTML = `
  <header style="font-size:100px">Cheez-it Eating Simulator</header>
  <button id="tongue-button">😛</button>
  <div>You ate <span id="counter">0</span> cheez-its</div>
  <div>
    <button id="upgrade1" class="upgradeButton">AUTOFEEDER MK.I</button>
    <span> MK.I's: 0</span>
  </div>
  <div>
    <button id="upgrade2" class="upgradeButton">AUTOFEEDER MK.II</button>
    <span> MK.II's: 0</span>
  </div>
  <div>
    <button id="upgrade3" class="upgradeButton">AUTOFEEDER MK.III</button>
    <span> MK.III's: 0</span>
  </div>
`;

const tongueButton = document.getElementById("tongue-button")!;
const counterElement = document.getElementById("counter")!;
const upgrade1 = document.getElementById("upgrade1")!;
const upgrade2 = document.getElementById("upgrade2")!;
const upgrade3 = document.getElementById("upgrade3")!;

let cheezitCount = 0;
let autofeederRate = 0; // in chzits per second
const upgrade1Price = 10;
const upgrade1Effect = 0.1;
const upgrade2Price = 100;
const upgrade2Effect = 2;
const upgrade3Price = 1000;
const upgrade3Effect = 50;

tongueButton.addEventListener("click", () => {
  increaseCheezitCount(1);
});

upgrade1.addEventListener("click", () => {
  if (cheezitCount >= upgrade1Price) {
    cheezitCount -= upgrade1Price;
    autofeederRate += upgrade1Effect;
  }
});

upgrade2.addEventListener("click", () => {
  if (cheezitCount >= upgrade2Price) {
    cheezitCount -= upgrade2Price;
    autofeederRate += upgrade2Effect;
  }
});

upgrade3.addEventListener("click", () => {
  if (cheezitCount >= upgrade3Price) {
    cheezitCount -= upgrade3Price;
    autofeederRate += upgrade3Effect;
  }
});

function increaseCheezitCount(count: number) {
  cheezitCount += count;
  counterElement.innerText = cheezitCount.toFixed(2);
}

let lastTimestamp: number;
function autofeederUpdate(timestamp: number) {
  const dt = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  increaseCheezitCount((dt / 1000) * autofeederRate);

  requestAnimationFrame(autofeederUpdate);
}
// initial request to initialize lastTimestamp
requestAnimationFrame((timestamp) => {
  lastTimestamp = timestamp;
  requestAnimationFrame(autofeederUpdate);
});
