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

  function fetchCompanies(company){
    fetch(`${API_URL}${company}`)
      .then((result) =>{
        if(!result.ok){
          throw new error('Villa við að sækja gögn');
        }
        return result.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  function formHandler(e) {
    e.preventDefault();
    const value = input.value;
    input.value = "";
    if(!value || !value.trim()){
    console.log('value error');
    }
    else{
      fetchCompanies(value);
    }
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector("main");
  program.init(companies);
});
