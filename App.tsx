import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import theme from './theme'
import { Navigation } from './components/common/Navigation'
import { Store } from './components/pages/store/Store'

const App = (): React.ReactElement => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App
