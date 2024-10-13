import { useCallback, useMemo, useState } from "react";
import CountryCard from "./CountryCard";
import UseFetchData from "./UseFetchData";

function AllCountries() {
  const [url, setUrl] = useState("https://restcountries.com/v3.1/all");
  const { isLoading, apiData, serverError } = UseFetchData(url);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const filteredCountries = useMemo(() => {
    if (!apiData) return [];
    return apiData.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [apiData, searchQuery]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleFilter = useCallback((e) => {
    const { value: region } = e.target;
    setSelectedRegion(region);
    const newUrl =
      region === "all"
        ? "https://restcountries.com/v3.1/all"
        : `https://restcountries.com/v3.1/region/${region}`;
    setUrl(newUrl);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        data fetching
      </div>
    );
  }

  if (serverError) {
    return (
      <div className="h-full w-screen">
        Error in fetching data:{serverError}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full sm:px-20 sm:py-10 px-5 py-3 dark:text-white ">
      <div className="mb-10 sticky top-30 flex justify-between gap-4 flex-col sm:flex-row ">
        <input
          type="text"
          placeholder="Search for country..."
          className="border p-3  dark:bg-gray-600 dark:border-gray-600 dark:text-white "
          onChange={handleSearch}
        />
        <select
          name="regions"
          id="region"
          value={selectedRegion}
          className="border p-3 w-48 rounded-none  dark:bg-gray-600 dark:border-gray-600 dark:text-white "
          onChange={handleFilter}
        >
          <option value="all">All</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="h-full  grid sm:grid-cols-4 gap-10 ">
        {filteredCountries &&
          filteredCountries.map((country) => {
            return <CountryCard key={country.name.common} country={country} />;
          })}
      </div>
    </div>
  );
}

export default AllCountries;
