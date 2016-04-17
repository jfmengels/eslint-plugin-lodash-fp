# Avoid unnecessary function wrapping

This rule disallows declaring a function `f` that only calls another function `g`, when:
- the only argument of `f` is the last argument of `g`
- `g` is a curried Lodash method

This is disallowed by the rule as `f` can be removed. See [this](https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html#pointfree) for further explanation and examples of pointfree style.

### Fail

```js
function isNotZero(x) {
  return x !== 0;
}

_.filter(function(x) {
  return isNotZero(x);
}, array);

_.filter((x) => isNotZero(x), array);

function getAtABC(x) {
  return _.get('a.b.c', x);
}
```

### Pass

```js
function isNotZero(x) {
  return x !== 0;
}

_.filter(isNotZero, array);

_.map((x) => add(x, x), array);

const getAtABC = _.get('a.b.c');
```
