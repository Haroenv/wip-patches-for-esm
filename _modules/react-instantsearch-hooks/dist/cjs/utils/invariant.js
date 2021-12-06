"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invariant = invariant;

/**
 * Throws an error if the condition is not met in development mode.
 * This is used to make development a better experience to provide guidance as
 * to where the error comes from.
 */
function invariant(condition, message) {
  if (!(process.env.NODE_ENV !== 'production')) {
    return;
  }

  if (!condition) {
    throw new Error("[InstantSearch] ".concat(typeof message === 'function' ? message() : message));
  }
}