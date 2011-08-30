# nodespy 

  Create spy functions and objects to assist with unit testing
  
## What's it do?

  - wraps functions to enable spying on calls to the function
  - spy on all functions in an object graph

## Example

    var spyFunc = spy(function() {});
    spyFunc();
    assert(spyFunc.called && spyFunc.times == 1);

## API

Require

    var spy = require('nodespy');

Create

    var spied = spy(anyFunction);

Was it called? How many times?

    spied.called();
    spied.times;

Was it called with particular arguments?

    spied.called('a', 2, foo);

Was it called, but it's complex to check?

    spied.matched(function(argsArray) {
        return (argsArray[0] == 'a')
    });

Like above, but return the first set of matching args

    var args = spied.where(function(argsArray) {
	return (argsArray[0] == 'a');	
    });

Just get the call args for the last call

    var args = spied.lastCallArgs();

Get the last return value

    var lastReturn = spied.lastReturn();

Reset to square one

    spied.reset();

Spy on all functions in a graph (including functions on children and in arrays)

    var mock = spy.all({
        foo: function() {},
	bar: { foo2: function() {} },
	baz: [ function() {}, function() {} ]
    });

Reset all on a spied object

    mock.resetAll();

Check if the function was called

## License: The MIT License

Copyright (c) 2011 Luke Schafer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
