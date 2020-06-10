(function() {
    loadCss("../wp-content/themes/Giligili/css/OwO_button.css");//OwO按钮的css路径
    function loadCss(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
    function getHtml() {
        var s = "";
        var xmlhttp;
        var url = "../wp-content/themes/Giligili/emoji/OwO.min.json";
        if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest(); else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                for (var i = 0; i < Object.keys(json).length; i++) {
                    if (i == 0) for (var a = 0, n = json[Object.keys(json)[i]].container; a < n.length; a++) {//颜文字
                        s += '<li title="' + n[a].text + '" data-OwO=\'' + n[a].icon + '\'>' + n[a].icon + "</li>";
                    } else if (i == 1 || i == 3) for (var a = 0, n = json[Object.keys(json)[i]].container; a < n.length; a++) {//阿鲁
                        s += '<li title="' + n[a].text + '" data-OwO="@(' + n[a].text + ')">' + n[a].icon + "</li>";
                    } else for (var a = 0, n = json[Object.keys(json)[i]].container; a < n.length; a++) {//泡泡
                        s += '<li title="' + n[a].text + '" data-OwO="@[' + n[a].text + ']">' + n[a].icon + "</li>";
                    }
                }
            }
        };
        xmlhttp.open("GET", url, false);//同步加载
        xmlhttp.send();
        return '<ul class="OwO-button">' + s + "</ul>";
    }
    tinymce.PluginManager.add("OwO", function(editor, url) {
        editor.addButton("OwO", {
            type:"panelbutton",
            panel:{
                classes:"smily",
                role:"application",
                autohide:true,
                html:getHtml,
                onclick:function(e) {
                    var linkElm = editor.dom.getParent(e.target, "li");
                    if (linkElm) {
                        editor.insertContent(linkElm.getAttribute("data-OwO"));
                        this.hide();
                    }
                }
            },
            text: "OwO表情",
        });
    });
    tinymce.PluginManager.add("more_link", function(editor, url) {
        editor.addButton("more_link", {
          	text: "自定义链接",
          	icon: false,
            onclick: function(e) {
              editor.windowManager.open({
                title: '插入自定义链接',
                minWidth: 700,
                body: [{
                  type: 'listbox',
                  name: 'ljlx',
                  label: '请选择链接类型',
                  values: [{
                    text: '普通链接（带样式）',
                    value: ''
                  },{
                    text: '普通链接（无样式）',
                    value: 'no-des'
                  },{
                    text: '@',
                    value: 'at'
                  }]
                },{
                  type: 'textbox',
                  name: 'ljurl',
                  label: '请输入URL',
                  placeholder: '链接URL',
                },{
                  type: 'textbox',
                  name: 'ljwb',
                  label: '请输入链接文本',
                  placeholder: '链接文本',
                }],
                onsubmit: function(e) {
                  	editor.insertContent('<a target="_blank" class="' + e.data.ljlx + '" href="' + e.data.ljurl + '">' + e.data.ljwb + '</a>');
                }
              });
            },  
        });
    });
	tinymce.PluginManager.add("add_code", function(editor, url) {
        editor.addButton("add_code", {
          	text: "插入代码",
          	icon: false,
            onclick: function() {
            	editor.windowManager.open({
                    title: '代码标签',
                    minWidth: 700,
                    body: [{
                        type: 'textbox',
                        name: 'lang',
                        label: '语言类型',
                        placeholder: '语言类型',
                    },{
                        type: 'textbox',
                        name: 'code',
                        label: '代码',
                        placeholder: '请输入您的代码......',
                        multiline: true,
                        minWidth: 300,
                        minHeight: 100
                    }],
                    onsubmit: function(e) {
                        var code = e.data.code.replace(/\r\n/gmi, '\n'),
                            code = tinymce.html.Entities.encodeAllRaw(code);
                        editor.insertContent('[gilicode language="' + e.data.lang + '"]' + code + '[/gilicode]');
                    }
                });
            }
        });
    });
  	tinymce.PluginManager.add("add_post", function(editor, url) {
        editor.addButton("add_post", {
          	text: "插入文章",
          	icon: false,
            onclick: function() {
            	editor.windowManager.open({
                    title: '插入文章',
                    minWidth: 400,
                    body: [{
                        type: 'textbox',
                        name: 'id',
                        label: '文章id',
                        placeholder: '文章id',
                    }],
                    onsubmit: function(e) {
                        editor.insertContent('[giligili_post ids="' + e.data.id + '"]');
                    }
                });
            }
        });
    });
    tinymce.PluginManager.add("add_tips", function(editor, url) {
        editor.addButton("add_tips", {
          	text: "插入提示",
          	icon: false,
            onclick: function(e) {
              editor.windowManager.open({
                title: '插入提示',
                minWidth: 700,
                body: [{
                  type: 'listbox',
                  name: 'tslx',
                  label: '请选择提示类型',
                  values: [{
                    text: '提示',
                    value: 'info'
                  },{
                    text: '警告',
                    value: 'warn'
                  },{
                    text: '成功',
                    value: 'success'
                  },{
                    text: '错误',
                    value: 'error'
                  }]
                },{
                  type: 'textbox',
                  name: 'tswb',
                  label: '请输入提示文本',
                  placeholder: '提示文本',
                }],
                onsubmit: function(e) {
                  	editor.insertContent('[' + e.data.tslx + ']' + e.data.tswb + '[/' + e.data.tslx + ']');
                }
              });
            },  
        });
    });
  	tinymce.PluginManager.add("add_hide", function(editor, url) {
        editor.addButton("add_hide", {
          	text: "插入半隐内容",
          	icon: false,
            onclick: function() {
            	editor.windowManager.open({
                    title: '插入半隐内容',
                    minWidth: 400,
                    body: [{
                        type: 'textbox',
                        name: 'content',
                        label: '内容',
                        placeholder: '内容',
                    }],
                    onsubmit: function(e) {
                        editor.insertContent('[hide]' + e.data.content + '[/hide]');
                    }
                });
            }
        });
    });
  	tinymce.PluginManager.add("add_apart", function(editor, url) {
        editor.addButton("add_apart", {
          	text: "插入分隔符",
          	icon: false,
            onclick: function() {
            	editor.windowManager.open({
                    title: '插入分隔符',
                    minWidth: 400,
                    body: [{
                        type: 'listbox',
                        name: 'fglx',
                        label: '请选择分隔符类型',
                        values: [{
                          text: '样式1（两个点）',
                          value: 'gp'
                        },{
                          text: '样式2（一条线）',
                          value: 'gr'
                        }]
                    }],
                    onsubmit: function(e) {
                        editor.insertContent('[' + e.data.fglx + ']');
                    }
                });
            }
        });
    });
})();