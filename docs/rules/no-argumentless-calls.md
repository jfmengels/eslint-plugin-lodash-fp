# Forbid argument-less calls of Lodash methods

Almost all lodash/fp methods should not be called without arguments. When used in composition constructs, it is an easy mistake to pass an argument-less call, instead of the method directly.

### Fail

```js
_.flow(
  _.map(fn1),
  _.filter(fn2),
  _.flatten() // <-- Should not have been called
)(array);
```

### Pass

```js
_.flow(
  _.map(fn1),
  _.filter(fn2),
  _.flatten
)(array);
```
