import { useParams, useNavigate } from "react-router-dom";
import UseFetchData from "./UseFetchData";
import { useEffect, useState } from "react";

function CountryDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [borderCountries, setBorderCountries] = useState([]);

  const { isLoading, apiData, serverError } = UseFetchData(
    `https://restcountries.com/v3.1/name/${name}`
  );

  useEffect(() => {
    if (apiData && apiData[0]?.borders) {
      const borderCodes = apiData[0].borders.join(",");
      fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`)
        .then((response) => response.json())
        .then((data) => {
          const borderNames = data.map((country) => country.name.common);
          setBorderCountries(borderNames);
        })
        .catch((error) =>
          console.error("Error fetching border countries:", error)
        );
    }
  }, [apiData]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        loading...
      </div>
    );
  }

  if (serverError) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        error in loading...
      </div>
    );
  }

  if (!apiData || apiData.length === 0) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        No data available
      </div>
    );
  }

  const {
    flags,
    name: countryName,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
  } = apiData[0];

  return (
    <div className="flex flex-col w-full sm:px-20 sm:py-10 px-3 py-3 dark:bg-gray-700 dark:text-white ">
      <button
        className="self-start mb-6 border p-3 w-20  dark:bg-gray-600 dark:text-white dark:border-gray-600"
        onClick={() => navigate(-1)}
      >
        back
      </button>
      <div className="flex border sm:flex-row flex-col  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
        <div className="sm:h-96">
          <img src={flags?.png} className="h-full" />
        </div>
        <div className="sm:px-16 sm:py-10 px-2 py-4 flex gap-3 flex-col">
          <h1 className="text-2xl font-bold">{countryName?.common}</h1>
          <div className="flex sm:gap-40  gap-4 flex-col sm:flex-row">
            <div>
              <div>
                <span className="text-slate-800 m-1 font-medium  dark:bg-gray-600 dark:text-white">
                  Population:
                </span>
                <span className="text-gray-500  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  {population}
                </span>
              </div>
              <div>
                <span className="text-slate-800 mr-1 font-medium  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  Region:
                </span>
                <span className="text-gray-500  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  {region}
                </span>
              </div>
              <div>
                <span className="text-slate-800 mr-1 font-medium  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  Sub Region:
                </span>
                <span className="text-gray-500  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  {subregion}
                </span>
              </div>
              <div>
                <span className="text-slate-800 mr-1 font-medium  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  Capital:
                </span>
                <span className="text-gray-500  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  {capital?.join(",")}
                </span>
              </div>
            </div>
            <div>
              <div>
                <span className="text-slate-800 mr-1 font-medium  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  Top level Domain:
                </span>
                <span className="text-gray-500  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  {tld?.join(",")}
                </span>
              </div>
              <div>
                <span className="text-slate-800 mr-1 font-medium  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  Currencies:
                </span>

                <span className="text-gray-500  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  {Object.values(currencies || {}).map(
                    (currency) => currency.name
                  )}
                </span>
              </div>
              <div>
                <span className="text-slate-800 mr-1 font-medium  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  languages:
                </span>

                <span className="text-gray-500  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
                  {Object.values(languages || {}).join(",")}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex sm:items-center sm:flex-row flex-col">
            <h2 className="text-slate-800 mr-1 font-medium  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
              Border Countries:
            </h2>
            <div className="text-gray-500 flex flex-wrap  dark:bg-gray-600 dark:text-white  dark:border-gray-600">
              {borderCountries.map((border, i) => {
                return (
                  <button
                    key={i}
                    className="m-2 border px-3"
                    onClick={() => navigate(`/country/${border}`)}
                  >
                    {border}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
