# Prefer [`_.compact`] over [`_.filter`] with identity function

When using `_.filter` to remove all falsy values, it can be more concise to use [`_.compact`] instead.

## Rule Details

This rule takes no arguments.

### Fail

```js
_.map(f, a);

_.flatten(_.map(f, a));

_.flow(
  _.map(f1),
  _.flatten,
  f2
)

_.compose(
  f2,
  _.flatten,
  _.map(f1)
)
```

### Pass

```js
_.compact(f, a);

_.map(f, a);

_.flatten(a);

_.flow(
  _.compact(f1),
  f2
)

_.compose(
  f2,
  _.compact(f1)
)

_.flow(
  _.map(f1),
  f2,
  _.flatten
)
```

## When Not To Use It

If you do not want to enforce using `_.compact`, and prefer `_.map` and `_.flatten` instead, you should not use this rule.

[`_.compact`]: https://lodash.com/docs#compact
[`_.filter`]: https://lodash.com/docs#filter
