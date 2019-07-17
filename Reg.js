/**
 * 是否是英文或数字
 */
function IsEnOrNum(input, commit) {
    if (/[\u4E00-\u9FA5]/g.test(input.val())) {
        return false;
    } else {
        return true;
    }
}

/**
 * 是否是数字, 包括整数、小数
 * @param input
 * @param commit
 * @returns {Boolean}
 *
 * add by qct
 */
function IsNum(input, commit) {
    if (input.val() == '-') return false;
    if (/^(\-?\d*)(\.\d+)?$/g.exec(input.val())) {
        return true;
    } else {
        return false;
    }
}

/**
 *  是否是符合对应的整数位数和小数位数的数字,只能为正数
 * @param maxLengthOfInt 最大整数位数
 * @param maxLengthOfDec 最大小数位数
 * @param input
 * @param commit
 * @returns {Boolean}
 *
 */
function isPositiveNumWithDecimal(input, maxLengthOfInt, maxLengthOfDec, commit) {
    var pattern = new RegExp('^(\\d{1,' + maxLengthOfInt + '})(\\.\\d{1,' + maxLengthOfDec + '})?$', 'g');
    if (pattern.exec(input.val())) {
        return true;
    } else {
        return false;
    }
}

/**
 * 是否是正整数
 */
function IsPositiveInteger(input, commit) {
    var patrn = /^\d*$/;
    if (patrn.exec(input.val())) {
        return true;
    } else {
        return false;
    }
}

/**
 * 是否邮政编码-中国6为数字
 */
function isZipCode(input, commit) {
    if (input.val() == "") return true;
    var patrn = /^\d{6}$/;
    if (patrn.exec(input.val())) {
        return true;
    } else {
        return false;
    }
}

/**
 * 0到100的正浮点数，小数部分最多保留两位
 */
function IsFloat(input, commit) {
    var patrn = /^([1-9]\d?(\.\d{1,2})?|0\.\d{1,2}|100|100.0|100.00)$/;
    if (patrn.exec(input.val())) {
        return true;
    } else {
        return false;
    }
}

/**
 * 是否相等
 */
function IsEquals(input1, input2) {
    if (input1.val() == input2.val()) {
        return true;
    } else {
        return false;
    }
}
/**
 * 中间值
 */
function IsMedian(min, max, n) {
    if (min <= n && n <= max) {
        return true;
    } else {
        return false;
    }
}
/**
 * 是否超过最大长度
 */
function isBeyondLeng(input, maxLen) {
    var str = input.val();
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    if (len <= maxLen) {
        return true;
    } else {
        return false;
    }
}

/**
 *  是否是符合对应的整数位数和小数位数的数字
 * @param maxLengthOfInt 最大整数位数
 * @param maxLengthOfDec 最大小数位数
 * @param input
 * @param commit
 * @returns {Boolean}
 *
 * add by qct 2014.07.21
 */
function isNumWithDecimal(input, maxLengthOfInt, maxLengthOfDec, commit) {
    var pattern = new RegExp('^(\\-?\\d{1,' + maxLengthOfInt + '})(\\.\\d{1,' + maxLengthOfDec + '})?$', 'g');
    if (pattern.exec(input.val())) {
        return true;
    } else {
        return false;
    }
}

/**
 * 是否MAC地址
 */
function IsMac(input, commit) {
    var patrn = /[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}/;
    if (patrn.exec(input.val())) {
        return true;
    } else {
        return false;
    }
}


/**
 * 是否代码分类
 */
function IsCodeCategory(input, commit) {
    var patrn = /^([A-Z]+_?)*[A-Z]$/;
    if (patrn.exec(input.val())) {
        return true;
    } else {
        return false;
    }
}

/**
 * 是否6位码
 */
function IsCouponCode(input, commit) {
    var patrn = /^([a-z]|[A-Z]|[0-9]){6}$/;
    if (patrn.exec(input.val())) {
        return true;
    } else {
        return false;
    }
}

/**
 * 是否IP
 */
function IsIP(input) {
    var patrn = /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/;
    if (patrn.exec(input)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 匹配无特殊字符且非空正式表达式
 * @param characters
 * @returns true pass validation,false fails to pass validation
 */
function validateAvoidSpecialCharacters(characters) {
    var reg = /^[^`~!@#$%^&*\(\)\[\]{};':",\.\/\<\>\?\ ]+$/;
    return reg.test(characters);
}

/**
 * 大写字母加下划线
 * @returns {Boolean}
 */
function isCategoryCode(v) {

    var reg = /^[A-Z]+_(([A-Z]+)|(_[A-Z]+))+$/g;
    if (reg.test(v)) {
        return true;
    } else {
        return false;
    }
}
//need to understant
function email(value) {
    return that.optional(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
}
function phone(value) {
    return that.optional(value) || /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0-9])|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/.test(value)
}
function url(value) {
    return that.optional(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
}
//ios日期验证方式
function dateISO(value) {
    return that.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}



const identifyReg = function (identify) {
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var reg = /^[1-9]\d{5}[1|2]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!regIdNo.test(idNo)) {
        return false;
    }
    return true;
}
const chinaNameReg = function (name) {
    let regName = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!regName.test(name)) {
        return false;
    }
    return true;
}
const phoneReg = function (input) {
    let patrn = /^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/;
    if (patrn.exec(input.val())) {
        return true;
    } else {
        return false;
    }
}
const emailReg = function (str) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}
export {
    phoneReg,       //判断是否手机号码
    identifyReg,    //判断是否是身份证号码
    emailReg,       //判断是否email
    chinaNameReg,   //判断是否是中国人姓名
}