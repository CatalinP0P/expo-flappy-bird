interface Rectangle {
  x1: number
  y1: number
  x2: number
  y2: number
}

export const doRectanglesIntersect = (
  rect1: Rectangle,
  rect2: Rectangle,
): boolean => {
  if (rect1.x2 < rect2.x1 || rect2.x2 < rect1.x1) {
    return false
  }

  // Check if one rectangle is above the other
  if (rect1.y2 < rect2.y1 || rect2.y2 < rect1.y1) {
    return false
  }

  // Rectangles overlap
  return true
}
