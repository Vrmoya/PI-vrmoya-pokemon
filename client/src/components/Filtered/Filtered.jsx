
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypes } from '../../redux/actions';

const Filtered = ({ handleFilter, handleSort }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  return (
    <div>
      <button onClick={() => handleFilter('fire')}>Fuego</button>
      {/* Agrega más botones para otros tipos */}
      <select onChange={(e) => handleSort(e.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
};

export default Filtered;
