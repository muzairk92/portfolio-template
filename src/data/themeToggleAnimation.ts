export const themeToggleAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "SunMoonToggle",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Sun Core",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [120, 120] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse Path 1"
            },
            {
              ty: "fl",
              c: {
                a: 1,
                k: [
                  { t: 0, s: [1, 0.835, 0.415, 1] },
                  { t: 30, s: [0.949, 0.972, 1, 1] },
                  { t: 60, s: [1, 0.835, 0.415, 1] }
                ]
              },
              o: { a: 0, k: 100 },
              nm: "Fill 1"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ],
          nm: "Ellipse 1"
        }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Rays",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: 100 },
            { t: 30, s: 0 },
            { t: 60, s: 100 }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [170, 10] },
              p: { a: 0, k: [0, -80] },
              r: { a: 0, k: 5 },
              nm: "Ray"
            },
            { ty: "fl", c: { a: 0, k: [1, 0.835, 0.415, 1] }, o: { a: 0, k: 100 }, nm: "Fill 1" },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
          ],
          nm: "Ray group"
        }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Moon Mask",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [100, 100, 0], to: [0, 0, 0], ti: [0, 0, 0] },
            { t: 30, s: [80, 100, 0], to: [0, 0, 0], ti: [0, 0, 0] },
            { t: 60, s: [100, 100, 0], to: [0, 0, 0], ti: [0, 0, 0] }
          ]
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [120, 120] },
              p: { a: 0, k: [0, 0] },
              nm: "Moon"
            },
            { ty: "fl", c: { a: 0, k: [0.125, 0.219, 0.345, 1] }, o: { a: 0, k: 100 }, nm: "Fill 1" },
            { ty: "tr", p: { a: 0, k: [40, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
          ],
          nm: "Moon shape"
        }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }
  ]
} as const;

export type ThemeToggleAnimation = typeof themeToggleAnimation;
