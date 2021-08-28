/**
* 作者: 橙汁
* Author: Boranget
* qq: 1813654512
*/
function scheduleHtmlProvider(dom = document) {
    alert('若使用过程中出现bug, 请加qq 1813654512')
    // 返回整个课程表表格
    return dom.querySelector('#table1').outerHTML
    
}
