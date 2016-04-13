'use strict';

function importHeader(name) {
  return 'import ' + name + ' from "lodash/fp";';
}

module.exports = {
  code: function (content, header) {
    if (header === false) {
      return content;
    }
    if (Array.isArray(header)) {
      return 'import {' + header.join(', ') + '} from "lodash/fp";' + content;
    }
    return importHeader(header || '_') + content;
  }
};
