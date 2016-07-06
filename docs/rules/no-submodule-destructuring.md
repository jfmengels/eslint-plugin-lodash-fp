# Forbid destructuring of Lodash submodules

It is possible to use destructuring of Lodash modules, but doing it on a submodule will result in unexpected behavior.

### Fail

```js
import {find} from 'lodash/fp/find';
import {find} from 'lodash/find';
import {find as f} from 'lodash/fp/find';
import {find as f} from 'lodash/find';

const {find} = require('lodash/fp/find');
const {find} = require('lodash/find');
const {find: f} = require('lodash/fp/find');
const {find: f} = require('lodash/find');
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

const _ = require('lodash');
const _ = require('lodash/fp');
const find = require('lodash/fp/find');
const find = require('lodash/find');
const {find} = require('lodash/fp');
const {find} = require('lodash');
const {find: f} = require('lodash');
const {find: f} = require('lodash/fp');
```
