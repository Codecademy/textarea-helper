describe('textareaHelper', function () {
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

  it('should change position when the caret moves', function () {
    $('.foo').val('foo');
    $('.foo')[0].selectionEnd = 3;
    var obj = $('.foo').textareaHelper('caretPos');
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

});
