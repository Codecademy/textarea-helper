describe('textareaHelper', function () {

  afterEach(function () {
    $('.foo').textareaHelper('destroy');
  });

  it('should create a mirror on initialize', function () {
    $('.foo').textareaHelper();
    var mirror = $('.foo').next().get(0);
    expect(mirror.nodeName).to.equal('DIV');
    expect($(mirror).css('left')).to.equal('-9999px');
    expect($(mirror).css('position')).to.equal('absolute');
  });

  it('should init once', function () {
    $('.foo').textareaHelper();
    expect(
      $('.foo').next().next().css('left') === '-9999px'
    ).to.not.be.ok();
  });

  var first;
  it('should get the XY position of the caret', function () {
    var obj = first = $('.foo').textareaHelper('caretPos');
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
    var obj = fillAndSelect($('.foo'));
    expect(obj.top).to.equal(first.top);
    expect(obj.left).to.be.above(first.left);
  }); 

  it('should get height', function () {
    var h = $('.foo').val('\n').textareaHelper('height');
    var h2 = $('.foo').val('\n\n').textareaHelper('height');
    var h3 = $('.foo').val('\n\n\n\n').textareaHelper('height');
    expect(h2).to.be.above(h);
    // increase at the same rate.
    expect((h + ((h2 - h) * 3))).to.be.equal(h3);
  });

  it('should destroy itself', function () {
    $('.foo').textareaHelper('destroy')
    expect(
      $('.foo').next().css('left') === '-9999px'
    ).to.not.be.ok();
  });

  it('should work on collection and not conflict', function () {
    // Make sure all is destroyed.
    $('textarea').val('').textareaHelper('destroy');
    // Init.
    $('textarea').textareaHelper();

    var first;
    $('textarea').each(function (i, elem) {
      expect(
        $(elem).next().css('left') === '-9999px'
      ).to.be.ok();
    });
  });

  it('should work with rtl', function () {
    var $div = $('<div/>').css('direction', 'rtl').appendTo('body').append('<textarea>');
    var pos = fillAndSelect($div.find('textarea'));
    expect(pos.right).to.be.above(0);
    expect(pos.left).to.equal('auto');
  });

  // Issue #3
  it('should work on the last character', function () {
    var $t = $('<textarea/>').appendTo('body');
    after(function () {
      $t.remove();
    });
    var prev = $t.val('a').textareaHelper('caretPos').top;
    $t.width(323).val('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    setSelectionRange($t[0], $t.val().length, $t.val().length);
    expect($t.textareaHelper('caretPos').top).to.be(prev);
  });

});
