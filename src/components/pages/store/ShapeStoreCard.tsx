import { Card, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { ShapeItem } from '@types'
import { FlatButton, CartContext } from '@components/common'

interface Props {
  shape: ShapeItem;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '750px',
    maxWidth: '100%',
    padding: theme.spacing(5, 2, 3),
    boxSizing: 'border-box',
    margin: 'auto',
    boxShadow: 'none',
    transition: 'box-shadow 0.2s ease',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3)
    },
    '&:hover': {
      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)'
    },
    [theme.breakpoints.down('xs')]: {
      '& h3': {
        fontSize: '2.4em'
      }
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: '100%',
      maxWidth: '140px'
    }
  },
  name: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: theme.spacing(2)
  },
  description: {
  },
  pricing: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    '&>*:not(:last-child)': {
      marginBottom: theme.spacing(2)
    }
  }
}))

export const ShapeStoreCard = ({ shape }: Props): React.ReactElement => {
  const classes = useStyles()
  const { addToCart } = useContext(CartContext)

  return (
    <Card className={classes.root} elevation={0}>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3} className={classes.icon}>
          <img src={'images/' + shape.iconFile} />
        </Grid>
        <Grid item xs={8} sm={5}>
          <Typography variant='h3' className={classes.name}>
            {shape.name}
          </Typography>
          <Typography variant='body1' className={classes.description}>
            {shape.description}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.pricing}>
          <Typography variant='h3'>
            {shape.price} €
          </Typography>
          <FlatButton onClick={() => addToCart(shape)}>ADD TO CART</FlatButton>
        </Grid>
      </Grid>
    </Card>
  )
}
