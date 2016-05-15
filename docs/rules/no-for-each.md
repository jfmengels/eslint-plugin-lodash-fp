# Forbid the use of [`_.forEach`]

If you aim for your project to avoid side-effects as much as possible, then you might want to forbid the of methods like [`_.forEach`], [`_.forIn`] or [`_.forOwn`]. By default, it will also report any call to methods named `forEach`.

## Options

This rule supports the following options:

`noNative`: If set to `true`, then any method call of the form `x.forEach()` will be reported, even if it's not a Lodash method. Default is `true`.

You can set the options like this:

```js
"lodash-fp/no-for-each": ["error", {"noNative": false}]
```

### Fail

```js
_.forEach(fn, array);
_.each(fn, array);
_.forIn(fn, array);
_.forOwn(fn, array);
_.forEachRight(fn, array);
_.eachRight(fn, array);
_.forInRight(fn, array);
_.forOwnRight(fn, array);

_.flow(
  _.filter(fn1),
  _.forEach(fn2)
);

array.forEach(fn);
```

### Pass

```js
_.flow(
  _.filter(fn1),
  _.map(fn2)
);

_.map(fn, array);

/* eslint lodash-fp/no-for-each: ["error", {"noNative": false}] */
array.forEach(fn);
```

[`_.forEach`]: (https://lodash.com/docs#forEach)
[`_.forOwn`]: (https://lodash.com/docs#forOwn)
[`_.forIn`]: (https://lodash.com/docs#forIn)
