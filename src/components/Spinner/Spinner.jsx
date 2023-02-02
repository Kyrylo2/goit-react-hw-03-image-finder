// import { ThreeDots } from 'react-loader-spinner';
import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

const override = {
  display: 'block',
  margin: '50px auto 0px auto',
  height: '100vh',
  borderColor: 'red',
};

const Spinner = ({ isActive, request }) => {
  return (
    <PropagateLoader
      cssOverride={override}
      color="#d73636"
      // loading={isActive}
    />
  );
};

export default Spinner;
