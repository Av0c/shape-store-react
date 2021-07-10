import { Button, IconButton } from '@material-ui/core'
import { styled, Theme, withTheme } from '@material-ui/core/styles'

export const FlatButton = styled(Button)({
  background: 'none',
  border: '1px solid #000',
  padding: '8px 24px',
  borderRadius: '0px',
  fontWeight: 'bold'
})

export const FlatIconButton = styled(withTheme(IconButton))(props => ({
  '&.MuiIconButton-colorPrimary': {
    backgroundColor: props.theme.palette.primary.contrastText
  },
  '&.MuiIconButton-colorSecondary': {
    backgroundColor: props.theme.palette.secondary.contrastText
  }
}))