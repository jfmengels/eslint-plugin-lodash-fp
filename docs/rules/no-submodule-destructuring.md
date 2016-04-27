# Forbid destructuring of Lodash submodules

It is possible to use destructuring of Lodash modules, but doing it on a submodule will result in unexpected behavior.

### Fail

```js
import {find} from 'lodash/fp/find';
import {find} from 'lodash/find';
import {find as f} from 'lodash/fp/find';
import {find as f} from 'lodash/find';

var {find} = require('lodash/fp/find');
var {find} = require('lodash/find');
var {find: f} = require('lodash/fp/find');
var {find: f} = require('lodash/find');
```

### Pass

```js
import _ from 'lodash/fp';
import _ from 'lodash';
import find from 'lodash/fp/find';
import find from 'lodash/find';
import {find} from 'lodash/fp';
import {find} from 'lodash';
import {find as f} from 'lodash/fp';
import {find as f} from 'lodash';

var _ = require('lodash');
var _ = require('lodash/fp');
var find = require('lodash/fp/find');
var find = require('lodash/find');
var {find} = require('lodash/fp');
var {find} = require('lodash');
var {find: f} = require('lodash');
var {find: f} = require('lodash/fp');
```
