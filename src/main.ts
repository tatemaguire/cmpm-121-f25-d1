import "./style.css";

document.body.innerHTML = `
  <header style="font-size:100px">Cheez-it Eating Simulator</header>
  <button id="tongue-button">😛</button>
  <div>You ate <span id="counter">0</span> cheez-its</div>
  <button id="upgrade1">AUTOFEEDER MK.I</button>
`;

const tongueButton = document.getElementById("tongue-button")!;
const counterElement = document.getElementById("counter")!;
const upgrade1 = document.getElementById("upgrade1")!;

let cheezitCount = 0;
let autofeederRate = 0; // in chzits per second
const upgrade1Price = 10;
const upgrade1Effect = 1;

tongueButton.addEventListener("click", () => {
  increaseCheezitCount(1);
});

upgrade1.addEventListener("click", () => {
  if (cheezitCount >= upgrade1Price) {
    cheezitCount -= upgrade1Price;
    autofeederRate += upgrade1Effect;
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
