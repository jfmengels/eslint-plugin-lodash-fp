# Forbid argument-less calls of Lodash methods

Almost all lodash/fp methods should not be called without arguments. When used in composition constructs, it is an easy mistake to pass an argument-less call, instead of the method directly.

Some methods are ignored by this rule, as they can or are meant to be called without arguments: [`_.uniqueId`], [`_.now`], [`_.noConflict`], [`_.runInContext`].

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

[`_.uniqueId`]: (https://lodash.com/docs#uniqueId)
[`_.now`]: (https://lodash.com/docs#now)
[`_.noConflict`]: (https://lodash.com/docs#noConflict)
[`_.runInContext`]: (https://lodash.com/docs#runInContext)
