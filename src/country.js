// dynamic import
async function  getCountryByAbbr(AbbrName){
   const {countries} = await import('./data/country.js');
   const name = countries[AbbrName];
   return name || 'Not Found';
}
export {getCountryByAbbr}