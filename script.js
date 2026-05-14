/*
  Uses libv86.js as an external dependency without modifying its source.
  Attribution: emulator runtime powered by the v86 project (see project LICENSE).
*/

let emulator;
const BIOS_URL = "bios/seabios.bin";
const VGA_BIOS_URL = "bios/vgabios.bin";

const screen = document.getElementById("screen");
const osSelect = document.getElementById("os-select");
const startButton = document.getElementById("start-btn");
const status = document.getElementById("status");

function setStatus(message) {
  status.textContent = message;
}

startButton.addEventListener("click", () => {
  if (emulator) {
    setStatus("Emulator is already running.");
    return;
  }

  if (typeof V86 !== "function") {
    setStatus("Unable to load emulator. Please refresh and try again.");
    return;
  }

  setStatus("Starting emulator...");
  screen.innerHTML = "";

  emulator = new V86({
    screen_container: screen,
    bios: { url: BIOS_URL },
    vga_bios: { url: VGA_BIOS_URL },
    cdrom: { url: osSelect.value },
    autostart: true,
  });

  startButton.disabled = true;
  setStatus("Emulator started.");
});
