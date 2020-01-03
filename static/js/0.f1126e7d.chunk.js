/*! For license information please see 0.f1126e7d.chunk.js.LICENSE */
  export default function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) { return typeof obj; };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }

    return _typeof(obj);
  }
`,s.jsx=o("7.0.0-beta.0")`
  var REACT_ELEMENT_TYPE;

  export default function _createRawReactElement(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) {
      REACT_ELEMENT_TYPE = (
        typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element")
      ) || 0xeac7;
    }

    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      // If we're going to assign props.children, we create a new object now
      // to avoid mutating defaultProps.
      props = {
        children: void 0,
      };
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = new Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }
      props.children = childArray;
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null,
    };
  }
`,s.asyncIterator=o("7.0.0-beta.0")`
  export default function _asyncIterator(iterable) {
    var method
    if (typeof Symbol !== "undefined") {
      if (Symbol.asyncIterator) {
        method = iterable[Symbol.asyncIterator]
        if (method != null) return method.call(iterable);
      }
      if (Symbol.iterator) {
        method = iterable[Symbol.iterator]
        if (method != null) return method.call(iterable);
      }
    }
    throw new TypeError("Object is not async iterable");
  }
`,s.AwaitValue=o("7.0.0-beta.0")`
  export default function _AwaitValue(value) {
    this.wrapped = value;
  }
`,s.AsyncGenerator=o("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null,
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg)
        var value = result.value;
        var wrappedAwait = value instanceof AwaitValue;

        Promise.resolve(wrappedAwait ? value.wrapped : value).then(
          function (arg) {
            if (wrappedAwait) {
              resume(key === "return" ? "return" : "next", arg);
              return
            }

            settle(result.done ? "return" : "normal", arg);
          },
          function (err) { resume("throw", err); });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({ value: value, done: true });
          break;
        case "throw":
          front.reject(value);
          break;
        default:
          front.resolve({ value: value, done: false });
          break;
      }

      front = front.next;
      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    // Hide "return" method if generator return is not supported
    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; };
  }

  AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };
  AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };
  AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };
`,s.wrapAsyncGenerator=o("7.0.0-beta.0")`
  import AsyncGenerator from "AsyncGenerator";

  export default function _wrapAsyncGenerator(fn) {
    return function () {
      return new AsyncGenerator(fn.apply(this, arguments));
    };
  }
`,s.awaitAsyncGenerator=o("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function _awaitAsyncGenerator(value) {
    return new AwaitValue(value);
  }
`,s.asyncGeneratorDelegate=o("7.0.0-beta.0")`
  export default function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {}, waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) { resolve(inner[key](value)); });
      return { done: false, value: awaitWrap(value) };
    };

    if (typeof Symbol === "function" && Symbol.iterator) {
      iter[Symbol.iterator] = function () { return this; };
    }

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }
        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        if (waiting) {
          waiting = false;
          return value;
        }
        return pump("return", value);
      };
    }

    return iter;
  }
`,s.asyncToGenerator=o("7.0.0-beta.0")`
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  export default function _asyncToGenerator(fn) {
    return function () {
      var self = this, args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }
`,s.classCallCheck=o("7.0.0-beta.0")`
  export default function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
`,s.createClass=o("7.0.0-beta.0")`
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i ++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  export default function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
`,s.defineEnumerableProperties=o("7.0.0-beta.0")`
  export default function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    // Symbols are not enumerated over by for-in loops. If native
    // Symbols are available, fetch all of the descs object's own
    // symbol properties and define them on our target object too.
    if (Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);
      for (var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }
    return obj;
  }
`,s.defaults=o("7.0.0-beta.0")`
  export default function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
`,s.defineProperty=o("7.0.0-beta.0")`
  export default function _defineProperty(obj, key, value) {
    // Shortcircuit the slow defineProperty path when possible.
    // We are trying to avoid issues where setters defined on the
    // prototype cause side effects under the fast path of simple
    // assignment. By checking for existence of the property with
    // the in operator, we can optimize most of this overhead away.
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
`,s.extends=o("7.0.0-beta.0")`
  export default function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };

    return _extends.apply(this, arguments);
  }
`,s.objectSpread=o("7.0.0-beta.0")`
  import defineProperty from "defineProperty";

  export default function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? arguments[i] : {};
      var ownKeys = Object.keys(Object(source));
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function(key) {
        defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
`,s.objectSpread2=o("7.5.0")`
  import defineProperty from "defineProperty";

  // This function is different to "Reflect.ownKeys". The enumerableOnly
  // filters on symbol properties only. Returned string properties are always
  // enumerable. It is good to use in objectSpread.

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }

  export default function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
      }
    }
    return target;
  }
`,s.inherits=o("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }
`,s.inheritsLoose=o("7.0.0-beta.0")`
  export default function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
`,s.getPrototypeOf=o("7.0.0-beta.0")`
  export default function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }
`,s.setPrototypeOf=o("7.0.0-beta.0")`
  export default function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
`,s.construct=o("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;

    // core-js@3
    if (Reflect.construct.sham) return false;

    // Proxy can't be polyfilled. Every browser implemented
    // proxies before or at the same time as Reflect.construct,
    // so if they support Proxy they also support Reflect.construct.
    if (typeof Proxy === "function") return true;

    // Since Reflect.construct can't be properly polyfilled, some
    // implementations (e.g. core-js@2) don't set the correct internal slots.
    // Those polyfills don't allow us to subclass built-ins, so we need to
    // use our fallback implementation.
    try {
      // If the internal slots aren't set, this throws an error similar to
      //   TypeError: this is not a Date object.
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  export default function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      // NOTE: If Parent !== Class, the correct __proto__ is set *after*
      //       calling the constructor.
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    // Avoid issues with Class being present but undefined when it wasn't
    // present in the original call.
    return _construct.apply(null, arguments);
  }
`,s.isNativeFunction=o("7.0.0-beta.0")`
  export default function _isNativeFunction(fn) {
    // Note: This function returns "true" for core-js functions.
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
`,s.wrapNativeSuper=o("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";
  import setPrototypeOf from "setPrototypeOf";
  import isNativeFunction from "isNativeFunction";
  import construct from "construct";

  export default function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor)
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        }
      });

      return setPrototypeOf(Wrapper, Class);
    }

    return _wrapNativeSuper(Class)
  }
`,s.instanceof=o("7.0.0-beta.0")`
  export default function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
`,s.interopRequireDefault=o("7.0.0-beta.0")`
  export default function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
`,s.interopRequireWildcard=o("7.0.0-beta.0")`
  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;

    var cache = new WeakMap();
    _getRequireWildcardCache = function () { return cache; };
    return cache;
  }

  export default function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
      return { default: obj }
    }

    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
`,s.newArrowCheck=o("7.0.0-beta.0")`
  export default function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }
`,s.objectDestructuringEmpty=o("7.0.0-beta.0")`
  export default function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }
`,s.objectWithoutPropertiesLoose=o("7.0.0-beta.0")`
  export default function _objectWithoutPropertiesLoose(source, excluded) {
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
`,s.objectWithoutProperties=o("7.0.0-beta.0")`
  import objectWithoutPropertiesLoose from "objectWithoutPropertiesLoose";

  export default function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = objectWithoutPropertiesLoose(source, excluded);
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
`,s.assertThisInitialized=o("7.0.0-beta.0")`
  export default function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
`,s.possibleConstructorReturn=o("7.0.0-beta.0")`
  import assertThisInitialized from "assertThisInitialized";

  export default function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }
    return assertThisInitialized(self);
  }
`,s.superPropBase=o("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";

  export default function _superPropBase(object, property) {
    // Yes, this throws if object is null to being with, that's on purpose.
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
`,s.get=o("7.0.0-beta.0")`
  import superPropBase from "superPropBase";

  export default function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);

        if (!base) return;

        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }
    return _get(target, property, receiver || target);
  }
`,s.set=o("7.0.0-beta.0")`
  import superPropBase from "superPropBase";
  import defineProperty from "defineProperty";

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = superPropBase(target, property);
        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            // Both getter and non-writable fall into this.
            return false;
          }
        }

        // Without a super that defines the property, spec boils down to
        // "define on receiver" for some reason.
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            // Setter, getter, and non-writable fall into this.
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          // Avoid setters that may be defined on Sub's prototype, but not on
          // the instance.
          defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  export default function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }
`,s.taggedTemplateLiteral=o("7.0.0-beta.0")`
  export default function _taggedTemplateLiteral(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    return Object.freeze(Object.defineProperties(strings, {
        raw: { value: Object.freeze(raw) }
    }));
  }
`,s.taggedTemplateLiteralLoose=o("7.0.0-beta.0")`
  export default function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    strings.raw = raw;
    return strings;
  }
`,s.readOnlyError=o("7.0.0-beta.0")`
  export default function _readOnlyError(name) {
    throw new Error("\\"" + name + "\\" is read-only");
  }
`,s.classNameTDZError=o("7.0.0-beta.0")`
  export default function _classNameTDZError(name) {
    throw new Error("Class \\"" + name + "\\" cannot be referenced in computed property keys.");
  }
`,s.temporalUndefined=o("7.0.0-beta.0")`
  // This function isn't mean to be called, but to be used as a reference.
  // We can't use a normal object because it isn't hoisted.
  export default function _temporalUndefined() {}
`,s.tdz=o("7.5.5")`
  export default function _tdzError(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }
`,s.temporalRef=o("7.0.0-beta.0")`
  import undef from "temporalUndefined";
  import err from "tdz";

  export default function _temporalRef(val, name) {
    return val === undef ? err(name) : val;
  }
`,s.slicedToArray=o("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimit from "iterableToArrayLimit";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }
`,s.slicedToArrayLoose=o("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimitLoose from "iterableToArrayLimitLoose";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArrayLoose(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimitLoose(arr, i) || nonIterableRest();
  }
`,s.toArray=o("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArray from "iterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _toArray(arr) {
    return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
  }
`,s.toConsumableArray=o("7.0.0-beta.0")`
  import arrayWithoutHoles from "arrayWithoutHoles";
  import iterableToArray from "iterableToArray";
  import nonIterableSpread from "nonIterableSpread";

  export default function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }
`,s.arrayWithoutHoles=o("7.0.0-beta.0")`
  export default function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
    }
  }
`,s.arrayWithHoles=o("7.0.0-beta.0")`
  export default function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
`,s.iterableToArray=o("7.0.0-beta.0")`
  export default function _iterableToArray(iter) {
    if (
      Symbol.iterator in Object(iter) ||
      Object.prototype.toString.call(iter) === "[object Arguments]"
    ) return Array.from(iter);
  }
`,s.iterableToArrayLimit=o("7.0.0-beta.0")`
  export default function _iterableToArrayLimit(arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliance is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step
    if (!(
      Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]"
    )) { return }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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
`,s.iterableToArrayLimitLoose=o("7.0.0-beta.0")`
  export default function _iterableToArrayLimitLoose(arr, i) {
    if (!(
      Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]"
    )) { return }
    var _arr = [];
    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);
      if (i && _arr.length === i) break;
    }
    return _arr;
  }
`,s.nonIterableSpread=o("7.0.0-beta.0")`
  export default function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
`,s.nonIterableRest=o("7.0.0-beta.0")`
  export default function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
`,s.skipFirstGeneratorNext=o("7.0.0-beta.0")`
  export default function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    }
  }
`,s.toPrimitive=o("7.1.5")`
  export default function _toPrimitive(
    input,
    hint /*: "default" | "string" | "number" | void */
  ) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
`,s.toPropertyKey=o("7.1.5")`
  import toPrimitive from "toPrimitive";

  export default function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
`,s.initializerWarningHelper=o("7.0.0-beta.0")`
    export default function _initializerWarningHelper(descriptor, context){
        throw new Error(
          'Decorating class property failed. Please ensure that ' +
          'proposal-class-properties is enabled and runs after the decorators transform.'
        );
    }
`,s.initializerDefineProperty=o("7.0.0-beta.0")`
    export default function _initializerDefineProperty(target, property, descriptor, context){
        if (!descriptor) return;

        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0,
        });
    }
`,s.applyDecoratedDescriptor=o("7.0.0-beta.0")`
    export default function _applyDecoratedDescriptor(target, property, decorators, descriptor, context){
        var desc = {};
        Object.keys(descriptor).forEach(function(key){
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer){
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function(desc, decorator){
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0){
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0){
            // This is a hack to avoid this being processed by 'transform-runtime'.
            // See issue #9.
            Object.defineProperty(target, property, desc);
            desc = null;
        }

        return desc;
    }
`,s.classPrivateFieldLooseKey=o("7.0.0-beta.0")`
  var id = 0;
  export default function _classPrivateFieldKey(name) {
    return "__private_" + (id++) + "_" + name;
  }
`,s.classPrivateFieldLooseBase=o("7.0.0-beta.0")`
  export default function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
`,s.classPrivateFieldGet=o("7.0.0-beta.0")`
  export default function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`,s.classPrivateFieldSet=o("7.0.0-beta.0")`
  export default function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }
`,s.classPrivateFieldDestructureSet=o("7.4.4")`
  export default function _classPrivateFieldDestructureSet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    var descriptor = privateMap.get(receiver);
    if (descriptor.set) {
      if (!("__destrObj" in descriptor)) {
        descriptor.__destrObj = {
          set value(v) {
            descriptor.set.call(receiver, v)
          },
        };
      }
      return descriptor.__destrObj;
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      return descriptor;
    }
  }
`,s.classStaticPrivateFieldSpecGet=o("7.0.2")`
  export default function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`,s.classStaticPrivateFieldSpecSet=o("7.0.2")`
  export default function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }

    return value;
  }
`,s.classStaticPrivateMethodGet=o("7.3.2")`
  export default function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    return method;
  }
`,s.classStaticPrivateMethodSet=o("7.3.2")`
  export default function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }
`,s.decorate=o("7.1.5")`
  import toArray from "toArray";
  import toPropertyKey from "toPropertyKey";

  // These comments are stripped by @babel/template
  /*::
  type PropertyDescriptor =
    | {
        value: any,
        writable: boolean,
        configurable: boolean,
        enumerable: boolean,
      }
    | {
        get?: () => any,
        set?: (v: any) => void,
        configurable: boolean,
        enumerable: boolean,
      };

  type FieldDescriptor ={
    writable: boolean,
    configurable: boolean,
    enumerable: boolean,
  };

  type Placement = "static" | "prototype" | "own";
  type Key = string | symbol; // PrivateName is not supported yet.

  type ElementDescriptor =
    | {
        kind: "method",
        key: Key,
        placement: Placement,
        descriptor: PropertyDescriptor
      }
    | {
        kind: "field",
        key: Key,
        placement: Placement,
        descriptor: FieldDescriptor,
        initializer?: () => any,
      };

  // This is exposed to the user code
  type ElementObjectInput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
  };

  // This is exposed to the user code
  type ElementObjectOutput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
    extras?: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  // This is exposed to the user code
  type ClassObject = {
    [@@toStringTag]?: "Descriptor",
    kind: "class",
    elements: ElementDescriptor[],
  };

  type ElementDecorator = (descriptor: ElementObjectInput) => ?ElementObjectOutput;
  type ClassDecorator = (descriptor: ClassObject) => ?ClassObject;
  type ClassFinisher = <A, B>(cl: Class<A>) => Class<B>;

  // Only used by Babel in the transform output, not part of the spec.
  type ElementDefinition =
    | {
        kind: "method",
        value: any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
      }
    | {
        kind: "field",
        value: () => any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
    };

  declare function ClassFactory<C>(initialize: (instance: C) => void): {
    F: Class<C>,
    d: ElementDefinition[]
  }

  */

  /*::
  // Various combinations with/without extras and with one or many finishers

  type ElementFinisherExtras = {
    element: ElementDescriptor,
    finisher?: ClassFinisher,
    extras?: ElementDescriptor[],
  };

  type ElementFinishersExtras = {
    element: ElementDescriptor,
    finishers: ClassFinisher[],
    extras: ElementDescriptor[],
  };

  type ElementsFinisher = {
    elements: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  type ElementsFinishers = {
    elements: ElementDescriptor[],
    finishers: ClassFinisher[],
  };

  */

  /*::

  type Placements = {
    static: Key[],
    prototype: Key[],
    own: Key[],
  };

  */

  // ClassDefinitionEvaluation (Steps 26-*)
  export default function _decorate(
    decorators /*: ClassDecorator[] */,
    factory /*: ClassFactory */,
    superClass /*: ?Class<*> */,
    mixins /*: ?Array<Function> */,
  ) /*: Class<*> */ {
    var api = _getDecoratorsApi();
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        api = mixins[i](api);
      }
    }

    var r = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(
      _coalesceClassElements(r.d.map(_createElementDescriptor)),
      decorators,
    );

    api.initializeClassElements(r.F, decorated.elements);

    return api.runClassFinishers(r.F, decorated.finishers);
  }

  function _getDecoratorsApi() {
    _getDecoratorsApi = function() {
      return api;
    };

    var api = {
      elementsDefinitionOrder: [["method"], ["field"]],

      // InitializeInstanceElements
      initializeInstanceElements: function(
        /*::<C>*/ O /*: C */,
        elements /*: ElementDescriptor[] */,
      ) {
        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            if (element.kind === kind && element.placement === "own") {
              this.defineClassElement(O, element);
            }
          }, this);
        }, this);
      },

      // InitializeClassElements
      initializeClassElements: function(
        /*::<C>*/ F /*: Class<C> */,
        elements /*: ElementDescriptor[] */,
      ) {
        var proto = F.prototype;

        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            var placement = element.placement;
            if (
              element.kind === kind &&
              (placement === "static" || placement === "prototype")
            ) {
              var receiver = placement === "static" ? F : proto;
              this.defineClassElement(receiver, element);
            }
          }, this);
        }, this);
      },

      // DefineClassElement
      defineClassElement: function(
        /*::<C>*/ receiver /*: C | Class<C> */,
        element /*: ElementDescriptor */,
      ) {
        var descriptor /*: PropertyDescriptor */ = element.descriptor;
        if (element.kind === "field") {
          var initializer = element.initializer;
          descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver),
          };
        }
        Object.defineProperty(receiver, element.key, descriptor);
      },

      // DecorateClass
      decorateClass: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var newElements /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];
        var placements /*: Placements */ = {
          static: [],
          prototype: [],
          own: [],
        };

        elements.forEach(function(element /*: ElementDescriptor */) {
          this.addElementPlacement(element, placements);
        }, this);

        elements.forEach(function(element /*: ElementDescriptor */) {
          if (!_hasDecorators(element)) return newElements.push(element);

          var elementFinishersExtras /*: ElementFinishersExtras */ = this.decorateElement(
            element,
            placements,
          );
          newElements.push(elementFinishersExtras.element);
          newElements.push.apply(newElements, elementFinishersExtras.extras);
          finishers.push.apply(finishers, elementFinishersExtras.finishers);
        }, this);

        if (!decorators) {
          return { elements: newElements, finishers: finishers };
        }

        var result /*: ElementsFinishers */ = this.decorateConstructor(
          newElements,
          decorators,
        );
        finishers.push.apply(finishers, result.finishers);
        result.finishers = finishers;

        return result;
      },

      // AddElementPlacement
      addElementPlacement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
        silent /*: boolean */,
      ) {
        var keys = placements[element.placement];
        if (!silent && keys.indexOf(element.key) !== -1) {
          throw new TypeError("Duplicated element (" + element.key + ")");
        }
        keys.push(element.key);
      },

      // DecorateElement
      decorateElement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
      ) /*: ElementFinishersExtras */ {
        var extras /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];

        for (
          var decorators = element.decorators, i = decorators.length - 1;
          i >= 0;
          i--
        ) {
          // (inlined) RemoveElementPlacement
          var keys = placements[element.placement];
          keys.splice(keys.indexOf(element.key), 1);

          var elementObject /*: ElementObjectInput */ = this.fromElementDescriptor(
            element,
          );
          var elementFinisherExtras /*: ElementFinisherExtras */ = this.toElementFinisherExtras(
            (0, decorators[i])(elementObject) /*: ElementObjectOutput */ ||
              elementObject,
          );

          element = elementFinisherExtras.element;
          this.addElementPlacement(element, placements);

          if (elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
          }

          var newExtras /*: ElementDescriptor[] | void */ =
            elementFinisherExtras.extras;
          if (newExtras) {
            for (var j = 0; j < newExtras.length; j++) {
              this.addElementPlacement(newExtras[j], placements);
            }
            extras.push.apply(extras, newExtras);
          }
        }

        return { element: element, finishers: finishers, extras: extras };
      },

      // DecorateConstructor
      decorateConstructor: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var finishers /*: ClassFinisher[] */ = [];

        for (var i = decorators.length - 1; i >= 0; i--) {
          var obj /*: ClassObject */ = this.fromClassDescriptor(elements);
          var elementsAndFinisher /*: ElementsFinisher */ = this.toClassDescriptor(
            (0, decorators[i])(obj) /*: ClassObject */ || obj,
          );

          if (elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
          }

          if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;

            for (var j = 0; j < elements.length - 1; j++) {
              for (var k = j + 1; k < elements.length; k++) {
                if (
                  elements[j].key === elements[k].key &&
                  elements[j].placement === elements[k].placement
                ) {
                  throw new TypeError(
                    "Duplicated element (" + elements[j].key + ")",
                  );
                }
              }
            }
          }
        }

        return { elements: elements, finishers: finishers };
      },

      // FromElementDescriptor
      fromElementDescriptor: function(
        element /*: ElementDescriptor */,
      ) /*: ElementObject */ {
        var obj /*: ElementObject */ = {
          kind: element.kind,
          key: element.key,
          placement: element.placement,
          descriptor: element.descriptor,
        };

        var desc = {
          value: "Descriptor",
          configurable: true,
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        if (element.kind === "field") obj.initializer = element.initializer;

        return obj;
      },

      // ToElementDescriptors
      toElementDescriptors: function(
        elementObjects /*: ElementObject[] */,
      ) /*: ElementDescriptor[] */ {
        if (elementObjects === undefined) return;
        return toArray(elementObjects).map(function(elementObject) {
          var element = this.toElementDescriptor(elementObject);
          this.disallowProperty(elementObject, "finisher", "An element descriptor");
          this.disallowProperty(elementObject, "extras", "An element descriptor");
          return element;
        }, this);
      },

      // ToElementDescriptor
      toElementDescriptor: function(
        elementObject /*: ElementObject */,
      ) /*: ElementDescriptor */ {
        var kind = String(elementObject.kind);
        if (kind !== "method" && kind !== "field") {
          throw new TypeError(
            'An element descriptor\\'s .kind property must be either "method" or' +
              ' "field", but a decorator created an element descriptor with' +
              ' .kind "' +
              kind +
              '"',
          );
        }

        var key = toPropertyKey(elementObject.key);

        var placement = String(elementObject.placement);
        if (
          placement !== "static" &&
          placement !== "prototype" &&
          placement !== "own"
        ) {
          throw new TypeError(
            'An element descriptor\\'s .placement property must be one of "static",' +
              ' "prototype" or "own", but a decorator created an element descriptor' +
              ' with .placement "' +
              placement +
              '"',
          );
        }

        var descriptor /*: PropertyDescriptor */ = elementObject.descriptor;

        this.disallowProperty(elementObject, "elements", "An element descriptor");

        var element /*: ElementDescriptor */ = {
          kind: kind,
          key: key,
          placement: placement,
          descriptor: Object.assign({}, descriptor),
        };

        if (kind !== "field") {
          this.disallowProperty(elementObject, "initializer", "A method descriptor");
        } else {
          this.disallowProperty(
            descriptor,
            "get",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "set",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "value",
            "The property descriptor of a field descriptor",
          );

          element.initializer = elementObject.initializer;
        }

        return element;
      },

      toElementFinisherExtras: function(
        elementObject /*: ElementObject */,
      ) /*: ElementFinisherExtras */ {
        var element /*: ElementDescriptor */ = this.toElementDescriptor(
          elementObject,
        );
        var finisher /*: ClassFinisher */ = _optionalCallableProperty(
          elementObject,
          "finisher",
        );
        var extras /*: ElementDescriptors[] */ = this.toElementDescriptors(
          elementObject.extras,
        );

        return { element: element, finisher: finisher, extras: extras };
      },

      // FromClassDescriptor
      fromClassDescriptor: function(
        elements /*: ElementDescriptor[] */,
      ) /*: ClassObject */ {
        var obj = {
          kind: "class",
          elements: elements.map(this.fromElementDescriptor, this),
        };

        var desc = { value: "Descriptor", configurable: true };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        return obj;
      },

      // ToClassDescriptor
      toClassDescriptor: function(
        obj /*: ClassObject */,
      ) /*: ElementsFinisher */ {
        var kind = String(obj.kind);
        if (kind !== "class") {
          throw new TypeError(
            'A class descriptor\\'s .kind property must be "class", but a decorator' +
              ' created a class descriptor with .kind "' +
              kind +
              '"',
          );
        }

        this.disallowProperty(obj, "key", "A class descriptor");
        this.disallowProperty(obj, "placement", "A class descriptor");
        this.disallowProperty(obj, "descriptor", "A class descriptor");
        this.disallowProperty(obj, "initializer", "A class descriptor");
        this.disallowProperty(obj, "extras", "A class descriptor");

        var finisher = _optionalCallableProperty(obj, "finisher");
        var elements = this.toElementDescriptors(obj.elements);

        return { elements: elements, finisher: finisher };
      },

      // RunClassFinishers
      runClassFinishers: function(
        constructor /*: Class<*> */,
        finishers /*: ClassFinisher[] */,
      ) /*: Class<*> */ {
        for (var i = 0; i < finishers.length; i++) {
          var newConstructor /*: ?Class<*> */ = (0, finishers[i])(constructor);
          if (newConstructor !== undefined) {
            // NOTE: This should check if IsConstructor(newConstructor) is false.
            if (typeof newConstructor !== "function") {
              throw new TypeError("Finishers must return a constructor.");
            }
            constructor = newConstructor;
          }
        }
        return constructor;
      },

      disallowProperty: function(obj, name, objectType) {
        if (obj[name] !== undefined) {
          throw new TypeError(objectType + " can't have a ." + name + " property.");
        }
      }
    };

    return api;
  }

  // ClassElementEvaluation
  function _createElementDescriptor(
    def /*: ElementDefinition */,
  ) /*: ElementDescriptor */ {
    var key = toPropertyKey(def.key);

    var descriptor /*: PropertyDescriptor */;
    if (def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false,
      };
    } else if (def.kind === "get") {
      descriptor = { get: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "set") {
      descriptor = { set: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "field") {
      descriptor = { configurable: true, writable: true, enumerable: true };
    }

    var element /*: ElementDescriptor */ = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def.static
        ? "static"
        : def.kind === "field"
        ? "own"
        : "prototype",
      descriptor: descriptor,
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;

    return element;
  }

  // CoalesceGetterSetter
  function _coalesceGetterSetter(
    element /*: ElementDescriptor */,
    other /*: ElementDescriptor */,
  ) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  // CoalesceClassElements
  function _coalesceClassElements(
    elements /*: ElementDescriptor[] */,
  ) /*: ElementDescriptor[] */ {
    var newElements /*: ElementDescriptor[] */ = [];

    var isSameElement = function(
      other /*: ElementDescriptor */,
    ) /*: boolean */ {
      return (
        other.kind === "method" &&
        other.key === element.key &&
        other.placement === element.placement
      );
    };

    for (var i = 0; i < elements.length; i++) {
      var element /*: ElementDescriptor */ = elements[i];
      var other /*: ElementDescriptor */;

      if (
        element.kind === "method" &&
        (other = newElements.find(isSameElement))
      ) {
        if (
          _isDataDescriptor(element.descriptor) ||
          _isDataDescriptor(other.descriptor)
        ) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError(
              "Duplicated methods (" + element.key + ") can't be decorated.",
            );
          }
          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError(
                "Decorators can't be placed on different accessors with for " +
                  "the same property (" +
                  element.key +
                  ").",
              );
            }
            other.decorators = element.decorators;
          }
          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element /*: ElementDescriptor */) /*: boolean */ {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc /*: PropertyDescriptor */) /*: boolean */ {
    return (
      desc !== undefined &&
      !(desc.value === undefined && desc.writable === undefined)
    );
  }

  function _optionalCallableProperty /*::<T>*/(
    obj /*: T */,
    name /*: $Keys<T> */,
  ) /*: ?Function */ {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }
    return value;
  }

`,s.classPrivateMethodGet=o("7.1.6")`
  export default function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
`,s.classPrivateMethodSet=o("7.1.6")`
  export default function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
  }
`,s.wrapRegExp=o("7.2.6")`
  import wrapNativeSuper from "wrapNativeSuper";
  import getPrototypeOf from "getPrototypeOf";
  import possibleConstructorReturn from "possibleConstructorReturn";
  import inherits from "inherits";

  export default function _wrapRegExp(re, groups) {
    _wrapRegExp = function(re, groups) {
      return new BabelRegExp(re, undefined, groups);
    };

    var _RegExp = wrapNativeSuper(RegExp);
    var _super = RegExp.prototype;
    var _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = _RegExp.call(this, re, flags);
      // if the regex is recreated with 'g' flag
      _groups.set(_this, groups || _groups.get(re));
      return _this;
    }
    inherits(BabelRegExp, _RegExp);

    BabelRegExp.prototype.exec = function(str) {
      var result = _super.exec.call(this, str);
      if (result) result.groups = buildGroups(result, this);
      return result;
    };
    BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
      if (typeof substitution === "string") {
        var groups = _groups.get(this);
        return _super[Symbol.replace].call(
          this,
          str,
          substitution.replace(/\\$<([^>]+)>/g, function(_, name) {
            return "$" + groups[name];
          })
        );
      } else if (typeof substitution === "function") {
        var _this = this;
        return _super[Symbol.replace].call(
          this,
          str,
          function() {
            var args = [];
            args.push.apply(args, arguments);
            if (typeof args[args.length - 1] !== "object") {
              // Modern engines already pass result.groups as the last arg.
              args.push(buildGroups(args, _this));
            }
            return substitution.apply(this, args);
          }
        );
      } else {
        return _super[Symbol.replace].call(this, str, substitution);
      }
    }

    function buildGroups(result, re) {
      // NOTE: This function should return undefined if there are no groups,
      // but in that case Babel doesn't add the wrapper anyway.

      var g = _groups.get(re);
      return Object.keys(g).reduce(function(groups, name) {
        groups[name] = result[g[name]];
        return groups;
      }, Object.create(null));
    }

    return _wrapRegExp.apply(this, arguments);
  }
`},function(e,t,r){"use strict";function n(){const e=l(r(320));return n=function(){return e},e}function i(){const e=o(r(336));return i=function(){return e},e}function s(){const e=o(r(203));return s=function(){return e},e}function a(){const e=l(r(106));return a=function(){return e},e}function o(e){return e&&e.__esModule?e:{default:e}}function u(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function l(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}return r.default=e,t&&t.set(e,r),r}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t="global"){let r;const n={global:c,module:p,umd:h,var:f}[t];if(!n)throw new Error(`Unsupported output type ${t}`);r=n(e);return(0,i().default)(r).code};function c(e){const t=a().identifier("babelHelpers"),r=[],n=a().functionExpression(null,[a().identifier("global")],a().blockStatement(r)),i=a().program([a().expressionStatement(a().callExpression(n,[a().conditionalExpression(a().binaryExpression("===",a().unaryExpression("typeof",a().identifier("global")),a().stringLiteral("undefined")),a().identifier("self"),a().identifier("global"))]))]);return r.push(a().variableDeclaration("var",[a().variableDeclarator(t,a().assignmentExpression("=",a().memberExpression(a().identifier("global"),t),a().objectExpression([])))])),d(r,t,e),i}function p(e){const t=[],r=d(t,null,e);return t.unshift(a().exportNamedDeclaration(null,Object.keys(r).map(e=>a().exportSpecifier(a().cloneNode(r[e]),a().identifier(e))))),a().program(t,[],"module")}function h(e){const t=a().identifier("babelHelpers"),r=[];return r.push(a().variableDeclaration("var",[a().variableDeclarator(t,a().identifier("global"))])),d(r,t,e),a().program([(n={FACTORY_PARAMETERS:a().identifier("global"),BROWSER_ARGUMENTS:a().assignmentExpression("=",a().memberExpression(a().identifier("root"),t),a().objectExpression([])),COMMON_ARGUMENTS:a().identifier("exports"),AMD_ARGUMENTS:a().arrayExpression([a().stringLiteral("exports")]),FACTORY_BODY:r,UMD_ROOT:a().identifier("this")},s().default`
    (function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(AMD_ARGUMENTS, factory);
      } else if (typeof exports === "object") {
        factory(COMMON_ARGUMENTS);
      } else {
        factory(BROWSER_ARGUMENTS);
      }
    })(UMD_ROOT, function (FACTORY_PARAMETERS) {
      FACTORY_BODY
    });
  `(n))]);var n}function f(e){const t=a().identifier("babelHelpers"),r=[];r.push(a().variableDeclaration("var",[a().variableDeclarator(t,a().objectExpression([]))]));const n=a().program(r);return d(r,t,e),r.push(a().expressionStatement(t)),n}function d(e,t,r){const i=e=>t?a().memberExpression(t,a().identifier(e)):a().identifier(`_${e}`),s={};return n().list.forEach((function(t){if(r&&r.indexOf(t)<0)return;const a=s[t]=i(t),o=n().get(t,i,a).nodes;e.push(...o)})),s}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,i=(n=r(246))&&n.__esModule?n:{default:n};t.default=class{constructor(e,t){this._cachedMap=null,this._code=t,this._opts=e,this._rawMappings=[]}get(){if(!this._cachedMap){const e=this._cachedMap=new i.default.SourceMapGenerator({sourceRoot:this._opts.sourceRoot}),t=this._code;"string"===typeof t?e.setSourceContent(this._opts.sourceFileName.replace(/\\/g,"/"),t):"object"===typeof t&&Object.keys(t).forEach(r=>{e.setSourceContent(r.replace(/\\/g,"/"),t[r])}),this._rawMappings.forEach(t=>e.addMapping(t),e)}return this._cachedMap.toJSON()}getRawMappings(){return this._rawMappings.slice()}mark(e,t,r,n,i,s,a){this._lastGenLine!==e&&null===r||(a||this._lastGenLine!==e||this._lastSourceLine!==r||this._lastSourceColumn!==n)&&(this._cachedMap=null,this._lastGenLine=e,this._lastSourceLine=r,this._lastSourceColumn=n,this._rawMappings.push({name:i||void 0,generated:{line:e,column:t},source:null==r?void 0:(s||this._opts.sourceFileName).replace(/\\/g,"/"),original:null==r?void 0:{line:r,column:n}}))}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=p(r(329)),i=p(r(243)),s=p(r(586)),a=c(r(337)),o=c(r(106)),u=c(r(589));function l(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function c(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}return r.default=e,t&&t.set(e,r),r}function p(e){return e&&e.__esModule?e:{default:e}}const h=/e/i,f=/\.0+$/,d=/^0[box]/;class m{constructor(e,t){this.inForStatementInitCounter=0,this._printStack=[],this._indent=0,this._insideAux=!1,this._printedCommentStarts={},this._parenPushNewlineState=null,this._noLineTerminator=!1,this._printAuxAfterOnNextUserNode=!1,this._printedComments=new WeakSet,this._endsWithInteger=!1,this._endsWithWord=!1,this.format=e||{},this._buf=new s.default(t)}generate(e){return this.print(e),this._maybeAddAuxComment(),this._buf.get()}indent(){this.format.compact||this.format.concise||this._indent++}dedent(){this.format.compact||this.format.concise||this._indent--}semicolon(e=!1){this._maybeAddAuxComment(),this._append(";",!e)}rightBrace(){this.format.minified&&this._buf.removeLastSemicolon(),this.token("}")}space(e=!1){this.format.compact||(this._buf.hasContent()&&!this.endsWith(" ")&&!this.endsWith("\n")||e)&&this._space()}word(e){(this._endsWithWord||this.endsWith("/")&&0===e.indexOf("/"))&&this._space(),this._maybeAddAuxComment(),this._append(e),this._endsWithWord=!0}number(e){this.word(e),this._endsWithInteger=(0,n.default)(+e)&&!d.test(e)&&!h.test(e)&&!f.test(e)&&"."!==e[e.length-1]}token(e){("--"===e&&this.endsWith("!")||"+"===e[0]&&this.endsWith("+")||"-"===e[0]&&this.endsWith("-")||"."===e[0]&&this._endsWithInteger)&&this._space(),this._maybeAddAuxComment(),this._append(e)}newline(e){if(!this.format.retainLines&&!this.format.compact)if(this.format.concise)this.space();else if(!this.endsWith("\n\n")&&("number"!==typeof e&&(e=1),e=Math.min(2,e),(this.endsWith("{\n")||this.endsWith(":\n"))&&e--,!(e<=0)))for(let t=0;t<e;t++)this._newline()}endsWith(e){return this._buf.endsWith(e)}removeTrailingNewline(){this._buf.removeTrailingNewline()}exactSource(e,t){this._catchUp("start",e),this._buf.exactSource(e,t)}source(e,t){this._catchUp(e,t),this._buf.source(e,t)}withSource(e,t,r){this._catchUp(e,t),this._buf.withSource(e,t,r)}_space(){this._append(" ",!0)}_newline(){this._append("\n",!0)}_append(e,t=!1){this._maybeAddParen(e),this._maybeIndent(e),t?this._buf.queue(e):this._buf.append(e),this._endsWithWord=!1,this._endsWithInteger=!1}_maybeIndent(e){this._indent&&this.endsWith("\n")&&"\n"!==e[0]&&this._buf.queue(this._getIndent())}_maybeAddParen(e){const t=this._parenPushNewlineState;if(!t)return;let r;for(this._parenPushNewlineState=null,r=0;r<e.length&&" "===e[r];r++)continue;if(r===e.length)return;const n=e[r];if("\n"!==n){if("/"!==n)return;if(r+1===e.length)return;const t=e[r+1];if("/"!==t&&"*"!==t)return}this.token("("),this.indent(),t.printed=!0}_catchUp(e,t){if(!this.format.retainLines)return;const r=t?t[e]:null;if(r&&null!==r.line){const e=r.line-this._buf.getCurrentLine();for(let t=0;t<e;t++)this._newline()}}_getIndent(){return(0,i.default)(this.format.indent.style,this._indent)}startTerminatorless(e=!1){return e?(this._noLineTerminator=!0,null):this._parenPushNewlineState={printed:!1}}endTerminatorless(e){this._noLineTerminator=!1,e&&e.printed&&(this.dedent(),this.newline(),this.token(")"))}print(e,t){if(!e)return;const r=this.format.concise;e._compact&&(this.format.concise=!0);const n=this[e.type];if(!n)throw new ReferenceError(`unknown node of type ${JSON.stringify(e.type)} with constructor ${JSON.stringify(e&&e.constructor.name)}`);this._printStack.push(e);const i=this._insideAux;this._insideAux=!e.loc,this._maybeAddAuxComment(this._insideAux&&!i);let s=a.needsParens(e,t,this._printStack);this.format.retainFunctionParens&&"FunctionExpression"===e.type&&e.extra&&e.extra.parenthesized&&(s=!0),s&&this.token("("),this._printLeadingComments(e);const u=o.isProgram(e)||o.isFile(e)?null:e.loc;this.withSource("start",u,()=>{n.call(this,e,t)}),this._printTrailingComments(e),s&&this.token(")"),this._printStack.pop(),this.format.concise=r,this._insideAux=i}_maybeAddAuxComment(e){e&&this._printAuxBeforeComment(),this._insideAux||this._printAuxAfterComment()}_printAuxBeforeComment(){if(this._printAuxAfterOnNextUserNode)return;this._printAuxAfterOnNextUserNode=!0;const e=this.format.auxiliaryCommentBefore;e&&this._printComment({type:"CommentBlock",value:e})}_printAuxAfterComment(){if(!this._printAuxAfterOnNextUserNode)return;this._printAuxAfterOnNextUserNode=!1;const e=this.format.auxiliaryCommentAfter;e&&this._printComment({type:"CommentBlock",value:e})}getPossibleRaw(e){const t=e.extra;if(t&&null!=t.raw&&null!=t.rawValue&&e.value===t.rawValue)return t.raw}printJoin(e,t,r={}){if(!e||!e.length)return;r.indent&&this.indent();const n={addNewlines:r.addNewlines};for(let i=0;i<e.length;i++){const s=e[i];s&&(r.statement&&this._printNewline(!0,s,t,n),this.print(s,t),r.iterator&&r.iterator(s,i),r.separator&&i<e.length-1&&r.separator.call(this),r.statement&&this._printNewline(!1,s,t,n))}r.indent&&this.dedent()}printAndIndentOnComments(e,t){const r=e.leadingComments&&e.leadingComments.length>0;r&&this.indent(),this.print(e,t),r&&this.dedent()}printBlock(e){const t=e.body;o.isEmptyStatement(t)||this.space(),this.print(t,e)}_printTrailingComments(e){this._printComments(this._getComments(!1,e))}_printLeadingComments(e){this._printComments(this._getComments(!0,e))}printInnerComments(e,t=!0){e.innerComments&&e.innerComments.length&&(t&&this.indent(),this._printComments(e.innerComments),t&&this.dedent())}printSequence(e,t,r={}){return r.statement=!0,this.printJoin(e,t,r)}printList(e,t,r={}){return null==r.separator&&(r.separator=y),this.printJoin(e,t,r)}_printNewline(e,t,r,n){if(this.format.retainLines||this.format.compact)return;if(this.format.concise)return void this.space();let i=0;if(this._buf.hasContent()){e||i++,n.addNewlines&&(i+=n.addNewlines(e,t)||0),(e?a.needsWhitespaceBefore:a.needsWhitespaceAfter)(t,r)&&i++}this.newline(i)}_getComments(e,t){return t&&(e?t.leadingComments:t.trailingComments)||[]}_printComment(e){if(!this.format.shouldPrintComment(e.value))return;if(e.ignore)return;if(this._printedComments.has(e))return;if(this._printedComments.add(e),null!=e.start){if(this._printedCommentStarts[e.start])return;this._printedCommentStarts[e.start]=!0}const t="CommentBlock"===e.type;this.newline(this._buf.hasContent()&&!this._noLineTerminator&&t?1:0),this.endsWith("[")||this.endsWith("{")||this.space();let r=t||this._noLineTerminator?`/*${e.value}*/`:`//${e.value}\n`;if(t&&this.format.indent.adjustMultilineComment){const t=e.loc&&e.loc.start.column;if(t){const e=new RegExp("\\n\\s{1,"+t+"}","g");r=r.replace(e,"\n")}const n=Math.max(this._getIndent().length,this._buf.getCurrentColumn());r=r.replace(/\n(?!$)/g,`\n${(0,i.default)(" ",n)}`)}this.endsWith("/")&&this._space(),this.withSource("start",e.loc,()=>{this._append(r)}),this.newline(t&&!this._noLineTerminator?1:0)}_printComments(e){if(e&&e.length)for(const t of e)this._printComment(t)}}function y(){this.token(","),this.space()}t.default=m,Object.assign(m.prototype,u)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;const n=/^[ \t]+$/;t.default=class{constructor(e){this._map=null,this._buf=[],this._last="",this._queue=[],this._position={line:1,column:0},this._sourcePosition={identifierName:null,line:null,column:null,filename:null},this._disallowedPop=null,this._map=e}get(){this._flush();const e=this._map,t={code:this._buf.join("").trimRight(),map:null,rawMappings:e&&e.getRawMappings()};return e&&Object.defineProperty(t,"map",{configurable:!0,enumerable:!0,get(){return this.map=e.get()},set(e){Object.defineProperty(this,"map",{value:e,writable:!0})}}),t}append(e){this._flush();const t=this._sourcePosition,r=t.line,n=t.column,i=t.filename,s=t.identifierName,a=t.force;this._append(e,r,n,s,i,a)}queue(e){if("\n"===e)for(;this._queue.length>0&&n.test(this._queue[0][0]);)this._queue.shift();const t=this._sourcePosition,r=t.line,i=t.column,s=t.filename,a=t.identifierName,o=t.force;this._queue.unshift([e,r,i,a,s,o])}_flush(){let e;for(;e=this._queue.pop();)this._append(...e)}_append(e,t,r,n,i,s){this._map&&"\n"!==e[0]&&this._map.mark(this._position.line,this._position.column,t,r,n,i,s),this._buf.push(e),this._last=e[e.length-1];for(let a=0;a<e.length;a++)"\n"===e[a]?(this._position.line++,this._position.column=0):this._position.column++}removeTrailingNewline(){this._queue.length>0&&"\n"===this._queue[0][0]&&this._queue.shift()}removeLastSemicolon(){this._queue.length>0&&";"===this._queue[0][0]&&this._queue.shift()}endsWith(e){if(1===e.length){let t;if(this._queue.length>0){const e=this._queue[0][0];t=e[e.length-1]}else t=this._last;return t===e}const t=this._last+this._queue.reduce((e,t)=>t[0]+e,"");return e.length<=t.length&&t.slice(-e.length)===e}hasContent(){return this._queue.length>0||!!this._last}exactSource(e,t){this.source("start",e,!0),t(),this.source("end",e),this._disallowPop("start",e)}source(e,t,r){e&&!t||this._normalizePosition(e,t,this._sourcePosition,r)}withSource(e,t,r){if(!this._map)return r();const n=this._sourcePosition.line,i=this._sourcePosition.column,s=this._sourcePosition.filename,a=this._sourcePosition.identifierName;this.source(e,t),r(),this._sourcePosition.force&&this._sourcePosition.line===n&&this._sourcePosition.column===i&&this._sourcePosition.filename===s||this._disallowedPop&&this._disallowedPop.line===n&&this._disallowedPop.column===i&&this._disallowedPop.filename===s||(this._sourcePosition.line=n,this._sourcePosition.column=i,this._sourcePosition.filename=s,this._sourcePosition.identifierName=a,this._sourcePosition.force=!1,this._disallowedPop=null)}_disallowPop(e,t){e&&!t||(this._disallowedPop=this._normalizePosition(e,t))}_normalizePosition(e,t,r,n){const i=t?t[e]:null;void 0===r&&(r={identifierName:null,line:null,column:null,filename:null,force:!1});const s=r.line,a=r.column,o=r.filename;return r.identifierName="start"===e&&t&&t.identifierName||null,r.line=i?i.line:null,r.column=i?i.column:null,r.filename=t&&t.filename||null,(n||r.line!==s||r.column!==a||r.filename!==o)&&(r.force=n),r}getCurrentColumn(){const e=this._queue.reduce((e,t)=>t[0]+e,""),t=e.lastIndexOf("\n");return-1===t?this._position.column+e.length:e.length-1-t}getCurrentLine(){const e=this._queue.reduce((e,t)=>t[0]+e,"");let t=0;for(let r=0;r<e.length;r++)"\n"===e[r]&&t++;return this._position.line+t}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.list=t.nodes=void 0;var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var a=n?Object.getOwnPropertyDescriptor(e,s):null;a&&(a.get||a.set)?Object.defineProperty(r,s,a):r[s]=e[s]}r.default=e,t&&t.set(e,r);return r}(r(106));function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function s(e,t={}){return n.isMemberExpression(e)?(s(e.object,t),e.computed&&s(e.property,t)):n.isBinary(e)||n.isAssignmentExpression(e)?(s(e.left,t),s(e.right,t)):n.isCallExpression(e)?(t.hasCall=!0,s(e.callee,t)):n.isFunction(e)?t.hasFunction=!0:n.isIdentifier(e)&&(t.hasHelper=t.hasHelper||a(e.callee)),t}function a(e){return n.isMemberExpression(e)?a(e.object)||a(e.property):n.isIdentifier(e)?"require"===e.name||"_"===e.name[0]:n.isCallExpression(e)?a(e.callee):!(!n.isBinary(e)&&!n.isAssignmentExpression(e))&&(n.isIdentifier(e.left)&&a(e.left)||a(e.right))}function o(e){return n.isLiteral(e)||n.isObjectExpression(e)||n.isArrayExpression(e)||n.isIdentifier(e)||n.isMemberExpression(e)}const u={AssignmentExpression(e){const t=s(e.right);if(t.hasCall&&t.hasHelper||t.hasFunction)return{before:t.hasFunction,after:!0}},SwitchCase:(e,t)=>({before:e.consequent.length||t.cases[0]===e,after:!e.consequent.length&&t.cases[t.cases.length-1]===e}),LogicalExpression(e){if(n.isFunction(e.left)||n.isFunction(e.right))return{after:!0}},Literal(e){if("use strict"===e.value)return{after:!0}},CallExpression(e){if(n.isFunction(e.callee)||a(e))return{before:!0,after:!0}},VariableDeclaration(e){for(let t=0;t<e.declarations.length;t++){const r=e.declarations[t];let n=a(r.id)&&!o(r.init);if(!n){const e=s(r.init);n=a(r.init)&&e.hasCall||e.hasFunction}if(n)return{before:!0,after:!0}}},IfStatement(e){if(n.isBlockStatement(e.consequent))return{before:!0,after:!0}}};t.nodes=u,u.ObjectProperty=u.ObjectTypeProperty=u.ObjectMethod=function(e,t){if(t.properties[0]===e)return{before:!0}},u.ObjectTypeCallProperty=function(e,t){if(t.callProperties[0]===e&&(!t.properties||!t.properties.length))return{before:!0}},u.ObjectTypeIndexer=function(e,t){if(t.indexers[0]===e&&(!t.properties||!t.properties.length)&&(!t.callProperties||!t.callProperties.length))return{before:!0}},u.ObjectTypeInternalSlot=function(e,t){if(t.internalSlots[0]===e&&(!t.properties||!t.properties.length)&&(!t.callProperties||!t.callProperties.length)&&(!t.indexers||!t.indexers.length))return{before:!0}};const l={VariableDeclaration:e=>e.declarations.map(e=>e.init),ArrayExpression:e=>e.elements,ObjectExpression:e=>e.properties};t.list=l,[["Function",!0],["Class",!0],["Loop",!0],["LabeledStatement",!0],["SwitchStatement",!0],["TryStatement",!0]].forEach((function([e,t]){"boolean"===typeof t&&(t={after:t,before:t}),[e].concat(n.FLIPPED_ALIAS_KEYS[e]||[]).forEach((function(e){u[e]=function(){return t}}))}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NullableTypeAnnotation=function(e,t){return n.isArrayTypeAnnotation(t)},t.FunctionTypeAnnotation=function(e,t,r){return n.isUnionTypeAnnotation(t)||n.isIntersectionTypeAnnotation(t)||n.isArrayTypeAnnotation(t)||n.isTypeAnnotation(t)&&n.isArrowFunctionExpression(r[r.length-3])},t.UpdateExpression=function(e,t){return n.isMemberExpression(t,{object:e})||n.isCallExpression(t,{callee:e})||n.isNewExpression(t,{callee:e})||a(e,t)},t.ObjectExpression=function(e,t,r){return l(r,{considerArrow:!0})},t.DoExpression=function(e,t,r){return l(r)},t.Binary=function(e,t){if("**"===e.operator&&n.isBinaryExpression(t,{operator:"**"}))return t.left===e;if(a(e,t))return!0;if((n.isCallExpression(t)||n.isNewExpression(t))&&t.callee===e||n.isUnaryLike(t)||n.isMemberExpression(t)&&t.object===e||n.isAwaitExpression(t))return!0;if(n.isBinary(t)){const r=t.operator,i=s[r],a=e.operator,o=s[a];if(i===o&&t.right===e&&!n.isLogicalExpression(t)||i>o)return!0}return!1},t.IntersectionTypeAnnotation=t.UnionTypeAnnotation=function(e,t){return n.isArrayTypeAnnotation(t)||n.isNullableTypeAnnotation(t)||n.isIntersectionTypeAnnotation(t)||n.isUnionTypeAnnotation(t)},t.TSAsExpression=function(){return!0},t.TSTypeAssertion=function(){return!0},t.TSIntersectionType=t.TSUnionType=function(e,t){return n.isTSArrayType(t)||n.isTSOptionalType(t)||n.isTSIntersectionType(t)||n.isTSUnionType(t)||n.isTSRestType(t)},t.BinaryExpression=function(e,t){return"in"===e.operator&&(n.isVariableDeclarator(t)||n.isFor(t))},t.SequenceExpression=function(e,t){if(n.isForStatement(t)||n.isThrowStatement(t)||n.isReturnStatement(t)||n.isIfStatement(t)&&t.test===e||n.isWhileStatement(t)&&t.test===e||n.isForInStatement(t)&&t.right===e||n.isSwitchStatement(t)&&t.discriminant===e||n.isExpressionStatement(t)&&t.expression===e)return!1;return!0},t.AwaitExpression=t.YieldExpression=function(e,t){return n.isBinary(t)||n.isUnaryLike(t)||n.isCallExpression(t)||n.isMemberExpression(t)||n.isNewExpression(t)||n.isAwaitExpression(t)&&n.isYieldExpression(e)||n.isConditionalExpression(t)&&e===t.test||a(e,t)},t.ClassExpression=function(e,t,r){return l(r,{considerDefaultExports:!0})},t.UnaryLike=o,t.FunctionExpression=function(e,t,r){return l(r,{considerDefaultExports:!0})},t.ArrowFunctionExpression=function(e,t){return n.isExportDeclaration(t)||u(e,t)},t.ConditionalExpression=u,t.OptionalMemberExpression=function(e,t){return n.isCallExpression(t)||n.isMemberExpression(t)},t.AssignmentExpression=function(e){return!!n.isObjectPattern(e.left)||u(...arguments)},t.NewExpression=function(e,t){return a(e,t)};var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var a=n?Object.getOwnPropertyDescriptor(e,s):null;a&&(a.get||a.set)?Object.defineProperty(r,s,a):r[s]=e[s]}r.default=e,t&&t.set(e,r);return r}(r(106));function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}const s={"||":0,"&&":1,"|":2,"^":3,"&":4,"==":5,"===":5,"!=":5,"!==":5,"<":6,">":6,"<=":6,">=":6,in:6,instanceof:6,">>":7,"<<":7,">>>":7,"+":8,"-":8,"*":9,"/":9,"%":9,"**":10},a=(e,t)=>(n.isClassDeclaration(t)||n.isClassExpression(t))&&t.superClass===e;function o(e,t){return n.isMemberExpression(t,{object:e})||n.isCallExpression(t,{callee:e})||n.isNewExpression(t,{callee:e})||n.isBinaryExpression(t,{operator:"**",left:e})||a(e,t)}function u(e,t){return!!(n.isUnaryLike(t)||n.isBinary(t)||n.isConditionalExpression(t,{test:e})||n.isAwaitExpression(t)||n.isOptionalMemberExpression(t)||n.isTaggedTemplateExpression(t)||n.isTSTypeAssertion(t)||n.isTSAsExpression(t))||o(e,t)}function l(e,{considerArrow:t=!1,considerDefaultExports:r=!1}={}){let i=e.length-1,s=e[i];i--;let a=e[i];for(;i>0;){if(n.isExpressionStatement(a,{expression:s})||n.isTaggedTemplateExpression(a)||r&&n.isExportDefaultDeclaration(a,{declaration:s})||t&&n.isArrowFunctionExpression(a,{body:s}))return!0;if(!(n.isCallExpression(a,{callee:s})||n.isSequenceExpression(a)&&a.expressions[0]===s||n.isMemberExpression(a,{object:s})||n.isConditional(a,{test:s})||n.isBinary(a,{left:s})||n.isAssignmentExpression(a,{left:s})))return!1;s=a,i--,a=e[i]}return!1}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(590);Object.keys(n).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})}));var i=r(591);Object.keys(i).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}})}));var s=r(592);Object.keys(s).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return s[e]}})}));var a=r(593);Object.keys(a).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})}));var o=r(594);Object.keys(o).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})}));var u=r(338);Object.keys(u).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return u[e]}})}));var l=r(339);Object.keys(l).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return l[e]}})}));var c=r(595);Object.keys(c).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return c[e]}})}));var p=r(596);Object.keys(p).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return p[e]}})}));var h=r(597);Object.keys(h).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return h[e]}})}));var f=r(598);Object.keys(f).forEach((function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return f[e]}})}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TaggedTemplateExpression=function(e){this.print(e.tag,e),this.print(e.typeParameters,e),this.print(e.quasi,e)},t.TemplateElement=function(e,t){const r=t.quasis[0]===e,n=t.quasis[t.quasis.length-1]===e,i=(r?"`":"}")+e.value.raw+(n?"`":"${");this.token(i)},t.TemplateLiteral=function(e){const t=e.quasis;for(let r=0;r<t.length;r++)this.print(t[r],e),r+1<t.length&&this.print(e.expressions[r],e)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UnaryExpression=function(e){"void"===e.operator||"delete"===e.operator||"typeof"===e.operator||"throw"===e.operator?(this.word(e.operator),this.space()):this.token(e.operator);this.print(e.argument,e)},t.DoExpression=function(e){this.word("do"),this.space(),this.print(e.body,e)},t.ParenthesizedExpression=function(e){this.token("("),this.print(e.expression,e),this.token(")")},t.UpdateExpression=function(e){e.prefix?(this.token(e.operator),this.print(e.argument,e)):(this.startTerminatorless(!0),this.print(e.argument,e),this.endTerminatorless(),this.token(e.operator))},t.ConditionalExpression=function(e){this.print(e.test,e),this.space(),this.token("?"),this.space(),this.print(e.consequent,e),this.space(),this.token(":"),this.space(),this.print(e.alternate,e)},t.NewExpression=function(e,t){if(this.word("new"),this.space(),this.print(e.callee,e),this.format.minified&&0===e.arguments.length&&!e.optional&&!n.isCallExpression(t,{callee:e})&&!n.isMemberExpression(t)&&!n.isNewExpression(t))return;this.print(e.typeArguments,e),this.print(e.typeParameters,e),e.optional&&this.token("?.");this.token("("),this.printList(e.arguments,e),this.token(")")},t.SequenceExpression=function(e){this.printList(e.expressions,e)},t.ThisExpression=function(){this.word("this")},t.Super=function(){this.word("super")},t.Decorator=function(e){this.token("@"),this.print(e.expression,e),this.newline()},t.OptionalMemberExpression=function(e){if(this.print(e.object,e),!e.computed&&n.isMemberExpression(e.property))throw new TypeError("Got a MemberExpression for MemberExpression property");let t=e.computed;n.isLiteral(e.property)&&"number"===typeof e.property.value&&(t=!0);e.optional&&this.token("?.");t?(this.token("["),this.print(e.property,e),this.token("]")):(e.optional||this.token("."),this.print(e.property,e))},t.OptionalCallExpression=function(e){this.print(e.callee,e),this.print(e.typeArguments,e),this.print(e.typeParameters,e),e.optional&&this.token("?.");this.token("("),this.printList(e.arguments,e),this.token(")")},t.CallExpression=function(e){this.print(e.callee,e),this.print(e.typeArguments,e),this.print(e.typeParameters,e),this.token("("),this.printList(e.arguments,e),this.token(")")},t.Import=function(){this.word("import")},t.EmptyStatement=function(){this.semicolon(!0)},t.ExpressionStatement=function(e){this.print(e.expression,e),this.semicolon()},t.AssignmentPattern=function(e){this.print(e.left,e),e.left.optional&&this.token("?");this.print(e.left.typeAnnotation,e),this.space(),this.token("="),this.space(),this.print(e.right,e)},t.LogicalExpression=t.BinaryExpression=t.AssignmentExpression=function(e,t){const r=this.inForStatementInitCounter&&"in"===e.operator&&!i.needsParens(e,t);r&&this.token("(");this.print(e.left,e),this.space(),"in"===e.operator||"instanceof"===e.operator?this.word(e.operator):this.token(e.operator);this.space(),this.print(e.right,e),r&&this.token(")")},t.BindExpression=function(e){this.print(e.object,e),this.token("::"),this.print(e.callee,e)},t.MemberExpression=function(e){if(this.print(e.object,e),!e.computed&&n.isMemberExpression(e.property))throw new TypeError("Got a MemberExpression for MemberExpression property");let t=e.computed;n.isLiteral(e.property)&&"number"===typeof e.property.value&&(t=!0);t?(this.token("["),this.print(e.property,e),this.token("]")):(this.token("."),this.print(e.property,e))},t.MetaProperty=function(e){this.print(e.meta,e),this.token("."),this.print(e.property,e)},t.PrivateName=function(e){this.token("#"),this.print(e.id,e)},t.V8IntrinsicIdentifier=function(e){this.token("%"),this.word(e.name)},t.AwaitExpression=t.YieldExpression=void 0;var n=a(r(106)),i=a(r(337));function s(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function a(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var a=n?Object.getOwnPropertyDescriptor(e,i):null;a&&(a.get||a.set)?Object.defineProperty(r,i,a):r[i]=e[i]}return r.default=e,t&&t.set(e,r),r}function o(e){return function(t){if(this.word(e),t.delegate&&this.token("*"),t.argument){this.space();const e=this.startTerminatorless();this.print(t.argument,t),this.endTerminatorless(e)}}}const u=o("yield");t.YieldExpression=u;const l=o("await");t.AwaitExpression=l},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WithStatement=function(e){this.word("with"),this.space(),this.token("("),this.print(e.object,e),this.token(")"),this.printBlock(e)},t.IfStatement=function(e){this.word("if"),this.space(),this.token("("),this.print(e.test,e),this.token(")"),this.space();const t=e.alternate&&n.isIfStatement(function e(t){return n.isStatement(t.body)?e(t.body):t}(e.consequent));t&&(this.token("{"),this.newline(),this.indent());this.printAndIndentOnComments(e.consequent,e),t&&(this.dedent(),this.newline(),this.token("}"));e.alternate&&(this.endsWith("}")&&this.space(),this.word("else"),this.space(),this.printAndIndentOnComments(e.alternate,e))},t.ForStatement=function(e){this.word("for"),this.space(),this.token("("),this.inForStatementInitCounter++,this.print(e.init,e),this.inForStatementInitCounter--,this.token(";"),e.test&&(this.space(),this.print(e.test,e));this.token(";"),e.update&&(this.space(),this.print(e.update,e));this.token(")"),this.printBlock(e)},t.WhileStatement=function(e){this.word("while"),this.space(),this.token("("),this.print(e.test,e),this.token(")"),this.printBlock(e)},t.DoWhileStatement=function(e){this.word("do"),this.space(),this.print(e.body,e),this.space(),this.word("while"),this.space(),this.token("("),this.print(e.test,e),this.token(")"),this.semicolon()},t.LabeledStatement=function(e){this.print(e.label,e),this.token(":"),this.space(),this.print(e.body,e)},t.TryStatement=function(e){this.word("try"),this.space(),this.print(e.block,e),this.space(),e.handlers?this.print(e.handlers[0],e):this.print(e.handler,e);e.finalizer&&(this.space(),this.word("finally"),this.space(),this.print(e.finalizer,e))},t.CatchClause=function(e){this.word("catch"),this.space(),e.param&&(this.token("("),this.print(e.param,e),this.token(")"),this.space());this.print(e.body,e)},t.SwitchStatement=function(e){this.word("switch"),this.space(),this.token("("),this.print(e.discriminant,e),this.token(")"),this.space(),this.token("{"),this.printSequence(e.cases,e,{indent:!0,addNewlines(t,r){if(!t&&e.cases[e.cases.length-1]===r)return-1}}),this.token("}")},t.SwitchCase=function(e){e.test?(this.word("case"),this.space(),this.print(e.test,e),this.token(":")):(this.word("default"),this.token(":"));e.consequent.length&&(this.newline(),this.printSequence(e.consequent,e,{indent:!0}))},t.DebuggerStatement=function(){this.word("debugger"),this.semicolon()},t.VariableDeclaration=function(e,t){e.declare&&(this.word("declare"),this.space());this.word(e.kind),this.space();let r,i=!1;if(!n.isFor(t))for(const n of e.declarations)n.init&&(i=!0);i&&(r="const"===e.kind?d:f);if(this.printList(e.declarations,e,{separator:r}),n.isFor(t)&&(t.left===e||t.init===e))return;this.semicolon()},t.VariableDeclarator=function(e){this.print(e.id,e),e.definite&&this.token("!");this.print(e.id.typeAnnotation,e),e.init&&(this.space(),this.token("="),this.space(),this.print(e.init,e))},t.ThrowStatement=t.BreakStatement=t.ReturnStatement=t.ContinueStatement=t.ForOfStatement=t.ForInStatement=void 0;var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var a=n?Object.getOwnPropertyDescriptor(e,s):null;a&&(a.get||a.set)?Object.defineProperty(r,s,a):r[s]=e[s]}r.default=e,t&&t.set(e,r);return r}(r(106));function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}const s=function(e){return function(t){this.word("for"),this.space(),"of"===e&&t.await&&(this.word("await"),this.space()),this.token("("),this.print(t.left,t),this.space(),this.word(e),this.space(),this.print(t.right,t),this.token(")"),this.printBlock(t)}},a=s("in");t.ForInStatement=a;const o=s("of");function u(e,t="label"){return function(r){this.word(e);const n=r[t];if(n){this.space();const e="label"==t,i=this.startTerminatorless(e);this.print(n,r),this.endTerminatorless(i)}this.semicolon()}}t.ForOfStatement=o;const l=u("continue");t.ContinueStatement=l;const c=u("return","argument");t.ReturnStatement=c;const p=u("break");t.BreakStatement=p;const h=u("throw","argument");function f(){if(this.token(","),this.newline(),this.endsWith("\n"))for(let e=0;e<4;e++)this.space(!0)}function d(){if(this.token(","),this.newline(),this.endsWith("\n"))for(let e=0;e<6;e++)this.space(!0)}t.ThrowStatement=h},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ClassExpression=t.ClassDeclaration=function(e,t){this.format.decoratorsBeforeExport&&(n.isExportDefaultDeclaration(t)||n.isExportNamedDeclaration(t))||this.printJoin(e.decorators,e);e.declare&&(this.word("declare"),this.space());e.abstract&&(this.word("abstract"),this.space());this.word("class"),e.id&&(this.space(),this.print(e.id,e));this.print(e.typeParameters,e),e.superClass&&(this.space(),this.word("extends"),this.space(),this.print(e.superClass,e),this.print(e.superTypeParameters,e));e.implements&&(this.space(),this.word("implements"),this.space(),this.printList(e.implements,e));this.space(),this.print(e.body,e)},t.ClassBody=function(e){this.token("{"),this.printInnerComments(e),0===e.body.length?this.token("}"):(this.newline(),this.indent(),this.printSequence(e.body,e),this.dedent(),this.endsWith("\n")||this.newline(),this.rightBrace())},t.ClassProperty=function(e){this.printJoin(e.decorators,e),this.tsPrintClassMemberModifiers(e,!0),e.computed?(this.token("["),this.print(e.key,e),this.token("]")):(this._variance(e),this.print(e.key,e));e.optional&&this.token("?");e.definite&&this.token("!");this.print(e.typeAnnotation,e),e.value&&(this.space(),this.token("="),this.space(),this.print(e.value,e));this.semicolon()},t.ClassPrivateProperty=function(e){e.static&&(this.word("static"),this.space());this.print(e.key,e),this.print(e.typeAnnotation,e),e.value&&(this.space(),this.token("="),this.space(),this.print(e.value,e));this.semicolon()},t.ClassMethod=function(e){this._classMethodHead(e),this.space(),this.print(e.body,e)},t.ClassPrivateMethod=function(e){this._classMethodHead(e),this.space(),this.print(e.body,e)},t._classMethodHead=function(e){this.printJoin(e.decorators,e),this.tsPrintClassMemberModifiers(e,!1),this._methodHead(e)};var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var a=n?Object.getOwnPropertyDescriptor(e,s):null;a&&(a.get||a.set)?Object.defineProperty(r,s,a):r[s]=e[s]}r.default=e,t&&t.set(e,r);return r}(r(106));function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t._params=function(e){this.print(e.typeParameters,e),this.token("("),this._parameters(e.params,e),this.token(")"),this.print(e.returnType,e)},t._parameters=function(e,t){for(let r=0;r<e.length;r++)this._param(e[r],t),r<e.length-1&&(this.token(","),this.space())},t._param=function(e,t){this.printJoin(e.decorators,e),this.print(e,t),e.optional&&this.token("?");this.print(e.typeAnnotation,e)},t._methodHead=function(e){const t=e.kind,r=e.key;"get"!==t&&"set"!==t||(this.word(t),this.space());e.async&&(this.word("async"),this.space());"method"!==t&&"init"!==t||e.generator&&this.token("*");e.computed?(this.token("["),this.print(r,e),this.token("]")):this.print(r,e);e.optional&&this.token("?");this._params(e)},t._predicate=function(e){e.predicate&&(e.returnType||this.token(":"),this.space(),this.print(e.predicate,e))},t._functionHead=function(e){e.async&&(this.word("async"),this.space());this.word("function"),e.generator&&this.token("*");this.space(),e.id&&this.print(e.id,e);this._params(e),this._predicate(e)},t.FunctionDeclaration=t.FunctionExpression=function(e){this._functionHead(e),this.space(),this.print(e.body,e)},t.ArrowFunctionExpression=function(e){e.async&&(this.word("async"),this.space());const t=e.params[0];1===e.params.length&&n.isIdentifier(t)&&!function(e,t){return e.typeParameters||e.returnType||t.typeAnnotation||t.optional||t.trailingComments}(e,t)?this.format.retainLines&&e.loc&&e.body.loc&&e.loc.start.line<e.body.loc.start.line?(this.token("("),t.loc&&t.loc.start.line>e.loc.start.line?(this.indent(),this.print(t,e),this.dedent(),this._catchUp("start",e.body.loc)):this.print(t,e),this.token(")")):this.print(t,e):this._params(e);this._predicate(e),this.space(),this.token("=>"),this.space(),this.print(e.body,e)};var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var a=n?Object.getOwnPropertyDescriptor(e,s):null;a&&(a.get||a.set)?Object.defineProperty(r,s,a):r[s]=e[s]}r.default=e,t&&t.set(e,r);return r}(r(106));function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AnyTypeAnnotation=function(){this.word("any")},t.ArrayTypeAnnotation=function(e){this.print(e.elementType,e),this.token("["),this.token("]")},t.BooleanTypeAnnotation=function(){this.word("boolean")},t.BooleanLiteralTypeAnnotation=function(e){this.word(e.value?"true":"false")},t.NullLiteralTypeAnnotation=function(){this.word("null")},t.DeclareClass=function(e,t){n.isDeclareExportDeclaration(t)||(this.word("declare"),this.space());this.word("class"),this.space(),this._interfaceish(e)},t.DeclareFunction=function(e,t){n.isDeclareExportDeclaration(t)||(this.word("declare"),this.space());this.word("function"),this.space(),this.print(e.id,e),this.print(e.id.typeAnnotation.typeAnnotation,e),e.predicate&&(this.space(),this.print(e.predicate,e));this.semicolon()},t.InferredPredicate=function(){this.token("%"),this.word("checks")},t.DeclaredPredicate=function(e){this.token("%"),this.word("checks"),this.token("("),this.print(e.value,e),this.token(")")},t.DeclareInterface=function(e){this.word("declare"),this.space(),this.InterfaceDeclaration(e)},t.DeclareModule=function(e){this.word("declare"),this.space(),this.word("module"),this.space(),this.print(e.id,e),this.space(),this.print(e.body,e)},t.DeclareModuleExports=function(e){this.word("declare"),this.space(),this.word("module"),this.token("."),this.word("exports"),this.print(e.typeAnnotation,e)},t.DeclareTypeAlias=function(e){this.word("declare"),this.space(),this.TypeAlias(e)},t.DeclareOpaqueType=function(e,t){n.isDeclareExportDeclaration(t)||(this.word("declare"),this.space());this.OpaqueType(e)},t.DeclareVariable=function(e,t){n.isDeclareExportDeclaration(t)||(this.word("declare"),this.space());this.word("var"),this.space(),this.print(e.id,e),this.print(e.id.typeAnnotation,e),this.semicolon()},t.DeclareExportDeclaration=function(e){this.word("declare"),this.space(),this.word("export"),this.space(),e.default&&(this.word("default"),this.space());c.apply(this,arguments)},t.DeclareExportAllDeclaration=function(){this.word("declare"),this.space(),i.ExportAllDeclaration.apply(this,arguments)},t.EnumDeclaration=function(e){const t=e.id,r=e.body;this.word("enum"),this.space(),this.print(t,e),this.print(r,e)},t.EnumBooleanBody=function(e){o(this,"boolean",e.explicitType),u(this,e)},t.EnumNumberBody=function(e){o(this,"number",e.explicitType),u(this,e)},t.EnumStringBody=function(e){o(this,"string",e.explicitType),u(this,e)},t.EnumSymbolBody=function(e){o(this,"symbol",!0),u(this,e)},t.EnumDefaultedMember=function(e){const t=e.id;this.print(t,e),this.token(",")},t.EnumBooleanMember=function(e){l(this,e)},t.EnumNumberMember=function(e){l(this,e)},t.EnumStringMember=function(e){l(this,e)},t.ExistsTypeAnnotation=function(){this.token("*")},t.FunctionTypeAnnotation=function(e,t){this.print(e.typeParameters,e),this.token("("),this.printList(e.params,e),e.rest&&(e.params.length&&(this.token(","),this.space()),this.token("..."),this.print(e.rest,e));this.token(")"),"ObjectTypeCallProperty"===t.type||"DeclareFunction"===t.type||"ObjectTypeProperty"===t.type&&t.method?this.token(":"):(this.space(),this.token("=>"));this.space(),this.print(e.returnType,e)},t.FunctionTypeParam=function(e){this.print(e.name,e),e.optional&&this.token("?");e.name&&(this.token(":"),this.space());this.print(e.typeAnnotation,e)},t.GenericTypeAnnotation=t.ClassImplements=t.InterfaceExtends=function(e){this.print(e.id,e),this.print(e.typeParameters,e)},t._interfaceish=function(e){this.print(e.id,e),this.print(e.typeParameters,e),e.extends.length&&(this.space(),this.word("extends"),this.space(),this.printList(e.extends,e));e.mixins&&e.mixins.length&&(this.space(),this.word("mixins"),this.space(),this.printList(e.mixins,e));e.implements&&e.implements.length&&(this.space(),this.word("implements"),this.space(),this.printList(e.implements,e));this.space(),this.print(e.body,e)},t._variance=function(e){e.variance&&("plus"===e.variance.kind?this.token("+"):"minus"===e.variance.kind&&this.token("-"))},t.InterfaceDeclaration=function(e){this.word("interface"),this.space(),this._interfaceish(e)},t.InterfaceTypeAnnotation=function(e){this.word("interface"),e.extends&&e.extends.length&&(this.space(),this.word("extends"),this.space(),this.printList(e.extends,e));this.space(),this.print(e.body,e)},t.IntersectionTypeAnnotation=function(e){this.printJoin(e.types,e,{separator:p})},t.MixedTypeAnnotation=function(){this.word("mixed")},t.EmptyTypeAnnotation=function(){this.word("empty")},t.NullableTypeAnnotation=function(e){this.token("?"),this.print(e.typeAnnotation,e)},t.NumberTypeAnnotation=function(){this.word("number")},t.StringTypeAnnotation=function(){this.word("string")},t.ThisTypeAnnotation=function(){this.word("this")},t.TupleTypeAnnotation=function(e){this.token("["),this.printList(e.types,e),this.token("]")},t.TypeofTypeAnnotation=function(e){this.word("typeof"),this.space(),this.print(e.argument,e)},t.TypeAlias=function(e){this.word("type"),this.space(),this.print(e.id,e),this.print(e.typeParameters,e),this.space(),this.token("="),this.space(),this.print(e.right,e),this.semicolon()},t.TypeAnnotation=function(e){this.token(":"),this.space(),e.optional&&this.token("?");this.print(e.typeAnnotation,e)},t.TypeParameterDeclaration=t.TypeParameterInstantiation=function(e){this.token("<"),this.printList(e.params,e,{}),this.token(">")},t.TypeParameter=function(e){this._variance(e),this.word(e.name),e.bound&&this.print(e.bound,e);e.default&&(this.space(),this.token("="),this.space(),this.print(e.default,e))},t.OpaqueType=function(e){this.word("opaque"),this.space(),this.word("type"),this.space(),this.print(e.id,e),this.print(e.typeParameters,e),e.supertype&&(this.token(":"),this.space(),this.print(e.supertype,e));e.impltype&&(this.space(),this.token("="),this.space(),this.print(e.impltype,e));this.semicolon()},t.ObjectTypeAnnotation=function(e){e.exact?this.token("{|"):this.token("{");const t=e.properties.concat(e.callProperties||[],e.indexers||[],e.internalSlots||[]);t.length&&(this.space(),this.printJoin(t,e,{addNewlines(e){if(e&&!t[0])return 1},indent:!0,statement:!0,iterator:()=>{(1!==t.length||e.inexact)&&(this.token(","),this.space())}}),this.space());e.inexact&&(this.indent(),this.token("..."),t.length&&this.newline(),this.dedent());e.exact?this.token("|}"):this.token("}")},t.ObjectTypeInternalSlot=function(e){e.static&&(this.word("static"),this.space());this.token("["),this.token("["),this.print(e.id,e),this.token("]"),this.token("]"),e.optional&&this.token("?");e.method||(this.token(":"),this.space());this.print(e.value,e)},t.ObjectTypeCallProperty=function(e){e.static&&(this.word("static"),this.space());this.print(e.value,e)},t.ObjectTypeIndexer=function(e){e.static&&(this.word("static"),this.space());this._variance(e),this.token("["),e.id&&(this.print(e.id,e),this.token(":"),this.space());this.print(e.key,e),this.token("]"),this.token(":"),this.space(),this.print(e.value,e)},t.ObjectTypeProperty=function(e){e.proto&&(this.word("proto"),this.space());e.static&&(this.word("static"),this.space());this._variance(e),this.print(e.key,e),e.optional&&this.token("?");e.method||(this.token(":"),this.space());this.print(e.value,e)},t.ObjectTypeSpreadProperty=function(e){this.token("..."),this.print(e.argument,e)},t.QualifiedTypeIdentifier=function(e){this.print(e.qualification,e),this.token("."),this.print(e.id,e)},t.UnionTypeAnnotation=function(e){this.printJoin(e.types,e,{separator:h})},t.TypeCastExpression=function(e){this.token("("),this.print(e.expression,e),this.print(e.typeAnnotation,e),this.token(")")},t.Variance=function(e){"plus"===e.kind?this.token("+"):this.token("-")},t.VoidTypeAnnotation=function(){this.word("void")},Object.defineProperty(t,"NumberLiteralTypeAnnotation",{enumerable:!0,get:function(){return s.NumericLiteral}}),Object.defineProperty(t,"StringLiteralTypeAnnotation",{enumerable:!0,get:function(){return s.StringLiteral}});var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(106)),i=r(338),s=r(339);function a(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function o(e,t,r){r&&(e.space(),e.word("of"),e.space(),e.word(t)),e.space()}function u(e,t){const r=t.members;e.token("{"),e.indent(),e.newline();for(const n of r)e.print(n,t),e.newline();e.dedent(),e.token("}")}function l(e,t){const r=t.id,n=t.init;e.print(r,t),e.space(),e.token("="),e.space(),e.print(n,t),e.token(",")}function c(e){if(e.declaration){const t=e.declaration;this.print(t,e),n.isStatement(t)||this.semicolon()}else this.token("{"),e.specifiers.length&&(this.space(),this.printList(e.specifiers,e),this.space()),this.token("}"),e.source&&(this.space(),this.word("from"),this.space(),this.print(e.source,e)),this.semicolon()}function p(){this.space(),this.token("&"),this.space()}function h(){this.space(),this.token("|"),this.space()}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.File=function(e){e.program&&this.print(e.program.interpreter,e);this.print(e.program,e)},t.Program=function(e){this.printInnerComments(e,!1),this.printSequence(e.directives,e),e.directives&&e.directives.length&&this.newline();this.printSequence(e.body,e)},t.BlockStatement=function(e){this.token("{"),this.printInnerComments(e);const t=e.directives&&e.directives.length;e.body.length||t?(this.newline(),this.printSequence(e.directives,e,{indent:!0}),t&&this.newline(),this.printSequence(e.body,e,{indent:!0}),this.removeTrailingNewline(),this.source("end",e.loc),this.endsWith("\n")||this.newline(),this.rightBrace()):(this.source("end",e.loc),this.token("}"))},t.Noop=function(){},t.Directive=function(e){this.print(e.value,e),this.semicolon()},t.DirectiveLiteral=function(e){const t=this.getPossibleRaw(e);if(null!=t)return void this.token(t);const r=e.value;if(i.test(r)){if(n.test(r))throw new Error("Malformed AST: it is not possible to print a directive containing both unescaped single and double quotes.");this.token(`'${r}'`)}else this.token(`"${r}"`)},t.InterpreterDirective=function(e){this.token(`#!${e.value}\n`)},t.Placeholder=function(e){this.token("%%"),this.print(e.name),this.token("%%"),"Statement"===e.expectedNode&&this.semicolon()};const n=/(?:^|[^\\])(?:\\\\)*'/,i=/(?:^|[^\\])(?:\\\\)*"/},function(e,t,r){"use strict";function n(){this.space()}Object.defineProperty(t,"__esModule",{value:!0}),t.JSXAttribute=function(e){this.print(e.name,e),e.value&&(this.token("="),this.print(e.value,e))},t.JSXIdentifier=function(e){this.word(e.name)},t.JSXNamespacedName=function(e){this.print(e.namespace,e),this.token(":"),this.print(e.name,e)},t.JSXMemberExpression=function(e){this.print(e.object,e),this.token("."),this.print(e.property,e)},t.JSXSpreadAttribute=function(e){this.token("{"),this.token("..."),this.print(e.argument,e),this.token("}")},t.JSXExpressionContainer=function(e){this.token("{"),this.print(e.expression,e),this.token("}")},t.JSXSpreadChild=function(e){this.token("{"),this.token("..."),this.print(e.expression,e),this.token("}")},t.JSXText=function(e){const t=this.getPossibleRaw(e);null!=t?this.token(t):this.token(e.value)},t.JSXElement=function(e){const t=e.openingElement;if(this.print(t,e),t.selfClosing)return;this.indent();for(const r of e.children)this.print(r,e);this.dedent(),this.print(e.closingElement,e)},t.JSXOpeningElement=function(e){this.token("<"),this.print(e.name,e),this.print(e.typeParameters,e),e.attributes.length>0&&(this.space(),this.printJoin(e.attributes,e,{separator:n}));e.selfClosing?(this.space(),this.token("/>")):this.token(">")},t.JSXClosingElement=function(e){this.token("</"),this.print(e.name,e),this.token(">")},t.JSXEmptyExpression=function(e){this.printInnerComments(e)},t.JSXFragment=function(e){this.print(e.openingFragment,e),this.indent();for(const t of e.children)this.print(t,e);this.dedent(),this.print(e.closingFragment,e)},t.JSXOpeningFragment=function(){this.token("<"),this.token(">")},t.JSXClosingFragment=function(){this.token("</"),this.token(">")}},function(e,t,r){"use strict";function n(e,t){!0!==t&&e.token(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.TSTypeAnnotation=function(e){this.token(":"),this.space(),e.optional&&this.token("?");this.print(e.typeAnnotation,e)},t.TSTypeParameterDeclaration=t.TSTypeParameterInstantiation=function(e){this.token("<"),this.printList(e.params,e,{}),this.token(">")},t.TSTypeParameter=function(e){this.word(e.name),e.constraint&&(this.space(),this.word("extends"),this.space(),this.print(e.constraint,e));e.default&&(this.space(),this.token("="),this.space(),this.print(e.default,e))},t.TSParameterProperty=function(e){e.accessibility&&(this.word(e.accessibility),this.space());e.readonly&&(this.word("readonly"),this.space());this._param(e.parameter)},t.TSDeclareFunction=function(e){e.declare&&(this.word("declare"),this.space());this._functionHead(e),this.token(";")},t.TSDeclareMethod=function(e){this._classMethodHead(e),this.token(";")},t.TSQualifiedName=function(e){this.print(e.left,e),this.token("."),this.print(e.right,e)},t.TSCallSignatureDeclaration=function(e){this.tsPrintSignatureDeclarationBase(e),this.token(";")},t.TSConstructSignatureDeclaration=function(e){this.word("new"),this.space(),this.tsPrintSignatureDeclarationBase(e),this.token(";")},t.TSPropertySignature=function(e){const t=e.readonly,r=e.initializer;t&&(this.word("readonly"),this.space());this.tsPrintPropertyOrMethodName(e),this.print(e.typeAnnotation,e),r&&(this.space(),this.token("="),this.space(),this.print(r,e));this.token(";")},t.tsPrintPropertyOrMethodName=function(e){e.computed&&this.token("[");this.print(e.key,e),e.computed&&this.token("]");e.optional&&this.token("?")},t.TSMethodSignature=function(e){this.tsPrintPropertyOrMethodName(e),this.tsPrintSignatureDeclarationBase(e),this.token(";")},t.TSIndexSignature=function(e){e.readonly&&(this.word("readonly"),this.space());this.token("["),this._parameters(e.parameters,e),this.token("]"),this.print(e.typeAnnotation,e),this.token(";")},t.TSAnyKeyword=function(){this.word("any")},t.TSBigIntKeyword=function(){this.word("bigint")},t.TSUnknownKeyword=function(){this.word("unknown")},t.TSNumberKeyword=function(){this.word("number")},t.TSObjectKeyword=function(){this.word("object")},t.TSBooleanKeyword=function(){this.word("boolean")},t.TSStringKeyword=function(){this.word("string")},t.TSSymbolKeyword=function(){this.word("symbol")},t.TSVoidKeyword=function(){this.word("void")},t.TSUndefinedKeyword=function(){this.word("undefined")},t.TSNullKeyword=function(){this.word("null")},t.TSNeverKeyword=function(){this.word("never")},t.TSThisType=function(){this.word("this")},t.TSFunctionType=function(e){this.tsPrintFunctionOrConstructorType(e)},t.TSConstructorType=function(e){this.word("new"),this.space(),this.tsPrintFunctionOrConstructorType(e)},t.tsPrintFunctionOrConstructorType=function(e){const t=e.typeParameters,r=e.parameters;this.print(t,e),this.token("("),this._parameters(r,e),this.token(")"),this.space(),this.token("=>"),this.space(),this.print(e.typeAnnotation.typeAnnotation,e)},t.TSTypeReference=function(e){this.print(e.typeName,e),this.print(e.typeParameters,e)},t.TSTypePredicate=function(e){e.asserts&&(this.word("asserts"),this.space());this.print(e.parameterName),e.typeAnnotation&&(this.space(),this.word("is"),this.space(),this.print(e.typeAnnotation.typeAnnotation))},t.TSTypeQuery=function(e){this.word("typeof"),this.space(),this.print(e.exprName)},t.TSTypeLiteral=function(e){this.tsPrintTypeLiteralOrInterfaceBody(e.members,e)},t.tsPrintTypeLiteralOrInterfaceBody=function(e,t){this.tsPrintBraced(e,t)},t.tsPrintBraced=function(e,t){if(this.token("{"),e.length){this.indent(),this.newline();for(const r of e)this.print(r,t),this.newline();this.dedent(),this.rightBrace()}else this.token("}")},t.TSArrayType=function(e){this.print(e.elementType,e),this.token("[]")},t.TSTupleType=function(e){this.token("["),this.printList(e.elementTypes,e),this.token("]")},t.TSOptionalType=function(e){this.print(e.typeAnnotation,e),this.token("?")},t.TSRestType=function(e){this.token("..."),this.print(e.typeAnnotation,e)},t.TSUnionType=function(e){this.tsPrintUnionOrIntersectionType(e,"|")},t.TSIntersectionType=function(e){this.tsPrintUnionOrIntersectionType(e,"&")},t.tsPrintUnionOrIntersectionType=function(e,t){this.printJoin(e.types,e,{separator(){this.space(),this.token(t),this.space()}})},t.TSConditionalType=function(e){this.print(e.checkType),this.space(),this.word("extends"),this.space(),this.print(e.extendsType),this.space(),this.token("?"),this.space(),this.print(e.trueType),this.space(),this.token(":"),this.space(),this.print(e.falseType)},t.TSInferType=function(e){this.token("infer"),this.space(),this.print(e.typeParameter)},t.TSParenthesizedType=function(e){this.token("("),this.print(e.typeAnnotation,e),this.token(")")},t.TSTypeOperator=function(e){this.token(e.operator),this.space(),this.print(e.typeAnnotation,e)},t.TSIndexedAccessType=function(e){this.print(e.objectType,e),this.token("["),this.print(e.indexType,e),this.token("]")},t.TSMappedType=function(e){const t=e.readonly,r=e.typeParameter,i=e.optional;this.token("{"),this.space(),t&&(n(this,t),this.word("readonly"),this.space());this.token("["),this.word(r.name),this.space(),this.word("in"),this.space(),this.print(r.constraint,r),this.token("]"),i&&(n(this,i),this.token("?"));this.token(":"),this.space(),this.print(e.typeAnnotation,e),this.space(),this.token("}")},t.TSLiteralType=function(e){this.print(e.literal,e)},t.TSExpressionWithTypeArguments=function(e){this.print(e.expression,e),this.print(e.typeParameters,e)},t.TSInterfaceDeclaration=function(e){const t=e.declare,r=e.id,n=e.typeParameters,i=e.extends,s=e.body;t&&(this.word("declare"),this.space());this.word("interface"),this.space(),this.print(r,e),this.print(n,e),i&&(this.space(),this.word("extends"),this.space(),this.printList(i,e));this.space(),this.print(s,e)},t.TSInterfaceBody=function(e){this.tsPrintTypeLiteralOrInterfaceBody(e.body,e)},t.TSTypeAliasDeclaration=function(e){const t=e.declare,r=e.id,n=e.typeParameters,i=e.typeAnnotation;t&&(this.word("declare"),this.space());this.word("type"),this.space(),this.print(r,e),this.print(n,e),this.space(),this.token("="),this.space(),this.print(i,e),this.token(";")},t.TSAsExpression=function(e){const t=e.expression,r=e.typeAnnotation;this.print(t,e),this.space(),this.word("as"),this.space(),this.print(r,e)},t.TSTypeAssertion=function(e){const t=e.typeAnnotation,r=e.expression;this.token("<"),this.print(t,e),this.token(">"),this.space(),this.print(r,e)},t.TSEnumDeclaration=function(e){const t=e.declare,r=e.const,n=e.id,i=e.members;t&&(this.word("declare"),this.space());r&&(this.word("const"),this.space());this.word("enum"),this.space(),this.print(n,e),this.space(),this.tsPrintBraced(i,e)},t.TSEnumMember=function(e){const t=e.id,r=e.initializer;this.print(t,e),r&&(this.space(),this.token("="),this.space(),this.print(r,e));this.token(",")},t.TSModuleDeclaration=function(e){const t=e.declare,r=e.id;t&&(this.word("declare"),this.space());e.global||(this.word("Identifier"===r.type?"namespace":"module"),this.space());if(this.print(r,e),!e.body)return void this.token(";");let n=e.body;for(;"TSModuleDeclaration"===n.type;)this.token("."),this.print(n.id,n),n=n.body;this.space(),this.print(n,e)},t.TSModuleBlock=function(e){this.tsPrintBraced(e.body,e)},t.TSImportType=function(e){const t=e.argument,r=e.qualifier,n=e.typeParameters;this.word("import"),this.token("("),this.print(t,e),this.token(")"),r&&(this.token("."),this.print(r,e));n&&this.print(n,e)},t.TSImportEqualsDeclaration=function(e){const t=e.isExport,r=e.id,n=e.moduleReference;t&&(this.word("export"),this.space());this.word("import"),this.space(),this.print(r,e),this.space(),this.token("="),this.space(),this.print(n,e),this.token(";")},t.TSExternalModuleReference=function(e){this.token("require("),this.print(e.expression,e),this.token(")")},t.TSNonNullExpression=function(e){this.print(e.expression,e),this.token("!")},t.TSExportAssignment=function(e){this.word("export"),this.space(),this.token("="),this.space(),this.print(e.expression,e),this.token(";")},t.TSNamespaceExportDeclaration=function(e){this.word("export"),this.space(),this.word("as"),this.space(),this.word("namespace"),this.space(),this.print(e.id,e)},t.tsPrintSignatureDeclarationBase=function(e){const t=e.typeParameters,r=e.parameters;this.print(t,e),this.token("("),this._parameters(r,e),this.token(")"),this.print(e.typeAnnotation,e)},t.tsPrintClassMemberModifiers=function(e,t){t&&e.declare&&(this.word("declare"),this.space());e.accessibility&&(this.word(e.accessibility),this.space());e.static&&(this.word("static"),this.space());e.abstract&&(this.word("abstract"),this.space());t&&e.readonly&&(this.word("readonly"),this.space())}},function(e){e.exports=JSON.parse('{"_from":"@babel/core@^7.4.5","_id":"@babel/core@7.7.7","_inBundle":false,"_integrity":"sha512-jlSjuj/7z138NLZALxVgrx13AOtqip42ATZP7+kYl53GvDV6+4dCek1mVUo8z8c8Xnw/mx2q3d9HWh3griuesQ==","_location":"/@babel/core","_phantomChildren":{"@babel/types":"7.7.4","jsesc":"2.5.2","lodash":"4.17.15","source-map":"0.5.7"},"_requested":{"type":"range","registry":true,"raw":"@babel/core@^7.4.5","name":"@babel/core","escapedName":"@babel%2fcore","scope":"@babel","rawSpec":"^7.4.5","saveSpec":null,"fetchSpec":"^7.4.5"},"_requiredBy":["/@jest/transform","/@svgr/plugin-jsx","/@svgr/webpack","/@tsbb/babel-preset-tsbb","/jest-config"],"_resolved":"https://registry.npmjs.org/@babel/core/-/core-7.7.7.tgz","_shasum":"ee155d2e12300bcc0cff6a8ad46f2af5063803e9","_spec":"@babel/core@^7.4.5","_where":"/Users/kenny/git/org/@uiw/uiwjs.github.io/node_modules/@svgr/webpack","author":{"name":"Sebastian McKenzie","email":"sebmck@gmail.com"},"browser":{"./lib/config/files/index.js":"./lib/config/files/index-browser.js","./lib/transform-file.js":"./lib/transform-file-browser.js","./src/config/files/index.js":"./src/config/files/index-browser.js","./src/transform-file.js":"./src/transform-file-browser.js"},"bundleDependencies":false,"dependencies":{"@babel/code-frame":"^7.5.5","@babel/generator":"^7.7.7","@babel/helpers":"^7.7.4","@babel/parser":"^7.7.7","@babel/template":"^7.7.4","@babel/traverse":"^7.7.4","@babel/types":"^7.7.4","convert-source-map":"^1.7.0","debug":"^4.1.0","json5":"^2.1.0","lodash":"^4.17.13","resolve":"^1.3.2","semver":"^5.4.1","source-map":"^0.5.0"},"deprecated":false,"description":"Babel compiler core.","devDependencies":{"@babel/helper-transform-fixture-test-runner":"^7.7.5"},"engines":{"node":">=6.9.0"},"funding":{"type":"opencollective","url":"https://opencollective.com/babel"},"gitHead":"12da0941c898987ae30045a9da90ed5bf58ecaf9","homepage":"https://babeljs.io/","keywords":["6to5","babel","classes","const","es6","harmony","let","modules","transpile","transpiler","var","babel-core","compiler"],"license":"MIT","main":"lib/index.js","name":"@babel/core","publishConfig":{"access":"public"},"repository":{"type":"git","url":"https://github.com/babel/babel/tree/master/packages/babel-core"},"version":"7.7.7"}')},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){const t=(0,f.default)(e);if(!t)return null;const r=t.options,i=t.context,s={},o=[[]];try{const e=r.plugins,t=r.presets;if(!e||!t)throw new Error("Assertion failure - plugins and presets exist");if(function e(t,r){const a=t.plugins.reduce((e,t)=>(!1!==t.options&&e.push(g(t,i)),e),[]),u=t.presets.reduce((e,t)=>(!1!==t.options&&e.push({preset:E(t,i),pass:t.ownPass?[]:r}),e),[]);if(u.length>0){o.splice(1,0,...u.map(e=>e.pass).filter(e=>e!==r));for(const t of u){const r=t.preset,i=t.pass;if(!r)return!0;if(e({plugins:r.plugins,presets:r.presets},i))return!0;r.options.forEach(e=>{(0,n.mergeOptions)(s,e)})}}a.length>0&&r.unshift(...a)}({plugins:e.map(e=>{const t=(0,a.getItemDescriptor)(e);if(!t)throw new Error("Assertion failure - must be config item");return t}),presets:t.map(e=>{const t=(0,a.getItemDescriptor)(e);if(!t)throw new Error("Assertion failure - must be config item");return t})},o[0]))return null}catch(l){throw/^\[BABEL\]/.test(l.message)||(l.message=`[BABEL] ${i.filename||"unknown"}: ${l.message}`),l}const u=s;return(0,n.mergeOptions)(u,r),u.plugins=o[0],u.presets=o.slice(1).filter(e=>e.length>0).map(e=>({plugins:e})),u.passPerPreset=u.presets.length>0,{options:u,passes:o}};var n=r(343),i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=m();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(205)),s=d(r(247)),a=r(209),o=r(344);function u(){const e=d(r(146));return u=function(){return e},e}var l=r(210),c=r(248),p=r(604),h=d(r(605)),f=d(r(346));function d(e){return e&&e.__esModule?e:{default:e}}function m(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return m=function(){return e},e}const y=(0,l.makeWeakCache)(({value:e,options:t,dirname:r,alias:n},s)=>{if(!1===t)throw new Error("Assertion failure");t=t||{};let a=e;if("function"===typeof e){const u=Object.assign({},i,{},(0,h.default)(s));try{a=e(u,t,r)}catch(o){throw n&&(o.message+=` (While processing: ${JSON.stringify(n)})`),o}}if(!a||"object"!==typeof a)throw new Error("Plugin/Preset did not return an object.");if("function"===typeof a.then)throw new Error("You appear to be using an async plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");return{value:a,options:t,dirname:r,alias:n}});function g(e,t){if(e.value instanceof s.default){if(e.options)throw new Error("Passed options to an existing Plugin instance will not work.");return e.value}return v(y(e,t),t)}const v=(0,l.makeWeakCache)(({value:e,options:t,dirname:r,alias:n},i)=>{const a=(0,p.validatePluginObject)(e),o=Object.assign({},a);if(o.visitor&&(o.visitor=u().default.explode(Object.assign({},o.visitor))),o.inherits){const e={name:void 0,alias:`${n}$inherits`,value:o.inherits,options:t,dirname:r},s=i.invalidate(t=>g(e,t));o.pre=A(s.pre,o.pre),o.post=A(s.post,o.post),o.manipulateOptions=A(s.manipulateOptions,o.manipulateOptions),o.visitor=u().default.visitors.merge([s.visitor||{},o.visitor||{}])}return new s.default(o,t,n)}),b=(e,t)=>{if(e.test||e.include||e.exclude){const e=t.name?`"${t.name}"`:"/* your preset */";throw new Error([`Preset ${e} requires a filename to be set when babel is called directly,`,"```",`babel.transform(code, { filename: 'file.ts', presets: [${e}] });`,"```","See https://babeljs.io/docs/en/options#filename for more information."].join("\n"))}},E=(e,t)=>{const r=x(y(e,t));return((e,t,r)=>{if(!t.filename){const t=e.options;b(t,r),t.overrides&&t.overrides.forEach(e=>b(e,r))}})(r,t,e),(0,o.buildPresetChain)(r,t)},x=(0,l.makeWeakCache)(({value:e,dirname:t,alias:r})=>({options:(0,c.validate)("preset",e),alias:r,dirname:t}));function A(e,t){const r=[e,t].filter(Boolean);return r.length<=1?r[0]:function(...e){for(const t of r)t.apply(this,e)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default={auxiliaryComment:{message:"Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"},blacklist:{message:"Put the specific transforms you want in the `plugins` option"},breakConfig:{message:"This is not a necessary option in Babel 6"},experimental:{message:"Put the specific transforms you want in the `plugins` option"},externalHelpers:{message:"Use the `external-helpers` plugin instead. Check out http://babeljs.io/docs/plugins/external-helpers/"},extra:{message:""},jsxPragma:{message:"use the `pragma` option in the `react-jsx` plugin. Check out http://babeljs.io/docs/plugins/transform-react-jsx/"},loose:{message:"Specify the `loose` option for the relevant plugin you are using or use a preset that sets the option."},metadataUsedHelpers:{message:"Not required anymore as this is enabled by default"},modules:{message:"Use the corresponding module transform plugin in the `plugins` option. Check out http://babeljs.io/docs/plugins/#modules"},nonStandard:{message:"Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"},optional:{message:"Put the specific transforms you want in the `plugins` option"},sourceMapName:{message:"The `sourceMapName` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."},stage:{message:"Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"},whitelist:{message:"Put the specific transforms you want in the `plugins` option"},resolveModuleSource:{version:6,message:"Use `babel-plugin-module-resolver@3`'s 'resolvePath' options"},metadata:{version:6,message:"Generated plugin metadata is always included in the output result"},sourceMapTarget:{version:6,message:"The `sourceMapTarget` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."}}},function(e,t,r){"use strict";function n(){const e=s(r(150));return n=function(){return e},e}function i(){const e=s(r(603));return i=function(){return e},e}function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const r=n().default.resolve(t,e).split(n().default.sep);return new RegExp(["^",...r.map((e,t)=>{const n=t===r.length-1;return"**"===e?n?h:p:"*"===e?n?c:l:0===e.indexOf("*.")?u+(0,i().default)(e.slice(1))+(n?o:a):(0,i().default)(e)+(n?o:a)})].join(""))};const a=`\\${n().default.sep}`,o=`(?:${a}|$)`,u=`[^${a}]+`,l=`(?:${u}${a})`,c=`(?:${u}${o})`,p=`${l}*?`,h=`${l}*?${c}?`},function(e,t,r){var n=r(245),i=/[\\^$.*+?()[\]{}|]/g,s=RegExp(i.source);e.exports=function(e){return(e=n(e))&&s.test(e)?e.replace(i,"\\$&"):e}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validatePluginObject=function(e){const t={type:"root",source:"plugin"};return Object.keys(e).forEach(r=>{const n=i[r],s={type:"option",name:r,parent:t};if(!n)throw new Error(`.${r} is not a valid Plugin property`);n(s,e[r])}),e};var n=r(345);const i={name:n.assertString,manipulateOptions:n.assertFunction,pre:n.assertFunction,post:n.assertFunction,inherits:n.assertFunction,visitor:function(e,t){const r=(0,n.assertObject)(e,t);if(r&&(Object.keys(r).forEach(e=>function(e,t){if(t&&"object"===typeof t)Object.keys(t).forEach(t=>{if("enter"!==t&&"exit"!==t)throw new Error(`.visitor["${e}"] may only have .enter and/or .exit handlers.`)});else if("function"!==typeof t)throw new Error(`.visitor["${e}"] must be a function`);return t}(e,r[e])),r.enter||r.exit))throw new Error(`.${e} cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.`);return r},parserOverride:n.assertFunction,generatorOverride:n.assertFunction}},function(e,t,r){"use strict";function n(){const e=(t=r(335))&&t.__esModule?t:{default:t};var t;return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return{version:i.version,cache:e.simple(),env:t=>e.using(e=>"undefined"===typeof t?e.envName:"function"===typeof t?(0,s.assertSimpleType)(t(e.envName)):(Array.isArray(t)||(t=[t]),t.some(t=>{if("string"!==typeof t)throw new Error("Unexpected non-string value");return t===e.envName}))),async:()=>!1,caller:t=>e.using(e=>(0,s.assertSimpleType)(t(e.caller))),assertVersion:a,tokTypes:void 0}};var i=r(205),s=r(210);function a(e){if("number"===typeof e){if(!Number.isInteger(e))throw new Error("Expected string or integer value.");e=`^${e}.0.0-0`}if("string"!==typeof e)throw new Error("Expected string or integer value.");if(n().default.satisfies(i.version,e))return;const t=Error.stackTraceLimit;"number"===typeof t&&t<25&&(Error.stackTraceLimit=25);const r=new Error(`Requires Babel "${e}", but was loaded with "${i.version}". `+'If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn\'t mention "@babel/core" or "babel-core" to see what is calling Babel.');throw"number"===typeof t&&(Error.stackTraceLimit=t),Object.assign(r,{code:"BABEL_VERSION_UNSUPPORTED",version:i.version,range:e})}},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.transformSync=o,t.transformAsync=function(e,t){return new Promise((r,n)=>{a(e,t,(e,t)=>{null==e?r(t):n(e)})})},t.transform=void 0;var n,i=(n=r(179))&&n.__esModule?n:{default:n},s=r(347);const a=function(t,r,n){if("function"===typeof r&&(n=r,r=void 0),void 0===n)return o(t,r);const a=n;e.nextTick(()=>{let e;try{if(e=(0,i.default)(r),null===e)return a(null,null)}catch(n){return a(n)}(0,s.runAsync)(e,t,null,a)})};function o(e,t){const r=(0,i.default)(t);return null===r?null:(0,s.runSync)(r,e)}t.transform=a}).call(this,r(149))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class{constructor(e,t,r){this._map=new Map,this.key=t,this.file=e,this.opts=r||{},this.cwd=e.opts.cwd,this.filename=e.opts.filename}set(e,t){this._map.set(e,t)}get(e){return this._map.get(e)}availableHelper(e,t){return this.file.availableHelper(e,t)}addHelper(e){return this.file.addHelper(e)}addImport(){return this.file.addImport()}getModuleName(){return this.file.getModuleName()}buildCodeFrameError(e,t,r){return this.file.buildCodeFrameError(e,t,r)}}},function(e,t,r){"use strict";function n(){const e=s(r(609));return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){if(!a){const e=(0,i.default)({babelrc:!1,configFile:!1,plugins:[o]});if(a=e?e.passes[0][0]:void 0,!a)throw new Error("Assertion failure")}return a};var i=s(r(179));function s(e){return e&&e.__esModule?e:{default:e}}let a;const o={name:"internal.blockHoist",visitor:{Block:{exit({node:e}){let t=!1;for(let r=0;r<e.body.length;r++){const n=e.body[r];if(n&&null!=n._blockHoist){t=!0;break}}t&&(e.body=(0,n().default)(e.body,(function(e){let t=e&&e._blockHoist;return null==t&&(t=1),!0===t&&(t=2),-1*t})))}}}}},function(e,t,r){var n=r(610),i=r(612),s=r(324),a=r(244),o=s((function(e,t){if(null==e)return[];var r=t.length;return r>1&&a(e,t[0],t[1])?t=[]:r>2&&a(t[0],t[1],t[2])&&(t=[t[0]]),i(e,n(t,1),[])}));e.exports=o},function(e,t,r){var n=r(228),i=r(611);e.exports=function e(t,r,s,a,o){var u=-1,l=t.length;for(s||(s=i),o||(o=[]);++u<l;){var c=t[u];r>0&&s(c)?r>1?e(c,r-1,s,a,o):n(o,c):a||(o[o.length]=c)}return o}},function(e,t,r){var n=r(168),i=r(221),s=r(136),a=n?n.isConcatSpreadable:void 0;e.exports=function(e){return s(e)||i(e)||!!(a&&e&&e[a])}},function(e,t,r){var n=r(242),i=r(613),s=r(632),a=r(638),o=r(174),u=r(639),l=r(206);e.exports=function(e,t,r){var c=-1;t=n(t.length?t:[l],o(i));var p=s(e,(function(e,r,i){return{criteria:n(t,(function(t){return t(e)})),index:++c,value:e}}));return a(p,(function(e,t){return u(e,t,r)}))}},function(e,t,r){var n=r(614),i=r(622),s=r(206),a=r(136),o=r(629);e.exports=function(e){return"function"==typeof e?e:null==e?s:"object"==typeof e?a(e)?i(e[0],e[1]):n(e):o(e)}},function(e,t,r){var n=r(615),i=r(621),s=r(351);e.exports=function(e){var t=i(e);return 1==t.length&&t[0][2]?s(t[0][0],t[0][1]):function(r){return r===e||n(r,e,t)}}},function(e,t,r){var n=r(218),i=r(348);e.exports=function(e,t,r,s){var a=r.length,o=a,u=!s;if(null==e)return!o;for(e=Object(e);a--;){var l=r[a];if(u&&l[2]?l[1]!==e[l[0]]:!(l[0]in e))return!1}for(;++a<o;){var c=(l=r[a])[0],p=e[c],h=l[1];if(u&&l[2]){if(void 0===p&&!(c in e))return!1}else{var f=new n;if(s)var d=s(p,h,c,e,t,f);if(!(void 0===d?i(h,p,3,s,f):d))return!1}}return!0}},function(e,t,r){var n=r(218),i=r(349),s=r(618),a=r(620),o=r(200),u=r(136),l=r(222),c=r(285),p="[object Object]",h=Object.prototype.hasOwnProperty;e.exports=function(e,t,r,f,d,m){var y=u(e),g=u(t),v=y?"[object Array]":o(e),b=g?"[object Array]":o(t),E=(v="[object Arguments]"==v?p:v)==p,x=(b="[object Arguments]"==b?p:b)==p,A=v==b;if(A&&l(e)){if(!l(t))return!1;y=!0,E=!1}if(A&&!E)return m||(m=new n),y||c(e)?i(e,t,r,f,d,m):s(e,t,v,r,f,d,m);if(!(1&r)){var T=E&&h.call(e,"__wrapped__"),S=x&&h.call(t,"__wrapped__");if(T||S){var w=T?e.value():e,P=S?t.value():t;return m||(m=new n),d(w,P,r,f,m)}}return!!A&&(m||(m=new n),a(e,t,r,f,d,m))}},function(e,t){e.exports=function(e,t){for(var r=-1,n=null==e?0:e.length;++r<n;)if(t(e[r],r,e))return!0;return!1}},function(e,t,r){var n=r(168),i=r(292),s=r(173),a=r(349),o=r(619),u=r(237),l=n?n.prototype:void 0,c=l?l.valueOf:void 0;e.exports=function(e,t,r,n,l,p,h){switch(r){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return!(e.byteLength!=t.byteLength||!p(new i(e),new i(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return s(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var f=o;case"[object Set]":var d=1&n;if(f||(f=u),e.size!=t.size&&!d)return!1;var m=h.get(e);if(m)return m==t;n|=2,h.set(e,t);var y=a(f(e),f(t),n,l,p,h);return h.delete(e),y;case"[object Symbol]":if(c)return c.call(e)==c.call(t)}return!1}},function(e,t){e.exports=function(e){var t=-1,r=Array(e.size);return e.forEach((function(e,n){r[++t]=[n,e]})),r}},function(e,t,r){var n=r(289),i=Object.prototype.hasOwnProperty;e.exports=function(e,t,r,s,a,o){var u=1&r,l=n(e),c=l.length;if(c!=n(t).length&&!u)return!1;for(var p=c;p--;){var h=l[p];if(!(u?h in t:i.call(t,h)))return!1}var f=o.get(e);if(f&&o.get(t))return f==t;var d=!0;o.set(e,t),o.set(t,e);for(var m=u;++p<c;){var y=e[h=l[p]],g=t[h];if(s)var v=u?s(g,y,h,t,e,o):s(y,g,h,e,t,o);if(!(void 0===v?y===g||a(y,g,r,s,o):v)){d=!1;break}m||(m="constructor"==h)}if(d&&!m){var b=e.constructor,E=t.constructor;b!=E&&"constructor"in e&&"constructor"in t&&!("function"==typeof b&&b instanceof b&&"function"==typeof E&&E instanceof E)&&(d=!1)}return o.delete(e),o.delete(t),d}},function(e,t,r){var n=r(350),i=r(169);e.exports=function(e){for(var t=i(e),r=t.length;r--;){var s=t[r],a=e[s];t[r]=[s,a,n(a)]}return t}},function(e,t,r){var n=r(348),i=r(623),s=r(627),a=r(249),o=r(350),u=r(351),l=r(211);e.exports=function(e,t){return a(e)&&o(t)?u(l(e),t):function(r){var a=i(r,e);return void 0===a&&a===t?s(r,e):n(t,a,3)}}},function(e,t,r){var n=r(352);e.exports=function(e,t,r){var i=null==e?void 0:n(e,t);return void 0===i?r:i}},function(e,t,r){var n=r(625),i=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,s=/\\(\\)?/g,a=n((function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(i,(function(e,r,n,i){t.push(n?i.replace(s,"$1"):r||e)})),t}));e.exports=a},function(e,t,r){var n=r(626);e.exports=function(e){var t=n(e,(function(e){return 500===r.size&&r.clear(),e})),r=t.cache;return t}},function(e,t,r){var n=r(220);function i(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var r=function(){var n=arguments,i=t?t.apply(this,n):n[0],s=r.cache;if(s.has(i))return s.get(i);var a=e.apply(this,n);return r.cache=s.set(i,a)||s,a};return r.cache=new(i.Cache||n),r}i.Cache=n,e.exports=i},function(e,t,r){var n=r(628),i=r(354);e.exports=function(e,t){return null!=e&&i(e,t,n)}},function(e,t){e.exports=function(e,t){return null!=e&&t in Object(e)}},function(e,t,r){var n=r(630),i=r(631),s=r(249),a=r(211);e.exports=function(e){return s(e)?n(a(e)):i(e)}},function(e,t){e.exports=function(e){return function(t){return null==t?void 0:t[e]}}},function(e,t,r){var n=r(352);e.exports=function(e){return function(t){return n(t,e)}}},function(e,t,r){var n=r(633),i=r(170);e.exports=function(e,t){var r=-1,s=i(e)?Array(e.length):[];return n(e,(function(e,n,i){s[++r]=t(e,n,i)})),s}},function(e,t,r){var n=r(634),i=r(637)(n);e.exports=i},function(e,t,r){var n=r(635),i=r(169);e.exports=function(e,t){return e&&n(e,t,i)}},function(e,t,r){var n=r(636)();e.exports=n},function(e,t){e.exports=function(e){return function(t,r,n){for(var i=-1,s=Object(t),a=n(t),o=a.length;o--;){var u=a[e?o:++i];if(!1===r(s[u],u,s))break}return t}}},function(e,t,r){var n=r(170);e.exports=function(e,t){return function(r,i){if(null==r)return r;if(!n(r))return e(r,i);for(var s=r.length,a=t?s:-1,o=Object(r);(t?a--:++a<s)&&!1!==i(o[a],a,o););return r}}},function(e,t){e.exports=function(e,t){var r=e.length;for(e.sort(t);r--;)e[r]=e[r].value;return e}},function(e,t,r){var n=r(640);e.exports=function(e,t,r){for(var i=-1,s=e.criteria,a=t.criteria,o=s.length,u=r.length;++i<o;){var l=n(s[i],a[i]);if(l)return i>=u?l:l*("desc"==r[i]?-1:1)}return e.index-t.index}},function(e,t,r){var n=r(177);e.exports=function(e,t){if(e!==t){var r=void 0!==e,i=null===e,s=e===e,a=n(e),o=void 0!==t,u=null===t,l=t===t,c=n(t);if(!u&&!c&&!a&&e>t||a&&o&&l&&!u&&!c||i&&o&&l||!r&&l||!s)return 1;if(!i&&!a&&!c&&e<t||c&&r&&s&&!i&&!a||u&&r&&s||!o&&s||!l)return-1}return 0}},function(e,t){},function(e,t,r){var n=r(277);e.exports=function(e){return n(e,5)}},,function(e,t,r){var n=r(334),i=n.Buffer;function s(e,t){for(var r in e)t[r]=e[r]}function a(e,t,r){return i(e,t,r)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?e.exports=n:(s(n,t),t.Buffer=a),s(i,a),a.from=function(e,t,r){if("number"===typeof e)throw new TypeError("Argument must not be a number");return i(e,t,r)},a.alloc=function(e,t,r){if("number"!==typeof e)throw new TypeError("Argument must be a number");var n=i(e);return void 0!==t?"string"===typeof r?n.fill(t,r):n.fill(t):n.fill(0),n},a.allocUnsafe=function(e){if("number"!==typeof e)throw new TypeError("Argument must be a number");return i(e)},a.allocUnsafeSlow=function(e){if("number"!==typeof e)throw new TypeError("Argument must be a number");return n.SlowBuffer(e)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){let s=`Support for the experimental syntax '${e}' isn't currently enabled `+`(${t.line}:${t.column+1}):\n\n`+r;const a=n[e];if(a){const e=a.syntax,t=a.transform;if(e)if(t){const e=i(t);s+=`\n\nAdd ${e} to the 'plugins' section of your Babel config `+"to enable transformation."}else{const t=i(e);s+=`\n\nAdd ${t} to the 'plugins' section of your Babel config `+"to enable parsing."}}return s};const n={classProperties:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-class-properties",url:"https://git.io/vb4SL"}},decorators:{syntax:{name:"@babel/plugin-syntax-decorators",url:"https://git.io/vb4y9"},transform:{name:"@babel/plugin-proposal-decorators",url:"https://git.io/vb4ST"}},doExpressions:{syntax:{name:"@babel/plugin-syntax-do-expressions",url:"https://git.io/vb4yh"},transform:{name:"@babel/plugin-proposal-do-expressions",url:"https://git.io/vb4S3"}},dynamicImport:{syntax:{name:"@babel/plugin-syntax-dynamic-import",url:"https://git.io/vb4Sv"}},exportDefaultFrom:{syntax:{name:"@babel/plugin-syntax-export-default-from",url:"https://git.io/vb4SO"},transform:{name:"@babel/plugin-proposal-export-default-from",url:"https://git.io/vb4yH"}},exportNamespaceFrom:{syntax:{name:"@babel/plugin-syntax-export-namespace-from",url:"https://git.io/vb4Sf"},transform:{name:"@babel/plugin-proposal-export-namespace-from",url:"https://git.io/vb4SG"}},flow:{syntax:{name:"@babel/plugin-syntax-flow",url:"https://git.io/vb4yb"},transform:{name:"@babel/plugin-transform-flow-strip-types",url:"https://git.io/vb49g"}},functionBind:{syntax:{name:"@babel/plugin-syntax-function-bind",url:"https://git.io/vb4y7"},transform:{name:"@babel/plugin-proposal-function-bind",url:"https://git.io/vb4St"}},functionSent:{syntax:{name:"@babel/plugin-syntax-function-sent",url:"https://git.io/vb4yN"},transform:{name:"@babel/plugin-proposal-function-sent",url:"https://git.io/vb4SZ"}},importMeta:{syntax:{name:"@babel/plugin-syntax-import-meta",url:"https://git.io/vbKK6"}},jsx:{syntax:{name:"@babel/plugin-syntax-jsx",url:"https://git.io/vb4yA"},transform:{name:"@babel/plugin-transform-react-jsx",url:"https://git.io/vb4yd"}},logicalAssignment:{syntax:{name:"@babel/plugin-syntax-logical-assignment-operators",url:"https://git.io/vAlBp"},transform:{name:"@babel/plugin-proposal-logical-assignment-operators",url:"https://git.io/vAlRe"}},nullishCoalescingOperator:{syntax:{name:"@babel/plugin-syntax-nullish-coalescing-operator",url:"https://git.io/vb4yx"},transform:{name:"@babel/plugin-proposal-nullish-coalescing-operator",url:"https://git.io/vb4Se"}},numericSeparator:{syntax:{name:"@babel/plugin-syntax-numeric-separator",url:"https://git.io/vb4Sq"},transform:{name:"@babel/plugin-proposal-numeric-separator",url:"https://git.io/vb4yS"}},optionalChaining:{syntax:{name:"@babel/plugin-syntax-optional-chaining",url:"https://git.io/vb4Sc"},transform:{name:"@babel/plugin-proposal-optional-chaining",url:"https://git.io/vb4Sk"}},pipelineOperator:{syntax:{name:"@babel/plugin-syntax-pipeline-operator",url:"https://git.io/vb4yj"},transform:{name:"@babel/plugin-proposal-pipeline-operator",url:"https://git.io/vb4SU"}},throwExpressions:{syntax:{name:"@babel/plugin-syntax-throw-expressions",url:"https://git.io/vb4SJ"},transform:{name:"@babel/plugin-proposal-throw-expressions",url:"https://git.io/vb4yF"}},typescript:{syntax:{name:"@babel/plugin-syntax-typescript",url:"https://git.io/vb4SC"},transform:{name:"@babel/plugin-transform-typescript",url:"https://git.io/vb4Sm"}},asyncGenerators:{syntax:{name:"@babel/plugin-syntax-async-generators",url:"https://git.io/vb4SY"},transform:{name:"@babel/plugin-proposal-async-generator-functions",url:"https://git.io/vb4yp"}},objectRestSpread:{syntax:{name:"@babel/plugin-syntax-object-rest-spread",url:"https://git.io/vb4y5"},transform:{name:"@babel/plugin-proposal-object-rest-spread",url:"https://git.io/vb4Ss"}},optionalCatchBinding:{syntax:{name:"@babel/plugin-syntax-optional-catch-binding",url:"https://git.io/vb4Sn"},transform:{name:"@babel/plugin-proposal-optional-catch-binding",url:"https://git.io/vb4SI"}}},i=({name:e,url:t})=>`${e} (${t})`},function(e,t,r){"use strict";function n(){const e=a(r(357));return n=function(){return e},e}function i(){const e=a(r(336));return i=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const r=t.opts,a=t.ast,o=t.code,u=t.inputMap,l=[];for(const n of e)for(const e of n){const t=e.generatorOverride;if(t){const e=t(a,r.generatorOpts,o,i().default);void 0!==e&&l.push(e)}}let c;if(0===l.length)c=(0,i().default)(a,r.generatorOpts,o);else{if(1!==l.length)throw new Error("More than one plugin attempted to override codegen.");if(c=l[0],"function"===typeof c.then)throw new Error("You appear to be using an async codegen plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.")}let p=c,h=p.code,f=p.map;f&&u&&(f=(0,s.default)(u.toObject(),f));"inline"!==r.sourceMaps&&"both"!==r.sourceMaps||(h+="\n"+n().default.fromObject(f).toComment());"inline"===r.sourceMaps&&(f=null);return{outputCode:h,outputMap:f}};var s=a(r(647));function a(e){return e&&e.__esModule?e:{default:e}}},function(e,t,r){"use strict";function n(){const e=(t=r(246))&&t.__esModule?t:{default:t};var t;return n=function(){return e},e}function i(e){return`${e.line}/${e.columnStart}`}function s(e){const t=new(n().default.SourceMapConsumer)(Object.assign({},e,{sourceRoot:null})),r=new Map,i=new Map;let s=null;return t.computeColumnSpans(),t.eachMapping(e=>{if(null===e.originalLine)return;let n=r.get(e.source);n||(n={path:e.source,content:t.sourceContentFor(e.source,!0)},r.set(e.source,n));let a=i.get(n);a||(a={source:n,mappings:[]},i.set(n,a));const o={line:e.originalLine,columnStart:e.originalColumn,columnEnd:1/0,name:e.name};s&&s.source===n&&s.mapping.line===e.originalLine&&(s.mapping.columnEnd=e.originalColumn),s={source:n,mapping:o},a.mappings.push({original:o,generated:t.allGeneratedPositionsFor({source:e.source,line:e.originalLine,column:e.originalColumn}).map(e=>({line:e.line,columnStart:e.column,columnEnd:e.lastColumn+1}))})},null,n().default.SourceMapConsumer.ORIGINAL_ORDER),{file:e.file,sourceRoot:e.sourceRoot,sources:Array.from(i.values())}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const r=s(e),a=s(t),o=new(n().default.SourceMapGenerator);for(const n of r.sources){const e=n.source;"string"===typeof e.content&&o.setSourceContent(e.path,e.content)}if(1===a.sources.length){const e=a.sources[0],t=new Map;!function(e,t){for(const r of e.sources){const e=r.source,n=r.mappings;for(const r of n){const n=r.original,i=r.generated;for(const r of i)t(r,n,e)}}}(r,(r,n,s)=>{!function(e,t,r){const n=function({mappings:e},{line:t,columnStart:r,columnEnd:n}){return function(e,t){const r=function(e,t){let r=0,n=e.length;for(;r<n;){const i=Math.floor((r+n)/2),s=e[i],a=t(s);if(0===a){r=i;break}a>=0?n=i:r=i+1}let i=r;if(i<e.length){for(;i>=0&&t(e[i])>=0;)i--;return i+1}return i}(e,t),n=[];for(let i=r;i<e.length&&0===t(e[i]);i++)n.push(e[i]);return n}(e,({original:e})=>t>e.line?-1:t<e.line?1:r>=e.columnEnd?-1:n<=e.columnStart?1:0)}(e,t);for(const i of n){const e=i.generated;for(const t of e)r(t)}}(e,r,e=>{const r=i(e);t.has(r)||(t.set(r,e),o.addMapping({source:s.path,original:{line:n.line,column:n.columnStart},generated:{line:e.line,column:e.columnStart},name:n.name}))})});for(const r of t.values()){if(r.columnEnd===1/0)continue;const e={line:r.line,columnStart:r.columnEnd},n=i(e);t.has(n)||o.addMapping({generated:{line:e.line,column:e.columnStart}})}}const u=o.toJSON();"string"===typeof r.sourceRoot&&(u.sourceRoot=r.sourceRoot);return u}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.transformFileSync=function(){throw new Error("Transforming files is not supported in browsers")},t.transformFileAsync=function(){return Promise.reject(new Error("Transforming files is not supported in browsers"))},t.transformFile=void 0;t.transformFile=function(e,t,r){"function"===typeof t&&(r=t),r(new Error("Transforming files is not supported in browsers"),null)}},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.transformFromAstSync=o,t.transformFromAstAsync=function(e,t,r){return new Promise((n,i)=>{a(e,t,r,(e,t)=>{null==e?n(t):i(e)})})},t.transformFromAst=void 0;var n,i=(n=r(179))&&n.__esModule?n:{default:n},s=r(347);const a=function(t,r,n,a){if("function"===typeof n&&(a=n,n=void 0),void 0===a)return o(t,r,n);const u=a;e.nextTick(()=>{let e;try{if(e=(0,i.default)(n),null===e)return u(null,null)}catch(a){return u(a)}if(!t)return u(new Error("No AST given"));(0,s.runAsync)(e,r,t,u)})};function o(e,t,r){const n=(0,i.default)(r);if(null===n)return null;if(!e)throw new Error("No AST given");return(0,s.runSync)(n,t,e)}t.transformFromAst=a}).call(this,r(149))},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.parseSync=u,t.parseAsync=function(e,t){return new Promise((r,n)=>{o(e,t,(e,t)=>{null==e?r(t):n(e)})})},t.parse=void 0;var n=a(r(179)),i=a(r(356)),s=a(r(355));function a(e){return e&&e.__esModule?e:{default:e}}const o=function(t,r,a){if("function"===typeof r&&(a=r,r=void 0),void 0===a)return u(t,r);if(null===(0,n.default)(r))return null;const o=a;e.nextTick(()=>{let e=null;try{const a=(0,n.default)(r);if(null===a)return o(null,null);e=(0,i.default)(a.passes,(0,s.default)(a),t).ast}catch(a){return o(a)}o(null,e)})};function u(e,t){const r=(0,n.default)(t);return null===r?null:(0,i.default)(r.passes,(0,s.default)(r),e).ast}t.parse=o}).call(this,r(149))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,u){const l={parent:void 0,scope:void 0,node:void 0,path:void 0,file:void 0,classId:void 0,classRef:void 0,superName:void 0,superReturns:[],isDerived:!1,extendsNative:!1,construct:void 0,constructorBody:void 0,userConstructor:void 0,userConstructorPath:void 0,hasConstructor:!1,instancePropBody:[],instancePropRefs:{},staticPropBody:[],body:[],superThises:[],pushedConstructor:!1,pushedInherits:!1,protoAlias:null,isLoose:!1,hasInstanceDescriptors:!1,hasStaticDescriptors:!1,instanceMutatorMap:{},staticMutatorMap:{}},c=e=>{Object.assign(l,e)},h=o.traverse.visitors.merge([i.environmentVisitor,{ThisExpression(e){l.superThises.push(e)}}]);function f(){if(function(){let e=!1;const t=l.path.get("body.body");for(const i of t)if(e=i.equals("kind","constructor"),e)break;if(e)return;let r,n;if(l.isDerived){const e=o.template.expression.ast`
        (function () {
          super(...arguments);
        })
      `;r=e.params,n=e.body}else r=[],n=o.types.blockStatement([]);l.path.get("body").unshiftContainer("body",o.types.classMethod("constructor",o.types.identifier("constructor"),r,n))}(),function(){const e=l.path.get("body.body");for(const t of e){const e=t.node;if(t.isClassProperty())throw t.buildCodeFrameError("Missing class properties transform.");if(e.decorators)throw t.buildCodeFrameError("Method has decorators, put the decorator plugin before the classes one.");if(o.types.isClassMethod(e)){const r="constructor"===e.kind;new i.default({methodPath:t,objectRef:l.classRef,superRef:l.superName,isLoose:l.isLoose,file:l.file}).replace();const n=[];t.traverse(o.traverse.visitors.merge([i.environmentVisitor,{ReturnStatement(e){e.getFunctionParent().isArrowFunctionExpression()||n.push(e)}}])),r?g(n,e,t):y(e,t)}}}(),function(){if(!l.isDerived)return;const e=l.userConstructorPath,t=e.get("body");e.traverse(h);let r=function(){const t=e.scope.generateDeclaredUidIdentifier("this");return r=()=>o.types.cloneNode(t),t};for(const i of l.superThises){const e=i.node;i.parentPath.isMemberExpression({object:e})?i.replaceWith(r()):i.replaceWith(o.types.callExpression(l.file.addHelper("assertThisInitialized"),[r()]))}const n=new Set;e.traverse(o.traverse.visitors.merge([i.environmentVisitor,{Super(e){const t=e.node,r=e.parentPath;r.isCallExpression({callee:t})&&n.add(r)}}]));let s,a=!!n.size;for(const i of n)m(i,l.superName,r,t),a&&i.find((function(t){return t===e||(t.isLoop()||t.isConditional()||t.isArrowFunctionExpression()?(a=!1,!0):void 0)}));s=l.isLoose?e=>{const t=o.types.callExpression(l.file.addHelper("assertThisInitialized"),[r()]);return e?o.types.logicalExpression("||",e,t):t}:e=>o.types.callExpression(l.file.addHelper("possibleConstructorReturn"),[r()].concat(e||[]));const u=t.get("body");u.length&&u.pop().isReturnStatement()||t.pushContainer("body",o.types.returnStatement(a?r():s()));for(const i of l.superReturns)i.get("argument").replaceWith(s(i.node.argument))}(),l.userConstructor){const e=l.constructorBody,t=l.userConstructor,r=l.construct;e.body=e.body.concat(t.body.body),o.types.inherits(r,t),o.types.inherits(e,t.body)}d()}function d(){v();const e=l.body;let t,r;if(l.hasInstanceDescriptors&&(t=a.toClassObject(l.instanceMutatorMap)),l.hasStaticDescriptors&&(r=a.toClassObject(l.staticMutatorMap)),t||r){t&&(t=a.toComputedObjectFromClass(t)),r&&(r=a.toComputedObjectFromClass(r));let n=[o.types.cloneNode(l.classRef),o.types.nullLiteral(),o.types.nullLiteral()];t&&(n[1]=t),r&&(n[2]=r);let i=0;for(let e=0;e<n.length;e++)o.types.isNullLiteral(n[e])||(i=e);n=n.slice(0,i+1),e.push(o.types.expressionStatement(o.types.callExpression(l.file.addHelper("createClass"),n)))}c({hasInstanceDescriptors:!1,hasStaticDescriptors:!1,instanceMutatorMap:{},staticMutatorMap:{}})}function m(e,t,r,n){let i,a=e.node;l.isLoose?(a.arguments.unshift(o.types.thisExpression()),2===a.arguments.length&&o.types.isSpreadElement(a.arguments[1])&&o.types.isIdentifier(a.arguments[1].argument,{name:"arguments"})?(a.arguments[1]=a.arguments[1].argument,a.callee=o.types.memberExpression(o.types.cloneNode(t),o.types.identifier("apply"))):a.callee=o.types.memberExpression(o.types.cloneNode(t),o.types.identifier("call")),i=o.types.logicalExpression("||",a,o.types.thisExpression())):(a=(0,s.default)(o.types.callExpression(l.file.addHelper("getPrototypeOf"),[o.types.cloneNode(l.classRef)]),o.types.thisExpression(),a.arguments),i=o.types.callExpression(l.file.addHelper("possibleConstructorReturn"),[o.types.thisExpression(),a])),e.parentPath.isExpressionStatement()&&e.parentPath.container===n.node.body&&n.node.body.length-1===e.parentPath.key?(l.superThises.length&&(i=o.types.assignmentExpression("=",r(),i)),e.parentPath.replaceWith(o.types.returnStatement(i))):e.replaceWith(o.types.assignmentExpression("=",r(),i))}function y(e,t){const r=t?t.scope:l.scope;"method"===e.kind&&function(e,t){if(l.isLoose&&!e.decorators){let r=l.classRef;e.static||(!function(){if(null===l.protoAlias){c({protoAlias:l.scope.generateUidIdentifier("proto")});const e=o.types.memberExpression(l.classRef,o.types.identifier("prototype")),t=o.types.variableDeclaration("var",[o.types.variableDeclarator(l.protoAlias,e)]);l.body.push(t)}}(),r=l.protoAlias);const i=o.types.memberExpression(o.types.cloneNode(r),e.key,e.computed||o.types.isLiteral(e.key));let s=o.types.functionExpression(null,e.params,e.body,e.generator,e.async);o.types.inherits(s,e);const a=o.types.toComputedKey(e,e.key);o.types.isStringLiteral(a)&&(s=(0,n.default)({node:s,id:a,scope:t}));const u=o.types.expressionStatement(o.types.assignmentExpression("=",i,s));return o.types.inheritsComments(u,e),l.body.push(u),!0}return!1}(e,r)||function(e,t,r="value",n){let i;e.static?(c({hasStaticDescriptors:!0}),i=l.staticMutatorMap):(c({hasInstanceDescriptors:!0}),i=l.instanceMutatorMap);const s=a.push(i,e,r,l.file,n);t&&(s.enumerable=o.types.booleanLiteral(!0))}(e,!1,null,r)}function g(e,t,r){r.scope.hasOwnBinding(l.classRef.name)&&r.scope.rename(l.classRef.name),c({userConstructorPath:r,userConstructor:t,hasConstructor:!0,superReturns:e});const n=l.construct;o.types.inheritsComments(n,t),n.params=t.params,o.types.inherits(n.body,t.body),n.body.directives=t.body.directives,function(){if(l.pushedConstructor)return;l.pushedConstructor=!0,(l.hasInstanceDescriptors||l.hasStaticDescriptors)&&d();l.body.push(l.construct),v()}()}function v(){l.isDerived&&!l.pushedInherits&&(c({pushedInherits:!0}),l.body.unshift(o.types.expressionStatement(o.types.callExpression(l.file.addHelper(l.isLoose?"inheritsLoose":"inherits"),[o.types.cloneNode(l.classRef),o.types.cloneNode(l.superName)]))))}return function(e,t,r,n){c({parent:e.parent,scope:e.scope,node:e.node,path:e,file:t,isLoose:n}),c({classId:l.node.id,classRef:l.node.id?o.types.identifier(l.node.id.name):l.scope.generateUidIdentifier("class"),superName:l.node.superClass,isDerived:!!l.node.superClass,constructorBody:o.types.blockStatement([])}),c({extendsNative:l.isDerived&&r.has(l.superName.name)&&!l.scope.hasBinding(l.superName.name,!0)});const i=l.classRef,s=l.node,a=l.constructorBody;c({construct:p(i,a,s)});let u=l.body;const h=function(){const e=l.superName,t=[],r=[];if(l.isDerived){const n=l.extendsNative?o.types.callExpression(l.file.addHelper("wrapNativeSuper"),[o.types.cloneNode(e)]):o.types.cloneNode(e),i=l.scope.generateUidIdentifierBasedOnNode(e);t.push(i),r.push(n),c({superName:o.types.cloneNode(i)})}return{closureParams:t,closureArgs:r}}(),d=h.closureParams,m=h.closureArgs;f(),l.isLoose||a.body.unshift(o.types.expressionStatement(o.types.callExpression(l.file.addHelper("classCallCheck"),[o.types.thisExpression(),o.types.cloneNode(l.classRef)]))),u=u.concat(l.staticPropBody.map(e=>e(o.types.cloneNode(l.classRef))));const y=e.isInStrictMode();let g=l.classId&&1===u.length;if(g&&!y)for(const c of l.construct.params)if(!o.types.isIdentifier(c)){g=!1;break}const v=g?u[0].body.directives:[];if(y||v.push(o.types.directive(o.types.directiveLiteral("use strict"))),g)return o.types.toExpression(u[0]);u.push(o.types.returnStatement(o.types.cloneNode(l.classRef)));const b=o.types.arrowFunctionExpression(d,o.types.blockStatement(u,v));return o.types.callExpression(b,m)}(e,t,r,u)};var n=c(r(202)),i=l(r(652)),s=c(r(358)),a=l(r(654)),o=r(205);function u(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function l(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}return r.default=e,t&&t.set(e,r),r}function c(e){return e&&e.__esModule?e:{default:e}}function p(e,t,r){const n=o.types.functionDeclaration(o.types.cloneNode(e),[],t);return o.types.inherits(n,r),n}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.environmentVisitor=void 0;var n=u(r(146)),i=u(r(653)),s=u(r(358)),a=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=o();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(106));function o(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}function u(e){return e&&e.__esModule?e:{default:e}}function l(e,t,r,n){e=a.cloneNode(e);const i=t||n?e:a.memberExpression(e,a.identifier("prototype"));return a.callExpression(r.addHelper("getPrototypeOf"),[i])}const c={TypeAnnotation(e){e.skip()},Function(e){e.isMethod()||e.isArrowFunctionExpression()||e.skip()},"Method|ClassProperty|ClassPrivateProperty"(e){!function(e){if(!e.node.computed)return void e.skip();const t=a.VISITOR_KEYS[e.type];for(const r of t)"key"!==r&&e.skipKey(r)}(e)}};t.environmentVisitor=c;const p=n.default.visitors.merge([c,{Super(e,t){const r=e.node,n=e.parentPath;n.isMemberExpression({object:r})&&t.handle(n)}}]),h={memoise(e,t){const r=e.scope,n=e.node,i=n.computed,s=n.property;if(!i)return;const a=r.maybeGenerateMemoised(s);a&&this.memoiser.set(s,a,t)},prop(e){const t=e.node,r=t.computed,n=t.property;return this.memoiser.has(n)?a.cloneNode(this.memoiser.get(n)):r?a.cloneNode(n):a.stringLiteral(n.name)},get(e){return a.callExpression(this.file.addHelper("get"),[l(this.getObjectRef(),this.isStatic,this.file,this.isPrivateMethod),this.prop(e),a.thisExpression()])},set(e,t){return a.callExpression(this.file.addHelper("set"),[l(this.getObjectRef(),this.isStatic,this.file,this.isPrivateMethod),this.prop(e),t,a.thisExpression(),a.booleanLiteral(e.isInStrictMode())])},destructureSet(e){throw e.buildCodeFrameError("Destructuring to a super field is not supported yet.")},call(e,t){return(0,s.default)(this.get(e),a.thisExpression(),t)}},f=Object.assign({},h,{prop(e){const t=e.node.property;return this.memoiser.has(t)?a.cloneNode(this.memoiser.get(t)):a.cloneNode(t)},get(e){const t=this.isStatic,r=this.superRef,n=e.node.computed,i=this.prop(e);let s;return s=t?r?a.cloneNode(r):a.memberExpression(a.identifier("Function"),a.identifier("prototype")):r?a.memberExpression(a.cloneNode(r),a.identifier("prototype")):a.memberExpression(a.identifier("Object"),a.identifier("prototype")),a.memberExpression(s,i,n)},set(e,t){const r=e.node.computed,n=this.prop(e);return a.assignmentExpression("=",a.memberExpression(a.thisExpression(),n,r),t)},destructureSet(e){const t=e.node.computed,r=this.prop(e);return a.memberExpression(a.thisExpression(),r,t)}});t.default=class{constructor(e){const t=e.methodPath;this.methodPath=t,this.isStatic=t.isObjectMethod()||t.node.static,this.isPrivateMethod=t.isPrivate()&&t.isMethod(),this.file=e.file,this.superRef=e.superRef,this.isLoose=e.isLoose,this.opts=e}getObjectRef(){return a.cloneNode(this.opts.objectRef||this.opts.getObjectRef())}replace(){const e=this.isLoose?f:h;(0,i.default)(this.methodPath,p,Object.assign({file:this.file,isStatic:this.isStatic,isPrivateMethod:this.isPrivateMethod,getObjectRef:this.getObjectRef.bind(this),superRef:this.superRef},e))}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){e.traverse(t,Object.assign({},a,{},r,{memoiser:new s}))};var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var a=n?Object.getOwnPropertyDescriptor(e,s):null;a&&(a.get||a.set)?Object.defineProperty(r,s,a):r[s]=e[s]}r.default=e,t&&t.set(e,r);return r}(r(106));function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}class s{constructor(){this._map=new WeakMap}has(e){return this._map.has(e)}get(e){if(!this.has(e))return;const t=this._map.get(e),r=t.value;return t.count--,0===t.count?n.assignmentExpression("=",r,e):r}set(e,t,r){return this._map.set(e,{count:r,value:t})}}const a={memoise(){},handle(e){const t=e.node,r=e.parent,i=e.parentPath;if(i.isUpdateExpression({argument:t})){const s=r.operator,a=r.prefix;this.memoise(e,2);const o=n.binaryExpression(s[0],n.unaryExpression("+",this.get(e)),n.numericLiteral(1));if(a)i.replaceWith(this.set(e,o));else{const r=e.scope,s=r.generateUidIdentifierBasedOnNode(t);r.push({id:s}),o.left=n.assignmentExpression("=",n.cloneNode(s),o.left),i.replaceWith(n.sequenceExpression([this.set(e,o),n.cloneNode(s)]))}}else{if(i.isAssignmentExpression({left:t})){const t=r.operator;let s=r.right;return"="!==t&&(this.memoise(e,2),s=n.binaryExpression(t.slice(0,-1),this.get(e),s)),void i.replaceWith(this.set(e,s))}if(i.isCallExpression({callee:t})){const t=r.arguments;i.replaceWith(this.call(e,t))}else i.isObjectProperty({value:t})&&i.parentPath.isObjectPattern()||i.isAssignmentPattern({left:t})&&i.parentPath.isObjectProperty({value:r})&&i.parentPath.parentPath.isObjectPattern()||i.isArrayPattern()||i.isAssignmentPattern({left:t})&&i.parentPath.isArrayPattern()||i.isRestElement()?e.replaceWith(this.destructureSet(e)):e.replaceWith(this.get(e))}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.push=function(e,t,r,a,o){const u=s.toKeyAlias(t);let l,c,p={};(0,i.default)(e,u)&&(p=e[u]);e[u]=p,p._inherits=p._inherits||[],p._inherits.push(t),p._key=t.key,t.computed&&(p._computed=!0);if(t.decorators){const e=p.decorators=p.decorators||s.arrayExpression([]);e.elements=e.elements.concat(t.decorators.map(e=>e.expression).reverse())}if(p.value||p.initializer)throw a.buildCodeFrameError(t,"Key conflict with sibling node");(s.isObjectProperty(t)||s.isObjectMethod(t)||s.isClassMethod(t))&&(l=s.toComputedKey(t,t.key));s.isProperty(t)?c=t.value:(s.isObjectMethod(t)||s.isClassMethod(t))&&(c=s.functionExpression(null,t.params,t.body,t.generator,t.async),c.returnType=t.returnType);const h=function(e){if((s.isClassMethod(e)||s.isObjectMethod(e))&&("get"===e.kind||"set"===e.kind))return e.kind;return"value"}(t);r&&"value"===h||(r=h);o&&s.isStringLiteral(l)&&("value"===r||"initializer"===r)&&s.isFunctionExpression(c)&&(c=(0,n.default)({id:l,node:c,scope:o}));c&&(s.inheritsComments(c,t),p[r]=c);return p},t.hasComputed=function(e){for(const t of Object.keys(e))if(e[t]._computed)return!0;return!1},t.toComputedObjectFromClass=function(e){const t=s.arrayExpression([]);for(let r=0;r<e.properties.length;r++){const n=e.properties[r],i=n.value;i.properties.unshift(s.objectProperty(s.identifier("key"),s.toComputedKey(n))),t.elements.push(i)}return t},t.toClassObject=u,t.toDefineObject=function(e){return Object.keys(e).forEach((function(t){const r=e[t];r.value&&(r.writable=s.booleanLiteral(!0)),r.configurable=s.booleanLiteral(!0),r.enumerable=s.booleanLiteral(!0)})),u(e)};var n=o(r(202)),i=o(r(655)),s=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(r,i,s):r[i]=e[i]}r.default=e,t&&t.set(e,r);return r}(r(106));function a(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function o(e){return e&&e.__esModule?e:{default:e}}function u(e){const t=s.objectExpression([]);return Object.keys(e).forEach((function(r){const n=e[r],i=s.objectExpression([]),a=s.objectProperty(n._key,i,n._computed);Object.keys(n).forEach((function(e){const t=n[e];if("_"===e[0])return;const r=s.objectProperty(s.identifier(e),t);s.inheritsComments(r,t),s.removeComments(t),i.properties.push(r)})),t.properties.push(a)})),t}},function(e,t,r){var n=r(656),i=r(354);e.exports=function(e,t){return null!=e&&i(e,t,n)}},function(e,t){var r=Object.prototype.hasOwnProperty;e.exports=function(e,t){return null!=e&&r.call(e,t)}},function(e,t,r){},function(e,t,r){},,function(e,t,r){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i=r(151),s=r(661),a=r(674),o=r(1),u=r(730),l=r(732),c=r(733),p=r(734),h=r(735),f=r(736),d=r(737),m=r(738),y=r(739),g=Object.keys(m),v=function(e){var t=e.source||e.children||"",r=e.parserOptions;if(e.allowedTypes&&e.disallowedTypes)throw new Error("Only one of `allowedTypes` and `disallowedTypes` should be defined");var n=i(m,e.renderers),o=[[a,r]].concat(e.plugins||[]).reduce(b,s()),d=o.parse(t),v=i(e,{renderers:n,definitions:f(d)}),E=function(e){var t=[h,u()],r=e.disallowedTypes;e.allowedTypes&&(r=g.filter((function(t){return"root"!==t&&-1===e.allowedTypes.indexOf(t)})));var n=e.unwrapDisallowed?"unwrap":"remove";r&&r.length>0&&t.push(c.ofType(r,n));e.allowNode&&t.push(c.ifNotMatch(e.allowNode,n));var i=!e.escapeHtml&&!e.skipHtml,s=(e.astPlugins||[]).some((function(e){return(Array.isArray(e)?e[0]:e).identity===y.HtmlParser}));i&&!s&&t.push(l);return e.astPlugins?t.concat(e.astPlugins):t}(e),x=o.runSync(d),A=E.reduce((function(e,t){return t(e,v)}),x);return p(A,v)};function b(e,t){return Array.isArray(t)?e.use.apply(e,n(t)):e.use(t)}v.defaultProps={renderers:{},escapeHtml:!0,skipHtml:!1,sourcePos:!1,rawSourcePos:!1,transformLinkUri:d,astPlugins:[],plugins:[],parserOptions:{}},v.propTypes={className:o.string,source:o.string,children:o.string,sourcePos:o.bool,rawSourcePos:o.bool,escapeHtml:o.bool,skipHtml:o.bool,allowNode:o.func,allowedTypes:o.arrayOf(o.oneOf(g)),disallowedTypes:o.arrayOf(o.oneOf(g)),transformLinkUri:o.oneOfType([o.func,o.bool]),linkTarget:o.oneOfType([o.func,o.string]),transformImageUri:o.func,astPlugins:o.arrayOf(o.func),unwrapDisallowed:o.bool,renderers:o.object,plugins:o.array,parserOptions:o.object},v.types=g,v.renderers=m,v.uriTransformer=d,e.exports=v},function(e,t,r){"use strict";var n=r(662),i=r(663),s=r(664),a=r(670),o=r(672),u=r(673);e.exports=function e(){var t=[],r=a(),v={},b=!1,E=-1;return x.data=function(e,t){if(o(e))return 2===arguments.length?(m("data",b),v[e]=t,x):c.call(v,e)&&v[e]||null;if(e)return m("data",b),v=e,x;return v},x.freeze=A,x.attachers=t,x.use=function(e){var r;if(m("use",b),null===e||void 0===e);else if("function"===typeof e)o.apply(null,arguments);else{if("object"!==typeof e)throw new Error("Expected usable value, not `"+e+"`");"length"in e?a(e):i(e)}r&&(v.settings=n(v.settings||{},r));return x;function i(e){a(e.plugins),e.settings&&(r=n(r||{},e.settings))}function s(e){if("function"===typeof e)o(e);else{if("object"!==typeof e)throw new Error("Expected usable value, not `"+e+"`");"length"in e?o.apply(null,e):i(e)}}function a(e){var t,r;if(null===e||void 0===e);else{if(!("object"===typeof e&&"length"in e))throw new Error("Expected a list of plugins, not `"+e+"`");for(t=e.length,r=-1;++r<t;)s(e[r])}}function o(e,r){var i=T(e);i?(u(i[1])&&u(r)&&(r=n(i[1],r)),i[1]=r):t.push(l.call(arguments))}},x.parse=function(e){var t,r=s(e);if(A(),f("parse",t=x.Parser),h(t))return new t(String(r),r).parse();return t(String(r),r)},x.stringify=function(e,t){var r,n=s(t);if(A(),d("stringify",r=x.Compiler),y(e),h(r))return new r(e,n).compile();return r(e,n)},x.run=S,x.runSync=function(e,t){var r,n=!1;return S(e,t,(function(e,t){n=!0,i(e),r=t})),g("runSync","run",n),r},x.process=w,x.processSync=function(e){var t,r=!1;return A(),f("processSync",x.Parser),d("processSync",x.Compiler),w(t=s(e),(function(e){r=!0,i(e)})),g("processSync","process",r),t},x;function x(){for(var r=e(),i=t.length,s=-1;++s<i;)r.use.apply(null,t[s]);return r.data(n(!0,{},v)),r}function A(){var e,n,i,s;if(b)return x;for(;++E<t.length;)n=(e=t[E])[0],null,!1!==(i=e[1])&&(!0===i&&(e[1]=void 0),"function"===typeof(s=n.apply(x,e.slice(1)))&&r.use(s));return b=!0,E=1/0,x}function T(e){for(var r,n=t.length,i=-1;++i<n;)if((r=t[i])[0]===e)return r}function S(e,t,n){if(y(e),A(),n||"function"!==typeof t||(n=t,t=null),!n)return new Promise(i);function i(i,a){r.run(e,s(t),(function(t,r,s){r=r||e,t?a(t):i?i(r):n(null,r,s)}))}i(null,n)}function w(e,t){if(A(),f("process",x.Parser),d("process",x.Compiler),!t)return new Promise(r);function r(r,n){var i=s(e);p.run(x,{file:i},(function(e){e?n(e):r?r(i):t(null,i)}))}r(null,t)}}().freeze();var l=[].slice,c={}.hasOwnProperty,p=a().use((function(e,t){t.tree=e.parse(t.file)})).use((function(e,t,r){e.run(t.tree,t.file,(function(e,n,i){e?r(e):(t.tree=n,t.file=i,r())}))})).use((function(e,t){t.file.contents=e.stringify(t.tree,t.file)}));function h(e){return"function"===typeof e&&function(e){var t;for(t in e)return!0;return!1}(e.prototype)}function f(e,t){if("function"!==typeof t)throw new Error("Cannot `"+e+"` without `Parser`")}function d(e,t){if("function"!==typeof t)throw new Error("Cannot `"+e+"` without `Compiler`")}function m(e,t){if(t)throw new Error(["Cannot invoke `"+e+"` on a frozen processor.\nCreate a new ","processor first, by invoking it: use `processor()` instead of ","`processor`."].join(""))}function y(e){if(!e||!o(e.type))throw new Error("Expected node, got `"+e+"`")}function g(e,t,r){if(!r)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}},function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,i=Object.prototype.toString,s=Object.defineProperty,a=Object.getOwnPropertyDescriptor,o=function(e){return"function"===typeof Array.isArray?Array.isArray(e):"[object Array]"===i.call(e)},u=function(e){if(!e||"[object Object]"!==i.call(e))return!1;var t,r=n.call(e,"constructor"),s=e.constructor&&e.constructor.prototype&&n.call(e.constructor.prototype,"isPrototypeOf");if(e.constructor&&!r&&!s)return!1;for(t in e);return"undefined"===typeof t||n.call(e,t)},l=function(e,t){s&&"__proto__"===t.name?s(e,t.name,{enumerable:!0,configurable:!0,value:t.newValue,writable:!0}):e[t.name]=t.newValue},c=function(e,t){if("__proto__"===t){if(!n.call(e,t))return;if(a)return a(e,t).value}return e[t]};e.exports=function e(){var t,r,n,i,s,a,p=arguments[0],h=1,f=arguments.length,d=!1;for("boolean"===typeof p&&(d=p,p=arguments[1]||{},h=2),(null==p||"object"!==typeof p&&"function"!==typeof p)&&(p={});h<f;++h)if(null!=(t=arguments[h]))for(r in t)n=c(p,r),p!==(i=c(t,r))&&(d&&i&&(u(i)||(s=o(i)))?(s?(s=!1,a=n&&o(n)?n:[]):a=n&&u(n)?n:{},l(p,{name:r,newValue:e(d,a,i)})):"undefined"!==typeof i&&l(p,{name:r,newValue:i}));return p}},function(e,t,r){"use strict";e.exports=function(e){if(e)throw e}},function(e,t,r){"use strict";var n=r(665),i=r(667);e.exports=i;var s=i.prototype;function a(e,t,r){var i=this.path,s=new n(e,t,r);return i&&(s.name=i+":"+s.name,s.file=i),s.fatal=!1,this.messages.push(s),s}s.message=a,s.info=function(){var e=this.message.apply(this,arguments);return e.fatal=null,e},s.fail=function(){var e=this.message.apply(this,arguments);throw e.fatal=!0,e},s.warn=a},function(e,t,r){"use strict";var n=r(666);function i(){}e.exports=a,i.prototype=Error.prototype,a.prototype=new i;var s=a.prototype;function a(e,t,r){var i,s,a;"string"===typeof t&&(r=t,t=null),i=function(e){var t,r=[null,null];"string"===typeof e&&(-1===(t=e.indexOf(":"))?r[1]=e:(r[0]=e.slice(0,t),r[1]=e.slice(t+1)));return r}(r),s=n(t)||"1:1",a={start:{line:null,column:null},end:{line:null,column:null}},t&&t.position&&(t=t.position),t&&(t.start?(a=t,t=t.start):a.start=t),e.stack&&(this.stack=e.stack,e=e.message),this.message=e,this.name=s,this.reason=e,this.line=t?t.line:null,this.column=t?t.column:null,this.location=a,this.source=i[0],this.ruleId=i[1]}s.file="",s.name="",s.reason="",s.message="",s.stack="",s.fatal=null,s.column=null,s.line=null},function(e,t,r){"use strict";var n={}.hasOwnProperty;function i(e){return e&&"object"===typeof e||(e={}),a(e.line)+":"+a(e.column)}function s(e){return e&&"object"===typeof e||(e={}),i(e.start)+"-"+i(e.end)}function a(e){return e&&"number"===typeof e?e:1}e.exports=function(e){if(!e||"object"!==typeof e)return null;if(n.call(e,"position")||n.call(e,"type"))return s(e.position);if(n.call(e,"start")||n.call(e,"end"))return s(e);if(n.call(e,"line")||n.call(e,"column"))return i(e);return null}},function(e,t,r){"use strict";(function(t){var n=r(150),i=r(668),s=r(669);e.exports=l;var a={}.hasOwnProperty,o=l.prototype;o.toString=function(e){var t=this.contents||"";return s(t)?t.toString(e):String(t)};var u=["history","path","basename","stem","extname","dirname"];function l(e){var r,n,i;if(e){if("string"===typeof e||s(e))e={contents:e};else if("message"in e&&"messages"in e)return e}else e={};if(!(this instanceof l))return new l(e);for(this.data={},this.messages=[],this.history=[],this.cwd=t.cwd(),n=-1,i=u.length;++n<i;)r=u[n],a.call(e,r)&&(this[r]=e[r]);for(r in e)-1===u.indexOf(r)&&(this[r]=e[r])}function c(e,t){if(-1!==e.indexOf(n.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+n.sep+"`")}function p(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function h(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}Object.defineProperty(o,"path",{get:function(){return this.history[this.history.length-1]},set:function(e){p(e,"path"),e!==this.path&&this.history.push(e)}}),Object.defineProperty(o,"dirname",{get:function(){return"string"===typeof this.path?n.dirname(this.path):void 0},set:function(e){h(this.path,"dirname"),this.path=n.join(e||"",this.basename)}}),Object.defineProperty(o,"basename",{get:function(){return"string"===typeof this.path?n.basename(this.path):void 0},set:function(e){p(e,"basename"),c(e,"basename"),this.path=n.join(this.dirname||"",e)}}),Object.defineProperty(o,"extname",{get:function(){return"string"===typeof this.path?n.extname(this.path):void 0},set:function(e){var t=e||"";if(c(t,"extname"),h(this.path,"extname"),t){if("."!==t.charAt(0))throw new Error("`extname` must start with `.`");if(-1!==t.indexOf(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=i(this.path,t)}}),Object.defineProperty(o,"stem",{get:function(){return"string"===typeof this.path?n.basename(this.path,this.extname):void 0},set:function(e){p(e,"stem"),c(e,"stem"),this.path=n.join(this.dirname||"",e+(this.extname||""))}})}).call(this,r(149))},function(e,t,r){"use strict";var n=r(150);e.exports=function(e,t){if("string"!==typeof e)return e;if(0===e.length)return e;var r=n.basename(e,n.extname(e))+t;return n.join(n.dirname(e),r)}},function(e,t){function r(e){return!!e.constructor&&"function"===typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}e.exports=function(e){return null!=e&&(r(e)||function(e){return"function"===typeof e.readFloatLE&&"function"===typeof e.slice&&r(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,r){"use strict";var n=r(671);e.exports=s,s.wrap=n;var i=[].slice;function s(){var e=[],t={run:function(){var t=-1,r=i.call(arguments,0,-1),s=arguments[arguments.length-1];if("function"!==typeof s)throw new Error("Expected function as last argument, not "+s);function a(o){var u=e[++t],l=i.call(arguments,0),c=l.slice(1),p=r.length,h=-1;if(o)s(o);else{for(;++h<p;)null!==c[h]&&void 0!==c[h]||(c[h]=r[h]);r=c,u?n(u,a).apply(null,r):s.apply(null,[null].concat(r))}}a.apply(null,[null].concat(r))},use:function(r){if("function"!==typeof r)throw new Error("Expected `fn` to be a function, not "+r);return e.push(r),t}};return t}},function(e,t,r){"use strict";var n=[].slice;e.exports=function(e,t){var r;return function(){var t,a=n.call(arguments,0),o=e.length>a.length;o&&a.push(i);try{t=e.apply(null,a)}catch(u){if(o&&r)throw u;return i(u)}o||(t&&"function"===typeof t.then?t.then(s,i):t instanceof Error?i(t):s(t))};function i(){r||(r=!0,t.apply(null,arguments))}function s(e){i(null,e)}}},function(e,t){var r=Object.prototype.toString;e.exports=function(e){return"[object String]"===r.call(e)}},function(e,t,r){"use strict";var n=Object.prototype.toString;e.exports=function(e){var t;return"[object Object]"===n.call(e)&&(null===(t=Object.getPrototypeOf(e))||t===Object.getPrototypeOf({}))}},function(e,t,r){"use strict";var n=r(675),i=r(151),s=r(677);function a(e){var t=n(s);t.prototype.options=i(t.prototype.options,this.data("settings"),e),this.Parser=t}e.exports=a,a.Parser=s},function(e,t,r){"use strict";var n=r(151),i=r(676);e.exports=function(e){var t,r,s;for(r in i(o,e),i(a,o),t=o.prototype)(s=t[r])&&"object"===typeof s&&(t[r]="concat"in s?s.concat():n(s));return o;function a(t){return e.apply(this,t)}function o(){return this instanceof o?e.apply(this,arguments):new a(arguments)}}},function(e,t){"function"===typeof Object.create?e.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:e.exports=function(e,t){if(t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}}},function(e,t,r){"use strict";var n=r(151),i=r(678),s=r(679),a=r(680),o=r(681),u=r(687);function l(e,t){this.file=t,this.offset={},this.options=n(this.options),this.setOptions({}),this.inList=!1,this.inBlock=!1,this.inLink=!1,this.atStart=!0,this.toOffset=s(t).toOffset,this.unescape=a(this,"escape"),this.decode=o(this)}e.exports=l;var c=l.prototype;function p(e){var t,r=[];for(t in e)r.push(t);return r}c.setOptions=r(688),c.parse=r(691),c.options=r(360),c.exitStart=i("atStart",!0),c.enterList=i("inList",!1),c.enterLink=i("inLink",!1),c.enterBlock=i("inBlock",!1),c.interruptParagraph=[["thematicBreak"],["atxHeading"],["fencedCode"],["blockquote"],["html"],["setextHeading",{commonmark:!1}],["definition",{commonmark:!1}],["footnote",{commonmark:!1}]],c.interruptList=[["atxHeading",{pedantic:!1}],["fencedCode",{pedantic:!1}],["thematicBreak",{pedantic:!1}],["definition",{commonmark:!1}],["footnote",{commonmark:!1}]],c.interruptBlockquote=[["indentedCode",{commonmark:!0}],["fencedCode",{commonmark:!0}],["atxHeading",{commonmark:!0}],["setextHeading",{commonmark:!0}],["thematicBreak",{commonmark:!0}],["html",{commonmark:!0}],["list",{commonmark:!0}],["definition",{commonmark:!1}],["footnote",{commonmark:!1}]],c.blockTokenizers={newline:r(695),indentedCode:r(696),fencedCode:r(697),blockquote:r(698),atxHeading:r(699),thematicBreak:r(700),list:r(701),setextHeading:r(703),html:r(704),footnote:r(705),definition:r(707),table:r(708),paragraph:r(709)},c.inlineTokenizers={escape:r(710),autoLink:r(712),url:r(713),html:r(715),link:r(716),reference:r(717),strong:r(718),emphasis:r(720),deletion:r(723),code:r(725),break:r(727),text:r(729)},c.blockMethods=p(c.blockTokenizers),c.inlineMethods=p(c.inlineTokenizers),c.tokenizeBlock=u("block"),c.tokenizeInline=u("inline"),c.tokenizeFactory=u},function(e,t,r){"use strict";e.exports=function(e,t,r){return function(){var n=r||this,i=n[e];return n[e]=!t,function(){n[e]=i}}}},function(e,t,r){"use strict";function n(e){return function(t){var r=-1,n=e.length;if(t<0)return{};for(;++r<n;)if(e[r]>t)return{line:r+1,column:t-(e[r-1]||0)+1,offset:t};return{}}}function i(e){return function(t){var r=t&&t.line,n=t&&t.column;if(!isNaN(r)&&!isNaN(n)&&r-1 in e)return(e[r-2]||0)+n-1||0;return-1}}e.exports=function(e){var t=function(e){var t=[],r=e.indexOf("\n");for(;-1!==r;)t.push(r+1),r=e.indexOf("\n",r+1);return t.push(e.length+1),t}(String(e));return{toPosition:n(t),toOffset:i(t)}}},function(e,t,r){"use strict";e.exports=function(e,t){return function(r){var n,i=0,s=r.indexOf("\\"),a=e[t],o=[];for(;-1!==s;)o.push(r.slice(i,s)),i=s+1,(n=r.charAt(i))&&-1!==a.indexOf(n)||o.push("\\"),s=r.indexOf("\\",i);return o.push(r.slice(i)),o.join("")}}},function(e,t,r){"use strict";var n=r(151),i=r(250);e.exports=function(e){return s.raw=function(e,s,a){return i(e,n(a,{position:t(s),warning:r}))},s;function t(t){for(var r=e.offset,n=t.line,i=[];++n&&n in r;)i.push((r[n]||0)+1);return{start:t,indent:i}}function r(t,r,n){3!==n&&e.file.message(t,r)}function s(n,s,a){i(n,{position:t(s),warning:r,text:a,reference:a,textContext:e,referenceContext:e})}}},function(e){e.exports=JSON.parse('{"AElig":"\xc6","AMP":"&","Aacute":"\xc1","Acirc":"\xc2","Agrave":"\xc0","Aring":"\xc5","Atilde":"\xc3","Auml":"\xc4","COPY":"\xa9","Ccedil":"\xc7","ETH":"\xd0","Eacute":"\xc9","Ecirc":"\xca","Egrave":"\xc8","Euml":"\xcb","GT":">","Iacute":"\xcd","Icirc":"\xce","Igrave":"\xcc","Iuml":"\xcf","LT":"<","Ntilde":"\xd1","Oacute":"\xd3","Ocirc":"\xd4","Ograve":"\xd2","Oslash":"\xd8","Otilde":"\xd5","Ouml":"\xd6","QUOT":"\\"","REG":"\xae","THORN":"\xde","Uacute":"\xda","Ucirc":"\xdb","Ugrave":"\xd9","Uuml":"\xdc","Yacute":"\xdd","aacute":"\xe1","acirc":"\xe2","acute":"\xb4","aelig":"\xe6","agrave":"\xe0","amp":"&","aring":"\xe5","atilde":"\xe3","auml":"\xe4","brvbar":"\xa6","ccedil":"\xe7","cedil":"\xb8","cent":"\xa2","copy":"\xa9","curren":"\xa4","deg":"\xb0","divide":"\xf7","eacute":"\xe9","ecirc":"\xea","egrave":"\xe8","eth":"\xf0","euml":"\xeb","frac12":"\xbd","frac14":"\xbc","frac34":"\xbe","gt":">","iacute":"\xed","icirc":"\xee","iexcl":"\xa1","igrave":"\xec","iquest":"\xbf","iuml":"\xef","laquo":"\xab","lt":"<","macr":"\xaf","micro":"\xb5","middot":"\xb7","nbsp":"\xa0","not":"\xac","ntilde":"\xf1","oacute":"\xf3","ocirc":"\xf4","ograve":"\xf2","ordf":"\xaa","ordm":"\xba","oslash":"\xf8","otilde":"\xf5","ouml":"\xf6","para":"\xb6","plusmn":"\xb1","pound":"\xa3","quot":"\\"","raquo":"\xbb","reg":"\xae","sect":"\xa7","shy":"\xad","sup1":"\xb9","sup2":"\xb2","sup3":"\xb3","szlig":"\xdf","thorn":"\xfe","times":"\xd7","uacute":"\xfa","ucirc":"\xfb","ugrave":"\xf9","uml":"\xa8","uuml":"\xfc","yacute":"\xfd","yen":"\xa5","yuml":"\xff"}')},function(e){e.exports=JSON.parse('{"0":"\ufffd","128":"\u20ac","130":"\u201a","131":"\u0192","132":"\u201e","133":"\u2026","134":"\u2020","135":"\u2021","136":"\u02c6","137":"\u2030","138":"\u0160","139":"\u2039","140":"\u0152","142":"\u017d","145":"\u2018","146":"\u2019","147":"\u201c","148":"\u201d","149":"\u2022","150":"\u2013","151":"\u2014","152":"\u02dc","153":"\u2122","154":"\u0161","155":"\u203a","156":"\u0153","158":"\u017e","159":"\u0178"}')},function(e,t,r){"use strict";e.exports=function(e){var t="string"===typeof e?e.charCodeAt(0):e;return t>=97&&t<=102||t>=65&&t<=70||t>=48&&t<=57}},function(e,t,r){"use strict";var n=r(359),i=r(212);e.exports=function(e){return n(e)||i(e)}},function(e,t,r){"use strict";var n;e.exports=function(e){var t,r="&"+e+";";if((n=n||document.createElement("i")).innerHTML=r,59===(t=n.textContent).charCodeAt(t.length-1)&&"semi"!==e)return!1;return t!==r&&t}},function(e,t,r){"use strict";e.exports=function(e){return function(t,r){var s,a,o,u,l,c,p=this,h=p.offset,f=[],d=p[e+"Methods"],m=p[e+"Tokenizers"],y=r.line,g=r.column;if(!t)return f;x.now=b,x.file=p.file,v("");for(;t;){for(s=-1,a=d.length,l=!1;++s<a&&(u=d[s],!(o=m[u])||o.onlyAtStart&&!p.atStart||o.notInList&&p.inList||o.notInBlock&&p.inBlock||o.notInLink&&p.inLink||(c=t.length,o.apply(p,[x,t]),!(l=c!==t.length))););l||p.file.fail(new Error("Infinite loop"),x.now())}return p.eof=b(),f;function v(e){for(var t=-1,r=e.indexOf("\n");-1!==r;)y++,t=r,r=e.indexOf("\n",r+1);-1===t?g+=e.length:g=e.length-t,y in h&&(-1!==t?g+=h[y]:g<=h[y]&&(g=h[y]+1))}function b(){var e={line:y,column:g};return e.offset=p.toOffset(e),e}function E(e){this.start=e,this.end=b()}function x(e){var r=function(){var e=[],t=y+1;return function(){for(var r=y+1;t<r;)e.push((h[t]||0)+1),t++;return e}}(),s=function(){var e=b();return(function(t,r){var n=t.position,i=n?n.start:e,s=[],a=n&&n.end.line,o=e.line;if(t.position=new E(i),n&&r&&n.indent){if(s=n.indent,a<o){for(;++a<o;)s.push((h[a]||0)+1);s.push(e.column)}r=s.concat(r)}return t.position.indent=r||[],t})}(),a=b();return function(e){t.substring(0,e.length)!==e&&p.file.fail(new Error("Incorrectly eaten value: please report this warning on http://git.io/vg5Ft"),b())}(e),o.reset=u,u.test=l,o.test=l,t=t.substring(e.length),v(e),r=r(),o;function o(e,t){return s(function(e,t){var r=t?t.children:f,s=r[r.length-1];return s&&e.type===s.type&&e.type in n&&i(s)&&i(e)&&(e=n[e.type].call(p,s,e)),e!==s&&r.push(e),p.atStart&&0!==f.length&&p.exitStart(),e}(s(e),t),r)}function u(){var r=o.apply(null,arguments);return y=a.line,g=a.column,t=e+t,r}function l(){var r=s({});return y=a.line,g=a.column,t=e+t,r.position}}}};var n={text:function(e,t){return e.value+=t.value,e},blockquote:function(e,t){if(this.options.commonmark)return t;return e.children=e.children.concat(t.children),e}};function i(e){var t,r;return"text"!==e.type||!e.position||(t=e.position.start,r=e.position.end,t.line!==r.line||r.column-t.column===e.value.length)}},function(e,t,r){"use strict";var n=r(151),i=r(689),s=r(360);e.exports=function(e){var t,r,a=this.options;if(null==e)e={};else{if("object"!==typeof e)throw new Error("Invalid value `"+e+"` for setting `options`");e=n(e)}for(t in s){if(null==(r=e[t])&&(r=a[t]),"blocks"!==t&&"boolean"!==typeof r||"blocks"===t&&"object"!==typeof r)throw new Error("Invalid value `"+r+"` for setting `options."+t+"`");e[t]=r}return this.options=e,this.escape=i(e),this}},function(e,t,r){"use strict";e.exports=a;var n=["\\","`","*","{","}","[","]","(",")","#","+","-",".","!","_",">"],i=n.concat(["~","|"]),s=i.concat(["\n",'"',"$","%","&","'",",","/",":",";","<","=","?","@","^"]);function a(e){var t=e||{};return t.commonmark?s:t.gfm?i:n}a.default=n,a.gfm=i,a.commonmark=s},function(e){e.exports=JSON.parse('["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","iframe","legend","li","link","main","menu","menuitem","meta","nav","noframes","ol","optgroup","option","p","param","pre","section","source","title","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"]')},function(e,t,r){"use strict";var n=r(151),i=r(692);e.exports=function(){var e,t=String(this.file),r={line:1,column:1,offset:0},a=n(r);65279===(t=t.replace(s,"\n")).charCodeAt(0)&&(t=t.slice(1),a.column++,a.offset++);e={type:"root",children:this.tokenizeBlock(t,a),position:{start:r,end:this.eof||n(r)}},this.options.position||i(e,!0);return e};var s=/\r\n|\r/g},function(e,t,r){"use strict";var n=r(213);function i(e){delete e.position}function s(e){e.position=void 0}e.exports=function(e,t){return n(e,t?i:s),e}},function(e,t,r){"use strict";e.exports=i;var n=r(694);function i(e,t,r,i){var a;function o(e,n,u){var l,c=[];return(t&&!a(e,n,u[u.length-1]||null)||!1!==(c=s(r(e,u)))[0])&&e.children&&"skip"!==c[0]&&!1===(l=s(function(e,t){var r,n=i?-1:1,s=(i?e.length:-1)+n;for(;s>-1&&s<e.length;){if(!1===(r=o(e[s],s,t))[0])return r;s="number"===typeof r[1]?r[1]:s+n}}(e.children,u.concat(e))))[0]?l:c}"function"===typeof t&&"function"!==typeof r&&(i=r,r=t,t=null),a=n(t),o(e,null,[])}function s(e){return null!==e&&"object"===typeof e&&"length"in e?e:"number"===typeof e?[!0,e]:[e]}i.CONTINUE=!0,i.SKIP="skip",i.EXIT=!1},function(e,t,r){"use strict";function n(e){if("string"===typeof e)return function(e){return function(t){return Boolean(t&&t.type===e)}}(e);if(null===e||void 0===e)return a;if("object"===typeof e)return("length"in e?s:i)(e);if("function"===typeof e)return e;throw new Error("Expected function, string, or object as test")}function i(e){return function(t){var r;for(r in e)if(t[r]!==e[r])return!1;return!0}}function s(e){var t=function(e){for(var t=[],r=e.length,i=-1;++i<r;)t[i]=n(e[i]);return t}(e),r=t.length;return function(){var e=-1;for(;++e<r;)if(t[e].apply(this,arguments))return!0;return!1}}function a(){return!0}e.exports=n},function(e,t,r){"use strict";var n=r(133);e.exports=function(e,t,r){var i,s,a,o,u=t.charAt(0);if("\n"!==u)return;if(r)return!0;o=1,i=t.length,s=u,a="";for(;o<i&&(u=t.charAt(o),n(u));)a+=u,"\n"===u&&(s+=a,a=""),o++;e(s)}},function(e,t,r){"use strict";var n=r(251),i=r(252);e.exports=function(e,t,r){var n,a,o,u=-1,l=t.length,c="",p="",h="",f="";for(;++u<l;)if(n=t.charAt(u),o)if(o=!1,c+=h,p+=f,h="",f="","\n"===n)h=n,f=n;else for(c+=n,p+=n;++u<l;){if(!(n=t.charAt(u))||"\n"===n){f=n,h=n;break}c+=n,p+=n}else if(" "===n&&t.charAt(u+1)===n&&t.charAt(u+2)===n&&t.charAt(u+3)===n)h+=s,u+=3,o=!0;else if("\t"===n)h+=n,o=!0;else{for(a="";"\t"===n||" "===n;)a+=n,n=t.charAt(++u);if("\n"!==n)break;h+=a+n,f+=n}if(p)return!!r||e(c)({type:"code",lang:null,value:i(p)})};var s=n(" ",4)},function(e,t,r){"use strict";var n=r(252);e.exports=function(e,t,r){var i,s,a,o,u,l,c,p,h,f,d,m=this.options,y=t.length+1,g=0,v="";if(!m.gfm)return;for(;g<y&&(" "===(a=t.charAt(g))||"\t"===a);)v+=a,g++;if(f=g,"~"!==(a=t.charAt(g))&&"`"!==a)return;g++,s=a,i=1,v+=a;for(;g<y&&(a=t.charAt(g))===s;)v+=a,i++,g++;if(i<3)return;for(;g<y&&(" "===(a=t.charAt(g))||"\t"===a);)v+=a,g++;o="",u="";for(;g<y&&"\n"!==(a=t.charAt(g))&&"~"!==a&&"`"!==a;)" "===a||"\t"===a?u+=a:(o+=u+a,u=""),g++;if((a=t.charAt(g))&&"\n"!==a)return;if(r)return!0;(d=e.now()).column+=v.length,d.offset+=v.length,v+=o,o=this.decode.raw(this.unescape(o),d),u&&(v+=u);u="",p="",h="",l="",c="";for(;g<y;)if(a=t.charAt(g),l+=p,c+=h,p="",h="","\n"===a){for(l?(p+=a,h+=a):v+=a,u="",g++;g<y&&" "===(a=t.charAt(g));)u+=a,g++;if(p+=u,h+=u.slice(f),!(u.length>=4)){for(u="";g<y&&(a=t.charAt(g))===s;)u+=a,g++;if(p+=u,h+=u,!(u.length<i)){for(u="";g<y&&(" "===(a=t.charAt(g))||"\t"===a);)p+=a,h+=a,g++;if(!a||"\n"===a)break}}}else l+=a,h+=a,g++;return e(v+=l+p)({type:"code",lang:o||null,value:n(c)})}},function(e,t,r){"use strict";var n=r(171),i=r(253);e.exports=function(e,t,r){var s,a,o,u,l,c,p,h,f,d=this.offset,m=this.blockTokenizers,y=this.interruptBlockquote,g=e.now(),v=g.line,b=t.length,E=[],x=[],A=[],T=0;for(;T<b&&(" "===(a=t.charAt(T))||"\t"===a);)T++;if(">"!==t.charAt(T))return;if(r)return!0;T=0;for(;T<b;){for(u=t.indexOf("\n",T),p=T,h=!1,-1===u&&(u=b);T<b&&(" "===(a=t.charAt(T))||"\t"===a);)T++;if(">"===t.charAt(T)?(T++,h=!0," "===t.charAt(T)&&T++):T=p,l=t.slice(T,u),!h&&!n(l)){T=p;break}if(!h&&(o=t.slice(T),i(y,m,this,[e,o,!0])))break;c=p===T?l:t.slice(p,u),A.push(T-p),E.push(c),x.push(l),T=u+1}T=-1,b=A.length,s=e(E.join("\n"));for(;++T<b;)d[v]=(d[v]||0)+A[T],v++;return f=this.enterBlock(),x=this.tokenizeBlock(x.join("\n"),g),f(),s({type:"blockquote",children:x})}},function(e,t,r){"use strict";e.exports=function(e,t,r){var n,i,s,a=this.options,o=t.length+1,u=-1,l=e.now(),c="",p="";for(;++u<o;){if(" "!==(n=t.charAt(u))&&"\t"!==n){u--;break}c+=n}s=0;for(;++u<=o;){if("#"!==(n=t.charAt(u))){u--;break}c+=n,s++}if(s>6)return;if(!s||!a.pedantic&&"#"===t.charAt(u+1))return;o=t.length+1,i="";for(;++u<o;){if(" "!==(n=t.charAt(u))&&"\t"!==n){u--;break}i+=n}if(!a.pedantic&&0===i.length&&n&&"\n"!==n)return;if(r)return!0;c+=i,i="",p="";for(;++u<o&&(n=t.charAt(u))&&"\n"!==n;)if(" "===n||"\t"===n||"#"===n){for(;" "===n||"\t"===n;)i+=n,n=t.charAt(++u);for(;"#"===n;)i+=n,n=t.charAt(++u);for(;" "===n||"\t"===n;)i+=n,n=t.charAt(++u);u--}else p+=i+n,i="";return l.column+=c.length,l.offset+=c.length,e(c+=p+i)({type:"heading",depth:s,children:this.tokenizeInline(p,l)})}},function(e,t,r){"use strict";e.exports=function(e,t,r){var n,i,s,a,o=-1,u=t.length+1,l="";for(;++o<u&&("\t"===(n=t.charAt(o))||" "===n);)l+=n;if("*"!==n&&"-"!==n&&"_"!==n)return;i=n,l+=n,s=1,a="";for(;++o<u;)if((n=t.charAt(o))===i)s++,l+=a+i,a="";else{if(" "!==n)return s>=3&&(!n||"\n"===n)?(l+=a,!!r||e(l)({type:"thematicBreak"})):void 0;a+=n}}},function(e,t,r){"use strict";var n=r(171),i=r(251),s=r(212),a=r(361),o=r(702),u=r(253);e.exports=function(e,t,r){var i,a,o,l,c,p,h,f,v,b,E,x,A,T,S,w,P,C,D,k,F,O,_,I,N=this.options.commonmark,M=this.options.pedantic,B=this.blockTokenizers,L=this.interruptList,j=0,R=t.length,U=null,W=0;for(;j<R;){if("\t"===(l=t.charAt(j)))W+=4-W%4;else{if(" "!==l)break;W++}j++}if(W>=4)return;if(l=t.charAt(j),i=N?y:m,!0===d[l])c=l,o=!1;else{for(o=!0,a="";j<R&&(l=t.charAt(j),s(l));)a+=l,j++;if(l=t.charAt(j),!a||!0!==i[l])return;U=parseInt(a,10),c=l}if(" "!==(l=t.charAt(++j))&&"\t"!==l)return;if(r)return!0;j=0,T=[],S=[],w=[];for(;j<R;){for(p=t.indexOf("\n",j),h=j,f=!1,I=!1,-1===p&&(p=R),_=j+4,W=0;j<R;){if("\t"===(l=t.charAt(j)))W+=4-W%4;else{if(" "!==l)break;W++}j++}if(W>=4&&(I=!0),P&&W>=P.indent&&(I=!0),l=t.charAt(j),v=null,!I){if(!0===d[l])v=l,j++,W++;else{for(a="";j<R&&(l=t.charAt(j),s(l));)a+=l,j++;l=t.charAt(j),j++,a&&!0===i[l]&&(v=l,W+=a.length+1)}if(v)if("\t"===(l=t.charAt(j)))W+=4-W%4,j++;else if(" "===l){for(_=j+4;j<_&&" "===t.charAt(j);)j++,W++;j===_&&" "===t.charAt(j)&&(j-=3,W-=3)}else"\n"!==l&&""!==l&&(v=null)}if(v){if(!M&&c!==v)break;f=!0}else N||I||" "!==t.charAt(h)?N&&P&&(I=W>=P.indent||W>4):I=!0,f=!1,j=h;if(E=t.slice(h,p),b=h===j?E:t.slice(j,p),("*"===v||"_"===v||"-"===v)&&B.thematicBreak.call(this,e,E,!0))break;if(x=A,A=!n(b).length,I&&P)P.value=P.value.concat(w,E),S=S.concat(w,E),w=[];else if(f)0!==w.length&&(P.value.push(""),P.trail=w.concat()),P={value:[E],indent:W,trail:[]},T.push(P),S=S.concat(w,E),w=[];else if(A){if(x)break;w.push(E)}else{if(x)break;if(u(L,B,this,[e,E,!0]))break;P.value=P.value.concat(w,E),S=S.concat(w,E),w=[]}j=p+1}F=e(S.join("\n")).reset({type:"list",ordered:o,start:U,loose:null,children:[]}),C=this.enterList(),D=this.enterBlock(),k=!1,j=-1,R=T.length;for(;++j<R;)P=T[j].value.join("\n"),O=e.now(),(P=e(P)(g(this,P,O),F)).loose&&(k=!0),P=T[j].trail.join("\n"),j!==R-1&&(P+="\n"),e(P);return C(),D(),F.loose=k,F};var l=/\n\n(?!\s*$)/,c=/^\[([ \t]|x|X)][ \t]/,p=/^([ \t]*)([*+-]|\d+[.)])( {1,4}(?! )| |\t|$|(?=\n))([^\n]*)/,h=/^([ \t]*)([*+-]|\d+[.)])([ \t]+)/,f=/^( {1,4}|\t)?/gm,d={"*":!0,"+":!0,"-":!0},m={".":!0},y={};function g(e,t,r){var n,i,s=e.offset,a=e.options.pedantic?v:b,o=null;return t=a.apply(null,arguments),e.options.gfm&&(n=t.match(c))&&(i=n[0].length,o="x"===n[1].toLowerCase(),s[r.line]+=i,t=t.slice(i)),{type:"listItem",loose:l.test(t)||"\n"===t.charAt(t.length-1),checked:o,children:e.tokenizeBlock(t,r)}}function v(e,t,r){var n=e.offset,i=r.line;return t=t.replace(h,s),i=r.line,t.replace(f,s);function s(e){return n[i]=(n[i]||0)+e.length,i++,""}}function b(e,t,r){var n,s,u,l,c,h,f,d=e.offset,m=r.line;for(l=(t=t.replace(p,(function(e,t,r,a,o){s=t+r+a,u=o,Number(r)<10&&s.length%2===1&&(r=" "+r);return(n=t+i(" ",r.length)+a)+u}))).split("\n"),(c=o(t,a(n).indent).split("\n"))[0]=u,d[m]=(d[m]||0)+s.length,m++,h=0,f=l.length;++h<f;)d[m]=(d[m]||0)+l[h].length-c[h].length,m++;return c.join("\n")}y["."]=!0,y[")"]=!0},function(e,t,r){"use strict";var n=r(171),i=r(251),s=r(361);e.exports=function(e,t){var r,a,o,u,l=e.split("\n"),c=l.length+1,p=1/0,h=[];l.unshift(i(" ",t)+"!");for(;c--;)if(a=s(l[c]),h[c]=a.stops,0!==n(l[c]).length){if(!a.indent){p=1/0;break}a.indent>0&&a.indent<p&&(p=a.indent)}if(p!==1/0)for(c=l.length;c--;){for(o=h[c],r=p;r&&!(r in o);)r--;u=0!==n(l[c]).length&&p&&r!==p?"\t":"",l[c]=u+l[c].slice(r in o?o[r]+1:0)}return l.shift(),l.join("\n")}},function(e,t,r){"use strict";e.exports=function(e,t,r){var i,s,a,o,u,l=e.now(),c=t.length,p=-1,h="";for(;++p<c;){if(" "!==(a=t.charAt(p))||p>=3){p--;break}h+=a}i="",s="";for(;++p<c;){if("\n"===(a=t.charAt(p))){p--;break}" "===a||"\t"===a?s+=a:(i+=s+a,s="")}if(l.column+=h.length,l.offset+=h.length,h+=i+s,a=t.charAt(++p),o=t.charAt(++p),"\n"!==a||!n[o])return;h+=a,s=o,u=n[o];for(;++p<c;){if((a=t.charAt(p))!==o){if("\n"!==a)return;p--;break}s+=a}if(r)return!0;return e(h+s)({type:"heading",depth:u,children:this.tokenizeInline(i,l)})};var n={};n["="]=1,n["-"]=2},function(e,t,r){"use strict";var n=r(362).openCloseTag;e.exports=function(e,t,r){var i,s,a,o,u,l,c,p=this.options.blocks,h=t.length,f=0,d=[[/^<(script|pre|style)(?=(\s|>|$))/i,/<\/(script|pre|style)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Za-z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+p.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(n.source+"\\s*$"),/^$/,!1]];for(;f<h&&("\t"===(o=t.charAt(f))||" "===o);)f++;if("<"!==t.charAt(f))return;i=-1===(i=t.indexOf("\n",f+1))?h:i,s=t.slice(f,i),a=-1,u=d.length;for(;++a<u;)if(d[a][0].test(s)){l=d[a];break}if(!l)return;if(r)return l[2];if(f=i,!l[1].test(s))for(;f<h;){if(i=-1===(i=t.indexOf("\n",f+1))?h:i,s=t.slice(f+1,i),l[1].test(s)){s&&(f=i);break}f=i}return c=t.slice(0,f),e(c)({type:"html",value:c})}},function(e,t,r){"use strict";var n=r(133),i=r(254);e.exports=a,a.notInList=!0,a.notInBlock=!0;var s=/^( {4}|\t)?/gm;function a(e,t,r){var a,o,u,l,c,p,h,f,d,m,y,g,v=this.offset;if(this.options.footnotes){for(a=0,o=t.length,u="",l=e.now(),c=l.line;a<o&&(d=t.charAt(a),n(d));)u+=d,a++;if("["===t.charAt(a)&&"^"===t.charAt(a+1)){for(a=(u+="[^").length,h="";a<o&&"]"!==(d=t.charAt(a));)"\\"===d&&(h+=d,a++,d=t.charAt(a)),h+=d,a++;if(h&&"]"===t.charAt(a)&&":"===t.charAt(a+1)){if(r)return!0;for(m=i(h),a=(u+=h+"]:").length;a<o&&("\t"===(d=t.charAt(a))||" "===d);)u+=d,a++;for(l.column+=u.length,l.offset+=u.length,h="",p="",f="";a<o;){if("\n"===(d=t.charAt(a))){for(f=d,a++;a<o&&"\n"===(d=t.charAt(a));)f+=d,a++;for(h+=f,f="";a<o&&" "===(d=t.charAt(a));)f+=d,a++;if(0===f.length)break;h+=f}h&&(p+=h,h=""),p+=d,a++}return u+=p,p=p.replace(s,(function(e){return v[c]=(v[c]||0)+e.length,c++,""})),y=e(u),g=this.enterBlock(),p=this.tokenizeBlock(p,l),g(),y({type:"footnoteDefinition",identifier:m,children:p})}}}}},function(e,t,r){"use strict";e.exports=function(e){return String(e).replace(/\s+/g," ")}},function(e,t,r){"use strict";var n=r(133),i=r(254);e.exports=s,s.notInList=!0,s.notInBlock=!0;function s(e,t,r){for(var n,s,u,l,c,p,h,f,d=this.options.commonmark,m=0,y=t.length,g="";m<y&&(" "===(l=t.charAt(m))||"\t"===l);)g+=l,m++;if("["===(l=t.charAt(m))){for(m++,g+=l,u="";m<y&&"]"!==(l=t.charAt(m));)"\\"===l&&(u+=l,m++,l=t.charAt(m)),u+=l,m++;if(u&&"]"===t.charAt(m)&&":"===t.charAt(m+1)){for(p=u,m=(g+=u+"]:").length,u="";m<y&&("\t"===(l=t.charAt(m))||" "===l||"\n"===l);)g+=l,m++;if(u="",n=g,"<"===(l=t.charAt(m))){for(m++;m<y&&a(l=t.charAt(m));)u+=l,m++;if((l=t.charAt(m))===a.delimiter)g+="<"+u+l,m++;else{if(d)return;m-=u.length+1,u=""}}if(!u){for(;m<y&&o(l=t.charAt(m));)u+=l,m++;g+=u}if(u){for(h=u,u="";m<y&&("\t"===(l=t.charAt(m))||" "===l||"\n"===l);)u+=l,m++;if(c=null,'"'===(l=t.charAt(m))?c='"':"'"===l?c="'":"("===l&&(c=")"),c){if(!u)return;for(m=(g+=u+l).length,u="";m<y&&(l=t.charAt(m))!==c;){if("\n"===l){if(m++,"\n"===(l=t.charAt(m))||l===c)return;u+="\n"}u+=l,m++}if((l=t.charAt(m))!==c)return;s=g,g+=u+l,m++,f=u,u=""}else u="",m=g.length;for(;m<y&&("\t"===(l=t.charAt(m))||" "===l);)g+=l,m++;return(l=t.charAt(m))&&"\n"!==l?void 0:!!r||(n=e(n).test().end,h=this.decode.raw(this.unescape(h),n,{nonTerminated:!1}),f&&(s=e(s).test().end,f=this.decode.raw(this.unescape(f),s)),e(g)({type:"definition",identifier:i(p),title:f||null,url:h}))}}}}function a(e){return">"!==e&&"["!==e&&"]"!==e}function o(e){return"["!==e&&"]"!==e&&!n(e)}a.delimiter=">"},function(e,t,r){"use strict";var n=r(133);e.exports=function(e,t,r){var i,s,a,o,u,l,c,p,h,f,d,m,y,g,v,b,E,x,A,T,S,w,P,C;if(!this.options.gfm)return;i=0,x=0,l=t.length+1,c=[];for(;i<l;){if(w=t.indexOf("\n",i),P=t.indexOf("|",i+1),-1===w&&(w=t.length),-1===P||P>w){if(x<2)return;break}c.push(t.slice(i,w)),x++,i=w+1}o=c.join("\n"),s=c.splice(1,1)[0]||[],i=0,l=s.length,x--,a=!1,d=[];for(;i<l;){if("|"===(h=s.charAt(i))){if(f=null,!1===a){if(!1===C)return}else d.push(a),a=!1;C=!1}else if("-"===h)f=!0,a=a||null;else if(":"===h)a="left"===a?"center":f&&null===a?"right":"left";else if(!n(h))return;i++}!1!==a&&d.push(a);if(d.length<1)return;if(r)return!0;E=-1,T=[],S=e(o).reset({type:"table",align:d,children:T});for(;++E<x;){for(A=c[E],u={type:"tableRow",children:[]},E&&e("\n"),e(A).reset(u,S),l=A.length+1,i=0,p="",m="",y=!0,g=null,v=null;i<l;)if("\t"!==(h=A.charAt(i))&&" "!==h){if(""===h||"|"===h)if(y)e(h);else{if(h&&v){p+=h,i++;continue}!m&&!h||y||(o=m,p.length>1&&(h?(o+=p.slice(0,p.length-1),p=p.charAt(p.length-1)):(o+=p,p="")),b=e.now(),e(o)({type:"tableCell",children:this.tokenizeInline(m,b)},u)),e(p+h),p="",m=""}else if(p&&(m+=p,p=""),m+=h,"\\"===h&&i!==l-2&&(m+=A.charAt(i+1),i++),"`"===h){for(g=1;A.charAt(i+1)===h;)m+=h,i++,g++;v?g>=v&&(v=0):v=g}y=!1,i++}else m?p+=h:e(h),i++;E||e("\n"+s)}return S}},function(e,t,r){"use strict";var n=r(171),i=r(212),s=r(252),a=r(253);e.exports=function(e,t,r){var o,u,l,c,p,h=this.options,f=h.commonmark,d=h.gfm,m=this.blockTokenizers,y=this.interruptParagraph,g=t.indexOf("\n"),v=t.length;for(;g<v;){if(-1===g){g=v;break}if("\n"===t.charAt(g+1))break;if(f){for(c=0,o=g+1;o<v;){if("\t"===(l=t.charAt(o))){c=4;break}if(" "!==l)break;c++,o++}if(c>=4){g=t.indexOf("\n",g+1);continue}}if(u=t.slice(g+1),a(y,m,this,[e,u,!0]))break;if(m.list.call(this,e,u,!0)&&(this.inList||f||d&&!i(n.left(u).charAt(0))))break;if(o=g,-1!==(g=t.indexOf("\n",g+1))&&""===n(t.slice(o,g))){g=o;break}}if(u=t.slice(0,g),""===n(u))return e(u),null;if(r)return!0;return p=e.now(),u=s(u),e(u)({type:"paragraph",children:this.tokenizeInline(u,p)})}},function(e,t,r){"use strict";var n=r(711);function i(e,t,r){var n,i;if("\\"===t.charAt(0)&&(n=t.charAt(1),-1!==this.escape.indexOf(n)))return!!r||(i="\n"===n?{type:"break"}:{type:"text",value:n},e("\\"+n)(i))}e.exports=i,i.locator=n},function(e,t,r){"use strict";e.exports=function(e,t){return e.indexOf("\\",t)}},function(e,t,r){"use strict";var n=r(133),i=r(250),s=r(363);e.exports=o,o.locator=s,o.notInLink=!0;var a="mailto:".length;function o(e,t,r){var s,o,u,l,c,p,h,f,d,m,y;if("<"===t.charAt(0)){for(this,s="",o=t.length,u=0,l="",p=!1,h="",u++,s="<";u<o&&(c=t.charAt(u),!(n(c)||">"===c||"@"===c||":"===c&&"/"===t.charAt(u+1)));)l+=c,u++;if(l){if(h+=l,l="",h+=c=t.charAt(u),u++,"@"===c)p=!0;else{if(":"!==c||"/"!==t.charAt(u+1))return;h+="/",u++}for(;u<o&&(c=t.charAt(u),!n(c)&&">"!==c);)l+=c,u++;if(c=t.charAt(u),l&&">"===c)return!!r||(d=h+=l,s+=h+c,(f=e.now()).column++,f.offset++,p&&("mailto:"===h.slice(0,a).toLowerCase()?(d=d.substr(a),f.column+=a,f.offset+=a):h="mailto:"+h),m=this.inlineTokenizers,this.inlineTokenizers={text:m.text},y=this.enterLink(),d=this.tokenizeInline(d,f),this.inlineTokenizers=m,y(),e(s)({type:"link",title:null,url:i(h,{nonTerminated:!1}),children:d}))}}}},function(e,t,r){"use strict";var n=r(250),i=r(133),s=r(714);e.exports=u,u.locator=s,u.notInLink=!0;var a=["http://","https://","mailto:"],o=a.length;function u(e,t,r){var s,u,l,c,p,h,f,d,m,y,g,v;if(this.options.gfm){for(s="",c=-1,d=o;++c<d;)if(h=a[c],(f=t.slice(0,h.length)).toLowerCase()===h){s=f;break}if(s){for(c=s.length,d=t.length,m="",y=0;c<d&&(l=t.charAt(c),!i(l)&&"<"!==l)&&("."!==l&&","!==l&&":"!==l&&";"!==l&&'"'!==l&&"'"!==l&&")"!==l&&"]"!==l||(g=t.charAt(c+1))&&!i(g))&&("("!==l&&"["!==l||y++,")"!==l&&"]"!==l||!(--y<0));)m+=l,c++;if(m){if(u=s+=m,"mailto:"===h){if(-1===(p=m.indexOf("@"))||p===d-1)return;u=u.substr("mailto:".length)}return!!r||(v=this.enterLink(),u=this.tokenizeInline(u,e.now()),v(),e(s)({type:"link",title:null,url:n(s,{nonTerminated:!1}),children:u}))}}}}},function(e,t,r){"use strict";e.exports=function(e,t){var r,i=n.length,s=-1,a=-1;if(!this.options.gfm)return-1;for(;++s<i;)-1!==(r=e.indexOf(n[s],t))&&(r<a||-1===a)&&(a=r);return a};var n=["https://","http://","mailto:"]},function(e,t,r){"use strict";var n=r(359),i=r(363),s=r(362).tag;e.exports=u,u.locator=i;var a=/^<a /i,o=/^<\/a>/i;function u(e,t,r){var i,u,l=t.length;if(!("<"!==t.charAt(0)||l<3)&&(i=t.charAt(1),(n(i)||"?"===i||"!"===i||"/"===i)&&(u=t.match(s))))return!!r||(u=u[0],!this.inLink&&a.test(u)?this.inLink=!0:this.inLink&&o.test(u)&&(this.inLink=!1),e(u)({type:"html",value:u}))}},function(e,t,r){"use strict";var n=r(133),i=r(364);e.exports=u,u.locator=i;var s={}.hasOwnProperty,a={'"':'"',"'":"'"},o={};function u(e,t,r){var i,u,l,c,p,h,f,d,m,y,g,v,b,E,x,A,T,S,w,P="",C=0,D=t.charAt(0),k=this.options.pedantic,F=this.options.commonmark,O=this.options.gfm;if("!"===D&&(m=!0,P=D,D=t.charAt(++C)),"["===D&&(m||!this.inLink)){for(P+=D,x="",C++,v=t.length,E=0,(T=e.now()).column+=C,T.offset+=C;C<v;){if(h=D=t.charAt(C),"`"===D){for(u=1;"`"===t.charAt(C+1);)h+=D,C++,u++;l?u>=l&&(l=0):l=u}else if("\\"===D)C++,h+=t.charAt(C);else if(l&&!O||"["!==D){if((!l||O)&&"]"===D){if(!E){if(!k)for(;C<v&&(D=t.charAt(C+1),n(D));)h+=D,C++;if("("!==t.charAt(C+1))return;h+="(",i=!0,C++;break}E--}}else E++;x+=h,h="",C++}if(i){for(y=x,P+=x+h,C++;C<v&&(D=t.charAt(C),n(D));)P+=D,C++;if(D=t.charAt(C),d=F?o:a,x="",c=P,"<"===D){for(C++,c+="<";C<v&&">"!==(D=t.charAt(C));){if(F&&"\n"===D)return;x+=D,C++}if(">"!==t.charAt(C))return;P+="<"+x+">",A=x,C++}else{for(D=null,h="";C<v&&(D=t.charAt(C),!h||!s.call(d,D));){if(n(D)){if(!k)break;h+=D}else{if("("===D)E++;else if(")"===D){if(0===E)break;E--}x+=h,h="","\\"===D&&(x+="\\",D=t.charAt(++C)),x+=D}C++}A=x,C=(P+=x).length}for(x="";C<v&&(D=t.charAt(C),n(D));)x+=D,C++;if(D=t.charAt(C),P+=x,x&&s.call(d,D))if(C++,P+=D,x="",g=d[D],p=P,F){for(;C<v&&(D=t.charAt(C))!==g;)"\\"===D&&(x+="\\",D=t.charAt(++C)),C++,x+=D;if((D=t.charAt(C))!==g)return;for(b=x,P+=x+D,C++;C<v&&(D=t.charAt(C),n(D));)P+=D,C++}else for(h="";C<v;){if((D=t.charAt(C))===g)f&&(x+=g+h,h=""),f=!0;else if(f){if(")"===D){P+=x+g+h,b=x;break}n(D)?h+=D:(x+=g+h+D,h="",f=!1)}else x+=D;C++}if(")"===t.charAt(C))return!!r||(P+=")",A=this.decode.raw(this.unescape(A),e(c).test().end,{nonTerminated:!1}),b&&(p=e(p).test().end,b=this.decode.raw(this.unescape(b),p)),w={type:m?"image":"link",title:b||null,url:A},m?w.alt=this.decode.raw(this.unescape(y),T)||null:(S=this.enterLink(),w.children=this.tokenizeInline(y,T),S()),e(P)(w))}}}o['"']='"',o["'"]="'",o["("]=")"},function(e,t,r){"use strict";var n=r(133),i=r(364),s=r(254);e.exports=a,a.locator=i;function a(e,t,r){var i,a,o,u,l,c,p,h,f=t.charAt(0),d=0,m=t.length,y="",g="",v="link",b="shortcut";if("!"===f&&(v="image",g=f,f=t.charAt(++d)),"["===f){if(d++,g+=f,c="",this.options.footnotes&&"^"===t.charAt(d)){if("image"===v)return;g+="^",d++,v="footnote"}for(h=0;d<m;){if("["===(f=t.charAt(d)))p=!0,h++;else if("]"===f){if(!h)break;h--}"\\"===f&&(c+="\\",f=t.charAt(++d)),c+=f,d++}if(y=c,i=c,"]"===(f=t.charAt(d))){for(d++,y+=f,c="";d<m&&(f=t.charAt(d),n(f));)c+=f,d++;if(f=t.charAt(d),"footnote"!==v&&"["===f){for(a="",c+=f,d++;d<m&&"["!==(f=t.charAt(d))&&"]"!==f;)"\\"===f&&(a+="\\",f=t.charAt(++d)),a+=f,d++;"]"===(f=t.charAt(d))?(b=a?"full":"collapsed",c+=a+f,d++):a="",y+=c,c=""}else{if(!i)return;a=i}if("full"===b||!p)return y=g+y,"link"===v&&this.inLink?null:!!r||("footnote"===v&&-1!==i.indexOf(" ")?e(y)({type:"footnote",children:this.tokenizeInline(i,e.now())}):((o=e.now()).column+=g.length,o.offset+=g.length,u={type:v+"Reference",identifier:s(a="full"===b?a:i)},"link"!==v&&"image"!==v||(u.referenceType=b),"link"===v?(l=this.enterLink(),u.children=this.tokenizeInline(i,o),l()):"image"===v&&(u.alt=this.decode.raw(this.unescape(i),o)||null),e(y)(u)))}}}},function(e,t,r){"use strict";var n=r(171),i=r(133),s=r(719);e.exports=a,a.locator=s;function a(e,t,r){var s,a,o,u,l,c,p,h=0,f=t.charAt(h);if(("*"===f||"_"===f)&&t.charAt(++h)===f&&(a=this.options.pedantic,l=(o=f)+o,c=t.length,h++,u="",f="",!a||!i(t.charAt(h))))for(;h<c;){if(p=f,(f=t.charAt(h))===o&&t.charAt(h+1)===o&&(!a||!i(p))&&(f=t.charAt(h+2))!==o){if(!n(u))return;return!!r||((s=e.now()).column+=2,s.offset+=2,e(l+u+l)({type:"strong",children:this.tokenizeInline(u,s)}))}a||"\\"!==f||(u+=f,f=t.charAt(++h)),u+=f,h++}}},function(e,t,r){"use strict";e.exports=function(e,t){var r=e.indexOf("**",t),n=e.indexOf("__",t);if(-1===n)return r;if(-1===r)return n;return n<r?n:r}},function(e,t,r){"use strict";var n=r(171),i=r(721),s=r(133),a=r(722);e.exports=o,o.locator=a;function o(e,t,r){var a,o,u,l,c,p,h,f=0,d=t.charAt(f);if(("*"===d||"_"===d)&&(o=this.options.pedantic,c=d,u=d,p=t.length,f++,l="",d="",!o||!s(t.charAt(f))))for(;f<p;){if(h=d,(d=t.charAt(f))===u&&(!o||!s(h))){if((d=t.charAt(++f))!==u){if(!n(l)||h===u)return;if(!o&&"_"===u&&i(d)){l+=u;continue}return!!r||((a=e.now()).column++,a.offset++,e(c+l+u)({type:"emphasis",children:this.tokenizeInline(l,a)}))}l+=u}o||"\\"!==d||(l+=d,d=t.charAt(++f)),l+=d,f++}}},function(e,t,r){"use strict";e.exports=function(e){return i.test("number"===typeof e?n(e):e.charAt(0))};var n=String.fromCharCode,i=/\w/},function(e,t,r){"use strict";e.exports=function(e,t){var r=e.indexOf("*",t),n=e.indexOf("_",t);if(-1===n)return r;if(-1===r)return n;return n<r?n:r}},function(e,t,r){"use strict";var n=r(133),i=r(724);e.exports=s,s.locator=i;function s(e,t,r){var i,s,a,o="",u="",l="",c="";if(this.options.gfm&&"~"===t.charAt(0)&&"~"===t.charAt(1)&&!n(t.charAt(2)))for(i=1,s=t.length,(a=e.now()).column+=2,a.offset+=2;++i<s;){if("~"===(o=t.charAt(i))&&"~"===u&&(!l||!n(l)))return!!r||e("~~"+c+"~~")({type:"delete",children:this.tokenizeInline(c,a)});c+=u,l=u,u=o}}},function(e,t,r){"use strict";e.exports=function(e,t){return e.indexOf("~~",t)}},function(e,t,r){"use strict";var n=r(133),i=r(726);e.exports=s,s.locator=i;function s(e,t,r){for(var i,s,a,o,u,l,c,p,h=t.length,f=0,d="",m="";f<h&&"`"===t.charAt(f);)d+="`",f++;if(d){for(u=d,o=f,d="",p=t.charAt(f),a=0;f<h;){if(l=p,p=t.charAt(f+1),"`"===l?(a++,m+=l):(a=0,d+=l),a&&"`"!==p){if(a===o){u+=d+m,c=!0;break}d+=m,m=""}f++}if(!c){if(o%2!==0)return;d=""}if(r)return!0;for(i="",s="",h=d.length,f=-1;++f<h;)l=d.charAt(f),n(l)?s+=l:(s&&(i&&(i+=s),s=""),i+=l);return e(u)({type:"inlineCode",value:i})}}},function(e,t,r){"use strict";e.exports=function(e,t){return e.indexOf("`",t)}},function(e,t,r){"use strict";var n=r(728);e.exports=i,i.locator=n;function i(e,t,r){for(var n,i=t.length,s=-1,a="";++s<i;){if("\n"===(n=t.charAt(s))){if(s<2)return;return!!r||e(a+=n)({type:"break"})}if(" "!==n)return;a+=n}}},function(e,t,r){"use strict";e.exports=function(e,t){var r=e.indexOf("\n",t);for(;r>t&&" "===e.charAt(r-1);)r--;return r}},function(e,t,r){"use strict";e.exports=function(e,t,r){var n,i,s,a,o,u,l,c,p,h;if(r)return!0;n=this.inlineMethods,a=n.length,i=this.inlineTokenizers,s=-1,p=t.length;for(;++s<a;)"text"!==(c=n[s])&&i[c]&&((l=i[c].locator)||e.file.fail("Missing locator: `"+c+"`"),-1!==(u=l.call(this,t,1))&&u<p&&(p=u));o=t.slice(0,p),h=e.now(),this.decode(o,h,(function(t,r,n){e(n||t)({type:"text",value:t})}))}},function(e,t,r){var n=r(731);e.exports=function(){return function(e){return n(e,"list",(function(e,t){var r,n,i=0;for(r=0,n=t.length;r<n;r++)"list"===t[r].type&&(i+=1);for(r=0,n=e.children.length;r<n;r++){var s=e.children[r];s.index=r,s.ordered=e.ordered}e.depth=i})),e}}},function(e,t,r){"use strict";e.exports=function(e,t,r){var n=[];"function"===typeof t&&(r=t,t=null);function i(e){var s;return t&&e.type!==t||(s=r(e,n.concat())),e.children&&!1!==s?function(e,t){var r,s=e.length,a=-1;n.push(t);for(;++a<s;)if((r=e[a])&&!1===i(r))return!1;return n.pop(),!0}(e.children,e):s}i(e)}},function(e,t,r){"use strict";var n=r(213),i=/^<(area|base|br|col|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\s*\/?>$/i,s=/^<(\/?)([a-z]+)\s*>$/;e.exports=function(e){var t,r;return n(e,"html",(function(e,n,a){r!==a&&(t=[],r=a);var o=function(e){var t=e.value.match(i);return!!t&&t[1]}(e);if(o)return a.children.splice(n,1,{type:"virtualHtml",tag:o,position:e.position}),!0;var u=function(e,t){var r=e.value.match(s);return!!r&&{tag:r[2],opening:!r[1],node:e}}(e);if(!u)return!0;var l=function(e,t){var r=e.length;for(;r--;)if(e[r].tag===t)return e.splice(r,1)[0];return!1}(t,u.tag);return l?a.children.splice(n,0,function(e,t,r){var n=r.children.indexOf(e.node),i=r.children.indexOf(t.node),s=r.children.splice(n,i-n+1).slice(1,-1);return{type:"virtualHtml",children:s,tag:e.tag,position:{start:e.node.position.start,end:t.node.position.end,indent:[]}}}(u,l,a)):u.opening||t.push(u),!0}),!0),e}},function(e,t,r){"use strict";var n=r(213);function i(e,t,r,n){if("remove"===n)r.children.splice(t,1);else if("unwrap"===n){var i=[t,1];e.children&&(i=i.concat(e.children)),Array.prototype.splice.apply(r.children,i)}}t.ofType=function(e,t){return function(t){return e.forEach((function(e){return n(t,e,r,!0)})),t};function r(e,r,n){n&&i(e,r,n,t)}},t.ifNotMatch=function(e,t){return function(e){return n(e,r,!0),e};function r(r,n,s){s&&!e(r,n,s)&&i(r,n,s,t)}}},function(e,t,r){"use strict";var n=r(0),i=r(151),s=r(26),a={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0}};function o(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,l=t.renderers[e.type];void 0===e.position&&(e.position=r.node&&r.node.position||a);var c=e.position.start,p=[e.type,c.line,c.column,i].join("-");if(!s.isValidElementType(l))throw new Error("Renderer for type `".concat(e.type,"` not defined or is not renderable"));var h=u(e,p,t,l,r,i);return n.createElement(l,h,h.children||f()||void 0);function f(){return e.children&&e.children.map((function(r,n){return o(r,t,{node:e,props:h},n)}))}}function u(e,t,r,s,a,u){var c,p={key:t},h="string"===typeof s;r.sourcePos&&e.position&&(p["data-sourcepos"]=[(c=e.position).start.line,":",c.start.column,"-",c.end.line,":",c.end.column].map(String).join("")),r.rawSourcePos&&!h&&(p.sourcePosition=e.position),r.includeNodeIndex&&a.node&&a.node.children&&!h&&(p.index=a.node.children.indexOf(e),p.parentChildCount=a.node.children.length);var f=null!==e.identifier&&void 0!==e.identifier?r.definitions[e.identifier]||{}:null;switch(e.type){case"root":l(p,{className:r.className});break;case"text":p.nodeKey=t,p.children=e.value;break;case"heading":p.level=e.depth;break;case"list":p.start=e.start,p.ordered=e.ordered,p.tight=!e.loose,p.depth=e.depth;break;case"listItem":p.checked=e.checked,p.tight=!e.loose,p.ordered=e.ordered,p.index=e.index,p.children=function(e,t){if(e.loose)return e.children;if(t.node&&e.index>0&&t.node.children[e.index-1].loose)return e.children;return function(e){return e.children.reduce((function(e,t){return e.concat("paragraph"===t.type?t.children||[]:[t])}),[])}(e)}(e,a).map((function(t,n){return o(t,r,{node:e,props:p},n)}));break;case"definition":l(p,{identifier:e.identifier,title:e.title,url:e.url});break;case"code":l(p,{language:e.lang&&e.lang.split(/\s/,1)[0]});break;case"inlineCode":p.children=e.value,p.inline=!0;break;case"link":l(p,{title:e.title||void 0,target:"function"===typeof r.linkTarget?r.linkTarget(e.url,e.children,e.title):r.linkTarget,href:r.transformLinkUri?r.transformLinkUri(e.url,e.children,e.title):e.url});break;case"image":l(p,{alt:e.alt||void 0,title:e.title||void 0,src:r.transformImageUri?r.transformImageUri(e.url,e.children,e.title,e.alt):e.url});break;case"linkReference":l(p,i(f,{href:r.transformLinkUri?r.transformLinkUri(f.href):f.href}));break;case"imageReference":l(p,{src:r.transformImageUri&&f.href?r.transformImageUri(f.href,e.children,f.title,e.alt):f.href,title:f.title||void 0,alt:e.alt||void 0});break;case"table":case"tableHead":case"tableBody":p.columnAlignment=e.align;break;case"tableRow":p.isHeader="tableHead"===a.node.type,p.columnAlignment=a.props.columnAlignment;break;case"tableCell":l(p,{isHeader:a.props.isHeader,align:a.props.columnAlignment[u]});break;case"virtualHtml":p.tag=e.tag;break;case"html":p.isBlock=e.position.start.line!==e.position.end.line,p.escapeHtml=r.escapeHtml,p.skipHtml=r.skipHtml;break;case"parsedHtml":var d;e.children&&(d=e.children.map((function(t,n){return o(t,r,{node:e,props:p},n)}))),p.escapeHtml=r.escapeHtml,p.skipHtml=r.skipHtml,p.element=function(e,t){var r=e.element;if(Array.isArray(r)){var i=n.Fragment||"div";return n.createElement(i,null,r)}if(r.props.children||t){var s=n.Children.toArray(r.props.children).concat(t);return n.cloneElement(r,null,s)}return n.cloneElement(r,null)}(e,d);break;default:l(p,i(e,{type:void 0,position:void 0,children:void 0}))}return!h&&e.value&&(p.value=e.value),p}function l(e,t){for(var r in t)"undefined"!==typeof t[r]&&(e[r]=t[r])}e.exports=o},function(e,t,r){"use strict";var n=r(213);function i(e){var t=e.children;e.children=[{type:"tableHead",align:e.align,children:[t[0]],position:t[0].position}],t.length>1&&e.children.push({type:"tableBody",align:e.align,children:t.slice(1),position:{start:t[1].position.start,end:t[t.length-1].position.end}})}e.exports=function(e){return n(e,"table",i),e}},function(e,t,r){"use strict";e.exports=function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(t.children||[]).reduce((function(t,r){return"definition"===r.type&&(t[r.identifier]={href:r.url,title:r.title}),e(r,t)}),r)}},function(e,t,r){"use strict";var n=["http","https","mailto","tel"];e.exports=function(e){var t=(e||"").trim(),r=t.charAt(0);if("#"===r||"/"===r)return t;var i=t.indexOf(":");if(-1===i)return t;for(var s=n.length,a=-1;++a<s;){var o=n[a];if(i===o.length&&t.slice(0,o.length).toLowerCase()===o)return t}return-1!==(a=t.indexOf("?"))&&i>a?t:-1!==(a=t.indexOf("#"))&&i>a?t:"javascript:void(0)"}},function(e,t,r){"use strict";var n=r(151),i=r(0),s=parseInt((i.version||"16").slice(0,2),10)>=16,a=i.createElement;function o(e,t){return a(e,u(t),t.children)}function u(e){return e["data-sourcepos"]?{"data-sourcepos":e["data-sourcepos"]}:{}}e.exports={break:"br",paragraph:"p",emphasis:"em",strong:"strong",thematicBreak:"hr",blockquote:"blockquote",delete:"del",link:"a",image:"img",linkReference:"a",imageReference:"img",table:o.bind(null,"table"),tableHead:o.bind(null,"thead"),tableBody:o.bind(null,"tbody"),tableRow:o.bind(null,"tr"),tableCell:function(e){var t=e.align?{textAlign:e.align}:void 0,r=u(e);return a(e.isHeader?"th":"td",t?n({style:t},r):r,e.children)},root:function(e){var t=!e.className,r=t&&i.Fragment||"div";return a(r,t?null:e,e.children)},text:function(e){return s?e.children:a("span",null,e.children)},list:function(e){var t=u(e);null!==e.start&&1!==e.start&&void 0!==e.start&&(t.start=e.start.toString());return a(e.ordered?"ol":"ul",t,e.children)},listItem:function(e){var t=null;if(null!==e.checked&&void 0!==e.checked){var r=e.checked;t=a("input",{type:"checkbox",checked:r,readOnly:!0})}return a("li",u(e),t,e.children)},definition:function(){return null},heading:function(e){return a("h".concat(e.level),u(e),e.children)},inlineCode:function(e){return a("code",u(e),e.children)},code:function(e){var t=e.language&&"language-".concat(e.language),r=a("code",t?{className:t}:null,e.value);return a("pre",u(e),r)},html:function(e){if(e.skipHtml)return null;var t=e.isBlock?"div":"span";if(e.escapeHtml){var r=i.Fragment||t;return a(r,null,e.value)}var n={dangerouslySetInnerHTML:{__html:e.value}};return a(t,n)},virtualHtml:function(e){return a(e.tag,u(e),e.children)},parsedHtml:function(e){return e["data-sourcepos"]?i.cloneElement(e.element,{"data-sourcepos":e["data-sourcepos"]}):e.element}}},function(e,t,r){"use strict";t.HtmlParser="undefined"===typeof Symbol?"__RMD_HTML_PARSER__":Symbol("__RMD_HTML_PARSER__")},,function(e,t,r){(function(t){var r=function(e){var t=/\blang(?:uage)?-([\w-]+)\b/i,r=0,n={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof i?new i(e.type,n.util.encode(e.content),e.alias):Array.isArray(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++r}),e.__id},clone:function e(t,r){var i,s,a=n.util.type(t);switch(r=r||{},a){case"Object":if(s=n.util.objId(t),r[s])return r[s];for(var o in i={},r[s]=i,t)t.hasOwnProperty(o)&&(i[o]=e(t[o],r));return i;case"Array":return s=n.util.objId(t),r[s]?r[s]:(i=[],r[s]=i,t.forEach((function(t,n){i[n]=e(t,r)})),i);default:return t}}},languages:{extend:function(e,t){var r=n.util.clone(n.languages[e]);for(var i in t)r[i]=t[i];return r},insertBefore:function(e,t,r,i){var s=(i=i||n.languages)[e],a={};for(var o in s)if(s.hasOwnProperty(o)){if(o==t)for(var u in r)r.hasOwnProperty(u)&&(a[u]=r[u]);r.hasOwnProperty(o)||(a[o]=s[o])}var l=i[e];return i[e]=a,n.languages.DFS(n.languages,(function(t,r){r===l&&t!=e&&(this[t]=a)})),a},DFS:function e(t,r,i,s){s=s||{};var a=n.util.objId;for(var o in t)if(t.hasOwnProperty(o)){r.call(t,o,t[o],i||o);var u=t[o],l=n.util.type(u);"Object"!==l||s[a(u)]?"Array"!==l||s[a(u)]||(s[a(u)]=!0,e(u,r,o,s)):(s[a(u)]=!0,e(u,r,null,s))}}},plugins:{},highlightAll:function(e,t){n.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,r){var i={callback:r,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",i);for(var s,a=e.querySelectorAll(i.selector),o=0;s=a[o++];)n.highlightElement(s,!0===t,i.callback)},highlightElement:function(r,i,s){for(var a,o="none",u=r;u&&!t.test(u.className);)u=u.parentNode;u&&(o=(u.className.match(t)||[,"none"])[1].toLowerCase(),a=n.languages[o]),r.className=r.className.replace(t,"").replace(/\s+/g," ")+" language-"+o,r.parentNode&&(u=r.parentNode,/pre/i.test(u.nodeName)&&(u.className=u.className.replace(t,"").replace(/\s+/g," ")+" language-"+o));var l={element:r,language:o,grammar:a,code:r.textContent},c=function(e){l.highlightedCode=e,n.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,n.hooks.run("after-highlight",l),n.hooks.run("complete",l),s&&s.call(l.element)};if(n.hooks.run("before-sanity-check",l),l.code)if(n.hooks.run("before-highlight",l),l.grammar)if(i&&e.Worker){var p=new Worker(n.filename);p.onmessage=function(e){c(e.data)},p.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else c(n.highlight(l.code,l.grammar,l.language));else c(n.util.encode(l.code));else n.hooks.run("complete",l)},highlight:function(e,t,r){var s={code:e,grammar:t,language:r};return n.hooks.run("before-tokenize",s),s.tokens=n.tokenize(s.code,s.grammar),n.hooks.run("after-tokenize",s),i.stringify(n.util.encode(s.tokens),s.language)},matchGrammar:function(e,t,r,s,a,o,u){for(var l in r)if(r.hasOwnProperty(l)&&r[l]){if(l==u)return;var c=r[l];c="Array"===n.util.type(c)?c:[c];for(var p=0;p<c.length;++p){var h=c[p],f=h.inside,d=!!h.lookbehind,m=!!h.greedy,y=0,g=h.alias;if(m&&!h.pattern.global){var v=h.pattern.toString().match(/[imuy]*$/)[0];h.pattern=RegExp(h.pattern.source,v+"g")}h=h.pattern||h;for(var b=s,E=a;b<t.length;E+=t[b].length,++b){var x=t[b];if(t.length>e.length)return;if(!(x instanceof i)){if(m&&b!=t.length-1){if(h.lastIndex=E,!(C=h.exec(e)))break;for(var A=C.index+(d?C[1].length:0),T=C.index+C[0].length,S=b,w=E,P=t.length;S<P&&(w<T||!t[S].type&&!t[S-1].greedy);++S)A>=(w+=t[S].length)&&(++b,E=w);if(t[b]instanceof i)continue;D=S-b,x=e.slice(E,w),C.index-=E}else{h.lastIndex=0;var C=h.exec(x),D=1}if(C){d&&(y=C[1]?C[1].length:0);T=(A=C.index+y)+(C=C[0].slice(y)).length;var k=x.slice(0,A),F=x.slice(T),O=[b,D];k&&(++b,E+=k.length,O.push(k));var _=new i(l,f?n.tokenize(C,f):C,g,C,m);if(O.push(_),F&&O.push(F),Array.prototype.splice.apply(t,O),1!=D&&n.matchGrammar(e,t,r,b,E,!0,l),o)break}else if(o)break}}}}},tokenize:function(e,t){var r=[e],i=t.rest;if(i){for(var s in i)t[s]=i[s];delete t.rest}return n.matchGrammar(e,r,t,0,0,!1),r},hooks:{all:{},add:function(e,t){var r=n.hooks.all;r[e]=r[e]||[],r[e].push(t)},run:function(e,t){var r=n.hooks.all[e];if(r&&r.length)for(var i,s=0;i=r[s++];)i(t)}},Token:i};function i(e,t,r,n,i){this.type=e,this.content=t,this.alias=r,this.length=0|(n||"").length,this.greedy=!!i}if(e.Prism=n,i.stringify=function(e,t){if("string"==typeof e)return e;if(Array.isArray(e))return e.map((function(e){return i.stringify(e,t)})).join("");var r={type:e.type,content:i.stringify(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t};if(e.alias){var s=Array.isArray(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(r.classes,s)}n.hooks.run("wrap",r);var a=Object.keys(r.attributes).map((function(e){return e+'="'+(r.attributes[e]||"").replace(/"/g,"&quot;")+'"'})).join(" ");return"<"+r.tag+' class="'+r.classes.join(" ")+'"'+(a?" "+a:"")+">"+r.content+"</"+r.tag+">"},!e.document)return e.addEventListener?(n.disableWorkerMessageHandler||e.addEventListener("message",(function(t){var r=JSON.parse(t.data),i=r.language,s=r.code,a=r.immediateClose;e.postMessage(n.highlight(s,n.languages[i],i)),a&&e.close()}),!1),n):n;var s=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return s&&(n.filename=s.src,n.manual||s.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),n}("undefined"!==typeof window?window:"undefined"!==typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{});e.exports&&(e.exports=r),"undefined"!==typeof t&&(t.Prism=r),r.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},r.languages.markup.tag.inside["attr-value"].inside.entity=r.languages.markup.entity,r.hooks.add("wrap",(function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))})),Object.defineProperty(r.languages.markup.tag,"addInlined",{value:function(e,t){var n={};n["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:r.languages[t]},n.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:n}};i["language-"+t]={pattern:/[\s\S]+/,inside:r.languages[t]};var s={};s[e]={pattern:RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g,e),"i"),lookbehind:!0,greedy:!0,inside:i},r.languages.insertBefore("markup","cdata",s)}}),r.languages.xml=r.languages.extend("markup",{}),r.languages.html=r.languages.markup,r.languages.mathml=r.languages.markup,r.languages.svg=r.languages.markup,function(e){var t=/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,inside:{rule:/@[\w-]+/}},url:{pattern:RegExp("url\\((?:"+t.source+"|[^\n\r()]*)\\)","i"),inside:{function:/^url/i,punctuation:/^\(|\)$/}},selector:RegExp("[^{}\\s](?:[^{};\"']|"+t.source+")*?(?=\\s*\\{)"),string:{pattern:t,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var r=e.languages.markup;r&&(r.tag.addInlined("style","css"),e.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:r.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:e.languages.css}},alias:"language-css"}},r.tag))}(r),r.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},r.languages.javascript=r.languages.extend("clike",{"class-name":[r.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,function:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),r.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,r.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:!0,inside:r.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:r.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:!0,inside:r.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:!0,inside:r.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),r.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:r.languages.javascript}},string:/[\s\S]+/}}}),r.languages.markup&&r.languages.markup.tag.addInlined("script","javascript"),r.languages.js=r.languages.javascript,"undefined"!==typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(e){e=e||document;var t={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.slice.call(e.querySelectorAll("pre[data-src]")).forEach((function(e){if(!e.hasAttribute("data-src-loaded")){for(var n,i=e.getAttribute("data-src"),s=e,a=/\blang(?:uage)?-([\w-]+)\b/i;s&&!a.test(s.className);)s=s.parentNode;if(s&&(n=(e.className.match(a)||[,""])[1]),!n){var o=(i.match(/\.(\w+)$/)||[,""])[1];n=t[o]||o}var u=document.createElement("code");u.className="language-"+n,e.textContent="",u.textContent="Loading\u2026",e.appendChild(u);var l=new XMLHttpRequest;l.open("GET",i,!0),l.onreadystatechange=function(){4==l.readyState&&(l.status<400&&l.responseText?(u.textContent=l.responseText,r.highlightElement(u),e.setAttribute("data-src-loaded","")):l.status>=400?u.textContent="\u2716 Error "+l.status+" while fetching file: "+l.statusText:u.textContent="\u2716 Error: File does not exist or is empty")},l.send(null)}})),r.plugins.toolbar&&r.plugins.toolbar.registerButton("download-file",(function(e){var t=e.element.parentNode;if(t&&/pre/i.test(t.nodeName)&&t.hasAttribute("data-src")&&t.hasAttribute("data-download-link")){var r=t.getAttribute("data-src"),n=document.createElement("a");return n.textContent=t.getAttribute("data-download-link-label")||"Download",n.setAttribute("download",""),n.href=r,n}}))},document.addEventListener("DOMContentLoaded",(function(){self.Prism.fileHighlight()})))}).call(this,r(39))},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,r){"use strict";var n=r(5);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(Object(r));"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){i(e,t,r[t])}))}return e}var a=r(9);function o(e,t){if(null==e)return{};var r,n,i=Object(a.a)(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=r(40),l=r.n(u),c=r(60);function p(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function h(e,t,r){return(h=p()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var i=new(Function.bind.apply(e,n));return r&&Object(c.a)(i,r.prototype),i}).apply(null,arguments)}var f=r(52),d=r(53),m=r(41),y=r(54),g=r(55),v=r(56),b=r(0),E=r.n(b),x=r(34),A=r.n(x),T=r(25),S=r.n(T),w=r(35),P=r(1),C=r.n(P),D=(r(374),r(59)),k=r(102),F=r.n(k),O=(r(216),function(e){function t(e){var r;return Object(d.a)(this,t),(r=Object(y.a)(this,Object(g.a)(t).call(this,e))).codemirror=null,r.editor=null,r}return Object(v.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.renderCodeMirror()}},{key:"renderCodeMirror",value:function(){var e=this;this.editor=F.a.fromTextArea(this.textarea,this.props.options),this.codemirror=F.a;var t=this.getEventHandleFromProps();Object.keys(t).forEach((function(r){e.editor.on(t[r],e.props[r])}));var r=this.props,n=r.value,i=r.width,s=r.height;this.editor.setValue(n||""),(i||s)&&this.editor.setSize(i,s)}},{key:"UNSAFE_componentWillReceiveProps",value:function(){var e=Object(f.a)(l.a.mark((function e(t){var r,n,i,s,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=this.editor.getValue(),void 0!==(n=t.value)&&n!==this.props.value&&n!==r&&this.editor.setValue(t.value),i=t.options,s=t.width,a=t.height,e.next=6,this.setOptions(i);case 6:s===this.props.width&&a===this.props.height||this.editor.setSize(s,a);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"setOptions",value:function(){var e=Object(f.a)(l.a.mark((function e(t){var n,i=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("object"!==Object(D.a)(t)){e.next=7;break}if(!(n=F.a.findModeByName(t.mode))||!n.mode){e.next=5;break}return e.next=5,r(375)("./".concat(n.mode,"/").concat(n.mode,".js"));case 5:n&&(t.mode=n.mime),Object.keys(t).forEach((function(e){t[e]&&JSON.stringify(t[e])&&i.editor.setOption(e,t[e])}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.editor&&this.editor.toTextArea()}},{key:"getEventHandleFromProps",value:function(){var e=Object.keys(this.props).filter((function(e){return/^on+/.test(e)})),t={};return e.forEach((function(e){t[e]=e.slice(2).toLowerCase()})),t}},{key:"render",value:function(){var e=this;return E.a.createElement("textarea",{ref:function(t){e.textarea=t}})}}]),t}(b.Component));O.defaultProps={value:"",options:{},width:"100%",height:"100%"},O.propTypes={value:C.a.string,options:C.a.object,width:C.a.oneOfType([C.a.string,C.a.number]),height:C.a.oneOfType([C.a.string,C.a.number])};r(376);var _=function(e){function t(e){var r;return Object(d.a)(this,t),r=Object(y.a)(this,Object(g.a)(t).call(this,e)),i(Object(w.a)(r),"getInstance",(function(e){e&&(r.codemirror=e.codemirror,r.editor=e.editor)})),r.state={codeMirrorOptions:{}},r}return Object(v.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(f.a)(l.a.mark((function e(){var t,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props.options,r=Object.assign({tabSize:2,autoCloseBrackets:!0,matchBrackets:!0,showCursorWhenSelecting:!0,lineNumbers:!0,fullScreen:!0},t),this.setState({codeMirrorOptions:r});case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"UNSAFE_componentWillReceiveProps",value:function(){var e=Object(f.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setState({codeMirrorOptions:Object.assign({},this.state.codeMirrorOptions,{},t.options)});case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props,t=(e.options,o(e,["options"])),r=this.state.codeMirrorOptions;return E.a.createElement(O,Object(n.a)({},t,{ref:this.getInstance,options:Object.assign({},r)}))}}]),t}(b.Component);_.defaultProps={value:"",options:{}},_.propTypes={value:C.a.string,options:C.a.object};var I=r(377),N=r.n(I),M=r(1120),B=(r(378),function(e){function t(){return Object(d.a)(this,t),Object(y.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.options,r=e.btnText,i=e.prefixCls,a=o(e,["options","btnText","prefixCls"]),u=s({editors:"0010",js_pre_processor:"babel"},t);return E.a.createElement("form",Object(n.a)({action:"https://codepen.io/pen/define",method:"POST",target:"_blank"},a,{className:"".concat(i,"-form")}),E.a.createElement("input",{type:"hidden",name:"data",value:JSON.stringify(u)}),E.a.createElement("button",{type:"submit"},E.a.createElement("svg",{viewBox:"0 0 100 100",width:"21",height:"21"},E.a.createElement("path",{d:"M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3L88 34.8 73 44.9 54.3 32.4V12.3zm-8.6 0v20L27.1 44.8 12 34.8l33.7-22.5zM8.6 42.8L19.3 50 8.6 57.2V42.8zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2L34.8 50 50 39.8 65.2 50 50 60.2zm4.3 27.5v-20l18.6-12.5 15 10.1-33.6 22.4zm37.1-30.5L80.7 50l10.8-7.2-.1 14.4z"})),E.a.createElement("span",null,r)))}}]),t}(E.a.Component));B.defaultProps={btnText:"CodePen",prefixCls:"",options:{title:"",html:"",js:"",css:"",editors:"0010",css_external:"",js_external:"",js_pre_processor:"babel"}};var L={full:E.a.createElement("svg",{viewBox:"0 0 1024 1024"},E.a.createElement("path",{d:"M909 959H780a30 30 0 0 1 0-60h99a20 20 0 0 0 20-20v-99a30 30 0 0 1 60 0v129a50 50 0 0 1-50 50z m20-685a30 30 0 0 1-30-30v-99a20 20 0 0 0-20-20h-99a30 30 0 0 1 0-60h129a50 50 0 0 1 50 50v129a30 30 0 0 1-30 30z m-157 28v420a50 50 0 0 1-50 50H302a50 50 0 0 1-50-50V302a50 50 0 0 1 50-50h420a50 50 0 0 1 50 50z m-60 30a20 20 0 0 0-20-20H332a20 20 0 0 0-20 20v360a20 20 0 0 0 20 20h360a20 20 0 0 0 20-20V332zM244 125h-99a20 20 0 0 0-20 20v99a30 30 0 0 1-60 0V115a50 50 0 0 1 50-50h129a30 30 0 0 1 0 60zM95 750a30 30 0 0 1 30 30v99a20 20 0 0 0 20 20h99a30 30 0 0 1 0 60H115a50 50 0 0 1-50-50V780a30 30 0 0 1 30-30z"})),bgPlaid:E.a.createElement("svg",{width:"100%",height:"100%",preserveAspectRatio:"none",style:{display:"block"}},E.a.createElement("pattern",{id:"pattern",x:"0",y:"0",width:"16",height:"16",patternUnits:"userSpaceOnUse"},E.a.createElement("rect",{fill:"rgba(0, 0, 0, 0.06)",x:"0",width:"8",height:"8",y:"0"}),E.a.createElement("rect",{fill:"rgba(0, 0, 0, 0.06)",x:"8",width:"8",height:"8",y:"8"})),E.a.createElement("rect",{fill:"url(#pattern)",x:"0",y:"0",width:"100%",height:"100%"})),copy:E.a.createElement("svg",{viewBox:"0 0 1024 1024"},E.a.createElement("path",{d:"M869.865 46.545a107.706 107.706 0 0 1 107.59 107.567v599.412a107.706 107.706 0 0 1-107.59 107.567h-148.41v8.797a107.683 107.683 0 0 1-107.567 107.567H154.112A107.683 107.683 0 0 1 46.545 869.888V270.476a107.683 107.683 0 0 1 107.567-107.567h148.433v-8.797a107.706 107.706 0 0 1 107.59-107.567h459.73z m-715.73 861.091h459.73a37.841 37.841 0 0 0 37.771-37.748V270.476c0-20.806-16.942-37.749-37.748-37.749H154.135c-20.806 0-37.771 16.943-37.771 37.749v599.412c0 20.83 16.965 37.748 37.771 37.748z m753.501-154.112V154.112c0-20.806-16.965-37.748-37.771-37.748h-459.73c-20.806 0-37.771 16.942-37.771 37.748v8.797h241.524a107.683 107.683 0 0 1 107.567 107.567v520.797h148.41c20.806 0 37.771-16.92 37.771-37.749z m-384-381.16a34.91 34.91 0 0 1 0 69.818H244.364a34.91 34.91 0 0 1 0-69.818h279.272z m0 162.909a34.91 34.91 0 0 1 0 69.818H244.364a34.91 34.91 0 0 1 0-69.818h279.272z m-93.09 162.909a34.91 34.91 0 0 1 0 69.818H244.363a34.91 34.91 0 0 1 0-69.818h186.181z"}))},j=r(379),R=r(380),U=r.n(R),W=r(381),V=r.n(W);function q(e){return G.apply(this,arguments)}function G(){return(G=Object(f.a)(l.a.mark((function e(t){var r,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=[],n=Object(j.transform)(t,{presets:["es2015","react"],plugins:[[U.a,{removeAll:!0}],[V.a,{loose:!0}]]}).code,e.abrupt("return",{code:n,specifiers:r});case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}r(657),r(658);r.d(t,"a",(function(){return H}));var H=function(e){function t(e){var r;return Object(d.a)(this,t),(r=Object(y.a)(this,Object(g.a)(t).call(this,e))).demoDom=E.a.createRef(),r.editor=E.a.createRef(),r.language="",r.initHeight=3,r.playerId="".concat(parseInt(String(1e9*Math.random()),10).toString(36)),r.state={errorMessage:"",fullScreen:!1,copied:!1,showEdit:!1,width:1},r}return Object(v.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.language;this.language="string"===typeof e?e:e&&e.name||"",this.props.noPreview||this.executeCode(this.props.code),window.addEventListener("popstate",(function(e){document.body.style.overflow="inherit"}),!1)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=e.language;this.language="string"===typeof t?t:t&&t.name||"",e.noPreview!==this.props.noPreview&&this.executeCode(this.props.code)}},{key:"executeCode",value:function(){var e=Object(f.a)(l.a.mark((function e(t){var r,n,i,s,a,o,u,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(/(jsx|js)/.test(this.language)){e.next=2;break}return e.abrupt("return");case 2:for(s in e.prev=2,r=["context","React","ReactDOM","Component"],n=[this,E.a,A.a,b.Component],i=this.props.dependencies)r.push(s),n.push(i[s]);return t=t.replace("_mount_","document.getElementById('".concat(this.playerId,"')")),a="".concat(t),e.next=11,q(a);case 11:o=e.sent,u=o.code,r.push(u),h(Function,r).apply(null,n),this.setState({errorMessage:""}),e.next=23;break;case 18:e.prev=18,e.t0=e.catch(2),c="",c=e.t0&&e.t0.message?e.t0.message:JSON.stringify(e.t0),this.setState({errorMessage:c});case 23:case"end":return e.stop()}}),e,this,[[2,18]])})));return function(t){return e.apply(this,arguments)}}()},{key:"onCopyCode",value:function(){var e=this,t=this.props.code;N()(t||"",(function(t){e.setState({copied:t})})),setTimeout((function(){e.setState({copied:!1})}),2e3)}},{key:"onFullScreen",value:function(){var e=this,t=this.state.fullScreen;this.setState({fullScreen:!t},(function(){document.body.style.overflow=t?"inherit":"hidden",!t&&e.demoDom.current&&(e.demoDom.current.style.maxWidth="inherit")}))}},{key:"initOldHeight",value:function(){var e=this.demoDom.current;3===this.initHeight&&e&&(this.initHeight=e.clientHeight)}},{key:"onSwitchSource",value:function(){var e=this,t=this.state.width;this.initOldHeight(),this.setState({width:1===t?"50%":1,showEdit:!0},(function(){var r=e.editor.current;r&&r.editor.setSize("100%",1!==t?e.initHeight:"100%")}))}},{key:"render",value:function(){var e,t,r=this,a=this.props,u=a.style,l=a.prefixCls,c=a.language,p=a.className,h=a.editProps,f=a.codePenOption,d=a.code,m=(a.dependencies,a.onlyEdit),y=a.bordered,g=a.noCode,v=a.noPreview,b=a.noScroll,x=a.bgWhite,A=o(a,["style","prefixCls","language","className","editProps","codePenOption","code","dependencies","onlyEdit","bordered","noCode","noPreview","noScroll","bgWhite"]),T=!(!g&&!v)&&(!g||!v),w=1!==this.state.width&&[T?1:2];return E.a.createElement(M.a,Object(n.a)({visiable:w,className:S()(p,l,(e={},i(e,"".concat(l,"-noScroll"),b),i(e,"".concat(l,"-OneItem"),T),i(e,"".concat(l,"-bordered"),y),i(e,"".concat(l,"-fullScreen"),this.state.fullScreen),e)),style:s({flex:1},u)},A),!v&&!m&&E.a.createElement("div",{ref:this.demoDom,className:S()("".concat(l,"-demo"),(t={},i(t,"".concat(l,"-demo-bgPlaid"),!x),i(t,"".concat(l,"-demo-error"),this.state.errorMessage),t)),style:s({flex:1},1===this.state.width?{width:"100%"}:{})},this.state.errorMessage&&E.a.createElement("pre",null,E.a.createElement("code",null,this.state.errorMessage)),E.a.createElement("div",{className:S()("".concat(l,"-demo-source"),i({},"error",this.state.errorMessage)),id:this.playerId})),(!g||m)&&E.a.createElement("div",{style:{overflow:"hidden",width:m?"100%":this.state.width}},(this.state.showEdit||m)&&E.a.createElement(_,Object(n.a)({value:(d||"").replace(/\n$/,""),ref:this.editor,options:{theme:"monokai",mode:c}},h,{onChange:function(e){r.executeCode(e.getValue())}}))),!T&&!(g&&v)&&!m&&E.a.createElement("div",{style:{flex:1,width:29},className:"".concat(l,"-bar")},f&&E.a.createElement(B,{prefixCls:l,options:f}),E.a.createElement("div",{className:"".concat(l,"-bar-btn"),onClick:this.onSwitchSource.bind(this)},1===this.state.width?"\u6e90\u7801":"\u9690\u85cf\u7f16\u8f91\u5668"),E.a.createElement("div",{className:S()("".concat(l,"-bar-iconbtns"),i({},"".concat(l,"-bar-copied"),this.state.copied)),onClick:this.onCopyCode.bind(this)},L.copy),E.a.createElement("div",{className:S()("".concat(l,"-bar-iconbtns"),i({},"".concat(l,"-bar-copied"),this.state.fullScreen)),onClick:this.onFullScreen.bind(this)},L.full)))}}]),t}(E.a.PureComponent);H.defaultProps={prefixCls:"w-code-preview",language:"jsx",code:"",editProps:{},noCode:!1,bgWhite:!1,onlyEdit:!1,noPreview:!1,bordered:!0}}])]);