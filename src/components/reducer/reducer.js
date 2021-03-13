import { countries } from "../data/data";

export const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      if (action.payload === "EN") {
        return { ...state, language: action.payload, lang: "en" };
      } else if (action.payload === "РУС") {
        return { ...state, language: action.payload, lang: "ru" };
      } else {
        return { ...state, language: action.payload, lang: "tr" };
      }
    case "CHANGE_SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    case "CLEAR_SEARCH_TEXT":
      return { ...state, searchText: "", countries };
    case "SUBMIT_SEARCH_TEXT":
      const regex = new RegExp(state.searchText, "i");
      const newCountries = countries.filter((country) => {
        if (state.language === "EN") {
          return regex.test(country.countryEN) || regex.test(country.capitalEN);
        } else if (state.language === "РУС") {
          return regex.test(country.countryRU) || regex.test(country.capitalRU);
        } else if (state.language === "TÜR") {
          return regex.test(country.countryTR) || regex.test(country.capitalTR);
        }
        return country;
      });
      return { ...state, countries: newCountries };
    case "SET_COUNTRY_TO_DISPLAY":
      let temporaryCountry = {};
      for (let i = 0; i < countries.length; i++) {
        if (
          countries[i].countryEN === action.payload ||
          countries[i].countryRU === action.payload ||
          countries[i].countryTR === action.payload
        ) {
          temporaryCountry = countries[i];
          break;
        }
      }
      return {
        ...state,
        countryToDisplay: action.payload,
        area: temporaryCountry.area,
        cityTime: temporaryCountry.cityTime,
      };
    default:
      break;
  }
  return state;
};

export const defaultState = {
  language: "EN",
  lang: "en",
  searchText: "",
  countries,
  countryToDisplay: "Switzerland",
  area: "",
  cityTime: "",
};
