import NumberUtil from "./NumberUtil.js";
import StringUtil from "./StringUtil.js";

//1
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

//2
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

//3
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

//8
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

//22
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

//34
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

//64
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

//75
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

//94
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

//136
//给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
//你的算法应该具有线性时间复杂度，不使用额外空间。
var singleNumber = function (nums) {
    let result = 0;
    for (let index in nums) {
        result ^= nums[index];
    }
    return result;
};

//198
//你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是
//相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
var rob = function (nums) {
    let maxValue = 0;
    let preMaxVaule = 0;
    for (let index in nums) {
        const temp = maxValue;
        maxValue = Math.max(maxValue, preMaxVaule + nums[index]);
        preMaxVaule = temp;
    }

    return maxValue;
};

//344
//编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组char[]的形式给出。
//不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用O(1)的额外空间解决这一问题。
//你可以假设数组中的所有字符都是ASCII码表中的可打印字符。
//双指针
var reverseString = function (s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        const temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }

    return s;
};

//347
//给定一个非空的整数数组，返回其中出现频率前k高的元素。
//堆排序
var topKFrequent = function (nums, k) {
    const map = new Map();
    for (let index in nums) {
        const val = nums[index];
        let count = map.get(val);
        if (count == null) {
            map.set(val, 1);
        } else {
            map.set(val, ++count);
        }
    }

    const data = [];
    map.forEach(function (value, key) {
        data.push({
            key: key,
            value: value
        });
    });

    build(data);

    const result = [];
    for (let i = data.length - 1; i > data.length - 1 - k; i--) {
        result.push(data[0].key);
        exchange(data, i, 0);
        adjust(data, 0, i);
    }

    return result;
};


function build(data) {
    const length = data.length;
    //第一个非叶子节点
    const firstNotLeaf = Math.floor(length / 2) - 1;

    //从第一个非叶子节点向上调整
    for (let i = firstNotLeaf; i >= 0; i--) {
        adjust(data, i, length);
    }
}

function exchange(data, i, j) {
    const temp = data[j];
    data[j] = data[i];
    data[i] = temp;
}

function adjust(data, i, length) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    let max = i;
    if (left <= length - 1 && data[left].value > data[max].value) {
        max = left;
    }
    if (right <= length - 1 && data[right].value > data[max].value) {
        max = right;
    }

    if (max != i) {
        exchange(data, i, max);
        adjust(data, max, length);
    }
}

//365
//有两个容量分别为x升和y升的水壶以及无限多的水。请判断能否通过使用这两个水壶，从而可以得到恰好z升的水？
//如果可以，最后请用以上水壶中的一或两个来盛放取得的z升水。
//你允许：装满任意一个水壶；清空任意一个水壶；从一个水壶向另外一个水壶倒水，直到装满或者倒空。
//裴蜀定理
var canMeasureWater = function (x, y, z) {
    if (z > x + y) {
        return false;
    }

    if (z == 0) {
        return true;
    }

    if (x == 0) {
        return y == z;
    }

    if (y == 0) {
        return x == z;
    }

    const gcd = NumberUtil.gcd(x, y);
    if (z % gcd == 0) {
        return true;
    }

    return false;
};

//496
//给定两个没有重复元素的数组nums1和nums2，其中nums1是nums2的子集。找到nums1中每个元素在nums2中的下一个比其大的值。
//nums1中数字x的下一个更大元素是指x在nums2中对应位置的右边的第一个比x大的元素。如果不存在，对应位置输出-1。
//递减栈
var nextGreaterElement = function (nums1, nums2) {
    const map = new Map();
    const stack = [];
    for (let index in nums2) {
        const currentElem = nums2[index];
        let topElem;
        while (stack.length > 0 && currentElem > (topElem = stack[stack.length - 1])) {
            map.set(stack.pop(), currentElem);
        }

        stack.push(currentElem);
    }

    const result = [];
    for (let index in nums1) {
        const value = map.get(nums1[index]);
        result.push(value == null ? -1 : value);
    }

    return result;
};

//495
//在《英雄联盟》的世界中，有一个叫“提莫”的英雄，他的攻击可以让敌方英雄艾希（编者注：寒冰射手）进入中毒状态。现在，给出提莫对艾希的攻击时间序列和提莫攻击的中毒持续时间，
//你需要输出艾希的中毒状态总时长。你可以认为提莫在给定的时间点进行攻击，并立即使艾希处于中毒状态。
//输入:[1,4],2  输出: 4
//原因: 在第1秒开始时，提莫开始对艾希进行攻击并使其立即中毒。中毒状态会维持2秒钟，直到第2秒钟结束。
//在第4秒开始时，提莫再次攻击艾希，使得艾希获得另外2秒的中毒时间。所以最终输出4秒。
//两个时间点的间隔与持续时间比较
var findPoisonedDuration = function (timeSeries, duration) {
    if (timeSeries == null || timeSeries.length == 0) {
        return 0;
    }

    let result = 0;
    let startIndex = timeSeries[0];
    let endIndex = startIndex + duration;

    for (let index in timeSeries) {
        const time = timeSeries[index];
        if (time <= endIndex) {
            endIndex = time + duration;
        } else {
            result += endIndex - startIndex;
            startIndex = time;
            endIndex = time + duration;
        }
    }

    result += endIndex - startIndex;

    return result;
};

//451
//给定一个字符串，请将字符串里的字符按照出现的频率降序排列。
//输入:"tree" 输出:"eert" 此外，"eetr"也是一个有效的答案。
//桶排序
var frequencySort = function (s) {
    const map = new Map();
    for (let index = 0; index < s.length; index++) {
        const key = s.charAt(index);
        let value = map.get(key);
        if (value == null) {
            map.set(key, 1);
        } else {
            map.set(key, ++value);
        }
    }

    //桶
    const array = [];
    map.forEach(function (value, key) {
        const bucketValue = array[value];
        if (bucketValue == null) {
            array[value] = [key];
        } else {
            bucketValue.push(key);
        }
    });

    let result = "";
    for (let i = array.length - 1; i >= 0; i--) {
        const iValue = array[i];
        if (iValue == null) {
            continue;
        }

        for (let j in iValue) {
            const jValue = iValue[j];
            for (let k = 0; k < i; k++) {
                result += jValue;
            }
        }
    }

    return result;
};

const test = function () {
}

const leecodeElement = document.getElementsByClassName("leecode")[0];
leecodeElement.innerText = test();