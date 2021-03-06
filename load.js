(function () {
    let preList = document.querySelectorAll('#mw-content-text pre:not([done])'), el
    let cs = console, name = 'prism', license = 'CC BY-NC-SA 4.0', st = 'U2FsdCBsb3ZlbHk='
    let cdn = 'cdn.jsdelivr.net/gh', repo = 'MCBBSWikiPrismLoader'
    if (preList.length < 1) { return }
    for (let i = 0; i < preList.length; i++) {
        el = preList[i]
        el.classList.add('line-numbers')
        if (el.childNodes.length <= 1) {
            // 有多个节点的一般是含有子元素的
            el.innerHTML = '<code class="language-' + langGuess(el) + '">' + el.innerHTML + '</code>'
        }
        el.setAttribute('done', '')
    }
    loadAssetrs()
    function langGuess(el) {
        let pel = el.parentNode, i
        let thisHref = mw.config.get('wgPageName') || window.location.href.replace('/index.php?', '/').replace('/api.php?', '/').replace('/load.php?', '/')
        let langList = [
            'scss', 'css', 'sass', 'less',
            'json', 'js', 'javascrip', 'ts', 'typescript',
            'java', 'kotlin',
            'vbnet', 'vb', 'basic',
            'batch', 'powershell',
            'python', 'py', 'lua', 'sql',
            'cpp', 'c#',
            'bbcode', 'markdown',
            'php', 'asp', 'html',
        ]
        for (i = 0; i < langList.length; i++) {
            if (pel.classList.contains(langList[i])) { return langList[i] }
        }
        for (i = 0; i < langList.length; i++) {
            if (thisHref.indexOf('.' + langList[i]) != -1) { return langList[i] }
        }
        let langEigen = [
            // { lang: '', eig: '' },
            {
                lang: 'wiki', eig: [
                    /(\n|^)=+\s?[^=]+\s?=+(\n|$)/,      // == 二级标题 ==
                    /\[\[(分类|category):[^\]]+\]\]/i,  // [[分类: ... ]]
                    /\{\{(color|font)\|[^\}]+\}\}/i,    // {{color| ... }}
                    /\{\{\s?#(if|ifeq|switch)\s?:/i,    // {{#if: ... }}
                    /^\s*\{\{[^\n]+\}\}\s*$/,           // {{ ... }} <-仅一行
                ]
            }, {
                lang: 'cpp', eig: [
                    /cout\s?<</,                        // cout <<
                    /(\n|^)#include [<"]iostream[>"]/   // #include <iostream>
                ]
            }, {
                lang: 'c', eig: [
                    /(\n|^)#(include|define)/,          // #include
                ]
            }, {
                lang: 'vbnet', eig: [
                    'Console.WriteLine'
                ]
            }, {
                lang: 'vb', eig: [
                    /(Dim|Public|Private) [\S]+ As (Integer|String|Long|Byte)/,
                    /\n\s*End (Function|Sub|If|Class|Type)(\s|$)/, // End Function
                ]
            }, {
                lang: 'java', eig: [
                    'System.out.print',
                    'public static void main',
                ]
            }, {
                lang: 'ts', eig: [
                    /[0-9a-zA-Z$]:\s?(number|string|any)([\s,\)]|\n)/
                ]
            }, {
                lang: 'js', eig: [
                    /(\n|^)[\(\!]function\s?\(\s?\)\s?\{/,  // (function (){})
                    /(\s|^)(\$\(document\)\.|console\.log\(|document\.write\(|mw\.(loader\.load|config\.[gs]et)\()/,
                ]
            }, {
                lang: 'go', eig: [
                    'fmt.Println',
                ]
            }, {
                lang: 'kotlin', eig: [
                    'fun main('
                ]
            }, {
                lang: 'php', eig: [
                    '<?php',
                ]
            }, {
                lang: 'bbcode', eig: [
                    /\[\/(color|size|table)\]/,         // [/table]
                ]
            }, {
                lang: 'html', eig: [
                    /<\/(html|body|head|title|audio|video)>/i,
                ]
            },
        ]
        for (let l of langEigen) {
            for (let e of l.eig) {
                if (typeof e == 'string') {
                    if (el.textContent.indexOf(e) != -1) {
                        return l.lang
                    }
                } else if (e instanceof RegExp) {
                    if (e.test(el.textContent)) {
                        return l.lang
                    }
                }
            }
        }
        // if (el.childNodes.length > 1) {
        //     return 'none'
        // } else {
        return 'wiki'
        // }
    }
    cs.log(`[${name}.js\u8F85\u52A9\u4EE3\u7801]: \u4EE3\u7801\u4F5C\u8005\uFF1A${dcb64(st)}\uFF0C\u4EE5${license}\u534F\u8BAE\u5206\u53D1\uFF0C\u8F6C\u8F7D\u65F6\u5FC5\u987B\u6CE8\u660E\u4F5C\u8005\u540D\u5B57\u201C${dcb64(st)}\u201D\uFF0C\u5FC5\u987B\u6CE8\u660E\u4E0D\u5F97\u5546\u7528\u4E14\u4EE5\u76F8\u540C\u7684\u534F\u8BAE\u5206\u53D1`)
    function loadAssetrs() {
        mw.loader.load(`https://${cdn}/${dcb64(st).replace(' ', '-')}/${repo}/${name}.js`);
        mw.loader.load(`https://${cdn}/${dcb64(st).replace(' ', '-')}/${repo}/${name}.css`, 'text/css')
    }
    function dcb64(str) {
        return atob(str)
    }
})()
