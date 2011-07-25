/**
 *  Some shapes used for a basic bounding figure around a character
 */
hangout.pong.Shape = function(centre, rotation, type) {
	this.centre = centre;
	this.rot = rotation;
	this.type = type;
}

hangout.pong.Shape.typeEnum = {
  SHAPE_NONE:       0,
  SHAPE_RECTANGLE:  1,
  SHAPE_CIRCLE:     2,
  SHAPE_RAY:        3,
  SHAPE_LINE:       4
};



/**
* Some intersection tests between the various shape. Right now we will only support line and circle b/c that is all we need
*/
hangout.pong.Shape.prototype.isIntersectingCircleLine = function(c, l) {
	var result = false;
	// caclualte shortest distance from circle's centre to nearest point on r
	var d = (l.vec.x * (l.origin.y - c.centre.y) - (l.origin.x - c.centre.x) * l.vec.y) / ( l.length);
	
	if (d < 0) {
//		TODO: we should be able to return if the ball is on the wrong side of the line.
//		return true;   // we are behind the line, so this is and intersection
	}
	
	if (Math.abs(d) < c.radius) {
		result = true;   // the circle is crossing the line
	}
	
	if (result) {
    console.log('bounce');
		result = { perp: new hangout.pong.math2d.COORD2(l.vec.y, -l.vec.x) };
	}
	
	return result; //we are good.
};

hangout.pong.Shape.prototype.isIntersectingCircleRectangle = function(c, r) {
  // TODO: we don't need this for pong;
};

hangout.pong.Shape.prototype.isIntersectingRectangleRectangle = function(r, r) {
	// TODO: we don't need this for pong
};

/**
*  A Line
*/
hangout.pong.Shape.Line = function(origin, vec) {
	hangout.pong.Shape.call(this, null, 0, hangout.pong.Shape.typeEnum.SHAPE_LINE);
	this.origin = origin;
	this.vec = vec;
	this.length = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
};
hangout.inherits(hangout.pong.Shape.Line, hangout.pong.Shape);


hangout.pong.Shape.Line.prototype.isIntersecting = function(shape) {
	if ( shape.type == hangout.pong.Shape.typeEnum.SHAPE_LINE) {
		return hangout.pong.Shape.isIntersectingCircleLine(shape, this);
	}
	return false;
};


/**
* A Circle
*/
hangout.pong.Shape.Circle = function(center, radius) {
	hangout.pong.Shape.call(this, center, 0, hangout.pong.Shape.typeEnum.SHAPE_CIRCLE);
	this.radius = radius;
};
hangout.inherits(hangout.pong.Shape.Circle, hangout.pong.Shape);

hangout.pong.Shape.Circle.prototype.isIntersecting = function(shape) {
	if (shape.type == hangout.pong.Shape.typeEnum.SHAPE_CIRCLE) {
		return this.isIntersectingCircleRectangle(this, shape);
	} else if (shape.type == hangout.pong.Shape.typeEnum.SHAPE_RECTANGLE) {
		return this.isIntersectingCircleCircle(shape, this);
	} else if (shape.type == hangout.pong.Shape.typeEnum.SHAPE_LINE) {
		return this.isIntersectingCircleLine(this, shape);
	}
	return false;
};

/**
* A Retangle
*/
hangout.pong.Shape.Rectangle = function(center, rotation, height, width) {
	hangout.pong.Shape.call(this, center, rotation, hangout.pong.Shape.typeEnum.SHAPE_RECTANGLE);
	this.height = height;
	this.width = width;
}
hangout.inherits(hangout.pong.Shape.Rectangle, hangout.pong.Shape);

/**
* Test for intersection against another shape
*/
hangout.pong.Shape.Rectangle.prototype.isIntersecting = function(shape) {
	if (shape.type == hangout.pong.Shape.typeEnum.SHAPE_CIRCLE) {
		return hangout.pong.Shape.isIntersectingCircleRectangle(shape, this);
	} else if (shape.type == hangout.pong.Shape.typeEnum.SHAPE_RECTANGLE) {
		return hangout.pong.Shape.isIntersectingRectangleRectangle(shape, this);
	};
	return false;
};
