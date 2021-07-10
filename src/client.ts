import Shapes from './data/shapes.json'
import { ShapeItem } from './types'

export const getShapes = (): Promise<ShapeItem[]> => {
  return new Promise(
    (resolve, _reject) => {
      setTimeout(() => {
        resolve(Shapes)
      }, 500)
    }
  )
}