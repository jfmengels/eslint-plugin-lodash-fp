# Prefer [`_.flatMap`] over consecutive [`_.map`] and [`_.flatten`]

When using [`_.map`] and [`_.flatten`], it can be more concise to use [`_.flatMap`] instead.

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
_.flatMap(f, a);

_.map(f, a);

_.flatten(a);

_.flow(
  _.flatMap(f1),
  f2
)

_.compose(
  f2,
  _.flatMap(f1)
)

_.flow(
  _.map(f1),
  f2,
  _.flatten
)
```

## When Not To Use It

If you do not want to enforce using `_.flatMap`, and prefer `_.map` and `_.flatten` instead, you should not use this rule.

[`_.flatMap`]: https://lodash.com/docs#flatMap
[`_.flatten`]: https://lodash.com/docs#flatten
[`_.map`]: https://lodash.com/docs#map
