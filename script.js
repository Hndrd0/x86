/*
  Uses libv86.js as an external dependency without modifying its source.
  Attribution: emulator runtime powered by the v86 project (see project LICENSE).
*/

let emulator;

const screen = document.getElementById("screen");
const osSelect = document.getElementById("os-select");
const startButton = document.getElementById("start-btn");
const status = document.getElementById("status");

function setStatus(message) {
  status.textContent = message;
}

startButton.addEventListener("click", () => {
  if (typeof V86 !== "function") {
    setStatus("Emulator runtime not found. Make sure libv86.js is available.");
    return;
  }

  setStatus("Starting emulator...");
  screen.innerHTML = "";

  emulator = new V86({
    screen_container: screen,
    bios: { url: "bios/seabios.bin" },
    vga_bios: { url: "bios/vgabios.bin" },
    cdrom: { url: osSelect.value },
    autostart: true,
  });

  setStatus("Emulator started.");
});
