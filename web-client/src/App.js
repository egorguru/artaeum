import React from 'react'

import AppRoutes from './AppRoutes'
import Header from './shared/layout/header/Header'
import Footer from './shared/layout/footer/Footer'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    )
  }
}

export default App
