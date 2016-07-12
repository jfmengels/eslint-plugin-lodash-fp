# Enforce that the result of a Lodash method call gets used

In `lodash/fp`, Lodash methods do not mutate any values or cause side-effects, and it is therefore useless to call a Lodash method without using it's result. The result should be assigned to a variable, passed as a parameter of another function, etc.

This rule reports when the result does not get used. Methods like [`_.forEach`] that are explicitly meant to cause side-effects are ignored by this rule.

### Fail

```js
_.set('name', 'John Doe', user);

const array = [1, 2, 3];
_.pullAt(1, array)
foo(array);
```

### Pass

```js
const updatedUser = _.set('name', 'John Doe', user);

const array = [1, 2, 3];
foo(_.pullAt(1, array));


// Exceptions
_.forEach(fn, array);

const object = {
  value: 2,
  getValue: function() { return this.value; })
};
_.bindAll(object, ['getValue']);
```

[`_.forEach`]: https://lodash.com/docs#forEach
