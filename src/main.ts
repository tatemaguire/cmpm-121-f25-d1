import "./style.css";

document.body.innerHTML = `
  <header style="font-size:100px">Cheez-it Eating Simulator</header>
  <button id="tongue-button">😛</button>
  <p>You ate <span id="counter">0</span> cheez-its</p>
  <p>You are being fed <span id="chzitRate">0</span> cheez-its per second</p>
  <h>AUTOFEEDERS</h>
  <div id="autofeederButtons"></div>
  <div id="afDescription"></div>
`;

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
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
  {
    name: "Flinger",
    cost: 10,
    rate: 0.1,
    description: "Flings cheezits in your general direction. Usually misses.",
  },
  {
    name: "Scooper",
    cost: 50,
    rate: 2,
    description: "Scoops cheezits into your mouth one by one.",
  },
  {
    name: "Cannon",
    cost: 400,
    rate: 50,
    description: "Launches cheezits into your mouth with decent accuracy",
  },
  {
    name: "Goldfish",
    cost: 6700,
    rate: -1,
    description: "Disgusting.",
  },
  {
    name: "IV",
    cost: 10000,
    rate: 400,
    description: "Injects pulverized cheezits directly into your bloodstream.",
  },
];

const tongueButton = document.getElementById("tongue-button")!;
const counterElement = document.getElementById("counter")!;
const autofeederButtonsDiv = document.getElementById("autofeederButtons")!;
const rateElement = document.getElementById("chzitRate")!;
const descriptionElement = document.getElementById("afDescription")!;

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

// set up button behavior
for (const af of autofeederData) {
  af.buttonElem.addEventListener("click", () => {
    if (cheezitCount >= af.itemData.cost) {
      cheezitCount -= af.itemData.cost;
      af.count++;
      af.itemData.cost *= 1.15;
      af.buttonElem.innerText = AFString(af);
    }
  });
  af.buttonElem.addEventListener("mouseover", () => {
    descriptionElement.innerText = af.itemData.description;
  });
  af.buttonElem.addEventListener("mouseout", () => {
    descriptionElement.innerText = "";
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
