import React, { useMemo, useState } from 'react'
import { CartItem, SaleItem } from '@types'
import { Container, Divider, Drawer, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { CartItemRow } from './CartItemRow'
import { FlatButton } from '../Buttons'

interface CartContext {
  cartItems: CartItem[];
  cartTotal: number;
  addToCart: (item: SaleItem) => void;
  removeFromCart: (item: SaleItem) => void;
  openCart: () => void;
}

export const CartContext = React.createContext<CartContext>({
  /* eslint-disable @typescript-eslint/no-empty-function */
  cartItems: [],
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  openCart: () => {}
  /* eslint-enable @typescript-eslint/no-empty-function */
})

interface Props {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) => ({
  cartDrawer: {
    width: '350px',
    maxWidth: '100vw',
    padding: theme.spacing(1, 2)
  },
  summary: {
    flexFlow: 'column',
    alignItems: 'flex-end'
  }
}))

export const CartProvider = ({ children }: Props): React.ReactElement => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isCheckout, setIsCheckout] = useState<boolean>(false)

  const classes = useStyles()

  const addToCart = (saleItem: SaleItem) => {
    setCartItems(cItems => {
      const ind = cItems.findIndex(cItem => cItem.item.id === saleItem.id)
      const newItems = [...cartItems]
      if (ind !== -1) {
        newItems[ind].quantity += 1
      }
      else {
        newItems.push({
          id: newItems.length + 1,
          item: saleItem,
          quantity: 1
        })
      }
      return newItems
    })
  } 

  const removeFromCart = (saleItem: SaleItem) => {
    setCartItems(cItems => {
      const ind = cItems.findIndex(cItem => cItem.item.id === saleItem.id)
      const newItems = [...cartItems]
      if (ind !== -1) {
        newItems[ind].quantity -= 1
        if (newItems[ind].quantity <= 0) {
          return newItems.filter(cItem => cItem.item.id !== ind)
        }
      }
      return newItems
    })
  }

  const openCart = () => {
    setIsOpen(true)
  }

  const handleCheckout = () => {
    setIsCheckout(true)
    setCartItems([])
  }

  const handleCloseCart = () => {
    setIsCheckout(false)
    setIsOpen(false)
  }

  const setQuantity = (cartItem: CartItem, quantity: number) => {
    setCartItems(cItems => {
      const ind = cItems.findIndex(cItem => cItem.id === cartItem.id)
      const newItems = [...cartItems]
      if (ind !== -1) {
        newItems[ind].quantity = quantity
      }
      return newItems
    })
  }

  const stepQuantity = (cartItem: CartItem, step: -1 | 1) => {
    setCartItems(cItems => {
      const ind = cItems.findIndex(cItem => cItem.id === cartItem.id)
      const newItems = [...cartItems]
      if (ind !== -1 && (newItems[ind].quantity+step >= 0)) {
        newItems[ind].quantity += step
      }
      return newItems
    })
  }

  const cartTotal = useMemo(
    () => cartItems
      .map(item => item.quantity)
      .reduce((a, b) => a + b, 0),
    [cartItems]
  )

  const priceTotal = useMemo(
    () => cartItems
      .reduce((sum, cItem) => sum + cItem.quantity * cItem.item.price, 0),
    [cartItems]
  )
  
  return <CartContext.Provider
    value={{
      cartItems,
      cartTotal,
      addToCart,
      removeFromCart,
      openCart
    }}>
    {children}
    <Drawer
      anchor='right'
      open={isOpen}
      onClose={() => handleCloseCart()}>
      <Container className={classes.cartDrawer}>
        <Grid container>
          <Grid container item xs={12} justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Typography variant='h6'>Shopping Cart</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleCloseCart()}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Divider style={{ width: '100%', margin: '8px 0' }}/>
          {
            !isCheckout
              ? <>
                <Grid container item xs={12}>
                  {
                    cartItems.map(cItem =>
                      <CartItemRow
                        key={'key-'+cItem.id}
                        cartItem={cItem}
                        setQuantity={(quantity) => setQuantity(cItem, quantity)}
                        stepQuantity={(step) => stepQuantity(cItem, step)}
                      />
                    )
                  }
                </Grid>
                <Divider style={{ width: '100%', margin: '8px 0' }}/>
                <Grid className={classes.summary} container>
                  <Typography variant='h6'>Total: {priceTotal} €</Typography>
                  <Divider style={{ width: '100%', margin: '8px 0' }}/>
                  <FlatButton
                    disabled={priceTotal <= 0}
                    onClick={() => handleCheckout()}>
                    Checkout
                  </FlatButton>
                </Grid>
              </>
              : <Container>
                <Typography variant='body1'>
                  Congratulations!
                  <br></br>
                  Since this is an imaginary shop,
                  all your payments have also been processed imaginarily.
                  <br></br>
                  <br></br>
                  Enjoy your shapes :) 
                </Typography>
              </Container> 
          }
          
        </Grid>
      </Container>
    </Drawer>
  </CartContext.Provider>
}