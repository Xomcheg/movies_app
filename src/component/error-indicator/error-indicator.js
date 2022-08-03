import React from "react";
import { Alert } from 'antd';
import './error-indicator.css';

const ErrorIndicator = () => {
    return (
      <div className="alert__wrapper">
      <Alert
      message="Error"
      description="Error: Data not received from server"
      type="error"
      showIcon
      />
    </div>

    )
};

export default ErrorIndicator;