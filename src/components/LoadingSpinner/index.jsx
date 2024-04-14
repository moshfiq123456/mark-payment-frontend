import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'; // Import Sass file for styling
import Mark from "../../assets/png/logo.png"
const LoadingSpinner = ({ spinnerSize = '50px', imageSize = '30px' }) => {
    return (
        <div className="spinner-container">
            {/* Spinner */}
            <div className="spinner" style={{ '--spinner-size': spinnerSize}}></div>
            {/* Image placed in the center of the spinner */}
            <img src={Mark} alt="Center Image" className="center-image" style={{ '--image-size': imageSize }}  />
        </div>
    );
}

LoadingSpinner.propTypes = {
    spinnerSize: PropTypes.string,
    imageSize: PropTypes.string
};

export default LoadingSpinner;