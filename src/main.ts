import "./style.css";

document.body.innerHTML = `
  <header style="font-size:100px">Cheez-it Eating Simulator</header>
  <button id="tongue-button">😛</button>
  <div>You ate <span id="counter">0</span> cheez-its</div>
`;

const buttonElement: HTMLElement = document.getElementById("tongue-button")!;
const counterElement: HTMLElement = document.getElementById("counter")!;
let cheezitCount = 0;
// deno-lint-ignore prefer-const
let autofeederRate = 1; // in chzits per second

buttonElement.addEventListener("click", () => {
  increaseCheezitCount(1);
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
