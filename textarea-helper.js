(function ($) {
  'use strict';

  // Styles that could influence size of the mirrored element.
  var mirrorStyles = [ 
                       // Box Styles.
                       'box-sizing', 'height', 'width', 'padding-bottom'
                     , 'padding-left', 'padding-right', 'padding-top'
  
                       // Font stuff.
                     , 'font-family', 'font-size', 'font-style' 
                     , 'font-variant', 'font-weight'
  
                       // Spacing etc.
                     , 'word-spacing', 'letter-spacing', 'line-height'
                     , 'text-decoration', 'text-indent', 'text-transform' 
                     ];

  $.fn.textareaHelper = function (method) {
    var textarea = this[0];
    if (textarea.nodeName.toLowerCase() !== 'textarea') throw new Error('Only works on a textarea element.');
    method = method || 'noop';

    var $this = this.first()

      // The element to mirror the textarea with css to emulate textarea
      // behavior.
      , $div  = $('<div/>').css({ 'position'    : 'absolute'
                                , 'overflow'    : 'auto'
                                , 'white-space' : 'pre-wrap'
                                , 'word-wrap'   : 'break-word'
                                , 'top'         : 0
                                , 'left'        : -9999
                                });

    // Copy styles that could influence size. See `mirrorStyles`.
    var styles = {};
    for (var i = 0, style; style = mirrorStyles[i]; i++) {
      styles[style] = $this.css(style);
    }
    $div.css(styles);

    // Populate with content. Mark caret posution with a span `$car`.
    var caretPos = textarea.selectionEnd
      , str      = this.val()
      , pre      = document.createTextNode(str.substring(0, caretPos))
      , post     = document.createTextNode(str.substring(caretPos))
      , $car     = $('<span/>').html('&nbsp;');
    $div.append(pre, $car, post).insertAfter($this);
    $div[0].scrollTop = this[0].scrollTop;

    // Remove the mirror `$div` after the call stack unwinds.
    var cleanUp = function () {
      setTimeout(function () { $div.remove(); }, 0);
    };

    var methods = {
      caretPos: function () {
        cleanUp();
        return $car.position();
      }
    , height: function () {
        cleanUp();

        // Make fill content.
        $div.css('height', '');
        return $div.height();
      }
    , noop: function () {
        return $div;
      }
    };

    // If a method is requested then invoke and return it's value. Otherwise return the 
    // textarea mirror element `$div`.
    return methods[method]();
  };

})(jQuery);
