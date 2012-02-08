describe("Trim Value", function () {
    var testNode;
    var prepareTestNode = function () {
        var existingNode = document.getElementById("testNode");
        if (existingNode != null)
            existingNode.parentNode.removeChild(existingNode);
        testNode = document.createElement("div");
        testNode.id = "testNode";
        document.body.appendChild(testNode);
    };
    beforeEach(prepareTestNode);
    it("expects value to be same", function () {
        testNode.innerHTML = "<input data-bind='tvalue:prop' />";
        var expected = '123';
        ko.applyBindings({prop:ko.observable(expected)}, testNode);
        expect(testNode.childNodes[0].value).toEqual(expected);
    });

    it("expects value to be change to new value", function () {
        testNode.innerHTML = "<input data-bind='tvalue:prop' />";
        var expected = 'abc';
        var viewModel = {prop:ko.observable('123')};
        ko.applyBindings(viewModel, testNode);
        viewModel.prop(expected);
        expect(testNode.childNodes[0].value).toEqual(expected);
    });

    it("expects value to be trimmed", function () {
        testNode.innerHTML = "<input data-bind='tvalue:prop' />";
        var expected = 'abc';
        var newValue = 'abc  ';
        var viewModel = {prop:ko.observable('123')};
        ko.applyBindings(viewModel, testNode);
        testNode.childNodes[0].value = newValue;
        ko.utils.triggerEvent(testNode.childNodes[0], 'change');
        expect(viewModel.prop()).toEqual(expected);
    });

    it("expects value to be new and trimmed", function () {
        testNode.innerHTML = "<input data-bind='tvalue:prop' />";
        var expected = 'abc';
        var spaces = '   abc  ';
        var viewModel = {prop:ko.observable('')};
        ko.applyBindings(viewModel, testNode);
        testNode.childNodes[0].value = spaces;
        ko.utils.triggerEvent(testNode.childNodes[0], 'change');
        expect(viewModel.prop()).toEqual(expected);
    });
});