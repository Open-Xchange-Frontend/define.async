define.async
============

AMD-compatible define that waits for module initialization

### Dependencies
Just needs jQuery's $.Deferred(). Never tried other implementations yet. 

### Usage

```js
define.async('test', [], function () {

    // no data in the beginning
    var data = {};

    // common module definition but we don't return this yet
    var module = {
        method: function () {
            return data;
        }
    };

    // load data first
    return $.ajax({ url: 'test.json' }).then(function (response) {
        data = response;
        // now we can resolve
        return module;
    });
});
```

### Benefit
If a module needs initial data to work properly, the interface usually becomes asynchronous in order to fetch data first. Alternatively, the module must be initialized first which moves complexity outside of the module. By using define.async() you don't need to worry about the inner workings of a module plus the interface stays synchronous and, therefore, is easier to use, test, and document.
