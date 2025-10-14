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
  count: number;
  buttonElem: HTMLButtonElement;
}

function ItemString(af: Item) {
  return af.name + " " + af.cost.toFixed(2);
}

// describes the items available to purchase, not the actual data used by the code
const config = [
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

// Element references
const tongueButton = document.getElementById("tongue-button")!;
const counterElement = document.getElementById("counter")!;
const autofeederButtonsDiv = document.getElementById("autofeederButtons")!;
const rateElement = document.getElementById("chzitRate")!;
const descriptionElement = document.getElementById("afDescription")!;

let cheezitCount = 0;

// create availableItems using config
const availableItems: Item[] = [];
for (const c of config) {
  const button = document.createElement("button");
  autofeederButtonsDiv.appendChild(button);

  const af: Item = {
    name: c.name,
    cost: c.cost,
    rate: c.rate,
    description: c.description,
    count: 0,
    buttonElem: button,
  };
  availableItems.push(af);

  button.innerText = ItemString(af);
}

// set up autofeeder button behavior
for (const af of availableItems) {
  af.buttonElem.addEventListener("click", () => {
    if (cheezitCount >= af.cost) {
      cheezitCount -= af.cost;
      af.count++;
      af.cost *= 1.15;
      af.buttonElem.innerText = ItemString(af);
    }
  });
  af.buttonElem.addEventListener("mouseover", () => {
    descriptionElement.innerText = af.description;
  });
  af.buttonElem.addEventListener("mouseout", () => {
    descriptionElement.innerText = "";
  });
}

// set up main button
tongueButton.addEventListener("click", () => {
  increaseCheezitCount(1);
});

// calculate rate from current upgrade counts
function getAutofeederRate() {
  let autofeederRate = 0;
  for (const af of availableItems) {
    autofeederRate += af.count * af.rate;
  }
  rateElement.innerText = autofeederRate.toFixed(2);
  return autofeederRate;
}

// increase variable and also update screen
function increaseCheezitCount(count: number) {
  cheezitCount += count;
  counterElement.innerText = cheezitCount.toFixed(2);
}

// applies autofeederRate to the cheezit count
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
