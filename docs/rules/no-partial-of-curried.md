# No use of [`_.partial`] on curried Lodash methods

Using [`_.partial`] or [`_.partialRight`] on Lodash methods that are curried can lead to some odd behaviors. Most `lodash/fp` are curried by default.

```js
const fn = _.partial(_.get, ['path']);
// => Equivalent to `_.get('path')`
const fn = _.partial(_.get, [_, object]);
// => Equivalent to `_.get(_, object)`
const fn = _.partial(_.get, ['path', object]);
// => This will create a function that when called with no arguments, will simply return the function again.
// Which is probably not the expected behavior
```

## Rule Details

### Fail

```js
_.partial(_.get, ['path']);

_.partial(_.find, [{foo: 'bar'}]);

_.partial(_.find, [_, {this: 'is', an: 'object'}]);
```

### Pass

```js
_.partial((a, b) => a + b, [2]);

// This is okay because `_.flow` is not curried
_.partial(_.flow, [
  a => a + 1,
  b => b * 10
])(c => c - 1);
```

[`_.partial`]: https://lodash.com/docs#partial
[`_.partialRight`]: https://lodash.com/docs#partialRight
