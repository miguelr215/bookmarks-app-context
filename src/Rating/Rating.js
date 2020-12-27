import React from 'react';
import PropTypes from 'prop-types';
import './Rating.css';

export default function Rating(props) {
  const stars = [0, 0, 0, 0, 0].map((_, i) =>
    (i < props.value)
      ? <span key={i}>&#9733; </span>
      : <span key={i}>&#9734; </span>
  );
  return (
    <div className="rating">
      {stars}
    </div>
  );
}

// Rating.defaultProps = {
//   value: 1
// }

Rating.propTypes = {
  // value: PropTypes.number.isRequired
  // value: PropTypes
  //         .oneOf([1,2,3,4,5])
  //         .isRequired
  value: (props, propName, componentName) => {
    // first get the value of the prop
    const prop = props[propName];

    // this is required, check if prop has a value
    if(!prop){
      return new Error(`${propName} is required in ${componentName}. Validation Failed`);
    }

    // prop has a value, check the type
    if(typeof prop != 'number'){
      return new Error(`Invalid prop, ${propName} is expected to be a number in ${componentName}. ${typeof prop} found.`);
    }

    // props is a number, check if range is correct
    if(prop < 1 || prop > 5){
      return new Error(`Invalid props, ${propName} should be between 1 and 5 in ${componentName}.  ${prop} found.`)
    }
  }
};
