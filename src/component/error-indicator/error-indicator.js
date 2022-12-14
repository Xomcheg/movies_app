import React from 'react'
import { Alert } from 'antd'
import './error-indicator.css'

function ErrorIndicator(props) {
  const { message } = props

  return (
    <div className="alert__wrapper">
      <Alert message="Error" description={message} type="error" showIcon />
    </div>
  )
}

export { ErrorIndicator }
