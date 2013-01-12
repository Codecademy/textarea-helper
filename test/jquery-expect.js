/*
  MIT License.  
  Copyright (c) 2012 Amjad Masad <amjad@codecademy.com> Ryzac, Inc.
*/

(function (global, undefined) {
  
  var jQuery = global.jQuery
    , $ = jQuery;

  function $expect (obj) {
    return new Assertion(obj);
  }

  /**
   * Utilities
   */

  /**
   * Object.keys
   */

  function keys (obj) {
    if (Object.keys) {
      return Object.keys(obj);
    }

    var ret = [];

    for (var i in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        ret.push(i);
      }
    }

    return ret;
  }

  /**
   * Inspect
   */

  function i (obj) {
    return obj.selector || obj;
  }

  /**
   * Extended css color names hash.
   * name -> HEX
   * source: http://www.w3.org/TR/css3-color/#svg-color
   */

  var COLORS = {
    'aliceblue': '#F0F8FF'
  , 'antiquewhite': '#FAEBD7'
  , 'aqua': '#00FFFF'
  , 'aquamarine': '#7FFFD4'
  , 'azure': '#F0FFFF'
  , 'beige': '#F5F5DC'
  , 'bisque': '#FFE4C4'
  , 'black': '#000000'
  , 'blanchedalmond': '#FFEBCD'
  , 'blue': '#0000FF '
  , 'blueviolet': '#8A2BE2'
  , 'brown': '#A52A2A'
  , 'burlywood': '#DEB887'
  , 'cadetblue': '#5F9EA0'
  , 'chartreuse': '#7FFF00'
  , 'chocolate': '#D2691E'
  , 'coral': '#FF7F50'
  , 'cornflowerblue': '#6495ED'
  , 'cornsilk': '#FFF8DC '
  , 'crimson': '#DC143C '
  , 'cyan': '#00FFFF '
  , 'darkblue': '#00008B'
  , 'darkcyan': '#008B8B'
  , 'darkgoldenrod': '#B8860B'
  , 'darkgray': '#A9A9A9 '
  , 'darkgreen': '#006400 '
  , 'darkgrey': '#A9A9A9 '
  , 'darkkhaki': '#BDB76B '
  , 'darkmagenta': '#8B008B '
  , 'darkolivegreen': '#556B2F '
  , 'darkorange': '#FF8C00 '
  , 'darkorchid': '#9932CC '
  , 'darkred': '#8B0000'
  , 'darksalmon': '#E9967A '
  , 'darkseagreen': '#8FBC8F '
  , 'darkslateblue': '#483D8B '
  , 'darkslategray': '#2F4F4F '
  , 'darkslategrey': '#2F4F4F '
  , 'darkturquoise': '#00CED1 '
  , 'darkviolet': '#9400D3 '
  , 'deeppink': '#FF1493 '
  , 'deepskyblue': '#00BFFF'
  , 'dimgray': '#696969 '
  , 'dimgrey': '#696969 '
  , 'dodgerblue': '#1E90FF'
  , 'firebrick': '#B22222 '
  , 'floralwhite': '#FFFAF0'
  , 'forestgreen': '#228B22'
  , 'fuchsia': '#FF00FF '
  , 'gainsboro': '#DCDCDC '
  , 'ghostwhite': '#F8F8FF '
  , 'gold': '#FFD700 '
  , 'goldenrod': '#DAA520 '
  , 'gray': '#808080 '
  , 'green': '#008000 '
  , 'greenyellow': '#ADFF2F '
  , 'grey': '#808080 '
  , 'honeydew': '#F0FFF0 '
  , 'hotpink': '#FF69B4 '
  , 'indianred': '#CD5C5C'
  , 'indigo': '#4B0082 '
  , 'ivory': '#FFFFF0 '
  , 'khaki': '#F0E68C '
  , 'lavender': '#E6E6FA'
  , 'lavenderblush': '#FFF0F5 '
  , 'lawngreen': '#7CFC00 '
  , 'lemonchiffon': '#FFFACD '
  , 'lightblue': '#ADD8E6 '
  , 'lightcoral': '#F08080 '
  , 'lightcyan': '#E0FFFF '
  , 'lightgoldenrodyellow': '#FAFAD2 '
  , 'lightgray': '#D3D3D3 '
  , 'lightgreen': '#90EE90 '
  , 'lightgrey': '#D3D3D3 '
  , 'lightpink': '#FFB6C1 '
  , 'lightsalmon': '#FFA07A '
  , 'lightseagreen': '#20B2AA'
  , 'lightskyblue': '#87CEFA '
  , 'lightslategray': '#778899 '
  , 'lightslategrey': '#778899 '
  , 'lightsteelblue': '#B0C4DE '
  , 'lightyellow': '#FFFFE0 '
  , 'lime': '#00FF00 '
  , 'limegreen': '#32CD32 '
  , 'linen': '#FAF0E6 '
  , 'magenta': '#FF00FF '
  , 'maroon': '#800000 '
  , 'mediumaquamarine': '#66CDAA '
  , 'mediumblue': '#0000CD '
  , 'mediumorchid': '#BA55D3 '
  , 'mediumpurple': '#9370DB '
  , 'mediumseagreen': '#3CB371 '
  , 'mediumslateblue': '#7B68EE '
  , 'mediumspringgreen': '#00FA9A'
  , 'mediumturquoise': '#48D1CC '
  , 'mediumvioletred': '#C71585 '
  , 'midnightblue': '#191970 '
  , 'mintcream': '#F5FFFA '
  , 'mistyrose': '#FFE4E1 '
  , 'moccasin': '#FFE4B5 '
  , 'navajowhite': '#FFDEAD'
  , 'navy': '#000080 '
  , 'oldlace': '#FDF5E6 '
  , 'olive': '#808000 '
  , 'olivedrab': '#6B8E23 '
  , 'orange': '#FFA500 '
  , 'orangered': '#FF4500 '
  , 'orchid': '#DA70D6 '
  , 'palegoldenrod': '#EEE8AA '
  , 'palegreen': '#98FB98 '
  , 'paleturquoise': '#AFEEEE '
  , 'palevioletred': '#DB7093 '
  , 'papayawhip': '#FFEFD5 '
  , 'peachpuff': '#FFDAB9 '
  , 'peru': '#CD853F '
  , 'pink': '#FFC0CB '
  , 'plum': '#DDA0DD '
  , 'powderblue': '#B0E0E6 '
  , 'purple': '#800080 '
  , 'red': '#FF0000'
  , 'rosybrown': '#BC8F8F'
  , 'royalblue': '#4169E1'
  , 'saddlebrown': '#8B4513'
  , 'salmon': '#FA8072 '
  , 'sandybrown': '#F4A460 '
  , 'seagreen': '#2E8B57 '
  , 'seashell': '#FFF5EE '
  , 'sienna': '#A0522D '
  , 'silver': '#C0C0C0 '
  , 'skyblue': '#87CEEB '
  , 'slateblue': '#6A5ACD '
  , 'slategray': '#708090 '
  , 'slategrey': '#708090 '
  , 'snow': '#FFFAFA'
  , 'springgreen': '#00FF7F'
  , 'steelblue': '#4682B4'
  , 'tan': '#D2B48C'
  , 'teal': '#008080'
  , 'thistle': '#D8BFD8'
  , 'tomato': '#FF6347'
  , 'turquoise': '#40E0D0'
  , 'violet': '#EE82EE'
  , 'wheat': '#F5DEB3'
  , 'white': '#FFFFFF'
  , 'whitesmoke': '#F5F5F5'
  , 'yellow': '#FFFF00'
  , 'yellowgreen': '#9ACD32'
  };

  /**
   * Possible assertion flags.
   */

  var flags = {
      not: ['to', 'be', 'have', 'include', 'only']
    , to: ['be', 'have', 'include', 'only', 'not']
    , be: []
    , is: []
    , are: []
    , have: []
    , has: []
  };

  /**
   * Constructor
   * from expect.js (copyright LearnBoost, MIT license)
   */

  function Assertion (obj, flag, parent) {
    this.obj = obj instanceof jQuery ? obj : $(obj);
    this.flags = {};

    if (undefined !== parent) {
      this.flags[flag] = true;

      for (var p in parent.flags) {
        if (parent.flags.hasOwnProperty(p)) {
          this.flags[p] = true;
        }
      }
    }

    var $flags = flag ? flags[flag] : keys(flags)
      , self = this;

    if ($flags) {
      for (var i = 0, l = $flags.length; i < l; i++) {
        if (this.flags[$flags[i]]) continue;
        (function () {
          // avoid recursion
          var name = $flags[i]
            , assertion = new Assertion(this.obj, name, this);

          if ('function' === typeof Assertion.prototype[name]) {
            // clone the function, make sure we dont touch the prot reference
            var old = this[name];
            this[name] = function () {
              return old.apply(self, arguments);
            };

            for (var fn in Assertion.prototype) {
              if (Assertion.prototype.hasOwnProperty(fn) && fn !== name) {
                this[name][fn] = $.proxy(assertion[fn], assertion);
              }
            }
          } else {
            this[name] = assertion;
          }
        }).call(this);
      }
    }
  }


  /**
   * Constructor
   * @inherits Error
   */
   
  function AssertionError (msg) {
    Error.call(this);
    /*jshint noarg:false*/
    if (Error.captureStackTrace) Error.captureStackTrace(this, arguments.callee);
    this.message = msg;
    this.name = 'AssertionError';
  }
  
  AssertionError.prototype = new Error();
  AssertionError.prototype.constructor = AssertionError;

  global.$expect = $expect;
  $expect.Assertion = Assertion;
  $expect.AssertionError = AssertionError;

  /**
   * Performs an assertion
   * 
   * @param {Boolean} truth
   * @param {String|Function} msg
   * @param {String} error
   * @api private
   */

  Assertion.prototype.assert = function (truth, msg, error) {
    var ok = this.flags.not ? !truth : truth;

    if ($.isFunction(msg)) {
      error = msg = msg.call(this, !ok);
    }
  
    msg = this.flags.not ? error : msg;

    if (!ok) {
      throw new AssertionError(msg);
    }

    this.and = new Assertion(this.obj);
  };

  /**
   * Check if the jQuery object has any elements.
   *
   * @api public
   */

  Assertion.prototype.exist = function (msg) {
    this.assert(
        !!this.obj.length
        , msg || 'expected ' + i(this.obj) + ' to exist'
        , msg || 'expected ' + i(this.obj) + ' not to exist');
    return this;
  };

  /**
   * Assert having _n_ elements.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.elements =
  Assertion.prototype.items =
  Assertion.prototype.length = function (n, msg) {
    var len = this.obj.length;
    this.assert(
        n === len
      , msg || 'expected ' + i(this.obj) + ' to have a length of ' + n + ' but got ' + len
      , msg || 'expected ' + i(this.obj) + ' to not have a length of ' + len);
    return this;
  };


  /**
   * Assert having elements greater than _n_ elements.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.greaterThan =
  Assertion.prototype.above = function (n, msg) {
    this.assert(
        this.obj.length > n
      , msg || 'expected ' + i(this.obj) + ' to have a length greater than ' + n
      , msg || 'expected ' + i(this.obj) + ' to have a length less than ' + n);
    return this;
  };


  /**
   * Assert having elements less than _n_ elements.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.lessThan =
  Assertion.prototype.below = function (n, msg) {
    this.assert(
        this.obj.length < n
      , msg || 'expected ' + i(this.obj) + ' to have a length less than ' + n
      , msg || 'expected ' + i(this.obj) + ' to have a length greater than ' + n);
    return this;
  };

  /**
   * Checks if a jQuery collection has exactly the same and no more elements than another one.
   *
   * @api public
   */
  Assertion.prototype.eql =
  Assertion.prototype.equal = function ($el, msg) {
    $el = $el instanceof jQuery ? $el : $($el);
    
    // Returns true if every element in a appears exactly once in b.
    var injSurj = function(a,b) {
      if (a.length !== b.length) return false;

      return a.map(function(i, el) {
        return $.inArray(el, b) > -1 ? true : null;
      }).length === a.length;
    };
  
    // Arrays are equal if every element in this.obj 
    // appears in $el, and vice-versa.
    var eq = injSurj(this.obj, $el) && injSurj($el, this.obj);

    this.assert(
        eq
      , msg || 'expected ' + i(this.obj) + ' to equal ' + i($el)
      , msg || 'expected ' + i(this.obj) + ' to not equal ' + i($el));
    return this;
  };

  /**
   * Asserts the value of an attribute on an element.
   *
   * @api public
   */

  Assertion.prototype.attr = function (prop, val, msg) {
    var got = this.obj.attr(prop);

    if (undefined === val) {
      this.assert(
          undefined !== got
        , msg || 'expected ' + i(this.obj) + ' to have an attribute ' + prop
        , msg || 'expected ' + i(this.obj) + ' not to have attribute ' + prop);
    } else {
      this.assert(
          got === val
        , msg || 'expected ' + i(this.obj) + ' to have an attribute ' + prop + ' equals to ' + val
        , msg || 'expected ' + i(this.obj) + ' to not have an attribute ' + prop + ' equals to ' + val);  
    }
    
    return this;
  };


  /**
   * Convert rgb(x, y, z) -> Hex
   * source: http://wowmotty.blogspot.com/2009/06/convert-jquery-rgb-output-to-hex-color.html
   */

  function rgb2hex (rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
  }
  
  /**
   * Takes color in any format and returns it in a HEX (uppercase) format.
   */

  function normalizeColor (color) {
    if (!color) return '';
    
    function r (x) { return x.toUpperCase() + x.toUpperCase(); }

    if (color.match(/^#/)) {
      if (color.length === 4) {
        return '#' + r(color.charAt(1)) + r(color.charAt(2)) + r(color.charAt(3));
      }
      return color.toUpperCase();
    } else if (color.match(/^rgb/)) {
      return rgb2hex(color).toUpperCase();
    } else {
      return COLORS[$.trim(color)];
    }
  }

  /**
   * Breakdown shorthand css and compare each direction.
   */

  function compareQuad ($el, prop, val) {
    var isColor = prop.match(/color/);
    function props (dir) {
      if (prop.match(/^border/)) {
        var parts = prop.split(/-/);
        return parts[0] + '-' + dir + '-' + parts[1];
      } else {
        return prop + '-' + dir;
      }
    }
    
    val = val.split(/\s/);

    var passing = true
      , got = $.map(['top', 'right', 'bottom', 'left'], function (dir, i) {
        // 4 values or 2 values repeat or 1 value repeat.
        var value = val[i] || val[i - 2] || val[0]
          , got = $el.css(props(dir));


        if (isColor) {
          if (normalizeColor(value) !== (got = normalizeColor(got))) passing = false;
        } else {
          if (value !== got) passing = false;
        }

        return got;
      });

    return {passing: passing, got: got.join(' ')};
  }

  /**
   * Breakdown border shorthand css and compare each style.
   */

  function borderQuad ($el, prop, val) {
    val = val.split(/\s/);

    var passing = true
      , got = $.map(['width', 'style', 'color'], function (style, i) {
          var got = $el.css(prop + '-' + style );

          if (style === 'color') {
            if ((got = normalizeColor(got)) !== normalizeColor(val[i])) passing = false;
          } else {
            if (got !== val[i]) passing = false;  
          }

          return got;
        });

    return {passing: passing, got: got.join(' ')};
  }

  /**
   * Array unique and join.
   */
  function stringifyGot (got) {
    return $.map(got, function (g, i) {
      return $.inArray(g, got) === i ? g : null;
    }).join(' ');
  }

  /**
   * Assert having a css value.
   *
   * @api public
   * @param {String} prop
   * @param {*} val
   * @param {String|Function} msg
   */

  Assertion.prototype.css = function (prop, val, msg) {
    prop = $.trim(prop);
    val = typeof val === 'string' ?  $.trim(val) : val;

    var obj = this.obj
      , template = function (got) {
          return msg || 'expected ' + i(obj) + ' to have its ' + prop 
                      + ' style equal to ' + val + ( got ? ' but got ' + got : '');
        }
      , that = this
      , got, passing;

    function check (obj) {
      switch (prop) {
        case 'backgroundColor':
        case 'background-color':
        case 'color':
          passing = (got = normalizeColor(obj.css(prop))) === normalizeColor(val);
          break;

        case 'border-style':
        case 'border-color':
        case 'border-width':
        case 'margin':
        case 'padding':
          got = compareQuad(obj, prop, val);
          passing = got.passing;
          got = got.got;
          break;

        case 'border-top':
        case 'border-right':
        case 'border-left':
        case 'border-bottom':
          got = borderQuad(obj, prop, val);  
          passing = got.passing;
          got = got.got;
          break;

        case 'border':
          passing = true;
          got = $.map(['top', 'right', 'left', 'bottom'], function (dir) {
            var ret = borderQuad(obj, prop + '-' + dir, val);
            if (!ret.passing) passing = false;
            return ret.got;
          });
          got = stringifyGot(got);
          break;

        case 'border-radius':
          got = [];
          passing =  ((got[0] = obj.css('border-top-left-radius'))     === val)
                  && ((got[1] = obj.css('border-top-right-radius'))    === val)
                  && ((got[2] = obj.css('border-bottom-left-radius'))  === val)
                  && ((got[3] = obj.css('border-bottom-right-radius')) === val);
          got = stringifyGot(got);
          break;

        default:
          passing = (got = obj.css(prop)) === val;
      }

      that.assert(
            passing
          , template(got)
          , template());
    }
   
    this.obj.each(function (_, el) {
      check($(el));
    });

    return this;
  };


  /**
   * Asserts that an element has certain text. The check is loose by default, meaning punctuation
   * and spaces are stripped out and case is ignored. Pass in true as the second argument for 
   * strict equality.
   *
   * @param {String} val
   * @param {String|Function} msg
   * @api public
   */

  Assertion.prototype.text = function (val, msg) {
    var text = this.obj.text();

    if ('number' === typeof val) {
      this.assert(
          text.length === val
        , msg || 'expected ' + i(this.obj) + ' text to be of length ' + val + ' but got ' + text.length
        , msg || 'expected ' + i(this.obj) + ' text to not be of length ' + val);
    } else if (val instanceof RegExp) {
      this.assert(
          val.test(text)
        , msg || 'expected ' + i(this.obj) + ' text to match ' + String(val)
        , msg || 'expected ' + i(this.obj) + ' text not to match ' + String(val));
    } else if (null == val) {
      this.assert(
          !!text.length
        , msg || 'expected ' + i(this.obj) + ' to have text'
        , msg || 'expected ' + i(this.obj) + ' to not have text');
    } else {
      val = String(val);
      this.assert(
          text === val
        , msg || 'expected ' + i(this.obj) + ' text to be equal to ' + val + ' but got ' + text
        , msg || 'expected ' + i(this.obj) + ' text to not be equal to ' + val);
    }

    return this;
  };

  /**
   * Asserts that an element has certain text. The check is loose by default, meaning punctuation
   * and spaces are stripped out and case is ignored. Pass in true as the second argument for 
   * strict equality.
   *
   * @param {String} val
   * @param @optional {Boolean} strict
   * @param {String|Function} msg
   * @api public
   */
  Assertion.prototype.contain = function (text, strict, msg) {
    if ('boolean' !== typeof strict) {
      msg = strict;
      strict = false;
    }

    var re = /[\.,-\/#!$%\^&\*;:{}=\-_`~()\s'"]/g
      , passing;

    if (strict) {
      passing = this.obj.is(':contains(\'' + text + '\')');
    } else {
      passing = this.obj.text().replace(re, '').toLowerCase().indexOf(text.replace(re, '').toLowerCase()) > -1;
    }

    this.assert(
        passing
      , msg || 'expected ' + i(this.obj) + ' to contain "' + text + '"'
      , msg || 'expected ' + i(this.obj) + ' not to contain "' + text + '"');

    return this;
  };

  /**
   * Asserts the value of the following jquery accessor functions.
   *
   * @param {*} val
   * @api public
   */

  $.each([ 'width', 'innerWidth', 'outerWidth'
         , 'height', 'innerHeight', 'outerHeight'
         , 'scrollLeft', 'scrollTop'
         ], function (_, fn) {
          Assertion.prototype[fn] = function (val, msg) {
            var ops = {
              '>': function (v1, v2) { return v1 > v2; }
            , '>=': function (v1, v2) { return v1 >= v2; }
            , '<': function (v1, v2) { return v1 < v2; }
            , '<=': function (v1, v2) { return v1 <= v2; }
            };

            if ('string' === typeof val && (ops[$.trim(val).slice(0, 2)] || ops[$.trim(val).charAt(0)])) {
              val = $.trim(val);

              var op, opName;
              if (op = ops[val.slice(0, 2)]) {
                opName = val.slice(0, 2);
                val = parseFloat(val.slice(2));
              } else if (op = ops[val.charAt(0)] ) {
                opName = val.charAt(0);
                val = parseFloat(val.slice(1));  
              }
              
              var v = this.obj[fn]();
              this.assert(
                  op(v, val)
                , msg || 'expected ' + i(this.obj) + ' to have a ' + fn + '  ' + opName + ' ' + val
                , msg || 'expected ' + i(this.obj) + ' not to have a ' + fn + '  ' + opName + ' ' + val);
            } else {
              var got;
              this.assert(
                  (got = this.obj[fn]()) === val
                , msg || 'expected ' + i(this.obj) + ' to have a ' + fn + ' of ' + val + ' but got ' + got
                , msg || 'expected ' + i(this.obj) + ' not to have a ' + fn + ' of ' + val);
            }

            return this;
          };
        });

  /**
   * Asserts that an input element has a value.
   *
   * @param {String|Number} val
   * @param {String|Function} msg
   * @api public
   */
  Assertion.prototype.value = 
  Assertion.prototype.val = function (val, msg) {
    var got;
    this.assert(
        (got = this.obj.val()) === val
      , msg || 'expected ' + i(this.obj) + ' to have value ' + val + ' but got ' + got
      , msg || 'expected ' + i(this.obj) + ' not to have value ' + val);
  };

  /**
   * Asserts the equality of an element's HTML with a string.
   *
   * @param {String} html
   * @param {String|Function} msg
   * @api public
   */
  Assertion.prototype.html = function (html, msg) {
    var got;
    this.assert(
        (got = this.obj.html()) === html
      , msg || 'expected ' + i(this.obj) + ' to have HTML ' + html + ' but got ' + got
      , msg || 'expected ' + i(this.obj) + ' not to have HTML ' + html);
  };

  /**
   * Asserts the existence of elements in different directions and traversal ways
   * of the tree.
   *
   * @param {String|jQueryObject} val
   * @api public
   */

  $.each([ 'children', 'closest', 'find'
         , 'next', 'nextAll', 'nextUntil'
         , 'offsetParent', 'parent', 'parents'
         , 'parentsUntil', 'prev', 'prevAll'
         , 'prevUntil', 'siblings'
         ], function (_, fn) {
          Assertion.prototype[fn] = function (val, msg) {
            var got = this.obj[fn](val);

            this.assert(
                !!got.length
              , msg || 'expected ' + i(this.obj) + ' to have ' + fn + ' ' + val
              , msg || 'expected ' + i(this.obj) + ' not to have ' + fn + ' ' + val);

            this.that = this.which = new Assertion(got);

            return this;
          };
         });

  // alias
  Assertion.prototype.have = Assertion.prototype.find;

  /**
   * Asserts the element(s) using the jquery $().is method.
   *
   * @api public
   */

  Assertion.prototype.be =
  Assertion.prototype.an =
  Assertion.prototype.a = function (obj, msg) {
    this.assert(
        this.obj.is(obj)
      , msg || 'expected ' + i(this.obj) + ' to be ' + i(obj)
      , msg || 'expected ' + i(this.obj) + ' not to be ' + i(obj));
    return this;
  };

  /**
   * Returns a new assertion object after calling the jquery end method.
   *
   * @api public
   */

  Assertion.prototype.end = function () {
    return new Assertion(this.obj.end());
  };

  /**
   * Async testing signals.
   * 
   * @param {String} event
   * @param {Deferred} deferred
   */
  function DeferredSignal (deferred, event) {
    this.deferred = deferred;
    this.event = event;
  }

  DeferredSignal.prototype = new Error();
  $expect.DeferredSignal = DeferredSignal;

  function signal (deferred, event) {
    throw new DeferredSignal(deferred, event);
  }

  /**
   * Attaches a *once* callback to an event.
   * Calls asyncWait with the eventType and a deferred object.
   * When the event is fired the deferred is resolved and passed to asynDone alont with the eventType.
   *
   * @api public
   * @param {String} evt
   * @param {Function} cb
   */

  Assertion.prototype.on = function (evt, cb) {
    var obj = this.obj
      , dfd = $.Deferred()
      , callback = function () {
          obj.off(evt, callback);
          var ret = null;

          try {
            ret = cb.apply(this, arguments);
            dfd.resolveWith(obj, [null, ret]);
          } catch (e) {
            dfd.rejectWith(obj, [e, ret]);
          }

          return ret;
        };

    this.obj.on(evt, callback);
    return signal(dfd, evt);
  };

  /**
   * Wait before executing a callback
   * @api public
   * @param {String} evt
   * @param {Function} cb
   */
   $expect.wait = function (delay, cb) {
    var dfd = $.Deferred();
    setTimeout(function () {
      try {
        cb();
        dfd.resolve();
      } catch (e) {
        dfd.reject(e);
      }
    }, delay);

    return signal(dfd, 'wait');
   };

  /**
   * Shorthand methods for event binding. Just like jQuery!
   *
   * @api public
   * @param {Function} cb
   */
  $.each([ 'blur', 'change', 'click', 'dblclick', 'error', 'focus'
         , 'focusin', 'focusout', 'hover', 'keydown', 'keypress'
         , 'keyup', 'load', 'mousedown', 'mouseenter', 'mouseleave'
         , 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize'
         , 'select', 'submit', 'scroll'
         ], function (_, evt) {
            Assertion.prototype[evt] = function (cb) {
              this.on(evt, cb);
            };
          });

  /**
   * Shorthand methods for event binding. Just like jQuery!
   *
   * @api public
   * @param {String} className
   * @param {String|Function} msg
   */
  Assertion.prototype['class'] = function (className, msg) {
    var that = this;
    this.obj.each(function (_, el) {
      that.assert(
          $(el).hasClass(className)
        , msg || 'expected ' + i(that.obj) + ' to have class ' + className
        , msg || 'expected ' + i(that.obj) + ' not to have class ' + className);
    });

    return this;
  };

  /**
   * Convenience methods for pseudo-selectors assertions.
   *
   * @api public
   * @param {String|Function} msg
   */
  $.each([ 'visible', 'hidden', 'selected'
         , 'checked', 'disabled', 'empty'], function (_, attr) {
          Assertion.prototype[attr] = function (msg) {
            this.assert(
                this.obj.is(':' + attr)
              , msg || 'expected ' + i(this.obj) + ' to be ' + attr
              , msg || 'expected ' + i(this.obj) + ' not to be ' + attr);
            return this;
          };
        });

})(this);