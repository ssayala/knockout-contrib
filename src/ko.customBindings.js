// knockout-contrib
// (c) Sunil Sayala
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

//Trim value. like value binding, but trims strings
ko.bindingHandlers.tvalue = {
    init:function (element, valueAccessor, allBindingsAccessor) {
        var underlyingObservable = valueAccessor();
        var interceptor = ko.dependentObservable({
            read:underlyingObservable,
            write:function (value) {
                var stringTrimRegex = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
                var trimmed = (value || "").replace(stringTrimRegex, "");
                if (trimmed === value) {
                    element.value = trimmed;
                }
                underlyingObservable(trimmed);
            }
        });
        ko.bindingHandlers.value.init(element, function () {
            return interceptor;
        }, allBindingsAccessor);
    },
    update:ko.bindingHandlers.value.update
};