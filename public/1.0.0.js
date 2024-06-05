! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).Tebex = {})
}(this, (function(e) {
    "use strict";
    ! function(e, t) {
        void 0 === t && (t = {});
        var n = t.insertAt;
        if (e && "undefined" != typeof document) {
            var r = document.head || document.getElementsByTagName("head")[0],
                o = document.createElement("style");
            o.type = "text/css", "top" === n && r.firstChild ? r.insertBefore(o, r.firstChild) : r.appendChild(o), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e))
        }
    }('/**\n * The MIT License (MIT)\n *\n * Copyright (c) 2021 Tobias Reich\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the "Software"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n */\n.tebex-js-lightbox {\n  position: fixed;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.8);\n  opacity: 0.01;\n  transition: opacity 0.4s ease;\n  z-index: 1000;\n  will-change: opacity;\n}\n.tebex-js-lightbox--visible {\n  opacity: 1;\n}\n.tebex-js-lightbox__placeholder {\n  max-width: 100%;\n  transform: scale(0.9);\n  transition: transform 0.4s ease;\n  z-index: 1;\n  will-change: transform;\n}\n.tebex-js-lightbox__placeholder > img:first-child:last-child,\n.tebex-js-lightbox__placeholder > video:first-child:last-child,\n.tebex-js-lightbox__placeholder > iframe:first-child:last-child {\n  display: block;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  max-width: 95%;\n  max-height: 95%;\n}\n.tebex-js-lightbox__placeholder > video:first-child:last-child,\n.tebex-js-lightbox__placeholder > iframe:first-child:last-child {\n  pointer-events: auto;\n}\n.tebex-js-lightbox__placeholder > img:first-child:last-child,\n.tebex-js-lightbox__placeholder > video:first-child:last-child {\n  width: auto;\n  height: auto;\n}\n.tebex-js-lightbox--img .tebex-js-lightbox__placeholder, .tebex-js-lightbox--video .tebex-js-lightbox__placeholder, .tebex-js-lightbox--iframe .tebex-js-lightbox__placeholder {\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n.tebex-js-lightbox--visible .tebex-js-lightbox__placeholder {\n  transform: scale(1);\n}\n\n#tebex-js-checkout-container {\n  border: 0;\n  overflow: hidden;\n  border-radius: 5px;\n}\n\n#tebex-js-checkout-container div {\n  display: block;\n}');
    var t = {
        OPEN: "open",
        CLOSE: "close",
        PAYMENT_COMPLETE: "payment_complete",
        PAYMENT_ERROR: "payment_error"
    };
    const n = function(e, t = !1) {
            const n = document.createElement("div");
            return n.innerHTML = e.trim(), !0 === t ? n.children : n.firstChild
        },
        r = function(e, t) {
            const n = e.children;
            return 1 === n.length && n[0].tagName === t
        },
        o = function(e) {
            return null != (e = e || document.querySelector(".tebex-js-lightbox")) && !0 === e.ownerDocument.body.contains(e)
        },
        i = function(e, t) {
            const i = function(e, t) {
                    const o = n(`\n\t\t<div class="tebex-js-lightbox ${t.className}">\n\t\t\t<div class="tebex-js-lightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t`),
                        i = o.querySelector(".tebex-js-lightbox__placeholder");
                    e.forEach((e => i.appendChild(e)));
                    const a = r(i, "IMG"),
                        s = r(i, "VIDEO"),
                        u = r(i, "IFRAME");
                    return !0 === a && o.classList.add("tebex-js-lightbox--img"), !0 === s && o.classList.add("tebex-js-lightbox--video"), !0 === u && o.classList.add("tebex-js-lightbox--iframe"), o
                }(e = function(e) {
                    const t = "string" == typeof e,
                        r = e instanceof HTMLElement == 1;
                    if (!1 === t && !1 === r) throw new Error("Content must be a DOM element/node or string");
                    return !0 === t ? Array.from(n(e, !0)) : "TEMPLATE" === e.tagName ? [e.content.cloneNode(!0)] : Array.from(e.children)
                }(e), t = function(e = {}) {
                    if (null == (e = Object.assign({}, e)).closable && (e.closable = !0), null == e.className && (e.className = ""), null == e.onShow && (e.onShow = () => {}), null == e.onClose && (e.onClose = () => {}), "boolean" != typeof e.closable) throw new Error("Property `closable` must be a boolean");
                    if ("string" != typeof e.className) throw new Error("Property `className` must be a string");
                    if ("function" != typeof e.onShow) throw new Error("Property `onShow` must be a function");
                    if ("function" != typeof e.onClose) throw new Error("Property `onClose` must be a function");
                    return e
                }(t)),
                a = e => !1 !== t.onClose(s) && function(e, t) {
                    return e.classList.remove("tebex-js-lightbox--visible"), setTimeout((() => (!1 === o(e) || e.parentElement.removeChild(e), t())), 410), !0
                }(i, (() => {
                    if ("function" == typeof e) return e(s)
                }));
            !0 === t.closable && i.addEventListener("click", (e => {
                e.target === i && a()
            }));
            const s = {
                element: () => i,
                visible: () => o(i),
                show: e => !1 !== t.onShow(s) && function(e, t) {
                    return document.body.appendChild(e), setTimeout((() => {
                        requestAnimationFrame((() => (e.classList.add("tebex-js-lightbox--visible"), t())))
                    }), 10), !0
                }(i, (() => {
                    if ("function" == typeof e) return e(s)
                })),
                close: a
            };
            return s
        };
    let a = () => ({
        emit(e, ...t) {
            let n = this.events[e] || [];
            for (let e = 0, r = n.length; e < r; e++) n[e](...t)
        },
        events: {},
        on(e, t) {
            return this.events[e]?.push(t) || (this.events[e] = [t]), () => {
                this.events[e] = this.events[e]?.filter((e => t !== e))
            }
        }
    });
    var s = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {},
        u = [],
        c = [],
        d = "undefined" != typeof Uint8Array ? Uint8Array : Array,
        f = !1;

    function l() {
        f = !0;
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0; t < 64; ++t) u[t] = e[t], c[e.charCodeAt(t)] = t;
        c["-".charCodeAt(0)] = 62, c["_".charCodeAt(0)] = 63
    }

    function h(e, t, n) {
        for (var r, o, i = [], a = t; a < n; a += 3) r = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2], i.push(u[(o = r) >> 18 & 63] + u[o >> 12 & 63] + u[o >> 6 & 63] + u[63 & o]);
        return i.join("")
    }

    function p(e) {
        var t;
        f || l();
        for (var n = e.length, r = n % 3, o = "", i = [], a = 16383, s = 0, c = n - r; s < c; s += a) i.push(h(e, s, s + a > c ? c : s + a));
        return 1 === r ? (t = e[n - 1], o += u[t >> 2], o += u[t << 4 & 63], o += "==") : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], o += u[t >> 10], o += u[t >> 4 & 63], o += u[t << 2 & 63], o += "="), i.push(o), i.join("")
    }

    function w(e, t, n, r, o) {
        var i, a, s = 8 * o - r - 1,
            u = (1 << s) - 1,
            c = u >> 1,
            d = -7,
            f = n ? o - 1 : 0,
            l = n ? -1 : 1,
            h = e[t + f];
        for (f += l, i = h & (1 << -d) - 1, h >>= -d, d += s; d > 0; i = 256 * i + e[t + f], f += l, d -= 8);
        for (a = i & (1 << -d) - 1, i >>= -d, d += r; d > 0; a = 256 * a + e[t + f], f += l, d -= 8);
        if (0 === i) i = 1 - c;
        else {
            if (i === u) return a ? NaN : 1 / 0 * (h ? -1 : 1);
            a += Math.pow(2, r), i -= c
        }
        return (h ? -1 : 1) * a * Math.pow(2, i - r)
    }

    function m(e, t, n, r, o, i) {
        var a, s, u, c = 8 * i - o - 1,
            d = (1 << c) - 1,
            f = d >> 1,
            l = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            h = r ? 0 : i - 1,
            p = r ? 1 : -1,
            w = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = d) : (a = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), (t += a + f >= 1 ? l / u : l * Math.pow(2, 1 - f)) * u >= 2 && (a++, u /= 2), a + f >= d ? (s = 0, a = d) : a + f >= 1 ? (s = (t * u - 1) * Math.pow(2, o), a += f) : (s = t * Math.pow(2, f - 1) * Math.pow(2, o), a = 0)); o >= 8; e[n + h] = 255 & s, h += p, s /= 256, o -= 8);
        for (a = a << o | s, c += o; c > 0; e[n + h] = 255 & a, h += p, a /= 256, c -= 8);
        e[n + h - p] |= 128 * w
    }
    var g = {}.toString,
        v = Array.isArray || function(e) {
            return "[object Array]" == g.call(e)
        };

    function y() {
        return E.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    }

    function b(e, t) {
        if (y() < t) throw new RangeError("Invalid typed array length");
        return E.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = E.prototype : (null === e && (e = new E(t)), e.length = t), e
    }

    function E(e, t, n) {
        if (!(E.TYPED_ARRAY_SUPPORT || this instanceof E)) return new E(e, t, n);
        if ("number" == typeof e) {
            if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
            return P(this, e)
        }
        return _(this, e, t, n)
    }

    function _(e, t, n, r) {
        if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, n, r) {
            if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
            if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
            t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r);
            E.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = E.prototype : e = S(e, t);
            return e
        }(e, t, n, r) : "string" == typeof t ? function(e, t, n) {
            "string" == typeof n && "" !== n || (n = "utf8");
            if (!E.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
            var r = 0 | C(t, n);
            e = b(e, r);
            var o = e.write(t, n);
            o !== r && (e = e.slice(0, o));
            return e
        }(e, t, n) : function(e, t) {
            if (A(t)) {
                var n = 0 | O(t.length);
                return 0 === (e = b(e, n)).length || t.copy(e, 0, 0, n), e
            }
            if (t) {
                if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (r = t.length) != r ? b(e, 0) : S(e, t);
                if ("Buffer" === t.type && v(t.data)) return S(e, t.data)
            }
            var r;
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        }(e, t)
    }

    function x(e) {
        if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
        if (e < 0) throw new RangeError('"size" argument must not be negative')
    }

    function P(e, t) {
        if (x(t), e = b(e, t < 0 ? 0 : 0 | O(t)), !E.TYPED_ARRAY_SUPPORT)
            for (var n = 0; n < t; ++n) e[n] = 0;
        return e
    }

    function S(e, t) {
        var n = t.length < 0 ? 0 : 0 | O(t.length);
        e = b(e, n);
        for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
        return e
    }

    function O(e) {
        if (e >= y()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + y().toString(16) + " bytes");
        return 0 | e
    }

    function A(e) {
        return !(null == e || !e._isBuffer)
    }

    function C(e, t) {
        if (A(e)) return e.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
        "string" != typeof e && (e = "" + e);
        var n = e.length;
        if (0 === n) return 0;
        for (var r = !1;;) switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
                return n;
            case "utf8":
            case "utf-8":
            case void 0:
                return te(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * n;
            case "hex":
                return n >>> 1;
            case "base64":
                return ne(e).length;
            default:
                if (r) return te(e).length;
                t = ("" + t).toLowerCase(), r = !0
        }
    }

    function R(e, t, n) {
        var r = !1;
        if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
        if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
        if ((n >>>= 0) <= (t >>>= 0)) return "";
        for (e || (e = "utf8");;) switch (e) {
            case "hex":
                return q(this, t, n);
            case "utf8":
            case "utf-8":
                return z(this, t, n);
            case "ascii":
                return U(this, t, n);
            case "latin1":
            case "binary":
                return Y(this, t, n);
            case "base64":
                return B(this, t, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return H(this, t, n);
            default:
                if (r) throw new TypeError("Unknown encoding: " + e);
                e = (e + "").toLowerCase(), r = !0
        }
    }

    function T(e, t, n) {
        var r = e[t];
        e[t] = e[n], e[n] = r
    }

    function M(e, t, n, r, o) {
        if (0 === e.length) return -1;
        if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
            if (o) return -1;
            n = e.length - 1
        } else if (n < 0) {
            if (!o) return -1;
            n = 0
        }
        if ("string" == typeof t && (t = E.from(t, r)), A(t)) return 0 === t.length ? -1 : N(e, t, n, r, o);
        if ("number" == typeof t) return t &= 255, E.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : N(e, [t], n, r, o);
        throw new TypeError("val must be string, number or Buffer")
    }

    function N(e, t, n, r, o) {
        var i, a = 1,
            s = e.length,
            u = t.length;
        if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
            if (e.length < 2 || t.length < 2) return -1;
            a = 2, s /= 2, u /= 2, n /= 2
        }

        function c(e, t) {
            return 1 === a ? e[t] : e.readUInt16BE(t * a)
        }
        if (o) {
            var d = -1;
            for (i = n; i < s; i++)
                if (c(e, i) === c(t, -1 === d ? 0 : i - d)) {
                    if (-1 === d && (d = i), i - d + 1 === u) return d * a
                } else - 1 !== d && (i -= i - d), d = -1
        } else
            for (n + u > s && (n = s - u), i = n; i >= 0; i--) {
                for (var f = !0, l = 0; l < u; l++)
                    if (c(e, i + l) !== c(t, l)) {
                        f = !1;
                        break
                    } if (f) return i
            }
        return -1
    }

    function F(e, t, n, r) {
        n = Number(n) || 0;
        var o = e.length - n;
        r ? (r = Number(r)) > o && (r = o) : r = o;
        var i = t.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        r > i / 2 && (r = i / 2);
        for (var a = 0; a < r; ++a) {
            var s = parseInt(t.substr(2 * a, 2), 16);
            if (isNaN(s)) return a;
            e[n + a] = s
        }
        return a
    }

    function k(e, t, n, r) {
        return re(te(t, e.length - n), e, n, r)
    }

    function I(e, t, n, r) {
        return re(function(e) {
            for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
            return t
        }(t), e, n, r)
    }

    function W(e, t, n, r) {
        return I(e, t, n, r)
    }

    function D(e, t, n, r) {
        return re(ne(t), e, n, r)
    }

    function j(e, t, n, r) {
        return re(function(e, t) {
            for (var n, r, o, i = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) r = (n = e.charCodeAt(a)) >> 8, o = n % 256, i.push(o), i.push(r);
            return i
        }(t, e.length - n), e, n, r)
    }

    function B(e, t, n) {
        return 0 === t && n === e.length ? p(e) : p(e.slice(t, n))
    }

    function z(e, t, n) {
        n = Math.min(e.length, n);
        for (var r = [], o = t; o < n;) {
            var i, a, s, u, c = e[o],
                d = null,
                f = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
            if (o + f <= n) switch (f) {
                case 1:
                    c < 128 && (d = c);
                    break;
                case 2:
                    128 == (192 & (i = e[o + 1])) && (u = (31 & c) << 6 | 63 & i) > 127 && (d = u);
                    break;
                case 3:
                    i = e[o + 1], a = e[o + 2], 128 == (192 & i) && 128 == (192 & a) && (u = (15 & c) << 12 | (63 & i) << 6 | 63 & a) > 2047 && (u < 55296 || u > 57343) && (d = u);
                    break;
                case 4:
                    i = e[o + 1], a = e[o + 2], s = e[o + 3], 128 == (192 & i) && 128 == (192 & a) && 128 == (192 & s) && (u = (15 & c) << 18 | (63 & i) << 12 | (63 & a) << 6 | 63 & s) > 65535 && u < 1114112 && (d = u)
            }
            null === d ? (d = 65533, f = 1) : d > 65535 && (d -= 65536, r.push(d >>> 10 & 1023 | 55296), d = 56320 | 1023 & d), r.push(d), o += f
        }
        return function(e) {
            var t = e.length;
            if (t <= L) return String.fromCharCode.apply(String, e);
            var n = "",
                r = 0;
            for (; r < t;) n += String.fromCharCode.apply(String, e.slice(r, r += L));
            return n
        }(r)
    }
    E.TYPED_ARRAY_SUPPORT = void 0 === s.TYPED_ARRAY_SUPPORT || s.TYPED_ARRAY_SUPPORT, y(), E.poolSize = 8192, E._augment = function(e) {
        return e.__proto__ = E.prototype, e
    }, E.from = function(e, t, n) {
        return _(null, e, t, n)
    }, E.TYPED_ARRAY_SUPPORT && (E.prototype.__proto__ = Uint8Array.prototype, E.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && E[Symbol.species]), E.alloc = function(e, t, n) {
        return function(e, t, n, r) {
            return x(t), t <= 0 ? b(e, t) : void 0 !== n ? "string" == typeof r ? b(e, t).fill(n, r) : b(e, t).fill(n) : b(e, t)
        }(null, e, t, n)
    }, E.allocUnsafe = function(e) {
        return P(null, e)
    }, E.allocUnsafeSlow = function(e) {
        return P(null, e)
    }, E.isBuffer = function(e) {
        return null != e && (!!e._isBuffer || oe(e) || function(e) {
            return "function" == typeof e.readFloatLE && "function" == typeof e.slice && oe(e.slice(0, 0))
        }(e))
    }, E.compare = function(e, t) {
        if (!A(e) || !A(t)) throw new TypeError("Arguments must be Buffers");
        if (e === t) return 0;
        for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o)
            if (e[o] !== t[o]) {
                n = e[o], r = t[o];
                break
            } return n < r ? -1 : r < n ? 1 : 0
    }, E.isEncoding = function(e) {
        switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
        }
    }, E.concat = function(e, t) {
        if (!v(e)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === e.length) return E.alloc(0);
        var n;
        if (void 0 === t)
            for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
        var r = E.allocUnsafe(t),
            o = 0;
        for (n = 0; n < e.length; ++n) {
            var i = e[n];
            if (!A(i)) throw new TypeError('"list" argument must be an Array of Buffers');
            i.copy(r, o), o += i.length
        }
        return r
    }, E.byteLength = C, E.prototype._isBuffer = !0, E.prototype.swap16 = function() {
        var e = this.length;
        if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var t = 0; t < e; t += 2) T(this, t, t + 1);
        return this
    }, E.prototype.swap32 = function() {
        var e = this.length;
        if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var t = 0; t < e; t += 4) T(this, t, t + 3), T(this, t + 1, t + 2);
        return this
    }, E.prototype.swap64 = function() {
        var e = this.length;
        if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var t = 0; t < e; t += 8) T(this, t, t + 7), T(this, t + 1, t + 6), T(this, t + 2, t + 5), T(this, t + 3, t + 4);
        return this
    }, E.prototype.toString = function() {
        var e = 0 | this.length;
        return 0 === e ? "" : 0 === arguments.length ? z(this, 0, e) : R.apply(this, arguments)
    }, E.prototype.equals = function(e) {
        if (!A(e)) throw new TypeError("Argument must be a Buffer");
        return this === e || 0 === E.compare(this, e)
    }, E.prototype.inspect = function() {
        var e = "";
        return this.length > 0 && (e = this.toString("hex", 0, 50).match(/.{2}/g).join(" "), this.length > 50 && (e += " ... ")), "<Buffer " + e + ">"
    }, E.prototype.compare = function(e, t, n, r, o) {
        if (!A(e)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), t < 0 || n > e.length || r < 0 || o > this.length) throw new RangeError("out of range index");
        if (r >= o && t >= n) return 0;
        if (r >= o) return -1;
        if (t >= n) return 1;
        if (this === e) return 0;
        for (var i = (o >>>= 0) - (r >>>= 0), a = (n >>>= 0) - (t >>>= 0), s = Math.min(i, a), u = this.slice(r, o), c = e.slice(t, n), d = 0; d < s; ++d)
            if (u[d] !== c[d]) {
                i = u[d], a = c[d];
                break
            } return i < a ? -1 : a < i ? 1 : 0
    }, E.prototype.includes = function(e, t, n) {
        return -1 !== this.indexOf(e, t, n)
    }, E.prototype.indexOf = function(e, t, n) {
        return M(this, e, t, n, !0)
    }, E.prototype.lastIndexOf = function(e, t, n) {
        return M(this, e, t, n, !1)
    }, E.prototype.write = function(e, t, n, r) {
        if (void 0 === t) r = "utf8", n = this.length, t = 0;
        else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0;
        else {
            if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            t |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
        }
        var o = this.length - t;
        if ((void 0 === n || n > o) && (n = o), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        r || (r = "utf8");
        for (var i = !1;;) switch (r) {
            case "hex":
                return F(this, e, t, n);
            case "utf8":
            case "utf-8":
                return k(this, e, t, n);
            case "ascii":
                return I(this, e, t, n);
            case "latin1":
            case "binary":
                return W(this, e, t, n);
            case "base64":
                return D(this, e, t, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return j(this, e, t, n);
            default:
                if (i) throw new TypeError("Unknown encoding: " + r);
                r = ("" + r).toLowerCase(), i = !0
        }
    }, E.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    };
    var L = 4096;

    function U(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var o = t; o < n; ++o) r += String.fromCharCode(127 & e[o]);
        return r
    }

    function Y(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var o = t; o < n; ++o) r += String.fromCharCode(e[o]);
        return r
    }

    function q(e, t, n) {
        var r = e.length;
        (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
        for (var o = "", i = t; i < n; ++i) o += ee(e[i]);
        return o
    }

    function H(e, t, n) {
        for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);
        return o
    }

    function V(e, t, n) {
        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
        if (e + t > n) throw new RangeError("Trying to access beyond buffer length")
    }

    function G(e, t, n, r, o, i) {
        if (!A(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > o || t < i) throw new RangeError('"value" argument is out of bounds');
        if (n + r > e.length) throw new RangeError("Index out of range")
    }

    function J(e, t, n, r) {
        t < 0 && (t = 65535 + t + 1);
        for (var o = 0, i = Math.min(e.length - n, 2); o < i; ++o) e[n + o] = (t & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o)
    }

    function Z(e, t, n, r) {
        t < 0 && (t = 4294967295 + t + 1);
        for (var o = 0, i = Math.min(e.length - n, 4); o < i; ++o) e[n + o] = t >>> 8 * (r ? o : 3 - o) & 255
    }

    function Q(e, t, n, r, o, i) {
        if (n + r > e.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range")
    }

    function K(e, t, n, r, o) {
        return o || Q(e, 0, n, 4), m(e, t, n, r, 23, 4), n + 4
    }

    function X(e, t, n, r, o) {
        return o || Q(e, 0, n, 8), m(e, t, n, r, 52, 8), n + 8
    }
    E.prototype.slice = function(e, t) {
        var n, r = this.length;
        if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), E.TYPED_ARRAY_SUPPORT)(n = this.subarray(e, t)).__proto__ = E.prototype;
        else {
            var o = t - e;
            n = new E(o, void 0);
            for (var i = 0; i < o; ++i) n[i] = this[i + e]
        }
        return n
    }, E.prototype.readUIntLE = function(e, t, n) {
        e |= 0, t |= 0, n || V(e, t, this.length);
        for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) r += this[e + i] * o;
        return r
    }, E.prototype.readUIntBE = function(e, t, n) {
        e |= 0, t |= 0, n || V(e, t, this.length);
        for (var r = this[e + --t], o = 1; t > 0 && (o *= 256);) r += this[e + --t] * o;
        return r
    }, E.prototype.readUInt8 = function(e, t) {
        return t || V(e, 1, this.length), this[e]
    }, E.prototype.readUInt16LE = function(e, t) {
        return t || V(e, 2, this.length), this[e] | this[e + 1] << 8
    }, E.prototype.readUInt16BE = function(e, t) {
        return t || V(e, 2, this.length), this[e] << 8 | this[e + 1]
    }, E.prototype.readUInt32LE = function(e, t) {
        return t || V(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
    }, E.prototype.readUInt32BE = function(e, t) {
        return t || V(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
    }, E.prototype.readIntLE = function(e, t, n) {
        e |= 0, t |= 0, n || V(e, t, this.length);
        for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) r += this[e + i] * o;
        return r >= (o *= 128) && (r -= Math.pow(2, 8 * t)), r
    }, E.prototype.readIntBE = function(e, t, n) {
        e |= 0, t |= 0, n || V(e, t, this.length);
        for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256);) i += this[e + --r] * o;
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i
    }, E.prototype.readInt8 = function(e, t) {
        return t || V(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
    }, E.prototype.readInt16LE = function(e, t) {
        t || V(e, 2, this.length);
        var n = this[e] | this[e + 1] << 8;
        return 32768 & n ? 4294901760 | n : n
    }, E.prototype.readInt16BE = function(e, t) {
        t || V(e, 2, this.length);
        var n = this[e + 1] | this[e] << 8;
        return 32768 & n ? 4294901760 | n : n
    }, E.prototype.readInt32LE = function(e, t) {
        return t || V(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
    }, E.prototype.readInt32BE = function(e, t) {
        return t || V(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
    }, E.prototype.readFloatLE = function(e, t) {
        return t || V(e, 4, this.length), w(this, e, !0, 23, 4)
    }, E.prototype.readFloatBE = function(e, t) {
        return t || V(e, 4, this.length), w(this, e, !1, 23, 4)
    }, E.prototype.readDoubleLE = function(e, t) {
        return t || V(e, 8, this.length), w(this, e, !0, 52, 8)
    }, E.prototype.readDoubleBE = function(e, t) {
        return t || V(e, 8, this.length), w(this, e, !1, 52, 8)
    }, E.prototype.writeUIntLE = function(e, t, n, r) {
        (e = +e, t |= 0, n |= 0, r) || G(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
        var o = 1,
            i = 0;
        for (this[t] = 255 & e; ++i < n && (o *= 256);) this[t + i] = e / o & 255;
        return t + n
    }, E.prototype.writeUIntBE = function(e, t, n, r) {
        (e = +e, t |= 0, n |= 0, r) || G(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
        var o = n - 1,
            i = 1;
        for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) this[t + o] = e / i & 255;
        return t + n
    }, E.prototype.writeUInt8 = function(e, t, n) {
        return e = +e, t |= 0, n || G(this, e, t, 1, 255, 0), E.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
    }, E.prototype.writeUInt16LE = function(e, t, n) {
        return e = +e, t |= 0, n || G(this, e, t, 2, 65535, 0), E.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : J(this, e, t, !0), t + 2
    }, E.prototype.writeUInt16BE = function(e, t, n) {
        return e = +e, t |= 0, n || G(this, e, t, 2, 65535, 0), E.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : J(this, e, t, !1), t + 2
    }, E.prototype.writeUInt32LE = function(e, t, n) {
        return e = +e, t |= 0, n || G(this, e, t, 4, 4294967295, 0), E.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : Z(this, e, t, !0), t + 4
    }, E.prototype.writeUInt32BE = function(e, t, n) {
        return e = +e, t |= 0, n || G(this, e, t, 4, 4294967295, 0), E.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : Z(this, e, t, !1), t + 4
    }, E.prototype.writeIntLE = function(e, t, n, r) {
        if (e = +e, t |= 0, !r) {
            var o = Math.pow(2, 8 * n - 1);
            G(this, e, t, n, o - 1, -o)
        }
        var i = 0,
            a = 1,
            s = 0;
        for (this[t] = 255 & e; ++i < n && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + i - 1] && (s = 1), this[t + i] = (e / a >> 0) - s & 255;
        return t + n
    }, E.prototype.writeIntBE = function(e, t, n, r) {
        if (e = +e, t |= 0, !r) {
            var o = Math.pow(2, 8 * n - 1);
            G(this, e, t, n, o - 1, -o)
        }
        var i = n - 1,
            a = 1,
            s = 0;
        for (this[t + i] = 255 & e; --i >= 0 && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + i + 1] && (s = 1), this[t + i] = (e / a >> 0) - s & 255;
        return t + n
    }, E.prototype.writeInt8 = function(e, t, n) {
        return e = +e, t |= 0, n || G(this, e, t, 1, 127, -128), E.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
    }, E.prototype.writeInt16LE = function(e, t, n) {
        return e = +e, t |= 0, n || G(this, e, t, 2, 32767, -32768), E.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : J(this, e, t, !0), t + 2
    }, E.prototype.writeInt16BE = function(e, t, n) {
        return e = +e, t |= 0, n || G(this, e, t, 2, 32767, -32768), E.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : J(this, e, t, !1), t + 2
    }, E.prototype.writeInt32LE = function(e, t, n) {
        return e = +e, t |= 0, n || G(this, e, t, 4, 2147483647, -2147483648), E.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : Z(this, e, t, !0), t + 4
    }, E.prototype.writeInt32BE = function(e, t, n) {
        return e = +e, t |= 0, n || G(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), E.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : Z(this, e, t, !1), t + 4
    }, E.prototype.writeFloatLE = function(e, t, n) {
        return K(this, e, t, !0, n)
    }, E.prototype.writeFloatBE = function(e, t, n) {
        return K(this, e, t, !1, n)
    }, E.prototype.writeDoubleLE = function(e, t, n) {
        return X(this, e, t, !0, n)
    }, E.prototype.writeDoubleBE = function(e, t, n) {
        return X(this, e, t, !1, n)
    }, E.prototype.copy = function(e, t, n, r) {
        if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;
        if (0 === e.length || 0 === this.length) return 0;
        if (t < 0) throw new RangeError("targetStart out of bounds");
        if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
        if (r < 0) throw new RangeError("sourceEnd out of bounds");
        r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
        var o, i = r - n;
        if (this === e && n < t && t < r)
            for (o = i - 1; o >= 0; --o) e[o + t] = this[o + n];
        else if (i < 1e3 || !E.TYPED_ARRAY_SUPPORT)
            for (o = 0; o < i; ++o) e[o + t] = this[o + n];
        else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);
        return i
    }, E.prototype.fill = function(e, t, n, r) {
        if ("string" == typeof e) {
            if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {
                var o = e.charCodeAt(0);
                o < 256 && (e = o)
            }
            if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
            if ("string" == typeof r && !E.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
        } else "number" == typeof e && (e &= 255);
        if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
        if (n <= t) return this;
        var i;
        if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e)
            for (i = t; i < n; ++i) this[i] = e;
        else {
            var a = A(e) ? e : te(new E(e, r).toString()),
                s = a.length;
            for (i = 0; i < n - t; ++i) this[i + t] = a[i % s]
        }
        return this
    };
    var $ = /[^+\/0-9A-Za-z-_]/g;

    function ee(e) {
        return e < 16 ? "0" + e.toString(16) : e.toString(16)
    }

    function te(e, t) {
        var n;
        t = t || 1 / 0;
        for (var r = e.length, o = null, i = [], a = 0; a < r; ++a) {
            if ((n = e.charCodeAt(a)) > 55295 && n < 57344) {
                if (!o) {
                    if (n > 56319) {
                        (t -= 3) > -1 && i.push(239, 191, 189);
                        continue
                    }
                    if (a + 1 === r) {
                        (t -= 3) > -1 && i.push(239, 191, 189);
                        continue
                    }
                    o = n;
                    continue
                }
                if (n < 56320) {
                    (t -= 3) > -1 && i.push(239, 191, 189), o = n;
                    continue
                }
                n = 65536 + (o - 55296 << 10 | n - 56320)
            } else o && (t -= 3) > -1 && i.push(239, 191, 189);
            if (o = null, n < 128) {
                if ((t -= 1) < 0) break;
                i.push(n)
            } else if (n < 2048) {
                if ((t -= 2) < 0) break;
                i.push(n >> 6 | 192, 63 & n | 128)
            } else if (n < 65536) {
                if ((t -= 3) < 0) break;
                i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
            } else {
                if (!(n < 1114112)) throw new Error("Invalid code point");
                if ((t -= 4) < 0) break;
                i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
            }
        }
        return i
    }

    function ne(e) {
        return function(e) {
            var t, n, r, o, i, a;
            f || l();
            var s = e.length;
            if (s % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            i = "=" === e[s - 2] ? 2 : "=" === e[s - 1] ? 1 : 0, a = new d(3 * s / 4 - i), r = i > 0 ? s - 4 : s;
            var u = 0;
            for (t = 0, n = 0; t < r; t += 4, n += 3) o = c[e.charCodeAt(t)] << 18 | c[e.charCodeAt(t + 1)] << 12 | c[e.charCodeAt(t + 2)] << 6 | c[e.charCodeAt(t + 3)], a[u++] = o >> 16 & 255, a[u++] = o >> 8 & 255, a[u++] = 255 & o;
            return 2 === i ? (o = c[e.charCodeAt(t)] << 2 | c[e.charCodeAt(t + 1)] >> 4, a[u++] = 255 & o) : 1 === i && (o = c[e.charCodeAt(t)] << 10 | c[e.charCodeAt(t + 1)] << 4 | c[e.charCodeAt(t + 2)] >> 2, a[u++] = o >> 8 & 255, a[u++] = 255 & o), a
        }(function(e) {
            if ((e = function(e) {
                    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                }(e).replace($, "")).length < 2) return "";
            for (; e.length % 4 != 0;) e += "=";
            return e
        }(e))
    }

    function re(e, t, n, r) {
        for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o) t[o + n] = e[o];
        return o
    }

    function oe(e) {
        return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
    }
    "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;

    function ie(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
    }
    var ae = {
        exports: {}
    };
    ! function(e, t) {
        "undefined" != typeof self && self, e.exports = function(e) {
            var t = {};

            function n(r) {
                if (t[r]) return t[r].exports;
                var o = t[r] = {
                    i: r,
                    l: !1,
                    exports: {}
                };
                return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
            }
            return n.m = e, n.c = t, n.d = function(e, t, r) {
                n.o(e, t) || Object.defineProperty(e, t, {
                    enumerable: !0,
                    get: r
                })
            }, n.r = function(e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }, n.t = function(e, t) {
                if (1 & t && (e = n(e)), 8 & t) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var r = Object.create(null);
                if (n.r(r), Object.defineProperty(r, "default", {
                        enumerable: !0,
                        value: e
                    }), 2 & t && "string" != typeof e)
                    for (var o in e) n.d(r, o, function(t) {
                        return e[t]
                    }.bind(null, o));
                return r
            }, n.n = function(e) {
                var t = e && e.__esModule ? function() {
                    return e.default
                } : function() {
                    return e
                };
                return n.d(t, "a", t), t
            }, n.o = function(e, t) {
                return {}.hasOwnProperty.call(e, t)
            }, n.p = "", n(n.s = 0)
        }([function(e, t, n) {
            function r(e, t) {
                return (r = Object.setPrototypeOf || function(e, t) {
                    return e.__proto__ = t, e
                })(e, t)
            }

            function o(e, t) {
                e.prototype = Object.create(t.prototype), e.prototype.constructor = e, r(e, t)
            }

            function i() {
                return (i = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)({}).hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }).apply(this, arguments)
            }

            function a(e) {
                try {
                    if (!e) return !1;
                    if ("undefined" != typeof Promise && e instanceof Promise) return !0;
                    if ("undefined" != typeof window && "function" == typeof window.Window && e instanceof window.Window) return !1;
                    if ("undefined" != typeof window && "function" == typeof window.constructor && e instanceof window.constructor) return !1;
                    var t = {}.toString;
                    if (t) {
                        var n = t.call(e);
                        if ("[object Window]" === n || "[object global]" === n || "[object DOMWindow]" === n) return !1
                    }
                    if ("function" == typeof e.then) return !0
                } catch (e) {
                    return !1
                }
                return !1
            }
            n.r(t), n.d(t, "PopupOpenError", (function() {
                return Be
            })), n.d(t, "create", (function() {
                return Dn
            })), n.d(t, "destroy", (function() {
                return zn
            })), n.d(t, "destroyComponents", (function() {
                return jn
            })), n.d(t, "destroyAll", (function() {
                return Bn
            })), n.d(t, "PROP_TYPE", (function() {
                return wn
            })), n.d(t, "PROP_SERIALIZATION", (function() {
                return mn
            })), n.d(t, "CONTEXT", (function() {
                return gn
            })), n.d(t, "EVENT", (function() {
                return vn
            }));
            var s, u = [],
                c = [],
                d = 0;

            function f() {
                if (!d && s) {
                    var e = s;
                    s = null, e.resolve()
                }
            }

            function l() {
                d += 1
            }

            function h() {
                d -= 1, f()
            }
            var p = function() {
                function e(e) {
                    var t = this;
                    if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], e) {
                        var n, r, o = !1,
                            i = !1,
                            a = !1;
                        l();
                        try {
                            e((function(e) {
                                a ? t.resolve(e) : (o = !0, n = e)
                            }), (function(e) {
                                a ? t.reject(e) : (i = !0, r = e)
                            }))
                        } catch (e) {
                            return h(), void this.reject(e)
                        }
                        h(), a = !0, o ? this.resolve(n) : i && this.reject(r)
                    }
                }
                var t = e.prototype;
                return t.resolve = function(e) {
                    if (this.resolved || this.rejected) return this;
                    if (a(e)) throw new Error("Can not resolve promise with another promise");
                    return this.resolved = !0, this.value = e, this.dispatch(), this
                }, t.reject = function(e) {
                    var t = this;
                    if (this.resolved || this.rejected) return this;
                    if (a(e)) throw new Error("Can not reject promise with another promise");
                    if (!e) {
                        var n = e && "function" == typeof e.toString ? e.toString() : {}.toString.call(e);
                        e = new Error("Expected reject to be called with Error, got " + n)
                    }
                    return this.rejected = !0, this.error = e, this.errorHandled || setTimeout((function() {
                        t.errorHandled || function(e, t) {
                            if (-1 === u.indexOf(e)) {
                                u.push(e), setTimeout((function() {
                                    throw e
                                }), 1);
                                for (var n = 0; n < c.length; n++) c[n](e, t)
                            }
                        }(e, t)
                    }), 1), this.dispatch(), this
                }, t.asyncReject = function(e) {
                    return this.errorHandled = !0, this.reject(e), this
                }, t.dispatch = function() {
                    var t = this.resolved,
                        n = this.rejected,
                        r = this.handlers;
                    if (!this.dispatching && (t || n)) {
                        this.dispatching = !0, l();
                        for (var o = function(e, t) {
                                return e.then((function(e) {
                                    t.resolve(e)
                                }), (function(e) {
                                    t.reject(e)
                                }))
                            }, i = 0; i < r.length; i++) {
                            var s = r[i],
                                u = s.onSuccess,
                                c = s.onError,
                                d = s.promise,
                                f = void 0;
                            if (t) try {
                                f = u ? u(this.value) : this.value
                            } catch (e) {
                                d.reject(e);
                                continue
                            } else if (n) {
                                if (!c) {
                                    d.reject(this.error);
                                    continue
                                }
                                try {
                                    f = c(this.error)
                                } catch (e) {
                                    d.reject(e);
                                    continue
                                }
                            } if (f instanceof e && (f.resolved || f.rejected)) {
                                var p = f;
                                p.resolved ? d.resolve(p.value) : d.reject(p.error), p.errorHandled = !0
                            } else a(f) ? f instanceof e && (f.resolved || f.rejected) ? f.resolved ? d.resolve(f.value) : d.reject(f.error) : o(f, d) : d.resolve(f)
                        }
                        r.length = 0, this.dispatching = !1, h()
                    }
                }, t.then = function(t, n) {
                    if (t && "function" != typeof t && !t.call) throw new Error("Promise.then expected a function for success handler");
                    if (n && "function" != typeof n && !n.call) throw new Error("Promise.then expected a function for error handler");
                    var r = new e;
                    return this.handlers.push({
                        promise: r,
                        onSuccess: t,
                        onError: n
                    }), this.errorHandled = !0, this.dispatch(), r
                }, t.catch = function(e) {
                    return this.then(void 0, e)
                }, t.finally = function(t) {
                    if (t && "function" != typeof t && !t.call) throw new Error("Promise.finally expected a function");
                    return this.then((function(n) {
                        return e.try(t).then((function() {
                            return n
                        }))
                    }), (function(n) {
                        return e.try(t).then((function() {
                            throw n
                        }))
                    }))
                }, t.timeout = function(e, t) {
                    var n = this;
                    if (this.resolved || this.rejected) return this;
                    var r = setTimeout((function() {
                        n.resolved || n.rejected || n.reject(t || new Error("Promise timed out after " + e + "ms"))
                    }), e);
                    return this.then((function(e) {
                        return clearTimeout(r), e
                    }))
                }, t.toPromise = function() {
                    if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                    return Promise.resolve(this)
                }, t.lazy = function() {
                    return this.errorHandled = !0, this
                }, e.resolve = function(t) {
                    return t instanceof e ? t : a(t) ? new e((function(e, n) {
                        return t.then(e, n)
                    })) : (new e).resolve(t)
                }, e.reject = function(t) {
                    return (new e).reject(t)
                }, e.asyncReject = function(t) {
                    return (new e).asyncReject(t)
                }, e.all = function(t) {
                    var n = new e,
                        r = t.length,
                        o = [].slice();
                    if (!r) return n.resolve(o), n;
                    for (var i = function(e, t, i) {
                            return t.then((function(t) {
                                o[e] = t, 0 == (r -= 1) && n.resolve(o)
                            }), (function(e) {
                                i.reject(e)
                            }))
                        }, s = 0; s < t.length; s++) {
                        var u = t[s];
                        if (u instanceof e) {
                            if (u.resolved) {
                                o[s] = u.value, r -= 1;
                                continue
                            }
                        } else if (!a(u)) {
                            o[s] = u, r -= 1;
                            continue
                        }
                        i(s, e.resolve(u), n)
                    }
                    return 0 === r && n.resolve(o), n
                }, e.hash = function(t) {
                    var n = {},
                        r = [],
                        o = function(e) {
                            if (t.hasOwnProperty(e)) {
                                var o = t[e];
                                a(o) ? r.push(o.then((function(t) {
                                    n[e] = t
                                }))) : n[e] = o
                            }
                        };
                    for (var i in t) o(i);
                    return e.all(r).then((function() {
                        return n
                    }))
                }, e.map = function(t, n) {
                    return e.all(t.map(n))
                }, e.onPossiblyUnhandledException = function(e) {
                    return function(e) {
                        return c.push(e), {
                            cancel: function() {
                                c.splice(c.indexOf(e), 1)
                            }
                        }
                    }(e)
                }, e.try = function(t, n, r) {
                    if (t && "function" != typeof t && !t.call) throw new Error("Promise.try expected a function");
                    var o;
                    l();
                    try {
                        o = t.apply(n, r || [])
                    } catch (t) {
                        return h(), e.reject(t)
                    }
                    return h(), e.resolve(o)
                }, e.delay = function(t) {
                    return new e((function(e) {
                        setTimeout(e, t)
                    }))
                }, e.isPromise = function(t) {
                    return !!(t && t instanceof e) || a(t)
                }, e.flush = function() {
                    return t = e, n = s = s || new t, f(), n;
                    var t, n
                }, e
            }();

            function w(e) {
                return "[object RegExp]" === {}.toString.call(e)
            }
            var m = {
                    IFRAME: "iframe",
                    POPUP: "popup"
                },
                g = "Call was rejected by callee.\r\n";

            function v(e) {
                return void 0 === e && (e = window), e.location.protocol
            }

            function y(e) {
                if (void 0 === e && (e = window), e.mockDomain) {
                    var t = e.mockDomain.split("//")[0];
                    if (t) return t
                }
                return v(e)
            }

            function b(e) {
                return void 0 === e && (e = window), "about:" === y(e)
            }

            function _(e) {
                if (void 0 === e && (e = window), e) try {
                    if (e.parent && e.parent !== e) return e.parent
                } catch (e) {}
            }

            function x(e) {
                if (void 0 === e && (e = window), e && !_(e)) try {
                    return e.opener
                } catch (e) {}
            }

            function P(e) {
                try {
                    return !0
                } catch (e) {}
                return !1
            }

            function S(e) {
                void 0 === e && (e = window);
                var t = e.location;
                if (!t) throw new Error("Can not read window location");
                var n = v(e);
                if (!n) throw new Error("Can not read window protocol");
                if ("file:" === n) return "file://";
                if ("about:" === n) {
                    var r = _(e);
                    return r && P() ? S(r) : "about://"
                }
                var o = t.host;
                if (!o) throw new Error("Can not read window host");
                return n + "//" + o
            }

            function O(e) {
                void 0 === e && (e = window);
                var t = S(e);
                return t && e.mockDomain && 0 === e.mockDomain.indexOf("mock:") ? e.mockDomain : t
            }

            function A(e) {
                if (! function(e) {
                        try {
                            if (e === window) return !0
                        } catch (e) {}
                        try {
                            var t = Object.getOwnPropertyDescriptor(e, "location");
                            if (t && !1 === t.enumerable) return !1
                        } catch (e) {}
                        try {
                            if (b(e) && P()) return !0
                        } catch (e) {}
                        try {
                            if (function(e) {
                                    return void 0 === e && (e = window), "mock:" === y(e)
                                }(e) && P()) return !0
                        } catch (e) {}
                        try {
                            if (S(e) === S(window)) return !0
                        } catch (e) {}
                        return !1
                    }(e)) return !1;
                try {
                    if (e === window) return !0;
                    if (b(e) && P()) return !0;
                    if (O(window) === O(e)) return !0
                } catch (e) {}
                return !1
            }

            function C(e) {
                if (!A(e)) throw new Error("Expected window to be same domain");
                return e
            }

            function R(e, t) {
                if (!e || !t) return !1;
                var n = _(t);
                return n ? n === e : -1 !== function(e) {
                    var t = [];
                    try {
                        for (; e.parent !== e;) t.push(e.parent), e = e.parent
                    } catch (e) {}
                    return t
                }(t).indexOf(e)
            }

            function T(e) {
                var t, n, r = [];
                try {
                    t = e.frames
                } catch (n) {
                    t = e
                }
                try {
                    n = t.length
                } catch (e) {}
                if (0 === n) return r;
                if (n) {
                    for (var o = 0; o < n; o++) {
                        var i = void 0;
                        try {
                            i = t[o]
                        } catch (e) {
                            continue
                        }
                        r.push(i)
                    }
                    return r
                }
                for (var a = 0; a < 100; a++) {
                    var s = void 0;
                    try {
                        s = t[a]
                    } catch (e) {
                        return r
                    }
                    if (!s) return r;
                    r.push(s)
                }
                return r
            }

            function M(e) {
                for (var t = [], n = 0, r = T(e); n < r.length; n++) {
                    var o = r[n];
                    t.push(o);
                    for (var i = 0, a = M(o); i < a.length; i++) t.push(a[i])
                }
                return t
            }

            function N(e) {
                void 0 === e && (e = window);
                try {
                    if (e.top) return e.top
                } catch (e) {}
                if (_(e) === e) return e;
                try {
                    if (R(window, e) && window.top) return window.top
                } catch (e) {}
                try {
                    if (R(e, window) && window.top) return window.top
                } catch (e) {}
                for (var t = 0, n = M(e); t < n.length; t++) {
                    var r = n[t];
                    try {
                        if (r.top) return r.top
                    } catch (e) {}
                    if (_(r) === r) return r
                }
            }

            function F(e) {
                var t = N(e);
                if (!t) throw new Error("Can not determine top window");
                var n = [].concat(M(t), [t]);
                return -1 === n.indexOf(e) && (n = [].concat(n, [e], M(e))), n
            }
            var k = [],
                I = [];

            function W(e, t) {
                void 0 === t && (t = !0);
                try {
                    if (e === window) return !1
                } catch (e) {
                    return !0
                }
                try {
                    if (!e) return !0
                } catch (e) {
                    return !0
                }
                try {
                    if (e.closed) return !0
                } catch (e) {
                    return !e || e.message !== g
                }
                if (t && A(e)) try {
                    if (e.mockclosed) return !0
                } catch (e) {}
                try {
                    if (!e.parent || !e.top) return !0
                } catch (e) {}
                var n = function(e, t) {
                    for (var n = 0; n < e.length; n++) try {
                        if (e[n] === t) return n
                    } catch (e) {}
                    return -1
                }(k, e);
                if (-1 !== n) {
                    var r = I[n];
                    if (r && function(e) {
                            if (!e.contentWindow) return !0;
                            if (!e.parentNode) return !0;
                            var t = e.ownerDocument;
                            if (t && t.documentElement && !t.documentElement.contains(e)) {
                                for (var n = e; n.parentNode && n.parentNode !== n;) n = n.parentNode;
                                if (!n.host || !t.documentElement.contains(n.host)) return !0
                            }
                            return !1
                        }(r)) return !0
                }
                return !1
            }

            function D(e) {
                return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent
            }

            function j(e, t) {
                for (var n = T(e), r = 0; r < n.length; r++) {
                    var o = n[r];
                    try {
                        if (A(o) && o.name === t && -1 !== n.indexOf(o)) return o
                    } catch (e) {}
                }
                try {
                    if (-1 !== n.indexOf(e.frames[t])) return e.frames[t]
                } catch (e) {}
                try {
                    if (-1 !== n.indexOf(e[t])) return e[t]
                } catch (e) {}
            }

            function B(e, t) {
                return e === x(t)
            }

            function z(e) {
                return void 0 === e && (e = window), x(e = e || window) || _(e) || void 0
            }

            function L(e, t) {
                for (var n = 0; n < e.length; n++)
                    for (var r = e[n], o = 0; o < t.length; o++)
                        if (r === t[o]) return !0;
                return !1
            }

            function U(e) {
                void 0 === e && (e = window);
                for (var t = 0, n = e; n;)(n = _(n)) && (t += 1);
                return t
            }

            function Y(e, t) {
                var n = N(e) || e,
                    r = N(t) || t;
                try {
                    if (n && r) return n === r
                } catch (e) {}
                var o = F(e),
                    i = F(t);
                if (L(o, i)) return !0;
                var a = x(n),
                    s = x(r);
                return a && L(F(a), i) || s && L(F(s), o), !1
            }

            function q(e, t) {
                if ("string" == typeof e) {
                    if ("string" == typeof t) return "*" === e || t === e;
                    if (w(t)) return !1;
                    if (Array.isArray(t)) return !1
                }
                return w(e) ? w(t) ? e.toString() === t.toString() : !Array.isArray(t) && Boolean(t.match(e)) : !!Array.isArray(e) && (Array.isArray(t) ? JSON.stringify(e) === JSON.stringify(t) : !w(t) && e.some((function(e) {
                    return q(e, t)
                })))
            }

            function H(e) {
                return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : O()
            }

            function V(e, t, n, r) {
                var o;
                return void 0 === n && (n = 1e3), void 0 === r && (r = 1 / 0),
                    function i() {
                        if (W(e)) return o && clearTimeout(o), t();
                        r <= 0 ? clearTimeout(o) : (r -= n, o = setTimeout(i, n))
                    }(), {
                        cancel: function() {
                            o && clearTimeout(o)
                        }
                    }
            }

            function G(e) {
                try {
                    if (e === window) return !0
                } catch (e) {
                    if (e && e.message === g) return !0
                }
                try {
                    if ("[object Window]" === {}.toString.call(e)) return !0
                } catch (e) {
                    if (e && e.message === g) return !0
                }
                try {
                    if (window.Window && e instanceof window.Window) return !0
                } catch (e) {
                    if (e && e.message === g) return !0
                }
                try {
                    if (e && e.self === e) return !0
                } catch (e) {
                    if (e && e.message === g) return !0
                }
                try {
                    if (e && e.parent === e) return !0
                } catch (e) {
                    if (e && e.message === g) return !0
                }
                try {
                    if (e && e.top === e) return !0
                } catch (e) {
                    if (e && e.message === g) return !0
                }
                try {
                    if (e && "__unlikely_value__" === e.__cross_domain_utils_window_check__) return !1
                } catch (e) {
                    return !0
                }
                try {
                    if ("postMessage" in e && "self" in e && "location" in e) return !0
                } catch (e) {}
                return !1
            }

            function J(e) {
                if (0 !== H(e).indexOf("mock:")) return e;
                throw new Error("Mock urls not supported out of test mode")
            }

            function Z(e) {
                if (A(e)) return C(e).frameElement;
                for (var t = 0, n = document.querySelectorAll("iframe"); t < n.length; t++) {
                    var r = n[t];
                    if (r && r.contentWindow && r.contentWindow === e) return r
                }
            }

            function Q(e) {
                if (function(e) {
                        return void 0 === e && (e = window), Boolean(_(e))
                    }(e)) {
                    var t = Z(e);
                    if (t && t.parentElement) return void t.parentElement.removeChild(t)
                }
                try {
                    e.close()
                } catch (e) {}
            }

            function K(e, t) {
                for (var n = 0; n < e.length; n++) try {
                    if (e[n] === t) return n
                } catch (e) {}
                return -1
            }
            var X, $ = function() {
                function e() {
                    if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__", function() {
                            if ("undefined" == typeof WeakMap) return !1;
                            if (void 0 === Object.freeze) return !1;
                            try {
                                var e = new WeakMap,
                                    t = {};
                                return Object.freeze(t), e.set(t, "__testvalue__"), "__testvalue__" === e.get(t)
                            } catch (e) {
                                return !1
                            }
                        }()) try {
                        this.weakmap = new WeakMap
                    } catch (e) {}
                    this.keys = [], this.values = []
                }
                var t = e.prototype;
                return t._cleanupClosedWindows = function() {
                    for (var e = this.weakmap, t = this.keys, n = 0; n < t.length; n++) {
                        var r = t[n];
                        if (G(r) && W(r)) {
                            if (e) try {
                                e.delete(r)
                            } catch (e) {}
                            t.splice(n, 1), this.values.splice(n, 1), n -= 1
                        }
                    }
                }, t.isSafeToReadWrite = function(e) {
                    return !G(e)
                }, t.set = function(e, t) {
                    if (!e) throw new Error("WeakMap expected key");
                    var n = this.weakmap;
                    if (n) try {
                        n.set(e, t)
                    } catch (e) {
                        delete this.weakmap
                    }
                    if (this.isSafeToReadWrite(e)) try {
                        var r = this.name,
                            o = e[r];
                        return void(o && o[0] === e ? o[1] = t : Object.defineProperty(e, r, {
                            value: [e, t],
                            writable: !0
                        }))
                    } catch (e) {}
                    this._cleanupClosedWindows();
                    var i = this.keys,
                        a = this.values,
                        s = K(i, e); - 1 === s ? (i.push(e), a.push(t)) : a[s] = t
                }, t.get = function(e) {
                    if (!e) throw new Error("WeakMap expected key");
                    var t = this.weakmap;
                    if (t) try {
                        if (t.has(e)) return t.get(e)
                    } catch (e) {
                        delete this.weakmap
                    }
                    if (this.isSafeToReadWrite(e)) try {
                        var n = e[this.name];
                        return n && n[0] === e ? n[1] : void 0
                    } catch (e) {}
                    this._cleanupClosedWindows();
                    var r = K(this.keys, e);
                    if (-1 !== r) return this.values[r]
                }, t.delete = function(e) {
                    if (!e) throw new Error("WeakMap expected key");
                    var t = this.weakmap;
                    if (t) try {
                        t.delete(e)
                    } catch (e) {
                        delete this.weakmap
                    }
                    if (this.isSafeToReadWrite(e)) try {
                        var n = e[this.name];
                        n && n[0] === e && (n[0] = n[1] = void 0)
                    } catch (e) {}
                    this._cleanupClosedWindows();
                    var r = this.keys,
                        o = K(r, e); - 1 !== o && (r.splice(o, 1), this.values.splice(o, 1))
                }, t.has = function(e) {
                    if (!e) throw new Error("WeakMap expected key");
                    var t = this.weakmap;
                    if (t) try {
                        if (t.has(e)) return !0
                    } catch (e) {
                        delete this.weakmap
                    }
                    if (this.isSafeToReadWrite(e)) try {
                        var n = e[this.name];
                        return !(!n || n[0] !== e)
                    } catch (e) {}
                    return this._cleanupClosedWindows(), -1 !== K(this.keys, e)
                }, t.getOrSet = function(e, t) {
                    if (this.has(e)) return this.get(e);
                    var n = t();
                    return this.set(e, n), n
                }, e
            }();

            function ee(e) {
                return (ee = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
            }

            function te() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
                } catch (e) {
                    return !1
                }
            }

            function ne(e, t, n) {
                return (ne = te() ? Reflect.construct : function(e, t, n) {
                    var o = [null];
                    o.push.apply(o, t);
                    var i = new(Function.bind.apply(e, o));
                    return n && r(i, n.prototype), i
                }).apply(null, arguments)
            }

            function re(e) {
                var t = "function" == typeof Map ? new Map : void 0;
                return (re = function(e) {
                    if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
                    var n;
                    if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== t) {
                        if (t.has(e)) return t.get(e);
                        t.set(e, o)
                    }

                    function o() {
                        return ne(e, arguments, ee(this).constructor)
                    }
                    return o.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: o,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), r(o, e)
                })(e)
            }

            function oe(e) {
                return e.name || e.__name__ || e.displayName || "anonymous"
            }

            function ie(e, t) {
                try {
                    delete e.name, e.name = t
                } catch (e) {}
                return e.__name__ = e.displayName = t, e
            }

            function ae(e) {
                if ("function" == typeof btoa) return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (function(e, t) {
                    return String.fromCharCode(parseInt(t, 16))
                }))).replace(/[=]/g, "");
                if (void 0 !== E) return E.from(e, "utf8").toString("base64").replace(/[=]/g, "");
                throw new Error("Can not find window.btoa or Buffer")
            }

            function se() {
                var e = "0123456789abcdef";
                return "uid_" + "xxxxxxxxxx".replace(/./g, (function() {
                    return e.charAt(Math.floor(Math.random() * e.length))
                })) + "_" + ae((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
            }

            function ue(e) {
                try {
                    return JSON.stringify([].slice.call(e), (function(e, t) {
                        return "function" == typeof t ? "memoize[" + function(e) {
                            if (X = X || new $, null == e || "object" != typeof e && "function" != typeof e) throw new Error("Invalid object");
                            var t = X.get(e);
                            return t || (t = typeof e + ":" + se(), X.set(e, t)), t
                        }(t) + "]" : t
                    }))
                } catch (e) {
                    throw new Error("Arguments not serializable -- can not be used to memoize")
                }
            }

            function ce() {
                return {}
            }
            var de = 0,
                fe = 0;

            function le(e, t) {
                void 0 === t && (t = {});
                var n, r, o = t.thisNamespace,
                    i = void 0 !== o && o,
                    a = t.time,
                    s = de;
                de += 1;
                var u = function() {
                    for (var t = arguments.length, o = new Array(t), u = 0; u < t; u++) o[u] = arguments[u];
                    var c;
                    s < fe && (n = null, r = null, s = de, de += 1), c = i ? (r = r || new $).getOrSet(this, ce) : n = n || {};
                    var d = ue(o),
                        f = c[d];
                    if (f && a && Date.now() - f.time < a && (delete c[d], f = null), f) return f.value;
                    var l = Date.now(),
                        h = e.apply(this, arguments);
                    return c[d] = {
                        time: l,
                        value: h
                    }, h
                };
                return u.reset = function() {
                    n = null, r = null
                }, ie(u, (t.name || oe(e)) + "::memoized")
            }

            function he(e) {
                var t = {};

                function n() {
                    for (var n = arguments, r = this, o = arguments.length, i = new Array(o), a = 0; a < o; a++) i[a] = arguments[a];
                    var s = ue(i);
                    return t.hasOwnProperty(s) || (t[s] = p.try((function() {
                        return e.apply(r, n)
                    })).finally((function() {
                        delete t[s]
                    }))), t[s]
                }
                return n.reset = function() {
                    t = {}
                }, ie(n, oe(e) + "::promiseMemoized")
            }

            function pe() {}

            function we(e) {
                var t = !1;
                return ie((function() {
                    if (!t) return t = !0, e.apply(this, arguments)
                }), oe(e) + "::once")
            }

            function me(e, t) {
                if (void 0 === t && (t = 1), t >= 3) return "stringifyError stack overflow";
                try {
                    if (!e) return "<unknown error: " + {}.toString.call(e) + ">";
                    if ("string" == typeof e) return e;
                    if (e instanceof Error) {
                        var n = e && e.stack,
                            r = e && e.message;
                        if (n && r) return -1 !== n.indexOf(r) ? n : r + "\n" + n;
                        if (n) return n;
                        if (r) return r
                    }
                    return e && e.toString && "function" == typeof e.toString ? e.toString() : {}.toString.call(e)
                } catch (e) {
                    return "Error while stringifying error: " + me(e, t + 1)
                }
            }

            function ge(e) {
                return "string" == typeof e ? e : e && e.toString && "function" == typeof e.toString ? e.toString() : {}.toString.call(e)
            }

            function ve(e, t) {
                if (!t) return e;
                if (Object.assign) return Object.assign(e, t);
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                return e
            }

            function ye(e) {
                return e
            }

            function be(e, t) {
                var n;
                return function r() {
                    n = setTimeout((function() {
                        e(), r()
                    }), t)
                }(), {
                    cancel: function() {
                        clearTimeout(n)
                    }
                }
            }

            function Ee(e) {
                return [].slice.call(e)
            }

            function _e(e) {
                return null != e
            }

            function xe(e) {
                return "[object RegExp]" === {}.toString.call(e)
            }

            function Pe(e, t, n) {
                if (e.hasOwnProperty(t)) return e[t];
                var r = n();
                return e[t] = r, r
            }

            function Se(e) {
                var t, n = [],
                    r = !1,
                    o = {
                        set: function(t, n) {
                            return r || (e[t] = n, o.register((function() {
                                delete e[t]
                            }))), n
                        },
                        register: function(e) {
                            var o = we((function() {
                                return e(t)
                            }));
                            return r ? e(t) : n.push(o), {
                                cancel: function() {
                                    var e = n.indexOf(o); - 1 !== e && n.splice(e, 1)
                                }
                            }
                        },
                        all: function(e) {
                            t = e;
                            var o = [];
                            for (r = !0; n.length;) {
                                var i = n.shift();
                                o.push(i())
                            }
                            return p.all(o).then(pe)
                        }
                    };
                return o
            }

            function Oe(e, t) {
                if (null == t) throw new Error("Expected " + e + " to be present");
                return t
            }
            le.clear = function() {
                fe = de
            }, le((function(e) {
                if (Object.values) return Object.values(e);
                var t = [];
                for (var n in e) e.hasOwnProperty(n) && t.push(e[n]);
                return t
            }));
            var Ae = function(e) {
                function t(t) {
                    var n;
                    return (n = e.call(this, t) || this).name = n.constructor.name, "function" == typeof Error.captureStackTrace ? Error.captureStackTrace(function(e) {
                        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return e
                    }(n), n.constructor) : n.stack = new Error(t).stack, n
                }
                return o(t, e), t
            }(re(Error));

            function Ce() {
                var e = document.body;
                if (!e) throw new Error("Body element not found");
                return e
            }

            function Re() {
                return Boolean(document.body) && "complete" === document.readyState
            }

            function Te() {
                return Boolean(document.body) && "interactive" === document.readyState
            }

            function Me(e) {
                return encodeURIComponent(e)
            }

            function Ne(e) {
                return function(t, n, r) {
                    void 0 === r && (r = []);
                    var o = t.__inline_memoize_cache__ = t.__inline_memoize_cache__ || {},
                        i = ue(r);
                    return o.hasOwnProperty(i) ? o[i] : o[i] = function() {
                        var t = {};
                        if (!e) return t;
                        if (-1 === e.indexOf("=")) return t;
                        for (var n = 0, r = e.split("&"); n < r.length; n++) {
                            var o = r[n];
                            (o = o.split("="))[0] && o[1] && (t[decodeURIComponent(o[0])] = decodeURIComponent(o[1]))
                        }
                        return t
                    }.apply(void 0, r)
                }(Ne, 0, [e])
            }

            function Fe(e, t) {
                return void 0 === t && (t = {}), t && Object.keys(t).length ? (void 0 === (n = i({}, Ne(e), t)) && (n = {}), Object.keys(n).filter((function(e) {
                    return "string" == typeof n[e] || "boolean" == typeof n[e]
                })).map((function(e) {
                    var t = n[e];
                    if ("string" != typeof t && "boolean" != typeof t) throw new TypeError("Invalid type for query");
                    return Me(e) + "=" + Me(t.toString())
                })).join("&")) : e;
                var n
            }

            function ke(e, t) {
                e.appendChild(t)
            }

            function Ie(e) {
                return e instanceof window.Element || null !== e && "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument
            }

            function We(e, t) {
                return void 0 === t && (t = document), Ie(e) ? e : "string" == typeof e ? t.querySelector(e) : void 0
            }

            function De(e) {
                return new p((function(t, n) {
                    var r = ge(e),
                        o = We(e);
                    if (o) return t(o);
                    if (Re()) return n(new Error("Document is ready and element " + r + " does not exist"));
                    var i = setInterval((function() {
                        if (o = We(e)) t(o), clearInterval(i);
                        else if (Re()) return clearInterval(i), n(new Error("Document is ready and element " + r + " does not exist"))
                    }), 10)
                }))
            }
            le((function() {
                return new p((function(e) {
                    if (Re() || Te()) return e();
                    var t = setInterval((function() {
                        if (Re() || Te()) return clearInterval(t), e()
                    }), 10)
                }))
            }));
            var je, Be = function(e) {
                function t() {
                    return e.apply(this, arguments) || this
                }
                return o(t, e), t
            }(Ae);

            function ze(e) {
                if ((je = je || new $).has(e)) {
                    var t = je.get(e);
                    if (t) return t
                }
                var n = new p((function(t, n) {
                    e.addEventListener("load", (function() {
                        ! function(e) {
                            if (function() {
                                    for (var e = 0; e < k.length; e++) {
                                        var t = !1;
                                        try {
                                            t = k[e].closed
                                        } catch (e) {}
                                        t && (I.splice(e, 1), k.splice(e, 1))
                                    }
                                }(), e && e.contentWindow) try {
                                k.push(e.contentWindow), I.push(e)
                            } catch (e) {}
                        }(e), t(e)
                    })), e.addEventListener("error", (function(r) {
                        e.contentWindow ? t(e) : n(r)
                    }))
                }));
                return je.set(e, n), n
            }

            function Le(e) {
                return ze(e).then((function(e) {
                    if (!e.contentWindow) throw new Error("Could not find window in iframe");
                    return e.contentWindow
                }))
            }

            function Ue(e, t) {
                void 0 === e && (e = {});
                var n = e.style || {},
                    r = function(e, t, n) {
                        void 0 === e && (e = "div"), void 0 === t && (t = {}), e = e.toLowerCase();
                        var r, o, i, a = document.createElement(e);
                        if (t.style && ve(a.style, t.style), t.class && (a.className = t.class.join(" ")), t.id && a.setAttribute("id", t.id), t.attributes)
                            for (var s = 0, u = Object.keys(t.attributes); s < u.length; s++) {
                                var c = u[s];
                                a.setAttribute(c, t.attributes[c])
                            }
                        if (t.styleSheet && (r = a, o = t.styleSheet, void 0 === i && (i = window.document), r.styleSheet ? r.styleSheet.cssText = o : r.appendChild(i.createTextNode(o))), t.html) {
                            if ("iframe" === e) throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                            a.innerHTML = t.html
                        }
                        return a
                    }("iframe", {
                        attributes: i({
                            allowTransparency: "true"
                        }, e.attributes || {}),
                        style: i({
                            backgroundColor: "transparent",
                            border: "none"
                        }, n),
                        html: e.html,
                        class: e.class
                    }),
                    o = window.navigator.userAgent.match(/MSIE|Edge/i);
                return r.hasAttribute("id") || r.setAttribute("id", se()), ze(r), t && function(e, t) {
                    void 0 === t && (t = document);
                    var n = We(e, t);
                    if (n) return n;
                    throw new Error("Can not find element: " + ge(e))
                }(t).appendChild(r), (e.url || o) && r.setAttribute("src", e.url || "about:blank"), r
            }

            function Ye(e, t, n) {
                return e.addEventListener(t, n), {
                    cancel: function() {
                        e.removeEventListener(t, n)
                    }
                }
            }

            function qe(e) {
                e.style.setProperty("display", "")
            }

            function He(e) {
                e.style.setProperty("display", "none", "important")
            }

            function Ve(e) {
                e && e.parentNode && e.parentNode.removeChild(e)
            }

            function Ge(e) {
                return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e))
            }

            function Je(e, t, n) {
                var r = void 0 === n ? {} : n,
                    o = r.width,
                    i = void 0 === o || o,
                    a = r.height,
                    s = void 0 === a || a,
                    u = r.interval,
                    c = void 0 === u ? 100 : u,
                    d = r.win,
                    f = void 0 === d ? window : d,
                    l = e.offsetWidth,
                    h = e.offsetHeight,
                    p = !1;
                t({
                    width: l,
                    height: h
                });
                var w, m, g = function() {
                    if (!p && function(e) {
                            return Boolean(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
                        }(e)) {
                        var n = e.offsetWidth,
                            r = e.offsetHeight;
                        (i && n !== l || s && r !== h) && t({
                            width: n,
                            height: r
                        }), l = n, h = r
                    }
                };
                return f.addEventListener("resize", g), void 0 !== f.ResizeObserver ? ((w = new f.ResizeObserver(g)).observe(e), m = be(g, 10 * c)) : void 0 !== f.MutationObserver ? ((w = new f.MutationObserver(g)).observe(e, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0,
                    characterData: !1
                }), m = be(g, 10 * c)) : m = be(g, c), {
                    cancel: function() {
                        p = !0, w.disconnect(), window.removeEventListener("resize", g), m.cancel()
                    }
                }
            }

            function Ze(e) {
                for (; e.parentNode;) e = e.parentNode;
                return "[object ShadowRoot]" === e.toString()
            }
            var Qe = "undefined" != typeof document ? document.currentScript : null,
                Ke = le((function() {
                    if (Qe) return Qe;
                    if (Qe = function() {
                            try {
                                var e = function() {
                                        try {
                                            throw new Error("_")
                                        } catch (e) {
                                            return e.stack || ""
                                        }
                                    }(),
                                    t = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e),
                                    n = t && t[1];
                                if (!n) return;
                                for (var r = 0, o = [].slice.call(document.getElementsByTagName("script")).reverse(); r < o.length; r++) {
                                    var i = o[r];
                                    if (i.src && i.src === n) return i
                                }
                            } catch (e) {}
                        }()) return Qe;
                    throw new Error("Can not determine current script")
                })),
                Xe = se();

            function $e(e) {
                return "string" == typeof e && /^[0-9]+%$/.test(e)
            }

            function et(e) {
                if ("number" == typeof e) return e;
                var t = e.match(/^([0-9]+)(px|%)$/);
                if (!t) throw new Error("Could not match css value from " + e);
                return parseInt(t[1], 10)
            }

            function tt(e) {
                return et(e) + "px"
            }

            function nt(e) {
                return "number" == typeof e ? tt(e) : $e(e) ? e : tt(e)
            }

            function rt(e, t) {
                if ("number" == typeof e) return e;
                if ($e(e)) return parseInt(t * et(e) / 100, 10);
                if ("string" == typeof(n = e) && /^[0-9]+px$/.test(n)) return et(e);
                var n;
                throw new Error("Can not normalize dimension: " + e)
            }

            function ot(e) {
                void 0 === e && (e = window);
                var t = "__post_robot_10_0_44__";
                return e !== window ? e[t] : e[t] = e[t] || {}
            }
            le((function() {
                var e;
                try {
                    e = Ke()
                } catch (e) {
                    return Xe
                }
                var t = e.getAttribute("data-uid");
                if (t && "string" == typeof t) return t;
                if ((t = e.getAttribute("data-uid-auto")) && "string" == typeof t) return t;
                if (e.src) {
                    var n = function(e) {
                        for (var t = "", n = 0; n < e.length; n++) {
                            var r = e[n].charCodeAt(0) * n;
                            e[n + 1] && (r += e[n + 1].charCodeAt(0) * (n - 1)), t += String.fromCharCode(97 + Math.abs(r) % 26)
                        }
                        return t
                    }(JSON.stringify({
                        src: e.src,
                        dataset: e.dataset
                    }));
                    t = "uid_" + n.slice(n.length - 30)
                } else t = se();
                return e.setAttribute("data-uid-auto", t), t
            }));
            var it = function() {
                return {}
            };

            function at(e, t) {
                return void 0 === e && (e = "store"), void 0 === t && (t = it), Pe(ot(), e, (function() {
                    var e = t();
                    return {
                        has: function(t) {
                            return e.hasOwnProperty(t)
                        },
                        get: function(t, n) {
                            return e.hasOwnProperty(t) ? e[t] : n
                        },
                        set: function(t, n) {
                            return e[t] = n, n
                        },
                        del: function(t) {
                            delete e[t]
                        },
                        getOrSet: function(t, n) {
                            return Pe(e, t, n)
                        },
                        reset: function() {
                            e = t()
                        },
                        keys: function() {
                            return Object.keys(e)
                        }
                    }
                }))
            }
            var st, ut = function() {};

            function ct() {
                var e = ot();
                return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new ut, e.WINDOW_WILDCARD
            }

            function dt(e, t) {
                return void 0 === e && (e = "store"), void 0 === t && (t = it), at("windowStore").getOrSet(e, (function() {
                    var n = new $,
                        r = function(e) {
                            return n.getOrSet(e, t)
                        };
                    return {
                        has: function(t) {
                            return r(t).hasOwnProperty(e)
                        },
                        get: function(t, n) {
                            var o = r(t);
                            return o.hasOwnProperty(e) ? o[e] : n
                        },
                        set: function(t, n) {
                            return r(t)[e] = n, n
                        },
                        del: function(t) {
                            delete r(t)[e]
                        },
                        getOrSet: function(t, n) {
                            return Pe(r(t), e, n)
                        }
                    }
                }))
            }

            function ft() {
                return at("instance").getOrSet("instanceID", se)
            }

            function lt(e, t) {
                var n = t.domain,
                    r = dt("helloPromises"),
                    o = r.get(e);
                o && o.resolve({
                    domain: n
                });
                var i = p.resolve({
                    domain: n
                });
                return r.set(e, i), i
            }

            function ht(e, t) {
                return (0, t.send)(e, "postrobot_hello", {
                    instanceID: ft()
                }, {
                    domain: "*",
                    timeout: -1
                }).then((function(t) {
                    var n = t.origin,
                        r = t.data.instanceID;
                    return lt(e, {
                        domain: n
                    }), {
                        win: e,
                        domain: n,
                        instanceID: r
                    }
                }))
            }

            function pt(e, t) {
                var n = t.send;
                return dt("windowInstanceIDPromises").getOrSet(e, (function() {
                    return ht(e, {
                        send: n
                    }).then((function(e) {
                        return e.instanceID
                    }))
                }))
            }

            function wt(e, t, n) {
                void 0 === t && (t = 5e3), void 0 === n && (n = "Window");
                var r = function(e) {
                    return dt("helloPromises").getOrSet(e, (function() {
                        return new p
                    }))
                }(e);
                return -1 !== t && (r = r.timeout(t, new Error(n + " did not load after " + t + "ms"))), r
            }

            function mt(e) {
                dt("knownWindows").set(e, !0)
            }

            function gt(e) {
                return "object" == typeof e && null !== e && "string" == typeof e.__type__
            }

            function vt(e) {
                return void 0 === e ? "undefined" : null === e ? "null" : Array.isArray(e) ? "array" : "function" == typeof e ? "function" : "object" == typeof e ? e instanceof Error ? "error" : "function" == typeof e.then ? "promise" : "[object RegExp]" === {}.toString.call(e) ? "regex" : "[object Date]" === {}.toString.call(e) ? "date" : "object" : "string" == typeof e ? "string" : "number" == typeof e ? "number" : "boolean" == typeof e ? "boolean" : void 0
            }

            function yt(e, t) {
                return {
                    __type__: e,
                    __val__: t
                }
            }
            var bt, Et = ((st = {}).function = function() {}, st.error = function(e) {
                    return yt("error", {
                        message: e.message,
                        stack: e.stack,
                        code: e.code,
                        data: e.data
                    })
                }, st.promise = function() {}, st.regex = function(e) {
                    return yt("regex", e.source)
                }, st.date = function(e) {
                    return yt("date", e.toJSON())
                }, st.array = function(e) {
                    return e
                }, st.object = function(e) {
                    return e
                }, st.string = function(e) {
                    return e
                }, st.number = function(e) {
                    return e
                }, st.boolean = function(e) {
                    return e
                }, st.null = function(e) {
                    return e
                }, st[void 0] = function(e) {
                    return yt("undefined", e)
                }, st),
                _t = {},
                xt = ((bt = {}).function = function() {
                    throw new Error("Function serialization is not implemented; nothing to deserialize")
                }, bt.error = function(e) {
                    var t = e.stack,
                        n = e.code,
                        r = e.data,
                        o = new Error(e.message);
                    return o.code = n, r && (o.data = r), o.stack = t + "\n\n" + o.stack, o
                }, bt.promise = function() {
                    throw new Error("Promise serialization is not implemented; nothing to deserialize")
                }, bt.regex = function(e) {
                    return new RegExp(e)
                }, bt.date = function(e) {
                    return new Date(e)
                }, bt.array = function(e) {
                    return e
                }, bt.object = function(e) {
                    return e
                }, bt.string = function(e) {
                    return e
                }, bt.number = function(e) {
                    return e
                }, bt.boolean = function(e) {
                    return e
                }, bt.null = function(e) {
                    return e
                }, bt[void 0] = function() {}, bt),
                Pt = {};

            function St() {
                return !!D(window).match(/MSIE|trident|edge\/12|edge\/13/i)
            }

            function Ot(e) {
                return !Y(window, e)
            }

            function At(e, t) {
                if (e) {
                    if (O() !== H(e)) return !0
                } else if (t && !A(t)) return !0;
                return !1
            }

            function Ct(e) {
                var t = e.win,
                    n = e.domain;
                return !(!St() || n && !At(n, t) || t && !Ot(t))
            }

            function Rt(e) {
                return "__postrobot_bridge___" + (e = e || H(e)).replace(/[^a-zA-Z0-9]+/g, "_")
            }

            function Tt() {
                return Boolean(window.name && window.name === Rt(O()))
            }
            var Mt = new p((function(e) {
                if (window.document && window.document.body) return e(window.document.body);
                var t = setInterval((function() {
                    if (window.document && window.document.body) return clearInterval(t), e(window.document.body)
                }), 10)
            }));

            function Nt(e) {
                dt("remoteWindowPromises").getOrSet(e, (function() {
                    return new p
                }))
            }

            function Ft(e) {
                var t = dt("remoteWindowPromises").get(e);
                if (!t) throw new Error("Remote window promise not found");
                return t
            }

            function kt(e, t, n) {
                Ft(e).resolve((function(r, o, i) {
                    if (r !== e) throw new Error("Remote window does not match window");
                    if (!q(o, t)) throw new Error("Remote domain " + o + " does not match domain " + t);
                    n.fireAndForget(i)
                }))
            }

            function It(e, t) {
                Ft(e).reject(t).catch(pe)
            }

            function Wt(e) {
                for (var t = e.win, n = e.name, r = e.domain, o = at("popupWindowsByName"), i = dt("popupWindowsByWin"), a = 0, s = o.keys(); a < s.length; a++) {
                    var u = s[a],
                        c = o.get(u);
                    c && !W(c.win) || o.del(u)
                }
                if (W(t)) return {
                    win: t,
                    name: n,
                    domain: r
                };
                var d = i.getOrSet(t, (function() {
                    return n ? o.getOrSet(n, (function() {
                        return {
                            win: t,
                            name: n
                        }
                    })) : {
                        win: t
                    }
                }));
                if (d.win && d.win !== t) throw new Error("Different window already linked for window: " + (n || "undefined"));
                return n && (d.name = n, o.set(n, d)), r && (d.domain = r, Nt(t)), i.set(t, d), d
            }

            function Dt(e) {
                var t, n = e.on,
                    r = e.send,
                    o = e.receiveMessage;
                t = window.open, window.open = function(e, n, r, o) {
                        var i = t.call(this, J(e), n, r, o);
                        return i ? (Wt({
                            win: i,
                            name: n,
                            domain: e ? H(e) : null
                        }), i) : i
                    },
                    function(e) {
                        var t = e.on,
                            n = e.send,
                            r = e.receiveMessage,
                            o = at("popupWindowsByName");
                        t("postrobot_open_tunnel", (function(e) {
                            var i = e.source,
                                a = e.origin,
                                s = e.data,
                                u = at("bridges").get(a);
                            if (!u) throw new Error("Can not find bridge promise for domain " + a);
                            return u.then((function(e) {
                                if (i !== e) throw new Error("Message source does not matched registered bridge for domain " + a);
                                if (!s.name) throw new Error("Register window expected to be passed window name");
                                if (!s.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                                if (!o.has(s.name)) throw new Error("Window with name " + s.name + " does not exist, or was not opened by this window");
                                var u = function() {
                                    return o.get(s.name)
                                };
                                if (!u().domain) throw new Error("We do not have a registered domain for window " + s.name);
                                if (u().domain !== a) throw new Error("Message origin " + a + " does not matched registered window origin " + (u().domain || "unknown"));
                                return kt(u().win, a, s.sendMessage), {
                                    sendMessage: function(e) {
                                        if (window && !window.closed && u()) {
                                            var o = u().domain;
                                            if (o) try {
                                                r({
                                                    data: e,
                                                    origin: o,
                                                    source: u().win
                                                }, {
                                                    on: t,
                                                    send: n
                                                })
                                            } catch (e) {
                                                p.reject(e)
                                            }
                                        }
                                    }
                                }
                            }))
                        }))
                    }({
                        on: n,
                        send: r,
                        receiveMessage: o
                    }),
                    function(e) {
                        var t = e.send;
                        ot(window).openTunnelToParent = function(e) {
                            var n = e.name,
                                r = e.source,
                                o = e.canary,
                                i = e.sendMessage,
                                a = at("tunnelWindows"),
                                s = _(window);
                            if (!s) throw new Error("No parent window found to open tunnel to");
                            var u = function(e) {
                                var t = e.name,
                                    n = e.source,
                                    r = e.canary,
                                    o = e.sendMessage;
                                ! function() {
                                    for (var e = at("tunnelWindows"), t = 0, n = e.keys(); t < n.length; t++) {
                                        var r = n[t];
                                        W(e[r].source) && e.del(r)
                                    }
                                }();
                                var i = se();
                                return at("tunnelWindows").set(i, {
                                    name: t,
                                    source: n,
                                    canary: r,
                                    sendMessage: o
                                }), i
                            }({
                                name: n,
                                source: r,
                                canary: o,
                                sendMessage: i
                            });
                            return t(s, "postrobot_open_tunnel", {
                                name: n,
                                sendMessage: function() {
                                    var e = a.get(u);
                                    if (e && e.source && !W(e.source)) {
                                        try {
                                            e.canary()
                                        } catch (e) {
                                            return
                                        }
                                        e.sendMessage.apply(this, arguments)
                                    }
                                }
                            }, {
                                domain: "*"
                            })
                        }
                    }({
                        send: r
                    }),
                    function(e) {
                        var t = e.on,
                            n = e.send,
                            r = e.receiveMessage;
                        p.try((function() {
                            var e, o = x(window);
                            if (o && Ct({
                                    win: o
                                })) return Nt(o), (e = o, dt("remoteBridgeAwaiters").getOrSet(e, (function() {
                                return p.try((function() {
                                    var t = j(e, Rt(O()));
                                    if (t) return A(t) && ot(C(t)) ? t : new p((function(e) {
                                        var n, r;
                                        n = setInterval((function() {
                                            if (t && A(t) && ot(C(t))) return clearInterval(n), clearTimeout(r), e(t)
                                        }), 100), r = setTimeout((function() {
                                            return clearInterval(n), e()
                                        }), 2e3)
                                    }))
                                }))
                            }))).then((function(e) {
                                return e ? window.name ? ot(C(e)).openTunnelToParent({
                                    name: window.name,
                                    source: window,
                                    canary: function() {},
                                    sendMessage: function(e) {
                                        try {
                                            window
                                        } catch (e) {
                                            return
                                        }
                                        if (window && !window.closed) try {
                                            r({
                                                data: e,
                                                origin: this.origin,
                                                source: this.source
                                            }, {
                                                on: t,
                                                send: n
                                            })
                                        } catch (e) {
                                            p.reject(e)
                                        }
                                    }
                                }).then((function(e) {
                                    var t = e.source,
                                        n = e.origin,
                                        r = e.data;
                                    if (t !== o) throw new Error("Source does not match opener");
                                    kt(t, n, r.sendMessage)
                                })).catch((function(e) {
                                    throw It(o, e), e
                                })) : It(o, new Error("Can not register with opener: window does not have a name")) : It(o, new Error("Can not register with opener: no bridge found in opener"))
                            }))
                        }))
                    }({
                        on: n,
                        send: r,
                        receiveMessage: o
                    })
            }

            function jt() {
                for (var e = at("idToProxyWindow"), t = 0, n = e.keys(); t < n.length; t++) {
                    var r = n[t];
                    e.get(r).shouldClean() && e.del(r)
                }
            }

            function Bt(e, t) {
                var n = t.send,
                    r = t.id,
                    o = void 0 === r ? se() : r,
                    i = e.then((function(e) {
                        if (A(e)) return C(e).name
                    })),
                    a = e.then((function(e) {
                        if (W(e)) throw new Error("Window is closed, can not determine type");
                        return x(e) ? m.POPUP : m.IFRAME
                    }));
                i.catch(pe), a.catch(pe);
                var s = function() {
                    return e.then((function(e) {
                        if (!W(e)) return A(e) ? C(e).name : i
                    }))
                };
                return {
                    id: o,
                    getType: function() {
                        return a
                    },
                    getInstanceID: he((function() {
                        return e.then((function(e) {
                            return pt(e, {
                                send: n
                            })
                        }))
                    })),
                    close: function() {
                        return e.then(Q)
                    },
                    getName: s,
                    focus: function() {
                        return e.then((function(e) {
                            e.focus()
                        }))
                    },
                    isClosed: function() {
                        return e.then((function(e) {
                            return W(e)
                        }))
                    },
                    setLocation: function(t, n) {
                        return void 0 === n && (n = {}), e.then((function(e) {
                            var r = window.location.protocol + "//" + window.location.host,
                                o = n.method,
                                i = void 0 === o ? "get" : o,
                                a = n.body;
                            if (0 === t.indexOf("/")) t = "" + r + t;
                            else if (!t.match(/^https?:\/\//) && 0 !== t.indexOf(r)) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(t));
                            if ("post" === i) return s().then((function(e) {
                                if (!e) throw new Error("Can not post to window without target name");
                                ! function(e) {
                                    var t = e.url,
                                        n = e.target,
                                        r = e.body,
                                        o = e.method,
                                        i = void 0 === o ? "post" : o,
                                        a = document.createElement("form");
                                    if (a.setAttribute("target", n), a.setAttribute("method", i), a.setAttribute("action", t), a.style.display = "none", r)
                                        for (var s = 0, u = Object.keys(r); s < u.length; s++) {
                                            var c, d = u[s],
                                                f = document.createElement("input");
                                            f.setAttribute("name", d), f.setAttribute("value", null == (c = r[d]) ? void 0 : c.toString()), a.appendChild(f)
                                        }
                                    Ce().appendChild(a), a.submit(), Ce().removeChild(a)
                                }({
                                    url: t,
                                    target: e,
                                    method: i,
                                    body: a
                                })
                            }));
                            if ("get" !== i) throw new Error("Unsupported method: " + i);
                            if (A(e)) try {
                                if (e.location && "function" == typeof e.location.replace) return void e.location.replace(t)
                            } catch (e) {}
                            e.location = t
                        }))
                    },
                    setName: function(t) {
                        return e.then((function(e) {
                            Wt({
                                win: e,
                                name: t
                            });
                            var n = A(e),
                                r = Z(e);
                            if (!n) throw new Error("Can not set name for cross-domain window: " + t);
                            C(e).name = t, r && r.setAttribute("name", t), i = p.resolve(t)
                        }))
                    }
                }
            }
            var zt = function() {
                function e(e) {
                    var t = e.send,
                        n = e.win,
                        r = e.serializedWindow;
                    this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new p, this.serializedWindow = r || Bt(this.actualWindowPromise, {
                        send: t
                    }), at("idToProxyWindow").set(this.getID(), this), n && this.setWindow(n, {
                        send: t
                    })
                }
                var t = e.prototype;
                return t.getID = function() {
                    return this.serializedWindow.id
                }, t.getType = function() {
                    return this.serializedWindow.getType()
                }, t.isPopup = function() {
                    return this.getType().then((function(e) {
                        return e === m.POPUP
                    }))
                }, t.setLocation = function(e, t) {
                    var n = this;
                    return this.serializedWindow.setLocation(e, t).then((function() {
                        return n
                    }))
                }, t.getName = function() {
                    return this.serializedWindow.getName()
                }, t.setName = function(e) {
                    var t = this;
                    return this.serializedWindow.setName(e).then((function() {
                        return t
                    }))
                }, t.close = function() {
                    var e = this;
                    return this.serializedWindow.close().then((function() {
                        return e
                    }))
                }, t.focus = function() {
                    var e = this,
                        t = this.isPopup(),
                        n = this.getName(),
                        r = p.hash({
                            isPopup: t,
                            name: n
                        }).then((function(e) {
                            var t = e.name;
                            e.isPopup && t && window.open("", t)
                        })),
                        o = this.serializedWindow.focus();
                    return p.all([r, o]).then((function() {
                        return e
                    }))
                }, t.isClosed = function() {
                    return this.serializedWindow.isClosed()
                }, t.getWindow = function() {
                    return this.actualWindow
                }, t.setWindow = function(e, t) {
                    var n = t.send;
                    this.actualWindow = e, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = Bt(this.actualWindowPromise, {
                        send: n,
                        id: this.getID()
                    }), dt("winToProxyWindow").set(e, this)
                }, t.awaitWindow = function() {
                    return this.actualWindowPromise
                }, t.matchWindow = function(e, t) {
                    var n = this,
                        r = t.send;
                    return p.try((function() {
                        return n.actualWindow ? e === n.actualWindow : p.hash({
                            proxyInstanceID: n.getInstanceID(),
                            knownWindowInstanceID: pt(e, {
                                send: r
                            })
                        }).then((function(t) {
                            var o = t.proxyInstanceID === t.knownWindowInstanceID;
                            return o && n.setWindow(e, {
                                send: r
                            }), o
                        }))
                    }))
                }, t.unwrap = function() {
                    return this.actualWindow || this
                }, t.getInstanceID = function() {
                    return this.serializedWindow.getInstanceID()
                }, t.shouldClean = function() {
                    return Boolean(this.actualWindow && W(this.actualWindow))
                }, t.serialize = function() {
                    return this.serializedWindow
                }, e.unwrap = function(t) {
                    return e.isProxyWindow(t) ? t.unwrap() : t
                }, e.serialize = function(t, n) {
                    var r = n.send;
                    return jt(), e.toProxyWindow(t, {
                        send: r
                    }).serialize()
                }, e.deserialize = function(t, n) {
                    var r = n.send;
                    return jt(), at("idToProxyWindow").get(t.id) || new e({
                        serializedWindow: t,
                        send: r
                    })
                }, e.isProxyWindow = function(e) {
                    return Boolean(e && !G(e) && e.isProxyWindow)
                }, e.toProxyWindow = function(t, n) {
                    var r = n.send;
                    if (jt(), e.isProxyWindow(t)) return t;
                    var o = t;
                    return dt("winToProxyWindow").get(o) || new e({
                        win: o,
                        send: r
                    })
                }, e
            }();

            function Lt(e, t, n, r, o) {
                var i = dt("methodStore"),
                    a = at("proxyWindowMethods");
                zt.isProxyWindow(r) ? a.set(e, {
                    val: t,
                    name: n,
                    domain: o,
                    source: r
                }) : (a.del(e), i.getOrSet(r, (function() {
                    return {}
                }))[e] = {
                    domain: o,
                    name: n,
                    val: t,
                    source: r
                })
            }

            function Ut(e, t) {
                var n = dt("methodStore"),
                    r = at("proxyWindowMethods");
                return n.getOrSet(e, (function() {
                    return {}
                }))[t] || r.get(t)
            }

            function Yt(e, t, n, r, o) {
                var i, a, s;
                a = (i = {
                    on: o.on,
                    send: o.send
                }).on, s = i.send, at("builtinListeners").getOrSet("functionCalls", (function() {
                    return a("postrobot_method", {
                        domain: "*"
                    }, (function(e) {
                        var t = e.source,
                            n = e.origin,
                            r = e.data,
                            o = r.id,
                            i = r.name,
                            a = Ut(t, o);
                        if (!a) throw new Error("Could not find method '" + i + "' with id: " + r.id + " in " + O(window));
                        var u = a.source,
                            c = a.domain,
                            d = a.val;
                        return p.try((function() {
                            if (!q(c, n)) throw new Error("Method '" + r.name + "' domain " + JSON.stringify(xe(a.domain) ? a.domain.source : a.domain) + " does not match origin " + n + " in " + O(window));
                            if (zt.isProxyWindow(u)) return u.matchWindow(t, {
                                send: s
                            }).then((function(e) {
                                if (!e) throw new Error("Method call '" + r.name + "' failed - proxy window does not match source in " + O(window))
                            }))
                        })).then((function() {
                            return d.apply({
                                source: t,
                                origin: n
                            }, r.args)
                        }), (function(e) {
                            return p.try((function() {
                                if (d.onError) return d.onError(e)
                            })).then((function() {
                                var t;
                                throw e.stack && (e.stack = "Remote call to " + i + "(" + (void 0 === (t = r.args) && (t = []), Ee(t).map((function(e) {
                                    return "string" == typeof e ? "'" + e + "'" : void 0 === e ? "undefined" : null === e ? "null" : "boolean" == typeof e ? e.toString() : Array.isArray(e) ? "[ ... ]" : "object" == typeof e ? "{ ... }" : "function" == typeof e ? "() => { ... }" : "<" + typeof e + ">"
                                })).join(", ") + ") failed\n\n") + e.stack), e
                            }))
                        })).then((function(e) {
                            return {
                                result: e,
                                id: o,
                                name: i
                            }
                        }))
                    }))
                }));
                var u = n.__id__ || se();
                e = zt.unwrap(e);
                var c = n.__name__ || n.name || r;
                return "string" == typeof c && "function" == typeof c.indexOf && 0 === c.indexOf("anonymous::") && (c = c.replace("anonymous::", r + "::")), zt.isProxyWindow(e) ? (Lt(u, n, c, e, t), e.awaitWindow().then((function(e) {
                    Lt(u, n, c, e, t)
                }))) : Lt(u, n, c, e, t), yt("cross_domain_function", {
                    id: u,
                    name: c
                })
            }

            function qt(e, t, n, r) {
                var o, i = r.on,
                    a = r.send;
                return function(e, t) {
                    void 0 === t && (t = _t);
                    var n = JSON.stringify(e, (function(e) {
                        var n = this[e];
                        if (gt(this)) return n;
                        var r = vt(n);
                        if (!r) return n;
                        var o = t[r] || Et[r];
                        return o ? o(n, e) : n
                    }));
                    return void 0 === n ? "undefined" : n
                }(n, ((o = {}).promise = function(n, r) {
                    return function(e, t, n, r, o) {
                        return yt("cross_domain_zalgo_promise", {
                            then: Yt(e, t, (function(e, t) {
                                return n.then(e, t)
                            }), r, {
                                on: o.on,
                                send: o.send
                            })
                        })
                    }(e, t, n, r, {
                        on: i,
                        send: a
                    })
                }, o.function = function(n, r) {
                    return Yt(e, t, n, r, {
                        on: i,
                        send: a
                    })
                }, o.object = function(e) {
                    return G(e) || zt.isProxyWindow(e) ? yt("cross_domain_window", zt.serialize(e, {
                        send: a
                    })) : e
                }, o))
            }

            function Ht(e, t, n, r) {
                var o, i = r.send;
                return function(e, t) {
                    if (void 0 === t && (t = Pt), "undefined" !== e) return JSON.parse(e, (function(e, n) {
                        if (gt(this)) return n;
                        var r, o;
                        if (gt(n) ? (r = n.__type__, o = n.__val__) : (r = vt(n), o = n), !r) return o;
                        var i = t[r] || xt[r];
                        return i ? i(o, e) : o
                    }))
                }(n, ((o = {}).cross_domain_zalgo_promise = function(e) {
                    return function(e, t, n) {
                        return new p(n.then)
                    }(0, 0, e)
                }, o.cross_domain_function = function(n) {
                    return function(e, t, n, r) {
                        var o = n.id,
                            i = n.name,
                            a = r.send,
                            s = function(n) {
                                function r() {
                                    var s = arguments;
                                    return zt.toProxyWindow(e, {
                                        send: a
                                    }).awaitWindow().then((function(e) {
                                        var u = Ut(e, o);
                                        if (u && u.val !== r) return u.val.apply({
                                            source: window,
                                            origin: O()
                                        }, s);
                                        var c = [].slice.call(s);
                                        return n.fireAndForget ? a(e, "postrobot_method", {
                                            id: o,
                                            name: i,
                                            args: c
                                        }, {
                                            domain: t,
                                            fireAndForget: !0
                                        }) : a(e, "postrobot_method", {
                                            id: o,
                                            name: i,
                                            args: c
                                        }, {
                                            domain: t,
                                            fireAndForget: !1
                                        }).then((function(e) {
                                            return e.data.result
                                        }))
                                    })).catch((function(e) {
                                        throw e
                                    }))
                                }
                                return void 0 === n && (n = {}), r.__name__ = i, r.__origin__ = t, r.__source__ = e, r.__id__ = o, r.origin = t, r
                            },
                            u = s();
                        return u.fireAndForget = s({
                            fireAndForget: !0
                        }), u
                    }(e, t, n, {
                        send: i
                    })
                }, o.cross_domain_window = function(e) {
                    return zt.deserialize(e, {
                        send: i
                    })
                }, o))
            }
            var Vt = {};

            function Gt(e, t, n, r) {
                var o = r.on,
                    i = r.send;
                return p.try((function() {
                    var r = dt().getOrSet(e, (function() {
                        return {}
                    }));
                    return r.buffer = r.buffer || [], r.buffer.push(n), r.flush = r.flush || p.flush().then((function() {
                        if (W(e)) throw new Error("Window is closed");
                        var n, a = qt(e, t, ((n = {}).__post_robot_10_0_44__ = r.buffer || [], n), {
                            on: o,
                            send: i
                        });
                        delete r.buffer;
                        for (var s = Object.keys(Vt), u = [], c = 0; c < s.length; c++) {
                            var d = s[c];
                            try {
                                Vt[d](e, a, t)
                            } catch (e) {
                                u.push(e)
                            }
                        }
                        if (u.length === s.length) throw new Error("All post-robot messaging strategies failed:\n\n" + u.map((function(e, t) {
                            return t + ". " + me(e)
                        })).join("\n\n"))
                    })), r.flush.then((function() {
                        delete r.flush
                    }))
                })).then(pe)
            }

            function Jt(e) {
                return at("responseListeners").get(e)
            }

            function Zt(e) {
                at("responseListeners").del(e)
            }

            function Qt(e) {
                return at("erroredResponseListeners").has(e)
            }

            function Kt(e) {
                var t = e.name,
                    n = e.win,
                    r = e.domain,
                    o = dt("requestListeners");
                if ("*" === n && (n = null), "*" === r && (r = null), !t) throw new Error("Name required to get request listener");
                for (var i = 0, a = [n, ct()]; i < a.length; i++) {
                    var s = a[i];
                    if (s) {
                        var u = o.get(s);
                        if (u) {
                            var c = u[t];
                            if (c) {
                                if (r && "string" == typeof r) {
                                    if (c[r]) return c[r];
                                    if (c.__domain_regex__)
                                        for (var d = 0, f = c.__domain_regex__; d < f.length; d++) {
                                            var l = f[d],
                                                h = l.listener;
                                            if (q(l.regex, r)) return h
                                        }
                                }
                                if (c["*"]) return c["*"]
                            }
                        }
                    }
                }
            }

            function Xt(e, t, n, r) {
                var o = r.on,
                    i = r.send,
                    a = Kt({
                        name: n.name,
                        win: e,
                        domain: t
                    }),
                    s = "postrobot_method" === n.name && n.data && "string" == typeof n.data.name ? n.data.name + "()" : n.name;

                function u(r, a, u) {
                    return p.flush().then((function() {
                        if (!n.fireAndForget && !W(e)) try {
                            return Gt(e, t, {
                                id: se(),
                                origin: O(window),
                                type: "postrobot_message_response",
                                hash: n.hash,
                                name: n.name,
                                ack: r,
                                data: a,
                                error: u
                            }, {
                                on: o,
                                send: i
                            })
                        } catch (e) {
                            throw new Error("Send response message failed for " + s + " in " + O() + "\n\n" + me(e))
                        }
                    }))
                }
                return p.all([p.flush().then((function() {
                    if (!n.fireAndForget && !W(e)) try {
                        return Gt(e, t, {
                            id: se(),
                            origin: O(window),
                            type: "postrobot_message_ack",
                            hash: n.hash,
                            name: n.name
                        }, {
                            on: o,
                            send: i
                        })
                    } catch (e) {
                        throw new Error("Send ack message failed for " + s + " in " + O() + "\n\n" + me(e))
                    }
                })), p.try((function() {
                    if (!a) throw new Error("No handler found for post message: " + n.name + " from " + t + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!q(a.domain, t)) throw new Error("Request origin " + t + " does not match domain " + a.domain.toString());
                    return a.handler({
                        source: e,
                        origin: t,
                        data: n.data
                    })
                })).then((function(e) {
                    return u("success", e)
                }), (function(e) {
                    return u("error", null, e)
                }))]).then(pe).catch((function(e) {
                    if (a && a.handleError) return a.handleError(e);
                    throw e
                }))
            }

            function $t(e, t, n) {
                if (!Qt(n.hash)) {
                    var r = Jt(n.hash);
                    if (!r) throw new Error("No handler found for post message ack for message: " + n.name + " from " + t + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    try {
                        if (!q(r.domain, t)) throw new Error("Ack origin " + t + " does not match domain " + r.domain.toString());
                        if (e !== r.win) throw new Error("Ack source does not match registered window")
                    } catch (e) {
                        r.promise.reject(e)
                    }
                    r.ack = !0
                }
            }

            function en(e, t, n) {
                if (!Qt(n.hash)) {
                    var r, o = Jt(n.hash);
                    if (!o) throw new Error("No handler found for post message response for message: " + n.name + " from " + t + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!q(o.domain, t)) throw new Error("Response origin " + t + " does not match domain " + (r = o.domain, Array.isArray(r) ? "(" + r.join(" | ") + ")" : w(r) ? "RegExp(" + r.toString() + ")" : r.toString()));
                    if (e !== o.win) throw new Error("Response source does not match registered window");
                    Zt(n.hash), "error" === n.ack ? o.promise.reject(n.error) : "success" === n.ack && o.promise.resolve({
                        source: e,
                        origin: t,
                        data: n.data
                    })
                }
            }

            function tn(e, t) {
                var n = t.on,
                    r = t.send,
                    o = at("receivedMessages");
                try {
                    if (!window || window.closed || !e.source) return
                } catch (e) {
                    return
                }
                var i = e.source,
                    a = e.origin,
                    s = function(e, t, n, r) {
                        var o, i = r.on,
                            a = r.send;
                        try {
                            o = Ht(t, n, e, {
                                on: i,
                                send: a
                            })
                        } catch (e) {
                            return
                        }
                        if (o && "object" == typeof o && null !== o) {
                            var s = o.__post_robot_10_0_44__;
                            if (Array.isArray(s)) return s
                        }
                    }(e.data, i, a, {
                        on: n,
                        send: r
                    });
                if (s) {
                    mt(i);
                    for (var u = 0; u < s.length; u++) {
                        var c = s[u];
                        if (o.has(c.id)) return;
                        if (o.set(c.id, !0), W(i) && !c.fireAndForget) return;
                        0 === c.origin.indexOf("file:") && (a = "file://");
                        try {
                            "postrobot_message_request" === c.type ? Xt(i, a, c, {
                                on: n,
                                send: r
                            }) : "postrobot_message_response" === c.type ? en(i, a, c) : "postrobot_message_ack" === c.type && $t(i, a, c)
                        } catch (e) {
                            setTimeout((function() {
                                throw e
                            }), 0)
                        }
                    }
                }
            }

            function nn(e, t, n) {
                if (!e) throw new Error("Expected name");
                if ("function" == typeof(t = t || {}) && (n = t, t = {}), !n) throw new Error("Expected handler");
                (t = t || {}).name = e, t.handler = n || t.handler;
                var r = t.window,
                    o = t.domain,
                    i = function e(t, n) {
                        var r = t.name,
                            o = t.win,
                            i = t.domain,
                            a = dt("requestListeners");
                        if (!r || "string" != typeof r) throw new Error("Name required to add request listener");
                        if (Array.isArray(o)) {
                            for (var s = [], u = 0, c = o; u < c.length; u++) s.push(e({
                                name: r,
                                domain: i,
                                win: c[u]
                            }, n));
                            return {
                                cancel: function() {
                                    for (var e = 0; e < s.length; e++) s[e].cancel()
                                }
                            }
                        }
                        if (Array.isArray(i)) {
                            for (var d = [], f = 0, l = i; f < l.length; f++) d.push(e({
                                name: r,
                                win: o,
                                domain: l[f]
                            }, n));
                            return {
                                cancel: function() {
                                    for (var e = 0; e < d.length; e++) d[e].cancel()
                                }
                            }
                        }
                        var h = Kt({
                            name: r,
                            win: o,
                            domain: i
                        });
                        if (o && "*" !== o || (o = ct()), i = i || "*", h) throw o && i ? new Error("Request listener already exists for " + r + " on domain " + i.toString() + " for " + (o === ct() ? "wildcard" : "specified") + " window") : o ? new Error("Request listener already exists for " + r + " for " + (o === ct() ? "wildcard" : "specified") + " window") : i ? new Error("Request listener already exists for " + r + " on domain " + i.toString()) : new Error("Request listener already exists for " + r);
                        var p, w, m = a.getOrSet(o, (function() {
                                return {}
                            })),
                            g = Pe(m, r, (function() {
                                return {}
                            })),
                            v = i.toString();
                        return xe(i) ? (p = Pe(g, "__domain_regex__", (function() {
                            return []
                        }))).push(w = {
                            regex: i,
                            listener: n
                        }) : g[v] = n, {
                            cancel: function() {
                                delete g[v], w && (p.splice(p.indexOf(w, 1)), p.length || delete g.__domain_regex__), Object.keys(g).length || delete m[r], o && !Object.keys(m).length && a.del(o)
                            }
                        }
                    }({
                        name: e,
                        win: r,
                        domain: o
                    }, {
                        handler: t.handler,
                        handleError: t.errorHandler || function(e) {
                            throw e
                        },
                        window: r,
                        domain: o || "*",
                        name: e
                    });
                return {
                    cancel: function() {
                        i.cancel()
                    }
                }
            }
            Vt.postrobot_post_message = function(e, t, n) {
                0 === n.indexOf("file:") && (n = "*"), e.postMessage(t, n)
            }, Vt.postrobot_bridge = function(e, t, n) {
                if (!St() && !Tt()) throw new Error("Bridge not needed for browser");
                if (A(e)) throw new Error("Post message through bridge disabled between same domain windows");
                if (!1 !== Y(window, e)) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
                ! function(e, t, n) {
                    var r = B(window, e),
                        o = B(e, window);
                    if (!r && !o) throw new Error("Can only send messages to and from parent and popup windows");
                    Ft(e).then((function(r) {
                        return r(e, t, n)
                    }))
                }(e, n, t)
            }, Vt.postrobot_global = function(e, t) {
                if (!D(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
                if (!A(e)) throw new Error("Post message through global disabled between different domain windows");
                if (!1 !== Y(window, e)) throw new Error("Can only use global to communicate between two different windows, not between frames");
                var n = ot(e);
                if (!n) throw new Error("Can not find postRobot global on foreign window");
                n.receiveMessage({
                    source: window,
                    origin: O(),
                    data: t
                })
            };
            var rn, on = function e(t, n, r, o) {
                var i = (o = o || {}).domain || "*",
                    a = o.timeout || -1,
                    s = o.timeout || 5e3,
                    u = o.fireAndForget || !1;
                return p.try((function() {
                    if (function(e, t, n) {
                            if (!e) throw new Error("Expected name");
                            if (n && "string" != typeof n && !Array.isArray(n) && !xe(n)) throw new TypeError("Can not send " + e + ". Expected domain " + JSON.stringify(n) + " to be a string, array, or regex");
                            if (W(t)) throw new Error("Can not send " + e + ". Target window is closed")
                        }(n, t, i), function(e, t) {
                            var n = z(t);
                            if (n) return n === e;
                            if (t === e) return !1;
                            if (N(t) === t) return !1;
                            for (var r = 0, o = T(e); r < o.length; r++)
                                if (o[r] === t) return !0;
                            return !1
                        }(window, t)) return wt(t, s)
                })).then((function(n) {
                    return function(e, t, n, r) {
                        var o = r.send;
                        return p.try((function() {
                            return "string" == typeof t ? t : p.try((function() {
                                return n || ht(e, {
                                    send: o
                                }).then((function(e) {
                                    return e.domain
                                }))
                            })).then((function(e) {
                                if (!q(t, t)) throw new Error("Domain " + ge(t) + " does not match " + ge(t));
                                return e
                            }))
                        }))
                    }(t, i, (void 0 === n ? {} : n).domain, {
                        send: e
                    })
                })).then((function(o) {
                    var i = o,
                        s = "postrobot_method" === n && r && "string" == typeof r.name ? r.name + "()" : n,
                        c = new p,
                        d = n + "_" + se();
                    if (!u) {
                        var f = {
                            name: n,
                            win: t,
                            domain: i,
                            promise: c
                        };
                        ! function(e, t) {
                            at("responseListeners").set(e, t)
                        }(d, f);
                        var l = dt("requestPromises").getOrSet(t, (function() {
                            return []
                        }));
                        l.push(c), c.catch((function() {
                            ! function(e) {
                                at("erroredResponseListeners").set(e, !0)
                            }(d), Zt(d)
                        }));
                        var h = function(e) {
                                return dt("knownWindows").get(e, !1)
                            }(t) ? 1e4 : 2e3,
                            w = a,
                            m = h,
                            g = w,
                            v = be((function() {
                                return W(t) ? c.reject(new Error("Window closed for " + n + " before " + (f.ack ? "response" : "ack"))) : f.cancelled ? c.reject(new Error("Response listener was cancelled for " + n)) : (m = Math.max(m - 500, 0), -1 !== g && (g = Math.max(g - 500, 0)), f.ack || 0 !== m ? 0 === g ? c.reject(new Error("No response for postMessage " + s + " in " + O() + " in " + w + "ms")) : void 0 : c.reject(new Error("No ack for postMessage " + s + " in " + O() + " in " + h + "ms")))
                            }), 500);
                        c.finally((function() {
                            v.cancel(), l.splice(l.indexOf(c, 1))
                        })).catch(pe)
                    }
                    return Gt(t, i, {
                        id: se(),
                        origin: O(window),
                        type: "postrobot_message_request",
                        hash: d,
                        name: n,
                        data: r,
                        fireAndForget: u
                    }, {
                        on: nn,
                        send: e
                    }).then((function() {
                        return u ? c.resolve() : c
                    }), (function(e) {
                        throw new Error("Send request message failed for " + s + " in " + O() + "\n\n" + me(e))
                    }))
                }))
            };

            function an(e) {
                return zt.toProxyWindow(e, {
                    send: on
                })
            }

            function sn(e) {
                for (var t = 0, n = dt("requestPromises").get(e, []); t < n.length; t++) n[t].reject(new Error("Window " + (W(e) ? "closed" : "cleaned up") + " before response")).catch(pe)
            }

            function un(e) {
                if (!A(e)) throw new Error("Can not get global for window on different domain");
                return e.__zoid_9_0_86__ || (e.__zoid_9_0_86__ = {}), e.__zoid_9_0_86__
            }

            function cn(e, t) {
                try {
                    return t(un(e))
                } catch (e) {}
            }

            function dn(e) {
                return {
                    get: function() {
                        var t = this;
                        return p.try((function() {
                            if (t.source && t.source !== window) throw new Error("Can not call get on proxy object from a remote window");
                            return e
                        }))
                    }
                }
            }

            function fn(e) {
                return ae(JSON.stringify(e))
            }

            function ln(e) {
                var t = un(e);
                return t.references = t.references || {}, t.references
            }

            function hn(e) {
                var t, n, r = e.data,
                    o = e.metaData,
                    i = e.sender,
                    a = e.receiver,
                    s = e.passByReference,
                    u = void 0 !== s && s,
                    c = e.basic,
                    d = void 0 !== c && c,
                    f = an(a.win),
                    l = d ? JSON.stringify(r) : qt(f, a.domain, r, {
                        on: nn,
                        send: on
                    }),
                    h = u ? (t = l, n = se(), ln(window)[n] = t, {
                        type: "uid",
                        uid: n
                    }) : {
                        type: "raw",
                        val: l
                    };
                return {
                    serializedData: fn({
                        sender: {
                            domain: i.domain
                        },
                        metaData: o,
                        reference: h
                    }),
                    cleanReference: function() {
                        var e, t;
                        e = window, "uid" === (t = h).type && delete ln(e)[t.uid]
                    }
                }
            }

            function pn(e) {
                var t, n, r = e.sender,
                    o = e.basic,
                    i = void 0 !== o && o,
                    a = function(e) {
                        return JSON.parse(function(e) {
                            if ("function" == typeof atob) return decodeURIComponent([].map.call(atob(e), (function(e) {
                                return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                            })).join(""));
                            if (void 0 !== E) return E.from(e, "base64").toString("utf8");
                            throw new Error("Can not find window.atob or Buffer")
                        }(e))
                    }(e.data),
                    s = a.reference,
                    u = a.metaData;
                t = "function" == typeof r.win ? r.win({
                    metaData: u
                }) : r.win, n = "function" == typeof r.domain ? r.domain({
                    metaData: u
                }) : "string" == typeof r.domain ? r.domain : a.sender.domain;
                var c = function(e, t) {
                    if ("raw" === t.type) return t.val;
                    if ("uid" === t.type) return ln(e)[t.uid];
                    throw new Error("Unsupported ref type: " + t.type)
                }(t, s);
                return {
                    data: i ? JSON.parse(c) : function(e, t, n) {
                        return Ht(e, t, n, {
                            on: nn,
                            send: on
                        })
                    }(t, n, c),
                    metaData: u,
                    sender: {
                        win: t,
                        domain: n
                    },
                    reference: s
                }
            }
            rn = {
                setupBridge: Dt,
                openBridge: function(e, t) {
                    var n = at("bridges"),
                        r = at("bridgeFrames");
                    return t = t || H(e), n.getOrSet(t, (function() {
                        return p.try((function() {
                            if (O() === t) throw new Error("Can not open bridge on the same domain as current domain: " + t);
                            var n = Rt(t);
                            if (j(window, n)) throw new Error("Frame with name " + n + " already exists on page");
                            var o = function(e, t) {
                                var n = document.createElement("iframe");
                                return n.setAttribute("name", e), n.setAttribute("id", e), n.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), n.setAttribute("frameborder", "0"), n.setAttribute("border", "0"), n.setAttribute("scrolling", "no"), n.setAttribute("allowTransparency", "true"), n.setAttribute("tabindex", "-1"), n.setAttribute("hidden", "true"), n.setAttribute("title", ""), n.setAttribute("role", "presentation"), n.src = t, n
                            }(n, e);
                            return r.set(t, o), Mt.then((function(t) {
                                t.appendChild(o);
                                var n = o.contentWindow;
                                return new p((function(e, t) {
                                    o.addEventListener("load", e), o.addEventListener("error", t)
                                })).then((function() {
                                    return wt(n, 5e3, "Bridge " + e)
                                })).then((function() {
                                    return n
                                }))
                            }))
                        }))
                    }))
                },
                linkWindow: Wt,
                linkUrl: function(e, t) {
                    Wt({
                        win: e,
                        domain: H(t)
                    })
                },
                isBridge: Tt,
                needsBridge: Ct,
                needsBridgeForBrowser: St,
                hasBridge: function(e, t) {
                    return at("bridges").has(t || H(e))
                },
                needsBridgeForWin: Ot,
                needsBridgeForDomain: At,
                destroyBridges: function() {
                    for (var e = at("bridges"), t = at("bridgeFrames"), n = 0, r = t.keys(); n < r.length; n++) {
                        var o = t.get(r[n]);
                        o && o.parentNode && o.parentNode.removeChild(o)
                    }
                    t.reset(), e.reset()
                }
            };
            var wn = {
                    STRING: "string",
                    OBJECT: "object",
                    FUNCTION: "function",
                    BOOLEAN: "boolean",
                    NUMBER: "number",
                    ARRAY: "array"
                },
                mn = {
                    JSON: "json",
                    DOTIFY: "dotify",
                    BASE64: "base64"
                },
                gn = m,
                vn = {
                    RENDER: "zoid-render",
                    RENDERED: "zoid-rendered",
                    DISPLAY: "zoid-display",
                    ERROR: "zoid-error",
                    CLOSE: "zoid-close",
                    DESTROY: "zoid-destroy",
                    PROPS: "zoid-props",
                    RESIZE: "zoid-resize",
                    FOCUS: "zoid-focus"
                };

            function yn(e) {
                return "__zoid__" + e.name + "__" + e.serializedPayload + "__"
            }

            function bn(e) {
                if (!e) throw new Error("No window name");
                var t = e.split("__"),
                    n = t[1],
                    r = t[2],
                    o = t[3];
                if ("zoid" !== n) throw new Error("Window not rendered by zoid - got " + n);
                if (!r) throw new Error("Expected component name");
                if (!o) throw new Error("Expected serialized payload ref");
                return {
                    name: r,
                    serializedInitialPayload: o
                }
            }
            var En = le((function(e) {
                var t = pn({
                    data: bn(e).serializedInitialPayload,
                    sender: {
                        win: function(e) {
                            return function(e) {
                                if ("opener" === e.type) return Oe("opener", x(window));
                                if ("parent" === e.type && "number" == typeof e.distance) return Oe("parent", (t = window, void 0 === (n = e.distance) && (n = 1), function(e, t) {
                                    void 0 === t && (t = 1);
                                    for (var n = e, r = 0; r < t; r++) {
                                        if (!n) return;
                                        n = _(n)
                                    }
                                    return n
                                }(t, U(t) - n)));
                                var t, n;
                                if ("global" === e.type && e.uid && "string" == typeof e.uid) {
                                    var r = function() {
                                        var t = e.uid,
                                            n = z(window);
                                        if (!n) throw new Error("Can not find ancestor window");
                                        for (var r = 0, o = F(n); r < o.length; r++) {
                                            var i = o[r];
                                            if (A(i)) {
                                                var a = cn(i, (function(e) {
                                                    return e.windows && e.windows[t]
                                                }));
                                                if (a) return {
                                                    v: a
                                                }
                                            }
                                        }
                                    }();
                                    if ("object" == typeof r) return r.v
                                } else if ("name" === e.type) {
                                    var o = e.name;
                                    return Oe("namedWindow", function(e, t) {
                                        return j(e, t) || function e(t, n) {
                                            var r = j(t, n);
                                            if (r) return r;
                                            for (var o = 0, i = T(t); o < i.length; o++) {
                                                var a = e(i[o], n);
                                                if (a) return a
                                            }
                                        }(N(e) || e, t)
                                    }(Oe("ancestor", z(window)), o))
                                }
                                throw new Error("Unable to find " + e.type + " parent component window")
                            }(e.metaData.windowRef)
                        }
                    }
                });
                return {
                    parent: t.sender,
                    payload: t.data,
                    reference: t.reference
                }
            }));

            function _n() {
                return En(window.name)
            }

            function xn(e, t) {
                if (void 0 === t && (t = window), e === _(t)) return {
                    type: "parent",
                    distance: U(e)
                };
                if (e === x(t)) return {
                    type: "opener"
                };
                if (A(e) && (r = e) !== N(r)) {
                    var n = C(e).name;
                    if (n) return {
                        type: "name",
                        name: n
                    }
                }
                var r
            }

            function Pn(e, t, n, r, o) {
                if (!e.hasOwnProperty(n)) return r;
                var i = e[n];
                return "function" == typeof i.childDecorate ? i.childDecorate({
                    value: r,
                    uid: o.uid,
                    tag: o.tag,
                    close: o.close,
                    focus: o.focus,
                    onError: o.onError,
                    onProps: o.onProps,
                    resize: o.resize,
                    getParent: o.getParent,
                    getParentDomain: o.getParentDomain,
                    show: o.show,
                    hide: o.hide,
                    export: o.export,
                    getSiblings: o.getSiblings
                }) : r
            }

            function Sn() {
                return p.try((function() {
                    window.focus()
                }))
            }

            function On() {
                return p.try((function() {
                    window.close()
                }))
            }
            var An = function() {
                    return pe
                },
                Cn = function(e) {
                    return we(e.value)
                };

            function Rn(e, t, n) {
                for (var r = 0, o = Object.keys(i({}, e, t)); r < o.length; r++) {
                    var a = o[r];
                    n(a, t[a], e[a])
                }
            }

            function Tn(e, t, n) {
                var r = {};
                return p.all(function(e, t, o) {
                    var i = [];
                    return Rn(e, t, (function(e, t, o) {
                        var a = function(e, t, o) {
                            return p.resolve().then((function() {
                                var i, a;
                                if (null != o && t) {
                                    var s = (i = {}, i.get = t.queryParam, i.post = t.bodyParam, i)[n],
                                        u = (a = {}, a.get = t.queryValue, a.post = t.bodyValue, a)[n];
                                    if (s) return p.hash({
                                        finalParam: p.try((function() {
                                            return "function" == typeof s ? s({
                                                value: o
                                            }) : "string" == typeof s ? s : e
                                        })),
                                        finalValue: p.try((function() {
                                            return "function" == typeof u && _e(o) ? u({
                                                value: o
                                            }) : o
                                        }))
                                    }).then((function(n) {
                                        var o, i = n.finalParam,
                                            a = n.finalValue;
                                        if ("boolean" == typeof a) o = a.toString();
                                        else if ("string" == typeof a) o = a.toString();
                                        else if ("object" == typeof a && null !== a) {
                                            if (t.serialization === mn.JSON) o = JSON.stringify(a);
                                            else if (t.serialization === mn.BASE64) o = ae(JSON.stringify(a));
                                            else if (t.serialization === mn.DOTIFY || !t.serialization) {
                                                o = function e(t, n, r) {
                                                    for (var o in void 0 === n && (n = ""), void 0 === r && (r = {}), n = n ? n + "." : n, t) t.hasOwnProperty(o) && null != t[o] && "function" != typeof t[o] && (t[o] && Array.isArray(t[o]) && t[o].length && t[o].every((function(e) {
                                                        return "object" != typeof e
                                                    })) ? r["" + n + o + "[]"] = t[o].join(",") : t[o] && "object" == typeof t[o] ? r = e(t[o], "" + n + o, r) : r["" + n + o] = t[o].toString());
                                                    return r
                                                }(a, e);
                                                for (var s = 0, u = Object.keys(o); s < u.length; s++) {
                                                    var c = u[s];
                                                    r[c] = o[c]
                                                }
                                                return
                                            }
                                        } else "number" == typeof a && (o = a.toString());
                                        r[i] = o
                                    }))
                                }
                            }))
                        }(e, t, o);
                        i.push(a)
                    })), i
                }(t, e)).then((function() {
                    return r
                }))
            }

            function Mn(e) {
                var t, n, r, o, a, s, u, c, d = e.uid,
                    f = e.options,
                    l = e.overrides,
                    h = void 0 === l ? {} : l,
                    w = e.parentWin,
                    m = void 0 === w ? window : w,
                    g = f.propsDef,
                    v = f.containerTemplate,
                    y = f.prerenderTemplate,
                    b = f.tag,
                    E = f.name,
                    _ = f.attributes,
                    x = f.dimensions,
                    P = f.autoResize,
                    S = f.url,
                    R = f.domain,
                    T = f.exports,
                    M = new p,
                    N = [],
                    F = Se(),
                    k = {},
                    I = {},
                    D = {
                        visible: !0
                    },
                    j = h.event ? h.event : (t = {}, n = {}, r = {
                        on: function(e, t) {
                            var r = n[e] = n[e] || [];
                            r.push(t);
                            var o = !1;
                            return {
                                cancel: function() {
                                    o || (o = !0, r.splice(r.indexOf(t), 1))
                                }
                            }
                        },
                        once: function(e, t) {
                            var n = r.on(e, (function() {
                                n.cancel(), t()
                            }));
                            return n
                        },
                        trigger: function(e) {
                            for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) r[o - 1] = arguments[o];
                            var i = n[e],
                                a = [];
                            if (i)
                                for (var s = function(e) {
                                        var t = i[e];
                                        a.push(p.try((function() {
                                            return t.apply(void 0, r)
                                        })))
                                    }, u = 0; u < i.length; u++) s(u);
                            return p.all(a).then(pe)
                        },
                        triggerOnce: function(e) {
                            if (t[e]) return p.resolve();
                            t[e] = !0;
                            for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) o[i - 1] = arguments[i];
                            return r.trigger.apply(r, [e].concat(o))
                        },
                        reset: function() {
                            n = {}
                        }
                    }),
                    B = h.props ? h.props : {},
                    L = h.onError,
                    G = h.getProxyContainer,
                    Z = h.show,
                    K = h.hide,
                    X = h.close,
                    $ = h.renderContainer,
                    ee = h.getProxyWindow,
                    te = h.setProxyWin,
                    ne = h.openFrame,
                    re = h.openPrerenderFrame,
                    oe = h.prerender,
                    ie = h.open,
                    ae = h.openPrerender,
                    ue = h.watchForUnload,
                    ce = h.getInternalState,
                    de = h.setInternalState,
                    fe = function() {
                        return "function" == typeof x ? x({
                            props: B
                        }) : x
                    },
                    he = function() {
                        return p.try((function() {
                            return h.resolveInitPromise ? h.resolveInitPromise() : M.resolve()
                        }))
                    },
                    ye = function(e) {
                        return p.try((function() {
                            return h.rejectInitPromise ? h.rejectInitPromise(e) : M.reject(e)
                        }))
                    },
                    xe = function(e) {
                        for (var t = {}, n = 0, r = Object.keys(B); n < r.length; n++) {
                            var o = r[n],
                                i = g[o];
                            i && !1 === i.sendToChild || i && i.sameDomain && !q(e, O(window)) || (t[o] = B[o])
                        }
                        return p.hash(t)
                    },
                    Pe = function() {
                        return p.try((function() {
                            return ce ? ce() : D
                        }))
                    },
                    Oe = function(e) {
                        return p.try((function() {
                            return de ? de(e) : D = i({}, D, e)
                        }))
                    },
                    Ae = function() {
                        return ee ? ee() : p.try((function() {
                            var e = B.window;
                            if (e) {
                                var t = an(e);
                                return F.register((function() {
                                    return e.close()
                                })), t
                            }
                            return new zt({
                                send: on
                            })
                        }))
                    },
                    Ce = function(e) {
                        return te ? te(e) : p.try((function() {
                            o = e
                        }))
                    },
                    Re = function() {
                        return Z ? Z() : p.hash({
                            setState: Oe({
                                visible: !0
                            }),
                            showElement: a ? a.get().then(qe) : null
                        }).then(pe)
                    },
                    Te = function() {
                        return K ? K() : p.hash({
                            setState: Oe({
                                visible: !1
                            }),
                            showElement: a ? a.get().then(He) : null
                        }).then(pe)
                    },
                    Me = function() {
                        return "function" == typeof S ? S({
                            props: B
                        }) : S
                    },
                    Ne = function() {
                        return "function" == typeof _ ? _({
                            props: B
                        }) : _
                    },
                    Ie = function() {
                        return H(Me())
                    },
                    je = function(e, t) {
                        var n = t.windowName;
                        return ne ? ne(e, {
                            windowName: n
                        }) : p.try((function() {
                            if (e === gn.IFRAME) return dn(Ue({
                                attributes: i({
                                    name: n,
                                    title: E
                                }, Ne().iframe)
                            }))
                        }))
                    },
                    ze = function(e) {
                        return re ? re(e) : p.try((function() {
                            if (e === gn.IFRAME) return dn(Ue({
                                attributes: i({
                                    name: "__zoid_prerender_frame__" + E + "_" + se() + "__",
                                    title: "prerender__" + E
                                }, Ne().iframe)
                            }))
                        }))
                    },
                    Qe = function(e, t, n) {
                        return ae ? ae(e, t, n) : p.try((function() {
                            if (e === gn.IFRAME) {
                                if (!n) throw new Error("Expected proxy frame to be passed");
                                return n.get().then((function(e) {
                                    return F.register((function() {
                                        return Ve(e)
                                    })), Le(e).then((function(e) {
                                        return C(e)
                                    })).then((function(e) {
                                        return an(e)
                                    }))
                                }))
                            }
                            if (e === gn.POPUP) return t;
                            throw new Error("No render context available for " + e)
                        }))
                    },
                    Ke = function() {
                        return p.try((function() {
                            if (o) return p.all([j.trigger(vn.FOCUS), o.focus()]).then(pe)
                        }))
                    },
                    Xe = function() {
                        var e = un(window);
                        return e.windows = e.windows || {}, e.windows[d] = window, F.register((function() {
                            delete e.windows[d]
                        })), d
                    },
                    $e = function(e, t, n, r) {
                        if (t === O(window)) return {
                            type: "global",
                            uid: Xe()
                        };
                        if (e !== window) throw new Error("Can not construct cross-domain window reference for different target window");
                        if (B.window) {
                            var o = r.getWindow();
                            if (!o) throw new Error("Can not construct cross-domain window reference for lazy window prop");
                            if (z(o) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor")
                        }
                        if (n === gn.POPUP) return {
                            type: "opener"
                        };
                        if (n === gn.IFRAME) return {
                            type: "parent",
                            distance: U(window)
                        };
                        throw new Error("Can not construct window reference for child")
                    },
                    et = function(e, t) {
                        return p.try((function() {
                            u = e, s = t, he(), F.register((function() {
                                return t.close.fireAndForget().catch(pe)
                            }))
                        }))
                    },
                    tt = function(e) {
                        var t = e.width,
                            n = e.height;
                        return p.try((function() {
                            j.trigger(vn.RESIZE, {
                                width: t,
                                height: n
                            })
                        }))
                    },
                    nt = function(e) {
                        return p.try((function() {
                            return j.trigger(vn.DESTROY)
                        })).catch(pe).then((function() {
                            return F.all(e)
                        })).then((function() {
                            M.asyncReject(e || new Error("Component destroyed"))
                        }))
                    },
                    ot = le((function(e) {
                        return p.try((function() {
                            if (X) {
                                if (W(X.__source__)) return;
                                return X()
                            }
                            return p.try((function() {
                                return j.trigger(vn.CLOSE)
                            })).then((function() {
                                return nt(e || new Error("Component closed"))
                            }))
                        }))
                    })),
                    it = function(e, t) {
                        var n = t.proxyWin,
                            r = t.proxyFrame,
                            o = t.windowName;
                        return ie ? ie(e, {
                            proxyWin: n,
                            proxyFrame: r,
                            windowName: o
                        }) : p.try((function() {
                            if (e === gn.IFRAME) {
                                if (!r) throw new Error("Expected proxy frame to be passed");
                                return r.get().then((function(e) {
                                    return Le(e).then((function(t) {
                                        return F.register((function() {
                                            return Ve(e)
                                        })), F.register((function() {
                                            return sn(t)
                                        })), t
                                    }))
                                }))
                            }
                            if (e === gn.POPUP) {
                                var t = fe(),
                                    n = t.width,
                                    a = void 0 === n ? "300px" : n,
                                    s = t.height,
                                    u = void 0 === s ? "150px" : s;
                                a = rt(a, window.outerWidth), u = rt(u, window.outerWidth);
                                var c = function(e, t) {
                                    var n = (t = t || {}).closeOnUnload,
                                        r = void 0 === n ? 1 : n,
                                        o = t.name,
                                        a = void 0 === o ? "" : o,
                                        s = t.width,
                                        u = t.height,
                                        c = 0,
                                        d = 0;
                                    s && (window.outerWidth ? d = Math.round((window.outerWidth - s) / 2) + window.screenX : window.screen.width && (d = Math.round((window.screen.width - s) / 2))), u && (window.outerHeight ? c = Math.round((window.outerHeight - u) / 2) + window.screenY : window.screen.height && (c = Math.round((window.screen.height - u) / 2))), delete t.closeOnUnload, delete t.name, s && u && (t = i({
                                        top: c,
                                        left: d,
                                        width: s,
                                        height: u,
                                        status: 1,
                                        toolbar: 0,
                                        menubar: 0,
                                        resizable: 1,
                                        scrollbars: 1
                                    }, t));
                                    var f, l = Object.keys(t).map((function(e) {
                                        if (null != t[e]) return e + "=" + ge(t[e])
                                    })).filter(Boolean).join(",");
                                    try {
                                        f = window.open("", a, l)
                                    } catch (e) {
                                        throw new Be("Can not open popup window - " + (e.stack || e.message))
                                    }
                                    if (W(f)) throw new Be("Can not open popup window - blocked");
                                    return r && window.addEventListener("unload", (function() {
                                        return f.close()
                                    })), f
                                }(0, i({
                                    name: o,
                                    width: a,
                                    height: u
                                }, Ne().popup));
                                return F.register((function() {
                                    return Q(c)
                                })), F.register((function() {
                                    return sn(c)
                                })), c
                            }
                            throw new Error("No render context available for " + e)
                        })).then((function(e) {
                            return n.setWindow(e, {
                                send: on
                            }), n.setName(o).then((function() {
                                return n
                            }))
                        }))
                    },
                    at = function() {
                        return p.try((function() {
                            var e = Ye(window, "unload", we((function() {
                                    nt(new Error("Window navigated away"))
                                }))),
                                t = V(m, nt, 3e3);
                            if (F.register(t.cancel), F.register(e.cancel), ue) return ue()
                        }))
                    },
                    st = function(e) {
                        var t = !1;
                        return e.isClosed().then((function(n) {
                            return n ? (t = !0, ot(new Error("Detected component window close"))) : p.delay(200).then((function() {
                                return e.isClosed()
                            })).then((function(e) {
                                if (e) return t = !0, ot(new Error("Detected component window close"))
                            }))
                        })).then((function() {
                            return t
                        }))
                    },
                    ut = function(e) {
                        return L ? L(e) : p.try((function() {
                            if (-1 === N.indexOf(e)) return N.push(e), M.asyncReject(e), j.trigger(vn.ERROR, e)
                        }))
                    },
                    ct = new p,
                    dt = function(e) {
                        return p.try((function() {
                            ct.resolve(e)
                        }))
                    };
                et.onError = ut;
                var ft = function(e, t) {
                        return e({
                            uid: d,
                            container: t.container,
                            context: t.context,
                            doc: t.doc,
                            frame: t.frame,
                            prerenderFrame: t.prerenderFrame,
                            focus: Ke,
                            close: ot,
                            state: k,
                            props: B,
                            tag: b,
                            dimensions: fe(),
                            event: j
                        })
                    },
                    lt = function(e, t) {
                        var n = t.context;
                        return oe ? oe(e, {
                            context: n
                        }) : p.try((function() {
                            if (y) {
                                var t = e.getWindow();
                                if (t && A(t) && function(e) {
                                        try {
                                            if (!e.location.href) return !0;
                                            if ("about:blank" === e.location.href) return !0
                                        } catch (e) {}
                                        return !1
                                    }(t)) {
                                    var r = (t = C(t)).document,
                                        o = ft(y, {
                                            context: n,
                                            doc: r
                                        });
                                    if (o) {
                                        if (o.ownerDocument !== r) throw new Error("Expected prerender template to have been created with document from child window");
                                        ! function(e, t) {
                                            var n = t.tagName.toLowerCase();
                                            if ("html" !== n) throw new Error("Expected element to be html, got " + n);
                                            for (var r = e.document.documentElement, o = 0, i = Ee(r.children); o < i.length; o++) r.removeChild(i[o]);
                                            for (var a = 0, s = Ee(t.children); a < s.length; a++) r.appendChild(s[a])
                                        }(t, o);
                                        var i = P.width,
                                            a = void 0 !== i && i,
                                            s = P.height,
                                            u = void 0 !== s && s,
                                            c = P.element,
                                            d = void 0 === c ? "body" : c;
                                        if ((d = We(d, r)) && (a || u)) {
                                            var f = Je(d, (function(e) {
                                                tt({
                                                    width: a ? e.width : void 0,
                                                    height: u ? e.height : void 0
                                                })
                                            }), {
                                                width: a,
                                                height: u,
                                                win: t
                                            });
                                            j.on(vn.RENDERED, f.cancel)
                                        }
                                    }
                                }
                            }
                        }))
                    },
                    ht = function(e, t) {
                        var n = t.proxyFrame,
                            r = t.proxyPrerenderFrame,
                            o = t.context,
                            i = t.rerender;
                        return $ ? $(e, {
                            proxyFrame: n,
                            proxyPrerenderFrame: r,
                            context: o,
                            rerender: i
                        }) : p.hash({
                            container: e.get(),
                            frame: n ? n.get() : null,
                            prerenderFrame: r ? r.get() : null,
                            internalState: Pe()
                        }).then((function(e) {
                            var t = e.container,
                                n = e.internalState.visible,
                                r = ft(v, {
                                    context: o,
                                    container: t,
                                    frame: e.frame,
                                    prerenderFrame: e.prerenderFrame,
                                    doc: document
                                });
                            if (r) {
                                n || He(r), ke(t, r);
                                var s = function(e, t) {
                                    t = we(t);
                                    var n, r, o, i = !1,
                                        a = [],
                                        s = function() {
                                            i = !0;
                                            for (var e = 0; e < a.length; e++) a[e].disconnect();
                                            n && n.cancel(), o && o.removeEventListener("unload", u), r && Ve(r)
                                        },
                                        u = function() {
                                            i || (t(), s())
                                        };
                                    if (Ge(e)) return u(), {
                                        cancel: s
                                    };
                                    if (window.MutationObserver)
                                        for (var c = e.parentElement; c;) {
                                            var d = new window.MutationObserver((function() {
                                                Ge(e) && u()
                                            }));
                                            d.observe(c, {
                                                childList: !0
                                            }), a.push(d), c = c.parentElement
                                        }
                                    return (r = document.createElement("iframe")).setAttribute("name", "__detect_close_" + se() + "__"), r.style.display = "none", Le(r).then((function(e) {
                                        (o = C(e)).addEventListener("unload", u)
                                    })), e.appendChild(r), n = be((function() {
                                        Ge(e) && u()
                                    }), 1e3), {
                                        cancel: s
                                    }
                                }(r, (function() {
                                    var e = new Error("Detected container element removed from DOM");
                                    return p.delay(1).then((function() {
                                        if (!Ge(r)) return F.all(e), i().then(he, ye);
                                        ot(e)
                                    }))
                                }));
                                return F.register((function() {
                                    return s.cancel()
                                })), F.register((function() {
                                    return Ve(r)
                                })), a = dn(r)
                            }
                        }))
                    },
                    pt = function() {
                        return {
                            state: k,
                            event: j,
                            close: ot,
                            focus: Ke,
                            resize: tt,
                            onError: ut,
                            updateProps: mt,
                            show: Re,
                            hide: Te
                        }
                    },
                    wt = function(e) {
                        void 0 === e && (e = {});
                        var t = c,
                            n = pt();
                        ve(I, e),
                            function(e, t, n, r, o) {
                                var i = r.state,
                                    a = r.close,
                                    s = r.focus,
                                    u = r.event,
                                    c = r.onError;
                                Rn(n, e, (function(e, r, d) {
                                    var f = !1,
                                        l = d;
                                    Object.defineProperty(t, e, {
                                        configurable: !0,
                                        enumerable: !0,
                                        get: function() {
                                            return f ? l : (f = !0, function() {
                                                if (!r) return l;
                                                var f = r.alias;
                                                if (f && !_e(d) && _e(n[f]) && (l = n[f]), r.value && (l = r.value({
                                                        props: t,
                                                        state: i,
                                                        close: a,
                                                        focus: s,
                                                        event: u,
                                                        onError: c,
                                                        container: o
                                                    })), !r.default || _e(l) || _e(n[e]) || (l = r.default({
                                                        props: t,
                                                        state: i,
                                                        close: a,
                                                        focus: s,
                                                        event: u,
                                                        onError: c,
                                                        container: o
                                                    })), _e(l)) {
                                                    if (r.type === wn.ARRAY ? !Array.isArray(l) : typeof l !== r.type) throw new TypeError("Prop is not of type " + r.type + ": " + e)
                                                } else if (!1 !== r.required && !_e(n[e])) throw new Error('Expected prop "' + e + '" to be defined');
                                                return _e(l) && r.decorate && (l = r.decorate({
                                                    value: l,
                                                    props: t,
                                                    state: i,
                                                    close: a,
                                                    focus: s,
                                                    event: u,
                                                    onError: c,
                                                    container: o
                                                })), l
                                            }())
                                        }
                                    })
                                })), Rn(t, e, pe)
                            }(g, B, I, n, t)
                    },
                    mt = function(e) {
                        return wt(e), M.then((function() {
                            var e = s,
                                t = o;
                            if (e && t && u) return xe(u).then((function(n) {
                                return e.updateProps(n).catch((function(e) {
                                    return st(t).then((function(t) {
                                        if (!t) throw e
                                    }))
                                }))
                            }))
                        }))
                    },
                    gt = function(e) {
                        return G ? G(e) : p.try((function() {
                            return De(e)
                        })).then((function(e) {
                            return Ze(e) && (e = function e(t) {
                                var n = function(e) {
                                    var t = function(e) {
                                        for (; e.parentNode;) e = e.parentNode;
                                        if (Ze(e)) return e
                                    }(e);
                                    if (t && t.host) return t.host
                                }(t);
                                if (!n) throw new Error("Element is not in shadow dom");
                                var r = "shadow-slot-" + se(),
                                    o = document.createElement("slot");
                                o.setAttribute("name", r), t.appendChild(o);
                                var i = document.createElement("div");
                                return i.setAttribute("slot", r), n.appendChild(i), Ze(n) ? e(i) : i
                            }(e)), c = e, dn(e)
                        }))
                    };
                return {
                    init: function() {
                        j.on(vn.RENDER, (function() {
                            return B.onRender()
                        })), j.on(vn.DISPLAY, (function() {
                            return B.onDisplay()
                        })), j.on(vn.RENDERED, (function() {
                            return B.onRendered()
                        })), j.on(vn.CLOSE, (function() {
                            return B.onClose()
                        })), j.on(vn.DESTROY, (function() {
                            return B.onDestroy()
                        })), j.on(vn.RESIZE, (function() {
                            return B.onResize()
                        })), j.on(vn.FOCUS, (function() {
                            return B.onFocus()
                        })), j.on(vn.PROPS, (function(e) {
                            return B.onProps(e)
                        })), j.on(vn.ERROR, (function(e) {
                            return B && B.onError ? B.onError(e) : ye(e).then((function() {
                                setTimeout((function() {
                                    throw e
                                }), 1)
                            }))
                        })), F.register(j.reset)
                    },
                    render: function(e) {
                        var t = e.target,
                            n = e.container,
                            r = e.context,
                            i = e.rerender;
                        return p.try((function() {
                            var e = Ie(),
                                a = R || Ie();
                            ! function(e, t, n) {
                                if (e !== window) {
                                    if (!Y(window, e)) throw new Error("Can only renderTo an adjacent frame");
                                    var r = O();
                                    if (!q(t, r) && !A(e)) throw new Error("Can not render remotely to " + t.toString() + " - can only render to " + r);
                                    if (n && "string" != typeof n) throw new Error("Container passed to renderTo must be a string selector, got " + typeof n + " }")
                                }
                            }(t, a, n);
                            var s = p.try((function() {
                                    if (t !== window) return function(e, t) {
                                        for (var n = {}, r = 0, o = Object.keys(B); r < o.length; r++) {
                                            var i = o[r],
                                                a = g[i];
                                            a && a.allowDelegate && (n[i] = B[i])
                                        }
                                        var s = on(t, "zoid_delegate_" + E, {
                                            uid: d,
                                            overrides: {
                                                props: n,
                                                event: j,
                                                close: ot,
                                                onError: ut,
                                                getInternalState: Pe,
                                                setInternalState: Oe,
                                                resolveInitPromise: he,
                                                rejectInitPromise: ye
                                            }
                                        }).then((function(e) {
                                            var n = e.data.parent;
                                            return F.register((function(e) {
                                                if (!W(t)) return n.destroy(e)
                                            })), n.getDelegateOverrides()
                                        })).catch((function(e) {
                                            throw new Error("Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n" + me(e))
                                        }));
                                        return G = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.getProxyContainer.apply(e, t)
                                            }))
                                        }, $ = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.renderContainer.apply(e, t)
                                            }))
                                        }, Z = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.show.apply(e, t)
                                            }))
                                        }, K = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.hide.apply(e, t)
                                            }))
                                        }, ue = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.watchForUnload.apply(e, t)
                                            }))
                                        }, e === gn.IFRAME ? (ee = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.getProxyWindow.apply(e, t)
                                            }))
                                        }, ne = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.openFrame.apply(e, t)
                                            }))
                                        }, re = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.openPrerenderFrame.apply(e, t)
                                            }))
                                        }, oe = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.prerender.apply(e, t)
                                            }))
                                        }, ie = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.open.apply(e, t)
                                            }))
                                        }, ae = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.openPrerender.apply(e, t)
                                            }))
                                        }) : e === gn.POPUP && (te = function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return s.then((function(e) {
                                                return e.setProxyWin.apply(e, t)
                                            }))
                                        }), s
                                    }(r, t)
                                })),
                                u = B.window,
                                c = at(),
                                l = Tn(g, B, "post"),
                                h = j.trigger(vn.RENDER),
                                w = gt(n),
                                m = Ae(),
                                v = w.then((function() {
                                    return wt()
                                })),
                                y = v.then((function() {
                                    return Tn(g, B, "get").then((function(e) {
                                        return function(e, t) {
                                            var n, r, o = t.query || {},
                                                i = t.hash || {},
                                                a = e.split("#");
                                            r = a[1];
                                            var s = (n = a[0]).split("?");
                                            n = s[0];
                                            var u = Fe(s[1], o),
                                                c = Fe(r, i);
                                            return u && (n = n + "?" + u), c && (n = n + "#" + c), n
                                        }(J(Me()), {
                                            query: e
                                        })
                                    }))
                                })),
                                _ = m.then((function(n) {
                                    return function(e) {
                                        var t = void 0 === e ? {} : e,
                                            n = t.proxyWin,
                                            r = t.initialChildDomain,
                                            o = t.childDomainMatch,
                                            i = t.target,
                                            a = void 0 === i ? window : i,
                                            s = t.context;
                                        return function(e) {
                                            var t = void 0 === e ? {} : e,
                                                n = t.proxyWin,
                                                r = t.childDomainMatch,
                                                o = t.context;
                                            return xe(t.initialChildDomain).then((function(e) {
                                                return {
                                                    uid: d,
                                                    context: o,
                                                    tag: b,
                                                    childDomainMatch: r,
                                                    version: "9_0_86",
                                                    props: e,
                                                    exports: (t = n, {
                                                        init: function(e) {
                                                            return et(this.origin, e)
                                                        },
                                                        close: ot,
                                                        checkClose: function() {
                                                            return st(t)
                                                        },
                                                        resize: tt,
                                                        onError: ut,
                                                        show: Re,
                                                        hide: Te,
                                                        export: dt
                                                    })
                                                };
                                                var t
                                            }))
                                        }({
                                            proxyWin: n,
                                            initialChildDomain: r,
                                            childDomainMatch: o,
                                            context: s
                                        }).then((function(e) {
                                            var t = hn({
                                                    data: e,
                                                    metaData: {
                                                        windowRef: $e(a, r, s, n)
                                                    },
                                                    sender: {
                                                        domain: O(window)
                                                    },
                                                    receiver: {
                                                        win: n,
                                                        domain: o
                                                    },
                                                    passByReference: r === O()
                                                }),
                                                i = t.serializedData;
                                            return F.register(t.cleanReference), i
                                        }))
                                    }({
                                        proxyWin: (o = {
                                            proxyWin: n,
                                            initialChildDomain: e,
                                            childDomainMatch: a,
                                            target: t,
                                            context: r
                                        }).proxyWin,
                                        initialChildDomain: o.initialChildDomain,
                                        childDomainMatch: o.childDomainMatch,
                                        target: o.target,
                                        context: o.context
                                    }).then((function(e) {
                                        return yn({
                                            name: E,
                                            serializedPayload: e
                                        })
                                    }));
                                    var o
                                })),
                                x = _.then((function(e) {
                                    return je(r, {
                                        windowName: e
                                    })
                                })),
                                P = ze(r),
                                S = p.hash({
                                    proxyContainer: w,
                                    proxyFrame: x,
                                    proxyPrerenderFrame: P
                                }).then((function(e) {
                                    return ht(e.proxyContainer, {
                                        context: r,
                                        proxyFrame: e.proxyFrame,
                                        proxyPrerenderFrame: e.proxyPrerenderFrame,
                                        rerender: i
                                    })
                                })).then((function(e) {
                                    return e
                                })),
                                C = p.hash({
                                    windowName: _,
                                    proxyFrame: x,
                                    proxyWin: m
                                }).then((function(e) {
                                    var t = e.proxyWin;
                                    return u ? t : it(r, {
                                        windowName: e.windowName,
                                        proxyWin: t,
                                        proxyFrame: e.proxyFrame
                                    })
                                })),
                                T = p.hash({
                                    proxyWin: C,
                                    proxyPrerenderFrame: P
                                }).then((function(e) {
                                    return Qe(r, e.proxyWin, e.proxyPrerenderFrame)
                                })),
                                N = C.then((function(e) {
                                    return o = e, Ce(e)
                                })),
                                k = p.hash({
                                    proxyPrerenderWin: T,
                                    state: N
                                }).then((function(e) {
                                    return lt(e.proxyPrerenderWin, {
                                        context: r
                                    })
                                })),
                                I = p.hash({
                                    proxyWin: C,
                                    windowName: _
                                }).then((function(e) {
                                    if (u) return e.proxyWin.setName(e.windowName)
                                })),
                                D = p.hash({
                                    body: l
                                }).then((function(e) {
                                    return f.method ? f.method : Object.keys(e.body).length ? "post" : "get"
                                })),
                                z = p.hash({
                                    proxyWin: C,
                                    windowUrl: y,
                                    body: l,
                                    method: D,
                                    windowName: I,
                                    prerender: k
                                }).then((function(e) {
                                    return e.proxyWin.setLocation(e.windowUrl, {
                                        method: e.method,
                                        body: e.body
                                    })
                                })),
                                L = C.then((function(e) {
                                    ! function e(t, n) {
                                        var r = !1;
                                        return F.register((function() {
                                            r = !0
                                        })), p.delay(2e3).then((function() {
                                            return t.isClosed()
                                        })).then((function(o) {
                                            if (!r) return o ? ot(new Error("Detected " + n + " close")) : e(t, n)
                                        }))
                                    }(e, r)
                                })),
                                U = p.hash({
                                    container: S,
                                    prerender: k
                                }).then((function() {
                                    return j.trigger(vn.DISPLAY)
                                })),
                                V = C.then((function(t) {
                                    return function(e, t, n) {
                                        return p.try((function() {
                                            return e.awaitWindow()
                                        })).then((function(e) {
                                            if (rn && rn.needsBridge({
                                                    win: e,
                                                    domain: t
                                                }) && !rn.hasBridge(t, t)) {
                                                var r = "function" == typeof f.bridgeUrl ? f.bridgeUrl({
                                                    props: B
                                                }) : f.bridgeUrl;
                                                if (!r) throw new Error("Bridge needed to render " + n);
                                                var o = H(r);
                                                return rn.linkUrl(e, t), rn.openBridge(J(r), o)
                                            }
                                        }))
                                    }(t, e, r)
                                })),
                                Q = z.then((function() {
                                    return p.try((function() {
                                        var e = B.timeout;
                                        if (e) return M.timeout(e, new Error("Loading component timed out after " + e + " milliseconds"))
                                    }))
                                })),
                                X = M.then((function() {
                                    return j.trigger(vn.RENDERED)
                                }));
                            return p.hash({
                                initPromise: M,
                                buildUrlPromise: y,
                                onRenderPromise: h,
                                getProxyContainerPromise: w,
                                openFramePromise: x,
                                openPrerenderFramePromise: P,
                                renderContainerPromise: S,
                                openPromise: C,
                                openPrerenderPromise: T,
                                setStatePromise: N,
                                prerenderPromise: k,
                                loadUrlPromise: z,
                                buildWindowNamePromise: _,
                                setWindowNamePromise: I,
                                watchForClosePromise: L,
                                onDisplayPromise: U,
                                openBridgePromise: V,
                                runTimeoutPromise: Q,
                                onRenderedPromise: X,
                                delegatePromise: s,
                                watchForUnloadPromise: c,
                                finalSetPropsPromise: v
                            })
                        })).catch((function(e) {
                            return p.all([ut(e), nt(e)]).then((function() {
                                throw e
                            }), (function() {
                                throw e
                            }))
                        })).then(pe)
                    },
                    destroy: nt,
                    getProps: function() {
                        return B
                    },
                    setProps: wt,
                    export: dt,
                    getHelpers: pt,
                    getDelegateOverrides: function() {
                        return p.try((function() {
                            return {
                                getProxyContainer: gt,
                                show: Re,
                                hide: Te,
                                renderContainer: ht,
                                getProxyWindow: Ae,
                                watchForUnload: at,
                                openFrame: je,
                                openPrerenderFrame: ze,
                                prerender: lt,
                                open: it,
                                openPrerender: Qe,
                                setProxyWin: Ce
                            }
                        }))
                    },
                    getExports: function() {
                        return T({
                            getExports: function() {
                                return ct
                            }
                        })
                    }
                }
            }

            function Nn(e) {
                var t = e.uid,
                    n = e.frame,
                    r = e.prerenderFrame,
                    o = e.doc,
                    i = e.props,
                    a = e.event,
                    s = e.dimensions,
                    u = s.width,
                    c = s.height;
                if (n && r) {
                    var d = o.createElement("div");
                    d.setAttribute("id", t);
                    var f = o.createElement("style");
                    return i.cspNonce && f.setAttribute("nonce", i.cspNonce), f.appendChild(o.createTextNode("\n            #" + t + " {\n                display: inline-block;\n                position: relative;\n                width: " + u + ";\n                height: " + c + ";\n            }\n\n            #" + t + " > iframe {\n                display: inline-block;\n                position: absolute;\n                width: 100%;\n                height: 100%;\n                top: 0;\n                left: 0;\n                transition: opacity .2s ease-in-out;\n            }\n\n            #" + t + " > iframe.zoid-invisible {\n                opacity: 0;\n            }\n\n            #" + t + " > iframe.zoid-visible {\n                opacity: 1;\n        }\n        ")), d.appendChild(n), d.appendChild(r), d.appendChild(f), r.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), a.on(vn.RENDERED, (function() {
                        r.classList.remove("zoid-visible"), r.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout((function() {
                            Ve(r)
                        }), 1)
                    })), a.on(vn.RESIZE, (function(e) {
                        var t = e.width,
                            n = e.height;
                        "number" == typeof t && (d.style.width = nt(t)), "number" == typeof n && (d.style.height = nt(n))
                    })), d
                }
            }

            function Fn(e) {
                var t = e.doc,
                    n = e.props,
                    r = t.createElement("html"),
                    o = t.createElement("body"),
                    i = t.createElement("style"),
                    a = t.createElement("div");
                return a.classList.add("spinner"), n.cspNonce && i.setAttribute("nonce", n.cspNonce), r.appendChild(o), o.appendChild(a), o.appendChild(i), i.appendChild(t.createTextNode("\n            html, body {\n                width: 100%;\n                height: 100%;\n            }\n\n            .spinner {\n                position: fixed;\n                max-height: 60vmin;\n                max-width: 60vmin;\n                height: 40px;\n                width: 40px;\n                top: 50%;\n                left: 50%;\n                box-sizing: border-box;\n                border: 3px solid rgba(0, 0, 0, .2);\n                border-top-color: rgba(33, 128, 192, 0.8);\n                border-radius: 100%;\n                animation: rotation .7s infinite linear;\n            }\n\n            @keyframes rotation {\n                from {\n                    transform: translateX(-50%) translateY(-50%) rotate(0deg);\n                }\n                to {\n                    transform: translateX(-50%) translateY(-50%) rotate(359deg);\n                }\n            }\n        ")), r
            }
            var kn = Se(),
                In = Se();

            function Wn(e) {
                var t, n, r = function(e) {
                        var t = e.tag,
                            n = e.url,
                            r = e.domain,
                            o = e.bridgeUrl,
                            a = e.props,
                            s = void 0 === a ? {} : a,
                            u = e.dimensions,
                            c = void 0 === u ? {} : u,
                            d = e.autoResize,
                            f = void 0 === d ? {} : d,
                            l = e.allowedParentDomains,
                            h = void 0 === l ? "*" : l,
                            p = e.attributes,
                            w = void 0 === p ? {} : p,
                            m = e.defaultContext,
                            g = void 0 === m ? gn.IFRAME : m,
                            v = e.containerTemplate,
                            y = void 0 === v ? Nn : v,
                            b = e.prerenderTemplate,
                            E = void 0 === b ? Fn : b,
                            _ = e.validate,
                            x = e.eligible,
                            P = void 0 === x ? function() {
                                return {
                                    eligible: !0
                                }
                            } : x,
                            S = e.logger,
                            O = void 0 === S ? {
                                info: pe
                            } : S,
                            C = e.exports,
                            R = void 0 === C ? pe : C,
                            T = e.method,
                            M = e.children,
                            N = void 0 === M ? function() {
                                return {}
                            } : M,
                            F = t.replace(/-/g, "_"),
                            k = i({}, {
                                window: {
                                    type: wn.OBJECT,
                                    sendToChild: !1,
                                    required: !1,
                                    allowDelegate: !0,
                                    validate: function(e) {
                                        var t = e.value;
                                        if (!G(t) && !zt.isProxyWindow(t)) throw new Error("Expected Window or ProxyWindow");
                                        if (G(t)) {
                                            if (W(t)) throw new Error("Window is closed");
                                            if (!A(t)) throw new Error("Window is not same domain")
                                        }
                                    },
                                    decorate: function(e) {
                                        return an(e.value)
                                    }
                                },
                                timeout: {
                                    type: wn.NUMBER,
                                    required: !1,
                                    sendToChild: !1
                                },
                                cspNonce: {
                                    type: wn.STRING,
                                    required: !1
                                },
                                onDisplay: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    allowDelegate: !0,
                                    default: An,
                                    decorate: Cn
                                },
                                onRendered: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    default: An,
                                    decorate: Cn
                                },
                                onRender: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    default: An,
                                    decorate: Cn
                                },
                                onClose: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    allowDelegate: !0,
                                    default: An,
                                    decorate: Cn
                                },
                                onDestroy: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    allowDelegate: !0,
                                    default: An,
                                    decorate: Cn
                                },
                                onResize: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    allowDelegate: !0,
                                    default: An
                                },
                                onFocus: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    allowDelegate: !0,
                                    default: An
                                },
                                close: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.close
                                    }
                                },
                                focus: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.focus
                                    }
                                },
                                resize: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.resize
                                    }
                                },
                                uid: {
                                    type: wn.STRING,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.uid
                                    }
                                },
                                tag: {
                                    type: wn.STRING,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.tag
                                    }
                                },
                                getParent: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.getParent
                                    }
                                },
                                getParentDomain: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.getParentDomain
                                    }
                                },
                                show: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.show
                                    }
                                },
                                hide: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.hide
                                    }
                                },
                                export: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.export
                                    }
                                },
                                onError: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.onError
                                    }
                                },
                                onProps: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.onProps
                                    }
                                },
                                getSiblings: {
                                    type: wn.FUNCTION,
                                    required: !1,
                                    sendToChild: !1,
                                    childDecorate: function(e) {
                                        return e.getSiblings
                                    }
                                }
                            }, s);
                        if (!y) throw new Error("Container template required");
                        return {
                            name: F,
                            tag: t,
                            url: n,
                            domain: r,
                            bridgeUrl: o,
                            method: T,
                            propsDef: k,
                            dimensions: c,
                            autoResize: f,
                            allowedParentDomains: h,
                            attributes: w,
                            defaultContext: g,
                            containerTemplate: y,
                            prerenderTemplate: E,
                            validate: _,
                            logger: O,
                            eligible: P,
                            children: N,
                            exports: "function" == typeof R ? R : function(e) {
                                for (var t = e.getExports, n = {}, r = function(e, r) {
                                        var o = r[e],
                                            i = R[o].type,
                                            a = t().then((function(e) {
                                                return e[o]
                                            }));
                                        n[o] = i === wn.FUNCTION ? function() {
                                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                            return a.then((function(e) {
                                                return e.apply(void 0, t)
                                            }))
                                        } : a
                                    }, o = 0, i = Object.keys(R); o < i.length; o++) r(o, i);
                                return n
                            }
                        }
                    }(e),
                    o = r.name,
                    a = r.tag,
                    s = r.defaultContext,
                    u = r.eligible,
                    c = r.children,
                    d = un(window),
                    f = [],
                    l = function() {
                        if (function(e) {
                                try {
                                    return bn(window.name).name === e
                                } catch (e) {}
                                return !1
                            }(o)) {
                            var e = _n().payload;
                            if (e.tag === a && q(e.childDomainMatch, O())) return !0
                        }
                        return !1
                    },
                    h = le((function() {
                        if (l()) {
                            if (window.xprops) throw delete d.components[a], new Error("Can not register " + o + " as child - child already registered");
                            var e = function(e) {
                                var t, n = e.tag,
                                    r = e.propsDef,
                                    o = e.autoResize,
                                    i = e.allowedParentDomains,
                                    a = [],
                                    s = _n(),
                                    u = s.parent,
                                    c = s.payload,
                                    d = u.win,
                                    f = u.domain,
                                    l = new p,
                                    h = c.version,
                                    w = c.uid,
                                    m = c.exports,
                                    g = c.context,
                                    v = c.props;
                                if ("9_0_86" !== h) throw new Error("Parent window has zoid version " + h + ", child window has version 9_0_86");
                                var y = m.show,
                                    b = m.hide,
                                    E = m.close,
                                    _ = m.onError,
                                    x = m.checkClose,
                                    P = m.export,
                                    S = m.resize,
                                    R = m.init,
                                    T = function() {
                                        return d
                                    },
                                    M = function() {
                                        return f
                                    },
                                    N = function(e) {
                                        return a.push(e), {
                                            cancel: function() {
                                                a.splice(a.indexOf(e), 1)
                                            }
                                        }
                                    },
                                    k = function(e) {
                                        return S.fireAndForget({
                                            width: e.width,
                                            height: e.height
                                        })
                                    },
                                    I = function(e) {
                                        return l.resolve(e), P(e)
                                    },
                                    W = function(e) {
                                        var r = (void 0 === e ? {} : e).anyParent,
                                            o = [],
                                            i = t.parent;
                                        if (void 0 === r && (r = !i), !r && !i) throw new Error("No parent found for " + n + " child");
                                        for (var a = 0, s = F(window); a < s.length; a++) {
                                            var u = s[a];
                                            if (A(u)) {
                                                var c = C(u).xprops;
                                                if (c && T() === c.getParent()) {
                                                    var d = c.parent;
                                                    if (r || !i || d && d.uid === i.uid) {
                                                        var f = cn(u, (function(e) {
                                                            return e.exports
                                                        }));
                                                        o.push({
                                                            props: c,
                                                            exports: f
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                        return o
                                    },
                                    D = function(e, o, i) {
                                        void 0 === i && (i = !1);
                                        var s = function(e, t, n, r, o, i) {
                                            void 0 === i && (i = !1);
                                            for (var a = {}, s = 0, u = Object.keys(n); s < u.length; s++) {
                                                var c = u[s],
                                                    d = t[c];
                                                if (!d || !d.sameDomain || r === O(window) && A(e)) {
                                                    var f = Pn(t, 0, c, n[c], o);
                                                    a[c] = f, d && d.alias && !a[d.alias] && (a[d.alias] = f)
                                                }
                                            }
                                            if (!i)
                                                for (var l = 0, h = Object.keys(t); l < h.length; l++) {
                                                    var p = h[l];
                                                    n.hasOwnProperty(p) || (a[p] = Pn(t, 0, p, void 0, o))
                                                }
                                            return a
                                        }(d, r, e, o, {
                                            tag: n,
                                            show: y,
                                            hide: b,
                                            close: E,
                                            focus: Sn,
                                            onError: _,
                                            resize: k,
                                            getSiblings: W,
                                            onProps: N,
                                            getParent: T,
                                            getParentDomain: M,
                                            uid: w,
                                            export: I
                                        }, i);
                                        t ? ve(t, s) : t = s;
                                        for (var u = 0; u < a.length; u++)(0, a[u])(t)
                                    },
                                    j = function(e) {
                                        return p.try((function() {
                                            return D(e, f, !0)
                                        }))
                                    };
                                return {
                                    init: function() {
                                        return p.try((function() {
                                            return A(d) && function(e) {
                                                    var t = e.componentName,
                                                        n = e.parentComponentWindow,
                                                        r = pn({
                                                            data: bn(window.name).serializedInitialPayload,
                                                            sender: {
                                                                win: n
                                                            },
                                                            basic: !0
                                                        }),
                                                        o = r.sender;
                                                    if ("uid" === r.reference.type || "global" === r.metaData.windowRef.type) {
                                                        var i = hn({
                                                            data: r.data,
                                                            metaData: {
                                                                windowRef: xn(n)
                                                            },
                                                            sender: {
                                                                domain: o.domain
                                                            },
                                                            receiver: {
                                                                win: window,
                                                                domain: O()
                                                            },
                                                            basic: !0
                                                        });
                                                        window.name = yn({
                                                            name: t,
                                                            serializedPayload: i.serializedData
                                                        })
                                                    }
                                                }({
                                                    componentName: e.name,
                                                    parentComponentWindow: d
                                                }), un(window).exports = e.exports({
                                                    getExports: function() {
                                                        return l
                                                    }
                                                }),
                                                function(e, t) {
                                                    if (!q(e, t)) throw new Error("Can not be rendered by domain: " + t)
                                                }(i, f), mt(d), window.addEventListener("beforeunload", (function() {
                                                    x.fireAndForget()
                                                })), window.addEventListener("unload", (function() {
                                                    x.fireAndForget()
                                                })), V(d, (function() {
                                                    On()
                                                })), R({
                                                    updateProps: j,
                                                    close: On
                                                })
                                        })).then((function() {
                                            return (e = o.width, t = void 0 !== e && e, n = o.height, r = void 0 !== n && n, i = o.element, De(void 0 === i ? "body" : i).catch(pe).then((function(e) {
                                                return {
                                                    width: t,
                                                    height: r,
                                                    element: e
                                                }
                                            }))).then((function(e) {
                                                var t = e.width,
                                                    n = e.height,
                                                    r = e.element;
                                                r && (t || n) && g !== gn.POPUP && Je(r, (function(e) {
                                                    k({
                                                        width: t ? e.width : void 0,
                                                        height: n ? e.height : void 0
                                                    })
                                                }), {
                                                    width: t,
                                                    height: n
                                                })
                                            }));
                                            var e, t, n, r, i
                                        })).catch((function(e) {
                                            _(e)
                                        }))
                                    },
                                    getProps: function() {
                                        return t || (D(v, f), t)
                                    }
                                }
                            }(r);
                            return e.init(), e
                        }
                    }));
                if (h(), t = nn("zoid_allow_delegate_" + o, (function() {
                        return !0
                    })), n = nn("zoid_delegate_" + o, (function(e) {
                        var t = e.data;
                        return {
                            parent: Mn({
                                uid: t.uid,
                                options: r,
                                overrides: t.overrides,
                                parentWin: e.source
                            })
                        }
                    })), In.register(t.cancel), In.register(n.cancel), d.components = d.components || {}, d.components[a]) throw new Error("Can not register multiple components with the same tag: " + a);
                return d.components[a] = !0, {
                    init: function e(t) {
                        var n, d = "zoid-" + a + "-" + se(),
                            l = t || {},
                            h = u({
                                props: l
                            }),
                            w = h.eligible,
                            m = h.reason,
                            g = l.onDestroy;
                        l.onDestroy = function() {
                            if (n && w && f.splice(f.indexOf(n), 1), g) return g.apply(void 0, arguments)
                        };
                        var v = Mn({
                            uid: d,
                            options: r
                        });
                        v.init(), w ? v.setProps(l) : l.onDestroy && l.onDestroy(), kn.register((function(e) {
                            return v.destroy(e || new Error("zoid destroyed all components"))
                        }));
                        var y = function(t) {
                                var n = (void 0 === t ? {} : t).decorate;
                                return e((void 0 === n ? ye : n)(l))
                            },
                            b = function(e, t, r) {
                                return p.try((function() {
                                    if (!w) {
                                        var t = new Error(m || o + " component is not eligible");
                                        return v.destroy(t).then((function() {
                                            throw t
                                        }))
                                    }
                                    if (!G(e)) throw new Error("Must pass window to renderTo");
                                    return function(e, t) {
                                        return p.try((function() {
                                            if (e.window) return an(e.window).getType();
                                            if (t) {
                                                if (t !== gn.IFRAME && t !== gn.POPUP) throw new Error("Unrecognized context: " + t);
                                                return t
                                            }
                                            return s
                                        }))
                                    }(l, r)
                                })).then((function(o) {
                                    if (t = function(e, t) {
                                            if (t) {
                                                if ("string" != typeof t && !Ie(t)) throw new TypeError("Expected string or element selector to be passed");
                                                return t
                                            }
                                            if (e === gn.POPUP) return "body";
                                            throw new Error("Expected element to be passed to render iframe")
                                        }(o, t), e !== window && "string" != typeof t) throw new Error("Must pass string element when rendering to another window");
                                    return v.render({
                                        target: e,
                                        container: t,
                                        context: o,
                                        rerender: function() {
                                            var o = y();
                                            return ve(n, o), o.renderTo(e, t, r)
                                        }
                                    })
                                })).catch((function(e) {
                                    return v.destroy(e).then((function() {
                                        throw e
                                    }))
                                }))
                            };
                        return n = i({}, v.getExports(), v.getHelpers(), function() {
                            for (var e = c(), t = {}, n = function(n, r) {
                                    var o = r[n],
                                        a = e[o];
                                    t[o] = function(e) {
                                        var t = v.getProps(),
                                            n = i({}, e, {
                                                parent: {
                                                    uid: d,
                                                    props: t,
                                                    export: v.export
                                                }
                                            });
                                        return a(n)
                                    }
                                }, r = 0, o = Object.keys(e); r < o.length; r++) n(r, o);
                            return t
                        }(), {
                            isEligible: function() {
                                return w
                            },
                            clone: y,
                            render: function(e, t) {
                                return b(window, e, t)
                            },
                            renderTo: function(e, t, n) {
                                return b(e, t, n)
                            }
                        }), w && f.push(n), n
                    },
                    instances: f,
                    driver: function(e, t) {
                        throw new Error("Driver support not enabled")
                    },
                    isChild: l,
                    canRenderTo: function(e) {
                        return on(e, "zoid_allow_delegate_" + o).then((function(e) {
                            return e.data
                        })).catch((function() {
                            return !1
                        }))
                    },
                    registerChild: h
                }
            }
            var Dn = function(e) {
                ! function() {
                    var e, t, n, r;
                    ot().initialized || (ot().initialized = !0, t = (e = {
                        on: nn,
                        send: on
                    }).on, n = e.send, (r = ot()).receiveMessage = r.receiveMessage || function(e) {
                        return tn(e, {
                            on: t,
                            send: n
                        })
                    }, function(e) {
                        var t = e.on,
                            n = e.send;
                        at().getOrSet("postMessageListener", (function() {
                            return Ye(window, "message", (function(e) {
                                ! function(e, t) {
                                    var n = t.on,
                                        r = t.send;
                                    p.try((function() {
                                        var t = e.source || e.sourceElement,
                                            o = e.origin || e.originalEvent && e.originalEvent.origin,
                                            i = e.data;
                                        if ("null" === o && (o = "file://"), t) {
                                            if (!o) throw new Error("Post message did not have origin domain");
                                            tn({
                                                source: t,
                                                origin: o,
                                                data: i
                                            }, {
                                                on: n,
                                                send: r
                                            })
                                        }
                                    }))
                                }(e, {
                                    on: t,
                                    send: n
                                })
                            }))
                        }))
                    }({
                        on: nn,
                        send: on
                    }), Dt({
                        on: nn,
                        send: on,
                        receiveMessage: tn
                    }), function(e) {
                        var t = e.on,
                            n = e.send;
                        at("builtinListeners").getOrSet("helloListener", (function() {
                            var e = t("postrobot_hello", {
                                    domain: "*"
                                }, (function(e) {
                                    return lt(e.source, {
                                        domain: e.origin
                                    }), {
                                        instanceID: ft()
                                    }
                                })),
                                r = z();
                            return r && ht(r, {
                                send: n
                            }).catch((function(e) {})), e
                        }))
                    }({
                        on: nn,
                        send: on
                    }))
                }();
                var t = Wn(e),
                    n = function(e) {
                        return t.init(e)
                    };
                n.driver = function(e, n) {
                    return t.driver(e, n)
                }, n.isChild = function() {
                    return t.isChild()
                }, n.canRenderTo = function(e) {
                    return t.canRenderTo(e)
                }, n.instances = t.instances;
                var r = t.registerChild();
                return r && (window.xprops = n.xprops = r.getProps()), n
            };

            function jn(e) {
                rn && rn.destroyBridges();
                var t = kn.all(e);
                return kn = Se(), t
            }
            var Bn = jn;

            function zn(e) {
                var t;
                return Bn(), delete window.__zoid_9_0_86__,
                    function() {
                        for (var e = at("responseListeners"), t = 0, n = e.keys(); t < n.length; t++) {
                            var r = n[t],
                                o = e.get(r);
                            o && (o.cancelled = !0), e.del(r)
                        }
                    }(), (t = at().get("postMessageListener")) && t.cancel(), delete window.__post_robot_10_0_44__, In.all(e)
            }
        }])
    }(ae);
    var se = ie(ae.exports);

    function ue({
        doc: e,
        props: t
    }) {
        const n = e.createElement("html"),
            r = e.createElement("body"),
            o = e.createElement("style"),
            i = e.createElement("div");
        return i.classList.add("spinner"), t.cspNonce && o.setAttribute("nonce", t.cspNonce), n.appendChild(r), r.appendChild(i), r.appendChild(o), o.appendChild(e.createTextNode("\n            html, body {\n                width: 100px;\n                height: 100px;\n                overflow:hidden;\n            }\n\n            .spinner {\n                position: fixed;\n                max-height: 60vmin;\n                max-width: 60vmin;\n                height: 40px;\n                width: 40px;\n                top: 50%;\n                left: 50%;\n                box-sizing: border-box;\n                border: 3px solid rgba(0, 0, 0, .2);\n                border-top-color: #FFF;\n                border-radius: 100%;\n                animation: rotation .7s infinite linear;\n            }\n\n            @keyframes rotation {\n                from {\n                    transform: translateX(-50%) translateY(-50%) rotate(0deg);\n                }\n                to {\n                    transform: translateX(-50%) translateY(-50%) rotate(359deg);\n                }\n            }\n        ")), n
    }
    const ce = {
            "Amazon Silk": "amazon_silk",
            "Android Browser": "android",
            Bada: "bada",
            BlackBerry: "blackberry",
            Chrome: "chrome",
            Chromium: "chromium",
            Electron: "electron",
            Epiphany: "epiphany",
            Firefox: "firefox",
            Focus: "focus",
            Generic: "generic",
            "Google Search": "google_search",
            Googlebot: "googlebot",
            "Internet Explorer": "ie",
            "K-Meleon": "k_meleon",
            Maxthon: "maxthon",
            "Microsoft Edge": "edge",
            "MZ Browser": "mz",
            "NAVER Whale Browser": "naver",
            Opera: "opera",
            "Opera Coast": "opera_coast",
            PhantomJS: "phantomjs",
            Puffin: "puffin",
            QupZilla: "qupzilla",
            QQ: "qq",
            QQLite: "qqlite",
            Safari: "safari",
            Sailfish: "sailfish",
            "Samsung Internet for Android": "samsung_internet",
            SeaMonkey: "seamonkey",
            Sleipnir: "sleipnir",
            Swing: "swing",
            Tizen: "tizen",
            "UC Browser": "uc",
            Vivaldi: "vivaldi",
            "WebOS Browser": "webos",
            WeChat: "wechat",
            "Yandex Browser": "yandex",
            Roku: "roku"
        },
        de = {
            amazon_silk: "Amazon Silk",
            android: "Android Browser",
            bada: "Bada",
            blackberry: "BlackBerry",
            chrome: "Chrome",
            chromium: "Chromium",
            electron: "Electron",
            epiphany: "Epiphany",
            firefox: "Firefox",
            focus: "Focus",
            generic: "Generic",
            googlebot: "Googlebot",
            google_search: "Google Search",
            ie: "Internet Explorer",
            k_meleon: "K-Meleon",
            maxthon: "Maxthon",
            edge: "Microsoft Edge",
            mz: "MZ Browser",
            naver: "NAVER Whale Browser",
            opera: "Opera",
            opera_coast: "Opera Coast",
            phantomjs: "PhantomJS",
            puffin: "Puffin",
            qupzilla: "QupZilla",
            qq: "QQ Browser",
            qqlite: "QQ Browser Lite",
            safari: "Safari",
            sailfish: "Sailfish",
            samsung_internet: "Samsung Internet for Android",
            seamonkey: "SeaMonkey",
            sleipnir: "Sleipnir",
            swing: "Swing",
            tizen: "Tizen",
            uc: "UC Browser",
            vivaldi: "Vivaldi",
            webos: "WebOS Browser",
            wechat: "WeChat",
            yandex: "Yandex Browser"
        },
        fe = {
            tablet: "tablet",
            mobile: "mobile",
            desktop: "desktop",
            tv: "tv"
        },
        le = {
            WindowsPhone: "Windows Phone",
            Windows: "Windows",
            MacOS: "macOS",
            iOS: "iOS",
            Android: "Android",
            WebOS: "WebOS",
            BlackBerry: "BlackBerry",
            Bada: "Bada",
            Tizen: "Tizen",
            Linux: "Linux",
            ChromeOS: "Chrome OS",
            PlayStation4: "PlayStation 4",
            Roku: "Roku"
        },
        he = {
            EdgeHTML: "EdgeHTML",
            Blink: "Blink",
            Trident: "Trident",
            Presto: "Presto",
            Gecko: "Gecko",
            WebKit: "WebKit"
        };
    class pe {
        static getFirstMatch(e, t) {
            const n = t.match(e);
            return n && n.length > 0 && n[1] || ""
        }
        static getSecondMatch(e, t) {
            const n = t.match(e);
            return n && n.length > 1 && n[2] || ""
        }
        static matchAndReturnConst(e, t, n) {
            if (e.test(t)) return n
        }
        static getWindowsVersionName(e) {
            switch (e) {
                case "NT":
                    return "NT";
                case "XP":
                case "NT 5.1":
                    return "XP";
                case "NT 5.0":
                    return "2000";
                case "NT 5.2":
                    return "2003";
                case "NT 6.0":
                    return "Vista";
                case "NT 6.1":
                    return "7";
                case "NT 6.2":
                    return "8";
                case "NT 6.3":
                    return "8.1";
                case "NT 10.0":
                    return "10";
                default:
                    return
            }
        }
        static getMacOSVersionName(e) {
            const t = e.split(".").splice(0, 2).map((e => parseInt(e, 10) || 0));
            if (t.push(0), 10 === t[0]) switch (t[1]) {
                case 5:
                    return "Leopard";
                case 6:
                    return "Snow Leopard";
                case 7:
                    return "Lion";
                case 8:
                    return "Mountain Lion";
                case 9:
                    return "Mavericks";
                case 10:
                    return "Yosemite";
                case 11:
                    return "El Capitan";
                case 12:
                    return "Sierra";
                case 13:
                    return "High Sierra";
                case 14:
                    return "Mojave";
                case 15:
                    return "Catalina";
                default:
                    return
            }
        }
        static getAndroidVersionName(e) {
            const t = e.split(".").splice(0, 2).map((e => parseInt(e, 10) || 0));
            if (t.push(0), !(1 === t[0] && t[1] < 5)) return 1 === t[0] && t[1] < 6 ? "Cupcake" : 1 === t[0] && t[1] >= 6 ? "Donut" : 2 === t[0] && t[1] < 2 ? "Eclair" : 2 === t[0] && 2 === t[1] ? "Froyo" : 2 === t[0] && t[1] > 2 ? "Gingerbread" : 3 === t[0] ? "Honeycomb" : 4 === t[0] && t[1] < 1 ? "Ice Cream Sandwich" : 4 === t[0] && t[1] < 4 ? "Jelly Bean" : 4 === t[0] && t[1] >= 4 ? "KitKat" : 5 === t[0] ? "Lollipop" : 6 === t[0] ? "Marshmallow" : 7 === t[0] ? "Nougat" : 8 === t[0] ? "Oreo" : 9 === t[0] ? "Pie" : void 0
        }
        static getVersionPrecision(e) {
            return e.split(".").length
        }
        static compareVersions(e, t, n = !1) {
            const r = pe.getVersionPrecision(e),
                o = pe.getVersionPrecision(t);
            let i = Math.max(r, o),
                a = 0;
            const s = pe.map([e, t], (e => {
                const t = i - pe.getVersionPrecision(e),
                    n = e + new Array(t + 1).join(".0");
                return pe.map(n.split("."), (e => new Array(20 - e.length).join("0") + e)).reverse()
            }));
            for (n && (a = i - Math.min(r, o)), i -= 1; i >= a;) {
                if (s[0][i] > s[1][i]) return 1;
                if (s[0][i] === s[1][i]) {
                    if (i === a) return 0;
                    i -= 1
                } else if (s[0][i] < s[1][i]) return -1
            }
        }
        static map(e, t) {
            const n = [];
            let r;
            if (Array.prototype.map) return Array.prototype.map.call(e, t);
            for (r = 0; r < e.length; r += 1) n.push(t(e[r]));
            return n
        }
        static find(e, t) {
            let n, r;
            if (Array.prototype.find) return Array.prototype.find.call(e, t);
            for (n = 0, r = e.length; n < r; n += 1) {
                const r = e[n];
                if (t(r, n)) return r
            }
        }
        static assign(e, ...t) {
            const n = e;
            let r, o;
            if (Object.assign) return Object.assign(e, ...t);
            for (r = 0, o = t.length; r < o; r += 1) {
                const e = t[r];
                if ("object" == typeof e && null !== e) {
                    Object.keys(e).forEach((t => {
                        n[t] = e[t]
                    }))
                }
            }
            return e
        }
        static getBrowserAlias(e) {
            return ce[e]
        }
        static getBrowserTypeByAlias(e) {
            return de[e] || ""
        }
    }
    const we = /version\/(\d+(\.?_?\d+)+)/i,
        me = [{
            test: [/googlebot/i],
            describe(e) {
                const t = {
                        name: "Googlebot"
                    },
                    n = pe.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/opera/i],
            describe(e) {
                const t = {
                        name: "Opera"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/opr\/|opios/i],
            describe(e) {
                const t = {
                        name: "Opera"
                    },
                    n = pe.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/SamsungBrowser/i],
            describe(e) {
                const t = {
                        name: "Samsung Internet for Android"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/Whale/i],
            describe(e) {
                const t = {
                        name: "NAVER Whale Browser"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/MZBrowser/i],
            describe(e) {
                const t = {
                        name: "MZ Browser"
                    },
                    n = pe.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/focus/i],
            describe(e) {
                const t = {
                        name: "Focus"
                    },
                    n = pe.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/swing/i],
            describe(e) {
                const t = {
                        name: "Swing"
                    },
                    n = pe.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/coast/i],
            describe(e) {
                const t = {
                        name: "Opera Coast"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/opt\/\d+(?:.?_?\d+)+/i],
            describe(e) {
                const t = {
                        name: "Opera Touch"
                    },
                    n = pe.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/yabrowser/i],
            describe(e) {
                const t = {
                        name: "Yandex Browser"
                    },
                    n = pe.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/ucbrowser/i],
            describe(e) {
                const t = {
                        name: "UC Browser"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/Maxthon|mxios/i],
            describe(e) {
                const t = {
                        name: "Maxthon"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/epiphany/i],
            describe(e) {
                const t = {
                        name: "Epiphany"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/puffin/i],
            describe(e) {
                const t = {
                        name: "Puffin"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/sleipnir/i],
            describe(e) {
                const t = {
                        name: "Sleipnir"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/k-meleon/i],
            describe(e) {
                const t = {
                        name: "K-Meleon"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/micromessenger/i],
            describe(e) {
                const t = {
                        name: "WeChat"
                    },
                    n = pe.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/qqbrowser/i],
            describe(e) {
                const t = {
                        name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
                    },
                    n = pe.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/msie|trident/i],
            describe(e) {
                const t = {
                        name: "Internet Explorer"
                    },
                    n = pe.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/\sedg\//i],
            describe(e) {
                const t = {
                        name: "Microsoft Edge"
                    },
                    n = pe.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/edg([ea]|ios)/i],
            describe(e) {
                const t = {
                        name: "Microsoft Edge"
                    },
                    n = pe.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/vivaldi/i],
            describe(e) {
                const t = {
                        name: "Vivaldi"
                    },
                    n = pe.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/seamonkey/i],
            describe(e) {
                const t = {
                        name: "SeaMonkey"
                    },
                    n = pe.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/sailfish/i],
            describe(e) {
                const t = {
                        name: "Sailfish"
                    },
                    n = pe.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/silk/i],
            describe(e) {
                const t = {
                        name: "Amazon Silk"
                    },
                    n = pe.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/phantom/i],
            describe(e) {
                const t = {
                        name: "PhantomJS"
                    },
                    n = pe.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/slimerjs/i],
            describe(e) {
                const t = {
                        name: "SlimerJS"
                    },
                    n = pe.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
            describe(e) {
                const t = {
                        name: "BlackBerry"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/(web|hpw)[o0]s/i],
            describe(e) {
                const t = {
                        name: "WebOS Browser"
                    },
                    n = pe.getFirstMatch(we, e) || pe.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/bada/i],
            describe(e) {
                const t = {
                        name: "Bada"
                    },
                    n = pe.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/tizen/i],
            describe(e) {
                const t = {
                        name: "Tizen"
                    },
                    n = pe.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/qupzilla/i],
            describe(e) {
                const t = {
                        name: "QupZilla"
                    },
                    n = pe.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/firefox|iceweasel|fxios/i],
            describe(e) {
                const t = {
                        name: "Firefox"
                    },
                    n = pe.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/electron/i],
            describe(e) {
                const t = {
                        name: "Electron"
                    },
                    n = pe.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/MiuiBrowser/i],
            describe(e) {
                const t = {
                        name: "Miui"
                    },
                    n = pe.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/chromium/i],
            describe(e) {
                const t = {
                        name: "Chromium"
                    },
                    n = pe.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/chrome|crios|crmo/i],
            describe(e) {
                const t = {
                        name: "Chrome"
                    },
                    n = pe.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/GSA/i],
            describe(e) {
                const t = {
                        name: "Google Search"
                    },
                    n = pe.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test(e) {
                const t = !e.test(/like android/i),
                    n = e.test(/android/i);
                return t && n
            },
            describe(e) {
                const t = {
                        name: "Android Browser"
                    },
                    n = pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/playstation 4/i],
            describe(e) {
                const t = {
                        name: "PlayStation 4"
                    },
                    n = pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/safari|applewebkit/i],
            describe(e) {
                const t = {
                        name: "Safari"
                    },
                    n = pe.getFirstMatch(we, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/.*/i],
            describe(e) {
                const t = -1 !== e.search("\\(") ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
                return {
                    name: pe.getFirstMatch(t, e),
                    version: pe.getSecondMatch(t, e)
                }
            }
        }];
    var ge = [{
            test: [/Roku\/DVP/],
            describe(e) {
                const t = pe.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
                return {
                    name: le.Roku,
                    version: t
                }
            }
        }, {
            test: [/windows phone/i],
            describe(e) {
                const t = pe.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
                return {
                    name: le.WindowsPhone,
                    version: t
                }
            }
        }, {
            test: [/windows /i],
            describe(e) {
                const t = pe.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e),
                    n = pe.getWindowsVersionName(t);
                return {
                    name: le.Windows,
                    version: t,
                    versionName: n
                }
            }
        }, {
            test: [/Macintosh(.*?) FxiOS(.*?)\//],
            describe(e) {
                const t = {
                        name: le.iOS
                    },
                    n = pe.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/macintosh/i],
            describe(e) {
                const t = pe.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."),
                    n = pe.getMacOSVersionName(t),
                    r = {
                        name: le.MacOS,
                        version: t
                    };
                return n && (r.versionName = n), r
            }
        }, {
            test: [/(ipod|iphone|ipad)/i],
            describe(e) {
                const t = pe.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
                return {
                    name: le.iOS,
                    version: t
                }
            }
        }, {
            test(e) {
                const t = !e.test(/like android/i),
                    n = e.test(/android/i);
                return t && n
            },
            describe(e) {
                const t = pe.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e),
                    n = pe.getAndroidVersionName(t),
                    r = {
                        name: le.Android,
                        version: t
                    };
                return n && (r.versionName = n), r
            }
        }, {
            test: [/(web|hpw)[o0]s/i],
            describe(e) {
                const t = pe.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e),
                    n = {
                        name: le.WebOS
                    };
                return t && t.length && (n.version = t), n
            }
        }, {
            test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
            describe(e) {
                const t = pe.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || pe.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || pe.getFirstMatch(/\bbb(\d+)/i, e);
                return {
                    name: le.BlackBerry,
                    version: t
                }
            }
        }, {
            test: [/bada/i],
            describe(e) {
                const t = pe.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
                return {
                    name: le.Bada,
                    version: t
                }
            }
        }, {
            test: [/tizen/i],
            describe(e) {
                const t = pe.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
                return {
                    name: le.Tizen,
                    version: t
                }
            }
        }, {
            test: [/linux/i],
            describe: () => ({
                name: le.Linux
            })
        }, {
            test: [/CrOS/],
            describe: () => ({
                name: le.ChromeOS
            })
        }, {
            test: [/PlayStation 4/],
            describe(e) {
                const t = pe.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
                return {
                    name: le.PlayStation4,
                    version: t
                }
            }
        }],
        ve = [{
            test: [/googlebot/i],
            describe: () => ({
                type: "bot",
                vendor: "Google"
            })
        }, {
            test: [/huawei/i],
            describe(e) {
                const t = pe.getFirstMatch(/(can-l01)/i, e) && "Nova",
                    n = {
                        type: fe.mobile,
                        vendor: "Huawei"
                    };
                return t && (n.model = t), n
            }
        }, {
            test: [/nexus\s*(?:7|8|9|10).*/i],
            describe: () => ({
                type: fe.tablet,
                vendor: "Nexus"
            })
        }, {
            test: [/ipad/i],
            describe: () => ({
                type: fe.tablet,
                vendor: "Apple",
                model: "iPad"
            })
        }, {
            test: [/Macintosh(.*?) FxiOS(.*?)\//],
            describe: () => ({
                type: fe.tablet,
                vendor: "Apple",
                model: "iPad"
            })
        }, {
            test: [/kftt build/i],
            describe: () => ({
                type: fe.tablet,
                vendor: "Amazon",
                model: "Kindle Fire HD 7"
            })
        }, {
            test: [/silk/i],
            describe: () => ({
                type: fe.tablet,
                vendor: "Amazon"
            })
        }, {
            test: [/tablet(?! pc)/i],
            describe: () => ({
                type: fe.tablet
            })
        }, {
            test(e) {
                const t = e.test(/ipod|iphone/i),
                    n = e.test(/like (ipod|iphone)/i);
                return t && !n
            },
            describe(e) {
                const t = pe.getFirstMatch(/(ipod|iphone)/i, e);
                return {
                    type: fe.mobile,
                    vendor: "Apple",
                    model: t
                }
            }
        }, {
            test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
            describe: () => ({
                type: fe.mobile,
                vendor: "Nexus"
            })
        }, {
            test: [/[^-]mobi/i],
            describe: () => ({
                type: fe.mobile
            })
        }, {
            test: e => "blackberry" === e.getBrowserName(!0),
            describe: () => ({
                type: fe.mobile,
                vendor: "BlackBerry"
            })
        }, {
            test: e => "bada" === e.getBrowserName(!0),
            describe: () => ({
                type: fe.mobile
            })
        }, {
            test: e => "windows phone" === e.getBrowserName(),
            describe: () => ({
                type: fe.mobile,
                vendor: "Microsoft"
            })
        }, {
            test(e) {
                const t = Number(String(e.getOSVersion()).split(".")[0]);
                return "android" === e.getOSName(!0) && t >= 3
            },
            describe: () => ({
                type: fe.tablet
            })
        }, {
            test: e => "android" === e.getOSName(!0),
            describe: () => ({
                type: fe.mobile
            })
        }, {
            test: e => "macos" === e.getOSName(!0),
            describe: () => ({
                type: fe.desktop,
                vendor: "Apple"
            })
        }, {
            test: e => "windows" === e.getOSName(!0),
            describe: () => ({
                type: fe.desktop
            })
        }, {
            test: e => "linux" === e.getOSName(!0),
            describe: () => ({
                type: fe.desktop
            })
        }, {
            test: e => "playstation 4" === e.getOSName(!0),
            describe: () => ({
                type: fe.tv
            })
        }, {
            test: e => "roku" === e.getOSName(!0),
            describe: () => ({
                type: fe.tv
            })
        }],
        ye = [{
            test: e => "microsoft edge" === e.getBrowserName(!0),
            describe(e) {
                if (/\sedg\//i.test(e)) return {
                    name: he.Blink
                };
                const t = pe.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
                return {
                    name: he.EdgeHTML,
                    version: t
                }
            }
        }, {
            test: [/trident/i],
            describe(e) {
                const t = {
                        name: he.Trident
                    },
                    n = pe.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: e => e.test(/presto/i),
            describe(e) {
                const t = {
                        name: he.Presto
                    },
                    n = pe.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test(e) {
                const t = e.test(/gecko/i),
                    n = e.test(/like gecko/i);
                return t && !n
            },
            describe(e) {
                const t = {
                        name: he.Gecko
                    },
                    n = pe.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }, {
            test: [/(apple)?webkit\/537\.36/i],
            describe: () => ({
                name: he.Blink
            })
        }, {
            test: [/(apple)?webkit/i],
            describe(e) {
                const t = {
                        name: he.WebKit
                    },
                    n = pe.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
                return n && (t.version = n), t
            }
        }];
    class be {
        constructor(e, t = !1) {
            if (null == e || "" === e) throw new Error("UserAgent parameter can't be empty");
            this._ua = e, this.parsedResult = {}, !0 !== t && this.parse()
        }
        getUA() {
            return this._ua
        }
        test(e) {
            return e.test(this._ua)
        }
        parseBrowser() {
            this.parsedResult.browser = {};
            const e = pe.find(me, (e => {
                if ("function" == typeof e.test) return e.test(this);
                if (e.test instanceof Array) return e.test.some((e => this.test(e)));
                throw new Error("Browser's test function is not valid")
            }));
            return e && (this.parsedResult.browser = e.describe(this.getUA())), this.parsedResult.browser
        }
        getBrowser() {
            return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser()
        }
        getBrowserName(e) {
            return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || ""
        }
        getBrowserVersion() {
            return this.getBrowser().version
        }
        getOS() {
            return this.parsedResult.os ? this.parsedResult.os : this.parseOS()
        }
        parseOS() {
            this.parsedResult.os = {};
            const e = pe.find(ge, (e => {
                if ("function" == typeof e.test) return e.test(this);
                if (e.test instanceof Array) return e.test.some((e => this.test(e)));
                throw new Error("Browser's test function is not valid")
            }));
            return e && (this.parsedResult.os = e.describe(this.getUA())), this.parsedResult.os
        }
        getOSName(e) {
            const {
                name: t
            } = this.getOS();
            return e ? String(t).toLowerCase() || "" : t || ""
        }
        getOSVersion() {
            return this.getOS().version
        }
        getPlatform() {
            return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform()
        }
        getPlatformType(e = !1) {
            const {
                type: t
            } = this.getPlatform();
            return e ? String(t).toLowerCase() || "" : t || ""
        }
        parsePlatform() {
            this.parsedResult.platform = {};
            const e = pe.find(ve, (e => {
                if ("function" == typeof e.test) return e.test(this);
                if (e.test instanceof Array) return e.test.some((e => this.test(e)));
                throw new Error("Browser's test function is not valid")
            }));
            return e && (this.parsedResult.platform = e.describe(this.getUA())), this.parsedResult.platform
        }
        getEngine() {
            return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine()
        }
        getEngineName(e) {
            return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || ""
        }
        parseEngine() {
            this.parsedResult.engine = {};
            const e = pe.find(ye, (e => {
                if ("function" == typeof e.test) return e.test(this);
                if (e.test instanceof Array) return e.test.some((e => this.test(e)));
                throw new Error("Browser's test function is not valid")
            }));
            return e && (this.parsedResult.engine = e.describe(this.getUA())), this.parsedResult.engine
        }
        parse() {
            return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this
        }
        getResult() {
            return pe.assign({}, this.parsedResult)
        }
        satisfies(e) {
            const t = {};
            let n = 0;
            const r = {};
            let o = 0;
            if (Object.keys(e).forEach((i => {
                    const a = e[i];
                    "string" == typeof a ? (r[i] = a, o += 1) : "object" == typeof a && (t[i] = a, n += 1)
                })), n > 0) {
                const e = Object.keys(t),
                    n = pe.find(e, (e => this.isOS(e)));
                if (n) {
                    const e = this.satisfies(t[n]);
                    if (void 0 !== e) return e
                }
                const r = pe.find(e, (e => this.isPlatform(e)));
                if (r) {
                    const e = this.satisfies(t[r]);
                    if (void 0 !== e) return e
                }
            }
            if (o > 0) {
                const e = Object.keys(r),
                    t = pe.find(e, (e => this.isBrowser(e, !0)));
                if (void 0 !== t) return this.compareVersion(r[t])
            }
        }
        isBrowser(e, t = !1) {
            const n = this.getBrowserName().toLowerCase();
            let r = e.toLowerCase();
            const o = pe.getBrowserTypeByAlias(r);
            return t && o && (r = o.toLowerCase()), r === n
        }
        compareVersion(e) {
            let t = [0],
                n = e,
                r = !1;
            const o = this.getBrowserVersion();
            if ("string" == typeof o) return ">" === e[0] || "<" === e[0] ? (n = e.substr(1), "=" === e[1] ? (r = !0, n = e.substr(2)) : t = [], ">" === e[0] ? t.push(1) : t.push(-1)) : "=" === e[0] ? n = e.substr(1) : "~" === e[0] && (r = !0, n = e.substr(1)), t.indexOf(pe.compareVersions(o, n, r)) > -1
        }
        isOS(e) {
            return this.getOSName(!0) === String(e).toLowerCase()
        }
        isPlatform(e) {
            return this.getPlatformType(!0) === String(e).toLowerCase()
        }
        isEngine(e) {
            return this.getEngineName(!0) === String(e).toLowerCase()
        }
        is(e, t = !1) {
            return this.isBrowser(e, t) || this.isOS(e) || this.isPlatform(e)
        }
        some(e = []) {
            return e.some((e => this.is(e)))
        }
    }
    /*!
     * Bowser - a browser detector
     * https://github.com/lancedikson/bowser
     * MIT License | (c) Dustin Diaz 2012-2015
     * MIT License | (c) Denis Demchenko 2015-2019
     */
    class Ee {
        static getParser(e, t = !1) {
            if ("string" != typeof e) throw new Error("UserAgent should be a string");
            return new be(e, t)
        }
        static parse(e) {
            return new be(e).getResult()
        }
        static get BROWSER_MAP() {
            return de
        }
        static get ENGINE_MAP() {
            return he
        }
        static get OS_MAP() {
            return le
        }
        static get PLATFORMS_MAP() {
            return fe
        }
    }
    const _e = new class {
        constructor() {
            this.emitter = a(), this.component = null, this.zoid = null, this.lightbox = null, this.colors = [], this.theme = "light", this.endpoint = "https://pay.tebex.io", this.ident = null, this.componentContainerId = "tebex-js-checkout-container"
        }
        render(e, t, n, r = !0) {
            this.component || this.#e(t, n), this.#t(r && this.#n(), e)
        }
        launch() {
            this.component || this.#e(), this.#n() ? this.#t(!0) : (this.lightbox || this.#r(), this.#o())
        }

        closePopup() {
            if (this.zoid && this.zoid.close) {
                this.zoid.close().then(() => {
                    console.log('Mobile popup closed successfully');
                    this.lightbox && this.lightbox.close()
                }).catch(err => {
                    console.error('Failed to close the mobile popup:', err);
                });
            } else {
                console.log('No mobile popup instance available to close');
            }
        }
        
        #e(e = "800px", t = "760px") {
            this.component = se.create({
                tag: "tebex-js-checkout-component",
                url: () => this.endpoint + "/" + this.ident,
                autoResize: {
                    width: !1,
                    height: !1
                },
                dimensions: {
                    width: "800px",
                    height: "760px"
                },
                prerenderTemplate: ue,
                attributes: {
                    iframe: {
                        allow: "payment https://pay.tebex.io"
                    }
                }
            })
        }
        #r() {
            let e = document.createElement("div");
            e.id = this.componentContainerId, this.lightbox = i(e.outerHTML, {
                closable: !1,
                onClose: () => {
                    this.emitter.emit(t.CLOSE)
                }
            })
        }
        #o() {
            this.lightbox.show((() => {
                this.emitter.emit(t.OPEN), this.#t(!1)
            }))
        }
        #t(e, n = document.getElementById(this.componentContainerId)) {
            const r = new URL(window.location.href);
            this.zoid = this.component({
                colors: this.colors,
                theme: this.theme,
                onOpenWindow: e => {
                    window.open(e)
                },
                onClosePopup: () => {
                    this.zoid.close().then((() => {
                        this.lightbox && this.lightbox.close()
                    }))
                },
                onPaymentComplete: e => {
                    this.emitter.emit(t.PAYMENT_COMPLETE, e)
                },
                onPaymentError: e => {
                    this.emitter.emit(t.PAYMENT_ERROR, e)
                },
                isApplePayAvailable: this.#i(),
                isEmbedded: !e,
                referrer: r.hostname,
                path: r.pathname,
                version: "1.0.0"
            }), this.zoid.render(n, e ? "popup" : "iframe")
        }
        #n() {
            return "desktop" !== Ee.getParser(window.navigator.userAgent).getPlatformType()
        }
        #i() {
            return window.ApplePaySession && ApplePaySession.canMakePayments()
        }
        on(e, t) {
            return this.emitter.on(e, t)
        }
        init(e) {
            this.colors = e.colors ?? [], this.theme = e.theme ?? "light", this.ident = e.ident, e.endpoint && (this.endpoint = e.endpoint)
        }
    };
    e.checkout = _e, e.events = t
}));