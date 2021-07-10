import React, { useMemo } from 'react'
import { Card, Grid, makeStyles, OutlinedInput, Theme, Typography } from '@material-ui/core'
import { CartItem } from '@types'
import { FlatIconButton } from '../Buttons'
import { Add, Remove } from '@material-ui/icons'

interface Props {
  cartItem: CartItem;
  setQuantity: (value: number) => void;
  stepQuantity: (step: -1 | 1) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    padding: theme.spacing(2, 1),
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
    '& img': {
      width: '100%',
      maxWidth: '140px'
    }
  },
  name: {
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  pricing: {

  },
  quantityInput: {
    fontSize: '1.4rem',
    padding: 0,
    paddingBottom: '5px',
    textAlign: 'center',
    width: '42px',
    '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
      appearance: 'none'
    }
  },
  quantityEdit: {
    flexWrap: 'nowrap',
    flexFlow: 'row',
    '&>*': {
      display: 'inline-block'
    }
  },
  singlePrice: {
    fontFamily: 'serif',
    marginLeft: theme.spacing(1)
  },
  finalPrice: {
    marginTop: '-6px',
    textAlign: 'right'
  }
}))

export const CartItemRow = ({
  cartItem,
  setQuantity,
  stepQuantity
}: Props): React.ReactElement => {
  const classes = useStyles()
  const shape = useMemo(() => cartItem.item, [cartItem])

  return (
    <Card className={classes.root} elevation={0}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={3} className={classes.icon}>
          <img src={'images/' + shape.iconFile} />
        </Grid>
        <Grid item xs>
          <Typography variant='h5' className={classes.name}>
            {shape.name}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          className={classes.pricing}
          alignItems='center'
        >
          <Grid item xs={7} container alignItems='center' className={classes.quantityEdit}>
            <FlatIconButton onClick={() => stepQuantity(-1)} color='secondary' size='small'>
              <Remove />
            </FlatIconButton>
            <OutlinedInput
              classes={{
                input: classes.quantityInput
              }}
              style={{
                margin: '0 4px'
              }}
              type='number'
              inputProps={{ min: 0 }}
              value={cartItem.quantity}
              onChange={e => setQuantity(Number(e.target.value))}
            />
            <FlatIconButton onClick={() => stepQuantity(1)} color='secondary' size='small'>
              <Add />
            </FlatIconButton>
            <Typography variant='body2' className={classes.singlePrice}>
              x <b>{shape.price}</b>
            </Typography>
          </Grid>
          <Grid item xs className={classes.finalPrice}>
            <Typography variant='h5' className={classes.finalPrice}>
              {shape.price * cartItem.quantity} €
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}
