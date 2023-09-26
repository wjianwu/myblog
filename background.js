chrome.contextMenus.create({
    title: "干掉CSDN复制、关注才能看的问题",
    contexts: ['page'],
    onclick: function () {
        executeScriptToCurrentTab('window.oncontextmenu = document.oncontextmenu = document.oncopy = null;\n' +
            '        [...document.querySelectorAll(\'body\')].forEach(dom => dom.outerHTML = dom.outerHTML);\n' +
            '        [...document.querySelectorAll(\'body, body *\')].forEach(dom => {\n' +
            '            [\'onselect\', \'onselectstart\', \'onselectend\', \'ondragstart\', \'ondragend\', \'oncontextmenu\', \'oncopy\'].forEach(ev => dom.removeAttribute(ev));\n' +
            '            dom.style[\'user-select\'] = \'auto\';\n' +
            '        });\n' +
            '        if(document.getElementsByClassName("hide-article-box").length > 0){\n' +
            '            document.getElementsByClassName("hide-article-box")[0].style.display = "none";\n' +
            '            document.getElementById("article_content").style.height = "";\n' +
            '        }')
        // window.oncontextmenu = document.oncontextmenu = document.oncopy = null;
        // [...document.querySelectorAll('body')].forEach(dom => dom.outerHTML = dom.outerHTML);
        // [...document.querySelectorAll('body, body *')].forEach(dom => {
        //     ['onselect', 'onselectstart', 'onselectend', 'ondragstart', 'ondragend', 'oncontextmenu', 'oncopy'].forEach(ev => dom.removeAttribute(ev));
        //     dom.style['user-select'] = 'auto';
        // });
        // if(document.getElementsByClassName("hide-article-box").length > 0){
        //     document.getElementsByClassName("hide-article-box")[0].style.display = "none";
        //     document.getElementById("article_content").style.height = "";
        // }

        alert("已处理掉CSDN复制、关注问题")
    }
});

chrome.contextMenus.create({
    title: '使用度娘搜索：%s', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: function (params) {
        // 注意不能使用location.href，因为location是属于background的window对象
        chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
    }
});


function executeScriptToCurrentTab(code) {
    getCurrentTabId((tabId) => {
        chrome.tabs.executeScript(tabId, {code: code});
    });
}

function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}
