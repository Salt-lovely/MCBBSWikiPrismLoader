(function () {
    var preList = document.querySelectorAll('#mw-content-text pre:not([done])'), el, cs = console
    if (preList.length < 1) { return }
    cs.log(`[pri` + `sm.` + `js\u8F85\u52A9\u4EE3\u7801]: \u4EE3\u7801\u4F5C\u8005\uFF1ASa` + `lt lov` + `ely\uFF0C\u4EE5CC BY` + `-NC` + `-SA ` + `4.0\u534F\u8BAE\u5206\u53D1\uFF0C\u8F6C\u8F7D\u65F6\u5FC5\u987B\u6CE8\u660E\u4F5C\u8005\u540D\u5B57\u201CSa` + `lt lov` + `ely\u201D\uFF0C\u5FC5\u987B\u6CE8\u660E\u4E0D\u5F97\u5546\u7528\u4E14\u4EE5\u76F8\u540C\u7684\u534F\u8BAE\u5206\u53D1`)
    for (var i = 0; i < preList.length; i++) {
        el = preList[i]
        el.classList.add('line-numbers')
        el.innerHTML = '<code class="language-' + langGuess(el) + '">' + el.innerHTML + '</code>'
        el.setAttribute('done', '')
    }
    loadAssetrs()
    function langGuess(el) {
        var pel = el.parentNode, i
        var thisHref = mw.config.get('wgPageName') || window.location.href.replace('/index.php?', '/').replace('/api.php?', '/').replace('/load.php?', '/')
        var langList = [
            'css', 'scss', 'sass', 'less',
            'js', 'javascrip', 'ts', 'typescript',
            'java', 'kotlin',
            'vb', 'basic', 'vbnet',
            'batch', 'powershell',
            'python', 'py', 'lua', 'sql',
            'cpp', 'c#',
            'bbcode', 'markdown', 'json',
            'php', 'asp', 'html',
        ]
        for (i = 0; i < langList.length; i++) {
            if (pel.classList.contains(langList[i])) { return langList[i] }
        }
        for (i = 0; i < langList.length; i++) {
            if (thisHref.indexOf('.' + langList[i]) != -1) { return langList[i] }
        }
        var langEigen = [
            // { lang: '', eig: '' },
            { lang: 'wiki', eig: /(\n|^)=+\s?[^=]+\s?=+(\n|$)/ }, { lang: 'wiki', eig: /\[\[(分类|category):[^\]]+\]\]/i },
            { lang: 'wiki', eig: /\{\{(color|font)\|[^\}]+\}\}/i }, { lang: 'wiki', eig: /\{\{\s?#(if|ifeq|switch)\s?:/i },

            { lang: 'cpp', eig: 'cout<<' }, { lang: 'cpp', eig: 'cout <<' }, { lang: 'cpp', eig: '#include <iostream>' },
            { lang: 'c', eig: /(\n|^)#include/ }, { lang: 'c', eig: /(\n|^)#define/ },

            { lang: 'vbnet', eig: 'Console.WriteLine' },
            { lang: 'vb', eig: 'As Integer' }, { lang: 'vb', eig: 'As String' }, { lang: 'vb', eig: 'End Function' }, { lang: 'vb', eig: 'End If' },

            { lang: 'java', eig: 'System.out.print' }, { lang: 'java', eig: 'public class' },

            { lang: 'ts', eig: /[0-9a-zA-Z]:\s?(number|string)([\s,\)]|\n)/ },

            { lang: 'js', eig: '$(document)' }, { lang: 'js', eig: 'console.log' },
            { lang: 'js', eig: /(\n|^)\(function\s?\(\)\s?\{/ }, { lang: 'js', eig: ' mw.loader.load(' },

            { lang: 'go', eig: 'fmt.Println' },
            { lang: 'kotlin', eig: 'fun main(' },
            { lang: 'php', eig: '<?php' },

            { lang: 'bbcode', eig: '[/color]' }, { lang: 'bbcode', eig: '[/size]' },
            { lang: 'bbcode', eig: '[/table]' },
        ]
        for (i = 0; i < langEigen.length; i++) {
            if (typeof langEigen[i].eig == 'string') {
                if (el.textContent.indexOf(langEigen[i].eig) != -1) { return langEigen[i].lang }
            } else if (langEigen[i].eig instanceof RegExp) {
                if (langEigen[i].eig.test(el.textContent)) { return langEigen[i].lang }
            }
        }
        return 'wiki'
    }
    function loadAssetrs() {
        mw.loader.load('https://cdn.jsdelivr.net/gh/Salt-lovely/MCBBSWikiPrismLoader/Prism.js');
        mw.loader.load('https://cdn.jsdelivr.net/gh/Salt-lovely/MCBBSWikiPrismLoader/Prism.css', 'text/css')
    }
})()
