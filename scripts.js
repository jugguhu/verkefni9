const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let input;

  function clear(selector) {
    const toClear = document.querySelector(selector);
    toClear.innerHTML = '';
  }

  function showErrorMessage(msg) {
    clear('.results');
    const txt = document.createTextNode(msg);
    document.querySelector('.results').appendChild(txt);
  }

  function el(type, text) {
    const element = document.createElement(type);
    if (text) {
      const txt = document.createTextNode(text);
      element.appendChild(txt);
    }
    return element;
  }

  function companyNode(arrayItem) {
    const results = document.querySelector('.results');
    const div = el('div');
    div.classList.add('company');
    const dl = el('dl');
    const nameDt = el('dt', 'Nafn');
    dl.appendChild(nameDt);
    const companyName = el('dd', arrayItem.name);
    dl.appendChild(companyName);
    const snDt = el('dt', 'Kennitala');
    dl.appendChild(snDt);
    const companySn = el('dd', arrayItem.sn);
    dl.appendChild(companySn);

    if (arrayItem.active === 1) {
      div.classList.add('company--active');
      const addressDt = el('dt', 'Heimilisfang');
      dl.appendChild(addressDt);
      const companyAddress = el('dd', arrayItem.address);
      dl.appendChild(companyAddress);
    } else div.classList.add('company--inactive');

    div.appendChild(dl);
    results.appendChild(div);
  }


  function showCompanies(results) {
    clear('.results');
    if (results.length === 0) {
      showErrorMessage('Ekkert fyrirtæki fannst fyrir leitarstreng');
    } else {
      let i;
      for (i of results) {  //eslint-disable-line
        companyNode(i);
      }
    }
  }

  function loadingGIF() {
    clear('.results');
    const loading = el('div');
    loading.classList.add('loading');
    const loadingGif = el('img');
    loadingGif.setAttribute('src', './loading.gif');
    const loadingText = el('p', 'Leita að fyrirtækjum...');
    document.querySelector('.results').appendChild(loading);
    loading.appendChild(loadingGif);
    loading.appendChild(loadingText);
  }

  function fetchCompanies(company) {
    loadingGIF();
    fetch(`${API_URL}${company}`)
      .then((result) => {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }
        return result.json();
      })
      .then((data) => showCompanies(data.results))
      .catch(() => showErrorMessage('Villa við að sækja gögn'));
  }

  function formHandler(e) {
    e.preventDefault();
    if (!input.value) {
      showErrorMessage('Lén verður að vera strengur');
    } else {
      fetchCompanies(input.value);
    }
  }

  function init(companies) {
    input = companies.querySelector('input');
    const form = companies.querySelector('form');
    form.addEventListener('submit', formHandler);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector('main');
  program.init(companies);
});
