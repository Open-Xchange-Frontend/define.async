/**
 * This work is provided under the terms of the CREATIVE COMMONS PUBLIC
 * LICENSE. This work is protected by copyright and/or other applicable
 * law. Any use of the work other than as authorized under this license
 * or copyright law is prohibited.
 *
 * http://creativecommons.org/licenses/by-nc-sa/2.5/
 * © 2013 Open-Xchange Inc., Tarrytown, NY, USA. info@open-xchange.com
 *
 * @author Matthias Biggeleben <matthias.biggeleben@open-xchange.com>
 */

 (function (define) {

    // don't do anything if define is not defined
    if (!define) return;

    function getLoader(name, deps, callback) {
        return function (n, req, onLoad, config) {
            // resolve module dependencies
            req(deps, function () {
                // get module (must return deferred object)
                var def = callback.apply(null, arguments);
                if (def && def.done) {
                    def.done(onLoad);
                } else if (console.error) {
                    console.error('Module "' + name + '" does not return a deferred object!');
                }
                name = deps = callback = null;
            });
        };
    }

    function identity(value) { return value; }

    define.async = function (name, deps, callback) {
        // use loader plugin to defer module definition
        define(name + ':init', { load: getLoader(name, deps, callback) });
        // define real module - will wait for promise
        define(name, [name + ':init!'], identity);
    };

}(window.define));
