import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { validators } from '../userComponents/form-validators';
import renderField from './renderField';

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text"
        component={renderField} label="Username"
        // validate={[ validators.required ]}
      />
      <Field name="email" type="email"
        component={renderField} label="Email"
        validate={validators.email}
      />
      <Field name="password" type="password"
        component={renderField} label="Password"
        validate={[ validators.required ]}
      />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)