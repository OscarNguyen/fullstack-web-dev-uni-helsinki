import React from 'react';
import CountryInfo from '../CountryInfo/CountryInfo';

const CountryItem = ({ country, onShowView, countryNameView }) => {
  return (
    <div>
      <p>
        {country.name}{' '}
        <button onClick={() => onShowView(country.name)}>
          {countryNameView.includes(country.name) ? 'Hide' : 'Show'}
        </button>
      </p>
      {countryNameView.includes(country.name) ? <CountryInfo country={country} /> : ''}
    </div>
  );
};

export default CountryItem;
