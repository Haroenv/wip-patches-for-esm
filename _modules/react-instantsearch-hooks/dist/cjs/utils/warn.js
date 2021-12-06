"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
exports.warnCache = void 0;
var warnCache = {
  current: {}
};
/**
 * Logs a warning if the condition is not met.
 * This is used to log issues in development environment only.
 */

exports.warnCache = warnCache;

function warn(condition, message) {
  if (!(process.env.NODE_ENV !== 'production')) {
    return;
  }

  if (condition) {
    return;
  }

  var sanitizedMessage = message.trim();
  var hasAlreadyPrinted = warnCache.current[sanitizedMessage];

  if (!hasAlreadyPrinted) {
    warnCache.current[sanitizedMessage] = true;
    var warning = "[InstantSearch] ".concat(sanitizedMessage); // eslint-disable-next-line no-console

    console.warn(warning);
  }
}