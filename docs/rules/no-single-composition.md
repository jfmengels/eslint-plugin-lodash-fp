# Enforce at least two methods arguments for composition methods

Giving one argument to composition methods like [`_.flow`](https://lodash.com/docs#flow) and [`_.compose`](https://lodash.com/docs#flowRight) is useless, as `_.flow(fn)(x)` is the same as calling `fn(x)`.

### Fail

```js
import _, {flow} from 'lodash/fp';

flow(fn)(x);
_.flow(fn)(x);
```

### Pass

```js
import _, {flow} from 'lodash/fp';

flow(fn1, fn2)(x);
_.flow(fn1, fn2)(x);
```
