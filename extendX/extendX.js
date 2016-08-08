/**
 * Created by Ryanchill on 2016/8/7.
 */

//(function (name, context, definition) {
//    //node
//    if (typeof define == 'function') define(definition);
//    //amd
//    else if (typeof  module != 'undefined') module.exports = definition();
//    else context[name] == definition();
//})('extendX', this, function () {
//    var context = this
//        , f = 'function'
//    //存疑
//        , fnTest = /xyz/.test(function () {
//            xyz
//        }) ? /\bsupr\b/ : /.*/
//        , proto = 'prototype';
//
//    function extendX(o) {
//        return extend.call(isFn(o) ? o : function () {}, o, 1)
//    }
//
//    function isFn(o){
//        return typeof  o === f;
//    }
//
//    function wrap(k,fn,supr){
//        return function(){
//            var tmp = this.supr;
//            this.supr = supr[proto][k];
//            var undef = {}.fabricatedUndefined;
//            var ret = undef;
//            try{
//                ret = fn.apply(this,arguments);
//            }finally{
//                this.supr = tmp;
//            }
//            return ret;
//        }
//    }
//
//
//});


var initializing = false;
function extendX(baseClass, prop) {
    //接受单参数情况
    //arguments.length === 1 判断？
    if (typeof(baseClass) === "object") {
        prop = baseClass;
        baseClass = null
    }

    //本次调用所创建的类
    function F() {
        //实例化阶段，调用init函数
        if (!initializing) {
            //如果存在baseClass,实现继承
            if (baseClass) {
                this.baseprototype = baseClass.prototype;
            }
            //否则调用init函数
            this.init.apply(this, arguments);
        }
    }

    //继承父类
    if (baseClass) {
        initializing = true;
        F.prototype = new baseClass();
        //修正指向
        F.prototype.constructor = F;
        initializing = false;
    }

    //覆盖父类的同名方法
    for(var name in prop){
        //过滤prop的继承方法
        if(prop.hasOwnProperty(name)){
            if(baseClass
                && typeof(prop[name]) ===　"function"
                && typeof(F.prototype[name] === "function")
            ){
                F.prototype[name] = (function(){
                    return function(name,fn){
                        //暂存父级同名方法
                        this.base = baseClass.prototype[name];
                        return fn.apply(this,arguments);
                    }
                })(name,prop[name]);
            }
        }else{
            F.prototype[name] = prop[name];
        }
    }

    return F;
}

/*测试用例*/