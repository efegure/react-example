import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1 style={{ fontSize: '3em' }}>Welcome!</h1>
      <p style={{ fontSize: '1.2em' }}>
        Please navigate from sidebar menu to product or user pages.
      </p>
    </div>
  )
}

export default HomePage
