textareaHelper
--------------

A small library that mirrors a textarea's content onto a div to add some interesting functionality.

[Demo](http://jsfiddle.net/5KqmF/12/).

# Usage

    $('#myText').textareaHelper();
    $('#myText').textareaHelper(method);

## Methods

### .textareaHelper('height')

Get's the textarea's content height.

### .textareaHelper('caretPos')

Get's the XY coordinates of the textarea's caret relative to the textarea.

### .textareaHelper('destroy')

Destorys the helper mirror object. Use for cleanup.

# License

MIT
