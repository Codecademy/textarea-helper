describe('textareaHelper', function () {
  it('should get a mirror element if no method was passed', function () {
    expect($('.foo').textareaHelper()[0].nodeName).to.equal('DIV');
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

});