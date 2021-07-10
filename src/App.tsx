import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import theme from './theme'
import { Navigation } from './components/common/Navigation'
import { Store } from './components/pages/store/Store'
import { StylesProvider } from '@material-ui/core/styles'
import { CartProvider } from './components/common/CartProvider/CartProvider'

const App = (): React.ReactElement => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Router>
            <Switch>
              <Navigation>
                <>
                  <Route path='/'>
                    <Store />
                  </Route>
                </>
              </Navigation>
            </Switch>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
