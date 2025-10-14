import "./style.css";

document.body.innerHTML = `
  <header style="font-size:100px">Cheez-it Eating Simulator</header>
  <button id="tongue-button">😛</button>
  <p>You ate <span id="counter">0</span> cheez-its</p>
  <p>You are being fed <span id="chzitRate">0</span> cheez-its per second</p>
  <h>AUTOFEEDERS</h>
  <div id="autofeederButtons"></div>
`;

interface Item {
  name: string;
  cost: number;
  rate: number;
}

interface AFData {
  itemData: Item;
  count: number;
  buttonElem: HTMLButtonElement;
}

function AFString(af: AFData) {
  return af.itemData.name + " " + af.itemData.cost.toFixed(2);
}

const availableItems: Item[] = [
  { name: "MK.I", cost: 10, rate: 0.1 },
  { name: "MK.II", cost: 100, rate: 2 },
  { name: "MK.III", cost: 1000, rate: 50 },
];

const tongueButton = document.getElementById("tongue-button")!;
const counterElement = document.getElementById("counter")!;
const autofeederButtonsDiv = document.getElementById("autofeederButtons")!;
const rateElement = document.getElementById("chzitRate")!;

let cheezitCount = 0;

const autofeederData: AFData[] = [];
for (const item of availableItems) {
  const button = document.createElement("button");
  autofeederButtonsDiv.appendChild(button);

  const af = {
    itemData: item,
    count: 0,
    buttonElem: button,
  };
  autofeederData.push(af);

  button.innerText = AFString(af);
}

tongueButton.addEventListener("click", () => {
  increaseCheezitCount(1);
});

for (const af of autofeederData) {
  af.buttonElem.addEventListener("click", () => {
    if (cheezitCount >= af.itemData.cost) {
      cheezitCount -= af.itemData.cost;
      af.count++;
      af.itemData.cost *= 1.15;
      af.buttonElem.innerText = AFString(af);
    }
  });
}

function getAutofeederRate() {
  let autofeederRate = 0;
  for (const af of autofeederData) {
    autofeederRate += af.count * af.itemData.rate;
  }
  rateElement.innerText = autofeederRate.toFixed(2);
  return autofeederRate;
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
