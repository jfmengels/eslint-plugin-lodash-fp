# No extraneous partials

In `lodash/fp`, most methods are curried. This means there are multiple ways to
call a `lodash/fp` method. Where possible you should always call the method
directly, to avoid the creation of any intermediate partals.

### Fail

```js
_.get(path)(object);
_.getOr(path)(defaultValue)(object);
_.find(iteratee)(object);
```

### Pass

```js
_.get(path, object);
_.getOr(path, defaultValue, object);
_.find(iteratee, object);
_.flow(_.get(path), _.map(fn))(object);
```
