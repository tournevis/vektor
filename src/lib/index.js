import Vektor from './vektor.js'


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
    );
  }
}


export {dist, Vektor}