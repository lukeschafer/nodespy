#!/usr/bin/env node

var assert = require('assert');
var noderunner = require('noderunner');
var spy = require('../index.js');

var tests = {
	"spied function should return times called": function() {
		var f = function() {};
		var s = spy(f);
		s();s();
		assert.equal(2, s.times);
	},
	"spied function should retain parent reference": function() {
		var x = {foo:spy(function() { return this; })};
		assert.ok(x === x.foo());		
	}
}

noderunner
	.setup({suppressConsole:true, showSuccesses:true})
	.add('nodespy.tests', tests)
	.run();
