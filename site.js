// Highlight the current page in the navbar
(function () {
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  // If a photo file isn't uploaded yet, hide that photo spot completely
  document.querySelectorAll(".photo img").forEach(function (img) {
    function hide() { var box = img.closest(".photo"); if (box) box.remove(); }
    img.addEventListener("error", hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });
})();

// Interactive SoC infographic (only runs on pages that have it)
(function () {
  var svg = document.getElementById("soc-svg");
  if (!svg) return;

  var info = {
    core: {
      name: "RISC-V core",
      what: "A small processor that runs the program. It tells the accelerator what to work on and moves data between memory and the array."
    },
    array: {
      name: "4x4 systolic array",
      what: "A grid of 16 multiply-accumulate units. Each one passes data to its neighbor every clock cycle, so the grid does matrix math fast. It's the same idea behind Google's TPU and it's what ML workloads lean on."
    },
    xbar: {
      name: "Memory crossbar",
      what: "A switch that connects the core and the array to memory, so both can read and write without getting in each other's way."
    },
    sram: {
      name: "SRAM (on-chip memory)",
      what: "Fast memory built into the chip. It holds the program and the data the core and array work on."
    },
    spi: {
      name: "SPI (the chip's link to the outside)",
      what: "A simple serial connection. We use it to load programs onto the chip and read results back, which is how we tested the real silicon on the board."
    }
  };

  var panel = document.getElementById("soc-panel");
  var blocks = svg.querySelectorAll(".blk");

  function show(id) {
    blocks.forEach(function (b) {
      var on = b.dataset.id === id;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    var d = info[id];
    panel.innerHTML =
      "<h3>" + d.name + "</h3>" +
      '<p class="label">What it does</p><p>' + d.what + "</p>";
  }

  blocks.forEach(function (b) {
    b.addEventListener("click", function () { show(b.dataset.id); });
    b.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(b.dataset.id); }
    });
  });
})();
