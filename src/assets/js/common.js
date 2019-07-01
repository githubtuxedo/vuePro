
//特性检测 浏览器类型
function BrowserType() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    // var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isIE = window.ActiveXObject || "ActiveXObject" in window
    // var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && !isEdge; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (userAgent.indexOf('MSIE 6.0') != -1) {
            return "IE6";
        } else if (fIEVersion == 7) {
            return "IE7";
        } else if (fIEVersion == 8) {
            return "IE8";
        } else if (fIEVersion == 9) {
            return "IE9";
        } else if (fIEVersion == 10) {
            return "IE10";
        } else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
            return "IE11";
        } else {
            return "0"
        } //IE版本过低
    } //isIE end

    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
    if (isEdge) {
        return "Edge";
    }
}
const inputSetting = {

    moneyinput: function(settings) {
        'use strict';

        var defaults = {
            textalign: 'right',
            defaultValue: '0.00',
            len: 2, //小数部分位数
            noEndZero: false, //是否去掉末尾的0
            allowNull: true, //是否可以为空
            allowDecimal: false, //是否可以为负数
            maxlength: 16, //输入框最大长度
            integer: false, // 是否整数
            integerlen: 0, //整数部分位数
            max: undefined, //允许最大值
        };
        settings = $.extend(true, defaults, settings);

        return $(this).each(function (i, v) {
            var input = $(v),
                //				var input = $(this).jqxInput(),
                oldValue = input.val() == '' ? settings.defaultValue : input.val(),
                color = input.css("color");
            // if (settings.number) {
            //     input.attr("type", 'number').css('text-align', settings.textalign);
            // } else {
            //     input.attr("type", 'text').css('text-align', settings.textalign);
            // }
            var isNumber = function (value) {
                return !isNaN(parseFloat(value)) && isFinite(value);
            };
            var isNumberReg = function (value) {
                return /^[-]?\d+(\.\d+)?$/g.exec(value);
            };
            var formatNumber = function (value) {
                if (/^[-]?\d+(\.\d{2})$/g.exec(value)) {
                    return value;
                }
                if (/^[-]?\d+(\.\d{1})$/g.exec(value)) {
                    return value + '0';
                }
                if (/^[-]?\d+(\.)$/g.exec(value)) {
                    return value + '00';
                }
                if (/^[-]?\d+$/g.exec(value)) {
                    return value + ".00";
                }
                if (/^[-]?\d+(\.\d{2,})$/g.exec(value)) {
                    return value.substring(0, value.indexOf(".") + 3);
                }
                if (value == "") {
                    return '0';
                }
                value = oldValue;
                return value;
            };
            input.attr('maxlength', settings.maxlength);
            input.on({
                "change": function (e) {
                    var value = input.val();
                    if (value == '') {
                        if (settings.allowNull) {
                            return;
                        }
                        oldValue = 0;
                    }
                    if (!isNumber(value)) { //输入的内容可以进行计算
                        value = oldValue;
                    } else {
                        value = settings.allowDecimal === true ?
                            parseFloat(value).toString() :
                            Math.abs(value).toString();
                    }
                    if (settings.noEndZero) {
                        oldValue = money(value, settings.len, true);
                    } else {
                        oldValue = money(value, settings.len);
                    }

                    if (settings.integer === true) {
                        oldValue = parseInt(value);
                    }
                    if (settings.integerlen !== 0) {
                        var valuefirst = oldValue.toString();
                        var point = valuefirst.indexOf('.');
                        var addlen = 0;
                        if (valuefirst.indexOf('-') > -1) { //允许为负时整数位多一位
                            addlen = 1;
                        }
                        if (point > -1) { //有小数点时判断整数位数
                            var valueother = valuefirst.substr(0, point);
                            if (valueother.length > settings.integerlen + addlen) {
                                oldValue = valuefirst.substr(0, settings.integerlen + addlen);
                                oldValue = parseInt(oldValue);
                            }
                        } else {
                            if (valuefirst.length > settings.integerlen + addlen) {
                                oldValue = valuefirst.substr(0, settings.integerlen + addlen);
                                oldValue = parseInt(oldValue);
                            }
                        }

                    }
                    if (settings.max != undefined && oldValue > settings.max) {
                        oldValue = settings.max;
                    }
                    input.val(oldValue);
                    input.css({
                        "color": color
                    });
                },
                "blur": function (e) {
                    //					console.log(e);
                    var value = input.val();
                    if (value == '') {
                        if (settings.allowNull) {
                            return;
                        }
                        oldValue = 0;
                    }
                    if (!isNumber(value)) { //输入的内容可以进行计算
                        value = oldValue;
                    } else {
                        value = settings.allowDecimal === true ?
                            parseFloat(value).toString() :
                            Math.abs(value).toString();
                    }
                    if (settings.noEndZero) {
                        oldValue = money(value, settings.len, true);
                    } else {
                        oldValue = money(value, settings.len);
                    }

                    if (settings.integer === true) {
                        oldValue = parseInt(value);
                    }
                    if (settings.integerlen !== 0) {
                        var valuefirst = oldValue.toString();
                        var point = valuefirst.indexOf('.');
                        var addlen = 0;
                        if (valuefirst.indexOf('-') > -1) { //允许为负时整数位多一位
                            addlen = 1;
                        }
                        if (point > -1) { //有小数点时判断整数位数
                            var valueother = valuefirst.substr(0, point);
                            if (valueother.length > settings.integerlen + addlen) {
                                oldValue = valuefirst.substr(0, settings.integerlen + addlen);
                                oldValue = parseInt(oldValue);
                            }
                        } else {
                            if (valuefirst.length > settings.integerlen + addlen) {
                                oldValue = valuefirst.substr(0, settings.integerlen + addlen);
                                oldValue = parseInt(oldValue);
                            }
                        }

                    }
                    input.val(oldValue);
                    input.css({
                        "color": color
                    });
                    input.trigger('keyup');
                },
                "keyup": function (e) {
                    //					//
                    var num = input.val();
                    if (num == "") {
                        if (settings.allowNull) {
                            input.val('');
                            return;
                        } else {
                            input.val('0');
                            return;
                        }

                    }
                    if (num.indexOf("-") > -1) {
                        if (settings.allowDecimal == true && num.length == 1) {
                            input.val('-');
                            return;
                        }
                        if (settings.allowDecimal == false) {
                            input.val(num.replace(/-/g, ''));
                            return;
                        }

                    }
                    if (isNaN(num)) {
                        var n = num.toString();
                        if (!isNaN(parseInt(num))) {
                            if (n.substr(-1) != '.') {
                                if (n.indexOf('.') != -1) {
                                    input.val(parseFloat(num));
                                } else {
                                    input.val(parseInt(num));
                                }
                            }

                        } else {
                            input.val(0);
                        }
                    }
                    if (settings.integer == true) {
                        if (isNaN(num)) {
                            var num = parseInt(num);
                            if (isNaN(num)) {
                                input.val(0);
                            } else {
                                input.val(parseInt(num));
                            }
                        }
                        if (num.toString().indexOf('.') > -1) {
                            input.val(parseInt(num));
                        }
                    }
                },
                "keypress": function (e) {
                    var event = e || window.event;
                    if (settings.allowDecimal !== true && event.keyCode == 45) {
                        event.returnValue = false;
                    } else if (event.keyCode > 47 && event.keyCode < 58 || event.keyCode === 46 || event.keyCode == 45) {
                        event.returnValue = true;
                    } else {
                        event.returnValue = false;
                    }
                },
                "paste": function (e) {
                    var value = input.val();
                    //					console.log('input'+value);
                    if (!isNumberReg(value)) {
                        input.css({
                            "color": "red"
                        });
                    } else {
                        input.css({
                            "color": color
                        });
                    }
                },
            });
        });
    },
}