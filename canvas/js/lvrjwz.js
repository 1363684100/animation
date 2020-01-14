"use strict";

const {
	PI,
	cos,
	sin,
	tan,
	abs,
	sqrt,
	pow,
	min,
	max,
	ceil,
	floor,
	round,
	random,
	atan2
} = Math;
const HALF_PI = 0.5 * PI;
const QUART_PI = 0.25 * PI;
const TAU = 2 * PI;
const TO_RAD = PI / 180;
const G = 6.67 * pow(10, -11);
const EPSILON = 2.220446049250313e-16;
const rand = n => n * random();
const randIn = (_min, _max) => rand(_max - _min) + _min;
const randRange = n => n - rand(2 * n);
const fadeIn = (t, m) => t / m;
const fadeOut = (t, m) => (m - t) / m;
const fadeInOut = (t, m) => {
	let hm = 0.5 * m;
	return abs((t + hm) % m - hm) / hm;
};
const dist = (x1, y1, x2, y2) => sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1);
const lerp = (a, b, amt) => (1 - amt) * a + amt * b;
const vh = p => p * window.innerHeight * 0.01;
const vw = p => p * window.innerWidth * 0.01;
const vmin = p => min(vh(p), vw(p));
const vmax = p => max(vh(p), vw(p));
const clamp = (n, _min, _max) => min(max(n, _min), _max);
const norm = (n, _min, _max) => (n - _min) / (_max - _min);

Array.prototype.lerp = function(t = [], a = 0) {
	this.forEach((n, i) => (this[i] = lerp(n, t[i], a)));
};

Float32Array.prototype.get = function(i = 0, n = 0) {
	const t = i + n;

	let r = [];

	for (; i < t; i++) {
		r.push(this[i]);
	}

	return r;
};

class PropsArray {
	constructor(count = 0, props = []) {
		this.count = count;
		this.props = props;
		this.spread = props.length; 
		this.values = new Float32Array(count * props.length);
	}
	get length() {
		return this.values.length;
	}
	set(a = [], i = 0) {
		this.values.set(a, i);
	}
	setMap(o = {}, i = 0) {
		this.set(Object.values(o), i);
	}
	get(i = 0) {
		return this.values.get(i, this.props.length);
	}
	getMap(i = 0) {
		return this.get(i).reduce(
			(r, v, i) => ({
				...r,
				...{ [this.props[i]]: v }
			}),
			{}
		);
	}
	forEach(cb) {
		let i = 0;
		
		for (; i < this.length; i += this.props.length) {
			cb(this.get(this, i), i, this);
		}
	}
	map(cb) {
		let i = 0;
		
		for (; i < this.length; i += this.props.length) {
			this.set(cb(this.get(this, i), i, this), i);
		}
	}
	async* read() {
		let i = 0;
		
		for (; i < this.length; i += this.props.length) {
			yield this.get(i);
		}
	}
}
