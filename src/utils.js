export const dist = (x, y, x2, y2) => {
	var rawDistX = x - x2
	var rawDistY = y - y2
	
	return Math.hypot(rawDistX, rawDistY)
}