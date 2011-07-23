/**
* Some 2d math functions
* These operate on 'this' The do not return  new instance.
*/
hangout.pong.math2d = hangout.pong.math2d || {};
// oh dear the namespaces need some work!

hangout.pong.math2d.COORD2 = function(x,y){
	this.x=x;
	this.y=y;
}

hangout.pong.math2d.COORD2.prototype.len = function(){
	return Math.sqrt(this.x*this.x + this.y*this.y);
}

hangout.pong.math2d.COORD2.prototype.lenSq = function(){
	return this.x*this.x + this.y*this.y;
}

hangout.pong.math2d.COORD2.prototype.add = function (v){
	this.x += v.x;
	this.y += v.y;
	return this;
}

hangout.pong.math2d.COORD2.prototype.scale = function(s){
	this.x *= s;
	this.y *= s;
	return this;
}

hangout.pong.math2d.COORD2.prototype.dot = function(v){
	return this.x * v.x + this.y * v.y;
}

hangout.pong.math2d.COORD2.prototype.perp = function(){
	return new pong.math2d.COORD2(this.x,this.y)
}

hangout.pong.math2d.COORD2.prototype.reflection = function(l){
	this.add( l.scale( -2*this.dot(l)/l.dot(l) ) );
	return this;
}


