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
//    //����
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
    //���ܵ��������
    //arguments.length === 1 �жϣ�
    if (typeof(baseClass) === "object") {
        prop = baseClass;
        baseClass = null
    }

    //���ε�������������
    function F() {
        //ʵ�����׶Σ�����init����
        if (!initializing) {
            //�������baseClass,ʵ�ּ̳�
            if (baseClass) {
                this.baseprototype = baseClass.prototype;
            }
            //�������init����
            this.init.apply(this, arguments);
        }
    }

    //�̳и���
    if (baseClass) {
        initializing = true;
        F.prototype = new baseClass();
        //����ָ��
        F.prototype.constructor = F;
        initializing = false;
    }

    //���Ǹ����ͬ������
    for(var name in prop){
        //����prop�ļ̳з���
        if(prop.hasOwnProperty(name)){
            if(baseClass
                && typeof(prop[name]) ===��"function"
                && typeof(F.prototype[name] === "function")
            ){
                F.prototype[name] = (function(){
                    return function(name,fn){
                        //�ݴ游��ͬ������
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

/*��������*/