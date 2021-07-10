import { Theme } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'

const white = '#fff'
const black = '#000'

const theme: Theme = createTheme({
  typography: {
    fontFamily: 'Playfair Display, serif'
  },
  palette: {
    primary: {
      contrastText: black,
      main: '#e8e8e8'
    },
    secondary: {
      contrastText: white,
      main: black
    },
    text: {
      primary: black
    },
    background: {
      default: white,
      
    }
  }
})

export default theme
