import React from 'react';

export const myInput = props => {
  return (
    <input {...props.input} type={props.type} placeholder={props.placeholder} />
  );
};

// export const myInput = ({ input, label, type, meta: { touched, error, warning } }) => (
//   <div>
//     <label>{label}</label>
//     <div>
//       <input {...input} placeholder={label} type={type}/>
//       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// )

export default myInput;