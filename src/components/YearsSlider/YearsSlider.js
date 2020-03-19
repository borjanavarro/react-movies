import React, { useEffect, useState, useCallback } from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import RangeSlider from '../RangeSlider';

const today = new Date();
const defaultValues = [today.getFullYear() - 100, today.getFullYear()]

function YearsSlider({reset, setReset, setFocused}) {
  const [minYear, setMinYear] = useState(defaultValues[0]);
  const [maxYear, setMaxYear] = useState(defaultValues[1]);
  const params = new URLSearchParams(useLocation().search);
  const yearsSearch = params.get('years');
  const history = useHistory();

  const init = useCallback ( () => {
    let years = yearsSearch.split('-');
    years = years.map( year => parseInt(year) );
    setMinYear(years[0]);
    setMaxYear(years[1]);
  }, [yearsSearch])

  const clear = useCallback( () => {
    setMinYear(defaultValues[0]);
    setMaxYear(defaultValues[1]);
  }, [])

  const handleChange = (values) => {
    setMinYear(values[0]);
    setMaxYear(values[1]);
    setFocused('discover');
    setReset(true);
    params.delete('cast');
    params.delete('movie');
    params.delete('page');
    if ( values[0] === defaultValues[0] && values[1] === defaultValues[1] ) {
      history.push('/');
    } else {
      params.set('years', values[0] + '-' + values[1]);
      history.push('/?' + params.toString());
    }
  }

  useEffect( () => {
    if ( reset ) {
      clear();
      setReset(false);
    }
  }, [reset, clear, setReset]);

  useEffect ( () => {
    if ( yearsSearch ) init();
  }, [yearsSearch, init])

  return (
    <div className="years-slider">
      <label htmlFor="years">
        from &nbsp;
        <span className="min-year">{minYear}</span>
        &nbsp; to &nbsp;
        <span className="max-year">{maxYear}</span>
      </label>
      <RangeSlider minYear={minYear} maxYear={maxYear} onChangeCallback={handleChange} />
    </div>
  )
}

export default YearsSlider;