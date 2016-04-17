# Forbid the use of [`_.chain`](https://lodash.com/docs#chain)

In `lodash/fp`, it is not recommended to use [`_.chain(x)`](https://lodash.com/docs#chain) or [`_(x)`](https://lodash.com/docs#_) to chain commands. Instead, it is recommended to use [`_.flow`](https://lodash.com/docs#flow)/[`_.compose/_.flowRight`](https://lodash.com/docs#flowRight).

For more information on why to avoid `_.chain`, please read [this article](https://medium.com/making-internets/why-using-chain-is-a-mistake-9bc1f80d51ba#.sbusnswuw)

### Fail

```js
const value = [1, 2, 3];

_(value)
  .filter(x => x > 1)
  .map(x => x * x)
  .value();

_.chain(value)
  .filter(x => x > 1)
  .map(x => x * x)
  .value();
```

### Pass

```js
_.flow(
  _.filter(x => x > 1),
  _.map(x => x * x)
)(value);

_.compose(
  _.map(x => x * x),
  _.filter(x => x > 1)
)(value);
```
