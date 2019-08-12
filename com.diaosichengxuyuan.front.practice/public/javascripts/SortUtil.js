class SortUtil {
    constructor() {
    }

    heapSort = function (data, n) {
        this.build(data);
        const length = data.length;
        if (n == null) {
            n = length - 1;
        }
        if (n >= length) {
            n = length - 1;
        }
        for (let i = length - 1; i > length - 1 - n; i--) {
            this.exchange(data, i, 0);
            this.adjust(data, 0, i);
        }
    }

    build = function (data) {
        const length = data.length;
        //第一个非叶子节点
        const firstNotLeaf = Math.floor(length / 2) - 1;

        //从第一个非叶子节点向上调整
        for (let i = firstNotLeaf; i >= 0; i--) {
            this.adjust(data, i, length);
        }
    }

    exchange = function (data, i, j) {
        const temp = data[j];
        data[j] = data[i];
        data[i] = temp;
    }

    adjust = function (data, i, length) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        let max = i;
        if (left <= length - 1 && data[left] > data[max]) {
            max = left;
        }
        if (right <= length - 1 && data[right] > data[max]) {
            max = right;
        }

        if (max != i) {
            this.exchange(data, i, max);
            this.adjust(data, max, length);
        }
    }
}

export default new SortUtil();