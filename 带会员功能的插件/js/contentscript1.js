!
function() {
    function t() {}
    function n(t) {
        return t
    }
    function e(t) {
        return !! t
    }
    function i(t) {
        return ! t
    }
    function a(t) {
        return function() {
            if (null === t) throw new Error("Callback was already called.");
            t.apply(this, arguments),
            t = null
        }
    }
    function r(t) {
        return function() {
            null !== t && (t.apply(this, arguments), t = null)
        }
    }
    function o(t) {
        return H(t) || "number" == typeof t.length && t.length >= 0 && t.length % 1 === 0
    }
    function c(t, n) {
        return o(t) ? s(t, n) : f(t, n)
    }
    function s(t, n) {
        for (var e = -1,
        i = t.length; ++e < i;) n(t[e], e, t)
    }
    function l(t, n) {
        for (var e = -1,
        i = t.length,
        a = Array(i); ++e < i;) a[e] = n(t[e], e, t);
        return a
    }
    function u(t) {
        return l(Array(t),
        function(t, n) {
            return n
        })
    }
    function d(t, n, e) {
        return s(t,
        function(t, i, a) {
            e = n(e, t, i, a)
        }),
        e
    }
    function f(t, n) {
        s(D(t),
        function(e) {
            n(t[e], e)
        })
    }
    function m(t, n) {
        for (var e = 0; e < t.length; e++) if (t[e] === n) return e;
        return - 1
    }
    function p(t) {
        var n, e, i = -1;
        return o(t) ? (n = t.length,
        function() {
            return i++,
            n > i ? i: null
        }) : (e = D(t), n = e.length,
        function() {
            return i++,
            n > i ? e[i] : null
        })
    }
    function h(t, n) {
        return n = null == n ? t.length - 1 : +n,
        function() {
            for (var e = Math.max(arguments.length - n, 0), i = Array(e), a = 0; e > a; a++) i[a] = arguments[a + n];
            switch (n) {
            case 0:
                return t.call(this, i);
            case 1:
                return t.call(this, arguments[0], i)
            }
        }
    }
    function v(t) {
        return function(n, e, i) {
            return t(n, i)
        }
    }
    function g(n) {
        return function(e, i, o) {
            o = r(o || t),
            e = e || [];
            var c = p(e);
            if (0 >= n) return o(null);
            var s = !1,
            l = 0,
            u = !1; !
            function d() {
                if (s && 0 >= l) return o(null);
                for (; n > l && !u;) {
                    var t = c();
                    if (null === t) return s = !0,
                    void(0 >= l && o(null));
                    l += 1,
                    i(e[t], t, a(function(t) {
                        l -= 1,
                        t ? (o(t), u = !0) : d()
                    }))
                }
            } ()
        }
    }
    function b(t) {
        return function(n, e, i) {
            return t(z.eachOf, n, e, i)
        }
    }
    function y(t) {
        return function(n, e, i, a) {
            return t(g(e), n, i, a)
        }
    }
    function w(t) {
        return function(n, e, i) {
            return t(z.eachOfSeries, n, e, i)
        }
    }
    function k(n, e, i, a) {
        a = r(a || t);
        var o = [];
        n(e,
        function(t, n, e) {
            i(t,
            function(t, i) {
                o[n] = i,
                e(t)
            })
        },
        function(t) {
            a(t, o)
        })
    }
    function x(t, n, e, i) {
        var a = [];
        t(n,
        function(t, n, i) {
            e(t,
            function(e) {
                e && a.push({
                    index: n,
                    value: t
                }),
                i()
            })
        },
        function() {
            i(l(a.sort(function(t, n) {
                return t.index - n.index
            }),
            function(t) {
                return t.value
            }))
        })
    }
    function q(t, n, e, i) {
        x(t, n,
        function(t, n) {
            e(t,
            function(t) {
                n(!t)
            })
        },
        i)
    }
    function I(t, n, e) {
        return function(i, a, r, o) {
            function c() {
                o && o(e(!1, void 0))
            }
            function s(t, i, a) {
                return o ? void r(t,
                function(i) {
                    o && n(i) && (o(e(!0, t)), o = r = !1),
                    a()
                }) : a()
            }
            arguments.length > 3 ? t(i, a, s, c) : (o = r, r = a, t(i, s, c))
        }
    }
    function L(t, n) {
        return n
    }
    function j(n, e, i) {
        i = i || t;
        var a = o(e) ? [] : {};
        n(e,
        function(t, n, e) {
            t(h(function(t, i) {
                i.length <= 1 && (i = i[0]),
                a[n] = i,
                e(t)
            }))
        },
        function(t) {
            i(t, a)
        })
    }
    function E(t, n, e, i) {
        var a = [];
        t(n,
        function(t, n, i) {
            e(t,
            function(t, n) {
                a = a.concat(n || []),
                i(t)
            })
        },
        function(t) {
            i(t, a)
        })
    }
    function P(n, e, i) {
        function r(n, e, i, a) {
            if (null != a && "function" != typeof a) throw new Error("task callback must be a function");
            return n.started = !0,
            H(e) || (e = [e]),
            0 === e.length && n.idle() ? z.setImmediate(function() {
                n.drain()
            }) : (s(e,
            function(e) {
                var r = {
                    data: e,
                    callback: a || t
                };
                i ? n.tasks.unshift(r) : n.tasks.push(r),
                n.tasks.length === n.concurrency && n.saturated()
            }), void z.setImmediate(n.process))
        }
        function o(t, n) {
            return function() {
                c -= 1;
                var e = arguments;
                s(n,
                function(t) {
                    t.callback.apply(t, e)
                }),
                t.tasks.length + c === 0 && t.drain(),
                t.process()
            }
        }
        if (null == e) e = 1;
        else if (0 === e) throw new Error("Concurrency must not be zero");
        var c = 0,
        u = {
            tasks: [],
            concurrency: e,
            payload: i,
            saturated: t,
            empty: t,
            drain: t,
            started: !1,
            paused: !1,
            push: function(t, n) {
                r(u, t, !1, n)
            },
            kill: function() {
                u.drain = t,
                u.tasks = []
            },
            unshift: function(t, n) {
                r(u, t, !0, n)
            },
            process: function() {
                if (!u.paused && c < u.concurrency && u.tasks.length) for (; c < u.concurrency && u.tasks.length;) {
                    var t = u.payload ? u.tasks.splice(0, u.payload) : u.tasks.splice(0, u.tasks.length),
                    e = l(t,
                    function(t) {
                        return t.data
                    });
                    0 === u.tasks.length && u.empty(),
                    c += 1;
                    var i = a(o(u, t));
                    n(e, i)
                }
            },
            length: function() {
                return u.tasks.length
            },
            running: function() {
                return c
            },
            idle: function() {
                return u.tasks.length + c === 0
            },
            pause: function() {
                u.paused = !0
            },
            resume: function() {
                if (u.paused !== !1) {
                    u.paused = !1;
                    for (var t = Math.min(u.concurrency, u.tasks.length), n = 1; t >= n; n++) z.setImmediate(u.process)
                }
            }
        };
        return u
    }
    function O(t) {
        return h(function(n, e) {
            n.apply(null, e.concat([h(function(n, e) {
                "object" == typeof console && (n ? console.error && console.error(n) : console[t] && s(e,
                function(n) {
                    console[t](n)
                }))
            })]))
        })
    }
    function S(t) {
        return function(n, e, i) {
            t(u(n), e, i)
        }
    }
    function A(t) {
        return h(function(n, e) {
            var i = h(function(e) {
                var i = this,
                a = e.pop();
                return t(n,
                function(t, n, a) {
                    t.apply(i, e.concat([a]))
                },
                a)
            });
            return e.length ? i.apply(this, e) : i
        })
    }
    function T(t) {
        return h(function(n) {
            var e = n.pop();
            n.push(function() {
                var t = arguments;
                i ? z.setImmediate(function() {
                    e.apply(null, t)
                }) : e.apply(null, t)
            });
            var i = !0;
            t.apply(this, n),
            i = !1
        })
    }
    var C, z = {},
    B = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || this;
    null != B && (C = B.async),
    z.noConflict = function() {
        return B.async = C,
        z
    };
    var M = Object.prototype.toString,
    H = Array.isArray ||
    function(t) {
        return "[object Array]" === M.call(t)
    },
    Q = function(t) {
        var n = typeof t;
        return "function" === n || "object" === n && !!t
    },
    D = Object.keys ||
    function(t) {
        var n = [];
        for (var e in t) t.hasOwnProperty(e) && n.push(e);
        return n
    },
    U = "function" == typeof setImmediate && setImmediate,
    _ = U ?
    function(t) {
        U(t)
    }: function(t) {
        setTimeout(t, 0)
    };
    "object" == typeof process && "function" == typeof process.nextTick ? z.nextTick = process.nextTick: z.nextTick = _,
    z.setImmediate = U ? _: z.nextTick,
    z.forEach = z.each = function(t, n, e) {
        return z.eachOf(t, v(n), e)
    },
    z.forEachSeries = z.eachSeries = function(t, n, e) {
        return z.eachOfSeries(t, v(n), e)
    },
    z.forEachLimit = z.eachLimit = function(t, n, e, i) {
        return g(n)(t, v(e), i)
    },
    z.forEachOf = z.eachOf = function(n, e, i) {
        function s(t) {
            t ? i(t) : (u += 1, u >= l && i(null))
        }
        i = r(i || t),
        n = n || [];
        var l = o(n) ? n.length: D(n).length,
        u = 0;
        return l ? void c(n,
        function(t, i) {
            e(n[i], i, a(s))
        }) : i(null)
    },
    z.forEachOfSeries = z.eachOfSeries = function(n, e, i) {
        function o() {
            var t = !0;
            return null === s ? i(null) : (e(n[s], s, a(function(n) {
                if (n) i(n);
                else {
                    if (s = c(), null === s) return i(null);
                    t ? z.nextTick(o) : o()
                }
            })), void(t = !1))
        }
        i = r(i || t),
        n = n || [];
        var c = p(n),
        s = c();
        o()
    },
    z.forEachOfLimit = z.eachOfLimit = function(t, n, e, i) {
        g(n)(t, e, i)
    },
    z.map = b(k),
    z.mapSeries = w(k),
    z.mapLimit = y(k),
    z.inject = z.foldl = z.reduce = function(t, n, e, i) {
        z.eachOfSeries(t,
        function(t, i, a) {
            e(n, t,
            function(t, e) {
                n = e,
                a(t)
            })
        },
        function(t) {
            i(t || null, n)
        })
    },
    z.foldr = z.reduceRight = function(t, e, i, a) {
        var r = l(t, n).reverse();
        z.reduce(r, e, i, a)
    },
    z.select = z.filter = b(x),
    z.selectLimit = z.filterLimit = y(x),
    z.selectSeries = z.filterSeries = w(x),
    z.reject = b(q),
    z.rejectLimit = y(q),
    z.rejectSeries = w(q),
    z.any = z.some = I(z.eachOf, e, n),
    z.someLimit = I(z.eachOfLimit, e, n),
    z.all = z.every = I(z.eachOf, i, i),
    z.everyLimit = I(z.eachOfLimit, i, i),
    z.detect = I(z.eachOf, n, L),
    z.detectSeries = I(z.eachOfSeries, n, L),
    z.detectLimit = I(z.eachOfLimit, n, L),
    z.sortBy = function(t, n, e) {
        function i(t, n) {
            var e = t.criteria,
            i = n.criteria;
            return i > e ? -1 : e > i ? 1 : 0
        }
        z.map(t,
        function(t, e) {
            n(t,
            function(n, i) {
                n ? e(n) : e(null, {
                    value: t,
                    criteria: i
                })
            })
        },
        function(t, n) {
            return t ? e(t) : void e(null, l(n.sort(i),
            function(t) {
                return t.value
            }))
        })
    },
    z.auto = function(n, e) {
        function i(t) {
            p.unshift(t)
        }
        function a(t) {
            var n = m(p, t);
            n >= 0 && p.splice(n, 1)
        }
        function o() {
            l--,
            s(p.slice(0),
            function(t) {
                t()
            })
        }
        e = r(e || t);
        var c = D(n),
        l = c.length;
        if (!l) return e(null);
        var u = {},
        p = [];
        i(function() {
            l || e(null, u)
        }),
        s(c,
        function(t) {
            function r() {
                return d(v,
                function(t, n) {
                    return t && u.hasOwnProperty(n)
                },
                !0) && !u.hasOwnProperty(t)
            }
            function c() {
                r() && (a(c), l[l.length - 1](p, u))
            }
            for (var s, l = H(n[t]) ? n[t] : [n[t]], p = h(function(n, i) {
                if (i.length <= 1 && (i = i[0]), n) {
                    var a = {};
                    f(u,
                    function(t, n) {
                        a[n] = t
                    }),
                    a[t] = i,
                    e(n, a)
                } else u[t] = i,
                z.setImmediate(o)
            }), v = l.slice(0, l.length - 1), g = v.length; g--;) {
                if (! (s = n[v[g]])) throw new Error("Has inexistant dependency");
                if (H(s) && m(s, t) >= 0) throw new Error("Has cyclic dependencies")
            }
            r() ? l[l.length - 1](p, u) : i(c)
        })
    },
    z.retry = function(t, n, e) {
        function i(t, n) {
            if ("number" == typeof n) t.times = parseInt(n, 10) || r;
            else {
                if ("object" != typeof n) throw new Error("Unsupported argument type for 'times': " + typeof n);
                t.times = parseInt(n.times, 10) || r,
                t.interval = parseInt(n.interval, 10) || o
            }
        }
        function a(t, n) {
            function e(t, e) {
                return function(i) {
                    t(function(t, n) {
                        i(!t || e, {
                            err: t,
                            result: n
                        })
                    },
                    n)
                }
            }
            function i(t) {
                return function(n) {
                    setTimeout(function() {
                        n(null)
                    },
                    t)
                }
            }
            for (; s.times;) {
                var a = !(s.times -= 1);
                c.push(e(s.task, a)),
                !a && s.interval > 0 && c.push(i(s.interval))
            }
            z.series(c,
            function(n, e) {
                e = e[e.length - 1],
                (t || s.callback)(e.err, e.result)
            })
        }
        var r = 5,
        o = 0,
        c = [],
        s = {
            times: r,
            interval: o
        },
        l = arguments.length;
        if (1 > l || l > 3) throw new Error("Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)");
        return 2 >= l && "function" == typeof t && (e = n, n = t),
        "function" != typeof t && i(s, t),
        s.callback = e,
        s.task = n,
        s.callback ? a() : a
    },
    z.waterfall = function(n, e) {
        function i(t) {
            return h(function(n, a) {
                if (n) e.apply(null, [n].concat(a));
                else {
                    var r = t.next();
                    r ? a.push(i(r)) : a.push(e),
                    T(t).apply(null, a)
                }
            })
        }
        if (e = r(e || t), !H(n)) {
            var a = new Error("First argument to waterfall must be an array of functions");
            return e(a)
        }
        return n.length ? void i(z.iterator(n))() : e()
    },
    z.parallel = function(t, n) {
        j(z.eachOf, t, n)
    },
    z.parallelLimit = function(t, n, e) {
        j(g(n), t, e)
    },
    z.series = function(t, n) {
        j(z.eachOfSeries, t, n)
    },
    z.iterator = function(t) {
        function n(e) {
            function i() {
                return t.length && t[e].apply(null, arguments),
                i.next()
            }
            return i.next = function() {
                return e < t.length - 1 ? n(e + 1) : null
            },
            i
        }
        return n(0)
    },
    z.apply = h(function(t, n) {
        return h(function(e) {
            return t.apply(null, n.concat(e))
        })
    }),
    z.concat = b(E),
    z.concatSeries = w(E),
    z.whilst = function(n, e, i) {
        if (i = i || t, n()) {
            var a = h(function(t, r) {
                t ? i(t) : n.apply(this, r) ? e(a) : i(null)
            });
            e(a)
        } else i(null)
    },
    z.doWhilst = function(t, n, e) {
        var i = 0;
        return z.whilst(function() {
            return++i <= 1 || n.apply(this, arguments)
        },
        t, e)
    },
    z.until = function(t, n, e) {
        return z.whilst(function() {
            return ! t.apply(this, arguments)
        },
        n, e)
    },
    z.doUntil = function(t, n, e) {
        return z.doWhilst(t,
        function() {
            return ! n.apply(this, arguments)
        },
        e)
    },
    z.during = function(n, e, i) {
        i = i || t;
        var a = h(function(t, e) {
            t ? i(t) : (e.push(r), n.apply(this, e))
        }),
        r = function(t, n) {
            t ? i(t) : n ? e(a) : i(null)
        };
        n(r)
    },
    z.doDuring = function(t, n, e) {
        var i = 0;
        z.during(function(t) {
            i++<1 ? t(null, !0) : n.apply(this, arguments)
        },
        t, e)
    },
    z.queue = function(t, n) {
        var e = P(function(n, e) {
            t(n[0], e)
        },
        n, 1);
        return e
    },
    z.priorityQueue = function(n, e) {
        function i(t, n) {
            return t.priority - n.priority
        }
        function a(t, n, e) {
            for (var i = -1,
            a = t.length - 1; a > i;) {
                var r = i + (a - i + 1 >>> 1);
                e(n, t[r]) >= 0 ? i = r: a = r - 1
            }
            return i
        }
        function r(n, e, r, o) {
            if (null != o && "function" != typeof o) throw new Error("task callback must be a function");
            return n.started = !0,
            H(e) || (e = [e]),
            0 === e.length ? z.setImmediate(function() {
                n.drain()
            }) : void s(e,
            function(e) {
                var c = {
                    data: e,
                    priority: r,
                    callback: "function" == typeof o ? o: t
                };
                n.tasks.splice(a(n.tasks, c, i) + 1, 0, c),
                n.tasks.length === n.concurrency && n.saturated(),
                z.setImmediate(n.process)
            })
        }
        var o = z.queue(n, e);
        return o.push = function(t, n, e) {
            r(o, t, n, e)
        },
        delete o.unshift,
        o
    },
    z.cargo = function(t, n) {
        return P(t, 1, n)
    },
    z.log = O("log"),
    z.dir = O("dir"),
    z.memoize = function(t, e) {
        var i = {},
        a = {};
        e = e || n;
        var r = h(function(n) {
            var r = n.pop(),
            o = e.apply(null, n);
            o in i ? z.nextTick(function() {
                r.apply(null, i[o])
            }) : o in a ? a[o].push(r) : (a[o] = [r], t.apply(null, n.concat([h(function(t) {
                i[o] = t;
                var n = a[o];
                delete a[o];
                for (var e = 0,
                r = n.length; r > e; e++) n[e].apply(null, t)
            })])))
        });
        return r.memo = i,
        r.unmemoized = t,
        r
    },
    z.unmemoize = function(t) {
        return function() {
            return (t.unmemoized || t).apply(null, arguments)
        }
    },
    z.times = S(z.map),
    z.timesSeries = S(z.mapSeries),
    z.timesLimit = function(t, n, e, i) {
        return z.mapLimit(u(t), n, e, i)
    },
    z.seq = function() {
        var n = arguments;
        return h(function(e) {
            var i = this,
            a = e[e.length - 1];
            "function" == typeof a ? e.pop() : a = t,
            z.reduce(n, e,
            function(t, n, e) {
                n.apply(i, t.concat([h(function(t, n) {
                    e(t, n)
                })]))
            },
            function(t, n) {
                a.apply(i, [t].concat(n))
            })
        })
    },
    z.compose = function() {
        return z.seq.apply(null, Array.prototype.reverse.call(arguments))
    },
    z.applyEach = A(z.eachOf),
    z.applyEachSeries = A(z.eachOfSeries),
    z.forever = function(n, e) {
        function i(t) {
            return t ? r(t) : void o(i)
        }
        var r = a(e || t),
        o = T(n);
        i()
    },
    z.ensureAsync = T,
    z.constant = h(function(t) {
        var n = [null].concat(t);
        return function(t) {
            return t.apply(this, n)
        }
    }),
    z.wrapSync = z.asyncify = function(t) {
        return h(function(n) {
            var e, i = n.pop();
            try {
                e = t.apply(this, n)
            } catch(a) {
                return i(a)
            }
            Q(e) && "function" == typeof e.then ? e.then(function(t) {
                i(null, t)
            })["catch"](function(t) {
                i(t.message ? t: new Error(t))
            }) : i(null, e)
        })
    },
    "object" == typeof module && module.exports ? module.exports = z: "function" == typeof define && define.amd ? define([],
    function() {
        return z
    }) : B.async = z
} ();
var t = /\{(.*?)\}/g,
n = {
    render2: function(n, e) {
        return n.replace(t,
        function(t, n) {
            var i;
            return n in e ? "undefined" == typeof e[n] ? "": e[n] : (i = n.charAt(0).toLowerCase() + n.substring(1), i in e ? e[i] : "")
        })
    },
    render: function(n, e) {
        return this[n].replace(t,
        function(t, n) {
            var i;
            return n in e ? e[n] : (i = n.charAt(0).toLowerCase() + n.substring(1), i in e ? e[i] : "")
        })
    },
    batch: function(t, e) {
        return e.map(function(e) {
            return n.render(t, e)
        }).join("")
    }
};
n.miniBox = '<p class="mini-box"><span class="info">佣金：{commissionRatePercent}%</span><span class="info">最高佣金：{topCommissionRatePercent}%</span></p>',
n.boxGeneral = '<div class="general"><div class="row"><span class="info">佣金：{commissionRatePercent}%</span> <span class="info">最高佣金：{topCommissionRatePercent}%</span></div><div class="row"><a href="javascript:;" action="tg-s">单品推广</a> <a href="javascript:;" action="lj">链接转换</a> <a target="_blank" class="go-detail" href="">进入商品</a></div></div>',
n.boxPlans = '<div class="plans"><div class="plans-wrapper"><table><thead><tr><th>计划名</th><th>审核</th><th>平均佣金</th><th>佣金</th><th>操作</th></tr></thead><tbody>{data}</tbody></table></div></div>',
n.boxEvents = '<div class="events"><div class="events-wrapper"><table><thead><tr><th>鹊桥ID</th><th>佣金</th><th>开始</th><th>结束</th><th>分成</th><th>终分</th><th>剩余</th><th>推广</th><th>生成</th></tr></thead><tbody>{data}</tbody></table></div></div>',
n.defaultQMBox = '<div class="qm-box"></div>',
n.qqrow = '<tr class="{color}"><td>{eventId}</td><td>{commissionrate}%</td><td>{stime}</td><td>{etime}</td><td>{sharerate}%</td><td>{zhongfen}%</td><td>{ltime}</td><td><a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/promo/act/activity_detail?eventId={eventId}">推广</a></td><td><a action="lj-qq" href="javascript:;">生成</a></td></tr>',
n.planrow = '<tr><td><a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId={CampaignID}&shopkeeperId={ShopKeeperID}&userNumberId={userNumberId}">{CampaignName}</a></td><td>{Properties}</td><td>{AvgCommission}</td><td><a href="javascript:;" action="yj">佣金</a></td><td><a href="javascript:;" action="get">申请</a></td></tr>',
n.pidwindow = '<div class="qm-window"> <div class="qm-window-header"> <button type="button" class="qm-window-close" ><span>&times;</span></button> <h4 class="qm-window-title">请输入您的 PID</h4> </div> <div class="qm-window-body"> <div class="form-group"><input type="text" class="form-control" placeholder="请输入三段式PID"></div> </div> <div class="qm-window-footer"> <button type="button" class="btn btn-default avgrund-close" action="cancel">取消</button> <button type="button" class="btn btn-primary avgrund-close" action="save">确定</button> </div></div>',
n.qqpidwindow = '<div class="qm-window"> <div class="qm-window-header"> <button type="button" class="qm-window-close" ><span>&times;</span></button> <h4 class="qm-window-title">请输入您的鹊桥 PID</h4> </div> <div class="qm-window-body"> <div class="form-group"><input type="text" class="form-control" placeholder="请输入三段式PID"></div> </div> <div class="qm-window-footer"> <button type="button" class="btn btn-default avgrund-close" action="cancel">取消</button> <button type="button" class="btn btn-primary avgrund-close" action="save">确定</button> </div></div>',
n.linkModal = '<div class="qm-window"><div class="qm-window-header"><button type="button" class="qm-window-close"><span>&times;</span></button><h4 class="qm-window-title">选择并复制您的链接吧</h4></div><div class="qm-window-body"><ul class="nav nav-tabs"><li class="active"><a href="javascript:;" data-cp="#home">淘客链接</a></li><li><a href="javascript:;" data-cp="#profile">短链接</a></li><li><a href="javascript:;" data-cp="#messages">长链接</a></li><li><a href="javascript:;" data-cp="#baidu">百度链接</a></li><li><a href="javascript:;" data-cp="#sina">新浪链接</a></li><li><a href="javascript:;" data-cp="#qrcode">二维码</a></li></ul><div class="tab-content"><div class="tab-pane active" id="home"><div class="form-group"><textarea readonly class="form-control" rows="8" data-key="clickUrl"></textarea></div></div><div class="tab-pane" id="profile"><div class="form-group"><textarea readonly class="form-control" rows="8" data-key="shortLinkUrl"></textarea></div></div><div class="tab-pane" id="messages"><div class="form-group"><textarea readonly class="form-control" rows="8" data-key="eliteUrl"></textarea></div></div><div class="tab-pane" id="baidu"><div class="form-group"><textarea readonly class="form-control" rows="8" data-key="du_url"></textarea></div></div><div class="tab-pane" id="sina"><div class="form-group"><textarea readonly class="form-control" rows="8" data-key="sina_url"></textarea></div></div><div class="tab-pane" id="qrcode"><img data-key="qrCodeUrl"></div></div></div><div class="qm-window-footer"><button type="button" class="btn btn-default avgrund-close">关闭</button></div></div>',
n.ssModal = '<div class="qm-window"><div class="qm-window-header"><button type="button" class="qm-window-close"><span>&times;</span></button><h4 class="qm-window-title">请选择你要使用的推广位</h4></div><div class="qm-window-body"><div class="form-group"><select class="form-control"></select></div></div><div class="qm-window-footer"><button type="button" class="btn btn-default avgrund-close" action="cancel">取消</button> <button type="button" class="btn btn-default avgrund-close" action="save">确定</button></div></div>',
n.applyPlan = '<div class="qm-window"><div class="qm-window-header"><button type="button" class="qm-window-close" ><span>&times;</span></button><h4 class="qm-window-title">请输入申请理由</h4></div><div class="qm-window-body"><div class="form-group"><textarea class="form-control" placeholder="要推广此商品，请求通过！"></textarea></div></div><div class="qm-window-footer"><button type="button" class="btn btn-default avgrund-close" action="cancel">取消</button><button type="button" class="btn btn-primary avgrund-close" action="save">确定</button></div></div>',
function(t, e) {
    var i, a, r, o;
    t.config = r = t.buildConfig(e),
    i = function() {
        var n, e, i, c = r;
        if (c) for (Array.isArray(c) || (c = [c]), n = 0, e = c.length; e > n; n++) i = t.getItems(c[n]),
        i.forEach(function(n) {
            n.el.setAttribute("data-rate", ""),
            t.hoverItem(n.el, o),
            a.push(n)
        })
    },
    a = async.queue(function(t, n) {
        var e, i, a = t.el,
        r = t.config;
        try {
            e = a.querySelector(r.anchor).href
        } catch(o) {
            return n()
        }
        i = function(t) {
            var n, e, i, o = t.item,
            c = r.insertHtml;
            return "login" === t.data ? (e = $(c).html('请<a target="_blank" href="http://www.alimama.com/index.htm">登录阿里妈妈</a>'), i = !0) : "user" === t.data && (e = $(c).html("请登录淘宝款插件"), i = !0),
            i ? (e.appendTo($(a)), void(r.fixItem && $(a).css("position", "relative"))) : void(o && (o.commissionRatePercent = o.commissionRate || o.commissionRatePercent || 0, n = t.queqiao[0] || {},
            o.topCommissionRatePercent = n.commissionrate || o.commissionRatePercent || 0, c = c.replace(/\{(.*?)\}/g,
            function(t, n) {
                return o[n]
            }), e = $(a).data(t), r.appendTo ? e.find(r.appendTo).append($(c)) : e.append($(c)), r.fixItem && e.css("position", "relative")))
        },
        chrome.runtime.sendMessage({
            cmd: "getItemInfo",
            url: e
        },
        function(t) {
            if (t.error) console.log(t.error);
            else try {
                i(t)
            } catch(e) {
                console.log(e)
            }
            setTimeout(n, 300)
        })
    },
    1),
    setTimeout(function() {
        o = $(n.defaultQMBox),
        o.appendTo(document.body),
        t.initQMBox(o);
        setInterval(i, 200)
    },
    500),
    $(function() {
        $("#list-filterForm .styles a[data-value]").click(function(n) {
            var i = this.getAttribute("data-value");
            console.log("switch to", i, "mode"),
            clearInterval(scanTimer),
            r = t.buildConfig(e)
        })
    })
} ({
    detailUrls: ["item.taobao.com/item.htm", "detail.tmall.com", "ai.taobao.com/auction/edetail.htm"],
    isDetailUrl: function(t) {
        var n = this.detailUrls,
        e = !1;
        return n.forEach(function(n) {
            var i = t.indexOf(n);
            return i >= 0 && 9 > i ? (e = !0, !0) : void 0
        }),
        e
    },
    buildConfig: function(t) {
        var n, e = location.hostname,
        i = t[e];
        if (i) {
            try {
                n = location.search.substring(1).split("&").filter(function(t) {
                    return t.startsWith("style=")
                })[0].split("=")[1]
            } catch(a) {
                n = "grid"
            }
            i[n] && (i = i[n]),
            i.host = e
        } else console.log("%c[NOTICE] this page is unsupported", "color: red;font-weight:bold;font-size:30px;");
        return i
    },
    modal: function(t, n, e) {
        var i, a, r;
        i = $('<div class="qm-overlay"></div>'),
        a = $(t),
        i.appendTo(document.body),
        a.appendTo(document.body),
        a.css({
            marginLeft: a.width() / -2,
            marginTop: a.height() / -2
        }),
        r = function() {
            a.hide(),
            e && e(a),
            a.unbind("click"),
            i.remove(),
            a.remove()
        },
        a.delegate(".qm-window-close", "click", r),
        a.delegate(".btn", "click",
        function() {
            setTimeout(r, 100)
        }),
        n && n(a)
    },
    setData: function(t, e) {
        var i, a = [];
        a.push(n.render("boxGeneral", e.item)),
        i = e.plans && e.plans.length ? n.batch("planrow", e.plans) : '<tr><td colspan="4">该商品没有计划</td></tr>',
        a.push(n.boxPlans.replace("{data}", i)),
        i = e.queqiao && e.queqiao.length ? n.batch("qqrow", e.queqiao) : '<tr><td colspan="9">该商品没有鹊桥活动</td></tr>',
        a.push(n.boxEvents.replace("{data}", i)),
        t.html(a.join(""))
    },
    hoverItem: function(t, n) {
        var e = this;
        $(t).hover(function() {
            var t, i, a, r = $(this),
            o = n.data("prev-element");
            if (o !== this) {
                if (t = r.data(), !t.item) return;
                e.setData(n, t),
                n.data({
                    "prev-element": this,
                    cdata: t
                }),
                n.find(".go-detail").attr("href", t.originalUrl)
            }
            i = r.offset(),
            a = r.width(),
            n.css({
                top: i.top
            }),
            i.left + n.width() > $(window).width() ? n.css({
                left: i.left + a - n.width()
            }) : n.css({
                left: i.left
            }),
            n.show()
        },
        function() {
            n.hide()
        })
    },
    getItems: function(t) {
        var n = document.querySelectorAll(t.item),
        e = [].slice;
        return n = e.call(n, 0),
        t.itemFilter && (n = n.filter(t.itemFilter)),
        n = n.filter(function(t) {
            return ! t.hasAttribute("data-rate")
        }),
        n.map(function(n) {
            return {
                el: n,
                config: t
            }
        })
    },
    initQMBox: function(t) {
        var n = this;
        t.hide(),
        t.hover(function() {
            t.show()
        },
        function() {
            t.hide()
        }),
        t.delegate("a", "click",
        function(e) {
            var i, a, r, o, c = e.target,
            s = c.getAttribute("action"),
            l = t.data("cdata");
            if (s) switch (i = $(c).closest("tr").children("td:first").text(), a = l.item.iid || l.item.auctionId, s) {
            case "tg-s":
                n.getPid(function(t) {
                    t && n.getLink(l.url, t)
                });
                break;
            case "lj":
                n.getPid(function(t) {
                    t && n.getLink(l.url, t)
                });
                break;
            case "lj-qq":
                n.getQQPid(function(t) {
                    t && n.getQQLink(i, t, a)
                });
                break;
            case "get":
                o = $(c).closest("tr").children("td:first").children("a").attr("href"),
                n.applyPlan(o,
                function(t) {
                    t ? ($(c).closest("td").text("申请成功"), alert("申请成功")) : alert("申请失败")
                });
                break;
            case "yj":
                i = $(c).closest("tbody").children("tr").index($(c).closest("tr")),
                r = l.plans[i],
                n.getPlanCommission(r,
                function(t) {
                    t.error ? n.handleError(t.error) : $(c).closest("td").text(t.data)
                });
                break;
            default:
                console.log("unsupported action:", s)
            }
        })
    },
    spread: function(t) {
        var n = this;
        chrome.runtime.sendMessage({
            cmd: "tuiguang",
            url: t
        },
        function(t) {
            t.error ? n.handleError(t.error) : t.nextcmd && n.selectSpreadUnit(t.data)
        })
    },
    getLink: function(t, n) {
        var e = this;
        chrome.runtime.sendMessage({
            cmd: "link",
            pid: n,
            url: t
        },
        function(t) {
            t.error ? e.handleError(t.error) : e.showLink(t)
        })
    },
    getQQLink: function(t, n, e) {
        var i = this;
        chrome.runtime.sendMessage({
            cmd: "qq-link",
            id: t,
            pid: n,
            itemId: e
        },
        function(t) {
            t.error ? i.handleError(t.error) : i.showLink(t, "qq")
        })
    },
    handleError: function(t) {
        "string" == typeof t ? alert(t) : alert(t.message)
    },
    showLink: function(t, e) {
        this.modal(n.linkModal,
        function(n) {
            var e, i, a;
            for (e in t.data) if (t.data[e] && (i = n.find('[data-key="' + e + '"]'), i.length)) switch (a = i[0].tagName.toLowerCase()) {
            case "input":
            case "textarea":
                i.val(t.data[e]),
                i.removeAttr("data-key");
                break;
            case "img":
                i.removeAttr("data-key"),
                i.attr("src", t.data[e])
            }
            n.find("[data-key]").each(function() {
                var t, e = $(this).closest(".tab-pane");
                t = n.find('[data-cp="#' + e.attr("id") + '"]'),
                t.closest("li").hide()
            }),
            n.find(".nav-tabs").delegate("li", "click",
            function(t) {
                var n, e = $(this);
                e.hasClass("active") || (n = e.parent().next(".tab-content"), e.siblings(".active").removeClass("active"), n.children(".active").removeClass("active"), e.addClass("active"), $(e.children("a").attr("data-cp")).addClass("active"))
            })
        },
        function(t) {
            t.find(".nav-tabs").unbind("click")
        })
    },
    getPid: function(t) {
        var n = this;
        chrome.runtime.sendMessage({
            cmd: "adzone",
            tag: 29
        },
        function(e) {
            var i = {
                zones: []
            };
            return e.error ? (n.handleError(e.error), t()) : (["otherList", "webList", "appList"].forEach(function(t) {
                var n = e.data[t];
                return n.length ? (i.memberid = n[0].memberid, !1) : void 0
            }), ["otherAdzones", "webAdzones", "appAdzones"].forEach(function(t) {
                var n = e.data[t];
                n && n.forEach(function(t) {
                    t.sub.length && i.zones.push(t)
                })
            }), i.zones.length ? n.selectSpreadUnit(i, t) : void alert("没有检测到你的 PID，请登录阿里妈妈查看。"))
        })
    },
    getQQPid: function(t) {
        var n = this;
        chrome.runtime.sendMessage({
            cmd: "adzone",
            tag: 59
        },
        function(e) {
            var i = {
                zones: []
            };
            return e.data && (["otherList", "webList", "appList"].forEach(function(t) {
                var n = e.data[t];
                return n.length ? (i.memberid = n[0].memberid, !1) : void 0
            }), ["otherAdzones", "webAdzones", "appAdzones"].forEach(function(t) {
                var n = e.data[t];
                n && n.forEach(function(t) {
                    t.sub.length && i.zones.push(t)
                })
            }), i.zones.length) ? n.selectSpreadUnit(i, t) : void n.showInputPIDWindow(!0, t)
        })
    },
    showInputPIDWindow: function(t, e) {
        "function" == typeof t && (e = t, t = !1),
        this.modal(t ? n.qqpidwindow: n.pidwindow,
        function(n) {
            n.find(".btn[action]").click(function(i) {
                var a, r = $(this);
                "save" === r.attr("action") ? (a = n.find("input").val(), 0 !== a.indexOf("mm_") && (a = "mm_" + a), t ? chrome.storage.local.set({
                    "qq-pid": a
                }) : chrome.storage.local.set({
                    pid: a
                }), e(a)) : "cancel" === r.attr("action") && e(!1)
            }),
            chrome.storage.local.get("qq-pid",
            function(t) {
                t["qq-pid"] && n.find("input").val(t["qq-pid"])
            })
        },
        function(t) {
            t.find(".btn[action]").unbind("click")
        })
    },
    selectSpreadUnit: function(t, e) {
        this.modal(n.ssModal,
        function(n) {
            n.find("select").html(t.zones.map(function(n) {
                return n.sub.map(function(e) {
                    var i = ["mm", t.memberid, n.id, e.id].join("_");
                    return '<option value="' + i + '">' + n.name + " - " + e.name + "</option>"
                }).join("")
            }).join("")),
            n.find(".btn[action]").click(function(t) {
                var i, a = $(this);
                "save" === a.attr("action") ? (i = n.find("select").val(), e(i ? i: !1)) : "cancel" === a.attr("action") && e(!1)
            })
        },
        function(t) {
            t.find(".btn[action]").unbind("click")
        })
    },
    applyPlan: function(t, e) {
        var i = {},
        a = t.split("?").pop().split("&").map(function(t) {
            return t.split("=")
        });
        a.forEach(function(t) {
            i[t[0]] = t[1]
        }),
        i = {
            campId: i.campaignId,
            keeperid: i.shopkeeperId,
            applyreason: "有好货达人，请求通过！QQ：292329345"
        },
        this.modal(n.applyPlan,
        function(t) {
            t.delegate(".btn", "click",
            function(n) {
                var a = $(this).attr("action");
                "save" === a && (i.applyreason = t.find("textarea").val() || i.applyreason, chrome.runtime.sendMessage({
                    cmd: "applyPlan",
                    data: i
                },
                function(t) {
                    t.error ? (util.handleError(t.error), e(!1)) : e(!0)
                }))
            })
        },
        function(t) {
            t.unbind("click")
        })
    },
    getPlanCommission: function(t, n) {
        chrome.runtime.sendMessage({
            cmd: "planyj",
            data: t
        },
        n)
    }
},
{
    "s.taobao.com": {
        grid: [{
            item: "ul .oneline",
            anchor: "a[href]",
            insertHtml: n.miniBox
        },
        {
            item: ".items>.item",
            anchor: ".J_ClickStat",
            appendTo: ".pic-box",
            insertHtml: n.miniBox
        }],
        list: {
            item: "#mainsrp-itemlist .title a",
            appendTo: ["li", ".col-4"],
            insertHtml: n.miniBox
        }
    },
    "list.taobao.com": {
        grid: {
            item: ".items .item",
            anchor: ".title a",
            insertHtml: n.miniBox
        },
        list: {
            item: "#list-itemList .title .J_AtpLog",
            appendTo: ["li", ".col-4"],
            insertHtml: n.miniBox
        }
    },
    "list.tmall.com": {
        item: ".view .product",
        anchor: ".productImg-wrap a",
        insertHtml: n.miniBox
    },
    "www.tmall.com": {
        item: "li.mui-act-item a:nth-child(2)",
        appendTo: "li.mui-act-item",
        insertHtml: n.miniBox
    },
    "temai.taobao.com": [{
        item: "#items>li",
        anchor: "a",
        fixItem: !0,
        insertHtml: n.miniBox
    },
    {
        item: "li.item",
        anchor: "a",
        insertHtml: n.miniBox
    },
    {
        item: ".items>li",
        anchor: "a",
        fixItem: !0,
        insertHtml: n.miniBox
    },
    {
        item: "#channel_item>li",
        anchor: "a",
        fixItem: !0,
        insertHtml: n.miniBox
    }],
    "ai.taobao.com": [{
        item: ".temai-item",
        anchor: "a",
        appendTo: "a",
        insertHtml: n.miniBox
    },
    {
        item: ".floor-shangpin .item",
        anchor: "a",
        insertHtml: n.miniBox
    },
    {
        item: ".search-result-boxout",
        anchor: "a",
        appendTo: ".search-result-box",
        insertHtml: n.miniBox
    }]
});