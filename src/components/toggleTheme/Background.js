import React from 'react';

const Background = ({ children }) => {
  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      {children}
    </div>
  )
}

export default Background;