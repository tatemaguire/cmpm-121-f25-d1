import "./style.css";

document.body.innerHTML = `
  <header style="font-size:100px">Cheez-it Eating Simulator</header>
  <button id="tongue-button">😛</button>
  <div>You ate <span id="counter">0</span> cheez-its</div>
`;

const buttonElement: HTMLElement = document.getElementById("tongue-button")!;
const counterElement: HTMLElement = document.getElementById("counter")!;
let cheezitCount = 0;

buttonElement.addEventListener("click", () => {
  cheezitCount++;
  counterElement.innerText = cheezitCount.toString();
});

setInterval(() => {
  cheezitCount++;
  counterElement.innerText = cheezitCount.toString();
}, 1000);
