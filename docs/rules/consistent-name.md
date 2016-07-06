# Enforce a consistent name for Lodash

Enforce `lodash` or `lodash/fp` to always be imported with the same name. By default, that name is `_`.

## Options

The rule takes one option, a string, which is the name to use `lodash` as. By default, this value is `_`

You can set the option in configuration like this:

```js
"lodash-fp/consistent-name": ["error", "_"]
```

### Fail

```js
import lodash from 'lodash';
import foo from 'lodash/fp';
const bar = require('lodash');
const baz = require('lodash/fp');
```

### Pass

```js
import _ from 'lodash';
import _ from 'lodash/fp';
import find from 'lodash/fp/find';
const _ = require('lodash');
const _ = require('lodash/fp');

/* eslint lodash-fp/consistent-name: ["error", "fp"] */
const fp = require('lodash/fp');
```
