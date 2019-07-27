class StringUtil {
    constructor() {

    }

    isAllSpace = function (str) {
        if (str == null) {
            return false;
        }

        if (str.match(/^[ ]+$/)) {
            return true;
        }
        else {
            return false;
        }
    }

    isEmpty = function (str) {
        if (str == null) {
            return true;
        }

        if (str.match(/^[ ]*$/)) {
            return true;
        }
        
        return false;
    }
}

export default new StringUtil();