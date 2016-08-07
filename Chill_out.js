var chill = {};
chill.eventUtils = {
    addHandler: function (elem, type, handler) {
        if (elem.addEventListener()) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            //IE8 ��֮ǰ�汾
            elem.attachEvent('on' + type, handler);
        } else {
            //DOM0������
            elem['on' + type] = handler;
        }

    },
    getEvent: function (e) {
        var ev = window.event || e;
        return ev;
    }
};

/* ��װajax����
 * @param {string}opt.type http���ӵķ�ʽ������POST��GET���ַ�ʽ
 * @param {string}opt.url ���������url
 * @param {boolean}opt.async �Ƿ�Ϊ�첽����trueΪ�첽�ģ�falseΪͬ����
 * @param {object}opt.data ���͵Ĳ�������ʽΪ��������
 * @param {function}opt.success ajax���Ͳ����ճɹ����õĻص�����
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

    //transform����
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
 * DOM���
 * **************************/

chill.DOM = {

    // �����ѡ����API
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
            if (_index != -1) { //���ڵ�ǰclass
                arrClassName.splice(_index, 1);
                obj.clasName = arrClassName.join(' ');
            }
        }
    }
};

/****************************
 * BOM���
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
 * ��ʽ���
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
        //����Ҫ���Ԥ���庯���Ĳ�������fn.length��Ȼ������һ��������ȥ�����Щ������
        //����һ�������������ղ�����ִ�У�����������С��fn.length�����ٴη��ظ�����������
        // �������ղ�����ִ�У�ֱ��������������fn.length����󣬵���applyִ��Ԥ���庯����
        var len = fn.length;
        return function (x) {
            args.push(x);
            return args.length < len ? arguments.callee : fn.apply(this, args);
        }
    },
    /*��������*/
    //var fn = function (a, b, c) {return a + b + c};
    //var aaaa = curryIt(fn)(1)(2)(3);
    //console.log(aaaa);


    /*ת����2����*/
    convertToBinary: function (num) {
        var bit = num.toString(2);
        while (bit.length < 8) {
            bit = '0' + bit;
        }
        return bit;
    },

    /*�������ȵĳ˷�*/
    multiply: function (a, b) {
        aLen = a.toString().substring(a.toString().indexOf(".") + 1).length;
        bLen = b.toString().substring(b.toString().indexOf(".") + 1).length;
        return (a * b).toFixed(Math.max(aLen, bLen));
    },

    /*����ת����*/
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
     ��ȡ url �еĲ���
     1. ָ���������ƣ����ظò�����ֵ ���� ���ַ���
     2. ��ָ���������ƣ�����ȫ���Ĳ������� ���� {}
     3. ������ڶ��ͬ���������򷵻�����
     */
    getUrlParam: function (sUrl, sKey) {
        var string1 = sUrl.split('#')[0].split('?')[1];
        //console.log(arr);

        //���ָ������
        if (sKey) {
            var arr = string1.split('&');
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                var key = arr[i].split('=');
                //����ͬ������ ��������
                if (key[0] == sKey) {
                    result.push(key[1]);
                }
            }
            //���ز�����ֵ���߿��ַ���
            if (result.length == 1) {
                return result[0];
            } else if (result.length == 0) {
                return '';
            } else {
                return result;
            }

        } else {//��ָ������
            //�ַ�������������
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
    /*��������*/
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