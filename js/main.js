// Cookies
function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax"
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length)
      }
  }
  return ""
}

function eraseCookie(e) {
  document.cookie = e + "=; Max-Age=-99999999;";
}

// Page Loader
document.addEventListener(
  "DOMContentLoaded",
  function e() {
      let t = document.getElementById("progress"),
          n = document.images,
          o = 0,
          r = n.length;
      if (0 == r) return l();

      function i() {
          let e = (((100 / r) * (o += 1)) << 0) + "%";
          if (((t.style.width = e), o === r)) return l();
      }

      function l() {
          setTimeout(function() {
              (t.style.opacity = "none"), (t.style.opacity = 0);
          }, 1800);
      }
      for (let s = 0; s < r; s += 1) {
          let $ = new Image();
          ($.onload = i), ($.onerror = i), ($.src = n[s].src);
      }
  },
  !1
);

// Find the most downloaded config and assign icon with text to the tab
let highestNumber = 0;
document.querySelectorAll('.dwn__count').forEach(elem => {
  let downCount = parseInt(elem.innerText.trim())
  if (downCount > highestNumber)
      highestNumber = downCount
});

let icon = document.createElement("em");
const popular = document.createElement('div');
popular.textContent = 'Popular!';
popular.style = "position: absolute; font-size: 13px; text-align: center; color: var(--buttonhover); font-weight: 600;";
icon.className = "bx bxs-hot tooltip";
icon.style = "color: var(--buttonhover);";

document.querySelectorAll('.dwn__count').forEach(elem => {
  if (parseInt(elem.innerText.trim()) == highestNumber) {
      elem.appendChild(popular.cloneNode(true));
      elem.appendChild(icon.cloneNode(true));
  }
});

// Theme Functionality
if (getCookie("themebtn") == 'pressed') {
  setCookie("themebtn", "pressed", 365)
  localStorage.setItem('data-theme', 'nvv');
  document.body.setAttribute('data-theme', 'nvv')
} else {
  setCookie("themebtn", "notpressed", 365)
  localStorage.setItem('data-theme', 'fware');
  document.body.setAttribute('data-theme', 'fware')
}

function switchtheme() {
  if (getCookie("themebtn") == 'notpressed') {
      document.body.setAttribute('data-theme', 'nvv');
      localStorage.setItem('data-theme', 'nvv');
      setCookie("themebtn", "pressed", 365)
  } else {
      document.body.setAttribute('data-theme', 'fware');
      localStorage.setItem('data-theme', 'fware');
      setCookie("themebtn", "notpressed", 365)
  }
}

// Init every picuture for preview
function initpicture() {
  let e = document.querySelectorAll(".cfgvrow img"),
      c = document.querySelector("#preview"),
      r = {
          "background-size": "60%"
      };
  e.forEach((e) => {
      e.addEventListener("click", function() {
          (c.style.backgroundImage = "url(" + e.src + ")"), (c.style.display = "block"), Object.assign(c.style, r);
      });
  });
}

// Search Functionality
function search() {
  let input = document.getElementById('searchbar').value
  input = input.toLowerCase();
  let cfgw = document.getElementsByClassName('cfg__wrapper');

  for (i = 0; i < cfgw.length; i++) {
      if (!cfgw[i].innerHTML.toLowerCase().includes(input)) {
          cfgw[i].style.display = "none";
      } else {
          cfgw[i].style.display = "block";
      }
  }
}

// Notification System
$(function() {
  let e = document.getElementById("nf__popup");
  "success" == getCookie("submit") ?
      ((e.style.color = "let(--buttonsubmitbg)"), (e.innerHTML = "Visual config submitted!"), (e.className = "show")) :
      "fail" == getCookie("submit") && ((e.style.color = "var(--warn)"), (e.innerHTML = "Something went wrong :("), (e.className = "show")),
      eraseCookie("submit"),
      setTimeout(function() {
          e.className = e.className.replace("show", "");
      }, 3e3);
});

// Trigger for upload button
$("#uploadTrigger").click(function() {
  $("#uploadFile").click()
});

// Shuffling Visual Configs randomly
var t = document.getElementById("nf__popup");

function switchrandomizing() {
  if (getCookie("EnableShuffle") == "true") {
      setCookie("EnableShuffle", "false", 365);
      localStorage.setItem('enableshuffle', 'false');

      t.style.color = "var(--warn)";
      t.innerHTML = "Visual config shuffle disabled";
      t.className = "show";
      setTimeout(function() {
          t.className = t.className.replace("show", "");
      }, 3000);
  } else {
      setCookie("EnableShuffle", "true", 365);
      localStorage.setItem('enableshuffle', 'true');

      t.style.color = "var(--buttonsubmitbg)";
      t.innerHTML = "Visual config shuffle enabled!";
      t.className = "show";
      setTimeout(function() {
          t.className = t.className.replace("show", "");
      }, 3000);
  }
}

$(function() {
  if (getCookie("EnableShuffle") == "true" && localStorage.getItem('enableshuffle') == 'true') {
      let parent = $("#randomize");
      let divs = parent.children();
      divs.sort(function(a, b) {
          return 0.5 - Math.random();
      });
      parent.append(divs);

      t.style.color = "var(--buttonsubmitbg)";
      t.innerHTML = "Shuffling visual configs...";
      t.className = "show";
      setTimeout(function() {
          t.className = t.className.replace("show", "");
      }, 3000);
  } else {
      localStorage.setItem('enableshuffle', 'false');
      setCookie("EnableShuffle", "false", 365)
  }
});

// Sort visual configs by name
function sortbyname() {
  let parent = $("#randomize");
  let divs = parent.children();

  var OrderedDivsByName = divs.sort(function(a, b) {
      return $(a).find(".cfg__title").text() > $(b).find(".cfg__title").text();
  });

  parent.append(OrderedDivsByName);
}

// Sort visual configs by highest downloads
function sortbymostdwnl() {
  let parent = $("#randomize");
  let divs = parent.children();

  var OrderedDivsByDwnl = divs.sort(function(a, b) {
      // Fetch raw values
      const aRaw = fetchTextNodesContent($(a).find(".dwn__count"));
      const bRaw = fetchTextNodesContent($(b).find(".dwn__count"));

      // DEBUG: Show raw parsed values
      //console.log('raw values:', `a: "${aRaw}"`, `b: "${bRaw}"`);
      const aParsed = parseInt(aRaw);
      const bParsed = parseInt(bRaw);

      // DEBUG: Show parsed values
      //console.log('parsed values:', `a: "${aParsed}"`, `b: "${bParsed}"`);

      //Compare the values
      return bParsed - aParsed;
  })
  parent.append(OrderedDivsByDwnl);
}

function fetchTextNodesContent($target) {
  return $target
      .clone() // Clone the element
      .children() // Select all the children
      .remove() // Remove all the children
      .end() // Go back to selected element
      .text();
}


$('#c1-13').change(function() {
  $('#identityverf__wrapper').toggle();
});

document.getElementById('uploadFile').addEventListener('change', (event) => {
  window.selectedFile = event.target.files[0];
  document.getElementById('file_name').innerHTML = window.selectedFile.name;
});