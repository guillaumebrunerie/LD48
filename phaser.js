(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Phaser", [], factory);
	else if(typeof exports === 'object')
		exports["Phaser"] = factory();
	else
		root["Phaser"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1526);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

//  Taken from klasse by mattdesl https://github.com/mattdesl/klasse

function hasGetterOrSetter (def)
{
    return (!!def.get && typeof def.get === 'function') || (!!def.set && typeof def.set === 'function');
}

function getProperty (definition, k, isClassDescriptor)
{
    //  This may be a lightweight object, OR it might be a property that was defined previously.

    //  For simple class descriptors we can just assume its NOT previously defined.
    var def = (isClassDescriptor) ? definition[k] : Object.getOwnPropertyDescriptor(definition, k);

    if (!isClassDescriptor && def.value && typeof def.value === 'object')
    {
        def = def.value;
    }

    //  This might be a regular property, or it may be a getter/setter the user defined in a class.
    if (def && hasGetterOrSetter(def))
    {
        if (typeof def.enumerable === 'undefined')
        {
            def.enumerable = true;
        }

        if (typeof def.configurable === 'undefined')
        {
            def.configurable = true;
        }

        return def;
    }
    else
    {
        return false;
    }
}

function hasNonConfigurable (obj, k)
{
    var prop = Object.getOwnPropertyDescriptor(obj, k);

    if (!prop)
    {
        return false;
    }

    if (prop.value && typeof prop.value === 'object')
    {
        prop = prop.value;
    }

    if (prop.configurable === false)
    {
        return true;
    }

    return false;
}

/**
 * Extends the given `myClass` object's prototype with the properties of `definition`.
 *
 * @function extend
 * @ignore
 * @param {Object} ctor The constructor object to mix into.
 * @param {Object} definition A dictionary of functions for the class.
 * @param {boolean} isClassDescriptor Is the definition a class descriptor?
 * @param {Object} [extend] The parent constructor object.
 */
function extend (ctor, definition, isClassDescriptor, extend)
{
    for (var k in definition)
    {
        if (!definition.hasOwnProperty(k))
        {
            continue;
        }

        var def = getProperty(definition, k, isClassDescriptor);

        if (def !== false)
        {
            //  If Extends is used, we will check its prototype to see if the final variable exists.

            var parent = extend || ctor;

            if (hasNonConfigurable(parent.prototype, k))
            {
                //  Just skip the final property
                if (Class.ignoreFinals)
                {
                    continue;
                }

                //  We cannot re-define a property that is configurable=false.
                //  So we will consider them final and throw an error. This is by
                //  default so it is clear to the developer what is happening.
                //  You can set ignoreFinals to true if you need to extend a class
                //  which has configurable=false; it will simply not re-define final properties.
                throw new Error('cannot override final property \'' + k + '\', set Class.ignoreFinals = true to skip');
            }

            Object.defineProperty(ctor.prototype, k, def);
        }
        else
        {
            ctor.prototype[k] = definition[k];
        }
    }
}

/**
 * Applies the given `mixins` to the prototype of `myClass`.
 *
 * @function mixin
 * @ignore
 * @param {Object} myClass The constructor object to mix into.
 * @param {Object|Array<Object>} mixins The mixins to apply to the constructor.
 */
function mixin (myClass, mixins)
{
    if (!mixins)
    {
        return;
    }

    if (!Array.isArray(mixins))
    {
        mixins = [ mixins ];
    }

    for (var i = 0; i < mixins.length; i++)
    {
        extend(myClass, mixins[i].prototype || mixins[i]);
    }
}

/**
 * Creates a new class with the given descriptor.
 * The constructor, defined by the name `initialize`,
 * is an optional function. If unspecified, an anonymous
 * function will be used which calls the parent class (if
 * one exists).
 *
 * You can also use `Extends` and `Mixins` to provide subclassing
 * and inheritance.
 *
 * @class Phaser.Class
 * @constructor
 * @param {Object} definition a dictionary of functions for the class
 * @example
 *
 *      var MyClass = new Phaser.Class({
 *
 *          initialize: function() {
 *              this.foo = 2.0;
 *          },
 *
 *          bar: function() {
 *              return this.foo + 5;
 *          }
 *      });
 */
function Class (definition)
{
    if (!definition)
    {
        definition = {};
    }

    //  The variable name here dictates what we see in Chrome debugger
    var initialize;
    var Extends;

    if (definition.initialize)
    {
        if (typeof definition.initialize !== 'function')
        {
            throw new Error('initialize must be a function');
        }

        initialize = definition.initialize;

        //  Usually we should avoid 'delete' in V8 at all costs.
        //  However, its unlikely to make any performance difference
        //  here since we only call this on class creation (i.e. not object creation).
        delete definition.initialize;
    }
    else if (definition.Extends)
    {
        var base = definition.Extends;

        initialize = function ()
        {
            base.apply(this, arguments);
        };
    }
    else
    {
        initialize = function () {};
    }

    if (definition.Extends)
    {
        initialize.prototype = Object.create(definition.Extends.prototype);
        initialize.prototype.constructor = initialize;

        //  For getOwnPropertyDescriptor to work, we need to act directly on the Extends (or Mixin)

        Extends = definition.Extends;

        delete definition.Extends;
    }
    else
    {
        initialize.prototype.constructor = initialize;
    }

    //  Grab the mixins, if they are specified...
    var mixins = null;

    if (definition.Mixins)
    {
        mixins = definition.Mixins;
        delete definition.Mixins;
    }

    //  First, mixin if we can.
    mixin(initialize, mixins);

    //  Now we grab the actual definition which defines the overrides.
    extend(initialize, definition, true, Extends);

    return initialize;
}

Class.extend = extend;
Class.mixin = mixin;
Class.ignoreFinals = false;

module.exports = Class;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * A NOOP (No Operation) callback function.
 *
 * Used internally by Phaser when it's more expensive to determine if a callback exists
 * than it is to just invoke an empty function.
 *
 * @function Phaser.Utils.NOOP
 * @since 3.0.0
 */
var NOOP = function ()
{
    //  NOOP
};

module.exports = NOOP;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Finds the key within the top level of the {@link source} object, or returns {@link defaultValue}
 *
 * @function Phaser.Utils.Objects.GetFastValue
 * @since 3.0.0
 *
 * @param {object} source - The object to search
 * @param {string} key - The key for the property on source. Must exist at the top level of the source object (no periods)
 * @param {*} [defaultValue] - The default value to use if the key does not exist.
 *
 * @return {*} The value if found; otherwise, defaultValue (null if none provided)
 */
var GetFastValue = function (source, key, defaultValue)
{
    var t = typeof(source);

    if (!source || t === 'number' || t === 'string')
    {
        return defaultValue;
    }
    else if (source.hasOwnProperty(key) && source[key] !== undefined)
    {
        return source[key];
    }
    else
    {
        return defaultValue;
    }
};

module.exports = GetFastValue;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

//  Adapted from [gl-matrix](https://github.com/toji/gl-matrix) by toji
//  and [vecmath](https://github.com/mattdesl/vecmath) by mattdesl

var Class = __webpack_require__(0);
var FuzzyEqual = __webpack_require__(125);

/**
 * @classdesc
 * A representation of a vector in 2D space.
 *
 * A two-component vector.
 *
 * @class Vector2
 * @memberof Phaser.Math
 * @constructor
 * @since 3.0.0
 *
 * @param {number|Phaser.Types.Math.Vector2Like} [x] - The x component, or an object with `x` and `y` properties.
 * @param {number} [y] - The y component.
 */
var Vector2 = new Class({

    initialize:

    function Vector2 (x, y)
    {
        /**
         * The x component of this Vector.
         *
         * @name Phaser.Math.Vector2#x
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x = 0;

        /**
         * The y component of this Vector.
         *
         * @name Phaser.Math.Vector2#y
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y = 0;

        if (typeof x === 'object')
        {
            this.x = x.x || 0;
            this.y = x.y || 0;
        }
        else
        {
            if (y === undefined) { y = x; }

            this.x = x || 0;
            this.y = y || 0;
        }
    },

    /**
     * Make a clone of this Vector2.
     *
     * @method Phaser.Math.Vector2#clone
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} A clone of this Vector2.
     */
    clone: function ()
    {
        return new Vector2(this.x, this.y);
    },

    /**
     * Copy the components of a given Vector into this Vector.
     *
     * @method Phaser.Math.Vector2#copy
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} src - The Vector to copy the components from.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    copy: function (src)
    {
        this.x = src.x || 0;
        this.y = src.y || 0;

        return this;
    },

    /**
     * Set the component values of this Vector from a given Vector2Like object.
     *
     * @method Phaser.Math.Vector2#setFromObject
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} obj - The object containing the component values to set for this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setFromObject: function (obj)
    {
        this.x = obj.x || 0;
        this.y = obj.y || 0;

        return this;
    },

    /**
     * Set the `x` and `y` components of the this Vector to the given `x` and `y` values.
     *
     * @method Phaser.Math.Vector2#set
     * @since 3.0.0
     *
     * @param {number} x - The x value to set for this Vector.
     * @param {number} [y=x] - The y value to set for this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    set: function (x, y)
    {
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    },

    /**
     * This method is an alias for `Vector2.set`.
     *
     * @method Phaser.Math.Vector2#setTo
     * @since 3.4.0
     *
     * @param {number} x - The x value to set for this Vector.
     * @param {number} [y=x] - The y value to set for this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setTo: function (x, y)
    {
        return this.set(x, y);
    },

    /**
     * Sets the `x` and `y` values of this object from a given polar coordinate.
     *
     * @method Phaser.Math.Vector2#setToPolar
     * @since 3.0.0
     *
     * @param {number} azimuth - The angular coordinate, in radians.
     * @param {number} [radius=1] - The radial coordinate (length).
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setToPolar: function (azimuth, radius)
    {
        if (radius == null) { radius = 1; }

        this.x = Math.cos(azimuth) * radius;
        this.y = Math.sin(azimuth) * radius;

        return this;
    },

    /**
     * Check whether this Vector is equal to a given Vector.
     *
     * Performs a strict equality check against each Vector's components.
     *
     * @method Phaser.Math.Vector2#equals
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} v - The vector to compare with this Vector.
     *
     * @return {boolean} Whether the given Vector is equal to this Vector.
     */
    equals: function (v)
    {
        return ((this.x === v.x) && (this.y === v.y));
    },

    /**
     * Check whether this Vector is approximately equal to a given Vector.
     *
     * @method Phaser.Math.Vector2#fuzzyEquals
     * @since 3.23.0
     *
     * @param {Phaser.Types.Math.Vector2Like} v - The vector to compare with this Vector.
     * @param {number} [epsilon=0.0001] - The tolerance value.
     *
     * @return {boolean} Whether both absolute differences of the x and y components are smaller than `epsilon`.
     */
    fuzzyEquals: function (v, epsilon)
    {
        return (FuzzyEqual(this.x, v.x, epsilon) && FuzzyEqual(this.y, v.y, epsilon));
    },

    /**
     * Calculate the angle between this Vector and the positive x-axis, in radians.
     *
     * @method Phaser.Math.Vector2#angle
     * @since 3.0.0
     *
     * @return {number} The angle between this Vector, and the positive x-axis, given in radians.
     */
    angle: function ()
    {
        // computes the angle in radians with respect to the positive x-axis

        var angle = Math.atan2(this.y, this.x);

        if (angle < 0)
        {
            angle += 2 * Math.PI;
        }

        return angle;
    },

    /**
     * Set the angle of this Vector.
     *
     * @method Phaser.Math.Vector2#setAngle
     * @since 3.23.0
     *
     * @param {number} angle - The angle, in radians.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setAngle: function (angle)
    {
        return this.setToPolar(angle, this.length());
    },

    /**
     * Add a given Vector to this Vector. Addition is component-wise.
     *
     * @method Phaser.Math.Vector2#add
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} src - The Vector to add to this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    add: function (src)
    {
        this.x += src.x;
        this.y += src.y;

        return this;
    },

    /**
     * Subtract the given Vector from this Vector. Subtraction is component-wise.
     *
     * @method Phaser.Math.Vector2#subtract
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} src - The Vector to subtract from this Vector.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    subtract: function (src)
    {
        this.x -= src.x;
        this.y -= src.y;

        return this;
    },

    /**
     * Perform a component-wise multiplication between this Vector and the given Vector.
     *
     * Multiplies this Vector by the given Vector.
     *
     * @method Phaser.Math.Vector2#multiply
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} src - The Vector to multiply this Vector by.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    multiply: function (src)
    {
        this.x *= src.x;
        this.y *= src.y;

        return this;
    },

    /**
     * Scale this Vector by the given value.
     *
     * @method Phaser.Math.Vector2#scale
     * @since 3.0.0
     *
     * @param {number} value - The value to scale this Vector by.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    scale: function (value)
    {
        if (isFinite(value))
        {
            this.x *= value;
            this.y *= value;
        }
        else
        {
            this.x = 0;
            this.y = 0;
        }

        return this;
    },

    /**
     * Perform a component-wise division between this Vector and the given Vector.
     *
     * Divides this Vector by the given Vector.
     *
     * @method Phaser.Math.Vector2#divide
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} src - The Vector to divide this Vector by.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    divide: function (src)
    {
        this.x /= src.x;
        this.y /= src.y;

        return this;
    },

    /**
     * Negate the `x` and `y` components of this Vector.
     *
     * @method Phaser.Math.Vector2#negate
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    negate: function ()
    {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    },

    /**
     * Calculate the distance between this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector2#distance
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} src - The Vector to calculate the distance to.
     *
     * @return {number} The distance from this Vector to the given Vector.
     */
    distance: function (src)
    {
        var dx = src.x - this.x;
        var dy = src.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    },

    /**
     * Calculate the distance between this Vector and the given Vector, squared.
     *
     * @method Phaser.Math.Vector2#distanceSq
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} src - The Vector to calculate the distance to.
     *
     * @return {number} The distance from this Vector to the given Vector, squared.
     */
    distanceSq: function (src)
    {
        var dx = src.x - this.x;
        var dy = src.y - this.y;

        return dx * dx + dy * dy;
    },

    /**
     * Calculate the length (or magnitude) of this Vector.
     *
     * @method Phaser.Math.Vector2#length
     * @since 3.0.0
     *
     * @return {number} The length of this Vector.
     */
    length: function ()
    {
        var x = this.x;
        var y = this.y;

        return Math.sqrt(x * x + y * y);
    },

    /**
     * Set the length (or magnitude) of this Vector.
     *
     * @method Phaser.Math.Vector2#setLength
     * @since 3.23.0
     *
     * @param {number} length
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    setLength: function (length)
    {
        return this.normalize().scale(length);
    },

    /**
     * Calculate the length of this Vector squared.
     *
     * @method Phaser.Math.Vector2#lengthSq
     * @since 3.0.0
     *
     * @return {number} The length of this Vector, squared.
     */
    lengthSq: function ()
    {
        var x = this.x;
        var y = this.y;

        return x * x + y * y;
    },

    /**
     * Normalize this Vector.
     *
     * Makes the vector a unit length vector (magnitude of 1) in the same direction.
     *
     * @method Phaser.Math.Vector2#normalize
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    normalize: function ()
    {
        var x = this.x;
        var y = this.y;
        var len = x * x + y * y;

        if (len > 0)
        {
            len = 1 / Math.sqrt(len);

            this.x = x * len;
            this.y = y * len;
        }

        return this;
    },

    /**
     * Rotate this Vector to its perpendicular, in the positive direction.
     *
     * @method Phaser.Math.Vector2#normalizeRightHand
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    normalizeRightHand: function ()
    {
        var x = this.x;

        this.x = this.y * -1;
        this.y = x;

        return this;
    },

    /**
     * Rotate this Vector to its perpendicular, in the negative direction.
     *
     * @method Phaser.Math.Vector2#normalizeLeftHand
     * @since 3.23.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    normalizeLeftHand: function ()
    {
        var x = this.x;

        this.x = this.y;
        this.y = x * -1;

        return this;
    },

    /**
     * Calculate the dot product of this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector2#dot
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} src - The Vector2 to dot product with this Vector2.
     *
     * @return {number} The dot product of this Vector and the given Vector.
     */
    dot: function (src)
    {
        return this.x * src.x + this.y * src.y;
    },

    /**
     * Calculate the cross product of this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector2#cross
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} src - The Vector2 to cross with this Vector2.
     *
     * @return {number} The cross product of this Vector and the given Vector.
     */
    cross: function (src)
    {
        return this.x * src.y - this.y * src.x;
    },

    /**
     * Linearly interpolate between this Vector and the given Vector.
     *
     * Interpolates this Vector towards the given Vector.
     *
     * @method Phaser.Math.Vector2#lerp
     * @since 3.0.0
     *
     * @param {Phaser.Types.Math.Vector2Like} src - The Vector2 to interpolate towards.
     * @param {number} [t=0] - The interpolation percentage, between 0 and 1.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    lerp: function (src, t)
    {
        if (t === undefined) { t = 0; }

        var ax = this.x;
        var ay = this.y;

        this.x = ax + t * (src.x - ax);
        this.y = ay + t * (src.y - ay);

        return this;
    },

    /**
     * Transform this Vector with the given Matrix.
     *
     * @method Phaser.Math.Vector2#transformMat3
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix3} mat - The Matrix3 to transform this Vector2 with.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    transformMat3: function (mat)
    {
        var x = this.x;
        var y = this.y;
        var m = mat.val;

        this.x = m[0] * x + m[3] * y + m[6];
        this.y = m[1] * x + m[4] * y + m[7];

        return this;
    },

    /**
     * Transform this Vector with the given Matrix.
     *
     * @method Phaser.Math.Vector2#transformMat4
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix4} mat - The Matrix4 to transform this Vector2 with.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    transformMat4: function (mat)
    {
        var x = this.x;
        var y = this.y;
        var m = mat.val;

        this.x = m[0] * x + m[4] * y + m[12];
        this.y = m[1] * x + m[5] * y + m[13];

        return this;
    },

    /**
     * Make this Vector the zero vector (0, 0).
     *
     * @method Phaser.Math.Vector2#reset
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    reset: function ()
    {
        this.x = 0;
        this.y = 0;

        return this;
    },

    /**
     * Limit the length (or magnitude) of this Vector.
     *
     * @method Phaser.Math.Vector2#limit
     * @since 3.23.0
     *
     * @param {number} max - The maximum length.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    limit: function (max)
    {
        var len = this.length();

        if (len && len > max)
        {
            this.scale(max / len);
        }

        return this;
    },

    /**
     * Reflect this Vector off a line defined by a normal.
     *
     * @method Phaser.Math.Vector2#reflect
     * @since 3.23.0
     *
     * @param {Phaser.Math.Vector2} normal - A vector perpendicular to the line.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    reflect: function (normal)
    {
        normal = normal.clone().normalize();

        return this.subtract(normal.scale(2 * this.dot(normal)));
    },

    /**
     * Reflect this Vector across another.
     *
     * @method Phaser.Math.Vector2#mirror
     * @since 3.23.0
     *
     * @param {Phaser.Math.Vector2} axis - A vector to reflect across.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    mirror: function (axis)
    {
        return this.reflect(axis).negate();
    },

    /**
     * Rotate this Vector by an angle amount.
     *
     * @method Phaser.Math.Vector2#rotate
     * @since 3.23.0
     *
     * @param {number} delta - The angle to rotate by, in radians.
     *
     * @return {Phaser.Math.Vector2} This Vector2.
     */
    rotate: function (delta)
    {
        var cos = Math.cos(delta);
        var sin = Math.sin(delta);

        return this.set(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
    }

});

/**
 * A static zero Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector2.ZERO
 * @type {Phaser.Math.Vector2}
 * @since 3.1.0
 */
Vector2.ZERO = new Vector2();

/**
 * A static right Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector2.RIGHT
 * @type {Phaser.Math.Vector2}
 * @since 3.16.0
 */
Vector2.RIGHT = new Vector2(1, 0);

/**
 * A static left Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector2.LEFT
 * @type {Phaser.Math.Vector2}
 * @since 3.16.0
 */
Vector2.LEFT = new Vector2(-1, 0);

/**
 * A static up Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector2.UP
 * @type {Phaser.Math.Vector2}
 * @since 3.16.0
 */
Vector2.UP = new Vector2(0, -1);

/**
 * A static down Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector2.DOWN
 * @type {Phaser.Math.Vector2}
 * @since 3.16.0
 */
Vector2.DOWN = new Vector2(0, 1);

/**
 * A static one Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector2.ONE
 * @type {Phaser.Math.Vector2}
 * @since 3.16.0
 */
Vector2.ONE = new Vector2(1, 1);

module.exports = Vector2;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var GEOM_CONST = __webpack_require__(56);

/**
 * @classdesc
 * Defines a Point in 2D space, with an x and y component.
 *
 * @class Point
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x=0] - The x coordinate of this Point.
 * @param {number} [y=x] - The y coordinate of this Point.
 */
var Point = new Class({

    initialize:

    function Point (x, y)
    {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = x; }

        /**
         * The geometry constant type of this object: `GEOM_CONST.POINT`.
         * Used for fast type comparisons.
         *
         * @name Phaser.Geom.Point#type
         * @type {number}
         * @readonly
         * @since 3.19.0
         */
        this.type = GEOM_CONST.POINT;

        /**
         * The x coordinate of this Point.
         *
         * @name Phaser.Geom.Point#x
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x = x;

        /**
         * The y coordinate of this Point.
         *
         * @name Phaser.Geom.Point#y
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y = y;
    },

    /**
     * Set the x and y coordinates of the point to the given values.
     *
     * @method Phaser.Geom.Point#setTo
     * @since 3.0.0
     *
     * @param {number} [x=0] - The x coordinate of this Point.
     * @param {number} [y=x] - The y coordinate of this Point.
     *
     * @return {this} This Point object.
     */
    setTo: function (x, y)
    {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    }

});

module.exports = Point;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var PluginCache = __webpack_require__(24);
var SceneEvents = __webpack_require__(20);

/**
 * @classdesc
 * The Game Object Factory is a Scene plugin that allows you to quickly create many common
 * types of Game Objects and have them automatically registered with the Scene.
 *
 * Game Objects directly register themselves with the Factory and inject their own creation
 * methods into the class.
 *
 * @class GameObjectFactory
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object Factory belongs.
 */
var GameObjectFactory = new Class({

    initialize:

    function GameObjectFactory (scene)
    {
        /**
         * The Scene to which this Game Object Factory belongs.
         *
         * @name Phaser.GameObjects.GameObjectFactory#scene
         * @type {Phaser.Scene}
         * @protected
         * @since 3.0.0
         */
        this.scene = scene;

        /**
         * A reference to the Scene.Systems.
         *
         * @name Phaser.GameObjects.GameObjectFactory#systems
         * @type {Phaser.Scenes.Systems}
         * @protected
         * @since 3.0.0
         */
        this.systems = scene.sys;

        /**
         * A reference to the Scene Event Emitter.
         *
         * @name Phaser.GameObjects.GameObjectFactory#events
         * @type {Phaser.Events.EventEmitter}
         * @protected
         * @since 3.50.0
         */
        this.events = scene.sys.events;

        /**
         * A reference to the Scene Display List.
         *
         * @name Phaser.GameObjects.GameObjectFactory#displayList
         * @type {Phaser.GameObjects.DisplayList}
         * @protected
         * @since 3.0.0
         */
        this.displayList;

        /**
         * A reference to the Scene Update List.
         *
         * @name Phaser.GameObjects.GameObjectFactory#updateList
         * @type {Phaser.GameObjects.UpdateList}
         * @protected
         * @since 3.0.0
         */
        this.updateList;

        this.events.once(SceneEvents.BOOT, this.boot, this);
        this.events.on(SceneEvents.START, this.start, this);
    },

    /**
     * This method is called automatically, only once, when the Scene is first created.
     * Do not invoke it directly.
     *
     * @method Phaser.GameObjects.GameObjectFactory#boot
     * @private
     * @since 3.5.1
     */
    boot: function ()
    {
        this.displayList = this.systems.displayList;
        this.updateList = this.systems.updateList;

        this.events.once(SceneEvents.DESTROY, this.destroy, this);
    },

    /**
     * This method is called automatically by the Scene when it is starting up.
     * It is responsible for creating local systems, properties and listening for Scene events.
     * Do not invoke it directly.
     *
     * @method Phaser.GameObjects.GameObjectFactory#start
     * @private
     * @since 3.5.0
     */
    start: function ()
    {
        this.events.once(SceneEvents.SHUTDOWN, this.shutdown, this);
    },

    /**
     * Adds an existing Game Object to this Scene.
     *
     * If the Game Object renders, it will be added to the Display List.
     * If it has a `preUpdate` method, it will be added to the Update List.
     *
     * @method Phaser.GameObjects.GameObjectFactory#existing
     * @since 3.0.0
     *
     * @generic {(Phaser.GameObjects.GameObject|Phaser.GameObjects.Group)} G - [child,$return]
     *
     * @param {(Phaser.GameObjects.GameObject|Phaser.GameObjects.Group)} child - The child to be added to this Scene.
     *
     * @return {Phaser.GameObjects.GameObject} The Game Object that was added.
     */
    existing: function (child)
    {
        if (child.renderCanvas || child.renderWebGL)
        {
            this.displayList.add(child);
        }

        //  For when custom objects have overridden `preUpdate` but don't hook into the ADDED_TO_SCENE event:
        //  Adding to the list multiple times is safe, as it won't add duplicates into the list anyway.
        if (child.preUpdate)
        {
            this.updateList.add(child);
        }

        return child;
    },

    /**
     * The Scene that owns this plugin is shutting down.
     * We need to kill and reset all internal properties as well as stop listening to Scene events.
     *
     * @method Phaser.GameObjects.GameObjectFactory#shutdown
     * @private
     * @since 3.0.0
     */
    shutdown: function ()
    {
        this.events.off(SceneEvents.SHUTDOWN, this.shutdown, this);
    },

    /**
     * The Scene that owns this plugin is being destroyed.
     * We need to shutdown and then kill off all external references.
     *
     * @method Phaser.GameObjects.GameObjectFactory#destroy
     * @private
     * @since 3.0.0
     */
    destroy: function ()
    {
        this.shutdown();

        this.events.off(SceneEvents.START, this.start, this);

        this.scene = null;
        this.systems = null;
        this.events = null;

        this.displayList = null;
        this.updateList = null;
    }

});

/**
 * Static method called directly by the Game Object factory functions.
 * With this method you can register a custom GameObject factory in the GameObjectFactory,
 * providing a name (`factoryType`) and the constructor (`factoryFunction`) in order
 * to be called when you call to Phaser.Scene.add[ factoryType ] method.
 *
 * @method Phaser.GameObjects.GameObjectFactory.register
 * @static
 * @since 3.0.0
 *
 * @param {string} factoryType - The key of the factory that you will use to call to Phaser.Scene.add[ factoryType ] method.
 * @param {function} factoryFunction - The constructor function to be called when you invoke to the Phaser.Scene.add method.
 */
GameObjectFactory.register = function (factoryType, factoryFunction)
{
    if (!GameObjectFactory.prototype.hasOwnProperty(factoryType))
    {
        GameObjectFactory.prototype[factoryType] = factoryFunction;
    }
};

/**
 * Static method called directly by the Game Object factory functions.
 * With this method you can remove a custom GameObject factory registered in the GameObjectFactory,
 * providing a its `factoryType`.
 *
 * @method Phaser.GameObjects.GameObjectFactory.remove
 * @static
 * @since 3.0.0
 *
 * @param {string} factoryType - The key of the factory that you want to remove from the GameObjectFactory.
 */
GameObjectFactory.remove = function (factoryType)
{
    if (GameObjectFactory.prototype.hasOwnProperty(factoryType))
    {
        delete GameObjectFactory.prototype[factoryType];
    }
};

PluginCache.register('GameObjectFactory', GameObjectFactory, 'add');

module.exports = GameObjectFactory;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

//  Source object
//  The key as a string, or an array of keys, i.e. 'banner', or 'banner.hideBanner'
//  The default value to use if the key doesn't exist

/**
 * Retrieves a value from an object.
 *
 * @function Phaser.Utils.Objects.GetValue
 * @since 3.0.0
 *
 * @param {object} source - The object to retrieve the value from.
 * @param {string} key - The name of the property to retrieve from the object. If a property is nested, the names of its preceding properties should be separated by a dot (`.`) - `banner.hideBanner` would return the value of the `hideBanner` property from the object stored in the `banner` property of the `source` object.
 * @param {*} defaultValue - The value to return if the `key` isn't found in the `source` object.
 *
 * @return {*} The value of the requested key.
 */
var GetValue = function (source, key, defaultValue)
{
    if (!source || typeof source === 'number')
    {
        return defaultValue;
    }
    else if (source.hasOwnProperty(key))
    {
        return source[key];
    }
    else if (key.indexOf('.') !== -1)
    {
        var keys = key.split('.');
        var parent = source;
        var value = defaultValue;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++)
        {
            if (parent.hasOwnProperty(keys[i]))
            {
                //  Yes it has a key property, let's carry on down
                value = parent[keys[i]];

                parent = parent[keys[i]];
            }
            else
            {
                //  Can't go any further, so reset to default
                value = defaultValue;
                break;
            }
        }

        return value;
    }
    else
    {
        return defaultValue;
    }
};

module.exports = GetValue;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * This is a slightly modified version of jQuery.isPlainObject.
 * A plain object is an object whose internal class property is [object Object].
 *
 * @function Phaser.Utils.Objects.IsPlainObject
 * @since 3.0.0
 *
 * @param {object} obj - The object to inspect.
 *
 * @return {boolean} `true` if the object is plain, otherwise `false`.
 */
var IsPlainObject = function (obj)
{
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (typeof(obj) !== 'object' || obj.nodeType || obj === obj.window)
    {
        return false;
    }

    // Support: Firefox <20
    // The try/catch suppresses exceptions thrown when attempting to access
    // the "constructor" property of certain host objects, ie. |window.location|
    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
    try
    {
        if (obj.constructor && !({}).hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf'))
        {
            return false;
        }
    }
    catch (e)
    {
        return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
};

module.exports = IsPlainObject;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var types = {};

/**
 * @namespace Phaser.Loader.FileTypesManager
 */

var FileTypesManager = {

    /**
     * Static method called when a LoaderPlugin is created.
     * 
     * Loops through the local types object and injects all of them as
     * properties into the LoaderPlugin instance.
     *
     * @method Phaser.Loader.FileTypesManager.install
     * @since 3.0.0
     * 
     * @param {Phaser.Loader.LoaderPlugin} loader - The LoaderPlugin to install the types into.
     */
    install: function (loader)
    {
        for (var key in types)
        {
            loader[key] = types[key];
        }
    },

    /**
     * Static method called directly by the File Types.
     * 
     * The key is a reference to the function used to load the files via the Loader, i.e. `image`.
     *
     * @method Phaser.Loader.FileTypesManager.register
     * @since 3.0.0
     * 
     * @param {string} key - The key that will be used as the method name in the LoaderPlugin.
     * @param {function} factoryFunction - The function that will be called when LoaderPlugin.key is invoked.
     */
    register: function (key, factoryFunction)
    {
        types[key] = factoryFunction;
    },

    /**
     * Removed all associated file types.
     *
     * @method Phaser.Loader.FileTypesManager.destroy
     * @since 3.0.0
     */
    destroy: function ()
    {
        types = {};
    }

};

module.exports = FileTypesManager;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var Contains = __webpack_require__(57);
var GetPoint = __webpack_require__(171);
var GetPoints = __webpack_require__(306);
var GEOM_CONST = __webpack_require__(56);
var Line = __webpack_require__(47);
var Random = __webpack_require__(174);

/**
 * @classdesc
 * Encapsulates a 2D rectangle defined by its corner point in the top-left and its extends in x (width) and y (height)
 *
 * @class Rectangle
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x=0] - The X coordinate of the top left corner of the Rectangle.
 * @param {number} [y=0] - The Y coordinate of the top left corner of the Rectangle.
 * @param {number} [width=0] - The width of the Rectangle.
 * @param {number} [height=0] - The height of the Rectangle.
 */
var Rectangle = new Class({

    initialize:

    function Rectangle (x, y, width, height)
    {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 0; }
        if (height === undefined) { height = 0; }

        /**
         * The geometry constant type of this object: `GEOM_CONST.RECTANGLE`.
         * Used for fast type comparisons.
         *
         * @name Phaser.Geom.Rectangle#type
         * @type {number}
         * @readonly
         * @since 3.19.0
         */
        this.type = GEOM_CONST.RECTANGLE;

        /**
         * The X coordinate of the top left corner of the Rectangle.
         *
         * @name Phaser.Geom.Rectangle#x
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x = x;

        /**
         * The Y coordinate of the top left corner of the Rectangle.
         *
         * @name Phaser.Geom.Rectangle#y
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y = y;

        /**
         * The width of the Rectangle, i.e. the distance between its left side (defined by `x`) and its right side.
         *
         * @name Phaser.Geom.Rectangle#width
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.width = width;

        /**
         * The height of the Rectangle, i.e. the distance between its top side (defined by `y`) and its bottom side.
         *
         * @name Phaser.Geom.Rectangle#height
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.height = height;
    },

    /**
     * Checks if the given point is inside the Rectangle's bounds.
     *
     * @method Phaser.Geom.Rectangle#contains
     * @since 3.0.0
     *
     * @param {number} x - The X coordinate of the point to check.
     * @param {number} y - The Y coordinate of the point to check.
     *
     * @return {boolean} `true` if the point is within the Rectangle's bounds, otherwise `false`.
     */
    contains: function (x, y)
    {
        return Contains(this, x, y);
    },

    /**
     * Calculates the coordinates of a point at a certain `position` on the Rectangle's perimeter.
     * 
     * The `position` is a fraction between 0 and 1 which defines how far into the perimeter the point is.
     * 
     * A value of 0 or 1 returns the point at the top left corner of the rectangle, while a value of 0.5 returns the point at the bottom right corner of the rectangle. Values between 0 and 0.5 are on the top or the right side and values between 0.5 and 1 are on the bottom or the left side.
     *
     * @method Phaser.Geom.Rectangle#getPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [output,$return]
     *
     * @param {number} position - The normalized distance into the Rectangle's perimeter to return.
     * @param {(Phaser.Geom.Point|object)} [output] - An object to update with the `x` and `y` coordinates of the point.
     *
     * @return {(Phaser.Geom.Point|object)} The updated `output` object, or a new Point if no `output` object was given.
     */
    getPoint: function (position, output)
    {
        return GetPoint(this, position, output);
    },

    /**
     * Returns an array of points from the perimeter of the Rectangle, each spaced out based on the quantity or step required.
     *
     * @method Phaser.Geom.Rectangle#getPoints
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point[]} O - [output,$return]
     *
     * @param {number} quantity - The number of points to return. Set to `false` or 0 to return an arbitrary number of points (`perimeter / stepRate`) evenly spaced around the Rectangle based on the `stepRate`.
     * @param {number} [stepRate] - If `quantity` is 0, determines the normalized distance between each returned point.
     * @param {(array|Phaser.Geom.Point[])} [output] - An array to which to append the points.
     *
     * @return {(array|Phaser.Geom.Point[])} The modified `output` array, or a new array if none was provided.
     */
    getPoints: function (quantity, stepRate, output)
    {
        return GetPoints(this, quantity, stepRate, output);
    },

    /**
     * Returns a random point within the Rectangle's bounds.
     *
     * @method Phaser.Geom.Rectangle#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [point,$return]
     *
     * @param {Phaser.Geom.Point} [point] - The object in which to store the `x` and `y` coordinates of the point.
     *
     * @return {Phaser.Geom.Point} The updated `point`, or a new Point if none was provided.
     */
    getRandomPoint: function (point)
    {
        return Random(this, point);
    },

    /**
     * Sets the position, width, and height of the Rectangle.
     *
     * @method Phaser.Geom.Rectangle#setTo
     * @since 3.0.0
     *
     * @param {number} x - The X coordinate of the top left corner of the Rectangle.
     * @param {number} y - The Y coordinate of the top left corner of the Rectangle.
     * @param {number} width - The width of the Rectangle.
     * @param {number} height - The height of the Rectangle.
     *
     * @return {this} This Rectangle object.
     */
    setTo: function (x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;
    },

    /**
     * Resets the position, width, and height of the Rectangle to 0.
     *
     * @method Phaser.Geom.Rectangle#setEmpty
     * @since 3.0.0
     *
     * @return {this} This Rectangle object.
     */
    setEmpty: function ()
    {
        return this.setTo(0, 0, 0, 0);
    },

    /**
     * Sets the position of the Rectangle.
     *
     * @method Phaser.Geom.Rectangle#setPosition
     * @since 3.0.0
     *
     * @param {number} x - The X coordinate of the top left corner of the Rectangle.
     * @param {number} [y=x] - The Y coordinate of the top left corner of the Rectangle.
     *
     * @return {this} This Rectangle object.
     */
    setPosition: function (x, y)
    {
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    },

    /**
     * Sets the width and height of the Rectangle.
     *
     * @method Phaser.Geom.Rectangle#setSize
     * @since 3.0.0
     *
     * @param {number} width - The width to set the Rectangle to.
     * @param {number} [height=width] - The height to set the Rectangle to.
     *
     * @return {this} This Rectangle object.
     */
    setSize: function (width, height)
    {
        if (height === undefined) { height = width; }

        this.width = width;
        this.height = height;

        return this;
    },

    /**
     * Determines if the Rectangle is empty. A Rectangle is empty if its width or height is less than or equal to 0.
     *
     * @method Phaser.Geom.Rectangle#isEmpty
     * @since 3.0.0
     *
     * @return {boolean} `true` if the Rectangle is empty. A Rectangle object is empty if its width or height is less than or equal to 0.
     */
    isEmpty: function ()
    {
        return (this.width <= 0 || this.height <= 0);
    },

    /**
     * Returns a Line object that corresponds to the top of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineA
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the top of this Rectangle.
     */
    getLineA: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.x, this.y, this.right, this.y);

        return line;
    },

    /**
     * Returns a Line object that corresponds to the right of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineB
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the right of this Rectangle.
     */
    getLineB: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.right, this.y, this.right, this.bottom);

        return line;
    },

    /**
     * Returns a Line object that corresponds to the bottom of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineC
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the bottom of this Rectangle.
     */
    getLineC: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.right, this.bottom, this.x, this.bottom);

        return line;
    },

    /**
     * Returns a Line object that corresponds to the left of this Rectangle.
     *
     * @method Phaser.Geom.Rectangle#getLineD
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Line} O - [line,$return]
     *
     * @param {Phaser.Geom.Line} [line] - A Line object to set the results in. If `undefined` a new Line will be created.
     *
     * @return {Phaser.Geom.Line} A Line object that corresponds to the left of this Rectangle.
     */
    getLineD: function (line)
    {
        if (line === undefined) { line = new Line(); }

        line.setTo(this.x, this.bottom, this.x, this.y);

        return line;
    },

    /**
     * The x coordinate of the left of the Rectangle.
     * Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
     *
     * @name Phaser.Geom.Rectangle#left
     * @type {number}
     * @since 3.0.0
     */
    left: {

        get: function ()
        {
            return this.x;
        },

        set: function (value)
        {
            if (value >= this.right)
            {
                this.width = 0;
            }
            else
            {
                this.width = this.right - value;
            }

            this.x = value;
        }

    },

    /**
     * The sum of the x and width properties.
     * Changing the right property of a Rectangle object has no effect on the x, y and height properties, however it does affect the width property.
     *
     * @name Phaser.Geom.Rectangle#right
     * @type {number}
     * @since 3.0.0
     */
    right: {

        get: function ()
        {
            return this.x + this.width;
        },

        set: function (value)
        {
            if (value <= this.x)
            {
                this.width = 0;
            }
            else
            {
                this.width = value - this.x;
            }
        }

    },

    /**
     * The y coordinate of the top of the Rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties.
     * However it does affect the height property, whereas changing the y value does not affect the height property.
     *
     * @name Phaser.Geom.Rectangle#top
     * @type {number}
     * @since 3.0.0
     */
    top: {

        get: function ()
        {
            return this.y;
        },

        set: function (value)
        {
            if (value >= this.bottom)
            {
                this.height = 0;
            }
            else
            {
                this.height = (this.bottom - value);
            }

            this.y = value;
        }

    },

    /**
     * The sum of the y and height properties.
     * Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
     *
     * @name Phaser.Geom.Rectangle#bottom
     * @type {number}
     * @since 3.0.0
     */
    bottom: {

        get: function ()
        {
            return this.y + this.height;
        },

        set: function (value)
        {
            if (value <= this.y)
            {
                this.height = 0;
            }
            else
            {
                this.height = value - this.y;
            }
        }

    },

    /**
     * The x coordinate of the center of the Rectangle.
     *
     * @name Phaser.Geom.Rectangle#centerX
     * @type {number}
     * @since 3.0.0
     */
    centerX: {

        get: function ()
        {
            return this.x + (this.width / 2);
        },

        set: function (value)
        {
            this.x = value - (this.width / 2);
        }

    },

    /**
     * The y coordinate of the center of the Rectangle.
     *
     * @name Phaser.Geom.Rectangle#centerY
     * @type {number}
     * @since 3.0.0
     */
    centerY: {

        get: function ()
        {
            return this.y + (this.height / 2);
        },

        set: function (value)
        {
            this.y = value - (this.height / 2);
        }

    }

});

module.exports = Rectangle;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * @namespace Phaser.GameObjects.Components
 */

module.exports = {

    Alpha: __webpack_require__(607),
    AlphaSingle: __webpack_require__(303),
    BlendMode: __webpack_require__(304),
    ComputedSize: __webpack_require__(608),
    Crop: __webpack_require__(609),
    Depth: __webpack_require__(305),
    Flip: __webpack_require__(610),
    GetBounds: __webpack_require__(611),
    Mask: __webpack_require__(309),
    Origin: __webpack_require__(632),
    PathFollower: __webpack_require__(633),
    Pipeline: __webpack_require__(167),
    ScrollFactor: __webpack_require__(312),
    Size: __webpack_require__(634),
    Texture: __webpack_require__(635),
    TextureCrop: __webpack_require__(636),
    Tint: __webpack_require__(637),
    ToJSON: __webpack_require__(176),
    Transform: __webpack_require__(313),
    TransformMatrix: __webpack_require__(25),
    Visible: __webpack_require__(314)

};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Felipe Alfonso <@bitnenfer>
 * @author       Matthew Groves <@doormat>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Generate shader source to test maximum ifs.
 *
 * @private
 * @ignore
 * @param {number} maxIfs - The number of if statements to generate
 */
function GenerateSrc (maxIfs)
{
    var src = '';

    for (var i = 0; i < maxIfs; ++i)
    {
        if (i > 0)
        {
            src += '\nelse ';
        }

        if (i < maxIfs - 1)
        {
            src += 'if(test == ' + i + '.0){}';
        }
    }

    return src;
}

/**
 * @namespace Phaser.Renderer.WebGL.Utils
 * @since 3.0.0
 */
module.exports = {

    /**
     * Packs four floats on a range from 0.0 to 1.0 into a single Uint32
     *
     * @function Phaser.Renderer.WebGL.Utils.getTintFromFloats
     * @since 3.0.0
     *
     * @param {number} r - Red component in a range from 0.0 to 1.0
     * @param {number} g - Green component in a range from 0.0 to 1.0
     * @param {number} b - Blue component in a range from 0.0 to 1.0
     * @param {number} a - Alpha component in a range from 0.0 to 1.0
     *
     * @return {number} The packed RGBA values as a Uint32.
     */
    getTintFromFloats: function (r, g, b, a)
    {
        var ur = ((r * 255) | 0) & 0xff;
        var ug = ((g * 255) | 0) & 0xff;
        var ub = ((b * 255) | 0) & 0xff;
        var ua = ((a * 255) | 0) & 0xff;

        return ((ua << 24) | (ur << 16) | (ug << 8) | ub) >>> 0;
    },

    /**
     * Packs a Uint24, representing RGB components, with a Float32, representing
     * the alpha component, with a range between 0.0 and 1.0 and return a Uint32
     *
     * @function Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha
     * @since 3.0.0
     *
     * @param {number} rgb - Uint24 representing RGB components
     * @param {number} a - Float32 representing Alpha component
     *
     * @return {number} Packed RGBA as Uint32
     */
    getTintAppendFloatAlpha: function (rgb, a)
    {
        var ua = ((a * 255) | 0) & 0xff;

        return ((ua << 24) | rgb) >>> 0;
    },

    /**
     * Packs a Uint24, representing RGB components, with a Float32, representing
     * the alpha component, with a range between 0.0 and 1.0 and return a
     * swizzled Uint32
     *
     * @function Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlphaAndSwap
     * @since 3.0.0
     *
     * @param {number} rgb - Uint24 representing RGB components
     * @param {number} a - Float32 representing Alpha component
     *
     * @return {number} Packed RGBA as Uint32
     */
    getTintAppendFloatAlphaAndSwap: function (rgb, a)
    {
        var ur = ((rgb >> 16) | 0) & 0xff;
        var ug = ((rgb >> 8) | 0) & 0xff;
        var ub = (rgb | 0) & 0xff;
        var ua = ((a * 255) | 0) & 0xff;

        return ((ua << 24) | (ub << 16) | (ug << 8) | ur) >>> 0;
    },

    /**
     * Unpacks a Uint24 RGB into an array of floats of ranges of 0.0 and 1.0
     *
     * @function Phaser.Renderer.WebGL.Utils.getFloatsFromUintRGB
     * @since 3.0.0
     *
     * @param {number} rgb - RGB packed as a Uint24
     *
     * @return {array} Array of floats representing each component as a float
     */
    getFloatsFromUintRGB: function (rgb)
    {
        var ur = ((rgb >> 16) | 0) & 0xff;
        var ug = ((rgb >> 8) | 0) & 0xff;
        var ub = (rgb | 0) & 0xff;

        return [ ur / 255, ug / 255, ub / 255 ];
    },

    /**
     * Check to see how many texture units the GPU supports, based on the given config value.
     * Then tests this against the maximum number of iterations GLSL can support.
     *
     * @function Phaser.Renderer.WebGL.Utils.checkShaderMax
     * @since 3.50.0
     *
     * @param {WebGLRenderingContext} gl - The WebGLContext used to create the shaders.
     * @param {number} maxTextures - The Game Config maxTextures value.
     *
     * @return {number} The number of texture units that is supported by this browser and GPU.
     */
    checkShaderMax: function (gl, maxTextures)
    {
        if (!maxTextures || maxTextures === -1)
        {
            maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        }

        var shader = gl.createShader(gl.FRAGMENT_SHADER);

        var fragTemplate = [
            'precision mediump float;',
            'void main(void){',
            'float test = 0.1;',
            '%forloop%',
            'gl_FragColor = vec4(0.0);',
            '}'
        ].join('\n');

        // eslint-disable-next-line no-constant-condition
        while (true)
        {
            var fragmentSrc = fragTemplate.replace(/%forloop%/gi, GenerateSrc(maxTextures));

            gl.shaderSource(shader, fragmentSrc);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
            {
                maxTextures = (maxTextures / 2) | 0;
            }
            else
            {
                // valid!
                break;
            }
        }

        return maxTextures;
    },

    /**
     * Checks the given Fragment Shader Source for `%count%` and `%forloop%` declarations and
     * replaces those with GLSL code for setting `texture = texture2D(uMainSampler[i], outTexCoord)`.
     *
     * @function Phaser.Renderer.WebGL.Utils.parseFragmentShaderMaxTextures
     * @since 3.50.0
     *
     * @param {string} fragmentShaderSource - The Fragment Shader source code to operate on.
     * @param {number} maxTextures - The number of maxTextures value.
     *
     * @return {string} The modified Fragment Shader source.
     */
    parseFragmentShaderMaxTextures: function (fragmentShaderSource, maxTextures)
    {
        if (!fragmentShaderSource)
        {
            return '';
        }

        var src = '';

        for (var i = 0; i < maxTextures; i++)
        {
            if (i > 0)
            {
                src += '\n\telse ';
            }

            if (i < maxTextures - 1)
            {
                src += 'if (outTexId < ' + i + '.5)';
            }

            src += '\n\t{';
            src += '\n\t\ttexture = texture2D(uMainSampler[' + i + '], outTexCoord);';
            src += '\n\t}';
        }

        fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, maxTextures.toString());

        return fragmentShaderSource.replace(/%forloop%/gi, src);
    }
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var MATH = __webpack_require__(193);
var GetValue = __webpack_require__(6);

/**
 * Retrieves a value from an object. Allows for more advanced selection options, including:
 *
 * Allowed types:
 * 
 * Implicit
 * {
 *     x: 4
 * }
 *
 * From function
 * {
 *     x: function ()
 * }
 *
 * Randomly pick one element from the array
 * {
 *     x: [a, b, c, d, e, f]
 * }
 *
 * Random integer between min and max:
 * {
 *     x: { randInt: [min, max] }
 * }
 *
 * Random float between min and max:
 * {
 *     x: { randFloat: [min, max] }
 * }
 * 
 *
 * @function Phaser.Utils.Objects.GetAdvancedValue
 * @since 3.0.0
 *
 * @param {object} source - The object to retrieve the value from.
 * @param {string} key - The name of the property to retrieve from the object. If a property is nested, the names of its preceding properties should be separated by a dot (`.`) - `banner.hideBanner` would return the value of the `hideBanner` property from the object stored in the `banner` property of the `source` object.
 * @param {*} defaultValue - The value to return if the `key` isn't found in the `source` object.
 *
 * @return {*} The value of the requested key.
 */
var GetAdvancedValue = function (source, key, defaultValue)
{
    var value = GetValue(source, key, null);

    if (value === null)
    {
        return defaultValue;
    }
    else if (Array.isArray(value))
    {
        return MATH.RND.pick(value);
    }
    else if (typeof value === 'object')
    {
        if (value.hasOwnProperty('randInt'))
        {
            return MATH.RND.integerInRange(value.randInt[0], value.randInt[1]);
        }
        else if (value.hasOwnProperty('randFloat'))
        {
            return MATH.RND.realInRange(value.randFloat[0], value.randFloat[1]);
        }
    }
    else if (typeof value === 'function')
    {
        return value(key);
    }

    return value;
};

module.exports = GetAdvancedValue;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var MATH_CONST = {

    /**
     * The value of PI * 2.
     * 
     * @name Phaser.Math.PI2
     * @type {number}
     * @since 3.0.0
     */
    PI2: Math.PI * 2,

    /**
     * The value of PI * 0.5.
     * 
     * @name Phaser.Math.TAU
     * @type {number}
     * @since 3.0.0
     */
    TAU: Math.PI * 0.5,

    /**
     * An epsilon value (1.0e-6)
     * 
     * @name Phaser.Math.EPSILON
     * @type {number}
     * @since 3.0.0
     */
    EPSILON: 1.0e-6,

    /**
     * For converting degrees to radians (PI / 180)
     * 
     * @name Phaser.Math.DEG_TO_RAD
     * @type {number}
     * @since 3.0.0
     */
    DEG_TO_RAD: Math.PI / 180,

    /**
     * For converting radians to degrees (180 / PI)
     * 
     * @name Phaser.Math.RAD_TO_DEG
     * @type {number}
     * @since 3.0.0
     */
    RAD_TO_DEG: 180 / Math.PI,

    /**
     * An instance of the Random Number Generator.
     * This is not set until the Game boots.
     * 
     * @name Phaser.Math.RND
     * @type {Phaser.Math.RandomDataGenerator}
     * @since 3.0.0
     */
    RND: null,

    /**
     * The minimum safe integer this browser supports.
     * We use a const for backward compatibility with Internet Explorer.
     * 
     * @name Phaser.Math.MIN_SAFE_INTEGER
     * @type {number}
     * @since 3.21.0
     */
    MIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER || -9007199254740991,

    /**
     * The maximum safe integer this browser supports.
     * We use a const for backward compatibility with Internet Explorer.
     * 
     * @name Phaser.Math.MAX_SAFE_INTEGER
     * @type {number}
     * @since 3.21.0
     */
    MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991

};

module.exports = MATH_CONST;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var ComponentsToJSON = __webpack_require__(176);
var DataManager = __webpack_require__(101);
var EventEmitter = __webpack_require__(9);
var Events = __webpack_require__(76);
var SceneEvents = __webpack_require__(20);

/**
 * @classdesc
 * The base class that all Game Objects extend.
 * You don't create GameObjects directly and they cannot be added to the display list.
 * Instead, use them as the base for your own custom classes.
 *
 * @class GameObject
 * @memberof Phaser.GameObjects
 * @extends Phaser.Events.EventEmitter
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object belongs.
 * @param {string} type - A textual representation of the type of Game Object, i.e. `sprite`.
 */
var GameObject = new Class({

    Extends: EventEmitter,

    initialize:

    function GameObject (scene, type)
    {
        EventEmitter.call(this);

        /**
         * A reference to the Scene to which this Game Object belongs.
         *
         * Game Objects can only belong to one Scene.
         *
         * You should consider this property as being read-only. You cannot move a
         * Game Object to another Scene by simply changing it.
         *
         * @name Phaser.GameObjects.GameObject#scene
         * @type {Phaser.Scene}
         * @since 3.0.0
         */
        this.scene = scene;

        /**
         * Holds a reference to the Display List that contains this Game Object.
         *
         * This is set automatically when this Game Object is added to a Scene or Layer.
         *
         * You should treat this property as being read-only.
         *
         * @name Phaser.GameObjects.GameObject#displayList
         * @type {(Phaser.GameObjects.DisplayList|Phaser.GameObjects.Layer)}
         * @default null
         * @since 3.50.0
         */
        this.displayList = null;

        /**
         * A textual representation of this Game Object, i.e. `sprite`.
         * Used internally by Phaser but is available for your own custom classes to populate.
         *
         * @name Phaser.GameObjects.GameObject#type
         * @type {string}
         * @since 3.0.0
         */
        this.type = type;

        /**
         * The current state of this Game Object.
         *
         * Phaser itself will never modify this value, although plugins may do so.
         *
         * Use this property to track the state of a Game Object during its lifetime. For example, it could change from
         * a state of 'moving', to 'attacking', to 'dead'. The state value should be an integer (ideally mapped to a constant
         * in your game code), or a string. These are recommended to keep it light and simple, with fast comparisons.
         * If you need to store complex data about your Game Object, look at using the Data Component instead.
         *
         * @name Phaser.GameObjects.GameObject#state
         * @type {(number|string)}
         * @since 3.16.0
         */
        this.state = 0;

        /**
         * The parent Container of this Game Object, if it has one.
         *
         * @name Phaser.GameObjects.GameObject#parentContainer
         * @type {Phaser.GameObjects.Container}
         * @since 3.4.0
         */
        this.parentContainer = null;

        /**
         * The name of this Game Object.
         * Empty by default and never populated by Phaser, this is left for developers to use.
         *
         * @name Phaser.GameObjects.GameObject#name
         * @type {string}
         * @default ''
         * @since 3.0.0
         */
        this.name = '';

        /**
         * The active state of this Game Object.
         * A Game Object with an active state of `true` is processed by the Scenes UpdateList, if added to it.
         * An active object is one which is having its logic and internal systems updated.
         *
         * @name Phaser.GameObjects.GameObject#active
         * @type {boolean}
         * @default true
         * @since 3.0.0
         */
        this.active = true;

        /**
         * The Tab Index of the Game Object.
         * Reserved for future use by plugins and the Input Manager.
         *
         * @name Phaser.GameObjects.GameObject#tabIndex
         * @type {number}
         * @default -1
         * @since 3.0.0
         */
        this.tabIndex = -1;

        /**
         * A Data Manager.
         * It allows you to store, query and get key/value paired information specific to this Game Object.
         * `null` by default. Automatically created if you use `getData` or `setData` or `setDataEnabled`.
         *
         * @name Phaser.GameObjects.GameObject#data
         * @type {Phaser.Data.DataManager}
         * @default null
         * @since 3.0.0
         */
        this.data = null;

        /**
         * The flags that are compared against `RENDER_MASK` to determine if this Game Object will render or not.
         * The bits are 0001 | 0010 | 0100 | 1000 set by the components Visible, Alpha, Transform and Texture respectively.
         * If those components are not used by your custom class then you can use this bitmask as you wish.
         *
         * @name Phaser.GameObjects.GameObject#renderFlags
         * @type {number}
         * @default 15
         * @since 3.0.0
         */
        this.renderFlags = 15;

        /**
         * A bitmask that controls if this Game Object is drawn by a Camera or not.
         * Not usually set directly, instead call `Camera.ignore`, however you can
         * set this property directly using the Camera.id property:
         *
         * @example
         * this.cameraFilter |= camera.id
         *
         * @name Phaser.GameObjects.GameObject#cameraFilter
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.cameraFilter = 0;

        /**
         * If this Game Object is enabled for input then this property will contain an InteractiveObject instance.
         * Not usually set directly. Instead call `GameObject.setInteractive()`.
         *
         * @name Phaser.GameObjects.GameObject#input
         * @type {?Phaser.Types.Input.InteractiveObject}
         * @default null
         * @since 3.0.0
         */
        this.input = null;

        /**
         * If this Game Object is enabled for Arcade or Matter Physics then this property will contain a reference to a Physics Body.
         *
         * @name Phaser.GameObjects.GameObject#body
         * @type {?(Phaser.Physics.Arcade.Body|Phaser.Physics.Arcade.StaticBody|MatterJS.BodyType)}
         * @default null
         * @since 3.0.0
         */
        this.body = null;

        /**
         * This Game Object will ignore all calls made to its destroy method if this flag is set to `true`.
         * This includes calls that may come from a Group, Container or the Scene itself.
         * While it allows you to persist a Game Object across Scenes, please understand you are entirely
         * responsible for managing references to and from this Game Object.
         *
         * @name Phaser.GameObjects.GameObject#ignoreDestroy
         * @type {boolean}
         * @default false
         * @since 3.5.0
         */
        this.ignoreDestroy = false;

        this.on(Events.ADDED_TO_SCENE, this.addedToScene, this);
        this.on(Events.REMOVED_FROM_SCENE, this.removedFromScene, this);

        //  Tell the Scene to re-sort the children
        scene.sys.queueDepthSort();
    },

    /**
     * Sets the `active` property of this Game Object and returns this Game Object for further chaining.
     * A Game Object with its `active` property set to `true` will be updated by the Scenes UpdateList.
     *
     * @method Phaser.GameObjects.GameObject#setActive
     * @since 3.0.0
     *
     * @param {boolean} value - True if this Game Object should be set as active, false if not.
     *
     * @return {this} This GameObject.
     */
    setActive: function (value)
    {
        this.active = value;

        return this;
    },

    /**
     * Sets the `name` property of this Game Object and returns this Game Object for further chaining.
     * The `name` property is not populated by Phaser and is presented for your own use.
     *
     * @method Phaser.GameObjects.GameObject#setName
     * @since 3.0.0
     *
     * @param {string} value - The name to be given to this Game Object.
     *
     * @return {this} This GameObject.
     */
    setName: function (value)
    {
        this.name = value;

        return this;
    },

    /**
     * Sets the current state of this Game Object.
     *
     * Phaser itself will never modify the State of a Game Object, although plugins may do so.
     *
     * For example, a Game Object could change from a state of 'moving', to 'attacking', to 'dead'.
     * The state value should typically be an integer (ideally mapped to a constant
     * in your game code), but could also be a string. It is recommended to keep it light and simple.
     * If you need to store complex data about your Game Object, look at using the Data Component instead.
     *
     * @method Phaser.GameObjects.GameObject#setState
     * @since 3.16.0
     *
     * @param {(number|string)} value - The state of the Game Object.
     *
     * @return {this} This GameObject.
     */
    setState: function (value)
    {
        this.state = value;

        return this;
    },

    /**
     * Adds a Data Manager component to this Game Object.
     *
     * @method Phaser.GameObjects.GameObject#setDataEnabled
     * @since 3.0.0
     * @see Phaser.Data.DataManager
     *
     * @return {this} This GameObject.
     */
    setDataEnabled: function ()
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        return this;
    },

    /**
     * Allows you to store a key value pair within this Game Objects Data Manager.
     *
     * If the Game Object has not been enabled for data (via `setDataEnabled`) then it will be enabled
     * before setting the value.
     *
     * If the key doesn't already exist in the Data Manager then it is created.
     *
     * ```javascript
     * sprite.setData('name', 'Red Gem Stone');
     * ```
     *
     * You can also pass in an object of key value pairs as the first argument:
     *
     * ```javascript
     * sprite.setData({ name: 'Red Gem Stone', level: 2, owner: 'Link', gold: 50 });
     * ```
     *
     * To get a value back again you can call `getData`:
     *
     * ```javascript
     * sprite.getData('gold');
     * ```
     *
     * Or you can access the value directly via the `values` property, where it works like any other variable:
     *
     * ```javascript
     * sprite.data.values.gold += 50;
     * ```
     *
     * When the value is first set, a `setdata` event is emitted from this Game Object.
     *
     * If the key already exists, a `changedata` event is emitted instead, along an event named after the key.
     * For example, if you updated an existing key called `PlayerLives` then it would emit the event `changedata-PlayerLives`.
     * These events will be emitted regardless if you use this method to set the value, or the direct `values` setter.
     *
     * Please note that the data keys are case-sensitive and must be valid JavaScript Object property strings.
     * This means the keys `gold` and `Gold` are treated as two unique values within the Data Manager.
     *
     * @method Phaser.GameObjects.GameObject#setData
     * @since 3.0.0
     *
     * @param {(string|object)} key - The key to set the value for. Or an object of key value pairs. If an object the `data` argument is ignored.
     * @param {*} [data] - The value to set for the given key. If an object is provided as the key this argument is ignored.
     *
     * @return {this} This GameObject.
     */
    setData: function (key, value)
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        this.data.set(key, value);

        return this;
    },

    /**
     * Increase a value for the given key within this Game Objects Data Manager. If the key doesn't already exist in the Data Manager then it is increased from 0.
     *
     * If the Game Object has not been enabled for data (via `setDataEnabled`) then it will be enabled
     * before setting the value.
     *
     * If the key doesn't already exist in the Data Manager then it is created.
     *
     * When the value is first set, a `setdata` event is emitted from this Game Object.
     *
     * @method Phaser.GameObjects.GameObject#incData
     * @since 3.23.0
     *
     * @param {(string|object)} key - The key to increase the value for.
     * @param {*} [data] - The value to increase for the given key.
     *
     * @return {this} This GameObject.
     */
    incData: function (key, value)
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        this.data.inc(key, value);

        return this;
    },

    /**
     * Toggle a boolean value for the given key within this Game Objects Data Manager. If the key doesn't already exist in the Data Manager then it is toggled from false.
     *
     * If the Game Object has not been enabled for data (via `setDataEnabled`) then it will be enabled
     * before setting the value.
     *
     * If the key doesn't already exist in the Data Manager then it is created.
     *
     * When the value is first set, a `setdata` event is emitted from this Game Object.
     *
     * @method Phaser.GameObjects.GameObject#toggleData
     * @since 3.23.0
     *
     * @param {(string|object)} key - The key to toggle the value for.
     *
     * @return {this} This GameObject.
     */
    toggleData: function (key)
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        this.data.toggle(key);

        return this;
    },

    /**
     * Retrieves the value for the given key in this Game Objects Data Manager, or undefined if it doesn't exist.
     *
     * You can also access values via the `values` object. For example, if you had a key called `gold` you can do either:
     *
     * ```javascript
     * sprite.getData('gold');
     * ```
     *
     * Or access the value directly:
     *
     * ```javascript
     * sprite.data.values.gold;
     * ```
     *
     * You can also pass in an array of keys, in which case an array of values will be returned:
     *
     * ```javascript
     * sprite.getData([ 'gold', 'armor', 'health' ]);
     * ```
     *
     * This approach is useful for destructuring arrays in ES6.
     *
     * @method Phaser.GameObjects.GameObject#getData
     * @since 3.0.0
     *
     * @param {(string|string[])} key - The key of the value to retrieve, or an array of keys.
     *
     * @return {*} The value belonging to the given key, or an array of values, the order of which will match the input array.
     */
    getData: function (key)
    {
        if (!this.data)
        {
            this.data = new DataManager(this);
        }

        return this.data.get(key);
    },

    /**
     * Pass this Game Object to the Input Manager to enable it for Input.
     *
     * Input works by using hit areas, these are nearly always geometric shapes, such as rectangles or circles, that act as the hit area
     * for the Game Object. However, you can provide your own hit area shape and callback, should you wish to handle some more advanced
     * input detection.
     *
     * If no arguments are provided it will try and create a rectangle hit area based on the texture frame the Game Object is using. If
     * this isn't a texture-bound object, such as a Graphics or BitmapText object, this will fail, and you'll need to provide a specific
     * shape for it to use.
     *
     * You can also provide an Input Configuration Object as the only argument to this method.
     *
     * @example
     * sprite.setInteractive();
     *
     * @example
     * sprite.setInteractive(new Phaser.Geom.Circle(45, 46, 45), Phaser.Geom.Circle.Contains);
     *
     * @example
     * graphics.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 128), Phaser.Geom.Rectangle.Contains);
     *
     * @method Phaser.GameObjects.GameObject#setInteractive
     * @since 3.0.0
     *
     * @param {(Phaser.Types.Input.InputConfiguration|any)} [hitArea] - Either an input configuration object, or a geometric shape that defines the hit area for the Game Object. If not given it will try to create a Rectangle based on the texture frame.
     * @param {Phaser.Types.Input.HitAreaCallback} [callback] - The callback that determines if the pointer is within the Hit Area shape or not. If you provide a shape you must also provide a callback.
     * @param {boolean} [dropZone=false] - Should this Game Object be treated as a drop zone target?
     *
     * @return {this} This GameObject.
     */
    setInteractive: function (hitArea, hitAreaCallback, dropZone)
    {
        this.scene.sys.input.enable(this, hitArea, hitAreaCallback, dropZone);

        return this;
    },

    /**
     * If this Game Object has previously been enabled for input, this will disable it.
     *
     * An object that is disabled for input stops processing or being considered for
     * input events, but can be turned back on again at any time by simply calling
     * `setInteractive()` with no arguments provided.
     *
     * If want to completely remove interaction from this Game Object then use `removeInteractive` instead.
     *
     * @method Phaser.GameObjects.GameObject#disableInteractive
     * @since 3.7.0
     *
     * @return {this} This GameObject.
     */
    disableInteractive: function ()
    {
        if (this.input)
        {
            this.input.enabled = false;
        }

        return this;
    },

    /**
     * If this Game Object has previously been enabled for input, this will queue it
     * for removal, causing it to no longer be interactive. The removal happens on
     * the next game step, it is not immediate.
     *
     * The Interactive Object that was assigned to this Game Object will be destroyed,
     * removed from the Input Manager and cleared from this Game Object.
     *
     * If you wish to re-enable this Game Object at a later date you will need to
     * re-create its InteractiveObject by calling `setInteractive` again.
     *
     * If you wish to only temporarily stop an object from receiving input then use
     * `disableInteractive` instead, as that toggles the interactive state, where-as
     * this erases it completely.
     *
     * If you wish to resize a hit area, don't remove and then set it as being
     * interactive. Instead, access the hitarea object directly and resize the shape
     * being used. I.e.: `sprite.input.hitArea.setSize(width, height)` (assuming the
     * shape is a Rectangle, which it is by default.)
     *
     * @method Phaser.GameObjects.GameObject#removeInteractive
     * @since 3.7.0
     *
     * @return {this} This GameObject.
     */
    removeInteractive: function ()
    {
        this.scene.sys.input.clear(this);

        this.input = undefined;

        return this;
    },

    /**
     * This callback is invoked when this Game Object is added to a Scene.
     *
     * Can be overriden by custom Game Objects, but be aware of some Game Objects that
     * will use this, such as Sprites, to add themselves into the Update List.
     *
     * You can also listen for the `ADDED_TO_SCENE` event from this Game Object.
     *
     * @method Phaser.GameObjects.GameObject#addedToScene
     * @since 3.50.0
     */
    addedToScene: function ()
    {
    },

    /**
     * This callback is invoked when this Game Object is removed from a Scene.
     *
     * Can be overriden by custom Game Objects, but be aware of some Game Objects that
     * will use this, such as Sprites, to removed themselves from the Update List.
     *
     * You can also listen for the `REMOVED_FROM_SCENE` event from this Game Object.
     *
     * @method Phaser.GameObjects.GameObject#removedFromScene
     * @since 3.50.0
     */
    removedFromScene: function ()
    {
    },

    /**
     * To be overridden by custom GameObjects. Allows base objects to be used in a Pool.
     *
     * @method Phaser.GameObjects.GameObject#update
     * @since 3.0.0
     *
     * @param {...*} [args] - args
     */
    update: function ()
    {
    },

    /**
     * Returns a JSON representation of the Game Object.
     *
     * @method Phaser.GameObjects.GameObject#toJSON
     * @since 3.0.0
     *
     * @return {Phaser.Types.GameObjects.JSONGameObject} A JSON representation of the Game Object.
     */
    toJSON: function ()
    {
        return ComponentsToJSON(this);
    },

    /**
     * Compares the renderMask with the renderFlags to see if this Game Object will render or not.
     * Also checks the Game Object against the given Cameras exclusion list.
     *
     * @method Phaser.GameObjects.GameObject#willRender
     * @since 3.0.0
     *
     * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera to check against this Game Object.
     *
     * @return {boolean} True if the Game Object should be rendered, otherwise false.
     */
    willRender: function (camera)
    {
        return !(GameObject.RENDER_MASK !== this.renderFlags || (this.cameraFilter !== 0 && (this.cameraFilter & camera.id)));
    },

    /**
     * Returns an array containing the display list index of either this Game Object, or if it has one,
     * its parent Container. It then iterates up through all of the parent containers until it hits the
     * root of the display list (which is index 0 in the returned array).
     *
     * Used internally by the InputPlugin but also useful if you wish to find out the display depth of
     * this Game Object and all of its ancestors.
     *
     * @method Phaser.GameObjects.GameObject#getIndexList
     * @since 3.4.0
     *
     * @return {number[]} An array of display list position indexes.
     */
    getIndexList: function ()
    {
        // eslint-disable-next-line consistent-this
        var child = this;
        var parent = this.parentContainer;

        var indexes = [];

        while (parent)
        {
            indexes.unshift(parent.getIndex(child));

            child = parent;

            if (!parent.parentContainer)
            {
                break;
            }
            else
            {
                parent = parent.parentContainer;
            }
        }

        if (this.displayList)
        {
            indexes.unshift(this.displayList.getIndex(child));
        }
        else
        {
            indexes.unshift(this.scene.sys.displayList.getIndex(child));
        }

        return indexes;
    },

    /**
     * Adds this Game Object to the given Display List.
     *
     * If no Display List is specified, it will default to the Display List owned by the Scene to which
     * this Game Object belongs.
     *
     * A Game Object can only exist on one Display List at any given time, but may move freely between them.
     *
     * If this Game Object is already on another Display List when this method is called, it will first
     * be removed from it, before being added to the new list.
     *
     * You can query which list it is on by looking at the `Phaser.GameObjects.GameObject#displayList` property.
     *
     * If a Game Object isn't on any display list, it will not be rendered. If you just wish to temporarly
     * disable it from rendering, consider using the `setVisible` method, instead.
     *
     * @method Phaser.GameObjects.GameObject#addToDisplayList
     * @fires Phaser.Scenes.Events#ADDED_TO_SCENE
     * @fires Phaser.GameObjects.Events#ADDED_TO_SCENE
     * @since 3.53.0
     *
     * @param {(Phaser.GameObjects.DisplayList|Phaser.GameObjects.Layer)} [displayList] - The Display List to add to. Defaults to the Scene Display List.
     *
     * @return {this} This Game Object.
     */
    addToDisplayList: function (displayList)
    {
        if (displayList === undefined) { displayList = this.scene.sys.displayList; }

        if (this.displayList && this.displayList !== displayList)
        {
            this.removeFromDisplayList();
        }

        //  Don't repeat if it's already on this list
        if (!displayList.exists(this))
        {
            this.displayList = displayList;

            displayList.add(this, true);

            displayList.queueDepthSort();

            this.emit(Events.ADDED_TO_SCENE, this, this.scene);

            displayList.events.emit(SceneEvents.ADDED_TO_SCENE, this, this.scene);
        }

        return this;
    },

    /**
     * Adds this Game Object to the Update List belonging to the Scene.
     *
     * When a Game Object is added to the Update List it will have its `preUpdate` method called
     * every game frame. This method is passed two parameters: `delta` and `time`.
     *
     * If you wish to run your own logic within `preUpdate` then you should always call
     * `preUpdate.super(delta, time)` within it, or it may fail to process required operations,
     * such as Sprite animations.
     *
     * @method Phaser.GameObjects.GameObject#addToUpdateList
     * @since 3.53.0
     *
     * @return {this} This Game Object.
     */
    addToUpdateList: function ()
    {
        if (this.scene && this.preUpdate)
        {
            this.scene.sys.updateList.add(this);
        }

        return this;
    },

    /**
     * Removes this Game Object from the Display List it is currently on.
     *
     * A Game Object can only exist on one Display List at any given time, but may move freely removed
     * and added back at a later stage.
     *
     * You can query which list it is on by looking at the `Phaser.GameObjects.GameObject#displayList` property.
     *
     * If a Game Object isn't on any Display List, it will not be rendered. If you just wish to temporarly
     * disable it from rendering, consider using the `setVisible` method, instead.
     *
     * @method Phaser.GameObjects.GameObject#removeFromDisplayList
     * @fires Phaser.Scenes.Events#REMOVED_FROM_SCENE
     * @fires Phaser.GameObjects.Events#REMOVED_FROM_SCENE
     * @since 3.53.0
     *
     * @return {this} This Game Object.
     */
    removeFromDisplayList: function ()
    {
        var displayList = this.displayList || this.scene.sys.displayList;

        if (displayList.exists(this))
        {
            displayList.remove(this, true);

            displayList.queueDepthSort();

            this.displayList = null;

            this.emit(Events.REMOVED_FROM_SCENE, this, this.scene);

            displayList.events.emit(SceneEvents.REMOVED_FROM_SCENE, this, this.scene);
        }

        return this;
    },

    /**
     * Removes this Game Object from the Scene's Update List.
     *
     * When a Game Object is on the Update List, it will have its `preUpdate` method called
     * every game frame. Calling this method will remove it from the list, preventing this.
     *
     * Removing a Game Object from the Update List will stop most internal functions working.
     * For example, removing a Sprite from the Update List will prevent it from being able to
     * run animations.
     *
     * @method Phaser.GameObjects.GameObject#removeFromUpdateList
     * @since 3.53.0
     *
     * @return {this} This Game Object.
     */
    removeFromUpdateList: function ()
    {
        if (this.scene && this.preUpdate)
        {
            this.scene.sys.updateList.remove(this);
        }

        return this;
    },

    /**
     * Destroys this Game Object removing it from the Display List and Update List and
     * severing all ties to parent resources.
     *
     * Also removes itself from the Input Manager and Physics Manager if previously enabled.
     *
     * Use this to remove a Game Object from your game if you don't ever plan to use it again.
     * As long as no reference to it exists within your own code it should become free for
     * garbage collection by the browser.
     *
     * If you just want to temporarily disable an object then look at using the
     * Game Object Pool instead of destroying it, as destroyed objects cannot be resurrected.
     *
     * @method Phaser.GameObjects.GameObject#destroy
     * @fires Phaser.GameObjects.Events#DESTROY
     * @since 3.0.0
     */
    destroy: function ()
    {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy)
        {
            return;
        }

        if (this.preDestroy)
        {
            this.preDestroy.call(this);
        }

        this.emit(Events.DESTROY, this);

        this.removeAllListeners();

        if (this.postPipelines)
        {
            this.resetPostPipeline(true);
        }

        this.removeFromDisplayList();
        this.removeFromUpdateList();

        if (this.input)
        {
            this.scene.sys.input.clear(this);

            this.input = undefined;
        }

        if (this.data)
        {
            this.data.destroy();

            this.data = undefined;
        }

        if (this.body)
        {
            this.body.destroy();

            this.body = undefined;
        }

        this.active = false;
        this.visible = false;

        this.scene = undefined;
        this.parentContainer = undefined;
    }

});

/**
 * The bitmask that `GameObject.renderFlags` is compared against to determine if the Game Object will render or not.
 *
 * @constant {number} RENDER_MASK
 * @memberof Phaser.GameObjects.GameObject
 * @default
 */
GameObject.RENDER_MASK = 15;

module.exports = GameObject;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var PluginCache = __webpack_require__(24);
var SceneEvents = __webpack_require__(20);

/**
 * @classdesc
 * The Game Object Creator is a Scene plugin that allows you to quickly create many common
 * types of Game Objects and return them. Unlike the Game Object Factory, they are not automatically
 * added to the Scene.
 *
 * Game Objects directly register themselves with the Creator and inject their own creation
 * methods into the class.
 *
 * @class GameObjectCreator
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object Factory belongs.
 */
var GameObjectCreator = new Class({

    initialize:

    function GameObjectCreator (scene)
    {
        /**
         * The Scene to which this Game Object Creator belongs.
         *
         * @name Phaser.GameObjects.GameObjectCreator#scene
         * @type {Phaser.Scene}
         * @protected
         * @since 3.0.0
         */
        this.scene = scene;

        /**
         * A reference to the Scene.Systems.
         *
         * @name Phaser.GameObjects.GameObjectCreator#systems
         * @type {Phaser.Scenes.Systems}
         * @protected
         * @since 3.0.0
         */
        this.systems = scene.sys;

        /**
         * A reference to the Scene Event Emitter.
         *
         * @name Phaser.GameObjects.GameObjectCreator#events
         * @type {Phaser.Events.EventEmitter}
         * @protected
         * @since 3.50.0
         */
        this.events = scene.sys.events;

        /**
         * A reference to the Scene Display List.
         *
         * @name Phaser.GameObjects.GameObjectCreator#displayList
         * @type {Phaser.GameObjects.DisplayList}
         * @protected
         * @since 3.0.0
         */
        this.displayList;

        /**
         * A reference to the Scene Update List.
         *
         * @name Phaser.GameObjects.GameObjectCreator#updateList
         * @type {Phaser.GameObjects.UpdateList}
         * @protected
         * @since 3.0.0
         */
        this.updateList;

        this.events.once(SceneEvents.BOOT, this.boot, this);
        this.events.on(SceneEvents.START, this.start, this);
    },

    /**
     * This method is called automatically, only once, when the Scene is first created.
     * Do not invoke it directly.
     *
     * @method Phaser.GameObjects.GameObjectCreator#boot
     * @private
     * @since 3.5.1
     */
    boot: function ()
    {
        this.displayList = this.systems.displayList;
        this.updateList = this.systems.updateList;

        this.events.once(SceneEvents.DESTROY, this.destroy, this);
    },

    /**
     * This method is called automatically by the Scene when it is starting up.
     * It is responsible for creating local systems, properties and listening for Scene events.
     * Do not invoke it directly.
     *
     * @method Phaser.GameObjects.GameObjectCreator#start
     * @private
     * @since 3.5.0
     */
    start: function ()
    {
        this.events.once(SceneEvents.SHUTDOWN, this.shutdown, this);
    },

    /**
     * The Scene that owns this plugin is shutting down.
     * We need to kill and reset all internal properties as well as stop listening to Scene events.
     *
     * @method Phaser.GameObjects.GameObjectCreator#shutdown
     * @private
     * @since 3.0.0
     */
    shutdown: function ()
    {
        this.events.off(SceneEvents.SHUTDOWN, this.shutdown, this);
    },

    /**
     * The Scene that owns this plugin is being destroyed.
     * We need to shutdown and then kill off all external references.
     *
     * @method Phaser.GameObjects.GameObjectCreator#destroy
     * @private
     * @since 3.0.0
     */
    destroy: function ()
    {
        this.shutdown();

        this.events.off(SceneEvents.START, this.start, this);

        this.scene = null;
        this.systems = null;
        this.events = null;

        this.displayList = null;
        this.updateList = null;
    }

});

//  Static method called directly by the Game Object creator functions

GameObjectCreator.register = function (factoryType, factoryFunction)
{
    if (!GameObjectCreator.prototype.hasOwnProperty(factoryType))
    {
        GameObjectCreator.prototype[factoryType] = factoryFunction;
    }
};

GameObjectCreator.remove = function (factoryType)
{
    if (GameObjectCreator.prototype.hasOwnProperty(factoryType))
    {
        delete GameObjectCreator.prototype[factoryType];
    }
};

PluginCache.register('GameObjectCreator', GameObjectCreator, 'make');

module.exports = GameObjectCreator;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var IsPlainObject = __webpack_require__(7);

// @param {boolean} deep - Perform a deep copy?
// @param {object} target - The target object to copy to.
// @return {object} The extended object.

/**
 * This is a slightly modified version of http://api.jquery.com/jQuery.extend/
 *
 * @function Phaser.Utils.Objects.Extend
 * @since 3.0.0
 *
 * @param {...*} [args] - The objects that will be mixed.
 *
 * @return {object} The extended object.
 */
var Extend = function ()
{
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean')
    {
        deep = target;
        target = arguments[1] || {};

        // skip the boolean and the target
        i = 2;
    }

    // extend Phaser if only one argument is passed
    if (length === i)
    {
        target = this;
        --i;
    }

    for (; i < length; i++)
    {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null)
        {
            // Extend the base object
            for (name in options)
            {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy)
                {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (IsPlainObject(copy) || (copyIsArray = Array.isArray(copy))))
                {
                    if (copyIsArray)
                    {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else
                    {
                        clone = src && IsPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = Extend(deep, clone, copy);

                // Don't bring in undefined values
                }
                else if (copy !== undefined)
                {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

module.exports = Extend;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Force a value within the boundaries by clamping it to the range `min`, `max`.
 *
 * @function Phaser.Math.Clamp
 * @since 3.0.0
 *
 * @param {number} value - The value to be clamped.
 * @param {number} min - The minimum bounds.
 * @param {number} max - The maximum bounds.
 *
 * @return {number} The clamped value.
 */
var Clamp = function (value, min, max)
{
    return Math.max(min, Math.min(max, value));
};

module.exports = Clamp;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var TransformMatrix = __webpack_require__(25);

var tempMatrix1 = new TransformMatrix();
var tempMatrix2 = new TransformMatrix();
var tempMatrix3 = new TransformMatrix();

var result = { camera: tempMatrix1, sprite: tempMatrix2, calc: tempMatrix3 };

/**
 * Calculates the Transform Matrix of the given Game Object and Camera, factoring in
 * the parent matrix if provided.
 *
 * Note that the object this results contains _references_ to the Transform Matrices,
 * not new instances of them. Therefore, you should use their values immediately, or
 * copy them to your own matrix, as they will be replaced as soon as another Game
 * Object is rendered.
 *
 * @function Phaser.GameObjects.GetCalcMatrix
 * @memberof Phaser.GameObjects
 * @since 3.50.0
 *
 * @param {Phaser.GameObjects.GameObject} src - The Game Object to calculate the transform matrix for.
 * @param {Phaser.Cameras.Scene2D.Camera} camera - The camera being used to render the Game Object.
 * @param {Phaser.GameObjects.Components.TransformMatrix} [parentMatrix] - The transform matrix of the parent container, if any.
 *
 * @return {Phaser.Types.GameObjects.GetCalcMatrixResults} The results object containing the updated transform matrices.
 */
var GetCalcMatrix = function (src, camera, parentMatrix)
{
    var camMatrix = tempMatrix1;
    var spriteMatrix = tempMatrix2;
    var calcMatrix = tempMatrix3;

    spriteMatrix.applyITRS(src.x, src.y, src.rotation, src.scaleX, src.scaleY);

    camMatrix.copyFrom(camera.matrix);

    if (parentMatrix)
    {
        //  Multiply the camera by the parent matrix
        camMatrix.multiplyWithOffset(parentMatrix, -camera.scrollX * src.scrollFactorX, -camera.scrollY * src.scrollFactorY);

        //  Undo the camera scroll
        spriteMatrix.e = src.x;
        spriteMatrix.f = src.y;
    }
    else
    {
        spriteMatrix.e -= camera.scrollX * src.scrollFactorX;
        spriteMatrix.f -= camera.scrollY * src.scrollFactorY;
    }

    //  Multiply by the Sprite matrix, store result in calcMatrix
    camMatrix.multiply(spriteMatrix, calcMatrix);

    return result;
};

module.exports = GetCalcMatrix;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * @namespace Phaser.Scenes.Events
 */

module.exports = {

    ADDED_TO_SCENE: __webpack_require__(656),
    BOOT: __webpack_require__(657),
    CREATE: __webpack_require__(658),
    DESTROY: __webpack_require__(659),
    PAUSE: __webpack_require__(660),
    POST_UPDATE: __webpack_require__(661),
    PRE_RENDER: __webpack_require__(662),
    PRE_UPDATE: __webpack_require__(663),
    READY: __webpack_require__(664),
    REMOVED_FROM_SCENE: __webpack_require__(665),
    RENDER: __webpack_require__(666),
    RESUME: __webpack_require__(667),
    SHUTDOWN: __webpack_require__(668),
    SLEEP: __webpack_require__(669),
    START: __webpack_require__(670),
    TRANSITION_COMPLETE: __webpack_require__(671),
    TRANSITION_INIT: __webpack_require__(672),
    TRANSITION_OUT: __webpack_require__(673),
    TRANSITION_START: __webpack_require__(674),
    TRANSITION_WAKE: __webpack_require__(675),
    UPDATE: __webpack_require__(676),
    WAKE: __webpack_require__(677)

};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var FILE_CONST = {

    /**
     * The Loader is idle.
     * 
     * @name Phaser.Loader.LOADER_IDLE
     * @type {number}
     * @since 3.0.0
     */
    LOADER_IDLE: 0,

    /**
     * The Loader is actively loading.
     * 
     * @name Phaser.Loader.LOADER_LOADING
     * @type {number}
     * @since 3.0.0
     */
    LOADER_LOADING: 1,

    /**
     * The Loader is processing files is has loaded.
     * 
     * @name Phaser.Loader.LOADER_PROCESSING
     * @type {number}
     * @since 3.0.0
     */
    LOADER_PROCESSING: 2,

    /**
     * The Loader has completed loading and processing.
     * 
     * @name Phaser.Loader.LOADER_COMPLETE
     * @type {number}
     * @since 3.0.0
     */
    LOADER_COMPLETE: 3,

    /**
     * The Loader is shutting down.
     * 
     * @name Phaser.Loader.LOADER_SHUTDOWN
     * @type {number}
     * @since 3.0.0
     */
    LOADER_SHUTDOWN: 4,

    /**
     * The Loader has been destroyed.
     * 
     * @name Phaser.Loader.LOADER_DESTROYED
     * @type {number}
     * @since 3.0.0
     */
    LOADER_DESTROYED: 5,

    /**
     * File is in the load queue but not yet started
     * 
     * @name Phaser.Loader.FILE_PENDING
     * @type {number}
     * @since 3.0.0
     */
    FILE_PENDING: 10,

    /**
     * File has been started to load by the loader (onLoad called)
     * 
     * @name Phaser.Loader.FILE_LOADING
     * @type {number}
     * @since 3.0.0
     */
    FILE_LOADING: 11,

    /**
     * File has loaded successfully, awaiting processing    
     * 
     * @name Phaser.Loader.FILE_LOADED
     * @type {number}
     * @since 3.0.0
     */
    FILE_LOADED: 12,

    /**
     * File failed to load
     * 
     * @name Phaser.Loader.FILE_FAILED
     * @type {number}
     * @since 3.0.0
     */
    FILE_FAILED: 13,

    /**
     * File is being processed (onProcess callback)
     * 
     * @name Phaser.Loader.FILE_PROCESSING
     * @type {number}
     * @since 3.0.0
     */
    FILE_PROCESSING: 14,

    /**
     * The File has errored somehow during processing.
     * 
     * @name Phaser.Loader.FILE_ERRORED
     * @type {number}
     * @since 3.0.0
     */
    FILE_ERRORED: 16,

    /**
     * File has finished processing.
     * 
     * @name Phaser.Loader.FILE_COMPLETE
     * @type {number}
     * @since 3.0.0
     */
    FILE_COMPLETE: 17,

    /**
     * File has been destroyed
     * 
     * @name Phaser.Loader.FILE_DESTROYED
     * @type {number}
     * @since 3.0.0
     */
    FILE_DESTROYED: 18,

    /**
     * File was populated from local data and doesn't need an HTTP request
     * 
     * @name Phaser.Loader.FILE_POPULATED
     * @type {number}
     * @since 3.0.0
     */
    FILE_POPULATED: 19

};

module.exports = FILE_CONST;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * @namespace Phaser.Core.Events
 */

module.exports = {

    BLUR: __webpack_require__(612),
    BOOT: __webpack_require__(613),
    CONTEXT_LOST: __webpack_require__(614),
    CONTEXT_RESTORED: __webpack_require__(615),
    DESTROY: __webpack_require__(616),
    FOCUS: __webpack_require__(617),
    HIDDEN: __webpack_require__(618),
    PAUSE: __webpack_require__(619),
    POST_RENDER: __webpack_require__(620),
    POST_STEP: __webpack_require__(621),
    PRE_RENDER: __webpack_require__(622),
    PRE_STEP: __webpack_require__(623),
    READY: __webpack_require__(624),
    RESUME: __webpack_require__(625),
    STEP: __webpack_require__(626),
    VISIBLE: __webpack_require__(627)

};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var CONST = __webpack_require__(21);
var Events = __webpack_require__(95);
var GetFastValue = __webpack_require__(2);
var GetURL = __webpack_require__(155);
var MergeXHRSettings = __webpack_require__(240);
var XHRLoader = __webpack_require__(517);
var XHRSettings = __webpack_require__(156);

/**
 * @classdesc
 * The base File class used by all File Types that the Loader can support.
 * You shouldn't create an instance of a File directly, but should extend it with your own class, setting a custom type and processing methods.
 *
 * @class File
 * @memberof Phaser.Loader
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Loader.LoaderPlugin} loader - The Loader that is going to load this File.
 * @param {Phaser.Types.Loader.FileConfig} fileConfig - The file configuration object, as created by the file type.
 */
var File = new Class({

    initialize:

    function File (loader, fileConfig)
    {
        /**
         * A reference to the Loader that is going to load this file.
         *
         * @name Phaser.Loader.File#loader
         * @type {Phaser.Loader.LoaderPlugin}
         * @since 3.0.0
         */
        this.loader = loader;

        /**
         * A reference to the Cache, or Texture Manager, that is going to store this file if it loads.
         *
         * @name Phaser.Loader.File#cache
         * @type {(Phaser.Cache.BaseCache|Phaser.Textures.TextureManager)}
         * @since 3.7.0
         */
        this.cache = GetFastValue(fileConfig, 'cache', false);

        /**
         * The file type string (image, json, etc) for sorting within the Loader.
         *
         * @name Phaser.Loader.File#type
         * @type {string}
         * @since 3.0.0
         */
        this.type = GetFastValue(fileConfig, 'type', false);

        /**
         * Unique cache key (unique within its file type)
         *
         * @name Phaser.Loader.File#key
         * @type {string}
         * @since 3.0.0
         */
        this.key = GetFastValue(fileConfig, 'key', false);

        var loadKey = this.key;

        if (loader.prefix && loader.prefix !== '')
        {
            this.key = loader.prefix + loadKey;
        }

        if (!this.type || !this.key)
        {
            throw new Error('Invalid Loader.' + this.type + ' key');
        }

        var url = GetFastValue(fileConfig, 'url');

        if (url === undefined)
        {
            url = loader.path + loadKey + '.' + GetFastValue(fileConfig, 'extension', '');
        }
        else if (typeof url === 'string' && !url.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/))
        {
            url = loader.path + url;
        }

        /**
         * The URL of the file, not including baseURL.
         *
         * Automatically has Loader.path prepended to it if a string.
         *
         * Can also be a JavaScript Object, such as the results of parsing JSON data.
         *
         * @name Phaser.Loader.File#url
         * @type {object|string}
         * @since 3.0.0
         */
        this.url = url;

        /**
         * The final URL this file will load from, including baseURL and path.
         * Set automatically when the Loader calls 'load' on this file.
         *
         * @name Phaser.Loader.File#src
         * @type {string}
         * @since 3.0.0
         */
        this.src = '';

        /**
         * The merged XHRSettings for this file.
         *
         * @name Phaser.Loader.File#xhrSettings
         * @type {Phaser.Types.Loader.XHRSettingsObject}
         * @since 3.0.0
         */
        this.xhrSettings = XHRSettings(GetFastValue(fileConfig, 'responseType', undefined));

        if (GetFastValue(fileConfig, 'xhrSettings', false))
        {
            this.xhrSettings = MergeXHRSettings(this.xhrSettings, GetFastValue(fileConfig, 'xhrSettings', {}));
        }

        /**
         * The XMLHttpRequest instance (as created by XHR Loader) that is loading this File.
         *
         * @name Phaser.Loader.File#xhrLoader
         * @type {?XMLHttpRequest}
         * @since 3.0.0
         */
        this.xhrLoader = null;

        /**
         * The current state of the file. One of the FILE_CONST values.
         *
         * @name Phaser.Loader.File#state
         * @type {number}
         * @since 3.0.0
         */
        this.state = (typeof(this.url) === 'function') ? CONST.FILE_POPULATED : CONST.FILE_PENDING;

        /**
         * The total size of this file.
         * Set by onProgress and only if loading via XHR.
         *
         * @name Phaser.Loader.File#bytesTotal
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.bytesTotal = 0;

        /**
         * Updated as the file loads.
         * Only set if loading via XHR.
         *
         * @name Phaser.Loader.File#bytesLoaded
         * @type {number}
         * @default -1
         * @since 3.0.0
         */
        this.bytesLoaded = -1;

        /**
         * A percentage value between 0 and 1 indicating how much of this file has loaded.
         * Only set if loading via XHR.
         *
         * @name Phaser.Loader.File#percentComplete
         * @type {number}
         * @default -1
         * @since 3.0.0
         */
        this.percentComplete = -1;

        /**
         * For CORs based loading.
         * If this is undefined then the File will check BaseLoader.crossOrigin and use that (if set)
         *
         * @name Phaser.Loader.File#crossOrigin
         * @type {(string|undefined)}
         * @since 3.0.0
         */
        this.crossOrigin = undefined;

        /**
         * The processed file data, stored here after the file has loaded.
         *
         * @name Phaser.Loader.File#data
         * @type {*}
         * @since 3.0.0
         */
        this.data = undefined;

        /**
         * A config object that can be used by file types to store transitional data.
         *
         * @name Phaser.Loader.File#config
         * @type {*}
         * @since 3.0.0
         */
        this.config = GetFastValue(fileConfig, 'config', {});

        /**
         * If this is a multipart file, i.e. an atlas and its json together, then this is a reference
         * to the parent MultiFile. Set and used internally by the Loader or specific file types.
         *
         * @name Phaser.Loader.File#multiFile
         * @type {?Phaser.Loader.MultiFile}
         * @since 3.7.0
         */
        this.multiFile;

        /**
         * Does this file have an associated linked file? Such as an image and a normal map.
         * Atlases and Bitmap Fonts use the multiFile, because those files need loading together but aren't
         * actually bound by data, where-as a linkFile is.
         *
         * @name Phaser.Loader.File#linkFile
         * @type {?Phaser.Loader.File}
         * @since 3.7.0
         */
        this.linkFile;
    },

    /**
     * Links this File with another, so they depend upon each other for loading and processing.
     *
     * @method Phaser.Loader.File#setLink
     * @since 3.7.0
     *
     * @param {Phaser.Loader.File} fileB - The file to link to this one.
     */
    setLink: function (fileB)
    {
        this.linkFile = fileB;

        fileB.linkFile = this;
    },

    /**
     * Resets the XHRLoader instance this file is using.
     *
     * @method Phaser.Loader.File#resetXHR
     * @since 3.0.0
     */
    resetXHR: function ()
    {
        if (this.xhrLoader)
        {
            this.xhrLoader.onload = undefined;
            this.xhrLoader.onerror = undefined;
            this.xhrLoader.onprogress = undefined;
        }
    },

    /**
     * Called by the Loader, starts the actual file downloading.
     * During the load the methods onLoad, onError and onProgress are called, based on the XHR events.
     * You shouldn't normally call this method directly, it's meant to be invoked by the Loader.
     *
     * @method Phaser.Loader.File#load
     * @since 3.0.0
     */
    load: function ()
    {
        if (this.state === CONST.FILE_POPULATED)
        {
            //  Can happen for example in a JSONFile if they've provided a JSON object instead of a URL
            this.loader.nextFile(this, true);
        }
        else
        {
            this.state = CONST.FILE_LOADING;

            this.src = GetURL(this, this.loader.baseURL);

            if (this.src.indexOf('data:') === 0)
            {
                console.warn('Local data URIs are not supported: ' + this.key);
            }
            else
            {
                //  The creation of this XHRLoader starts the load process going.
                //  It will automatically call the following, based on the load outcome:
                //
                // xhr.onload = this.onLoad
                // xhr.onerror = this.onError
                // xhr.onprogress = this.onProgress

                this.xhrLoader = XHRLoader(this, this.loader.xhr);
            }
        }
    },

    /**
     * Called when the file finishes loading, is sent a DOM ProgressEvent.
     *
     * @method Phaser.Loader.File#onLoad
     * @since 3.0.0
     *
     * @param {XMLHttpRequest} xhr - The XMLHttpRequest that caused this onload event.
     * @param {ProgressEvent} event - The DOM ProgressEvent that resulted from this load.
     */
    onLoad: function (xhr, event)
    {
        var localFileOk = ((xhr.responseURL && xhr.responseURL.indexOf('file://') === 0 && event.target.status === 0));

        var success = !(event.target && event.target.status !== 200) || localFileOk;

        //  Handle HTTP status codes of 4xx and 5xx as errors, even if xhr.onerror was not called.
        if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599)
        {
            success = false;
        }

        this.state = CONST.FILE_LOADED;

        this.resetXHR();

        this.loader.nextFile(this, success);
    },

    /**
     * Called if the file errors while loading, is sent a DOM ProgressEvent.
     *
     * @method Phaser.Loader.File#onError
     * @since 3.0.0
     *
     * @param {XMLHttpRequest} xhr - The XMLHttpRequest that caused this onload event.
     * @param {ProgressEvent} event - The DOM ProgressEvent that resulted from this error.
     */
    onError: function ()
    {
        this.resetXHR();

        this.loader.nextFile(this, false);
    },

    /**
     * Called during the file load progress. Is sent a DOM ProgressEvent.
     *
     * @method Phaser.Loader.File#onProgress
     * @fires Phaser.Loader.Events#FILE_PROGRESS
     * @since 3.0.0
     *
     * @param {ProgressEvent} event - The DOM ProgressEvent.
     */
    onProgress: function (event)
    {
        if (event.lengthComputable)
        {
            this.bytesLoaded = event.loaded;
            this.bytesTotal = event.total;

            this.percentComplete = Math.min((this.bytesLoaded / this.bytesTotal), 1);

            this.loader.emit(Events.FILE_PROGRESS, this, this.percentComplete);
        }
    },

    /**
     * Usually overridden by the FileTypes and is called by Loader.nextFile.
     * This method controls what extra work this File does with its loaded data, for example a JSON file will parse itself during this stage.
     *
     * @method Phaser.Loader.File#onProcess
     * @since 3.0.0
     */
    onProcess: function ()
    {
        this.state = CONST.FILE_PROCESSING;

        this.onProcessComplete();
    },

    /**
     * Called when the File has completed processing.
     * Checks on the state of its multifile, if set.
     *
     * @method Phaser.Loader.File#onProcessComplete
     * @since 3.7.0
     */
    onProcessComplete: function ()
    {
        this.state = CONST.FILE_COMPLETE;

        if (this.multiFile)
        {
            this.multiFile.onFileComplete(this);
        }

        this.loader.fileProcessComplete(this);
    },

    /**
     * Called when the File has completed processing but it generated an error.
     * Checks on the state of its multifile, if set.
     *
     * @method Phaser.Loader.File#onProcessError
     * @since 3.7.0
     */
    onProcessError: function ()
    {
        this.state = CONST.FILE_ERRORED;

        if (this.multiFile)
        {
            this.multiFile.onFileFailed(this);
        }

        this.loader.fileProcessComplete(this);
    },

    /**
     * Checks if a key matching the one used by this file exists in the target Cache or not.
     * This is called automatically by the LoaderPlugin to decide if the file can be safely
     * loaded or will conflict.
     *
     * @method Phaser.Loader.File#hasCacheConflict
     * @since 3.7.0
     *
     * @return {boolean} `true` if adding this file will cause a conflict, otherwise `false`.
     */
    hasCacheConflict: function ()
    {
        return (this.cache && this.cache.exists(this.key));
    },

    /**
     * Adds this file to its target cache upon successful loading and processing.
     * This method is often overridden by specific file types.
     *
     * @method Phaser.Loader.File#addToCache
     * @since 3.7.0
     */
    addToCache: function ()
    {
        if (this.cache)
        {
            this.cache.add(this.key, this.data);
        }

        this.pendingDestroy();
    },

    /**
     * Called once the file has been added to its cache and is now ready for deletion from the Loader.
     * It will emit a `filecomplete` event from the LoaderPlugin.
     *
     * @method Phaser.Loader.File#pendingDestroy
     * @fires Phaser.Loader.Events#FILE_COMPLETE
     * @fires Phaser.Loader.Events#FILE_KEY_COMPLETE
     * @since 3.7.0
     */
    pendingDestroy: function (data)
    {
        if (data === undefined) { data = this.data; }

        var key = this.key;
        var type = this.type;

        this.loader.emit(Events.FILE_COMPLETE, key, type, data);
        this.loader.emit(Events.FILE_KEY_COMPLETE + type + '-' + key, key, type, data);

        this.loader.flagForRemoval(this);
    },

    /**
     * Destroy this File and any references it holds.
     *
     * @method Phaser.Loader.File#destroy
     * @since 3.7.0
     */
    destroy: function ()
    {
        this.loader = null;
        this.cache = null;
        this.xhrSettings = null;
        this.multiFile = null;
        this.linkFile = null;
        this.data = null;
    }

});

/**
 * Static method for creating object URL using URL API and setting it as image 'src' attribute.
 * If URL API is not supported (usually on old browsers) it falls back to creating Base64 encoded url using FileReader.
 *
 * @method Phaser.Loader.File.createObjectURL
 * @static
 * @since 3.7.0
 *
 * @param {HTMLImageElement} image - Image object which 'src' attribute should be set to object URL.
 * @param {Blob} blob - A Blob object to create an object URL for.
 * @param {string} defaultType - Default mime type used if blob type is not available.
 */
File.createObjectURL = function (image, blob, defaultType)
{
    if (typeof URL === 'function')
    {
        image.src = URL.createObjectURL(blob);
    }
    else
    {
        var reader = new FileReader();

        reader.onload = function ()
        {
            image.removeAttribute('crossOrigin');
            image.src = 'data:' + (blob.type || defaultType) + ';base64,' + reader.result.split(',')[1];
        };

        reader.onerror = image.onerror;

        reader.readAsDataURL(blob);
    }
};

/**
 * Static method for releasing an existing object URL which was previously created
 * by calling {@link File#createObjectURL} method.
 *
 * @method Phaser.Loader.File.revokeObjectURL
 * @static
 * @since 3.7.0
 *
 * @param {HTMLImageElement} image - Image object which 'src' attribute should be revoked.
 */
File.revokeObjectURL = function (image)
{
    if (typeof URL === 'function')
    {
        URL.revokeObjectURL(image.src);
    }
};

module.exports = File;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

//  Contains the plugins that Phaser uses globally and locally.
//  These are the source objects, not instantiated.
var corePlugins = {};

//  Contains the plugins that the dev has loaded into their game
//  These are the source objects, not instantiated.
var customPlugins = {};

var PluginCache = {};

/**
 * @namespace Phaser.Plugins.PluginCache
 */

/**
 * Static method called directly by the Core internal Plugins.
 * Key is a reference used to get the plugin from the plugins object (i.e. InputPlugin)
 * Plugin is the object to instantiate to create the plugin
 * Mapping is what the plugin is injected into the Scene.Systems as (i.e. input)
 *
 * @method Phaser.Plugins.PluginCache.register
 * @since 3.8.0
 * 
 * @param {string} key - A reference used to get this plugin from the plugin cache.
 * @param {function} plugin - The plugin to be stored. Should be the core object, not instantiated.
 * @param {string} mapping - If this plugin is to be injected into the Scene Systems, this is the property key map used.
 * @param {boolean} [custom=false] - Core Scene plugin or a Custom Scene plugin?
 */
PluginCache.register = function (key, plugin, mapping, custom)
{
    if (custom === undefined) { custom = false; }

    corePlugins[key] = { plugin: plugin, mapping: mapping, custom: custom };
};

/**
 * Stores a custom plugin in the global plugin cache.
 * The key must be unique, within the scope of the cache.
 *
 * @method Phaser.Plugins.PluginCache.registerCustom
 * @since 3.8.0
 * 
 * @param {string} key - A reference used to get this plugin from the plugin cache.
 * @param {function} plugin - The plugin to be stored. Should be the core object, not instantiated.
 * @param {string} mapping - If this plugin is to be injected into the Scene Systems, this is the property key map used.
 * @param {?any} data - A value to be passed to the plugin's `init` method.
 */
PluginCache.registerCustom = function (key, plugin, mapping, data)
{
    customPlugins[key] = { plugin: plugin, mapping: mapping, data: data };
};

/**
 * Checks if the given key is already being used in the core plugin cache.
 *
 * @method Phaser.Plugins.PluginCache.hasCore
 * @since 3.8.0
 * 
 * @param {string} key - The key to check for.
 *
 * @return {boolean} `true` if the key is already in use in the core cache, otherwise `false`.
 */
PluginCache.hasCore = function (key)
{
    return corePlugins.hasOwnProperty(key);
};

/**
 * Checks if the given key is already being used in the custom plugin cache.
 *
 * @method Phaser.Plugins.PluginCache.hasCustom
 * @since 3.8.0
 * 
 * @param {string} key - The key to check for.
 *
 * @return {boolean} `true` if the key is already in use in the custom cache, otherwise `false`.
 */
PluginCache.hasCustom = function (key)
{
    return customPlugins.hasOwnProperty(key);
};

/**
 * Returns the core plugin object from the cache based on the given key.
 *
 * @method Phaser.Plugins.PluginCache.getCore
 * @since 3.8.0
 * 
 * @param {string} key - The key of the core plugin to get.
 *
 * @return {Phaser.Types.Plugins.CorePluginContainer} The core plugin object.
 */
PluginCache.getCore = function (key)
{
    return corePlugins[key];
};

/**
 * Returns the custom plugin object from the cache based on the given key.
 *
 * @method Phaser.Plugins.PluginCache.getCustom
 * @since 3.8.0
 * 
 * @param {string} key - The key of the custom plugin to get.
 *
 * @return {Phaser.Types.Plugins.CustomPluginContainer} The custom plugin object.
 */
PluginCache.getCustom = function (key)
{
    return customPlugins[key];
};

/**
 * Returns an object from the custom cache based on the given key that can be instantiated.
 *
 * @method Phaser.Plugins.PluginCache.getCustomClass
 * @since 3.8.0
 * 
 * @param {string} key - The key of the custom plugin to get.
 *
 * @return {function} The custom plugin object.
 */
PluginCache.getCustomClass = function (key)
{
    return (customPlugins.hasOwnProperty(key)) ? customPlugins[key].plugin : null;
};

/**
 * Removes a core plugin based on the given key.
 *
 * @method Phaser.Plugins.PluginCache.remove
 * @since 3.8.0
 * 
 * @param {string} key - The key of the core plugin to remove.
 */
PluginCache.remove = function (key)
{
    if (corePlugins.hasOwnProperty(key))
    {
        delete corePlugins[key];
    }
};

/**
 * Removes a custom plugin based on the given key.
 *
 * @method Phaser.Plugins.PluginCache.removeCustom
 * @since 3.8.0
 * 
 * @param {string} key - The key of the custom plugin to remove.
 */
PluginCache.removeCustom = function (key)
{
    if (customPlugins.hasOwnProperty(key))
    {
        delete customPlugins[key];
    }
};

/**
 * Removes all Core Plugins.
 * 
 * This includes all of the internal system plugins that Phaser needs, like the Input Plugin and Loader Plugin.
 * So be sure you only call this if you do not wish to run Phaser again.
 *
 * @method Phaser.Plugins.PluginCache.destroyCorePlugins
 * @since 3.12.0
 */
PluginCache.destroyCorePlugins = function ()
{
    for (var key in corePlugins)
    {
        if (corePlugins.hasOwnProperty(key))
        {
            delete corePlugins[key];
        }
    }
};

/**
 * Removes all Custom Plugins.
 *
 * @method Phaser.Plugins.PluginCache.destroyCustomPlugins
 * @since 3.12.0
 */
PluginCache.destroyCustomPlugins = function ()
{
    for (var key in customPlugins)
    {
        if (customPlugins.hasOwnProperty(key))
        {
            delete customPlugins[key];
        }
    }
};

module.exports = PluginCache;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var MATH_CONST = __webpack_require__(14);
var Vector2 = __webpack_require__(3);

/**
 * @classdesc
 * A Matrix used for display transformations for rendering.
 *
 * It is represented like so:
 *
 * ```
 * | a | c | tx |
 * | b | d | ty |
 * | 0 | 0 | 1  |
 * ```
 *
 * @class TransformMatrix
 * @memberof Phaser.GameObjects.Components
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [a=1] - The Scale X value.
 * @param {number} [b=0] - The Skew Y value.
 * @param {number} [c=0] - The Skew X value.
 * @param {number} [d=1] - The Scale Y value.
 * @param {number} [tx=0] - The Translate X value.
 * @param {number} [ty=0] - The Translate Y value.
 */
var TransformMatrix = new Class({

    initialize:

    function TransformMatrix (a, b, c, d, tx, ty)
    {
        if (a === undefined) { a = 1; }
        if (b === undefined) { b = 0; }
        if (c === undefined) { c = 0; }
        if (d === undefined) { d = 1; }
        if (tx === undefined) { tx = 0; }
        if (ty === undefined) { ty = 0; }

        /**
         * The matrix values.
         *
         * @name Phaser.GameObjects.Components.TransformMatrix#matrix
         * @type {Float32Array}
         * @since 3.0.0
         */
        this.matrix = new Float32Array([ a, b, c, d, tx, ty, 0, 0, 1 ]);

        /**
         * The decomposed matrix.
         *
         * @name Phaser.GameObjects.Components.TransformMatrix#decomposedMatrix
         * @type {object}
         * @since 3.0.0
         */
        this.decomposedMatrix = {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            rotation: 0
        };
    },

    /**
     * The Scale X value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#a
     * @type {number}
     * @since 3.4.0
     */
    a: {

        get: function ()
        {
            return this.matrix[0];
        },

        set: function (value)
        {
            this.matrix[0] = value;
        }

    },

    /**
     * The Skew Y value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#b
     * @type {number}
     * @since 3.4.0
     */
    b: {

        get: function ()
        {
            return this.matrix[1];
        },

        set: function (value)
        {
            this.matrix[1] = value;
        }

    },

    /**
     * The Skew X value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#c
     * @type {number}
     * @since 3.4.0
     */
    c: {

        get: function ()
        {
            return this.matrix[2];
        },

        set: function (value)
        {
            this.matrix[2] = value;
        }

    },

    /**
     * The Scale Y value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#d
     * @type {number}
     * @since 3.4.0
     */
    d: {

        get: function ()
        {
            return this.matrix[3];
        },

        set: function (value)
        {
            this.matrix[3] = value;
        }

    },

    /**
     * The Translate X value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#e
     * @type {number}
     * @since 3.11.0
     */
    e: {

        get: function ()
        {
            return this.matrix[4];
        },

        set: function (value)
        {
            this.matrix[4] = value;
        }

    },

    /**
     * The Translate Y value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#f
     * @type {number}
     * @since 3.11.0
     */
    f: {

        get: function ()
        {
            return this.matrix[5];
        },

        set: function (value)
        {
            this.matrix[5] = value;
        }

    },

    /**
     * The Translate X value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#tx
     * @type {number}
     * @since 3.4.0
     */
    tx: {

        get: function ()
        {
            return this.matrix[4];
        },

        set: function (value)
        {
            this.matrix[4] = value;
        }

    },

    /**
     * The Translate Y value.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#ty
     * @type {number}
     * @since 3.4.0
     */
    ty: {

        get: function ()
        {
            return this.matrix[5];
        },

        set: function (value)
        {
            this.matrix[5] = value;
        }

    },

    /**
     * The rotation of the Matrix. Value is in radians.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#rotation
     * @type {number}
     * @readonly
     * @since 3.4.0
     */
    rotation: {

        get: function ()
        {
            return Math.acos(this.a / this.scaleX) * ((Math.atan(-this.c / this.a) < 0) ? -1 : 1);
        }

    },

    /**
     * The rotation of the Matrix, normalized to be within the Phaser right-handed
     * clockwise rotation space. Value is in radians.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#rotationNormalized
     * @type {number}
     * @readonly
     * @since 3.19.0
     */
    rotationNormalized: {

        get: function ()
        {
            var matrix = this.matrix;

            var a = matrix[0];
            var b = matrix[1];
            var c = matrix[2];
            var d = matrix[3];

            if (a || b)
            {
                // var r = Math.sqrt(a * a + b * b);

                return (b > 0) ? Math.acos(a / this.scaleX) : -Math.acos(a / this.scaleX);
            }
            else if (c || d)
            {
                // var s = Math.sqrt(c * c + d * d);

                return MATH_CONST.TAU - ((d > 0) ? Math.acos(-c / this.scaleY) : -Math.acos(c / this.scaleY));
            }
            else
            {
                return 0;
            }
        }

    },

    /**
     * The decomposed horizontal scale of the Matrix. This value is always positive.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#scaleX
     * @type {number}
     * @readonly
     * @since 3.4.0
     */
    scaleX: {

        get: function ()
        {
            return Math.sqrt((this.a * this.a) + (this.b * this.b));
        }

    },

    /**
     * The decomposed vertical scale of the Matrix. This value is always positive.
     *
     * @name Phaser.GameObjects.Components.TransformMatrix#scaleY
     * @type {number}
     * @readonly
     * @since 3.4.0
     */
    scaleY: {

        get: function ()
        {
            return Math.sqrt((this.c * this.c) + (this.d * this.d));
        }

    },

    /**
     * Reset the Matrix to an identity matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#loadIdentity
     * @since 3.0.0
     *
     * @return {this} This TransformMatrix.
     */
    loadIdentity: function ()
    {
        var matrix = this.matrix;

        matrix[0] = 1;
        matrix[1] = 0;
        matrix[2] = 0;
        matrix[3] = 1;
        matrix[4] = 0;
        matrix[5] = 0;

        return this;
    },

    /**
     * Translate the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#translate
     * @since 3.0.0
     *
     * @param {number} x - The horizontal translation value.
     * @param {number} y - The vertical translation value.
     *
     * @return {this} This TransformMatrix.
     */
    translate: function (x, y)
    {
        var matrix = this.matrix;

        matrix[4] = matrix[0] * x + matrix[2] * y + matrix[4];
        matrix[5] = matrix[1] * x + matrix[3] * y + matrix[5];

        return this;
    },

    /**
     * Scale the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#scale
     * @since 3.0.0
     *
     * @param {number} x - The horizontal scale value.
     * @param {number} y - The vertical scale value.
     *
     * @return {this} This TransformMatrix.
     */
    scale: function (x, y)
    {
        var matrix = this.matrix;

        matrix[0] *= x;
        matrix[1] *= x;
        matrix[2] *= y;
        matrix[3] *= y;

        return this;
    },

    /**
     * Rotate the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#rotate
     * @since 3.0.0
     *
     * @param {number} angle - The angle of rotation in radians.
     *
     * @return {this} This TransformMatrix.
     */
    rotate: function (angle)
    {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        var matrix = this.matrix;

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[2];
        var d = matrix[3];

        matrix[0] = a * cos + c * sin;
        matrix[1] = b * cos + d * sin;
        matrix[2] = a * -sin + c * cos;
        matrix[3] = b * -sin + d * cos;

        return this;
    },

    /**
     * Multiply this Matrix by the given Matrix.
     *
     * If an `out` Matrix is given then the results will be stored in it.
     * If it is not given, this matrix will be updated in place instead.
     * Use an `out` Matrix if you do not wish to mutate this matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#multiply
     * @since 3.0.0
     *
     * @param {Phaser.GameObjects.Components.TransformMatrix} rhs - The Matrix to multiply by.
     * @param {Phaser.GameObjects.Components.TransformMatrix} [out] - An optional Matrix to store the results in.
     *
     * @return {(this|Phaser.GameObjects.Components.TransformMatrix)} Either this TransformMatrix, or the `out` Matrix, if given in the arguments.
     */
    multiply: function (rhs, out)
    {
        var matrix = this.matrix;
        var source = rhs.matrix;

        var localA = matrix[0];
        var localB = matrix[1];
        var localC = matrix[2];
        var localD = matrix[3];
        var localE = matrix[4];
        var localF = matrix[5];

        var sourceA = source[0];
        var sourceB = source[1];
        var sourceC = source[2];
        var sourceD = source[3];
        var sourceE = source[4];
        var sourceF = source[5];

        var destinationMatrix = (out === undefined) ? this : out;

        destinationMatrix.a = (sourceA * localA) + (sourceB * localC);
        destinationMatrix.b = (sourceA * localB) + (sourceB * localD);
        destinationMatrix.c = (sourceC * localA) + (sourceD * localC);
        destinationMatrix.d = (sourceC * localB) + (sourceD * localD);
        destinationMatrix.e = (sourceE * localA) + (sourceF * localC) + localE;
        destinationMatrix.f = (sourceE * localB) + (sourceF * localD) + localF;

        return destinationMatrix;
    },

    /**
     * Multiply this Matrix by the matrix given, including the offset.
     *
     * The offsetX is added to the tx value: `offsetX * a + offsetY * c + tx`.
     * The offsetY is added to the ty value: `offsetY * b + offsetY * d + ty`.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#multiplyWithOffset
     * @since 3.11.0
     *
     * @param {Phaser.GameObjects.Components.TransformMatrix} src - The source Matrix to copy from.
     * @param {number} offsetX - Horizontal offset to factor in to the multiplication.
     * @param {number} offsetY - Vertical offset to factor in to the multiplication.
     *
     * @return {this} This TransformMatrix.
     */
    multiplyWithOffset: function (src, offsetX, offsetY)
    {
        var matrix = this.matrix;
        var otherMatrix = src.matrix;

        var a0 = matrix[0];
        var b0 = matrix[1];
        var c0 = matrix[2];
        var d0 = matrix[3];
        var tx0 = matrix[4];
        var ty0 = matrix[5];

        var pse = offsetX * a0 + offsetY * c0 + tx0;
        var psf = offsetX * b0 + offsetY * d0 + ty0;

        var a1 = otherMatrix[0];
        var b1 = otherMatrix[1];
        var c1 = otherMatrix[2];
        var d1 = otherMatrix[3];
        var tx1 = otherMatrix[4];
        var ty1 = otherMatrix[5];

        matrix[0] = a1 * a0 + b1 * c0;
        matrix[1] = a1 * b0 + b1 * d0;
        matrix[2] = c1 * a0 + d1 * c0;
        matrix[3] = c1 * b0 + d1 * d0;
        matrix[4] = tx1 * a0 + ty1 * c0 + pse;
        matrix[5] = tx1 * b0 + ty1 * d0 + psf;

        return this;
    },

    /**
     * Transform the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#transform
     * @since 3.0.0
     *
     * @param {number} a - The Scale X value.
     * @param {number} b - The Shear Y value.
     * @param {number} c - The Shear X value.
     * @param {number} d - The Scale Y value.
     * @param {number} tx - The Translate X value.
     * @param {number} ty - The Translate Y value.
     *
     * @return {this} This TransformMatrix.
     */
    transform: function (a, b, c, d, tx, ty)
    {
        var matrix = this.matrix;

        var a0 = matrix[0];
        var b0 = matrix[1];
        var c0 = matrix[2];
        var d0 = matrix[3];
        var tx0 = matrix[4];
        var ty0 = matrix[5];

        matrix[0] = a * a0 + b * c0;
        matrix[1] = a * b0 + b * d0;
        matrix[2] = c * a0 + d * c0;
        matrix[3] = c * b0 + d * d0;
        matrix[4] = tx * a0 + ty * c0 + tx0;
        matrix[5] = tx * b0 + ty * d0 + ty0;

        return this;
    },

    /**
     * Transform a point using this Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#transformPoint
     * @since 3.0.0
     *
     * @param {number} x - The x coordinate of the point to transform.
     * @param {number} y - The y coordinate of the point to transform.
     * @param {(Phaser.Geom.Point|Phaser.Math.Vector2|object)} point - The Point object to store the transformed coordinates.
     *
     * @return {(Phaser.Geom.Point|Phaser.Math.Vector2|object)} The Point containing the transformed coordinates.
     */
    transformPoint: function (x, y, point)
    {
        if (point === undefined) { point = { x: 0, y: 0 }; }

        var matrix = this.matrix;

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[2];
        var d = matrix[3];
        var tx = matrix[4];
        var ty = matrix[5];

        point.x = x * a + y * c + tx;
        point.y = x * b + y * d + ty;

        return point;
    },

    /**
     * Invert the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#invert
     * @since 3.0.0
     *
     * @return {this} This TransformMatrix.
     */
    invert: function ()
    {
        var matrix = this.matrix;

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[2];
        var d = matrix[3];
        var tx = matrix[4];
        var ty = matrix[5];

        var n = a * d - b * c;

        matrix[0] = d / n;
        matrix[1] = -b / n;
        matrix[2] = -c / n;
        matrix[3] = a / n;
        matrix[4] = (c * ty - d * tx) / n;
        matrix[5] = -(a * ty - b * tx) / n;

        return this;
    },

    /**
     * Set the values of this Matrix to copy those of the matrix given.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#copyFrom
     * @since 3.11.0
     *
     * @param {Phaser.GameObjects.Components.TransformMatrix} src - The source Matrix to copy from.
     *
     * @return {this} This TransformMatrix.
     */
    copyFrom: function (src)
    {
        var matrix = this.matrix;

        matrix[0] = src.a;
        matrix[1] = src.b;
        matrix[2] = src.c;
        matrix[3] = src.d;
        matrix[4] = src.e;
        matrix[5] = src.f;

        return this;
    },

    /**
     * Set the values of this Matrix to copy those of the array given.
     * Where array indexes 0, 1, 2, 3, 4 and 5 are mapped to a, b, c, d, e and f.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#copyFromArray
     * @since 3.11.0
     *
     * @param {array} src - The array of values to set into this matrix.
     *
     * @return {this} This TransformMatrix.
     */
    copyFromArray: function (src)
    {
        var matrix = this.matrix;

        matrix[0] = src[0];
        matrix[1] = src[1];
        matrix[2] = src[2];
        matrix[3] = src[3];
        matrix[4] = src[4];
        matrix[5] = src[5];

        return this;
    },

    /**
     * Copy the values from this Matrix to the given Canvas Rendering Context.
     * This will use the Context.transform method.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#copyToContext
     * @since 3.12.0
     *
     * @param {CanvasRenderingContext2D} ctx - The Canvas Rendering Context to copy the matrix values to.
     *
     * @return {CanvasRenderingContext2D} The Canvas Rendering Context.
     */
    copyToContext: function (ctx)
    {
        var matrix = this.matrix;

        ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

        return ctx;
    },

    /**
     * Copy the values from this Matrix to the given Canvas Rendering Context.
     * This will use the Context.setTransform method.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#setToContext
     * @since 3.12.0
     *
     * @param {CanvasRenderingContext2D} ctx - The Canvas Rendering Context to copy the matrix values to.
     *
     * @return {CanvasRenderingContext2D} The Canvas Rendering Context.
     */
    setToContext: function (ctx)
    {
        var matrix = this.matrix;

        ctx.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

        return ctx;
    },

    /**
     * Copy the values in this Matrix to the array given.
     *
     * Where array indexes 0, 1, 2, 3, 4 and 5 are mapped to a, b, c, d, e and f.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#copyToArray
     * @since 3.12.0
     *
     * @param {array} [out] - The array to copy the matrix values in to.
     *
     * @return {array} An array where elements 0 to 5 contain the values from this matrix.
     */
    copyToArray: function (out)
    {
        var matrix = this.matrix;

        if (out === undefined)
        {
            out = [ matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5] ];
        }
        else
        {
            out[0] = matrix[0];
            out[1] = matrix[1];
            out[2] = matrix[2];
            out[3] = matrix[3];
            out[4] = matrix[4];
            out[5] = matrix[5];
        }

        return out;
    },

    /**
     * Set the values of this Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#setTransform
     * @since 3.0.0
     *
     * @param {number} a - The Scale X value.
     * @param {number} b - The Shear Y value.
     * @param {number} c - The Shear X value.
     * @param {number} d - The Scale Y value.
     * @param {number} tx - The Translate X value.
     * @param {number} ty - The Translate Y value.
     *
     * @return {this} This TransformMatrix.
     */
    setTransform: function (a, b, c, d, tx, ty)
    {
        var matrix = this.matrix;

        matrix[0] = a;
        matrix[1] = b;
        matrix[2] = c;
        matrix[3] = d;
        matrix[4] = tx;
        matrix[5] = ty;

        return this;
    },

    /**
     * Decompose this Matrix into its translation, scale and rotation values using QR decomposition.
     *
     * The result must be applied in the following order to reproduce the current matrix:
     *
     * translate -> rotate -> scale
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#decomposeMatrix
     * @since 3.0.0
     *
     * @return {object} The decomposed Matrix.
     */
    decomposeMatrix: function ()
    {
        var decomposedMatrix = this.decomposedMatrix;

        var matrix = this.matrix;

        //  a = scale X (1)
        //  b = shear Y (0)
        //  c = shear X (0)
        //  d = scale Y (1)

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[2];
        var d = matrix[3];

        var determ = a * d - b * c;

        decomposedMatrix.translateX = matrix[4];
        decomposedMatrix.translateY = matrix[5];

        if (a || b)
        {
            var r = Math.sqrt(a * a + b * b);

            decomposedMatrix.rotation = (b > 0) ? Math.acos(a / r) : -Math.acos(a / r);
            decomposedMatrix.scaleX = r;
            decomposedMatrix.scaleY = determ / r;
        }
        else if (c || d)
        {
            var s = Math.sqrt(c * c + d * d);

            decomposedMatrix.rotation = Math.PI * 0.5 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
            decomposedMatrix.scaleX = determ / s;
            decomposedMatrix.scaleY = s;
        }
        else
        {
            decomposedMatrix.rotation = 0;
            decomposedMatrix.scaleX = 0;
            decomposedMatrix.scaleY = 0;
        }

        return decomposedMatrix;
    },

    /**
     * Apply the identity, translate, rotate and scale operations on the Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#applyITRS
     * @since 3.0.0
     *
     * @param {number} x - The horizontal translation.
     * @param {number} y - The vertical translation.
     * @param {number} rotation - The angle of rotation in radians.
     * @param {number} scaleX - The horizontal scale.
     * @param {number} scaleY - The vertical scale.
     *
     * @return {this} This TransformMatrix.
     */
    applyITRS: function (x, y, rotation, scaleX, scaleY)
    {
        var matrix = this.matrix;

        var radianSin = Math.sin(rotation);
        var radianCos = Math.cos(rotation);

        // Translate
        matrix[4] = x;
        matrix[5] = y;

        // Rotate and Scale
        matrix[0] = radianCos * scaleX;
        matrix[1] = radianSin * scaleX;
        matrix[2] = -radianSin * scaleY;
        matrix[3] = radianCos * scaleY;

        return this;
    },

    /**
     * Takes the `x` and `y` values and returns a new position in the `output` vector that is the inverse of
     * the current matrix with its transformation applied.
     *
     * Can be used to translate points from world to local space.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#applyInverse
     * @since 3.12.0
     *
     * @param {number} x - The x position to translate.
     * @param {number} y - The y position to translate.
     * @param {Phaser.Math.Vector2} [output] - A Vector2, or point-like object, to store the results in.
     *
     * @return {Phaser.Math.Vector2} The coordinates, inverse-transformed through this matrix.
     */
    applyInverse: function (x, y, output)
    {
        if (output === undefined) { output = new Vector2(); }

        var matrix = this.matrix;

        var a = matrix[0];
        var b = matrix[1];
        var c = matrix[2];
        var d = matrix[3];
        var tx = matrix[4];
        var ty = matrix[5];

        var id = 1 / ((a * d) + (c * -b));

        output.x = (d * id * x) + (-c * id * y) + (((ty * c) - (tx * d)) * id);
        output.y = (a * id * y) + (-b * id * x) + (((-ty * a) + (tx * b)) * id);

        return output;
    },

    /**
     * Returns the X component of this matrix multiplied by the given values.
     * This is the same as `x * a + y * c + e`.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#getX
     * @since 3.12.0
     *
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     *
     * @return {number} The calculated x value.
     */
    getX: function (x, y)
    {
        return x * this.a + y * this.c + this.e;
    },

    /**
     * Returns the Y component of this matrix multiplied by the given values.
     * This is the same as `x * b + y * d + f`.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#getY
     * @since 3.12.0
     *
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     *
     * @return {number} The calculated y value.
     */
    getY: function (x, y)
    {
        return x * this.b + y * this.d + this.f;
    },

    /**
     * Returns the X component of this matrix multiplied by the given values.
     *
     * This is the same as `x * a + y * c + e`, optionally passing via `Math.round`.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#getXRound
     * @since 3.50.0
     *
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {boolean} [round=false] - Math.round the resulting value?
     *
     * @return {number} The calculated x value.
     */
    getXRound: function (x, y, round)
    {
        var v = this.getX(x, y);

        if (round)
        {
            v = Math.round(v);
        }

        return v;
    },

    /**
     * Returns the Y component of this matrix multiplied by the given values.
     *
     * This is the same as `x * b + y * d + f`, optionally passing via `Math.round`.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#getYRound
     * @since 3.50.0
     *
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {boolean} [round=false] - Math.round the resulting value?
     *
     * @return {number} The calculated y value.
     */
    getYRound: function (x, y, round)
    {
        var v = this.getY(x, y);

        if (round)
        {
            v = Math.round(v);
        }

        return v;
    },

    /**
     * Returns a string that can be used in a CSS Transform call as a `matrix` property.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#getCSSMatrix
     * @since 3.12.0
     *
     * @return {string} A string containing the CSS Transform matrix values.
     */
    getCSSMatrix: function ()
    {
        var m = this.matrix;

        return 'matrix(' + m[0] + ',' + m[1] + ',' + m[2] + ',' + m[3] + ',' + m[4] + ',' + m[5] + ')';
    },

    /**
     * Destroys this Transform Matrix.
     *
     * @method Phaser.GameObjects.Components.TransformMatrix#destroy
     * @since 3.4.0
     */
    destroy: function ()
    {
        this.matrix = null;
        this.decomposedMatrix = null;
    }

});

module.exports = TransformMatrix;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var GetFastValue = __webpack_require__(2);

/**
 * Gets the tiles in the given rectangular area (in tile coordinates) of the layer.
 *
 * @function Phaser.Tilemaps.Components.GetTilesWithin
 * @since 3.0.0
 *
 * @param {number} tileX - The left most tile index (in tile coordinates) to use as the origin of the area.
 * @param {number} tileY - The top most tile index (in tile coordinates) to use as the origin of the area.
 * @param {number} width - How many tiles wide from the `tileX` index the area will be.
 * @param {number} height - How many tiles tall from the `tileY` index the area will be.
 * @param {Phaser.Types.Tilemaps.FilteringOptions} filteringOptions - Optional filters to apply when getting the tiles.
 * @param {Phaser.Tilemaps.LayerData} layer - The Tilemap Layer to act upon.
 *
 * @return {Phaser.Tilemaps.Tile[]} Array of Tile objects.
 */
var GetTilesWithin = function (tileX, tileY, width, height, filteringOptions, layer)
{
    if (tileX === undefined) { tileX = 0; }
    if (tileY === undefined) { tileY = 0; }
    if (width === undefined) { width = layer.width; }
    if (height === undefined) { height = layer.height; }
    if (!filteringOptions) { filteringOptions = {}; }

    var isNotEmpty = GetFastValue(filteringOptions, 'isNotEmpty', false);
    var isColliding = GetFastValue(filteringOptions, 'isColliding', false);
    var hasInterestingFace = GetFastValue(filteringOptions, 'hasInterestingFace', false);

    // Clip x, y to top left of map, while shrinking width/height to match.
    if (tileX < 0)
    {
        width += tileX;
        tileX = 0;
    }

    if (tileY < 0)
    {
        height += tileY;
        tileY = 0;
    }

    // Clip width and height to bottom right of map.
    if (tileX + width > layer.width)
    {
        width = Math.max(layer.width - tileX, 0);
    }

    if (tileY + height > layer.height)
    {
        height = Math.max(layer.height - tileY, 0);
    }

    var results = [];

    for (var ty = tileY; ty < tileY + height; ty++)
    {
        for (var tx = tileX; tx < tileX + width; tx++)
        {
            var tile = layer.data[ty][tx];

            if (tile !== null)
            {
                if (isNotEmpty && tile.index === -1)
                {
                    continue;
                }

                if (isColliding && !tile.collides)
                {
                    continue;
                }

                if (hasInterestingFace && !tile.hasInterestingFace)
                {
                    continue;
                }

                results.push(tile);
            }
        }
    }

    return results;
};

module.exports = GetTilesWithin;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Takes an array of Game Objects, or any objects that have a public property as defined in `key`,
 * and then sets it to the given value.
 *
 * The optional `step` property is applied incrementally, multiplied by each item in the array.
 *
 * To use this with a Group: `PropertyValueSet(group.getChildren(), key, value, step)`
 *
 * @function Phaser.Actions.PropertyValueSet
 * @since 3.3.0
 *
 * @generic {Phaser.GameObjects.GameObject[]} G - [items,$return]
 *
 * @param {(array|Phaser.GameObjects.GameObject[])} items - The array of items to be updated by this action.
 * @param {string} key - The property to be updated.
 * @param {number} value - The amount to set the property to.
 * @param {number} [step=0] - This is added to the `value` amount, multiplied by the iteration counter.
 * @param {number} [index=0] - An optional offset to start searching from within the items array.
 * @param {number} [direction=1] - The direction to iterate through the array. 1 is from beginning to end, -1 from end to beginning.
 *
 * @return {(array|Phaser.GameObjects.GameObject[])} The array of objects that were passed to this Action.
 */
var PropertyValueSet = function (items, key, value, step, index, direction)
{
    if (step === undefined) { step = 0; }
    if (index === undefined) { index = 0; }
    if (direction === undefined) { direction = 1; }

    var i;
    var t = 0;
    var end = items.length;

    if (direction === 1)
    {
        //  Start to End
        for (i = index; i < end; i++)
        {
            items[i][key] = value + (t * step);
            t++;
        }
    }
    else
    {
        //  End to Start
        for (i = index; i >= 0; i--)
        {
            items[i][key] = value + (t * step);
            t++;
        }
    }

    return items;
};

module.exports = PropertyValueSet;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var BlendModes = __webpack_require__(35);
var GetAdvancedValue = __webpack_require__(13);

/**
 * Builds a Game Object using the provided configuration object.
 *
 * @function Phaser.GameObjects.BuildGameObject
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - A reference to the Scene.
 * @param {Phaser.GameObjects.GameObject} gameObject - The initial GameObject.
 * @param {Phaser.Types.GameObjects.GameObjectConfig} config - The config to build the GameObject with.
 *
 * @return {Phaser.GameObjects.GameObject} The built Game Object.
 */
var BuildGameObject = function (scene, gameObject, config)
{
    //  Position

    gameObject.x = GetAdvancedValue(config, 'x', 0);
    gameObject.y = GetAdvancedValue(config, 'y', 0);
    gameObject.depth = GetAdvancedValue(config, 'depth', 0);

    //  Flip

    gameObject.flipX = GetAdvancedValue(config, 'flipX', false);
    gameObject.flipY = GetAdvancedValue(config, 'flipY', false);

    //  Scale
    //  Either: { scale: 2 } or { scale: { x: 2, y: 2 }}

    var scale = GetAdvancedValue(config, 'scale', null);

    if (typeof scale === 'number')
    {
        gameObject.setScale(scale);
    }
    else if (scale !== null)
    {
        gameObject.scaleX = GetAdvancedValue(scale, 'x', 1);
        gameObject.scaleY = GetAdvancedValue(scale, 'y', 1);
    }

    //  ScrollFactor
    //  Either: { scrollFactor: 2 } or { scrollFactor: { x: 2, y: 2 }}

    var scrollFactor = GetAdvancedValue(config, 'scrollFactor', null);

    if (typeof scrollFactor === 'number')
    {
        gameObject.setScrollFactor(scrollFactor);
    }
    else if (scrollFactor !== null)
    {
        gameObject.scrollFactorX = GetAdvancedValue(scrollFactor, 'x', 1);
        gameObject.scrollFactorY = GetAdvancedValue(scrollFactor, 'y', 1);
    }

    //  Rotation

    gameObject.rotation = GetAdvancedValue(config, 'rotation', 0);

    var angle = GetAdvancedValue(config, 'angle', null);

    if (angle !== null)
    {
        gameObject.angle = angle;
    }

    //  Alpha

    gameObject.alpha = GetAdvancedValue(config, 'alpha', 1);

    //  Origin
    //  Either: { origin: 0.5 } or { origin: { x: 0.5, y: 0.5 }}

    var origin = GetAdvancedValue(config, 'origin', null);

    if (typeof origin === 'number')
    {
        gameObject.setOrigin(origin);
    }
    else if (origin !== null)
    {
        var ox = GetAdvancedValue(origin, 'x', 0.5);
        var oy = GetAdvancedValue(origin, 'y', 0.5);

        gameObject.setOrigin(ox, oy);
    }

    //  BlendMode

    gameObject.blendMode = GetAdvancedValue(config, 'blendMode', BlendModes.NORMAL);

    //  Visible

    gameObject.visible = GetAdvancedValue(config, 'visible', true);

    //  Add to Scene

    var add = GetAdvancedValue(config, 'add', true);

    if (add)
    {
        scene.sys.displayList.add(gameObject);
    }

    if (gameObject.preUpdate)
    {
        scene.sys.updateList.add(gameObject);
    }

    return gameObject;
};

module.exports = BuildGameObject;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Phaser Tilemap constants for orientation.
 * 
 * @namespace Phaser.Tilemaps.Orientation
 * @memberof Phaser.Tilemaps
 * @since 3.50.0
 */

/**
 * Phaser Tilemap constants for orientation.
 * 
 * To find out what each mode does please see [Phaser.Tilemaps.Orientation]{@link Phaser.Tilemaps.Orientation}.
 * 
 * @typedef {Phaser.Tilemaps.Orientation} Phaser.Tilemaps.OrientationType
 * @memberof Phaser.Tilemaps
 * @since 3.50.0
 */

module.exports = {

    /**
     * Orthogonal Tilemap orientation constant.
     * 
     * @name Phaser.Tilemaps.Orientation.ORTHOGONAL
     * @type {number}
     * @const
     * @since 3.50.0
     */
    ORTHOGONAL: 0,

    /**
     * Isometric Tilemap orientation constant.
     *
     * @name Phaser.Tilemaps.Orientation.ISOMETRIC
     * @type {number}
     * @const
     * @since 3.50.0
     */
    ISOMETRIC: 1,

    /**
     * Staggered Tilemap orientation constant.
     *
     * @name Phaser.Tilemaps.Orientation.STAGGERED
     * @type {number}
     * @const
     * @since 3.50.0
     */
    STAGGERED: 2,

    /**
     * Hexagonal Tilemap orientation constant.
     *
     * @name Phaser.Tilemaps.Orientation.HEXAGONAL
     * @type {number}
     * @const
     * @since 3.50.0
     */
    HEXAGONAL: 3

};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var GetCalcMatrix = __webpack_require__(19);

/**
 * Takes a reference to the Canvas Renderer, a Canvas Rendering Context, a Game Object, a Camera and a parent matrix
 * and then performs the following steps:
 *
 * 1. Checks the alpha of the source combined with the Camera alpha. If 0 or less it aborts.
 * 2. Takes the Camera and Game Object matrix and multiplies them, combined with the parent matrix if given.
 * 3. Sets the blend mode of the context to be that used by the Game Object.
 * 4. Sets the alpha value of the context to be that used by the Game Object combined with the Camera.
 * 5. Saves the context state.
 * 6. Sets the final matrix values into the context via setTransform.
 * 7. If Renderer.antialias, or the frame.source.scaleMode is set, then imageSmoothingEnabled is set.
 *
 * This function is only meant to be used internally. Most of the Canvas Renderer classes use it.
 *
 * @function Phaser.Renderer.Canvas.SetTransform
 * @since 3.12.0
 *
 * @param {Phaser.Renderer.Canvas.CanvasRenderer} renderer - A reference to the current active Canvas renderer.
 * @param {CanvasRenderingContext2D} ctx - The canvas context to set the transform on.
 * @param {Phaser.GameObjects.GameObject} src - The Game Object being rendered. Can be any type that extends the base class.
 * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
 * @param {Phaser.GameObjects.Components.TransformMatrix} [parentMatrix] - A parent transform matrix to apply to the Game Object before rendering.
 *
 * @return {boolean} `true` if the Game Object context was set, otherwise `false`.
 */
var SetTransform = function (renderer, ctx, src, camera, parentMatrix)
{
    var alpha = camera.alpha * src.alpha;

    if (alpha <= 0)
    {
        //  Nothing to see, so don't waste time calculating stuff
        return false;
    }

    var calcMatrix = GetCalcMatrix(src, camera, parentMatrix).calc;

    //  Blend Mode
    ctx.globalCompositeOperation = renderer.blendModes[src.blendMode];

    //  Alpha
    ctx.globalAlpha = alpha;

    ctx.save();

    calcMatrix.setToContext(ctx);

    ctx.imageSmoothingEnabled = !(!renderer.antialias || (src.frame && src.frame.source.scaleMode));

    return true;
};

module.exports = SetTransform;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var CONST = __webpack_require__(33);
var Smoothing = __webpack_require__(192);

// The pool into which the canvas elements are placed.
var pool = [];

//  Automatically apply smoothing(false) to created Canvas elements
var _disableContextSmoothing = false;

/**
 * The CanvasPool is a global static object, that allows Phaser to recycle and pool 2D Context Canvas DOM elements.
 * It does not pool WebGL Contexts, because once the context options are set they cannot be modified again, 
 * which is useless for some of the Phaser pipelines / renderer.
 *
 * This singleton is instantiated as soon as Phaser loads, before a Phaser.Game instance has even been created.
 * Which means all instances of Phaser Games on the same page can share the one single pool.
 *
 * @namespace Phaser.Display.Canvas.CanvasPool
 * @since 3.0.0
 */
var CanvasPool = function ()
{
    /**
     * Creates a new Canvas DOM element, or pulls one from the pool if free.
     *
     * @function Phaser.Display.Canvas.CanvasPool.create
     * @since 3.0.0
     *
     * @param {*} parent - The parent of the Canvas object.
     * @param {number} [width=1] - The width of the Canvas.
     * @param {number} [height=1] - The height of the Canvas.
     * @param {number} [canvasType=Phaser.CANVAS] - The type of the Canvas. Either `Phaser.CANVAS` or `Phaser.WEBGL`.
     * @param {boolean} [selfParent=false] - Use the generated Canvas element as the parent?
     *
     * @return {HTMLCanvasElement} The canvas element that was created or pulled from the pool
     */
    var create = function (parent, width, height, canvasType, selfParent)
    {
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = 1; }
        if (canvasType === undefined) { canvasType = CONST.CANVAS; }
        if (selfParent === undefined) { selfParent = false; }

        var canvas;
        var container = first(canvasType);

        if (container === null)
        {
            container = {
                parent: parent,
                canvas: document.createElement('canvas'),
                type: canvasType
            };

            if (canvasType === CONST.CANVAS)
            {
                pool.push(container);
            }

            canvas = container.canvas;
        }
        else
        {
            container.parent = parent;

            canvas = container.canvas;
        }

        if (selfParent)
        {
            container.parent = canvas;
        }

        canvas.width = width;
        canvas.height = height;

        if (_disableContextSmoothing && canvasType === CONST.CANVAS)
        {
            Smoothing.disable(canvas.getContext('2d'));
        }

        return canvas;
    };

    /**
     * Creates a new Canvas DOM element, or pulls one from the pool if free.
     *
     * @function Phaser.Display.Canvas.CanvasPool.create2D
     * @since 3.0.0
     *
     * @param {*} parent - The parent of the Canvas object.
     * @param {number} [width=1] - The width of the Canvas.
     * @param {number} [height=1] - The height of the Canvas.
     *
     * @return {HTMLCanvasElement} The created canvas.
     */
    var create2D = function (parent, width, height)
    {
        return create(parent, width, height, CONST.CANVAS);
    };

    /**
     * Creates a new Canvas DOM element, or pulls one from the pool if free.
     *
     * @function Phaser.Display.Canvas.CanvasPool.createWebGL
     * @since 3.0.0
     *
     * @param {*} parent - The parent of the Canvas object.
     * @param {number} [width=1] - The width of the Canvas.
     * @param {number} [height=1] - The height of the Canvas.
     *
     * @return {HTMLCanvasElement} The created WebGL canvas.
     */
    var createWebGL = function (parent, width, height)
    {
        return create(parent, width, height, CONST.WEBGL);
    };

    /**
     * Gets the first free canvas index from the pool.
     *
     * @function Phaser.Display.Canvas.CanvasPool.first
     * @since 3.0.0
     *
     * @param {number} [canvasType=Phaser.CANVAS] - The type of the Canvas. Either `Phaser.CANVAS` or `Phaser.WEBGL`.
     *
     * @return {HTMLCanvasElement} The first free canvas, or `null` if a WebGL canvas was requested or if the pool doesn't have free canvases.
     */
    var first = function (canvasType)
    {
        if (canvasType === undefined) { canvasType = CONST.CANVAS; }

        if (canvasType === CONST.WEBGL)
        {
            return null;
        }

        for (var i = 0; i < pool.length; i++)
        {
            var container = pool[i];

            if (!container.parent && container.type === canvasType)
            {
                return container;
            }
        }

        return null;
    };

    /**
     * Looks up a canvas based on its parent, and if found puts it back in the pool, freeing it up for re-use.
     * The canvas has its width and height set to 1, and its parent attribute nulled.
     *
     * @function Phaser.Display.Canvas.CanvasPool.remove
     * @since 3.0.0
     *
     * @param {*} parent - The canvas or the parent of the canvas to free.
     */
    var remove = function (parent)
    {
        //  Check to see if the parent is a canvas object
        var isCanvas = parent instanceof HTMLCanvasElement;

        pool.forEach(function (container)
        {
            if ((isCanvas && container.canvas === parent) || (!isCanvas && container.parent === parent))
            {
                container.parent = null;
                container.canvas.width = 1;
                container.canvas.height = 1;
            }
        });
    };

    /**
     * Gets the total number of used canvas elements in the pool.
     *
     * @function Phaser.Display.Canvas.CanvasPool.total
     * @since 3.0.0
     *
     * @return {number} The number of used canvases.
     */
    var total = function ()
    {
        var c = 0;

        pool.forEach(function (container)
        {
            if (container.parent)
            {
                c++;
            }
        });

        return c;
    };

    /**
     * Gets the total number of free canvas elements in the pool.
     *
     * @function Phaser.Display.Canvas.CanvasPool.free
     * @since 3.0.0
     *
     * @return {number} The number of free canvases.
     */
    var free = function ()
    {
        return pool.length - total();
    };

    /**
     * Disable context smoothing on any new Canvas element created.
     *
     * @function Phaser.Display.Canvas.CanvasPool.disableSmoothing
     * @since 3.0.0
     */
    var disableSmoothing = function ()
    {
        _disableContextSmoothing = true;
    };

    /**
     * Enable context smoothing on any new Canvas element created.
     *
     * @function Phaser.Display.Canvas.CanvasPool.enableSmoothing
     * @since 3.0.0
     */
    var enableSmoothing = function ()
    {
        _disableContextSmoothing = false;
    };

    return {
        create2D: create2D,
        create: create,
        createWebGL: createWebGL,
        disableSmoothing: disableSmoothing,
        enableSmoothing: enableSmoothing,
        first: first,
        free: free,
        pool: pool,
        remove: remove,
        total: total
    };
};

//  If we export the called function here, it'll only be invoked once (not every time it's required).
module.exports = CanvasPool();


/***/ }),
/* 32 */
/***/ (function(module, exports) {

/**
* The `Matter.Common` module contains utility functions that are common to all modules.
*
* @class Common
*/

var Common = {};

module.exports = Common;

(function() {

    Common._nextId = 0;
    Common._seed = 0;
    Common._nowStartTime = +(new Date());

    /**
     * Extends the object in the first argument using the object in the second argument.
     * @method extend
     * @param {} obj
     * @param {boolean} deep
     * @return {} obj extended
     */
    Common.extend = function(obj, deep) {
        var argsStart,
            args,
            deepClone;

        if (typeof deep === 'boolean') {
            argsStart = 2;
            deepClone = deep;
        } else {
            argsStart = 1;
            deepClone = true;
        }

        for (var i = argsStart; i < arguments.length; i++) {
            var source = arguments[i];

            if (source) {
                for (var prop in source) {
                    if (deepClone && source[prop] && source[prop].constructor === Object) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            Common.extend(obj[prop], deepClone, source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        }
        
        return obj;
    };

    /**
     * Creates a new clone of the object, if deep is true references will also be cloned.
     * @method clone
     * @param {} obj
     * @param {bool} deep
     * @return {} obj cloned
     */
    Common.clone = function(obj, deep) {
        return Common.extend({}, deep, obj);
    };

    /**
     * Returns the list of keys for the given object.
     * @method keys
     * @param {} obj
     * @return {string[]} keys
     */
    Common.keys = function(obj) {
        if (Object.keys)
            return Object.keys(obj);

        // avoid hasOwnProperty for performance
        var keys = [];
        for (var key in obj)
            keys.push(key);
        return keys;
    };

    /**
     * Returns the list of values for the given object.
     * @method values
     * @param {} obj
     * @return {array} Array of the objects property values
     */
    Common.values = function(obj) {
        var values = [];
        
        if (Object.keys) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        }
        
        // avoid hasOwnProperty for performance
        for (var key in obj)
            values.push(obj[key]);
        return values;
    };

    /**
     * Gets a value from `base` relative to the `path` string.
     * @method get
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} The object at the given path
     */
    Common.get = function(obj, path, begin, end) {
        path = path.split('.').slice(begin, end);

        for (var i = 0; i < path.length; i += 1) {
            obj = obj[path[i]];
        }

        return obj;
    };

    /**
     * Sets a value on `base` relative to the given `path` string.
     * @method set
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {} val The value to set
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} Pass through `val` for chaining
     */
    Common.set = function(obj, path, val, begin, end) {
        var parts = path.split('.').slice(begin, end);
        Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
        return val;
    };

    /**
     * Shuffles the given array in-place.
     * The function uses a seeded random generator.
     * @method shuffle
     * @param {array} array
     * @return {array} array shuffled randomly
     */
    Common.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Common.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    /**
     * Randomly chooses a value from a list with equal probability.
     * The function uses a seeded random generator.
     * @method choose
     * @param {array} choices
     * @return {object} A random choice object from the array
     */
    Common.choose = function(choices) {
        return choices[Math.floor(Common.random() * choices.length)];
    };

    /**
     * Returns true if the object is a HTMLElement, otherwise false.
     * @method isElement
     * @param {object} obj
     * @return {boolean} True if the object is a HTMLElement, otherwise false
     */
    Common.isElement = function(obj) {
        if (typeof HTMLElement !== 'undefined') {
            return obj instanceof HTMLElement;
        }

        return !!(obj && obj.nodeType && obj.nodeName);
    };

    /**
     * Returns true if the object is an array.
     * @method isArray
     * @param {object} obj
     * @return {boolean} True if the object is an array, otherwise false
     */
    Common.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * Returns true if the object is a function.
     * @method isFunction
     * @param {object} obj
     * @return {boolean} True if the object is a function, otherwise false
     */
    Common.isFunction = function(obj) {
        return typeof obj === "function";
    };

    /**
     * Returns true if the object is a plain object.
     * @method isPlainObject
     * @param {object} obj
     * @return {boolean} True if the object is a plain object, otherwise false
     */
    Common.isPlainObject = function(obj) {
        return typeof obj === 'object' && obj.constructor === Object;
    };

    /**
     * Returns true if the object is a string.
     * @method isString
     * @param {object} obj
     * @return {boolean} True if the object is a string, otherwise false
     */
    Common.isString = function(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    };
    
    /**
     * Returns the given value clamped between a minimum and maximum value.
     * @method clamp
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @return {number} The value clamped between min and max inclusive
     */
    Common.clamp = function(value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    };
    
    /**
     * Returns the sign of the given value.
     * @method sign
     * @param {number} value
     * @return {number} -1 if negative, +1 if 0 or positive
     */
    Common.sign = function(value) {
        return value < 0 ? -1 : 1;
    };
    
    /**
     * Returns the current timestamp since the time origin (e.g. from page load).
     * The result will be high-resolution including decimal places if available.
     * @method now
     * @return {number} the current timestamp
     */
    Common.now = function() {
        if (typeof window !== 'undefined' && window.performance) {
            if (window.performance.now) {
                return window.performance.now();
            } else if (window.performance.webkitNow) {
                return window.performance.webkitNow();
            }
        }

        return (new Date()) - Common._nowStartTime;
    };
    
    /**
     * Returns a random value between a minimum and a maximum value inclusive.
     * The function uses a seeded random generator.
     * @method random
     * @param {number} min
     * @param {number} max
     * @return {number} A random number between min and max inclusive
     */
    Common.random = function(min, max) {
        min = (typeof min !== "undefined") ? min : 0;
        max = (typeof max !== "undefined") ? max : 1;
        return min + _seededRandom() * (max - min);
    };

    var _seededRandom = function() {
        // https://en.wikipedia.org/wiki/Linear_congruential_generator
        Common._seed = (Common._seed * 9301 + 49297) % 233280;
        return Common._seed / 233280;
    };

    /**
     * Converts a CSS hex colour string into an integer.
     * @method colorToNumber
     * @param {string} colorString
     * @return {number} An integer representing the CSS hex string
     */
    Common.colorToNumber = function(colorString) {
        colorString = colorString.replace('#','');

        if (colorString.length == 3) {
            colorString = colorString.charAt(0) + colorString.charAt(0)
                        + colorString.charAt(1) + colorString.charAt(1)
                        + colorString.charAt(2) + colorString.charAt(2);
        }

        return parseInt(colorString, 16);
    };

    /**
     * The console logging level to use, where each level includes all levels above and excludes the levels below.
     * The default level is 'debug' which shows all console messages.  
     *
     * Possible level values are:
     * - 0 = None
     * - 1 = Debug
     * - 2 = Info
     * - 3 = Warn
     * - 4 = Error
     * @property Common.logLevel
     * @type {Number}
     * @default 1
     */
    Common.logLevel = 1;

    /**
     * Shows a `console.log` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method log
     * @param ...objs {} The objects to log.
     */
    Common.log = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.log.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.info` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method info
     * @param ...objs {} The objects to log.
     */
    Common.info = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
            console.info.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.warn` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method warn
     * @param ...objs {} The objects to log.
     */
    Common.warn = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.warn.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Returns the next unique sequential ID.
     * @method nextId
     * @return {Number} Unique sequential ID
     */
    Common.nextId = function() {
        return Common._nextId++;
    };

    /**
     * A cross browser compatible indexOf implementation.
     * @method indexOf
     * @param {array} haystack
     * @param {object} needle
     * @return {number} The position of needle in haystack, otherwise -1.
     */
    Common.indexOf = function(haystack, needle) {
        if (haystack.indexOf)
            return haystack.indexOf(needle);

        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle)
                return i;
        }

        return -1;
    };

    /**
     * A cross browser compatible array map implementation.
     * @method map
     * @param {array} list
     * @param {function} func
     * @return {array} Values from list transformed by func.
     */
    Common.map = function(list, func) {
        if (list.map) {
            return list.map(func);
        }

        var mapped = [];

        for (var i = 0; i < list.length; i += 1) {
            mapped.push(func(list[i]));
        }

        return mapped;
    };

    /**
     * Takes a directed graph and returns the partially ordered set of vertices in topological order.
     * Circular dependencies are allowed.
     * @method topologicalSort
     * @param {object} graph
     * @return {array} Partially ordered set of vertices in topological order.
     */
    Common.topologicalSort = function(graph) {
        // https://github.com/mgechev/javascript-algorithms
        // Copyright (c) Minko Gechev (MIT license)
        // Modifications: tidy formatting and naming
        var result = [],
            visited = [],
            temp = [];

        for (var node in graph) {
            if (!visited[node] && !temp[node]) {
                Common._topologicalSort(node, visited, temp, graph, result);
            }
        }

        return result;
    };

    Common._topologicalSort = function(node, visited, temp, graph, result) {
        var neighbors = graph[node] || [];
        temp[node] = true;

        for (var i = 0; i < neighbors.length; i += 1) {
            var neighbor = neighbors[i];

            if (temp[neighbor]) {
                // skip circular dependencies
                continue;
            }

            if (!visited[neighbor]) {
                Common._topologicalSort(neighbor, visited, temp, graph, result);
            }
        }

        temp[node] = false;
        visited[node] = true;

        result.push(node);
    };

    /**
     * Takes _n_ functions as arguments and returns a new function that calls them in order.
     * The arguments applied when calling the new function will also be applied to every function passed.
     * The value of `this` refers to the last value returned in the chain that was not `undefined`.
     * Therefore if a passed function does not return a value, the previously returned value is maintained.
     * After all passed functions have been called the new function returns the last returned value (if any).
     * If any of the passed functions are a chain, then the chain will be flattened.
     * @method chain
     * @param ...funcs {function} The functions to chain.
     * @return {function} A new function that calls the passed functions in order.
     */
    Common.chain = function() {
        var funcs = [];

        for (var i = 0; i < arguments.length; i += 1) {
            var func = arguments[i];

            if (func._chained) {
                // flatten already chained functions
                funcs.push.apply(funcs, func._chained);
            } else {
                funcs.push(func);
            }
        }

        var chain = function() {
            // https://github.com/GoogleChrome/devtools-docs/issues/53#issuecomment-51941358
            var lastResult,
                args = new Array(arguments.length);

            for (var i = 0, l = arguments.length; i < l; i++) {
                args[i] = arguments[i];
            }

            for (i = 0; i < funcs.length; i += 1) {
                var result = funcs[i].apply(lastResult, args);

                if (typeof result !== 'undefined') {
                    lastResult = result;
                }
            }

            return lastResult;
        };

        chain._chained = funcs;

        return chain;
    };

    /**
     * Chains a function to excute before the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathBefore
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathBefore = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            func,
            Common.get(base, path)
        ));
    };

    /**
     * Chains a function to excute after the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathAfter
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathAfter = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            Common.get(base, path),
            func
        ));
    };
})();


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Global constants.
 *
 * @ignore
 */

var CONST = {

    /**
     * Phaser Release Version
     *
     * @name Phaser.VERSION
     * @const
     * @type {string}
     * @since 3.0.0
     */
    VERSION: '3.54.0',

    BlendModes: __webpack_require__(35),

    ScaleModes: __webpack_require__(168),

    /**
     * This setting will auto-detect if the browser is capable of suppporting WebGL.
     * If it is, it will use the WebGL Renderer. If not, it will fall back to the Canvas Renderer.
     *
     * @name Phaser.AUTO
     * @const
     * @type {number}
     * @since 3.0.0
     */
    AUTO: 0,

    /**
     * Forces Phaser to only use the Canvas Renderer, regardless if the browser supports
     * WebGL or not.
     *
     * @name Phaser.CANVAS
     * @const
     * @type {number}
     * @since 3.0.0
     */
    CANVAS: 1,

    /**
     * Forces Phaser to use the WebGL Renderer. If the browser does not support it, there is
     * no fallback to Canvas with this setting, so you should trap it and display a suitable
     * message to the user.
     *
     * @name Phaser.WEBGL
     * @const
     * @type {number}
     * @since 3.0.0
     */
    WEBGL: 2,

    /**
     * A Headless Renderer doesn't create either a Canvas or WebGL Renderer. However, it still
     * absolutely relies on the DOM being present and available. This mode is meant for unit testing,
     * not for running Phaser on the server, which is something you really shouldn't do.
     *
     * @name Phaser.HEADLESS
     * @const
     * @type {number}
     * @since 3.0.0
     */
    HEADLESS: 3,

    /**
     * In Phaser the value -1 means 'forever' in lots of cases, this const allows you to use it instead
     * to help you remember what the value is doing in your code.
     *
     * @name Phaser.FOREVER
     * @const
     * @type {number}
     * @since 3.0.0
     */
    FOREVER: -1,

    /**
     * Direction constant.
     *
     * @name Phaser.NONE
     * @const
     * @type {number}
     * @since 3.0.0
     */
    NONE: 4,

    /**
     * Direction constant.
     *
     * @name Phaser.UP
     * @const
     * @type {number}
     * @since 3.0.0
     */
    UP: 5,

    /**
     * Direction constant.
     *
     * @name Phaser.DOWN
     * @const
     * @type {number}
     * @since 3.0.0
     */
    DOWN: 6,

    /**
     * Direction constant.
     *
     * @name Phaser.LEFT
     * @const
     * @type {number}
     * @since 3.0.0
     */
    LEFT: 7,

    /**
     * Direction constant.
     *
     * @name Phaser.RIGHT
     * @const
     * @type {number}
     * @since 3.0.0
     */
    RIGHT: 8

};

module.exports = CONST;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var Components = __webpack_require__(11);
var GameObject = __webpack_require__(15);
var Line = __webpack_require__(47);
var PIPELINES_CONST = __webpack_require__(67);

/**
 * @classdesc
 * The Shape Game Object is a base class for the various different shapes, such as the Arc, Star or Polygon.
 * You cannot add a Shape directly to your Scene, it is meant as a base for your own custom Shape classes.
 *
 * @class Shape
 * @extends Phaser.GameObjects.GameObject
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.13.0
 *
 * @extends Phaser.GameObjects.Components.AlphaSingle
 * @extends Phaser.GameObjects.Components.BlendMode
  * @extends Phaser.GameObjects.Components.Depth
 * @extends Phaser.GameObjects.Components.GetBounds
 * @extends Phaser.GameObjects.Components.Mask
 * @extends Phaser.GameObjects.Components.Origin
 * @extends Phaser.GameObjects.Components.Pipeline
 * @extends Phaser.GameObjects.Components.ScrollFactor
 * @extends Phaser.GameObjects.Components.Transform
 * @extends Phaser.GameObjects.Components.Visible
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object belongs. A Game Object can only belong to one Scene at a time.
 * @param {string} [type] - The internal type of the Shape.
 * @param {any} [data] - The data of the source shape geometry, if any.
 */
var Shape = new Class({

    Extends: GameObject,

    Mixins: [
        Components.AlphaSingle,
        Components.BlendMode,
        Components.Depth,
        Components.GetBounds,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.ScrollFactor,
        Components.Transform,
        Components.Visible
    ],

    initialize:

    function Shape (scene, type, data)
    {
        if (type === undefined) { type = 'Shape'; }

        GameObject.call(this, scene, type);

        /**
         * The source Shape data. Typically a geometry object.
         * You should not manipulate this directly.
         *
         * @name Phaser.GameObjects.Shape#geom
         * @type {any}
         * @readonly
         * @since 3.13.0
         */
        this.geom = data;

        /**
         * Holds the polygon path data for filled rendering.
         *
         * @name Phaser.GameObjects.Shape#pathData
         * @type {number[]}
         * @readonly
         * @since 3.13.0
         */
        this.pathData = [];

        /**
         * Holds the earcut polygon path index data for filled rendering.
         *
         * @name Phaser.GameObjects.Shape#pathIndexes
         * @type {number[]}
         * @readonly
         * @since 3.13.0
         */
        this.pathIndexes = [];

        /**
         * The fill color used by this Shape.
         *
         * @name Phaser.GameObjects.Shape#fillColor
         * @type {number}
         * @since 3.13.0
         */
        this.fillColor = 0xffffff;

        /**
         * The fill alpha value used by this Shape.
         *
         * @name Phaser.GameObjects.Shape#fillAlpha
         * @type {number}
         * @since 3.13.0
         */
        this.fillAlpha = 1;

        /**
         * The stroke color used by this Shape.
         *
         * @name Phaser.GameObjects.Shape#strokeColor
         * @type {number}
         * @since 3.13.0
         */
        this.strokeColor = 0xffffff;

        /**
         * The stroke alpha value used by this Shape.
         *
         * @name Phaser.GameObjects.Shape#strokeAlpha
         * @type {number}
         * @since 3.13.0
         */
        this.strokeAlpha = 1;

        /**
         * The stroke line width used by this Shape.
         *
         * @name Phaser.GameObjects.Shape#lineWidth
         * @type {number}
         * @since 3.13.0
         */
        this.lineWidth = 1;

        /**
         * Controls if this Shape is filled or not.
         * Note that some Shapes do not support being filled (such as Line shapes)
         *
         * @name Phaser.GameObjects.Shape#isFilled
         * @type {boolean}
         * @since 3.13.0
         */
        this.isFilled = false;

        /**
         * Controls if this Shape is stroked or not.
         * Note that some Shapes do not support being stroked (such as Iso Box shapes)
         *
         * @name Phaser.GameObjects.Shape#isStroked
         * @type {boolean}
         * @since 3.13.0
         */
        this.isStroked = false;

        /**
         * Controls if this Shape path is closed during rendering when stroked.
         * Note that some Shapes are always closed when stroked (such as Ellipse shapes)
         *
         * @name Phaser.GameObjects.Shape#closePath
         * @type {boolean}
         * @since 3.13.0
         */
        this.closePath = true;

        /**
         * Private internal value.
         * A Line used when parsing internal path data to avoid constant object re-creation.
         *
         * @name Phaser.GameObjects.Shape#_tempLine
         * @type {Phaser.Geom.Line}
         * @private
         * @since 3.13.0
         */
        this._tempLine = new Line();

        /**
         * The native (un-scaled) width of this Game Object.
         *
         * Changing this value will not change the size that the Game Object is rendered in-game.
         * For that you need to either set the scale of the Game Object (`setScale`) or use
         * the `displayWidth` property.
         *
         * @name Phaser.GameObjects.Shape#width
         * @type {number}
         * @since 3.13.0
         */
        this.width = 0;

        /**
         * The native (un-scaled) height of this Game Object.
         *
         * Changing this value will not change the size that the Game Object is rendered in-game.
         * For that you need to either set the scale of the Game Object (`setScale`) or use
         * the `displayHeight` property.
         *
         * @name Phaser.GameObjects.Shape#height
         * @type {number}
         * @since 3.0.0
         */
        this.height = 0;

        this.initPipeline(PIPELINES_CONST.GRAPHICS_PIPELINE);
    },

    /**
     * Sets the fill color and alpha for this Shape.
     *
     * If you wish for the Shape to not be filled then call this method with no arguments, or just set `isFilled` to `false`.
     *
     * Note that some Shapes do not support fill colors, such as the Line shape.
     *
     * This call can be chained.
     *
     * @method Phaser.GameObjects.Shape#setFillStyle
     * @since 3.13.0
     *
     * @param {number} [color] - The color used to fill this shape. If not provided the Shape will not be filled.
     * @param {number} [alpha=1] - The alpha value used when filling this shape, if a fill color is given.
     *
     * @return {this} This Game Object instance.
     */
    setFillStyle: function (color, alpha)
    {
        if (alpha === undefined) { alpha = 1; }

        if (color === undefined)
        {
            this.isFilled = false;
        }
        else
        {
            this.fillColor = color;
            this.fillAlpha = alpha;
            this.isFilled = true;
        }

        return this;
    },

    /**
     * Sets the stroke color and alpha for this Shape.
     *
     * If you wish for the Shape to not be stroked then call this method with no arguments, or just set `isStroked` to `false`.
     *
     * Note that some Shapes do not support being stroked, such as the Iso Box shape.
     *
     * This call can be chained.
     *
     * @method Phaser.GameObjects.Shape#setStrokeStyle
     * @since 3.13.0
     *
     * @param {number} [lineWidth] - The width of line to stroke with. If not provided or undefined the Shape will not be stroked.
     * @param {number} [color] - The color used to stroke this shape. If not provided the Shape will not be stroked.
     * @param {number} [alpha=1] - The alpha value used when stroking this shape, if a stroke color is given.
     *
     * @return {this} This Game Object instance.
     */
    setStrokeStyle: function (lineWidth, color, alpha)
    {
        if (alpha === undefined) { alpha = 1; }

        if (lineWidth === undefined)
        {
            this.isStroked = false;
        }
        else
        {
            this.lineWidth = lineWidth;
            this.strokeColor = color;
            this.strokeAlpha = alpha;
            this.isStroked = true;
        }

        return this;
    },

    /**
     * Sets if this Shape path is closed during rendering when stroked.
     * Note that some Shapes are always closed when stroked (such as Ellipse shapes)
     *
     * This call can be chained.
     *
     * @method Phaser.GameObjects.Shape#setClosePath
     * @since 3.13.0
     *
     * @param {boolean} value - Set to `true` if the Shape should be closed when stroked, otherwise `false`.
     *
     * @return {this} This Game Object instance.
     */
    setClosePath: function (value)
    {
        this.closePath = value;

        return this;
    },

    /**
     * Sets the internal size of this Game Object, as used for frame or physics body creation.
     *
     * This will not change the size that the Game Object is rendered in-game.
     * For that you need to either set the scale of the Game Object (`setScale`) or call the
     * `setDisplaySize` method, which is the same thing as changing the scale but allows you
     * to do so by giving pixel values.
     *
     * If you have enabled this Game Object for input, changing the size will _not_ change the
     * size of the hit area. To do this you should adjust the `input.hitArea` object directly.
     *
     * @method Phaser.GameObjects.Shape#setSize
     * @private
     * @since 3.13.0
     *
     * @param {number} width - The width of this Game Object.
     * @param {number} height - The height of this Game Object.
     *
     * @return {this} This Game Object instance.
     */
    setSize: function (width, height)
    {
        this.width = width;
        this.height = height;

        return this;
    },

    /**
     * Sets the display size of this Shape.
     *
     * Calling this will adjust the scale.
     *
     * @method Phaser.GameObjects.Shape#setDisplaySize
     * @since 3.53.0
     *
     * @param {number} width - The display width of this Shape.
     * @param {number} height - The display height of this Shape.
     *
     * @return {this} This Shape instance.
     */
    setDisplaySize: function (width, height)
    {
        this.displayWidth = width;
        this.displayHeight = height;

        return this;
    },

    /**
     * Internal destroy handler, called as part of the destroy process.
     *
     * @method Phaser.GameObjects.Shape#preDestroy
     * @protected
     * @since 3.13.0
     */
    preDestroy: function ()
    {
        this.geom = null;
        this._tempLine = null;
        this.pathData = [];
        this.pathIndexes = [];
    },

    /**
     * The displayed width of this Game Object.
     *
     * This value takes into account the scale factor.
     *
     * Setting this value will adjust the Game Object's scale property.
     *
     * @name Phaser.GameObjects.Shape#displayWidth
     * @type {number}
     * @since 3.13.0
     */
    displayWidth: {

        get: function ()
        {
            return this.scaleX * this.width;
        },

        set: function (value)
        {
            this.scaleX = value / this.width;
        }

    },

    /**
     * The displayed height of this Game Object.
     *
     * This value takes into account the scale factor.
     *
     * Setting this value will adjust the Game Object's scale property.
     *
     * @name Phaser.GameObjects.Shape#displayHeight
     * @type {number}
     * @since 3.13.0
     */
    displayHeight: {

        get: function ()
        {
            return this.scaleY * this.height;
        },

        set: function (value)
        {
            this.scaleY = value / this.height;
        }

    }

});

module.exports = Shape;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Phaser Blend Modes.
 * 
 * @namespace Phaser.BlendModes
 * @since 3.0.0
 */

module.exports = {

    /**
     * Skips the Blend Mode check in the renderer.
     * 
     * @name Phaser.BlendModes.SKIP_CHECK
     * @type {number}
     * @const
     * @since 3.0.0
     */
    SKIP_CHECK: -1,

    /**
     * Normal blend mode. For Canvas and WebGL.
     * This is the default setting and draws new shapes on top of the existing canvas content.
     * 
     * @name Phaser.BlendModes.NORMAL
     * @type {number}
     * @const
     * @since 3.0.0
     */
    NORMAL: 0,

    /**
     * Add blend mode. For Canvas and WebGL.
     * Where both shapes overlap the color is determined by adding color values.
     * 
     * @name Phaser.BlendModes.ADD
     * @type {number}
     * @const
     * @since 3.0.0
     */
    ADD: 1,

    /**
     * Multiply blend mode. For Canvas and WebGL.
     * The pixels are of the top layer are multiplied with the corresponding pixel of the bottom layer. A darker picture is the result.
     * 
     * @name Phaser.BlendModes.MULTIPLY
     * @type {number}
     * @const
     * @since 3.0.0
     */
    MULTIPLY: 2,

    /**
     * Screen blend mode. For Canvas and WebGL.
     * The pixels are inverted, multiplied, and inverted again. A lighter picture is the result (opposite of multiply)
     * 
     * @name Phaser.BlendModes.SCREEN
     * @type {number}
     * @const
     * @since 3.0.0
     */
    SCREEN: 3,

    /**
     * Overlay blend mode. For Canvas only.
     * A combination of multiply and screen. Dark parts on the base layer become darker, and light parts become lighter.
     * 
     * @name Phaser.BlendModes.OVERLAY
     * @type {number}
     * @const
     * @since 3.0.0
     */
    OVERLAY: 4,

    /**
     * Darken blend mode. For Canvas only.
     * Retains the darkest pixels of both layers.
     * 
     * @name Phaser.BlendModes.DARKEN
     * @type {number}
     * @const
     * @since 3.0.0
     */
    DARKEN: 5,

    /**
     * Lighten blend mode. For Canvas only.
     * Retains the lightest pixels of both layers.
     * 
     * @name Phaser.BlendModes.LIGHTEN
     * @type {number}
     * @const
     * @since 3.0.0
     */
    LIGHTEN: 6,

    /**
     * Color Dodge blend mode. For Canvas only.
     * Divides the bottom layer by the inverted top layer.
     * 
     * @name Phaser.BlendModes.COLOR_DODGE
     * @type {number}
     * @const
     * @since 3.0.0
     */
    COLOR_DODGE: 7,

    /**
     * Color Burn blend mode. For Canvas only.
     * Divides the inverted bottom layer by the top layer, and then inverts the result.
     * 
     * @name Phaser.BlendModes.COLOR_BURN
     * @type {number}
     * @const
     * @since 3.0.0
     */
    COLOR_BURN: 8,

    /**
     * Hard Light blend mode. For Canvas only.
     * A combination of multiply and screen like overlay, but with top and bottom layer swapped.
     * 
     * @name Phaser.BlendModes.HARD_LIGHT
     * @type {number}
     * @const
     * @since 3.0.0
     */
    HARD_LIGHT: 9,

    /**
     * Soft Light blend mode. For Canvas only.
     * A softer version of hard-light. Pure black or white does not result in pure black or white.
     * 
     * @name Phaser.BlendModes.SOFT_LIGHT
     * @type {number}
     * @const
     * @since 3.0.0
     */
    SOFT_LIGHT: 10,

    /**
     * Difference blend mode. For Canvas only.
     * Subtracts the bottom layer from the top layer or the other way round to always get a positive value.
     * 
     * @name Phaser.BlendModes.DIFFERENCE
     * @type {number}
     * @const
     * @since 3.0.0
     */
    DIFFERENCE: 11,

    /**
     * Exclusion blend mode. For Canvas only.
     * Like difference, but with lower contrast.
     * 
     * @name Phaser.BlendModes.EXCLUSION
     * @type {number}
     * @const
     * @since 3.0.0
     */
    EXCLUSION: 12,

    /**
     * Hue blend mode. For Canvas only.
     * Preserves the luma and chroma of the bottom layer, while adopting the hue of the top layer.
     * 
     * @name Phaser.BlendModes.HUE
     * @type {number}
     * @const
     * @since 3.0.0
     */
    HUE: 13,

    /**
     * Saturation blend mode. For Canvas only.
     * Preserves the luma and hue of the bottom layer, while adopting the chroma of the top layer.
     * 
     * @name Phaser.BlendModes.SATURATION
     * @type {number}
     * @const
     * @since 3.0.0
     */
    SATURATION: 14,

    /**
     * Color blend mode. For Canvas only.
     * Preserves the luma of the bottom layer, while adopting the hue and chroma of the top layer.
     * 
     * @name Phaser.BlendModes.COLOR
     * @type {number}
     * @const
     * @since 3.0.0
     */
    COLOR: 15,

    /**
     * Luminosity blend mode. For Canvas only.
     * Preserves the hue and chroma of the bottom layer, while adopting the luma of the top layer.
     * 
     * @name Phaser.BlendModes.LUMINOSITY
     * @type {number}
     * @const
     * @since 3.0.0
     */
    LUMINOSITY: 16,

    /**
     * Alpha erase blend mode. For Canvas and WebGL.
     * 
     * @name Phaser.BlendModes.ERASE
     * @type {number}
     * @const
     * @since 3.0.0
     */
    ERASE: 17,

    /**
     * Source-in blend mode. For Canvas only.
     * The new shape is drawn only where both the new shape and the destination canvas overlap. Everything else is made transparent.
     * 
     * @name Phaser.BlendModes.SOURCE_IN
     * @type {number}
     * @const
     * @since 3.0.0
     */
    SOURCE_IN: 18,

    /**
     * Source-out blend mode. For Canvas only.
     * The new shape is drawn where it doesn't overlap the existing canvas content.
     * 
     * @name Phaser.BlendModes.SOURCE_OUT
     * @type {number}
     * @const
     * @since 3.0.0
     */
    SOURCE_OUT: 19,

    /**
     * Source-out blend mode. For Canvas only.
     * The new shape is only drawn where it overlaps the existing canvas content.
     * 
     * @name Phaser.BlendModes.SOURCE_ATOP
     * @type {number}
     * @const
     * @since 3.0.0
     */
    SOURCE_ATOP: 20,

    /**
     * Destination-over blend mode. For Canvas only.
     * New shapes are drawn behind the existing canvas content.
     * 
     * @name Phaser.BlendModes.DESTINATION_OVER
     * @type {number}
     * @const
     * @since 3.0.0
     */
    DESTINATION_OVER: 21,

    /**
     * Destination-in blend mode. For Canvas only.
     * The existing canvas content is kept where both the new shape and existing canvas content overlap. Everything else is made transparent.
     * 
     * @name Phaser.BlendModes.DESTINATION_IN
     * @type {number}
     * @const
     * @since 3.0.0
     */
    DESTINATION_IN: 22,

    /**
     * Destination-out blend mode. For Canvas only.
     * The existing content is kept where it doesn't overlap the new shape.
     * 
     * @name Phaser.BlendModes.DESTINATION_OUT
     * @type {number}
     * @const
     * @since 3.0.0
     */
    DESTINATION_OUT: 23,

    /**
     * Destination-out blend mode. For Canvas only.
     * The existing canvas is only kept where it overlaps the new shape. The new shape is drawn behind the canvas content.
     * 
     * @name Phaser.BlendModes.DESTINATION_ATOP
     * @type {number}
     * @const
     * @since 3.0.0
     */
    DESTINATION_ATOP: 24,

    /**
     * Lighten blend mode. For Canvas only.
     * Where both shapes overlap the color is determined by adding color values.
     * 
     * @name Phaser.BlendModes.LIGHTER
     * @type {number}
     * @const
     * @since 3.0.0
     */
    LIGHTER: 25,

    /**
     * Copy blend mode. For Canvas only.
     * Only the new shape is shown.
     * 
     * @name Phaser.BlendModes.COPY
     * @type {number}
     * @const
     * @since 3.0.0
     */
    COPY: 26,

    /**
     * Xor blend mode. For Canvas only.
     * Shapes are made transparent where both overlap and drawn normal everywhere else.
     * 
     * @name Phaser.BlendModes.XOR
     * @type {number}
     * @const
     * @since 3.0.0
     */
    XOR: 27

};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var CONST = __webpack_require__(14);

/**
 * Convert the given angle from degrees, to the equivalent angle in radians.
 *
 * @function Phaser.Math.DegToRad
 * @since 3.0.0
 *
 * @param {number} degrees - The angle (in degrees) to convert to radians.
 *
 * @return {number} The given angle converted to radians.
 */
var DegToRad = function (degrees)
{
    return degrees * CONST.DEG_TO_RAD;
};

module.exports = DegToRad;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * @namespace Phaser.Cameras.Scene2D.Events
 */

module.exports = {

    DESTROY: __webpack_require__(743),
    FADE_IN_COMPLETE: __webpack_require__(744),
    FADE_IN_START: __webpack_require__(745),
    FADE_OUT_COMPLETE: __webpack_require__(746),
    FADE_OUT_START: __webpack_require__(747),
    FLASH_COMPLETE: __webpack_require__(748),
    FLASH_START: __webpack_require__(749),
    FOLLOW_UPDATE: __webpack_require__(750),
    PAN_COMPLETE: __webpack_require__(751),
    PAN_START: __webpack_require__(752),
    POST_RENDER: __webpack_require__(753),
    PRE_RENDER: __webpack_require__(754),
    ROTATE_COMPLETE: __webpack_require__(755),
    ROTATE_START: __webpack_require__(756),
    SHAKE_COMPLETE: __webpack_require__(757),
    SHAKE_START: __webpack_require__(758),
    ZOOM_COMPLETE: __webpack_require__(759),
    ZOOM_START: __webpack_require__(760)

};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var GetColor = __webpack_require__(103);
var GetColor32 = __webpack_require__(328);
var HSVToRGB = __webpack_require__(188);
var RGBToHSV = __webpack_require__(329);

/**
 * @namespace Phaser.Display.Color
 */

/**
 * @classdesc
 * The Color class holds a single color value and allows for easy modification and reading of it.
 *
 * @class Color
 * @memberof Phaser.Display
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [red=0] - The red color value. A number between 0 and 255.
 * @param {number} [green=0] - The green color value. A number between 0 and 255.
 * @param {number} [blue=0] - The blue color value. A number between 0 and 255.
 * @param {number} [alpha=255] - The alpha value. A number between 0 and 255.
 */
var Color = new Class({

    initialize:

    function Color (red, green, blue, alpha)
    {
        if (red === undefined) { red = 0; }
        if (green === undefined) { green = 0; }
        if (blue === undefined) { blue = 0; }
        if (alpha === undefined) { alpha = 255; }

        /**
         * The internal red color value.
         *
         * @name Phaser.Display.Color#r
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this.r = 0;

        /**
         * The internal green color value.
         *
         * @name Phaser.Display.Color#g
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this.g = 0;

        /**
         * The internal blue color value.
         *
         * @name Phaser.Display.Color#b
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this.b = 0;

        /**
         * The internal alpha color value.
         *
         * @name Phaser.Display.Color#a
         * @type {number}
         * @private
         * @default 255
         * @since 3.0.0
         */
        this.a = 255;

        /**
         * The hue color value. A number between 0 and 1.
         * This is the base color.
         *
         * @name Phaser.Display.Color#_h
         * @type {number}
         * @default 0
         * @private
         * @since 3.13.0
         */
        this._h = 0;

        /**
         * The saturation color value. A number between 0 and 1.
         * This controls how much of the hue will be in the final color, where 1 is fully saturated and 0 will give you white.
         *
         * @name Phaser.Display.Color#_s
         * @type {number}
         * @default 0
         * @private
         * @since 3.13.0
         */
        this._s = 0;

        /**
         * The lightness color value. A number between 0 and 1.
         * This controls how dark the color is. Where 1 is as bright as possible and 0 is black.
         *
         * @name Phaser.Display.Color#_v
         * @type {number}
         * @default 0
         * @private
         * @since 3.13.0
         */
        this._v = 0;

        /**
         * Is this color update locked?
         *
         * @name Phaser.Display.Color#_locked
         * @type {boolean}
         * @private
         * @since 3.13.0
         */
        this._locked = false;

        /**
         * An array containing the calculated color values for WebGL use.
         *
         * @name Phaser.Display.Color#gl
         * @type {number[]}
         * @since 3.0.0
         */
        this.gl = [ 0, 0, 0, 1 ];

        /**
         * Pre-calculated internal color value.
         *
         * @name Phaser.Display.Color#_color
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this._color = 0;

        /**
         * Pre-calculated internal color32 value.
         *
         * @name Phaser.Display.Color#_color32
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this._color32 = 0;

        /**
         * Pre-calculated internal color rgb string value.
         *
         * @name Phaser.Display.Color#_rgba
         * @type {string}
         * @private
         * @default ''
         * @since 3.0.0
         */
        this._rgba = '';

        this.setTo(red, green, blue, alpha);
    },

    /**
     * Sets this color to be transparent. Sets all values to zero.
     *
     * @method Phaser.Display.Color#transparent
     * @since 3.0.0
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    transparent: function ()
    {
        this._locked = true;

        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.alpha = 0;

        this._locked = false;

        return this.update(true);
    },

    /**
     * Sets the color of this Color component.
     *
     * @method Phaser.Display.Color#setTo
     * @since 3.0.0
     *
     * @param {number} red - The red color value. A number between 0 and 255.
     * @param {number} green - The green color value. A number between 0 and 255.
     * @param {number} blue - The blue color value. A number between 0 and 255.
     * @param {number} [alpha=255] - The alpha value. A number between 0 and 255.
     * @param {boolean} [updateHSV=true] - Update the HSV values after setting the RGB values?
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    setTo: function (red, green, blue, alpha, updateHSV)
    {
        if (alpha === undefined) { alpha = 255; }
        if (updateHSV === undefined) { updateHSV = true; }

        this._locked = true;

        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;

        this._locked = false;

        return this.update(updateHSV);
    },

    /**
     * Sets the red, green, blue and alpha GL values of this Color component.
     *
     * @method Phaser.Display.Color#setGLTo
     * @since 3.0.0
     *
     * @param {number} red - The red color value. A number between 0 and 1.
     * @param {number} green - The green color value. A number between 0 and 1.
     * @param {number} blue - The blue color value. A number between 0 and 1.
     * @param {number} [alpha=1] - The alpha value. A number between 0 and 1.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    setGLTo: function (red, green, blue, alpha)
    {
        if (alpha === undefined) { alpha = 1; }

        this._locked = true;

        this.redGL = red;
        this.greenGL = green;
        this.blueGL = blue;
        this.alphaGL = alpha;

        this._locked = false;

        return this.update(true);
    },

    /**
     * Sets the color based on the color object given.
     *
     * @method Phaser.Display.Color#setFromRGB
     * @since 3.0.0
     *
     * @param {Phaser.Types.Display.InputColorObject} color - An object containing `r`, `g`, `b` and optionally `a` values in the range 0 to 255.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    setFromRGB: function (color)
    {
        this._locked = true;

        this.red = color.r;
        this.green = color.g;
        this.blue = color.b;

        if (color.hasOwnProperty('a'))
        {
            this.alpha = color.a;
        }

        this._locked = false;

        return this.update(true);
    },

    /**
     * Sets the color based on the hue, saturation and lightness values given.
     *
     * @method Phaser.Display.Color#setFromHSV
     * @since 3.13.0
     *
     * @param {number} h - The hue, in the range 0 - 1. This is the base color.
     * @param {number} s - The saturation, in the range 0 - 1. This controls how much of the hue will be in the final color, where 1 is fully saturated and 0 will give you white.
     * @param {number} v - The value, in the range 0 - 1. This controls how dark the color is. Where 1 is as bright as possible and 0 is black.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    setFromHSV: function (h, s, v)
    {
        return HSVToRGB(h, s, v, this);
    },

    /**
     * Updates the internal cache values.
     *
     * @method Phaser.Display.Color#update
     * @private
     * @since 3.0.0
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    update: function (updateHSV)
    {
        if (updateHSV === undefined) { updateHSV = false; }

        if (this._locked)
        {
            return this;
        }

        var r = this.r;
        var g = this.g;
        var b = this.b;
        var a = this.a;

        this._color = GetColor(r, g, b);
        this._color32 = GetColor32(r, g, b, a);
        this._rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + (a / 255) + ')';

        if (updateHSV)
        {
            RGBToHSV(r, g, b, this);
        }

        return this;
    },

    /**
     * Updates the internal hsv cache values.
     *
     * @method Phaser.Display.Color#updateHSV
     * @private
     * @since 3.13.0
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    updateHSV: function ()
    {
        var r = this.r;
        var g = this.g;
        var b = this.b;

        RGBToHSV(r, g, b, this);

        return this;
    },

    /**
     * Returns a new Color component using the values from this one.
     *
     * @method Phaser.Display.Color#clone
     * @since 3.0.0
     *
     * @return {Phaser.Display.Color} A new Color object.
     */
    clone: function ()
    {
        return new Color(this.r, this.g, this.b, this.a);
    },

    /**
     * Sets this Color object to be grayscaled based on the shade value given.
     *
     * @method Phaser.Display.Color#gray
     * @since 3.13.0
     * 
     * @param {number} shade - A value between 0 and 255.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    gray: function (shade)
    {
        return this.setTo(shade, shade, shade);
    },

    /**
     * Sets this Color object to be a random color between the `min` and `max` values given.
     *
     * @method Phaser.Display.Color#random
     * @since 3.13.0
     * 
     * @param {number} [min=0] - The minimum random color value. Between 0 and 255.
     * @param {number} [max=255] - The maximum random color value. Between 0 and 255.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    random: function (min, max)
    {
        if (min === undefined) { min = 0; }
        if (max === undefined) { max = 255; }

        var r = Math.floor(min + Math.random() * (max - min));
        var g = Math.floor(min + Math.random() * (max - min));
        var b = Math.floor(min + Math.random() * (max - min));

        return this.setTo(r, g, b);
    },

    /**
     * Sets this Color object to be a random grayscale color between the `min` and `max` values given.
     *
     * @method Phaser.Display.Color#randomGray
     * @since 3.13.0
     * 
     * @param {number} [min=0] - The minimum random color value. Between 0 and 255.
     * @param {number} [max=255] - The maximum random color value. Between 0 and 255.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    randomGray: function (min, max)
    {
        if (min === undefined) { min = 0; }
        if (max === undefined) { max = 255; }

        var s = Math.floor(min + Math.random() * (max - min));

        return this.setTo(s, s, s);
    },

    /**
     * Increase the saturation of this Color by the percentage amount given.
     * The saturation is the amount of the base color in the hue.
     *
     * @method Phaser.Display.Color#saturate
     * @since 3.13.0
     * 
     * @param {number} amount - The percentage amount to change this color by. A value between 0 and 100.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    saturate: function (amount)
    {
        this.s += amount / 100;

        return this;
    },

    /**
     * Decrease the saturation of this Color by the percentage amount given.
     * The saturation is the amount of the base color in the hue.
     *
     * @method Phaser.Display.Color#desaturate
     * @since 3.13.0
     * 
     * @param {number} amount - The percentage amount to change this color by. A value between 0 and 100.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    desaturate: function (amount)
    {
        this.s -= amount / 100;

        return this;
    },

    /**
     * Increase the lightness of this Color by the percentage amount given.
     *
     * @method Phaser.Display.Color#lighten
     * @since 3.13.0
     * 
     * @param {number} amount - The percentage amount to change this color by. A value between 0 and 100.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    lighten: function (amount)
    {
        this.v += amount / 100;

        return this;
    },

    /**
     * Decrease the lightness of this Color by the percentage amount given.
     *
     * @method Phaser.Display.Color#darken
     * @since 3.13.0
     * 
     * @param {number} amount - The percentage amount to change this color by. A value between 0 and 100.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    darken: function (amount)
    {
        this.v -= amount / 100;

        return this;
    },

    /**
     * Brighten this Color by the percentage amount given.
     *
     * @method Phaser.Display.Color#brighten
     * @since 3.13.0
     * 
     * @param {number} amount - The percentage amount to change this color by. A value between 0 and 100.
     *
     * @return {Phaser.Display.Color} This Color object.
     */
    brighten: function (amount)
    {
        var r = this.r;
        var g = this.g;
        var b = this.b;

        r = Math.max(0, Math.min(255, r - Math.round(255 * - (amount / 100))));
        g = Math.max(0, Math.min(255, g - Math.round(255 * - (amount / 100))));
        b = Math.max(0, Math.min(255, b - Math.round(255 * - (amount / 100))));

        return this.setTo(r, g, b);
    },

    /**
     * The color of this Color component, not including the alpha channel.
     *
     * @name Phaser.Display.Color#color
     * @type {number}
     * @readonly
     * @since 3.0.0
     */
    color: {

        get: function ()
        {
            return this._color;
        }

    },

    /**
     * The color of this Color component, including the alpha channel.
     *
     * @name Phaser.Display.Color#color32
     * @type {number}
     * @readonly
     * @since 3.0.0
     */
    color32: {

        get: function ()
        {
            return this._color32;
        }

    },

    /**
     * The color of this Color component as a string which can be used in CSS color values.
     *
     * @name Phaser.Display.Color#rgba
     * @type {string}
     * @readonly
     * @since 3.0.0
     */
    rgba: {

        get: function ()
        {
            return this._rgba;
        }

    },

    /**
     * The red color value, normalized to the range 0 to 1.
     *
     * @name Phaser.Display.Color#redGL
     * @type {number}
     * @since 3.0.0
     */
    redGL: {

        get: function ()
        {
            return this.gl[0];
        },

        set: function (value)
        {
            this.gl[0] = Math.min(Math.abs(value), 1);

            this.r = Math.floor(this.gl[0] * 255);

            this.update(true);
        }

    },

    /**
     * The green color value, normalized to the range 0 to 1.
     *
     * @name Phaser.Display.Color#greenGL
     * @type {number}
     * @since 3.0.0
     */
    greenGL: {

        get: function ()
        {
            return this.gl[1];
        },

        set: function (value)
        {
            this.gl[1] = Math.min(Math.abs(value), 1);

            this.g = Math.floor(this.gl[1] * 255);

            this.update(true);
        }

    },

    /**
     * The blue color value, normalized to the range 0 to 1.
     *
     * @name Phaser.Display.Color#blueGL
     * @type {number}
     * @since 3.0.0
     */
    blueGL: {

        get: function ()
        {
            return this.gl[2];
        },

        set: function (value)
        {
            this.gl[2] = Math.min(Math.abs(value), 1);

            this.b = Math.floor(this.gl[2] * 255);

            this.update(true);
        }

    },

    /**
     * The alpha color value, normalized to the range 0 to 1.
     *
     * @name Phaser.Display.Color#alphaGL
     * @type {number}
     * @since 3.0.0
     */
    alphaGL: {

        get: function ()
        {
            return this.gl[3];
        },

        set: function (value)
        {
            this.gl[3] = Math.min(Math.abs(value), 1);

            this.a = Math.floor(this.gl[3] * 255);

            this.update();
        }

    },

    /**
     * The red color value, normalized to the range 0 to 255.
     *
     * @name Phaser.Display.Color#red
     * @type {number}
     * @since 3.0.0
     */
    red: {

        get: function ()
        {
            return this.r;
        },

        set: function (value)
        {
            value = Math.floor(Math.abs(value));

            this.r = Math.min(value, 255);

            this.gl[0] = value / 255;

            this.update(true);
        }

    },

    /**
     * The green color value, normalized to the range 0 to 255.
     *
     * @name Phaser.Display.Color#green
     * @type {number}
     * @since 3.0.0
     */
    green: {

        get: function ()
        {
            return this.g;
        },

        set: function (value)
        {
            value = Math.floor(Math.abs(value));

            this.g = Math.min(value, 255);

            this.gl[1] = value / 255;

            this.update(true);
        }

    },

    /**
     * The blue color value, normalized to the range 0 to 255.
     *
     * @name Phaser.Display.Color#blue
     * @type {number}
     * @since 3.0.0
     */
    blue: {

        get: function ()
        {
            return this.b;
        },

        set: function (value)
        {
            value = Math.floor(Math.abs(value));

            this.b = Math.min(value, 255);

            this.gl[2] = value / 255;

            this.update(true);
        }

    },

    /**
     * The alpha color value, normalized to the range 0 to 255.
     *
     * @name Phaser.Display.Color#alpha
     * @type {number}
     * @since 3.0.0
     */
    alpha: {

        get: function ()
        {
            return this.a;
        },

        set: function (value)
        {
            value = Math.floor(Math.abs(value));

            this.a = Math.min(value, 255);

            this.gl[3] = value / 255;

            this.update();
        }

    },

    /**
     * The hue color value. A number between 0 and 1.
     * This is the base color.
     *
     * @name Phaser.Display.Color#h
     * @type {number}
     * @since 3.13.0
     */
    h: {

        get: function ()
        {
            return this._h;
        },

        set: function (value)
        {
            this._h = value;

            HSVToRGB(value, this._s, this._v, this);
        }

    },

    /**
     * The saturation color value. A number between 0 and 1.
     * This controls how much of the hue will be in the final color, where 1 is fully saturated and 0 will give you white.
     *
     * @name Phaser.Display.Color#s
     * @type {number}
     * @since 3.13.0
     */
    s: {

        get: function ()
        {
            return this._s;
        },

        set: function (value)
        {
            this._s = value;

            HSVToRGB(this._h, value, this._v, this);
        }

    },

    /**
     * The lightness color value. A number between 0 and 1.
     * This controls how dark the color is. Where 1 is as bright as possible and 0 is black.
     *
     * @name Phaser.Display.Color#v
     * @type {number}
     * @since 3.13.0
     */
    v: {

        get: function ()
        {
            return this._v;
        },

        set: function (value)
        {
            this._v = value;

            HSVToRGB(this._h, this._s, value, this);
        }

    }

});

module.exports = Color;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

//  Adapted from [gl-matrix](https://github.com/toji/gl-matrix) by toji
//  and [vecmath](https://github.com/mattdesl/vecmath) by mattdesl

var Class = __webpack_require__(0);

/**
 * @classdesc
 * A representation of a vector in 3D space.
 *
 * A three-component vector.
 *
 * @class Vector3
 * @memberof Phaser.Math
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x] - The x component.
 * @param {number} [y] - The y component.
 * @param {number} [z] - The z component.
 */
var Vector3 = new Class({

    initialize:

    function Vector3 (x, y, z)
    {
        /**
         * The x component of this Vector.
         *
         * @name Phaser.Math.Vector3#x
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x = 0;

        /**
         * The y component of this Vector.
         *
         * @name Phaser.Math.Vector3#y
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y = 0;

        /**
         * The z component of this Vector.
         *
         * @name Phaser.Math.Vector3#z
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.z = 0;

        if (typeof x === 'object')
        {
            this.x = x.x || 0;
            this.y = x.y || 0;
            this.z = x.z || 0;
        }
        else
        {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
    },

    /**
     * Set this Vector to point up.
     *
     * Sets the y component of the vector to 1, and the others to 0.
     *
     * @method Phaser.Math.Vector3#up
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    up: function ()
    {
        this.x = 0;
        this.y = 1;
        this.z = 0;

        return this;
    },

    /**
     * Sets the components of this Vector to be the `Math.min` result from the given vector.
     *
     * @method Phaser.Math.Vector3#min
     * @since 3.50.0
     *
     * @param {Phaser.Math.Vector3} v - The Vector3 to check the minimum values against.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    min: function (v)
    {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);

        return this;
    },

    /**
     * Sets the components of this Vector to be the `Math.max` result from the given vector.
     *
     * @method Phaser.Math.Vector3#max
     * @since 3.50.0
     *
     * @param {Phaser.Math.Vector3} v - The Vector3 to check the maximum values against.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    max: function (v)
    {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);

        return this;
    },

    /**
     * Make a clone of this Vector3.
     *
     * @method Phaser.Math.Vector3#clone
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector3} A new Vector3 object containing this Vectors values.
     */
    clone: function ()
    {
        return new Vector3(this.x, this.y, this.z);
    },

    /**
     * Adds the two given Vector3s and sets the results into this Vector3.
     *
     * @method Phaser.Math.Vector3#addVectors
     * @since 3.50.0
     *
     * @param {Phaser.Math.Vector3} a - The first Vector to add.
     * @param {Phaser.Math.Vector3} b - The second Vector to add.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    addVectors: function (a, b)
    {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;

        return this;
    },

    /**
     * Calculate the cross (vector) product of two given Vectors.
     *
     * @method Phaser.Math.Vector3#crossVectors
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector3} a - The first Vector to multiply.
     * @param {Phaser.Math.Vector3} b - The second Vector to multiply.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    crossVectors: function (a, b)
    {
        var ax = a.x;
        var ay = a.y;
        var az = a.z;
        var bx = b.x;
        var by = b.y;
        var bz = b.z;

        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;

        return this;
    },

    /**
     * Check whether this Vector is equal to a given Vector.
     *
     * Performs a strict equality check against each Vector's components.
     *
     * @method Phaser.Math.Vector3#equals
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector3} v - The Vector3 to compare against.
     *
     * @return {boolean} True if the two vectors strictly match, otherwise false.
     */
    equals: function (v)
    {
        return ((this.x === v.x) && (this.y === v.y) && (this.z === v.z));
    },

    /**
     * Copy the components of a given Vector into this Vector.
     *
     * @method Phaser.Math.Vector3#copy
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3)} src - The Vector to copy the components from.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    copy: function (src)
    {
        this.x = src.x;
        this.y = src.y;
        this.z = src.z || 0;

        return this;
    },

    /**
     * Set the `x`, `y`, and `z` components of this Vector to the given `x`, `y`, and `z` values.
     *
     * @method Phaser.Math.Vector3#set
     * @since 3.0.0
     *
     * @param {(number|object)} x - The x value to set for this Vector, or an object containing x, y and z components.
     * @param {number} [y] - The y value to set for this Vector.
     * @param {number} [z] - The z value to set for this Vector.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    set: function (x, y, z)
    {
        if (typeof x === 'object')
        {
            this.x = x.x || 0;
            this.y = x.y || 0;
            this.z = x.z || 0;
        }
        else
        {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }

        return this;
    },

    /**
     * Sets the components of this Vector3 from the position of the given Matrix4.
     *
     * @method Phaser.Math.Vector3#setFromMatrixPosition
     * @since 3.50.0
     *
     * @param {Phaser.Math.Matrix4} mat4 - The Matrix4 to get the position from.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    setFromMatrixPosition: function (m)
    {
        return this.fromArray(m.val, 12);
    },

    /**
     * Sets the components of this Vector3 from the Matrix4 column specified.
     *
     * @method Phaser.Math.Vector3#setFromMatrixColumn
     * @since 3.50.0
     *
     * @param {Phaser.Math.Matrix4} mat4 - The Matrix4 to get the column from.
     * @param {number} index - The column index.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    setFromMatrixColumn: function (mat4, index)
    {
        return this.fromArray(mat4.val, index * 4);
    },

    /**
     * Sets the components of this Vector3 from the given array, based on the offset.
     *
     * Vector3.x = array[offset]
     * Vector3.y = array[offset + 1]
     * Vector3.z = array[offset + 2]
     *
     * @method Phaser.Math.Vector3#fromArray
     * @since 3.50.0
     *
     * @param {number[]} array - The array of values to get this Vector from.
     * @param {number} [offset=0] - The offset index into the array.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    fromArray: function (array, offset)
    {
        if (offset === undefined) { offset = 0; }

        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];

        return this;
    },

    /**
     * Add a given Vector to this Vector. Addition is component-wise.
     *
     * @method Phaser.Math.Vector3#add
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3)} v - The Vector to add to this Vector.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    add: function (v)
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z || 0;

        return this;
    },

    /**
     * Add the given value to each component of this Vector.
     *
     * @method Phaser.Math.Vector3#addScalar
     * @since 3.50.0
     *
     * @param {number} s - The amount to add to this Vector.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    addScalar: function (s)
    {
        this.x += s;
        this.y += s;
        this.z += s;

        return this;
    },

    /**
     * Add and scale a given Vector to this Vector. Addition is component-wise.
     *
     * @method Phaser.Math.Vector3#addScale
     * @since 3.50.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3)} v - The Vector to add to this Vector.
     * @param {number} scale - The amount to scale `v` by.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    addScale: function (v, scale)
    {
        this.x += v.x * scale;
        this.y += v.y * scale;
        this.z += v.z * scale || 0;

        return this;
    },

    /**
     * Subtract the given Vector from this Vector. Subtraction is component-wise.
     *
     * @method Phaser.Math.Vector3#subtract
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3)} v - The Vector to subtract from this Vector.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    subtract: function (v)
    {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z || 0;

        return this;
    },

    /**
     * Perform a component-wise multiplication between this Vector and the given Vector.
     *
     * Multiplies this Vector by the given Vector.
     *
     * @method Phaser.Math.Vector3#multiply
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3)} v - The Vector to multiply this Vector by.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    multiply: function (v)
    {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z || 1;

        return this;
    },

    /**
     * Scale this Vector by the given value.
     *
     * @method Phaser.Math.Vector3#scale
     * @since 3.0.0
     *
     * @param {number} scale - The value to scale this Vector by.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    scale: function (scale)
    {
        if (isFinite(scale))
        {
            this.x *= scale;
            this.y *= scale;
            this.z *= scale;
        }
        else
        {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }

        return this;
    },

    /**
     * Perform a component-wise division between this Vector and the given Vector.
     *
     * Divides this Vector by the given Vector.
     *
     * @method Phaser.Math.Vector3#divide
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3)} v - The Vector to divide this Vector by.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    divide: function (v)
    {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z || 1;

        return this;
    },

    /**
     * Negate the `x`, `y` and `z` components of this Vector.
     *
     * @method Phaser.Math.Vector3#negate
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    negate: function ()
    {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;

        return this;
    },

    /**
     * Calculate the distance between this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector3#distance
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3)} v - The Vector to calculate the distance to.
     *
     * @return {number} The distance from this Vector to the given Vector.
     */
    distance: function (v)
    {
        var dx = v.x - this.x;
        var dy = v.y - this.y;
        var dz = v.z - this.z || 0;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },

    /**
     * Calculate the distance between this Vector and the given Vector, squared.
     *
     * @method Phaser.Math.Vector3#distanceSq
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3)} v - The Vector to calculate the distance to.
     *
     * @return {number} The distance from this Vector to the given Vector, squared.
     */
    distanceSq: function (v)
    {
        var dx = v.x - this.x;
        var dy = v.y - this.y;
        var dz = v.z - this.z || 0;

        return dx * dx + dy * dy + dz * dz;
    },

    /**
     * Calculate the length (or magnitude) of this Vector.
     *
     * @method Phaser.Math.Vector3#length
     * @since 3.0.0
     *
     * @return {number} The length of this Vector.
     */
    length: function ()
    {
        var x = this.x;
        var y = this.y;
        var z = this.z;

        return Math.sqrt(x * x + y * y + z * z);
    },

    /**
     * Calculate the length of this Vector squared.
     *
     * @method Phaser.Math.Vector3#lengthSq
     * @since 3.0.0
     *
     * @return {number} The length of this Vector, squared.
     */
    lengthSq: function ()
    {
        var x = this.x;
        var y = this.y;
        var z = this.z;

        return x * x + y * y + z * z;
    },

    /**
     * Normalize this Vector.
     *
     * Makes the vector a unit length vector (magnitude of 1) in the same direction.
     *
     * @method Phaser.Math.Vector3#normalize
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    normalize: function ()
    {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var len = x * x + y * y + z * z;

        if (len > 0)
        {
            len = 1 / Math.sqrt(len);

            this.x = x * len;
            this.y = y * len;
            this.z = z * len;
        }

        return this;
    },

    /**
     * Calculate the dot product of this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector3#dot
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector3} v - The Vector3 to dot product with this Vector3.
     *
     * @return {number} The dot product of this Vector and `v`.
     */
    dot: function (v)
    {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    },

    /**
     * Calculate the cross (vector) product of this Vector (which will be modified) and the given Vector.
     *
     * @method Phaser.Math.Vector3#cross
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector3} v - The Vector to cross product with.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    cross: function (v)
    {
        var ax = this.x;
        var ay = this.y;
        var az = this.z;
        var bx = v.x;
        var by = v.y;
        var bz = v.z;

        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;

        return this;
    },

    /**
     * Linearly interpolate between this Vector and the given Vector.
     *
     * Interpolates this Vector towards the given Vector.
     *
     * @method Phaser.Math.Vector3#lerp
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector3} v - The Vector3 to interpolate towards.
     * @param {number} [t=0] - The interpolation percentage, between 0 and 1.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    lerp: function (v, t)
    {
        if (t === undefined) { t = 0; }

        var ax = this.x;
        var ay = this.y;
        var az = this.z;

        this.x = ax + t * (v.x - ax);
        this.y = ay + t * (v.y - ay);
        this.z = az + t * (v.z - az);

        return this;
    },

    /**
     * Takes a Matrix3 and applies it to this Vector3.
     *
     * @method Phaser.Math.Vector3#applyMatrix3
     * @since 3.50.0
     *
     * @param {Phaser.Math.Matrix3} mat3 - The Matrix3 to apply to this Vector3.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    applyMatrix3: function (mat3)
    {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var m = mat3.val;

        this.x = m[0] * x + m[3] * y + m[6] * z;
        this.y = m[1] * x + m[4] * y + m[7] * z;
        this.z = m[2] * x + m[5] * y + m[8] * z;

        return this;
    },

    /**
     * Takes a Matrix4 and applies it to this Vector3.
     *
     * @method Phaser.Math.Vector3#applyMatrix4
     * @since 3.50.0
     *
     * @param {Phaser.Math.Matrix4} mat4 - The Matrix4 to apply to this Vector3.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    applyMatrix4: function (mat4)
    {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var m = mat4.val;

        var w = 1 / (m[3] * x + m[7] * y + m[11] * z + m[15]);

        this.x = (m[0] * x + m[4] * y + m[8] * z + m[12]) * w;
        this.y = (m[1] * x + m[5] * y + m[9] * z + m[13]) * w;
        this.z = (m[2] * x + m[6] * y + m[10] * z + m[14]) * w;

        return this;
    },

    /**
     * Transform this Vector with the given Matrix.
     *
     * @method Phaser.Math.Vector3#transformMat3
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix3} mat - The Matrix3 to transform this Vector3 with.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    transformMat3: function (mat)
    {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var m = mat.val;

        this.x = x * m[0] + y * m[3] + z * m[6];
        this.y = x * m[1] + y * m[4] + z * m[7];
        this.z = x * m[2] + y * m[5] + z * m[8];

        return this;
    },

    /**
     * Transform this Vector with the given Matrix4.
     *
     * @method Phaser.Math.Vector3#transformMat4
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix4} mat - The Matrix4 to transform this Vector3 with.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    transformMat4: function (mat)
    {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var m = mat.val;

        this.x = m[0] * x + m[4] * y + m[8] * z + m[12];
        this.y = m[1] * x + m[5] * y + m[9] * z + m[13];
        this.z = m[2] * x + m[6] * y + m[10] * z + m[14];

        return this;
    },

    /**
     * Transforms the coordinates of this Vector3 with the given Matrix4.
     *
     * @method Phaser.Math.Vector3#transformCoordinates
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix4} mat - The Matrix4 to transform this Vector3 with.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    transformCoordinates: function (mat)
    {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var m = mat.val;

        var tx = (x * m[0]) + (y * m[4]) + (z * m[8]) + m[12];
        var ty = (x * m[1]) + (y * m[5]) + (z * m[9]) + m[13];
        var tz = (x * m[2]) + (y * m[6]) + (z * m[10]) + m[14];
        var tw = (x * m[3]) + (y * m[7]) + (z * m[11]) + m[15];

        this.x = tx / tw;
        this.y = ty / tw;
        this.z = tz / tw;

        return this;
    },

    /**
     * Transform this Vector with the given Quaternion.
     *
     * @method Phaser.Math.Vector3#transformQuat
     * @since 3.0.0
     *
     * @param {Phaser.Math.Quaternion} q - The Quaternion to transform this Vector with.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    transformQuat: function (q)
    {
        // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;

        // calculate quat * vec
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;

        // calculate result * inverse quat
        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return this;
    },

    /**
     * Multiplies this Vector3 by the specified matrix, applying a W divide. This is useful for projection,
     * e.g. unprojecting a 2D point into 3D space.
     *
     * @method Phaser.Math.Vector3#project
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix4} mat - The Matrix4 to multiply this Vector3 with.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    project: function (mat)
    {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var m = mat.val;

        var a00 = m[0];
        var a01 = m[1];
        var a02 = m[2];
        var a03 = m[3];
        var a10 = m[4];
        var a11 = m[5];
        var a12 = m[6];
        var a13 = m[7];
        var a20 = m[8];
        var a21 = m[9];
        var a22 = m[10];
        var a23 = m[11];
        var a30 = m[12];
        var a31 = m[13];
        var a32 = m[14];
        var a33 = m[15];

        var lw = 1 / (x * a03 + y * a13 + z * a23 + a33);

        this.x = (x * a00 + y * a10 + z * a20 + a30) * lw;
        this.y = (x * a01 + y * a11 + z * a21 + a31) * lw;
        this.z = (x * a02 + y * a12 + z * a22 + a32) * lw;

        return this;
    },

    /**
     * Multiplies this Vector3 by the given view and projection matrices.
     *
     * @method Phaser.Math.Vector3#projectViewMatrix
     * @since 3.50.0
     *
     * @param {Phaser.Math.Matrix4} viewMatrix - A View Matrix.
     * @param {Phaser.Math.Matrix4} projectionMatrix - A Projection Matrix.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    projectViewMatrix: function (viewMatrix, projectionMatrix)
    {
        return this.applyMatrix4(viewMatrix).applyMatrix4(projectionMatrix);
    },

    /**
     * Multiplies this Vector3 by the given inversed projection matrix and world matrix.
     *
     * @method Phaser.Math.Vector3#unprojectViewMatrix
     * @since 3.50.0
     *
     * @param {Phaser.Math.Matrix4} projectionMatrix - An inversed Projection Matrix.
     * @param {Phaser.Math.Matrix4} worldMatrix - A World View Matrix.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    unprojectViewMatrix: function (projectionMatrix, worldMatrix)
    {
        return this.applyMatrix4(projectionMatrix).applyMatrix4(worldMatrix);
    },

    /**
     * Unproject this point from 2D space to 3D space.
     * The point should have its x and y properties set to
     * 2D screen space, and the z either at 0 (near plane)
     * or 1 (far plane). The provided matrix is assumed to already
     * be combined, i.e. projection * view * model.
     *
     * After this operation, this vector's (x, y, z) components will
     * represent the unprojected 3D coordinate.
     *
     * @method Phaser.Math.Vector3#unproject
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector4} viewport - Screen x, y, width and height in pixels.
     * @param {Phaser.Math.Matrix4} invProjectionView - Combined projection and view matrix.
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    unproject: function (viewport, invProjectionView)
    {
        var viewX = viewport.x;
        var viewY = viewport.y;
        var viewWidth = viewport.z;
        var viewHeight = viewport.w;

        var x = this.x - viewX;
        var y = (viewHeight - this.y - 1) - viewY;
        var z = this.z;

        this.x = (2 * x) / viewWidth - 1;
        this.y = (2 * y) / viewHeight - 1;
        this.z = 2 * z - 1;

        return this.project(invProjectionView);
    },

    /**
     * Make this Vector the zero vector (0, 0, 0).
     *
     * @method Phaser.Math.Vector3#reset
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector3} This Vector3.
     */
    reset: function ()
    {
        this.x = 0;
        this.y = 0;
        this.z = 0;

        return this;
    }

});

/**
 * A static zero Vector3 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector3.ZERO
 * @type {Phaser.Math.Vector3}
 * @since 3.16.0
 */
Vector3.ZERO = new Vector3();

/**
 * A static right Vector3 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector3.RIGHT
 * @type {Phaser.Math.Vector3}
 * @since 3.16.0
 */
Vector3.RIGHT = new Vector3(1, 0, 0);

/**
 * A static left Vector3 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector3.LEFT
 * @type {Phaser.Math.Vector3}
 * @since 3.16.0
 */
Vector3.LEFT = new Vector3(-1, 0, 0);

/**
 * A static up Vector3 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector3.UP
 * @type {Phaser.Math.Vector3}
 * @since 3.16.0
 */
Vector3.UP = new Vector3(0, -1, 0);

/**
 * A static down Vector3 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector3.DOWN
 * @type {Phaser.Math.Vector3}
 * @since 3.16.0
 */
Vector3.DOWN = new Vector3(0, 1, 0);

/**
 * A static forward Vector3 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector3.FORWARD
 * @type {Phaser.Math.Vector3}
 * @since 3.16.0
 */
Vector3.FORWARD = new Vector3(0, 0, 1);

/**
 * A static back Vector3 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector3.BACK
 * @type {Phaser.Math.Vector3}
 * @since 3.16.0
 */
Vector3.BACK = new Vector3(0, 0, -1);

/**
 * A static one Vector3 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 *
 * @constant
 * @name Phaser.Math.Vector3.ONE
 * @type {Phaser.Math.Vector3}
 * @since 3.16.0
 */
Vector3.ONE = new Vector3(1, 1, 1);

module.exports = Vector3;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * @namespace Phaser.Tilemaps.Formats
 */

module.exports = {

    /**
     * CSV Map Type
     * 
     * @name Phaser.Tilemaps.Formats.CSV
     * @type {number}
     * @since 3.0.0
     */
    CSV: 0,

    /**
     * Tiled JSON Map Type
     * 
     * @name Phaser.Tilemaps.Formats.TILED_JSON
     * @type {number}
     * @since 3.0.0
     */
    TILED_JSON: 1,

    /**
     * 2D Array Map Type
     * 
     * @name Phaser.Tilemaps.Formats.ARRAY_2D
     * @type {number}
     * @since 3.0.0
     */
    ARRAY_2D: 2,

    /**
     * Weltmeister (Impact.js) Map Type
     * 
     * @name Phaser.Tilemaps.Formats.WELTMEISTER
     * @type {number}
     * @since 3.0.0
     */
    WELTMEISTER: 3

};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * The `Matter.Body` module contains methods for creating and manipulating body models.
 * A `Matter.Body` is a rigid body that can be simulated by a `Matter.Engine`.
 * Factories for commonly used body configurations (such as rectangles, circles and other polygons) can be found in the module `Matter.Bodies`.
 *
 * See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
 * @class Body
 */

var Body = {};

module.exports = Body;

var Vertices = __webpack_require__(63);
var Vector = __webpack_require__(84);
var Sleeping = __webpack_require__(165);
var Common = __webpack_require__(32);
var Bounds = __webpack_require__(85);
var Axes = __webpack_require__(271);

(function() {

    Body._inertiaScale = 4;
    Body._nextCollidingGroupId = 1;
    Body._nextNonCollidingGroupId = -1;
    Body._nextCategory = 0x0001;

    /**
     * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * Vertices must be specified in clockwise order.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {body} body
     */
    Body.create = function(options) {
        var defaults = {
            id: Common.nextId(),
            type: 'body',
            label: 'Body',
            parts: [],
            plugin: {},
            angle: 0,
            vertices: null, // Phaser change: no point calling fromPath if they pass in vertices anyway
            position: { x: 0, y: 0 },
            force: { x: 0, y: 0 },
            torque: 0,
            positionImpulse: { x: 0, y: 0 },
            previousPositionImpulse: { x: 0, y: 0 },
            constraintImpulse: { x: 0, y: 0, angle: 0 },
            totalContacts: 0,
            speed: 0,
            angularSpeed: 0,
            velocity: { x: 0, y: 0 },
            angularVelocity: 0,
            isSensor: false,
            isStatic: false,
            isSleeping: false,
            motion: 0,
            sleepThreshold: 60,
            density: 0.001,
            restitution: 0,
            friction: 0.1,
            frictionStatic: 0.5,
            frictionAir: 0.01,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            },
            slop: 0.05,
            timeScale: 1,
            events: null,
            bounds: null,
            chamfer: null,
            circleRadius: 0,
            positionPrev: null,
            anglePrev: 0,
            parent: null,
            axes: null,
            area: 0,
            mass: 0,
            inverseMass: 0,
            inertia: 0,
            inverseInertia: 0,
            _original: null,
            render: {
                visible: true,
                opacity: 1,
                sprite: {
                    xOffset: 0,
                    yOffset: 0
                },
                fillColor: null,            // custom Phaser property
                fillOpacity: null,          // custom Phaser property
                lineColor: null,            // custom Phaser property
                lineOpacity: null,          // custom Phaser property
                lineThickness: null         // custom Phaser property
            },
            gameObject: null,               // custom Phaser property
            scale: { x: 1, y: 1 },          // custom Phaser property
            centerOfMass: { x: 0, y: 0 },   // custom Phaser property (float, 0 - 1)
            centerOffset: { x: 0, y: 0 },   // custom Phaser property (pixel values)
            gravityScale: { x: 1, y: 1 },   // custom Phaser property
            ignoreGravity: false,           // custom Phaser property
            ignorePointer: false,           // custom Phaser property
            onCollideCallback: null,        // custom Phaser property
            onCollideEndCallback: null,     // custom Phaser property
            onCollideActiveCallback: null,  // custom Phaser property
            onCollideWith: {}               // custom Phaser property
        };

        if (!options.hasOwnProperty('position') && options.hasOwnProperty('vertices'))
        {
            options.position = Vertices.centre(options.vertices);
        }
        else if (!options.hasOwnProperty('vertices'))
        {
            defaults.vertices = Vertices.fromPath('L 0 0 L 40 0 L 40 40 L 0 40');
        }

        var body = Common.extend(defaults, options);

        _initProperties(body, options);

        //  Helper function
        body.setOnCollideWith = function (body, callback)
        {
            if (callback)
            {
                this.onCollideWith[body.id] = callback;
            }
            else
            {
                delete this.onCollideWith[body.id];
            }

            return this;
        }

        return body;
    };

    /**
     * Returns the next unique group index for which bodies will collide.
     * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
     * See `body.collisionFilter` for more information.
     * @method nextGroup
     * @param {bool} [isNonColliding=false]
     * @return {Number} Unique group index
     */
    Body.nextGroup = function(isNonColliding) {
        if (isNonColliding)
            return Body._nextNonCollidingGroupId--;

        return Body._nextCollidingGroupId++;
    };

    /**
     * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
     * There are 32 available. See `body.collisionFilter` for more information.
     * @method nextCategory
     * @return {Number} Unique category bitfield
     */
    Body.nextCategory = function() {
        Body._nextCategory = Body._nextCategory << 1;
        return Body._nextCategory;
    };

    /**
     * Initialises body properties.
     * @method _initProperties
     * @private
     * @param {body} body
     * @param {} [options]
     */
    var _initProperties = function(body, options) {
        options = options || {};

        // init required properties (order is important)
        Body.set(body, {
            bounds: body.bounds || Bounds.create(body.vertices),
            positionPrev: body.positionPrev || Vector.clone(body.position),
            anglePrev: body.anglePrev || body.angle,
            vertices: body.vertices,
            parts: body.parts || [body],
            isStatic: body.isStatic,
            isSleeping: body.isSleeping,
            parent: body.parent || body
        });

        var bounds = body.bounds;

        Vertices.rotate(body.vertices, body.angle, body.position);
        Axes.rotate(body.axes, body.angle);
        Bounds.update(bounds, body.vertices, body.velocity);

        // allow options to override the automatically calculated properties
        Body.set(body, {
            axes: options.axes || body.axes,
            area: options.area || body.area,
            mass: options.mass || body.mass,
            inertia: options.inertia || body.inertia
        });

        if (body.parts.length === 1)
        {
            var centerOfMass = body.centerOfMass;
            var centerOffset = body.centerOffset;
    
            var bodyWidth = bounds.max.x - bounds.min.x;
            var bodyHeight = bounds.max.y - bounds.min.y;
    
            centerOfMass.x = -(bounds.min.x - body.position.x) / bodyWidth;
            centerOfMass.y = -(bounds.min.y - body.position.y) / bodyHeight;
    
            centerOffset.x = bodyWidth * centerOfMass.x;
            centerOffset.y = bodyHeight * centerOfMass.y;
        }
    };

    /**
     * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
     * Prefer to use the actual setter functions in performance critical situations.
     * @method set
     * @param {body} body
     * @param {} settings A property name (or map of properties and values) to set on the body.
     * @param {} value The value to set if `settings` is a single property name.
     */
    Body.set = function(body, settings, value) {
        var property;

        if (typeof settings === 'string') {
            property = settings;
            settings = {};
            settings[property] = value;
        }

        for (property in settings) {
            if (!Object.prototype.hasOwnProperty.call(settings, property))
                continue;

            value = settings[property];
            switch (property) {

            case 'isStatic':
                Body.setStatic(body, value);
                break;
            case 'isSleeping':
                Sleeping.set(body, value);
                break;
            case 'mass':
                Body.setMass(body, value);
                break;
            case 'density':
                Body.setDensity(body, value);
                break;
            case 'inertia':
                Body.setInertia(body, value);
                break;
            case 'vertices':
                Body.setVertices(body, value);
                break;
            case 'position':
                Body.setPosition(body, value);
                break;
            case 'angle':
                Body.setAngle(body, value);
                break;
            case 'velocity':
                Body.setVelocity(body, value);
                break;
            case 'angularVelocity':
                Body.setAngularVelocity(body, value);
                break;
            case 'parts':
                Body.setParts(body, value);
                break;
            case 'centre':
                Body.setCentre(body, value);
                break;
            default:
                body[property] = value;
            }
        }
    };

    /**
     * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
     * @method setStatic
     * @param {body} body
     * @param {bool} isStatic
     */
    Body.setStatic = function(body, isStatic) {
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.isStatic = isStatic;

            if (isStatic) {
                part._original = {
                    restitution: part.restitution,
                    friction: part.friction,
                    mass: part.mass,
                    inertia: part.inertia,
                    density: part.density,
                    inverseMass: part.inverseMass,
                    inverseInertia: part.inverseInertia
                };

                part.restitution = 0;
                part.friction = 1;
                part.mass = part.inertia = part.density = Infinity;
                part.inverseMass = part.inverseInertia = 0;

                part.positionPrev.x = part.position.x;
                part.positionPrev.y = part.position.y;
                part.anglePrev = part.angle;
                part.angularVelocity = 0;
                part.speed = 0;
                part.angularSpeed = 0;
                part.motion = 0;
            } else if (part._original) {
                part.restitution = part._original.restitution;
                part.friction = part._original.friction;
                part.mass = part._original.mass;
                part.inertia = part._original.inertia;
                part.density = part._original.density;
                part.inverseMass = part._original.inverseMass;
                part.inverseInertia = part._original.inverseInertia;

                part._original = null;
            }
        }
    };

    /**
     * Sets the mass of the body. Inverse mass, density and inertia are automatically updated to reflect the change.
     * @method setMass
     * @param {body} body
     * @param {number} mass
     */
    Body.setMass = function(body, mass) {
        var moment = body.inertia / (body.mass / 6);
        body.inertia = moment * (mass / 6);
        body.inverseInertia = 1 / body.inertia;

        body.mass = mass;
        body.inverseMass = 1 / body.mass;
        body.density = body.mass / body.area;
    };

    /**
     * Sets the density of the body. Mass and inertia are automatically updated to reflect the change.
     * @method setDensity
     * @param {body} body
     * @param {number} density
     */
    Body.setDensity = function(body, density) {
        Body.setMass(body, density * body.area);
        body.density = density;
    };

    /**
     * Sets the moment of inertia (i.e. second moment of area) of the body. 
     * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
     * @method setInertia
     * @param {body} body
     * @param {number} inertia
     */
    Body.setInertia = function(body, inertia) {
        body.inertia = inertia;
        body.inverseInertia = 1 / body.inertia;
    };

    /**
     * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
     * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
     * They are then automatically translated to world space based on `body.position`.
     *
     * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
     * Vertices must form a convex hull, concave hulls are not supported.
     *
     * @method setVertices
     * @param {body} body
     * @param {vector[]} vertices
     */
    Body.setVertices = function(body, vertices) {
        // change vertices
        if (vertices[0].body === body) {
            body.vertices = vertices;
        } else {
            body.vertices = Vertices.create(vertices, body);
        }

        // update properties
        body.axes = Axes.fromVertices(body.vertices);
        body.area = Vertices.area(body.vertices);
        Body.setMass(body, body.density * body.area);

        // orient vertices around the centre of mass at origin (0, 0)
        var centre = Vertices.centre(body.vertices);
        Vertices.translate(body.vertices, centre, -1);

        // update inertia while vertices are at origin (0, 0)
        Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));

        // update geometry
        Vertices.translate(body.vertices, body.position);

        Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Sets the parts of the `body` and updates mass, inertia and centroid.
     * Each part will have its parent set to `body`.
     * By default the convex hull will be automatically computed and set on `body`, unless `autoHull` is set to `false.`
     * Note that this method will ensure that the first part in `body.parts` will always be the `body`.
     * @method setParts
     * @param {body} body
     * @param [body] parts
     * @param {bool} [autoHull=true]
     */
    Body.setParts = function(body, parts, autoHull) {
        var i;

        // add all the parts, ensuring that the first part is always the parent body
        parts = parts.slice(0);
        body.parts.length = 0;
        body.parts.push(body);
        body.parent = body;

        for (i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part !== body) {
                part.parent = body;
                body.parts.push(part);
            }
        }

        if (body.parts.length === 1)
            return;

        autoHull = typeof autoHull !== 'undefined' ? autoHull : true;

        // find the convex hull of all parts to set on the parent body
        if (autoHull) {
            var vertices = [];
            for (i = 0; i < parts.length; i++) {
                vertices = vertices.concat(parts[i].vertices);
            }

            Vertices.clockwiseSort(vertices);

            var hull = Vertices.hull(vertices),
                hullCentre = Vertices.centre(hull);

            Body.setVertices(body, hull);
            Vertices.translate(body.vertices, hullCentre);
        }

        // sum the properties of all compound parts of the parent body
        var total = Body._totalProperties(body);

        //  Phaser addition
        var cx = total.centre.x;
        var cy = total.centre.y;

        var bounds = body.bounds;
        var centerOfMass = body.centerOfMass;
        var centerOffset = body.centerOffset;

        Bounds.update(bounds, body.vertices, body.velocity);

        centerOfMass.x = -(bounds.min.x - cx) / (bounds.max.x - bounds.min.x);
        centerOfMass.y = -(bounds.min.y - cy) / (bounds.max.y - bounds.min.y);

        centerOffset.x = cx;
        centerOffset.y = cy;

        body.area = total.area;
        body.parent = body;
        body.position.x = cx;
        body.position.y = cy;
        body.positionPrev.x = cx;
        body.positionPrev.y = cy;

        Body.setMass(body, total.mass);
        Body.setInertia(body, total.inertia);
        Body.setPosition(body, total.centre);
    };

    /**
     * Set the centre of mass of the body. 
     * The `centre` is a vector in world-space unless `relative` is set, in which case it is a translation.
     * The centre of mass is the point the body rotates about and can be used to simulate non-uniform density.
     * This is equal to moving `body.position` but not the `body.vertices`.
     * Invalid if the `centre` falls outside the body's convex hull.
     * @method setCentre
     * @param {body} body
     * @param {vector} centre
     * @param {bool} relative
     */
    Body.setCentre = function(body, centre, relative) {
        if (!relative) {
            body.positionPrev.x = centre.x - (body.position.x - body.positionPrev.x);
            body.positionPrev.y = centre.y - (body.position.y - body.positionPrev.y);
            body.position.x = centre.x;
            body.position.y = centre.y;
        } else {
            body.positionPrev.x += centre.x;
            body.positionPrev.y += centre.y;
            body.position.x += centre.x;
            body.position.y += centre.y;
        }
    };

    /**
     * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
     * @method setPosition
     * @param {body} body
     * @param {vector} position
     */
    Body.setPosition = function(body, position) {
        var delta = Vector.sub(position, body.position);
        body.positionPrev.x += delta.x;
        body.positionPrev.y += delta.y;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.position.x += delta.x;
            part.position.y += delta.y;
            Vertices.translate(part.vertices, delta);
            Bounds.update(part.bounds, part.vertices, body.velocity);
        }
    };

    /**
     * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
     * @method setAngle
     * @param {body} body
     * @param {number} angle
     */
    Body.setAngle = function(body, angle) {
        var delta = angle - body.angle;
        body.anglePrev += delta;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];
            part.angle += delta;
            Vertices.rotate(part.vertices, delta, body.position);
            Axes.rotate(part.axes, delta);
            Bounds.update(part.bounds, part.vertices, body.velocity);
            if (i > 0) {
                Vector.rotateAbout(part.position, delta, body.position, part.position);
            }
        }
    };

    /**
     * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setVelocity
     * @param {body} body
     * @param {vector} velocity
     */
    Body.setVelocity = function(body, velocity) {
        body.positionPrev.x = body.position.x - velocity.x;
        body.positionPrev.y = body.position.y - velocity.y;
        body.velocity.x = velocity.x;
        body.velocity.y = velocity.y;
        body.speed = Vector.magnitude(body.velocity);
    };

    /**
     * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setAngularVelocity
     * @param {body} body
     * @param {number} velocity
     */
    Body.setAngularVelocity = function(body, velocity) {
        body.anglePrev = body.angle - velocity;
        body.angularVelocity = velocity;
        body.angularSpeed = Math.abs(body.angularVelocity);
    };

    /**
     * Moves a body by a given vector relative to its current position, without imparting any velocity.
     * @method translate
     * @param {body} body
     * @param {vector} translation
     */
    Body.translate = function(body, translation) {
        Body.setPosition(body, Vector.add(body.position, translation));
    };

    /**
     * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
     * @method rotate
     * @param {body} body
     * @param {number} rotation
     * @param {vector} [point]
     */
    Body.rotate = function(body, rotation, point) {
        if (!point) {
            Body.setAngle(body, body.angle + rotation);
        } else {
            var cos = Math.cos(rotation),
                sin = Math.sin(rotation),
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;
                
            Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
            });

            Body.setAngle(body, body.angle + rotation);
        }
    };

    /**
     * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
     * @method scale
     * @param {body} body
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} [point]
     */
    Body.scale = function(body, scaleX, scaleY, point) {
        var totalArea = 0,
            totalInertia = 0;

        point = point || body.position;

        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            part.scale.x = scaleX;
            part.scale.y = scaleY;

            // scale vertices
            Vertices.scale(part.vertices, scaleX, scaleY, point);

            // update properties
            part.axes = Axes.fromVertices(part.vertices);
            part.area = Vertices.area(part.vertices);
            Body.setMass(part, body.density * part.area);

            // update inertia (requires vertices to be at origin)
            Vertices.translate(part.vertices, { x: -part.position.x, y: -part.position.y });
            Body.setInertia(part, Body._inertiaScale * Vertices.inertia(part.vertices, part.mass));
            Vertices.translate(part.vertices, { x: part.position.x, y: part.position.y });

            if (i > 0) {
                totalArea += part.area;
                totalInertia += part.inertia;
            }

            // scale position
            part.position.x = point.x + (part.position.x - point.x) * scaleX;
            part.position.y = point.y + (part.position.y - point.y) * scaleY;

            // update bounds
            Bounds.update(part.bounds, part.vertices, body.velocity);
        }

        // handle parent body
        if (body.parts.length > 1) {
            body.area = totalArea;

            if (!body.isStatic) {
                Body.setMass(body, body.density * totalArea);
                Body.setInertia(body, totalInertia);
            }
        }

        // handle circles
        if (body.circleRadius) { 
            if (scaleX === scaleY) {
                body.circleRadius *= scaleX;
            } else {
                // body is no longer a circle
                body.circleRadius = null;
            }
        }
    };

    /**
     * Performs a simulation step for the given `body`, including updating position and angle using Verlet integration.
     * @method update
     * @param {body} body
     * @param {number} deltaTime
     * @param {number} timeScale
     * @param {number} correction
     */
    Body.update = function(body, deltaTime, timeScale, correction) {
        var deltaTimeSquared = Math.pow(deltaTime * timeScale * body.timeScale, 2);

        // from the previous step
        var frictionAir = 1 - body.frictionAir * timeScale * body.timeScale,
            velocityPrevX = body.position.x - body.positionPrev.x,
            velocityPrevY = body.position.y - body.positionPrev.y;

        // update velocity with Verlet integration
        body.velocity.x = (velocityPrevX * frictionAir * correction) + (body.force.x / body.mass) * deltaTimeSquared;
        body.velocity.y = (velocityPrevY * frictionAir * correction) + (body.force.y / body.mass) * deltaTimeSquared;

        body.positionPrev.x = body.position.x;
        body.positionPrev.y = body.position.y;
        body.position.x += body.velocity.x;
        body.position.y += body.velocity.y;

        // update angular velocity with Verlet integration
        body.angularVelocity = ((body.angle - body.anglePrev) * frictionAir * correction) + (body.torque / body.inertia) * deltaTimeSquared;
        body.anglePrev = body.angle;
        body.angle += body.angularVelocity;

        // track speed and acceleration
        body.speed = Vector.magnitude(body.velocity);
        body.angularSpeed = Math.abs(body.angularVelocity);

        // transform the body geometry
        for (var i = 0; i < body.parts.length; i++) {
            var part = body.parts[i];

            Vertices.translate(part.vertices, body.velocity);
            
            if (i > 0) {
                part.position.x += body.velocity.x;
                part.position.y += body.velocity.y;
            }

            if (body.angularVelocity !== 0) {
                Vertices.rotate(part.vertices, body.angularVelocity, body.position);
                Axes.rotate(part.axes, body.angularVelocity);
                if (i > 0) {
                    Vector.rotateAbout(part.position, body.angularVelocity, body.position, part.position);
                }
            }

            Bounds.update(part.bounds, part.vertices, body.velocity);
        }
    };

    /**
     * Applies a force to a body from a given world-space position, including resulting torque.
     * @method applyForce
     * @param {body} body
     * @param {vector} position
     * @param {vector} force
     */
    Body.applyForce = function(body, position, force) {
        body.force.x += force.x;
        body.force.y += force.y;
        var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
        body.torque += offset.x * force.y - offset.y * force.x;
    };

    /**
     * Returns the sums of the properties of all compound parts of the parent body.
     * @method _totalProperties
     * @private
     * @param {body} body
     * @return {}
     */
    Body._totalProperties = function(body) {
        // from equations at:
        // https://ecourses.ou.edu/cgi-bin/ebook.cgi?doc=&topic=st&chap_sec=07.2&page=theory
        // http://output.to/sideway/default.asp?qno=121100087

        var properties = {
            mass: 0,
            area: 0,
            inertia: 0,
            centre: { x: 0, y: 0 }
        };

        // sum the properties of all compound parts of the parent body
        for (var i = body.parts.length === 1 ? 0 : 1; i < body.parts.length; i++) {
            var part = body.parts[i],
                mass = part.mass !== Infinity ? part.mass : 1;

            properties.mass += mass;
            properties.area += part.area;
            properties.inertia += part.inertia;
            properties.centre = Vector.add(properties.centre, Vector.mult(part.position, mass));
        }

        properties.centre = Vector.div(properties.centre, properties.mass);

        return properties;
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when a body starts sleeping (where `this` is the body).
    *
    * @event sleepStart
    * @this {body} The body that has started sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a body ends sleeping (where `this` is the body).
    *
    * @event sleepEnd
    * @this {body} The body that has ended sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "body"
     * @readOnly
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Body"
     */

    /**
     * An array of bodies that make up this body. 
     * The first body in the array must always be a self reference to the current body instance.
     * All bodies in the `parts` array together form a single rigid compound body.
     * Parts are allowed to overlap, have gaps or holes or even form concave bodies.
     * Parts themselves should never be added to a `World`, only the parent body should be.
     * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
     *
     * @property parts
     * @type body[]
     */

    /**
     * An object reserved for storing plugin-specific properties.
     *
     * @property plugin
     * @type {}
     */

    /**
     * A self reference if the body is _not_ a part of another body.
     * Otherwise this is a reference to the body that this is a part of.
     * See `body.parts`.
     *
     * @property parent
     * @type body
     */

    /**
     * A `Number` specifying the angle of the body, in radians.
     *
     * @property angle
     * @type number
     * @default 0
     */

    /**
     * An array of `Vector` objects that specify the convex hull of the rigid body.
     * These should be provided about the origin `(0, 0)`. E.g.
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * When passed via `Body.create`, the vertices are translated relative to `body.position` (i.e. world-space, and constantly updated by `Body.update` during simulation).
     * The `Vector` objects are also augmented with additional properties required for efficient collision detection. 
     *
     * Other properties such as `inertia` and `bounds` are automatically calculated from the passed vertices (unless provided via `options`).
     * Concave hulls are not currently supported. The module `Matter.Vertices` contains useful methods for working with vertices.
     *
     * @property vertices
     * @type vector[]
     */

    /**
     * A `Vector` that specifies the current world-space position of the body.
     *
     * @property position
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that holds the current scale values as set by `Body.setScale`.
     *
     * @property scale
     * @type vector
     * @default { x: 1, y: 1 }
     */

    /**
     * A `Vector` that specifies the force to apply in the current step. It is zeroed after every `Body.update`. See also `Body.applyForce`.
     *
     * @property force
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that specifies the torque (turning force) to apply in the current step. It is zeroed after every `Body.update`.
     *
     * @property torque
     * @type number
     * @default 0
     */

    /**
     * A `Number` that _measures_ the current speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.velocity`).
     *
     * @readOnly
     * @property speed
     * @type number
     * @default 0
     */

    /**
     * A `Number` that _measures_ the current angular speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.angularVelocity`).
     *
     * @readOnly
     * @property angularSpeed
     * @type number
     * @default 0
     */

    /**
     * A `Vector` that _measures_ the current velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's velocity directly, you should either apply a force or simply change the body's `position` (as the engine uses position-Verlet integration).
     *
     * @readOnly
     * @property velocity
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that _measures_ the current angular velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's angular velocity directly, you should apply a torque or simply change the body's `angle` (as the engine uses position-Verlet integration).
     *
     * @readOnly
     * @property angularVelocity
     * @type number
     * @default 0
     */

    /**
     * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
     * If you need to set a body as static after its creation, you should use `Body.setStatic` as this requires more than just setting this flag.
     *
     * @property isStatic
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
     *
     * @property isSensor
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
     * If you need to set a body as sleeping, you should use `Sleeping.set` as this requires more than just setting this flag.
     *
     * @property isSleeping
     * @type boolean
     * @default false
     */

    /**
     * A `Number` that _measures_ the amount of movement a body currently has (a combination of `speed` and `angularSpeed`). It is read-only and always positive.
     * It is used and updated by the `Matter.Sleeping` module during simulation to decide if a body has come to rest.
     *
     * @readOnly
     * @property motion
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the number of updates in which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
     *
     * @property sleepThreshold
     * @type number
     * @default 60
     */

    /**
     * A `Number` that defines the density of the body, that is its mass per unit area.
     * If you pass the density via `Body.create` the `mass` property is automatically calculated for you based on the size (area) of the object.
     * This is generally preferable to simply setting mass and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
     *
     * @property density
     * @type number
     * @default 0.001
     */

    /**
     * A `Number` that defines the mass of the body, although it may be more appropriate to specify the `density` property instead.
     * If you modify this value, you must also modify the `body.inverseMass` property (`1 / mass`).
     *
     * @property mass
     * @type number
     */

    /**
     * A `Number` that defines the inverse mass of the body (`1 / mass`).
     * If you modify this value, you must also modify the `body.mass` property.
     *
     * @property inverseMass
     * @type number
     */

    /**
     * A `Number` that defines the moment of inertia (i.e. second moment of area) of the body.
     * It is automatically calculated from the given convex hull (`vertices` array) and density in `Body.create`.
     * If you modify this value, you must also modify the `body.inverseInertia` property (`1 / inertia`).
     *
     * @property inertia
     * @type number
     */

    /**
     * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
     * If you modify this value, you must also modify the `body.inertia` property.
     *
     * @property inverseInertia
     * @type number
     */

    /**
     * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur. 
     * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
     * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
     *
     *     Math.max(bodyA.restitution, bodyB.restitution)
     *
     * @property restitution
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means that the body may slide indefinitely.
     * A value of `1` means the body may come to a stop almost instantly after a force is applied.
     *
     * The effects of the value may be non-linear. 
     * High values may be unstable depending on the body.
     * The engine uses a Coulomb friction model including static and kinetic friction.
     * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
     *
     *     Math.min(bodyA.friction, bodyB.friction)
     *
     * @property friction
     * @type number
     * @default 0.1
     */

    /**
     * A `Number` that defines the static friction of the body (in the Coulomb friction model). 
     * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
     * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
     * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
     *
     * @property frictionStatic
     * @type number
     * @default 0.5
     */

    /**
     * A `Number` that defines the air friction of the body (air resistance). 
     * A value of `0` means the body will never slow as it moves through space.
     * The higher the value, the faster a body slows when moving through space.
     * The effects of the value are non-linear. 
     *
     * @property frictionAir
     * @type number
     * @default 0.01
     */

    /**
     * An `Object` that specifies the collision filtering properties of this body.
     *
     * Collisions between two bodies will obey the following rules:
     * - If the two bodies have the same non-zero value of `collisionFilter.group`,
     *   they will always collide if the value is positive, and they will never collide
     *   if the value is negative.
     * - If the two bodies have different values of `collisionFilter.group` or if one
     *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
     *
     * Each body belongs to a collision category, given by `collisionFilter.category`. This
     * value is used as a bit field and the category should have only one bit set, meaning that
     * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
     * different collision categories available.
     *
     * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
     * the categories it collides with (the value is the bitwise AND value of all these categories).
     *
     * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
     * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
     * are both true.
     *
     * @property collisionFilter
     * @type object
     */

    /**
     * An Integer `Number`, that specifies the collision group this body belongs to.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.group
     * @type object
     * @default 0
     */

    /**
     * A bit field that specifies the collision category this body belongs to.
     * The category value should have only one bit set, for example `0x0001`.
     * This means there are up to 32 unique collision categories available.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.category
     * @type object
     * @default 1
     */

    /**
     * A bit mask that specifies the collision categories this body may collide with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.mask
     * @type object
     * @default -1
     */

    /**
     * A `Number` that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
     * Avoid changing this value unless you understand the purpose of `slop` in physics engines.
     * The default should generally suffice, although very large bodies may require larger values for stable stacking.
     *
     * @property slop
     * @type number
     * @default 0.05
     */

    /**
     * A `Number` that allows per-body time scaling, e.g. a force-field where bodies inside are in slow-motion, while others are at full speed.
     *
     * @property timeScale
     * @type number
     * @default 1
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the body should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * Sets the opacity to use when rendering.
     *
     * @property render.opacity
     * @type number
     * @default 1
    */

    /**
     * An `Object` that defines the sprite properties to use when rendering, if any.
     *
     * @property render.sprite
     * @type object
     */

     /**
      * A `Number` that defines the offset in the x-axis for the sprite (normalised by texture width).
      *
      * @property render.sprite.xOffset
      * @type number
      * @default 0
      */

     /**
      * A `Number` that defines the offset in the y-axis for the sprite (normalised by texture height).
      *
      * @property render.sprite.yOffset
      * @type number
      * @default 0
      */

    /**
     * A hex color value that defines the fill color to use when rendering the body.
     *
     * @property render.fillColor
     * @type number
     */

    /**
     * A value that defines the fill opacity to use when rendering the body.
     *
     * @property render.fillOpacity
     * @type number
     */

     /**
     * A hex color value that defines the line color to use when rendering the body.
     *
     * @property render.lineColor
     * @type number
     */

    /**
     * A value that defines the line opacity to use when rendering the body.
     *
     * @property render.lineOpacity
     * @type number
     */

     /**
     * A `Number` that defines the line width to use when rendering the body outline.
     *
     * @property render.lineThickness
     * @type number
     */

    /**
     * An array of unique axis vectors (edge normals) used for collision detection.
     * These are automatically calculated from the given convex hull (`vertices` array) in `Body.create`.
     * They are constantly updated by `Body.update` during the simulation.
     *
     * @property axes
     * @type vector[]
     */
     
    /**
     * A `Number` that _measures_ the area of the body's convex hull, calculated at creation by `Body.create`.
     *
     * @property area
     * @type string
     * @default 
     */

    /**
     * A `Bounds` object that defines the AABB region for the body.
     * It is automatically calculated from the given convex hull (`vertices` array) in `Body.create` and constantly updated by `Body.update` during simulation.
     *
     * @property bounds
     * @type bounds
     */

    /**
     * A reference to the Phaser Game Object this body belongs to, if any.
     *
     * @property gameObject
     * @type Phaser.GameObjects.GameObject
     */

    /**
     * The center of mass of the Body.
     *
     * @property centerOfMass
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * The center of the body in pixel values.
     * Used by Phaser for texture aligment.
     *
     * @property centerOffset
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * Will this Body ignore World gravity during the Engine update?
     *
     * @property ignoreGravity
     * @type boolean
     * @default false
     */

    /**
     * Scale the influence of World gravity when applied to this body.
     *
     * @property gravityScale
     * @type vector
     * @default { x: 1, y: 1 }
     */

     /**
     * Will this Body ignore Phaser Pointer input events?
     *
     * @property ignorePointer
     * @type boolean
     * @default false
     */

    /**
     * A callback that is invoked when this Body starts colliding with any other Body.
     * 
     * You can register callbacks by providing a function of type `( pair: Matter.Pair) => void`.
     *
     * @property onCollideCallback
     * @type function
     * @default null
     */

    /**
     * A callback that is invoked when this Body stops colliding with any other Body.
     * 
     * You can register callbacks by providing a function of type `( pair: Matter.Pair) => void`.
     *
     * @property onCollideEndCallback
     * @type function
     * @default null
     */

    /**
     * A callback that is invoked for the duration that this Body is colliding with any other Body.
     * 
     * You can register callbacks by providing a function of type `( pair: Matter.Pair) => void`.
     *
     * @property onCollideActiveCallback
     * @type function
     * @default null
     */

    /**
     * A collision callback dictionary used by the `Body.setOnCollideWith` function.
     *
     * @property onCollideWith
     * @type object
     * @default null
     */

})();


/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Returns the bottom coordinate from the bounds of the Game Object.
 *
 * @function Phaser.Display.Bounds.GetBottom
 * @since 3.0.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 *
 * @return {number} The bottom coordinate of the bounds of the Game Object.
 */
var GetBottom = function (gameObject)
{
    return (gameObject.y + gameObject.height) - (gameObject.height * gameObject.originY);
};

module.exports = GetBottom;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Returns the left coordinate from the bounds of the Game Object.
 *
 * @function Phaser.Display.Bounds.GetLeft
 * @since 3.0.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 *
 * @return {number} The left coordinate of the bounds of the Game Object.
 */
var GetLeft = function (gameObject)
{
    return gameObject.x - (gameObject.width * gameObject.originX);
};

module.exports = GetLeft;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Returns the right coordinate from the bounds of the Game Object.
 *
 * @function Phaser.Display.Bounds.GetRight
 * @since 3.0.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 *
 * @return {number} The right coordinate of the bounds of the Game Object.
 */
var GetRight = function (gameObject)
{
    return (gameObject.x + gameObject.width) - (gameObject.width * gameObject.originX);
};

module.exports = GetRight;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Returns the top coordinate from the bounds of the Game Object.
 *
 * @function Phaser.Display.Bounds.GetTop
 * @since 3.0.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 *
 * @return {number} The top coordinate of the bounds of the Game Object.
 */
var GetTop = function (gameObject)
{
    return gameObject.y - (gameObject.height * gameObject.originY);
};

module.exports = GetTop;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Takes an array of Game Objects, or any objects that have a public property as defined in `key`,
 * and then adds the given value to it.
 *
 * The optional `step` property is applied incrementally, multiplied by each item in the array.
 *
 * To use this with a Group: `PropertyValueInc(group.getChildren(), key, value, step)`
 *
 * @function Phaser.Actions.PropertyValueInc
 * @since 3.3.0
 *
 * @generic {Phaser.GameObjects.GameObject[]} G - [items,$return]
 *
 * @param {(array|Phaser.GameObjects.GameObject[])} items - The array of items to be updated by this action.
 * @param {string} key - The property to be updated.
 * @param {number} value - The amount to be added to the property.
 * @param {number} [step=0] - This is added to the `value` amount, multiplied by the iteration counter.
 * @param {number} [index=0] - An optional offset to start searching from within the items array.
 * @param {number} [direction=1] - The direction to iterate through the array. 1 is from beginning to end, -1 from end to beginning.
 *
 * @return {(array|Phaser.GameObjects.GameObject[])} The array of objects that were passed to this Action.
 */
var PropertyValueInc = function (items, key, value, step, index, direction)
{
    if (step === undefined) { step = 0; }
    if (index === undefined) { index = 0; }
    if (direction === undefined) { direction = 1; }

    var i;
    var t = 0;
    var end = items.length;

    if (direction === 1)
    {
        //  Start to End
        for (i = index; i < end; i++)
        {
            items[i][key] += value + (t * step);
            t++;
        }
    }
    else
    {
        //  End to Start
        for (i = index; i >= 0; i--)
        {
            items[i][key] += value + (t * step);
            t++;
        }
    }

    return items;
};

module.exports = PropertyValueInc;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var GetPoint = __webpack_require__(307);
var GetPoints = __webpack_require__(172);
var GEOM_CONST = __webpack_require__(56);
var Random = __webpack_require__(173);
var Vector2 = __webpack_require__(3);

/**
 * @classdesc
 * Defines a Line segment, a part of a line between two endpoints.
 *
 * @class Line
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x1=0] - The x coordinate of the lines starting point.
 * @param {number} [y1=0] - The y coordinate of the lines starting point.
 * @param {number} [x2=0] - The x coordinate of the lines ending point.
 * @param {number} [y2=0] - The y coordinate of the lines ending point.
 */
var Line = new Class({

    initialize:

    function Line (x1, y1, x2, y2)
    {
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }

        /**
         * The geometry constant type of this object: `GEOM_CONST.LINE`.
         * Used for fast type comparisons.
         *
         * @name Phaser.Geom.Line#type
         * @type {number}
         * @readonly
         * @since 3.19.0
         */
        this.type = GEOM_CONST.LINE;

        /**
         * The x coordinate of the lines starting point.
         *
         * @name Phaser.Geom.Line#x1
         * @type {number}
         * @since 3.0.0
         */
        this.x1 = x1;

        /**
         * The y coordinate of the lines starting point.
         *
         * @name Phaser.Geom.Line#y1
         * @type {number}
         * @since 3.0.0
         */
        this.y1 = y1;

        /**
         * The x coordinate of the lines ending point.
         *
         * @name Phaser.Geom.Line#x2
         * @type {number}
         * @since 3.0.0
         */
        this.x2 = x2;

        /**
         * The y coordinate of the lines ending point.
         *
         * @name Phaser.Geom.Line#y2
         * @type {number}
         * @since 3.0.0
         */
        this.y2 = y2;
    },

    /**
     * Get a point on a line that's a given percentage along its length.
     *
     * @method Phaser.Geom.Line#getPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [output,$return]
     *
     * @param {number} position - A value between 0 and 1, where 0 is the start, 0.5 is the middle and 1 is the end of the line.
     * @param {(Phaser.Geom.Point|object)} [output] - An optional point, or point-like object, to store the coordinates of the point on the line.
     *
     * @return {(Phaser.Geom.Point|object)} A Point, or point-like object, containing the coordinates of the point on the line.
     */
    getPoint: function (position, output)
    {
        return GetPoint(this, position, output);
    },

    /**
     * Get a number of points along a line's length.
     *
     * Provide a `quantity` to get an exact number of points along the line.
     *
     * Provide a `stepRate` to ensure a specific distance between each point on the line. Set `quantity` to `0` when
     * providing a `stepRate`.
     *
     * @method Phaser.Geom.Line#getPoints
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point[]} O - [output,$return]
     *
     * @param {number} quantity - The number of points to place on the line. Set to `0` to use `stepRate` instead.
     * @param {number} [stepRate] - The distance between each point on the line. When set, `quantity` is implied and should be set to `0`.
     * @param {(array|Phaser.Geom.Point[])} [output] - An optional array of Points, or point-like objects, to store the coordinates of the points on the line.
     *
     * @return {(array|Phaser.Geom.Point[])} An array of Points, or point-like objects, containing the coordinates of the points on the line.
     */
    getPoints: function (quantity, stepRate, output)
    {
        return GetPoints(this, quantity, stepRate, output);
    },

    /**
     * Get a random Point on the Line.
     *
     * @method Phaser.Geom.Line#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [point,$return]
     *
     * @param {(Phaser.Geom.Point|object)} [point] - An instance of a Point to be modified.
     *
     * @return {Phaser.Geom.Point} A random Point on the Line.
     */
    getRandomPoint: function (point)
    {
        return Random(this, point);
    },

    /**
     * Set new coordinates for the line endpoints.
     *
     * @method Phaser.Geom.Line#setTo
     * @since 3.0.0
     *
     * @param {number} [x1=0] - The x coordinate of the lines starting point.
     * @param {number} [y1=0] - The y coordinate of the lines starting point.
     * @param {number} [x2=0] - The x coordinate of the lines ending point.
     * @param {number} [y2=0] - The y coordinate of the lines ending point.
     *
     * @return {this} This Line object.
     */
    setTo: function (x1, y1, x2, y2)
    {
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }

        this.x1 = x1;
        this.y1 = y1;

        this.x2 = x2;
        this.y2 = y2;

        return this;
    },

    /**
     * Returns a Vector2 object that corresponds to the start of this Line.
     *
     * @method Phaser.Geom.Line#getPointA
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [vec2,$return]
     *
     * @param {Phaser.Math.Vector2} [vec2] - A Vector2 object to set the results in. If `undefined` a new Vector2 will be created.
     *
     * @return {Phaser.Math.Vector2} A Vector2 object that corresponds to the start of this Line.
     */
    getPointA: function (vec2)
    {
        if (vec2 === undefined) { vec2 = new Vector2(); }

        vec2.set(this.x1, this.y1);

        return vec2;
    },

    /**
     * Returns a Vector2 object that corresponds to the end of this Line.
     *
     * @method Phaser.Geom.Line#getPointB
     * @since 3.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [vec2,$return]
     *
     * @param {Phaser.Math.Vector2} [vec2] - A Vector2 object to set the results in. If `undefined` a new Vector2 will be created.
     *
     * @return {Phaser.Math.Vector2} A Vector2 object that corresponds to the end of this Line.
     */
    getPointB: function (vec2)
    {
        if (vec2 === undefined) { vec2 = new Vector2(); }

        vec2.set(this.x2, this.y2);

        return vec2;
    },

    /**
     * The left position of the Line.
     *
     * @name Phaser.Geom.Line#left
     * @type {number}
     * @since 3.0.0
     */
    left: {

        get: function ()
        {
            return Math.min(this.x1, this.x2);
        },

        set: function (value)
        {
            if (this.x1 <= this.x2)
            {
                this.x1 = value;
            }
            else
            {
                this.x2 = value;
            }
        }

    },

    /**
     * The right position of the Line.
     *
     * @name Phaser.Geom.Line#right
     * @type {number}
     * @since 3.0.0
     */
    right: {

        get: function ()
        {
            return Math.max(this.x1, this.x2);
        },

        set: function (value)
        {
            if (this.x1 > this.x2)
            {
                this.x1 = value;
            }
            else
            {
                this.x2 = value;
            }
        }

    },

    /**
     * The top position of the Line.
     *
     * @name Phaser.Geom.Line#top
     * @type {number}
     * @since 3.0.0
     */
    top: {

        get: function ()
        {
            return Math.min(this.y1, this.y2);
        },

        set: function (value)
        {
            if (this.y1 <= this.y2)
            {
                this.y1 = value;
            }
            else
            {
                this.y2 = value;
            }
        }

    },

    /**
     * The bottom position of the Line.
     *
     * @name Phaser.Geom.Line#bottom
     * @type {number}
     * @since 3.0.0
     */
    bottom: {

        get: function ()
        {
            return Math.max(this.y1, this.y2);
        },

        set: function (value)
        {
            if (this.y1 > this.y2)
            {
                this.y1 = value;
            }
            else
            {
                this.y2 = value;
            }
        }

    }

});

module.exports = Line;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Sets the fillStyle on the target context based on the given Shape.
 *
 * @method Phaser.GameObjects.Shape#FillStyleCanvas
 * @since 3.13.0
 * @private
 *
 * @param {CanvasRenderingContext2D} ctx - The context to set the fill style on.
 * @param {Phaser.GameObjects.Shape} src - The Game Object to set the fill style from.
 * @param {number} [altColor] - An alternative color to render with.
 * @param {number} [altAlpha] - An alternative alpha to render with.
 */
var FillStyleCanvas = function (ctx, src, altColor, altAlpha)
{
    var fillColor = (altColor) ? altColor : src.fillColor;
    var fillAlpha = (altAlpha) ? altAlpha : src.fillAlpha;

    var red = ((fillColor & 0xFF0000) >>> 16);
    var green = ((fillColor & 0xFF00) >>> 8);
    var blue = (fillColor & 0xFF);

    ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + fillAlpha + ')';
};

module.exports = FillStyleCanvas;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);

/**
 * @classdesc
 * A MultiFile is a special kind of parent that contains two, or more, Files as children and looks after
 * the loading and processing of them all. It is commonly extended and used as a base class for file types such as AtlasJSON or BitmapFont.
 *
 * You shouldn't create an instance of a MultiFile directly, but should extend it with your own class, setting a custom type and processing methods.
 *
 * @class MultiFile
 * @memberof Phaser.Loader
 * @constructor
 * @since 3.7.0
 *
 * @param {Phaser.Loader.LoaderPlugin} loader - The Loader that is going to load this File.
 * @param {string} type - The file type string for sorting within the Loader.
 * @param {string} key - The key of the file within the loader.
 * @param {Phaser.Loader.File[]} files - An array of Files that make-up this MultiFile.
 */
var MultiFile = new Class({

    initialize:

    function MultiFile (loader, type, key, files)
    {
        var finalFiles = [];

        //  Clean out any potential 'null' or 'undefined' file entries
        files.forEach(function (file)
        {
            if (file)
            {
                finalFiles.push(file);
            }
        });

        /**
         * A reference to the Loader that is going to load this file.
         *
         * @name Phaser.Loader.MultiFile#loader
         * @type {Phaser.Loader.LoaderPlugin}
         * @since 3.7.0
         */
        this.loader = loader;

        /**
         * The file type string for sorting within the Loader.
         *
         * @name Phaser.Loader.MultiFile#type
         * @type {string}
         * @since 3.7.0
         */
        this.type = type;

        /**
         * Unique cache key (unique within its file type)
         *
         * @name Phaser.Loader.MultiFile#key
         * @type {string}
         * @since 3.7.0
         */
        this.key = key;

        /**
         * The current index being used by multi-file loaders to avoid key clashes.
         *
         * @name Phaser.Loader.MultiFile#multiKeyIndex
         * @type {number}
         * @private
         * @since 3.20.0
         */
        this.multiKeyIndex = loader.multiKeyIndex++;

        /**
         * Array of files that make up this MultiFile.
         *
         * @name Phaser.Loader.MultiFile#files
         * @type {Phaser.Loader.File[]}
         * @since 3.7.0
         */
        this.files = finalFiles;

        /**
         * The completion status of this MultiFile.
         *
         * @name Phaser.Loader.MultiFile#complete
         * @type {boolean}
         * @default false
         * @since 3.7.0
         */
        this.complete = false;

        /**
         * The number of files to load.
         *
         * @name Phaser.Loader.MultiFile#pending
         * @type {number}
         * @since 3.7.0
         */

        this.pending = finalFiles.length;

        /**
         * The number of files that failed to load.
         *
         * @name Phaser.Loader.MultiFile#failed
         * @type {number}
         * @default 0
         * @since 3.7.0
         */
        this.failed = 0;

        /**
         * A storage container for transient data that the loading files need.
         *
         * @name Phaser.Loader.MultiFile#config
         * @type {any}
         * @since 3.7.0
         */
        this.config = {};

        /**
         * A reference to the Loaders baseURL at the time this MultiFile was created.
         * Used to populate child-files.
         *
         * @name Phaser.Loader.MultiFile#baseURL
         * @type {string}
         * @since 3.20.0
         */
        this.baseURL = loader.baseURL;

        /**
         * A reference to the Loaders path at the time this MultiFile was created.
         * Used to populate child-files.
         *
         * @name Phaser.Loader.MultiFile#path
         * @type {string}
         * @since 3.20.0
         */
        this.path = loader.path;

        /**
         * A reference to the Loaders prefix at the time this MultiFile was created.
         * Used to populate child-files.
         *
         * @name Phaser.Loader.MultiFile#prefix
         * @type {string}
         * @since 3.20.0
         */
        this.prefix = loader.prefix;

        //  Link the files
        for (var i = 0; i < finalFiles.length; i++)
        {
            finalFiles[i].multiFile = this;
        }
    },

    /**
     * Checks if this MultiFile is ready to process its children or not.
     *
     * @method Phaser.Loader.MultiFile#isReadyToProcess
     * @since 3.7.0
     *
     * @return {boolean} `true` if all children of this MultiFile have loaded, otherwise `false`.
     */
    isReadyToProcess: function ()
    {
        return (this.pending === 0 && this.failed === 0 && !this.complete);
    },

    /**
     * Adds another child to this MultiFile, increases the pending count and resets the completion status.
     *
     * @method Phaser.Loader.MultiFile#addToMultiFile
     * @since 3.7.0
     *
     * @param {Phaser.Loader.File} files - The File to add to this MultiFile.
     *
     * @return {Phaser.Loader.MultiFile} This MultiFile instance.
     */
    addToMultiFile: function (file)
    {
        this.files.push(file);

        file.multiFile = this;

        this.pending++;

        this.complete = false;

        return this;
    },

    /**
     * Called by each File when it finishes loading.
     *
     * @method Phaser.Loader.MultiFile#onFileComplete
     * @since 3.7.0
     *
     * @param {Phaser.Loader.File} file - The File that has completed processing.
     */
    onFileComplete: function (file)
    {
        var index = this.files.indexOf(file);

        if (index !== -1)
        {
            this.pending--;
        }
    },

    /**
     * Called by each File that fails to load.
     *
     * @method Phaser.Loader.MultiFile#onFileFailed
     * @since 3.7.0
     *
     * @param {Phaser.Loader.File} file - The File that has failed to load.
     */
    onFileFailed: function (file)
    {
        var index = this.files.indexOf(file);

        if (index !== -1)
        {
            this.failed++;
        }
    }

});

module.exports = MultiFile;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Calculate the distance between two sets of coordinates (points).
 *
 * @function Phaser.Math.Distance.Between
 * @since 3.0.0
 *
 * @param {number} x1 - The x coordinate of the first point.
 * @param {number} y1 - The y coordinate of the first point.
 * @param {number} x2 - The x coordinate of the second point.
 * @param {number} y2 - The y coordinate of the second point.
 *
 * @return {number} The distance between each point.
 */
var DistanceBetween = function (x1, y1, x2, y2)
{
    var dx = x1 - x2;
    var dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
};

module.exports = DistanceBetween;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * @namespace Phaser.Input.Events
 */

module.exports = {

    BOOT: __webpack_require__(922),
    DESTROY: __webpack_require__(923),
    DRAG_END: __webpack_require__(924),
    DRAG_ENTER: __webpack_require__(925),
    DRAG: __webpack_require__(926),
    DRAG_LEAVE: __webpack_require__(927),
    DRAG_OVER: __webpack_require__(928),
    DRAG_START: __webpack_require__(929),
    DROP: __webpack_require__(930),
    GAME_OUT: __webpack_require__(931),
    GAME_OVER: __webpack_require__(932),
    GAMEOBJECT_DOWN: __webpack_require__(933),
    GAMEOBJECT_DRAG_END: __webpack_require__(934),
    GAMEOBJECT_DRAG_ENTER: __webpack_require__(935),
    GAMEOBJECT_DRAG: __webpack_require__(936),
    GAMEOBJECT_DRAG_LEAVE: __webpack_require__(937),
    GAMEOBJECT_DRAG_OVER: __webpack_require__(938),
    GAMEOBJECT_DRAG_START: __webpack_require__(939),
    GAMEOBJECT_DROP: __webpack_require__(940),
    GAMEOBJECT_MOVE: __webpack_require__(941),
    GAMEOBJECT_OUT: __webpack_require__(942),
    GAMEOBJECT_OVER: __webpack_require__(943),
    GAMEOBJECT_POINTER_DOWN: __webpack_require__(944),
    GAMEOBJECT_POINTER_MOVE: __webpack_require__(945),
    GAMEOBJECT_POINTER_OUT: __webpack_require__(946),
    GAMEOBJECT_POINTER_OVER: __webpack_require__(947),
    GAMEOBJECT_POINTER_UP: __webpack_require__(948),
    GAMEOBJECT_POINTER_WHEEL: __webpack_require__(949),
    GAMEOBJECT_UP: __webpack_require__(950),
    GAMEOBJECT_WHEEL: __webpack_require__(951),
    MANAGER_BOOT: __webpack_require__(952),
    MANAGER_PROCESS: __webpack_require__(953),
    MANAGER_UPDATE: __webpack_require__(954),
    POINTER_DOWN: __webpack_require__(955),
    POINTER_DOWN_OUTSIDE: __webpack_require__(956),
    POINTER_MOVE: __webpack_require__(957),
    POINTER_OUT: __webpack_require__(958),
    POINTER_OVER: __webpack_require__(959),
    POINTER_UP: __webpack_require__(960),
    POINTER_UP_OUTSIDE: __webpack_require__(961),
    POINTER_WHEEL: __webpack_require__(962),
    POINTERLOCK_CHANGE: __webpack_require__(963),
    PRE_UPDATE: __webpack_require__(964),
    SHUTDOWN: __webpack_require__(965),
    START: __webpack_require__(966),
    UPDATE: __webpack_require__(967)

};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Positions the Game Object so that the top of its bounds aligns with the given coordinate.
 *
 * @function Phaser.Display.Bounds.SetTop
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be re-positioned.
 * @param {number} value - The coordinate to position the Game Object bounds on.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was positioned.
 */
var SetTop = function (gameObject, value)
{
    gameObject.y = value + (gameObject.height * gameObject.originY);

    return gameObject;
};

module.exports = SetTop;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Positions the Game Object so that the left of its bounds aligns with the given coordinate.
 *
 * @function Phaser.Display.Bounds.SetLeft
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be re-positioned.
 * @param {number} value - The coordinate to position the Game Object bounds on.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was positioned.
 */
var SetLeft = function (gameObject, value)
{
    gameObject.x = value + (gameObject.width * gameObject.originX);

    return gameObject;
};

module.exports = SetLeft;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Positions the Game Object so that the left of its bounds aligns with the given coordinate.
 *
 * @function Phaser.Display.Bounds.SetRight
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be re-positioned.
 * @param {number} value - The coordinate to position the Game Object bounds on.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was positioned.
 */
var SetRight = function (gameObject, value)
{
    gameObject.x = (value - gameObject.width) + (gameObject.width * gameObject.originX);

    return gameObject;
};

module.exports = SetRight;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Positions the Game Object so that the bottom of its bounds aligns with the given coordinate.
 *
 * @function Phaser.Display.Bounds.SetBottom
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject} G - [gameObject,$return]
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object that will be re-positioned.
 * @param {number} value - The coordinate to position the Game Object bounds on.
 *
 * @return {Phaser.GameObjects.GameObject} The Game Object that was positioned.
 */
var SetBottom = function (gameObject, value)
{
    gameObject.y = (value - gameObject.height) + (gameObject.height * gameObject.originY);

    return gameObject;
};

module.exports = SetBottom;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var GEOM_CONST = {

    /**
     * A Circle Geometry object type.
     * 
     * @name Phaser.Geom.CIRCLE
     * @type {number}
     * @since 3.19.0
     */
    CIRCLE: 0,

    /**
     * An Ellipse Geometry object type.
     * 
     * @name Phaser.Geom.ELLIPSE
     * @type {number}
     * @since 3.19.0
     */
    ELLIPSE: 1,

    /**
     * A Line Geometry object type.
     * 
     * @name Phaser.Geom.LINE
     * @type {number}
     * @since 3.19.0
     */
    LINE: 2,

    /**
     * A Point Geometry object type.
     * 
     * @name Phaser.Geom.POINT
     * @type {number}
     * @since 3.19.0
     */
    POINT: 3,

    /**
     * A Polygon Geometry object type.
     * 
     * @name Phaser.Geom.POLYGON
     * @type {number}
     * @since 3.19.0
     */
    POLYGON: 4,

    /**
     * A Rectangle Geometry object type.
     * 
     * @name Phaser.Geom.RECTANGLE
     * @type {number}
     * @since 3.19.0
     */
    RECTANGLE: 5,

    /**
     * A Triangle Geometry object type.
     * 
     * @name Phaser.Geom.TRIANGLE
     * @type {number}
     * @since 3.19.0
     */
    TRIANGLE: 6

};

module.exports = GEOM_CONST;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Checks if a given point is inside a Rectangle's bounds.
 *
 * @function Phaser.Geom.Rectangle.Contains
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Rectangle} rect - The Rectangle to check.
 * @param {number} x - The X coordinate of the point to check.
 * @param {number} y - The Y coordinate of the point to check.
 *
 * @return {boolean} `true` if the point is within the Rectangle's bounds, otherwise `false`.
 */
var Contains = function (rect, x, y)
{
    if (rect.width <= 0 || rect.height <= 0)
    {
        return false;
    }

    return (rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y);
};

module.exports = Contains;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var DeepCopy = __webpack_require__(175);
var EventEmitter = __webpack_require__(9);
var Events = __webpack_require__(374);
var GetFastValue = __webpack_require__(2);
var Matrix4 = __webpack_require__(69);
var RendererEvents = __webpack_require__(92);
var RenderTarget = __webpack_require__(142);
var Utils = __webpack_require__(12);
var WebGLShader = __webpack_require__(375);

/**
 * @classdesc
 * The `WebGLPipeline` is a base class used by all of the core Phaser pipelines.
 *
 * It describes the way elements will be rendered in WebGL. Internally, it handles
 * compiling the shaders, creating vertex buffers, assigning primitive topology and
 * binding vertex attributes, all based on the given configuration data.
 *
 * The pipeline is configured by passing in a `WebGLPipelineConfig` object. Please
 * see the documentation for this type to fully understand the configuration options
 * available to you.
 *
 * Usually, you would not extend from this class directly, but would instead extend
 * from one of the core pipelines, such as the Multi Pipeline.
 *
 * The pipeline flow per render-step is as follows:
 *
 * 1) onPreRender - called once at the start of the render step
 * 2) onRender - call for each Scene Camera that needs to render (so can be multiple times per render step)
 * 3) Internal flow:
 * 3a)   bind (only called if a Game Object is using this pipeline and it's not currently active)
 * 3b)   onBind (called for every Game Object that uses this pipeline)
 * 3c)   flush (can be called by a Game Object, internal method or from outside by changing pipeline)
 * 4) onPostRender - called once at the end of the render step
 *
 * @class WebGLPipeline
 * @extends Phaser.Events.EventEmitter
 * @memberof Phaser.Renderer.WebGL
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Types.Renderer.WebGL.WebGLPipelineConfig} config - The configuration object for this WebGL Pipeline.
 */
var WebGLPipeline = new Class({

    Extends: EventEmitter,

    initialize:

    function WebGLPipeline (config)
    {
        EventEmitter.call(this);

        var game = config.game;
        var renderer = game.renderer;
        var gl = renderer.gl;

        /**
         * Name of the pipeline. Used for identification and setting from Game Objects.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#name
         * @type {string}
         * @since 3.0.0
         */
        this.name = GetFastValue(config, 'name', 'WebGLPipeline');

        /**
         * The Phaser Game instance to which this pipeline is bound.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#game
         * @type {Phaser.Game}
         * @since 3.0.0
         */
        this.game = game;

        /**
         * The WebGL Renderer instance to which this pipeline is bound.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#renderer
         * @type {Phaser.Renderer.WebGL.WebGLRenderer}
         * @since 3.0.0
         */
        this.renderer = renderer;

        /**
         * A reference to the WebGL Pipeline Manager.
         *
         * This is initially undefined and only set when this pipeline is added
         * to the manager.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#manager
         * @type {?Phaser.Renderer.WebGL.PipelineManager}
         * @since 3.50.0
         */
        this.manager;

        /**
         * The WebGL context this WebGL Pipeline uses.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#gl
         * @type {WebGLRenderingContext}
         * @since 3.0.0
         */
        this.gl = gl;

        /**
         * The canvas which this WebGL Pipeline renders to.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#view
         * @type {HTMLCanvasElement}
         * @since 3.0.0
         */
        this.view = game.canvas;

        /**
         * Width of the current viewport.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#width
         * @type {number}
         * @since 3.0.0
         */
        this.width = 0;

        /**
         * Height of the current viewport.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#height
         * @type {number}
         * @since 3.0.0
         */
        this.height = 0;

        /**
         * The current number of vertices that have been added to the pipeline batch.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#vertexCount
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.vertexCount = 0;

        /**
         * The total number of vertices that this pipeline batch can hold before it will flush.
         *
         * This defaults to `renderer batchSize * 6`, where `batchSize` is defined in the Renderer Game Config.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#vertexCapacity
         * @type {number}
         * @since 3.0.0
         */
        this.vertexCapacity = 0;

        /**
         * Raw byte buffer of vertices.
         *
         * Either set via the config object `vertices` property, or generates a new Array Buffer of
         * size `vertexCapacity * vertexSize`.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#vertexData
         * @type {ArrayBuffer}
         * @readonly
         * @since 3.0.0
         */
        this.vertexData;

        /**
         * The WebGLBuffer that holds the vertex data.
         *
         * Created from the `vertexData` ArrayBuffer. If `vertices` are set in the config, a `STATIC_DRAW` buffer
         * is created. If not, a `DYNAMIC_DRAW` buffer is created.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#vertexBuffer
         * @type {WebGLBuffer}
         * @readonly
         * @since 3.0.0
         */
        this.vertexBuffer;

        /**
         * The primitive topology which the pipeline will use to submit draw calls.
         *
         * Defaults to GL_TRIANGLES if not otherwise set in the config.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#topology
         * @type {GLenum}
         * @since 3.0.0
         */
        this.topology = GetFastValue(config, 'topology', gl.TRIANGLES);

        /**
         * Uint8 view to the `vertexData` ArrayBuffer. Used for uploading vertex buffer resources to the GPU.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#bytes
         * @type {Uint8Array}
         * @since 3.0.0
         */
        this.bytes;

        /**
         * Float32 view of the array buffer containing the pipeline's vertices.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#vertexViewF32
         * @type {Float32Array}
         * @since 3.0.0
         */
        this.vertexViewF32;

        /**
         * Uint32 view of the array buffer containing the pipeline's vertices.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#vertexViewU32
         * @type {Uint32Array}
         * @since 3.0.0
         */
        this.vertexViewU32;

        /**
         * Indicates if the current pipeline is active, or not.
         *
         * Toggle this property to enable or disable a pipeline from rendering anything.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#active
         * @type {boolean}
         * @since 3.10.0
         */
        this.active = true;

        /**
         * Holds the most recently assigned texture unit.
         *
         * Treat this value as read-only.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#currentUnit
         * @type {number}
         * @since 3.50.0
         */
        this.currentUnit = 0;

        /**
         * Some pipelines require the forced use of texture zero (like the light pipeline).
         *
         * This property should be set when that is the case.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#forceZero
         * @type {boolean}
         * @since 3.50.0
         */
        this.forceZero = GetFastValue(config, 'forceZero', false);

        /**
         * Indicates if this pipeline has booted or not.
         *
         * A pipeline boots only when the Game instance itself, and all associated systems, is
         * fully ready.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#hasBooted
         * @type {boolean}
         * @readonly
         * @since 3.50.0
         */
        this.hasBooted = false;

        /**
         * Indicates if this is a Post FX Pipeline, or not.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#isPostFX
         * @type {boolean}
         * @readonly
         * @since 3.50.0
         */
        this.isPostFX = false;

        /**
         * An array of RenderTarget instances that belong to this pipeline.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#renderTargets
         * @type {Phaser.Renderer.WebGL.RenderTarget[]}
         * @since 3.50.0
         */
        this.renderTargets = [];

        /**
         * A reference to the currently bound Render Target instance from the `WebGLPipeline.renderTargets` array.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#currentRenderTarget
         * @type {Phaser.Renderer.WebGL.RenderTarget}
         * @since 3.50.0
         */
        this.currentRenderTarget;

        /**
         * An array of all the WebGLShader instances that belong to this pipeline.
         *
         * Shaders manage their own attributes and uniforms, but share the same vertex data buffer,
         * which belongs to this pipeline.
         *
         * Shaders are set in a call to the `setShadersFromConfig` method, which happens automatically,
         * but can also be called at any point in your game. See the method documentation for details.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#shaders
         * @type {Phaser.Renderer.WebGL.WebGLShader[]}
         * @since 3.50.0
         */
        this.shaders = [];

        /**
         * A reference to the currently bound WebGLShader instance from the `WebGLPipeline.shaders` array.
         *
         * For lots of pipelines, this is the only shader, so it is a quick way to reference it without
         * an array look-up.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#currentShader
         * @type {Phaser.Renderer.WebGL.WebGLShader}
         * @since 3.50.0
         */
        this.currentShader;

        /**
         * The Projection matrix, used by shaders as 'uProjectionMatrix' uniform.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#projectionMatrix
         * @type {Phaser.Math.Matrix4}
         * @since 3.50.0
         */
        this.projectionMatrix;

        /**
         * The cached width of the Projection matrix.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#projectionWidth
         * @type {number}
         * @since 3.50.0
         */
        this.projectionWidth = 0;

        /**
         * The cached height of the Projection matrix.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#projectionHeight
         * @type {number}
         * @since 3.50.0
         */
        this.projectionHeight = 0;

        /**
         * The configuration object that was used to create this pipeline.
         *
         * Treat this object as 'read only', because changing it post-creation will not
         * impact this pipeline in any way. However, it is used internally for cloning
         * and post-boot set-up.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#config
         * @type {Phaser.Types.Renderer.WebGL.WebGLPipelineConfig}
         * @since 3.50.0
         */
        this.config = config;

        /**
         * Has the GL Context been reset to the Phaser defaults since the last time
         * this pipeline was bound? This is set automatically when the Pipeline Manager
         * resets itself, usually after handing off to a 3rd party renderer like Spine.
         *
         * You should treat this property as read-only.
         *
         * @name Phaser.Renderer.WebGL.WebGLPipeline#glReset
         * @type {boolean}
         * @since 3.53.0
         */
        this.glReset = false;
    },

    /**
     * Called when the Game has fully booted and the Renderer has finished setting up.
     *
     * By this stage all Game level systems are now in place. You can perform any final tasks that the
     * pipeline may need, that relies on game systems such as the Texture Manager being ready.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#boot
     * @fires Phaser.Renderer.WebGL.Pipelines.Events#BOOT
     * @since 3.11.0
     */
    boot: function ()
    {
        var i;
        var gl = this.gl;
        var config = this.config;
        var renderer = this.renderer;

        if (!this.isPostFX)
        {
            this.projectionMatrix = new Matrix4().identity();
        }

        //  Create the Render Targets

        var renderTargets = this.renderTargets;

        var targets = GetFastValue(config, 'renderTarget', false);

        //  If boolean, set to number = 1
        if (typeof(targets) === 'boolean' && targets)
        {
            targets = 1;
        }

        var width = renderer.width;
        var height = renderer.height;

        if (typeof(targets) === 'number')
        {
            //  Create this many default RTs
            for (i = 0; i < targets; i++)
            {
                renderTargets.push(new RenderTarget(renderer, width, height, 1, 0, true));
            }
        }
        else if (Array.isArray(targets))
        {
            for (i = 0; i < targets.length; i++)
            {
                var scale = GetFastValue(targets[i], 'scale', 1);
                var minFilter = GetFastValue(targets[i], 'minFilter', 0);
                var autoClear = GetFastValue(targets[i], 'autoClear', 1);

                renderTargets.push(new RenderTarget(renderer, width, height, scale, minFilter, autoClear));
            }
        }

        if (renderTargets.length)
        {
            //  Default to the first one in the array
            this.currentRenderTarget = renderTargets[0];
        }

        //  Create the Shaders

        this.setShadersFromConfig(config);

        //  Which shader has the largest vertex size?
        var shaders = this.shaders;
        var vertexSize = 0;

        for (i = 0; i < shaders.length; i++)
        {
            if (shaders[i].vertexSize > vertexSize)
            {
                vertexSize = shaders[i].vertexSize;
            }
        }

        var batchSize = GetFastValue(config, 'batchSize', renderer.config.batchSize);

        //  * 6 because there are 6 vertices in a quad and 'batchSize' represents the quantity of quads in the batch

        this.vertexCapacity = batchSize * 6;

        var data = new ArrayBuffer(this.vertexCapacity * vertexSize);

        this.vertexData = data;
        this.bytes = new Uint8Array(data);
        this.vertexViewF32 = new Float32Array(data);
        this.vertexViewU32 = new Uint32Array(data);

        var configVerts = GetFastValue(config, 'vertices', null);

        if (configVerts)
        {
            this.vertexViewF32.set(configVerts);

            this.vertexBuffer = renderer.createVertexBuffer(data, gl.STATIC_DRAW);
        }
        else
        {
            this.vertexBuffer = renderer.createVertexBuffer(data.byteLength, gl.DYNAMIC_DRAW);
        }

        //  Set-up shaders

        this.setVertexBuffer();

        for (i = shaders.length - 1; i >= 0; i--)
        {
            shaders[i].rebind();
        }

        this.hasBooted = true;

        renderer.on(RendererEvents.RESIZE, this.resize, this);
        renderer.on(RendererEvents.PRE_RENDER, this.onPreRender, this);
        renderer.on(RendererEvents.RENDER, this.onRender, this);
        renderer.on(RendererEvents.POST_RENDER, this.onPostRender, this);

        this.emit(Events.BOOT, this);

        this.onBoot();
    },

    /**
     * This method is called once when this pipeline has finished being set-up
     * at the end of the boot process. By the time this method is called, all
     * of the shaders are ready and configured.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onBoot
     * @since 3.50.0
     */
    onBoot: function ()
    {
    },

    /**
     * This method is called once when this pipeline has finished being set-up
     * at the end of the boot process. By the time this method is called, all
     * of the shaders are ready and configured. It's also called if the renderer
     * changes size.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onResize
     * @since 3.50.0
     *
     * @param {number} width - The new width of this WebGL Pipeline.
     * @param {number} height - The new height of this WebGL Pipeline.
     */
    onResize: function ()
    {
    },

    /**
     * Sets the currently active shader within this pipeline.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#setShader
     * @since 3.50.0
     *
     * @param {Phaser.Renderer.WebGL.WebGLShader} shader - The shader to set as being current.
     * @param {boolean} [setAttributes=false] - Should the vertex attribute pointers be set?
     *
     * @return {this} This WebGLPipeline instance.
     */
    setShader: function (shader, setAttributes)
    {
        var renderer = this.renderer;

        if (shader !== this.currentShader || renderer.currentProgram !== this.currentShader.program)
        {
            this.flush();

            renderer.resetTextures();

            var wasBound = this.setVertexBuffer();

            if (wasBound && !setAttributes)
            {
                setAttributes = true;
            }

            shader.bind(setAttributes, false);

            this.currentShader = shader;
        }

        return this;
    },

    /**
     * Searches all shaders in this pipeline for one matching the given name, then returns it.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#getShaderByName
     * @since 3.50.0
     *
     * @param {string} name - The index of the shader to set.
     *
     * @return {Phaser.Renderer.WebGL.WebGLShader} The WebGLShader instance, if found.
     */
    getShaderByName: function (name)
    {
        var shaders = this.shaders;

        for (var i = 0; i < shaders.length; i++)
        {
            if (shaders[i].name === name)
            {
                return shaders[i];
            }
        }
    },

    /**
     * Destroys all shaders currently set in the `WebGLPipeline.shaders` array and then parses the given
     * `config` object, extracting the shaders from it, creating `WebGLShader` instances and finally
     * setting them into the `shaders` array of this pipeline.
     *
     * This is a destructive process. Be very careful when you call it, should you need to.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#setShadersFromConfig
     * @since 3.50.0
     *
     * @param {Phaser.Types.Renderer.WebGL.WebGLPipelineConfig} config - The configuration object for this WebGL Pipeline.
     *
     * @return {this} This WebGLPipeline instance.
     */
    setShadersFromConfig: function (config)
    {
        var i;
        var shaders = this.shaders;
        var renderer = this.renderer;

        for (i = 0; i < shaders.length; i++)
        {
            shaders[i].destroy();
        }

        var vName = 'vertShader';
        var fName = 'fragShader';
        var aName = 'attributes';

        var defaultVertShader = GetFastValue(config, vName, null);
        var defaultFragShader = Utils.parseFragmentShaderMaxTextures(GetFastValue(config, fName, null), renderer.maxTextures);
        var defaultAttribs = GetFastValue(config, aName, null);

        var configShaders = GetFastValue(config, 'shaders', []);

        var len = configShaders.length;

        if (len === 0)
        {
            if (defaultVertShader && defaultFragShader)
            {
                this.shaders = [ new WebGLShader(this, 'default', defaultVertShader, defaultFragShader, DeepCopy(defaultAttribs)) ];
            }
        }
        else
        {
            var newShaders = [];

            for (i = 0; i < len; i++)
            {
                var shaderEntry = configShaders[i];

                var name = GetFastValue(shaderEntry, 'name', 'default');

                var vertShader = GetFastValue(shaderEntry, vName, defaultVertShader);
                var fragShader = Utils.parseFragmentShaderMaxTextures(GetFastValue(shaderEntry, fName, defaultFragShader), renderer.maxTextures);
                var attributes = GetFastValue(shaderEntry, aName, defaultAttribs);

                if (vertShader && fragShader)
                {
                    newShaders.push(new WebGLShader(this, name, vertShader, fragShader, DeepCopy(attributes)));
                }
            }

            this.shaders = newShaders;
        }

        if (this.shaders.length === 0)
        {
            console.warn('Pipeline: ' + this.name + ' - Invalid shader config');
        }
        else
        {
            this.currentShader = this.shaders[0];
        }

        return this;
    },

    /**
     * Custom pipelines can use this method in order to perform any required pre-batch tasks
     * for the given Game Object. It must return the texture unit the Game Object was assigned.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#setGameObject
     * @since 3.50.0
     *
     * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object being rendered or added to the batch.
     * @param {Phaser.Textures.Frame} [frame] - Optional frame to use. Can override that of the Game Object.
     *
     * @return {number} The texture unit the Game Object has been assigned.
     */
    setGameObject: function (gameObject, frame)
    {
        if (frame === undefined) { frame = gameObject.frame; }

        this.currentUnit = this.renderer.setTextureSource(frame.source);

        return this.currentUnit;
    },

    /**
     * Check if the current batch of vertices is full.
     *
     * You can optionally provide an `amount` parameter. If given, it will check if the batch
     * needs to flush _if_ the `amount` is added to it. This allows you to test if you should
     * flush before populating the batch.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#shouldFlush
     * @since 3.0.0
     *
     * @param {number} [amount=0] - Will the batch need to flush if this many vertices are added to it?
     *
     * @return {boolean} `true` if the current batch should be flushed, otherwise `false`.
     */
    shouldFlush: function (amount)
    {
        if (amount === undefined) { amount = 0; }

        return (this.vertexCount + amount > this.vertexCapacity);
    },

    /**
     * Resizes the properties used to describe the viewport.
     *
     * This method is called automatically by the renderer during its resize handler.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#resize
     * @fires Phaser.Renderer.WebGL.Pipelines.Events#RESIZE
     * @since 3.0.0
     *
     * @param {number} width - The new width of this WebGL Pipeline.
     * @param {number} height - The new height of this WebGL Pipeline.
     *
     * @return {this} This WebGLPipeline instance.
     */
    resize: function (width, height)
    {
        if (width !== this.width || height !== this.height)
        {
            this.flush();
        }

        this.width = width;
        this.height = height;

        var targets = this.renderTargets;

        for (var i = 0; i < targets.length; i++)
        {
            targets[i].resize(width, height);
        }

        this.setProjectionMatrix(width, height);

        this.emit(Events.RESIZE, width, height, this);

        this.onResize(width, height);

        return this;
    },

    /**
     * Adjusts this pipelines ortho Projection Matrix to use the given dimensions
     * and resets the `uProjectionMatrix` uniform on all bound shaders.
     *
     * This method is called automatically by the renderer during its resize handler.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#setProjectionMatrix
     * @since 3.50.0
     *
     * @param {number} width - The new width of this WebGL Pipeline.
     * @param {number} height - The new height of this WebGL Pipeline.
     *
     * @return {this} This WebGLPipeline instance.
     */
    setProjectionMatrix: function (width, height)
    {
        var projectionMatrix = this.projectionMatrix;

        //  Because not all pipelines have them
        if (!projectionMatrix)
        {
            return this;
        }

        this.projectionWidth = width;
        this.projectionHeight = height;

        projectionMatrix.ortho(0, width, height, 0, -1000, 1000);

        var shaders = this.shaders;

        var name = 'uProjectionMatrix';

        for (var i = 0; i < shaders.length; i++)
        {
            var shader = shaders[i];

            if (shader.hasUniform(name))
            {
                shader.resetUniform(name);

                shader.setMatrix4fv(name, false, projectionMatrix.val, shader);
            }
        }

        return this;
    },

    /**
     * Adjusts this pipelines ortho Projection Matrix to match that of the global
     * WebGL Renderer Projection Matrix.
     *
     * This method is called automatically by the Pipeline Manager when this
     * pipeline is set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#updateProjectionMatrix
     * @since 3.50.0
     */
    updateProjectionMatrix: function ()
    {
        if (this.projectionMatrix)
        {
            var globalWidth = this.renderer.projectionWidth;
            var globalHeight = this.renderer.projectionHeight;

            if (this.projectionWidth !== globalWidth || this.projectionHeight !== globalHeight)
            {
                this.setProjectionMatrix(globalWidth, globalHeight);
            }
        }
    },

    /**
     * This method is called every time the Pipeline Manager makes this pipeline the currently active one.
     *
     * It binds the resources and shader needed for this pipeline, including setting the vertex buffer
     * and attribute pointers.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#bind
     * @fires Phaser.Renderer.WebGL.Pipelines.Events#BIND
     * @since 3.0.0
     *
     * @param {Phaser.Renderer.WebGL.WebGLShader} [currentShader] - The shader to set as being current.
     *
     * @return {this} This WebGLPipeline instance.
     */
    bind: function (currentShader)
    {
        if (currentShader === undefined) { currentShader = this.currentShader; }

        if (this.glReset)
        {
            return this.rebind(currentShader);
        }

        var wasBound = this.setVertexBuffer();

        currentShader.bind(wasBound);

        this.currentShader = currentShader;

        this.emit(Events.BIND, this, currentShader);

        this.onActive(currentShader);

        return this;
    },

    /**
     * This method is called every time the Pipeline Manager rebinds this pipeline.
     *
     * It resets all shaders this pipeline uses, setting their attributes again.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#rebind
     * @fires Phaser.Renderer.WebGL.Pipelines.Events#REBIND
     * @since 3.0.0
     *
     * @param {Phaser.Renderer.WebGL.WebGLShader} [currentShader] - The shader to set as being current.
     *
     * @return {this} This WebGLPipeline instance.
     */
    rebind: function (currentShader)
    {
        this.setVertexBuffer();

        var shaders = this.shaders;

        //  Loop in reverse, so the first shader in the array is left as being bound
        for (var i = shaders.length - 1; i >= 0; i--)
        {
            var shader = shaders[i].rebind();

            if (!currentShader || shader === currentShader)
            {
                this.currentShader = shader;
            }
        }

        this.emit(Events.REBIND, this.currentShader);

        this.onActive(this.currentShader);

        this.onRebind();

        this.glReset = false;

        return this;
    },

    /**
     * Binds the vertex buffer to be the active ARRAY_BUFFER on the WebGL context.
     *
     * It first checks to see if it's already set as the active buffer and only
     * binds itself if not.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#setVertexBuffer
     * @since 3.50.0
     *
     * @return {boolean} `true` if the vertex buffer was bound, or `false` if it was already bound.
     */
    setVertexBuffer: function ()
    {
        var gl = this.gl;
        var buffer = this.vertexBuffer;

        if (gl.getParameter(gl.ARRAY_BUFFER_BINDING) !== buffer)
        {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

            return true;
        }

        return false;
    },

    /**
     * This method is called as a result of the `WebGLPipeline.batchQuad` method, right before a quad
     * belonging to a Game Object is about to be added to the batch. When this is called, the
     * renderer has just performed a flush. It will bind the current render target, if any are set
     * and finally call the `onPreBatch` hook.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#preBatch
     * @since 3.50.0
     *
     * @param {(Phaser.GameObjects.GameObject|Phaser.Cameras.Scene2D.Camera)} [gameObject] - The Game Object or Camera that invoked this pipeline, if any.
     *
     * @return {this} This WebGLPipeline instance.
     */
    preBatch: function (gameObject)
    {
        if (this.currentRenderTarget)
        {
            this.currentRenderTarget.bind();
        }

        this.onPreBatch(gameObject);

        return this;
    },

    /**
     * This method is called as a result of the `WebGLPipeline.batchQuad` method, right after a quad
     * belonging to a Game Object has been added to the batch. When this is called, the
     * renderer has just performed a flush.
     *
     * It calls the `onDraw` hook followed by the `onPostBatch` hook, which can be used to perform
     * additional Post FX Pipeline processing.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#postBatch
     * @since 3.50.0
     *
     * @param {(Phaser.GameObjects.GameObject|Phaser.Cameras.Scene2D.Camera)} [gameObject] - The Game Object or Camera that invoked this pipeline, if any.
     *
     * @return {this} This WebGLPipeline instance.
     */
    postBatch: function (gameObject)
    {
        this.onDraw(this.currentRenderTarget);

        this.onPostBatch(gameObject);

        return this;
    },

    /**
     * This method is only used by Post FX Pipelines and those that extend from them.
     *
     * This method is called every time the `postBatch` method is called and is passed a
     * reference to the current render target.
     *
     * At the very least a Post FX Pipeline should call `this.bindAndDraw(renderTarget)`,
     * however, you can do as much additional processing as you like in this method if
     * you override it from within your own pipelines.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onDraw
     * @since 3.50.0
     *
     * @param {Phaser.Renderer.WebGL.RenderTarget} renderTarget - The Render Target.
     */
    onDraw: function ()
    {
    },

    /**
     * This method is called every time the Pipeline Manager deactivates this pipeline, swapping from
     * it to another one. This happens after a call to `flush` and before the new pipeline is bound.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#unbind
     * @since 3.50.0
     */
    unbind: function ()
    {
        if (this.currentRenderTarget)
        {
            this.currentRenderTarget.unbind();
        }
    },

    /**
     * Uploads the vertex data and emits a draw call for the current batch of vertices.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#flush
     * @fires Phaser.Renderer.WebGL.Pipelines.Events#BEFORE_FLUSH
     * @fires Phaser.Renderer.WebGL.Pipelines.Events#AFTER_FLUSH
     * @since 3.0.0
     *
     * @param {boolean} [isPostFlush=false] - Was this flush invoked as part of a post-process, or not?
     *
     * @return {this} This WebGLPipeline instance.
     */
    flush: function (isPostFlush)
    {
        if (isPostFlush === undefined) { isPostFlush = false; }

        if (this.vertexCount > 0)
        {
            this.emit(Events.BEFORE_FLUSH, this, isPostFlush);

            this.onBeforeFlush(isPostFlush);

            var gl = this.gl;
            var vertexCount = this.vertexCount;
            var vertexSize = this.currentShader.vertexSize;

            if (this.active)
            {
                this.setVertexBuffer();

                if (vertexCount === this.vertexCapacity)
                {
                    gl.bufferData(gl.ARRAY_BUFFER, this.vertexData, gl.DYNAMIC_DRAW);
                }
                else
                {
                    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.bytes.subarray(0, vertexCount * vertexSize));
                }

                gl.drawArrays(this.topology, 0, vertexCount);
            }

            this.vertexCount = 0;

            this.emit(Events.AFTER_FLUSH, this, isPostFlush);

            this.onAfterFlush(isPostFlush);
        }

        return this;
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called every time the Pipeline Manager makes this the active pipeline. It is called
     * at the end of the `WebGLPipeline.bind` method, after the current shader has been set. The current
     * shader is passed to this hook.
     *
     * For example, if a display list has 3 Sprites in it that all use the same pipeline, this hook will
     * only be called for the first one, as the 2nd and 3rd Sprites do not cause the pipeline to be changed.
     *
     * If you need to listen for that event instead, use the `onBind` hook.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onActive
     * @since 3.50.0
     *
     * @param {Phaser.Renderer.WebGL.WebGLShader} currentShader - The shader that was set as current.
     */
    onActive: function ()
    {
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called every time a **Game Object** asks the Pipeline Manager to use this pipeline,
     * even if the pipeline is already active.
     *
     * Unlike the `onActive` method, which is only called when the Pipeline Manager makes this pipeline
     * active, this hook is called for every Game Object that requests use of this pipeline, allowing you to
     * perform per-object set-up, such as loading shader uniform data.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onBind
     * @since 3.50.0
     *
     * @param {Phaser.GameObjects.GameObject} [gameObject] - The Game Object that invoked this pipeline, if any.
     */
    onBind: function ()
    {
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called when the Pipeline Manager needs to rebind this pipeline. This happens after a
     * pipeline has been cleared, usually when passing control over to a 3rd party WebGL library, like Spine,
     * and then returing to Phaser again.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onRebind
     * @since 3.50.0
     */
    onRebind: function ()
    {
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called every time the `batchQuad` or `batchTri` methods are called. If this was
     * as a result of a Game Object, then the Game Object reference is passed to this hook too.
     *
     * This hook is called _after_ the quad (or tri) has been added to the batch, so you can safely
     * call 'flush' from within this.
     *
     * Note that Game Objects may call `batchQuad` or `batchTri` multiple times for a single draw,
     * for example the Graphics Game Object.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onBatch
     * @since 3.50.0
     *
     * @param {Phaser.GameObjects.GameObject} [gameObject] - The Game Object that invoked this pipeline, if any.
     */
    onBatch: function ()
    {
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called immediately before a **Game Object** is about to add itself to the batch.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onPreBatch
     * @since 3.50.0
     *
     * @param {Phaser.GameObjects.GameObject} [gameObject] - The Game Object that invoked this pipeline, if any.
     */
    onPreBatch: function ()
    {
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called immediately after a **Game Object** has been added to the batch.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onPostBatch
     * @since 3.50.0
     *
     * @param {Phaser.GameObjects.GameObject} [gameObject] - The Game Object that invoked this pipeline, if any.
     */
    onPostBatch: function ()
    {
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called once per frame, right before anything has been rendered, but after the canvas
     * has been cleared. If this pipeline has a render target, it will also have been cleared by this point.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onPreRender
     * @since 3.50.0
     */
    onPreRender: function ()
    {
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called _once per frame_, by every Camera in a Scene that wants to render.
     *
     * It is called at the start of the rendering process, before anything has been drawn to the Camera.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onRender
     * @since 3.50.0
     *
     * @param {Phaser.Scene} scene - The Scene being rendered.
     * @param {Phaser.Cameras.Scene2D.Camera} camera - The Scene Camera being rendered with.
     */
    onRender: function ()
    {
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called _once per frame_, after all rendering has happened and snapshots have been taken.
     *
     * It is called at the very end of the rendering process, once all Cameras, for all Scenes, have
     * been rendered.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onPostRender
     * @since 3.50.0
     */
    onPostRender: function ()
    {
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called every time this pipeline is asked to flush its batch.
     *
     * It is called immediately before the `gl.bufferData` and `gl.drawArrays` calls are made, so you can
     * perform any final pre-render modifications. To apply changes post-render, see `onAfterFlush`.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onBeforeFlush
     * @since 3.50.0
     *
     * @param {boolean} [isPostFlush=false] - Was this flush invoked as part of a post-process, or not?
     */
    onBeforeFlush: function ()
    {
    },

    /**
     * By default this is an empty method hook that you can override and use in your own custom pipelines.
     *
     * This method is called immediately after this pipeline has finished flushing its batch.
     *
     * It is called after the `gl.drawArrays` call.
     *
     * You can perform additional post-render effects, but be careful not to call `flush`
     * on this pipeline from within this method, or you'll cause an infinite loop.
     *
     * To apply changes pre-render, see `onBeforeFlush`.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#onAfterFlush
     * @since 3.50.0
     *
     * @param {boolean} [isPostFlush=false] - Was this flush invoked as part of a post-process, or not?
     */
    onAfterFlush: function ()
    {
    },

    /**
     * Adds a single vertex to the current vertex buffer and increments the
     * `vertexCount` property by 1.
     *
     * This method is called directly by `batchTri` and `batchQuad`.
     *
     * It does not perform any batch limit checking itself, so if you need to call
     * this method directly, do so in the same way that `batchQuad` does, for example.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#batchVert
     * @since 3.50.0
     *
     * @param {number} x - The vertex x position.
     * @param {number} y - The vertex y position.
     * @param {number} u - UV u value.
     * @param {number} v - UV v value.
     * @param {number} unit - Texture unit to which the texture needs to be bound.
     * @param {(number|boolean)} tintEffect - The tint effect for the shader to use.
     * @param {number} tint - The tint color value.
     */
    batchVert: function (x, y, u, v, unit, tintEffect, tint)
    {
        var vertexViewF32 = this.vertexViewF32;
        var vertexViewU32 = this.vertexViewU32;

        var vertexOffset = (this.vertexCount * this.currentShader.vertexComponentCount) - 1;

        vertexViewF32[++vertexOffset] = x;
        vertexViewF32[++vertexOffset] = y;
        vertexViewF32[++vertexOffset] = u;
        vertexViewF32[++vertexOffset] = v;
        vertexViewF32[++vertexOffset] = unit;
        vertexViewF32[++vertexOffset] = tintEffect;
        vertexViewU32[++vertexOffset] = tint;

        this.vertexCount++;
    },

    /**
     * Adds the vertices data into the batch and flushes if full.
     *
     * Assumes 6 vertices in the following arrangement:
     *
     * ```
     * 0----3
     * |\  B|
     * | \  |
     * |  \ |
     * | A \|
     * |    \
     * 1----2
     * ```
     *
     * Where tx0/ty0 = 0, tx1/ty1 = 1, tx2/ty2 = 2 and tx3/ty3 = 3
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#batchQuad
     * @since 3.50.0
     *
     * @param {(Phaser.GameObjects.GameObject|null)} gameObject - The Game Object, if any, drawing this quad.
     * @param {number} x0 - The top-left x position.
     * @param {number} y0 - The top-left y position.
     * @param {number} x1 - The bottom-left x position.
     * @param {number} y1 - The bottom-left y position.
     * @param {number} x2 - The bottom-right x position.
     * @param {number} y2 - The bottom-right y position.
     * @param {number} x3 - The top-right x position.
     * @param {number} y3 - The top-right y position.
     * @param {number} u0 - UV u0 value.
     * @param {number} v0 - UV v0 value.
     * @param {number} u1 - UV u1 value.
     * @param {number} v1 - UV v1 value.
     * @param {number} tintTL - The top-left tint color value.
     * @param {number} tintTR - The top-right tint color value.
     * @param {number} tintBL - The bottom-left tint color value.
     * @param {number} tintBR - The bottom-right tint color value.
     * @param {(number|boolean)} tintEffect - The tint effect for the shader to use.
     * @param {WebGLTexture} [texture] - WebGLTexture that will be assigned to the current batch if a flush occurs.
     * @param {number} [unit=0] - Texture unit to which the texture needs to be bound.
     *
     * @return {boolean} `true` if this method caused the batch to flush, otherwise `false`.
     */
    batchQuad: function (gameObject, x0, y0, x1, y1, x2, y2, x3, y3, u0, v0, u1, v1, tintTL, tintTR, tintBL, tintBR, tintEffect, texture, unit)
    {
        if (unit === undefined) { unit = this.currentUnit; }

        var hasFlushed = false;

        if (this.shouldFlush(6))
        {
            this.flush();

            hasFlushed = true;

            unit = this.setTexture2D(texture);
        }

        this.batchVert(x0, y0, u0, v0, unit, tintEffect, tintTL);
        this.batchVert(x1, y1, u0, v1, unit, tintEffect, tintBL);
        this.batchVert(x2, y2, u1, v1, unit, tintEffect, tintBR);
        this.batchVert(x0, y0, u0, v0, unit, tintEffect, tintTL);
        this.batchVert(x2, y2, u1, v1, unit, tintEffect, tintBR);
        this.batchVert(x3, y3, u1, v0, unit, tintEffect, tintTR);

        this.onBatch(gameObject);

        return hasFlushed;
    },

    /**
     * Adds the vertices data into the batch and flushes if full.
     *
     * Assumes 3 vertices in the following arrangement:
     *
     * ```
     * 0
     * |\
     * | \
     * |  \
     * |   \
     * |    \
     * 1-----2
     * ```
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#batchTri
     * @since 3.50.0
     *
     * @param {(Phaser.GameObjects.GameObject|null)} gameObject - The Game Object, if any, drawing this quad.
     * @param {number} x1 - The bottom-left x position.
     * @param {number} y1 - The bottom-left y position.
     * @param {number} x2 - The bottom-right x position.
     * @param {number} y2 - The bottom-right y position.
     * @param {number} x3 - The top-right x position.
     * @param {number} y3 - The top-right y position.
     * @param {number} u0 - UV u0 value.
     * @param {number} v0 - UV v0 value.
     * @param {number} u1 - UV u1 value.
     * @param {number} v1 - UV v1 value.
     * @param {number} tintTL - The top-left tint color value.
     * @param {number} tintTR - The top-right tint color value.
     * @param {number} tintBL - The bottom-left tint color value.
     * @param {(number|boolean)} tintEffect - The tint effect for the shader to use.
     * @param {WebGLTexture} [texture] - WebGLTexture that will be assigned to the current batch if a flush occurs.
     * @param {number} [unit=0] - Texture unit to which the texture needs to be bound.
     *
     * @return {boolean} `true` if this method caused the batch to flush, otherwise `false`.
     */
    batchTri: function (gameObject, x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, tintTL, tintTR, tintBL, tintEffect, texture, unit)
    {
        if (unit === undefined) { unit = this.currentUnit; }

        var hasFlushed = false;

        if (this.shouldFlush(3))
        {
            this.flush();

            hasFlushed = true;

            unit = this.setTexture2D(texture);
        }

        this.batchVert(x0, y0, u0, v0, unit, tintEffect, tintTL);
        this.batchVert(x1, y1, u0, v1, unit, tintEffect, tintTR);
        this.batchVert(x2, y2, u1, v1, unit, tintEffect, tintBL);

        this.onBatch(gameObject);

        return hasFlushed;
    },

    /**
     * Pushes a filled rectangle into the vertex batch.
     *
     * The dimensions are run through `Math.floor` before the quad is generated.
     *
     * Rectangle has no transform values and isn't transformed into the local space.
     *
     * Used for directly batching untransformed rectangles, such as Camera background colors.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#drawFillRect
     * @since 3.50.0
     *
     * @param {number} x - Horizontal top left coordinate of the rectangle.
     * @param {number} y - Vertical top left coordinate of the rectangle.
     * @param {number} width - Width of the rectangle.
     * @param {number} height - Height of the rectangle.
     * @param {number} color - Color of the rectangle to draw.
     * @param {number} alpha - Alpha value of the rectangle to draw.
     * @param {WebGLTexture} [texture] - WebGLTexture that will be assigned to the current batch if a flush occurs.
     * @param {boolean} [flipUV=true] - Flip the vertical UV coordinates of the texture before rendering?
     */
    drawFillRect: function (x, y, width, height, color, alpha, texture, flipUV)
    {
        if (texture === undefined) { texture = this.renderer.whiteTexture.glTexture; }
        if (flipUV === undefined) { flipUV = true; }

        x = Math.floor(x);
        y = Math.floor(y);

        var xw = Math.floor(x + width);
        var yh = Math.floor(y + height);

        var unit = this.setTexture2D(texture);

        var tint = Utils.getTintAppendFloatAlphaAndSwap(color, alpha);

        var u0 = 0;
        var v0 = 0;
        var u1 = 1;
        var v1 = 1;

        if (flipUV)
        {
            v0 = 1;
            v1 = 0;
        }

        this.batchQuad(null, x, y, x, yh, xw, yh, xw, y, u0, v0, u1, v1, tint, tint, tint, tint, 0, texture, unit);
    },

    /**
     * Sets the texture to be bound to the next available texture unit and returns
     * the unit id.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#setTexture2D
     * @since 3.50.0
     *
     * @param {WebGLTexture} [texture] - WebGLTexture that will be assigned to the current batch. If not given uses `whiteTexture`.
     *
     * @return {number} The assigned texture unit.
     */
    setTexture2D: function (texture)
    {
        if (texture === undefined) { texture = this.renderer.whiteTexture.glTexture; }

        this.currentUnit = this.renderer.setTexture2D(texture);

        return this.currentUnit;
    },

    /**
     * Activates the given WebGL Texture and binds it to the requested texture slot.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#bindTexture
     * @since 3.50.0
     *
     * @param {WebGLTexture} [target] - The WebGLTexture to activate and bind.
     * @param {number} [unit=0] - The WebGL texture ID to activate. Defaults to `gl.TEXTURE0`.
     *
     * @return {this} This WebGL Pipeline instance.
     */
    bindTexture: function (texture, unit)
    {
        if (unit === undefined) { unit = 0; }

        var gl = this.gl;

        gl.activeTexture(gl.TEXTURE0 + unit);

        gl.bindTexture(gl.TEXTURE_2D, texture);

        return this;
    },

    /**
     * Activates the given Render Target texture and binds it to the
     * requested WebGL texture slot.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#bindRenderTarget
     * @since 3.50.0
     *
     * @param {Phaser.Renderer.WebGL.RenderTarget} [target] - The Render Target to activate and bind.
     * @param {number} [unit=0] - The WebGL texture ID to activate. Defaults to `gl.TEXTURE0`.
     *
     * @return {this} This WebGL Pipeline instance.
     */
    bindRenderTarget: function (target, unit)
    {
        return this.bindTexture(target.texture, unit);
    },

    /**
     * Sets the current duration into a 1f uniform value based on the given name.
     *
     * This can be used for mapping time uniform values, such as `iTime`.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#setTime
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     *
     * @return {this} This WebGLPipeline instance.
     */
    setTime: function (uniform)
    {
        this.set1f(uniform, this.game.loop.getDuration());

        return this;
    },

    /**
     * Sets a 1f uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set1f
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number} x - The new value of the `float` uniform.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set1f: function (name, x, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set1f(name, x);

        return this;
    },

    /**
     * Sets a 2f uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set2f
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number} x - The new X component of the `vec2` uniform.
     * @param {number} y - The new Y component of the `vec2` uniform.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set2f: function (name, x, y, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set2f(name, x, y);

        return this;
    },

    /**
     * Sets a 3f uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set3f
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number} x - The new X component of the `vec3` uniform.
     * @param {number} y - The new Y component of the `vec3` uniform.
     * @param {number} z - The new Z component of the `vec3` uniform.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set3f: function (name, x, y, z, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set3f(name, x, y, z);

        return this;
    },

    /**
     * Sets a 4f uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set4f
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number} x - X component of the uniform
     * @param {number} y - Y component of the uniform
     * @param {number} z - Z component of the uniform
     * @param {number} w - W component of the uniform
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set4f: function (name, x, y, z, w, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set4f(name, x, y, z, w);

        return this;
    },

    /**
     * Sets a 1fv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set1fv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number[]|Float32Array} arr - The new value to be used for the uniform variable.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set1fv: function (name, arr, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set1fv(name, arr);

        return this;
    },

    /**
     * Sets a 2fv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set2fv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number[]|Float32Array} arr - The new value to be used for the uniform variable.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set2fv: function (name, arr, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set2fv(name, arr);

        return this;
    },

    /**
     * Sets a 3fv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set3fv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number[]|Float32Array} arr - The new value to be used for the uniform variable.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set3fv: function (name, arr, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set3fv(name, arr);

        return this;
    },

    /**
     * Sets a 4fv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set4fv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number[]|Float32Array} arr - The new value to be used for the uniform variable.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set4fv: function (name, arr, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set4fv(name, arr);

        return this;
    },

    /**
     * Sets a 1iv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set1iv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number[]|Float32Array} arr - The new value to be used for the uniform variable.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set1iv: function (name, arr, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set1iv(name, arr);

        return this;
    },

    /**
     * Sets a 2iv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set2iv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number[]|Float32Array} arr - The new value to be used for the uniform variable.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set2iv: function (name, arr, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set2iv(name, arr);

        return this;
    },

    /**
     * Sets a 3iv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set3iv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number[]|Float32Array} arr - The new value to be used for the uniform variable.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set3iv: function (name, arr, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set3iv(name, arr);

        return this;
    },

    /**
     * Sets a 4iv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set4iv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number[]|Float32Array} arr - The new value to be used for the uniform variable.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set4iv: function (name, arr, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set4iv(name, arr);

        return this;
    },

    /**
     * Sets a 1i uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set1i
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number} x - The new value of the `int` uniform.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set1i: function (name, x, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set1i(name, x);

        return this;
    },

    /**
     * Sets a 2i uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set2i
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number} x - The new X component of the `ivec2` uniform.
     * @param {number} y - The new Y component of the `ivec2` uniform.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set2i: function (name, x, y, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set2i(name, x, y);

        return this;
    },

    /**
     * Sets a 3i uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set3i
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number} x - The new X component of the `ivec3` uniform.
     * @param {number} y - The new Y component of the `ivec3` uniform.
     * @param {number} z - The new Z component of the `ivec3` uniform.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set3i: function (name, x, y, z, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set3i(name, x, y, z);

        return this;
    },

    /**
     * Sets a 4i uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#set4i
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {number} x - X component of the uniform.
     * @param {number} y - Y component of the uniform.
     * @param {number} z - Z component of the uniform.
     * @param {number} w - W component of the uniform.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    set4i: function (name, x, y, z, w, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.set4i(name, x, y, z, w);

        return this;
    },

    /**
     * Sets a matrix 2fv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#setMatrix2fv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {boolean} transpose - Whether to transpose the matrix. Should be `false`.
     * @param {number[]|Float32Array} matrix - The new values for the `mat2` uniform.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    setMatrix2fv: function (name, transpose, matrix, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.setMatrix2fv(name, transpose, matrix);

        return this;
    },

    /**
     * Sets a matrix 3fv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#setMatrix3fv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {boolean} transpose - Whether to transpose the matrix. Should be `false`.
     * @param {Float32Array} matrix - The new values for the `mat3` uniform.
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    setMatrix3fv: function (name, transpose, matrix, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.setMatrix3fv(name, transpose, matrix);

        return this;
    },

    /**
     * Sets a matrix 4fv uniform value based on the given name on the currently set shader.
     *
     * The current shader is bound, before the uniform is set, making it active within the
     * WebGLRenderer. This means you can safely call this method from a location such as
     * a Scene `create` or `update` method. However, when working within a Shader file
     * directly, use the `WebGLShader` method equivalent instead, to avoid the program
     * being set.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#setMatrix4fv
     * @since 3.50.0
     *
     * @param {string} name - The name of the uniform to set.
     * @param {boolean} transpose - Should the matrix be transpose
     * @param {Float32Array} matrix - Matrix data
     * @param {Phaser.Renderer.WebGL.WebGLShader} [shader] - The shader to set the value on. If not given, the `currentShader` is used.
     *
     * @return {this} This WebGLPipeline instance.
     */
    setMatrix4fv: function (name, transpose, matrix, shader)
    {
        if (shader === undefined) { shader = this.currentShader; }

        shader.setMatrix4fv(name, transpose, matrix);

        return this;
    },

    /**
     * Destroys all shader instances, removes all object references and nulls all external references.
     *
     * @method Phaser.Renderer.WebGL.WebGLPipeline#destroy
     * @fires Phaser.Renderer.WebGL.Pipelines.Events#DESTROY
     * @since 3.0.0
     *
     * @return {this} This WebGLPipeline instance.
     */
    destroy: function ()
    {
        this.emit(Events.DESTROY, this);

        var i;

        var shaders = this.shaders;

        for (i = 0; i < shaders.length; i++)
        {
            shaders[i].destroy();
        }

        var targets = this.renderTargets;

        for (i = 0; i < targets.length; i++)
        {
            targets[i].destroy();
        }

        this.gl.deleteBuffer(this.vertexBuffer);

        var renderer = this.renderer;

        renderer.off(RendererEvents.RESIZE, this.resize, this);
        renderer.off(RendererEvents.PRE_RENDER, this.onPreRender, this);
        renderer.off(RendererEvents.RENDER, this.onRender, this);
        renderer.off(RendererEvents.POST_RENDER, this.onPostRender, this);

        this.removeAllListeners();

        this.game = null;
        this.renderer = null;
        this.manager = null;
        this.gl = null;
        this.view = null;
        this.shaders = null;
        this.renderTargets = null;
        this.bytes = null;
        this.vertexViewF32 = null;
        this.vertexViewU32 = null;
        this.vertexData = null;
        this.vertexBuffer = null;
        this.currentShader = null;
        this.currentRenderTarget = null;

        return this;
    }

});

module.exports = WebGLPipeline;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Sets the strokeStyle and lineWidth on the target context based on the given Shape.
 *
 * @method Phaser.GameObjects.Shape#LineStyleCanvas
 * @since 3.13.0
 * @private
 *
 * @param {CanvasRenderingContext2D} ctx - The context to set the stroke style on.
 * @param {Phaser.GameObjects.Shape} src - The Game Object to set the stroke style from.
 * @param {number} [altColor] - An alternative color to render with.
 * @param {number} [altAlpha] - An alternative alpha to render with.
 */
var LineStyleCanvas = function (ctx, src, altColor, altAlpha)
{
    var strokeColor = (altColor) ? altColor : src.strokeColor;
    var strokeAlpha = (altAlpha) ? altAlpha : src.strokeAlpha;

    var red = ((strokeColor & 0xFF0000) >>> 16);
    var green = ((strokeColor & 0xFF00) >>> 8);
    var blue = (strokeColor & 0xFF);

    ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
    ctx.lineWidth = src.lineWidth;
};

module.exports = LineStyleCanvas;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var CONST = __webpack_require__(21);
var File = __webpack_require__(23);
var FileTypesManager = __webpack_require__(8);
var GetFastValue = __webpack_require__(2);
var GetValue = __webpack_require__(6);
var IsPlainObject = __webpack_require__(7);

/**
 * @classdesc
 * A single JSON File suitable for loading by the Loader.
 *
 * These are created when you use the Phaser.Loader.LoaderPlugin#json method and are not typically created directly.
 *
 * For documentation about what all the arguments and configuration options mean please see Phaser.Loader.LoaderPlugin#json.
 *
 * @class JSONFile
 * @extends Phaser.Loader.File
 * @memberof Phaser.Loader.FileTypes
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Loader.LoaderPlugin} loader - A reference to the Loader that is responsible for this file.
 * @param {(string|Phaser.Types.Loader.FileTypes.JSONFileConfig)} key - The key to use for this file, or a file configuration object.
 * @param {(object|string)} [url] - The absolute or relative URL to load this file from. If undefined or `null` it will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json". Or, can be a fully formed JSON Object.
 * @param {Phaser.Types.Loader.XHRSettingsObject} [xhrSettings] - Extra XHR Settings specifically for this file.
 * @param {string} [dataKey] - When the JSON file loads only this property will be stored in the Cache.
 */
var JSONFile = new Class({

    Extends: File,

    initialize:

    //  url can either be a string, in which case it is treated like a proper url, or an object, in which case it is treated as a ready-made JS Object
    //  dataKey allows you to pluck a specific object out of the JSON and put just that into the cache, rather than the whole thing

    function JSONFile (loader, key, url, xhrSettings, dataKey)
    {
        var extension = 'json';

        if (IsPlainObject(key))
        {
            var config = key;

            key = GetFastValue(config, 'key');
            url = GetFastValue(config, 'url');
            xhrSettings = GetFastValue(config, 'xhrSettings');
            extension = GetFastValue(config, 'extension', extension);
            dataKey = GetFastValue(config, 'dataKey', dataKey);
        }

        var fileConfig = {
            type: 'json',
            cache: loader.cacheManager.json,
            extension: extension,
            responseType: 'text',
            key: key,
            url: url,
            xhrSettings: xhrSettings,
            config: dataKey
        };

        File.call(this, loader, fileConfig);

        if (IsPlainObject(url))
        {
            //  Object provided instead of a URL, so no need to actually load it (populate data with value)
            if (dataKey)
            {
                this.data = GetValue(url, dataKey);
            }
            else
            {
                this.data = url;
            }

            this.state = CONST.FILE_POPULATED;
        }
    },

    /**
     * Called automatically by Loader.nextFile.
     * This method controls what extra work this File does with its loaded data.
     *
     * @method Phaser.Loader.FileTypes.JSONFile#onProcess
     * @since 3.7.0
     */
    onProcess: function ()
    {
        if (this.state !== CONST.FILE_POPULATED)
        {
            this.state = CONST.FILE_PROCESSING;

            try
            {
                var json = JSON.parse(this.xhrLoader.responseText);
            }
            catch (e)
            {
                console.warn('Invalid JSON: ' + this.key);

                this.onProcessError();

                throw e;
            }

            var key = this.config;

            if (typeof key === 'string')
            {
                this.data = GetValue(json, key, json);
            }
            else
            {
                this.data = json;
            }
        }

        this.onProcessComplete();
    }

});

/**
 * Adds a JSON file, or array of JSON files, to the current load queue.
 *
 * You can call this method from within your Scene's `preload`, along with any other files you wish to load:
 *
 * ```javascript
 * function preload ()
 * {
 *     this.load.json('wavedata', 'files/AlienWaveData.json');
 * }
 * ```
 *
 * The file is **not** loaded right away. It is added to a queue ready to be loaded either when the loader starts,
 * or if it's already running, when the next free load slot becomes available. This happens automatically if you
 * are calling this from within the Scene's `preload` method, or a related callback. Because the file is queued
 * it means you cannot use the file immediately after calling this method, but must wait for the file to complete.
 * The typical flow for a Phaser Scene is that you load assets in the Scene's `preload` method and then when the
 * Scene's `create` method is called you are guaranteed that all of those assets are ready for use and have been
 * loaded.
 *
 * The key must be a unique String. It is used to add the file to the global JSON Cache upon a successful load.
 * The key should be unique both in terms of files being loaded and files already present in the JSON Cache.
 * Loading a file using a key that is already taken will result in a warning. If you wish to replace an existing file
 * then remove it from the JSON Cache first, before loading a new one.
 *
 * Instead of passing arguments you can pass a configuration object, such as:
 *
 * ```javascript
 * this.load.json({
 *     key: 'wavedata',
 *     url: 'files/AlienWaveData.json'
 * });
 * ```
 *
 * See the documentation for `Phaser.Types.Loader.FileTypes.JSONFileConfig` for more details.
 *
 * Once the file has finished loading you can access it from its Cache using its key:
 *
 * ```javascript
 * this.load.json('wavedata', 'files/AlienWaveData.json');
 * // and later in your game ...
 * var data = this.cache.json.get('wavedata');
 * ```
 *
 * If you have specified a prefix in the loader, via `Loader.setPrefix` then this value will be prepended to this files
 * key. For example, if the prefix was `LEVEL1.` and the key was `Waves` the final key will be `LEVEL1.Waves` and
 * this is what you would use to retrieve the text from the JSON Cache.
 *
 * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
 *
 * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "data"
 * and no URL is given then the Loader will set the URL to be "data.json". It will always add `.json` as the extension, although
 * this can be overridden if using an object instead of method arguments. If you do not desire this action then provide a URL.
 *
 * You can also optionally provide a `dataKey` to use. This allows you to extract only a part of the JSON and store it in the Cache,
 * rather than the whole file. For example, if your JSON data had a structure like this:
 *
 * ```json
 * {
 *     "level1": {
 *         "baddies": {
 *             "aliens": {},
 *             "boss": {}
 *         }
 *     },
 *     "level2": {},
 *     "level3": {}
 * }
 * ```
 *
 * And you only wanted to store the `boss` data in the Cache, then you could pass `level1.baddies.boss`as the `dataKey`.
 *
 * Note: The ability to load this type of file will only be available if the JSON File type has been built into Phaser.
 * It is available in the default build but can be excluded from custom builds.
 *
 * @method Phaser.Loader.LoaderPlugin#json
 * @fires Phaser.Loader.LoaderPlugin#ADD
 * @since 3.0.0
 *
 * @param {(string|Phaser.Types.Loader.FileTypes.JSONFileConfig|Phaser.Types.Loader.FileTypes.JSONFileConfig[])} key - The key to use for this file, or a file configuration object, or array of them.
 * @param {(object|string)} [url] - The absolute or relative URL to load this file from. If undefined or `null` it will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json". Or, can be a fully formed JSON Object.
 * @param {string} [dataKey] - When the JSON file loads only this property will be stored in the Cache.
 * @param {Phaser.Types.Loader.XHRSettingsObject} [xhrSettings] - An XHR Settings configuration object. Used in replacement of the Loaders default XHR Settings.
 *
 * @return {this} The Loader instance.
 */
FileTypesManager.register('json', function (key, url, dataKey, xhrSettings)
{
    if (Array.isArray(key))
    {
        for (var i = 0; i < key.length; i++)
        {
            //  If it's an array it has to be an array of Objects, so we get everything out of the 'key' object
            this.addFile(new JSONFile(this, key[i]));
        }
    }
    else
    {
        this.addFile(new JSONFile(this, key, url, xhrSettings, dataKey));
    }

    return this;
});

module.exports = JSONFile;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Arcade Physics consts.
 *
 * @ignore
 */

var CONST = {

    /**
     * Dynamic Body.
     *
     * @name Phaser.Physics.Arcade.DYNAMIC_BODY
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#physicsType
     * @see Phaser.Physics.Arcade.Group#physicsType
     */
    DYNAMIC_BODY: 0,

    /**
     * Static Body.
     *
     * @name Phaser.Physics.Arcade.STATIC_BODY
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#physicsType
     * @see Phaser.Physics.Arcade.StaticBody#physicsType
     */
    STATIC_BODY: 1,

    /**
     * Arcade Physics Group containing Dynamic Bodies.
     *
     * @name Phaser.Physics.Arcade.GROUP
     * @readonly
     * @type {number}
     * @since 3.0.0
     */
    GROUP: 2,

    /**
     * A Tilemap Layer.
     *
     * @name Phaser.Physics.Arcade.TILEMAPLAYER
     * @readonly
     * @type {number}
     * @since 3.0.0
     */
    TILEMAPLAYER: 3,

    /**
     * Facing no direction (initial value).
     *
     * @name Phaser.Physics.Arcade.FACING_NONE
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#facing
     */
    FACING_NONE: 10,

    /**
     * Facing up.
     *
     * @name Phaser.Physics.Arcade.FACING_UP
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#facing
     */
    FACING_UP: 11,

    /**
     * Facing down.
     *
     * @name Phaser.Physics.Arcade.FACING_DOWN
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#facing
     */
    FACING_DOWN: 12,

    /**
     * Facing left.
     *
     * @name Phaser.Physics.Arcade.FACING_LEFT
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#facing
     */
    FACING_LEFT: 13,

    /**
     * Facing right.
     *
     * @name Phaser.Physics.Arcade.FACING_RIGHT
     * @readonly
     * @type {number}
     * @since 3.0.0
     *
     * @see Phaser.Physics.Arcade.Body#facing
     */
    FACING_RIGHT: 14

};

module.exports = CONST;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var GetTileAt = __webpack_require__(158);
var GetTilesWithin = __webpack_require__(26);

/**
 * Calculates interesting faces within the rectangular area specified (in tile coordinates) of the
 * layer. Interesting faces are used internally for optimizing collisions against tiles. This method
 * is mostly used internally.
 *
 * @function Phaser.Tilemaps.Components.CalculateFacesWithin
 * @since 3.0.0
 *
 * @param {number} tileX - The left most tile index (in tile coordinates) to use as the origin of the area.
 * @param {number} tileY - The top most tile index (in tile coordinates) to use as the origin of the area.
 * @param {number} width - How many tiles wide from the `tileX` index the area will be.
 * @param {number} height - How many tiles tall from the `tileY` index the area will be.
 * @param {Phaser.Tilemaps.LayerData} layer - The Tilemap Layer to act upon.
 */
var CalculateFacesWithin = function (tileX, tileY, width, height, layer)
{
    var above = null;
    var below = null;
    var left = null;
    var right = null;

    var tiles = GetTilesWithin(tileX, tileY, width, height, null, layer);

    for (var i = 0; i < tiles.length; i++)
    {
        var tile = tiles[i];

        if (tile)
        {
            if (tile.collides)
            {
                above = GetTileAt(tile.x, tile.y - 1, true, layer);
                below = GetTileAt(tile.x, tile.y + 1, true, layer);
                left = GetTileAt(tile.x - 1, tile.y, true, layer);
                right = GetTileAt(tile.x + 1, tile.y, true, layer);

                tile.faceTop = (above && above.collides) ? false : true;
                tile.faceBottom = (below && below.collides) ? false : true;
                tile.faceLeft = (left && left.collides) ? false : true;
                tile.faceRight = (right && right.collides) ? false : true;
            }
            else
            {
                tile.resetFaces();
            }
        }
    }
};

module.exports = CalculateFacesWithin;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/**
* The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
* A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
* A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vertices
*/

var Vertices = {};

module.exports = Vertices;

var Vector = __webpack_require__(84);
var Common = __webpack_require__(32);

(function() {

    /**
     * Creates a new set of `Matter.Body` compatible vertices.
     * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
     * but with some additional references required for efficient collision detection routines.
     *
     * Vertices must be specified in clockwise order.
     *
     * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
     *
     * @method create
     * @param {vector[]} points
     * @param {body} body
     */
    Vertices.create = function(points, body) {
        var vertices = [];

        for (var i = 0; i < points.length; i++) {
            var point = points[i],
                vertex = {
                    x: point.x,
                    y: point.y,
                    index: i,
                    body: body,
                    isInternal: false,
                    contact: null,
                    offset: null
                };

            vertex.contact = {
                vertex: vertex,
                normalImpulse: 0,
                tangentImpulse: 0
            };

            vertices.push(vertex);
        }

        return vertices;
    };

    /**
     * Parses a string containing ordered x y pairs separated by spaces (and optionally commas), 
     * into a `Matter.Vertices` object for the given `Matter.Body`.
     * For parsing SVG paths, see `Svg.pathToVertices`.
     * @method fromPath
     * @param {string} path
     * @param {body} body
     * @return {vertices} vertices
     */
    Vertices.fromPath = function(path, body) {
        var pathPattern = /L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,
            points = [];

        path.replace(pathPattern, function(match, x, y) {
            points.push({ x: parseFloat(x), y: parseFloat(y) });
        });

        return Vertices.create(points, body);
    };

    /**
     * Returns the centre (centroid) of the set of vertices.
     * @method centre
     * @param {vertices} vertices
     * @return {vector} The centre point
     */
    Vertices.centre = function(vertices) {
        var area = Vertices.area(vertices, true),
            centre = { x: 0, y: 0 },
            cross,
            temp,
            j;

        for (var i = 0; i < vertices.length; i++) {
            j = (i + 1) % vertices.length;
            cross = Vector.cross(vertices[i], vertices[j]);
            temp = Vector.mult(Vector.add(vertices[i], vertices[j]), cross);
            centre = Vector.add(centre, temp);
        }

        return Vector.div(centre, 6 * area);
    };

    /**
     * Returns the average (mean) of the set of vertices.
     * @method mean
     * @param {vertices} vertices
     * @return {vector} The average point
     */
    Vertices.mean = function(vertices) {
        var average = { x: 0, y: 0 };

        for (var i = 0; i < vertices.length; i++) {
            average.x += vertices[i].x;
            average.y += vertices[i].y;
        }

        return Vector.div(average, vertices.length);
    };

    /**
     * Returns the area of the set of vertices.
     * @method area
     * @param {vertices} vertices
     * @param {bool} signed
     * @return {number} The area
     */
    Vertices.area = function(vertices, signed) {
        var area = 0,
            j = vertices.length - 1;

        for (var i = 0; i < vertices.length; i++) {
            area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
            j = i;
        }

        if (signed)
            return area / 2;

        return Math.abs(area) / 2;
    };

    /**
     * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
     * @method inertia
     * @param {vertices} vertices
     * @param {number} mass
     * @return {number} The polygon's moment of inertia
     */
    Vertices.inertia = function(vertices, mass) {
        var numerator = 0,
            denominator = 0,
            v = vertices,
            cross,
            j;

        // find the polygon's moment of inertia, using second moment of area
        // from equations at http://www.physicsforums.com/showthread.php?t=25293
        for (var n = 0; n < v.length; n++) {
            j = (n + 1) % v.length;
            cross = Math.abs(Vector.cross(v[j], v[n]));
            numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
            denominator += cross;
        }

        return (mass / 6) * (numerator / denominator);
    };

    /**
     * Translates the set of vertices in-place.
     * @method translate
     * @param {vertices} vertices
     * @param {vector} vector
     * @param {number} scalar
     */
    Vertices.translate = function(vertices, vector, scalar) {
        var i;
        if (scalar) {
            for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x * scalar;
                vertices[i].y += vector.y * scalar;
            }
        } else {
            for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x;
                vertices[i].y += vector.y;
            }
        }

        return vertices;
    };

    /**
     * Rotates the set of vertices in-place.
     * @method rotate
     * @param {vertices} vertices
     * @param {number} angle
     * @param {vector} point
     */
    Vertices.rotate = function(vertices, angle, point) {
        if (angle === 0)
            return;

        var cos = Math.cos(angle),
            sin = Math.sin(angle);

        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                dx = vertice.x - point.x,
                dy = vertice.y - point.y;
                
            vertice.x = point.x + (dx * cos - dy * sin);
            vertice.y = point.y + (dx * sin + dy * cos);
        }

        return vertices;
    };

    /**
     * Returns `true` if the `point` is inside the set of `vertices`.
     * @method contains
     * @param {vertices} vertices
     * @param {vector} point
     * @return {boolean} True if the vertices contains point, otherwise false
     */
    Vertices.contains = function(vertices, point) {
        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                nextVertice = vertices[(i + 1) % vertices.length];
            if ((point.x - vertice.x) * (nextVertice.y - vertice.y) + (point.y - vertice.y) * (vertice.x - nextVertice.x) > 0) {
                return false;
            }
        }

        return true;
    };

    /**
     * Scales the vertices from a point (default is centre) in-place.
     * @method scale
     * @param {vertices} vertices
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     */
    Vertices.scale = function(vertices, scaleX, scaleY, point) {
        if (scaleX === 1 && scaleY === 1)
            return vertices;

        point = point || Vertices.centre(vertices);

        var vertex,
            delta;

        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            delta = Vector.sub(vertex, point);
            vertices[i].x = point.x + delta.x * scaleX;
            vertices[i].y = point.y + delta.y * scaleY;
        }

        return vertices;
    };

    /**
     * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
     * The radius parameter is a single number or an array to specify the radius for each vertex.
     * @method chamfer
     * @param {vertices} vertices
     * @param {number[]} radius
     * @param {number} quality
     * @param {number} qualityMin
     * @param {number} qualityMax
     */
    Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
        if (typeof radius === 'number') {
            radius = [radius];
        } else {
            radius = radius || [8];
        }

        // quality defaults to -1, which is auto
        quality = (typeof quality !== 'undefined') ? quality : -1;
        qualityMin = qualityMin || 2;
        qualityMax = qualityMax || 14;

        var newVertices = [];

        for (var i = 0; i < vertices.length; i++) {
            var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1],
                vertex = vertices[i],
                nextVertex = vertices[(i + 1) % vertices.length],
                currentRadius = radius[i < radius.length ? i : radius.length - 1];

            if (currentRadius === 0) {
                newVertices.push(vertex);
                continue;
            }

            var prevNormal = Vector.normalise({ 
                x: vertex.y - prevVertex.y, 
                y: prevVertex.x - vertex.x
            });

            var nextNormal = Vector.normalise({ 
                x: nextVertex.y - vertex.y, 
                y: vertex.x - nextVertex.x
            });

            var diagonalRadius = Math.sqrt(2 * Math.pow(currentRadius, 2)),
                radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius),
                midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)),
                scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));

            var precision = quality;

            if (quality === -1) {
                // automatically decide precision
                precision = Math.pow(currentRadius, 0.32) * 1.75;
            }

            precision = Common.clamp(precision, qualityMin, qualityMax);

            // use an even value for precision, more likely to reduce axes by using symmetry
            if (precision % 2 === 1)
                precision += 1;

            var alpha = Math.acos(Vector.dot(prevNormal, nextNormal)),
                theta = alpha / precision;

            for (var j = 0; j < precision; j++) {
                newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
            }
        }

        return newVertices;
    };

    /**
     * Sorts the input vertices into clockwise order in place.
     * @method clockwiseSort
     * @param {vertices} vertices
     * @return {vertices} vertices
     */
    Vertices.clockwiseSort = function(vertices) {
        var centre = Vertices.mean(vertices);

        vertices.sort(function(vertexA, vertexB) {
            return Vector.angle(centre, vertexA) - Vector.angle(centre, vertexB);
        });

        return vertices;
    };

    /**
     * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
     * @method isConvex
     * @param {vertices} vertices
     * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
     */
    Vertices.isConvex = function(vertices) {
        // http://paulbourke.net/geometry/polygonmesh/
        // Copyright (c) Paul Bourke (use permitted)

        var flag = 0,
            n = vertices.length,
            i,
            j,
            k,
            z;

        if (n < 3)
            return null;

        for (i = 0; i < n; i++) {
            j = (i + 1) % n;
            k = (i + 2) % n;
            z = (vertices[j].x - vertices[i].x) * (vertices[k].y - vertices[j].y);
            z -= (vertices[j].y - vertices[i].y) * (vertices[k].x - vertices[j].x);

            if (z < 0) {
                flag |= 1;
            } else if (z > 0) {
                flag |= 2;
            }

            if (flag === 3) {
                return false;
            }
        }

        if (flag !== 0){
            return true;
        } else {
            return null;
        }
    };

    /**
     * Returns the convex hull of the input vertices as a new array of points.
     * @method hull
     * @param {vertices} vertices
     * @return [vertex] vertices
     */
    Vertices.hull = function(vertices) {
        // http://geomalgorithms.com/a10-_hull-1.html

        var upper = [],
            lower = [], 
            vertex,
            i;

        // sort vertices on x-axis (y-axis for ties)
        vertices = vertices.slice(0);
        vertices.sort(function(vertexA, vertexB) {
            var dx = vertexA.x - vertexB.x;
            return dx !== 0 ? dx : vertexA.y - vertexB.y;
        });

        // build lower hull
        for (i = 0; i < vertices.length; i += 1) {
            vertex = vertices[i];

            while (lower.length >= 2 
                   && Vector.cross3(lower[lower.length - 2], lower[lower.length - 1], vertex) <= 0) {
                lower.pop();
            }

            lower.push(vertex);
        }

        // build upper hull
        for (i = vertices.length - 1; i >= 0; i -= 1) {
            vertex = vertices[i];

            while (upper.length >= 2 
                   && Vector.cross3(upper[upper.length - 2], upper[upper.length - 1], vertex) <= 0) {
                upper.pop();
            }

            upper.push(vertex);
        }

        // concatenation of the lower and upper hulls gives the convex hull
        // omit last points because they are repeated at the beginning of the other list
        upper.pop();
        lower.pop();

        return upper.concat(lower);
    };

})();


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = __webpack_require__(0);
var Contains = __webpack_require__(65);
var GetPoint = __webpack_require__(300);
var GetPoints = __webpack_require__(301);
var GEOM_CONST = __webpack_require__(56);
var Random = __webpack_require__(170);

/**
 * @classdesc
 * A Circle object.
 *
 * This is a geometry object, containing numerical values and related methods to inspect and modify them.
 * It is not a Game Object, in that you cannot add it to the display list, and it has no texture.
 * To render a Circle you should look at the capabilities of the Graphics class.
 *
 * @class Circle
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x=0] - The x position of the center of the circle.
 * @param {number} [y=0] - The y position of the center of the circle.
 * @param {number} [radius=0] - The radius of the circle.
 */
var Circle = new Class({

    initialize:

    function Circle (x, y, radius)
    {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (radius === undefined) { radius = 0; }

        /**
         * The geometry constant type of this object: `GEOM_CONST.CIRCLE`.
         * Used for fast type comparisons.
         *
         * @name Phaser.Geom.Circle#type
         * @type {number}
         * @readonly
         * @since 3.19.0
         */
        this.type = GEOM_CONST.CIRCLE;

        /**
         * The x position of the center of the circle.
         *
         * @name Phaser.Geom.Circle#x
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.x = x;

        /**
         * The y position of the center of the circle.
         *
         * @name Phaser.Geom.Circle#y
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.y = y;

        /**
         * The internal radius of the circle.
         *
         * @name Phaser.Geom.Circle#_radius
         * @type {number}
         * @private
         * @since 3.0.0
         */
        this._radius = radius;

        /**
         * The internal diameter of the circle.
         *
         * @name Phaser.Geom.Circle#_diameter
         * @type {number}
         * @private
         * @since 3.0.0
         */
        this._diameter = radius * 2;
    },

    /**
     * Check to see if the Circle contains the given x / y coordinates.
     *
     * @method Phaser.Geom.Circle#contains
     * @since 3.0.0
     *
     * @param {number} x - The x coordinate to check within the circle.
     * @param {number} y - The y coordinate to check within the circle.
     *
     * @return {boolean} True if the coordinates are within the circle, otherwise false.
     */
    contains: function (x, y)
    {
        return Contains(this, x, y);
    },

    /**
     * Returns a Point object containing the coordinates of a point on the circumference of the Circle
     * based on the given angle normalized to the range 0 to 1. I.e. a value of 0.5 will give the point
     * at 180 degrees around the circle.
     *
     * @method Phaser.Geom.Circle#getPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [out,$return]
     *
     * @param {number} position - A value between 0 and 1, where 0 equals 0 degrees, 0.5 equals 180 degrees and 1 equals 360 around the circle.
     * @param {(Phaser.Geom.Point|object)} [out] - An object to store the return values in. If not given a Point object will be created.
     *
     * @return {(Phaser.Geom.Point|object)} A Point, or point-like object, containing the coordinates of the point around the circle.
     */
    getPoint: function (position, point)
    {
        return GetPoint(this, position, point);
    },

    /**
     * Returns an array of Point objects containing the coordinates of the points around the circumference of the Circle,
     * based on the given quantity or stepRate values.
     *
     * @method Phaser.Geom.Circle#getPoints
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point[]} O - [output,$return]
     *
     * @param {number} quantity - The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
     * @param {number} [stepRate] - Sets the quantity by getting the circumference of the circle and dividing it by the stepRate.
     * @param {(array|Phaser.Geom.Point[])} [output] - An array to insert the points in to. If not provided a new array will be created.
     *
     * @return {(array|Phaser.Geom.Point[])} An array of Point objects pertaining to the points around the circumference of the circle.
     */
    getPoints: function (quantity, stepRate, output)
    {
        return GetPoints(this, quantity, stepRate, output);
    },

    /**
     * Returns a uniformly distributed random point from anywhere within the Circle.
     *
     * @method Phaser.Geom.Circle#getRandomPoint
     * @since 3.0.0
     *
     * @generic {Phaser.Geom.Point} O - [point,$return]
     *
     * @param {(Phaser.Geom.Point|object)} [point] - A Point or point-like object to set the random `x` and `y` values in.
     *
     * @return {(Phaser.Geom.Point|object)} A Point object with the random values set in the `x` and `y` properties.
     */
    getRandomPoint: function (point)
    {
        return Random(this, point);
    },

    /**
     * Sets the x, y and radius of this circle.
     *
     * @method Phaser.Geom.Circle#setTo
     * @since 3.0.0
     *
     * @param {number} [x=0] - The x position of the center of the circle.
     * @param {number} [y=0] - The y position of the center of the circle.
     * @param {number} [radius=0] - The radius of the circle.
     *
     * @return {this} This Circle object.
     */
    setTo: function (x, y, radius)
    {
        this.x = x;
        this.y = y;
        this._radius = radius;
        this._diameter = radius * 2;

        return this;
    },

    /**
     * Sets this Circle to be empty with a radius of zero.
     * Does not change its position.
     *
     * @method Phaser.Geom.Circle#setEmpty
     * @since 3.0.0
     *
     * @return {this} This Circle object.
     */
    setEmpty: function ()
    {
        this._radius = 0;
        this._diameter = 0;

        return this;
    },

    /**
     * Sets the position of this Circle.
     *
     * @method Phaser.Geom.Circle#setPosition
     * @since 3.0.0
     *
     * @param {number} [x=0] - The x position of the center of the circle.
     * @param {number} [y=0] - The y position of the center of the circle.
     *
     * @return {this} This Circle object.
     */
    setPosition: function (x, y)
    {
        if (y === undefined) { y = x; }

        this.x = x;
        this.y = y;

        return this;
    },

    /**
     * Checks to see if the Circle is empty: has a radius of zero.
     *
     * @method Phaser.Geom.Circle#isEmpty
     * @since 3.0.0
     *
     * @return {boolean} True if the Circle is empty, otherwise false.
     */
    isEmpty: function ()
    {
        return (this._radius <= 0);
    },

    /**
     * The radius of the Circle.
     *
     * @name Phaser.Geom.Circle#radius
     * @type {number}
     * @since 3.0.0
     */
    radius: {

        get: function ()
        {
            return this._radius;
        },

        set: function (value)
        {
            this._radius = value;
            this._diameter = value * 2;
        }

    },

    /**
     * The diameter of the Circle.
     *
     * @name Phaser.Geom.Circle#diameter
     * @type {number}
     * @since 3.0.0
     */
    diameter: {

        get: function ()
        {
            return this._diameter;
        },

        set: function (value)
        {
            this._diameter = value;
            this._radius = value * 0.5;
        }

    },

    /**
     * The left position of the Circle.
     *
     * @name Phaser.Geom.Circle#left
     * @type {number}
     * @since 3.0.0
     */
    left: {

        get: function ()
        {
            return this.x - this._radius;
        },

        set: function (value)
        {
            this.x = value + this._radius;
        }

    },

    /**
     * The right position of the Circle.
     *
     * @name Phaser.Geom.Circle#right
     * @type {number}
     * @since 3.0.0
     */
    right: {

        get: function ()
        {
            return this.x + this._radius;
        },

        set: function (value)
        {
            this.x = value - this._radius;
        }

    },

    /**
     * The top position of the Circle.
     *
     * @name Phaser.Geom.Circle#top
     * @type {number}
     * @since 3.0.0
     */
    top: {

        get: function ()
        {
            return this.y - this._radius;
        },

        set: function (value)
        {
            this.y = value + this._radius;
        }

    },

    /**
     * The bottom position of the Circle.
     *
     * @name Phaser.Geom.Circle#bottom
     * @type {number}
     * @since 3.0.0
     */
    bottom: {

        get: function ()
        {
            return this.y + this._radius;
        },

        set: function (value)
        {
            this.y = value - this._radius;
        }

    }

});

module.exports = Circle;


/***/ }),
/* 65 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Check to see if the Circle contains the given x / y coordinates.
 *
 * @function Phaser.Geom.Circle.Contains
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Circle} circle - The Circle to check.
 * @param {number} x - The x coordinate to check within the circle.
 * @param {number} y - The y coordinate to check within the circle.
 *
 * @return {boolean} True if the coordinates are within the circle, otherwise false.
 */
var Contains = function (circle, x, y)
{
    //  Check if x/y are within the bounds first
    if (circle.radius > 0 && x >= circle.left && x <= circle.right && y >= circle.top && y <= circle.bottom)
    {
        var dx = (circle.x - x) * (circle.x - x);
        var dy = (circle.y - y) * (circle.y - y);

        return (dx + dy) <= (circle.radius * circle.radius);
    }
    else
    {
        return false;
    }
};

module.exports = Contains;


/***/ }),
/* 66 */
/***/ (function(module, exports) {

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @co