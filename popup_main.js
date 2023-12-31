var h = function (a, b) {
    function c() { }
    c.prototype = b.prototype;
    a.f = b.prototype;
    a.prototype = new c;
    a.e = function (a, c, g) {
        return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
    }
};

var l = function () {
    this.d = this.c = this.url = this.b = this.title = ""
},
    m = function () {
        this.a = [];
        this.parseError = !1
    },
    n = function (a) {
        l.call(this);
        a.getElementsByTagName("CT_URL").length && (this.b = a.getElementsByTagName("CT_URL")[0].textContent);
        a.getElementsByTagName("U").length && (this.url = a.getElementsByTagName("U")[0].textContent);
        a.getElementsByTagName("T").length && (this.title = a.getElementsByTagName("T")[0].textContent);
        a.getElementsByTagName("PREVIEW_IMG").length && (this.c = a.getElementsByTagName("PREVIEW_IMG")[0].textContent);
        a.getElementsByTagName("S").length && (this.d = a.getElementsByTagName("S")[0].textContent.replace(/<br>/g, ""))
    };
h(n, l);
var p = function (a) {
    m.call(this);
    if (a.firstChild && a.getElementsByTagName("GSP").length) {
        if (a = a.getElementsByTagName("GSP")[0], a.getElementsByTagName("RES").length) {
            a = a.getElementsByTagName("RES")[0].getElementsByTagName("R");
            for (var b = 0; b < a.length; b++) {
                var c = new n(a[b]);
                "" != c.b && "" != c.url && this.a.push(c)
            }
        }
    } else this.parseError = !0
};
h(p, m);

var r = function () {
    var a = document.createElement("div");
    a.className = "SP_TopBar";
    a.appendChild(document.createTextNode("Similar Pages"));
    a.appendChild(q());
    return a
},
    q = function () {
        var a = document.createElement("a");
        a.className = "SP_CloseButton";
        a.id = "sp_close_button";
        a.src = chrome.extension.getURL("images/cross.png");
        a.addEventListener("click", function () {
            window.close()
        }, !1);
        return a
    },
    s = function () {
        var a = document.getElementById("sp_main_container");
        a || (a = document.createElement("div"), a.id = "sp_main_container",
            a.className = "SP_MainContainer");
        a.appendChild(r());
        var b = document.createElement("div");
        b.innerHTML = chrome.i18n.getMessage("sp_zero_results");
        b.className = "SP_Message";
        a.appendChild(b);
        document.body.appendChild(a)
    },
    t = function (a) {
        var b = document.createElement("div");
        b.className = "SP_SpecialCaseContainer";
        var c = r();
        b.appendChild(c);
        c = document.createElement("div");
        c.innerHTML = a;
        c.className = "SP_Message";
        c.style["text-align"] = "justify";
        b.appendChild(c);
        document.body.appendChild(b)
    },
    w = function (a, b) {
        var c = document.createElement("div");
        c.id = "page_" + b;
        c.className = " SP_PageEntry ";
        var e = u(a.b + "&output=br"),
            f = document.createElement("a");
        f.className = "SP_ImageAnchor";
        f.addEventListener("click", function () {
            window.close()
        }, !1);
        var g = document.createElement("div");
        g.className = "SP_ImageWrapper";
        var d = document.createElement("img");
        d.id = "img_" + b;
        d.className = "SP_ImageThumb";
        v(d);
        d.src = a.c;
        g.appendChild(d);
        f.appendChild(g);
        c.appendChild(f);
        f = document.createElement("div");
        f.className = "SP_PageEntryText";
        g = document.createElement("div");
        g.className =
            "SP_PageEntryTitle_Snippet";
        d = document.createElement("div");
        d.className = "SP_PageEntryTitle";
        var k = document.createElement("a");
        k.addEventListener("click", function () {
            window.close()
        }, !1);
        k.innerHTML = a.title;
        k.title = a.title.replace("<b>", "").replace("</b>", "");
        d.appendChild(k);
        g.appendChild(d);
        d = document.createElement("span");
        d.className = 25 < a.title.length ? "SP_PageEntrySnippet1" : "SP_PageEntrySnippet";
        d.innerHTML = a.d;
        g.appendChild(d);
        f.appendChild(g);
        g = document.createElement("a");
        g.href = a.url;
        d = document.createElement("div");
        d.className = "SP_PageEntryUrl";
        d.textContent = g.hostname;
        f.appendChild(d);
        c.appendChild(f);
        c.onclick = function () {
            chrome.tabs.create({
                url: e
            })
        };
        return c
    },
    u = function (a) {
        return chrome.i18n.getMessage("sp_redirect_host") + a
    },
    v = function (a) {
        var b = a.id;
        a.addEventListener("error", function () {
            var a = document.getElementById(b),
                e = a.parentNode;
            e.className += " SP_ImageNotFound ";
            e.removeChild(a);
            a = document.createElement("span");
            a.innerHTML = chrome.i18n.getMessage("sp_preview_not_available");
            e.appendChild(a)
        }, !1)
    };
var y = function (a) {
    var b = x,
        c = new XMLHttpRequest;
    c.open("GET", a, !1);
    c.onreadystatechange = function () {
        4 == c.readyState && 200 == c.status && b(c.responseXML)
    };
    try {
        c.send()
    } catch (e) { }
},
    z = function (a, b) {
        var c = a.id;
        chrome.tabs.getAllInWindow(null, function (e) {
            for (var f = 1; f < e.length; ++f)
                if (e[f].id == c) {
                    b(e[f - 1]);
                    return
                }
            b(a)
        })
    };

var A = /(chrome|file|http?:\/\/chrome\.google\.com\/extenions)/,
    B = /^chrome-extension:\/\/[a-z]+\/popup\.html$/,
    x = function (a) {
        var b = new p(a);
        if (b.parseError) a = document.getElementById("sp_main_container"), a || (a = document.createElement("div"), a.id = "sp_main_container", a.className = "SP_MainContainer"), a.appendChild(r()), b = document.createElement("div"), b.innerHTML = chrome.i18n.getMessage("sp_error"), b.className = "SP_Message", a.appendChild(b), document.body.appendChild(a);
        else if (b.a.length) {
            a = document.getElementById("sp_main_container");
            a || (a = document.createElement("div"), a.id = "sp_main_container", a.className = "SP_MainContainer");
            var c = r();
            a.appendChild(c);
            c = document.createElement("div");
            c.id = "sp_results";
            a.appendChild(c);
            document.body.appendChild(a);
            document.addEventListener("keydown", C, !1);
            if (b.a.length) {
                a = document.getElementById("sp_results");
                for (var b = b.a, c = Math.min(b.length, 20), e = 0; e < c; e++) {
                    var f = w(b[e], e);
                    a.appendChild(f)
                }
            }
        } else s()
    },
    C = function (a) {
        27 == a.keyCode && window.close()
    },
    D = function (a, b) {
        0 == a.search(A) ? t(chrome.i18n.getMessage("sp_chrome_special_case_text")) :
            b ? "http://www.google.com/" == b ? t(chrome.i18n.getMessage("sp_tld_special_case_text")) : b && y(b + "search?output=br&q=related:" + encodeURIComponent(a)) : s()
    };
chrome && chrome.tabs.getSelected(null, function (a) {
    var b = a.url,
        c = window.localStorage.request_domain; - 1 == b.search(B) ? D(b, c) : z(a, function (a) {
            D(a.url, c)
        })
});