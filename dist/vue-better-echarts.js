import { shallowRef as Jo, ref as se, onMounted as Ne, onUnmounted as ot, watch as Re, computed as F, inject as ft, provide as wt, toValue as Ye, defineComponent as he, openBlock as fe, createElementBlock as Ze, createElementVNode as Ra, normalizeStyle as Na, renderSlot as pt, reactive as ko, unref as ee, normalizeClass as ja, createStaticVNode as So, createCommentVNode as Et, createBlock as we, withCtx as Ce, createVNode as Ae, useCssVars as Ko } from "vue";
import * as Te from "echarts";
var Ga = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ao(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Qo = { exports: {} };
(function(t) {
  var o = {}, e = function(n) {
    n.version = "0.11.2";
    function r(w) {
      for (var x = "", A = w.length - 1; A >= 0; ) x += w.charAt(A--);
      return x;
    }
    function l(w, x) {
      for (var A = ""; A.length < x; ) A += w;
      return A;
    }
    function i(w, x) {
      var A = "" + w;
      return A.length >= x ? A : l("0", x - A.length) + A;
    }
    function s(w, x) {
      var A = "" + w;
      return A.length >= x ? A : l(" ", x - A.length) + A;
    }
    function c(w, x) {
      var A = "" + w;
      return A.length >= x ? A : A + l(" ", x - A.length);
    }
    function p(w, x) {
      var A = "" + Math.round(w);
      return A.length >= x ? A : l("0", x - A.length) + A;
    }
    function h(w, x) {
      var A = "" + w;
      return A.length >= x ? A : l("0", x - A.length) + A;
    }
    var f = Math.pow(2, 32);
    function d(w, x) {
      if (w > f || w < -f) return p(w, x);
      var A = Math.round(w);
      return h(A, x);
    }
    function u(w, x) {
      return x = x || 0, w.length >= 7 + x && (w.charCodeAt(x) | 32) === 103 && (w.charCodeAt(x + 1) | 32) === 101 && (w.charCodeAt(x + 2) | 32) === 110 && (w.charCodeAt(x + 3) | 32) === 101 && (w.charCodeAt(x + 4) | 32) === 114 && (w.charCodeAt(x + 5) | 32) === 97 && (w.charCodeAt(x + 6) | 32) === 108;
    }
    var m = [
      ["Sun", "Sunday"],
      ["Mon", "Monday"],
      ["Tue", "Tuesday"],
      ["Wed", "Wednesday"],
      ["Thu", "Thursday"],
      ["Fri", "Friday"],
      ["Sat", "Saturday"]
    ], C = [
      ["J", "Jan", "January"],
      ["F", "Feb", "February"],
      ["M", "Mar", "March"],
      ["A", "Apr", "April"],
      ["M", "May", "May"],
      ["J", "Jun", "June"],
      ["J", "Jul", "July"],
      ["A", "Aug", "August"],
      ["S", "Sep", "September"],
      ["O", "Oct", "October"],
      ["N", "Nov", "November"],
      ["D", "Dec", "December"]
    ];
    function g(w) {
      w[0] = "General", w[1] = "0", w[2] = "0.00", w[3] = "#,##0", w[4] = "#,##0.00", w[9] = "0%", w[10] = "0.00%", w[11] = "0.00E+00", w[12] = "# ?/?", w[13] = "# ??/??", w[14] = "m/d/yy", w[15] = "d-mmm-yy", w[16] = "d-mmm", w[17] = "mmm-yy", w[18] = "h:mm AM/PM", w[19] = "h:mm:ss AM/PM", w[20] = "h:mm", w[21] = "h:mm:ss", w[22] = "m/d/yy h:mm", w[37] = "#,##0 ;(#,##0)", w[38] = "#,##0 ;[Red](#,##0)", w[39] = "#,##0.00;(#,##0.00)", w[40] = "#,##0.00;[Red](#,##0.00)", w[45] = "mm:ss", w[46] = "[h]:mm:ss", w[47] = "mmss.0", w[48] = "##0.0E+0", w[49] = "@", w[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "';
    }
    var y = {};
    g(y);
    var O = [], M = 0;
    for (M = 5; M <= 8; ++M) O[M] = 32 + M;
    for (M = 23; M <= 26; ++M) O[M] = 0;
    for (M = 27; M <= 31; ++M) O[M] = 14;
    for (M = 50; M <= 58; ++M) O[M] = 14;
    for (M = 59; M <= 62; ++M) O[M] = M - 58;
    for (M = 67; M <= 68; ++M) O[M] = M - 58;
    for (M = 72; M <= 75; ++M) O[M] = M - 58;
    for (M = 67; M <= 68; ++M) O[M] = M - 57;
    for (M = 76; M <= 78; ++M) O[M] = M - 56;
    for (M = 79; M <= 81; ++M) O[M] = M - 34;
    var z = [];
    z[5] = z[63] = '"$"#,##0_);\\("$"#,##0\\)', z[6] = z[64] = '"$"#,##0_);[Red]\\("$"#,##0\\)', z[7] = z[65] = '"$"#,##0.00_);\\("$"#,##0.00\\)', z[8] = z[66] = '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)', z[41] = '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)', z[42] = '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)', z[43] = '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)', z[44] = '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)';
    function I(w, x, A) {
      for (var H = w < 0 ? -1 : 1, S = w * H, U = 0, B = 1, j = 0, K = 1, G = 0, Q = 0, ne = Math.floor(S); G < x && (ne = Math.floor(S), j = ne * B + U, Q = ne * G + K, !(S - ne < 5e-8)); )
        S = 1 / (S - ne), U = B, B = j, K = G, G = Q;
      if (Q > x && (G > x ? (Q = K, j = U) : (Q = G, j = B)), !A) return [0, H * j, Q];
      var $e = Math.floor(H * j / Q);
      return [$e, H * j - $e * Q, Q];
    }
    function v(w, x, A) {
      if (w > 2958465 || w < 0) return null;
      var H = w | 0, S = Math.floor(86400 * (w - H)), U = 0, B = [], j = { D: H, T: S, u: 86400 * (w - H) - S, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
      if (Math.abs(j.u) < 1e-6 && (j.u = 0), x && x.date1904 && (H += 1462), j.u > 0.9999 && (j.u = 0, ++S == 86400 && (j.T = S = 0, ++H, ++j.D)), H === 60)
        B = A ? [1317, 10, 29] : [1900, 2, 29], U = 3;
      else if (H === 0)
        B = A ? [1317, 8, 29] : [1900, 1, 0], U = 6;
      else {
        H > 60 && --H;
        var K = new Date(1900, 0, 1);
        K.setDate(K.getDate() + H - 1), B = [K.getFullYear(), K.getMonth() + 1, K.getDate()], U = K.getDay(), H < 60 && (U = (U + 6) % 7), A && (U = le(K, B));
      }
      return j.y = B[0], j.m = B[1], j.d = B[2], j.S = S % 60, S = Math.floor(S / 60), j.M = S % 60, S = Math.floor(S / 60), j.H = S, j.q = U, j;
    }
    n.parse_date_code = v;
    var L = new Date(1899, 11, 31, 0, 0, 0), T = L.getTime(), b = new Date(1900, 2, 1, 0, 0, 0);
    function $(w, x) {
      var A = w.getTime();
      return x ? A -= 1262304e5 : w >= b && (A += 864e5), (A - (T + (w.getTimezoneOffset() - L.getTimezoneOffset()) * 6e4)) / 864e5;
    }
    function D(w) {
      return w.toString(10);
    }
    n._general_int = D;
    var V = /* @__PURE__ */ function() {
      var x = /(?:\.0*|(\.\d*[1-9])0+)$/;
      function A(G) {
        return G.indexOf(".") == -1 ? G : G.replace(x, "$1");
      }
      var H = /(?:\.0*|(\.\d*[1-9])0+)[Ee]/, S = /(E[+-])(\d)$/;
      function U(G) {
        return G.indexOf("E") == -1 ? G : G.replace(H, "$1E").replace(S, "$10$2");
      }
      function B(G) {
        var Q = G < 0 ? 12 : 11, ne = A(G.toFixed(12));
        return ne.length <= Q || (ne = G.toPrecision(10), ne.length <= Q) ? ne : G.toExponential(5);
      }
      function j(G) {
        var Q = A(G.toFixed(11));
        return Q.length > (G < 0 ? 12 : 11) || Q === "0" || Q === "-0" ? G.toPrecision(6) : Q;
      }
      function K(G) {
        var Q = Math.floor(Math.log(Math.abs(G)) * Math.LOG10E), ne;
        return Q >= -4 && Q <= -1 ? ne = G.toPrecision(10 + Q) : Math.abs(Q) <= 9 ? ne = B(G) : Q === 10 ? ne = G.toFixed(10).substr(0, 12) : ne = j(G), A(U(ne.toUpperCase()));
      }
      return K;
    }();
    n._general_num = V;
    function W(w, x) {
      switch (typeof w) {
        case "string":
          return w;
        case "boolean":
          return w ? "TRUE" : "FALSE";
        case "number":
          return (w | 0) === w ? w.toString(10) : V(w);
        case "undefined":
          return "";
        case "object":
          if (w == null) return "";
          if (w instanceof Date) return Co(14, $(w, x && x.date1904), x);
      }
      throw new Error("unsupported value in General format: " + w);
    }
    n._general = W;
    function le(w, x) {
      x[0] -= 581;
      var A = w.getDay();
      return w < 60 && (A = (A + 6) % 7), A;
    }
    function ve(w, x, A, H) {
      var S = "", U = 0, B = 0, j = A.y, K, G = 0;
      switch (w) {
        case 98:
          j = A.y + 543;
        case 121:
          switch (x.length) {
            case 1:
            case 2:
              K = j % 100, G = 2;
              break;
            default:
              K = j % 1e4, G = 4;
              break;
          }
          break;
        case 109:
          switch (x.length) {
            case 1:
            case 2:
              K = A.m, G = x.length;
              break;
            case 3:
              return C[A.m - 1][1];
            case 5:
              return C[A.m - 1][0];
            default:
              return C[A.m - 1][2];
          }
          break;
        case 100:
          switch (x.length) {
            case 1:
            case 2:
              K = A.d, G = x.length;
              break;
            case 3:
              return m[A.q][0];
            default:
              return m[A.q][1];
          }
          break;
        case 104:
          switch (x.length) {
            case 1:
            case 2:
              K = 1 + (A.H + 11) % 12, G = x.length;
              break;
            default:
              throw "bad hour format: " + x;
          }
          break;
        case 72:
          switch (x.length) {
            case 1:
            case 2:
              K = A.H, G = x.length;
              break;
            default:
              throw "bad hour format: " + x;
          }
          break;
        case 77:
          switch (x.length) {
            case 1:
            case 2:
              K = A.M, G = x.length;
              break;
            default:
              throw "bad minute format: " + x;
          }
          break;
        case 115:
          if (x != "s" && x != "ss" && x != ".0" && x != ".00" && x != ".000") throw "bad second format: " + x;
          return A.u === 0 && (x == "s" || x == "ss") ? i(A.S, x.length) : (H >= 2 ? B = H === 3 ? 1e3 : 100 : B = H === 1 ? 10 : 1, U = Math.round(B * (A.S + A.u)), U >= 60 * B && (U = 0), x === "s" ? U === 0 ? "0" : "" + U / B : (S = i(U, 2 + H), x === "ss" ? S.substr(0, 2) : "." + S.substr(2, x.length - 1)));
        case 90:
          switch (x) {
            case "[h]":
            case "[hh]":
              K = A.D * 24 + A.H;
              break;
            case "[m]":
            case "[mm]":
              K = (A.D * 24 + A.H) * 60 + A.M;
              break;
            case "[s]":
            case "[ss]":
              K = ((A.D * 24 + A.H) * 60 + A.M) * 60 + Math.round(A.S + A.u);
              break;
            default:
              throw "bad abstime format: " + x;
          }
          G = x.length === 3 ? 1 : 2;
          break;
        case 101:
          K = j, G = 1;
          break;
      }
      var Q = G > 0 ? i(K, G) : "";
      return Q;
    }
    function me(w) {
      var x = 3;
      if (w.length <= x) return w;
      for (var A = w.length % x, H = w.substr(0, A); A != w.length; A += x) H += (H.length > 0 ? "," : "") + w.substr(A, x);
      return H;
    }
    var ge = /* @__PURE__ */ function() {
      var x = /%/g;
      function A(N, k, _) {
        var X = k.replace(x, ""), E = k.length - X.length;
        return ge(N, X, _ * Math.pow(10, 2 * E)) + l("%", E);
      }
      function H(N, k, _) {
        for (var X = k.length - 1; k.charCodeAt(X - 1) === 44; ) --X;
        return ge(N, k.substr(0, X), _ / Math.pow(10, 3 * (k.length - X)));
      }
      function S(N, k) {
        var _, X = N.indexOf("E") - N.indexOf(".") - 1;
        if (N.match(/^#+0.0E\+0$/)) {
          if (k == 0) return "0.0E+0";
          if (k < 0) return "-" + S(N, -k);
          var E = N.indexOf(".");
          E === -1 && (E = N.indexOf("E"));
          var P = Math.floor(Math.log(k) * Math.LOG10E) % E;
          if (P < 0 && (P += E), _ = (k / Math.pow(10, P)).toPrecision(X + 1 + (E + P) % E), _.indexOf("e") === -1) {
            var te = Math.floor(Math.log(k) * Math.LOG10E);
            for (_.indexOf(".") === -1 ? _ = _.charAt(0) + "." + _.substr(1) + "E+" + (te - _.length + P) : _ += "E+" + (te - P); _.substr(0, 2) === "0."; )
              _ = _.charAt(0) + _.substr(2, E) + "." + _.substr(2 + E), _ = _.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
            _ = _.replace(/\+-/, "-");
          }
          _ = _.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(ce, ue, de, re) {
            return ue + de + re.substr(0, (E + P) % E) + "." + re.substr(P) + "E";
          });
        } else _ = k.toExponential(X);
        return N.match(/E\+00$/) && _.match(/e[+-]\d$/) && (_ = _.substr(0, _.length - 1) + "0" + _.charAt(_.length - 1)), N.match(/E\-/) && _.match(/e\+/) && (_ = _.replace(/e\+/, "e")), _.replace("e", "E");
      }
      var U = /# (\?+)( ?)\/( ?)(\d+)/;
      function B(N, k, _) {
        var X = parseInt(N[4], 10), E = Math.round(k * X), P = Math.floor(E / X), te = E - P * X, ce = X;
        return _ + (P === 0 ? "" : "" + P) + " " + (te === 0 ? l(" ", N[1].length + 1 + N[4].length) : s(te, N[1].length) + N[2] + "/" + N[3] + i(ce, N[4].length));
      }
      function j(N, k, _) {
        return _ + (k === 0 ? "" : "" + k) + l(" ", N[1].length + 2 + N[4].length);
      }
      var K = /^#*0*\.([0#]+)/, G = /\).*[0#]/, Q = /\(###\) ###\\?-####/;
      function ne(N) {
        for (var k = "", _, X = 0; X != N.length; ++X) switch (_ = N.charCodeAt(X)) {
          case 35:
            break;
          case 63:
            k += " ";
            break;
          case 48:
            k += "0";
            break;
          default:
            k += String.fromCharCode(_);
        }
        return k;
      }
      function $e(N, k) {
        var _ = Math.pow(10, k);
        return "" + Math.round(N * _) / _;
      }
      function Ve(N, k) {
        var _ = N - Math.floor(N), X = Math.pow(10, k);
        return k < ("" + Math.round(_ * X)).length ? 0 : Math.round(_ * X);
      }
      function Dt(N, k) {
        return k < ("" + Math.round((N - Math.floor(N)) * Math.pow(10, k))).length ? 1 : 0;
      }
      function Fe(N) {
        return N < 2147483647 && N > -2147483648 ? "" + (N >= 0 ? N | 0 : N - 1 | 0) : "" + Math.floor(N);
      }
      function ie(N, k, _) {
        if (N.charCodeAt(0) === 40 && !k.match(G)) {
          var X = k.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
          return _ >= 0 ? ie("n", X, _) : "(" + ie("n", X, -_) + ")";
        }
        if (k.charCodeAt(k.length - 1) === 44) return H(N, k, _);
        if (k.indexOf("%") !== -1) return A(N, k, _);
        if (k.indexOf("E") !== -1) return S(k, _);
        if (k.charCodeAt(0) === 36) return "$" + ie(N, k.substr(k.charAt(1) == " " ? 2 : 1), _);
        var E, P, te, ce, ue = Math.abs(_), de = _ < 0 ? "-" : "";
        if (k.match(/^00+$/)) return de + d(ue, k.length);
        if (k.match(/^[#?]+$/))
          return E = d(_, 0), E === "0" && (E = ""), E.length > k.length ? E : ne(k.substr(0, k.length - E.length)) + E;
        if (P = k.match(U)) return B(P, ue, de);
        if (k.match(/^#+0+$/)) return de + d(ue, k.length - k.indexOf("0"));
        if (P = k.match(K))
          return E = $e(_, P[1].length).replace(/^([^\.]+)$/, "$1." + ne(P[1])).replace(/\.$/, "." + ne(P[1])).replace(/\.(\d*)$/, function(Me, st) {
            return "." + st + l("0", ne(P[1]).length - st.length);
          }), k.indexOf("0.") !== -1 ? E : E.replace(/^0\./, ".");
        if (k = k.replace(/^#+([0.])/, "$1"), P = k.match(/^(0*)\.(#*)$/))
          return de + $e(ue, P[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, P[1].length ? "0." : ".");
        if (P = k.match(/^#{1,3},##0(\.?)$/)) return de + me(d(ue, 0));
        if (P = k.match(/^#,##0\.([#0]*0)$/))
          return _ < 0 ? "-" + ie(N, k, -_) : me("" + (Math.floor(_) + Dt(_, P[1].length))) + "." + i(Ve(_, P[1].length), P[1].length);
        if (P = k.match(/^#,#*,#0/)) return ie(N, k.replace(/^#,#*,/, ""), _);
        if (P = k.match(/^([0#]+)(\\?-([0#]+))+$/))
          return E = r(ie(N, k.replace(/[\\-]/g, ""), _)), te = 0, r(r(k.replace(/\\/g, "")).replace(/[0#]/g, function(Me) {
            return te < E.length ? E.charAt(te++) : Me === "0" ? "0" : "";
          }));
        if (k.match(Q))
          return E = ie(N, "##########", _), "(" + E.substr(0, 3) + ") " + E.substr(3, 3) + "-" + E.substr(6);
        var re = "";
        if (P = k.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
          return te = Math.min(P[4].length, 7), ce = I(ue, Math.pow(10, te) - 1, !1), E = "" + de, re = ge("n", P[1], ce[1]), re.charAt(re.length - 1) == " " && (re = re.substr(0, re.length - 1) + "0"), E += re + P[2] + "/" + P[3], re = c(ce[2], te), re.length < P[4].length && (re = ne(P[4].substr(P[4].length - re.length)) + re), E += re, E;
        if (P = k.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
          return te = Math.min(Math.max(P[1].length, P[4].length), 7), ce = I(ue, Math.pow(10, te) - 1, !0), de + (ce[0] || (ce[1] ? "" : "0")) + " " + (ce[1] ? s(ce[1], te) + P[2] + "/" + P[3] + c(ce[2], te) : l(" ", 2 * te + 1 + P[2].length + P[3].length));
        if (P = k.match(/^[#0?]+$/))
          return E = d(_, 0), k.length <= E.length ? E : ne(k.substr(0, k.length - E.length)) + E;
        if (P = k.match(/^([#0?]+)\.([#0]+)$/)) {
          E = "" + _.toFixed(Math.min(P[2].length, 10)).replace(/([^0])0+$/, "$1"), te = E.indexOf(".");
          var lt = k.indexOf(".") - te, zt = k.length - E.length - lt;
          return ne(k.substr(0, lt) + E + k.substr(k.length - zt));
        }
        if (P = k.match(/^00,000\.([#0]*0)$/))
          return te = Ve(_, P[1].length), _ < 0 ? "-" + ie(N, k, -_) : me(Fe(_)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(Me) {
            return "00," + (Me.length < 3 ? i(0, 3 - Me.length) : "") + Me;
          }) + "." + i(te, P[1].length);
        switch (k) {
          case "###,##0.00":
            return ie(N, "#,##0.00", _);
          case "###,###":
          case "##,###":
          case "#,###":
            var it = me(d(ue, 0));
            return it !== "0" ? de + it : "";
          case "###,###.00":
            return ie(N, "###,##0.00", _).replace(/^0\./, ".");
          case "#,###.00":
            return ie(N, "#,##0.00", _).replace(/^0\./, ".");
        }
        throw new Error("unsupported format |" + k + "|");
      }
      function rt(N, k, _) {
        for (var X = k.length - 1; k.charCodeAt(X - 1) === 44; ) --X;
        return ge(N, k.substr(0, X), _ / Math.pow(10, 3 * (k.length - X)));
      }
      function gt(N, k, _) {
        var X = k.replace(x, ""), E = k.length - X.length;
        return ge(N, X, _ * Math.pow(10, 2 * E)) + l("%", E);
      }
      function ze(N, k) {
        var _, X = N.indexOf("E") - N.indexOf(".") - 1;
        if (N.match(/^#+0.0E\+0$/)) {
          if (k == 0) return "0.0E+0";
          if (k < 0) return "-" + ze(N, -k);
          var E = N.indexOf(".");
          E === -1 && (E = N.indexOf("E"));
          var P = Math.floor(Math.log(k) * Math.LOG10E) % E;
          if (P < 0 && (P += E), _ = (k / Math.pow(10, P)).toPrecision(X + 1 + (E + P) % E), !_.match(/[Ee]/)) {
            var te = Math.floor(Math.log(k) * Math.LOG10E);
            _.indexOf(".") === -1 ? _ = _.charAt(0) + "." + _.substr(1) + "E+" + (te - _.length + P) : _ += "E+" + (te - P), _ = _.replace(/\+-/, "-");
          }
          _ = _.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(ce, ue, de, re) {
            return ue + de + re.substr(0, (E + P) % E) + "." + re.substr(P) + "E";
          });
        } else _ = k.toExponential(X);
        return N.match(/E\+00$/) && _.match(/e[+-]\d$/) && (_ = _.substr(0, _.length - 1) + "0" + _.charAt(_.length - 1)), N.match(/E\-/) && _.match(/e\+/) && (_ = _.replace(/e\+/, "e")), _.replace("e", "E");
      }
      function q(N, k, _) {
        if (N.charCodeAt(0) === 40 && !k.match(G)) {
          var X = k.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
          return _ >= 0 ? q("n", X, _) : "(" + q("n", X, -_) + ")";
        }
        if (k.charCodeAt(k.length - 1) === 44) return rt(N, k, _);
        if (k.indexOf("%") !== -1) return gt(N, k, _);
        if (k.indexOf("E") !== -1) return ze(k, _);
        if (k.charCodeAt(0) === 36) return "$" + q(N, k.substr(k.charAt(1) == " " ? 2 : 1), _);
        var E, P, te, ce, ue = Math.abs(_), de = _ < 0 ? "-" : "";
        if (k.match(/^00+$/)) return de + i(ue, k.length);
        if (k.match(/^[#?]+$/))
          return E = "" + _, _ === 0 && (E = ""), E.length > k.length ? E : ne(k.substr(0, k.length - E.length)) + E;
        if (P = k.match(U)) return j(P, ue, de);
        if (k.match(/^#+0+$/)) return de + i(ue, k.length - k.indexOf("0"));
        if (P = k.match(K))
          return E = ("" + _).replace(/^([^\.]+)$/, "$1." + ne(P[1])).replace(/\.$/, "." + ne(P[1])), E = E.replace(/\.(\d*)$/, function(Me, st) {
            return "." + st + l("0", ne(P[1]).length - st.length);
          }), k.indexOf("0.") !== -1 ? E : E.replace(/^0\./, ".");
        if (k = k.replace(/^#+([0.])/, "$1"), P = k.match(/^(0*)\.(#*)$/))
          return de + ("" + ue).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, P[1].length ? "0." : ".");
        if (P = k.match(/^#{1,3},##0(\.?)$/)) return de + me("" + ue);
        if (P = k.match(/^#,##0\.([#0]*0)$/))
          return _ < 0 ? "-" + q(N, k, -_) : me("" + _) + "." + l("0", P[1].length);
        if (P = k.match(/^#,#*,#0/)) return q(N, k.replace(/^#,#*,/, ""), _);
        if (P = k.match(/^([0#]+)(\\?-([0#]+))+$/))
          return E = r(q(N, k.replace(/[\\-]/g, ""), _)), te = 0, r(r(k.replace(/\\/g, "")).replace(/[0#]/g, function(Me) {
            return te < E.length ? E.charAt(te++) : Me === "0" ? "0" : "";
          }));
        if (k.match(Q))
          return E = q(N, "##########", _), "(" + E.substr(0, 3) + ") " + E.substr(3, 3) + "-" + E.substr(6);
        var re = "";
        if (P = k.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
          return te = Math.min(P[4].length, 7), ce = I(ue, Math.pow(10, te) - 1, !1), E = "" + de, re = ge("n", P[1], ce[1]), re.charAt(re.length - 1) == " " && (re = re.substr(0, re.length - 1) + "0"), E += re + P[2] + "/" + P[3], re = c(ce[2], te), re.length < P[4].length && (re = ne(P[4].substr(P[4].length - re.length)) + re), E += re, E;
        if (P = k.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
          return te = Math.min(Math.max(P[1].length, P[4].length), 7), ce = I(ue, Math.pow(10, te) - 1, !0), de + (ce[0] || (ce[1] ? "" : "0")) + " " + (ce[1] ? s(ce[1], te) + P[2] + "/" + P[3] + c(ce[2], te) : l(" ", 2 * te + 1 + P[2].length + P[3].length));
        if (P = k.match(/^[#0?]+$/))
          return E = "" + _, k.length <= E.length ? E : ne(k.substr(0, k.length - E.length)) + E;
        if (P = k.match(/^([#0]+)\.([#0]+)$/)) {
          E = "" + _.toFixed(Math.min(P[2].length, 10)).replace(/([^0])0+$/, "$1"), te = E.indexOf(".");
          var lt = k.indexOf(".") - te, zt = k.length - E.length - lt;
          return ne(k.substr(0, lt) + E + k.substr(k.length - zt));
        }
        if (P = k.match(/^00,000\.([#0]*0)$/))
          return _ < 0 ? "-" + q(N, k, -_) : me("" + _).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(Me) {
            return "00," + (Me.length < 3 ? i(0, 3 - Me.length) : "") + Me;
          }) + "." + i(0, P[1].length);
        switch (k) {
          case "###,###":
          case "##,###":
          case "#,###":
            var it = me("" + ue);
            return it !== "0" ? de + it : "";
          default:
            if (k.match(/\.[0#?]*$/)) return q(N, k.slice(0, k.lastIndexOf(".")), _) + ne(k.slice(k.lastIndexOf(".")));
        }
        throw new Error("unsupported format |" + k + "|");
      }
      return function(k, _, X) {
        return (X | 0) === X ? q(k, _, X) : ie(k, _, X);
      };
    }();
    function Ie(w) {
      for (var x = [], A = !1, H = 0, S = 0; H < w.length; ++H) switch (
        /*cc=*/
        w.charCodeAt(H)
      ) {
        case 34:
          A = !A;
          break;
        case 95:
        case 42:
        case 92:
          ++H;
          break;
        case 59:
          x[x.length] = w.substr(S, H - S), S = H + 1;
      }
      if (x[x.length] = w.substr(S), A === !0) throw new Error("Format |" + w + "| unterminated string ");
      return x;
    }
    n._split = Ie;
    var It = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
    function mt(w) {
      for (var x = 0, A = "", H = ""; x < w.length; )
        switch (A = w.charAt(x)) {
          case "G":
            u(w, x) && (x += 6), x++;
            break;
          case '"':
            for (
              ;
              /*cc=*/
              w.charCodeAt(++x) !== 34 && x < w.length;
            )
              ;
            ++x;
            break;
          case "\\":
            x += 2;
            break;
          case "_":
            x += 2;
            break;
          case "@":
            ++x;
            break;
          case "B":
          case "b":
            if (w.charAt(x + 1) === "1" || w.charAt(x + 1) === "2") return !0;
          case "M":
          case "D":
          case "Y":
          case "H":
          case "S":
          case "E":
          case "m":
          case "d":
          case "y":
          case "h":
          case "s":
          case "e":
          case "g":
            return !0;
          case "A":
          case "a":
          case "上":
            if (w.substr(x, 3).toUpperCase() === "A/P" || w.substr(x, 5).toUpperCase() === "AM/PM" || w.substr(x, 5).toUpperCase() === "上午/下午") return !0;
            ++x;
            break;
          case "[":
            for (H = A; w.charAt(x++) !== "]" && x < w.length; ) H += w.charAt(x);
            if (H.match(It)) return !0;
            break;
          case ".":
          case "0":
          case "#":
            for (; x < w.length && ("0#?.,E+-%".indexOf(A = w.charAt(++x)) > -1 || A == "\\" && w.charAt(x + 1) == "-" && "0#".indexOf(w.charAt(x + 2)) > -1); )
              ;
            break;
          case "?":
            for (; w.charAt(++x) === A; )
              ;
            break;
          case "*":
            ++x, (w.charAt(x) == " " || w.charAt(x) == "*") && ++x;
            break;
          case "(":
          case ")":
            ++x;
            break;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            for (; x < w.length && "0123456789".indexOf(w.charAt(++x)) > -1; )
              ;
            break;
          case " ":
            ++x;
            break;
          default:
            ++x;
            break;
        }
      return !1;
    }
    n.is_date = mt;
    function bt(w, x, A, H) {
      for (var S = [], U = "", B = 0, j = "", K = "t", G, Q, ne, $e = "H"; B < w.length; )
        switch (j = w.charAt(B)) {
          case "G":
            if (!u(w, B)) throw new Error("unrecognized character " + j + " in " + w);
            S[S.length] = { t: "G", v: "General" }, B += 7;
            break;
          case '"':
            for (U = ""; (ne = w.charCodeAt(++B)) !== 34 && B < w.length; ) U += String.fromCharCode(ne);
            S[S.length] = { t: "t", v: U }, ++B;
            break;
          case "\\":
            var Ve = w.charAt(++B), Dt = Ve === "(" || Ve === ")" ? Ve : "t";
            S[S.length] = { t: Dt, v: Ve }, ++B;
            break;
          case "_":
            S[S.length] = { t: "t", v: " " }, B += 2;
            break;
          case "@":
            S[S.length] = { t: "T", v: x }, ++B;
            break;
          case "B":
          case "b":
            if (w.charAt(B + 1) === "1" || w.charAt(B + 1) === "2") {
              if (G == null && (G = v(x, A, w.charAt(B + 1) === "2"), G == null))
                return "";
              S[S.length] = { t: "X", v: w.substr(B, 2) }, K = j, B += 2;
              break;
            }
          case "M":
          case "D":
          case "Y":
          case "H":
          case "S":
          case "E":
            j = j.toLowerCase();
          case "m":
          case "d":
          case "y":
          case "h":
          case "s":
          case "e":
          case "g":
            if (x < 0 || G == null && (G = v(x, A), G == null))
              return "";
            for (U = j; ++B < w.length && w.charAt(B).toLowerCase() === j; ) U += j;
            j === "m" && K.toLowerCase() === "h" && (j = "M"), j === "h" && (j = $e), S[S.length] = { t: j, v: U }, K = j;
            break;
          case "A":
          case "a":
          case "上":
            var Fe = { t: j, v: j };
            if (G == null && (G = v(x, A)), w.substr(B, 3).toUpperCase() === "A/P" ? (G != null && (Fe.v = G.H >= 12 ? "P" : "A"), Fe.t = "T", $e = "h", B += 3) : w.substr(B, 5).toUpperCase() === "AM/PM" ? (G != null && (Fe.v = G.H >= 12 ? "PM" : "AM"), Fe.t = "T", B += 5, $e = "h") : w.substr(B, 5).toUpperCase() === "上午/下午" ? (G != null && (Fe.v = G.H >= 12 ? "下午" : "上午"), Fe.t = "T", B += 5, $e = "h") : (Fe.t = "t", ++B), G == null && Fe.t === "T") return "";
            S[S.length] = Fe, K = j;
            break;
          case "[":
            for (U = j; w.charAt(B++) !== "]" && B < w.length; ) U += w.charAt(B);
            if (U.slice(-1) !== "]") throw 'unterminated "[" block: |' + U + "|";
            if (U.match(It)) {
              if (G == null && (G = v(x, A), G == null))
                return "";
              S[S.length] = { t: "Z", v: U.toLowerCase() }, K = U.charAt(1);
            } else U.indexOf("$") > -1 && (U = (U.match(/\$([^-\[\]]*)/) || [])[1] || "$", mt(w) || (S[S.length] = { t: "t", v: U }));
            break;
          case ".":
            if (G != null) {
              for (U = j; ++B < w.length && (j = w.charAt(B)) === "0"; ) U += j;
              S[S.length] = { t: "s", v: U };
              break;
            }
          case "0":
          case "#":
            for (U = j; ++B < w.length && "0#?.,E+-%".indexOf(j = w.charAt(B)) > -1; ) U += j;
            S[S.length] = { t: "n", v: U };
            break;
          case "?":
            for (U = j; w.charAt(++B) === j; ) U += j;
            S[S.length] = { t: j, v: U }, K = j;
            break;
          case "*":
            ++B, (w.charAt(B) == " " || w.charAt(B) == "*") && ++B;
            break;
          case "(":
          case ")":
            S[S.length] = { t: H === 1 ? "t" : j, v: j }, ++B;
            break;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            for (U = j; B < w.length && "0123456789".indexOf(w.charAt(++B)) > -1; ) U += w.charAt(B);
            S[S.length] = { t: "D", v: U };
            break;
          case " ":
            S[S.length] = { t: j, v: j }, ++B;
            break;
          case "$":
            S[S.length] = { t: "t", v: "$" }, ++B;
            break;
          default:
            if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(j) === -1) throw new Error("unrecognized character " + j + " in " + w);
            S[S.length] = { t: "t", v: j }, ++B;
            break;
        }
      var ie = 0, rt = 0, gt;
      for (B = S.length - 1, K = "t"; B >= 0; --B)
        switch (S[B].t) {
          case "h":
          case "H":
            S[B].t = $e, K = "h", ie < 1 && (ie = 1);
            break;
          case "s":
            (gt = S[B].v.match(/\.0+$/)) && (rt = Math.max(rt, gt[0].length - 1)), ie < 3 && (ie = 3);
          case "d":
          case "y":
          case "M":
          case "e":
            K = S[B].t;
            break;
          case "m":
            K === "s" && (S[B].t = "M", ie < 2 && (ie = 2));
            break;
          case "X":
            break;
          case "Z":
            ie < 1 && S[B].v.match(/[Hh]/) && (ie = 1), ie < 2 && S[B].v.match(/[Mm]/) && (ie = 2), ie < 3 && S[B].v.match(/[Ss]/) && (ie = 3);
        }
      switch (ie) {
        case 0:
          break;
        case 1:
          G.u >= 0.5 && (G.u = 0, ++G.S), G.S >= 60 && (G.S = 0, ++G.M), G.M >= 60 && (G.M = 0, ++G.H);
          break;
        case 2:
          G.u >= 0.5 && (G.u = 0, ++G.S), G.S >= 60 && (G.S = 0, ++G.M);
          break;
      }
      var ze = "", q;
      for (B = 0; B < S.length; ++B)
        switch (S[B].t) {
          case "t":
          case "T":
          case " ":
          case "D":
            break;
          case "X":
            S[B].v = "", S[B].t = ";";
            break;
          case "d":
          case "m":
          case "y":
          case "h":
          case "H":
          case "M":
          case "s":
          case "e":
          case "b":
          case "Z":
            S[B].v = ve(S[B].t.charCodeAt(0), S[B].v, G, rt), S[B].t = "t";
            break;
          case "n":
          case "?":
            for (q = B + 1; S[q] != null && ((j = S[q].t) === "?" || j === "D" || (j === " " || j === "t") && S[q + 1] != null && (S[q + 1].t === "?" || S[q + 1].t === "t" && S[q + 1].v === "/") || S[B].t === "(" && (j === " " || j === "n" || j === ")") || j === "t" && (S[q].v === "/" || S[q].v === " " && S[q + 1] != null && S[q + 1].t == "?")); )
              S[B].v += S[q].v, S[q] = { v: "", t: ";" }, ++q;
            ze += S[B].v, B = q - 1;
            break;
          case "G":
            S[B].t = "t", S[B].v = W(x, A);
            break;
        }
      var N = "", k, _;
      if (ze.length > 0) {
        ze.charCodeAt(0) == 40 ? (k = x < 0 && ze.charCodeAt(0) === 45 ? -x : x, _ = ge("n", ze, k)) : (k = x < 0 && H > 1 ? -x : x, _ = ge("n", ze, k), k < 0 && S[0] && S[0].t == "t" && (_ = _.substr(1), S[0].v = "-" + S[0].v)), q = _.length - 1;
        var X = S.length;
        for (B = 0; B < S.length; ++B) if (S[B] != null && S[B].t != "t" && S[B].v.indexOf(".") > -1) {
          X = B;
          break;
        }
        var E = S.length;
        if (X === S.length && _.indexOf("E") === -1) {
          for (B = S.length - 1; B >= 0; --B)
            S[B] == null || "n?".indexOf(S[B].t) === -1 || (q >= S[B].v.length - 1 ? (q -= S[B].v.length, S[B].v = _.substr(q + 1, S[B].v.length)) : q < 0 ? S[B].v = "" : (S[B].v = _.substr(0, q + 1), q = -1), S[B].t = "t", E = B);
          q >= 0 && E < S.length && (S[E].v = _.substr(0, q + 1) + S[E].v);
        } else if (X !== S.length && _.indexOf("E") === -1) {
          for (q = _.indexOf(".") - 1, B = X; B >= 0; --B)
            if (!(S[B] == null || "n?".indexOf(S[B].t) === -1)) {
              for (Q = S[B].v.indexOf(".") > -1 && B === X ? S[B].v.indexOf(".") - 1 : S[B].v.length - 1, N = S[B].v.substr(Q + 1); Q >= 0; --Q)
                q >= 0 && (S[B].v.charAt(Q) === "0" || S[B].v.charAt(Q) === "#") && (N = _.charAt(q--) + N);
              S[B].v = N, S[B].t = "t", E = B;
            }
          for (q >= 0 && E < S.length && (S[E].v = _.substr(0, q + 1) + S[E].v), q = _.indexOf(".") + 1, B = X; B < S.length; ++B)
            if (!(S[B] == null || "n?(".indexOf(S[B].t) === -1 && B !== X)) {
              for (Q = S[B].v.indexOf(".") > -1 && B === X ? S[B].v.indexOf(".") + 1 : 0, N = S[B].v.substr(0, Q); Q < S[B].v.length; ++Q)
                q < _.length && (N += _.charAt(q++));
              S[B].v = N, S[B].t = "t", E = B;
            }
        }
      }
      for (B = 0; B < S.length; ++B) S[B] != null && "n?".indexOf(S[B].t) > -1 && (k = H > 1 && x < 0 && B > 0 && S[B - 1].v === "-" ? -x : x, S[B].v = ge(S[B].t, S[B].v, k), S[B].t = "t");
      var P = "";
      for (B = 0; B !== S.length; ++B) S[B] != null && (P += S[B].v);
      return P;
    }
    n._eval = bt;
    var Xe = /\[[=<>]/, xo = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
    function wo(w, x) {
      if (x == null) return !1;
      var A = parseFloat(x[2]);
      switch (x[1]) {
        case "=":
          if (w == A) return !0;
          break;
        case ">":
          if (w > A) return !0;
          break;
        case "<":
          if (w < A) return !0;
          break;
        case "<>":
          if (w != A) return !0;
          break;
        case ">=":
          if (w >= A) return !0;
          break;
        case "<=":
          if (w <= A) return !0;
          break;
      }
      return !1;
    }
    function Pa(w, x) {
      var A = Ie(w), H = A.length, S = A[H - 1].indexOf("@");
      if (H < 4 && S > -1 && --H, A.length > 4) throw new Error("cannot find right format for |" + A.join("|") + "|");
      if (typeof x != "number") return [4, A.length === 4 || S > -1 ? A[A.length - 1] : "@"];
      switch (A.length) {
        case 1:
          A = S > -1 ? ["General", "General", "General", A[0]] : [A[0], A[0], A[0], "@"];
          break;
        case 2:
          A = S > -1 ? [A[0], A[0], A[0], A[1]] : [A[0], A[1], A[0], "@"];
          break;
        case 3:
          A = S > -1 ? [A[0], A[1], A[0], A[2]] : [A[0], A[1], A[2], "@"];
          break;
      }
      var U = x > 0 ? A[0] : x < 0 ? A[1] : A[2];
      if (A[0].indexOf("[") === -1 && A[1].indexOf("[") === -1) return [H, U];
      if (A[0].match(Xe) != null || A[1].match(Xe) != null) {
        var B = A[0].match(xo), j = A[1].match(xo);
        return wo(x, B) ? [H, A[0]] : wo(x, j) ? [H, A[1]] : [H, A[B != null && j != null ? 2 : 1]];
      }
      return [H, U];
    }
    function Co(w, x, A) {
      A == null && (A = {});
      var H = "";
      switch (typeof w) {
        case "string":
          w == "m/d/yy" && A.dateNF ? H = A.dateNF : H = w;
          break;
        case "number":
          w == 14 && A.dateNF ? H = A.dateNF : H = (A.table != null ? A.table : y)[w], H == null && (H = A.table && A.table[O[w]] || y[O[w]]), H == null && (H = z[w] || "General");
          break;
      }
      if (u(H, 0)) return W(x, A);
      x instanceof Date && (x = $(x, A.date1904));
      var S = Pa(H, x);
      if (u(S[1])) return W(x, A);
      if (x === !0) x = "TRUE";
      else if (x === !1) x = "FALSE";
      else if (x === "" || x == null) return "";
      return bt(S[1], x, A, S[0]);
    }
    function Ao(w, x) {
      if (typeof x != "number") {
        x = +x || -1;
        for (var A = 0; A < 392; ++A) {
          if (y[A] == null) {
            x < 0 && (x = A);
            continue;
          }
          if (y[A] == w) {
            x = A;
            break;
          }
        }
        x < 0 && (x = 391);
      }
      return y[x] = w, x;
    }
    n.load = Ao, n._table = y, n.get_table = function() {
      return y;
    }, n.load_table = function(x) {
      for (var A = 0; A != 392; ++A)
        x[A] !== void 0 && Ao(x[A], A);
    }, n.init_table = g, n.format = Co;
  };
  e(o), typeof DO_NOT_EXPORT_SSF > "u" && (t.exports = o);
})(Qo);
var Va = Qo.exports;
const Qe = /* @__PURE__ */ ao(Va), He = "auto", Ha = 3, Ua = [
  {
    name: "year",
    description: 'When lowerCase(columnName)="year" with the column having numeric values will result in no formatting',
    matchingFunction: (t, o, e) => t && o ? t.toLowerCase() === "year" && ((o == null ? void 0 : o.columnType) === "number" || (e == null ? void 0 : e.unitType) === "number") : !1,
    format: {
      formatTag: "year",
      formatCode: He,
      valueType: "number",
      exampleInput: 2013,
      _autoFormat: {
        autoFormatCode: "@",
        truncateUnits: !1
      }
    }
  },
  {
    name: "id",
    description: 'When lowerCase(columnName)="id" with the column having numeric values, then values will have no formatting',
    matchingFunction: (t, o, e) => t && o ? t.toLowerCase() === "id" && ((o == null ? void 0 : o.columnType) === "number" || (e == null ? void 0 : e.unitType) === "number") : !1,
    format: {
      formatTag: "id",
      formatCode: He,
      valueType: "number",
      exampleInput: 93120121,
      _autoFormat: {
        autoFormatFunction: (t) => {
          const o = t;
          return o != null && !isNaN(o) ? o.toLocaleString("fullwide", {
            useGrouping: !1
          }) : String(o);
        }
      }
    }
  },
  {
    name: "defaultDate",
    description: "Formatting for Default Date",
    matchingFunction: (t, o, e) => o ? (o == null ? void 0 : o.columnType) === "date" || (e == null ? void 0 : e.unitType) === "date" : !1,
    format: {
      formatTag: "defaultDate",
      formatCode: He,
      valueType: "date",
      exampleInput: "Sat Jan 01 2022 03:15:00 GMT-0500",
      _autoFormat: {
        autoFormatCode: "YYYY-MM-DD",
        truncateUnits: !1
      }
    }
  }
];
function no(t, o) {
  switch (o) {
    case "T":
      return t !== void 0 ? t / 1e12 : void 0;
    case "B":
      return t !== void 0 ? t / 1e9 : void 0;
    case "M":
      return t !== void 0 ? t / 1e6 : void 0;
    case "k":
      return t !== void 0 ? t / 1e3 : void 0;
    default:
      return t;
  }
}
function Yl(t, o = "@", e = !1) {
  return t._autoFormat = {
    autoFormatCode: o,
    truncateUnits: e
  }, t;
}
function Xa(t, o) {
  var n, r, l;
  const e = ((n = o || t.formatCode) == null ? void 0 : n.toLowerCase()) === He, a = ((r = t._autoFormat) == null ? void 0 : r.autoFormatFunction) || ((l = t._autoFormat) == null ? void 0 : l.autoFormatCode);
  return !!(e && a !== void 0);
}
function ro(t, o = 7) {
  let e, a = "";
  const n = t == null ? void 0 : t.median;
  let r;
  if (n !== void 0) {
    let l;
    a = ea(n), a ? (l = no(n, a), r = !0) : (l = n, r = !1), (t == null ? void 0 : t.maxDecimals) === 0 && !r ? e = "#,##0" : e = qa(
      l,
      o
    );
  } else
    e = "#,##0", r = !1;
  return {
    formatTag: "auto",
    formatCode: He,
    valueType: "number",
    _autoFormat: {
      autoFormatCode: e,
      truncateUnits: r,
      columnUnits: a
    }
  };
}
function Ya(t, o, e) {
  const a = Ua.find(
    (n) => n.matchingFunction(t, o, e)
  );
  if (a)
    return a.format;
  if ((e == null ? void 0 : e.unitType) === "number")
    return ro(e);
}
function Wa(t, o, e) {
  var a, n;
  if ((a = o._autoFormat) != null && a.autoFormatFunction)
    return o._autoFormat.autoFormatFunction(
      t,
      o,
      e
    );
  if ((n = o._autoFormat) != null && n.autoFormatCode) {
    const r = o._autoFormat.autoFormatCode;
    if (o.valueType === "number") {
      const i = o._autoFormat.truncateUnits;
      let s = t, c = "";
      return i && (e == null ? void 0 : e.median) !== void 0 && (c = ea(e.median), s = no(t, c)), Qe.format(r, s) + c;
    } else
      return Qe.format(r, t);
  } else
    console.warn("autoFormat called without a formatCode or function");
  return String(t);
}
function Wl(t) {
  return typeof t == "number" ? t.toLocaleString(void 0, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }) : t != null ? String(t) : "-";
}
function qa(t, o = 7, e = Ha) {
  let a = "#,##0";
  const n = Za(t);
  let r = 0;
  return n - e < 0 && (r = Math.min(
    Math.max(
      Math.abs(n - e + 1),
      0
    ),
    o
  )), r > 0 && (a += ".", a += "0".repeat(r)), a;
}
function ea(t) {
  const o = Math.abs(t);
  return o >= 5e12 ? "T" : o >= 5e9 ? "B" : o >= 5e6 ? "M" : o >= 5e3 ? "k" : "";
}
function Za(t) {
  return t === 0 ? 0 : Math.floor(Math.log10(Math.abs(t)));
}
const Ja = [
  {
    primaryCode: "usd",
    currencySymbol: "$",
    displayName: "USD - United States Dollar"
  },
  {
    primaryCode: "aud",
    currencySymbol: "A$",
    displayName: "AUD - Australian Dollar",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "brl",
    currencySymbol: "R$",
    displayName: "BRL - Brazilian Real",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "cad",
    currencySymbol: "C$",
    displayName: "CAD - Canadian Dollar",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "cny",
    currencySymbol: "¥",
    displayName: "CNY - Renminbi",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "eur",
    currencySymbol: "€",
    displayName: "EUR - Euro"
  },
  {
    primaryCode: "gbp",
    currencySymbol: "£",
    displayName: "GBP - Pound Sterling",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "jpy",
    currencySymbol: "¥",
    displayName: "JPY - Japanese Yen",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "inr",
    currencySymbol: "₹",
    displayName: "INR - Indian Rupee",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "krw",
    currencySymbol: "₩",
    displayName: "KRW - South Korean won",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "ngn",
    currencySymbol: "₦",
    displayName: "NGN - Nigerian Naira",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "rub",
    currencySymbol: "rub",
    displayName: "RUB - Russian Ruble",
    escapeCurrencySymbol: !0
  },
  {
    primaryCode: "sek",
    currencySymbol: "kr",
    displayName: "SEK - Swedish Krona",
    escapeCurrencySymbol: !0
  }
], Ka = [
  {
    derivedSuffix: "",
    valueFormatCode: "#,##0",
    exampleInput: 412.17,
    auto: !0
  },
  {
    derivedSuffix: "0",
    valueFormatCode: "#,##0",
    exampleInput: 7043.123
  },
  {
    derivedSuffix: "1",
    valueFormatCode: "#,##0.0",
    exampleInput: 7043.123
  },
  {
    derivedSuffix: "2",
    valueFormatCode: "#,##0.00",
    exampleInput: 7043.123
  },
  {
    derivedSuffix: "0k",
    valueFormatCode: '#,##0,"k"',
    exampleInput: 64301.12
  },
  {
    derivedSuffix: "1k",
    valueFormatCode: '#,##0.0,"k"',
    exampleInput: 64301.12
  },
  {
    derivedSuffix: "2k",
    valueFormatCode: '#,##0.00,"k"',
    exampleInput: 64301.12
  },
  {
    derivedSuffix: "0m",
    valueFormatCode: '#,##0,,"M"',
    exampleInput: 456430112e-2
  },
  {
    derivedSuffix: "1m",
    valueFormatCode: '#,##0.0,,"M"',
    exampleInput: 456430112e-2
  },
  {
    derivedSuffix: "2m",
    valueFormatCode: '#,##0.00,,"M"',
    exampleInput: 456430112e-2
  },
  {
    derivedSuffix: "0b",
    valueFormatCode: '#,##0,,,"B"',
    exampleInput: 978456430112e-2
  },
  {
    derivedSuffix: "1b",
    valueFormatCode: '#,##0.0,,,"B"',
    exampleInput: 978456430112e-2
  },
  {
    derivedSuffix: "2b",
    valueFormatCode: '#,##0.00,,,"B"',
    exampleInput: 978456430112e-2
  }
], Qa = Ja.flatMap((t) => Ka.map((o) => {
  const e = t.escapeCurrencySymbol ? `"${t.currencySymbol}"` : t.currencySymbol, a = {
    formatTag: t.primaryCode + o.derivedSuffix,
    parentFormat: t.primaryCode,
    formatCategory: "currency",
    valueType: "number",
    exampleInput: o.exampleInput,
    titleTagReplacement: ` (${t.currencySymbol})`,
    formatCode: ""
    // Will be set below
  };
  return o.auto ? (a.formatCode = He, a._autoFormat = {
    autoFormatFunction: (n, r, l) => {
      var f, d, u;
      const i = n, s = ro(l, 2);
      let c = `${e}${((f = s._autoFormat) == null ? void 0 : f.autoFormatCode) || "#,##0"}`, p = "", h = i;
      return (d = s._autoFormat) != null && d.truncateUnits && ((u = s._autoFormat) != null && u.columnUnits) ? (p = s._autoFormat.columnUnits, h = no(i, s._autoFormat.columnUnits)) : c.endsWith(".0") && (c = c + "0"), Qe.format(c, h) + p;
    }
  }) : a.formatCode = `${e}${o.valueFormatCode}`, o.axisValueFormatCode && (a.axisFormatCode = o.axisValueFormatCode), a;
})), lo = [
  ...Qa,
  // Date/Time formats
  {
    formatTag: "ddd",
    formatCode: "ddd",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "dddd",
    formatCode: "dddd",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "mmm",
    formatCode: "mmm",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "mmmm",
    formatCode: "mmmm",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "yyyy",
    formatCode: "yyyy",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "shortdate",
    formatCode: "mmm d/yy",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "longdate",
    formatCode: "mmmm d, yyyy",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "fulldate",
    formatCode: "dddd mmmm d, yyyy",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "mdy",
    formatCode: "m/d/y",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "dmy",
    formatCode: "d/m/y",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09 12:45"
  },
  {
    formatTag: "hms",
    formatCode: "H:MM:SS AM/PM",
    formatCategory: "date",
    valueType: "date",
    exampleInput: "2022-01-09T11:45:03"
  },
  // Number formats
  {
    formatTag: "num0",
    formatCode: "#,##0",
    formatCategory: "number",
    valueType: "number",
    exampleInput: 11.23168
  },
  {
    formatTag: "num1",
    formatCode: "#,##0.0",
    formatCategory: "number",
    valueType: "number",
    exampleInput: 11.23168
  },
  {
    formatTag: "num2",
    formatCode: "#,##0.00",
    formatCategory: "number",
    valueType: "number",
    exampleInput: 11.23168
  },
  {
    formatTag: "num3",
    formatCode: "#,##0.000",
    formatCategory: "number",
    valueType: "number",
    exampleInput: 11.23168
  },
  {
    formatTag: "num4",
    formatCode: "#,##0.0000",
    formatCategory: "number",
    valueType: "number",
    exampleInput: 11.23168
  },
  {
    formatTag: "num0k",
    formatCode: '#,##0,"k"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 64201
  },
  {
    formatTag: "num1k",
    formatCode: '#,##0.0,"k"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 64201
  },
  {
    formatTag: "num2k",
    formatCode: '#,##0.00,"k"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 64201
  },
  {
    formatTag: "num0m",
    formatCode: '#,##0,,"M"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 42539483
  },
  {
    formatTag: "num1m",
    formatCode: '#,##0.0,,"M"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 42539483
  },
  {
    formatTag: "num2m",
    formatCode: '#,##0.00,,"M"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 42539483
  },
  {
    formatTag: "num0b",
    formatCode: '#,##0,,,"B"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 1384937584
  },
  {
    formatTag: "num1b",
    formatCode: '#,##0.0,,,"B"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 1384937584
  },
  {
    formatTag: "num2b",
    formatCode: '#,##0.00,,,"B"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: 1384937584
  },
  {
    formatTag: "id",
    formatCode: "0",
    formatCategory: "number",
    valueType: "number",
    exampleInput: "921594675",
    titleTagReplacement: " id"
  },
  {
    formatTag: "fract",
    formatCode: "# ?/?",
    formatCategory: "number",
    valueType: "number",
    exampleInput: "0.25"
  },
  {
    formatTag: "mult",
    formatCode: '#,##0.0"x"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: "5.32"
  },
  {
    formatTag: "mult0",
    formatCode: '#,##0"x"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: "5.32"
  },
  {
    formatTag: "mult1",
    formatCode: '#,##0.0"x"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: "5.32"
  },
  {
    formatTag: "mult2",
    formatCode: '#,##0.00"x"',
    formatCategory: "number",
    valueType: "number",
    exampleInput: "5.32"
  },
  {
    formatTag: "sci",
    formatCode: "0.00E+0",
    formatCategory: "number",
    valueType: "number",
    exampleInput: "16546.1561"
  },
  // Percent formats
  {
    formatTag: "pct",
    formatCode: He,
    formatCategory: "percent",
    valueType: "number",
    exampleInput: 0.731,
    titleTagReplacement: "",
    _autoFormat: {
      autoFormatFunction: (t, o, e) => {
        var n;
        const a = t;
        if ((e == null ? void 0 : e.unitType) === "number") {
          const r = {
            min: e.min * 100,
            max: e.max * 100,
            median: e.median * 100,
            maxDecimals: Math.max(e.maxDecimals - 2, 0),
            unitType: e.unitType
          }, l = ro(r);
          return Qe.format(((n = l._autoFormat) == null ? void 0 : n.autoFormatCode) || "#,##0", a * 100) + "%";
        } else
          return Qe.format("#,##0%", a);
      }
    }
  },
  {
    formatTag: "pct0",
    formatCode: "#,##0%",
    formatCategory: "percent",
    valueType: "number",
    exampleInput: 0.731,
    titleTagReplacement: ""
  },
  {
    formatTag: "pct1",
    formatCode: "#,##0.0%",
    formatCategory: "percent",
    valueType: "number",
    exampleInput: 0.731,
    titleTagReplacement: ""
  },
  {
    formatTag: "pct2",
    formatCode: "#,##0.00%",
    formatCategory: "percent",
    valueType: "number",
    exampleInput: 0.731,
    titleTagReplacement: ""
  },
  {
    formatTag: "pct3",
    formatCode: "#,##0.000%",
    formatCategory: "percent",
    valueType: "number",
    exampleInput: 0.731,
    titleTagReplacement: ""
  }
];
function Tt(t) {
  if (t && typeof t == "string") {
    let o = t;
    const e = o.split(" ");
    o.includes(":") || (o = o + "T00:00:00"), e.length > 2 && (o = e[0] + " " + e[1]);
    const a = /\.([^\s]+)/;
    return o = o.replace(a, ""), o = o.replace("Z", ""), o = o.replace(" ", "T"), o;
  }
  return String(t);
}
function ql(t, o) {
  return t.map((e) => ({
    ...e,
    [o]: e[o] ? new Date(Tt(e[o])) : null
  }));
}
function en(t, o) {
  return t.map((e) => ({
    ...e,
    [o]: Tt(e[o])
  }));
}
const ta = "axis", io = "value";
let oa = [];
function tn(t) {
  oa = t;
}
function on() {
  return oa;
}
function an(t) {
  if (t == null)
    return "string";
  if (typeof t == "number")
    return "number";
  if (typeof t == "boolean")
    return "boolean";
  if (t instanceof Date)
    return "date";
  if (typeof t == "string") {
    const o = new Date(t);
    if (!isNaN(o.getTime()) && t.match(/\d{4}-\d{2}-\d{2}/))
      return "date";
  }
  return "string";
}
function nn(t) {
  if (!t) return;
  const o = t.lastIndexOf("_");
  if (o > 0)
    return t.substring(o + 1);
}
function aa(t, o, e) {
  const a = nn(t);
  if (o.columnType === "string")
    return;
  if (a) {
    const r = lo.find(
      (l) => {
        var i;
        return ((i = l.formatTag) == null ? void 0 : i.toLowerCase()) === (a == null ? void 0 : a.toLowerCase());
      }
    );
    if (r)
      return r;
  }
  const n = Ya(
    t ?? "",
    { columnType: o.columnType },
    e
  );
  if (n)
    return n;
}
function pe(t, o) {
  const e = t, a = lo.find(
    (r) => {
      var l;
      return ((l = r.formatTag) == null ? void 0 : l.toLowerCase()) === (e == null ? void 0 : e.toLowerCase());
    }
  );
  if (a)
    return a;
  const n = {
    formatTag: "custom",
    formatCode: e
  };
  return o && (n.valueType = o), n;
}
function rn(t, o) {
  return o === ta && t.axisFormatCode ? t.axisFormatCode : t.formatCode;
}
function J(t, o, e) {
  try {
    return so(t, o, e, io);
  } catch (a) {
    return console.warn(`Unexpected error in formatValue: ${a}`), String(t);
  }
}
function Je(t, o, e) {
  try {
    return so(t, o, e, ta);
  } catch {
    return String(t);
  }
}
function na(t, o) {
  let e = t || "";
  if (t && (o != null && o.formatTag)) {
    const a = t.toLowerCase().lastIndexOf(`_${o.formatTag.toLowerCase()}`);
    let n = "";
    a > 0 && (typeof (o == null ? void 0 : o.titleTagReplacement) == "string" && (n = o.titleTagReplacement), e = t.substring(0, a) + n);
  }
  return e;
}
function De(t, o) {
  let e = na(t, o);
  return e = e.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (a) => a.toUpperCase()), e;
}
function so(t, o, e, a = io) {
  if (t == null)
    return "-";
  if (o)
    try {
      const n = rn(o, a);
      let r;
      try {
        o.valueType === "date" && typeof t == "string" ? r = new Date(Tt(t)) : t instanceof Date ? r = new Date(t.toISOString().slice(0, -1)) : o.valueType === "number" && typeof t != "number" && !Number.isNaN(t) ? r = Number(t) : r = t;
      } catch {
        r = t;
      }
      if (Xa(o, n))
        try {
          return Wa(r, o, e);
        } catch (l) {
          console.warn(`Unexpected error applying auto formatting: ${l}`);
        }
      else if (n)
        try {
          return Qe.format(n, r);
        } catch (l) {
          console.warn(`Unexpected error applying ssf formatting: ${l}`);
        }
    } catch (n) {
      console.warn(`Unexpected error in applyFormatting: ${n}`);
    }
  return typeof t == "number" ? Number.isInteger(t) ? t.toLocaleString() : t.toLocaleString(void 0, { maximumFractionDigits: 2 }) : t instanceof Date ? t.toLocaleDateString() : String(t);
}
function ln(t) {
  switch (t) {
    case "number":
      return 1234;
    case "date":
      return "2022-01-03";
    default:
      return;
  }
}
function sn(t) {
  var a, n;
  const e = ((a = t.userInput) == null ? void 0 : a.trim()) || t.exampleInput || ln(t.valueType);
  if (e)
    try {
      let r;
      if (t.valueType === "number") {
        const l = Number(e);
        r = {
          min: l,
          max: l,
          median: l,
          maxDecimals: ((n = l.toString().split(".")[1]) == null ? void 0 : n.length) || 0,
          unitType: "number"
        };
      }
      return so(e, t, r, io);
    } catch {
    }
  return "";
}
function cn(t, o) {
  if (o) {
    const e = pe(o);
    return J(t, e);
  }
  return J(t);
}
const To = {
  light: {
    "base-100": "#ffffff",
    "base-200": "#f5f5f5",
    "base-300": "#d4d4d4",
    "base-content": "#404040",
    "base-content-muted": "#737373",
    "base-heading": "#0d0d0d"
  },
  dark: {
    "base-100": "#09090b",
    "base-200": "#18181b",
    "base-300": "#3f3f46",
    "base-content": "#d4d4d8",
    "base-content-muted": "#71717a",
    "base-heading": "#fafafa"
  }
}, Bo = [
  "#236aa4",
  "#45a1bf",
  "#a5cdee",
  "#8dacbf",
  "#85c7c6",
  "#d2c6ac",
  "#f4b548",
  "#8f3d56",
  "#71b9f4",
  "#46a485"
];
let Oe = {
  light: {
    colors: To.light,
    colorPalettes: {
      default: Bo
    },
    colorScales: {
      default: ["#ADD8E6", "#00008B"],
      blue: ["#ADD8E6", "#00008B"],
      green: ["#90EE90", "#006400"],
      red: ["#FFB6C1", "#8B0000"],
      orange: ["#FFDAB9", "#FF4500"],
      purple: ["#E6E6FA", "#4B0082"]
    }
  },
  dark: {
    colors: To.dark,
    colorPalettes: {
      default: Bo
    },
    colorScales: {
      default: ["#ADD8E6", "#00008B"],
      blue: ["#ADD8E6", "#00008B"],
      green: ["#90EE90", "#006400"],
      red: ["#FFB6C1", "#8B0000"],
      orange: ["#FFDAB9", "#FF4500"],
      purple: ["#E6E6FA", "#4B0082"]
    }
  }
};
function un(t) {
  t.light && (Oe.light = {
    ...Oe.light,
    ...t.light,
    colors: { ...Oe.light.colors, ...t.light.colors },
    colorPalettes: { ...Oe.light.colorPalettes, ...t.light.colorPalettes },
    colorScales: { ...Oe.light.colorScales, ...t.light.colorScales }
  }), t.dark && (Oe.dark = {
    ...Oe.dark,
    ...t.dark,
    colors: { ...Oe.dark.colors, ...t.dark.colors },
    colorPalettes: { ...Oe.dark.colorPalettes, ...t.dark.colorPalettes },
    colorScales: { ...Oe.dark.colorScales, ...t.dark.colorScales }
  });
}
function ra() {
  return Oe;
}
function la(t) {
  const o = Oe[t], e = o.colors, a = e["base-content-muted"], n = e["base-content-muted"], r = e["base-content-muted"], l = e["base-300"], i = e["base-100"], s = e["base-content-muted"], c = e["base-content-muted"], p = e["base-content-muted"], h = e["base-300"], f = e["base-100"], d = e["base-content"], u = e["base-heading"], m = e["base-content-muted"];
  return {
    darkMode: t === "dark",
    backgroundColor: e["base-100"],
    textStyle: {
      fontFamily: ["Inter", "sans-serif"]
    },
    grid: {
      left: "1%",
      right: "4%",
      bottom: "0%",
      top: "15%",
      containLabel: !0
    },
    color: o.colorPalettes.default,
    title: {
      padding: 0,
      itemGap: 7,
      textStyle: {
        fontSize: 14,
        color: u
      },
      subtextStyle: {
        fontSize: 13,
        color: m,
        overflow: "break"
      },
      top: "1px"
    },
    line: {
      itemStyle: {
        borderWidth: 0
      },
      lineStyle: {
        width: 2,
        join: "round"
      },
      symbolSize: 0,
      symbol: "circle",
      smooth: !1
    },
    radar: {
      itemStyle: {
        borderWidth: 0
      },
      lineStyle: {
        width: 2
      },
      symbolSize: 0,
      symbol: "circle",
      smooth: !1
    },
    pie: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    scatter: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    boxplot: {
      itemStyle: {
        borderWidth: 1.5
      }
    },
    parallel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    sankey: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    funnel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    gauge: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      }
    },
    candlestick: {
      itemStyle: {
        color: "#eb5454",
        color0: "#47b262",
        borderColor: "#eb5454",
        borderColor0: "#47b262",
        borderWidth: 1
      }
    },
    graph: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#cccccc"
      },
      lineStyle: {
        width: 1,
        color: "#aaaaaa"
      },
      symbolSize: 0,
      symbol: "circle",
      smooth: !1,
      color: [
        "#923d59",
        "#488f96",
        "#518eca",
        "#b3a9a0",
        "#ffc857",
        "#495867",
        "#bfdbf7",
        "#bc4749",
        "#eeebd0"
      ],
      label: {
        color: "#f2f2f2"
      }
    },
    map: {
      itemStyle: {
        areaColor: "#eee",
        borderColor: "#444",
        borderWidth: 0.5
      },
      label: {
        color: "#000"
      },
      emphasis: {
        itemStyle: {
          areaColor: "rgba(255,215,0,0.8)",
          borderColor: "#444",
          borderWidth: 1
        },
        label: {
          color: "rgb(100,0,0)"
        }
      }
    },
    geo: {
      itemStyle: {
        areaColor: "#eee",
        borderColor: "#444",
        borderWidth: 0.5
      },
      label: {
        color: "#000"
      },
      emphasis: {
        itemStyle: {
          areaColor: "rgba(255,215,0,0.8)",
          borderColor: "#444",
          borderWidth: 1
        },
        label: {
          color: "rgb(100,0,0)"
        }
      }
    },
    categoryAxis: {
      axisLine: {
        show: !0,
        lineStyle: {
          color: a
        }
      },
      axisTick: {
        show: !1,
        lineStyle: {
          color: n
        },
        length: 3,
        alignWithLabel: !0
      },
      axisLabel: {
        show: !0,
        color: r
      },
      splitLine: {
        show: !1,
        lineStyle: {
          color: [l]
        }
      },
      splitArea: {
        show: !1,
        areaStyle: {
          color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
        }
      }
    },
    valueAxis: {
      axisLine: {
        show: !1,
        lineStyle: {
          color: a
        }
      },
      axisTick: {
        show: !1,
        lineStyle: {
          color: n
        },
        length: 2
      },
      axisLabel: {
        show: !0,
        color: r
      },
      splitLine: {
        show: !0,
        lineStyle: {
          color: [l],
          width: 1
        }
      },
      splitArea: {
        show: !1,
        areaStyle: {
          color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
        }
      },
      nameTextStyle: {
        backgroundColor: i
      }
    },
    logAxis: {
      axisLine: {
        show: !1,
        lineStyle: {
          color: a
        }
      },
      axisTick: {
        show: !1,
        lineStyle: {
          color: n
        },
        length: 2
      },
      axisLabel: {
        show: !0,
        color: r
      },
      splitLine: {
        show: !0,
        lineStyle: {
          color: [l]
        }
      },
      splitArea: {
        show: !1,
        areaStyle: {
          color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
        }
      },
      nameTextStyle: {
        backgroundColor: i
      }
    },
    timeAxis: {
      axisLine: {
        show: !0,
        lineStyle: {
          color: a
        }
      },
      axisTick: {
        show: !0,
        lineStyle: {
          color: n
        },
        length: 3
      },
      axisLabel: {
        show: !0,
        color: r
      },
      splitLine: {
        show: !1,
        lineStyle: {
          color: [l]
        }
      },
      splitArea: {
        show: !1,
        areaStyle: {
          color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
        }
      }
    },
    toolbox: {
      iconStyle: {
        borderColor: "#999999"
      },
      emphasis: {
        iconStyle: {
          borderColor: "#459cde"
        }
      }
    },
    legend: {
      textStyle: {
        padding: [0, 0, 0, -7],
        color: s
      },
      icon: "circle",
      pageIcons: {
        horizontal: [
          "M 17 3 h 2 c 0.386 0 0.738 0.223 0.904 0.572 s 0.115 0.762 -0.13 1.062 L 11.292 15 l 8.482 10.367 c 0.245 0.299 0.295 0.712 0.13 1.062 S 19.386 27 19 27 h -2 c -0.3 0 -0.584 -0.135 -0.774 -0.367 l -9 -11 c -0.301 -0.369 -0.301 -0.898 0 -1.267 l 9 -11 C 16.416 3.135 16.7 3 17 3 Z",
          "M 12 27 h -2 c -0.386 0 -0.738 -0.223 -0.904 -0.572 s -0.115 -0.762 0.13 -1.062 L 17.708 15 L 9.226 4.633 c -0.245 -0.299 -0.295 -0.712 -0.13 -1.062 S 9.614 3 10 3 h 2 c 0.3 0 0.584 0.135 0.774 0.367 l 9 11 c 0.301 0.369 0.301 0.898 0 1.267 l -9 11 C 12.584 26.865 12.3 27 12 27 Z"
        ]
      },
      pageIconColor: c,
      pageIconSize: 12,
      pageTextStyle: {
        color: p
      },
      pageButtonItemGap: -2,
      animationDurationUpdate: 300
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: "#cccccc",
          width: 1
        },
        crossStyle: {
          color: "#cccccc",
          width: 1
        }
      },
      borderRadius: 4,
      borderWidth: 1,
      borderColor: h,
      backgroundColor: f,
      textStyle: {
        color: d,
        fontSize: 12,
        fontWeight: 400
      },
      padding: 6
    },
    timeline: {
      lineStyle: {
        color: "#e3e3e3",
        width: 2
      },
      itemStyle: {
        color: "#d6d6d6",
        borderWidth: 1
      },
      controlStyle: {
        color: "#bfbfbf",
        borderColor: "#bfbfbf",
        borderWidth: 1
      },
      checkpointStyle: {
        color: "#8f8f8f",
        borderColor: "#ffffff"
      },
      label: {
        color: "#c9c9c9"
      },
      emphasis: {
        itemStyle: {
          color: "#9c9c9c"
        },
        controlStyle: {
          color: "#bfbfbf",
          borderColor: "#bfbfbf",
          borderWidth: 1
        },
        label: {
          color: "#c9c9c9"
        }
      }
    },
    visualMap: {
      color: ["#c41621", "#e39588", "#f5ed98"]
    },
    dataZoom: {
      type: "slider",
      bottom: 10,
      height: 30,
      showDetail: !1,
      handleSize: "80%",
      borderColor: l,
      handleStyle: {
        borderColor: l,
        color: l
      },
      moveHandleStyle: {
        borderColor: l,
        color: l
      },
      textStyle: {},
      emphasis: {
        handleStyle: {
          borderColor: l,
          color: l
        },
        moveHandleStyle: {
          borderColor: l,
          color: l
        }
      }
    },
    markPoint: {
      label: {
        color: "#f2f2f2"
      },
      emphasis: {
        label: {
          color: "#f2f2f2"
        }
      }
    }
  };
}
const co = la("light"), uo = la("dark"), Ke = (t, o = 0, e = 1) => po(ho(o, t), e), fo = (t) => {
  t._clipped = !1, t._unclipped = t.slice(0);
  for (let o = 0; o <= 3; o++)
    o < 3 ? ((t[o] < 0 || t[o] > 255) && (t._clipped = !0), t[o] = Ke(t[o], 0, 255)) : o === 3 && (t[o] = Ke(t[o], 0, 1));
  return t;
}, ia = {};
for (let t of [
  "Boolean",
  "Number",
  "String",
  "Function",
  "Array",
  "Date",
  "RegExp",
  "Undefined",
  "Null"
])
  ia[`[object ${t}]`] = t.toLowerCase();
function oe(t) {
  return ia[Object.prototype.toString.call(t)] || "object";
}
const ae = (t, o = null) => t.length >= 3 ? Array.prototype.slice.call(t) : oe(t[0]) == "object" && o ? o.split("").filter((e) => t[0][e] !== void 0).map((e) => t[0][e]) : t[0], Bt = (t) => {
  if (t.length < 2) return null;
  const o = t.length - 1;
  return oe(t[o]) == "string" ? t[o].toLowerCase() : null;
}, { PI: Mt, min: po, max: ho } = Math, Pe = Mt * 2, Pt = Mt / 3, dn = Mt / 180, fn = 180 / Mt, Z = {
  format: {},
  autodetect: []
};
class R {
  constructor(...o) {
    const e = this;
    if (oe(o[0]) === "object" && o[0].constructor && o[0].constructor === this.constructor)
      return o[0];
    let a = Bt(o), n = !1;
    if (!a) {
      n = !0, Z.sorted || (Z.autodetect = Z.autodetect.sort((r, l) => l.p - r.p), Z.sorted = !0);
      for (let r of Z.autodetect)
        if (a = r.test(...o), a) break;
    }
    if (Z.format[a]) {
      const r = Z.format[a].apply(
        null,
        n ? o : o.slice(0, -1)
      );
      e._rgb = fo(r);
    } else
      throw new Error("unknown format: " + o);
    e._rgb.length === 3 && e._rgb.push(1);
  }
  toString() {
    return oe(this.hex) == "function" ? this.hex() : `[${this._rgb.join(",")}]`;
  }
}
const pn = "2.6.0", Y = (...t) => new Y.Color(...t);
Y.Color = R;
Y.version = pn;
const hn = (...t) => {
  t = ae(t, "cmyk");
  const [o, e, a, n] = t, r = t.length > 4 ? t[4] : 1;
  return n === 1 ? [0, 0, 0, r] : [
    o >= 1 ? 0 : 255 * (1 - o) * (1 - n),
    // r
    e >= 1 ? 0 : 255 * (1 - e) * (1 - n),
    // g
    a >= 1 ? 0 : 255 * (1 - a) * (1 - n),
    // b
    r
  ];
}, { max: Mo } = Math, mn = (...t) => {
  let [o, e, a] = ae(t, "rgb");
  o = o / 255, e = e / 255, a = a / 255;
  const n = 1 - Mo(o, Mo(e, a)), r = n < 1 ? 1 / (1 - n) : 0, l = (1 - o - n) * r, i = (1 - e - n) * r, s = (1 - a - n) * r;
  return [l, i, s, n];
};
R.prototype.cmyk = function() {
  return mn(this._rgb);
};
Y.cmyk = (...t) => new R(...t, "cmyk");
Z.format.cmyk = hn;
Z.autodetect.push({
  p: 2,
  test: (...t) => {
    if (t = ae(t, "cmyk"), oe(t) === "array" && t.length === 4)
      return "cmyk";
  }
});
const Rt = (t) => Math.round(t * 100) / 100, bn = (...t) => {
  const o = ae(t, "hsla");
  let e = Bt(t) || "lsa";
  return o[0] = Rt(o[0] || 0), o[1] = Rt(o[1] * 100) + "%", o[2] = Rt(o[2] * 100) + "%", e === "hsla" || o.length > 3 && o[3] < 1 ? (o[3] = o.length > 3 ? o[3] : 1, e = "hsla") : o.length = 3, `${e}(${o.join(",")})`;
}, sa = (...t) => {
  t = ae(t, "rgba");
  let [o, e, a] = t;
  o /= 255, e /= 255, a /= 255;
  const n = po(o, e, a), r = ho(o, e, a), l = (r + n) / 2;
  let i, s;
  return r === n ? (i = 0, s = Number.NaN) : i = l < 0.5 ? (r - n) / (r + n) : (r - n) / (2 - r - n), o == r ? s = (e - a) / (r - n) : e == r ? s = 2 + (a - o) / (r - n) : a == r && (s = 4 + (o - e) / (r - n)), s *= 60, s < 0 && (s += 360), t.length > 3 && t[3] !== void 0 ? [s, i, l, t[3]] : [s, i, l];
}, { round: Nt } = Math, gn = (...t) => {
  const o = ae(t, "rgba");
  let e = Bt(t) || "rgb";
  return e.substr(0, 3) == "hsl" ? bn(sa(o), e) : (o[0] = Nt(o[0]), o[1] = Nt(o[1]), o[2] = Nt(o[2]), (e === "rgba" || o.length > 3 && o[3] < 1) && (o[3] = o.length > 3 ? o[3] : 1, e = "rgba"), `${e}(${o.slice(0, e === "rgb" ? 3 : 4).join(",")})`);
}, { round: jt } = Math, to = (...t) => {
  t = ae(t, "hsl");
  const [o, e, a] = t;
  let n, r, l;
  if (e === 0)
    n = r = l = a * 255;
  else {
    const i = [0, 0, 0], s = [0, 0, 0], c = a < 0.5 ? a * (1 + e) : a + e - a * e, p = 2 * a - c, h = o / 360;
    i[0] = h + 1 / 3, i[1] = h, i[2] = h - 1 / 3;
    for (let f = 0; f < 3; f++)
      i[f] < 0 && (i[f] += 1), i[f] > 1 && (i[f] -= 1), 6 * i[f] < 1 ? s[f] = p + (c - p) * 6 * i[f] : 2 * i[f] < 1 ? s[f] = c : 3 * i[f] < 2 ? s[f] = p + (c - p) * (2 / 3 - i[f]) * 6 : s[f] = p;
    [n, r, l] = [jt(s[0] * 255), jt(s[1] * 255), jt(s[2] * 255)];
  }
  return t.length > 3 ? [n, r, l, t[3]] : [n, r, l, 1];
}, ca = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/, ua = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/, da = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/, fa = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/, pa = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/, ha = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/, { round: _o } = Math, mo = (t) => {
  t = t.toLowerCase().trim();
  let o;
  if (Z.format.named)
    try {
      return Z.format.named(t);
    } catch {
    }
  if (o = t.match(ca)) {
    const e = o.slice(1, 4);
    for (let a = 0; a < 3; a++)
      e[a] = +e[a];
    return e[3] = 1, e;
  }
  if (o = t.match(ua)) {
    const e = o.slice(1, 5);
    for (let a = 0; a < 4; a++)
      e[a] = +e[a];
    return e;
  }
  if (o = t.match(da)) {
    const e = o.slice(1, 4);
    for (let a = 0; a < 3; a++)
      e[a] = _o(e[a] * 2.55);
    return e[3] = 1, e;
  }
  if (o = t.match(fa)) {
    const e = o.slice(1, 5);
    for (let a = 0; a < 3; a++)
      e[a] = _o(e[a] * 2.55);
    return e[3] = +e[3], e;
  }
  if (o = t.match(pa)) {
    const e = o.slice(1, 4);
    e[1] *= 0.01, e[2] *= 0.01;
    const a = to(e);
    return a[3] = 1, a;
  }
  if (o = t.match(ha)) {
    const e = o.slice(1, 4);
    e[1] *= 0.01, e[2] *= 0.01;
    const a = to(e);
    return a[3] = +o[4], a;
  }
};
mo.test = (t) => ca.test(t) || ua.test(t) || da.test(t) || fa.test(t) || pa.test(t) || ha.test(t);
R.prototype.css = function(t) {
  return gn(this._rgb, t);
};
Y.css = (...t) => new R(...t, "css");
Z.format.css = mo;
Z.autodetect.push({
  p: 5,
  test: (t, ...o) => {
    if (!o.length && oe(t) === "string" && mo.test(t))
      return "css";
  }
});
Z.format.gl = (...t) => {
  const o = ae(t, "rgba");
  return o[0] *= 255, o[1] *= 255, o[2] *= 255, o;
};
Y.gl = (...t) => new R(...t, "gl");
R.prototype.gl = function() {
  const t = this._rgb;
  return [t[0] / 255, t[1] / 255, t[2] / 255, t[3]];
};
const { floor: yn } = Math, vn = (...t) => {
  t = ae(t, "hcg");
  let [o, e, a] = t, n, r, l;
  a = a * 255;
  const i = e * 255;
  if (e === 0)
    n = r = l = a;
  else {
    o === 360 && (o = 0), o > 360 && (o -= 360), o < 0 && (o += 360), o /= 60;
    const s = yn(o), c = o - s, p = a * (1 - e), h = p + i * (1 - c), f = p + i * c, d = p + i;
    switch (s) {
      case 0:
        [n, r, l] = [d, f, p];
        break;
      case 1:
        [n, r, l] = [h, d, p];
        break;
      case 2:
        [n, r, l] = [p, d, f];
        break;
      case 3:
        [n, r, l] = [p, h, d];
        break;
      case 4:
        [n, r, l] = [f, p, d];
        break;
      case 5:
        [n, r, l] = [d, p, h];
        break;
    }
  }
  return [n, r, l, t.length > 3 ? t[3] : 1];
}, xn = (...t) => {
  const [o, e, a] = ae(t, "rgb"), n = po(o, e, a), r = ho(o, e, a), l = r - n, i = l * 100 / 255, s = n / (255 - l) * 100;
  let c;
  return l === 0 ? c = Number.NaN : (o === r && (c = (e - a) / l), e === r && (c = 2 + (a - o) / l), a === r && (c = 4 + (o - e) / l), c *= 60, c < 0 && (c += 360)), [c, i, s];
};
R.prototype.hcg = function() {
  return xn(this._rgb);
};
Y.hcg = (...t) => new R(...t, "hcg");
Z.format.hcg = vn;
Z.autodetect.push({
  p: 1,
  test: (...t) => {
    if (t = ae(t, "hcg"), oe(t) === "array" && t.length === 3)
      return "hcg";
  }
});
const wn = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, Cn = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/, ma = (t) => {
  if (t.match(wn)) {
    (t.length === 4 || t.length === 7) && (t = t.substr(1)), t.length === 3 && (t = t.split(""), t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
    const o = parseInt(t, 16), e = o >> 16, a = o >> 8 & 255, n = o & 255;
    return [e, a, n, 1];
  }
  if (t.match(Cn)) {
    (t.length === 5 || t.length === 9) && (t = t.substr(1)), t.length === 4 && (t = t.split(""), t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2] + t[3] + t[3]);
    const o = parseInt(t, 16), e = o >> 24 & 255, a = o >> 16 & 255, n = o >> 8 & 255, r = Math.round((o & 255) / 255 * 100) / 100;
    return [e, a, n, r];
  }
  throw new Error(`unknown hex color: ${t}`);
}, { round: yt } = Math, ba = (...t) => {
  let [o, e, a, n] = ae(t, "rgba"), r = Bt(t) || "auto";
  n === void 0 && (n = 1), r === "auto" && (r = n < 1 ? "rgba" : "rgb"), o = yt(o), e = yt(e), a = yt(a);
  let i = "000000" + (o << 16 | e << 8 | a).toString(16);
  i = i.substr(i.length - 6);
  let s = "0" + yt(n * 255).toString(16);
  switch (s = s.substr(s.length - 2), r.toLowerCase()) {
    case "rgba":
      return `#${i}${s}`;
    case "argb":
      return `#${s}${i}`;
    default:
      return `#${i}`;
  }
};
R.prototype.hex = function(t) {
  return ba(this._rgb, t);
};
Y.hex = (...t) => new R(...t, "hex");
Z.format.hex = ma;
Z.autodetect.push({
  p: 4,
  test: (t, ...o) => {
    if (!o.length && oe(t) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(t.length) >= 0)
      return "hex";
  }
});
const { cos: We } = Math, An = (...t) => {
  t = ae(t, "hsi");
  let [o, e, a] = t, n, r, l;
  return isNaN(o) && (o = 0), isNaN(e) && (e = 0), o > 360 && (o -= 360), o < 0 && (o += 360), o /= 360, o < 1 / 3 ? (l = (1 - e) / 3, n = (1 + e * We(Pe * o) / We(Pt - Pe * o)) / 3, r = 1 - (l + n)) : o < 2 / 3 ? (o -= 1 / 3, n = (1 - e) / 3, r = (1 + e * We(Pe * o) / We(Pt - Pe * o)) / 3, l = 1 - (n + r)) : (o -= 2 / 3, r = (1 - e) / 3, l = (1 + e * We(Pe * o) / We(Pt - Pe * o)) / 3, n = 1 - (r + l)), n = Ke(a * n * 3), r = Ke(a * r * 3), l = Ke(a * l * 3), [n * 255, r * 255, l * 255, t.length > 3 ? t[3] : 1];
}, { min: kn, sqrt: Sn, acos: Tn } = Math, Bn = (...t) => {
  let [o, e, a] = ae(t, "rgb");
  o /= 255, e /= 255, a /= 255;
  let n;
  const r = kn(o, e, a), l = (o + e + a) / 3, i = l > 0 ? 1 - r / l : 0;
  return i === 0 ? n = NaN : (n = (o - e + (o - a)) / 2, n /= Sn((o - e) * (o - e) + (o - a) * (e - a)), n = Tn(n), a > e && (n = Pe - n), n /= Pe), [n * 360, i, l];
};
R.prototype.hsi = function() {
  return Bn(this._rgb);
};
Y.hsi = (...t) => new R(...t, "hsi");
Z.format.hsi = An;
Z.autodetect.push({
  p: 2,
  test: (...t) => {
    if (t = ae(t, "hsi"), oe(t) === "array" && t.length === 3)
      return "hsi";
  }
});
R.prototype.hsl = function() {
  return sa(this._rgb);
};
Y.hsl = (...t) => new R(...t, "hsl");
Z.format.hsl = to;
Z.autodetect.push({
  p: 2,
  test: (...t) => {
    if (t = ae(t, "hsl"), oe(t) === "array" && t.length === 3)
      return "hsl";
  }
});
const { floor: Mn } = Math, _n = (...t) => {
  t = ae(t, "hsv");
  let [o, e, a] = t, n, r, l;
  if (a *= 255, e === 0)
    n = r = l = a;
  else {
    o === 360 && (o = 0), o > 360 && (o -= 360), o < 0 && (o += 360), o /= 60;
    const i = Mn(o), s = o - i, c = a * (1 - e), p = a * (1 - e * s), h = a * (1 - e * (1 - s));
    switch (i) {
      case 0:
        [n, r, l] = [a, h, c];
        break;
      case 1:
        [n, r, l] = [p, a, c];
        break;
      case 2:
        [n, r, l] = [c, a, h];
        break;
      case 3:
        [n, r, l] = [c, p, a];
        break;
      case 4:
        [n, r, l] = [h, c, a];
        break;
      case 5:
        [n, r, l] = [a, c, p];
        break;
    }
  }
  return [n, r, l, t.length > 3 ? t[3] : 1];
}, { min: On, max: $n } = Math, Fn = (...t) => {
  t = ae(t, "rgb");
  let [o, e, a] = t;
  const n = On(o, e, a), r = $n(o, e, a), l = r - n;
  let i, s, c;
  return c = r / 255, r === 0 ? (i = Number.NaN, s = 0) : (s = l / r, o === r && (i = (e - a) / l), e === r && (i = 2 + (a - o) / l), a === r && (i = 4 + (o - e) / l), i *= 60, i < 0 && (i += 360)), [i, s, c];
};
R.prototype.hsv = function() {
  return Fn(this._rgb);
};
Y.hsv = (...t) => new R(...t, "hsv");
Z.format.hsv = _n;
Z.autodetect.push({
  p: 2,
  test: (...t) => {
    if (t = ae(t, "hsv"), oe(t) === "array" && t.length === 3)
      return "hsv";
  }
});
const Be = {
  // Corresponds roughly to RGB brighter/darker
  Kn: 18,
  // D65 standard referent
  Xn: 0.95047,
  Yn: 1,
  Zn: 1.08883,
  t0: 0.137931034,
  // 4 / 29
  t1: 0.206896552,
  // 6 / 29
  t2: 0.12841855,
  // 3 * t1 * t1
  t3: 8856452e-9
  // t1 * t1 * t1
}, { pow: Ln } = Math, ga = (...t) => {
  t = ae(t, "lab");
  const [o, e, a] = t;
  let n, r, l, i, s, c;
  return r = (o + 16) / 116, n = isNaN(e) ? r : r + e / 500, l = isNaN(a) ? r : r - a / 200, r = Be.Yn * Vt(r), n = Be.Xn * Vt(n), l = Be.Zn * Vt(l), i = Gt(3.2404542 * n - 1.5371385 * r - 0.4985314 * l), s = Gt(-0.969266 * n + 1.8760108 * r + 0.041556 * l), c = Gt(0.0556434 * n - 0.2040259 * r + 1.0572252 * l), [i, s, c, t.length > 3 ? t[3] : 1];
}, Gt = (t) => 255 * (t <= 304e-5 ? 12.92 * t : 1.055 * Ln(t, 1 / 2.4) - 0.055), Vt = (t) => t > Be.t1 ? t * t * t : Be.t2 * (t - Be.t0), { pow: ya } = Math, va = (...t) => {
  const [o, e, a] = ae(t, "rgb"), [n, r, l] = In(o, e, a), i = 116 * r - 16;
  return [i < 0 ? 0 : i, 500 * (n - r), 200 * (r - l)];
}, Ht = (t) => (t /= 255) <= 0.04045 ? t / 12.92 : ya((t + 0.055) / 1.055, 2.4), Ut = (t) => t > Be.t3 ? ya(t, 1 / 3) : t / Be.t2 + Be.t0, In = (t, o, e) => {
  t = Ht(t), o = Ht(o), e = Ht(e);
  const a = Ut(
    (0.4124564 * t + 0.3575761 * o + 0.1804375 * e) / Be.Xn
  ), n = Ut(
    (0.2126729 * t + 0.7151522 * o + 0.072175 * e) / Be.Yn
  ), r = Ut(
    (0.0193339 * t + 0.119192 * o + 0.9503041 * e) / Be.Zn
  );
  return [a, n, r];
};
R.prototype.lab = function() {
  return va(this._rgb);
};
Y.lab = (...t) => new R(...t, "lab");
Z.format.lab = ga;
Z.autodetect.push({
  p: 2,
  test: (...t) => {
    if (t = ae(t, "lab"), oe(t) === "array" && t.length === 3)
      return "lab";
  }
});
const { sin: Dn, cos: zn } = Math, xa = (...t) => {
  let [o, e, a] = ae(t, "lch");
  return isNaN(a) && (a = 0), a = a * dn, [o, zn(a) * e, Dn(a) * e];
}, wa = (...t) => {
  t = ae(t, "lch");
  const [o, e, a] = t, [n, r, l] = xa(o, e, a), [i, s, c] = ga(n, r, l);
  return [i, s, c, t.length > 3 ? t[3] : 1];
}, En = (...t) => {
  const o = ae(t, "hcl").reverse();
  return wa(...o);
}, { sqrt: Pn, atan2: Rn, round: Nn } = Math, Ca = (...t) => {
  const [o, e, a] = ae(t, "lab"), n = Pn(e * e + a * a);
  let r = (Rn(a, e) * fn + 360) % 360;
  return Nn(n * 1e4) === 0 && (r = Number.NaN), [o, n, r];
}, Aa = (...t) => {
  const [o, e, a] = ae(t, "rgb"), [n, r, l] = va(o, e, a);
  return Ca(n, r, l);
};
R.prototype.lch = function() {
  return Aa(this._rgb);
};
R.prototype.hcl = function() {
  return Aa(this._rgb).reverse();
};
Y.lch = (...t) => new R(...t, "lch");
Y.hcl = (...t) => new R(...t, "hcl");
Z.format.lch = wa;
Z.format.hcl = En;
["lch", "hcl"].forEach(
  (t) => Z.autodetect.push({
    p: 2,
    test: (...o) => {
      if (o = ae(o, t), oe(o) === "array" && o.length === 3)
        return t;
    }
  })
);
const et = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  laserlemon: "#ffff54",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrod: "#fafad2",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  maroon2: "#7f0000",
  maroon3: "#b03060",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  purple2: "#7f007f",
  purple3: "#a020f0",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
R.prototype.name = function() {
  const t = ba(this._rgb, "rgb");
  for (let o of Object.keys(et))
    if (et[o] === t) return o.toLowerCase();
  return t;
};
Z.format.named = (t) => {
  if (t = t.toLowerCase(), et[t]) return ma(et[t]);
  throw new Error("unknown color name: " + t);
};
Z.autodetect.push({
  p: 5,
  test: (t, ...o) => {
    if (!o.length && oe(t) === "string" && et[t.toLowerCase()])
      return "named";
  }
});
const jn = (t) => {
  if (oe(t) == "number" && t >= 0 && t <= 16777215) {
    const o = t >> 16, e = t >> 8 & 255, a = t & 255;
    return [o, e, a, 1];
  }
  throw new Error("unknown num color: " + t);
}, Gn = (...t) => {
  const [o, e, a] = ae(t, "rgb");
  return (o << 16) + (e << 8) + a;
};
R.prototype.num = function() {
  return Gn(this._rgb);
};
Y.num = (...t) => new R(...t, "num");
Z.format.num = jn;
Z.autodetect.push({
  p: 5,
  test: (...t) => {
    if (t.length === 1 && oe(t[0]) === "number" && t[0] >= 0 && t[0] <= 16777215)
      return "num";
  }
});
const { round: ka } = Math;
R.prototype.rgb = function(t = !0) {
  return t === !1 ? this._rgb.slice(0, 3) : this._rgb.slice(0, 3).map(ka);
};
R.prototype.rgba = function(t = !0) {
  return this._rgb.slice(0, 4).map((o, e) => e < 3 ? t === !1 ? o : ka(o) : o);
};
Y.rgb = (...t) => new R(...t, "rgb");
Z.format.rgb = (...t) => {
  const o = ae(t, "rgba");
  return o[3] === void 0 && (o[3] = 1), o;
};
Z.autodetect.push({
  p: 3,
  test: (...t) => {
    if (t = ae(t, "rgba"), oe(t) === "array" && (t.length === 3 || t.length === 4 && oe(t[3]) == "number" && t[3] >= 0 && t[3] <= 1))
      return "rgb";
  }
});
const { log: vt } = Math, Sa = (t) => {
  const o = t / 100;
  let e, a, n;
  return o < 66 ? (e = 255, a = o < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (a = o - 2) + 104.49216199393888 * vt(a), n = o < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (n = o - 10) + 115.67994401066147 * vt(n)) : (e = 351.97690566805693 + 0.114206453784165 * (e = o - 55) - 40.25366309332127 * vt(e), a = 325.4494125711974 + 0.07943456536662342 * (a = o - 50) - 28.0852963507957 * vt(a), n = 255), [e, a, n, 1];
}, { round: Vn } = Math, Hn = (...t) => {
  const o = ae(t, "rgb"), e = o[0], a = o[2];
  let n = 1e3, r = 4e4;
  const l = 0.4;
  let i;
  for (; r - n > l; ) {
    i = (r + n) * 0.5;
    const s = Sa(i);
    s[2] / s[0] >= a / e ? r = i : n = i;
  }
  return Vn(i);
};
R.prototype.temp = R.prototype.kelvin = R.prototype.temperature = function() {
  return Hn(this._rgb);
};
Y.temp = Y.kelvin = Y.temperature = (...t) => new R(...t, "temp");
Z.format.temp = Z.format.kelvin = Z.format.temperature = Sa;
const { pow: Ct, sign: Un } = Math, Ta = (...t) => {
  t = ae(t, "lab");
  const [o, e, a] = t, n = Ct(o + 0.3963377774 * e + 0.2158037573 * a, 3), r = Ct(o - 0.1055613458 * e - 0.0638541728 * a, 3), l = Ct(o - 0.0894841775 * e - 1.291485548 * a, 3);
  return [
    255 * Xt(4.0767416621 * n - 3.3077115913 * r + 0.2309699292 * l),
    255 * Xt(-1.2684380046 * n + 2.6097574011 * r - 0.3413193965 * l),
    255 * Xt(-0.0041960863 * n - 0.7034186147 * r + 1.707614701 * l),
    t.length > 3 ? t[3] : 1
  ];
};
function Xt(t) {
  const o = Math.abs(t);
  return o > 31308e-7 ? (Un(t) || 1) * (1.055 * Ct(o, 1 / 2.4) - 0.055) : t * 12.92;
}
const { cbrt: Yt, pow: Xn, sign: Yn } = Math, Ba = (...t) => {
  const [o, e, a] = ae(t, "rgb"), [n, r, l] = [
    Wt(o / 255),
    Wt(e / 255),
    Wt(a / 255)
  ], i = Yt(0.4122214708 * n + 0.5363325363 * r + 0.0514459929 * l), s = Yt(0.2119034982 * n + 0.6806995451 * r + 0.1073969566 * l), c = Yt(0.0883024619 * n + 0.2817188376 * r + 0.6299787005 * l);
  return [
    0.2104542553 * i + 0.793617785 * s - 0.0040720468 * c,
    1.9779984951 * i - 2.428592205 * s + 0.4505937099 * c,
    0.0259040371 * i + 0.7827717662 * s - 0.808675766 * c
  ];
};
function Wt(t) {
  const o = Math.abs(t);
  return o < 0.04045 ? t / 12.92 : (Yn(t) || 1) * Xn((o + 0.055) / 1.055, 2.4);
}
R.prototype.oklab = function() {
  return Ba(this._rgb);
};
Y.oklab = (...t) => new R(...t, "oklab");
Z.format.oklab = Ta;
Z.autodetect.push({
  p: 3,
  test: (...t) => {
    if (t = ae(t, "oklab"), oe(t) === "array" && t.length === 3)
      return "oklab";
  }
});
const Wn = (...t) => {
  t = ae(t, "lch");
  const [o, e, a] = t, [n, r, l] = xa(o, e, a), [i, s, c] = Ta(n, r, l);
  return [i, s, c, t.length > 3 ? t[3] : 1];
}, qn = (...t) => {
  const [o, e, a] = ae(t, "rgb"), [n, r, l] = Ba(o, e, a);
  return Ca(n, r, l);
};
R.prototype.oklch = function() {
  return qn(this._rgb);
};
Y.oklch = (...t) => new R(...t, "oklch");
Z.format.oklch = Wn;
Z.autodetect.push({
  p: 3,
  test: (...t) => {
    if (t = ae(t, "oklch"), oe(t) === "array" && t.length === 3)
      return "oklch";
  }
});
R.prototype.alpha = function(t, o = !1) {
  return t !== void 0 && oe(t) === "number" ? o ? (this._rgb[3] = t, this) : new R([this._rgb[0], this._rgb[1], this._rgb[2], t], "rgb") : this._rgb[3];
};
R.prototype.clipped = function() {
  return this._rgb._clipped || !1;
};
R.prototype.darken = function(t = 1) {
  const o = this, e = o.lab();
  return e[0] -= Be.Kn * t, new R(e, "lab").alpha(o.alpha(), !0);
};
R.prototype.brighten = function(t = 1) {
  return this.darken(-t);
};
R.prototype.darker = R.prototype.darken;
R.prototype.brighter = R.prototype.brighten;
R.prototype.get = function(t) {
  const [o, e] = t.split("."), a = this[o]();
  if (e) {
    const n = o.indexOf(e) - (o.substr(0, 2) === "ok" ? 2 : 0);
    if (n > -1) return a[n];
    throw new Error(`unknown channel ${e} in mode ${o}`);
  } else
    return a;
};
const { pow: Zn } = Math, Jn = 1e-7, Kn = 20;
R.prototype.luminance = function(t, o = "rgb") {
  if (t !== void 0 && oe(t) === "number") {
    if (t === 0)
      return new R([0, 0, 0, this._rgb[3]], "rgb");
    if (t === 1)
      return new R([255, 255, 255, this._rgb[3]], "rgb");
    let e = this.luminance(), a = Kn;
    const n = (l, i) => {
      const s = l.interpolate(i, 0.5, o), c = s.luminance();
      return Math.abs(t - c) < Jn || !a-- ? s : c > t ? n(l, s) : n(s, i);
    }, r = (e > t ? n(new R([0, 0, 0]), this) : n(this, new R([255, 255, 255]))).rgb();
    return new R([...r, this._rgb[3]]);
  }
  return Qn(...this._rgb.slice(0, 3));
};
const Qn = (t, o, e) => (t = qt(t), o = qt(o), e = qt(e), 0.2126 * t + 0.7152 * o + 0.0722 * e), qt = (t) => (t /= 255, t <= 0.03928 ? t / 12.92 : Zn((t + 0.055) / 1.055, 2.4)), xe = {}, ut = (t, o, e = 0.5, ...a) => {
  let n = a[0] || "lrgb";
  if (!xe[n] && !a.length && (n = Object.keys(xe)[0]), !xe[n])
    throw new Error(`interpolation mode ${n} is not defined`);
  return oe(t) !== "object" && (t = new R(t)), oe(o) !== "object" && (o = new R(o)), xe[n](t, o, e).alpha(
    t.alpha() + e * (o.alpha() - t.alpha())
  );
};
R.prototype.mix = R.prototype.interpolate = function(t, o = 0.5, ...e) {
  return ut(this, t, o, ...e);
};
R.prototype.premultiply = function(t = !1) {
  const o = this._rgb, e = o[3];
  return t ? (this._rgb = [o[0] * e, o[1] * e, o[2] * e, e], this) : new R([o[0] * e, o[1] * e, o[2] * e, e], "rgb");
};
R.prototype.saturate = function(t = 1) {
  const o = this, e = o.lch();
  return e[1] += Be.Kn * t, e[1] < 0 && (e[1] = 0), new R(e, "lch").alpha(o.alpha(), !0);
};
R.prototype.desaturate = function(t = 1) {
  return this.saturate(-t);
};
R.prototype.set = function(t, o, e = !1) {
  const [a, n] = t.split("."), r = this[a]();
  if (n) {
    const l = a.indexOf(n) - (a.substr(0, 2) === "ok" ? 2 : 0);
    if (l > -1) {
      if (oe(o) == "string")
        switch (o.charAt(0)) {
          case "+":
            r[l] += +o;
            break;
          case "-":
            r[l] += +o;
            break;
          case "*":
            r[l] *= +o.substr(1);
            break;
          case "/":
            r[l] /= +o.substr(1);
            break;
          default:
            r[l] = +o;
        }
      else if (oe(o) === "number")
        r[l] = o;
      else
        throw new Error("unsupported value for Color.set");
      const i = new R(r, a);
      return e ? (this._rgb = i._rgb, this) : i;
    }
    throw new Error(`unknown channel ${n} in mode ${a}`);
  } else
    return r;
};
R.prototype.tint = function(t = 0.5, ...o) {
  return ut(this, "white", t, ...o);
};
R.prototype.shade = function(t = 0.5, ...o) {
  return ut(this, "black", t, ...o);
};
const er = (t, o, e) => {
  const a = t._rgb, n = o._rgb;
  return new R(
    a[0] + e * (n[0] - a[0]),
    a[1] + e * (n[1] - a[1]),
    a[2] + e * (n[2] - a[2]),
    "rgb"
  );
};
xe.rgb = er;
const { sqrt: Zt, pow: qe } = Math, tr = (t, o, e) => {
  const [a, n, r] = t._rgb, [l, i, s] = o._rgb;
  return new R(
    Zt(qe(a, 2) * (1 - e) + qe(l, 2) * e),
    Zt(qe(n, 2) * (1 - e) + qe(i, 2) * e),
    Zt(qe(r, 2) * (1 - e) + qe(s, 2) * e),
    "rgb"
  );
};
xe.lrgb = tr;
const or = (t, o, e) => {
  const a = t.lab(), n = o.lab();
  return new R(
    a[0] + e * (n[0] - a[0]),
    a[1] + e * (n[1] - a[1]),
    a[2] + e * (n[2] - a[2]),
    "lab"
  );
};
xe.lab = or;
const at = (t, o, e, a) => {
  let n, r;
  a === "hsl" ? (n = t.hsl(), r = o.hsl()) : a === "hsv" ? (n = t.hsv(), r = o.hsv()) : a === "hcg" ? (n = t.hcg(), r = o.hcg()) : a === "hsi" ? (n = t.hsi(), r = o.hsi()) : a === "lch" || a === "hcl" ? (a = "hcl", n = t.hcl(), r = o.hcl()) : a === "oklch" && (n = t.oklch().reverse(), r = o.oklch().reverse());
  let l, i, s, c, p, h;
  (a.substr(0, 1) === "h" || a === "oklch") && ([l, s, p] = n, [i, c, h] = r);
  let f, d, u, m;
  return !isNaN(l) && !isNaN(i) ? (i > l && i - l > 180 ? m = i - (l + 360) : i < l && l - i > 180 ? m = i + 360 - l : m = i - l, d = l + e * m) : isNaN(l) ? isNaN(i) ? d = Number.NaN : (d = i, (p == 1 || p == 0) && a != "hsv" && (f = c)) : (d = l, (h == 1 || h == 0) && a != "hsv" && (f = s)), f === void 0 && (f = s + e * (c - s)), u = p + e * (h - p), a === "oklch" ? new R([u, f, d], a) : new R([d, f, u], a);
}, Ma = (t, o, e) => at(t, o, e, "lch");
xe.lch = Ma;
xe.hcl = Ma;
const ar = (t, o, e) => {
  const a = t.num(), n = o.num();
  return new R(a + e * (n - a), "num");
};
xe.num = ar;
const nr = (t, o, e) => at(t, o, e, "hcg");
xe.hcg = nr;
const rr = (t, o, e) => at(t, o, e, "hsi");
xe.hsi = rr;
const lr = (t, o, e) => at(t, o, e, "hsl");
xe.hsl = lr;
const ir = (t, o, e) => at(t, o, e, "hsv");
xe.hsv = ir;
const sr = (t, o, e) => {
  const a = t.oklab(), n = o.oklab();
  return new R(
    a[0] + e * (n[0] - a[0]),
    a[1] + e * (n[1] - a[1]),
    a[2] + e * (n[2] - a[2]),
    "oklab"
  );
};
xe.oklab = sr;
const cr = (t, o, e) => at(t, o, e, "oklch");
xe.oklch = cr;
const { pow: Jt, sqrt: Kt, PI: Qt, cos: Oo, sin: $o, atan2: ur } = Math, dr = (t, o = "lrgb", e = null) => {
  const a = t.length;
  e || (e = Array.from(new Array(a)).map(() => 1));
  const n = a / e.reduce(function(h, f) {
    return h + f;
  });
  if (e.forEach((h, f) => {
    e[f] *= n;
  }), t = t.map((h) => new R(h)), o === "lrgb")
    return fr(t, e);
  const r = t.shift(), l = r.get(o), i = [];
  let s = 0, c = 0;
  for (let h = 0; h < l.length; h++)
    if (l[h] = (l[h] || 0) * e[0], i.push(isNaN(l[h]) ? 0 : e[0]), o.charAt(h) === "h" && !isNaN(l[h])) {
      const f = l[h] / 180 * Qt;
      s += Oo(f) * e[0], c += $o(f) * e[0];
    }
  let p = r.alpha() * e[0];
  t.forEach((h, f) => {
    const d = h.get(o);
    p += h.alpha() * e[f + 1];
    for (let u = 0; u < l.length; u++)
      if (!isNaN(d[u]))
        if (i[u] += e[f + 1], o.charAt(u) === "h") {
          const m = d[u] / 180 * Qt;
          s += Oo(m) * e[f + 1], c += $o(m) * e[f + 1];
        } else
          l[u] += d[u] * e[f + 1];
  });
  for (let h = 0; h < l.length; h++)
    if (o.charAt(h) === "h") {
      let f = ur(c / i[h], s / i[h]) / Qt * 180;
      for (; f < 0; ) f += 360;
      for (; f >= 360; ) f -= 360;
      l[h] = f;
    } else
      l[h] = l[h] / i[h];
  return p /= a, new R(l, o).alpha(p > 0.99999 ? 1 : p, !0);
}, fr = (t, o) => {
  const e = t.length, a = [0, 0, 0, 0];
  for (let n = 0; n < t.length; n++) {
    const r = t[n], l = o[n] / e, i = r._rgb;
    a[0] += Jt(i[0], 2) * l, a[1] += Jt(i[1], 2) * l, a[2] += Jt(i[2], 2) * l, a[3] += i[3] * l;
  }
  return a[0] = Kt(a[0]), a[1] = Kt(a[1]), a[2] = Kt(a[2]), a[3] > 0.9999999 && (a[3] = 1), new R(fo(a));
}, { pow: pr } = Math;
function St(t) {
  let o = "rgb", e = Y("#ccc"), a = 0, n = [0, 1], r = [], l = [0, 0], i = !1, s = [], c = !1, p = 0, h = 1, f = !1, d = {}, u = !0, m = 1;
  const C = function(v) {
    if (v = v || ["#fff", "#000"], v && oe(v) === "string" && Y.brewer && Y.brewer[v.toLowerCase()] && (v = Y.brewer[v.toLowerCase()]), oe(v) === "array") {
      v.length === 1 && (v = [v[0], v[0]]), v = v.slice(0);
      for (let L = 0; L < v.length; L++)
        v[L] = Y(v[L]);
      r.length = 0;
      for (let L = 0; L < v.length; L++)
        r.push(L / (v.length - 1));
    }
    return z(), s = v;
  }, g = function(v) {
    if (i != null) {
      const L = i.length - 1;
      let T = 0;
      for (; T < L && v >= i[T]; )
        T++;
      return T - 1;
    }
    return 0;
  };
  let y = (v) => v, O = (v) => v;
  const M = function(v, L) {
    let T, b;
    if (L == null && (L = !1), isNaN(v) || v === null)
      return e;
    L ? b = v : i && i.length > 2 ? b = g(v) / (i.length - 2) : h !== p ? b = (v - p) / (h - p) : b = 1, b = O(b), L || (b = y(b)), m !== 1 && (b = pr(b, m)), b = l[0] + b * (1 - l[0] - l[1]), b = Ke(b, 0, 1);
    const $ = Math.floor(b * 1e4);
    if (u && d[$])
      T = d[$];
    else {
      if (oe(s) === "array")
        for (let D = 0; D < r.length; D++) {
          const V = r[D];
          if (b <= V) {
            T = s[D];
            break;
          }
          if (b >= V && D === r.length - 1) {
            T = s[D];
            break;
          }
          if (b > V && b < r[D + 1]) {
            b = (b - V) / (r[D + 1] - V), T = Y.interpolate(
              s[D],
              s[D + 1],
              b,
              o
            );
            break;
          }
        }
      else oe(s) === "function" && (T = s(b));
      u && (d[$] = T);
    }
    return T;
  };
  var z = () => d = {};
  C(t);
  const I = function(v) {
    const L = Y(M(v));
    return c && L[c] ? L[c]() : L;
  };
  return I.classes = function(v) {
    if (v != null) {
      if (oe(v) === "array")
        i = v, n = [v[0], v[v.length - 1]];
      else {
        const L = Y.analyze(n);
        v === 0 ? i = [L.min, L.max] : i = Y.limits(L, "e", v);
      }
      return I;
    }
    return i;
  }, I.domain = function(v) {
    if (!arguments.length)
      return n;
    p = v[0], h = v[v.length - 1], r = [];
    const L = s.length;
    if (v.length === L && p !== h)
      for (let T of Array.from(v))
        r.push((T - p) / (h - p));
    else {
      for (let T = 0; T < L; T++)
        r.push(T / (L - 1));
      if (v.length > 2) {
        const T = v.map(($, D) => D / (v.length - 1)), b = v.map(($) => ($ - p) / (h - p));
        b.every(($, D) => T[D] === $) || (O = ($) => {
          if ($ <= 0 || $ >= 1) return $;
          let D = 0;
          for (; $ >= b[D + 1]; ) D++;
          const V = ($ - b[D]) / (b[D + 1] - b[D]);
          return T[D] + V * (T[D + 1] - T[D]);
        });
      }
    }
    return n = [p, h], I;
  }, I.mode = function(v) {
    return arguments.length ? (o = v, z(), I) : o;
  }, I.range = function(v, L) {
    return C(v), I;
  }, I.out = function(v) {
    return c = v, I;
  }, I.spread = function(v) {
    return arguments.length ? (a = v, I) : a;
  }, I.correctLightness = function(v) {
    return v == null && (v = !0), f = v, z(), f ? y = function(L) {
      const T = M(0, !0).lab()[0], b = M(1, !0).lab()[0], $ = T > b;
      let D = M(L, !0).lab()[0];
      const V = T + (b - T) * L;
      let W = D - V, le = 0, ve = 1, me = 20;
      for (; Math.abs(W) > 0.01 && me-- > 0; )
        (function() {
          return $ && (W *= -1), W < 0 ? (le = L, L += (ve - L) * 0.5) : (ve = L, L += (le - L) * 0.5), D = M(L, !0).lab()[0], W = D - V;
        })();
      return L;
    } : y = (L) => L, I;
  }, I.padding = function(v) {
    return v != null ? (oe(v) === "number" && (v = [v, v]), l = v, I) : l;
  }, I.colors = function(v, L) {
    arguments.length < 2 && (L = "hex");
    let T = [];
    if (arguments.length === 0)
      T = s.slice(0);
    else if (v === 1)
      T = [I(0.5)];
    else if (v > 1) {
      const b = n[0], $ = n[1] - b;
      T = hr(0, v).map(
        (D) => I(b + D / (v - 1) * $)
      );
    } else {
      t = [];
      let b = [];
      if (i && i.length > 2)
        for (let $ = 1, D = i.length, V = 1 <= D; V ? $ < D : $ > D; V ? $++ : $--)
          b.push((i[$ - 1] + i[$]) * 0.5);
      else
        b = n;
      T = b.map(($) => I($));
    }
    return Y[L] && (T = T.map((b) => b[L]())), T;
  }, I.cache = function(v) {
    return v != null ? (u = v, I) : u;
  }, I.gamma = function(v) {
    return v != null ? (m = v, I) : m;
  }, I.nodata = function(v) {
    return v != null ? (e = Y(v), I) : e;
  }, I;
}
function hr(t, o, e) {
  let a = [], n = t < o, r = o;
  for (let l = t; n ? l < r : l > r; n ? l++ : l--)
    a.push(l);
  return a;
}
const mr = function(t) {
  let o = [1, 1];
  for (let e = 1; e < t; e++) {
    let a = [1];
    for (let n = 1; n <= o.length; n++)
      a[n] = (o[n] || 0) + o[n - 1];
    o = a;
  }
  return o;
}, br = function(t) {
  let o, e, a, n;
  if (t = t.map((r) => new R(r)), t.length === 2)
    [e, a] = t.map((r) => r.lab()), o = function(r) {
      const l = [0, 1, 2].map((i) => e[i] + r * (a[i] - e[i]));
      return new R(l, "lab");
    };
  else if (t.length === 3)
    [e, a, n] = t.map((r) => r.lab()), o = function(r) {
      const l = [0, 1, 2].map(
        (i) => (1 - r) * (1 - r) * e[i] + 2 * (1 - r) * r * a[i] + r * r * n[i]
      );
      return new R(l, "lab");
    };
  else if (t.length === 4) {
    let r;
    [e, a, n, r] = t.map((l) => l.lab()), o = function(l) {
      const i = [0, 1, 2].map(
        (s) => (1 - l) * (1 - l) * (1 - l) * e[s] + 3 * (1 - l) * (1 - l) * l * a[s] + 3 * (1 - l) * l * l * n[s] + l * l * l * r[s]
      );
      return new R(i, "lab");
    };
  } else if (t.length >= 5) {
    let r, l, i;
    r = t.map((s) => s.lab()), i = t.length - 1, l = mr(i), o = function(s) {
      const c = 1 - s, p = [0, 1, 2].map(
        (h) => r.reduce(
          (f, d, u) => f + l[u] * c ** (i - u) * s ** u * d[h],
          0
        )
      );
      return new R(p, "lab");
    };
  } else
    throw new RangeError("No point in running bezier with only one color.");
  return o;
}, gr = (t) => {
  const o = br(t);
  return o.scale = () => St(o), o;
}, Le = (t, o, e) => {
  if (!Le[e])
    throw new Error("unknown blend mode " + e);
  return Le[e](t, o);
}, je = (t) => (o, e) => {
  const a = Y(e).rgb(), n = Y(o).rgb();
  return Y.rgb(t(a, n));
}, Ge = (t) => (o, e) => {
  const a = [];
  return a[0] = t(o[0], e[0]), a[1] = t(o[1], e[1]), a[2] = t(o[2], e[2]), a;
}, yr = (t) => t, vr = (t, o) => t * o / 255, xr = (t, o) => t > o ? o : t, wr = (t, o) => t > o ? t : o, Cr = (t, o) => 255 * (1 - (1 - t / 255) * (1 - o / 255)), Ar = (t, o) => o < 128 ? 2 * t * o / 255 : 255 * (1 - 2 * (1 - t / 255) * (1 - o / 255)), kr = (t, o) => 255 * (1 - (1 - o / 255) / (t / 255)), Sr = (t, o) => t === 255 ? 255 : (t = 255 * (o / 255) / (1 - t / 255), t > 255 ? 255 : t);
Le.normal = je(Ge(yr));
Le.multiply = je(Ge(vr));
Le.screen = je(Ge(Cr));
Le.overlay = je(Ge(Ar));
Le.darken = je(Ge(xr));
Le.lighten = je(Ge(wr));
Le.dodge = je(Ge(Sr));
Le.burn = je(Ge(kr));
const { pow: Tr, sin: Br, cos: Mr } = Math;
function _r(t = 300, o = -1.5, e = 1, a = 1, n = [0, 1]) {
  let r = 0, l;
  oe(n) === "array" ? l = n[1] - n[0] : (l = 0, n = [n, n]);
  const i = function(s) {
    const c = Pe * ((t + 120) / 360 + o * s), p = Tr(n[0] + l * s, a), f = (r !== 0 ? e[0] + s * r : e) * p * (1 - p) / 2, d = Mr(c), u = Br(c), m = p + f * (-0.14861 * d + 1.78277 * u), C = p + f * (-0.29227 * d - 0.90649 * u), g = p + f * (1.97294 * d);
    return Y(fo([m * 255, C * 255, g * 255, 1]));
  };
  return i.start = function(s) {
    return s == null ? t : (t = s, i);
  }, i.rotations = function(s) {
    return s == null ? o : (o = s, i);
  }, i.gamma = function(s) {
    return s == null ? a : (a = s, i);
  }, i.hue = function(s) {
    return s == null ? e : (e = s, oe(e) === "array" ? (r = e[1] - e[0], r === 0 && (e = e[1])) : r = 0, i);
  }, i.lightness = function(s) {
    return s == null ? n : (oe(s) === "array" ? (n = s, l = s[1] - s[0]) : (n = [s, s], l = 0), i);
  }, i.scale = () => Y.scale(i), i.hue(e), i;
}
const Or = "0123456789abcdef", { floor: $r, random: Fr } = Math, Lr = () => {
  let t = "#";
  for (let o = 0; o < 6; o++)
    t += Or.charAt($r(Fr() * 16));
  return new R(t, "hex");
}, { log: Fo, pow: Ir, floor: Dr, abs: zr } = Math;
function _a(t, o = null) {
  const e = {
    min: Number.MAX_VALUE,
    max: Number.MAX_VALUE * -1,
    sum: 0,
    values: [],
    count: 0
  };
  return oe(t) === "object" && (t = Object.values(t)), t.forEach((a) => {
    o && oe(a) === "object" && (a = a[o]), a != null && !isNaN(a) && (e.values.push(a), e.sum += a, a < e.min && (e.min = a), a > e.max && (e.max = a), e.count += 1);
  }), e.domain = [e.min, e.max], e.limits = (a, n) => Oa(e, a, n), e;
}
function Oa(t, o = "equal", e = 7) {
  oe(t) == "array" && (t = _a(t));
  const { min: a, max: n } = t, r = t.values.sort((i, s) => i - s);
  if (e === 1)
    return [a, n];
  const l = [];
  if (o.substr(0, 1) === "c" && (l.push(a), l.push(n)), o.substr(0, 1) === "e") {
    l.push(a);
    for (let i = 1; i < e; i++)
      l.push(a + i / e * (n - a));
    l.push(n);
  } else if (o.substr(0, 1) === "l") {
    if (a <= 0)
      throw new Error(
        "Logarithmic scales are only possible for values > 0"
      );
    const i = Math.LOG10E * Fo(a), s = Math.LOG10E * Fo(n);
    l.push(a);
    for (let c = 1; c < e; c++)
      l.push(Ir(10, i + c / e * (s - i)));
    l.push(n);
  } else if (o.substr(0, 1) === "q") {
    l.push(a);
    for (let i = 1; i < e; i++) {
      const s = (r.length - 1) * i / e, c = Dr(s);
      if (c === s)
        l.push(r[c]);
      else {
        const p = s - c;
        l.push(r[c] * (1 - p) + r[c + 1] * p);
      }
    }
    l.push(n);
  } else if (o.substr(0, 1) === "k") {
    let i;
    const s = r.length, c = new Array(s), p = new Array(e);
    let h = !0, f = 0, d = null;
    d = [], d.push(a);
    for (let C = 1; C < e; C++)
      d.push(a + C / e * (n - a));
    for (d.push(n); h; ) {
      for (let g = 0; g < e; g++)
        p[g] = 0;
      for (let g = 0; g < s; g++) {
        const y = r[g];
        let O = Number.MAX_VALUE, M;
        for (let z = 0; z < e; z++) {
          const I = zr(d[z] - y);
          I < O && (O = I, M = z), p[M]++, c[g] = M;
        }
      }
      const C = new Array(e);
      for (let g = 0; g < e; g++)
        C[g] = null;
      for (let g = 0; g < s; g++)
        i = c[g], C[i] === null ? C[i] = r[g] : C[i] += r[g];
      for (let g = 0; g < e; g++)
        C[g] *= 1 / p[g];
      h = !1;
      for (let g = 0; g < e; g++)
        if (C[g] !== d[g]) {
          h = !0;
          break;
        }
      d = C, f++, f > 200 && (h = !1);
    }
    const u = {};
    for (let C = 0; C < e; C++)
      u[C] = [];
    for (let C = 0; C < s; C++)
      i = c[C], u[i].push(r[C]);
    let m = [];
    for (let C = 0; C < e; C++)
      m.push(u[C][0]), m.push(u[C][u[C].length - 1]);
    m = m.sort((C, g) => C - g), l.push(m[0]);
    for (let C = 1; C < m.length; C += 2) {
      const g = m[C];
      !isNaN(g) && l.indexOf(g) === -1 && l.push(g);
    }
  }
  return l;
}
const Er = (t, o) => {
  t = new R(t), o = new R(o);
  const e = t.luminance(), a = o.luminance();
  return e > a ? (e + 0.05) / (a + 0.05) : (a + 0.05) / (e + 0.05);
}, { sqrt: Ee, pow: be, min: Pr, max: Rr, atan2: Lo, abs: Io, cos: xt, sin: Do, exp: Nr, PI: zo } = Math;
function jr(t, o, e = 1, a = 1, n = 1) {
  var r = function(Xe) {
    return 360 * Xe / (2 * zo);
  }, l = function(Xe) {
    return 2 * zo * Xe / 360;
  };
  t = new R(t), o = new R(o);
  const [i, s, c] = Array.from(t.lab()), [p, h, f] = Array.from(o.lab()), d = (i + p) / 2, u = Ee(be(s, 2) + be(c, 2)), m = Ee(be(h, 2) + be(f, 2)), C = (u + m) / 2, g = 0.5 * (1 - Ee(be(C, 7) / (be(C, 7) + be(25, 7)))), y = s * (1 + g), O = h * (1 + g), M = Ee(be(y, 2) + be(c, 2)), z = Ee(be(O, 2) + be(f, 2)), I = (M + z) / 2, v = r(Lo(c, y)), L = r(Lo(f, O)), T = v >= 0 ? v : v + 360, b = L >= 0 ? L : L + 360, $ = Io(T - b) > 180 ? (T + b + 360) / 2 : (T + b) / 2, D = 1 - 0.17 * xt(l($ - 30)) + 0.24 * xt(l(2 * $)) + 0.32 * xt(l(3 * $ + 6)) - 0.2 * xt(l(4 * $ - 63));
  let V = b - T;
  V = Io(V) <= 180 ? V : b <= T ? V + 360 : V - 360, V = 2 * Ee(M * z) * Do(l(V) / 2);
  const W = p - i, le = z - M, ve = 1 + 0.015 * be(d - 50, 2) / Ee(20 + be(d - 50, 2)), me = 1 + 0.045 * I, ge = 1 + 0.015 * I * D, Ie = 30 * Nr(-be(($ - 275) / 25, 2)), mt = -(2 * Ee(be(I, 7) / (be(I, 7) + be(25, 7)))) * Do(2 * l(Ie)), bt = Ee(
    be(W / (e * ve), 2) + be(le / (a * me), 2) + be(V / (n * ge), 2) + mt * (le / (a * me)) * (V / (n * ge))
  );
  return Rr(0, Pr(100, bt));
}
function Gr(t, o, e = "lab") {
  t = new R(t), o = new R(o);
  const a = t.get(e), n = o.get(e);
  let r = 0;
  for (let l in a) {
    const i = (a[l] || 0) - (n[l] || 0);
    r += i * i;
  }
  return Math.sqrt(r);
}
const Vr = (...t) => {
  try {
    return new R(...t), !0;
  } catch {
    return !1;
  }
}, Hr = {
  cool() {
    return St([Y.hsl(180, 1, 0.9), Y.hsl(250, 0.7, 0.4)]);
  },
  hot() {
    return St(["#000", "#f00", "#ff0", "#fff"]).mode(
      "rgb"
    );
  }
}, At = {
  // sequential
  OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
  PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
  BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
  Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
  BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
  YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
  YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
  Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
  RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
  Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
  YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
  Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
  GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
  Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
  YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
  PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
  Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
  PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
  Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
  // diverging
  Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
  RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
  RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
  PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
  PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
  RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
  BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
  RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
  PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
  // qualitative
  Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
  Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
  Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
  Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
  Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
  Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
  Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
  Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
};
for (let t of Object.keys(At))
  At[t.toLowerCase()] = At[t];
Object.assign(Y, {
  average: dr,
  bezier: gr,
  blend: Le,
  cubehelix: _r,
  mix: ut,
  interpolate: ut,
  random: Lr,
  scale: St,
  analyze: _a,
  contrast: Er,
  deltaE: jr,
  distance: Gr,
  limits: Oa,
  valid: Vr,
  scales: Hr,
  input: Z,
  colors: et,
  brewer: At
});
function Ur(t) {
  return Array.isArray(t) && (t.length === 1 || t.length === 2) && t.every((o) => typeof o == "string");
}
function Eo(t) {
  if (t)
    try {
      if (!Y.valid(t))
        return t;
      const o = Y(t);
      if (o.luminance() < 0.3)
        return o.brighten(0.5).hex();
      const a = o.hsl(), [n, r, l] = a, i = 1 - l, s = Math.min(r * 0.9, 1);
      return Y.hsl(n || 0, s, i).hex();
    } catch {
      return t;
    }
}
function $a(t, o) {
  const e = ra();
  if (typeof t == "string") {
    const a = e.light.colors[t.trim()], n = e.dark.colors[t.trim()];
    if (o === "light")
      return a ?? t;
    if (o === "dark")
      return n ?? Eo(a ?? t) ?? t;
  }
  if (Ur(t)) {
    const [a, n] = t, r = e.light.colors[a.trim()], l = n ? e.dark.colors[n.trim()] ?? n : void 0;
    if (o === "light")
      return r ?? a;
    if (o === "dark")
      return l ?? Eo(r ?? a) ?? n;
  }
}
function Xr(t, o) {
  if (t)
    return Object.fromEntries(
      Object.entries(t).map(([e, a]) => [
        e,
        $a(a, o)
      ])
    );
}
function Yr(t, o) {
  if (typeof t == "string")
    return o.colorPalettes[t.trim()];
  if (Array.isArray(t))
    return t.map((e) => typeof e == "string" ? o.colors[e.trim()] ?? e : String(e));
}
function Wr(t, o) {
  if (typeof t == "string") {
    const e = o.colorScales[t.trim()];
    if (e) return e;
    const a = o.colors[t.trim()];
    return a ? [o.colors["base-100"], a] : Y.valid(t) ? [o.colors["base-100"], t] : void 0;
  }
  if (Array.isArray(t))
    return t.map((e) => typeof e == "string" ? o.colors[e.trim()] ?? e : String(e));
}
function Zl(t, o, e = 10) {
  return Y.scale([t, o]).mode("lch").colors(e);
}
function Jl(t) {
  return Y.valid(t) ? Y(t).luminance() > 0.5 ? "#000000" : "#ffffff" : "#000000";
}
function Kl(t, o) {
  return Y.valid(t) ? Y(t).alpha(o).css() : t;
}
const Ql = {
  default: [
    "#236aa4",
    "#45a1bf",
    "#a5cdee",
    "#8dacbf",
    "#85c7c6",
    "#d2c6ac",
    "#f4b548",
    "#8f3d56",
    "#71b9f4",
    "#46a485"
  ],
  categorical: [
    "#3366cc",
    "#dc3912",
    "#ff9900",
    "#109618",
    "#990099",
    "#0099c6",
    "#dd4477",
    "#66aa00",
    "#b82e2e",
    "#316395"
  ],
  pastel: [
    "#a6cee3",
    "#b2df8a",
    "#fdbf6f",
    "#cab2d6",
    "#fb9a99",
    "#ffff99",
    "#1f78b4",
    "#33a02c",
    "#e31a1c"
  ],
  vivid: [
    "#e41a1c",
    "#377eb8",
    "#4daf4a",
    "#984ea3",
    "#ff7f00",
    "#ffff33",
    "#a65628",
    "#f781bf",
    "#999999"
  ],
  cool: [
    "#313695",
    "#4575b4",
    "#74add1",
    "#abd9e9",
    "#e0f3f8",
    "#fee090",
    "#fdae61",
    "#f46d43",
    "#d73027"
  ],
  warm: [
    "#b35806",
    "#e08214",
    "#fdb863",
    "#fee0b6",
    "#f7f7f7",
    "#d8daeb",
    "#b2abd2",
    "#8073ac",
    "#542788"
  ]
}, ei = {
  default: ["#ADD8E6", "#00008B"],
  blue: ["#ADD8E6", "#00008B"],
  green: ["#90EE90", "#006400"],
  red: ["#FFB6C1", "#8B0000"],
  orange: ["#FFDAB9", "#FF4500"],
  purple: ["#E6E6FA", "#4B0082"],
  grey: ["#ffffff", "#000000"],
  blueGreen: ["#f7fcf0", "#00441b"],
  yellowGreen: ["#ffffe5", "#004529"],
  yellowOrangeRed: ["#ffffcc", "#800026"],
  redPurple: ["#fff7f3", "#49006a"],
  purpleBlue: ["#fff7fb", "#023858"],
  diverging: ["#d73027", "#f7f7f7", "#1a9850"]
};
var bo = { exports: {} };
function Fa(t, o = 100, e = {}) {
  if (typeof t != "function")
    throw new TypeError(`Expected the first parameter to be a function, got \`${typeof t}\`.`);
  if (o < 0)
    throw new RangeError("`wait` must not be negative.");
  const { immediate: a } = typeof e == "boolean" ? { immediate: e } : e;
  let n, r, l, i, s;
  function c() {
    const f = n, d = r;
    return n = void 0, r = void 0, s = t.apply(f, d), s;
  }
  function p() {
    const f = Date.now() - i;
    f < o && f >= 0 ? l = setTimeout(p, o - f) : (l = void 0, a || (s = c()));
  }
  const h = function(...f) {
    if (n && this !== n && Object.getPrototypeOf(this) === Object.getPrototypeOf(n))
      throw new Error("Debounced method called with different contexts of the same prototype.");
    n = this, r = f, i = Date.now();
    const d = a && !l;
    return l || (l = setTimeout(p, o)), d && (s = c()), s;
  };
  return Object.defineProperty(h, "isPending", {
    get() {
      return l !== void 0;
    }
  }), h.clear = () => {
    l && (clearTimeout(l), l = void 0);
  }, h.flush = () => {
    l && h.trigger();
  }, h.trigger = () => {
    s = c(), h.clear();
  }, h;
}
bo.exports.debounce = Fa;
bo.exports = Fa;
var qr = bo.exports;
const La = /* @__PURE__ */ ao(qr), Zr = 500;
let Po = !1;
function Jr() {
  Po || (Te.registerTheme("light", co), Te.registerTheme("dark", uo), Po = !0);
}
function Ro(t) {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
    navigator.platform
  ) && t.clientWidth * 3 * t.clientHeight * 3 > 16777215;
}
function ti(t = {}) {
  const {
    theme: o = "light",
    renderer: e = "canvas",
    connectGroup: a,
    animationDuration: n = Zr,
    autoResize: r = !0,
    resizeDebounce: l = 100
  } = t, i = Jo(null), s = se(null);
  let c = null;
  const p = () => typeof o == "string" ? o : o.value;
  Jr();
  const h = (y) => {
    const O = y || s.value;
    if (!O)
      return console.warn("useECharts: No container element provided"), null;
    i.value && i.value.dispose();
    const M = Ro(O) ? "svg" : e, z = Te.init(O, p(), {
      renderer: M
    });
    return i.value = z, a && (z.group = a, Te.connect(a)), z;
  }, f = (y, O = !1) => {
    if (!i.value) {
      console.warn("useECharts: Chart not initialized");
      return;
    }
    const M = typeof O == "boolean" ? { notMerge: O } : {
      // Default to using replaceMerge for series to preserve toolbox state
      replaceMerge: O.replaceMerge ?? ["series"],
      notMerge: O.notMerge ?? !1
    };
    i.value.setOption(
      {
        ...y,
        animationDuration: n,
        animationDurationUpdate: n
      },
      M
    );
  }, d = () => {
    i.value && i.value.resize({
      animation: {
        duration: n
      }
    });
  }, u = () => {
    c && (c.disconnect(), c = null), i.value && (i.value.dispose(), i.value = null);
  }, m = (y) => {
    if (i.value)
      return i.value.getConnectedDataURL({
        type: (y == null ? void 0 : y.type) || "png",
        pixelRatio: (y == null ? void 0 : y.pixelRatio) || 3,
        backgroundColor: (y == null ? void 0 : y.backgroundColor) || "#ffffff",
        excludeComponents: (y == null ? void 0 : y.excludeComponents) || ["toolbox"]
      });
  }, C = () => !i.value || i.value.isDisposed(), g = La(d, l);
  return Ne(() => {
    if (r && s.value) {
      const y = s.value.parentElement;
      window.ResizeObserver && y ? (c = new ResizeObserver(g), c.observe(y)) : window.addEventListener("resize", g);
    }
  }), ot(() => {
    c ? c.disconnect() : window.removeEventListener("resize", g), u();
  }), typeof o != "string" && Re(o, (y) => {
    if (i.value && s.value) {
      i.value.dispose();
      const O = Te.init(s.value, y, {
        renderer: Ro(s.value) ? "svg" : e
      });
      i.value = O;
    }
  }), {
    chartInstance: i,
    containerRef: s,
    init: h,
    setOption: f,
    resize: d,
    dispose: u,
    getDataURL: m,
    isDisposed: C
  };
}
function Kr(t, o) {
  if (!o) return;
  const e = t.getOption();
  if (!e || !e.series) return;
  const n = e.series.map((r) => r.name && o[r.name] ? {
    ...r,
    itemStyle: {
      ...r.itemStyle,
      color: o[r.name]
    }
  } : r);
  t.setOption({ series: n });
}
function Qr(t, o) {
  o && t.setOption(o);
}
function el(t, o, e) {
  if (!o) return;
  const a = e.series;
  if (!a) return;
  const n = a.reduce(
    (l, { seriesType: i }, s) => ((i === "reference_line" || i === "reference_area" || i === "reference_point") && l.push(s), l),
    []
  ), r = a.map((l, i) => n.includes(i) ? {} : { ...o });
  t.setOption({ series: r });
}
function oi() {
  return {
    formatValue: (l, i, s) => typeof i == "string" ? J(l, pe(i), s) : J(l, i, s),
    formatAxisValue: (l, i, s) => typeof i == "string" ? Je(l, pe(i), s) : Je(l, i, s),
    getFormat: (l, i) => pe(l, i),
    formatTitle: (l, i) => De(l, i),
    fmt: (l, i) => cn(l, i),
    setCustomFormats: tn,
    getCustomFormats: on,
    getBuiltInFormats: () => lo,
    lookupColumnFormat: aa,
    applyTitleTagReplacement: na,
    formatExample: sn,
    inferValueType: an
  };
}
function ai(t, o) {
  const e = F(() => typeof t == "string" ? pe(t) : t);
  return {
    format: e,
    formatValue: (r) => J(r, e.value, o),
    formatAxisValue: (r) => Je(r, e.value, o)
  };
}
const tl = Symbol("chartProps"), ol = Symbol("chartConfig"), go = Symbol("themeStores"), ni = Symbol("echartsInstance"), _t = Symbol("seriesConfig");
function al() {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function Ia(t = {}) {
  const {
    defaultAppearance: o = "system",
    syncWithSystem: e = !0,
    storageKey: a = "vue-echarts-theme"
  } = t, n = se(al()), r = se(o);
  Ne(() => {
    if (typeof window < "u" && a) {
      const u = localStorage.getItem(a);
      u && ["system", "light", "dark"].includes(u) && (r.value = u);
    }
    if (e && typeof window < "u" && window.matchMedia) {
      const u = window.matchMedia("(prefers-color-scheme: dark)"), m = (C) => {
        n.value = C.matches ? "dark" : "light";
      };
      u.addEventListener("change", m), ot(() => {
        u.removeEventListener("change", m);
      });
    }
  }), Re(r, (u) => {
    typeof window < "u" && a && localStorage.setItem(a, u);
  });
  const l = F(() => r.value === "system" ? n.value : r.value), i = F(() => ra()[l.value]);
  return {
    systemTheme: n,
    selectedAppearance: r,
    activeAppearance: l,
    theme: i,
    setAppearance: (u) => {
      r.value = u;
    },
    cycleAppearance: () => {
      const u = ["system", "light", "dark"], m = u.indexOf(r.value);
      r.value = u[(m + 1) % u.length];
    },
    resolveColor: (u) => F(() => $a(u, l.value)),
    resolveColorsObject: (u) => F(() => Xr(u, l.value)),
    resolveColorPalette: (u) => F(() => Yr(u, i.value)),
    resolveColorScale: (u) => F(() => Wr(u, i.value)),
    configureThemes: un
  };
}
function nl(t) {
  const o = {
    activeAppearance: t.activeAppearance,
    selectedAppearance: t.selectedAppearance,
    theme: t.theme,
    setAppearance: t.setAppearance,
    cycleAppearance: t.cycleAppearance,
    resolveColor: t.resolveColor,
    resolveColorsObject: t.resolveColorsObject,
    resolveColorPalette: t.resolveColorPalette,
    resolveColorScale: t.resolveColorScale
  };
  wt(go, o);
}
function ri() {
  return ft(go);
}
function ye(t) {
  const o = ft(go, void 0);
  if (o)
    return o;
  const e = Ia(t);
  return {
    activeAppearance: e.activeAppearance,
    selectedAppearance: e.selectedAppearance,
    theme: e.theme,
    setAppearance: e.setAppearance,
    cycleAppearance: e.cycleAppearance,
    resolveColor: e.resolveColor,
    resolveColorsObject: e.resolveColorsObject,
    resolveColorPalette: e.resolveColorPalette,
    resolveColorScale: e.resolveColorScale
  };
}
var Da = { exports: {} };
(function(t, o) {
  (function(e, a) {
    t.exports = a();
  })(Ga, function() {
    return function e(a, n, r) {
      var l = window, i = "application/octet-stream", s = r || i, c = a, p = !n && !r && c, h = document.createElement("a"), f = function(v) {
        return String(v);
      }, d = l.Blob || l.MozBlob || l.WebKitBlob || f, u = n || "download", m, C;
      if (d = d.call ? d.bind(l) : Blob, String(this) === "true" && (c = [c, s], s = c[0], c = c[1]), p && p.length < 2048 && (u = p.split("/").pop().split("?")[0], h.href = p, h.href.indexOf(p) !== -1)) {
        var g = new XMLHttpRequest();
        return g.open("GET", p, !0), g.responseType = "blob", g.onload = function(v) {
          e(v.target.response, u, i);
        }, setTimeout(function() {
          g.send();
        }, 0), g;
      }
      if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(c))
        if (c.length > 1024 * 1024 * 1.999 && d !== f)
          c = z(c), s = c.type || i;
        else
          return navigator.msSaveBlob ? (
            // IE10 can't do a[download], only Blobs:
            navigator.msSaveBlob(z(c), u)
          ) : I(c);
      else if (/([\x80-\xff])/.test(c)) {
        var y = 0, O = new Uint8Array(c.length), M = O.length;
        for (y; y < M; ++y) O[y] = c.charCodeAt(y);
        c = new d([O], { type: s });
      }
      m = c instanceof d ? c : new d([c], { type: s });
      function z(v) {
        var L = v.split(/[:;,]/), T = L[1], b = L[2] == "base64" ? atob : decodeURIComponent, $ = b(L.pop()), D = $.length, V = 0, W = new Uint8Array(D);
        for (V; V < D; ++V) W[V] = $.charCodeAt(V);
        return new d([W], { type: T });
      }
      function I(v, L) {
        if ("download" in h)
          return h.href = v, h.setAttribute("download", u), h.className = "download-js-link", h.innerHTML = "downloading...", h.style.display = "none", document.body.appendChild(h), setTimeout(function() {
            h.click(), document.body.removeChild(h), L === !0 && setTimeout(function() {
              l.URL.revokeObjectURL(h.href);
            }, 250);
          }, 66), !0;
        if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))
          return /^data:/.test(v) && (v = "data:" + v.replace(/^data:([\w\/\-\+]+)/, i)), window.open(v) || confirm(`Displaying New Document

Use Save As... to download, then click back to return to this page.`) && (location.href = v), !0;
        var T = document.createElement("iframe");
        document.body.appendChild(T), !L && /^data:/.test(v) && (v = "data:" + v.replace(/^data:([\w\/\-\+]+)/, i)), T.src = v, setTimeout(function() {
          document.body.removeChild(T);
        }, 333);
      }
      if (navigator.msSaveBlob)
        return navigator.msSaveBlob(m, u);
      if (l.URL)
        I(l.URL.createObjectURL(m), !0);
      else {
        if (typeof m == "string" || m.constructor === f)
          try {
            return I("data:" + s + ";base64," + l.btoa(m));
          } catch {
            return I("data:" + s + "," + encodeURIComponent(m));
          }
        C = new FileReader(), C.onload = function(v) {
          I(this.result);
        }, C.readAsDataURL(m);
      }
      return !0;
    };
  });
})(Da);
var rl = Da.exports;
const ll = /* @__PURE__ */ ao(rl);
var oo;
(function(t) {
  t.csv = "text/csv", t.tsv = "text/tab-separated-values", t.plain = "text/plain";
})(oo || (oo = {}));
var nt = (t) => t, _e = (t) => t, ct = nt, Ot = nt, tt = nt, No = nt, jo = nt, il = { fieldSeparator: ",", decimalSeparator: ".", quoteStrings: !0, quoteCharacter: '"', showTitle: !1, title: "My Generated Report", filename: "generated", showColumnHeaders: !0, useTextFile: !1, fileExtension: "csv", mediaType: oo.csv, useBom: !0, columnHeaders: [], useKeysAsHeaders: !1, boolDisplay: { true: "TRUE", false: "FALSE" }, replaceUndefinedWith: "" }, sl = `\r
`, cl = "\uFEFF", $t = (t) => Object.assign({}, il, t);
class ul extends Error {
  constructor(o) {
    super(o), this.name = "CsvGenerationError";
  }
}
class dl extends Error {
  constructor(o) {
    super(o), this.name = "EmptyHeadersError";
  }
}
class fl extends Error {
  constructor(o) {
    super(o), this.name = "CsvDownloadEnvironmentError";
  }
}
class pl extends Error {
  constructor(o) {
    super(o), this.name = "UnsupportedDataFormatError";
  }
}
var hl = function(t, o) {
  return o == '"' && t.indexOf('"') > -1 ? t.replace(/"/g, '""') : t;
}, ml = (t) => No(typeof t == "object" ? t.key : t), bl = (t) => jo(typeof t == "object" ? t.displayLabel : t), gl = (t, ...o) => o.reduce((e, a) => a(e), t), yl = (t) => (o) => t.useBom ? Ot(_e(o) + cl) : o, vl = (t) => (o) => t.showTitle ? yo(Ot(_e(o) + t.title))(tt("")) : o, yo = (t) => (o) => Ot(_e(t) + _e(o) + sl), za = (t) => (o, e) => xl(t)(tt(_e(o) + _e(e))), xl = (t) => (o) => nt(_e(o) + t.fieldSeparator), wl = (t, o) => (e) => {
  if (!t.showColumnHeaders) return e;
  if (o.length < 1) throw new dl("Option to show headers but none supplied. Make sure there are keys in your collection or that you've supplied headers through the config options.");
  let a = tt("");
  for (let n = 0; n < o.length; n++) {
    const r = bl(o[n]);
    a = za(t)(a, Ea(t, _e(r)));
  }
  return a = tt(_e(a).slice(0, -1)), yo(e)(a);
}, Cl = (t, o, e) => (a) => {
  let n = a;
  for (var r = 0; r < e.length; r++) {
    let l = tt("");
    for (let i = 0; i < o.length; i++) {
      const s = ml(o[i]), c = e[r][_e(s)];
      l = za(t)(l, Ea(t, c));
    }
    l = tt(_e(l).slice(0, -1)), n = yo(n)(l);
  }
  return n;
}, Al = (t) => +t === t && (!isFinite(t) || !!(t % 1)), kl = (t, o) => {
  if (Al(o)) {
    if (t.decimalSeparator === "locale") return ct(o.toLocaleString());
    if (t.decimalSeparator) return ct(o.toString().replace(".", t.decimalSeparator));
  }
  return ct(o.toString());
}, kt = (t, o) => {
  let e = o;
  return (t.quoteStrings || t.fieldSeparator && o.indexOf(t.fieldSeparator) > -1 || t.quoteCharacter && o.indexOf(t.quoteCharacter) > -1 || o.indexOf(`
`) > -1 || o.indexOf("\r") > -1) && (e = t.quoteCharacter + hl(o, t.quoteCharacter) + t.quoteCharacter), ct(e);
}, Sl = (t, o) => {
  const e = o ? "true" : "false";
  return ct(t.boolDisplay[e]);
}, Tl = (t, o) => typeof o > "u" && t.replaceUndefinedWith !== void 0 ? kt(t, t.replaceUndefinedWith + "") : o === null ? kt(t, "null") : kt(t, ""), Ea = (t, o) => {
  if (typeof o == "number") return kl(t, o);
  if (typeof o == "string") return kt(t, o);
  if (typeof o == "boolean" && t.boolDisplay) return Sl(t, o);
  if (o === null || typeof o > "u") return Tl(t, o);
  throw new pl(`
    typeof ${typeof o} isn't supported. Only number, string, boolean, null and undefined are supported.
    Please convert the data in your object to one of those before generating the CSV.
    `);
}, Bl = (t) => (o) => {
  const e = $t(t), a = e.useKeysAsHeaders ? Object.keys(o[0]) : e.columnHeaders;
  let n = gl(Ot(""), yl(e), vl(e), wl(e, a), Cl(e, a, o));
  if (_e(n).length < 1) throw new ul("Output is empty. Is your data formatted correctly?");
  return n;
}, Ml = (t) => (o) => {
  const e = $t(t), a = _e(o), n = e.useTextFile ? "text/plain" : e.mediaType;
  return new Blob([a], { type: `${n};charset=utf8;` });
}, _l = (t) => (o) => {
  if (!window) throw new fl("Downloading only supported in a browser environment.");
  const e = Ml(t)(o), a = $t(t), n = a.useTextFile ? "txt" : a.fileExtension, r = `${a.filename}.${n}`, l = document.createElement("a");
  l.download = r, l.href = URL.createObjectURL(e), l.setAttribute("visibility", "hidden"), document.body.appendChild(l), l.click(), document.body.removeChild(l);
};
let Go = !1;
function Ol() {
  Go || (Te.registerTheme("light", co), Te.registerTheme("dark", uo), Go = !0);
}
function Vo() {
  const t = /* @__PURE__ */ new Date();
  return new Date(t.getTime() - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 19).replace(/:/g, "-");
}
function $l(t, o) {
  if (!o) return;
  const e = t.getOption();
  if (!e || !e.series) return;
  const n = e.series.map((r) => r.name && o[r.name] ? {
    ...r,
    itemStyle: {
      ...r.itemStyle,
      color: o[r.name]
    }
  } : r);
  t.setOption({ series: n });
}
function Fl(t, o, e) {
  if (!o) return;
  const a = e.series;
  if (!a) return;
  const n = a.reduce(
    (l, { seriesType: i }, s) => ((i === "reference_line" || i === "reference_area" || i === "reference_point") && l.push(s), l),
    []
  ), r = a.map((l, i) => n.includes(i) ? {} : { ...o });
  t.setOption({ series: r });
}
function Ll(t, o, e, a, n, r, l) {
  Ol();
  const i = document.createElement("div");
  i.style.cssText = `
    position: fixed;
    left: -9999px;
    top: -9999px;
    width: ${o}px;
    height: ${e}px;
    visibility: hidden;
  `, document.body.appendChild(i);
  const s = Te.init(i, a, { renderer: "canvas" }), c = {
    ...t,
    animation: !1
  };
  return s.setOption(c), r && s.setOption(r), n && $l(s, n), l && Fl(s, l, t), { chart: s, container: i };
}
function Il() {
  const t = se(!1), o = (i, s = {}, c = "light", p, h, f) => {
    const {
      type: d = "png",
      pixelRatio: u = 3,
      backgroundColor: m = c === "dark" ? "#1a1a2e" : "#ffffff",
      width: C = 666,
      excludeComponents: g = ["toolbox"]
    } = s, y = 300, { chart: O, container: M } = Ll(
      i,
      C,
      y,
      c,
      p,
      h,
      f
    );
    try {
      return O.getConnectedDataURL({
        type: d,
        pixelRatio: u,
        backgroundColor: m,
        excludeComponents: g
      });
    } finally {
      O.dispose(), document.body.removeChild(M);
    }
  }, e = async (i, s = {}, c = "light", p, h, f) => {
    t.value = !0;
    try {
      const {
        type: d = "png",
        filename: u = "chart"
      } = s, m = o(
        i,
        s,
        c,
        p,
        h,
        f
      );
      if (m) {
        const C = Vo();
        ll(m, `${u}_${C}.${d}`);
      }
    } finally {
      t.value = !1;
    }
  };
  return {
    isExporting: t,
    exportAsPng: (i, s = {}, c, p, h, f) => e(
      i,
      { ...s, type: "png", pixelRatio: s.pixelRatio || 3 },
      c || "light",
      p,
      h,
      f
    ),
    exportAsJpeg: (i, s = {}, c, p, h, f) => e(
      i,
      { ...s, type: "jpeg", pixelRatio: s.pixelRatio || 2 },
      c || "light",
      p,
      h,
      f
    ),
    exportAsCsv: (i, s = {}) => {
      const {
        filename: c = "data",
        showHeaders: p = !0,
        useBom: h = !0,
        separator: f = ","
      } = s;
      if (!i || i.length === 0) {
        console.warn("useExport: No data to export");
        return;
      }
      const d = Vo(), u = $t({
        filename: `${c}_${d}`,
        columnHeaders: p ? Object.keys(i[0]) : [],
        useKeysAsHeaders: p,
        useBom: h,
        fieldSeparator: f
      }), m = Bl(u)(i);
      _l(u)(m);
    },
    copyToClipboard: async (i, s = "light", c, p, h) => {
      t.value = !0;
      try {
        const f = o(
          i,
          { type: "png", pixelRatio: 2 },
          s,
          c,
          p,
          h
        );
        if (!f)
          return !1;
        const u = await (await fetch(f)).blob();
        return await navigator.clipboard.write([
          new ClipboardItem({
            [u.type]: u
          })
        ]), !0;
      } catch (f) {
        return console.error("Failed to copy to clipboard:", f), !1;
      } finally {
        t.value = !1;
      }
    },
    getChartDataUrl: o
  };
}
function Dl(t, o, e) {
  return e > 0 && t >= o ? 1 : 0;
}
function vo() {
  const t = (a, n) => {
    const {
      swapXY: r = !1,
      xType: l = "category",
      totalSeriesCount: i = 1,
      yCount: s = 1,
      y2Count: c = 0,
      xColumn: p = "x",
      xFormat: h,
      yFormat: f,
      y2Format: d
    } = n, u = Array.isArray(a) ? a : [a];
    if (u.length === 0) return "";
    let m = "";
    const C = u[0].value, g = C == null ? void 0 : C[r ? 1 : 0];
    if (i > 1) {
      m = `<span id="tooltip" style='font-weight: 600;'>${J(g, h)}</span>`;
      for (let y = u.length - 1; y >= 0; y--) {
        const O = u[y];
        if (O.seriesName !== "stackTotal") {
          const M = O.value, z = M == null ? void 0 : M[r ? 0 : 1], v = Dl(O.componentIndex || 0, s, c) === 0 ? f : d;
          m += `<br> <span style='font-size: 11px;'>${O.marker} ${O.seriesName}</span>`, m += `<span style='float:right; margin-left: 10px; font-size: 12px;'>${J(z, v)}</span>`;
        }
      }
    } else if (l === "value") {
      const y = u[0].value, O = y == null ? void 0 : y[r ? 1 : 0], M = y == null ? void 0 : y[r ? 0 : 1], z = u[0].seriesName || "";
      m = `<span id="tooltip" style='font-weight: 600;'>${De(p, h)}: </span>`, m += `<span style='float:right; margin-left: 10px;'>${J(O, h)}</span><br/>`, m += `<span style='font-weight: 600;'>${De(z, f)}: </span>`, m += `<span style='float:right; margin-left: 10px;'>${J(M, f)}</span>`;
    } else {
      const y = u[0].value, O = y == null ? void 0 : y[r ? 1 : 0], M = y == null ? void 0 : y[r ? 0 : 1], z = u[0].seriesName || "";
      m = `<span id="tooltip" style='font-weight: 600;'>${J(O, h)}</span><br/>`, m += `<span>${De(z, f)}: </span>`, m += `<span style='float:right; margin-left: 10px;'>${J(M, f)}</span>`;
    }
    return m;
  };
  return {
    createFormatter: (a) => (n) => t(n, a),
    defaultFormatter: t,
    scatterFormatter: (a, n) => {
      const {
        xColumn: r = "x",
        yColumn: l,
        xFormat: i,
        yFormat: s,
        size: c,
        sizeFormat: p,
        tooltipTitle: h
      } = n, f = Array.isArray(a) ? a[0] : a;
      if (!f || !f.value) return "";
      const d = f.value, u = d[0], m = d[1], C = c ? d[2] : void 0, g = h ? d[c ? 3 : 2] : void 0;
      let y = "";
      g !== void 0 ? y += `<span id="tooltip" style='font-weight: 600;'>${g}</span><br/>` : f.seriesName && (y += `<span id="tooltip" style='font-weight: 600;'>${f.seriesName}</span><br/>`), y += `<span>${De(r, i)}: </span>`, y += `<span style='float:right; margin-left: 10px;'>${J(u, i)}</span><br/>`;
      const O = typeof l == "string" ? l : (l == null ? void 0 : l[0]) || "y";
      return y += `<span>${De(O, s)}: </span>`, y += `<span style='float:right; margin-left: 10px;'>${J(m, s)}</span>`, c && C !== void 0 && (y += `<br/><span>${De(c, p)}: </span>`, y += `<span style='float:right; margin-left: 10px;'>${J(C, p)}</span>`), y;
    }
  };
}
function zl(t = {}) {
  const { createFormatter: o } = vo();
  return {
    trigger: "axis",
    show: !0,
    formatter: o(t),
    confine: !0,
    axisPointer: {
      type: "shadow"
    },
    extraCssText: 'box-shadow: 0 3px 6px rgba(0,0,0,.15); box-shadow: 0 2px 4px rgba(0,0,0,.12); z-index: 1; font-feature-settings: "cv02", "tnum";',
    order: "valueDesc"
  };
}
function Ho(t) {
  if (!t || t.length === 0) return {};
  const o = {}, e = t[0];
  for (const a of Object.keys(e)) {
    const n = t.map((c) => c[a]).filter((c) => c != null), r = n[0];
    let l = "string", i;
    if (typeof r == "number") {
      l = "number";
      const c = n, p = [...c].sort((m, C) => m - C), h = p[0], f = p[p.length - 1], d = p[Math.floor(p.length / 2)], u = Math.max(
        ...c.map((m) => {
          const C = m.toString(), g = C.indexOf(".");
          return g >= 0 ? C.length - g - 1 : 0;
        })
      );
      i = { min: h, max: f, median: d, maxDecimals: u, unitType: "number" };
    } else if (typeof r == "boolean")
      l = "boolean";
    else if (r instanceof Date)
      l = "date", i = { min: 0, max: 0, median: 0, maxDecimals: 0, unitType: "date" };
    else if (typeof r == "string") {
      const c = new Date(r);
      !isNaN(c.getTime()) && r.match(/\d{4}-\d{2}-\d{2}/) && (l = "date", i = { min: 0, max: 0, median: 0, maxDecimals: 0, unitType: "date" });
    }
    const s = aa(
      a,
      { columnType: l },
      i
    );
    o[a] = {
      id: a,
      title: De(a, s),
      type: l,
      format: s,
      columnUnitSummary: i
    };
  }
  return o;
}
function dt(t, o) {
  const e = new Set(t.map((a) => a[o]));
  return Array.from(e);
}
function El(t, o) {
  return dt(t, o).length;
}
function Uo(t, o, e = !0) {
  const a = Array.isArray(o) ? o[0] : o;
  return [...t].sort((n, r) => {
    const l = n[a], i = r[a];
    if (l == null) return 1;
    if (i == null) return -1;
    if (typeof l == "number" && typeof i == "number")
      return e ? l - i : i - l;
    const s = String(l), c = String(i);
    return e ? s.localeCompare(c) : c.localeCompare(s);
  });
}
function Ue(t, o = {}) {
  const { xType: e } = o, a = F(() => {
    var C;
    let d = [...t.data || []];
    const u = Ho(d), m = Object.values(u).filter((g) => g.type === "date").map((g) => g.id);
    for (const g of m)
      d = en(d, g);
    if (t.sort !== !1 && t.x) {
      const g = (C = u[t.x]) == null ? void 0 : C.type;
      g === "date" || g === "number" ? d = Uo(d, t.x, !0) : t.y && (d = Uo(d, t.y, !1));
    }
    return d;
  }), n = F(() => Ho(a.value)), r = F(() => {
    var u;
    if (e) return e;
    if (t.xType) return t.xType;
    if (!t.x) return "category";
    switch ((u = n.value[t.x]) == null ? void 0 : u.type) {
      case "number":
        return "value";
      case "date":
        return "time";
      default:
        return "category";
    }
  }), l = F(() => {
    var C, g, y, O, M, z, I, v, L;
    const d = {};
    t.x && (t.xFmt ? d.x = pe(t.xFmt, (g = (C = n.value[t.x]) == null ? void 0 : C.format) == null ? void 0 : g.valueType) : d.x = (y = n.value[t.x]) == null ? void 0 : y.format);
    const u = Array.isArray(t.y) ? t.y[0] : t.y;
    u && (t.yFmt ? d.y = pe(t.yFmt, (M = (O = n.value[u]) == null ? void 0 : O.format) == null ? void 0 : M.valueType) : d.y = (z = n.value[u]) == null ? void 0 : z.format);
    const m = Array.isArray(t.y2) ? t.y2[0] : t.y2;
    return m && (t.y2Fmt ? d.y2 = pe(t.y2Fmt, (v = (I = n.value[m]) == null ? void 0 : I.format) == null ? void 0 : v.valueType) : d.y2 = (L = n.value[m]) == null ? void 0 : L.format), d;
  }), i = F(() => {
    var C, g, y;
    const d = {};
    t.x && (d.x = (C = n.value[t.x]) == null ? void 0 : C.columnUnitSummary);
    const u = Array.isArray(t.y) ? t.y[0] : t.y;
    u && (d.y = (g = n.value[u]) == null ? void 0 : g.columnUnitSummary);
    const m = Array.isArray(t.y2) ? t.y2[0] : t.y2;
    return m && (d.y2 = (y = n.value[m]) == null ? void 0 : y.columnUnitSummary), d;
  }), s = F(() => Array.isArray(t.y) ? t.y.length : t.y ? 1 : 0), c = F(() => Array.isArray(t.y2) ? t.y2.length : t.y2 ? 1 : 0), p = F(() => {
    const d = t.series ? El(a.value, t.series) : 1;
    return s.value * d;
  }), h = F(() => p.value + c.value), f = F(() => {
    const d = t.swapXY || !1, u = t.legend ?? h.value > 1;
    t.chartAreaHeight;
    const m = !!t.title, C = !!t.subtitle, g = u, y = 15, O = 13, M = 6 * (C ? 1 : 0), z = (m ? y : 0) + (C ? O : 0) + M * Math.max(m ? 1 : 0, C ? 1 : 0), I = g ? 15 : 0, v = 7 * Math.max(m ? 1 : 0, C ? 1 : 0), L = z + v, T = 10, b = 10, $ = L + I + T, D = b, V = t.xAxisTitle === !0 ? De(t.x || "", l.value.x) : t.xAxisTitle === !1 ? "" : t.xAxisTitle || "", W = t.yAxisTitle === !0 ? De(Array.isArray(t.y) ? "" : t.y || "", l.value.y) : t.yAxisTitle === !1 ? "" : t.yAxisTitle || "", le = V ? 25 : 0;
    console.log("[useChartConfig] Config:", {
      xAxisTitle: V,
      yAxisTitle: W,
      legend: u,
      hasLegend: g,
      totalSeriesCount: h.value,
      swapXY: d,
      propsXAxisTitle: t.xAxisTitle,
      propsYAxisTitle: t.yAxisTitle
    });
    const ve = d ? {
      type: t.yLog ? "log" : "value",
      logBase: t.yLogBase || 10,
      position: "top",
      axisLabel: {
        show: t.yAxisLabels !== !1,
        hideOverlap: !0,
        formatter: (Ie) => Je(Ie, l.value.y, i.value.y)
      },
      min: t.yMin,
      max: t.yMax,
      scale: t.yScale,
      splitLine: { show: t.yGridlines !== !1 },
      axisLine: { show: t.yBaseline, onZero: !1 },
      axisTick: { show: t.yTickMarks }
    } : {
      type: r.value,
      min: t.xMin,
      max: t.xMax,
      splitLine: { show: t.xGridlines },
      axisLine: { show: t.xBaseline !== !1 },
      axisTick: { show: t.xTickMarks },
      axisLabel: {
        show: t.xAxisLabels !== !1,
        hideOverlap: !0,
        formatter: r.value === "time" || r.value === "category" ? void 0 : (Ie) => Je(Ie, l.value.x, i.value.x)
      },
      name: V,
      nameLocation: "middle",
      nameGap: 30
    }, me = d ? {
      type: "category",
      inverse: !0,
      splitLine: { show: t.xGridlines },
      axisLine: { show: t.xBaseline !== !1 },
      axisTick: { show: t.xTickMarks },
      axisLabel: { show: t.xAxisLabels !== !1, hideOverlap: !0 }
    } : {
      type: t.yLog ? "log" : "value",
      logBase: t.yLogBase || 10,
      splitLine: { show: t.yGridlines !== !1 },
      axisLine: { show: t.yBaseline, onZero: !1 },
      axisTick: { show: t.yTickMarks },
      axisLabel: {
        show: t.yAxisLabels !== !1,
        hideOverlap: !0,
        formatter: (Ie) => Je(Ie, l.value.y, i.value.y)
      },
      name: W,
      nameLocation: "end",
      nameTextStyle: { align: "left", verticalAlign: "top", padding: [0, 5, 0, 0] },
      min: t.yMin,
      max: t.yMax,
      scale: t.yScale,
      boundaryGap: ["0%", "1%"]
    }, ge = zl({
      swapXY: d,
      xType: r.value,
      totalSeriesCount: h.value,
      yCount: s.value,
      y2Count: c.value,
      xColumn: t.x,
      yColumn: t.y,
      xFormat: l.value.x,
      yFormat: l.value.y,
      y2Format: l.value.y2,
      tooltipTitle: t.tooltipTitle
    });
    return {
      title: {
        text: t.title,
        subtext: t.subtitle
      },
      tooltip: ge,
      legend: {
        show: u,
        type: "scroll",
        top: L,
        padding: [0, 0, 0, 0]
        // Don't set data - let ECharts auto-detect from series names
      },
      grid: {
        left: t.leftPadding || (d ? "1%" : "0.8%"),
        right: t.rightPadding || (d ? "4%" : "3%"),
        bottom: D + le,
        top: $,
        containLabel: !0
      },
      xAxis: ve,
      yAxis: me,
      series: [],
      animation: !0
    };
  });
  return {
    processedData: a,
    columnSummary: n,
    xAxisType: r,
    baseConfig: f,
    formats: l,
    unitSummaries: i
  };
}
function ht(t, o, e, a, n, r, l, i = {}) {
  var g, y;
  const {
    xMismatch: s = !1,
    size: c,
    tooltipTitle: p,
    y2: h,
    seriesOrder: f
  } = i, d = [], u = [], m = Array.isArray(e) ? e : e ? [e] : [], C = Array.isArray(h) ? h : h ? [h] : [];
  if (m.forEach((O) => u.push([O, 0])), C.forEach((O) => u.push([O, 1])), a && u.length === 1) {
    const O = dt(t, a);
    for (const M of O) {
      const I = t.filter((v) => v[a] === M).map((v) => {
        const L = s ? String(v[o]) : v[o], T = v[u[0][0]], b = n ? [T, L] : [L, T];
        return c && b.push(v[c]), p && b.push(v[p]), b;
      });
      d.push({
        name: String(M ?? "null"),
        data: I,
        yAxisIndex: u[0][1],
        ...r
      });
    }
  } else if (u.length > 1)
    for (const [O, M] of u) {
      const z = t.map((I) => {
        const v = s ? String(I[o]) : I[o], L = I[O], T = n ? [L, v] : [v, L];
        return c && T.push(I[c]), p && T.push(I[p]), T;
      });
      d.push({
        name: ((g = l[O]) == null ? void 0 : g.title) || O,
        data: z,
        yAxisIndex: M,
        ...r
      });
    }
  else if (u.length === 1) {
    const O = t.map((M) => {
      const z = s ? String(M[o]) : M[o], I = M[u[0][0]], v = n ? [I, z] : [z, I];
      return c && v.push(M[c]), p && v.push(M[p]), v;
    });
    d.push({
      name: ((y = l[u[0][0]]) == null ? void 0 : y.title) || u[0][0],
      data: O,
      yAxisIndex: u[0][1],
      ...r
    });
  }
  return f && d.sort((O, M) => f.indexOf(O.name) - f.indexOf(M.name)), d;
}
const Xo = {
  type: "slider",
  axis: "x",
  start: 0,
  end: 100,
  minSpan: 1,
  maxSpan: 100,
  showDetail: !1,
  height: 30,
  zoomLock: !1,
  realtime: !0
}, Yo = {
  position: "top-right",
  orient: "horizontal",
  iconSize: 15,
  itemGap: 10,
  saveAsImage: !0,
  restore: !0
}, Wo = {
  type: ["rect", "polygon", "lineX", "lineY"],
  defaultType: "rect",
  mode: "single",
  toolbox: !0,
  outOfBrush: { opacity: 0.3 }
}, qo = {
  enabled: !0,
  duration: 1e3,
  durationUpdate: 500,
  easing: "cubicOut",
  delay: 0,
  threshold: 2e3
}, Zo = {
  enabled: !0,
  trigger: "axis",
  axisPointer: "shadow",
  showSeriesMarker: !0,
  confine: !0,
  followMouse: !1,
  order: "desc"
};
function Pl(t = "top-right") {
  switch (t) {
    case "top-left":
      return { left: 10, top: 10 };
    case "top-right":
      return { right: 10, top: 10 };
    case "bottom-left":
      return { left: 10, bottom: 10 };
    case "bottom-right":
      return { right: 10, bottom: 10 };
    default:
      return { right: 10, top: 10 };
  }
}
function Ft(t) {
  const { chartType: o } = t, e = F(() => {
    const s = Ye(t.zoom), c = Ye(t.swapXY) || !1;
    if (!s) return;
    const p = s === !0 ? { ...Xo } : { ...Xo, ...s }, h = [], f = c ? "yAxisIndex" : "xAxisIndex", d = c ? "xAxisIndex" : "yAxisIndex", u = (m, C) => {
      const g = C && !c || !C && c;
      (p.type === "slider" || p.type === "both") && h.push({
        type: "slider",
        [m]: 0,
        start: p.start,
        end: p.end,
        minSpan: p.minSpan,
        maxSpan: p.maxSpan,
        showDetail: p.showDetail,
        zoomLock: p.zoomLock,
        realtime: p.realtime,
        ...g ? { right: 10, width: p.height || 30 } : { bottom: 10, height: p.height || 30 }
      }), (p.type === "inside" || p.type === "both") && h.push({
        type: "inside",
        [m]: 0,
        start: p.start,
        end: p.end,
        minSpan: p.minSpan,
        maxSpan: p.maxSpan,
        zoomLock: p.zoomLock
      });
    };
    return (p.axis === "x" || p.axis === "both") && u(f, !1), (p.axis === "y" || p.axis === "both") && u(d, !0), h.length > 0 ? h : void 0;
  }), a = F(() => {
    const s = Ye(t.toolbox);
    if (!s) return;
    const c = s === !0 ? { ...Yo } : { ...Yo, ...s }, p = Pl(c.position), h = {};
    if (c.saveAsImage) {
      const f = c.saveAsImage === !0 ? {} : c.saveAsImage;
      h.saveAsImage = {
        type: f.type || "png",
        pixelRatio: f.pixelRatio || 1,
        name: f.name,
        title: "Save"
      };
    }
    if (c.dataZoom && (h.dataZoom = {
      xAxisIndex: 0,
      // Enable zoom on first X axis
      yAxisIndex: "none",
      // Don't zoom Y axis (keeps proportions)
      title: { zoom: "Zoom", back: "Reset" }
    }), c.restore && (h.restore = { title: "Restore" }), c.dataView) {
      const f = c.dataView === !0 ? {} : c.dataView;
      h.dataView = {
        readOnly: f.readOnly ?? !1,
        title: "Data"
      };
    }
    if (c.magicType) {
      const f = c.magicType === !0 ? { type: ["line", "bar"] } : c.magicType;
      h.magicType = {
        type: f.type,
        title: {
          line: "Line",
          bar: "Bar",
          stack: "Stack"
        }
      };
    }
    return {
      show: !0,
      ...p,
      orient: c.orient || "horizontal",
      itemSize: c.iconSize || 15,
      itemGap: c.itemGap || 10,
      feature: h
    };
  }), n = F(() => {
    var h;
    const s = Ye(t.brush);
    if (!s) return;
    const c = s === !0 ? { ...Wo } : { ...Wo, ...s };
    return {
      toolbox: (Array.isArray(c.type) ? c.type : c.type ? [c.type] : ["rect"]).filter((f) => !["keep", "clear"].includes(f)),
      brushType: c.defaultType || "rect",
      brushMode: c.mode || "single",
      outOfBrush: {
        colorAlpha: ((h = c.outOfBrush) == null ? void 0 : h.opacity) ?? 0.3
      }
    };
  }), r = F(() => {
    const s = Ye(t.animation);
    if (s === !1)
      return { animation: !1 };
    if (s === void 0)
      return {};
    const c = s === !0 ? { ...qo } : { ...qo, ...s };
    return c.enabled === !1 ? { animation: !1 } : {
      animation: !0,
      animationDuration: c.duration,
      animationDurationUpdate: c.durationUpdate,
      animationEasing: c.easing,
      animationDelay: c.delay,
      animationThreshold: c.threshold
    };
  }), l = F(() => {
    const s = Ye(t.tooltip);
    if (s === !1)
      return { show: !1 };
    if (s === void 0)
      return {};
    const c = s === !0 ? { ...Zo } : { ...Zo, ...s };
    if (c.enabled === !1)
      return { show: !1 };
    const p = o === "scatter" ? "item" : "axis", h = c.trigger ?? p, f = {
      show: !0,
      trigger: h,
      confine: c.confine,
      enterable: !c.followMouse
    };
    return h === "axis" && c.axisPointer && c.axisPointer !== "none" && (f.axisPointer = {
      type: c.axisPointer
    }), c.order && c.order !== "none" && (f.order = c.order === "asc" ? "valueAsc" : "valueDesc"), c.backgroundColor && (f.backgroundColor = c.backgroundColor), c.borderColor && (f.borderColor = c.borderColor), c.textColor && (f.textStyle = { color: c.textColor }), f;
  }), i = F(() => {
    const s = {}, c = e.value;
    c && (s.dataZoom = c);
    const p = a.value;
    p && (s.toolbox = p);
    const h = n.value;
    h && (s.brush = h);
    const f = r.value;
    return Object.assign(s, f), s;
  });
  return {
    dataZoomConfig: e,
    toolboxConfig: a,
    brushConfig: n,
    animationConfig: r,
    tooltipBaseConfig: l,
    interactiveConfig: i
  };
}
const eo = 500, Rl = /* @__PURE__ */ he({
  __name: "EChartsBase",
  props: {
    config: {},
    height: { default: "291px" },
    width: { default: "100%" },
    theme: { default: "light" },
    renderer: { default: "canvas" },
    connectGroup: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    showAllXAxisLabels: { type: Boolean },
    swapXY: { type: Boolean },
    xAxisLabelOverflow: {}
  },
  emits: ["click", "init", "dispose"],
  setup(t, { expose: o, emit: e }) {
    let a = !1;
    function n() {
      a || (Te.registerTheme("light", co), Te.registerTheme("dark", uo), a = !0);
    }
    const r = t, l = e, i = se(null), s = Jo(null), c = se(!1), p = se(!0);
    function h(g) {
      return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
        navigator.platform
      ) && g.clientWidth * 3 * g.clientHeight * 3 > 16777215;
    }
    function f() {
      if (!i.value) return;
      n(), s.value && s.value.dispose(), p.value = !0;
      const g = h(i.value) ? "svg" : r.renderer, y = Te.init(i.value, r.theme, {
        renderer: g
      });
      s.value = y, r.connectGroup && (y.group = r.connectGroup, Te.connect(r.connectGroup)), y.on("click", (O) => {
        l("click", O);
      }), l("init", y);
    }
    function d() {
      var O, M;
      if (!s.value) return;
      const g = { ...r.config };
      if (console.log("[EChartsBase] updateChart called:", {
        xAxis: g.xAxis,
        xAxisName: (O = g.xAxis) == null ? void 0 : O.name,
        legend: g.legend,
        legendShow: (M = g.legend) == null ? void 0 : M.show,
        isFirstRender: p.value
      }), Array.isArray(g.series) ? g.series = g.series.filter((z) => !(z == null || typeof z != "object" || !("type" in z) || z.type == null)) : g.series = [], g.series.length === 0)
        return;
      const y = { notMerge: p.value };
      s.value.setOption(
        {
          ...g,
          animationDuration: eo,
          animationDurationUpdate: eo
        },
        y
      ), p.value = !1, r.seriesColors && Kr(s.value, r.seriesColors), r.echartsOptions && Qr(s.value, r.echartsOptions), r.seriesOptions && el(s.value, r.seriesOptions, r.config), u();
    }
    function u() {
      var I;
      if (!s.value || !r.showAllXAxisLabels || r.swapXY) return;
      const g = s.value.getOption();
      if (!g || !g.series) return;
      const y = g.series, O = new Set(
        y.flatMap((v) => {
          var L;
          return ((L = v.data) == null ? void 0 : L.map((T) => T[0])) || [];
        })
      ), M = 4 / 5, z = ((I = i.value) == null ? void 0 : I.clientWidth) ?? 0;
      s.value.setOption({
        xAxis: {
          axisLabel: {
            interval: 0,
            overflow: r.xAxisLabelOverflow || "truncate",
            width: z * M / O.size
          }
        }
      });
    }
    const m = La(() => {
      s.value && (s.value.resize({
        animation: {
          duration: eo
        }
      }), u());
    }, 100);
    let C = null;
    return Ne(() => {
      var y;
      f(), d();
      const g = (y = i.value) == null ? void 0 : y.parentElement;
      window.ResizeObserver && g ? (C = new ResizeObserver(m), C.observe(g)) : window.addEventListener("resize", m);
    }), ot(() => {
      C ? C.disconnect() : window.removeEventListener("resize", m), s.value && (s.value.dispose(), l("dispose"));
    }), Re(
      () => r.config,
      () => {
        d();
      },
      { deep: !0 }
    ), Re(
      () => r.theme,
      () => {
        f(), d();
      }
    ), o({
      getChart: () => s.value,
      resize: m,
      updateChart: d
    }), (g, y) => (fe(), Ze("div", {
      class: "echarts-base-container",
      onMouseenter: y[0] || (y[0] = (O) => c.value = !0),
      onMouseleave: y[1] || (y[1] = (O) => c.value = !1)
    }, [
      Ra("div", {
        ref_key: "containerRef",
        ref: i,
        class: "echarts-base",
        style: Na({
          height: r.height,
          width: r.width
        })
      }, null, 4),
      pt(g.$slots, "footer", { hovering: c.value }, void 0, !0)
    ], 32));
  }
}), Lt = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [a, n] of o)
    e[a] = n;
  return e;
}, ke = /* @__PURE__ */ Lt(Rl, [["__scopeId", "data-v-bd843e25"]]), li = /* @__PURE__ */ he({
  __name: "ChartProvider",
  props: {
    data: { default: () => [] },
    x: {},
    y: {},
    y2: {},
    series: {},
    swapXY: { type: Boolean, default: !1 },
    xType: { default: "category" },
    xFormat: {},
    yFormat: {},
    y2Format: {},
    sizeFormat: {},
    xMismatch: { type: Boolean, default: !1 },
    columnSummary: {},
    xAxisTitle: {},
    yAxisTitle: {},
    y2AxisTitle: {},
    tooltipTitle: {},
    chartAreaHeight: {},
    chartType: { default: "Chart" },
    yCount: { default: 1 },
    y2Count: { default: 0 }
  },
  setup(t, { expose: o }) {
    const e = t, a = Ia();
    nl(a);
    const n = ko({
      data: e.data,
      x: e.x,
      y: e.y,
      y2: e.y2,
      series: e.series,
      swapXY: e.swapXY,
      xType: e.xType,
      xFormat: e.xFormat,
      yFormat: e.yFormat,
      y2Format: e.y2Format,
      sizeFormat: e.sizeFormat,
      xMismatch: e.xMismatch,
      columnSummary: e.columnSummary || {},
      xAxisTitle: e.xAxisTitle,
      yAxisTitle: e.yAxisTitle,
      y2AxisTitle: e.y2AxisTitle,
      tooltipTitle: e.tooltipTitle,
      chartAreaHeight: e.chartAreaHeight,
      chartType: e.chartType,
      yCount: e.yCount,
      y2Count: e.y2Count
    }), r = ko({
      series: []
    }), l = /* @__PURE__ */ new Map(), i = (p) => {
      if (!p) return;
      const h = Array.isArray(p) ? p : [p];
      for (const f of h)
        f && typeof f == "object" && "name" in f && l.set(f.name, f);
      r.series = Array.from(l.values());
    }, s = (p) => {
      l.delete(p), r.series = Array.from(l.values());
    }, c = (p, h) => {
      const f = l.get(p);
      f && (l.set(p, { ...f, ...h }), r.series = Array.from(l.values()));
    };
    return wt(tl, F(() => n)), wt(ol, F(() => r)), wt(_t, {
      addSeries: i,
      removeSeries: s,
      updateSeries: c
    }), o({
      chartContext: n,
      chartConfig: r,
      addSeries: i,
      removeSeries: s,
      updateSeries: c
    }), (p, h) => pt(p.$slots, "default", {
      context: n,
      config: r,
      theme: ee(a)
    });
  }
}), Nl = ["disabled"], jl = /* @__PURE__ */ he({
  __name: "ChartFooter",
  props: {
    config: {},
    data: {},
    queryId: {},
    chartTitle: {},
    theme: { default: "light" },
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    visible: { type: Boolean, default: !1 }
  },
  setup(t) {
    const o = t, { exportAsPng: e, exportAsCsv: a, isExporting: n } = Il(), r = async () => {
      await e(
        o.config,
        {
          filename: o.chartTitle || o.queryId || "chart",
          pixelRatio: 3,
          width: 666
        },
        o.theme,
        o.seriesColors,
        o.echartsOptions,
        o.seriesOptions
      );
    }, l = () => {
      o.data && a(o.data, {
        filename: o.queryId || "data"
      });
    };
    return (i, s) => t.downloadableData || t.downloadableImage ? (fe(), Ze("div", {
      key: 0,
      class: ja(["chart-footer", { visible: t.visible }])
    }, [
      t.downloadableImage ? (fe(), Ze("button", {
        key: 0,
        class: "download-button",
        disabled: ee(n),
        onClick: r
      }, [...s[0] || (s[0] = [
        So('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-6f6eca42><rect x="3" y="3" width="18" height="18" rx="2" data-v-6f6eca42></rect><circle cx="8.5" cy="8.5" r="1.5" data-v-6f6eca42></circle><path d="M20.4 14.5L16 10 4 20" data-v-6f6eca42></path></svg><span class="button-text" data-v-6f6eca42>Save Image</span>', 2)
      ])], 8, Nl)) : Et("", !0),
      t.data && t.downloadableData ? (fe(), Ze("button", {
        key: 1,
        class: "download-button",
        onClick: l
      }, [...s[1] || (s[1] = [
        So('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-6f6eca42><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-6f6eca42></path><polyline points="7 10 12 15 17 10" data-v-6f6eca42></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-6f6eca42></line></svg><span class="button-text" data-v-6f6eca42>Download Data</span>', 2)
      ])])) : Et("", !0)
    ], 2)) : Et("", !0);
  }
}), Se = /* @__PURE__ */ Lt(jl, [["__scopeId", "data-v-6f6eca42"]]), ii = /* @__PURE__ */ he({
  __name: "BarChart",
  props: {
    type: { default: "stacked" },
    fillColor: {},
    fillOpacity: { default: 1 },
    outlineColor: {},
    outlineWidth: { default: 0 },
    labels: { type: Boolean },
    labelSize: {},
    labelPosition: {},
    labelColor: {},
    stackTotalLabel: { type: Boolean },
    seriesLabels: { type: Boolean },
    showAllLabels: { type: Boolean },
    seriesOrder: {},
    seriesLabelFmt: {},
    y2SeriesType: {},
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    titleIcon: {},
    subtitle: {},
    description: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean, default: !1 },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    zoom: { type: [Boolean, Object] },
    toolbox: { type: [Boolean, Object] },
    brush: { type: [Boolean, Object] },
    animation: { type: [Boolean, Object] },
    tooltip: { type: [Boolean, Object] },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColor: r, resolveColorPalette: l, resolveColorsObject: i } = ye(), {
      interactiveConfig: s,
      tooltipBaseConfig: c
    } = Ft({
      zoom: () => e.zoom,
      toolbox: () => e.toolbox,
      brush: () => e.brush,
      animation: () => e.animation,
      tooltip: () => e.tooltip,
      swapXY: () => e.swapXY,
      chartType: "bar"
    }), {
      processedData: p,
      columnSummary: h,
      xAxisType: f,
      baseConfig: d,
      formats: u,
      unitSummaries: m
    } = Ue(e, {
      stacked100: e.type === "stacked100"
    }), C = F(
      () => e.fillColor ? r(e.fillColor).value : void 0
    ), g = F(
      () => e.outlineColor ? r(e.outlineColor).value : void 0
    ), y = F(
      () => e.labelColor ? r(e.labelColor).value : void 0
    ), O = F(
      () => l(e.colorPalette || "default").value
    ), M = F(
      () => e.seriesColors ? i(e.seriesColors).value : void 0
    ), z = F(() => ({
      type: "bar",
      stack: e.type === "stacked" || e.type === "stacked100" ? "total" : void 0,
      barMaxWidth: e.swapXY ? void 0 : 60,
      itemStyle: {
        color: C.value,
        opacity: e.fillOpacity,
        borderColor: g.value,
        borderWidth: e.outlineWidth
      },
      label: e.labels ? {
        show: !0,
        position: e.labelPosition || (e.swapXY ? "right" : "top"),
        fontSize: e.labelSize || 11,
        color: y.value,
        formatter: (b) => {
          const $ = e.swapXY ? b.value[0] : b.value[1];
          return e.labelFmt || e.yLabelFmt ? J($, u.value.y, m.value.y) : String($);
        }
      } : void 0,
      emphasis: {
        focus: "series"
      }
    })), I = F(() => {
      if (!e.x || !e.y) return [];
      const T = z.value;
      return ht(
        p.value,
        e.x,
        e.y,
        e.series,
        e.swapXY || !1,
        T,
        h.value,
        {
          y2: e.y2,
          seriesOrder: e.seriesOrder
        }
      );
    }), v = F(() => {
      var D;
      const T = { ...d.value };
      if (T.series = I.value, O.value && (T.color = O.value), e.type === "stacked100") {
        const V = T.yAxis;
        V && !e.swapXY && (V.max = 1, V.axisLabel = {
          ...V.axisLabel,
          formatter: (W) => `${Math.round(W * 100)}%`
        });
      }
      if (e.stackTotalLabel && (e.type === "stacked" || e.type === "stacked100")) {
        const V = {
          name: "stackTotal",
          type: "bar",
          stack: "total",
          itemStyle: { color: "transparent" },
          label: {
            show: !0,
            position: e.swapXY ? "right" : "top",
            formatter: (W) => {
              const le = I.value;
              let ve = 0;
              for (const me of le) {
                const ge = me.data[W.dataIndex];
                ve += ge[e.swapXY ? 0 : 1] || 0;
              }
              return J(ve, u.value.y, m.value.y);
            }
          },
          data: ((D = I.value[0]) == null ? void 0 : D.data.map(() => [0, 0])) || []
        };
        T.series.push(V);
      }
      const b = s.value;
      b.dataZoom && (T.dataZoom = b.dataZoom), b.toolbox && (T.toolbox = b.toolbox), b.brush && (T.brush = b.brush), b.animation !== void 0 && (T.animation = b.animation), b.animationDuration !== void 0 && (T.animationDuration = b.animationDuration), b.animationDurationUpdate !== void 0 && (T.animationDurationUpdate = b.animationDurationUpdate), b.animationEasing !== void 0 && (T.animationEasing = b.animationEasing), b.animationDelay !== void 0 && (T.animationDelay = b.animationDelay), b.animationThreshold !== void 0 && (T.animationThreshold = b.animationThreshold);
      const $ = c.value;
      return $ && Object.keys($).length > 0 && (T.tooltip = { ...T.tooltip, ...$ }), T;
    }), L = se(!1);
    return (T, b) => (fe(), we(ke, {
      config: v.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "series-colors": M.value,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      "show-all-x-axis-labels": e.showAllXAxisLabels,
      "swap-x-y": e.swapXY,
      onClick: b[0] || (b[0] = ($) => a("click", $)),
      onMouseenter: b[1] || (b[1] = ($) => L.value = !0),
      onMouseleave: b[2] || (b[2] = ($) => L.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: v.value,
          data: ee(p),
          "chart-title": e.title,
          theme: ee(n),
          "series-colors": M.value,
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: L.value
        }, null, 8, ["config", "data", "chart-title", "theme", "series-colors", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "series-colors", "echarts-options", "series-options", "show-all-x-axis-labels", "swap-x-y"]));
  }
}), si = /* @__PURE__ */ he({
  __name: "LineChart",
  props: {
    lineColor: {},
    lineType: { default: "solid" },
    lineOpacity: { default: 1 },
    lineWidth: { default: 2 },
    markers: { type: Boolean, default: !1 },
    markerShape: { default: "circle" },
    markerSize: { default: 8 },
    handleMissing: { default: "gap" },
    step: { type: Boolean, default: !1 },
    stepPosition: { default: "middle" },
    labels: { type: Boolean },
    labelSize: {},
    labelPosition: {},
    labelColor: {},
    showAllLabels: { type: Boolean },
    seriesOrder: {},
    seriesLabelFmt: {},
    y2SeriesType: {},
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    titleIcon: {},
    subtitle: {},
    description: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    zoom: { type: [Boolean, Object] },
    toolbox: { type: [Boolean, Object] },
    brush: { type: [Boolean, Object] },
    animation: { type: [Boolean, Object] },
    tooltip: { type: [Boolean, Object] },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColor: r, resolveColorPalette: l, resolveColorsObject: i } = ye(), {
      interactiveConfig: s,
      tooltipBaseConfig: c
    } = Ft({
      zoom: () => e.zoom,
      toolbox: () => e.toolbox,
      brush: () => e.brush,
      animation: () => e.animation,
      tooltip: () => e.tooltip,
      swapXY: () => !1,
      chartType: "line"
    }), {
      processedData: p,
      columnSummary: h,
      xAxisType: f,
      baseConfig: d,
      formats: u,
      unitSummaries: m
    } = Ue(e, {}), C = F(
      () => e.lineColor ? r(e.lineColor).value : void 0
    ), g = F(
      () => e.labelColor ? r(e.labelColor).value : void 0
    ), y = F(
      () => l(e.colorPalette || "default").value
    ), O = F(
      () => e.seriesColors ? i(e.seriesColors).value : void 0
    ), M = {
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted"
    }, z = {
      start: "start",
      middle: "middle",
      end: "end"
    }, I = F(() => ({
      type: "line",
      smooth: !1,
      step: e.step ? z[e.stepPosition || "middle"] : !1,
      connectNulls: e.handleMissing === "connect",
      lineStyle: {
        color: C.value,
        width: e.lineWidth,
        opacity: e.lineOpacity,
        type: M[e.lineType || "solid"]
      },
      itemStyle: {
        color: C.value
      },
      symbol: e.markers ? e.markerShape : "none",
      symbolSize: e.markers ? e.markerSize : 0,
      label: e.labels ? {
        show: !0,
        position: e.labelPosition || "top",
        fontSize: e.labelSize || 11,
        color: g.value,
        formatter: (b) => {
          const $ = b.value[1];
          return e.labelFmt || e.yLabelFmt ? J($, u.value.y, m.value.y) : String($);
        }
      } : void 0,
      emphasis: {
        focus: "series",
        lineStyle: {
          width: (e.lineWidth || 2) + 1
        }
      }
    })), v = F(() => {
      if (!e.x || !e.y) return [];
      let b = p.value;
      if (e.handleMissing === "zero") {
        const $ = Array.isArray(e.y) ? e.y : [e.y];
        b = b.map((D) => {
          const V = { ...D };
          for (const W of $)
            V[W] == null && (V[W] = 0);
          return V;
        });
      }
      return ht(
        b,
        e.x,
        e.y,
        e.series,
        !1,
        I.value,
        h.value,
        {
          y2: e.y2,
          seriesOrder: e.seriesOrder
        }
      );
    }), L = F(() => {
      var V, W;
      const b = { ...d.value };
      b.series = v.value, y.value && (b.color = y.value);
      const $ = s.value;
      $.dataZoom && (b.dataZoom = $.dataZoom), $.toolbox && (b.toolbox = $.toolbox), $.brush && (b.brush = $.brush), $.animation !== void 0 && (b.animation = $.animation), $.animationDuration !== void 0 && (b.animationDuration = $.animationDuration), $.animationDurationUpdate !== void 0 && (b.animationDurationUpdate = $.animationDurationUpdate), $.animationEasing !== void 0 && (b.animationEasing = $.animationEasing), $.animationDelay !== void 0 && (b.animationDelay = $.animationDelay), $.animationThreshold !== void 0 && (b.animationThreshold = $.animationThreshold);
      const D = c.value;
      return D && Object.keys(D).length > 0 && (b.tooltip = { ...b.tooltip, ...D }), console.log("[LineChart] Final config:", {
        xAxis: b.xAxis,
        xAxisName: (V = b.xAxis) == null ? void 0 : V.name,
        legend: b.legend,
        legendShow: (W = b.legend) == null ? void 0 : W.show,
        seriesCount: Array.isArray(b.series) ? b.series.length : 0,
        seriesNames: Array.isArray(b.series) ? b.series.map((le) => String(le.name || "")) : [],
        grid: b.grid
      }), b;
    }), T = se(!1);
    return (b, $) => (fe(), we(ke, {
      config: L.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "series-colors": O.value,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      "show-all-x-axis-labels": e.showAllXAxisLabels,
      onClick: $[0] || ($[0] = (D) => a("click", D)),
      onMouseenter: $[1] || ($[1] = (D) => T.value = !0),
      onMouseleave: $[2] || ($[2] = (D) => T.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: L.value,
          data: ee(p),
          "chart-title": e.title,
          theme: ee(n),
          "series-colors": O.value,
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: T.value
        }, null, 8, ["config", "data", "chart-title", "theme", "series-colors", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "series-colors", "echarts-options", "series-options", "show-all-x-axis-labels"]));
  }
}), ci = /* @__PURE__ */ he({
  __name: "AreaChart",
  props: {
    type: { default: "stacked" },
    fillColor: {},
    fillOpacity: { default: 0.7 },
    lineColor: {},
    lineType: { default: "solid" },
    lineWidth: { default: 2 },
    markers: { type: Boolean, default: !1 },
    markerShape: { default: "circle" },
    markerSize: { default: 8 },
    handleMissing: { default: "gap" },
    step: { type: Boolean, default: !1 },
    stepPosition: { default: "middle" },
    labels: { type: Boolean },
    labelSize: {},
    labelPosition: {},
    labelColor: {},
    showAllLabels: { type: Boolean },
    seriesOrder: {},
    seriesLabelFmt: {},
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    titleIcon: {},
    subtitle: {},
    description: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    zoom: { type: [Boolean, Object] },
    toolbox: { type: [Boolean, Object] },
    brush: { type: [Boolean, Object] },
    animation: { type: [Boolean, Object] },
    tooltip: { type: [Boolean, Object] },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColor: r, resolveColorPalette: l, resolveColorsObject: i } = ye(), {
      interactiveConfig: s,
      tooltipBaseConfig: c
    } = Ft({
      zoom: () => e.zoom,
      toolbox: () => e.toolbox,
      brush: () => e.brush,
      animation: () => e.animation,
      tooltip: () => e.tooltip,
      swapXY: () => !1,
      chartType: "area"
    }), {
      processedData: p,
      columnSummary: h,
      xAxisType: f,
      baseConfig: d,
      formats: u,
      unitSummaries: m
    } = Ue(e, {
      stacked100: e.type === "stacked100"
    }), C = F(
      () => e.fillColor ? r(e.fillColor).value : void 0
    ), g = F(
      () => e.lineColor ? r(e.lineColor).value : void 0
    ), y = F(
      () => e.labelColor ? r(e.labelColor).value : void 0
    ), O = F(
      () => l(e.colorPalette || "default").value
    ), M = F(
      () => e.seriesColors ? i(e.seriesColors).value : void 0
    ), z = {
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted"
    }, I = {
      start: "start",
      middle: "middle",
      end: "end"
    }, v = F(() => ({
      type: "line",
      stack: "total",
      smooth: !1,
      step: e.step ? I[e.stepPosition || "middle"] : !1,
      connectNulls: e.handleMissing === "connect",
      areaStyle: {
        color: C.value,
        opacity: e.fillOpacity
      },
      lineStyle: {
        color: g.value,
        width: e.lineWidth,
        type: z[e.lineType || "solid"]
      },
      itemStyle: {
        color: g.value || C.value
      },
      symbol: e.markers ? e.markerShape : "none",
      symbolSize: e.markers ? e.markerSize : 0,
      label: e.labels ? {
        show: !0,
        position: e.labelPosition || "top",
        fontSize: e.labelSize || 11,
        color: y.value,
        formatter: ($) => {
          const D = $.value[1];
          return e.labelFmt || e.yLabelFmt ? J(D, u.value.y, m.value.y) : String(D);
        }
      } : void 0,
      emphasis: {
        focus: "series"
      }
    })), L = F(() => {
      if (!e.x || !e.y) return [];
      let $ = p.value;
      if (e.handleMissing === "zero") {
        const D = Array.isArray(e.y) ? e.y : [e.y];
        $ = $.map((V) => {
          const W = { ...V };
          for (const le of D)
            W[le] == null && (W[le] = 0);
          return W;
        });
      }
      return ht(
        $,
        e.x,
        e.y,
        e.series,
        !1,
        v.value,
        h.value,
        {
          seriesOrder: e.seriesOrder
        }
      );
    }), T = F(() => {
      const $ = { ...d.value };
      if ($.series = L.value, O.value && ($.color = O.value), e.type === "stacked100") {
        const W = $.yAxis;
        W && (W.max = 1, W.axisLabel = {
          ...W.axisLabel,
          formatter: (le) => `${Math.round(le * 100)}%`
        });
      }
      const D = s.value;
      D.dataZoom && ($.dataZoom = D.dataZoom), D.toolbox && ($.toolbox = D.toolbox), D.brush && ($.brush = D.brush), D.animation !== void 0 && ($.animation = D.animation), D.animationDuration !== void 0 && ($.animationDuration = D.animationDuration), D.animationDurationUpdate !== void 0 && ($.animationDurationUpdate = D.animationDurationUpdate), D.animationEasing !== void 0 && ($.animationEasing = D.animationEasing), D.animationDelay !== void 0 && ($.animationDelay = D.animationDelay), D.animationThreshold !== void 0 && ($.animationThreshold = D.animationThreshold);
      const V = c.value;
      return V && Object.keys(V).length > 0 && ($.tooltip = { ...$.tooltip, ...V }), $;
    }), b = se(!1);
    return ($, D) => (fe(), we(ke, {
      config: T.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "series-colors": M.value,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      "show-all-x-axis-labels": e.showAllXAxisLabels,
      onClick: D[0] || (D[0] = (V) => a("click", V)),
      onMouseenter: D[1] || (D[1] = (V) => b.value = !0),
      onMouseleave: D[2] || (D[2] = (V) => b.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: T.value,
          data: ee(p),
          "chart-title": e.title,
          theme: ee(n),
          "series-colors": M.value,
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: b.value
        }, null, 8, ["config", "data", "chart-title", "theme", "series-colors", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "series-colors", "echarts-options", "series-options", "show-all-x-axis-labels"]));
  }
}), ui = /* @__PURE__ */ he({
  __name: "ScatterPlot",
  props: {
    pointColor: {},
    pointOpacity: { default: 0.7 },
    pointSize: { default: 10 },
    pointShape: { default: "circle" },
    outlineColor: {},
    outlineWidth: { default: 1 },
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    titleIcon: {},
    subtitle: {},
    description: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    zoom: { type: [Boolean, Object] },
    toolbox: { type: [Boolean, Object] },
    brush: { type: [Boolean, Object] },
    animation: { type: [Boolean, Object] },
    tooltip: { type: [Boolean, Object] },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColor: r, resolveColorPalette: l, resolveColorsObject: i } = ye(), { scatterFormatter: s } = vo(), {
      interactiveConfig: c,
      tooltipBaseConfig: p
    } = Ft({
      zoom: () => e.zoom,
      toolbox: () => e.toolbox,
      brush: () => e.brush,
      animation: () => e.animation,
      tooltip: () => e.tooltip,
      swapXY: () => !1,
      chartType: "scatter"
    }), {
      processedData: h,
      columnSummary: f,
      xAxisType: d,
      baseConfig: u,
      formats: m,
      unitSummaries: C
    } = Ue(e, {
      xType: e.xType || "value"
      // Default to value axis for scatter
    }), g = F(
      () => e.pointColor ? r(e.pointColor).value : void 0
    ), y = F(
      () => e.outlineColor ? r(e.outlineColor).value : void 0
    ), O = F(
      () => l(e.colorPalette || "default").value
    ), M = F(
      () => e.seriesColors ? i(e.seriesColors).value : void 0
    ), z = F(() => ({
      type: "scatter",
      symbol: e.pointShape,
      symbolSize: e.pointSize,
      itemStyle: {
        color: g.value,
        opacity: e.pointOpacity,
        borderColor: y.value,
        borderWidth: e.outlineWidth
      },
      emphasis: {
        focus: "series",
        itemStyle: {
          borderWidth: (e.outlineWidth || 1) + 1
        }
      }
    })), I = F(() => !e.x || !e.y ? [] : ht(
      h.value,
      e.x,
      e.y,
      e.series,
      !1,
      z.value,
      f.value,
      {
        tooltipTitle: e.tooltipTitle
      }
    )), v = F(() => {
      const T = { ...u.value };
      T.series = I.value, O.value && (T.color = O.value), T.tooltip = {
        ...T.tooltip,
        trigger: "item",
        formatter: (D) => s(D, {
          xColumn: e.x,
          yColumn: e.y,
          xFormat: m.value.x,
          yFormat: m.value.y,
          tooltipTitle: e.tooltipTitle
        })
      }, e.xType || (T.xAxis.type = "value");
      const b = c.value;
      b.dataZoom && (T.dataZoom = b.dataZoom), b.toolbox && (T.toolbox = b.toolbox), b.brush && (T.brush = b.brush), b.animation !== void 0 && (T.animation = b.animation), b.animationDuration !== void 0 && (T.animationDuration = b.animationDuration), b.animationDurationUpdate !== void 0 && (T.animationDurationUpdate = b.animationDurationUpdate), b.animationEasing !== void 0 && (T.animationEasing = b.animationEasing), b.animationDelay !== void 0 && (T.animationDelay = b.animationDelay), b.animationThreshold !== void 0 && (T.animationThreshold = b.animationThreshold);
      const $ = p.value;
      if ($ && Object.keys($).length > 0) {
        const { show: D, confine: V, enterable: W, axisPointer: le, backgroundColor: ve, borderColor: me, textStyle: ge } = $;
        D !== void 0 && (T.tooltip.show = D), V !== void 0 && (T.tooltip.confine = V), W !== void 0 && (T.tooltip.enterable = W), le !== void 0 && (T.tooltip.axisPointer = le), ve !== void 0 && (T.tooltip.backgroundColor = ve), me !== void 0 && (T.tooltip.borderColor = me), ge !== void 0 && (T.tooltip.textStyle = ge);
      }
      return T;
    }), L = se(!1);
    return (T, b) => (fe(), we(ke, {
      config: v.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "series-colors": M.value,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      onClick: b[0] || (b[0] = ($) => a("click", $)),
      onMouseenter: b[1] || (b[1] = ($) => L.value = !0),
      onMouseleave: b[2] || (b[2] = ($) => L.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: v.value,
          data: ee(h),
          "chart-title": e.title,
          theme: ee(n),
          "series-colors": M.value,
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: L.value
        }, null, 8, ["config", "data", "chart-title", "theme", "series-colors", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "series-colors", "echarts-options", "series-options"]));
  }
}), di = /* @__PURE__ */ he({
  __name: "BubbleChart",
  props: {
    pointColor: {},
    pointOpacity: { default: 0.7 },
    minSize: { default: 5 },
    maxSize: { default: 50 },
    outlineColor: {},
    outlineWidth: { default: 1 },
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    titleIcon: {},
    subtitle: {},
    description: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    zoom: { type: [Boolean, Object] },
    toolbox: { type: [Boolean, Object] },
    brush: { type: [Boolean, Object] },
    animation: { type: [Boolean, Object] },
    tooltip: { type: [Boolean, Object] },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColor: r, resolveColorPalette: l, resolveColorsObject: i } = ye(), { scatterFormatter: s } = vo(), {
      processedData: c,
      columnSummary: p,
      xAxisType: h,
      baseConfig: f,
      formats: d,
      unitSummaries: u
    } = Ue(e, {
      xType: e.xType || "value"
    }), m = F(
      () => e.pointColor ? r(e.pointColor).value : void 0
    ), C = F(
      () => e.outlineColor ? r(e.outlineColor).value : void 0
    ), g = F(
      () => l(e.colorPalette || "default").value
    ), y = F(
      () => e.seriesColors ? i(e.seriesColors).value : void 0
    ), O = F(() => {
      if (e.sizeFmt)
        return pe(e.sizeFmt);
      if (e.size && p.value[e.size])
        return p.value[e.size].format;
    }), M = F(() => {
      if (!e.size || !c.value.length)
        return { min: 0, max: 1 };
      const T = c.value.map((b) => b[e.size]).filter((b) => b != null && !isNaN(b));
      return {
        min: Math.min(...T),
        max: Math.max(...T)
      };
    }), z = F(() => ({
      type: "scatter",
      itemStyle: {
        color: m.value,
        opacity: e.pointOpacity,
        borderColor: C.value,
        borderWidth: e.outlineWidth
      },
      emphasis: {
        focus: "series",
        itemStyle: {
          borderWidth: (e.outlineWidth || 1) + 1
        }
      }
    })), I = F(() => {
      if (!e.x || !e.y || !e.size) return [];
      const T = ht(
        c.value,
        e.x,
        e.y,
        e.series,
        !1,
        z.value,
        p.value,
        {
          size: e.size,
          tooltipTitle: e.tooltipTitle
        }
      ), { min: b, max: $ } = M.value, D = $ - b || 1;
      return T.map((V) => ({
        ...V,
        symbolSize: (W) => {
          const le = W[2];
          if (le == null) return e.minSize;
          const ve = (le - b) / D;
          return e.minSize + ve * (e.maxSize - e.minSize);
        }
      }));
    }), v = F(() => {
      const T = { ...f.value };
      return T.series = I.value, g.value && (T.color = g.value), T.tooltip = {
        ...T.tooltip,
        trigger: "item",
        formatter: (b) => s(b, {
          xColumn: e.x,
          yColumn: e.y,
          xFormat: d.value.x,
          yFormat: d.value.y,
          size: e.size,
          sizeFormat: O.value,
          tooltipTitle: e.tooltipTitle
        })
      }, e.xType || (T.xAxis.type = "value"), T;
    }), L = se(!1);
    return (T, b) => (fe(), we(ke, {
      config: v.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "series-colors": y.value,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      onClick: b[0] || (b[0] = ($) => a("click", $)),
      onMouseenter: b[1] || (b[1] = ($) => L.value = !0),
      onMouseleave: b[2] || (b[2] = ($) => L.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: v.value,
          data: ee(c),
          "chart-title": e.title,
          theme: ee(n),
          "series-colors": y.value,
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: L.value
        }, null, 8, ["config", "data", "chart-title", "theme", "series-colors", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "series-colors", "echarts-options", "series-options"]));
  }
}), fi = /* @__PURE__ */ he({
  __name: "BoxPlot",
  props: {
    min: {},
    max: {},
    midpoint: {},
    confidenceIntervalLower: {},
    confidenceIntervalUpper: {},
    fillColor: {},
    fillOpacity: { default: 0.8 },
    outlineColor: {},
    outlineWidth: { default: 1.5 },
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    titleIcon: {},
    subtitle: {},
    description: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    zoom: { type: [Boolean, Object] },
    toolbox: { type: [Boolean, Object] },
    brush: { type: [Boolean, Object] },
    animation: { type: [Boolean, Object] },
    tooltip: { type: [Boolean, Object] },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColor: r, resolveColorPalette: l } = ye(), {
      processedData: i,
      columnSummary: s,
      baseConfig: c,
      formats: p,
      unitSummaries: h
    } = Ue(e, {}), f = F(
      () => e.fillColor ? r(e.fillColor).value : void 0
    ), d = F(
      () => e.outlineColor ? r(e.outlineColor).value : void 0
    ), u = F(
      () => l(e.colorPalette || "default").value
    ), m = F(() => {
      if (!e.x) return { categories: [], data: [] };
      const y = dt(i.value, e.x), O = y.map((M) => {
        const z = i.value.find(($) => $[e.x] === M);
        if (!z) return [0, 0, 0, 0, 0];
        const I = z[e.min] ?? 0, v = z[e.confidenceIntervalLower] ?? 0, L = z[e.midpoint] ?? 0, T = z[e.confidenceIntervalUpper] ?? 0, b = z[e.max] ?? 0;
        return [I, v, L, T, b];
      });
      return { categories: y, data: O };
    }), C = F(() => {
      const y = { ...c.value }, { categories: O, data: M } = m.value;
      return y.xAxis = {
        ...y.xAxis,
        type: "category",
        data: O
      }, y.yAxis = {
        ...y.yAxis,
        type: "value"
      }, y.series = [
        {
          name: "boxplot",
          type: "boxplot",
          data: M,
          itemStyle: {
            color: f.value,
            opacity: e.fillOpacity,
            borderColor: d.value,
            borderWidth: e.outlineWidth
          }
        }
      ], u.value && (y.color = u.value), y.tooltip = {
        ...y.tooltip,
        trigger: "item",
        formatter: (z) => {
          const I = z, [v, L, T, b, $] = I.value;
          let D = `<span style='font-weight: 600;'>${I.name}</span><br/>`;
          return D += `Min: <span style='float:right; margin-left: 10px;'>${J(v, p.value.y, h.value.y)}</span><br/>`, D += `Q1: <span style='float:right; margin-left: 10px;'>${J(L, p.value.y, h.value.y)}</span><br/>`, D += `Median: <span style='float:right; margin-left: 10px;'>${J(T, p.value.y, h.value.y)}</span><br/>`, D += `Q3: <span style='float:right; margin-left: 10px;'>${J(b, p.value.y, h.value.y)}</span><br/>`, D += `Max: <span style='float:right; margin-left: 10px;'>${J($, p.value.y, h.value.y)}</span>`, D;
        }
      }, y;
    }), g = se(!1);
    return (y, O) => (fe(), we(ke, {
      config: C.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      onClick: O[0] || (O[0] = (M) => a("click", M)),
      onMouseenter: O[1] || (O[1] = (M) => g.value = !0),
      onMouseleave: O[2] || (O[2] = (M) => g.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: C.value,
          data: ee(i),
          "chart-title": e.title,
          theme: ee(n),
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: g.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "echarts-options", "series-options"]));
  }
}), pi = /* @__PURE__ */ he({
  __name: "Histogram",
  props: {
    fillColor: {},
    fillOpacity: { default: 0.8 },
    outlineColor: {},
    outlineWidth: { default: 1 },
    bins: { default: 10 },
    data: {},
    x: {},
    y: {},
    y2: {},
    series: {},
    size: {},
    tooltipTitle: {},
    xFmt: {},
    yFmt: {},
    y2Fmt: {},
    sizeFmt: {},
    labelFmt: {},
    yLabelFmt: {},
    y2LabelFmt: {},
    title: {},
    titleIcon: {},
    subtitle: {},
    description: {},
    xAxisTitle: { type: [String, Boolean] },
    yAxisTitle: { type: [String, Boolean] },
    y2AxisTitle: { type: [String, Boolean] },
    xType: {},
    xMin: {},
    xMax: {},
    xBaseline: { type: Boolean, default: !0 },
    xTickMarks: { type: Boolean },
    xGridlines: { type: Boolean },
    xAxisLabels: { type: Boolean, default: !0 },
    showAllXAxisLabels: { type: Boolean },
    xLabelWrap: { type: Boolean },
    yType: {},
    yLog: { type: Boolean },
    yLogBase: {},
    yMin: {},
    yMax: {},
    yScale: { type: Boolean },
    yBaseline: { type: Boolean },
    yTickMarks: { type: Boolean },
    yGridlines: { type: Boolean, default: !0 },
    yAxisLabels: { type: Boolean, default: !0 },
    yAxisColor: {},
    y2Min: {},
    y2Max: {},
    y2Scale: { type: Boolean },
    y2Baseline: { type: Boolean },
    y2TickMarks: { type: Boolean },
    y2Gridlines: { type: Boolean },
    y2AxisLabels: { type: Boolean },
    y2AxisColor: {},
    legend: { type: Boolean },
    height: {},
    width: {},
    chartAreaHeight: {},
    swapXY: { type: Boolean },
    sort: { type: Boolean },
    colorPalette: {},
    seriesColors: {},
    echartsOptions: {},
    seriesOptions: {},
    renderer: {},
    connectGroup: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 },
    zoom: { type: [Boolean, Object] },
    toolbox: { type: [Boolean, Object] },
    brush: { type: [Boolean, Object] },
    animation: { type: [Boolean, Object] },
    tooltip: { type: [Boolean, Object] },
    leftPadding: {},
    rightPadding: {}
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColor: r, resolveColorPalette: l } = ye(), {
      processedData: i,
      columnSummary: s,
      baseConfig: c,
      formats: p,
      unitSummaries: h
    } = Ue(e, {}), f = F(
      () => e.fillColor ? r(e.fillColor).value : void 0
    ), d = F(
      () => e.outlineColor ? r(e.outlineColor).value : void 0
    ), u = F(
      () => l(e.colorPalette || "default").value
    ), m = F(() => {
      if (!e.x || !i.value.length)
        return { bins: [], counts: [] };
      const y = i.value.map((T) => T[e.x]).filter((T) => T != null && !isNaN(T)).sort((T, b) => T - b);
      if (y.length === 0)
        return { bins: [], counts: [] };
      const O = y[0], I = (y[y.length - 1] - O) / e.bins, v = [], L = [];
      for (let T = 0; T < e.bins; T++) {
        const b = O + T * I, $ = O + (T + 1) * I;
        v.push({
          start: b,
          end: $,
          label: `${J(b, p.value.x, h.value.x)} - ${J($, p.value.x, h.value.x)}`
        });
        const D = y.filter((V) => T === e.bins - 1 ? V >= b && V <= $ : V >= b && V < $).length;
        L.push(D);
      }
      return { bins: v, counts: L };
    }), C = F(() => {
      var I;
      const y = { ...c.value }, { bins: O, counts: M } = m.value, z = y.xAxis;
      return y.xAxis = {
        ...z,
        type: "category",
        data: O.map((v) => v.label),
        axisLabel: {
          ...z == null ? void 0 : z.axisLabel,
          rotate: 45,
          interval: 0
        }
      }, y.yAxis = {
        ...y.yAxis,
        type: "value",
        name: "Count"
      }, y.series = [
        {
          name: "Frequency",
          type: "bar",
          data: M,
          barWidth: "90%",
          itemStyle: {
            color: f.value || ((I = u.value) == null ? void 0 : I[0]),
            opacity: e.fillOpacity,
            borderColor: d.value,
            borderWidth: e.outlineWidth
          }
        }
      ], u.value && (y.color = u.value), y.tooltip = {
        ...y.tooltip,
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (v) => {
          const T = v[0];
          return `<span style='font-weight: 600;'>${T.name}</span><br/>Count: <span style='float:right; margin-left: 10px;'>${T.value}</span>`;
        }
      }, y;
    }), g = se(!1);
    return (y, O) => (fe(), we(ke, {
      config: C.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "connect-group": e.connectGroup,
      "echarts-options": e.echartsOptions,
      "series-options": e.seriesOptions,
      onClick: O[0] || (O[0] = (M) => a("click", M)),
      onMouseenter: O[1] || (O[1] = (M) => g.value = !0),
      onMouseleave: O[2] || (O[2] = (M) => g.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: C.value,
          data: ee(i),
          "chart-title": e.title,
          theme: ee(n),
          "echarts-options": e.echartsOptions,
          "series-options": e.seriesOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: g.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "series-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "connect-group", "echarts-options", "series-options"]));
  }
}), hi = /* @__PURE__ */ he({
  __name: "FunnelChart",
  props: {
    data: {},
    name: {},
    value: {},
    title: {},
    subtitle: {},
    legend: { type: Boolean, default: !0 },
    height: { default: "400px" },
    width: { default: "100%" },
    chartAreaHeight: {},
    colorPalette: {},
    valueFmt: {},
    percentFmt: {},
    showPercent: { type: Boolean, default: !0 },
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColorPalette: r } = ye(), l = F(
      () => r(e.colorPalette || "default").value
    ), i = F(
      () => e.valueFmt ? pe(e.valueFmt) : void 0
    ), s = F(
      () => e.percentFmt ? pe(e.percentFmt) : { formatTag: "pct1", formatCode: "#,##0.0%", valueType: "number" }
    ), c = F(() => {
      var m;
      if (!((m = e.data) != null && m.length)) return [];
      const d = e.name || Object.keys(e.data[0])[0], u = e.value || Object.keys(e.data[0])[1];
      return e.data.map((C) => ({
        name: String(C[d]),
        value: C[u]
      }));
    }), p = F(() => c.value.length ? Math.max(...c.value.map((d) => d.value)) : 0), h = F(() => {
      const d = !!e.title, u = !!e.subtitle, m = e.legend, C = (d ? 15 : 0) + (u ? 13 : 0) + (d || u ? 6 : 0), g = m ? 25 : 0, y = C + 7, O = y + g + 10;
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          formatter: (M) => {
            const z = M;
            let I = `<span style='font-weight: 600;'>${z.name}</span><br/>`;
            if (I += `Value: <span style='float:right; margin-left: 10px;'>${J(z.value, i.value)}</span>`, e.showPercent && p.value > 0) {
              const v = z.value / p.value;
              I += `<br/>Percent: <span style='float:right; margin-left: 10px;'>${J(v, s.value)}</span>`;
            }
            return I;
          }
        },
        legend: {
          show: e.legend,
          type: "scroll",
          top: y,
          data: c.value.map((M) => M.name)
        },
        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            top: O,
            bottom: 20,
            width: "80%",
            min: 0,
            max: p.value || 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: !0,
              position: "inside",
              formatter: (M) => {
                const z = M;
                if (e.showPercent && p.value > 0) {
                  const I = z.value / p.value;
                  return `${z.name}
${J(I, s.value)}`;
                }
                return z.name;
              }
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid"
              }
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 14
              }
            },
            data: c.value
          }
        ],
        color: l.value
      };
    }), f = se(!1);
    return (d, u) => (fe(), we(ke, {
      config: h.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: u[0] || (u[0] = (m) => a("click", m)),
      onMouseenter: u[1] || (u[1] = (m) => f.value = !0),
      onMouseleave: u[2] || (u[2] = (m) => f.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: h.value,
          data: e.data,
          "chart-title": e.title,
          theme: ee(n),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: f.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), mi = /* @__PURE__ */ he({
  __name: "Heatmap",
  props: {
    data: {},
    x: {},
    y: {},
    value: {},
    title: {},
    titleIcon: {},
    subtitle: {},
    description: {},
    legend: { type: Boolean, default: !0 },
    height: { default: "400px" },
    width: { default: "100%" },
    chartAreaHeight: {},
    colorScale: {},
    xFmt: {},
    yFmt: {},
    valueFmt: {},
    min: {},
    max: {},
    nullsZero: { type: Boolean, default: !1 },
    valueLabels: { type: Boolean, default: !0 },
    mobileValueLabels: { type: Boolean, default: !1 },
    zeroDisplay: { default: "—" },
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColorScale: r } = ye(), l = F(
      () => r(e.colorScale || "default").value
    ), i = F(
      () => e.xFmt ? pe(e.xFmt) : void 0
    ), s = F(
      () => e.yFmt ? pe(e.yFmt) : void 0
    ), c = F(
      () => e.valueFmt ? pe(e.valueFmt) : void 0
    ), p = F(() => {
      var y;
      if (!((y = e.data) != null && y.length) || !e.x || !e.y || !e.value)
        return { xCategories: [], yCategories: [], data: [], min: 0, max: 0 };
      const d = dt(e.data, e.x).map(String), u = dt(e.data, e.y).map(String), m = [];
      let C = 1 / 0, g = -1 / 0;
      for (const O of e.data) {
        const M = String(O[e.x]), z = String(O[e.y]), I = O[e.value], v = d.indexOf(M), L = u.indexOf(z);
        if (v !== -1 && L !== -1) {
          const T = e.nullsZero && I == null ? 0 : I;
          m.push([v, L, T]), T != null && (C = Math.min(C, T), g = Math.max(g, T));
        }
      }
      return C === 1 / 0 && (C = 0), g === -1 / 0 && (g = 0), e.min !== void 0 && (C = e.min), e.max !== void 0 && (g = e.max), { xCategories: d, yCategories: u, data: m, min: C, max: g };
    }), h = F(() => {
      const { xCategories: d, yCategories: u, data: m, min: C, max: g } = p.value, y = !!e.title, O = !!e.subtitle, M = !!e.description, z = (y ? 15 : 0) + (O ? 13 : 0) + (M ? 13 : 0) + (y || O ? 6 : 0), I = e.titleIcon && e.title ? `{icon|} ${e.title}` : e.title, v = e.description ? e.subtitle ? `${e.subtitle}
${e.description}` : e.description : e.subtitle;
      return {
        title: {
          text: I,
          subtext: v,
          textStyle: e.titleIcon ? {
            rich: {
              icon: {
                backgroundColor: {
                  image: e.titleIcon
                },
                height: 18,
                width: 18
              }
            }
          } : void 0,
          subtextStyle: M ? {
            lineHeight: 16
          } : void 0
        },
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: (L) => {
            const T = L, [b, $, D] = T.value, V = d[b], W = u[$];
            let le = `<span style='font-weight: 600;'>${J(V, i.value)} / ${J(W, s.value)}</span><br/>`;
            return le += `Value: <span style='float:right; margin-left: 10px;'>${D != null ? J(D, c.value) : "-"}</span>`, le;
          }
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "10%",
          top: z + 20,
          containLabel: !0
        },
        xAxis: {
          type: "category",
          data: d,
          splitArea: { show: !0 },
          axisLabel: {
            rotate: d.length > 10 ? 45 : 0
          }
        },
        yAxis: {
          type: "category",
          data: u,
          splitArea: { show: !0 }
        },
        visualMap: {
          show: e.legend,
          min: C,
          max: g,
          calculable: !0,
          orient: "vertical",
          right: "2%",
          top: "center",
          inRange: {
            color: l.value || ["#f0f9e8", "#0868ac"]
          }
        },
        series: [
          {
            name: "Heatmap",
            type: "heatmap",
            data: m,
            label: {
              show: e.valueLabels,
              formatter: (L) => {
                const b = L.value[2];
                return b === 0 ? e.zeroDisplay : b != null ? J(b, c.value) : "";
              }
            },
            labelLayout: {
              hideOverlap: !0
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],
        media: [
          {
            query: { maxWidth: 400 },
            option: {
              series: [{ label: { show: e.mobileValueLabels } }]
            }
          },
          {
            query: { minWidth: 400 },
            option: {
              series: [{ label: { show: e.valueLabels } }]
            }
          }
        ]
      };
    }), f = se(!1);
    return (d, u) => (fe(), we(ke, {
      config: h.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: u[0] || (u[0] = (m) => a("click", m)),
      onMouseenter: u[1] || (u[1] = (m) => f.value = !0),
      onMouseleave: u[2] || (u[2] = (m) => f.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: h.value,
          data: e.data,
          "chart-title": e.title,
          theme: ee(n),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: f.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), bi = /* @__PURE__ */ he({
  __name: "CalendarHeatmap",
  props: {
    data: {},
    date: {},
    value: {},
    title: {},
    subtitle: {},
    legend: { type: Boolean, default: !0 },
    height: { default: "200px" },
    width: { default: "100%" },
    colorScale: {},
    valueFmt: {},
    min: {},
    max: {},
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColorScale: r } = ye(), l = F(
      () => r(e.colorScale || "green").value
    ), i = F(
      () => e.valueFmt ? pe(e.valueFmt) : void 0
    ), s = F(() => {
      var O;
      if (!((O = e.data) != null && O.length) || !e.date || !e.value)
        return { data: [], range: ["", ""], min: 0, max: 0 };
      const d = [];
      let u = 1 / 0, m = -1 / 0, C = null, g = null;
      for (const M of e.data) {
        const z = Tt(M[e.date]), I = new Date(z), v = M[e.value];
        if (!isNaN(I.getTime()) && v != null) {
          const L = I.toISOString().split("T")[0];
          d.push([L, v]), u = Math.min(u, v), m = Math.max(m, v), (!C || I < C) && (C = I), (!g || I > g) && (g = I);
        }
      }
      u === 1 / 0 && (u = 0), m === -1 / 0 && (m = 0), e.min !== void 0 && (u = e.min), e.max !== void 0 && (m = e.max);
      let y = ["", ""];
      if (C && g) {
        const M = C.getFullYear(), z = g.getFullYear();
        M === z ? y = [`${M}-01-01`, `${M}-12-31`] : y = [`${M}-01-01`, `${z}-12-31`];
      }
      return { data: d, range: y, min: u, max: m };
    }), c = F(() => {
      const { range: d } = s.value;
      if (!d[0] || !d[1]) return 1;
      const u = parseInt(d[0].split("-")[0]);
      return parseInt(d[1].split("-")[0]) - u + 1;
    }), p = F(() => {
      const { data: d, range: u, min: m, max: C } = s.value, g = 13, y = g * 7 + 40, O = !!e.title, M = !!e.subtitle, z = (O ? 15 : 0) + (M ? 13 : 0) + (O || M ? 6 : 0), I = [], v = [], L = u[0] ? parseInt(u[0].split("-")[0]) : (/* @__PURE__ */ new Date()).getFullYear(), T = c.value;
      for (let b = 0; b < T; b++) {
        const $ = L + b, D = z + 30 + b * y;
        I.push({
          top: D,
          left: 60,
          right: e.legend ? 100 : 30,
          cellSize: [g, g],
          range: `${$}`,
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: { show: T > 1, position: "left" },
          monthLabel: { show: !0 },
          dayLabel: { firstDay: 0, show: !0 }
        }), v.push({
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: b,
          data: d.filter((V) => V[0].startsWith(`${$}`))
        });
      }
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          formatter: (b) => {
            const $ = b, [D, V] = $.value;
            let W = `<span style='font-weight: 600;'>${D}</span><br/>`;
            return W += `Value: <span style='float:right; margin-left: 10px;'>${J(V, i.value)}</span>`, W;
          }
        },
        visualMap: {
          show: e.legend,
          min: m,
          max: C,
          calculable: !0,
          orient: "vertical",
          right: "2%",
          top: "center",
          inRange: {
            color: l.value || ["#ebedf0", "#216e39"]
          }
        },
        calendar: I,
        series: v
      };
    }), h = F(() => e.height !== "200px" ? e.height : `${60 + c.value * 140}px`), f = se(!1);
    return (d, u) => (fe(), we(ke, {
      config: p.value,
      height: h.value,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: u[0] || (u[0] = (m) => a("click", m)),
      onMouseenter: u[1] || (u[1] = (m) => f.value = !0),
      onMouseleave: u[2] || (u[2] = (m) => f.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: p.value,
          data: e.data,
          "chart-title": e.title,
          theme: ee(n),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: f.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), gi = /* @__PURE__ */ he({
  __name: "SankeyDiagram",
  props: {
    data: {},
    source: {},
    target: {},
    value: {},
    title: {},
    subtitle: {},
    height: { default: "400px" },
    width: { default: "100%" },
    chartAreaHeight: {},
    colorPalette: {},
    valueFmt: {},
    orient: { default: "horizontal" },
    nodeWidth: { default: 20 },
    nodeGap: { default: 8 },
    nodeAlign: { default: "justify" },
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColorPalette: r } = ye(), l = F(
      () => r(e.colorPalette || "default").value
    ), i = F(
      () => e.valueFmt ? pe(e.valueFmt) : void 0
    ), s = F(() => {
      var u;
      if (!((u = e.data) != null && u.length) || !e.source || !e.target || !e.value)
        return { nodes: [], links: [] };
      const h = /* @__PURE__ */ new Set(), f = [];
      for (const m of e.data) {
        const C = String(m[e.source]), g = String(m[e.target]), y = m[e.value];
        h.add(C), h.add(g), f.push({ source: C, target: g, value: y });
      }
      return { nodes: Array.from(h).map((m) => ({ name: m })), links: f };
    }), c = F(() => {
      const { nodes: h, links: f } = s.value, d = !!e.title, u = !!e.subtitle, m = (d ? 15 : 0) + (u ? 13 : 0) + (d || u ? 6 : 0);
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          formatter: (C) => {
            const g = C;
            return g.data.source && g.data.target ? `${g.data.source} → ${g.data.target}<br/>Value: ${J(g.data.value, i.value)}` : g.data.name || "";
          }
        },
        series: [
          {
            type: "sankey",
            orient: e.orient,
            nodeWidth: e.nodeWidth,
            nodeGap: e.nodeGap,
            nodeAlign: e.nodeAlign,
            layoutIterations: 32,
            left: "5%",
            right: "15%",
            top: m + 20,
            bottom: 20,
            data: h,
            links: f,
            emphasis: {
              focus: "adjacency"
            },
            lineStyle: {
              color: "gradient",
              curveness: 0.5
            },
            label: {
              show: !0,
              position: e.orient === "horizontal" ? "right" : "top"
            }
          }
        ],
        color: l.value
      };
    }), p = se(!1);
    return (h, f) => (fe(), we(ke, {
      config: c.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: f[0] || (f[0] = (d) => a("click", d)),
      onMouseenter: f[1] || (f[1] = (d) => p.value = !0),
      onMouseleave: f[2] || (f[2] = (d) => p.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: c.value,
          data: e.data,
          "chart-title": e.title,
          theme: ee(n),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: p.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), Gl = {
  key: 0,
  class: "map-loading"
}, Vl = /* @__PURE__ */ he({
  __name: "USMap",
  props: {
    data: {},
    state: {},
    value: {},
    title: {},
    subtitle: {},
    legend: { type: Boolean, default: !0 },
    height: { default: "500px" },
    width: { default: "100%" },
    colorScale: {},
    valueFmt: {},
    min: {},
    max: {},
    link: {},
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    Ko((f) => ({
      v797cb4a2: e.height
    }));
    const e = t, a = o, { activeAppearance: n, resolveColorScale: r } = ye(), l = F(
      () => r(e.colorScale || "blue").value
    ), i = F(
      () => e.valueFmt ? pe(e.valueFmt) : void 0
    ), s = se(!1);
    Ne(async () => {
      try {
        const d = await (await fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")).json();
        Te.registerMap("USA", d), s.value = !0;
      } catch (f) {
        console.warn("Failed to load US GeoJSON:", f);
      }
    });
    const c = F(() => {
      var m;
      if (!((m = e.data) != null && m.length) || !e.state || !e.value)
        return { data: [], min: 0, max: 0 };
      let f = 1 / 0, d = -1 / 0;
      const u = e.data.map((C) => {
        const g = C[e.value];
        return g != null && (f = Math.min(f, g), d = Math.max(d, g)), {
          name: String(C[e.state]),
          value: g
        };
      });
      return f === 1 / 0 && (f = 0), d === -1 / 0 && (d = 0), e.min !== void 0 && (f = e.min), e.max !== void 0 && (d = e.max), { data: u, min: f, max: d };
    }), p = F(() => {
      const { data: f, min: d, max: u } = c.value;
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          formatter: (m) => {
            const C = m;
            let g = `<span style='font-weight: 600;'>${C.name}</span><br/>`;
            return g += `Value: <span style='float:right; margin-left: 10px;'>${C.value != null ? J(C.value, i.value) : "-"}</span>`, g;
          }
        },
        visualMap: {
          show: e.legend,
          min: d,
          max: u,
          left: "left",
          top: "bottom",
          calculable: !0,
          inRange: {
            color: l.value || ["#e0f3db", "#0868ac"]
          }
        },
        series: [
          {
            name: "USA",
            type: "map",
            map: "USA",
            roam: !0,
            emphasis: {
              label: {
                show: !0
              }
            },
            data: s.value ? f : []
          }
        ]
      };
    }), h = se(!1);
    return (f, d) => s.value ? (fe(), we(ke, {
      key: 1,
      config: p.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: d[0] || (d[0] = (u) => a("click", u)),
      onMouseenter: d[1] || (d[1] = (u) => h.value = !0),
      onMouseleave: d[2] || (d[2] = (u) => h.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: p.value,
          data: e.data,
          "chart-title": e.title,
          theme: ee(n),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: h.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"])) : (fe(), Ze("div", Gl, " Loading map data... "));
  }
}), yi = /* @__PURE__ */ Lt(Vl, [["__scopeId", "data-v-a521e317"]]), Hl = {
  key: 0,
  class: "map-loading"
}, Ul = /* @__PURE__ */ he({
  __name: "AreaMap",
  props: {
    data: {},
    areaCol: {},
    geoJsonUrl: {},
    geoId: { default: "id" },
    value: {},
    title: {},
    subtitle: {},
    legend: { type: Boolean, default: !0 },
    height: { default: "500px" },
    width: { default: "100%" },
    colorScale: {},
    valueFmt: {},
    min: {},
    max: {},
    link: {},
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    Ko((u) => ({
      v9d05a9ca: e.height
    }));
    const e = t, a = o, { activeAppearance: n, resolveColorScale: r } = ye(), l = F(
      () => r(e.colorScale || "blue").value
    ), i = F(
      () => e.valueFmt ? pe(e.valueFmt) : void 0
    ), s = se(!1), c = se(`custom_map_${Date.now()}`), p = async () => {
      if (e.geoJsonUrl)
        try {
          const m = await (await fetch(e.geoJsonUrl)).json();
          Te.registerMap(c.value, m), s.value = !0;
        } catch (u) {
          console.error("Failed to load GeoJSON:", u), s.value = !1;
        }
    };
    Ne(() => {
      p();
    }), Re(() => e.geoJsonUrl, () => {
      s.value = !1, c.value = `custom_map_${Date.now()}`, p();
    });
    const h = F(() => {
      var g;
      if (!((g = e.data) != null && g.length) || !e.areaCol || !e.value)
        return { data: [], min: 0, max: 0 };
      let u = 1 / 0, m = -1 / 0;
      const C = e.data.map((y) => {
        const O = y[e.value];
        return O != null && (u = Math.min(u, O), m = Math.max(m, O)), {
          name: String(y[e.areaCol]),
          value: O
        };
      });
      return u === 1 / 0 && (u = 0), m === -1 / 0 && (m = 0), e.min !== void 0 && (u = e.min), e.max !== void 0 && (m = e.max), { data: C, min: u, max: m };
    }), f = F(() => {
      const { data: u, min: m, max: C } = h.value;
      return {
        title: {
          text: e.title,
          subtext: e.subtitle
        },
        tooltip: {
          trigger: "item",
          formatter: (g) => {
            const y = g;
            let O = `<span style='font-weight: 600;'>${y.name}</span><br/>`;
            return O += `Value: <span style='float:right; margin-left: 10px;'>${y.value != null ? J(y.value, i.value) : "-"}</span>`, O;
          }
        },
        visualMap: {
          show: e.legend,
          min: m,
          max: C,
          left: "left",
          top: "bottom",
          calculable: !0,
          inRange: {
            color: l.value || ["#e0f3db", "#0868ac"]
          }
        },
        series: [
          {
            name: "Area Map",
            type: "map",
            map: c.value,
            roam: !0,
            emphasis: {
              label: {
                show: !0
              }
            },
            data: s.value ? u : []
          }
        ]
      };
    }), d = se(!1);
    return (u, m) => s.value ? (fe(), we(ke, {
      key: 1,
      config: f.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: m[0] || (m[0] = (C) => a("click", C)),
      onMouseenter: m[1] || (m[1] = (C) => d.value = !0),
      onMouseleave: m[2] || (m[2] = (C) => d.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: f.value,
          data: e.data,
          "chart-title": e.title,
          theme: ee(n),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: d.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"])) : (fe(), Ze("div", Hl, " Loading map data... "));
  }
}), vi = /* @__PURE__ */ Lt(Ul, [["__scopeId", "data-v-df118853"]]), xi = /* @__PURE__ */ he({
  __name: "PointMap",
  props: {
    data: {},
    lat: {},
    long: {},
    value: {},
    name: {},
    title: {},
    subtitle: {},
    height: { default: "500px" },
    width: { default: "100%" },
    basemap: {},
    pointColor: {},
    pointOpacity: { default: 0.8 },
    pointSize: { default: 8 },
    valueFmt: {},
    link: {},
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColor: r } = ye(), l = F(
      () => e.pointColor ? r(e.pointColor).value : "#3366cc"
    ), i = F(
      () => e.valueFmt ? pe(e.valueFmt) : void 0
    ), s = F(() => {
      var f;
      return !((f = e.data) != null && f.length) || !e.lat || !e.long ? [] : e.data.map((d) => {
        const u = d[e.lat], m = d[e.long], C = e.value ? d[e.value] : void 0;
        return {
          name: e.name ? String(d[e.name]) : void 0,
          value: [m, u, C],
          lat: u,
          lng: m
        };
      }).filter((d) => d.lat != null && d.lng != null);
    }), c = F(() => {
      if (!s.value.length)
        return { center: [0, 0], zoom: 1 };
      const f = s.value.map((L) => L.lat), d = s.value.map((L) => L.lng), u = Math.min(...f), m = Math.max(...f), C = Math.min(...d), g = Math.max(...d), y = (u + m) / 2, O = (C + g) / 2, M = m - u, z = g - C, I = Math.max(M, z);
      let v = 1;
      return I < 1 ? v = 8 : I < 5 ? v = 6 : I < 20 ? v = 4 : I < 50 ? v = 3 : v = 2, { center: [O, y], zoom: v };
    }), p = F(() => ({
      title: {
        text: e.title,
        subtext: e.subtitle
      },
      tooltip: {
        trigger: "item",
        formatter: (f) => {
          const d = f, { name: u, value: m } = d.data;
          let C = "";
          return u && (C += `<span style='font-weight: 600;'>${u}</span><br/>`), C += `Lat: ${m[1].toFixed(4)}<br/>`, C += `Long: ${m[0].toFixed(4)}`, m[2] != null && (C += `<br/>Value: ${J(m[2], i.value)}`), C;
        }
      },
      geo: {
        map: "world",
        roam: !0,
        center: c.value.center,
        zoom: c.value.zoom,
        itemStyle: {
          areaColor: "#e0e0e0",
          borderColor: "#111"
        },
        emphasis: {
          disabled: !0
        }
      },
      series: [
        {
          name: "Points",
          type: "scatter",
          coordinateSystem: "geo",
          data: s.value,
          symbolSize: e.pointSize,
          itemStyle: {
            color: l.value,
            opacity: e.pointOpacity
          },
          emphasis: {
            itemStyle: {
              borderColor: "#333",
              borderWidth: 1
            }
          }
        }
      ]
    })), h = se(!1);
    return (f, d) => (fe(), we(ke, {
      config: p.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: d[0] || (d[0] = (u) => a("click", u)),
      onMouseenter: d[1] || (d[1] = (u) => h.value = !0),
      onMouseleave: d[2] || (d[2] = (u) => h.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: p.value,
          data: e.data,
          "chart-title": e.title,
          theme: ee(n),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: h.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), wi = /* @__PURE__ */ he({
  __name: "BubbleMap",
  props: {
    size: {},
    sizeFmt: {},
    minSize: { default: 5 },
    maxSize: { default: 40 },
    data: {},
    lat: {},
    long: {},
    value: {},
    name: {},
    title: {},
    subtitle: {},
    height: { default: "500px" },
    width: { default: "100%" },
    basemap: {},
    pointColor: {},
    pointOpacity: { default: 0.6 },
    pointSize: {},
    valueFmt: {},
    link: {},
    echartsOptions: {},
    renderer: {},
    downloadableData: { type: Boolean, default: !0 },
    downloadableImage: { type: Boolean, default: !0 }
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, a = o, { activeAppearance: n, resolveColor: r } = ye(), l = F(
      () => e.pointColor ? r(e.pointColor).value : "#3366cc"
    ), i = F(
      () => e.valueFmt ? pe(e.valueFmt) : void 0
    ), s = F(
      () => e.sizeFmt ? pe(e.sizeFmt) : void 0
    ), c = F(() => {
      var m;
      if (!((m = e.data) != null && m.length) || !e.size)
        return { min: 0, max: 1 };
      const u = e.data.map((C) => C[e.size]).filter((C) => C != null && !isNaN(C));
      return u.length === 0 ? { min: 0, max: 1 } : {
        min: Math.min(...u),
        max: Math.max(...u)
      };
    }), p = F(() => {
      var g;
      if (!((g = e.data) != null && g.length) || !e.lat || !e.long || !e.size)
        return [];
      const { min: u, max: m } = c.value, C = m - u || 1;
      return e.data.map((y) => {
        const O = y[e.lat], M = y[e.long], z = y[e.size], I = e.value ? y[e.value] : void 0, v = e.name ? String(y[e.name]) : void 0, L = (z - u) / C, T = e.minSize + L * (e.maxSize - e.minSize);
        return {
          name: v,
          value: [M, O, z, I],
          symbolSize: T,
          lat: O,
          lng: M
        };
      }).filter((y) => y.lat != null && y.lng != null);
    }), h = F(() => {
      if (!p.value.length)
        return { center: [0, 0], zoom: 1 };
      const u = p.value.map((b) => b.lat), m = p.value.map((b) => b.lng), C = Math.min(...u), g = Math.max(...u), y = Math.min(...m), O = Math.max(...m), M = (C + g) / 2, z = (y + O) / 2, I = g - C, v = O - y, L = Math.max(I, v);
      let T = 1;
      return L < 1 ? T = 8 : L < 5 ? T = 6 : L < 20 ? T = 4 : L < 50 ? T = 3 : T = 2, { center: [z, M], zoom: T };
    }), f = F(() => ({
      title: {
        text: e.title,
        subtext: e.subtitle
      },
      tooltip: {
        trigger: "item",
        formatter: (u) => {
          const m = u, { name: C, value: g } = m.data;
          let y = "";
          return C && (y += `<span style='font-weight: 600;'>${C}</span><br/>`), y += `Lat: ${g[1].toFixed(4)}<br/>`, y += `Long: ${g[0].toFixed(4)}<br/>`, y += `Size: ${J(g[2], s.value)}`, g[3] != null && (y += `<br/>Value: ${J(g[3], i.value)}`), y;
        }
      },
      geo: {
        map: "world",
        roam: !0,
        center: h.value.center,
        zoom: h.value.zoom,
        itemStyle: {
          areaColor: "#e0e0e0",
          borderColor: "#111"
        },
        emphasis: {
          disabled: !0
        }
      },
      series: [
        {
          name: "Bubbles",
          type: "scatter",
          coordinateSystem: "geo",
          data: p.value,
          itemStyle: {
            color: l.value,
            opacity: e.pointOpacity
          },
          emphasis: {
            itemStyle: {
              borderColor: "#333",
              borderWidth: 1
            }
          }
        }
      ]
    })), d = se(!1);
    return (u, m) => (fe(), we(ke, {
      config: f.value,
      height: e.height,
      width: e.width,
      theme: ee(n),
      renderer: e.renderer,
      "echarts-options": e.echartsOptions,
      onClick: m[0] || (m[0] = (C) => a("click", C)),
      onMouseenter: m[1] || (m[1] = (C) => d.value = !0),
      onMouseleave: m[2] || (m[2] = (C) => d.value = !1)
    }, {
      footer: Ce(() => [
        Ae(Se, {
          config: f.value,
          data: e.data,
          "chart-title": e.title,
          theme: ee(n),
          "echarts-options": e.echartsOptions,
          "downloadable-data": e.downloadableData,
          "downloadable-image": e.downloadableImage,
          visible: d.value
        }, null, 8, ["config", "data", "chart-title", "theme", "echarts-options", "downloadable-data", "downloadable-image", "visible"])
      ]),
      _: 1
    }, 8, ["config", "height", "width", "theme", "renderer", "echarts-options"]));
  }
}), Ci = /* @__PURE__ */ he({
  __name: "ReferenceLine",
  props: {
    y: {},
    x: {},
    label: {},
    labelPosition: { default: "end" },
    color: {},
    lineType: { default: "dashed" },
    lineWidth: { default: 1 },
    hideValue: { type: Boolean, default: !1 },
    labelColor: {},
    labelBackgroundColor: {},
    labelPadding: { default: 4 },
    fontSize: { default: 12 }
  },
  setup(t) {
    const o = t, e = ft(_t, void 0), { resolveColor: a } = ye(), n = F(
      () => o.color ? a(o.color).value : void 0
    ), r = F(
      () => o.labelColor ? a(o.labelColor).value : void 0
    ), l = F(
      () => o.labelBackgroundColor ? a(o.labelBackgroundColor).value : void 0
    ), i = {
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted"
    }, s = F(() => `reference_line_${o.y ?? o.x}_${Date.now()}`), c = F(() => {
      const h = o.y !== void 0, f = {
        symbol: "none",
        lineStyle: {
          color: n.value || "#666",
          width: o.lineWidth,
          type: i[o.lineType || "dashed"]
        },
        label: {
          show: !0,
          position: o.labelPosition,
          formatter: () => {
            let d = "";
            if (o.label) {
              if (d = o.label, !o.hideValue) {
                const u = h ? o.y : o.x;
                d += `: ${J(u)}`;
              }
            } else o.hideValue || (d = J(h ? o.y : o.x));
            return d;
          },
          color: r.value,
          backgroundColor: l.value,
          padding: o.labelPadding,
          fontSize: o.fontSize
        }
      };
      return h ? f.yAxis = o.y : f.xAxis = o.x, {
        silent: !0,
        data: [f]
      };
    }), p = F(() => ({
      name: s.value,
      type: "line",
      data: [],
      markLine: c.value,
      seriesType: "reference_line"
    }));
    return Ne(() => {
      e && e.addSeries(p.value);
    }), Re(p, (h) => {
      e && e.updateSeries(s.value, h);
    }), ot(() => {
      e && e.removeSeries(s.value);
    }), (h, f) => pt(h.$slots, "default");
  }
}), Ai = /* @__PURE__ */ he({
  __name: "ReferenceArea",
  props: {
    xMin: {},
    xMax: {},
    yMin: {},
    yMax: {},
    label: {},
    color: {},
    opacity: { default: 0.2 },
    labelColor: {},
    border: { type: Boolean, default: !1 },
    borderColor: {},
    borderType: { default: "solid" },
    borderWidth: { default: 1 }
  },
  setup(t) {
    const o = t, e = ft(_t, void 0), { resolveColor: a } = ye(), n = F(
      () => o.color ? a(o.color).value : void 0
    ), r = F(
      () => o.labelColor ? a(o.labelColor).value : void 0
    ), l = F(
      () => o.borderColor ? a(o.borderColor).value : void 0
    ), i = {
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted"
    }, s = F(() => `reference_area_${Date.now()}`), c = F(() => {
      const h = o.yMin !== void 0 || o.yMax !== void 0, f = o.xMin !== void 0 || o.xMax !== void 0, d = [{}, {}];
      return h && (d[0].yAxis = o.yMin ?? "min", d[1].yAxis = o.yMax ?? "max"), f && (d[0].xAxis = o.xMin ?? "min", d[1].xAxis = o.xMax ?? "max"), {
        silent: !0,
        itemStyle: {
          color: n.value || "rgba(100, 100, 100, 0.2)",
          opacity: o.opacity,
          borderColor: o.border ? l.value || n.value : "transparent",
          borderWidth: o.border ? o.borderWidth : 0,
          borderType: i[o.borderType || "solid"]
        },
        label: o.label ? {
          show: !0,
          position: "insideTop",
          color: r.value
        } : void 0,
        data: [[
          { ...d[0], name: o.label || "" },
          d[1]
        ]]
      };
    }), p = F(() => ({
      name: s.value,
      type: "line",
      data: [],
      markArea: c.value,
      seriesType: "reference_area"
    }));
    return Ne(() => {
      e && e.addSeries(p.value);
    }), Re(p, (h) => {
      e && e.updateSeries(s.value, h);
    }), ot(() => {
      e && e.removeSeries(s.value);
    }), (h, f) => pt(h.$slots, "default");
  }
}), ki = /* @__PURE__ */ he({
  __name: "ReferencePoint",
  props: {
    x: {},
    y: {},
    label: {},
    labelPosition: { default: "top" },
    color: {},
    symbol: { default: "pin" },
    symbolSize: { default: 30 },
    labelColor: {},
    labelBackgroundColor: {},
    labelPadding: { default: 4 },
    fontSize: { default: 12 }
  },
  setup(t) {
    const o = t, e = ft(_t, void 0), { resolveColor: a } = ye(), n = F(
      () => o.color ? a(o.color).value : void 0
    ), r = F(
      () => o.labelColor ? a(o.labelColor).value : void 0
    ), l = F(
      () => o.labelBackgroundColor ? a(o.labelBackgroundColor).value : void 0
    ), i = F(() => `reference_point_${o.x}_${o.y}_${Date.now()}`), s = {
      top: "top",
      bottom: "bottom",
      left: "left",
      right: "right"
    }, c = F(() => ({
      silent: !1,
      symbol: o.symbol,
      symbolSize: o.symbolSize,
      itemStyle: {
        color: n.value || "#666"
      },
      label: {
        show: !!o.label,
        position: s[o.labelPosition || "top"],
        formatter: () => o.label || "",
        color: r.value,
        backgroundColor: l.value,
        padding: o.labelPadding,
        fontSize: o.fontSize
      },
      data: [
        {
          name: o.label || "",
          coord: [o.x, o.y],
          value: o.y
        }
      ]
    })), p = F(() => ({
      name: i.value,
      type: "line",
      data: [],
      markPoint: c.value,
      seriesType: "reference_point"
    }));
    return Ne(() => {
      e && e.addSeries(p.value);
    }), Re(p, (h) => {
      e && e.updateSeries(i.value, h);
    }), ot(() => {
      e && e.removeSeries(i.value);
    }), (h, f) => pt(h.$slots, "default");
  }
});
export {
  He as AUTO_FORMAT_CODE,
  ci as AreaChart,
  vi as AreaMap,
  lo as BUILT_IN_FORMATS,
  ii as BarChart,
  fi as BoxPlot,
  di as BubbleChart,
  wi as BubbleMap,
  bi as CalendarHeatmap,
  Se as ChartFooter,
  li as ChartProvider,
  ke as EChartsBase,
  hi as FunnelChart,
  mi as Heatmap,
  pi as Histogram,
  si as LineChart,
  xi as PointMap,
  Ai as ReferenceArea,
  Ci as ReferenceLine,
  ki as ReferencePoint,
  Ja as SUPPORTED_CURRENCIES,
  gi as SankeyDiagram,
  ui as ScatterPlot,
  yi as USMap,
  no as applyColumnUnits,
  Qr as applyEchartsOptions,
  Kr as applySeriesColors,
  el as applySeriesOptions,
  na as applyTitleTagReplacement,
  Wa as autoFormat,
  ol as chartConfigKey,
  tl as chartPropsKey,
  qa as computeNumberAutoFormatCode,
  Yl as configureAutoFormatting,
  un as configureThemes,
  ql as convertColumnToDate,
  Eo as convertLightToDark,
  la as createEChartsTheme,
  zl as createTooltipConfig,
  uo as defaultThemeDark,
  co as defaultThemeLight,
  ni as echartsInstanceKey,
  Wl as fallbackFormat,
  Ya as findImplicitAutoFormat,
  cn as fmt,
  Je as formatAxisValue,
  sn as formatExample,
  De as formatTitle,
  J as formatValue,
  Zl as generateColorScale,
  ro as generateImplicitNumberFormat,
  Ho as getColumnSummary,
  Jl as getContrastingTextColor,
  on as getCustomFormats,
  El as getDistinctCount,
  dt as getDistinctValues,
  pe as getFormatObjectFromString,
  ht as getSeriesConfig,
  Uo as getSortedData,
  ra as getThemes,
  an as inferValueType,
  ri as injectTheme,
  Xa as isAutoFormat,
  aa as lookupColumnFormat,
  Ql as namedPalettes,
  ei as namedScales,
  nl as provideTheme,
  $a as resolveColor,
  Yr as resolveColorPalette,
  Wr as resolveColorScale,
  Xr as resolveColorsObject,
  _t as seriesConfigKey,
  Kl as setColorOpacity,
  tn as setCustomFormats,
  en as standardizeDateColumn,
  Tt as standardizeDateString,
  go as themeStoresKey,
  Ue as useChartConfig,
  ti as useECharts,
  Il as useExport,
  ai as useFormatter,
  oi as useFormatting,
  Ft as useInteractiveFeatures,
  Ia as useTheme,
  ye as useThemeStores,
  vo as useTooltip
};
//# sourceMappingURL=vue-better-echarts.js.map
