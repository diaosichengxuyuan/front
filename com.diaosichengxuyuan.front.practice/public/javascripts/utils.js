class NumberUtil {
    constructor() { }

    bigNumberAdd = function (a, b) {
        var res = '',
            temp = 0;
        a = a.split('');
        b = b.split('');
        while (a.length || b.length || temp) {
            temp += ~~a.pop() + ~~b.pop();
            res = (temp % 10) + res;
            temp = temp > 9;
        }

        if (res == '0') {
            return '0';
        }

        return res.replace(/^0+/, '');
    }
}

export default new NumberUtil();