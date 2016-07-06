# Prefer using [`_.get`] or [`_.has`] over expression chains like `a && a.b && a.b.c`

When writing an expression like `a && a.b && a.b.c` just to make sure the path exists, it is more readable to use the functions [`_.get`], [`_.set`] and [`_.has`] instead.

## Rule Details

This rule takes one argument - the minimal depth (default is `3`).

### Fail

```js
const isThree = a && a.b && a.b.c === 3;

if (a && a.b && a.b.c) {
  // ...
}
```

### Pass

```js
const isThree = _.get(a, 'b.c') === 3;

if (_.has(a, 'b.c')) {
  // ...
}
```


## When Not To Use It

If you do not want to enforce using [`_.get`], you should not use this rule.

[`_.get`]: https://lodash.com/docs#get
[`_.set`]: https://lodash.com/docs#set
[`_.has`]: https://lodash.com/docs#has
