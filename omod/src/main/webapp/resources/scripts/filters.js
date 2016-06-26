angular.module("filters", ['uicommons.filters'])
    .filter('translateAs', [ "$filter", function($filter) {
        return function(input, type) {
            // first try to see if we have a custom translation property code
            if (input.uuid) {
                var result = $filter('translate')("ui.i18n." + type + ".name." + input.uuid);
                if (result) {
                    return result;
                }
            }
            if (input.display) {
                return input.display;
            }
            if (input.name) {
                return input.name;
            }
            return "";
        }
    }]).filter('translateDebug', [ "$filter", function($filter) {
    return function(label) {
        if(label === undefined){
            console.log("key search for " + key + " returned = ''");
            return "";
        }
        var key =  label; //"ui.i18n." + type + ".name." + input.uuid
        var result = $filter('translate')(key);
        console.log("key search for " + key + " returned = " + result);
        if (result && result != key) {
            return "OK:" + result;
        }
        else{
            return "NOT-FOUND: " + label;
        }
    }
}]).filter('findAnswer', [  function() {
    return function(concept, uuid) {
        if(concept == null){
            return "";
        }
        for (var i=0; i<concept.answers.length; ++i) {
            if (concept.answers[i].uuid == uuid) {
                return concept.answers[i];
            }
        }
        return null;
    }}]);