import { makeStyles, Theme } from '@material-ui/core'
import React, { useMemo } from 'react'
import { useShapes } from '@hooks'
import { ShapeStoreCard } from './ShapeStoreCard'

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    width: '100%',
    padding: theme.spacing(6, 0)
    // [theme.breakpoints.down('sm')]: {
    //   width: '70%'
    // },
    // [theme.breakpoints.down('xs')]: {
    //   width: '100%'
    // }
  }
}))

export const Store = (): React.ReactElement => {
  const { shapes } = useShapes()
  const classes = useStyles()

  const cardsRender = useMemo(
    () => {
      if (shapes && shapes.length > 0) {
        return shapes.map(
          shape => <ShapeStoreCard key={`shape-card-${shape.id}`} shape={shape} />
        )
      }
    },
    [shapes]
  )

  return (
    <div className={classes.cardContainer}>
      {cardsRender}
    </div>
  )
}
