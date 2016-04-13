# Enforce a consistent composition method

It can be pretty confusing to mix left to right and right to left composition methods. This rule enforces the use of a consistent single method to compose functions, among the following:
- left to right: [`_.flow`](https://lodash.com/docs#flow), [`_.pipe`](https://lodash.com/docs#pipe)
- right to left: [`_.compose`](https://lodash.com/docs#compose), [`_.flowRight`](https://lodash.com/docs#flowRight)

## Options

The rule takes one option, a string, which is either `"flow"`, `"pipe"`, `"compose"` or `"flowRight"`. The option is mandatory.

You can set the option in configuration like this:

```js
"lodash-fp/consistent-compose": ["error", "flow"]
```

### Fail

```js
import _, {pipe, compose} from 'lodash/fp';

/* lodash-fp/consistent-compose: ["error", "flow"] */
pipe(fn1, fn2)(x);
compose(fn1, fn2)(x);
_.pipe(fn1, fn2)(x);
_.compose(fn1, fn2)(x);
_.flowRight(fn1, fn2)(x);
```

### Pass

```js
import _, {flow} from 'lodash/fp';

/* lodash-fp/consistent-compose: ["error", "flow"] */
flow(fn1, fn2)(x);
_.flow(fn1, fn2)(x);
```
