const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let input;

  function init(companies) {
    console.log(companies);
    input = companies.querySelector("input");
    const form = companies.querySelector("form");
    form.addEventListener('submit', formHandler);
  }

  function fetchCompanies(company) {
    loadingGIF();
    fetch(`${API_URL}${company}`)
      .then((result) => {
        if (!result.ok) {
          throw new error('Non 200 status');
        }
        return result.json();
      })
      .then((data) => showCompanies(data.results))
      .catch(() => showErrorMessage('Villa við að sækja gögn'));
  }

  function formHandler(e) {
    e.preventDefault();
    const value = input.value;
    input.value = '';
    if (!value) {
      showErrorMessage('Lén verður að vera strengur');
      console.log('value error');
    }
    else {
      fetchCompanies(value);
    }
  }

  function showErrorMessage(msg) {
    clear('.results');
    let txt = document.createTextNode(msg);
    document.querySelector('.results').appendChild(txt);
  }
  function el(type, text) {
    const el = document.createElement(type);
    if (text) {
      const txt = document.createTextNode(text);
      el.appendChild(txt);
    }
    return el;
  };

  function clear(selector){
    let toClear = document.querySelector(selector);
    toClear.innerHTML = '';
  }

  function showCompanies(results) {
    clear('.results');
    if (results.length === 0) {
      console.log('no results');
    }
    else {
      let i;
      for (i of results) {
        companyNode(i);
      }
    }
  }

  function companyNode(arrayItem) {

    let results = document.querySelector(".results");
    let div = el('div');
    div.classList.add('company');
    let dl = el('dl');
    let nameDt = el('dt', 'Nafn');
    dl.appendChild(nameDt);
    let companyName = el('dd', arrayItem.name);
    dl.appendChild(companyName);
    let snDt = el('dt', 'Kennitala');
    dl.appendChild(snDt);
    let companySn = el('dd', arrayItem.sn);
    dl.appendChild(companySn);

    if (arrayItem.active == 1) {
      div.classList.add('company--active');
      let addressDt = el('dt', 'Heimilisfang');
      dl.appendChild(addressDt);
      let companyAddress = el('dd', arrayItem.address);
      dl.appendChild(companyAddress);
    } else div.classList.add('company--inactive');

    div.appendChild(dl);
    results.appendChild(div);
  };

   function loadingGIF() {
     clear('.results');
     let loading = el('div');
     loading.classList.add('loading');
     let loadingGif = el('img');
     loadingGif.setAttribute('src', './loading.gif');
     let loadingText = el('p', 'Leita að fyrirtækjum...');
     document.querySelector('.results').appendChild(loading);
     loading.appendChild(loadingGif);
     loading.appendChild(loadingText);

   }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector("main");
  program.init(companies);
});
