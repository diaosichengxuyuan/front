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

//请你来实现一个atoi函数，使其能将字符串转换成整数。
//首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
//当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
//该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。
//注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。在任何情况下，若函数不能进行有效的转换时，请返回0。
//说明：假设我们的环境只能存储32位大小的有符号整数，那么其数值范围为[−2^31,2^31−1]。如果数值超过这个范围，请返回INT_MAX(2^31−1)或INT_MIN(−2^31)。
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

//给定一个按照升序排列的整数数组nums，和一个目标值target。找出给定目标值在数组中的开始位置和结束位置。
//你的算法时间复杂度必须是O(log n)级别。如果数组中不存在目标值，返回[-1,-1]。
//二分查找
const searchRange = function (nums, target) {
    if (nums == null || nums.length == 0 || target == null) {
        return [-1, -1];
    }

    let leftIndex = 0;
    let rightIndex = nums.length - 1;
    let validIndex = -1;
    while (leftIndex <= rightIndex) {
        const midIndex = Math.ceil((leftIndex + rightIndex) / 2);
        //只剩最后两个元素时
        if (midIndex == rightIndex) {
            if (nums[rightIndex] == target) {
                validIndex = rightIndex;
            } else if (nums[leftIndex] == target) {
                validIndex = leftIndex;
            }
            break;
        }

        const midValue = nums[midIndex];
        if (midValue > target) {
            rightIndex = midIndex;
        } else if (midValue < target) {
            leftIndex = midIndex;
        } else {
            validIndex = midIndex;
            break;
        }
    }

    if (validIndex == -1) {
        return [-1, -1];
    }

    leftIndex = validIndex;
    rightIndex = validIndex;

    while (leftIndex > 0 && nums[leftIndex - 1] == target) {
        leftIndex--;
    }
    while (rightIndex < nums.length - 1 && nums[rightIndex + 1] == target) {
        rightIndex++;
    }

    return [leftIndex, rightIndex];
};

//给定一个包含红色、白色和蓝色，一共n个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
//此题中，我们使用整数0、1和2分别表示红色、白色和蓝色。不能使用代码库中的排序函数来解决这道题。
//三指针算法
const sortColors = function (nums) {
    let leftIndex = 0;
    let rightIndex = nums.length - 1;
    let currentIndex = 0;

    while (nums[leftIndex] == 0) {
        leftIndex++;
    }
    if (leftIndex >= nums.length - 1) {
        return nums;
    }

    while (nums[rightIndex] == 2) {
        rightIndex--;
    }
    if (rightIndex <= 0) {
        return nums;
    }

    if (leftIndex >= rightIndex) {
        return nums;
    }

    currentIndex = leftIndex;

    while (currentIndex <= rightIndex && leftIndex < rightIndex) {
        if (nums[currentIndex] == 2) {
            const temp = nums[currentIndex];
            nums[currentIndex] = nums[rightIndex];
            nums[rightIndex] = temp;
            rightIndex--;
        } else if (nums[currentIndex] == 0) {
            const temp = nums[currentIndex];
            nums[currentIndex] = nums[leftIndex];
            nums[leftIndex] = temp;
            leftIndex++;
            if (leftIndex > currentIndex) {
                currentIndex++;
            }
        } else {
            currentIndex++;
        }
    }

    return nums;
};

//给定一个二叉树，返回它的中序遍历。
//莫里斯遍历
const inorderTraversal = function (root) {
    const result = [];
    let currentNode = root;
    while (currentNode != null) {
        if (currentNode.left == null) {
            result.push(currentNode.val);
            currentNode = currentNode.right;
        } else {
            const nextCurrentNode = currentNode.left;
            currentNode.left = null;
            const mostRightNode = findMostRightNode(nextCurrentNode);
            mostRightNode.right = currentNode;
            currentNode = nextCurrentNode;
        }
    }

    return result;
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function findMostRightNode(node) {
    while (node.right != null) {
        node = node.right;
    }

    return node;
}

//给出n代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
var generateParenthesis = function (n) {
    return Array.from(generateParenthesisInner(n));
};

function generateParenthesisInner(n) {
    if (n == 1) {
        const set = new Set();
        set.add("()");
        return set;
    }

    const set = new Set();
    const parenthesisSet = generateParenthesisInner(n - 1);
    for (let parenthesis of parenthesisSet) {
        for (let index = 0; index < parenthesis.length; index++) {
            set.add(parenthesis.substring(0, index) + "()" + parenthesis.substring(index));
        }
        set.add(parenthesis + "()");
    }

    return set;
};

//给定一个包含非负整数的MxN网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
//说明：每次只能向下或者向右移动一步。
//动态规划，最短路径
var minPathSum = function (grid) {
    const temp = [0];
    for (let i in grid) {
        const row = grid[i];
        for (let j in row) {
            const currentElem = row[j];
            const leftElem = temp[j - 1];
            const aboveElem = temp[j];
            temp[j] = Math.min(leftElem == null ? Number.MAX_VALUE : leftElem, aboveElem == null ? Number.MAX_VALUE : aboveElem) + currentElem;
        }
    }

    return temp[temp.length - 1];
};

const test = function () {
}

const leecodeElement = document.getElementsByClassName("leecode")[0];
leecodeElement.innerText = test();