import NumberUtil from "./utils.js";

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



const test = function () {
}

const leecodeElement = document.getElementsByClassName("leecode")[0];
leecodeElement.innerText = test();