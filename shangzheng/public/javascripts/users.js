/**
 * 农历（阴历）万年历
 * LunarCalendar；NPM NAME:lunar-calendar
 * vervison : v0.1.4
 * Github : https://github.com/zzyss86/LunarCalendar
 * HomePage : http://www.tuijs.com/
 * Author : JasonZhou
 * Email : zzyss86@qq.com
 */
! function() {
  function a(a) {
    var b = H[a - B];
    return b[0]
  }

  function b(a) {
    for (var b = H[a - B], c = b[0], d = b[3].toString(2), e = d.split(""), f =
        0; f < 16 - e.length; f++) e.unshift(0);
    for (var g = c ? 13 : 12, h = 0, i = [], f = 0; g > f; f++) 0 == e[f] ? (h +=
      29, i.push(29)) : (h += 30, i.push(30));
    return {
      yearDays: h,
      monthDays: i
    }
  }

  function c(a, c) {
    for (var d = b(a), e = c > 0 ? c : d.yearDays - Math.abs(c), f = d.monthDays,
        g = 0, h = 0, i = 0; i < f.length; i++)
      if (g += f[i], g > e) {
        h = i, g -= f[i];
        break
      }
    return [a, h, e - g + 1]
  }

  function d(a, b, d) {
    var f = H[a - B],
      g = f[1],
      h = f[2],
      i = e(a, g - 1, h, a, b, d);
    if (0 == i) return [a, 0, 1];
    var j = i > 0 ? a : a - 1;
    return c(j, i)
  }

  function e(a, b, c, d, e, f) {
    var g = new Date(a, b, c).getTime(),
      h = new Date(d, e, f).getTime();
    return (h - g) / 864e5
  }

  function f(a, c, d) {
    for (var e = b(a), f = e.monthDays, g = 0, h = 0; h < f.length && c > h; h++)
      g += f[h];
    return g + d - 1
  }

  function g(a, b) {
    var c = new Date(31556925974.7 * (a - 1890) + 6e4 * I[b] + Date.UTC(1890, 0,
      5, 16, 2, 31));
    return c.getUTCDate()
  }

  function h(a) {
    for (var b = {}, c = 0, d = 0; 24 > d; d++) {
      var e = g(a, d);
      d % 2 == 0 && c++, b[A(c - 1, e)] = D.solarTerm[d]
    }
    return b
  }

  function i(a) {
    var b = a - 1890 + 25;
    return D.zodiac[b % 12]
  }

  function j(a) {
    return D.heavenlyStems[a % 10] + D.earthlyBranches[a % 12]
  }

  function k(a, b) {
    return b = b || 0, j(a - 1890 + 25 + b)
  }

  function l(a, b, c) {
    return c = c || 0, j(12 * (a - 1890) + b + 12 + c)
  }

  function m(a, b, c) {
    var d = Date.UTC(a, b, c) / 864e5 + 29219 + 18;
    return j(d)
  }

  function n(a, b) {
    var c = [31, o(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return c[b]
  }

  function o(a) {
    return a % 4 == 0 && a % 100 != 0 || a % 400 == 0
  }

  function p(a, b, c, d) {
    var e = arguments.length,
      f = new Date;
    return a = e ? parseInt(a, 10) : f.getFullYear(), b = e ? parseInt(b - 1,
      10) : f.getMonth(), c = e ? parseInt(c, 10) || f.getDate() : f.getDate(), (
      d ? d : B + 1) > a || a > C ? {
      error: 100,
      msg: x[100]
    } : {
      year: a,
      month: b,
      day: c
    }
  }

  function q(a, b, c) {
    var d = p(a, b, c);
    if (d.error) return d;
    var e = d.year,
      g = d.month,
      h = d.day,
      i = f(e, g, h),
      j = H[e - B],
      k = j[1],
      l = j[2],
      m = new Date(e, k - 1, l).getTime() + 864e5 * i;
    return m = new Date(m), {
      year: m.getFullYear(),
      month: m.getMonth() + 1,
      day: m.getDate()
    }
  }

  function r(c, e, f) {
    var j = p(c, e, f, B);
    if (j.error) return j;
    var n = j.year,
      o = j.month,
      q = j.day;
    z.setCurrent(n);
    var r = z.get("term2") ? z.get("term2") : z.set("term2", g(n, 2)),
      s = z.get("termList") ? z.get("termList") : z.set("termList", h(n)),
      t = g(n, 2 * o),
      u = o > 1 || 1 == o && q >= r ? n + 1 : n,
      v = q >= t ? o + 1 : o,
      w = d(n, o, q),
      x = a(w[0]),
      y = "";
    y = x > 0 && x == w[1] ? "闰" + D.monthCn[w[1] - 1] + "月" : x > 0 && w[1] >
      x ? D.monthCn[w[1] - 1] + "月" : D.monthCn[w[1]] + "月";
    var C = "",
      H = b(w[0]).monthDays;
    C = w[1] == H.length - 1 && w[2] == H[H.length - 1] ? G.d0100 : x > 0 && w[
      1] > x ? G[A(w[1] - 1, w[2])] : G[A(w[1], w[2])];
    var I = {
      zodiac: i(u),
      GanZhiYear: k(u),
      GanZhiMonth: l(n, v),
      GanZhiDay: m(n, o, q),
      worktime: E["y" + n] && E["y" + n][A(o, q)] ? E["y" + n][A(o, q)] : 0,
      term: s[A(o, q)],
      lunarYear: w[0],
      lunarMonth: w[1] + 1,
      lunarDay: w[2],
      lunarMonthName: y,
      lunarDayName: D.dateCn[w[2] - 1],
      lunarLeapMonth: x,
      solarFestival: F[A(o, q)],
      lunarFestival: C
    };
    return I
  }

  function s(a, b, c) {
    var d = p(a, b);
    if (d.error) return d;
    for (var e = d.year, f = d.month, g = t(e, f + 1, c), h = 0; h < g.monthData
      .length; h++) {
      var i = g.monthData[h],
        j = r(i.year, i.month, i.day);
      v(g.monthData[h], j)
    }
    return g
  }

  function t(a, b, c) {
    var d = p(a, b);
    if (d.error) return d;
    var e, f, g, h = d.year,
      i = d.month,
      j = new Date(h, i, 1),
      k = {
        firstDay: j.getDay(),
        monthDays: n(h, i),
        monthData: []
      };
    if (k.monthData = w(h, i + 1, k.monthDays, 1), c) {
      if (k.firstDay > 0) {
        var l = 0 > i - 1 ? h - 1 : h,
          m = 0 > i - 1 ? 11 : i - 1;
        e = n(l, m), f = w(l, m + 1, k.firstDay, e - k.firstDay + 1), k.monthData =
          f.concat(k.monthData)
      }
      if (42 - k.monthData.length != 0) {
        var o = i + 1 > 11 ? h + 1 : h,
          q = i + 1 > 11 ? 0 : i + 1,
          r = 42 - k.monthData.length;
        g = w(o, q + 1, r, 1), k.monthData = k.monthData.concat(g)
      }
    }
    return k
  }

  function u(a) {
    v(E, a)
  }
  var v = function(a, b) {
      if (a && b && "object" == typeof b)
        for (var c in b) a[c] = b[c];
      return a
    },
    w = function(a, b, c, d) {
      var e = [];
      if (d = d || 0, 1 > c) return e;
      for (var f = d, g = 0; c > g; g++) e.push({
        year: a,
        month: b,
        day: f
      }), f++;
      return e
    },
    x = {
      100: "输入的年份超过了可查询范围，仅支持1891至2100年",
      101: "参数输入错误，请查阅文档"
    },
    y = null,
    z = {
      current: "",
      setCurrent: function(a) {
        this.current != a && (this.current = a, this.clear())
      },
      set: function(a, b) {
        return y || (y = {}), y[a] = b, y[a]
      },
      get: function(a) {
        return y || (y = {}), y[a]
      },
      clear: function() {
        y = null
      }
    },
    A = function(a, b) {
      return a += 1, a = 10 > a ? "0" + a : a, b = 10 > b ? "0" + b : b, "d" +
        a + b
    },
    B = 1890,
    C = 2100,
    D = {
      heavenlyStems: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
      earthlyBranches: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌",
        "亥"
      ],
      zodiac: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
      solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满",
        "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬",
        "小雪", "大雪", "冬至"
      ],
      monthCn: ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
      dateCn: ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一",
        "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二",
        "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十", "卅一"
      ]
    },
    E = {};
  E.y2013 = {
    d0101: 2,
    d0102: 2,
    d0103: 2,
    d0105: 1,
    d0106: 1,
    d0209: 2,
    d0210: 2,
    d0211: 2,
    d0212: 2,
    d0213: 2,
    d0214: 2,
    d0215: 2,
    d0216: 1,
    d0217: 1,
    d0404: 2,
    d0405: 2,
    d0406: 2,
    d0407: 1,
    d0427: 1,
    d0428: 1,
    d0429: 2,
    d0430: 2,
    d0501: 2,
    d0608: 1,
    d0609: 1,
    d0610: 2,
    d0611: 2,
    d0612: 2,
    d0919: 2,
    d0920: 2,
    d0921: 2,
    d0922: 1,
    d0929: 1,
    d1001: 2,
    d1002: 2,
    d1003: 2,
    d1004: 2,
    d1005: 2,
    d1006: 2,
    d1007: 2,
    d1012: 1
  }, E.y2014 = {
    d0101: 2,
    d0126: 1,
    d0131: 2,
    d0201: 2,
    d0202: 2,
    d0203: 2,
    d0204: 2,
    d0205: 2,
    d0206: 2,
    d0208: 1,
    d0405: 2,
    d0407: 2,
    d0501: 2,
    d0502: 2,
    d0503: 2,
    d0504: 1,
    d0602: 2,
    d0908: 2,
    d0928: 1,
    d1001: 2,
    d1002: 2,
    d1003: 2,
    d1004: 2,
    d1005: 2,
    d1006: 2,
    d1007: 2,
    d1011: 1
  };
  var F = {
      d0101: "元旦节",
      d0202: "世界湿地日",
      d0210: "国际气象节",
      d0214: "情人节",
      d0301: "国际海豹日",
      d0303: "全国爱耳日",
      d0305: "学雷锋纪念日",
      d0308: "妇女节",
      d0312: "植树节 孙中山逝世纪念日",
      d0314: "国际警察日",
      d0315: "消费者权益日",
      d0317: "中国国医节 国际航海日",
      d0321: "世界森林日 消除种族歧视国际日 世界儿歌日",
      d0322: "世界水日",
      d0323: "世界气象日",
      d0324: "世界防治结核病日",
      d0325: "全国中小学生安全教育日",
      d0330: "巴勒斯坦国土日",
      d0401: "愚人节 全国爱国卫生运动月(四月) 税收宣传月(四月)",
      d0407: "世界卫生日",
      d0422: "世界地球日",
      d0423: "世界图书和版权日",
      d0424: "亚非新闻工作者日",
      d0501: "劳动节",
      d0504: "青年节",
      d0505: "碘缺乏病防治日",
      d0508: "世界红十字日",
      d0512: "国际护士节",
      d0515: "国际家庭日",
      d0517: "世界电信日",
      d0518: "国际博物馆日",
      d0520: "全国学生营养日",
      d0522: "国际生物多样性日",
      d0523: "国际牛奶日",
      d0531: "世界无烟日",
      d0601: "国际儿童节",
      d0605: "世界环境日",
      d0606: "全国爱眼日",
      d0617: "防治荒漠化和干旱日",
      d0623: "国际奥林匹克日",
      d0625: "全国土地日",
      d0626: "国际禁毒日",
      d0701: "香港回归纪念日 中共诞辰 世界建筑日",
      d0702: "国际体育记者日",
      d0707: "抗日战争纪念日",
      d0711: "世界人口日",
      d0730: "非洲妇女日",
      d0801: "建军节",
      d0808: "中国男子节(爸爸节)",
      d0815: "抗日战争胜利纪念",
      d0908: "国际扫盲日 国际新闻工作者日",
      d0909: "毛泽东逝世纪念",
      d0910: "中国教师节",
      d0914: "世界清洁地球日",
      d0916: "国际臭氧层保护日",
      d0918: "九一八事变纪念日",
      d0920: "国际爱牙日",
      d0927: "世界旅游日",
      d0928: "孔子诞辰",
      d1001: "国庆节 世界音乐日 国际老人节",
      d1002: "国际和平与民主自由斗争日",
      d1004: "世界动物日",
      d1006: "老人节",
      d1008: "全国高血压日 世界视觉日",
      d1009: "世界邮政日 万国邮联日",
      d1010: "辛亥革命纪念日 世界精神卫生日",
      d1013: "世界保健日 国际教师节",
      d1014: "世界标准日",
      d1015: "国际盲人节(白手杖节)",
      d1016: "世界粮食日",
      d1017: "世界消除贫困日",
      d1022: "世界传统医药日",
      d1024: "联合国日 世界发展信息日",
      d1031: "世界勤俭日",
      d1107: "十月社会主义革命纪念日",
      d1108: "中国记者日",
      d1109: "全国消防安全宣传教育日",
      d1110: "世界青年节",
      d1111: "国际科学与和平周(本日所属的一周)",
      d1112: "孙中山诞辰纪念日",
      d1114: "世界糖尿病日",
      d1117: "国际大学生节 世界学生节",
      d1121: "世界问候日 世界电视日",
      d1129: "国际声援巴勒斯坦人民国际日",
      d1201: "世界艾滋病日",
      d1203: "世界残疾人日",
      d1205: "国际经济和社会发展志愿人员日",
      d1208: "国际儿童电视日",
      d1209: "世界足球日",
      d1210: "世界人权日",
      d1212: "西安事变纪念日",
      d1213: "南京大屠杀(1937年)纪念日！紧记血泪史！",
      d1220: "澳门回归纪念",
      d1221: "国际篮球日",
      d1224: "平安夜",
      d1225: "圣诞节",
      d1226: "毛泽东诞辰纪念"
    },
    G = {
      d0101: "春节",
      d0115: "元宵节",
      d0202: "龙抬头节",
      d0323: "妈祖生辰",
      d0505: "端午节",
      d0707: "七夕情人节",
      d0715: "中元节",
      d0815: "中秋节",
      d0909: "重阳节",
      d1015: "下元节",
      d1208: "腊八节",
      d1223: "小年",
      d0100: "除夕"
    },
    H = [
      [2, 1, 21, 22184],
      [0, 2, 9, 21936],
      [6, 1, 30, 9656],
      [0, 2, 17, 9584],
      [0, 2, 6, 21168],
      [5, 1, 26, 43344],
      [0, 2, 13, 59728],
      [0, 2, 2, 27296],
      [3, 1, 22, 44368],
      [0, 2, 10, 43856],
      [8, 1, 30, 19304],
      [0, 2, 19, 19168],
      [0, 2, 8, 42352],
      [5, 1, 29, 21096],
      [0, 2, 16, 53856],
      [0, 2, 4, 55632],
      [4, 1, 25, 27304],
      [0, 2, 13, 22176],
      [0, 2, 2, 39632],
      [2, 1, 22, 19176],
      [0, 2, 10, 19168],
      [6, 1, 30, 42200],
      [0, 2, 18, 42192],
      [0, 2, 6, 53840],
      [5, 1, 26, 54568],
      [0, 2, 14, 46400],
      [0, 2, 3, 54944],
      [2, 1, 23, 38608],
      [0, 2, 11, 38320],
      [7, 2, 1, 18872],
      [0, 2, 20, 18800],
      [0, 2, 8, 42160],
      [5, 1, 28, 45656],
      [0, 2, 16, 27216],
      [0, 2, 5, 27968],
      [4, 1, 24, 44456],
      [0, 2, 13, 11104],
      [0, 2, 2, 38256],
      [2, 1, 23, 18808],
      [0, 2, 10, 18800],
      [6, 1, 30, 25776],
      [0, 2, 17, 54432],
      [0, 2, 6, 59984],
      [5, 1, 26, 27976],
      [0, 2, 14, 23248],
      [0, 2, 4, 11104],
      [3, 1, 24, 37744],
      [0, 2, 11, 37600],
      [7, 1, 31, 51560],
      [0, 2, 19, 51536],
      [0, 2, 8, 54432],
      [6, 1, 27, 55888],
      [0, 2, 15, 46416],
      [0, 2, 5, 22176],
      [4, 1, 25, 43736],
      [0, 2, 13, 9680],
      [0, 2, 2, 37584],
      [2, 1, 22, 51544],
      [0, 2, 10, 43344],
      [7, 1, 29, 46248],
      [0, 2, 17, 27808],
      [0, 2, 6, 46416],
      [5, 1, 27, 21928],
      [0, 2, 14, 19872],
      [0, 2, 3, 42416],
      [3, 1, 24, 21176],
      [0, 2, 12, 21168],
      [8, 1, 31, 43344],
      [0, 2, 18, 59728],
      [0, 2, 8, 27296],
      [6, 1, 28, 44368],
      [0, 2, 15, 43856],
      [0, 2, 5, 19296],
      [4, 1, 25, 42352],
      [0, 2, 13, 42352],
      [0, 2, 2, 21088],
      [3, 1, 21, 59696],
      [0, 2, 9, 55632],
      [7, 1, 30, 23208],
      [0, 2, 17, 22176],
      [0, 2, 6, 38608],
      [5, 1, 27, 19176],
      [0, 2, 15, 19152],
      [0, 2, 3, 42192],
      [4, 1, 23, 53864],
      [0, 2, 11, 53840],
      [8, 1, 31, 54568],
      [0, 2, 18, 46400],
      [0, 2, 7, 46752],
      [6, 1, 28, 38608],
      [0, 2, 16, 38320],
      [0, 2, 5, 18864],
      [4, 1, 25, 42168],
      [0, 2, 13, 42160],
      [10, 2, 2, 45656],
      [0, 2, 20, 27216],
      [0, 2, 9, 27968],
      [6, 1, 29, 44448],
      [0, 2, 17, 43872],
      [0, 2, 6, 38256],
      [5, 1, 27, 18808],
      [0, 2, 15, 18800],
      [0, 2, 4, 25776],
      [3, 1, 23, 27216],
      [0, 2, 10, 59984],
      [8, 1, 31, 27432],
      [0, 2, 19, 23232],
      [0, 2, 7, 43872],
      [5, 1, 28, 37736],
      [0, 2, 16, 37600],
      [0, 2, 5, 51552],
      [4, 1, 24, 54440],
      [0, 2, 12, 54432],
      [0, 2, 1, 55888],
      [2, 1, 22, 23208],
      [0, 2, 9, 22176],
      [7, 1, 29, 43736],
      [0, 2, 18, 9680],
      [0, 2, 7, 37584],
      [5, 1, 26, 51544],
      [0, 2, 14, 43344],
      [0, 2, 3, 46240],
      [4, 1, 23, 46416],
      [0, 2, 10, 44368],
      [9, 1, 31, 21928],
      [0, 2, 19, 19360],
      [0, 2, 8, 42416],
      [6, 1, 28, 21176],
      [0, 2, 16, 21168],
      [0, 2, 5, 43312],
      [4, 1, 25, 29864],
      [0, 2, 12, 27296],
      [0, 2, 1, 44368],
      [2, 1, 22, 19880],
      [0, 2, 10, 19296],
      [6, 1, 29, 42352],
      [0, 2, 17, 42208],
      [0, 2, 6, 53856],
      [5, 1, 26, 59696],
      [0, 2, 13, 54576],
      [0, 2, 3, 23200],
      [3, 1, 23, 27472],
      [0, 2, 11, 38608],
      [11, 1, 31, 19176],
      [0, 2, 19, 19152],
      [0, 2, 8, 42192],
      [6, 1, 28, 53848],
      [0, 2, 15, 53840],
      [0, 2, 4, 54560],
      [5, 1, 24, 55968],
      [0, 2, 12, 46496],
      [0, 2, 1, 22224],
      [2, 1, 22, 19160],
      [0, 2, 10, 18864],
      [7, 1, 30, 42168],
      [0, 2, 17, 42160],
      [0, 2, 6, 43600],
      [5, 1, 26, 46376],
      [0, 2, 14, 27936],
      [0, 2, 2, 44448],
      [3, 1, 23, 21936],
      [0, 2, 11, 37744],
      [8, 2, 1, 18808],
      [0, 2, 19, 18800],
      [0, 2, 8, 25776],
      [6, 1, 28, 27216],
      [0, 2, 15, 59984],
      [0, 2, 4, 27424],
      [4, 1, 24, 43872],
      [0, 2, 12, 43744],
      [0, 2, 2, 37600],
      [3, 1, 21, 51568],
      [0, 2, 9, 51552],
      [7, 1, 29, 54440],
      [0, 2, 17, 54432],
      [0, 2, 5, 55888],
      [5, 1, 26, 23208],
      [0, 2, 14, 22176],
      [0, 2, 3, 42704],
      [4, 1, 23, 21224],
      [0, 2, 11, 21200],
      [8, 1, 31, 43352],
      [0, 2, 19, 43344],
      [0, 2, 7, 46240],
      [6, 1, 27, 46416],
      [0, 2, 15, 44368],
      [0, 2, 5, 21920],
      [4, 1, 24, 42448],
      [0, 2, 12, 42416],
      [0, 2, 2, 21168],
      [3, 1, 22, 43320],
      [0, 2, 9, 26928],
      [7, 1, 29, 29336],
      [0, 2, 17, 27296],
      [0, 2, 6, 44368],
      [5, 1, 26, 19880],
      [0, 2, 14, 19296],
      [0, 2, 3, 42352],
      [4, 1, 24, 21104],
      [0, 2, 10, 53856],
      [8, 1, 30, 59696],
      [0, 2, 18, 54560],
      [0, 2, 7, 55968],
      [6, 1, 27, 27472],
      [0, 2, 15, 22224],
      [0, 2, 5, 19168],
      [4, 1, 25, 42216],
      [0, 2, 12, 42192],
      [0, 2, 1, 53584],
      [2, 1, 21, 55592],
      [0, 2, 9, 54560]
    ],
    I = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551,
      218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447,
      419210, 440795, 462224, 483532, 504758
    ],
    J = {
      solarToLunar: r,
      lunarToSolar: q,
      calendar: s,
      solarCalendar: t,
      setWorktime: u,
      getSolarMonthDays: n
    };
  "function" == typeof define ? define(function() {
      return J
    }) : "object" == typeof exports ? module.exports = J : window.LunarCalendar =
    J
}();
var list = [];
var allList = {};
var data0 = [];
var option = {};
var fagMoon = 0;
var fagZhouYi = 0;

function formatDate(data) {
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var date = new Date(item[0].replace('-', '/'));
    item[0] = +date;
  }
  return data;
}

function splitData(rawData) {
  var categoryData = [];
  var values = []
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i])
  }

  return {
    categoryData: categoryData,
    values: values
  };
}
$.get("users/getData").done(function(data) {
  var getMoonList = [];
  var getZhouYiList = {};
  var weizhiData = getWeiZhiData(data[data.length - 1]);
  console.log(weizhiData);
  data = data.concat(weizhiData);
  for (var i = 0; i < data.length; i++) {
    var listCurrent = [data[i]['yl'], data[i]['kp'], data[i]['sp'], data[i]
      ['zd'], data[i]['zg']
    ];
    allList[data[i]['yl']] = [data[i]['nl'], data[i]['xq'], data[i]['kpspc'],
      data[i]['zdf'], data[i]['gzn'], data[i]['gzy'], data[i]['gzr']
    ];
    getZhouYiList[data[i]['yl']] = [data[i]['gzn'], data[i]['gzy'], data[i]
      ['zg']
    ];
    getMoonList.push([data[i]['yl'], data[i]['nl'], data[i]['zg']]);
    list.push(listCurrent);
  }
  data0 = splitData(list);

  var MoonListR = getMoonPhase(getMoonList);
  var getJieQiListR = getJieQi(getMoonList);
  var ZhouYiListR = getZhouYi(getZhouYiList);
  var resoutList = MoonListR.concat(ZhouYiListR);
  var resoutList1 = resoutList.concat(getJieQiListR);
  option = {
    title: {
      text: '上证指数',
      left: 'center'
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      formatter: function(params) {
        var allData = allList[params[0].name];
        var res = "阳历 : " + params[0].name;
        res += '<br/>  农历 : ' + allData[0] + "  星期" + allData[1];
        res += '<br/>  干支 : ' + allData[4] + "-" + allData[5] + "-" +
          allData[6];
        res += '<br/>  开盘 : ' + params[0].value[0] + '  最高 : ' + params[
          0].value[3];
        res += '<br/>  收盘 : ' + params[0].value[1] + '  最低 : ' + params[
          0].value[2];
        res += '<br/>  开收幅 : ' + allData[2] + "  涨幅 : " + allData[3];
        return res;
      }
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        dataZoom: {
          show: true
        },
        dataView: {
          show: true,
          readOnly: false
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        },
        myMoon: {
          show: true,
          title: '显示月相',
          icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
          onclick: function() {
            fagMoon += 1;
            if (fagMoon % 2 == 0) {
              var optinJson = {
                series: [{
                  markPoint: {
                    data: null
                  }
                }]
              }
            } else {
              var optinJson = {
                series: [{
                  markPoint: {
                    data: MoonListR
                  }
                }]
              }
            }

            myChart.setOption(optinJson);
          }
        },
        myZhouYi: {
          show: true,
          title: '显示周易',
          icon: 'image://http://echarts.baidu.com/images/favicon.png',
          onclick: function() {
            fagZhouYi += 1;
            if (fagZhouYi % 2 == 0) {
              var optinJson = {
                series: [{
                  markPoint: {
                    data: null
                  }
                }]
              }
            } else {
              var optinJson = {
                series: [{
                  markPoint: {
                    data: resoutList1,
                    animation: false
                  }
                }]
              }
            }

            myChart.setOption(optinJson);
          }
        }
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%'
    },
    xAxis: {
      type: 'category',
      data: data0.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: {
        onZero: false
      },
      splitLine: {
        show: false
      },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [{
      type: 'inside',
      start: 50,
      end: 100
    }, {
      show: true,
      type: 'slider',
      y: '90%',
      start: 50,
      end: 100
    }],
    series: [{
      name: '上证指数',
      type: 'candlestick',
      data: data0.values,
      markPoint: {
        // data: MoonListR,
        symbol: 'image://http://127.0.0.1:3000/images/1.png',
        symbolSize: [2, 1000]
      },
    }]
  };
  var myChart = echarts.init(document.getElementById('main'));
  myChart.setOption(option);
  myChart.on('click', function(params) {
    window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(
      params.name));
  });
});

function getMoonPhase(getMoonList) {
  var MoonList = [];
  for (var i = 1; i < getMoonList.length; i++) {
    var nlStr = getMoonList[i][1].substr(getMoonList[i][1].length - 2);
    var prevlStr = getMoonList[i - 1][1].substr(getMoonList[i - 1][1].length -
      2);
    var json = {};
    if (nlStr == "初八") {
      numMoon(json, '上弦', i);
    } else {
      if (prevlStr == "初七") {
        numMoon(json, '上弦', i - 1);
      }
    }
    if (nlStr == "十五") {
      numMoon(json, '满月', i);
    } else {
      if (prevlStr == "十四") {
        numMoon(json, '满月', i - 1);
      }
    }
    if (nlStr == "廿三") {
      numMoon(json, '下弦', i);
    } else {
      if (prevlStr == "廿二") {
        numMoon(json, '下弦', i - 1);
      }
    }
    if (nlStr == "三十") {
      numMoon(json, '新月', i);
    } else {
      if (prevlStr == "廿九") {
        numMoon(json, '新月', i - 1);
      }
    }
  }

  function numMoon(json, moonValue, j) {
    json["label"] = {
      normal: {
        formatter: moonValue,
        textStyle: {
          color: '#464648'
        },
        position: ['0', '30%']
      }
    };
    json["coord"] = [getMoonList[j * 1][0], getMoonList[j * 1][2]];
    json['symbol'] = "image://http://127.0.0.1:3000/images/1.png"
    json['symbolSize'] = [2, 600]
    MoonList.push(json);
  }
  return MoonList;
}



function getJieQi(getMoonList) {
  var MoonList = [];
  for (var i = 1; i < getMoonList.length; i++) {
    var ylyStr = getMoonList[i][0].substr(getMoonList[i][0].indexOf("-") + 1);
    var prevYlyStr = getMoonList[i - 1][0].substr(getMoonList[i - 1][0].indexOf(
      "-") + 1);
    var json = {};
    if (ylyStr == "02-19") {
      JieQi(json, '雨水', i);
    } else {
      if (prevYlyStr == "02-18") {
        JieQi(json, '雨水', i - 1);
      }
    }
    if (ylyStr == "03-21") {
      JieQi(json, '春分', i);
    } else {
      if (prevYlyStr == "03-20") {
        JieQi(json, '春分', i - 1);
      }
    }
    if (ylyStr == "04-20") {
      JieQi(json, '谷雨', i);
    } else {
      if (prevYlyStr == "04-19") {
        JieQi(json, '谷雨', i - 1);
      }
    }



    if (ylyStr == "05-21") {
      JieQi(json, '小满', i);
    } else {
      if (prevYlyStr == "05-20") {
        JieQi(json, '小满', i - 1);
      }
    }
    if (ylyStr == "06-22") {
      JieQi(json, '夏至', i);
    } else {
      if (prevYlyStr == "06-21") {
        JieQi(json, '夏至', i - 1);
      }
    }
    if (ylyStr == "07-23") {
      JieQi(json, '大暑', i);
    } else {
      if (prevYlyStr == "07-22") {
        JieQi(json, '大暑', i - 1);
      }
    }


    if (ylyStr == "08-23") {
      JieQi(json, '处暑', i);
    } else {
      if (prevYlyStr == "08-22") {
        JieQi(json, '处暑', i - 1);
      }
    }
    if (ylyStr == "09-23") {
      JieQi(json, '秋分', i);
    } else {
      if (prevYlyStr == "09-22") {
        JieQi(json, '秋分', i - 1);
      }
    }
    if (ylyStr == "10-24") {
      JieQi(json, '霜降', i);
    } else {
      if (prevYlyStr == "10-23") {
        JieQi(json, '霜降', i - 1);
      }
    }


    if (ylyStr == "11-23") {
      JieQi(json, '小雪', i);
    } else {
      if (prevYlyStr == "11-22") {
        JieQi(json, '小雪', i - 1);
      }
    }
    if (ylyStr == "12-22") {
      JieQi(json, '冬至', i);
    } else {
      if (prevYlyStr == "12-21") {
        JieQi(json, '冬至', i - 1);
      }
    }
    if (ylyStr == "01-21") {
      JieQi(json, '大寒', i);
    } else {
      if (prevYlyStr == "01-20") {
        JieQi(json, '大寒', i - 1);
      }
    }
  }

  function JieQi(json, moonValue, j) {
    json["label"] = {
      normal: {
        formatter: moonValue,
        textStyle: {
          color: 'blue'
        },
        position: ['0', '50%']
      }
    };
    json["coord"] = [getMoonList[j * 1][0], getMoonList[j * 1][2]];
    json['symbol'] = "image://http://127.0.0.1:3000/images/3.png"
    json['symbolSize'] = [2, 600]
    MoonList.push(json);
  }
  return MoonList;
}


function getZhouYi(list) {
  var prevGzy;
  var array = [];
  for (var x in list) {
    var nextGzy = list[x][1];
    var json = {};
    if (nextGzy != prevGzy) {
      json["coord"] = [x, list[x][2]]
      json["label"] = {
        normal: {
          formatter: list[x][0] + "-" + list[x][1],
          textStyle: {
            color: 'red'
          },
          position: [0, 300]
        }
      }
      json['symbol'] = "image://http://127.0.0.1:3000/images/2.png"
      json['symbolSize'] = [2, 600]
      array.push(json);
    }
    prevGzy = nextGzy;
  }
  return array;
}

function getWeiZhiData(lastList) {
  var addList = [];
  var lastYl = lastList.yl;
  for (var i = 0; i < 60; i++) {
    var c = clone(lastList);
    c.yl = getNextDay(lastYl, i + 1);
    var ylStr = c.yl.split("-");
    var date = returnDate(c.yl);
    if (date != "6" && date != "0") {
      var d = window.LunarCalendar.solarToLunar(parseInt(ylStr[0]), parseInt(
        ylStr[1]), parseInt(ylStr[2]));
      c.xq = date;
      c.gzn = d.GanZhiYear;
      c.gzy = d.GanZhiMonth;
      c.gzr = d.GanZhiDay;
      c.nl = d.lunarMonthName + d.lunarDayName;
      addList.push(c);
    }
  }
  return addList;
}

function getNextDay(d, n) {
  d = new Date(d);
  d = +d + 1000 * 60 * 60 * 24 * n;
  d = new Date(d);
  //return d;
  //格式化
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}
// alert(getNextDay("2014-06-24"));

function clone(myObj) {
  if (typeof(myObj) != 'object') return myObj;
  if (myObj == null) return myObj;

  var myNewObj = new Object();
  for (var i in myObj)
    myNewObj[i] = clone(myObj[i]);

  return myNewObj;
}

function returnDate(riqi) {
  var arys1 = new Array();
  arys1 = riqi.split('-');
  var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
  return ssdate.getDay() //就是你要的星期几
}
