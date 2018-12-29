import Vektor from './vektor.js'
import Quadtree from './quadtree.js'

const dist = function () {
	if (arguments.length === 4) {
    //2D
    return Math.hypot(arguments[2] - arguments[0], arguments[3] - arguments[1]);
  } else if (arguments.length === 6) {
    //3D
    return Math.hypot(
      arguments[3] - arguments[0],
      arguments[4] - arguments[1],
      arguments[5] - arguments[2]
    )
  }
}

export const random = function (n) {
	return Math.floor(Math.random() * Math.floor(n));
}

export {dist, Vektor, Quadtree}
