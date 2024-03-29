//需要加载：//cdn.bili33.top/npm/matter-js@0.19.0
"use strict";
function findNearestBlock(e) {
  for (var t = !0; t; ) {
    var r = e;
    if (((t = !1), null === r || r === document.body)) return null;
    var n = getComputedStyle(r);
    if ("svg" !== r.tagName && "inline" !== n.display) return r;
    (e = r.parentNode), (t = !0), (n = undefined);
  }
}
function bootstrap() {
  function e() {
    var e = 1e4,
      t = Matter.Bodies.rectangle(
        window.innerWidth / 2 + window.scrollX,
        -e / 2 + window.scrollY,
        window.innerWidth + 2 * e,
        e,
        { isStatic: !0, restitution: 0.8 }
      ),
      r = Matter.Bodies.rectangle(
        window.innerWidth / 2 + window.scrollX,
        window.innerHeight + e / 2 + window.scrollY,
        window.innerWidth + 2 * e,
        e,
        { isStatic: !0, restitution: 0.8 }
      ),
      n = Matter.Bodies.rectangle(
        -e / 2 + window.scrollX,
        window.innerHeight / 2 + window.scrollY,
        e,
        window.innerHeight + 2 * e,
        { isStatic: !0, restitution: 0.8 }
      ),
      i = Matter.Bodies.rectangle(
        window.innerWidth + e / 2 + window.scrollX,
        window.innerHeight / 2 + window.scrollY,
        e,
        window.innerHeight + 2 * e,
        { isStatic: !0, restitution: 0.8 }
      );
    W && Matter.Composite.remove(engine.world, W),
      (W = Matter.Composite.create()),
      Matter.Composite.add(W, [t, r, n, i]),
      Matter.Composite.add(engine.world, W);
  }
  function I(e) {
    var t = Math.min(e - q, 100);
    q = e;
    var r = window.scrollX,
      n = window.scrollY;
    if (k + 100 < e) {
      W && Matter.Composite.translate(W, { x: r - V, y: n - N }),
        (V = r),
        (N = n);
      var i = window.screenX - R,
        o = window.screenY - T,
        a = !0,
        l = !1,
        d = undefined;
      try {
        for (
          var s, w = engine.world.bodies[Symbol.iterator]();
          !(a = (s = w.next()).done);
          a = !0
        ) {
          (m = s.value) !== W && Matter.Body.translate(m, { x: -i, y: -o });
        }
      } catch (H) {
        (l = !0), (d = H);
      } finally {
        try {
          !a && w["return"] && w["return"]();
        } finally {
          if (l) throw d;
        }
      }
      (R = window.screenX), (T = window.screenY);
    }
    Matter.Engine.update(engine, t);
    var c = Matter.Composite.allBodies(engine.world),
      u = !0,
      f = !1,
      y = undefined;
    try {
      for (
        var v, g = c[Symbol.iterator]();
        !(u = (v = g.next()).done);
        u = !0
      ) {
        var m,
          p = (m = v.value).id,
          h = P.get(p);
        if (h) {
          var M = _slicedToArray(h, 3),
            x = M[0],
            b = M[1],
            S = M[2];
          if (x && x.offsetParent) {
            var B = x.offsetParent.getBoundingClientRect(),
              C = B.top,
              X = B.left + x.offsetLeft + b / 2,
              Y = C + x.offsetTop + S / 2,
              A = m.position.x - r,
              E = m.position.y - n,
              L = m.angle;
            x.style.transform =
              "translate(" +
              (A - X) +
              "px, " +
              (E - Y) +
              "px) rotate(" +
              L +
              "rad)";
          } else P["delete"](p), Matter.Composite.remove(engine.world, m);
        }
      }
    } catch (H) {
      (f = !0), (y = H);
    } finally {
      try {
        !u && g["return"] && g["return"]();
      } finally {
        if (f) throw y;
      }
    }
    requestAnimationFrame(I);
  }
  engine = Matter.Engine.create({ gravity: { x: 0, y: -0.1 } });
  var P = new Map(),
    W = null;
  e(), window.addEventListener("resize", e);
  var t = document.createElement("div");
  (t.style.position = "fixed"),
    (t.style.left = 0),
    (t.style.top = 0),
    (t.style.width = "100vw"),
    (t.style.height = "100vh"),
    (t.style["pointer-events"] = "none"),
    document.body.appendChild(t);
  var q = performance.now(),
    V = window.scrollX,
    N = window.scrollY,
    R = window.screenX,
    T = window.screenY,
    k = q;
  requestAnimationFrame(I),
    document.body.addEventListener(
      "click",
      function (e) {
        var t = findNearestBlock(e.target);
        if (t.classList.contains("meow-floating")) return !0;
        if (t.querySelector(".meow-floating")) return !0;
        e.preventDefault(), e.stopImmediatePropagation();
        var r = t.getBoundingClientRect(),
          n = r.top,
          i = r.left,
          o = r.width,
          a = r.height;
        if (600 < a) return !0;
        var l = window.scrollX + i,
          d = window.scrollY + n,
          s = Matter.Bodies.rectangle(l + o / 2, d + a / 2, o, a, {
            restitution: 0.8,
          }),
          w = s.id,
          c = 2 * Math.random() - 1,
          u = 2 * Math.random() - 1,
          f = 0.02 * Math.random() - 0.01;
        Matter.Body.setVelocity(s, { x: c, y: u }),
          Matter.Body.setAngularVelocity(s, f),
          t.style.setProperty("--real-width", o + "px"),
          t.style.setProperty("--real-height", a + "px"),
          t.classList.add("meow-floating");
        var y = t.querySelectorAll("a[data-toggle=popover]"),
          v = !0,
          g = !1,
          m = undefined;
        try {
          for (
            var p, h = y[Symbol.iterator]();
            !(v = (p = h.next()).done);
            v = !0
          ) {
            p.value.addEventListener(
              "mouseover",
              function (e) {
                e.stopImmediatePropagation();
              },
              !0
            );
          }
        } catch (X) {
          (g = !0), (m = X);
        } finally {
          try {
            !v && h["return"] && h["return"]();
          } finally {
            if (g) throw m;
          }
        }
        var M = t.querySelectorAll(".popover"),
          x = !0,
          b = !1,
          S = undefined;
        try {
          for (
            var B, C = M[Symbol.iterator]();
            !(x = (B = C.next()).done);
            x = !0
          ) {
            B.value.remove();
          }
        } catch (X) {
          (b = !0), (S = X);
        } finally {
          try {
            !x && C["return"] && C["return"]();
          } finally {
            if (b) throw S;
          }
        }
        return P.set(w, [t, o, a]), Matter.Composite.add(engine.world, s), !1;
      },
      !0
    );
}
var _slicedToArray = (function () {
    function r(e, t) {
      var r = [],
        n = !0,
        i = !1,
        o = undefined;
      try {
        for (
          var a, l = e[Symbol.iterator]();
          !(n = (a = l.next()).done) && (r.push(a.value), !t || r.length !== t);
          n = !0
        );
      } catch (d) {
        (i = !0), (o = d);
      } finally {
        try {
          !n && l["return"] && l["return"]();
        } finally {
          if (i) throw o;
        }
      }
      return r;
    }
    return function (e, t) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return r(e, t);
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    };
  })(),
  Matter = window.Matter,
  engine = null;
window.addEventListener("devicemotion", function (e) {
  if (engine) {
    if (e.accelerationIncludingGravity) {
      var t = e.accelerationIncludingGravity.x,
        r = e.accelerationIncludingGravity.y;
      if (null === t || null === r) return;
      var n = Matter.Vector.create(2e-4 * t, 2e-4 * -r),
        i = Matter.Vector.magnitude(n),
        o = Matter.Vector.normalise(n);
      (engine.gravity.x = o.x),
        (engine.gravity.y = o.y),
        (engine.gravity.scale = i);
    }
    if (e.rotationRate) {
      var a = e.rotationRate.gamma;
      if (null === a) return;
      var l = window.innerWidth / 2 + window.scrollX,
        d = window.innerHeight / 2 + window.scrollY,
        s = !0,
        w = !1,
        c = undefined;
      try {
        for (
          var u, f = engine.world.bodies[Symbol.iterator]();
          !(s = (u = f.next()).done);
          s = !0
        ) {
          var y = u.value;
          Matter.Body.rotate(y, 2e-4 * a, { x: l, y: d });
        }
      } catch (v) {
        (w = !0), (c = v);
      } finally {
        try {
          !s && f["return"] && f["return"]();
        } finally {
          if (w) throw c;
        }
      }
    }
  }
}),
  (document.body.onload = bootstrap);
