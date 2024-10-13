import { useNavigate } from "react-router-dom";

function CountryCard({ country }) {
  const navigate = useNavigate();
  const { name, capital, flags, population, region } = country;

  return (
    <div
      className="w-full h-full flex flex-col shadow-lg cursor-pointer dark:bg-gray-600"
      onClick={() => navigate(`/country/${name?.common}`)}
    >
      <img src={flags?.png} className="w-full h-1/2" />
      <div className="p-4 flex gap-2 flex-col">
        <h2 className="font-bold text-base">{name?.common}</h2>
        <div>
          <div>
            <span className="text-slate-800 mr-1 font-medium  dark:bg-gray-600 dark:text-white ">
              Population:
            </span>
            <span className="text-gray-500  dark:bg-gray-600 dark:text-white">
              {population}
            </span>
          </div>
          <div>
            <span className="text-slate-800 mr-1 font-medium  dark:bg-gray-600 dark:text-white">
              Region:
            </span>
            <span className="text-gray-500  dark:bg-gray-600 dark:text-white">
              {region}
            </span>
          </div>
          <div>
            <span className="text-slate-800 mr-1 font-medium  dark:bg-gray-600 dark:text-white">
              Capital:
            </span>
            <span className="text-gray-500  dark:bg-gray-600 dark:text-white">
              {capital}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;
