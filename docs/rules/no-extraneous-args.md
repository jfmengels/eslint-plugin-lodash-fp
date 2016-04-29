# No extraneous arguments to methods with a fixed arity

In `lodash/fp`, most methods have a fixed number of arguments, often ignoring optional arguments available in vanilla Lodash.
For instance, in vanilla Lodash, [`_.get`] accepts a third parameter that serves as the default value, which gets ignored in `lodash/fp` (hint: use the `_.getOr` method instead which exists for that purpose). The rule reports instances where too many arguments are passed to a method.

### Fail

```js
_.get(path, defaultValue, object);
_.find(iteratee, object, extraneous);
```

### Pass

```js
_.get(path, object);
_.getOr(path, defaultValue, object);
_.find(iteratee, object);
```

[`_.get`]: https://lodash.com/docs#get
