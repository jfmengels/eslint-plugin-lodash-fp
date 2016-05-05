# No extraneous parameters in iteratees

In `lodash/fp`, iteratees (the functions passed to methods like [`_.map`], [`_.reduce`] or [`_.forEach`]) have their arguments [capped], meaning that instead of being called with `iteratee(value, index|key)`, they are called with `iteratee(value)`.

That is done to avoid problems with iteratees that can accept multiple arguments. Try out `['1', '2', '3'].forEach(parseInt);` and see if the result is the same as what you expected it to be.

This rule will report an error when you are passing an iteratee to a Lodash method, that accepts more arguments than that will be passed to it.
Note that as of this moment, this rule will not report anything when being passed a function that is declared somewhere else in the code, see passing example below.

## Rule Details

### Fail

```js
const array = [1, 2, 3];
_.map(function iteratee(value, index) { // index is ignored
  return value * index;
}, array);

_.map((value, index) => value * index); // index is ignored

_.reduce(function iteratee(result, value, index) { // index is ignored
  return result + (value * index);
}, array);
```

### Pass

```js
const array = [1, 2, 3];
_.map(function iteratee(value) {
  return value * 2;
}, array);

_.map((value) => value * 2);

_.reduce(function iteratee(result, value) {
  return result + value;
}, array);

// The following is not yet reported, but will lead to problems
const iteratee = (value, index) => value * index;
_.map(iteratee, array);
```

[capped]: https://github.com/lodash/lodash/wiki/FP-Guide#capped-iteratee-arguments
[`_.map`]: https://lodash.com/docs#map
[`_.reduce`]: https://lodash.com/docs#reduce
[`_.forEach`]: https://lodash.com/docs#forEach
