# Use lodash/fp instead of Lodash

This rule disallows the use of vanilla Lodash in your code. The aim for this is to avoid mixing both vanilla and fp Lodash in your codebase.

### Fail

```js
import _ from 'lodash';
import _ from 'lodash/bindAll';

const _ = require('lodash');
const _ = require('lodash/bindAll');
```

### Pass

```js
import _ from 'lodash/fp';
import _ from 'lodash/fp/bindAll';

const _ = require('lodash/fp');
const _ = require('lodash/fp/bindAll');
```
