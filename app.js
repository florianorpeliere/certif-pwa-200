(function(){
  'use strict';

  let scientists;
  const divScientists = document.getElementById('scientists');

  fetch('./scientists.json')
    .then(response => response.json())
    .then(values => {
      scientists = values;
      displayScientists(scientists);
    });

  function displayScientists(scientists) {
    let injectedDom = '';
    for(let scientist of scientists){
      injectedDom += createScientistDOM(scientist);
    }
    divScientists.innerHTML = injectedDom;
    addClickEvent(divScientists);
  }

  function addClickEvent($scientists) {
    const main = document.querySelector('main');
    const clickFn = (event) => {
      console.log(event);
      const scientistCard = event.target.parentNode.parentNode;
      const iframe = scientistCard.querySelector('iframe');
      scientistCard.classList.toggle('fullcard');
      if(!iframe.src) {
        iframe.src = iframe.dataset.src;
      }
      setTimeout(() => {
        iframe.classList.toggle('display');
      }, 1000);
      main.scrollTop = 0;
    };

    $scientists.querySelectorAll('.scientist-button-info')
      .forEach((element) => {
        element.addEventListener('click', clickFn);
      });
  }

  function createScientistDOM(scientist) {
    return `<div class="scientist-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--8-col mdl-cell--4-col-tablet mdl-cell--3-col-desktop">
      <div class="scientist-image mdl-card__title mdl-card--expand" style="background-image: url('${scientist.imageUrl}');">
      </div>
      <div class="scientist-information mdl-card__supporting-text">
        <div class="scientist-first-information">
          <h2 class="mdl-card__title-text">${scientist.name}</h2>
          <h5>${scientist.century}th century</h5>
          <h5>In ${scientist.domain} domain</h5>
        </div>
        <div class="scientist-more-information">
          <p class="scientist-bestInnovation">Best Innovation : <strong>${scientist.bestInnovation}</strong></p>
          <iframe data-src="${scientist.wikiPage}" height="500px"></iframe>
        </div>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect scientist-button-info">
          More information
        </a>
      </div>
    </div>`;
  }

})();
