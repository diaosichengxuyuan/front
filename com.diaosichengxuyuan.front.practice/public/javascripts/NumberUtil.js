class NumberUtil {
    constructor() { }

    add = function (number1, number2) {
        let result = "";
        //进位
        let carry = 0;

        for (let index1 = number1.length - 1, index2 = number2.length - 1; index1 >= 0 || index2 >= 0; index1-- , index2--) {
            let char1 = number1.charAt(index1);
            if (!char1) {
                char1 = "0";
            }

            let char2 = number2.charAt(index2);
            if (!char2) {
                char2 = "0";
            }

            const sum = Number(char1) + Number(char2) + carry;
            if (sum > 9) {
                carry = 1;
            }
            else {
                carry = 0;
            }

            result = String(sum).charAt(carry) + result;
        }

        if (carry == 1) {
            result = "1" + result;
        }

        return result;
    }

    isNumberOfSingleChar = function(c){
        if(c.match(/^[0-9]$/)){
            return true;
        }
        
        return false;
    }
}

export default new NumberUtil();