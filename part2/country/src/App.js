import axios from 'axios';
import { useEffect, useState } from 'react';

import CountryInfo from './components/CountryInfo/CountryInfo';
import CountryItem from './components/CountryItem/CountryItem';

function App() {
  const [name, setName] = useState('');
  const [countryNameView, setCountryNameView] = useState([]);
  const [countries, setCountries] = useState([]);
  let renderedResult = null;
  const onChangeNameHandler = (event) => {
    setName(event.target.value);
  };

  const showView = (name) => {
    if (countryNameView.includes(name)) {
      setCountryNameView(countryNameView.filter((country) => country !== name));
    } else {
      setCountryNameView(countryNameView.concat(name));
    }
  };
  useEffect(() => {
    const fetchCountries = async () => {
      const result = await axios.get('https://restcountries.eu/rest/v2/all');
      setCountries(result.data);
    };
    fetchCountries();
  }, []);

  let searchCountries = name
    ? countries.filter((country) => country.name.toLowerCase().includes(name.toLowerCase()))
    : [];

  if (searchCountries.length <= 10 && searchCountries.length > 1) {
    renderedResult = searchCountries.map((country) => (
      <CountryItem
        key={country.numericCode}
        country={country}
        onShowView={showView}
        countryNameView={countryNameView}
      />
    ));
  } else if (searchCountries.length > 10) {
    renderedResult = <p>Too many matches, specify another filter</p>;
  } else if (searchCountries.length === 1) {
    renderedResult = <CountryInfo country={searchCountries[0]} />;
  }
  console.log(process.env);
  return (
    <div style={{ padding: '12px' }}>
      <label style={{ marginRight: '8px' }} htmlFor="">
        Find Countries
      </label>
      <input type="text" value={name} onChange={onChangeNameHandler} />
      <div>{renderedResult}</div>
    </div>
  );
}

export default App;
