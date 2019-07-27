import NumberUtil from "./NumberUtil.js";
import StringUtil from "./StringUtil.js";

//给定一个整数数组nums和一个目标值target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
//你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
const twoElemSum = function (nums, target) {
    const map = new Map();
    for (let [index, elem] of nums.entries()) {
        const firstElemIndex = map.get(target - elem);
        if (firstElemIndex == undefined) {
            map.set(elem, index);
        } else {
            return [firstElemIndex, index];
        }
    }
};

//给出两个非空的链表用来表示两个非负的整数。其中，它们各自的位数是按照逆序的方式存储的，并且它们的每个节点只能存储一位数字。
//如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。您可以假设除了数字0之外，这两个数都不会以0开头。
const addTwoNumbers = function (l1, l2) {
    let number1Str = "";
    let nextNode = l1;
    while (nextNode) {
        const val = nextNode.val;
        number1Str = val + number1Str;
        nextNode = nextNode.next;
    }

    let number2Str = "";
    nextNode = l2;
    while (nextNode) {
        const val = nextNode.val;
        number2Str = val + number2Str;
        nextNode = nextNode.next;
    }

    const sum = NumberUtil.add(number1Str, number2Str);
    const firstNode = new ListNode();
    nextNode = firstNode;
    for (let index = sum.length - 1; index >= 0; index--) {
        const val = Number(sum.charAt(index));
        nextNode.val = val;
        if (index != 0) {
            const tempNode = new ListNode();
            nextNode.next = tempNode;
            nextNode = tempNode;
        }
    }

    return firstNode;
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}


//给定一个字符串，请你找出其中不含有重复字符的最长子串的长度。
//输入"pwwkew"，输出3，因为无重复字符的最长子串是"wke"，所以其长度为3
const lengthOfLongestSubstring = function (s) {
    if (!s) {
        return 0;
    }

    let maxLength = 0;
    const queue = [];

    for (let index = 0; index < s.length; index++) {
        const c = s.charAt(index);
        const cIndex = queue.indexOf(c);

        if (cIndex != -1) {
            if (queue.length > maxLength) {
                maxLength = queue.length;
            }
            queue.splice(0, cIndex + 1);
        }

        queue.push(c);
    }

    if (queue.length > maxLength) {
        maxLength = queue.length;
    }

    return maxLength;
};

//请你来实现一个 atoi 函数，使其能将字符串转换成整数。
//首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
//当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
//该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。
//注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。在任何情况下，若函数不能进行有效的转换时，请返回0。
//说明：假设我们的环境只能存储32位大小的有符号整数，那么其数值范围为[−231,231−1]。如果数值超过这个范围，请返回INT_MAX(231−1)或INT_MIN(−231)。
var atoi = function (str) {
    if (StringUtil.isEmpty(str)) {
        return 0;
    }

    const numberArray = [];
    //是否找到第一个有效整数，+ - 0~9
    let hasFoundFirstValidNumber = false;
    //正负号
    let symbol = "";

    for (let index = 0; index < str.length; index++) {
        const char = str.charAt(index);
        if (hasFoundFirstValidNumber) {
            if (NumberUtil.isNumberOfSingleChar(char)) {
                numberArray.push(char);
            } else {
                break;
            }
        } else if (char == "+" || char == "-") {
            symbol = char;
            hasFoundFirstValidNumber = true;
        }
        else if (char == " ") {
        } else if (NumberUtil.isNumberOfSingleChar(char)) {
            numberArray.push(char);
            hasFoundFirstValidNumber = true;
        } else {
            return 0;
        }
    }

    if (numberArray.length == 0) {
        return 0;
    }

    let result = Number(numberArray.join(""));
    if (symbol == "-") {
        result = -1 * result;
    }

    const maxValue = Math.pow(2, 31) - 1;
    if (result > maxValue) {
        return maxValue;
    }

    const minValue = -1 * Math.pow(2, 31);
    if (result < minValue) {
        return minValue;
    }

    return result;
};



const test = function () {
}

const leecodeElement = document.getElementsByClassName("leecode")[0];
leecodeElement.innerText = test();