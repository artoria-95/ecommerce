import React from 'react';

const values = [
  'ON_CART',
  'CREATED',
  'COMPLETED',
  'CANCELLED'
];

const Select = (props) => {
  return (
    <div className='container'>
      <select onChange={(e) => props.handleChange(e, props.id, props.status, props.i)}>
        {
          values.map((val, i) => {
            if (props.status === val) {
              return (
                <option
                  class='option'
                  value={`${val}`}
                  key={i}
                  disabled
                  selected
                >
                  {val}
                </option>
              );
            } else {
              return (
                <option
                  class='option'
                  value={`${val}`}
                  key={i}
                >

                  {val}
                </option>
              );
            }
          })
        }
      </select>
    </div>
  )
}

export default Select;
