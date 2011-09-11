var spy = module.exports = function(func) {
	var args = [];
	var returns = [];
	var parent = this;
	
	var me = function() {
		me.times++;
		args.push(arguments);
		var ret = func.apply(parent, arguments);
		returns.push(ret);
		return ret;
	};
	me.isspy = true;
	me.times = 0;
	
	me.called = function() {
		if (!arguments.length) return !!me.times;
		
		for(var i = 0, l = args.length; i < l; i++) {
			if (arguments.length != args[i].length) continue;
			var goodSoFar = true;
			for(var ai = 0, al = arguments.length; ai < al; ai++) {
				if (arguments[ai] === spy.anything) continue;
				if (arguments[ai] != args[i][ai]) {
					goodSoFar = false; break;
				}
			}
			if (goodSoFar) return true;
	}
		return false;
	};
	me.when = function(f) {
		var original = func;
		func = function() {
			f.apply(parent, arguments);
			return original.apply(parent, arguments);
		}
	};
	me.where = function(f) {
		for(var i = 0, l = args.length; i < l; i++) {
			try {
				if (f(args[i])) return args[i];
			} catch (e) { }
		}
		throw new Error('no matched calls');
	},
	me.matched = function(f, argu) {
		for(var i = 0, l = args.length; i < l; i++) {
			try {
				if (f(args[i], argu)) return true;
			} catch (e) { }
		}
		return false;
	};
	me.reset = function() {
		me.times = 0;
		args = [];
		returns = [];
	};
	me.lastCallArgs = function() {
		return args[args.length - 1];
	};
	me.lastReturn = function() {
		return returns[returns.length - 1];
	};
	return me;
}

spy.spy = spy;
spy.anything = {};

spy.all = function(o, reset) {
	if ('array' == typeof o) {
		for(var i = 0, l = o.length; i < l; i++) {
			checkAndUpdate(i);
		}
	} else {
		for(var k in o) {
			checkAndUpdate(k);
		}
	}
	
	function checkAndUpdate(index) {
		if ('function' == typeof o[index]) {
			if (index == 'resetAll') return;
			o[index] = (reset ? resetFunc : spy)(o[index]);
			return;
		}
		if ('object' == typeof o[index] || 'array' == typeof o[index]) {
			return spy.all(o[index], reset);
		}
	};
	
	function resetFunc(o) {
		if (o.isspy) o.reset();
		return o;
	};
	
	o.resetAll = function() {
		spy.all(o, true);
	}
	
	return o;
}
