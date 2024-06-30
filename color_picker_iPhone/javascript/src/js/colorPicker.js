window.addEventListener("load", imgLoaded);
let timerId;
let timerId2;
const sliderContainer = document.querySelector("#slider");
const aTag = document.querySelectorAll("#color li a");
const nomeColore = document.querySelectorAll("#color li h3");
const ulTag = document.querySelector("#color");
const imageColorPicker = document.getElementById("mirror");
const iPhoneH1 = document.getElementById("i-phone");
const imgSmartphone = document.querySelector("#mirror img");

const togImgBut = document.getElementById("tog-img");
const togColBut = document.getElementById("tog-col");

for (let i = 0; i < aTag.length; i++) {
  aTag[i].classList.add("colore-" + i);
  nomeColore[i].innerHTML =
    "Colore<br>" + getComputedStyle(aTag[i]).backgroundColor;
}

ulTag.addEventListener("mouseover", function (e) {
  //console.log("Evento Innescato");
  if (e.target.tagName.toLowerCase() === "a") {
    imageColorPicker.className = e.target.className;
    iPhoneH1.className = e.target.className;
  }
});

function gestisciClick() {
  clearInterval(timerId);
  slider();
  timerId = setInterval(slider, 6000);
}

function riattaccaListener() {
  sliderContainer.addEventListener("click", gestisciClick);
}

function imgLoaded() {
  sliderContainer.addEventListener("click", gestisciClick);
  timerId = setInterval(slider, 6000);

  let imgSelected = document.querySelector(".visible");
  imgSmartphone.setAttribute("src", imgSelected.getAttribute("src"));

  togImgBut.addEventListener("click", function (e) {
    togImgBut.classList.toggle("cliccato");
    togColBut.classList.toggle("nascosto");

    if (togImgBut.innerHTML === "Aggiungi una foto") {
      togImgBut.innerHTML = "Rimuovi la foto";
    } else {
      togImgBut.innerHTML = "Aggiungi una foto";
      togColBut.classList.remove("cliccato");
    }

    imgSmartphone.classList.toggle("set-img");
  });

  togColBut.addEventListener("click", function (e) {
    if (!togColBut.classList.contains("nascosto")) {
      imgSmartphone.classList.toggle("toggle-colori");
      togColBut.classList.toggle("cliccato");

      if (togColBut.innerHTML === "Mixa le foto con i colori") {
        togColBut.innerHTML = "Ripristina il colore originale";
      } else {
        togColBut.innerHTML = "Mixa le foto con i colori";
      }
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(timerId);
    } else {
      timerId = setInterval(slider, 6000);
    }
  });
}

function slider() {
  sliderContainer.removeEventListener("click", gestisciClick);

  clearTimeout(timerId2);

  timerId2 = setTimeout(riattaccaListener, 2000);
  /* document.querySelector(".visible").style.left = "-100%";
  document.querySelector(".next").style.left = "0"; */
  //   1)Togliere la classe visible all'elemento con la classe visible
  //   2)Togliere la classe next all'elemento con la classe next e dargli la classe visible
  //   3)All'elemento successivo (fratello destro) dell'elemento che ha la classe visible gli do la classe next

  //1)
  let imgVisible = document.querySelector(".visible");
  imgVisible.classList.remove("visible");

  //2)
  let imgNext = document.querySelector(".next");
  imgNext.classList.replace("next", "visible");

  //3)
  let imgNextVisible = document.querySelector(".visible + img");

  let imgSelected = document.querySelector(".visible");
  imgSmartphone.setAttribute("src", imgSelected.getAttribute("src"));

  if (imgNextVisible !== null) {
    imgNextVisible.classList.add("next");
  } else {
    let firstImg = document.querySelector("#slider img:first-of-type");
    firstImg.classList.add("next");
  }
}
