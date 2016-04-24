# Prefer grouping similar methods in composition methods

When using composition methods like [`_.flow`] or [`_.compose`], it can be preferred to regroup similar methods in a new composition method call.
The methods for which this rule will create an error are [`_.map`], [`_.filter`] and [`_.reject`];

```js
_.flow(
  _.map(fn1),
  _.map(fn2)
)(a);
// -->
_.map(
  _.flow(fn1, fn2)
)(a);

_.flow(
  _.map(fn1),
  _.map(fn2),
  _.filter(fn3)
)(a);
// -->
_.flow(
  _.map(_.flow(fn1, fn2)),
  _.filter(fn3)
)(a);
```


using [`_.get`] or [`_.has`] over expression chains like `a && a.b && a.b.c`

When writing an expression like `a && a.b && a.b.c` just to make sure the path exists, it is more readable to use the functions [`_.get`], [`_.set`] and [`_.has`] instead.

## Rule Details

This rule takes one argument - the minimal depth (default is `3`).

### Fail

```js
_.flow(
  _.map(fn1),
  _.map(fn2)
)(a);

_.flow(
  _.map(fn1),
  _.map(fn2),
  _.filter(fn3)
)(a);
```

### Pass

```js
_.map(
  _.flow(fn1, fn2)
)(a);

_.flow(
  _.map(_.flow(fn1, fn2)),
  _.filter(fn3)
)(a);
```


## When Not To Use It

If you do not want to enforce using [`_.get`], you should not use this rule.

[`_.map`]: https://lodash.com/docs#map
[`_.filter`]: https://lodash.com/docs#filter
[`_.reject`]: https://lodash.com/docs#reject
[`_.flow`]: https://lodash.com/docs#flow
[`_.compose`]: https://lodash.com/docs#flowRight
