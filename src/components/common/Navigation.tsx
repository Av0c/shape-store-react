import { AppBar, Typography, makeStyles, useTheme, Container, Theme, Badge } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import React, { useContext } from 'react'
import { FlatIconButton } from './Buttons'
import { CartContext } from './CartProvider/CartProvider'

interface Props {
  children: React.ReactElement
}

const ToothSvg = (): React.ReactElement => {
  const theme = useTheme()

  return <svg xmlns='http://www.w3.org/2000/svg' height='27' width='100%'>
    <defs>
      <pattern id='triangle' patternUnits='userSpaceOnUse' width='40' height='27'>
        <polygon points='0,0 20,22 40,0' fill={theme.palette.primary.main}/>
      </pattern>
    </defs>
    <rect width='100%' height='27' fill='url(#triangle)'/>
  </svg>
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1, 3, 2),
  },
  teeth: {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0'
  },
  barContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    fontFamily: 'Pacifico, cursive',
    marginRight: theme.spacing(5),
    marginBottom: 0
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    '& p': {
      fontFamily: 'Playfair Display, serif'
    },
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
      order: 2
    }
  },
  cart: {
    textAlign: 'right',
    flexGrow: 1,
    alignSelf: 'center',
    '&>span': {
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('xs')]: {
      order: 1
    }
  },
  cartText: {
    fontFamily: 'Playfair Display, serif',
    fontStyle: 'italic',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cartBadge: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    border: '1px solid #000',
    backgroundColor: '#fff',
    top: '4px',
    right: '4px',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'inherit'
    },
  }
}))

export const Navigation = ({ children }: Props): React.ReactElement => {
  const classes = useStyles()
  const { cartTotal, openCart } = useContext(CartContext)

  return (<>
    <AppBar position='sticky' className={classes.appBar} elevation={0}>
      <div className={classes.barContainer}>
        <Typography variant='h2' className={classes.title}>
          whee
        </Typography>
        <div className={classes.content}>
          <Typography variant='body1'>
            <i>The most definitive shape store in the world</i>
          </Typography>
        </div>
        <div className={classes.cart}>
          <Typography
            className={classes.cartText}
            variant='body1'
            component='span'>
            {`${cartTotal === 0 ? 'No' : cartTotal} ${cartTotal === 1 ? 'item' : 'items'}`} in cart
          </Typography>
          <Badge
            classes={{ badge: classes.cartBadge }}
            badgeContent={cartTotal}
            color='primary'>
            <FlatIconButton
              color='primary'
              onClick={openCart}>
              <ShoppingCart />
            </FlatIconButton>
          </Badge>
        </div>
      </div>
      <div className={classes.teeth}>
        <ToothSvg />
      </div>
    </AppBar>
    <Container>
      {children}
    </Container>
  </>)
}
