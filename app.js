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
    const clickFn = (event) => {
      const scientistCard = event.target.parentNode.parentNode;
      scientistCard.classList.toggle('fullcard');
    };

    $scientists.querySelectorAll('.scientist-more-info')
      .forEach((element) => {
        element.addEventListener('click', clickFn);
      });
  }

  function createScientistDOM(scientist) {
    return `<div class="scientist-card mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title mdl-card--expand" style="background: url('${scientist.imageUrl}') center / cover;">
      </div>
      <div class="scientist-information mdl-card__supporting-text">
        <h2 class="mdl-card__title-text">${scientist.name}</h2>
        <h4>${scientist.domain}</h4>
        <p>${scientist.century}</p>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect scientist-more-info">
          More information
        </a>
      </div>
    </div>`;
  }



})();
