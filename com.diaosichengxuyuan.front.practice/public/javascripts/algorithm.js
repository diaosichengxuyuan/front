import { map } from "./util.js";

const show = function () {
    return map.id;
}






const leecodeElement = document.getElementsByClassName("leecode")[0];
leecodeElement.innerText = show();