var chill = {};
chill.eventUtils = {
    addHandler: function (elem, type, handler) {
        if (elem.addEventListener()) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            //IE8 及之前版本
            elem.attachEvent('on' + type, handler);
        } else {
            //DOM0级方法
            elem['on' + type] = handler;
        }

    },
    getEvent: function (e) {
        var ev = window.event || e;
        return ev;
    }
};

/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
chill.AJAX = function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {
        };
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for (var key in opt.data) {
        params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    }
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            opt.success(xmlHttp.responseText);
        }
    };
};


chill.animation = {

    //transform兼容
    transform: function (element, value, key) {
        key = key || "Transform";
        ["Moz", "O", "Ms", "Webkit", ""].forEach(function (prefix) {
            element.style[prefix + key] = value;
        });
        return element;
    },

    drag: function (obj) {
        obj.onmousedown = function (ev) {
            var oEvent = ev || event;
            var disX = oEvent.clientX - obj.offsetLeft;
            var disY = oEvent.clientY - obj.offsetTop;

            document.onmousemove = function (ev) {
                var oEvent = ev || event;
                obj.style.left = oEvent.clientX - disX + 'px';
                obj.style.top = oEvent.clientY - disY + 'px';
            };

            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }

};


/****************************
 * DOM相关
 * **************************/

chill.DOM = {

    // 浏览器选择器API
    $: function (selector) {
        return document.querySelector(selector);
    },

    $$: function (selector) {
        return document.querySelectorAll(selector);
    },
    getElementByClassName: function (parent, tagName, className) {
        var aEls = parent.getElementsByTagName(tagName);
        var arr = [];
        for (var i = 0; i < aEls.length; i++) {
            var aClassName = aEls[i].className.split(' ');
            for (var j = 0; j < aClassName.length; j++) {
                if (aClassNamep[j] == className) {
                    arr.push(arr[i]);
                    break;
                }
            }
        }
        return arr;
    },
    arrIndexOf: function (arr, v) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == v) {
                return i;
            }
        }
        return -1;
    },

    getByClass: function (oParent, sClassName) {
        var oEle = oParent.getElementsByTagName('*');
        var aResult = [];
        var sReg = '\\b' + sClassName + '\\b';
        var re = new RegExp(sReg);

        for (var i = 0; i < oEle.length; i++) {
            if (re.test(oEle[i].className)) {
                aResult.push(oEle[i]);
            }
        }
        return aResult;
    },
    addClass: function (obj, className) {
        if (obj.clasName = '') {
            obj.className = className;
        } else {
            var arrClassName = obj.clasName.spilt('');
            var _index = arrIndexof(arrClassName, className);
            if (_index == -1) {
                obj.className += ' ' + className;
            }
        }
    },

    removeClass: function (obj, className) {
        if (obj.className != '') {
            var arrClassName = obj.clasName.spilt('');
            var _index = this.arrIndexOf(arrClassName, className);
            if (_index != -1) { //存在当前class
                arrClassName.splice(_index, 1);
                obj.clasName = arrClassName.join(' ');
            }
        }
    }
};

/****************************
 * BOM相关
 * **************************/
chill.BOM = {

    getPos: function (obj) {
        var pos = {
            left: 0,
            top: 0
        };
        while (1) {
            pos.left += obj.offsetLeft;
            pos.top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return pos;
    }
};

/****************************
 * 样式相关
 * **************************/
chill.style = {
    getStyle: function (obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }

    },

    setStyle: function (obj, json) {
        var attr = '';
        for (attr in json) {
            obj.style[attr] = json[attr];
        }
    }
};

chill.tool = {
    mySort: function () {
        var tags = [];
        for (var i = 0; i < arguments.length; i++) {
            tags.push(arguments[i]);
        }

        tags.sort(function (a, b) {
            return a - b
        });

        return tags;
    },
    isArray: function (arr) {
        return Object.prototype.toString.call(arr) === '[Object Array]';
    },
    isFunction: function (fn) {
        return Object.prototype.toString.call(fn) === '[Object Function]';
    },
    curryIt: function (fn) {
        var args = [];
        //首先要获得预定义函数的参数个数fn.length，然后声明一个空数组去存放这些参数。
        //返回一个匿名函数接收参数并执行，当参数个数小于fn.length，则再次返回该匿名函数，
        // 继续接收参数并执行，直至参数个数等于fn.length。最后，调用apply执行预定义函数。
        var len = fn.length;
        return function (x) {
            args.push(x);
            return args.length < len ? arguments.callee : fn.apply(this, args);
        }
    },
    /*测试用例*/
    //var fn = function (a, b, c) {return a + b + c};
    //var aaaa = curryIt(fn)(1)(2)(3);
    //console.log(aaaa);


    /*转换成2进制*/
    convertToBinary: function (num) {
        var bit = num.toString(2);
        while (bit.length < 8) {
            bit = '0' + bit;
        }
        return bit;
    },

    /*保留精度的乘法*/
    multiply: function (a, b) {
        aLen = a.toString().substring(a.toString().indexOf(".") + 1).length;
        bLen = b.toString().substring(b.toString().indexOf(".") + 1).length;
        return (a * b).toFixed(Math.max(aLen, bLen));
    },

    /*对象转数组*/
    iterate: function (obj) {
        var attr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                attr.push(key + ':' + obj[key]);
            }
        }
        return attr;
    },

    /*
     获取 url 中的参数
     1. 指定参数名称，返回该参数的值 或者 空字符串
     2. 不指定参数名称，返回全部的参数对象 或者 {}
     3. 如果存在多个同名参数，则返回数组
     */
    getUrlParam: function (sUrl, sKey) {
        var string1 = sUrl.split('#')[0].split('?')[1];
        //console.log(arr);

        //如果指定参数
        if (sKey) {
            var arr = string1.split('&');
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                var key = arr[i].split('=');
                //存在同名参数 返回数组
                if (key[0] == sKey) {
                    result.push(key[1]);
                }
            }
            //返回参数的值或者空字符串
            if (result.length == 1) {
                return result[0];
            } else if (result.length == 0) {
                return '';
            } else {
                return result;
            }

        } else {//不指定参数
            //字符串参数不存在
            if (string1 == undefined || string1 == '') {
                return {};
            } else {
                var arr2 = string1.split('&');
                var arrObj = {};
                for (var i = 0; i < arr2.length; i++) {
                    var tmp = arr2[i].split('=');
                    if (!(tmp[0] in arrObj)) {
                        arrObj[tmp[0]] = [];
                    }
                    arrObj[tmp[0]].push(tmp[1]);
                }
                return arrObj;
            }
        }
    }
    /*测试用例*/
    //var aaa = getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe', 'key');

}
;

chill.frame = {
    addDouBan: function (elem) {
        var frame = '<iframe name="iframe_canvas" src="http://douban.fm/partner/baidu/doubanradio" scrolling="no" frameborder="0" width="420" height="190"></iframe>';
        elem.innerHTML(frame);
    }
};

Array.prototype.distinct = function (scrArr) {
    var arrAfterSolve = [];
    var isRepeated;
    for (var i = 0, len = scr.length; i < len; i++) {
        isRepeated = false;
        for (var j = i + 1, len = scr.length; j < len; j++) {
            if (scrArr[i] === scrArr[j]) {
                isRepeated = true;
                break;
            }
        }
        if (!isRepeated) {
            arrAfterSolve.push(scrArr[i]);
        }

    }
    return arrAfterSolve;
};

Array.prototype.Unique = function (arr) {
    var newArr = [];
    var hash = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!hash[arr[i]]) {
            hash[arr[i]] = true;
            newArr.push(arr[i]);
        }
    }
    return newArr;
};

Strings.prototype.trim = function (sTest) {
    reg = /^\s+ | \s+$ /g;
    sTest.replace(reg, '');
    return sTest;
};