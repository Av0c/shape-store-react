import { useState, useCallback, useEffect } from 'react'
import * as client from '@client'
import { ShapeItem } from 'src/types'

interface Context {
  shapes: ShapeItem[]
}

export const useShapes = (): Context => {
  const [shapes, setShapes] = useState<ShapeItem[]>([])

  const fetchShapes = useCallback(
    () => client.getShapes()
      .then(setShapes),
    []
  )

  useEffect(
    () => {
      fetchShapes()
    },
    [fetchShapes]
  )

  return {
    shapes
  }
}