/*! React InstantSearchHooks 6.16.0 | © Algolia, inc. | https://github.com/algolia/react-instantsearch */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.ReactInstantSearchHooks = {}, global.React));
}(this, function (exports, React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  var version = '6.16.0';

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var IndexContext = /*#__PURE__*/React.createContext(null);

  var InstantSearchContext = /*#__PURE__*/React.createContext(null);

  var global$1 = (typeof global !== "undefined" ? global :
              typeof self !== "undefined" ? self :
              typeof window !== "undefined" ? window : {});

  if (typeof global$1.setTimeout === 'function') ;
  if (typeof global$1.clearTimeout === 'function') ;

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  var performanceNow =
    performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() };

  function clone(value) {
    if (typeof value === 'object' && value !== null) {
      return _merge(Array.isArray(value) ? [] : {}, value);
    }
    return value;
  }

  function isObjectOrArrayOrFunction(value) {
    return (
      typeof value === 'function' ||
      Array.isArray(value) ||
      Object.prototype.toString.call(value) === '[object Object]'
    );
  }

  function _merge(target, source) {
    if (target === source) {
      return target;
    }

    for (var key in source) {
      if (
        !Object.prototype.hasOwnProperty.call(source, key) ||
        key === '__proto__'
      ) {
        continue;
      }

      var sourceVal = source[key];
      var targetVal = target[key];

      if (typeof targetVal !== 'undefined' && typeof sourceVal === 'undefined') {
        continue;
      }

      if (
        isObjectOrArrayOrFunction(targetVal) &&
        isObjectOrArrayOrFunction(sourceVal)
      ) {
        target[key] = _merge(targetVal, sourceVal);
      } else {
        target[key] = clone(sourceVal);
      }
    }
    return target;
  }

  /**
   * This method is like Object.assign, but recursively merges own and inherited
   * enumerable keyed properties of source objects into the destination object.
   *
   * NOTE: this behaves like lodash/merge, but:
   * - does mutate functions if they are a source
   * - treats non-plain objects as plain
   * - does not work for circular objects
   * - treats sparse arrays as sparse
   * - does not convert Array-like objects (Arguments, NodeLists, etc.) to arrays
   *
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   */

  function merge(target) {
    if (!isObjectOrArrayOrFunction(target)) {
      target = {};
    }

    for (var i = 1, l = arguments.length; i < l; i++) {
      var source = arguments[i];

      if (isObjectOrArrayOrFunction(source)) {
        _merge(target, source);
      }
    }
    return target;
  }

  var merge_1 = merge;

  // NOTE: this behaves like lodash/defaults, but doesn't mutate the target
  // it also preserve keys order
  var defaultsPure = function defaultsPure() {
    var sources = Array.prototype.slice.call(arguments);

    return sources.reduceRight(function(acc, source) {
      Object.keys(Object(source)).forEach(function(key) {
        if (source[key] === undefined) {
          return;
        }
        if (acc[key] !== undefined) {
          // remove if already added, so that we can add it in correct order
          delete acc[key];
        }
        acc[key] = source[key];
      });
      return acc;
    }, {});
  };

  function intersection(arr1, arr2) {
    return arr1.filter(function(value, index) {
      return (
        arr2.indexOf(value) > -1 &&
        arr1.indexOf(value) === index /* skips duplicates */
      );
    });
  }

  var intersection_1 = intersection;

  // @MAJOR can be replaced by native Array#find when we change support
  var find = function find(array, comparator) {
    if (!Array.isArray(array)) {
      return undefined;
    }

    for (var i = 0; i < array.length; i++) {
      if (comparator(array[i])) {
        return array[i];
      }
    }
  };

  function valToNumber(v) {
    if (typeof v === 'number') {
      return v;
    } else if (typeof v === 'string') {
      return parseFloat(v);
    } else if (Array.isArray(v)) {
      return v.map(valToNumber);
    }

    throw new Error('The value should be a number, a parsable string or an array of those.');
  }

  var valToNumber_1 = valToNumber;

  // https://github.com/babel/babel/blob/3aaafae053fa75febb3aa45d45b6f00646e30ba4/packages/babel-helpers/src/helpers.js#L604-L620
  function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source === null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key;
    var i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }

  var omit = _objectWithoutPropertiesLoose$1;

  function objectHasKeys(obj) {
    return obj && Object.keys(obj).length > 0;
  }

  var objectHasKeys_1 = objectHasKeys;

  var isValidUserToken = function isValidUserToken(userToken) {
    if (userToken === null) {
      return false;
    }
    return /^[a-zA-Z0-9_-]{1,64}$/.test(userToken);
  };

  /**
   * Functions to manipulate refinement lists
   *
   * The RefinementList is not formally defined through a prototype but is based
   * on a specific structure.
   *
   * @module SearchParameters.refinementList
   *
   * @typedef {string[]} SearchParameters.refinementList.Refinements
   * @typedef {Object.<string, SearchParameters.refinementList.Refinements>} SearchParameters.refinementList.RefinementList
   */





  var lib = {
    /**
     * Adds a refinement to a RefinementList
     * @param {RefinementList} refinementList the initial list
     * @param {string} attribute the attribute to refine
     * @param {string} value the value of the refinement, if the value is not a string it will be converted
     * @return {RefinementList} a new and updated refinement list
     */
    addRefinement: function addRefinement(refinementList, attribute, value) {
      if (lib.isRefined(refinementList, attribute, value)) {
        return refinementList;
      }

      var valueAsString = '' + value;

      var facetRefinement = !refinementList[attribute] ?
        [valueAsString] :
        refinementList[attribute].concat(valueAsString);

      var mod = {};

      mod[attribute] = facetRefinement;

      return defaultsPure({}, mod, refinementList);
    },
    /**
     * Removes refinement(s) for an attribute:
     *  - if the value is specified removes the refinement for the value on the attribute
     *  - if no value is specified removes all the refinements for this attribute
     * @param {RefinementList} refinementList the initial list
     * @param {string} attribute the attribute to refine
     * @param {string} [value] the value of the refinement
     * @return {RefinementList} a new and updated refinement lst
     */
    removeRefinement: function removeRefinement(refinementList, attribute, value) {
      if (value === undefined) {
        // we use the "filter" form of clearRefinement, since it leaves empty values as-is
        // the form with a string will remove the attribute completely
        return lib.clearRefinement(refinementList, function(v, f) {
          return attribute === f;
        });
      }

      var valueAsString = '' + value;

      return lib.clearRefinement(refinementList, function(v, f) {
        return attribute === f && valueAsString === v;
      });
    },
    /**
     * Toggles the refinement value for an attribute.
     * @param {RefinementList} refinementList the initial list
     * @param {string} attribute the attribute to refine
     * @param {string} value the value of the refinement
     * @return {RefinementList} a new and updated list
     */
    toggleRefinement: function toggleRefinement(refinementList, attribute, value) {
      if (value === undefined) throw new Error('toggleRefinement should be used with a value');

      if (lib.isRefined(refinementList, attribute, value)) {
        return lib.removeRefinement(refinementList, attribute, value);
      }

      return lib.addRefinement(refinementList, attribute, value);
    },
    /**
     * Clear all or parts of a RefinementList. Depending on the arguments, three
     * kinds of behavior can happen:
     *  - if no attribute is provided: clears the whole list
     *  - if an attribute is provided as a string: clears the list for the specific attribute
     *  - if an attribute is provided as a function: discards the elements for which the function returns true
     * @param {RefinementList} refinementList the initial list
     * @param {string} [attribute] the attribute or function to discard
     * @param {string} [refinementType] optional parameter to give more context to the attribute function
     * @return {RefinementList} a new and updated refinement list
     */
    clearRefinement: function clearRefinement(refinementList, attribute, refinementType) {
      if (attribute === undefined) {
        if (!objectHasKeys_1(refinementList)) {
          return refinementList;
        }
        return {};
      } else if (typeof attribute === 'string') {
        return omit(refinementList, [attribute]);
      } else if (typeof attribute === 'function') {
        var hasChanged = false;

        var newRefinementList = Object.keys(refinementList).reduce(function(memo, key) {
          var values = refinementList[key] || [];
          var facetList = values.filter(function(value) {
            return !attribute(value, key, refinementType);
          });

          if (facetList.length !== values.length) {
            hasChanged = true;
          }
          memo[key] = facetList;

          return memo;
        }, {});

        if (hasChanged) return newRefinementList;
        return refinementList;
      }
    },
    /**
     * Test if the refinement value is used for the attribute. If no refinement value
     * is provided, test if the refinementList contains any refinement for the
     * given attribute.
     * @param {RefinementList} refinementList the list of refinement
     * @param {string} attribute name of the attribute
     * @param {string} [refinementValue] value of the filter/refinement
     * @return {boolean}
     */
    isRefined: function isRefined(refinementList, attribute, refinementValue) {
      var containsRefinements = !!refinementList[attribute] &&
        refinementList[attribute].length > 0;

      if (refinementValue === undefined || !containsRefinements) {
        return containsRefinements;
      }

      var refinementValueAsString = '' + refinementValue;

      return refinementList[attribute].indexOf(refinementValueAsString) !== -1;
    }
  };

  var RefinementList = lib;

  /**
   * isEqual, but only for numeric refinement values, possible values:
   * - 5
   * - [5]
   * - [[5]]
   * - [[5,5],[4]]
   */
  function isEqualNumericRefinement(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return (
        a.length === b.length &&
        a.every(function(el, i) {
          return isEqualNumericRefinement(b[i], el);
        })
      );
    }
    return a === b;
  }

  /**
   * like _.find but using deep equality to be able to use it
   * to find arrays.
   * @private
   * @param {any[]} array array to search into (elements are base or array of base)
   * @param {any} searchedValue the value we're looking for (base or array of base)
   * @return {any} the searched value or undefined
   */
  function findArray(array, searchedValue) {
    return find(array, function(currentValue) {
      return isEqualNumericRefinement(currentValue, searchedValue);
    });
  }

  /**
   * The facet list is the structure used to store the list of values used to
   * filter a single attribute.
   * @typedef {string[]} SearchParameters.FacetList
   */

  /**
   * Structure to store numeric filters with the operator as the key. The supported operators
   * are `=`, `>`, `<`, `>=`, `<=` and `!=`.
   * @typedef {Object.<string, Array.<number|number[]>>} SearchParameters.OperatorList
   */

  /**
   * SearchParameters is the data structure that contains all the information
   * usable for making a search to Algolia API. It doesn't do the search itself,
   * nor does it contains logic about the parameters.
   * It is an immutable object, therefore it has been created in a way that each
   * changes does not change the object itself but returns a copy with the
   * modification.
   * This object should probably not be instantiated outside of the helper. It will
   * be provided when needed. This object is documented for reference as you'll
   * get it from events generated by the {@link AlgoliaSearchHelper}.
   * If need be, instantiate the Helper from the factory function {@link SearchParameters.make}
   * @constructor
   * @classdesc contains all the parameters of a search
   * @param {object|SearchParameters} newParameters existing parameters or partial object
   * for the properties of a new SearchParameters
   * @see SearchParameters.make
   * @example <caption>SearchParameters of the first query in
   *   <a href="http://demos.algolia.com/instant-search-demo/">the instant search demo</a></caption>
  {
     "query": "",
     "disjunctiveFacets": [
        "customerReviewCount",
        "category",
        "salePrice_range",
        "manufacturer"
    ],
     "maxValuesPerFacet": 30,
     "page": 0,
     "hitsPerPage": 10,
     "facets": [
        "type",
        "shipping"
    ]
  }
   */
  function SearchParameters(newParameters) {
    var params = newParameters ? SearchParameters._parseNumbers(newParameters) : {};

    if (params.userToken !== undefined && !isValidUserToken(params.userToken)) {
      console.warn('[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}');
    }
    /**
     * This attribute contains the list of all the conjunctive facets
     * used. This list will be added to requested facets in the
     * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
     * @member {string[]}
     */
    this.facets = params.facets || [];
    /**
     * This attribute contains the list of all the disjunctive facets
     * used. This list will be added to requested facets in the
     * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
     * @member {string[]}
     */
    this.disjunctiveFacets = params.disjunctiveFacets || [];
    /**
     * This attribute contains the list of all the hierarchical facets
     * used. This list will be added to requested facets in the
     * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
     * Hierarchical facets are a sub type of disjunctive facets that
     * let you filter faceted attributes hierarchically.
     * @member {string[]|object[]}
     */
    this.hierarchicalFacets = params.hierarchicalFacets || [];

    // Refinements
    /**
     * This attribute contains all the filters that need to be
     * applied on the conjunctive facets. Each facet must be properly
     * defined in the `facets` attribute.
     *
     * The key is the name of the facet, and the `FacetList` contains all
     * filters selected for the associated facet name.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `facetFilters` attribute.
     * @member {Object.<string, SearchParameters.FacetList>}
     */
    this.facetsRefinements = params.facetsRefinements || {};
    /**
     * This attribute contains all the filters that need to be
     * excluded from the conjunctive facets. Each facet must be properly
     * defined in the `facets` attribute.
     *
     * The key is the name of the facet, and the `FacetList` contains all
     * filters excluded for the associated facet name.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `facetFilters` attribute.
     * @member {Object.<string, SearchParameters.FacetList>}
     */
    this.facetsExcludes = params.facetsExcludes || {};
    /**
     * This attribute contains all the filters that need to be
     * applied on the disjunctive facets. Each facet must be properly
     * defined in the `disjunctiveFacets` attribute.
     *
     * The key is the name of the facet, and the `FacetList` contains all
     * filters selected for the associated facet name.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `facetFilters` attribute.
     * @member {Object.<string, SearchParameters.FacetList>}
     */
    this.disjunctiveFacetsRefinements = params.disjunctiveFacetsRefinements || {};
    /**
     * This attribute contains all the filters that need to be
     * applied on the numeric attributes.
     *
     * The key is the name of the attribute, and the value is the
     * filters to apply to this attribute.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `numericFilters` attribute.
     * @member {Object.<string, SearchParameters.OperatorList>}
     */
    this.numericRefinements = params.numericRefinements || {};
    /**
     * This attribute contains all the tags used to refine the query.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `tagFilters` attribute.
     * @member {string[]}
     */
    this.tagRefinements = params.tagRefinements || [];
    /**
     * This attribute contains all the filters that need to be
     * applied on the hierarchical facets. Each facet must be properly
     * defined in the `hierarchicalFacets` attribute.
     *
     * The key is the name of the facet, and the `FacetList` contains all
     * filters selected for the associated facet name. The FacetList values
     * are structured as a string that contain the values for each level
     * separated by the configured separator.
     *
     * When querying algolia, the values stored in this attribute will
     * be translated into the `facetFilters` attribute.
     * @member {Object.<string, SearchParameters.FacetList>}
     */
    this.hierarchicalFacetsRefinements = params.hierarchicalFacetsRefinements || {};

    var self = this;
    Object.keys(params).forEach(function(paramName) {
      var isKeyKnown = SearchParameters.PARAMETERS.indexOf(paramName) !== -1;
      var isValueDefined = params[paramName] !== undefined;

      if (!isKeyKnown && isValueDefined) {
        self[paramName] = params[paramName];
      }
    });
  }

  /**
   * List all the properties in SearchParameters and therefore all the known Algolia properties
   * This doesn't contain any beta/hidden features.
   * @private
   */
  SearchParameters.PARAMETERS = Object.keys(new SearchParameters());

  /**
   * @private
   * @param {object} partialState full or part of a state
   * @return {object} a new object with the number keys as number
   */
  SearchParameters._parseNumbers = function(partialState) {
    // Do not reparse numbers in SearchParameters, they ought to be parsed already
    if (partialState instanceof SearchParameters) return partialState;

    var numbers = {};

    var numberKeys = [
      'aroundPrecision',
      'aroundRadius',
      'getRankingInfo',
      'minWordSizefor2Typos',
      'minWordSizefor1Typo',
      'page',
      'maxValuesPerFacet',
      'distinct',
      'minimumAroundRadius',
      'hitsPerPage',
      'minProximity'
    ];

    numberKeys.forEach(function(k) {
      var value = partialState[k];
      if (typeof value === 'string') {
        var parsedValue = parseFloat(value);
        // global isNaN is ok to use here, value is only number or NaN
        numbers[k] = isNaN(parsedValue) ? value : parsedValue;
      }
    });

    // there's two formats of insideBoundingBox, we need to parse
    // the one which is an array of float geo rectangles
    if (Array.isArray(partialState.insideBoundingBox)) {
      numbers.insideBoundingBox = partialState.insideBoundingBox.map(function(geoRect) {
        if (Array.isArray(geoRect)) {
          return geoRect.map(function(value) {
            return parseFloat(value);
          });
        }
        return geoRect;
      });
    }

    if (partialState.numericRefinements) {
      var numericRefinements = {};
      Object.keys(partialState.numericRefinements).forEach(function(attribute) {
        var operators = partialState.numericRefinements[attribute] || {};
        numericRefinements[attribute] = {};
        Object.keys(operators).forEach(function(operator) {
          var values = operators[operator];
          var parsedValues = values.map(function(v) {
            if (Array.isArray(v)) {
              return v.map(function(vPrime) {
                if (typeof vPrime === 'string') {
                  return parseFloat(vPrime);
                }
                return vPrime;
              });
            } else if (typeof v === 'string') {
              return parseFloat(v);
            }
            return v;
          });
          numericRefinements[attribute][operator] = parsedValues;
        });
      });
      numbers.numericRefinements = numericRefinements;
    }

    return merge_1({}, partialState, numbers);
  };

  /**
   * Factory for SearchParameters
   * @param {object|SearchParameters} newParameters existing parameters or partial
   * object for the properties of a new SearchParameters
   * @return {SearchParameters} frozen instance of SearchParameters
   */
  SearchParameters.make = function makeSearchParameters(newParameters) {
    var instance = new SearchParameters(newParameters);

    var hierarchicalFacets = newParameters.hierarchicalFacets || [];
    hierarchicalFacets.forEach(function(facet) {
      if (facet.rootPath) {
        var currentRefinement = instance.getHierarchicalRefinement(facet.name);

        if (currentRefinement.length > 0 && currentRefinement[0].indexOf(facet.rootPath) !== 0) {
          instance = instance.clearRefinements(facet.name);
        }

        // get it again in case it has been cleared
        currentRefinement = instance.getHierarchicalRefinement(facet.name);
        if (currentRefinement.length === 0) {
          instance = instance.toggleHierarchicalFacetRefinement(facet.name, facet.rootPath);
        }
      }
    });

    return instance;
  };

  /**
   * Validates the new parameters based on the previous state
   * @param {SearchParameters} currentState the current state
   * @param {object|SearchParameters} parameters the new parameters to set
   * @return {Error|null} Error if the modification is invalid, null otherwise
   */
  SearchParameters.validate = function(currentState, parameters) {
    var params = parameters || {};

    if (currentState.tagFilters && params.tagRefinements && params.tagRefinements.length > 0) {
      return new Error(
        '[Tags] Cannot switch from the managed tag API to the advanced API. It is probably ' +
        'an error, if it is really what you want, you should first clear the tags with clearTags method.');
    }

    if (currentState.tagRefinements.length > 0 && params.tagFilters) {
      return new Error(
        '[Tags] Cannot switch from the advanced tag API to the managed API. It is probably ' +
        'an error, if it is not, you should first clear the tags with clearTags method.');
    }

    if (
      currentState.numericFilters &&
      params.numericRefinements &&
      objectHasKeys_1(params.numericRefinements)
    ) {
      return new Error(
        "[Numeric filters] Can't switch from the advanced to the managed API. It" +
          ' is probably an error, if this is really what you want, you have to first' +
          ' clear the numeric filters.'
      );
    }

    if (objectHasKeys_1(currentState.numericRefinements) && params.numericFilters) {
      return new Error(
        "[Numeric filters] Can't switch from the managed API to the advanced. It" +
        ' is probably an error, if this is really what you want, you have to first' +
        ' clear the numeric filters.');
    }

    return null;
  };

  SearchParameters.prototype = {
    constructor: SearchParameters,

    /**
     * Remove all refinements (disjunctive + conjunctive + excludes + numeric filters)
     * @method
     * @param {undefined|string|SearchParameters.clearCallback} [attribute] optional string or function
     * - If not given, means to clear all the filters.
     * - If `string`, means to clear all refinements for the `attribute` named filter.
     * - If `function`, means to clear all the refinements that return truthy values.
     * @return {SearchParameters}
     */
    clearRefinements: function clearRefinements(attribute) {
      var patch = {
        numericRefinements: this._clearNumericRefinements(attribute),
        facetsRefinements: RefinementList.clearRefinement(
          this.facetsRefinements,
          attribute,
          'conjunctiveFacet'
        ),
        facetsExcludes: RefinementList.clearRefinement(
          this.facetsExcludes,
          attribute,
          'exclude'
        ),
        disjunctiveFacetsRefinements: RefinementList.clearRefinement(
          this.disjunctiveFacetsRefinements,
          attribute,
          'disjunctiveFacet'
        ),
        hierarchicalFacetsRefinements: RefinementList.clearRefinement(
          this.hierarchicalFacetsRefinements,
          attribute,
          'hierarchicalFacet'
        )
      };
      if (
        patch.numericRefinements === this.numericRefinements &&
        patch.facetsRefinements === this.facetsRefinements &&
        patch.facetsExcludes === this.facetsExcludes &&
        patch.disjunctiveFacetsRefinements === this.disjunctiveFacetsRefinements &&
        patch.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements
      ) {
        return this;
      }
      return this.setQueryParameters(patch);
    },
    /**
     * Remove all the refined tags from the SearchParameters
     * @method
     * @return {SearchParameters}
     */
    clearTags: function clearTags() {
      if (this.tagFilters === undefined && this.tagRefinements.length === 0) return this;

      return this.setQueryParameters({
        tagFilters: undefined,
        tagRefinements: []
      });
    },
    /**
     * Set the index.
     * @method
     * @param {string} index the index name
     * @return {SearchParameters}
     */
    setIndex: function setIndex(index) {
      if (index === this.index) return this;

      return this.setQueryParameters({
        index: index
      });
    },
    /**
     * Query setter
     * @method
     * @param {string} newQuery value for the new query
     * @return {SearchParameters}
     */
    setQuery: function setQuery(newQuery) {
      if (newQuery === this.query) return this;

      return this.setQueryParameters({
        query: newQuery
      });
    },
    /**
     * Page setter
     * @method
     * @param {number} newPage new page number
     * @return {SearchParameters}
     */
    setPage: function setPage(newPage) {
      if (newPage === this.page) return this;

      return this.setQueryParameters({
        page: newPage
      });
    },
    /**
     * Facets setter
     * The facets are the simple facets, used for conjunctive (and) faceting.
     * @method
     * @param {string[]} facets all the attributes of the algolia records used for conjunctive faceting
     * @return {SearchParameters}
     */
    setFacets: function setFacets(facets) {
      return this.setQueryParameters({
        facets: facets
      });
    },
    /**
     * Disjunctive facets setter
     * Change the list of disjunctive (or) facets the helper chan handle.
     * @method
     * @param {string[]} facets all the attributes of the algolia records used for disjunctive faceting
     * @return {SearchParameters}
     */
    setDisjunctiveFacets: function setDisjunctiveFacets(facets) {
      return this.setQueryParameters({
        disjunctiveFacets: facets
      });
    },
    /**
     * HitsPerPage setter
     * Hits per page represents the number of hits retrieved for this query
     * @method
     * @param {number} n number of hits retrieved per page of results
     * @return {SearchParameters}
     */
    setHitsPerPage: function setHitsPerPage(n) {
      if (this.hitsPerPage === n) return this;

      return this.setQueryParameters({
        hitsPerPage: n
      });
    },
    /**
     * typoTolerance setter
     * Set the value of typoTolerance
     * @method
     * @param {string} typoTolerance new value of typoTolerance ("true", "false", "min" or "strict")
     * @return {SearchParameters}
     */
    setTypoTolerance: function setTypoTolerance(typoTolerance) {
      if (this.typoTolerance === typoTolerance) return this;

      return this.setQueryParameters({
        typoTolerance: typoTolerance
      });
    },
    /**
     * Add a numeric filter for a given attribute
     * When value is an array, they are combined with OR
     * When value is a single value, it will combined with AND
     * @method
     * @param {string} attribute attribute to set the filter on
     * @param {string} operator operator of the filter (possible values: =, >, >=, <, <=, !=)
     * @param {number | number[]} value value of the filter
     * @return {SearchParameters}
     * @example
     * // for price = 50 or 40
     * searchparameter.addNumericRefinement('price', '=', [50, 40]);
     * @example
     * // for size = 38 and 40
     * searchparameter.addNumericRefinement('size', '=', 38);
     * searchparameter.addNumericRefinement('size', '=', 40);
     */
    addNumericRefinement: function(attribute, operator, v) {
      var value = valToNumber_1(v);

      if (this.isNumericRefined(attribute, operator, value)) return this;

      var mod = merge_1({}, this.numericRefinements);

      mod[attribute] = merge_1({}, mod[attribute]);

      if (mod[attribute][operator]) {
        // Array copy
        mod[attribute][operator] = mod[attribute][operator].slice();
        // Add the element. Concat can't be used here because value can be an array.
        mod[attribute][operator].push(value);
      } else {
        mod[attribute][operator] = [value];
      }

      return this.setQueryParameters({
        numericRefinements: mod
      });
    },
    /**
     * Get the list of conjunctive refinements for a single facet
     * @param {string} facetName name of the attribute used for faceting
     * @return {string[]} list of refinements
     */
    getConjunctiveRefinements: function(facetName) {
      if (!this.isConjunctiveFacet(facetName)) {
        return [];
      }
      return this.facetsRefinements[facetName] || [];
    },
    /**
     * Get the list of disjunctive refinements for a single facet
     * @param {string} facetName name of the attribute used for faceting
     * @return {string[]} list of refinements
     */
    getDisjunctiveRefinements: function(facetName) {
      if (!this.isDisjunctiveFacet(facetName)) {
        return [];
      }
      return this.disjunctiveFacetsRefinements[facetName] || [];
    },
    /**
     * Get the list of hierarchical refinements for a single facet
     * @param {string} facetName name of the attribute used for faceting
     * @return {string[]} list of refinements
     */
    getHierarchicalRefinement: function(facetName) {
      // we send an array but we currently do not support multiple
      // hierarchicalRefinements for a hierarchicalFacet
      return this.hierarchicalFacetsRefinements[facetName] || [];
    },
    /**
     * Get the list of exclude refinements for a single facet
     * @param {string} facetName name of the attribute used for faceting
     * @return {string[]} list of refinements
     */
    getExcludeRefinements: function(facetName) {
      if (!this.isConjunctiveFacet(facetName)) {
        return [];
      }
      return this.facetsExcludes[facetName] || [];
    },

    /**
     * Remove all the numeric filter for a given (attribute, operator)
     * @method
     * @param {string} attribute attribute to set the filter on
     * @param {string} [operator] operator of the filter (possible values: =, >, >=, <, <=, !=)
     * @param {number} [number] the value to be removed
     * @return {SearchParameters}
     */
    removeNumericRefinement: function(attribute, operator, paramValue) {
      if (paramValue !== undefined) {
        if (!this.isNumericRefined(attribute, operator, paramValue)) {
          return this;
        }
        return this.setQueryParameters({
          numericRefinements: this._clearNumericRefinements(function(value, key) {
            return (
              key === attribute &&
              value.op === operator &&
              isEqualNumericRefinement(value.val, valToNumber_1(paramValue))
            );
          })
        });
      } else if (operator !== undefined) {
        if (!this.isNumericRefined(attribute, operator)) return this;
        return this.setQueryParameters({
          numericRefinements: this._clearNumericRefinements(function(value, key) {
            return key === attribute && value.op === operator;
          })
        });
      }

      if (!this.isNumericRefined(attribute)) return this;
      return this.setQueryParameters({
        numericRefinements: this._clearNumericRefinements(function(value, key) {
          return key === attribute;
        })
      });
    },
    /**
     * Get the list of numeric refinements for a single facet
     * @param {string} facetName name of the attribute used for faceting
     * @return {SearchParameters.OperatorList} list of refinements
     */
    getNumericRefinements: function(facetName) {
      return this.numericRefinements[facetName] || {};
    },
    /**
     * Return the current refinement for the (attribute, operator)
     * @param {string} attribute attribute in the record
     * @param {string} operator operator applied on the refined values
     * @return {Array.<number|number[]>} refined values
     */
    getNumericRefinement: function(attribute, operator) {
      return this.numericRefinements[attribute] && this.numericRefinements[attribute][operator];
    },
    /**
     * Clear numeric filters.
     * @method
     * @private
     * @param {string|SearchParameters.clearCallback} [attribute] optional string or function
     * - If not given, means to clear all the filters.
     * - If `string`, means to clear all refinements for the `attribute` named filter.
     * - If `function`, means to clear all the refinements that return truthy values.
     * @return {Object.<string, OperatorList>}
     */
    _clearNumericRefinements: function _clearNumericRefinements(attribute) {
      if (attribute === undefined) {
        if (!objectHasKeys_1(this.numericRefinements)) {
          return this.numericRefinements;
        }
        return {};
      } else if (typeof attribute === 'string') {
        return omit(this.numericRefinements, [attribute]);
      } else if (typeof attribute === 'function') {
        var hasChanged = false;
        var numericRefinements = this.numericRefinements;
        var newNumericRefinements = Object.keys(numericRefinements).reduce(function(memo, key) {
          var operators = numericRefinements[key];
          var operatorList = {};

          operators = operators || {};
          Object.keys(operators).forEach(function(operator) {
            var values = operators[operator] || [];
            var outValues = [];
            values.forEach(function(value) {
              var predicateResult = attribute({val: value, op: operator}, key, 'numeric');
              if (!predicateResult) outValues.push(value);
            });
            if (outValues.length !== values.length) {
              hasChanged = true;
            }
            operatorList[operator] = outValues;
          });

          memo[key] = operatorList;

          return memo;
        }, {});

        if (hasChanged) return newNumericRefinements;
        return this.numericRefinements;
      }
    },
    /**
     * Add a facet to the facets attribute of the helper configuration, if it
     * isn't already present.
     * @method
     * @param {string} facet facet name to add
     * @return {SearchParameters}
     */
    addFacet: function addFacet(facet) {
      if (this.isConjunctiveFacet(facet)) {
        return this;
      }

      return this.setQueryParameters({
        facets: this.facets.concat([facet])
      });
    },
    /**
     * Add a disjunctive facet to the disjunctiveFacets attribute of the helper
     * configuration, if it isn't already present.
     * @method
     * @param {string} facet disjunctive facet name to add
     * @return {SearchParameters}
     */
    addDisjunctiveFacet: function addDisjunctiveFacet(facet) {
      if (this.isDisjunctiveFacet(facet)) {
        return this;
      }

      return this.setQueryParameters({
        disjunctiveFacets: this.disjunctiveFacets.concat([facet])
      });
    },
    /**
     * Add a hierarchical facet to the hierarchicalFacets attribute of the helper
     * configuration.
     * @method
     * @param {object} hierarchicalFacet hierarchical facet to add
     * @return {SearchParameters}
     * @throws will throw an error if a hierarchical facet with the same name was already declared
     */
    addHierarchicalFacet: function addHierarchicalFacet(hierarchicalFacet) {
      if (this.isHierarchicalFacet(hierarchicalFacet.name)) {
        throw new Error(
          'Cannot declare two hierarchical facets with the same name: `' + hierarchicalFacet.name + '`');
      }

      return this.setQueryParameters({
        hierarchicalFacets: this.hierarchicalFacets.concat([hierarchicalFacet])
      });
    },
    /**
     * Add a refinement on a "normal" facet
     * @method
     * @param {string} facet attribute to apply the faceting on
     * @param {string} value value of the attribute (will be converted to string)
     * @return {SearchParameters}
     */
    addFacetRefinement: function addFacetRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }
      if (RefinementList.isRefined(this.facetsRefinements, facet, value)) return this;

      return this.setQueryParameters({
        facetsRefinements: RefinementList.addRefinement(this.facetsRefinements, facet, value)
      });
    },
    /**
     * Exclude a value from a "normal" facet
     * @method
     * @param {string} facet attribute to apply the exclusion on
     * @param {string} value value of the attribute (will be converted to string)
     * @return {SearchParameters}
     */
    addExcludeRefinement: function addExcludeRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }
      if (RefinementList.isRefined(this.facetsExcludes, facet, value)) return this;

      return this.setQueryParameters({
        facetsExcludes: RefinementList.addRefinement(this.facetsExcludes, facet, value)
      });
    },
    /**
     * Adds a refinement on a disjunctive facet.
     * @method
     * @param {string} facet attribute to apply the faceting on
     * @param {string} value value of the attribute (will be converted to string)
     * @return {SearchParameters}
     */
    addDisjunctiveFacetRefinement: function addDisjunctiveFacetRefinement(facet, value) {
      if (!this.isDisjunctiveFacet(facet)) {
        throw new Error(
          facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
      }

      if (RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)) return this;

      return this.setQueryParameters({
        disjunctiveFacetsRefinements: RefinementList.addRefinement(
          this.disjunctiveFacetsRefinements, facet, value)
      });
    },
    /**
     * addTagRefinement adds a tag to the list used to filter the results
     * @param {string} tag tag to be added
     * @return {SearchParameters}
     */
    addTagRefinement: function addTagRefinement(tag) {
      if (this.isTagRefined(tag)) return this;

      var modification = {
        tagRefinements: this.tagRefinements.concat(tag)
      };

      return this.setQueryParameters(modification);
    },
    /**
     * Remove a facet from the facets attribute of the helper configuration, if it
     * is present.
     * @method
     * @param {string} facet facet name to remove
     * @return {SearchParameters}
     */
    removeFacet: function removeFacet(facet) {
      if (!this.isConjunctiveFacet(facet)) {
        return this;
      }

      return this.clearRefinements(facet).setQueryParameters({
        facets: this.facets.filter(function(f) {
          return f !== facet;
        })
      });
    },
    /**
     * Remove a disjunctive facet from the disjunctiveFacets attribute of the
     * helper configuration, if it is present.
     * @method
     * @param {string} facet disjunctive facet name to remove
     * @return {SearchParameters}
     */
    removeDisjunctiveFacet: function removeDisjunctiveFacet(facet) {
      if (!this.isDisjunctiveFacet(facet)) {
        return this;
      }

      return this.clearRefinements(facet).setQueryParameters({
        disjunctiveFacets: this.disjunctiveFacets.filter(function(f) {
          return f !== facet;
        })
      });
    },
    /**
     * Remove a hierarchical facet from the hierarchicalFacets attribute of the
     * helper configuration, if it is present.
     * @method
     * @param {string} facet hierarchical facet name to remove
     * @return {SearchParameters}
     */
    removeHierarchicalFacet: function removeHierarchicalFacet(facet) {
      if (!this.isHierarchicalFacet(facet)) {
        return this;
      }

      return this.clearRefinements(facet).setQueryParameters({
        hierarchicalFacets: this.hierarchicalFacets.filter(function(f) {
          return f.name !== facet;
        })
      });
    },
    /**
     * Remove a refinement set on facet. If a value is provided, it will clear the
     * refinement for the given value, otherwise it will clear all the refinement
     * values for the faceted attribute.
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {string} [value] value used to filter
     * @return {SearchParameters}
     */
    removeFacetRefinement: function removeFacetRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }
      if (!RefinementList.isRefined(this.facetsRefinements, facet, value)) return this;

      return this.setQueryParameters({
        facetsRefinements: RefinementList.removeRefinement(this.facetsRefinements, facet, value)
      });
    },
    /**
     * Remove a negative refinement on a facet
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {string} value value used to filter
     * @return {SearchParameters}
     */
    removeExcludeRefinement: function removeExcludeRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }
      if (!RefinementList.isRefined(this.facetsExcludes, facet, value)) return this;

      return this.setQueryParameters({
        facetsExcludes: RefinementList.removeRefinement(this.facetsExcludes, facet, value)
      });
    },
    /**
     * Remove a refinement on a disjunctive facet
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {string} value value used to filter
     * @return {SearchParameters}
     */
    removeDisjunctiveFacetRefinement: function removeDisjunctiveFacetRefinement(facet, value) {
      if (!this.isDisjunctiveFacet(facet)) {
        throw new Error(
          facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
      }
      if (!RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)) return this;

      return this.setQueryParameters({
        disjunctiveFacetsRefinements: RefinementList.removeRefinement(
          this.disjunctiveFacetsRefinements, facet, value)
      });
    },
    /**
     * Remove a tag from the list of tag refinements
     * @method
     * @param {string} tag the tag to remove
     * @return {SearchParameters}
     */
    removeTagRefinement: function removeTagRefinement(tag) {
      if (!this.isTagRefined(tag)) return this;

      var modification = {
        tagRefinements: this.tagRefinements.filter(function(t) {
          return t !== tag;
        })
      };

      return this.setQueryParameters(modification);
    },
    /**
     * Generic toggle refinement method to use with facet, disjunctive facets
     * and hierarchical facets
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     * @return {SearchParameters}
     * @throws will throw an error if the facet is not declared in the settings of the helper
     * @deprecated since version 2.19.0, see {@link SearchParameters#toggleFacetRefinement}
     */
    toggleRefinement: function toggleRefinement(facet, value) {
      return this.toggleFacetRefinement(facet, value);
    },
    /**
     * Generic toggle refinement method to use with facet, disjunctive facets
     * and hierarchical facets
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     * @return {SearchParameters}
     * @throws will throw an error if the facet is not declared in the settings of the helper
     */
    toggleFacetRefinement: function toggleFacetRefinement(facet, value) {
      if (this.isHierarchicalFacet(facet)) {
        return this.toggleHierarchicalFacetRefinement(facet, value);
      } else if (this.isConjunctiveFacet(facet)) {
        return this.toggleConjunctiveFacetRefinement(facet, value);
      } else if (this.isDisjunctiveFacet(facet)) {
        return this.toggleDisjunctiveFacetRefinement(facet, value);
      }

      throw new Error('Cannot refine the undeclared facet ' + facet +
        '; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets');
    },
    /**
     * Switch the refinement applied over a facet/value
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {SearchParameters}
     */
    toggleConjunctiveFacetRefinement: function toggleConjunctiveFacetRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }

      return this.setQueryParameters({
        facetsRefinements: RefinementList.toggleRefinement(this.facetsRefinements, facet, value)
      });
    },
    /**
     * Switch the refinement applied over a facet/value
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {SearchParameters}
     */
    toggleExcludeFacetRefinement: function toggleExcludeFacetRefinement(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
      }

      return this.setQueryParameters({
        facetsExcludes: RefinementList.toggleRefinement(this.facetsExcludes, facet, value)
      });
    },
    /**
     * Switch the refinement applied over a facet/value
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {SearchParameters}
     */
    toggleDisjunctiveFacetRefinement: function toggleDisjunctiveFacetRefinement(facet, value) {
      if (!this.isDisjunctiveFacet(facet)) {
        throw new Error(
          facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
      }

      return this.setQueryParameters({
        disjunctiveFacetsRefinements: RefinementList.toggleRefinement(
          this.disjunctiveFacetsRefinements, facet, value)
      });
    },
    /**
     * Switch the refinement applied over a facet/value
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {SearchParameters}
     */
    toggleHierarchicalFacetRefinement: function toggleHierarchicalFacetRefinement(facet, value) {
      if (!this.isHierarchicalFacet(facet)) {
        throw new Error(
          facet + ' is not defined in the hierarchicalFacets attribute of the helper configuration');
      }

      var separator = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(facet));

      var mod = {};

      var upOneOrMultipleLevel = this.hierarchicalFacetsRefinements[facet] !== undefined &&
        this.hierarchicalFacetsRefinements[facet].length > 0 && (
        // remove current refinement:
        // refinement was 'beer > IPA', call is toggleRefine('beer > IPA'), refinement should be `beer`
        this.hierarchicalFacetsRefinements[facet][0] === value ||
        // remove a parent refinement of the current refinement:
        //  - refinement was 'beer > IPA > Flying dog'
        //  - call is toggleRefine('beer > IPA')
        //  - refinement should be `beer`
        this.hierarchicalFacetsRefinements[facet][0].indexOf(value + separator) === 0
      );

      if (upOneOrMultipleLevel) {
        if (value.indexOf(separator) === -1) {
          // go back to root level
          mod[facet] = [];
        } else {
          mod[facet] = [value.slice(0, value.lastIndexOf(separator))];
        }
      } else {
        mod[facet] = [value];
      }

      return this.setQueryParameters({
        hierarchicalFacetsRefinements: defaultsPure({}, mod, this.hierarchicalFacetsRefinements)
      });
    },

    /**
     * Adds a refinement on a hierarchical facet.
     * @param {string} facet the facet name
     * @param {string} path the hierarchical facet path
     * @return {SearchParameter} the new state
     * @throws Error if the facet is not defined or if the facet is refined
     */
    addHierarchicalFacetRefinement: function(facet, path) {
      if (this.isHierarchicalFacetRefined(facet)) {
        throw new Error(facet + ' is already refined.');
      }
      if (!this.isHierarchicalFacet(facet)) {
        throw new Error(facet + ' is not defined in the hierarchicalFacets attribute of the helper configuration.');
      }
      var mod = {};
      mod[facet] = [path];
      return this.setQueryParameters({
        hierarchicalFacetsRefinements: defaultsPure({}, mod, this.hierarchicalFacetsRefinements)
      });
    },

    /**
     * Removes the refinement set on a hierarchical facet.
     * @param {string} facet the facet name
     * @return {SearchParameter} the new state
     * @throws Error if the facet is not defined or if the facet is not refined
     */
    removeHierarchicalFacetRefinement: function(facet) {
      if (!this.isHierarchicalFacetRefined(facet)) {
        return this;
      }
      var mod = {};
      mod[facet] = [];
      return this.setQueryParameters({
        hierarchicalFacetsRefinements: defaultsPure({}, mod, this.hierarchicalFacetsRefinements)
      });
    },
    /**
     * Switch the tag refinement
     * @method
     * @param {string} tag the tag to remove or add
     * @return {SearchParameters}
     */
    toggleTagRefinement: function toggleTagRefinement(tag) {
      if (this.isTagRefined(tag)) {
        return this.removeTagRefinement(tag);
      }

      return this.addTagRefinement(tag);
    },
    /**
     * Test if the facet name is from one of the disjunctive facets
     * @method
     * @param {string} facet facet name to test
     * @return {boolean}
     */
    isDisjunctiveFacet: function(facet) {
      return this.disjunctiveFacets.indexOf(facet) > -1;
    },
    /**
     * Test if the facet name is from one of the hierarchical facets
     * @method
     * @param {string} facetName facet name to test
     * @return {boolean}
     */
    isHierarchicalFacet: function(facetName) {
      return this.getHierarchicalFacetByName(facetName) !== undefined;
    },
    /**
     * Test if the facet name is from one of the conjunctive/normal facets
     * @method
     * @param {string} facet facet name to test
     * @return {boolean}
     */
    isConjunctiveFacet: function(facet) {
      return this.facets.indexOf(facet) > -1;
    },
    /**
     * Returns true if the facet is refined, either for a specific value or in
     * general.
     * @method
     * @param {string} facet name of the attribute for used for faceting
     * @param {string} value, optional value. If passed will test that this value
     * is filtering the given facet.
     * @return {boolean} returns true if refined
     */
    isFacetRefined: function isFacetRefined(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        return false;
      }
      return RefinementList.isRefined(this.facetsRefinements, facet, value);
    },
    /**
     * Returns true if the facet contains exclusions or if a specific value is
     * excluded.
     *
     * @method
     * @param {string} facet name of the attribute for used for faceting
     * @param {string} [value] optional value. If passed will test that this value
     * is filtering the given facet.
     * @return {boolean} returns true if refined
     */
    isExcludeRefined: function isExcludeRefined(facet, value) {
      if (!this.isConjunctiveFacet(facet)) {
        return false;
      }
      return RefinementList.isRefined(this.facetsExcludes, facet, value);
    },
    /**
     * Returns true if the facet contains a refinement, or if a value passed is a
     * refinement for the facet.
     * @method
     * @param {string} facet name of the attribute for used for faceting
     * @param {string} value optional, will test if the value is used for refinement
     * if there is one, otherwise will test if the facet contains any refinement
     * @return {boolean}
     */
    isDisjunctiveFacetRefined: function isDisjunctiveFacetRefined(facet, value) {
      if (!this.isDisjunctiveFacet(facet)) {
        return false;
      }
      return RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value);
    },
    /**
     * Returns true if the facet contains a refinement, or if a value passed is a
     * refinement for the facet.
     * @method
     * @param {string} facet name of the attribute for used for faceting
     * @param {string} value optional, will test if the value is used for refinement
     * if there is one, otherwise will test if the facet contains any refinement
     * @return {boolean}
     */
    isHierarchicalFacetRefined: function isHierarchicalFacetRefined(facet, value) {
      if (!this.isHierarchicalFacet(facet)) {
        return false;
      }

      var refinements = this.getHierarchicalRefinement(facet);

      if (!value) {
        return refinements.length > 0;
      }

      return refinements.indexOf(value) !== -1;
    },
    /**
     * Test if the triple (attribute, operator, value) is already refined.
     * If only the attribute and the operator are provided, it tests if the
     * contains any refinement value.
     * @method
     * @param {string} attribute attribute for which the refinement is applied
     * @param {string} [operator] operator of the refinement
     * @param {string} [value] value of the refinement
     * @return {boolean} true if it is refined
     */
    isNumericRefined: function isNumericRefined(attribute, operator, value) {
      if (value === undefined && operator === undefined) {
        return !!this.numericRefinements[attribute];
      }

      var isOperatorDefined =
        this.numericRefinements[attribute] &&
        this.numericRefinements[attribute][operator] !== undefined;

      if (value === undefined || !isOperatorDefined) {
        return isOperatorDefined;
      }

      var parsedValue = valToNumber_1(value);
      var isAttributeValueDefined =
        findArray(this.numericRefinements[attribute][operator], parsedValue) !==
        undefined;

      return isOperatorDefined && isAttributeValueDefined;
    },
    /**
     * Returns true if the tag refined, false otherwise
     * @method
     * @param {string} tag the tag to check
     * @return {boolean}
     */
    isTagRefined: function isTagRefined(tag) {
      return this.tagRefinements.indexOf(tag) !== -1;
    },
    /**
     * Returns the list of all disjunctive facets refined
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {string[]}
     */
    getRefinedDisjunctiveFacets: function getRefinedDisjunctiveFacets() {
      var self = this;

      // attributes used for numeric filter can also be disjunctive
      var disjunctiveNumericRefinedFacets = intersection_1(
        Object.keys(this.numericRefinements).filter(function(facet) {
          return Object.keys(self.numericRefinements[facet]).length > 0;
        }),
        this.disjunctiveFacets
      );

      return Object.keys(this.disjunctiveFacetsRefinements).filter(function(facet) {
        return self.disjunctiveFacetsRefinements[facet].length > 0;
      })
        .concat(disjunctiveNumericRefinedFacets)
        .concat(this.getRefinedHierarchicalFacets());
    },
    /**
     * Returns the list of all disjunctive facets refined
     * @method
     * @param {string} facet name of the attribute used for faceting
     * @param {value} value value used for filtering
     * @return {string[]}
     */
    getRefinedHierarchicalFacets: function getRefinedHierarchicalFacets() {
      var self = this;
      return intersection_1(
        // enforce the order between the two arrays,
        // so that refinement name index === hierarchical facet index
        this.hierarchicalFacets.map(function(facet) { return facet.name; }),
        Object.keys(this.hierarchicalFacetsRefinements).filter(function(facet) {
          return self.hierarchicalFacetsRefinements[facet].length > 0;
        })
      );
    },
    /**
     * Returned the list of all disjunctive facets not refined
     * @method
     * @return {string[]}
     */
    getUnrefinedDisjunctiveFacets: function() {
      var refinedFacets = this.getRefinedDisjunctiveFacets();

      return this.disjunctiveFacets.filter(function(f) {
        return refinedFacets.indexOf(f) === -1;
      });
    },

    managedParameters: [
      'index',

      'facets',
      'disjunctiveFacets',
      'facetsRefinements',
      'hierarchicalFacets',
      'facetsExcludes',

      'disjunctiveFacetsRefinements',
      'numericRefinements',
      'tagRefinements',
      'hierarchicalFacetsRefinements'
    ],
    getQueryParams: function getQueryParams() {
      var managedParameters = this.managedParameters;

      var queryParams = {};

      var self = this;
      Object.keys(this).forEach(function(paramName) {
        var paramValue = self[paramName];
        if (managedParameters.indexOf(paramName) === -1 && paramValue !== undefined) {
          queryParams[paramName] = paramValue;
        }
      });

      return queryParams;
    },
    /**
     * Let the user set a specific value for a given parameter. Will return the
     * same instance if the parameter is invalid or if the value is the same as the
     * previous one.
     * @method
     * @param {string} parameter the parameter name
     * @param {any} value the value to be set, must be compliant with the definition
     * of the attribute on the object
     * @return {SearchParameters} the updated state
     */
    setQueryParameter: function setParameter(parameter, value) {
      if (this[parameter] === value) return this;

      var modification = {};

      modification[parameter] = value;

      return this.setQueryParameters(modification);
    },
    /**
     * Let the user set any of the parameters with a plain object.
     * @method
     * @param {object} params all the keys and the values to be updated
     * @return {SearchParameters} a new updated instance
     */
    setQueryParameters: function setQueryParameters(params) {
      if (!params) return this;

      var error = SearchParameters.validate(this, params);

      if (error) {
        throw error;
      }

      var self = this;
      var nextWithNumbers = SearchParameters._parseNumbers(params);
      var previousPlainObject = Object.keys(this).reduce(function(acc, key) {
        acc[key] = self[key];
        return acc;
      }, {});

      var nextPlainObject = Object.keys(nextWithNumbers).reduce(
        function(previous, key) {
          var isPreviousValueDefined = previous[key] !== undefined;
          var isNextValueDefined = nextWithNumbers[key] !== undefined;

          if (isPreviousValueDefined && !isNextValueDefined) {
            return omit(previous, [key]);
          }

          if (isNextValueDefined) {
            previous[key] = nextWithNumbers[key];
          }

          return previous;
        },
        previousPlainObject
      );

      return new this.constructor(nextPlainObject);
    },

    /**
     * Returns a new instance with the page reset. Two scenarios possible:
     * the page is omitted -> return the given instance
     * the page is set -> return a new instance with a page of 0
     * @return {SearchParameters} a new updated instance
     */
    resetPage: function() {
      if (this.page === undefined) {
        return this;
      }

      return this.setPage(0);
    },

    /**
     * Helper function to get the hierarchicalFacet separator or the default one (`>`)
     * @param  {object} hierarchicalFacet
     * @return {string} returns the hierarchicalFacet.separator or `>` as default
     */
    _getHierarchicalFacetSortBy: function(hierarchicalFacet) {
      return hierarchicalFacet.sortBy || ['isRefined:desc', 'name:asc'];
    },

    /**
     * Helper function to get the hierarchicalFacet separator or the default one (`>`)
     * @private
     * @param  {object} hierarchicalFacet
     * @return {string} returns the hierarchicalFacet.separator or `>` as default
     */
    _getHierarchicalFacetSeparator: function(hierarchicalFacet) {
      return hierarchicalFacet.separator || ' > ';
    },

    /**
     * Helper function to get the hierarchicalFacet prefix path or null
     * @private
     * @param  {object} hierarchicalFacet
     * @return {string} returns the hierarchicalFacet.rootPath or null as default
     */
    _getHierarchicalRootPath: function(hierarchicalFacet) {
      return hierarchicalFacet.rootPath || null;
    },

    /**
     * Helper function to check if we show the parent level of the hierarchicalFacet
     * @private
     * @param  {object} hierarchicalFacet
     * @return {string} returns the hierarchicalFacet.showParentLevel or true as default
     */
    _getHierarchicalShowParentLevel: function(hierarchicalFacet) {
      if (typeof hierarchicalFacet.showParentLevel === 'boolean') {
        return hierarchicalFacet.showParentLevel;
      }
      return true;
    },

    /**
     * Helper function to get the hierarchicalFacet by it's name
     * @param  {string} hierarchicalFacetName
     * @return {object} a hierarchicalFacet
     */
    getHierarchicalFacetByName: function(hierarchicalFacetName) {
      return find(
        this.hierarchicalFacets,
        function(f) {
          return f.name === hierarchicalFacetName;
        }
      );
    },

    /**
     * Get the current breadcrumb for a hierarchical facet, as an array
     * @param  {string} facetName Hierarchical facet name
     * @return {array.<string>} the path as an array of string
     */
    getHierarchicalFacetBreadcrumb: function(facetName) {
      if (!this.isHierarchicalFacet(facetName)) {
        return [];
      }

      var refinement = this.getHierarchicalRefinement(facetName)[0];
      if (!refinement) return [];

      var separator = this._getHierarchicalFacetSeparator(
        this.getHierarchicalFacetByName(facetName)
      );
      var path = refinement.split(separator);
      return path.map(function(part) {
        return part.trim();
      });
    },

    toString: function() {
      return JSON.stringify(this, null, 2);
    }
  };

  /**
   * Callback used for clearRefinement method
   * @callback SearchParameters.clearCallback
   * @param {OperatorList|FacetList} value the value of the filter
   * @param {string} key the current attribute name
   * @param {string} type `numeric`, `disjunctiveFacet`, `conjunctiveFacet`, `hierarchicalFacet` or `exclude`
   * depending on the type of facet
   * @return {boolean} `true` if the element should be removed. `false` otherwise.
   */
  var SearchParameters_1 = SearchParameters;

  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== undefined;
      var valIsNull = value === null;

      var othIsDefined = other !== undefined;
      var othIsNull = other === null;

      if (
        (!othIsNull && value > other) ||
        (valIsNull && othIsDefined) ||
        !valIsDefined
      ) {
        return 1;
      }
      if (
        (!valIsNull && value < other) ||
        (othIsNull && valIsDefined) ||
        !othIsDefined
      ) {
        return -1;
      }
    }
    return 0;
  }

  /**
   * @param {Array<object>} collection object with keys in attributes
   * @param {Array<string>} iteratees attributes
   * @param {Array<string>} orders asc | desc
   */
  function orderBy(collection, iteratees, orders) {
    if (!Array.isArray(collection)) {
      return [];
    }

    if (!Array.isArray(orders)) {
      orders = [];
    }

    var result = collection.map(function(value, index) {
      return {
        criteria: iteratees.map(function(iteratee) {
          return value[iteratee];
        }),
        index: index,
        value: value
      };
    });

    result.sort(function comparer(object, other) {
      var index = -1;

      while (++index < object.criteria.length) {
        var res = compareAscending(object.criteria[index], other.criteria[index]);
        if (res) {
          if (index >= orders.length) {
            return res;
          }
          if (orders[index] === 'desc') {
            return -res;
          }
          return res;
        }
      }

      // This ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    });

    return result.map(function(res) {
      return res.value;
    });
  }

  var orderBy_1 = orderBy;

  var compact = function compact(array) {
    if (!Array.isArray(array)) {
      return [];
    }

    return array.filter(Boolean);
  };

  // @MAJOR can be replaced by native Array#findIndex when we change support
  var findIndex = function find(array, comparator) {
    if (!Array.isArray(array)) {
      return -1;
    }

    for (var i = 0; i < array.length; i++) {
      if (comparator(array[i])) {
        return i;
      }
    }
    return -1;
  };

  /**
   * Transform sort format from user friendly notation to lodash format
   * @param {string[]} sortBy array of predicate of the form "attribute:order"
   * @param {string[]} [defaults] array of predicate of the form "attribute:order"
   * @return {array.<string[]>} array containing 2 elements : attributes, orders
   */
  var formatSort = function formatSort(sortBy, defaults) {
    var defaultInstructions = (defaults || []).map(function(sort) {
      return sort.split(':');
    });

    return sortBy.reduce(
      function preparePredicate(out, sort) {
        var sortInstruction = sort.split(':');

        var matchingDefault = find(defaultInstructions, function(
          defaultInstruction
        ) {
          return defaultInstruction[0] === sortInstruction[0];
        });

        if (sortInstruction.length > 1 || !matchingDefault) {
          out[0].push(sortInstruction[0]);
          out[1].push(sortInstruction[1]);
          return out;
        }

        out[0].push(matchingDefault[0]);
        out[1].push(matchingDefault[1]);
        return out;
      },
      [[], []]
    );
  };

  var generateHierarchicalTree_1 = generateTrees;





  function generateTrees(state) {
    return function generate(hierarchicalFacetResult, hierarchicalFacetIndex) {
      var hierarchicalFacet = state.hierarchicalFacets[hierarchicalFacetIndex];
      var hierarchicalFacetRefinement =
        (state.hierarchicalFacetsRefinements[hierarchicalFacet.name] &&
          state.hierarchicalFacetsRefinements[hierarchicalFacet.name][0]) ||
        '';
      var hierarchicalSeparator = state._getHierarchicalFacetSeparator(
        hierarchicalFacet
      );
      var hierarchicalRootPath = state._getHierarchicalRootPath(
        hierarchicalFacet
      );
      var hierarchicalShowParentLevel = state._getHierarchicalShowParentLevel(
        hierarchicalFacet
      );
      var sortBy = formatSort(
        state._getHierarchicalFacetSortBy(hierarchicalFacet)
      );

      var rootExhaustive = hierarchicalFacetResult.every(function(facetResult) {
        return facetResult.exhaustive;
      });

      var generateTreeFn = generateHierarchicalTree(
        sortBy,
        hierarchicalSeparator,
        hierarchicalRootPath,
        hierarchicalShowParentLevel,
        hierarchicalFacetRefinement
      );

      var results = hierarchicalFacetResult;

      if (hierarchicalRootPath) {
        results = hierarchicalFacetResult.slice(
          hierarchicalRootPath.split(hierarchicalSeparator).length
        );
      }

      return results.reduce(generateTreeFn, {
        name: state.hierarchicalFacets[hierarchicalFacetIndex].name,
        count: null, // root level, no count
        isRefined: true, // root level, always refined
        path: null, // root level, no path
        exhaustive: rootExhaustive,
        data: null
      });
    };
  }

  function generateHierarchicalTree(
    sortBy,
    hierarchicalSeparator,
    hierarchicalRootPath,
    hierarchicalShowParentLevel,
    currentRefinement
  ) {
    return function generateTree(
      hierarchicalTree,
      hierarchicalFacetResult,
      currentHierarchicalLevel
    ) {
      var parent = hierarchicalTree;

      if (currentHierarchicalLevel > 0) {
        var level = 0;

        parent = hierarchicalTree;

        while (level < currentHierarchicalLevel) {
          /**
           * @type {object[]]} hierarchical data
           */
          var data = parent && Array.isArray(parent.data) ? parent.data : [];
          parent = find(data, function(subtree) {
            return subtree.isRefined;
          });
          level++;
        }
      }

      // we found a refined parent, let's add current level data under it
      if (parent) {
        // filter values in case an object has multiple categories:
        //   {
        //     categories: {
        //       level0: ['beers', 'bières'],
        //       level1: ['beers > IPA', 'bières > Belges']
        //     }
        //   }
        //
        // If parent refinement is `beers`, then we do not want to have `bières > Belges`
        // showing up

        var picked = Object.keys(hierarchicalFacetResult.data)
          .map(function(facetValue) {
            return [facetValue, hierarchicalFacetResult.data[facetValue]];
          })
          .filter(function(tuple) {
            var facetValue = tuple[0];
            return onlyMatchingTree(
              facetValue,
              parent.path || hierarchicalRootPath,
              currentRefinement,
              hierarchicalSeparator,
              hierarchicalRootPath,
              hierarchicalShowParentLevel
            );
          });

        parent.data = orderBy_1(
          picked.map(function(tuple) {
            var facetValue = tuple[0];
            var facetCount = tuple[1];

            return format(
              facetCount,
              facetValue,
              hierarchicalSeparator,
              currentRefinement,
              hierarchicalFacetResult.exhaustive
            );
          }),
          sortBy[0],
          sortBy[1]
        );
      }

      return hierarchicalTree;
    };
  }

  function onlyMatchingTree(
    facetValue,
    parentPath,
    currentRefinement,
    hierarchicalSeparator,
    hierarchicalRootPath,
    hierarchicalShowParentLevel
  ) {
    // we want the facetValue is a child of hierarchicalRootPath
    if (
      hierarchicalRootPath &&
      (facetValue.indexOf(hierarchicalRootPath) !== 0 ||
        hierarchicalRootPath === facetValue)
    ) {
      return false;
    }

    // we always want root levels (only when there is no prefix path)
    return (
      (!hierarchicalRootPath &&
        facetValue.indexOf(hierarchicalSeparator) === -1) ||
      // if there is a rootPath, being root level mean 1 level under rootPath
      (hierarchicalRootPath &&
        facetValue.split(hierarchicalSeparator).length -
          hierarchicalRootPath.split(hierarchicalSeparator).length ===
          1) ||
      // if current refinement is a root level and current facetValue is a root level,
      // keep the facetValue
      (facetValue.indexOf(hierarchicalSeparator) === -1 &&
        currentRefinement.indexOf(hierarchicalSeparator) === -1) ||
      // currentRefinement is a child of the facet value
      currentRefinement.indexOf(facetValue) === 0 ||
      // facetValue is a child of the current parent, add it
      (facetValue.indexOf(parentPath + hierarchicalSeparator) === 0 &&
        (hierarchicalShowParentLevel ||
          facetValue.indexOf(currentRefinement) === 0))
    );
  }

  function format(
    facetCount,
    facetValue,
    hierarchicalSeparator,
    currentRefinement,
    exhaustive
  ) {
    var parts = facetValue.split(hierarchicalSeparator);
    return {
      name: parts[parts.length - 1].trim(),
      path: facetValue,
      count: facetCount,
      isRefined:
        currentRefinement === facetValue ||
        currentRefinement.indexOf(facetValue + hierarchicalSeparator) === 0,
      exhaustive: exhaustive,
      data: null
    };
  }

  /**
   * @typedef SearchResults.Facet
   * @type {object}
   * @property {string} name name of the attribute in the record
   * @property {object} data the faceting data: value, number of entries
   * @property {object} stats undefined unless facet_stats is retrieved from algolia
   */

  /**
   * @typedef SearchResults.HierarchicalFacet
   * @type {object}
   * @property {string} name name of the current value given the hierarchical level, trimmed.
   * If root node, you get the facet name
   * @property {number} count number of objects matching this hierarchical value
   * @property {string} path the current hierarchical value full path
   * @property {boolean} isRefined `true` if the current value was refined, `false` otherwise
   * @property {HierarchicalFacet[]} data sub values for the current level
   */

  /**
   * @typedef SearchResults.FacetValue
   * @type {object}
   * @property {string} name the facet value itself
   * @property {number} count times this facet appears in the results
   * @property {boolean} isRefined is the facet currently selected
   * @property {boolean} isExcluded is the facet currently excluded (only for conjunctive facets)
   */

  /**
   * @typedef Refinement
   * @type {object}
   * @property {string} type the type of filter used:
   * `numeric`, `facet`, `exclude`, `disjunctive`, `hierarchical`
   * @property {string} attributeName name of the attribute used for filtering
   * @property {string} name the value of the filter
   * @property {number} numericValue the value as a number. Only for numeric filters.
   * @property {string} operator the operator used. Only for numeric filters.
   * @property {number} count the number of computed hits for this filter. Only on facets.
   * @property {boolean} exhaustive if the count is exhaustive
   */

  /**
   * @param {string[]} attributes
   */
  function getIndices(attributes) {
    var indices = {};

    attributes.forEach(function(val, idx) {
      indices[val] = idx;
    });

    return indices;
  }

  function assignFacetStats(dest, facetStats, key) {
    if (facetStats && facetStats[key]) {
      dest.stats = facetStats[key];
    }
  }

  /**
   * @typedef {Object} HierarchicalFacet
   * @property {string} name
   * @property {string[]} attributes
   */

  /**
   * @param {HierarchicalFacet[]} hierarchicalFacets
   * @param {string} hierarchicalAttributeName
   */
  function findMatchingHierarchicalFacetFromAttributeName(
    hierarchicalFacets,
    hierarchicalAttributeName
  ) {
    return find(hierarchicalFacets, function facetKeyMatchesAttribute(
      hierarchicalFacet
    ) {
      var facetNames = hierarchicalFacet.attributes || [];
      return facetNames.indexOf(hierarchicalAttributeName) > -1;
    });
  }

  /*eslint-disable */
  /**
   * Constructor for SearchResults
   * @class
   * @classdesc SearchResults contains the results of a query to Algolia using the
   * {@link AlgoliaSearchHelper}.
   * @param {SearchParameters} state state that led to the response
   * @param {array.<object>} results the results from algolia client
   * @example <caption>SearchResults of the first query in
   * <a href="http://demos.algolia.com/instant-search-demo">the instant search demo</a></caption>
  {
     "hitsPerPage": 10,
     "processingTimeMS": 2,
     "facets": [
        {
           "name": "type",
           "data": {
              "HardGood": 6627,
              "BlackTie": 550,
              "Music": 665,
              "Software": 131,
              "Game": 456,
              "Movie": 1571
           },
           "exhaustive": false
        },
        {
           "exhaustive": false,
           "data": {
              "Free shipping": 5507
           },
           "name": "shipping"
        }
    ],
     "hits": [
        {
           "thumbnailImage": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_54x108_s.gif",
           "_highlightResult": {
              "shortDescription": {
                 "matchLevel": "none",
                 "value": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
                 "matchedWords": []
              },
              "category": {
                 "matchLevel": "none",
                 "value": "Computer Security Software",
                 "matchedWords": []
              },
              "manufacturer": {
                 "matchedWords": [],
                 "value": "Webroot",
                 "matchLevel": "none"
              },
              "name": {
                 "value": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
                 "matchedWords": [],
                 "matchLevel": "none"
              }
           },
           "image": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_105x210_sc.jpg",
           "shipping": "Free shipping",
           "bestSellingRank": 4,
           "shortDescription": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
           "url": "http://www.bestbuy.com/site/webroot-secureanywhere-internet-security-3-devi…d=1219060687969&skuId=1688832&cmp=RMX&ky=2d3GfEmNIzjA0vkzveHdZEBgpPCyMnLTJ",
           "name": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
           "category": "Computer Security Software",
           "salePrice_range": "1 - 50",
           "objectID": "1688832",
           "type": "Software",
           "customerReviewCount": 5980,
           "salePrice": 49.99,
           "manufacturer": "Webroot"
        },
        ....
    ],
     "nbHits": 10000,
     "disjunctiveFacets": [
        {
           "exhaustive": false,
           "data": {
              "5": 183,
              "12": 112,
              "7": 149,
              ...
           },
           "name": "customerReviewCount",
           "stats": {
              "max": 7461,
              "avg": 157.939,
              "min": 1
           }
        },
        {
           "data": {
              "Printer Ink": 142,
              "Wireless Speakers": 60,
              "Point & Shoot Cameras": 48,
              ...
           },
           "name": "category",
           "exhaustive": false
        },
        {
           "exhaustive": false,
           "data": {
              "> 5000": 2,
              "1 - 50": 6524,
              "501 - 2000": 566,
              "201 - 500": 1501,
              "101 - 200": 1360,
              "2001 - 5000": 47
           },
           "name": "salePrice_range"
        },
        {
           "data": {
              "Dynex™": 202,
              "Insignia™": 230,
              "PNY": 72,
              ...
           },
           "name": "manufacturer",
           "exhaustive": false
        }
    ],
     "query": "",
     "nbPages": 100,
     "page": 0,
     "index": "bestbuy"
  }
   **/
  /*eslint-enable */
  function SearchResults(state, results) {
    var mainSubResponse = results[0];

    this._rawResults = results;

    var self = this;

    // https://www.algolia.com/doc/api-reference/api-methods/search/#response
    Object.keys(mainSubResponse).forEach(function(key) {
      self[key] = mainSubResponse[key];
    });

    /**
     * query used to generate the results
     * @name query
     * @member {string}
     * @memberof SearchResults
     * @instance
     */
    /**
     * The query as parsed by the engine given all the rules.
     * @name parsedQuery
     * @member {string}
     * @memberof SearchResults
     * @instance
     */
    /**
     * all the records that match the search parameters. Each record is
     * augmented with a new attribute `_highlightResult`
     * which is an object keyed by attribute and with the following properties:
     *  - `value` : the value of the facet highlighted (html)
     *  - `matchLevel`: full, partial or none depending on how the query terms match
     * @name hits
     * @member {object[]}
     * @memberof SearchResults
     * @instance
     */
    /**
     * index where the results come from
     * @name index
     * @member {string}
     * @memberof SearchResults
     * @instance
     */
    /**
     * number of hits per page requested
     * @name hitsPerPage
     * @member {number}
     * @memberof SearchResults
     * @instance
     */
    /**
     * total number of hits of this query on the index
     * @name nbHits
     * @member {number}
     * @memberof SearchResults
     * @instance
     */
    /**
     * total number of pages with respect to the number of hits per page and the total number of hits
     * @name nbPages
     * @member {number}
     * @memberof SearchResults
     * @instance
     */
    /**
     * current page
     * @name page
     * @member {number}
     * @memberof SearchResults
     * @instance
     */
    /**
     * The position if the position was guessed by IP.
     * @name aroundLatLng
     * @member {string}
     * @memberof SearchResults
     * @instance
     * @example "48.8637,2.3615",
     */
    /**
     * The radius computed by Algolia.
     * @name automaticRadius
     * @member {string}
     * @memberof SearchResults
     * @instance
     * @example "126792922",
     */
    /**
     * String identifying the server used to serve this request.
     *
     * getRankingInfo needs to be set to `true` for this to be returned
     *
     * @name serverUsed
     * @member {string}
     * @memberof SearchResults
     * @instance
     * @example "c7-use-2.algolia.net",
     */
    /**
     * Boolean that indicates if the computation of the counts did time out.
     * @deprecated
     * @name timeoutCounts
     * @member {boolean}
     * @memberof SearchResults
     * @instance
     */
    /**
     * Boolean that indicates if the computation of the hits did time out.
     * @deprecated
     * @name timeoutHits
     * @member {boolean}
     * @memberof SearchResults
     * @instance
     */
    /**
     * True if the counts of the facets is exhaustive
     * @name exhaustiveFacetsCount
     * @member {boolean}
     * @memberof SearchResults
     * @instance
     */
    /**
     * True if the number of hits is exhaustive
     * @name exhaustiveNbHits
     * @member {boolean}
     * @memberof SearchResults
     * @instance
     */
    /**
     * Contains the userData if they are set by a [query rule](https://www.algolia.com/doc/guides/query-rules/query-rules-overview/).
     * @name userData
     * @member {object[]}
     * @memberof SearchResults
     * @instance
     */
    /**
     * queryID is the unique identifier of the query used to generate the current search results.
     * This value is only available if the `clickAnalytics` search parameter is set to `true`.
     * @name queryID
     * @member {string}
     * @memberof SearchResults
     * @instance
     */

    /**
     * sum of the processing time of all the queries
     * @member {number}
     */
    this.processingTimeMS = results.reduce(function(sum, result) {
      return result.processingTimeMS === undefined
        ? sum
        : sum + result.processingTimeMS;
    }, 0);

    /**
     * disjunctive facets results
     * @member {SearchResults.Facet[]}
     */
    this.disjunctiveFacets = [];
    /**
     * disjunctive facets results
     * @member {SearchResults.HierarchicalFacet[]}
     */
    this.hierarchicalFacets = state.hierarchicalFacets.map(function initFutureTree() {
      return [];
    });
    /**
     * other facets results
     * @member {SearchResults.Facet[]}
     */
    this.facets = [];

    var disjunctiveFacets = state.getRefinedDisjunctiveFacets();

    var facetsIndices = getIndices(state.facets);
    var disjunctiveFacetsIndices = getIndices(state.disjunctiveFacets);
    var nextDisjunctiveResult = 1;

    // Since we send request only for disjunctive facets that have been refined,
    // we get the facets information from the first, general, response.

    var mainFacets = mainSubResponse.facets || {};

    Object.keys(mainFacets).forEach(function(facetKey) {
      var facetValueObject = mainFacets[facetKey];

      var hierarchicalFacet = findMatchingHierarchicalFacetFromAttributeName(
        state.hierarchicalFacets,
        facetKey
      );

      if (hierarchicalFacet) {
        // Place the hierarchicalFacet data at the correct index depending on
        // the attributes order that was defined at the helper initialization
        var facetIndex = hierarchicalFacet.attributes.indexOf(facetKey);
        var idxAttributeName = findIndex(state.hierarchicalFacets, function(f) {
          return f.name === hierarchicalFacet.name;
        });
        self.hierarchicalFacets[idxAttributeName][facetIndex] = {
          attribute: facetKey,
          data: facetValueObject,
          exhaustive: mainSubResponse.exhaustiveFacetsCount
        };
      } else {
        var isFacetDisjunctive = state.disjunctiveFacets.indexOf(facetKey) !== -1;
        var isFacetConjunctive = state.facets.indexOf(facetKey) !== -1;
        var position;

        if (isFacetDisjunctive) {
          position = disjunctiveFacetsIndices[facetKey];
          self.disjunctiveFacets[position] = {
            name: facetKey,
            data: facetValueObject,
            exhaustive: mainSubResponse.exhaustiveFacetsCount
          };
          assignFacetStats(self.disjunctiveFacets[position], mainSubResponse.facets_stats, facetKey);
        }
        if (isFacetConjunctive) {
          position = facetsIndices[facetKey];
          self.facets[position] = {
            name: facetKey,
            data: facetValueObject,
            exhaustive: mainSubResponse.exhaustiveFacetsCount
          };
          assignFacetStats(self.facets[position], mainSubResponse.facets_stats, facetKey);
        }
      }
    });

    // Make sure we do not keep holes within the hierarchical facets
    this.hierarchicalFacets = compact(this.hierarchicalFacets);

    // aggregate the refined disjunctive facets
    disjunctiveFacets.forEach(function(disjunctiveFacet) {
      var result = results[nextDisjunctiveResult];
      var facets = result && result.facets ? result.facets : {};
      var hierarchicalFacet = state.getHierarchicalFacetByName(disjunctiveFacet);

      // There should be only item in facets.
      Object.keys(facets).forEach(function(dfacet) {
        var facetResults = facets[dfacet];

        var position;

        if (hierarchicalFacet) {
          position = findIndex(state.hierarchicalFacets, function(f) {
            return f.name === hierarchicalFacet.name;
          });
          var attributeIndex = findIndex(self.hierarchicalFacets[position], function(f) {
            return f.attribute === dfacet;
          });

          // previous refinements and no results so not able to find it
          if (attributeIndex === -1) {
            return;
          }

          self.hierarchicalFacets[position][attributeIndex].data = merge_1(
            {},
            self.hierarchicalFacets[position][attributeIndex].data,
            facetResults
          );
        } else {
          position = disjunctiveFacetsIndices[dfacet];

          var dataFromMainRequest = mainSubResponse.facets && mainSubResponse.facets[dfacet] || {};

          self.disjunctiveFacets[position] = {
            name: dfacet,
            data: defaultsPure({}, facetResults, dataFromMainRequest),
            exhaustive: result.exhaustiveFacetsCount
          };
          assignFacetStats(self.disjunctiveFacets[position], result.facets_stats, dfacet);

          if (state.disjunctiveFacetsRefinements[dfacet]) {
            state.disjunctiveFacetsRefinements[dfacet].forEach(function(refinementValue) {
              // add the disjunctive refinements if it is no more retrieved
              if (!self.disjunctiveFacets[position].data[refinementValue] &&
                state.disjunctiveFacetsRefinements[dfacet].indexOf(refinementValue) > -1) {
                self.disjunctiveFacets[position].data[refinementValue] = 0;
              }
            });
          }
        }
      });
      nextDisjunctiveResult++;
    });

    // if we have some root level values for hierarchical facets, merge them
    state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
      var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
      var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);

      var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
      // if we are already at a root refinement (or no refinement at all), there is no
      // root level values request
      if (currentRefinement.length === 0 || currentRefinement[0].split(separator).length < 2) {
        return;
      }

      var result = results[nextDisjunctiveResult];
      var facets = result && result.facets
        ? result.facets
        : {};
      Object.keys(facets).forEach(function(dfacet) {
        var facetResults = facets[dfacet];
        var position = findIndex(state.hierarchicalFacets, function(f) {
          return f.name === hierarchicalFacet.name;
        });
        var attributeIndex = findIndex(self.hierarchicalFacets[position], function(f) {
          return f.attribute === dfacet;
        });

        // previous refinements and no results so not able to find it
        if (attributeIndex === -1) {
          return;
        }

        // when we always get root levels, if the hits refinement is `beers > IPA` (count: 5),
        // then the disjunctive values will be `beers` (count: 100),
        // but we do not want to display
        //   | beers (100)
        //     > IPA (5)
        // We want
        //   | beers (5)
        //     > IPA (5)
        var defaultData = {};

        if (currentRefinement.length > 0) {
          var root = currentRefinement[0].split(separator)[0];
          defaultData[root] = self.hierarchicalFacets[position][attributeIndex].data[root];
        }

        self.hierarchicalFacets[position][attributeIndex].data = defaultsPure(
          defaultData,
          facetResults,
          self.hierarchicalFacets[position][attributeIndex].data
        );
      });

      nextDisjunctiveResult++;
    });

    // add the excludes
    Object.keys(state.facetsExcludes).forEach(function(facetName) {
      var excludes = state.facetsExcludes[facetName];
      var position = facetsIndices[facetName];

      self.facets[position] = {
        name: facetName,
        data: mainSubResponse.facets[facetName],
        exhaustive: mainSubResponse.exhaustiveFacetsCount
      };
      excludes.forEach(function(facetValue) {
        self.facets[position] = self.facets[position] || {name: facetName};
        self.facets[position].data = self.facets[position].data || {};
        self.facets[position].data[facetValue] = 0;
      });
    });

    /**
     * @type {Array}
     */
    this.hierarchicalFacets = this.hierarchicalFacets.map(generateHierarchicalTree_1(state));

    /**
     * @type {Array}
     */
    this.facets = compact(this.facets);
    /**
     * @type {Array}
     */
    this.disjunctiveFacets = compact(this.disjunctiveFacets);

    this._state = state;
  }

  /**
   * Get a facet object with its name
   * @deprecated
   * @param {string} name name of the faceted attribute
   * @return {SearchResults.Facet} the facet object
   */
  SearchResults.prototype.getFacetByName = function(name) {
    function predicate(facet) {
      return facet.name === name;
    }

    return find(this.facets, predicate) ||
      find(this.disjunctiveFacets, predicate) ||
      find(this.hierarchicalFacets, predicate);
  };

  /**
   * Get the facet values of a specified attribute from a SearchResults object.
   * @private
   * @param {SearchResults} results the search results to search in
   * @param {string} attribute name of the faceted attribute to search for
   * @return {array|object} facet values. For the hierarchical facets it is an object.
   */
  function extractNormalizedFacetValues(results, attribute) {
    function predicate(facet) {
      return facet.name === attribute;
    }

    if (results._state.isConjunctiveFacet(attribute)) {
      var facet = find(results.facets, predicate);
      if (!facet) return [];

      return Object.keys(facet.data).map(function(name) {
        return {
          name: name,
          count: facet.data[name],
          isRefined: results._state.isFacetRefined(attribute, name),
          isExcluded: results._state.isExcludeRefined(attribute, name)
        };
      });
    } else if (results._state.isDisjunctiveFacet(attribute)) {
      var disjunctiveFacet = find(results.disjunctiveFacets, predicate);
      if (!disjunctiveFacet) return [];

      return Object.keys(disjunctiveFacet.data).map(function(name) {
        return {
          name: name,
          count: disjunctiveFacet.data[name],
          isRefined: results._state.isDisjunctiveFacetRefined(attribute, name)
        };
      });
    } else if (results._state.isHierarchicalFacet(attribute)) {
      return find(results.hierarchicalFacets, predicate);
    }
  }

  /**
   * Sort nodes of a hierarchical or disjunctive facet results
   * @private
   * @param {function} sortFn
   * @param {HierarchicalFacet|Array} node node upon which we want to apply the sort
   * @param {string[]} names attribute names
   * @param {number} [level=0] current index in the names array
   */
  function recSort(sortFn, node, names, level) {
    level = level || 0;

    if (Array.isArray(node)) {
      return sortFn(node, names[level]);
    }

    if (!node.data || node.data.length === 0) {
      return node;
    }

    var children = node.data.map(function(childNode) {
      return recSort(sortFn, childNode, names, level + 1);
    });
    var sortedChildren = sortFn(children, names[level]);
    var newNode = defaultsPure({data: sortedChildren}, node);
    return newNode;
  }

  SearchResults.DEFAULT_SORT = ['isRefined:desc', 'count:desc', 'name:asc'];

  function vanillaSortFn(order, data) {
    return data.sort(order);
  }

  /**
   * @typedef FacetOrdering
   * @type {Object}
   * @property {string[]} [order]
   * @property {'count' | 'alpha' | 'hidden'} [sortRemainingBy]
   */

  /**
   * Sorts facet arrays via their facet ordering
   * @param {Array} facetValues the values
   * @param {FacetOrdering} facetOrdering the ordering
   * @returns {Array}
   */
  function sortViaFacetOrdering(facetValues, facetOrdering) {
    var orderedFacets = [];
    var remainingFacets = [];

    var order = facetOrdering.order || [];
    /**
     * an object with the keys being the values in order, the values their index:
     * ['one', 'two'] -> { one: 0, two: 1 }
     */
    var reverseOrder = order.reduce(function(acc, name, i) {
      acc[name] = i;
      return acc;
    }, {});

    facetValues.forEach(function(item) {
      // hierarchical facets get sorted using their raw name
      var name = item.path || item.name;
      if (reverseOrder[name] !== undefined) {
        orderedFacets[reverseOrder[name]] = item;
      } else {
        remainingFacets.push(item);
      }
    });

    orderedFacets = orderedFacets.filter(function(facet) {
      return facet;
    });

    var sortRemainingBy = facetOrdering.sortRemainingBy;
    var ordering;
    if (sortRemainingBy === 'hidden') {
      return orderedFacets;
    } else if (sortRemainingBy === 'alpha') {
      ordering = [['path', 'name'], ['asc', 'asc']];
    } else {
      ordering = [['count'], ['desc']];
    }

    return orderedFacets.concat(
      orderBy_1(remainingFacets, ordering[0], ordering[1])
    );
  }

  /**
   * @param {SearchResults} results the search results class
   * @param {string} attribute the attribute to retrieve ordering of
   * @returns {FacetOrdering=}
   */
  function getFacetOrdering(results, attribute) {
    return (
      results.renderingContent &&
      results.renderingContent.facetOrdering &&
      results.renderingContent.facetOrdering.values &&
      results.renderingContent.facetOrdering.values[attribute]
    );
  }

  /**
   * Get a the list of values for a given facet attribute. Those values are sorted
   * refinement first, descending count (bigger value on top), and name ascending
   * (alphabetical order). The sort formula can overridden using either string based
   * predicates or a function.
   *
   * This method will return all the values returned by the Algolia engine plus all
   * the values already refined. This means that it can happen that the
   * `maxValuesPerFacet` [configuration](https://www.algolia.com/doc/rest-api/search#param-maxValuesPerFacet)
   * might not be respected if you have facet values that are already refined.
   * @param {string} attribute attribute name
   * @param {object} opts configuration options.
   * @param {boolean} [opts.facetOrdering]
   * Force the use of facetOrdering from the result if a sortBy is present. If
   * sortBy isn't present, facetOrdering will be used automatically.
   * @param {Array.<string> | function} opts.sortBy
   * When using strings, it consists of
   * the name of the [FacetValue](#SearchResults.FacetValue) or the
   * [HierarchicalFacet](#SearchResults.HierarchicalFacet) attributes with the
   * order (`asc` or `desc`). For example to order the value by count, the
   * argument would be `['count:asc']`.
   *
   * If only the attribute name is specified, the ordering defaults to the one
   * specified in the default value for this attribute.
   *
   * When not specified, the order is
   * ascending.  This parameter can also be a function which takes two facet
   * values and should return a number, 0 if equal, 1 if the first argument is
   * bigger or -1 otherwise.
   *
   * The default value for this attribute `['isRefined:desc', 'count:desc', 'name:asc']`
   * @return {FacetValue[]|HierarchicalFacet|undefined} depending on the type of facet of
   * the attribute requested (hierarchical, disjunctive or conjunctive)
   * @example
   * helper.on('result', function(event){
   *   //get values ordered only by name ascending using the string predicate
   *   event.results.getFacetValues('city', {sortBy: ['name:asc']});
   *   //get values  ordered only by count ascending using a function
   *   event.results.getFacetValues('city', {
   *     // this is equivalent to ['count:asc']
   *     sortBy: function(a, b) {
   *       if (a.count === b.count) return 0;
   *       if (a.count > b.count)   return 1;
   *       if (b.count > a.count)   return -1;
   *     }
   *   });
   * });
   */
  SearchResults.prototype.getFacetValues = function(attribute, opts) {
    var facetValues = extractNormalizedFacetValues(this, attribute);
    if (!facetValues) {
      return undefined;
    }

    var options = defaultsPure({}, opts, {
      sortBy: SearchResults.DEFAULT_SORT,
      // if no sortBy is given, attempt to sort based on facetOrdering
      // if it is given, we still allow to sort via facet ordering first
      facetOrdering: !(opts && opts.sortBy)
    });

    var results = this;
    var attributes;
    if (Array.isArray(facetValues)) {
      attributes = [attribute];
    } else {
      var config = results._state.getHierarchicalFacetByName(facetValues.name);
      attributes = config.attributes;
    }

    return recSort(function(data, facetName) {
      if (options.facetOrdering) {
        var facetOrdering = getFacetOrdering(results, facetName);
        if (Boolean(facetOrdering)) {
          return sortViaFacetOrdering(data, facetOrdering);
        }
      }

      if (Array.isArray(options.sortBy)) {
        var order = formatSort(options.sortBy, SearchResults.DEFAULT_SORT);
        return orderBy_1(data, order[0], order[1]);
      } else if (typeof options.sortBy === 'function') {
        return vanillaSortFn(options.sortBy, data);
      }
      throw new Error(
        'options.sortBy is optional but if defined it must be ' +
          'either an array of string (predicates) or a sorting function'
      );
    }, facetValues, attributes);
  };

  /**
   * Returns the facet stats if attribute is defined and the facet contains some.
   * Otherwise returns undefined.
   * @param {string} attribute name of the faceted attribute
   * @return {object} The stats of the facet
   */
  SearchResults.prototype.getFacetStats = function(attribute) {
    if (this._state.isConjunctiveFacet(attribute)) {
      return getFacetStatsIfAvailable(this.facets, attribute);
    } else if (this._state.isDisjunctiveFacet(attribute)) {
      return getFacetStatsIfAvailable(this.disjunctiveFacets, attribute);
    }

    return undefined;
  };

  /**
   * @typedef {Object} FacetListItem
   * @property {string} name
   */

  /**
   * @param {FacetListItem[]} facetList (has more items, but enough for here)
   * @param {string} facetName
   */
  function getFacetStatsIfAvailable(facetList, facetName) {
    var data = find(facetList, function(facet) {
      return facet.name === facetName;
    });
    return data && data.stats;
  }

  /**
   * Returns all refinements for all filters + tags. It also provides
   * additional information: count and exhaustiveness for each filter.
   *
   * See the [refinement type](#Refinement) for an exhaustive view of the available
   * data.
   *
   * Note that for a numeric refinement, results are grouped per operator, this
   * means that it will return responses for operators which are empty.
   *
   * @return {Array.<Refinement>} all the refinements
   */
  SearchResults.prototype.getRefinements = function() {
    var state = this._state;
    var results = this;
    var res = [];

    Object.keys(state.facetsRefinements).forEach(function(attributeName) {
      state.facetsRefinements[attributeName].forEach(function(name) {
        res.push(getRefinement(state, 'facet', attributeName, name, results.facets));
      });
    });

    Object.keys(state.facetsExcludes).forEach(function(attributeName) {
      state.facetsExcludes[attributeName].forEach(function(name) {
        res.push(getRefinement(state, 'exclude', attributeName, name, results.facets));
      });
    });

    Object.keys(state.disjunctiveFacetsRefinements).forEach(function(attributeName) {
      state.disjunctiveFacetsRefinements[attributeName].forEach(function(name) {
        res.push(getRefinement(state, 'disjunctive', attributeName, name, results.disjunctiveFacets));
      });
    });

    Object.keys(state.hierarchicalFacetsRefinements).forEach(function(attributeName) {
      state.hierarchicalFacetsRefinements[attributeName].forEach(function(name) {
        res.push(getHierarchicalRefinement(state, attributeName, name, results.hierarchicalFacets));
      });
    });


    Object.keys(state.numericRefinements).forEach(function(attributeName) {
      var operators = state.numericRefinements[attributeName];
      Object.keys(operators).forEach(function(operator) {
        operators[operator].forEach(function(value) {
          res.push({
            type: 'numeric',
            attributeName: attributeName,
            name: value,
            numericValue: value,
            operator: operator
          });
        });
      });
    });

    state.tagRefinements.forEach(function(name) {
      res.push({type: 'tag', attributeName: '_tags', name: name});
    });

    return res;
  };

  /**
   * @typedef {Object} Facet
   * @property {string} name
   * @property {Object} data
   * @property {boolean} exhaustive
   */

  /**
   * @param {*} state
   * @param {*} type
   * @param {string} attributeName
   * @param {*} name
   * @param {Facet[]} resultsFacets
   */
  function getRefinement(state, type, attributeName, name, resultsFacets) {
    var facet = find(resultsFacets, function(f) {
      return f.name === attributeName;
    });
    var count = facet && facet.data && facet.data[name] ? facet.data[name] : 0;
    var exhaustive = (facet && facet.exhaustive) || false;

    return {
      type: type,
      attributeName: attributeName,
      name: name,
      count: count,
      exhaustive: exhaustive
    };
  }

  /**
   * @param {*} state
   * @param {string} attributeName
   * @param {*} name
   * @param {Facet[]} resultsFacets
   */
  function getHierarchicalRefinement(state, attributeName, name, resultsFacets) {
    var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
    var separator = state._getHierarchicalFacetSeparator(facetDeclaration);
    var split = name.split(separator);
    var rootFacet = find(resultsFacets, function(facet) {
      return facet.name === attributeName;
    });

    var facet = split.reduce(function(intermediateFacet, part) {
      var newFacet =
        intermediateFacet && find(intermediateFacet.data, function(f) {
          return f.name === part;
        });
      return newFacet !== undefined ? newFacet : intermediateFacet;
    }, rootFacet);

    var count = (facet && facet.count) || 0;
    var exhaustive = (facet && facet.exhaustive) || false;
    var path = (facet && facet.path) || '';

    return {
      type: 'hierarchical',
      attributeName: attributeName,
      name: path,
      count: count,
      exhaustive: exhaustive
    };
  }

  var SearchResults_1 = SearchResults;

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  function EventEmitter() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || undefined;
  }
  var events = EventEmitter;

  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function(n) {
    if (!isNumber(n) || n < 0 || isNaN(n))
      throw TypeError('n must be a positive number');
    this._maxListeners = n;
    return this;
  };

  EventEmitter.prototype.emit = function(type) {
    var er, handler, len, args, i, listeners;

    if (!this._events)
      this._events = {};

    // If there is no 'error' event listener then throw.
    if (type === 'error') {
      if (!this._events.error ||
          (isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        } else {
          // At least give some kind of context to the user
          var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
          err.context = er;
          throw err;
        }
      }
    }

    handler = this._events[type];

    if (isUndefined(handler))
      return false;

    if (isFunction(handler)) {
      switch (arguments.length) {
        // fast cases
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        // slower
        default:
          args = Array.prototype.slice.call(arguments, 1);
          handler.apply(this, args);
      }
    } else if (isObject(handler)) {
      args = Array.prototype.slice.call(arguments, 1);
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++)
        listeners[i].apply(this, args);
    }

    return true;
  };

  EventEmitter.prototype.addListener = function(type, listener) {
    var m;

    if (!isFunction(listener))
      throw TypeError('listener must be a function');

    if (!this._events)
      this._events = {};

    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (this._events.newListener)
      this.emit('newListener', type,
                isFunction(listener.listener) ?
                listener.listener : listener);

    if (!this._events[type])
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    else if (isObject(this._events[type]))
      // If we've already got an array, just append.
      this._events[type].push(listener);
    else
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];

    // Check for listener leak
    if (isObject(this._events[type]) && !this._events[type].warned) {
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        if (typeof console.trace === 'function') {
          // not supported in IE 10
          console.trace();
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.once = function(type, listener) {
    if (!isFunction(listener))
      throw TypeError('listener must be a function');

    var fired = false;

    function g() {
      this.removeListener(type, g);

      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }

    g.listener = listener;
    this.on(type, g);

    return this;
  };

  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener = function(type, listener) {
    var list, position, length, i;

    if (!isFunction(listener))
      throw TypeError('listener must be a function');

    if (!this._events || !this._events[type])
      return this;

    list = this._events[type];
    length = list.length;
    position = -1;

    if (list === listener ||
        (isFunction(list.listener) && list.listener === listener)) {
      delete this._events[type];
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);

    } else if (isObject(list)) {
      for (i = length; i-- > 0;) {
        if (list[i] === listener ||
            (list[i].listener && list[i].listener === listener)) {
          position = i;
          break;
        }
      }

      if (position < 0)
        return this;

      if (list.length === 1) {
        list.length = 0;
        delete this._events[type];
      } else {
        list.splice(position, 1);
      }

      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function(type) {
    var key, listeners;

    if (!this._events)
      return this;

    // not listening for removeListener, no need to emit
    if (!this._events.removeListener) {
      if (arguments.length === 0)
        this._events = {};
      else if (this._events[type])
        delete this._events[type];
      return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = {};
      return this;
    }

    listeners = this._events[type];

    if (isFunction(listeners)) {
      this.removeListener(type, listeners);
    } else if (listeners) {
      // LIFO order
      while (listeners.length)
        this.removeListener(type, listeners[listeners.length - 1]);
    }
    delete this._events[type];

    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    var ret;
    if (!this._events || !this._events[type])
      ret = [];
    else if (isFunction(this._events[type]))
      ret = [this._events[type]];
    else
      ret = this._events[type].slice();
    return ret;
  };

  EventEmitter.prototype.listenerCount = function(type) {
    if (this._events) {
      var evlistener = this._events[type];

      if (isFunction(evlistener))
        return 1;
      else if (evlistener)
        return evlistener.length;
    }
    return 0;
  };

  EventEmitter.listenerCount = function(emitter, type) {
    return emitter.listenerCount(type);
  };

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  function isUndefined(arg) {
    return arg === void 0;
  }

  function inherits(ctor, superCtor) {
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }

  var inherits_1 = inherits;

  /**
   * A DerivedHelper is a way to create sub requests to
   * Algolia from a main helper.
   * @class
   * @classdesc The DerivedHelper provides an event based interface for search callbacks:
   *  - search: when a search is triggered using the `search()` method.
   *  - result: when the response is retrieved from Algolia and is processed.
   *    This event contains a {@link SearchResults} object and the
   *    {@link SearchParameters} corresponding to this answer.
   */
  function DerivedHelper(mainHelper, fn) {
    this.main = mainHelper;
    this.fn = fn;
    this.lastResults = null;
  }

  inherits_1(DerivedHelper, events.EventEmitter);

  /**
   * Detach this helper from the main helper
   * @return {undefined}
   * @throws Error if the derived helper is already detached
   */
  DerivedHelper.prototype.detach = function() {
    this.removeAllListeners();
    this.main.detachDerivedHelper(this);
  };

  DerivedHelper.prototype.getModifiedState = function(parameters) {
    return this.fn(parameters);
  };

  var DerivedHelper_1 = DerivedHelper;

  var requestBuilder = {
    /**
     * Get all the queries to send to the client, those queries can used directly
     * with the Algolia client.
     * @private
     * @return {object[]} The queries
     */
    _getQueries: function getQueries(index, state) {
      var queries = [];

      // One query for the hits
      queries.push({
        indexName: index,
        params: requestBuilder._getHitsSearchParams(state)
      });

      // One for each disjunctive facets
      state.getRefinedDisjunctiveFacets().forEach(function(refinedFacet) {
        queries.push({
          indexName: index,
          params: requestBuilder._getDisjunctiveFacetSearchParams(state, refinedFacet)
        });
      });

      // maybe more to get the root level of hierarchical facets when activated
      state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
        var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);

        var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
        // if we are deeper than level 0 (starting from `beer > IPA`)
        // we want to get the root values
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        if (currentRefinement.length > 0 && currentRefinement[0].split(separator).length > 1) {
          queries.push({
            indexName: index,
            params: requestBuilder._getDisjunctiveFacetSearchParams(state, refinedFacet, true)
          });
        }
      });

      return queries;
    },

    /**
     * Build search parameters used to fetch hits
     * @private
     * @return {object.<string, any>}
     */
    _getHitsSearchParams: function(state) {
      var facets = state.facets
        .concat(state.disjunctiveFacets)
        .concat(requestBuilder._getHitsHierarchicalFacetsAttributes(state));


      var facetFilters = requestBuilder._getFacetFilters(state);
      var numericFilters = requestBuilder._getNumericFilters(state);
      var tagFilters = requestBuilder._getTagFilters(state);
      var additionalParams = {
        facets: facets.indexOf('*') > -1 ? ['*'] : facets,
        tagFilters: tagFilters
      };

      if (facetFilters.length > 0) {
        additionalParams.facetFilters = facetFilters;
      }

      if (numericFilters.length > 0) {
        additionalParams.numericFilters = numericFilters;
      }

      return merge_1({}, state.getQueryParams(), additionalParams);
    },

    /**
     * Build search parameters used to fetch a disjunctive facet
     * @private
     * @param  {string} facet the associated facet name
     * @param  {boolean} hierarchicalRootLevel ?? FIXME
     * @return {object}
     */
    _getDisjunctiveFacetSearchParams: function(state, facet, hierarchicalRootLevel) {
      var facetFilters = requestBuilder._getFacetFilters(state, facet, hierarchicalRootLevel);
      var numericFilters = requestBuilder._getNumericFilters(state, facet);
      var tagFilters = requestBuilder._getTagFilters(state);
      var additionalParams = {
        hitsPerPage: 1,
        page: 0,
        attributesToRetrieve: [],
        attributesToHighlight: [],
        attributesToSnippet: [],
        tagFilters: tagFilters,
        analytics: false,
        clickAnalytics: false
      };

      var hierarchicalFacet = state.getHierarchicalFacetByName(facet);

      if (hierarchicalFacet) {
        additionalParams.facets = requestBuilder._getDisjunctiveHierarchicalFacetAttribute(
          state,
          hierarchicalFacet,
          hierarchicalRootLevel
        );
      } else {
        additionalParams.facets = facet;
      }

      if (numericFilters.length > 0) {
        additionalParams.numericFilters = numericFilters;
      }

      if (facetFilters.length > 0) {
        additionalParams.facetFilters = facetFilters;
      }

      return merge_1({}, state.getQueryParams(), additionalParams);
    },

    /**
     * Return the numeric filters in an algolia request fashion
     * @private
     * @param {string} [facetName] the name of the attribute for which the filters should be excluded
     * @return {string[]} the numeric filters in the algolia format
     */
    _getNumericFilters: function(state, facetName) {
      if (state.numericFilters) {
        return state.numericFilters;
      }

      var numericFilters = [];

      Object.keys(state.numericRefinements).forEach(function(attribute) {
        var operators = state.numericRefinements[attribute] || {};
        Object.keys(operators).forEach(function(operator) {
          var values = operators[operator] || [];
          if (facetName !== attribute) {
            values.forEach(function(value) {
              if (Array.isArray(value)) {
                var vs = value.map(function(v) {
                  return attribute + operator + v;
                });
                numericFilters.push(vs);
              } else {
                numericFilters.push(attribute + operator + value);
              }
            });
          }
        });
      });

      return numericFilters;
    },

    /**
     * Return the tags filters depending
     * @private
     * @return {string}
     */
    _getTagFilters: function(state) {
      if (state.tagFilters) {
        return state.tagFilters;
      }

      return state.tagRefinements.join(',');
    },


    /**
     * Build facetFilters parameter based on current refinements. The array returned
     * contains strings representing the facet filters in the algolia format.
     * @private
     * @param  {string} [facet] if set, the current disjunctive facet
     * @return {array.<string>}
     */
    _getFacetFilters: function(state, facet, hierarchicalRootLevel) {
      var facetFilters = [];

      var facetsRefinements = state.facetsRefinements || {};
      Object.keys(facetsRefinements).forEach(function(facetName) {
        var facetValues = facetsRefinements[facetName] || [];
        facetValues.forEach(function(facetValue) {
          facetFilters.push(facetName + ':' + facetValue);
        });
      });

      var facetsExcludes = state.facetsExcludes || {};
      Object.keys(facetsExcludes).forEach(function(facetName) {
        var facetValues = facetsExcludes[facetName] || [];
        facetValues.forEach(function(facetValue) {
          facetFilters.push(facetName + ':-' + facetValue);
        });
      });

      var disjunctiveFacetsRefinements = state.disjunctiveFacetsRefinements || {};
      Object.keys(disjunctiveFacetsRefinements).forEach(function(facetName) {
        var facetValues = disjunctiveFacetsRefinements[facetName] || [];
        if (facetName === facet || !facetValues || facetValues.length === 0) {
          return;
        }
        var orFilters = [];

        facetValues.forEach(function(facetValue) {
          orFilters.push(facetName + ':' + facetValue);
        });

        facetFilters.push(orFilters);
      });

      var hierarchicalFacetsRefinements = state.hierarchicalFacetsRefinements || {};
      Object.keys(hierarchicalFacetsRefinements).forEach(function(facetName) {
        var facetValues = hierarchicalFacetsRefinements[facetName] || [];
        var facetValue = facetValues[0];

        if (facetValue === undefined) {
          return;
        }

        var hierarchicalFacet = state.getHierarchicalFacetByName(facetName);
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
        var attributeToRefine;
        var attributesIndex;

        // we ask for parent facet values only when the `facet` is the current hierarchical facet
        if (facet === facetName) {
          // if we are at the root level already, no need to ask for facet values, we get them from
          // the hits query
          if (facetValue.indexOf(separator) === -1 || (!rootPath && hierarchicalRootLevel === true) ||
            (rootPath && rootPath.split(separator).length === facetValue.split(separator).length)) {
            return;
          }

          if (!rootPath) {
            attributesIndex = facetValue.split(separator).length - 2;
            facetValue = facetValue.slice(0, facetValue.lastIndexOf(separator));
          } else {
            attributesIndex = rootPath.split(separator).length - 1;
            facetValue = rootPath;
          }

          attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
        } else {
          attributesIndex = facetValue.split(separator).length - 1;

          attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
        }

        if (attributeToRefine) {
          facetFilters.push([attributeToRefine + ':' + facetValue]);
        }
      });

      return facetFilters;
    },

    _getHitsHierarchicalFacetsAttributes: function(state) {
      var out = [];

      return state.hierarchicalFacets.reduce(
        // ask for as much levels as there's hierarchical refinements
        function getHitsAttributesForHierarchicalFacet(allAttributes, hierarchicalFacet) {
          var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0];

          // if no refinement, ask for root level
          if (!hierarchicalRefinement) {
            allAttributes.push(hierarchicalFacet.attributes[0]);
            return allAttributes;
          }

          var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
          var level = hierarchicalRefinement.split(separator).length;
          var newAttributes = hierarchicalFacet.attributes.slice(0, level + 1);

          return allAttributes.concat(newAttributes);
        }, out);
    },

    _getDisjunctiveHierarchicalFacetAttribute: function(state, hierarchicalFacet, rootLevel) {
      var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
      if (rootLevel === true) {
        var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
        var attributeIndex = 0;

        if (rootPath) {
          attributeIndex = rootPath.split(separator).length;
        }
        return [hierarchicalFacet.attributes[attributeIndex]];
      }

      var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0] || '';
      // if refinement is 'beers > IPA > Flying dog',
      // then we want `facets: ['beers > IPA']` as disjunctive facet (parent level values)

      var parentLevel = hierarchicalRefinement.split(separator).length - 1;
      return hierarchicalFacet.attributes.slice(0, parentLevel + 1);
    },

    getSearchForFacetQuery: function(facetName, query, maxFacetHits, state) {
      var stateForSearchForFacetValues = state.isDisjunctiveFacet(facetName) ?
        state.clearRefinements(facetName) :
        state;
      var searchForFacetSearchParameters = {
        facetQuery: query,
        facetName: facetName
      };
      if (typeof maxFacetHits === 'number') {
        searchForFacetSearchParameters.maxFacetHits = maxFacetHits;
      }
      return merge_1(
        {},
        requestBuilder._getHitsSearchParams(stateForSearchForFacetValues),
        searchForFacetSearchParameters
      );
    }
  };

  var requestBuilder_1 = requestBuilder;

  var version$1 = '3.6.2';

  /**
   * Event triggered when a parameter is set or updated
   * @event AlgoliaSearchHelper#event:change
   * @property {object} event
   * @property {SearchParameters} event.state the current parameters with the latest changes applied
   * @property {SearchResults} event.results the previous results received from Algolia. `null` before the first request
   * @example
   * helper.on('change', function(event) {
   *   console.log('The parameters have changed');
   * });
   */

  /**
   * Event triggered when a main search is sent to Algolia
   * @event AlgoliaSearchHelper#event:search
   * @property {object} event
   * @property {SearchParameters} event.state the parameters used for this search
   * @property {SearchResults} event.results the results from the previous search. `null` if it is the first search.
   * @example
   * helper.on('search', function(event) {
   *   console.log('Search sent');
   * });
   */

  /**
   * Event triggered when a search using `searchForFacetValues` is sent to Algolia
   * @event AlgoliaSearchHelper#event:searchForFacetValues
   * @property {object} event
   * @property {SearchParameters} event.state the parameters used for this search it is the first search.
   * @property {string} event.facet the facet searched into
   * @property {string} event.query the query used to search in the facets
   * @example
   * helper.on('searchForFacetValues', function(event) {
   *   console.log('searchForFacetValues sent');
   * });
   */

  /**
   * Event triggered when a search using `searchOnce` is sent to Algolia
   * @event AlgoliaSearchHelper#event:searchOnce
   * @property {object} event
   * @property {SearchParameters} event.state the parameters used for this search it is the first search.
   * @example
   * helper.on('searchOnce', function(event) {
   *   console.log('searchOnce sent');
   * });
   */

  /**
   * Event triggered when the results are retrieved from Algolia
   * @event AlgoliaSearchHelper#event:result
   * @property {object} event
   * @property {SearchResults} event.results the results received from Algolia
   * @property {SearchParameters} event.state the parameters used to query Algolia. Those might be different from the one in the helper instance (for example if the network is unreliable).
   * @example
   * helper.on('result', function(event) {
   *   console.log('Search results received');
   * });
   */

  /**
   * Event triggered when Algolia sends back an error. For example, if an unknown parameter is
   * used, the error can be caught using this event.
   * @event AlgoliaSearchHelper#event:error
   * @property {object} event
   * @property {Error} event.error the error returned by the Algolia.
   * @example
   * helper.on('error', function(event) {
   *   console.log('Houston we got a problem.');
   * });
   */

  /**
   * Event triggered when the queue of queries have been depleted (with any result or outdated queries)
   * @event AlgoliaSearchHelper#event:searchQueueEmpty
   * @example
   * helper.on('searchQueueEmpty', function() {
   *   console.log('No more search pending');
   *   // This is received before the result event if we're not expecting new results
   * });
   *
   * helper.search();
   */

  /**
   * Initialize a new AlgoliaSearchHelper
   * @class
   * @classdesc The AlgoliaSearchHelper is a class that ease the management of the
   * search. It provides an event based interface for search callbacks:
   *  - change: when the internal search state is changed.
   *    This event contains a {@link SearchParameters} object and the
   *    {@link SearchResults} of the last result if any.
   *  - search: when a search is triggered using the `search()` method.
   *  - result: when the response is retrieved from Algolia and is processed.
   *    This event contains a {@link SearchResults} object and the
   *    {@link SearchParameters} corresponding to this answer.
   *  - error: when the response is an error. This event contains the error returned by the server.
   * @param  {AlgoliaSearch} client an AlgoliaSearch client
   * @param  {string} index the index name to query
   * @param  {SearchParameters | object} options an object defining the initial
   * config of the search. It doesn't have to be a {SearchParameters},
   * just an object containing the properties you need from it.
   */
  function AlgoliaSearchHelper(client, index, options) {
    if (typeof client.addAlgoliaAgent === 'function') {
      client.addAlgoliaAgent('JS Helper (' + version$1 + ')');
    }

    this.setClient(client);
    var opts = options || {};
    opts.index = index;
    this.state = SearchParameters_1.make(opts);
    this.lastResults = null;
    this._queryId = 0;
    this._lastQueryIdReceived = -1;
    this.derivedHelpers = [];
    this._currentNbQueries = 0;
  }

  inherits_1(AlgoliaSearchHelper, events.EventEmitter);

  /**
   * Start the search with the parameters set in the state. When the
   * method is called, it triggers a `search` event. The results will
   * be available through the `result` event. If an error occurs, an
   * `error` will be fired instead.
   * @return {AlgoliaSearchHelper}
   * @fires search
   * @fires result
   * @fires error
   * @chainable
   */
  AlgoliaSearchHelper.prototype.search = function() {
    this._search({onlyWithDerivedHelpers: false});
    return this;
  };

  AlgoliaSearchHelper.prototype.searchOnlyWithDerivedHelpers = function() {
    this._search({onlyWithDerivedHelpers: true});
    return this;
  };

  /**
   * Gets the search query parameters that would be sent to the Algolia Client
   * for the hits
   * @return {object} Query Parameters
   */
  AlgoliaSearchHelper.prototype.getQuery = function() {
    var state = this.state;
    return requestBuilder_1._getHitsSearchParams(state);
  };

  /**
   * Start a search using a modified version of the current state. This method does
   * not trigger the helper lifecycle and does not modify the state kept internally
   * by the helper. This second aspect means that the next search call will be the
   * same as a search call before calling searchOnce.
   * @param {object} options can contain all the parameters that can be set to SearchParameters
   * plus the index
   * @param {function} [callback] optional callback executed when the response from the
   * server is back.
   * @return {promise|undefined} if a callback is passed the method returns undefined
   * otherwise it returns a promise containing an object with two keys :
   *  - content with a SearchResults
   *  - state with the state used for the query as a SearchParameters
   * @example
   * // Changing the number of records returned per page to 1
   * // This example uses the callback API
   * var state = helper.searchOnce({hitsPerPage: 1},
   *   function(error, content, state) {
   *     // if an error occurred it will be passed in error, otherwise its value is null
   *     // content contains the results formatted as a SearchResults
   *     // state is the instance of SearchParameters used for this search
   *   });
   * @example
   * // Changing the number of records returned per page to 1
   * // This example uses the promise API
   * var state1 = helper.searchOnce({hitsPerPage: 1})
   *                 .then(promiseHandler);
   *
   * function promiseHandler(res) {
   *   // res contains
   *   // {
   *   //   content : SearchResults
   *   //   state   : SearchParameters (the one used for this specific search)
   *   // }
   * }
   */
  AlgoliaSearchHelper.prototype.searchOnce = function(options, cb) {
    var tempState = !options ? this.state : this.state.setQueryParameters(options);
    var queries = requestBuilder_1._getQueries(tempState.index, tempState);
    var self = this;

    this._currentNbQueries++;

    this.emit('searchOnce', {
      state: tempState
    });

    if (cb) {
      this.client
        .search(queries)
        .then(function(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) {
            self.emit('searchQueueEmpty');
          }

          cb(null, new SearchResults_1(tempState, content.results), tempState);
        })
        .catch(function(err) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) {
            self.emit('searchQueueEmpty');
          }

          cb(err, null, tempState);
        });

      return undefined;
    }

    return this.client.search(queries).then(function(content) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
      return {
        content: new SearchResults_1(tempState, content.results),
        state: tempState,
        _originalResponse: content
      };
    }, function(e) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
      throw e;
    });
  };

   /**
   * Start the search for answers with the parameters set in the state.
   * This method returns a promise.
   * @param {Object} options - the options for answers API call
   * @param {string[]} options.attributesForPrediction - Attributes to use for predictions. If empty, `searchableAttributes` is used instead.
   * @param {string[]} options.queryLanguages - The languages in the query. Currently only supports ['en'].
   * @param {number} options.nbHits - Maximum number of answers to retrieve from the Answers Engine. Cannot be greater than 1000.
   *
   * @return {promise} the answer results
   */
  AlgoliaSearchHelper.prototype.findAnswers = function(options) {
    var state = this.state;
    var derivedHelper = this.derivedHelpers[0];
    if (!derivedHelper) {
      return Promise.resolve([]);
    }
    var derivedState = derivedHelper.getModifiedState(state);
    var data = merge_1(
      {
        attributesForPrediction: options.attributesForPrediction,
        nbHits: options.nbHits
      },
      {
        params: omit(requestBuilder_1._getHitsSearchParams(derivedState), [
          'attributesToSnippet',
          'hitsPerPage',
          'restrictSearchableAttributes',
          'snippetEllipsisText' // FIXME remove this line once the engine is fixed.
        ])
      }
    );

    var errorMessage = 'search for answers was called, but this client does not have a function client.initIndex(index).findAnswers';
    if (typeof this.client.initIndex !== 'function') {
      throw new Error(errorMessage);
    }
    var index = this.client.initIndex(derivedState.index);
    if (typeof index.findAnswers !== 'function') {
      throw new Error(errorMessage);
    }
    return index.findAnswers(derivedState.query, options.queryLanguages, data);
  };

  /**
   * Structure of each result when using
   * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
   * @typedef FacetSearchHit
   * @type {object}
   * @property {string} value the facet value
   * @property {string} highlighted the facet value highlighted with the query string
   * @property {number} count number of occurrence of this facet value
   * @property {boolean} isRefined true if the value is already refined
   */

  /**
   * Structure of the data resolved by the
   * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
   * promise.
   * @typedef FacetSearchResult
   * @type {object}
   * @property {FacetSearchHit} facetHits the results for this search for facet values
   * @property {number} processingTimeMS time taken by the query inside the engine
   */

  /**
   * Search for facet values based on an query and the name of a faceted attribute. This
   * triggers a search and will return a promise. On top of using the query, it also sends
   * the parameters from the state so that the search is narrowed down to only the possible values.
   *
   * See the description of [FacetSearchResult](reference.html#FacetSearchResult)
   * @param {string} facet the name of the faceted attribute
   * @param {string} query the string query for the search
   * @param {number} [maxFacetHits] the maximum number values returned. Should be > 0 and <= 100
   * @param {object} [userState] the set of custom parameters to use on top of the current state. Setting a property to `undefined` removes
   * it in the generated query.
   * @return {promise.<FacetSearchResult>} the results of the search
   */
  AlgoliaSearchHelper.prototype.searchForFacetValues = function(facet, query, maxFacetHits, userState) {
    var clientHasSFFV = typeof this.client.searchForFacetValues === 'function';
    if (
      !clientHasSFFV &&
      typeof this.client.initIndex !== 'function'
    ) {
      throw new Error(
        'search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues'
      );
    }
    var state = this.state.setQueryParameters(userState || {});
    var isDisjunctive = state.isDisjunctiveFacet(facet);
    var algoliaQuery = requestBuilder_1.getSearchForFacetQuery(facet, query, maxFacetHits, state);

    this._currentNbQueries++;
    var self = this;

    this.emit('searchForFacetValues', {
      state: state,
      facet: facet,
      query: query
    });

    var searchForFacetValuesPromise = clientHasSFFV
      ? this.client.searchForFacetValues([{indexName: state.index, params: algoliaQuery}])
      : this.client.initIndex(state.index).searchForFacetValues(algoliaQuery);

    return searchForFacetValuesPromise.then(function addIsRefined(content) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');

      content = Array.isArray(content) ? content[0] : content;

      content.facetHits.forEach(function(f) {
        f.isRefined = isDisjunctive
          ? state.isDisjunctiveFacetRefined(facet, f.value)
          : state.isFacetRefined(facet, f.value);
      });

      return content;
    }, function(e) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
      throw e;
    });
  };

  /**
   * Sets the text query used for the search.
   *
   * This method resets the current page to 0.
   * @param  {string} q the user query
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.setQuery = function(q) {
    this._change({
      state: this.state.resetPage().setQuery(q),
      isPageReset: true
    });

    return this;
  };

  /**
   * Remove all the types of refinements except tags. A string can be provided to remove
   * only the refinements of a specific attribute. For more advanced use case, you can
   * provide a function instead. This function should follow the
   * [clearCallback definition](#SearchParameters.clearCallback).
   *
   * This method resets the current page to 0.
   * @param {string} [name] optional name of the facet / attribute on which we want to remove all refinements
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   * @example
   * // Removing all the refinements
   * helper.clearRefinements().search();
   * @example
   * // Removing all the filters on a the category attribute.
   * helper.clearRefinements('category').search();
   * @example
   * // Removing only the exclude filters on the category facet.
   * helper.clearRefinements(function(value, attribute, type) {
   *   return type === 'exclude' && attribute === 'category';
   * }).search();
   */
  AlgoliaSearchHelper.prototype.clearRefinements = function(name) {
    this._change({
      state: this.state.resetPage().clearRefinements(name),
      isPageReset: true
    });

    return this;
  };

  /**
   * Remove all the tag filters.
   *
   * This method resets the current page to 0.
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.clearTags = function() {
    this._change({
      state: this.state.resetPage().clearTags(),
      isPageReset: true
    });

    return this;
  };

  /**
   * Adds a disjunctive filter to a faceted attribute with the `value` provided. If the
   * filter is already set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value (will be converted to string)
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.addDisjunctiveFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().addDisjunctiveFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addDisjunctiveFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.addDisjunctiveRefine = function() {
    return this.addDisjunctiveFacetRefinement.apply(this, arguments);
  };

  /**
   * Adds a refinement on a hierarchical facet. It will throw
   * an exception if the facet is not defined or if the facet
   * is already refined.
   *
   * This method resets the current page to 0.
   * @param {string} facet the facet name
   * @param {string} path the hierarchical facet path
   * @return {AlgoliaSearchHelper}
   * @throws Error if the facet is not defined or if the facet is refined
   * @chainable
   * @fires change
   */
  AlgoliaSearchHelper.prototype.addHierarchicalFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().addHierarchicalFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * Adds a an numeric filter to an attribute with the `operator` and `value` provided. If the
   * filter is already set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param  {string} attribute the attribute on which the numeric filter applies
   * @param  {string} operator the operator of the filter
   * @param  {number} value the value of the filter
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.addNumericRefinement = function(attribute, operator, value) {
    this._change({
      state: this.state.resetPage().addNumericRefinement(attribute, operator, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * Adds a filter to a faceted attribute with the `value` provided. If the
   * filter is already set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value (will be converted to string)
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.addFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().addFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.addRefine = function() {
    return this.addFacetRefinement.apply(this, arguments);
  };


  /**
   * Adds a an exclusion filter to a faceted attribute with the `value` provided. If the
   * filter is already set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value (will be converted to string)
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.addFacetExclusion = function(facet, value) {
    this._change({
      state: this.state.resetPage().addExcludeRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetExclusion}
   */
  AlgoliaSearchHelper.prototype.addExclude = function() {
    return this.addFacetExclusion.apply(this, arguments);
  };

  /**
   * Adds a tag filter with the `tag` provided. If the
   * filter is already set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param {string} tag the tag to add to the filter
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.addTag = function(tag) {
    this._change({
      state: this.state.resetPage().addTagRefinement(tag),
      isPageReset: true
    });

    return this;
  };

  /**
   * Removes an numeric filter to an attribute with the `operator` and `value` provided. If the
   * filter is not set, it doesn't change the filters.
   *
   * Some parameters are optional, triggering different behavior:
   *  - if the value is not provided, then all the numeric value will be removed for the
   *  specified attribute/operator couple.
   *  - if the operator is not provided either, then all the numeric filter on this attribute
   *  will be removed.
   *
   * This method resets the current page to 0.
   * @param  {string} attribute the attribute on which the numeric filter applies
   * @param  {string} [operator] the operator of the filter
   * @param  {number} [value] the value of the filter
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeNumericRefinement = function(attribute, operator, value) {
    this._change({
      state: this.state.resetPage().removeNumericRefinement(attribute, operator, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * Removes a disjunctive filter to a faceted attribute with the `value` provided. If the
   * filter is not set, it doesn't change the filters.
   *
   * If the value is omitted, then this method will remove all the filters for the
   * attribute.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} [value] the associated value
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeDisjunctiveFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().removeDisjunctiveFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeDisjunctiveFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.removeDisjunctiveRefine = function() {
    return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
  };

  /**
   * Removes the refinement set on a hierarchical facet.
   * @param {string} facet the facet name
   * @return {AlgoliaSearchHelper}
   * @throws Error if the facet is not defined or if the facet is not refined
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeHierarchicalFacetRefinement = function(facet) {
    this._change({
      state: this.state.resetPage().removeHierarchicalFacetRefinement(facet),
      isPageReset: true
    });

    return this;
  };

  /**
   * Removes a filter to a faceted attribute with the `value` provided. If the
   * filter is not set, it doesn't change the filters.
   *
   * If the value is omitted, then this method will remove all the filters for the
   * attribute.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} [value] the associated value
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().removeFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.removeRefine = function() {
    return this.removeFacetRefinement.apply(this, arguments);
  };

  /**
   * Removes an exclusion filter to a faceted attribute with the `value` provided. If the
   * filter is not set, it doesn't change the filters.
   *
   * If the value is omitted, then this method will remove all the filters for the
   * attribute.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} [value] the associated value
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeFacetExclusion = function(facet, value) {
    this._change({
      state: this.state.resetPage().removeExcludeRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetExclusion}
   */
  AlgoliaSearchHelper.prototype.removeExclude = function() {
    return this.removeFacetExclusion.apply(this, arguments);
  };

  /**
   * Removes a tag filter with the `tag` provided. If the
   * filter is not set, it doesn't change the filters.
   *
   * This method resets the current page to 0.
   * @param {string} tag tag to remove from the filter
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.removeTag = function(tag) {
    this._change({
      state: this.state.resetPage().removeTagRefinement(tag),
      isPageReset: true
    });

    return this;
  };

  /**
   * Adds or removes an exclusion filter to a faceted attribute with the `value` provided. If
   * the value is set then it removes it, otherwise it adds the filter.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.toggleFacetExclusion = function(facet, value) {
    this._change({
      state: this.state.resetPage().toggleExcludeFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetExclusion}
   */
  AlgoliaSearchHelper.prototype.toggleExclude = function() {
    return this.toggleFacetExclusion.apply(this, arguments);
  };

  /**
   * Adds or removes a filter to a faceted attribute with the `value` provided. If
   * the value is set then it removes it, otherwise it adds the filter.
   *
   * This method can be used for conjunctive, disjunctive and hierarchical filters.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {AlgoliaSearchHelper}
   * @throws Error will throw an error if the facet is not declared in the settings of the helper
   * @fires change
   * @chainable
   * @deprecated since version 2.19.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.toggleRefinement = function(facet, value) {
    return this.toggleFacetRefinement(facet, value);
  };

  /**
   * Adds or removes a filter to a faceted attribute with the `value` provided. If
   * the value is set then it removes it, otherwise it adds the filter.
   *
   * This method can be used for conjunctive, disjunctive and hierarchical filters.
   *
   * This method resets the current page to 0.
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {AlgoliaSearchHelper}
   * @throws Error will throw an error if the facet is not declared in the settings of the helper
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.toggleFacetRefinement = function(facet, value) {
    this._change({
      state: this.state.resetPage().toggleFacetRefinement(facet, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
   */
  AlgoliaSearchHelper.prototype.toggleRefine = function() {
    return this.toggleFacetRefinement.apply(this, arguments);
  };

  /**
   * Adds or removes a tag filter with the `value` provided. If
   * the value is set then it removes it, otherwise it adds the filter.
   *
   * This method resets the current page to 0.
   * @param {string} tag tag to remove or add
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.toggleTag = function(tag) {
    this._change({
      state: this.state.resetPage().toggleTagRefinement(tag),
      isPageReset: true
    });

    return this;
  };

  /**
   * Increments the page number by one.
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   * @example
   * helper.setPage(0).nextPage().getPage();
   * // returns 1
   */
  AlgoliaSearchHelper.prototype.nextPage = function() {
    var page = this.state.page || 0;
    return this.setPage(page + 1);
  };

  /**
   * Decrements the page number by one.
   * @fires change
   * @return {AlgoliaSearchHelper}
   * @chainable
   * @example
   * helper.setPage(1).previousPage().getPage();
   * // returns 0
   */
  AlgoliaSearchHelper.prototype.previousPage = function() {
    var page = this.state.page || 0;
    return this.setPage(page - 1);
  };

  /**
   * @private
   */
  function setCurrentPage(page) {
    if (page < 0) throw new Error('Page requested below 0.');

    this._change({
      state: this.state.setPage(page),
      isPageReset: false
    });

    return this;
  }

  /**
   * Change the current page
   * @deprecated
   * @param  {number} page The page number
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.setCurrentPage = setCurrentPage;

  /**
   * Updates the current page.
   * @function
   * @param  {number} page The page number
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.setPage = setCurrentPage;

  /**
   * Updates the name of the index that will be targeted by the query.
   *
   * This method resets the current page to 0.
   * @param {string} name the index name
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.setIndex = function(name) {
    this._change({
      state: this.state.resetPage().setIndex(name),
      isPageReset: true
    });

    return this;
  };

  /**
   * Update a parameter of the search. This method reset the page
   *
   * The complete list of parameters is available on the
   * [Algolia website](https://www.algolia.com/doc/rest#query-an-index).
   * The most commonly used parameters have their own [shortcuts](#query-parameters-shortcuts)
   * or benefit from higher-level APIs (all the kind of filters and facets have their own API)
   *
   * This method resets the current page to 0.
   * @param {string} parameter name of the parameter to update
   * @param {any} value new value of the parameter
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   * @example
   * helper.setQueryParameter('hitsPerPage', 20).search();
   */
  AlgoliaSearchHelper.prototype.setQueryParameter = function(parameter, value) {
    this._change({
      state: this.state.resetPage().setQueryParameter(parameter, value),
      isPageReset: true
    });

    return this;
  };

  /**
   * Set the whole state (warning: will erase previous state)
   * @param {SearchParameters} newState the whole new state
   * @return {AlgoliaSearchHelper}
   * @fires change
   * @chainable
   */
  AlgoliaSearchHelper.prototype.setState = function(newState) {
    this._change({
      state: SearchParameters_1.make(newState),
      isPageReset: false
    });

    return this;
  };

  /**
   * Override the current state without triggering a change event.
   * Do not use this method unless you know what you are doing. (see the example
   * for a legit use case)
   * @param {SearchParameters} newState the whole new state
   * @return {AlgoliaSearchHelper}
   * @example
   *  helper.on('change', function(state){
   *    // In this function you might want to find a way to store the state in the url/history
   *    updateYourURL(state)
   *  })
   *  window.onpopstate = function(event){
   *    // This is naive though as you should check if the state is really defined etc.
   *    helper.overrideStateWithoutTriggeringChangeEvent(event.state).search()
   *  }
   * @chainable
   */
  AlgoliaSearchHelper.prototype.overrideStateWithoutTriggeringChangeEvent = function(newState) {
    this.state = new SearchParameters_1(newState);
    return this;
  };

  /**
   * Check if an attribute has any numeric, conjunctive, disjunctive or hierarchical filters.
   * @param {string} attribute the name of the attribute
   * @return {boolean} true if the attribute is filtered by at least one value
   * @example
   * // hasRefinements works with numeric, conjunctive, disjunctive and hierarchical filters
   * helper.hasRefinements('price'); // false
   * helper.addNumericRefinement('price', '>', 100);
   * helper.hasRefinements('price'); // true
   *
   * helper.hasRefinements('color'); // false
   * helper.addFacetRefinement('color', 'blue');
   * helper.hasRefinements('color'); // true
   *
   * helper.hasRefinements('material'); // false
   * helper.addDisjunctiveFacetRefinement('material', 'plastic');
   * helper.hasRefinements('material'); // true
   *
   * helper.hasRefinements('categories'); // false
   * helper.toggleFacetRefinement('categories', 'kitchen > knife');
   * helper.hasRefinements('categories'); // true
   *
   */
  AlgoliaSearchHelper.prototype.hasRefinements = function(attribute) {
    if (objectHasKeys_1(this.state.getNumericRefinements(attribute))) {
      return true;
    } else if (this.state.isConjunctiveFacet(attribute)) {
      return this.state.isFacetRefined(attribute);
    } else if (this.state.isDisjunctiveFacet(attribute)) {
      return this.state.isDisjunctiveFacetRefined(attribute);
    } else if (this.state.isHierarchicalFacet(attribute)) {
      return this.state.isHierarchicalFacetRefined(attribute);
    }

    // there's currently no way to know that the user did call `addNumericRefinement` at some point
    // thus we cannot distinguish if there once was a numeric refinement that was cleared
    // so we will return false in every other situations to be consistent
    // while what we should do here is throw because we did not find the attribute in any type
    // of refinement
    return false;
  };

  /**
   * Check if a value is excluded for a specific faceted attribute. If the value
   * is omitted then the function checks if there is any excluding refinements.
   *
   * @param  {string}  facet name of the attribute for used for faceting
   * @param  {string}  [value] optional value. If passed will test that this value
     * is filtering the given facet.
   * @return {boolean} true if refined
   * @example
   * helper.isExcludeRefined('color'); // false
   * helper.isExcludeRefined('color', 'blue') // false
   * helper.isExcludeRefined('color', 'red') // false
   *
   * helper.addFacetExclusion('color', 'red');
   *
   * helper.isExcludeRefined('color'); // true
   * helper.isExcludeRefined('color', 'blue') // false
   * helper.isExcludeRefined('color', 'red') // true
   */
  AlgoliaSearchHelper.prototype.isExcluded = function(facet, value) {
    return this.state.isExcludeRefined(facet, value);
  };

  /**
   * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasRefinements}
   */
  AlgoliaSearchHelper.prototype.isDisjunctiveRefined = function(facet, value) {
    return this.state.isDisjunctiveFacetRefined(facet, value);
  };

  /**
   * Check if the string is a currently filtering tag.
   * @param {string} tag tag to check
   * @return {boolean}
   */
  AlgoliaSearchHelper.prototype.hasTag = function(tag) {
    return this.state.isTagRefined(tag);
  };

  /**
   * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasTag}
   */
  AlgoliaSearchHelper.prototype.isTagRefined = function() {
    return this.hasTagRefinements.apply(this, arguments);
  };


  /**
   * Get the name of the currently used index.
   * @return {string}
   * @example
   * helper.setIndex('highestPrice_products').getIndex();
   * // returns 'highestPrice_products'
   */
  AlgoliaSearchHelper.prototype.getIndex = function() {
    return this.state.index;
  };

  function getCurrentPage() {
    return this.state.page;
  }

  /**
   * Get the currently selected page
   * @deprecated
   * @return {number} the current page
   */
  AlgoliaSearchHelper.prototype.getCurrentPage = getCurrentPage;
  /**
   * Get the currently selected page
   * @function
   * @return {number} the current page
   */
  AlgoliaSearchHelper.prototype.getPage = getCurrentPage;

  /**
   * Get all the tags currently set to filters the results.
   *
   * @return {string[]} The list of tags currently set.
   */
  AlgoliaSearchHelper.prototype.getTags = function() {
    return this.state.tagRefinements;
  };

  /**
   * Get the list of refinements for a given attribute. This method works with
   * conjunctive, disjunctive, excluding and numerical filters.
   *
   * See also SearchResults#getRefinements
   *
   * @param {string} facetName attribute name used for faceting
   * @return {Array.<FacetRefinement|NumericRefinement>} All Refinement are objects that contain a value, and
   * a type. Numeric also contains an operator.
   * @example
   * helper.addNumericRefinement('price', '>', 100);
   * helper.getRefinements('price');
   * // [
   * //   {
   * //     "value": [
   * //       100
   * //     ],
   * //     "operator": ">",
   * //     "type": "numeric"
   * //   }
   * // ]
   * @example
   * helper.addFacetRefinement('color', 'blue');
   * helper.addFacetExclusion('color', 'red');
   * helper.getRefinements('color');
   * // [
   * //   {
   * //     "value": "blue",
   * //     "type": "conjunctive"
   * //   },
   * //   {
   * //     "value": "red",
   * //     "type": "exclude"
   * //   }
   * // ]
   * @example
   * helper.addDisjunctiveFacetRefinement('material', 'plastic');
   * // [
   * //   {
   * //     "value": "plastic",
   * //     "type": "disjunctive"
   * //   }
   * // ]
   */
  AlgoliaSearchHelper.prototype.getRefinements = function(facetName) {
    var refinements = [];

    if (this.state.isConjunctiveFacet(facetName)) {
      var conjRefinements = this.state.getConjunctiveRefinements(facetName);

      conjRefinements.forEach(function(r) {
        refinements.push({
          value: r,
          type: 'conjunctive'
        });
      });

      var excludeRefinements = this.state.getExcludeRefinements(facetName);

      excludeRefinements.forEach(function(r) {
        refinements.push({
          value: r,
          type: 'exclude'
        });
      });
    } else if (this.state.isDisjunctiveFacet(facetName)) {
      var disjRefinements = this.state.getDisjunctiveRefinements(facetName);

      disjRefinements.forEach(function(r) {
        refinements.push({
          value: r,
          type: 'disjunctive'
        });
      });
    }

    var numericRefinements = this.state.getNumericRefinements(facetName);

    Object.keys(numericRefinements).forEach(function(operator) {
      var value = numericRefinements[operator];

      refinements.push({
        value: value,
        operator: operator,
        type: 'numeric'
      });
    });

    return refinements;
  };

  /**
   * Return the current refinement for the (attribute, operator)
   * @param {string} attribute attribute in the record
   * @param {string} operator operator applied on the refined values
   * @return {Array.<number|number[]>} refined values
   */
  AlgoliaSearchHelper.prototype.getNumericRefinement = function(attribute, operator) {
    return this.state.getNumericRefinement(attribute, operator);
  };

  /**
   * Get the current breadcrumb for a hierarchical facet, as an array
   * @param  {string} facetName Hierarchical facet name
   * @return {array.<string>} the path as an array of string
   */
  AlgoliaSearchHelper.prototype.getHierarchicalFacetBreadcrumb = function(facetName) {
    return this.state.getHierarchicalFacetBreadcrumb(facetName);
  };

  // /////////// PRIVATE

  /**
   * Perform the underlying queries
   * @private
   * @return {undefined}
   * @fires search
   * @fires result
   * @fires error
   */
  AlgoliaSearchHelper.prototype._search = function(options) {
    var state = this.state;
    var states = [];
    var mainQueries = [];

    if (!options.onlyWithDerivedHelpers) {
      mainQueries = requestBuilder_1._getQueries(state.index, state);

      states.push({
        state: state,
        queriesCount: mainQueries.length,
        helper: this
      });

      this.emit('search', {
        state: state,
        results: this.lastResults
      });
    }

    var derivedQueries = this.derivedHelpers.map(function(derivedHelper) {
      var derivedState = derivedHelper.getModifiedState(state);
      var derivedStateQueries = requestBuilder_1._getQueries(derivedState.index, derivedState);

      states.push({
        state: derivedState,
        queriesCount: derivedStateQueries.length,
        helper: derivedHelper
      });

      derivedHelper.emit('search', {
        state: derivedState,
        results: derivedHelper.lastResults
      });

      return derivedStateQueries;
    });

    var queries = Array.prototype.concat.apply(mainQueries, derivedQueries);
    var queryId = this._queryId++;

    this._currentNbQueries++;

    try {
      this.client.search(queries)
        .then(this._dispatchAlgoliaResponse.bind(this, states, queryId))
        .catch(this._dispatchAlgoliaError.bind(this, queryId));
    } catch (error) {
      // If we reach this part, we're in an internal error state
      this.emit('error', {
        error: error
      });
    }
  };

  /**
   * Transform the responses as sent by the server and transform them into a user
   * usable object that merge the results of all the batch requests. It will dispatch
   * over the different helper + derived helpers (when there are some).
   * @private
   * @param {array.<{SearchParameters, AlgoliaQueries, AlgoliaSearchHelper}>}
   *  state state used for to generate the request
   * @param {number} queryId id of the current request
   * @param {object} content content of the response
   * @return {undefined}
   */
  AlgoliaSearchHelper.prototype._dispatchAlgoliaResponse = function(states, queryId, content) {
    // FIXME remove the number of outdated queries discarded instead of just one

    if (queryId < this._lastQueryIdReceived) {
      // Outdated answer
      return;
    }

    this._currentNbQueries -= (queryId - this._lastQueryIdReceived);
    this._lastQueryIdReceived = queryId;

    if (this._currentNbQueries === 0) this.emit('searchQueueEmpty');

    var results = content.results.slice();

    states.forEach(function(s) {
      var state = s.state;
      var queriesCount = s.queriesCount;
      var helper = s.helper;
      var specificResults = results.splice(0, queriesCount);

      var formattedResponse = helper.lastResults = new SearchResults_1(state, specificResults);

      helper.emit('result', {
        results: formattedResponse,
        state: state
      });
    });
  };

  AlgoliaSearchHelper.prototype._dispatchAlgoliaError = function(queryId, error) {
    if (queryId < this._lastQueryIdReceived) {
      // Outdated answer
      return;
    }

    this._currentNbQueries -= queryId - this._lastQueryIdReceived;
    this._lastQueryIdReceived = queryId;

    this.emit('error', {
      error: error
    });

    if (this._currentNbQueries === 0) this.emit('searchQueueEmpty');
  };

  AlgoliaSearchHelper.prototype.containsRefinement = function(query, facetFilters, numericFilters, tagFilters) {
    return query ||
      facetFilters.length !== 0 ||
      numericFilters.length !== 0 ||
      tagFilters.length !== 0;
  };

  /**
   * Test if there are some disjunctive refinements on the facet
   * @private
   * @param {string} facet the attribute to test
   * @return {boolean}
   */
  AlgoliaSearchHelper.prototype._hasDisjunctiveRefinements = function(facet) {
    return this.state.disjunctiveRefinements[facet] &&
      this.state.disjunctiveRefinements[facet].length > 0;
  };

  AlgoliaSearchHelper.prototype._change = function(event) {
    var state = event.state;
    var isPageReset = event.isPageReset;

    if (state !== this.state) {
      this.state = state;

      this.emit('change', {
        state: this.state,
        results: this.lastResults,
        isPageReset: isPageReset
      });
    }
  };

  /**
   * Clears the cache of the underlying Algolia client.
   * @return {AlgoliaSearchHelper}
   */
  AlgoliaSearchHelper.prototype.clearCache = function() {
    this.client.clearCache && this.client.clearCache();
    return this;
  };

  /**
   * Updates the internal client instance. If the reference of the clients
   * are equal then no update is actually done.
   * @param  {AlgoliaSearch} newClient an AlgoliaSearch client
   * @return {AlgoliaSearchHelper}
   */
  AlgoliaSearchHelper.prototype.setClient = function(newClient) {
    if (this.client === newClient) return this;

    if (typeof newClient.addAlgoliaAgent === 'function') {
      newClient.addAlgoliaAgent('JS Helper (' + version$1 + ')');
    }
    this.client = newClient;

    return this;
  };

  /**
   * Gets the instance of the currently used client.
   * @return {AlgoliaSearch}
   */
  AlgoliaSearchHelper.prototype.getClient = function() {
    return this.client;
  };

  /**
   * Creates an derived instance of the Helper. A derived helper
   * is a way to request other indices synchronised with the lifecycle
   * of the main Helper. This mechanism uses the multiqueries feature
   * of Algolia to aggregate all the requests in a single network call.
   *
   * This method takes a function that is used to create a new SearchParameter
   * that will be used to create requests to Algolia. Those new requests
   * are created just before the `search` event. The signature of the function
   * is `SearchParameters -> SearchParameters`.
   *
   * This method returns a new DerivedHelper which is an EventEmitter
   * that fires the same `search`, `result` and `error` events. Those
   * events, however, will receive data specific to this DerivedHelper
   * and the SearchParameters that is returned by the call of the
   * parameter function.
   * @param {function} fn SearchParameters -> SearchParameters
   * @return {DerivedHelper}
   */
  AlgoliaSearchHelper.prototype.derive = function(fn) {
    var derivedHelper = new DerivedHelper_1(this, fn);
    this.derivedHelpers.push(derivedHelper);
    return derivedHelper;
  };

  /**
   * This method detaches a derived Helper from the main one. Prefer using the one from the
   * derived helper itself, to remove the event listeners too.
   * @private
   * @return {undefined}
   * @throws Error
   */
  AlgoliaSearchHelper.prototype.detachDerivedHelper = function(derivedHelper) {
    var pos = this.derivedHelpers.indexOf(derivedHelper);
    if (pos === -1) throw new Error('Derived helper already detached');
    this.derivedHelpers.splice(pos, 1);
  };

  /**
   * This method returns true if there is currently at least one on-going search.
   * @return {boolean} true if there is a search pending
   */
  AlgoliaSearchHelper.prototype.hasPendingRequests = function() {
    return this._currentNbQueries > 0;
  };

  /**
   * @typedef AlgoliaSearchHelper.NumericRefinement
   * @type {object}
   * @property {number[]} value the numbers that are used for filtering this attribute with
   * the operator specified.
   * @property {string} operator the faceting data: value, number of entries
   * @property {string} type will be 'numeric'
   */

  /**
   * @typedef AlgoliaSearchHelper.FacetRefinement
   * @type {object}
   * @property {string} value the string use to filter the attribute
   * @property {string} type the type of filter: 'conjunctive', 'disjunctive', 'exclude'
   */

  var algoliasearch_helper = AlgoliaSearchHelper;

  /**
   * The algoliasearchHelper module is the function that will let its
   * contains everything needed to use the Algoliasearch
   * Helper. It is a also a function that instanciate the helper.
   * To use the helper, you also need the Algolia JS client v3.
   * @example
   * //using the UMD build
   * var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
   * var helper = algoliasearchHelper(client, 'bestbuy', {
   *   facets: ['shipping'],
   *   disjunctiveFacets: ['category']
   * });
   * helper.on('result', function(event) {
   *   console.log(event.results);
   * });
   * helper
   *   .toggleFacetRefinement('category', 'Movies & TV Shows')
   *   .toggleFacetRefinement('shipping', 'Free shipping')
   *   .search();
   * @example
   * // The helper is an event emitter using the node API
   * helper.on('result', updateTheResults);
   * helper.once('result', updateTheResults);
   * helper.removeListener('result', updateTheResults);
   * helper.removeAllListeners('result');
   * @module algoliasearchHelper
   * @param  {AlgoliaSearch} client an AlgoliaSearch client
   * @param  {string} index the name of the index to query
   * @param  {SearchParameters|object} opts an object defining the initial config of the search. It doesn't have to be a {SearchParameters}, just an object containing the properties you need from it.
   * @return {AlgoliaSearchHelper}
   */
  function algoliasearchHelper(client, index, opts) {
    return new algoliasearch_helper(client, index, opts);
  }

  /**
   * The version currently used
   * @member module:algoliasearchHelper.version
   * @type {number}
   */
  algoliasearchHelper.version = version$1;

  /**
   * Constructor for the Helper.
   * @member module:algoliasearchHelper.AlgoliaSearchHelper
   * @type {AlgoliaSearchHelper}
   */
  algoliasearchHelper.AlgoliaSearchHelper = algoliasearch_helper;

  /**
   * Constructor for the object containing all the parameters of the search.
   * @member module:algoliasearchHelper.SearchParameters
   * @type {SearchParameters}
   */
  algoliasearchHelper.SearchParameters = SearchParameters_1;

  /**
   * Constructor for the object containing the results of the search.
   * @member module:algoliasearchHelper.SearchResults
   * @type {SearchResults}
   */
  algoliasearchHelper.SearchResults = SearchResults_1;

  var algoliasearchHelper_1 = algoliasearchHelper;

  var nextMicroTask = Promise.resolve();

  var defer = function defer(callback) {
    var progress = null;
    var cancelled = false;

    var fn = function fn() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (progress !== null) {
        return;
      }

      progress = nextMicroTask.then(function () {
        progress = null;

        if (cancelled) {
          cancelled = false;
          return;
        }

        callback.apply(void 0, args);
      });
    };

    fn.wait = function () {
      if (progress === null) {
        throw new Error('The deferred function should be called before calling `wait()`');
      }

      return progress;
    };

    fn.cancel = function () {
      if (progress === null) {
        return;
      }

      cancelled = true;
    };

    return fn;
  };

  function uniq(array) {
    return array.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  }

  // We aren't using the native `Array.prototype.find` because the refactor away from Lodash is not
  // published as a major version.
  // Relying on the `find` polyfill on user-land, which before was only required for niche use-cases,
  // was decided as too risky.
  // @MAJOR Replace with the native `Array.prototype.find` method
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  function find$1(items, predicate) {
    var value;

    for (var i = 0; i < items.length; i++) {
      value = items[i]; // inlined for performance: if (Call(predicate, thisArg, [value, i, list])) {

      if (predicate(value, i, items)) {
        return value;
      }
    }

    return undefined;
  }

  function getObjectType(object) {
    return Object.prototype.toString.call(object).slice(8, -1);
  }

  function checkRendering(rendering, usage) {
    if (rendering === undefined || typeof rendering !== 'function') {
      throw new Error("The render function is not valid (received type ".concat(getObjectType(rendering), ").\n\n").concat(usage));
    }
  }

  function noop() {}

  /**
   * Logs a warning when this function is called, in development environment only.
   */
  var deprecate = function deprecate(fn, message) {
    return fn;
  };

  function getPropertyByPath(object, path) {
    var parts = Array.isArray(path) ? path : path.split('.');
    return parts.reduce(function (current, key) {
      return current && current[key];
    }, object);
  }

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  /**
   * This implementation is taken from Lodash implementation.
   * See: https://github.com/lodash/lodash/blob/master/isPlainObject.js
   */
  function getTag(value) {
    if (value === null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return Object.prototype.toString.call(value);
  }

  function isObjectLike(value) {
    return _typeof(value) === 'object' && value !== null;
  }
  /**
   * Checks if `value` is a plain object.
   *
   * A plain object is an object created by the `Object`
   * constructor or with a `[[Prototype]]` of `null`.
   */


  function isPlainObject(value) {
    if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
      return false;
    }

    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function range(_ref) {
    var _ref$start = _ref.start,
        start = _ref$start === void 0 ? 0 : _ref$start,
        end = _ref.end,
        _ref$step = _ref.step,
        step = _ref$step === void 0 ? 1 : _ref$step;
    // We can't divide by 0 so we re-assign the step to 1 if it happens.
    var limitStep = step === 0 ? 1 : step; // In some cases the array to create has a decimal length.
    // We therefore need to round the value.
    // Example:
    //   { start: 1, end: 5000, step: 500 }
    //   => Array length = (5000 - 1) / 500 = 9.998

    var arrayLength = Math.round((end - start) / limitStep);
    return _toConsumableArray(Array(arrayLength)).map(function (_, current) {
      return start + current * limitStep;
    });
  }

  function isPrimitive(obj) {
    return obj !== Object(obj);
  }

  function isEqual(first, second) {
    if (first === second) {
      return true;
    }

    if (isPrimitive(first) || isPrimitive(second) || typeof first === 'function' || typeof second === 'function') {
      return first === second;
    }

    if (Object.keys(first).length !== Object.keys(second).length) {
      return false;
    }

    for (var _i = 0, _Object$keys = Object.keys(first); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];

      if (!(key in second)) {
        return false;
      }

      if (!isEqual(first[key], second[key])) {
        return false;
      }
    }

    return true;
  }

  /**
   * This implementation is taken from Lodash implementation.
   * See: https://github.com/lodash/lodash/blob/4.17.11-npm/escape.js
   */
  // Used to map characters to HTML entities.
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }; // Used to match HTML entities and HTML characters.

  var regexUnescapedHtml = /[&<>"']/g;
  var regexHasUnescapedHtml = RegExp(regexUnescapedHtml.source);
  /**
   * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
   * corresponding HTML entities.
   */

  function escape$1(value) {
    return value && regexHasUnescapedHtml.test(value) ? value.replace(regexUnescapedHtml, function (character) {
      return htmlEscapes[character];
    }) : value;
  }

  /**
   * This implementation is taken from Lodash implementation.
   * See: https://github.com/lodash/lodash/blob/4.17.11-npm/unescape.js
   */
  // Used to map HTML entities to characters.
  var htmlEscapes$1 = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  }; // Used to match HTML entities and HTML characters.

  var regexEscapedHtml = /&(amp|quot|lt|gt|#39);/g;
  var regexHasEscapedHtml = RegExp(regexEscapedHtml.source);
  /**
   * Converts the HTML entities "&", "<", ">", '"', and "'" in `string` to their
   * characters.
   */

  function unescape$1(value) {
    return value && regexHasEscapedHtml.test(value) ? value.replace(regexEscapedHtml, function (character) {
      return htmlEscapes$1[character];
    }) : value;
  }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var TAG_PLACEHOLDER = {
    highlightPreTag: '__ais-highlight__',
    highlightPostTag: '__/ais-highlight__'
  };
  var TAG_REPLACEMENT = {
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>'
  };

  function replaceTagsAndEscape(value) {
    return escape$1(value).replace(new RegExp(TAG_PLACEHOLDER.highlightPreTag, 'g'), TAG_REPLACEMENT.highlightPreTag).replace(new RegExp(TAG_PLACEHOLDER.highlightPostTag, 'g'), TAG_REPLACEMENT.highlightPostTag);
  }

  function recursiveEscape(input) {
    if (isPlainObject(input) && typeof input.value !== 'string') {
      return Object.keys(input).reduce(function (acc, key) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, recursiveEscape(input[key])));
      }, {});
    }

    if (Array.isArray(input)) {
      return input.map(recursiveEscape);
    }

    return _objectSpread(_objectSpread({}, input), {}, {
      value: replaceTagsAndEscape(input.value)
    });
  }

  function escapeHits(hits) {
    if (hits.__escaped === undefined) {
      // We don't override the value on hit because it will mutate the raw results
      // instead we make a shallow copy and we assign the escaped values on it.
      hits = hits.map(function (_ref) {
        var hit = _extends({}, _ref);

        if (hit._highlightResult) {
          hit._highlightResult = recursiveEscape(hit._highlightResult);
        }

        if (hit._snippetResult) {
          hit._snippetResult = recursiveEscape(hit._snippetResult);
        }

        return hit;
      });
      hits.__escaped = true;
    }

    return hits;
  }
  function escapeFacets(facetHits) {
    return facetHits.map(function (h) {
      return _objectSpread(_objectSpread({}, h), {}, {
        highlighted: replaceTagsAndEscape(h.highlighted)
      });
    });
  }

  function concatHighlightedParts(parts) {
    var highlightPreTag = TAG_REPLACEMENT.highlightPreTag,
        highlightPostTag = TAG_REPLACEMENT.highlightPostTag;
    return parts.map(function (part) {
      return part.isHighlighted ? highlightPreTag + part.value + highlightPostTag : part.value;
    }).join('');
  }

  function getHighlightedParts(highlightedValue) {
    var highlightPostTag = TAG_REPLACEMENT.highlightPostTag,
        highlightPreTag = TAG_REPLACEMENT.highlightPreTag;
    var splitByPreTag = highlightedValue.split(highlightPreTag);
    var firstValue = splitByPreTag.shift();
    var elements = !firstValue ? [] : [{
      value: firstValue,
      isHighlighted: false
    }];
    splitByPreTag.forEach(function (split) {
      var splitByPostTag = split.split(highlightPostTag);
      elements.push({
        value: splitByPostTag[0],
        isHighlighted: true
      });

      if (splitByPostTag[1] !== '') {
        elements.push({
          value: splitByPostTag[1],
          isHighlighted: false
        });
      }
    });
    return elements;
  }

  var hasAlphanumeric = new RegExp(/\w/i);
  function getHighlightFromSiblings(parts, i) {
    var _parts, _parts2;

    var current = parts[i];
    var isNextHighlighted = ((_parts = parts[i + 1]) === null || _parts === void 0 ? void 0 : _parts.isHighlighted) || true;
    var isPreviousHighlighted = ((_parts2 = parts[i - 1]) === null || _parts2 === void 0 ? void 0 : _parts2.isHighlighted) || true;

    if (!hasAlphanumeric.test(unescape$1(current.value)) && isPreviousHighlighted === isNextHighlighted) {
      return isPreviousHighlighted;
    }

    return current.isHighlighted;
  }

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function reverseHighlightedParts(parts) {
    if (!parts.some(function (part) {
      return part.isHighlighted;
    })) {
      return parts.map(function (part) {
        return _objectSpread$1(_objectSpread$1({}, part), {}, {
          isHighlighted: false
        });
      });
    }

    return parts.map(function (part, i) {
      return _objectSpread$1(_objectSpread$1({}, part), {}, {
        isHighlighted: !getHighlightFromSiblings(parts, i)
      });
    });
  }

  // We aren't using the native `Array.prototype.findIndex` because the refactor away from Lodash is not
  // published as a major version.
  // Relying on the `findIndex` polyfill on user-land, which before was only required for niche use-cases,
  // was decided as too risky.
  // @MAJOR Replace with the native `Array.prototype.findIndex` method
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  function findIndex$1(array, comparator) {
    if (!Array.isArray(array)) {
      return -1;
    }

    for (var i = 0; i < array.length; i++) {
      if (comparator(array[i])) {
        return i;
      }
    }

    return -1;
  }

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$2(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

  var mergeWithRest = function mergeWithRest(left, right) {
    var facets = right.facets,
        disjunctiveFacets = right.disjunctiveFacets,
        facetsRefinements = right.facetsRefinements,
        facetsExcludes = right.facetsExcludes,
        disjunctiveFacetsRefinements = right.disjunctiveFacetsRefinements,
        numericRefinements = right.numericRefinements,
        tagRefinements = right.tagRefinements,
        hierarchicalFacets = right.hierarchicalFacets,
        hierarchicalFacetsRefinements = right.hierarchicalFacetsRefinements,
        ruleContexts = right.ruleContexts,
        rest = _objectWithoutProperties$1(right, ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"]);

    return left.setQueryParameters(rest);
  }; // Merge facets


  var mergeFacets = function mergeFacets(left, right) {
    return right.facets.reduce(function (_, name) {
      return _.addFacet(name);
    }, left);
  };

  var mergeDisjunctiveFacets = function mergeDisjunctiveFacets(left, right) {
    return right.disjunctiveFacets.reduce(function (_, name) {
      return _.addDisjunctiveFacet(name);
    }, left);
  };

  var mergeHierarchicalFacets = function mergeHierarchicalFacets(left, right) {
    return left.setQueryParameters({
      hierarchicalFacets: right.hierarchicalFacets.reduce(function (facets, facet) {
        var index = findIndex$1(facets, function (_) {
          return _.name === facet.name;
        });

        if (index === -1) {
          return facets.concat(facet);
        }

        var nextFacets = facets.slice();
        nextFacets.splice(index, 1, facet);
        return nextFacets;
      }, left.hierarchicalFacets)
    });
  }; // Merge facet refinements


  var mergeTagRefinements = function mergeTagRefinements(left, right) {
    return right.tagRefinements.reduce(function (_, value) {
      return _.addTagRefinement(value);
    }, left);
  };

  var mergeFacetRefinements = function mergeFacetRefinements(left, right) {
    return left.setQueryParameters({
      facetsRefinements: _objectSpread$2(_objectSpread$2({}, left.facetsRefinements), right.facetsRefinements)
    });
  };

  var mergeFacetsExcludes = function mergeFacetsExcludes(left, right) {
    return left.setQueryParameters({
      facetsExcludes: _objectSpread$2(_objectSpread$2({}, left.facetsExcludes), right.facetsExcludes)
    });
  };

  var mergeDisjunctiveFacetsRefinements = function mergeDisjunctiveFacetsRefinements(left, right) {
    return left.setQueryParameters({
      disjunctiveFacetsRefinements: _objectSpread$2(_objectSpread$2({}, left.disjunctiveFacetsRefinements), right.disjunctiveFacetsRefinements)
    });
  };

  var mergeNumericRefinements = function mergeNumericRefinements(left, right) {
    return left.setQueryParameters({
      numericRefinements: _objectSpread$2(_objectSpread$2({}, left.numericRefinements), right.numericRefinements)
    });
  };

  var mergeHierarchicalFacetsRefinements = function mergeHierarchicalFacetsRefinements(left, right) {
    return left.setQueryParameters({
      hierarchicalFacetsRefinements: _objectSpread$2(_objectSpread$2({}, left.hierarchicalFacetsRefinements), right.hierarchicalFacetsRefinements)
    });
  };

  var mergeRuleContexts = function mergeRuleContexts(left, right) {
    var ruleContexts = uniq([].concat(left.ruleContexts).concat(right.ruleContexts).filter(Boolean));

    if (ruleContexts.length > 0) {
      return left.setQueryParameters({
        ruleContexts: ruleContexts
      });
    }

    return left;
  };

  var merge$1 = function merge() {
    for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
      parameters[_key] = arguments[_key];
    }

    return parameters.reduce(function (left, right) {
      var hierarchicalFacetsRefinementsMerged = mergeHierarchicalFacetsRefinements(left, right);
      var hierarchicalFacetsMerged = mergeHierarchicalFacets(hierarchicalFacetsRefinementsMerged, right);
      var tagRefinementsMerged = mergeTagRefinements(hierarchicalFacetsMerged, right);
      var numericRefinementsMerged = mergeNumericRefinements(tagRefinementsMerged, right);
      var disjunctiveFacetsRefinementsMerged = mergeDisjunctiveFacetsRefinements(numericRefinementsMerged, right);
      var facetsExcludesMerged = mergeFacetsExcludes(disjunctiveFacetsRefinementsMerged, right);
      var facetRefinementsMerged = mergeFacetRefinements(facetsExcludesMerged, right);
      var disjunctiveFacetsMerged = mergeDisjunctiveFacets(facetRefinementsMerged, right);
      var ruleContextsMerged = mergeRuleContexts(disjunctiveFacetsMerged, right);
      var facetsMerged = mergeFacets(ruleContextsMerged, right);
      return mergeWithRest(facetsMerged, right);
    });
  };

  var resolveSearchParameters = function resolveSearchParameters(current) {
    var parent = current.getParent();
    var states = [current.getHelper().state];

    while (parent !== null) {
      states = [parent.getHelper().state].concat(states);
      parent = parent.getParent();
    }

    return states;
  };

  var createDocumentationLink = function createDocumentationLink(_ref) {
    var name = _ref.name,
        _ref$connector = _ref.connector,
        connector = _ref$connector === void 0 ? false : _ref$connector;
    return ['https://www.algolia.com/doc/api-reference/widgets/', name, '/js/', connector ? '#connector' : ''].join('');
  };
  var createDocumentationMessageGenerator = function createDocumentationMessageGenerator() {
    for (var _len = arguments.length, widgets = new Array(_len), _key = 0; _key < _len; _key++) {
      widgets[_key] = arguments[_key];
    }

    var links = widgets.map(function (widget) {
      return createDocumentationLink(widget);
    }).join(', ');
    return function (message) {
      return [message, "See documentation: ".concat(links)].filter(Boolean).join('\n\n');
    };
  };

  function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function addAbsolutePosition(hits, page, hitsPerPage) {
    return hits.map(function (hit, idx) {
      return _objectSpread$3(_objectSpread$3({}, hit), {}, {
        __position: hitsPerPage * page + idx + 1
      });
    });
  }

  function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty$4(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function addQueryID(hits, queryID) {
    if (!queryID) {
      return hits;
    }

    return hits.map(function (hit) {
      return _objectSpread$4(_objectSpread$4({}, hit), {}, {
        __queryID: queryID
      });
    });
  }

  function isFacetRefined(helper, facet, value) {
    if (helper.state.isHierarchicalFacet(facet)) {
      return helper.state.isHierarchicalFacetRefined(facet, value);
    } else if (helper.state.isConjunctiveFacet(facet)) {
      return helper.state.isFacetRefined(facet, value);
    } else {
      return helper.state.isDisjunctiveFacetRefined(facet, value);
    }
  }

  function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
  function createSendEventForFacet(_ref) {
    var instantSearchInstance = _ref.instantSearchInstance,
        helper = _ref.helper,
        attribute = _ref.attribute,
        widgetType = _ref.widgetType;

    var sendEventForFacet = function sendEventForFacet() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var eventType = args[0],
          facetValue = args[1],
          _args$ = args[2],
          eventName = _args$ === void 0 ? 'Filter Applied' : _args$;

      if (args.length === 1 && _typeof$1(args[0]) === 'object') {
        instantSearchInstance.sendEventToInsights(args[0]);
      } else if (eventType === 'click' && (args.length === 2 || args.length === 3)) {
        if (!isFacetRefined(helper, attribute, facetValue)) {
          // send event only when the facet is being checked "ON"
          instantSearchInstance.sendEventToInsights({
            insightsMethod: 'clickedFilters',
            widgetType: widgetType,
            eventType: eventType,
            payload: {
              eventName: eventName,
              index: helper.getIndex(),
              filters: ["".concat(attribute, ":").concat(facetValue)]
            },
            attribute: attribute
          });
        }
      }
    };

    return sendEventForFacet;
  }

  function serializePayload(payload) {
    return btoa(encodeURIComponent(JSON.stringify(payload)));
  }

  function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }

  function chunk(arr) {
    var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var chunks = [];

    for (var i = 0; i < Math.ceil(arr.length / chunkSize); i++) {
      chunks.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
    }

    return chunks;
  }

  var buildPayloads = function buildPayloads(_ref) {
    var index = _ref.index,
        widgetType = _ref.widgetType,
        methodName = _ref.methodName,
        args = _ref.args;

    // when there's only one argument, that means it's custom
    if (args.length === 1 && _typeof$2(args[0]) === 'object') {
      return [args[0]];
    }

    var eventType = args[0];
    var hits = args[1];
    var eventName = args[2];

    if (!hits) {
      {
        return [];
      }
    }

    if ((eventType === 'click' || eventType === 'conversion') && !eventName) {
      {
        return [];
      }
    }

    var hitsArray = Array.isArray(hits) ? removeEscapedFromHits(hits) : [hits];

    if (hitsArray.length === 0) {
      return [];
    }

    var queryID = hitsArray[0].__queryID;
    var hitsChunks = chunk(hitsArray);
    var objectIDsByChunk = hitsChunks.map(function (batch) {
      return batch.map(function (hit) {
        return hit.objectID;
      });
    });
    var positionsByChunk = hitsChunks.map(function (batch) {
      return batch.map(function (hit) {
        return hit.__position;
      });
    });

    if (eventType === 'view') {
      return hitsChunks.map(function (batch, i) {
        return {
          insightsMethod: 'viewedObjectIDs',
          widgetType: widgetType,
          eventType: eventType,
          payload: {
            eventName: eventName || 'Hits Viewed',
            index: index,
            objectIDs: objectIDsByChunk[i]
          },
          hits: batch
        };
      });
    } else if (eventType === 'click') {
      return hitsChunks.map(function (batch, i) {
        return {
          insightsMethod: 'clickedObjectIDsAfterSearch',
          widgetType: widgetType,
          eventType: eventType,
          payload: {
            eventName: eventName,
            index: index,
            queryID: queryID,
            objectIDs: objectIDsByChunk[i],
            positions: positionsByChunk[i]
          },
          hits: batch
        };
      });
    } else if (eventType === 'conversion') {
      return hitsChunks.map(function (batch, i) {
        return {
          insightsMethod: 'convertedObjectIDsAfterSearch',
          widgetType: widgetType,
          eventType: eventType,
          payload: {
            eventName: eventName,
            index: index,
            queryID: queryID,
            objectIDs: objectIDsByChunk[i]
          },
          hits: batch
        };
      });
    } else {
      return [];
    }
  };

  function removeEscapedFromHits(hits) {
    // remove `hits.__escaped` without mutating
    return hits.slice();
  }

  function createSendEventForHits(_ref2) {
    var instantSearchInstance = _ref2.instantSearchInstance,
        index = _ref2.index,
        widgetType = _ref2.widgetType;

    var sendEventForHits = function sendEventForHits() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var payloads = buildPayloads({
        widgetType: widgetType,
        index: index,
        methodName: 'sendEvent',
        args: args
      });
      payloads.forEach(function (payload) {
        return instantSearchInstance.sendEventToInsights(payload);
      });
    };

    return sendEventForHits;
  }
  function createBindEventForHits(_ref3) {
    var index = _ref3.index,
        widgetType = _ref3.widgetType;

    var bindEventForHits = function bindEventForHits() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var payloads = buildPayloads({
        widgetType: widgetType,
        index: index,
        methodName: 'bindEvent',
        args: args
      });
      return payloads.length ? "data-insights-event=".concat(serializePayload(payloads)) : '';
    };

    return bindEventForHits;
  }

  function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty$5(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }

  function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _objectWithoutProperties$2(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$3(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
  var withUsage = createDocumentationMessageGenerator({
    name: 'index-widget'
  });
  function isIndexWidget(widget) {
    return widget.$$type === 'ais.index';
  }
  /**
   * This is the same content as helper._change / setState, but allowing for extra
   * UiState to be synchronized.
   * see: https://github.com/algolia/algoliasearch-helper-js/blob/6b835ffd07742f2d6b314022cce6848f5cfecd4a/src/algoliasearch.helper.js#L1311-L1324
   */

  function privateHelperSetState(helper, _ref) {
    var state = _ref.state,
        isPageReset = _ref.isPageReset,
        _uiState = _ref._uiState;

    if (state !== helper.state) {
      helper.state = state;
      helper.emit('change', {
        state: helper.state,
        results: helper.lastResults,
        isPageReset: isPageReset,
        _uiState: _uiState
      });
    }
  }

  function getLocalWidgetsUiState(widgets, widgetStateOptions) {
    var initialUiState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return widgets.reduce(function (uiState, widget) {
      if (isIndexWidget(widget)) {
        return uiState;
      }

      if (!widget.getWidgetUiState && !widget.getWidgetState) {
        return uiState;
      }

      if (widget.getWidgetUiState) {
        return widget.getWidgetUiState(uiState, widgetStateOptions);
      }

      return widget.getWidgetState(uiState, widgetStateOptions);
    }, initialUiState);
  }

  function getLocalWidgetsSearchParameters(widgets, widgetSearchParametersOptions) {
    var initialSearchParameters = widgetSearchParametersOptions.initialSearchParameters,
        rest = _objectWithoutProperties$2(widgetSearchParametersOptions, ["initialSearchParameters"]);

    return widgets.filter(function (widget) {
      return !isIndexWidget(widget);
    }).reduce(function (state, widget) {
      if (!widget.getWidgetSearchParameters) {
        return state;
      }

      return widget.getWidgetSearchParameters(state, rest);
    }, initialSearchParameters);
  }

  function resetPageFromWidgets(widgets) {
    var indexWidgets = widgets.filter(isIndexWidget);

    if (indexWidgets.length === 0) {
      return;
    }

    indexWidgets.forEach(function (widget) {
      var widgetHelper = widget.getHelper();
      privateHelperSetState(widgetHelper, {
        state: widgetHelper.state.resetPage(),
        isPageReset: true
      });
      resetPageFromWidgets(widget.getWidgets());
    });
  }

  function resolveScopedResultsFromWidgets(widgets) {
    var indexWidgets = widgets.filter(isIndexWidget);
    return indexWidgets.reduce(function (scopedResults, current) {
      return scopedResults.concat.apply(scopedResults, [{
        indexId: current.getIndexId(),
        results: current.getResults(),
        helper: current.getHelper()
      }].concat(_toConsumableArray$1(resolveScopedResultsFromWidgets(current.getWidgets()))));
    }, []);
  }

  var index = function index(widgetParams) {
    if (widgetParams === undefined || widgetParams.indexName === undefined) {
      throw new Error(withUsage('The `indexName` option is required.'));
    }

    var indexName = widgetParams.indexName,
        _widgetParams$indexId = widgetParams.indexId,
        indexId = _widgetParams$indexId === void 0 ? indexName : _widgetParams$indexId;
    var localWidgets = [];
    var localUiState = {};
    var localInstantSearchInstance = null;
    var localParent = null;
    var helper = null;
    var derivedHelper = null;
    return {
      $$type: 'ais.index',
      $$widgetType: 'ais.index',
      getIndexName: function getIndexName() {
        return indexName;
      },
      getIndexId: function getIndexId() {
        return indexId;
      },
      getHelper: function getHelper() {
        return helper;
      },
      getResults: function getResults() {
        return derivedHelper && derivedHelper.lastResults;
      },
      getScopedResults: function getScopedResults() {
        var widgetParent = this.getParent(); // If the widget is the root, we consider itself as the only sibling.

        var widgetSiblings = widgetParent ? widgetParent.getWidgets() : [this];
        return resolveScopedResultsFromWidgets(widgetSiblings);
      },
      getParent: function getParent() {
        return localParent;
      },
      createURL: function createURL(nextState) {
        return localInstantSearchInstance._createURL(_defineProperty$5({}, indexId, getLocalWidgetsUiState(localWidgets, {
          searchParameters: nextState,
          helper: helper
        })));
      },
      getWidgets: function getWidgets() {
        return localWidgets;
      },
      addWidgets: function addWidgets(widgets) {
        var _this = this;

        if (!Array.isArray(widgets)) {
          throw new Error(withUsage('The `addWidgets` method expects an array of widgets.'));
        }

        if (widgets.some(function (widget) {
          return typeof widget.init !== 'function' && typeof widget.render !== 'function';
        })) {
          throw new Error(withUsage('The widget definition expects a `render` and/or an `init` method.'));
        }

        localWidgets = localWidgets.concat(widgets);

        if (localInstantSearchInstance && Boolean(widgets.length)) {
          privateHelperSetState(helper, {
            state: getLocalWidgetsSearchParameters(localWidgets, {
              uiState: localUiState,
              initialSearchParameters: helper.state
            }),
            _uiState: localUiState
          }); // We compute the render state before calling `init` in a separate loop
          // to construct the whole render state object that is then passed to
          // `init`.

          widgets.forEach(function (widget) {
            if (widget.getRenderState) {
              var renderState = widget.getRenderState(localInstantSearchInstance.renderState[_this.getIndexId()] || {}, {
                uiState: localInstantSearchInstance._initialUiState,
                helper: _this.getHelper(),
                parent: _this,
                instantSearchInstance: localInstantSearchInstance,
                state: helper.state,
                renderState: localInstantSearchInstance.renderState,
                templatesConfig: localInstantSearchInstance.templatesConfig,
                createURL: _this.createURL,
                scopedResults: [],
                searchMetadata: {
                  isSearchStalled: localInstantSearchInstance._isSearchStalled
                }
              });
              storeRenderState({
                renderState: renderState,
                instantSearchInstance: localInstantSearchInstance,
                parent: _this
              });
            }
          });
          widgets.forEach(function (widget) {
            if (widget.init) {
              widget.init({
                helper: helper,
                parent: _this,
                uiState: localInstantSearchInstance._initialUiState,
                instantSearchInstance: localInstantSearchInstance,
                state: helper.state,
                renderState: localInstantSearchInstance.renderState,
                templatesConfig: localInstantSearchInstance.templatesConfig,
                createURL: _this.createURL,
                scopedResults: [],
                searchMetadata: {
                  isSearchStalled: localInstantSearchInstance._isSearchStalled
                }
              });
            }
          });
          localInstantSearchInstance.scheduleSearch();
        }

        return this;
      },
      removeWidgets: function removeWidgets(widgets) {
        var _this2 = this;

        if (!Array.isArray(widgets)) {
          throw new Error(withUsage('The `removeWidgets` method expects an array of widgets.'));
        }

        if (widgets.some(function (widget) {
          return typeof widget.dispose !== 'function';
        })) {
          throw new Error(withUsage('The widget definition expects a `dispose` method.'));
        }

        localWidgets = localWidgets.filter(function (widget) {
          return widgets.indexOf(widget) === -1;
        });

        if (localInstantSearchInstance && Boolean(widgets.length)) {
          var nextState = widgets.reduce(function (state, widget) {
            // the `dispose` method exists at this point we already assert it
            var next = widget.dispose({
              helper: helper,
              state: state,
              parent: _this2
            });
            return next || state;
          }, helper.state);
          localUiState = getLocalWidgetsUiState(localWidgets, {
            searchParameters: nextState,
            helper: helper
          });
          helper.setState(getLocalWidgetsSearchParameters(localWidgets, {
            uiState: localUiState,
            initialSearchParameters: nextState
          }));

          if (localWidgets.length) {
            localInstantSearchInstance.scheduleSearch();
          }
        }

        return this;
      },
      init: function init(_ref2) {
        var _this3 = this;

        var instantSearchInstance = _ref2.instantSearchInstance,
            parent = _ref2.parent,
            uiState = _ref2.uiState;

        if (helper !== null) {
          // helper is already initialized, therefore we do not need to set up
          // any listeners
          return;
        }

        localInstantSearchInstance = instantSearchInstance;
        localParent = parent;
        localUiState = uiState[indexId] || {}; // The `mainHelper` is already defined at this point. The instance is created
        // inside InstantSearch at the `start` method, which occurs before the `init`
        // step.

        var mainHelper = instantSearchInstance.mainHelper;
        var parameters = getLocalWidgetsSearchParameters(localWidgets, {
          uiState: localUiState,
          initialSearchParameters: new algoliasearchHelper_1.SearchParameters({
            index: indexName
          })
        }); // This Helper is only used for state management we do not care about the
        // `searchClient`. Only the "main" Helper created at the `InstantSearch`
        // level is aware of the client.

        helper = algoliasearchHelper_1({}, parameters.index, parameters); // We forward the call to `search` to the "main" instance of the Helper
        // which is responsible for managing the queries (it's the only one that is
        // aware of the `searchClient`).

        helper.search = function () {
          if (instantSearchInstance.onStateChange) {
            instantSearchInstance.onStateChange({
              uiState: instantSearchInstance.mainIndex.getWidgetUiState({}),
              setUiState: instantSearchInstance.setUiState.bind(instantSearchInstance)
            }); // We don't trigger a search when controlled because it becomes the
            // responsibility of `setUiState`.

            return mainHelper;
          }

          return mainHelper.search();
        };

        helper.searchWithoutTriggeringOnStateChange = function () {
          return mainHelper.search();
        }; // We use the same pattern for the `searchForFacetValues`.


        helper.searchForFacetValues = function (facetName, facetValue, maxFacetHits, userState) {
          var state = helper.state.setQueryParameters(userState);
          return mainHelper.searchForFacetValues(facetName, facetValue, maxFacetHits, state);
        };

        derivedHelper = mainHelper.derive(function () {
          return merge$1.apply(void 0, _toConsumableArray$1(resolveSearchParameters(_this3)));
        }); // Subscribe to the Helper state changes for the page before widgets
        // are initialized. This behavior mimics the original one of the Helper.
        // It makes sense to replicate it at the `init` step. We have another
        // listener on `change` below, once `init` is done.

        helper.on('change', function (_ref3) {
          var isPageReset = _ref3.isPageReset;

          if (isPageReset) {
            resetPageFromWidgets(localWidgets);
          }
        });
        derivedHelper.on('search', function () {
          // The index does not manage the "staleness" of the search. This is the
          // responsibility of the main instance. It does not make sense to manage
          // it at the index level because it's either: all of them or none of them
          // that are stalled. The queries are performed into a single network request.
          instantSearchInstance.scheduleStalledRender();
        });
        derivedHelper.on('result', function (_ref4) {
          var results = _ref4.results;
          // The index does not render the results it schedules a new render
          // to let all the other indices emit their own results. It allows us to
          // run the render process in one pass.
          instantSearchInstance.scheduleRender(); // the derived helper is the one which actually searches, but the helper
          // which is exposed e.g. via instance.helper, doesn't search, and thus
          // does not have access to lastResults, which it used to in pre-federated
          // search behavior.

          helper.lastResults = results;
        }); // We compute the render state before calling `init` in a separate loop
        // to construct the whole render state object that is then passed to
        // `init`.

        localWidgets.forEach(function (widget) {
          if (widget.getRenderState) {
            var renderState = widget.getRenderState(instantSearchInstance.renderState[_this3.getIndexId()] || {}, {
              uiState: uiState,
              helper: helper,
              parent: _this3,
              instantSearchInstance: instantSearchInstance,
              state: helper.state,
              renderState: instantSearchInstance.renderState,
              templatesConfig: instantSearchInstance.templatesConfig,
              createURL: _this3.createURL,
              scopedResults: [],
              searchMetadata: {
                isSearchStalled: instantSearchInstance._isSearchStalled
              }
            });
            storeRenderState({
              renderState: renderState,
              instantSearchInstance: instantSearchInstance,
              parent: _this3
            });
          }
        });
        localWidgets.forEach(function (widget) {

          if (widget.init) {
            widget.init({
              uiState: uiState,
              helper: helper,
              parent: _this3,
              instantSearchInstance: instantSearchInstance,
              state: helper.state,
              renderState: instantSearchInstance.renderState,
              templatesConfig: instantSearchInstance.templatesConfig,
              createURL: _this3.createURL,
              scopedResults: [],
              searchMetadata: {
                isSearchStalled: instantSearchInstance._isSearchStalled
              }
            });
          }
        }); // Subscribe to the Helper state changes for the `uiState` once widgets
        // are initialized. Until the first render, state changes are part of the
        // configuration step. This is mainly for backward compatibility with custom
        // widgets. When the subscription happens before the `init` step, the (static)
        // configuration of the widget is pushed in the URL. That's what we want to avoid.
        // https://github.com/algolia/instantsearch.js/pull/994/commits/4a672ae3fd78809e213de0368549ef12e9dc9454

        helper.on('change', function (event) {
          var state = event.state;
          var _uiState = event._uiState;
          localUiState = getLocalWidgetsUiState(localWidgets, {
            searchParameters: state,
            helper: helper
          }, _uiState || {}); // We don't trigger an internal change when controlled because it
          // becomes the responsibility of `setUiState`.

          if (!instantSearchInstance.onStateChange) {
            instantSearchInstance.onInternalStateChange();
          }
        });
      },
      render: function render(_ref5) {
        var _this4 = this;

        var instantSearchInstance = _ref5.instantSearchInstance;

        if (!this.getResults()) {
          return;
        }

        localWidgets.forEach(function (widget) {
          if (widget.getRenderState) {
            var renderState = widget.getRenderState(instantSearchInstance.renderState[_this4.getIndexId()] || {}, {
              helper: _this4.getHelper(),
              parent: _this4,
              instantSearchInstance: instantSearchInstance,
              results: _this4.getResults(),
              scopedResults: _this4.getScopedResults(),
              state: _this4.getResults()._state,
              renderState: instantSearchInstance.renderState,
              templatesConfig: instantSearchInstance.templatesConfig,
              createURL: _this4.createURL,
              searchMetadata: {
                isSearchStalled: instantSearchInstance._isSearchStalled
              }
            });
            storeRenderState({
              renderState: renderState,
              instantSearchInstance: instantSearchInstance,
              parent: _this4
            });
          }
        });
        localWidgets.forEach(function (widget) {
          // At this point, all the variables used below are set. Both `helper`
          // and `derivedHelper` have been created at the `init` step. The attribute
          // `lastResults` might be `null` though. It's possible that a stalled render
          // happens before the result e.g with a dynamically added index the request might
          // be delayed. The render is triggered for the complete tree but some parts do
          // not have results yet.
          if (widget.render) {
            widget.render({
              helper: helper,
              parent: _this4,
              instantSearchInstance: instantSearchInstance,
              results: _this4.getResults(),
              scopedResults: _this4.getScopedResults(),
              state: _this4.getResults()._state,
              renderState: instantSearchInstance.renderState,
              templatesConfig: instantSearchInstance.templatesConfig,
              createURL: _this4.createURL,
              searchMetadata: {
                isSearchStalled: instantSearchInstance._isSearchStalled
              }
            });
          }
        });
      },
      dispose: function dispose() {
        var _this5 = this;

        localWidgets.forEach(function (widget) {
          if (widget.dispose) {
            // The dispose function is always called once the instance is started
            // (it's an effect of `removeWidgets`). The index is initialized and
            // the Helper is available. We don't care about the return value of
            // `dispose` because the index is removed. We can't call `removeWidgets`
            // because we want to keep the widgets on the instance, to allow idempotent
            // operations on `add` & `remove`.
            widget.dispose({
              helper: helper,
              state: helper.state,
              parent: _this5
            });
          }
        });
        localInstantSearchInstance = null;
        localParent = null;
        helper.removeAllListeners();
        helper = null;
        derivedHelper.detach();
        derivedHelper = null;
      },
      getWidgetUiState: function getWidgetUiState(uiState) {
        return localWidgets.filter(isIndexWidget).reduce(function (previousUiState, innerIndex) {
          return innerIndex.getWidgetUiState(previousUiState);
        }, _objectSpread$5(_objectSpread$5({}, uiState), {}, _defineProperty$5({}, this.getIndexId(), localUiState)));
      },
      getWidgetState: function getWidgetState(uiState) {
        return this.getWidgetUiState(uiState);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        return getLocalWidgetsSearchParameters(localWidgets, {
          uiState: uiState,
          initialSearchParameters: searchParameters
        });
      },
      refreshUiState: function refreshUiState() {
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: this.getHelper().state,
          helper: this.getHelper()
        });
      }
    };
  };

  function storeRenderState(_ref7) {
    var renderState = _ref7.renderState,
        instantSearchInstance = _ref7.instantSearchInstance,
        parent = _ref7.parent;
    var parentIndexName = parent ? parent.getIndexId() : instantSearchInstance.mainIndex.getIndexId();
    instantSearchInstance.renderState = _objectSpread$5(_objectSpread$5({}, instantSearchInstance.renderState), {}, _defineProperty$5({}, parentIndexName, _objectSpread$5(_objectSpread$5({}, instantSearchInstance.renderState[parentIndexName]), renderState)));
  }

  var version$2 = '4.32.0';

  var NAMESPACE = 'ais';
  var component = function component(componentName) {
    return function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          descendantName = _ref.descendantName,
          modifierName = _ref.modifierName;

      var descendent = descendantName ? "-".concat(descendantName) : '';
      var modifier = modifierName ? "--".concat(modifierName) : '';
      return "".concat(NAMESPACE, "-").concat(componentName).concat(descendent).concat(modifier);
    };
  };

  var suit = component('Highlight');
  function highlight(_ref) {
    var attribute = _ref.attribute,
        _ref$highlightedTagNa = _ref.highlightedTagName,
        highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
        hit = _ref.hit,
        _ref$cssClasses = _ref.cssClasses,
        cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;

    var _ref2 = getPropertyByPath(hit._highlightResult, attribute) || {},
        _ref2$value = _ref2.value,
        attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


    var className = suit({
      descendantName: 'highlighted'
    }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
    return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
  }

  var suit$1 = component('ReverseHighlight');
  function reverseHighlight(_ref) {
    var attribute = _ref.attribute,
        _ref$highlightedTagNa = _ref.highlightedTagName,
        highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
        hit = _ref.hit,
        _ref$cssClasses = _ref.cssClasses,
        cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;

    var _ref2 = getPropertyByPath(hit._highlightResult, attribute) || {},
        _ref2$value = _ref2.value,
        attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


    var className = suit$1({
      descendantName: 'highlighted'
    }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
    var reverseHighlightedValue = concatHighlightedParts(reverseHighlightedParts(getHighlightedParts(attributeValue)));
    return reverseHighlightedValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
  }

  var suit$2 = component('Snippet');
  function snippet(_ref) {
    var attribute = _ref.attribute,
        _ref$highlightedTagNa = _ref.highlightedTagName,
        highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
        hit = _ref.hit,
        _ref$cssClasses = _ref.cssClasses,
        cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;

    var _ref2 = getPropertyByPath(hit._snippetResult, attribute) || {},
        _ref2$value = _ref2.value,
        attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


    var className = suit$2({
      descendantName: 'highlighted'
    }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
    return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
  }

  var suit$3 = component('ReverseSnippet');
  function reverseSnippet(_ref) {
    var attribute = _ref.attribute,
        _ref$highlightedTagNa = _ref.highlightedTagName,
        highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
        hit = _ref.hit,
        _ref$cssClasses = _ref.cssClasses,
        cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;

    var _ref2 = getPropertyByPath(hit._snippetResult, attribute) || {},
        _ref2$value = _ref2.value,
        attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


    var className = suit$3({
      descendantName: 'highlighted'
    }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
    var reverseHighlightedValue = concatHighlightedParts(reverseHighlightedParts(getHighlightedParts(attributeValue)));
    return reverseHighlightedValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
  }

  function _typeof$3(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }
  function writeDataAttributes(_ref) {
    var method = _ref.method,
        payload = _ref.payload;

    if (_typeof$3(payload) !== 'object') {
      throw new Error("The insights helper expects the payload to be an object.");
    }

    var serializedPayload;

    try {
      serializedPayload = serializePayload(payload);
    } catch (error) {
      throw new Error("Could not JSON serialize the payload object.");
    }

    return "data-insights-method=\"".concat(method, "\" data-insights-payload=\"").concat(serializedPayload, "\"");
  }
  /**
   * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
   */

  function insights(method, payload) {
    return writeDataAttributes({
      method: method,
      payload: payload
    });
  }

  var ANONYMOUS_TOKEN_COOKIE_KEY = '_ALGOLIA';

  function getCookie(name) {
    var prefix = "".concat(name, "=");
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];

      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(prefix) === 0) {
        return cookie.substring(prefix.length, cookie.length);
      }
    }

    return undefined;
  }

  function getInsightsAnonymousUserTokenInternal() {
    return getCookie(ANONYMOUS_TOKEN_COOKIE_KEY);
  }
  /**
   * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
   */

  function getInsightsAnonymousUserToken() {
    return getInsightsAnonymousUserTokenInternal();
  }

  function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty$6(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function hoganHelpers(_ref) {
    var numberLocale = _ref.numberLocale;
    return {
      formatNumber: function formatNumber(value, render) {
        return Number(render(value)).toLocaleString(numberLocale);
      },
      highlight: function highlight$1(options, render) {
        try {
          var highlightOptions = JSON.parse(options);
          return render(highlight(_objectSpread$6(_objectSpread$6({}, highlightOptions), {}, {
            hit: this
          })));
        } catch (error) {
          throw new Error("\nThe highlight helper expects a JSON object of the format:\n{ \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
        }
      },
      reverseHighlight: function reverseHighlight$1(options, render) {
        try {
          var reverseHighlightOptions = JSON.parse(options);
          return render(reverseHighlight(_objectSpread$6(_objectSpread$6({}, reverseHighlightOptions), {}, {
            hit: this
          })));
        } catch (error) {
          throw new Error("\n  The reverseHighlight helper expects a JSON object of the format:\n  { \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
        }
      },
      snippet: function snippet$1(options, render) {
        try {
          var snippetOptions = JSON.parse(options);
          return render(snippet(_objectSpread$6(_objectSpread$6({}, snippetOptions), {}, {
            hit: this
          })));
        } catch (error) {
          throw new Error("\nThe snippet helper expects a JSON object of the format:\n{ \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
        }
      },
      reverseSnippet: function reverseSnippet$1(options, render) {
        try {
          var reverseSnippetOptions = JSON.parse(options);
          return render(reverseSnippet(_objectSpread$6(_objectSpread$6({}, reverseSnippetOptions), {}, {
            hit: this
          })));
        } catch (error) {
          throw new Error("\n  The reverseSnippet helper expects a JSON object of the format:\n  { \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
        }
      },
      insights: function insights$1(options, render) {
        try {
          var _JSON$parse = JSON.parse(options),
              method = _JSON$parse.method,
              payload = _JSON$parse.payload;

          return render(insights(method, _objectSpread$6({
            objectIDs: [this.objectID]
          }, payload)));
        } catch (error) {
          throw new Error("\nThe insights helper expects a JSON object of the format:\n{ \"method\": \"method-name\", \"payload\": { \"eventName\": \"name of the event\" } }");
        }
      }
    };
  }

  function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty$7(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _objectWithoutProperties$3(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$4(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose$4(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

  function getIndexStateWithoutConfigure(uiState) {
    var configure = uiState.configure,
        trackedUiState = _objectWithoutProperties$3(uiState, ["configure"]);

    return trackedUiState;
  } // technically a URL could contain any key, since users provide it,
  // which is why the input to this function is UiState, not something
  // which excludes "configure" as this function does.


  function simpleStateMapping() {
    return {
      stateToRoute: function stateToRoute(uiState) {
        return Object.keys(uiState).reduce(function (state, indexId) {
          return _objectSpread$7(_objectSpread$7({}, state), {}, _defineProperty$7({}, indexId, getIndexStateWithoutConfigure(uiState[indexId])));
        }, {});
      },
      routeToState: function routeToState() {
        var routeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return Object.keys(routeState).reduce(function (state, indexId) {
          return _objectSpread$7(_objectSpread$7({}, state), {}, _defineProperty$7({}, indexId, getIndexStateWithoutConfigure(routeState[indexId])));
        }, {});
      }
    };
  }

  var replace = String.prototype.replace;
  var percentTwenties = /%20/g;

  var Format = {
      RFC1738: 'RFC1738',
      RFC3986: 'RFC3986'
  };

  var formats = {
      'default': Format.RFC3986,
      formatters: {
          RFC1738: function (value) {
              return replace.call(value, percentTwenties, '+');
          },
          RFC3986: function (value) {
              return String(value);
          }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
  };

  var has = Object.prototype.hasOwnProperty;
  var isArray = Array.isArray;

  var hexTable = (function () {
      var array = [];
      for (var i = 0; i < 256; ++i) {
          array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
      }

      return array;
  }());

  var compactQueue = function compactQueue(queue) {
      while (queue.length > 1) {
          var item = queue.pop();
          var obj = item.obj[item.prop];

          if (isArray(obj)) {
              var compacted = [];

              for (var j = 0; j < obj.length; ++j) {
                  if (typeof obj[j] !== 'undefined') {
                      compacted.push(obj[j]);
                  }
              }

              item.obj[item.prop] = compacted;
          }
      }
  };

  var arrayToObject = function arrayToObject(source, options) {
      var obj = options && options.plainObjects ? Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== 'undefined') {
              obj[i] = source[i];
          }
      }

      return obj;
  };

  var merge$2 = function merge(target, source, options) {
      /* eslint no-param-reassign: 0 */
      if (!source) {
          return target;
      }

      if (typeof source !== 'object') {
          if (isArray(target)) {
              target.push(source);
          } else if (target && typeof target === 'object') {
              if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                  target[source] = true;
              }
          } else {
              return [target, source];
          }

          return target;
      }

      if (!target || typeof target !== 'object') {
          return [target].concat(source);
      }

      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
          mergeTarget = arrayToObject(target, options);
      }

      if (isArray(target) && isArray(source)) {
          source.forEach(function (item, i) {
              if (has.call(target, i)) {
                  var targetItem = target[i];
                  if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                      target[i] = merge(targetItem, item, options);
                  } else {
                      target.push(item);
                  }
              } else {
                  target[i] = item;
              }
          });
          return target;
      }

      return Object.keys(source).reduce(function (acc, key) {
          var value = source[key];

          if (has.call(acc, key)) {
              acc[key] = merge(acc[key], value, options);
          } else {
              acc[key] = value;
          }
          return acc;
      }, mergeTarget);
  };

  var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function (acc, key) {
          acc[key] = source[key];
          return acc;
      }, target);
  };

  var decode = function (str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, ' ');
      if (charset === 'iso-8859-1') {
          // unescape never throws, no try...catch needed:
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      // utf-8
      try {
          return decodeURIComponent(strWithoutPlus);
      } catch (e) {
          return strWithoutPlus;
      }
  };

  var encode = function encode(str, defaultEncoder, charset, kind, format) {
      // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
      // It has been adapted here for stricter adherence to RFC 3986
      if (str.length === 0) {
          return str;
      }

      var string = str;
      if (typeof str === 'symbol') {
          string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== 'string') {
          string = String(str);
      }

      if (charset === 'iso-8859-1') {
          return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
              return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
          });
      }

      var out = '';
      for (var i = 0; i < string.length; ++i) {
          var c = string.charCodeAt(i);

          if (
              c === 0x2D // -
              || c === 0x2E // .
              || c === 0x5F // _
              || c === 0x7E // ~
              || (c >= 0x30 && c <= 0x39) // 0-9
              || (c >= 0x41 && c <= 0x5A) // a-z
              || (c >= 0x61 && c <= 0x7A) // A-Z
              || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
          ) {
              out += string.charAt(i);
              continue;
          }

          if (c < 0x80) {
              out = out + hexTable[c];
              continue;
          }

          if (c < 0x800) {
              out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }

          if (c < 0xD800 || c >= 0xE000) {
              out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }

          i += 1;
          c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
          out += hexTable[0xF0 | (c >> 18)]
              + hexTable[0x80 | ((c >> 12) & 0x3F)]
              + hexTable[0x80 | ((c >> 6) & 0x3F)]
              + hexTable[0x80 | (c & 0x3F)];
      }

      return out;
  };

  var compact$1 = function compact(value) {
      var queue = [{ obj: { o: value }, prop: 'o' }];
      var refs = [];

      for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];

          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
              var key = keys[j];
              var val = obj[key];
              if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                  queue.push({ obj: obj, prop: key });
                  refs.push(val);
              }
          }
      }

      compactQueue(queue);

      return value;
  };

  var isRegExp = function isRegExp(obj) {
      return Object.prototype.toString.call(obj) === '[object RegExp]';
  };

  var isBuffer = function isBuffer(obj) {
      if (!obj || typeof obj !== 'object') {
          return false;
      }

      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };

  var combine = function combine(a, b) {
      return [].concat(a, b);
  };

  var maybeMap = function maybeMap(val, fn) {
      if (isArray(val)) {
          var mapped = [];
          for (var i = 0; i < val.length; i += 1) {
              mapped.push(fn(val[i]));
          }
          return mapped;
      }
      return fn(val);
  };

  var utils = {
      arrayToObject: arrayToObject,
      assign: assign,
      combine: combine,
      compact: compact$1,
      decode: decode,
      encode: encode,
      isBuffer: isBuffer,
      isRegExp: isRegExp,
      maybeMap: maybeMap,
      merge: merge$2
  };

  var has$1 = Object.prototype.hasOwnProperty;

  var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
          return prefix + '[]';
      },
      comma: 'comma',
      indices: function indices(prefix, key) {
          return prefix + '[' + key + ']';
      },
      repeat: function repeat(prefix) {
          return prefix;
      }
  };

  var isArray$1 = Array.isArray;
  var push = Array.prototype.push;
  var pushToArray = function (arr, valueOrArray) {
      push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
  };

  var toISO = Date.prototype.toISOString;

  var defaultFormat = formats['default'];
  var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: 'utf-8',
      charsetSentinel: false,
      delimiter: '&',
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
          return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
  };

  var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
      return typeof v === 'string'
          || typeof v === 'number'
          || typeof v === 'boolean'
          || typeof v === 'symbol'
          || typeof v === 'bigint';
  };

  var stringify = function stringify(
      object,
      prefix,
      generateArrayPrefix,
      strictNullHandling,
      skipNulls,
      encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      format,
      formatter,
      encodeValuesOnly,
      charset
  ) {
      var obj = object;
      if (typeof filter === 'function') {
          obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
          obj = serializeDate(obj);
      } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
          obj = utils.maybeMap(obj, function (value) {
              if (value instanceof Date) {
                  return serializeDate(value);
              }
              return value;
          });
      }

      if (obj === null) {
          if (strictNullHandling) {
              return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
          }

          obj = '';
      }

      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
          if (encoder) {
              var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
              return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
          }
          return [formatter(prefix) + '=' + formatter(String(obj))];
      }

      var values = [];

      if (typeof obj === 'undefined') {
          return values;
      }

      var objKeys;
      if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
          // we need to join elements in
          objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : undefined }];
      } else if (isArray$1(filter)) {
          objKeys = filter;
      } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
      }

      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];
          var value = typeof key === 'object' && key.value !== undefined ? key.value : obj[key];

          if (skipNulls && value === null) {
              continue;
          }

          var keyPrefix = isArray$1(obj)
              ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
              : prefix + (allowDots ? '.' + key : '[' + key + ']');

          pushToArray(values, stringify(
              value,
              keyPrefix,
              generateArrayPrefix,
              strictNullHandling,
              skipNulls,
              encoder,
              filter,
              sort,
              allowDots,
              serializeDate,
              format,
              formatter,
              encodeValuesOnly,
              charset
          ));
      }

      return values;
  };

  var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
      if (!opts) {
          return defaults;
      }

      if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
          throw new TypeError('Encoder has to be a function.');
      }

      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }

      var format = formats['default'];
      if (typeof opts.format !== 'undefined') {
          if (!has$1.call(formats.formatters, opts.format)) {
              throw new TypeError('Unknown format option provided.');
          }
          format = opts.format;
      }
      var formatter = formats.formatters[format];

      var filter = defaults.filter;
      if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
          filter = opts.filter;
      }

      return {
          addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
          allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
          delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
          encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
          encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
          filter: filter,
          format: format,
          formatter: formatter,
          serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
          skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
          sort: typeof opts.sort === 'function' ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
      };
  };

  var stringify_1 = function (object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);

      var objKeys;
      var filter;

      if (typeof options.filter === 'function') {
          filter = options.filter;
          obj = filter('', obj);
      } else if (isArray$1(options.filter)) {
          filter = options.filter;
          objKeys = filter;
      }

      var keys = [];

      if (typeof obj !== 'object' || obj === null) {
          return '';
      }

      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = opts.arrayFormat;
      } else if (opts && 'indices' in opts) {
          arrayFormat = opts.indices ? 'indices' : 'repeat';
      } else {
          arrayFormat = 'indices';
      }

      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

      if (!objKeys) {
          objKeys = Object.keys(obj);
      }

      if (options.sort) {
          objKeys.sort(options.sort);
      }

      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];

          if (options.skipNulls && obj[key] === null) {
              continue;
          }
          pushToArray(keys, stringify(
              obj[key],
              key,
              generateArrayPrefix,
              options.strictNullHandling,
              options.skipNulls,
              options.encode ? options.encoder : null,
              options.filter,
              options.sort,
              options.allowDots,
              options.serializeDate,
              options.format,
              options.formatter,
              options.encodeValuesOnly,
              options.charset
          ));
      }

      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? '?' : '';

      if (options.charsetSentinel) {
          if (options.charset === 'iso-8859-1') {
              // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
              prefix += 'utf8=%26%2310003%3B&';
          } else {
              // encodeURIComponent('✓')
              prefix += 'utf8=%E2%9C%93&';
          }
      }

      return joined.length > 0 ? prefix + joined : '';
  };

  var has$2 = Object.prototype.hasOwnProperty;
  var isArray$2 = Array.isArray;

  var defaults$1 = {
      allowDots: false,
      allowPrototypes: false,
      arrayLimit: 20,
      charset: 'utf-8',
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: '&',
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1000,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
  };

  var interpretNumericEntities = function (str) {
      return str.replace(/&#(\d+);/g, function ($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
      });
  };

  var parseArrayValue = function (val, options) {
      if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
          return val.split(',');
      }

      return val;
  };

  // This is what browsers will submit when the ✓ character occurs in an
  // application/x-www-form-urlencoded body and the encoding of the page containing
  // the form is iso-8859-1, or when the submitted form has an accept-charset
  // attribute of iso-8859-1. Presumably also with other charsets that do not contain
  // the ✓ character, such as us-ascii.
  var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

  // These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
  var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

  var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
      var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1; // Keep track of where the utf8 sentinel was found
      var i;

      var charset = options.charset;
      if (options.charsetSentinel) {
          for (i = 0; i < parts.length; ++i) {
              if (parts[i].indexOf('utf8=') === 0) {
                  if (parts[i] === charsetSentinel) {
                      charset = 'utf-8';
                  } else if (parts[i] === isoSentinel) {
                      charset = 'iso-8859-1';
                  }
                  skipIndex = i;
                  i = parts.length; // The eslint settings do not allow break;
              }
          }
      }

      for (i = 0; i < parts.length; ++i) {
          if (i === skipIndex) {
              continue;
          }
          var part = parts[i];

          var bracketEqualsPos = part.indexOf(']=');
          var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

          var key, val;
          if (pos === -1) {
              key = options.decoder(part, defaults$1.decoder, charset, 'key');
              val = options.strictNullHandling ? null : '';
          } else {
              key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, 'key');
              val = utils.maybeMap(
                  parseArrayValue(part.slice(pos + 1), options),
                  function (encodedVal) {
                      return options.decoder(encodedVal, defaults$1.decoder, charset, 'value');
                  }
              );
          }

          if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
              val = interpretNumericEntities(val);
          }

          if (part.indexOf('[]=') > -1) {
              val = isArray$2(val) ? [val] : val;
          }

          if (has$2.call(obj, key)) {
              obj[key] = utils.combine(obj[key], val);
          } else {
              obj[key] = val;
          }
      }

      return obj;
  };

  var parseObject = function (chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);

      for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];

          if (root === '[]' && options.parseArrays) {
              obj = [].concat(leaf);
          } else {
              obj = options.plainObjects ? Object.create(null) : {};
              var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
              var index = parseInt(cleanRoot, 10);
              if (!options.parseArrays && cleanRoot === '') {
                  obj = { 0: leaf };
              } else if (
                  !isNaN(index)
                  && root !== cleanRoot
                  && String(index) === cleanRoot
                  && index >= 0
                  && (options.parseArrays && index <= options.arrayLimit)
              ) {
                  obj = [];
                  obj[index] = leaf;
              } else {
                  obj[cleanRoot] = leaf;
              }
          }

          leaf = obj;
      }

      return leaf;
  };

  var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
          return;
      }

      // Transform dot notation to bracket notation
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

      // The regex chunks

      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;

      // Get the parent

      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;

      // Stash the parent if it exists

      var keys = [];
      if (parent) {
          // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
          if (!options.plainObjects && has$2.call(Object.prototype, parent)) {
              if (!options.allowPrototypes) {
                  return;
              }
          }

          keys.push(parent);
      }

      // Loop through children appending to the array until we hit depth

      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has$2.call(Object.prototype, segment[1].slice(1, -1))) {
              if (!options.allowPrototypes) {
                  return;
              }
          }
          keys.push(segment[1]);
      }

      // If there's a remainder, just add whatever is left

      if (segment) {
          keys.push('[' + key.slice(segment.index) + ']');
      }

      return parseObject(keys, val, options, valuesParsed);
  };

  var normalizeParseOptions = function normalizeParseOptions(opts) {
      if (!opts) {
          return defaults$1;
      }

      if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
          throw new TypeError('Decoder has to be a function.');
      }

      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }
      var charset = typeof opts.charset === 'undefined' ? defaults$1.charset : opts.charset;

      return {
          allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
          allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$1.allowPrototypes,
          arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$1.arrayLimit,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
          comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$1.comma,
          decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$1.decoder,
          delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
          // eslint-disable-next-line no-implicit-coercion, no-extra-parens
          depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults$1.depth,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$1.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$1.plainObjects,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
      };
  };

  var parse = function (str, opts) {
      var options = normalizeParseOptions(opts);

      if (str === '' || str === null || typeof str === 'undefined') {
          return options.plainObjects ? Object.create(null) : {};
      }

      var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
      var obj = options.plainObjects ? Object.create(null) : {};

      // Iterate over the keys and setup the new object

      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
          obj = utils.merge(obj, newObj, options);
      }

      return utils.compact(obj);
  };

  var lib$1 = {
      formats: formats,
      parse: parse,
      stringify: stringify_1
  };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _defineProperty$8(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var setWindowTitle = function setWindowTitle(title) {
    if (title) {
      window.document.title = title;
    }
  };

  var BrowserHistory = /*#__PURE__*/function () {
    /**
     * Initializes a new storage provider that syncs the search state to the URL
     * using web APIs (`window.location.pushState` and `onpopstate` event).
     */
    function BrowserHistory(_ref) {
      var windowTitle = _ref.windowTitle,
          _ref$writeDelay = _ref.writeDelay,
          writeDelay = _ref$writeDelay === void 0 ? 400 : _ref$writeDelay,
          createURL = _ref.createURL,
          parseURL = _ref.parseURL;

      _classCallCheck(this, BrowserHistory);

      _defineProperty$8(this, "windowTitle", void 0);

      _defineProperty$8(this, "writeDelay", void 0);

      _defineProperty$8(this, "_createURL", void 0);

      _defineProperty$8(this, "parseURL", void 0);

      _defineProperty$8(this, "writeTimer", void 0);

      this.windowTitle = windowTitle;
      this.writeTimer = undefined;
      this.writeDelay = writeDelay;
      this._createURL = createURL;
      this.parseURL = parseURL;
      var title = this.windowTitle && this.windowTitle(this.read());
      setWindowTitle(title);
    }
    /**
     * Reads the URL and returns a syncable UI search state.
     */


    _createClass(BrowserHistory, [{
      key: "read",
      value: function read() {
        return this.parseURL({
          qsModule: lib$1,
          location: window.location
        });
      }
      /**
       * Pushes a search state into the URL.
       */

    }, {
      key: "write",
      value: function write(routeState) {
        var _this = this;

        var url = this.createURL(routeState);
        var title = this.windowTitle && this.windowTitle(routeState);

        if (this.writeTimer) {
          window.clearTimeout(this.writeTimer);
        }

        this.writeTimer = window.setTimeout(function () {
          setWindowTitle(title);
          window.history.pushState(routeState, title || '', url);
          _this.writeTimer = undefined;
        }, this.writeDelay);
      }
      /**
       * Sets a callback on the `onpopstate` event of the history API of the current page.
       * It enables the URL sync to keep track of the changes.
       */

    }, {
      key: "onUpdate",
      value: function onUpdate(callback) {
        var _this2 = this;

        this._onPopState = function (event) {
          if (_this2.writeTimer) {
            window.clearTimeout(_this2.writeTimer);
            _this2.writeTimer = undefined;
          }

          var routeState = event.state; // At initial load, the state is read from the URL without update.
          // Therefore the state object is not available.
          // In this case, we fallback and read the URL.

          if (!routeState) {
            callback(_this2.read());
          } else {
            callback(routeState);
          }
        };

        window.addEventListener('popstate', this._onPopState);
      }
      /**
       * Creates a complete URL from a given syncable UI state.
       *
       * It always generates the full URL, not a relative one.
       * This allows to handle cases like using a <base href>.
       * See: https://github.com/algolia/instantsearch.js/issues/790
       */

    }, {
      key: "createURL",
      value: function createURL(routeState) {
        return this._createURL({
          qsModule: lib$1,
          routeState: routeState,
          location: window.location
        });
      }
      /**
       * Removes the event listener and cleans up the URL.
       */

    }, {
      key: "dispose",
      value: function dispose() {
        if (this._onPopState) {
          window.removeEventListener('popstate', this._onPopState);
        }

        if (this.writeTimer) {
          window.clearTimeout(this.writeTimer);
        }

        this.write({});
      }
    }]);

    return BrowserHistory;
  }();

  function historyRouter() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$createURL = _ref2.createURL,
        createURL = _ref2$createURL === void 0 ? function (_ref3) {
      var qsModule = _ref3.qsModule,
          routeState = _ref3.routeState,
          location = _ref3.location;
      var protocol = location.protocol,
          hostname = location.hostname,
          _location$port = location.port,
          port = _location$port === void 0 ? '' : _location$port,
          pathname = location.pathname,
          hash = location.hash;
      var queryString = qsModule.stringify(routeState);
      var portWithPrefix = port === '' ? '' : ":".concat(port); // IE <= 11 has no proper `location.origin` so we cannot rely on it.

      // IE <= 11 has no proper `location.origin` so we cannot rely on it.
      if (!queryString) {
        return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname).concat(hash);
      }

      return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname, "?").concat(queryString).concat(hash);
    } : _ref2$createURL,
        _ref2$parseURL = _ref2.parseURL,
        parseURL = _ref2$parseURL === void 0 ? function (_ref4) {
      var qsModule = _ref4.qsModule,
          location = _ref4.location;
      // `qs` by default converts arrays with more than 20 items to an object.
      // We want to avoid this because the data structure manipulated can therefore vary.
      // Setting the limit to `100` seems a good number because the engine's default is 100
      // (it can go up to 1000 but it is very unlikely to select more than 100 items in the UI).
      //
      // Using an `arrayLimit` of `n` allows `n + 1` items.
      //
      // See:
      //   - https://github.com/ljharb/qs#parsing-arrays
      //   - https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/
      return qsModule.parse(location.search.slice(1), {
        arrayLimit: 99
      });
    } : _ref2$parseURL,
        _ref2$writeDelay = _ref2.writeDelay,
        writeDelay = _ref2$writeDelay === void 0 ? 400 : _ref2$writeDelay,
        windowTitle = _ref2.windowTitle;

    return new BrowserHistory({
      createURL: createURL,
      parseURL: parseURL,
      writeDelay: writeDelay,
      windowTitle: windowTitle
    });
  }

  function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { _defineProperty$9(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$9(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var createRouterMiddleware = function createRouterMiddleware() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _props$router = props.router,
        router = _props$router === void 0 ? historyRouter() : _props$router,
        _props$stateMapping = props.stateMapping,
        stateMapping = _props$stateMapping === void 0 ? simpleStateMapping() : _props$stateMapping;
    return function (_ref) {
      var instantSearchInstance = _ref.instantSearchInstance;

      function topLevelCreateURL(nextState) {
        var uiState = Object.keys(nextState).reduce(function (acc, indexId) {
          return _objectSpread$8(_objectSpread$8({}, acc), {}, _defineProperty$9({}, indexId, nextState[indexId]));
        }, instantSearchInstance.mainIndex.getWidgetUiState({}));
        var route = stateMapping.stateToRoute(uiState);
        return router.createURL(route);
      } // casting to UiState here to keep createURL unaware of custom UiState
      // (as long as it's an object, it's ok)


      instantSearchInstance._createURL = topLevelCreateURL;
      var lastRouteState = undefined;
      var initialUiState = instantSearchInstance._initialUiState;
      return {
        onStateChange: function onStateChange(_ref2) {
          var uiState = _ref2.uiState;
          var routeState = stateMapping.stateToRoute(uiState);

          if (lastRouteState === undefined || !isEqual(lastRouteState, routeState)) {
            router.write(routeState);
            lastRouteState = routeState;
          }
        },
        subscribe: function subscribe() {
          instantSearchInstance._initialUiState = _objectSpread$8(_objectSpread$8({}, initialUiState), stateMapping.routeToState(router.read()));
          router.onUpdate(function (route) {
            instantSearchInstance.setUiState(stateMapping.routeToState(route));
          });
        },
        unsubscribe: function unsubscribe() {
          router.dispose();
        }
      };
    };
  };

  function extractPayload(widgets, instantSearchInstance, payload) {
    var parent = instantSearchInstance.mainIndex;
    var initOptions = {
      instantSearchInstance: instantSearchInstance,
      parent: parent,
      scopedResults: [],
      state: parent.getHelper().state,
      helper: parent.getHelper(),
      createURL: parent.createURL,
      uiState: instantSearchInstance._initialUiState,
      renderState: instantSearchInstance.renderState,
      templatesConfig: instantSearchInstance.templatesConfig,
      searchMetadata: {
        isSearchStalled: instantSearchInstance._isSearchStalled
      }
    };
    widgets.forEach(function (widget) {
      var widgetParams = {};

      if (widget.getWidgetRenderState) {
        var renderState = widget.getWidgetRenderState(initOptions);

        if (renderState && renderState.widgetParams) {
          // casting, as we just earlier checked widgetParams exists, and thus an object
          widgetParams = renderState.widgetParams;
        }
      } // since we destructure in all widgets, the parameters with defaults are set to "undefined"


      var params = Object.keys(widgetParams).filter(function (key) {
        return widgetParams[key] !== undefined;
      });
      payload.widgets.push({
        type: widget.$$type,
        widgetType: widget.$$widgetType,
        params: params
      });

      if (widget.$$type === 'ais.index') {
        extractPayload(widget.getWidgets(), instantSearchInstance, payload);
      }
    });
  }

  function isMetadataEnabled() {
    return typeof window !== 'undefined' && window.navigator.userAgent.indexOf('Algolia Crawler') > -1;
  }
  /**
   * Exposes the metadata of mounted widgets in a custom
   * `<meta name="instantsearch:widgets" />` tag. The metadata per widget is:
   * - applied parameters
   * - widget name
   * - connector name
   */

  function createMetadataMiddleware() {
    return function (_ref) {
      var instantSearchInstance = _ref.instantSearchInstance;
      var payload = {
        widgets: []
      };
      var payloadContainer = document.createElement('meta');
      var refNode = document.querySelector('head');
      payloadContainer.name = 'instantsearch:widgets';
      return {
        onStateChange: function onStateChange() {},
        subscribe: function subscribe() {
          // using setTimeout here to delay extraction until widgets have been added in a tick (e.g. Vue)
          setTimeout(function () {
            var client = instantSearchInstance.client;
            payload.ua = client.transporter && client.transporter.userAgent ? client.transporter.userAgent.value : client._ua;
            extractPayload(instantSearchInstance.mainIndex.getWidgets(), instantSearchInstance, payload);
            payloadContainer.content = JSON.stringify(payload);
            refNode.appendChild(payloadContainer);
          }, 0);
        },
        unsubscribe: function unsubscribe() {
          payloadContainer.remove();
        }
      };
    };
  }

  function _typeof$4(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }

  function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$9(Object(source), true).forEach(function (key) { _defineProperty$a(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof$4(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperty$a(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var withUsage$1 = createDocumentationMessageGenerator({
    name: 'instantsearch'
  });

  function defaultCreateURL() {
    return '#';
  }
  /**
   * Global options for an InstantSearch instance.
   */


  /**
   * The actual implementation of the InstantSearch. This is
   * created using the `instantsearch` factory function.
   * It emits the 'render' event every time a search is done
   */
  var InstantSearch = /*#__PURE__*/function (_EventEmitter) {
    _inherits(InstantSearch, _EventEmitter);

    var _super = _createSuper(InstantSearch);

    function InstantSearch(options) {
      var _this;

      _classCallCheck$1(this, InstantSearch);

      _this = _super.call(this);

      _defineProperty$a(_assertThisInitialized(_this), "client", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "indexName", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "insightsClient", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "onStateChange", null);

      _defineProperty$a(_assertThisInitialized(_this), "helper", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "mainHelper", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "mainIndex", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "started", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "templatesConfig", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "renderState", {});

      _defineProperty$a(_assertThisInitialized(_this), "_stalledSearchDelay", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "_searchStalledTimer", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "_isSearchStalled", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "_initialUiState", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "_createURL", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "_searchFunction", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "_mainHelperSearch", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "middleware", []);

      _defineProperty$a(_assertThisInitialized(_this), "sendEventToInsights", void 0);

      _defineProperty$a(_assertThisInitialized(_this), "scheduleSearch", defer(function () {
        if (_this.started) {
          _this.mainHelper.search();
        }
      }));

      _defineProperty$a(_assertThisInitialized(_this), "scheduleRender", defer(function () {
        if (!_this.mainHelper.hasPendingRequests()) {
          clearTimeout(_this._searchStalledTimer);
          _this._searchStalledTimer = null;
          _this._isSearchStalled = false;
        }

        _this.mainIndex.render({
          instantSearchInstance: _assertThisInitialized(_this)
        });

        _this.emit('render');
      }));

      _defineProperty$a(_assertThisInitialized(_this), "onInternalStateChange", defer(function () {
        var nextUiState = _this.mainIndex.getWidgetUiState({});

        _this.middleware.forEach(function (_ref) {
          var instance = _ref.instance;
          instance.onStateChange({
            uiState: nextUiState
          });
        });
      }));

      var _options$indexName = options.indexName,
          indexName = _options$indexName === void 0 ? null : _options$indexName,
          numberLocale = options.numberLocale,
          _options$initialUiSta = options.initialUiState,
          initialUiState = _options$initialUiSta === void 0 ? {} : _options$initialUiSta,
          _options$routing = options.routing,
          routing = _options$routing === void 0 ? null : _options$routing,
          searchFunction = options.searchFunction,
          _options$stalledSearc = options.stalledSearchDelay,
          stalledSearchDelay = _options$stalledSearc === void 0 ? 200 : _options$stalledSearc,
          _options$searchClient = options.searchClient,
          searchClient = _options$searchClient === void 0 ? null : _options$searchClient,
          _options$insightsClie = options.insightsClient,
          insightsClient = _options$insightsClie === void 0 ? null : _options$insightsClie,
          _options$onStateChang = options.onStateChange,
          onStateChange = _options$onStateChang === void 0 ? null : _options$onStateChang;

      if (indexName === null) {
        throw new Error(withUsage$1('The `indexName` option is required.'));
      }

      if (searchClient === null) {
        throw new Error(withUsage$1('The `searchClient` option is required.'));
      }

      if (typeof searchClient.search !== 'function') {
        throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
      }

      if (typeof searchClient.addAlgoliaAgent === 'function') {
        searchClient.addAlgoliaAgent("instantsearch.js (".concat(version$2, ")"));
      }

      if (insightsClient && typeof insightsClient !== 'function') {
        throw new Error(withUsage$1('The `insightsClient` option should be a function.'));
      }
      _this.client = searchClient;
      _this.insightsClient = insightsClient;
      _this.indexName = indexName;
      _this.helper = null;
      _this.mainHelper = null;
      _this.mainIndex = index({
        indexName: indexName
      });
      _this.onStateChange = onStateChange;
      _this.started = false;
      _this.templatesConfig = {
        helpers: hoganHelpers({
          numberLocale: numberLocale
        }),
        compileOptions: {}
      };
      _this._stalledSearchDelay = stalledSearchDelay;
      _this._searchStalledTimer = null;
      _this._isSearchStalled = false;
      _this._createURL = defaultCreateURL;
      _this._initialUiState = initialUiState;

      if (searchFunction) {
        _this._searchFunction = searchFunction;
      }

      _this.sendEventToInsights = noop;

      if (routing) {
        var routerOptions = typeof routing === 'boolean' ? undefined : routing;

        _this.use(createRouterMiddleware(routerOptions));
      }

      if (isMetadataEnabled()) {
        _this.use(createMetadataMiddleware());
      }

      return _this;
    }
    /**
     * Hooks a middleware into the InstantSearch lifecycle.
     */


    _createClass$1(InstantSearch, [{
      key: "use",
      value: function use() {
        var _this2 = this;

        for (var _len = arguments.length, middleware = new Array(_len), _key = 0; _key < _len; _key++) {
          middleware[_key] = arguments[_key];
        }

        var newMiddlewareList = middleware.map(function (fn) {
          var newMiddleware = _objectSpread$9({
            subscribe: noop,
            unsubscribe: noop,
            onStateChange: noop
          }, fn({
            instantSearchInstance: _this2
          }));

          _this2.middleware.push({
            creator: fn,
            instance: newMiddleware
          });

          return newMiddleware;
        }); // If the instance has already started, we directly subscribe the
        // middleware so they're notified of changes.

        if (this.started) {
          newMiddlewareList.forEach(function (m) {
            m.subscribe();
          });
        }

        return this;
      }
      /**
       * Removes a middleware from the InstantSearch lifecycle.
       */

    }, {
      key: "unuse",
      value: function unuse() {
        for (var _len2 = arguments.length, middlewareToUnuse = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          middlewareToUnuse[_key2] = arguments[_key2];
        }

        this.middleware.filter(function (m) {
          return middlewareToUnuse.includes(m.creator);
        }).forEach(function (m) {
          return m.instance.unsubscribe();
        });
        this.middleware = this.middleware.filter(function (m) {
          return !middlewareToUnuse.includes(m.creator);
        });
        return this;
      } // @major we shipped with EXPERIMENTAL_use, but have changed that to just `use` now

    }, {
      key: "EXPERIMENTAL_use",
      value: function EXPERIMENTAL_use() {
        return this.use.apply(this, arguments);
      }
      /**
       * Adds a widget to the search instance.
       * A widget can be added either before or after InstantSearch has started.
       * @param widget The widget to add to InstantSearch.
       *
       * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`.
       */

    }, {
      key: "addWidget",
      value: function addWidget(widget) {
        return this.addWidgets([widget]);
      }
      /**
       * Adds multiple widgets to the search instance.
       * Widgets can be added either before or after InstantSearch has started.
       * @param widgets The array of widgets to add to InstantSearch.
       */

    }, {
      key: "addWidgets",
      value: function addWidgets(widgets) {
        if (!Array.isArray(widgets)) {
          throw new Error(withUsage$1('The `addWidgets` method expects an array of widgets. Please use `addWidget`.'));
        }

        if (widgets.some(function (widget) {
          return typeof widget.init !== 'function' && typeof widget.render !== 'function';
        })) {
          throw new Error(withUsage$1('The widget definition expects a `render` and/or an `init` method.'));
        }

        this.mainIndex.addWidgets(widgets);
        return this;
      }
      /**
       * Removes a widget from the search instance.
       * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`
       * @param widget The widget instance to remove from InstantSearch.
       *
       * The widget must implement a `dispose()` method to clear its state.
       */

    }, {
      key: "removeWidget",
      value: function removeWidget(widget) {
        return this.removeWidgets([widget]);
      }
      /**
       * Removes multiple widgets from the search instance.
       * @param widgets Array of widgets instances to remove from InstantSearch.
       *
       * The widgets must implement a `dispose()` method to clear their states.
       */

    }, {
      key: "removeWidgets",
      value: function removeWidgets(widgets) {
        if (!Array.isArray(widgets)) {
          throw new Error(withUsage$1('The `removeWidgets` method expects an array of widgets. Please use `removeWidget`.'));
        }

        if (widgets.some(function (widget) {
          return typeof widget.dispose !== 'function';
        })) {
          throw new Error(withUsage$1('The widget definition expects a `dispose` method.'));
        }

        this.mainIndex.removeWidgets(widgets);
        return this;
      }
      /**
       * Ends the initialization of InstantSearch.js and triggers the
       * first search. This method should be called after all widgets have been added
       * to the instance of InstantSearch.js. InstantSearch.js also supports adding and removing
       * widgets after the start as an **EXPERIMENTAL** feature.
       */

    }, {
      key: "start",
      value: function start() {
        var _this3 = this;

        if (this.started) {
          throw new Error(withUsage$1('The `start` method has already been called once.'));
        } // This Helper is used for the queries, we don't care about its state. The
        // states are managed at the `index` level. We use this Helper to create
        // DerivedHelper scoped into the `index` widgets.
        // In Vue InstantSearch' hydrate, a main helper gets set before start, so
        // we need to respect this helper as a way to keep all listeners correct.


        var mainHelper = this.mainHelper || algoliasearchHelper_1(this.client, this.indexName);

        mainHelper.search = function () {
          // This solution allows us to keep the exact same API for the users but
          // under the hood, we have a different implementation. It should be
          // completely transparent for the rest of the codebase. Only this module
          // is impacted.
          return mainHelper.searchOnlyWithDerivedHelpers();
        };

        if (this._searchFunction) {
          // this client isn't used to actually search, but required for the helper
          // to not throw errors
          var fakeClient = {
            search: function search() {
              return new Promise(noop);
            }
          };
          this._mainHelperSearch = mainHelper.search.bind(mainHelper);

          mainHelper.search = function () {
            var mainIndexHelper = _this3.mainIndex.getHelper();

            var searchFunctionHelper = algoliasearchHelper_1(fakeClient, mainIndexHelper.state.index, mainIndexHelper.state);
            searchFunctionHelper.once('search', function (_ref2) {
              var state = _ref2.state;
              mainIndexHelper.overrideStateWithoutTriggeringChangeEvent(state);

              _this3._mainHelperSearch();
            }); // Forward state changes from `searchFunctionHelper` to `mainIndexHelper`

            searchFunctionHelper.on('change', function (_ref3) {
              var state = _ref3.state;
              mainIndexHelper.setState(state);
            });

            _this3._searchFunction(searchFunctionHelper);

            return mainHelper;
          };
        } // Only the "main" Helper emits the `error` event vs the one for `search`
        // and `results` that are also emitted on the derived one.


        mainHelper.on('error', function (_ref4) {
          var error = _ref4.error;

          _this3.emit('error', {
            error: error
          });
        });
        this.mainHelper = mainHelper;
        this.middleware.forEach(function (_ref5) {
          var instance = _ref5.instance;
          instance.subscribe();
        });
        this.mainIndex.init({
          instantSearchInstance: this,
          parent: null,
          uiState: this._initialUiState
        });
        this.scheduleSearch(); // Keep the previous reference for legacy purpose, some pattern use
        // the direct Helper access `search.helper` (e.g multi-index).

        this.helper = this.mainIndex.getHelper(); // track we started the search if we add more widgets,
        // to init them directly after add

        this.started = true;
      }
      /**
       * Removes all widgets without triggering a search afterwards. This is an **EXPERIMENTAL** feature,
       * if you find an issue with it, please
       * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20dispose).
       * @return {undefined} This method does not return anything
       */

    }, {
      key: "dispose",
      value: function dispose() {
        this.scheduleSearch.cancel();
        this.scheduleRender.cancel();
        clearTimeout(this._searchStalledTimer);
        this.removeWidgets(this.mainIndex.getWidgets());
        this.mainIndex.dispose(); // You can not start an instance two times, therefore a disposed instance
        // needs to set started as false otherwise this can not be restarted at a
        // later point.

        this.started = false; // The helper needs to be reset to perform the next search from a fresh state.
        // If not reset, it would use the state stored before calling `dispose()`.

        this.removeAllListeners();
        this.mainHelper.removeAllListeners();
        this.mainHelper = null;
        this.helper = null;
        this.middleware.forEach(function (_ref6) {
          var instance = _ref6.instance;
          instance.unsubscribe();
        });
      }
    }, {
      key: "scheduleStalledRender",
      value: function scheduleStalledRender() {
        var _this4 = this;

        if (!this._searchStalledTimer) {
          this._searchStalledTimer = setTimeout(function () {
            _this4._isSearchStalled = true;

            _this4.scheduleRender();
          }, this._stalledSearchDelay);
        }
      }
    }, {
      key: "setUiState",
      value: function setUiState(uiState) {
        if (!this.mainHelper) {
          throw new Error(withUsage$1('The `start` method needs to be called before `setUiState`.'));
        } // We refresh the index UI state to update the local UI state that the
        // main index passes to the function form of `setUiState`.


        this.mainIndex.refreshUiState();
        var nextUiState = typeof uiState === 'function' ? uiState(this.mainIndex.getWidgetUiState({})) : uiState;

        var setIndexHelperState = function setIndexHelperState(indexWidget) {

          indexWidget.getHelper().setState(indexWidget.getWidgetSearchParameters(indexWidget.getHelper().state, {
            uiState: nextUiState[indexWidget.getIndexId()]
          }));
          indexWidget.getWidgets().filter(isIndexWidget).forEach(setIndexHelperState);
        };

        setIndexHelperState(this.mainIndex);
        this.scheduleSearch();
        this.onInternalStateChange();
      }
    }, {
      key: "getUiState",
      value: function getUiState() {
        if (this.started) {
          // We refresh the index UI state to make sure changes from `refine` are taken in account
          this.mainIndex.refreshUiState();
        }

        return this.mainIndex.getWidgetUiState({});
      }
    }, {
      key: "createURL",
      value: function createURL() {
        var nextState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (!this.started) {
          throw new Error(withUsage$1('The `start` method needs to be called before `createURL`.'));
        }

        return this._createURL(nextState);
      }
    }, {
      key: "refresh",
      value: function refresh() {
        if (!this.mainHelper) {
          throw new Error(withUsage$1('The `start` method needs to be called before `refresh`.'));
        }

        this.mainHelper.clearCache().search();
      }
    }]);

    return InstantSearch;
  }(events);

  function _objectWithoutProperties$4(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$5(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose$5(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

  function getStateWithoutPage(state) {
    var _ref = state || {},
        page = _ref.page,
        rest = _objectWithoutProperties$4(_ref, ["page"]);

    return rest;
  }

  var KEY = 'ais.infiniteHits';

  function hasSessionStorage() {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
  }

  function createInfiniteHitsSessionStorageCache() {
    return {
      read: function read(_ref2) {
        var state = _ref2.state;

        if (!hasSessionStorage()) {
          return null;
        }

        try {
          var cache = JSON.parse( // @ts-expect-error JSON.parse() requires a string, but it actually accepts null, too.
          window.sessionStorage.getItem(KEY));
          return cache && isEqual(cache.state, getStateWithoutPage(state)) ? cache.hits : null;
        } catch (error) {
          if (error instanceof SyntaxError) {
            try {
              window.sessionStorage.removeItem(KEY);
            } catch (err) {// do nothing
            }
          }

          return null;
        }
      },
      write: function write(_ref3) {
        var state = _ref3.state,
            hits = _ref3.hits;

        if (!hasSessionStorage()) {
          return;
        }

        try {
          window.sessionStorage.setItem(KEY, JSON.stringify({
            state: getStateWithoutPage(state),
            hits: hits
          }));
        } catch (error) {// do nothing
        }
      }
    };
  }

  /**
   * InstantSearch is the main component of InstantSearch.js. This object
   * manages the widget and lets you add new ones.
   *
   * Two parameters are required to get you started with InstantSearch.js:
   *  - `indexName`: the main index that you will use for your new search UI
   *  - `searchClient`: the search client to plug to InstantSearch.js
   *
   * The [search client provided by Algolia](algolia.com/doc/api-client/getting-started/what-is-the-api-client/javascript/)
   * needs an `appId` and an `apiKey`. Those parameters can be found in your
   * [Algolia dashboard](https://www.algolia.com/api-keys).
   *
   * If you want to get up and running quickly with InstantSearch.js, have a
   * look at the [getting started](https://www.algolia.com/doc/guides/building-search-ui/getting-started/js/).
   */
  var instantsearch = function instantsearch(options) {
    return new InstantSearch(options);
  };

  instantsearch.version = version$2;
  instantsearch.createInfiniteHitsSessionStorageCache = deprecate(createInfiniteHitsSessionStorageCache, "import { createInfiniteHitsSessionStorageCache } from 'instantsearch.js/es/helpers'");
  instantsearch.highlight = deprecate(highlight, "import { highlight } from 'instantsearch.js/es/helpers'");
  instantsearch.reverseHighlight = deprecate(reverseHighlight, "import { reverseHighlight } from 'instantsearch.js/es/helpers'");
  instantsearch.snippet = deprecate(snippet, "import { snippet } from 'instantsearch.js/es/helpers'");
  instantsearch.reverseSnippet = deprecate(reverseSnippet, "import { reverseSnippet } from 'instantsearch.js/es/helpers'");
  instantsearch.insights = insights;
  instantsearch.getInsightsAnonymousUserToken = getInsightsAnonymousUserToken;
  Object.defineProperty(instantsearch, 'widgets', {
    get: function get() {
      throw new ReferenceError("\"instantsearch.widgets\" are not available from the ES build.\n\nTo import the widgets:\n\nimport { searchBox } from 'instantsearch.js/es/widgets'");
    }
  });
  Object.defineProperty(instantsearch, 'connectors', {
    get: function get() {
      throw new ReferenceError("\"instantsearch.connectors\" are not available from the ES build.\n\nTo import the connectors:\n\nimport { connectSearchBox } from 'instantsearch.js/es/connectors'");
    }
  });

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
  }

  /**
   * Forces a React update that triggers a rerender.
   * @link https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
   */

  function useForceUpdate() {
    var _useReducer = React.useReducer(function (x) {
      return x + 1;
    }, 0),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        forceUpdate = _useReducer2[1];

    return forceUpdate;
  }

  var has$3 = Object.prototype.hasOwnProperty;

  function dequal(foo, bar) {
  	var ctor, len;
  	if (foo === bar) return true;

  	if (foo && bar && (ctor=foo.constructor) === bar.constructor) {
  		if (ctor === Date) return foo.getTime() === bar.getTime();
  		if (ctor === RegExp) return foo.toString() === bar.toString();

  		if (ctor === Array) {
  			if ((len=foo.length) === bar.length) {
  				while (len-- && dequal(foo[len], bar[len]));
  			}
  			return len === -1;
  		}

  		if (!ctor || typeof foo === 'object') {
  			len = 0;
  			for (ctor in foo) {
  				if (has$3.call(foo, ctor) && ++len && !has$3.call(bar, ctor)) return false;
  				if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
  			}
  			return Object.keys(bar).length === len;
  		}
  	}

  	return foo !== foo && bar !== bar;
  }

  function useStableValue(value) {
    var _useState = React.useState(function () {
      return value;
    }),
        _useState2 = _slicedToArray(_useState, 2),
        stableValue = _useState2[0],
        setStableValue = _useState2[1];

    React.useEffect(function () {
      if (!dequal(stableValue, value)) {
        setStableValue(value);
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [value]);
    return stableValue;
  }

  var _excluded = ["suppressExperimentalWarning"];
  function useInstantSearch(_ref) {
    var _ref$suppressExperime = _ref.suppressExperimentalWarning,
        suppressExperimentalWarning = _ref$suppressExperime === void 0 ? false : _ref$suppressExperime,
        props = _objectWithoutProperties(_ref, _excluded);

    var stableProps = useStableValue(props);
    var search = React.useMemo(function () {
      return instantsearch(stableProps);
    }, [stableProps]);
    var forceUpdate = useForceUpdate();
    React.useEffect(function () {
    }, [suppressExperimentalWarning]);
    React.useEffect(function () {
      if (typeof stableProps.searchClient.addAlgoliaAgent === 'function') {
        stableProps.searchClient.addAlgoliaAgent("react (".concat(React.version, ")"));
        stableProps.searchClient.addAlgoliaAgent("react-instantsearch (".concat(version, ")"));
        stableProps.searchClient.addAlgoliaAgent("react-instantsearch-hooks (".concat(version, ")"));
      }
    }, [stableProps.searchClient]);
    React.useEffect(function () {
      search.start();
      forceUpdate();
      return function () {
        search.dispose();
        forceUpdate();
      };
    }, [search, forceUpdate]);
    return search;
  }

  var _excluded$1 = ["children"];
  function InstantSearch$1(_ref) {
    var children = _ref.children,
        props = _objectWithoutProperties(_ref, _excluded$1);

    var search = useInstantSearch(props);

    if (!search.started) {
      return null;
    }

    return /*#__PURE__*/React__default.createElement(InstantSearchContext.Provider, {
      value: search
    }, /*#__PURE__*/React__default.createElement(IndexContext.Provider, {
      value: search.mainIndex
    }, children));
  }

  function useIndexContext() {
    var context = React.useContext(IndexContext);

    if (context === null) {
      throw new Error('`useIndexContext` must be used within `IndexContext.Provider`.');
    }

    return context;
  }

  function useIndex(props) {
    var parentIndex = useIndexContext();
    var stableProps = useStableValue(props);
    var indexWidget = React.useMemo(function () {
      return index(stableProps);
    }, [stableProps]);
    var helper = indexWidget.getHelper();
    var forceUpdate = useForceUpdate();
    React.useEffect(function () {
      forceUpdate();
    }, [helper, forceUpdate]);
    React.useEffect(function () {
      parentIndex.addWidgets([indexWidget]);
      return function () {
        parentIndex.removeWidgets([indexWidget]);
      };
    }, [parentIndex, indexWidget]);
    return indexWidget;
  }

  var _excluded$2 = ["children"];
  function Index(_ref) {
    var children = _ref.children,
        props = _objectWithoutProperties(_ref, _excluded$2);

    var index = useIndex(props);

    if (index.getHelper() === null) {
      return null;
    }

    return /*#__PURE__*/React__default.createElement(IndexContext.Provider, {
      value: index
    }, children);
  }

  function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$a(Object(source), true).forEach(function (key) { _defineProperty$b(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$b(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  /**
   * Refine the given search parameters.
   */

  var withUsage$2 = createDocumentationMessageGenerator({
    name: 'configure',
    connector: true
  });

  function getInitialSearchParameters(state, widgetParams) {
    // We leverage the helper internals to remove the `widgetParams` from
    // the state. The function `setQueryParameters` omits the values that
    // are `undefined` on the next state.
    return state.setQueryParameters(Object.keys(widgetParams.searchParameters).reduce(function (acc, key) {
      return _objectSpread$a(_objectSpread$a({}, acc), {}, _defineProperty$b({}, key, undefined));
    }, {}));
  }

  var connectConfigure = function connectConfigure() {
    var renderFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    return function (widgetParams) {
      if (!widgetParams || !isPlainObject(widgetParams.searchParameters)) {
        throw new Error(withUsage$2('The `searchParameters` option expects an object.'));
      }

      var connectorState = {};

      function refine(helper) {
        return function (searchParameters) {
          // Merge new `searchParameters` with the ones set from other widgets
          var actualState = getInitialSearchParameters(helper.state, widgetParams);
          var nextSearchParameters = merge$1(actualState, new algoliasearchHelper_1.SearchParameters(searchParameters)); // Update original `widgetParams.searchParameters` to the new refined one

          widgetParams.searchParameters = searchParameters; // Trigger a search with the resolved search parameters

          helper.setState(nextSearchParameters).search();
        };
      }

      return {
        $$type: 'ais.configure',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread$a(_objectSpread$a({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread$a(_objectSpread$a({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref) {
          var state = _ref.state;
          unmountFn();
          return getInitialSearchParameters(state, widgetParams);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          var _renderState$configur;

          var widgetRenderState = this.getWidgetRenderState(renderOptions);
          return _objectSpread$a(_objectSpread$a({}, renderState), {}, {
            configure: _objectSpread$a(_objectSpread$a({}, widgetRenderState), {}, {
              widgetParams: _objectSpread$a(_objectSpread$a({}, widgetRenderState.widgetParams), {}, {
                searchParameters: merge$1(new algoliasearchHelper_1.SearchParameters((_renderState$configur = renderState.configure) === null || _renderState$configur === void 0 ? void 0 : _renderState$configur.widgetParams.searchParameters), new algoliasearchHelper_1.SearchParameters(widgetRenderState.widgetParams.searchParameters)).getQueryParams()
              })
            })
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref2) {
          var helper = _ref2.helper;

          if (!connectorState.refine) {
            connectorState.refine = refine(helper);
          }

          return {
            refine: connectorState.refine,
            widgetParams: widgetParams
          };
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref3) {
          var uiState = _ref3.uiState;
          return merge$1(state, new algoliasearchHelper_1.SearchParameters(_objectSpread$a(_objectSpread$a({}, uiState.configure), widgetParams.searchParameters)));
        },
        getWidgetUiState: function getWidgetUiState(uiState) {
          return _objectSpread$a(_objectSpread$a({}, uiState), {}, {
            configure: _objectSpread$a(_objectSpread$a({}, uiState.configure), widgetParams.searchParameters)
          });
        }
      };
    };
  };

  function _defineProperty$c(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function useInstantSearchContext() {
    var context = React.useContext(InstantSearchContext);

    if (context === null) {
      throw new Error('Hooks must be used inside the <InstantSearch /> component.\n\n' + 'They are not compatible with the `react-instantsearch-core` and `react-instantsearch-dom` packages, so make sure to use the <InstantSearch /> component from `react-instantsearch-hooks`.');
    }

    return context;
  }

  function createSearchResults(state) {
    var _state$query, _state$page, _state$hitsPerPage;

    return new algoliasearchHelper_1.SearchResults(state, [{
      query: (_state$query = state.query) !== null && _state$query !== void 0 ? _state$query : '',
      page: (_state$page = state.page) !== null && _state$page !== void 0 ? _state$page : 0,
      hitsPerPage: (_state$hitsPerPage = state.hitsPerPage) !== null && _state$hitsPerPage !== void 0 ? _state$hitsPerPage : 20,
      hits: [],
      nbHits: 0,
      nbPages: 0,
      params: '',
      exhaustiveNbHits: true,
      exhaustiveFacetsCount: true,
      processingTimeMS: 0,
      index: state.index
    }]);
  }

  var _excluded$3 = ["instantSearchInstance", "widgetParams"],
      _excluded2 = ["widgetParams"];

  function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$b(Object(source), true).forEach(function (key) { _defineProperty$c(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  function useConnector(connector) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var search = useInstantSearchContext();
    var parentIndex = useIndexContext();
    var stableProps = useStableValue(props);
    var widget = React.useMemo(function () {
      var createWidget = connector(function (connectorState, isFirstRender) {
        // We skip the `init` widget render because:
        // - We rely on `getWidgetRenderState` to compute the initial state before
        //   the InstantSearch.js lifecycle starts.
        // - It prevents UI flashes when updating the widget props.
        if (isFirstRender) {
          return;
        }

        var instantSearchInstance = connectorState.instantSearchInstance,
            widgetParams = connectorState.widgetParams,
            renderState = _objectWithoutProperties(connectorState, _excluded$3); // eslint-disable-next-line @typescript-eslint/no-use-before-define


        setState(renderState);
      });
      return createWidget(stableProps);
    }, [stableProps, connector]);

    var _useState = React.useState(function () {
      if (widget.getWidgetRenderState) {
        // The helper exists because we've started InstantSearch.
        var helper = parentIndex.getHelper();
        var results = parentIndex.getResults() || createSearchResults(helper.state);
        var scopedResults = parentIndex.getScopedResults().map(function (scopedResult) {
          var fallbackResults = scopedResult.indexId === parentIndex.getIndexId() ? results : createSearchResults(scopedResult.helper.state);
          return _objectSpread$b(_objectSpread$b({}, scopedResult), {}, {
            // We avoid all `results` being `null`.
            results: scopedResult.results || fallbackResults
          });
        }); // We get the widget render state by providing the same parameters as
        // InstantSearch provides to the widget's `render` method.
        // See https://github.com/algolia/instantsearch.js/blob/019cd18d0de6dd320284aa4890541b7fe2198c65/src/widgets/index/index.ts#L604-L617

        // We get the widget render state by providing the same parameters as
        // InstantSearch provides to the widget's `render` method.
        // See https://github.com/algolia/instantsearch.js/blob/019cd18d0de6dd320284aa4890541b7fe2198c65/src/widgets/index/index.ts#L604-L617
        var _widget$getWidgetRend = widget.getWidgetRenderState({
          helper: helper,
          parent: parentIndex,
          instantSearchInstance: search,
          results: results,
          scopedResults: scopedResults,
          state: results._state,
          renderState: search.renderState,
          templatesConfig: search.templatesConfig,
          createURL: parentIndex.createURL,
          searchMetadata: {
            isSearchStalled: search._isSearchStalled
          }
        }),
            widgetParams = _widget$getWidgetRend.widgetParams,
            renderState = _objectWithoutProperties(_widget$getWidgetRend, _excluded2);

        return renderState;
      }

      return {};
    }),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1]; // We use a layout effect to add the widget to the index before the index
    // renders, otherwise it triggers 2 network requests.


    React.useLayoutEffect(function () {
      parentIndex.addWidgets([widget]);
      return function () {
        parentIndex.removeWidgets([widget]);
      };
    }, [widget, parentIndex]);
    return state;
  }

  function useConfigure(props) {
    return useConnector(connectConfigure, {
      searchParameters: props
    });
  }

  function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$c(Object(source), true).forEach(function (key) { _defineProperty$d(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$d(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var withUsage$3 = createDocumentationMessageGenerator({
    name: 'hits',
    connector: true
  });

  var connectHits = function connectHits(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$3());
    return function (widgetParams) {
      var _ref = widgetParams || {},
          _ref$escapeHTML = _ref.escapeHTML,
          escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML,
          _ref$transformItems = _ref.transformItems,
          transformItems = _ref$transformItems === void 0 ? function (items) {
        return items;
      } : _ref$transformItems;

      var sendEvent;
      var bindEvent;
      return {
        $$type: 'ais.hits',
        init: function init(initOptions) {
          renderFn(_objectSpread$c(_objectSpread$c({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: initOptions.instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var renderState = this.getWidgetRenderState(renderOptions);
          renderState.sendEvent('view', renderState.hits);
          renderFn(_objectSpread$c(_objectSpread$c({}, renderState), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread$c(_objectSpread$c({}, renderState), {}, {
            hits: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref2) {
          var results = _ref2.results,
              helper = _ref2.helper,
              instantSearchInstance = _ref2.instantSearchInstance;

          if (!sendEvent) {
            sendEvent = createSendEventForHits({
              instantSearchInstance: instantSearchInstance,
              index: helper.getIndex(),
              widgetType: this.$$type
            });
          }

          if (!bindEvent) {
            bindEvent = createBindEventForHits({
              index: helper.getIndex(),
              widgetType: this.$$type
            });
          }

          if (!results) {
            return {
              hits: [],
              results: undefined,
              sendEvent: sendEvent,
              bindEvent: bindEvent,
              widgetParams: widgetParams
            };
          }

          if (escapeHTML && results.hits.length > 0) {
            results.hits = escapeHits(results.hits);
          }

          var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
          var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
          var transformedHits = transformItems(hitsWithAbsolutePositionAndQueryID);
          return {
            hits: transformedHits,
            results: results,
            sendEvent: sendEvent,
            bindEvent: bindEvent,
            widgetParams: widgetParams
          };
        },
        dispose: function dispose(_ref3) {
          var state = _ref3.state;
          unmountFn();

          if (!escapeHTML) {
            return state;
          }

          return state.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function (acc, key) {
            return _objectSpread$c(_objectSpread$c({}, acc), {}, _defineProperty$d({}, key, undefined));
          }, {}));
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(state) {
          if (!escapeHTML) {
            return state;
          }

          return state.setQueryParameters(TAG_PLACEHOLDER);
        }
      };
    };
  };

  function useHits(props) {
    return useConnector(connectHits, props);
  }

  function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$d(Object(source), true).forEach(function (key) { _defineProperty$e(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$e(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _objectWithoutProperties$5(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$6(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose$6(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

  function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$1(); }

  function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

  function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit$1(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
  var withUsage$4 = createDocumentationMessageGenerator({
    name: 'hierarchical-menu',
    connector: true
  });
  var DEFAULT_SORT = ['name:asc'];

  /**
   * **HierarchicalMenu** connector provides the logic to build a custom widget
   * that will give the user the ability to explore facets in a tree-like structure.
   *
   * This is commonly used for multi-level categorization of products on e-commerce
   * websites. From a UX point of view, we suggest not displaying more than two
   * levels deep.
   *
   * @type {Connector}
   * @param {function(HierarchicalMenuRenderingOptions, boolean)} renderFn Rendering function for the custom **HierarchicalMenu** widget.
   * @param {function} unmountFn Unmount function called when the widget is disposed.
   * @return {function(CustomHierarchicalMenuWidgetParams)} Re-usable widget factory for a custom **HierarchicalMenu** widget.
   */
  var connectHierarchicalMenu = function connectHierarchicalMenu(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$4());
    return function (widgetParams) {
      var _ref = widgetParams || {},
          attributes = _ref.attributes,
          _ref$separator = _ref.separator,
          separator = _ref$separator === void 0 ? ' > ' : _ref$separator,
          _ref$rootPath = _ref.rootPath,
          rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath,
          _ref$showParentLevel = _ref.showParentLevel,
          showParentLevel = _ref$showParentLevel === void 0 ? true : _ref$showParentLevel,
          _ref$limit = _ref.limit,
          limit = _ref$limit === void 0 ? 10 : _ref$limit,
          _ref$showMore = _ref.showMore,
          showMore = _ref$showMore === void 0 ? false : _ref$showMore,
          _ref$showMoreLimit = _ref.showMoreLimit,
          showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit,
          _ref$sortBy = _ref.sortBy,
          sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT : _ref$sortBy,
          _ref$transformItems = _ref.transformItems,
          transformItems = _ref$transformItems === void 0 ? function (items) {
        return items;
      } : _ref$transformItems;

      if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
        throw new Error(withUsage$4('The `attributes` option expects an array of strings.'));
      }

      if (showMore === true && showMoreLimit <= limit) {
        throw new Error(withUsage$4('The `showMoreLimit` option must be greater than `limit`.'));
      }

      // we need to provide a hierarchicalFacet name for the search state
      // so that we can always map $hierarchicalFacetName => real attributes
      // we use the first attribute name
      var _attributes = _slicedToArray$1(attributes, 1),
          hierarchicalFacetName = _attributes[0];

      var sendEvent; // Provide the same function to the `renderFn` so that way the user
      // has to only bind it once when `isFirstRendering` for instance

      var toggleShowMore = function toggleShowMore() {};

      function cachedToggleShowMore() {
        toggleShowMore();
      }

      var _refine;

      var isShowingMore = false;

      function createToggleShowMore(renderOptions, widget) {
        return function () {
          isShowingMore = !isShowingMore;
          widget.render(renderOptions);
        };
      }

      function getLimit() {
        return isShowingMore ? showMoreLimit : limit;
      }

      function _prepareFacetValues(facetValues) {
        return facetValues.slice(0, getLimit()).map(function (_ref2) {
          var label = _ref2.name,
              value = _ref2.path,
              data = _ref2.data,
              subValue = _objectWithoutProperties$5(_ref2, ["name", "path", "data"]);

          var item = _objectSpread$d(_objectSpread$d({}, subValue), {}, {
            label: label,
            value: value,
            data: null
          });

          if (Array.isArray(data)) {
            item.data = _prepareFacetValues(data);
          }

          return item;
        });
      }

      return {
        $$type: 'ais.hierarchicalMenu',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread$d(_objectSpread$d({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          toggleShowMore = createToggleShowMore(renderOptions, this);
          renderFn(_objectSpread$d(_objectSpread$d({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref3) {
          var state = _ref3.state;
          unmountFn();
          return state.removeHierarchicalFacet(hierarchicalFacetName).setQueryParameter('maxValuesPerFacet', undefined);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread$d(_objectSpread$d({}, renderState), {}, {
            hierarchicalMenu: _objectSpread$d(_objectSpread$d({}, renderState.hierarchicalMenu), {}, _defineProperty$e({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref4) {
          var results = _ref4.results,
              state = _ref4.state,
              createURL = _ref4.createURL,
              instantSearchInstance = _ref4.instantSearchInstance,
              helper = _ref4.helper;
          var items = [];
          var canToggleShowMore = false; // Bind createURL to this specific attribute

          function _createURL(facetValue) {
            return createURL(state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue));
          }

          if (!sendEvent) {
            sendEvent = createSendEventForFacet({
              instantSearchInstance: instantSearchInstance,
              helper: helper,
              attribute: hierarchicalFacetName,
              widgetType: this.$$type
            });
          }

          if (!_refine) {
            _refine = function _refine(facetValue) {
              sendEvent('click', facetValue);
              helper.toggleFacetRefinement(hierarchicalFacetName, facetValue).search();
            };
          }

          if (results) {
            var facetValues = results.getFacetValues(hierarchicalFacetName, {
              sortBy: sortBy,
              facetOrdering: sortBy === DEFAULT_SORT
            });
            var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : []; // If the limit is the max number of facet retrieved it is impossible to know
            // if the facets are exhaustive. The only moment we are sure it is exhaustive
            // is when it is strictly under the number requested unless we know that another
            // widget has requested more values (maxValuesPerFacet > getLimit()).
            // Because this is used for making the search of facets unable or not, it is important
            // to be conservative here.

            var hasExhaustiveItems = (state.maxValuesPerFacet || 0) > getLimit() ? facetItems.length <= getLimit() : facetItems.length < getLimit();
            canToggleShowMore = showMore && (isShowingMore || !hasExhaustiveItems);
            items = transformItems(_prepareFacetValues(facetItems));
          }

          return {
            items: items,
            refine: _refine,
            canRefine: items.length > 0,
            createURL: _createURL,
            sendEvent: sendEvent,
            widgetParams: widgetParams,
            isShowingMore: isShowingMore,
            toggleShowMore: cachedToggleShowMore,
            canToggleShowMore: canToggleShowMore
          };
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
          var searchParameters = _ref5.searchParameters;
          var path = searchParameters.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);

          if (!path.length) {
            return uiState;
          }

          return _objectSpread$d(_objectSpread$d({}, uiState), {}, {
            hierarchicalMenu: _objectSpread$d(_objectSpread$d({}, uiState.hierarchicalMenu), {}, _defineProperty$e({}, hierarchicalFacetName, path))
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
          var uiState = _ref6.uiState;
          var values = uiState.hierarchicalMenu && uiState.hierarchicalMenu[hierarchicalFacetName];

          if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
            var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
          }

          var withFacetConfiguration = searchParameters.removeHierarchicalFacet(hierarchicalFacetName).addHierarchicalFacet({
            name: hierarchicalFacetName,
            attributes: attributes,
            separator: separator,
            rootPath: rootPath,
            showParentLevel: showParentLevel
          });
          var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
          var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
          var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter('maxValuesPerFacet', nextMaxValuesPerFacet);

          if (!values) {
            return withMaxValuesPerFacet.setQueryParameters({
              hierarchicalFacetsRefinements: _objectSpread$d(_objectSpread$d({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, _defineProperty$e({}, hierarchicalFacetName, []))
            });
          }

          return withMaxValuesPerFacet.addHierarchicalFacetRefinement(hierarchicalFacetName, values.join(separator));
        }
      };
    };
  };

  function useHierarchicalMenu(props) {
    return useConnector(connectHierarchicalMenu, props);
  }

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }

  function _defineProperty$f(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var Paginator = /*#__PURE__*/function () {
    function Paginator(params) {
      _classCallCheck$2(this, Paginator);

      _defineProperty$f(this, "currentPage", void 0);

      _defineProperty$f(this, "total", void 0);

      _defineProperty$f(this, "padding", void 0);

      this.currentPage = params.currentPage;
      this.total = params.total;
      this.padding = params.padding;
    }

    _createClass$2(Paginator, [{
      key: "pages",
      value: function pages() {
        var total = this.total,
            currentPage = this.currentPage,
            padding = this.padding;
        if (total === 0) return [0];
        var totalDisplayedPages = this.nbPagesDisplayed(padding, total);

        if (totalDisplayedPages === total) {
          return range({
            end: total
          });
        }

        var paddingLeft = this.calculatePaddingLeft(currentPage, padding, total, totalDisplayedPages);
        var paddingRight = totalDisplayedPages - paddingLeft;
        var first = currentPage - paddingLeft;
        var last = currentPage + paddingRight;
        return range({
          start: first,
          end: last
        });
      }
    }, {
      key: "nbPagesDisplayed",
      value: function nbPagesDisplayed(padding, total) {
        return Math.min(2 * padding + 1, total);
      }
    }, {
      key: "calculatePaddingLeft",
      value: function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
        if (current <= padding) {
          return current;
        }

        if (current >= total - padding) {
          return totalDisplayedPages - (total - current);
        }

        return padding;
      }
    }, {
      key: "isLastPage",
      value: function isLastPage() {
        return this.currentPage === this.total - 1 || this.total === 0;
      }
    }, {
      key: "isFirstPage",
      value: function isFirstPage() {
        return this.currentPage === 0;
      }
    }]);

    return Paginator;
  }();

  function ownKeys$e(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$e(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$e(Object(source), true).forEach(function (key) { _defineProperty$g(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$e(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$g(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var withUsage$5 = createDocumentationMessageGenerator({
    name: 'pagination',
    connector: true
  });

  /**
   * **Pagination** connector provides the logic to build a widget that will let the user
   * choose the current page of the results.
   *
   * When using the pagination with Algolia, you should be aware that the engine won't provide you pages
   * beyond the 1000th hits by default. You can find more information on the [Algolia documentation](https://www.algolia.com/doc/guides/searching/pagination/#pagination-limitations).
   */
  var connectPagination = function connectPagination(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$5());
    return function (widgetParams) {
      var _ref = widgetParams || {},
          totalPages = _ref.totalPages,
          _ref$padding = _ref.padding,
          padding = _ref$padding === void 0 ? 3 : _ref$padding;

      var pager = new Paginator({
        currentPage: 0,
        total: 0,
        padding: padding
      });
      var connectorState = {};

      function getMaxPage(_ref2) {
        var nbPages = _ref2.nbPages;
        return totalPages !== undefined ? Math.min(totalPages, nbPages) : nbPages;
      }

      return {
        $$type: 'ais.pagination',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread$e(_objectSpread$e({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread$e(_objectSpread$e({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref3) {
          var state = _ref3.state;
          unmountFn();
          return state.setQueryParameter('page', undefined);
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
          var searchParameters = _ref4.searchParameters;
          var page = searchParameters.page || 0;

          if (!page) {
            return uiState;
          }

          return _objectSpread$e(_objectSpread$e({}, uiState), {}, {
            page: page + 1
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
          var uiState = _ref5.uiState;
          var page = uiState.page ? uiState.page - 1 : 0;
          return searchParameters.setQueryParameter('page', page);
        },
        getWidgetRenderState: function getWidgetRenderState(_ref6) {
          var results = _ref6.results,
              helper = _ref6.helper,
              createURL = _ref6.createURL;

          if (!connectorState.refine) {
            connectorState.refine = function (page) {
              helper.setPage(page);
              helper.search();
            };
          }

          if (!connectorState.createURL) {
            connectorState.createURL = function (state) {
              return function (page) {
                return createURL(state.setPage(page));
              };
            };
          }

          var state = helper.state;
          var page = state.page || 0;
          var nbPages = getMaxPage(results || {
            nbPages: 0
          });
          pager.currentPage = page;
          pager.total = nbPages;
          return {
            createURL: connectorState.createURL(state),
            refine: connectorState.refine,
            canRefine: nbPages > 1,
            currentRefinement: page,
            nbHits: (results === null || results === void 0 ? void 0 : results.nbHits) || 0,
            nbPages: nbPages,
            pages: results ? pager.pages() : [],
            isFirstPage: pager.isFirstPage(),
            isLastPage: pager.isLastPage(),
            widgetParams: widgetParams
          };
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread$e(_objectSpread$e({}, renderState), {}, {
            pagination: this.getWidgetRenderState(renderOptions)
          });
        }
      };
    };
  };

  function usePagination(props) {
    return useConnector(connectPagination, props);
  }

  function ownKeys$f(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$f(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$f(Object(source), true).forEach(function (key) { _defineProperty$h(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$f(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$h(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _objectWithoutProperties$6(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$7(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose$7(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
  var withUsage$6 = createDocumentationMessageGenerator({
    name: 'refinement-list',
    connector: true
  });
  var DEFAULT_SORT$1 = ['isRefined', 'count:desc', 'name:asc'];

  /**
   * **RefinementList** connector provides the logic to build a custom widget that
   * will let the user filter the results based on the values of a specific facet.
   *
   * **Requirement:** the attribute passed as `attribute` must be present in
   * attributesForFaceting of the searched index.
   *
   * This connector provides:
   * - a `refine()` function to select an item.
   * - a `toggleShowMore()` function to display more or less items
   * - a `searchForItems()` function to search within the items.
   */
  var connectRefinementList = function connectRefinementList(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$6());
    return function (widgetParams) {
      var _ref = widgetParams || {},
          attribute = _ref.attribute,
          _ref$operator = _ref.operator,
          operator = _ref$operator === void 0 ? 'or' : _ref$operator,
          _ref$limit = _ref.limit,
          limit = _ref$limit === void 0 ? 10 : _ref$limit,
          _ref$showMore = _ref.showMore,
          showMore = _ref$showMore === void 0 ? false : _ref$showMore,
          _ref$showMoreLimit = _ref.showMoreLimit,
          showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit,
          _ref$sortBy = _ref.sortBy,
          sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT$1 : _ref$sortBy,
          _ref$escapeFacetValue = _ref.escapeFacetValues,
          escapeFacetValues = _ref$escapeFacetValue === void 0 ? true : _ref$escapeFacetValue,
          _ref$transformItems = _ref.transformItems,
          transformItems = _ref$transformItems === void 0 ? function (items) {
        return items;
      } : _ref$transformItems;

      if (!attribute) {
        throw new Error(withUsage$6('The `attribute` option is required.'));
      }

      if (!/^(and|or)$/.test(operator)) {
        throw new Error(withUsage$6("The `operator` must one of: `\"and\"`, `\"or\"` (got \"".concat(operator, "\").")));
      }

      if (showMore === true && showMoreLimit <= limit) {
        throw new Error(withUsage$6('`showMoreLimit` should be greater than `limit`.'));
      }

      var formatItems = function formatItems(_ref2) {
        var label = _ref2.name,
            item = _objectWithoutProperties$6(_ref2, ["name"]);

        return _objectSpread$f(_objectSpread$f({}, item), {}, {
          label: label,
          value: label,
          highlighted: label
        });
      };

      var lastResultsFromMainSearch;
      var lastItemsFromMainSearch = [];
      var hasExhaustiveItems = true;
      var triggerRefine;
      var sendEvent;
      var isShowingMore = false; // Provide the same function to the `renderFn` so that way the user
      // has to only bind it once when `isFirstRendering` for instance

      var toggleShowMore = function toggleShowMore() {};

      function cachedToggleShowMore() {
        toggleShowMore();
      }

      function createToggleShowMore(renderOptions, widget) {
        return function () {
          isShowingMore = !isShowingMore;
          widget.render(renderOptions);
        };
      }

      function getLimit() {
        return isShowingMore ? showMoreLimit : limit;
      }

      var searchForFacetValues = function searchForFacetValues() {
        return function () {};
      };

      var createSearchForFacetValues = function createSearchForFacetValues(helper, widget) {
        return function (renderOptions) {
          return function (query) {
            var instantSearchInstance = renderOptions.instantSearchInstance;

            if (query === '' && lastItemsFromMainSearch) {
              // render with previous data from the helper.
              renderFn(_objectSpread$f(_objectSpread$f({}, widget.getWidgetRenderState(_objectSpread$f(_objectSpread$f({}, renderOptions), {}, {
                results: lastResultsFromMainSearch
              }))), {}, {
                instantSearchInstance: instantSearchInstance
              }), false);
            } else {
              var tags = {
                highlightPreTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPreTag : TAG_REPLACEMENT.highlightPreTag,
                highlightPostTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPostTag : TAG_REPLACEMENT.highlightPostTag
              };
              helper.searchForFacetValues(attribute, query, // We cap the `maxFacetHits` value to 100 because the Algolia API
              // doesn't support a greater number.
              // See https://www.algolia.com/doc/api-reference/api-parameters/maxFacetHits/
              Math.min(getLimit(), 100), tags).then(function (results) {
                var facetValues = escapeFacetValues ? escapeFacets(results.facetHits) : results.facetHits;
                var normalizedFacetValues = transformItems(facetValues.map(function (_ref3) {
                  var value = _ref3.value,
                      item = _objectWithoutProperties$6(_ref3, ["value"]);

                  return _objectSpread$f(_objectSpread$f({}, item), {}, {
                    value: value,
                    label: value
                  });
                }));
                renderFn(_objectSpread$f(_objectSpread$f({}, widget.getWidgetRenderState(_objectSpread$f(_objectSpread$f({}, renderOptions), {}, {
                  results: lastResultsFromMainSearch
                }))), {}, {
                  items: normalizedFacetValues,
                  canToggleShowMore: false,
                  canRefine: true,
                  isFromSearch: true,
                  instantSearchInstance: instantSearchInstance
                }), false);
              });
            }
          };
        };
      };

      return {
        $$type: 'ais.refinementList',
        init: function init(initOptions) {
          renderFn(_objectSpread$f(_objectSpread$f({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: initOptions.instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          renderFn(_objectSpread$f(_objectSpread$f({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread$f(_objectSpread$f({}, renderState), {}, {
            refinementList: _objectSpread$f(_objectSpread$f({}, renderState.refinementList), {}, _defineProperty$h({}, attribute, this.getWidgetRenderState(renderOptions)))
          });
        },
        getWidgetRenderState: function getWidgetRenderState(renderOptions) {
          var results = renderOptions.results,
              state = renderOptions.state,
              _createURL = renderOptions.createURL,
              instantSearchInstance = renderOptions.instantSearchInstance,
              helper = renderOptions.helper;
          var items = [];
          var facetValues = [];

          if (!sendEvent || !triggerRefine || !searchForFacetValues) {
            sendEvent = createSendEventForFacet({
              instantSearchInstance: instantSearchInstance,
              helper: helper,
              attribute: attribute,
              widgetType: this.$$type
            });

            triggerRefine = function triggerRefine(facetValue) {
              sendEvent('click', facetValue);
              helper.toggleFacetRefinement(attribute, facetValue).search();
            };

            searchForFacetValues = createSearchForFacetValues(helper, this);
          }

          if (results) {
            var values = results.getFacetValues(attribute, {
              sortBy: sortBy,
              facetOrdering: sortBy === DEFAULT_SORT$1
            });
            facetValues = values && Array.isArray(values) ? values : [];
            items = transformItems(facetValues.slice(0, getLimit()).map(formatItems));
            var maxValuesPerFacetConfig = state.maxValuesPerFacet;
            var currentLimit = getLimit(); // If the limit is the max number of facet retrieved it is impossible to know
            // if the facets are exhaustive. The only moment we are sure it is exhaustive
            // is when it is strictly under the number requested unless we know that another
            // widget has requested more values (maxValuesPerFacet > getLimit()).
            // Because this is used for making the search of facets unable or not, it is important
            // to be conservative here.

            hasExhaustiveItems = maxValuesPerFacetConfig > currentLimit ? facetValues.length <= currentLimit : facetValues.length < currentLimit;
            lastResultsFromMainSearch = results;
            lastItemsFromMainSearch = items;

            if (renderOptions.results) {
              toggleShowMore = createToggleShowMore(renderOptions, this);
            }
          } // Do not mistake searchForFacetValues and searchFacetValues which is the actual search
          // function


          var searchFacetValues = searchForFacetValues && searchForFacetValues(renderOptions);
          var canShowLess = isShowingMore && lastItemsFromMainSearch.length > limit;
          var canShowMore = showMore && !hasExhaustiveItems;
          var canToggleShowMore = canShowLess || canShowMore;
          return {
            createURL: function createURL(facetValue) {
              return _createURL(state.resetPage().toggleFacetRefinement(attribute, facetValue));
            },
            items: items,
            refine: triggerRefine,
            searchForItems: searchFacetValues,
            isFromSearch: false,
            canRefine: items.length > 0,
            widgetParams: widgetParams,
            isShowingMore: isShowingMore,
            canToggleShowMore: canToggleShowMore,
            toggleShowMore: cachedToggleShowMore,
            sendEvent: sendEvent,
            hasExhaustiveItems: hasExhaustiveItems
          };
        },
        dispose: function dispose(_ref4) {
          var state = _ref4.state;
          unmountFn();
          var withoutMaxValuesPerFacet = state.setQueryParameter('maxValuesPerFacet', undefined);

          if (operator === 'and') {
            return withoutMaxValuesPerFacet.removeFacet(attribute);
          }

          return withoutMaxValuesPerFacet.removeDisjunctiveFacet(attribute);
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
          var searchParameters = _ref5.searchParameters;
          var values = operator === 'or' ? searchParameters.getDisjunctiveRefinements(attribute) : searchParameters.getConjunctiveRefinements(attribute);

          if (!values.length) {
            return uiState;
          }

          return _objectSpread$f(_objectSpread$f({}, uiState), {}, {
            refinementList: _objectSpread$f(_objectSpread$f({}, uiState.refinementList), {}, _defineProperty$h({}, attribute, values))
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
          var uiState = _ref6.uiState;
          var isDisjunctive = operator === 'or';
          var values = uiState.refinementList && uiState.refinementList[attribute];
          var withoutRefinements = searchParameters.clearRefinements(attribute);
          var withFacetConfiguration = isDisjunctive ? withoutRefinements.addDisjunctiveFacet(attribute) : withoutRefinements.addFacet(attribute);
          var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
          var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
          var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter('maxValuesPerFacet', nextMaxValuesPerFacet);

          if (!values) {
            var key = isDisjunctive ? 'disjunctiveFacetsRefinements' : 'facetsRefinements';
            return withMaxValuesPerFacet.setQueryParameters(_defineProperty$h({}, key, _objectSpread$f(_objectSpread$f({}, withMaxValuesPerFacet[key]), {}, _defineProperty$h({}, attribute, []))));
          }

          return values.reduce(function (parameters, value) {
            return isDisjunctive ? parameters.addDisjunctiveFacetRefinement(attribute, value) : parameters.addFacetRefinement(attribute, value);
          }, withMaxValuesPerFacet);
        }
      };
    };
  };

  function useRefinementList(props) {
    return useConnector(connectRefinementList, props);
  }

  function ownKeys$g(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$g(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$g(Object(source), true).forEach(function (key) { _defineProperty$i(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$g(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$i(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var withUsage$7 = createDocumentationMessageGenerator({
    name: 'search-box',
    connector: true
  });

  /**
   * **SearchBox** connector provides the logic to build a widget that will let the user search for a query.
   *
   * The connector provides to the rendering: `refine()` to set the query. The behaviour of this function
   * may be impacted by the `queryHook` widget parameter.
   */
  var connectSearchBox = function connectSearchBox(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$7());
    return function (widgetParams) {
      var _ref = widgetParams || {},
          queryHook = _ref.queryHook;

      function clear(helper) {
        return function () {
          helper.setQuery('').search();
        };
      }

      var _refine;

      var _clear = function _clear() {};

      function _cachedClear() {
        _clear();
      }

      return {
        $$type: 'ais.searchBox',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          renderFn(_objectSpread$g(_objectSpread$g({}, this.getWidgetRenderState(initOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread$g(_objectSpread$g({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref2) {
          var state = _ref2.state;
          unmountFn();
          return state.setQueryParameter('query', undefined);
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread$g(_objectSpread$g({}, renderState), {}, {
            searchBox: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref3) {
          var helper = _ref3.helper,
              searchMetadata = _ref3.searchMetadata;

          if (!_refine) {
            var setQueryAndSearch = function setQueryAndSearch(query) {
              if (query !== helper.state.query) {
                helper.setQuery(query).search();
              }
            };

            _refine = function _refine(query) {
              if (queryHook) {
                queryHook(query, setQueryAndSearch);
                return;
              }

              setQueryAndSearch(query);
            };
          }

          _clear = clear(helper);
          return {
            query: helper.state.query || '',
            refine: _refine,
            clear: _cachedClear,
            widgetParams: widgetParams,
            isSearchStalled: searchMetadata.isSearchStalled
          };
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
          var searchParameters = _ref4.searchParameters;
          var query = searchParameters.query || '';

          if (query === '' || uiState && uiState.query === query) {
            return uiState;
          }

          return _objectSpread$g(_objectSpread$g({}, uiState), {}, {
            query: query
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
          var uiState = _ref5.uiState;
          return searchParameters.setQueryParameter('query', uiState.query || '');
        }
      };
    };
  };

  function useSearchBox(props) {
    return useConnector(connectSearchBox, props);
  }

  function ownKeys$h(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$h(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$h(Object(source), true).forEach(function (key) { _defineProperty$j(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$h(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$j(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var withUsage$8 = createDocumentationMessageGenerator({
    name: 'sort-by',
    connector: true
  });
  /**
   * The **SortBy** connector provides the logic to build a custom widget that will display a
   * list of indices. With Algolia, this is most commonly used for changing ranking strategy. This allows
   * a user to change how the hits are being sorted.
   */

  var connectSortBy = function connectSortBy(renderFn) {
    var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    checkRendering(renderFn, withUsage$8());
    var connectorState = {};
    return function (widgetParams) {
      var _ref = widgetParams || {},
          items = _ref.items,
          _ref$transformItems = _ref.transformItems,
          transformItems = _ref$transformItems === void 0 ? function (x) {
        return x;
      } : _ref$transformItems;

      if (!Array.isArray(items)) {
        throw new Error(withUsage$8('The `items` option expects an array of objects.'));
      }

      return {
        $$type: 'ais.sortBy',
        init: function init(initOptions) {
          var instantSearchInstance = initOptions.instantSearchInstance;
          var widgetRenderState = this.getWidgetRenderState(initOptions);
          var currentIndex = widgetRenderState.currentRefinement;
          var isCurrentIndexInItems = find$1(items, function (item) {
            return item.value === currentIndex;
          });
          renderFn(_objectSpread$h(_objectSpread$h({}, widgetRenderState), {}, {
            instantSearchInstance: instantSearchInstance
          }), true);
        },
        render: function render(renderOptions) {
          var instantSearchInstance = renderOptions.instantSearchInstance;
          renderFn(_objectSpread$h(_objectSpread$h({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: instantSearchInstance
          }), false);
        },
        dispose: function dispose(_ref2) {
          var state = _ref2.state;
          unmountFn();
          return connectorState.initialIndex ? state.setIndex(connectorState.initialIndex) : state;
        },
        getRenderState: function getRenderState(renderState, renderOptions) {
          return _objectSpread$h(_objectSpread$h({}, renderState), {}, {
            sortBy: this.getWidgetRenderState(renderOptions)
          });
        },
        getWidgetRenderState: function getWidgetRenderState(_ref3) {
          var results = _ref3.results,
              helper = _ref3.helper,
              parent = _ref3.parent;

          if (!connectorState.initialIndex && parent) {
            connectorState.initialIndex = parent.getIndexName();
          }

          if (!connectorState.setIndex) {
            connectorState.setIndex = function (indexName) {
              helper.setIndex(indexName).search();
            };
          }

          return {
            currentRefinement: helper.state.index,
            options: transformItems(items),
            refine: connectorState.setIndex,
            hasNoResults: results ? results.nbHits === 0 : true,
            widgetParams: widgetParams
          };
        },
        getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
          var searchParameters = _ref4.searchParameters;
          var currentIndex = searchParameters.index;
          return _objectSpread$h(_objectSpread$h({}, uiState), {}, {
            sortBy: currentIndex !== connectorState.initialIndex ? currentIndex : undefined
          });
        },
        getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
          var uiState = _ref5.uiState;
          return searchParameters.setQueryParameter('index', uiState.sortBy || connectorState.initialIndex || searchParameters.index);
        }
      };
    };
  };

  function useSortBy(props) {
    return useConnector(connectSortBy, props);
  }

  exports.Index = Index;
  exports.InstantSearch = InstantSearch$1;
  exports.useConfigure = useConfigure;
  exports.useConnector = useConnector;
  exports.useHierarchicalMenu = useHierarchicalMenu;
  exports.useHits = useHits;
  exports.usePagination = usePagination;
  exports.useRefinementList = useRefinementList;
  exports.useSearchBox = useSearchBox;
  exports.useSortBy = useSortBy;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ReactInstantSearchHooks.js.map