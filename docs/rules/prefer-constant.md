# Prefer [`_.constant`] over functions returning literals

When you want a function that always returns the same primitive value, it can be more concise to use [`_.constant`].

## Options

This rule supports the following options:

`arrowFunctions`: Whether or not to to report arrow functions. Default is `false`, meaning arrow functions will not get reported.

You can set the options like this:

```js
"lodash-fp/prefer-constant": ["error", {"arrowFunctions": true}]
```

### Fail

```js
function three() {
  return 3;
}

/* eslint "lodash-fp/prefer-constant": ["error", {"arrowFunctions": true}] */
const pi = () => 3.1415;
```

### Pass

```js
const three = _.constant(3);

const pi = _.constant(3.1415);

const pi = () => 3.1415;

function identity(x) {
  return x;
};

function getObj() {
  return {a: 1};
};
```

The last example is not a warning because it does not return a primitive value: it is therefore not equivalent to `_.constant({a: 1})`, which always returns the same instance. Consider:
```js
const getObj = _.constant({a: 1});
x = getObj();
x.a = 2;
getObj()
// → {a: 2}
```

## When Not To Use It

If you do not want to enforce using [`_.constant`], you should not use this rule.

[`_.constant`]: https://lodash.com/docs#constant
