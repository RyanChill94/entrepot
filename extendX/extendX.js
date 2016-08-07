/**
 * Created by Ryanchill on 2016/8/7.
 */

(function (name, context, definition) {
    //node
    if (typeof define == 'function') define(definition);
    //amd
    else if (typeof  module != 'undefined') module.exports = definition();
    else context[name] == definition();
})('extendX', this, function () {
    var context = this
        , f = 'function'
    //¥Ê“…
        , fnTest = /xyz/.test(function () {
            xyz
        }) ? /\bsupr\b/ : /.*/
        , proto = 'prototype';

    function extendX(o) {
        return extend.call(isFn(o) ? o : function () {}, o, 1)
    }

    function isFn(o){
        return typeof  o === f;
    }

    function wrap(k,fn,supr){
        return function(){
            var tmp = this.supr;
            this.supr = supr[proto][k];
            var undef = {}.fabricatedUndefined;
            var ret = undef;
            try{
                ret = fn.apply(this,arguments);
            }finally{
                this.supr = tmp;
            }
            return ret;
        }
    }


});