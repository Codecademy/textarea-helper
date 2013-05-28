describe('textareaHelper', function () {
  var $text;
  beforeEach(function () {
    $text = $('<textarea>').appendTo('body');
  });

  afterEach(function () {
    $text.textareaHelper('destroy');
    $text.remove();
  });

  it('should create a mirror on initialize', function () {
    $text.textareaHelper();
    var mirror = $text.next().get(0);
    expect(mirror.nodeName).to.equal('DIV');
    expect($(mirror).css('left')).to.equal('-9999px');
    expect($(mirror).css('position')).to.equal('absolute');
  });

  it('should init once', function () {
    $text.textareaHelper();
    expect(
      $text.next().next().css('left') === '-9999px'
    ).to.not.be.ok();
  });

  it('should get the XY position of the caret', function () {
    var obj = $text.textareaHelper('caretPos');
    expect(obj).to.have.property('left').and.to.have.property('top');
    expect(obj.left).to.be.a('number');
    expect(obj.top).to.be.a('number');
  });

  // http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
  function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  }

  function fillAndSelect($el) {
    $el.val('foofoofoofoofoo');
    setSelectionRange($el[0], 5, 10);  
    return $el.textareaHelper('caretPos');
  }

  it('should change position when the caret moves', function () {
    var prev = $text.textareaHelper('caretPos');
    var $t = $('<textarea>').appendTo('body');
    after(function () {
      $t.remove();
    })
    var obj = fillAndSelect($t);
    expect(obj.top).to.equal(prev.top);
    expect(obj.left).to.be.above(prev.left);
  }); 

  it('should get height', function (done) {
    $text.textareaHelper();
    setTimeout(function () {
      var h = $text.val('\n').textareaHelper('height');
      var h2 = $text.val('\n\n').textareaHelper('height');
      var h3 = $text.val('\n\n\n\n').textareaHelper('height');
      expect(h2).to.be.above(h);
      // increase at the same rate.
      expect((h + ((h2 - h) * 3))).to.be.equal(h3);
      done()
    }, 100);
  });

  it('should destroy itself', function () {
    $text.textareaHelper('destroy');
    expect(
      $text.next().css('left') === '-9999px'
    ).to.not.be.ok();
  });

  it('should work on collection and not conflict', function () {
    for (var i = 0; i < 10; i++) $('<textarea>').attr('class', 'test').appendTo('body');
    after(function () {
      $('textarea.test').remove();
    });
    // Init.
    $('textarea.test').textareaHelper();

    $('textarea.test').each(function (i, elem) {
      expect(
        $(elem).next().css('left') === '-9999px'
      ).to.be.ok();
    });
  });

  it('should work with rtl', function () {
    var $div = $('<div/>').css('direction', 'rtl').appendTo('body').append('<textarea>');
    after(function () {
      $div.remove();
    });
    var pos = fillAndSelect($div.find('textarea'));
    expect(pos.right).to.be.above(0);
    expect(pos.left).to.equal('auto');
  });

  // Issue #3
  it('should work on the last character', function () {
    $text.css('font', "normal normal normal 20px/normal 'Lucida Grande'").appendTo('body');
    var prev = $text.val('a').textareaHelper('caretPos').top;
    $text.width(323).val('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    setSelectionRange($text[0], $text.val().length, $text.val().length);
    expect($text.textareaHelper('caretPos').top).to.be(prev);
  });

});
