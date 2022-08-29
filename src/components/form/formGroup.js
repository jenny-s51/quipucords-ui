import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup as PfFormGroup } from '@patternfly/react-core';
import _size from 'lodash/size';
import helpers from '../../common/helpers';

const FormGroup = ({ children, error, errorMessage, helpBlock, id, label, ...props }) => {
  const setId = id || helpers.generateId();

  return (
    <PfFormGroup
      id={setId}
      validated={error ? 'error' : null}
      helperText={helpBlock}
      helperTextInvalid={
        (error && typeof errorMessage === 'string' && errorMessage) ||
        (React.isValidElement(errorMessage) && errorMessage) ||
        (errorMessage && 'Error') ||
        ''
      }
      label={label}
      {...props}
    >
      {children}
    </PfFormGroup>
  );
};

const doesntHaveMinimumCharacters = (value, characters = 5) => typeof value === 'string' && value.length < characters;
const isEmpty = value => (typeof value !== 'number' && _size(value) < 1) || false;
const isPortValid = value => /^\d{1,5}$/.test(value) && value <= 65535;

const fieldValidation = {
  doesntHaveMinimumCharacters,
  isEmpty,
  isPortValid
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.bool]),
  helpBlock: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node
};

FormGroup.defaultProps = {
  error: null,
  errorMessage: null,
  helpBlock: null,
  id: null,
  label: null
};

export { FormGroup as default, FormGroup, fieldValidation };
