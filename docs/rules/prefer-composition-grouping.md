# Prefer grouping similar methods in composition methods

When using composition methods like [`_.flow`] or [`_.compose`], it can be preferred to regroup similar methods in a new composition method call.
The methods for which this rule will create an error are [`_.map`], [`_.filter`] and [`_.reject`]. When using [`_.filter`] and [`_.reject`] and shorthands, you might want to use [`_.overEvery`] and [`_.overSome`]. When using the [`_.map`] shorthand, you might want to use [`_.get`].

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
  _.map('property'), // _.pluck deprecated
  _.map(fn2)
)(a);
// -->
_.map(
  _.flow(_.get('property'), fn2)
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

_.flow(
  _.filter(fn1),
  _.filter('property'),
  _.map(fn2)
)(a);
// -->
_.flow(
  _.filter(_.overEvery([fn1, 'property'])),
  _.map(fn2)
)(a);

_.flow(
  _.reject(fn1),
  _.reject('property'),
  _.map(fn2)
)(a);
// -->
_.flow(
  _.reject(_.overSome([fn1, 'property'])),
  _.map(fn2)
)(a);
```

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

[`_.map`]: https://lodash.com/docs#map
[`_.get`]: https://lodash.com/docs#get
[`_.filter`]: https://lodash.com/docs#filter
[`_.reject`]: https://lodash.com/docs#reject
[`_.flow`]: https://lodash.com/docs#flow
[`_.compose`]: https://lodash.com/docs#flowRight
[`_.overEvery`]: https://lodash.com/docs#overEvery
[`_.overSome`]: https://lodash.com/docs#overSome
