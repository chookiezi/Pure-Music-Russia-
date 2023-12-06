'use strict'

function toggleMenu() {
    let menu__phone = document.querySelector('.mobile-menu')
    menu__phone.classList.add('mobile-menu-open')
  }
  function offtoggleMenu() {
    let menu__phone = document.querySelector('.mobile-menu');
    menu__phone.classList.remove('mobile-menu-open');
  }

let verifiedDataArray = JSON.parse(localStorage.getItem('verifiedDataArray')) || {};
let genreAtferVerif = {};

for (let key in verifiedDataArray) {
  if (verifiedDataArray.hasOwnProperty(key)) {
    let Data = verifiedDataArray[key];

    genreAtferVerif[key] = {
      image1: Data.image1,
      select1: Data.select1
    };
  }
}

localStorage.setItem('genreAfterVerif', JSON.stringify(genreAtferVerif));

document.addEventListener("DOMContentLoaded", function () {
  let genreAfterVerif = JSON.parse(localStorage.getItem("genreAfterVerif")) || {};

  if (Object.keys(genreAfterVerif).length > 0) {
      let playlistBlocks = document.querySelectorAll(".playlist-block");
      playlistBlocks.forEach(function (block) {
          let playlistTitle = block.querySelector(".playlist-block-title").textContent.trim();
          let dataArray = Object.values(genreAfterVerif);
          let matchingData = dataArray.filter(function (item) {
              return item.select1 === playlistTitle;
          });

          if (matchingData.length > 0) {
              let fragment = document.createDocumentFragment();

              matchingData.forEach(function (item) {
                  let imgElement = document.createElement("img");
                  imgElement.src = item.image1;
                  fragment.appendChild(imgElement);
              });

              block.querySelector(".playlist-block-grid").appendChild(fragment);
          }
      });
  }
});



