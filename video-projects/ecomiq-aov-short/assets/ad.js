/* ---------------------------------------------------------------------------
   EcomIQ — "Turn small orders into bigger ones" short-form ad.
   One timeline builder, shared by the 9:16 and 4:5 roots.

   The VO is the spine. Every number below is measured off Sean's audio
   (whisper word timings, cross-checked against an ffmpeg silence map), so the
   graphics land on the words rather than near them. See DESIGN.md.
   --------------------------------------------------------------------------- */
(function () {
  'use strict';

  var MONTAGE_END = 19.50; // end-card cut — onset of "Turn small orders..."
  var TOTAL       = 24.60; // VO runs 24.085s; the card breathes to 24.60

  // Steep-tail easings alias at sub-frame boundaries, so snap to 30fps grid.
  var FRAME = 1 / 30;
  function q(t) { return Math.round(t / FRAME) * FRAME; }

  // A motion-blurred streak across a cut reads as energy and hides the seam.
  // Law #5: hard cuts feel cheap, whips feel expensive.
  function whip(tl, at, power) {
    tl.fromTo('#whip',
        { xPercent: -110, opacity: 0 },
        { xPercent: 110, opacity: power, duration: q(0.16), ease: 'power2.in' }, q(at - 0.16))
      .to('#whip',
        { xPercent: 330, opacity: 0, duration: q(0.17), ease: 'power2.out' }, q(at));
  }

  // Callout in/out. fromTo everywhere — `from` on a hidden element leaves it
  // hidden (docs/LESSONS.md).
  function callout(tl, sel, inAt, outAt, fromY) {
    tl.fromTo(sel,
        { opacity: 0, y: fromY, scale: 0.90 },
        { opacity: 1, y: 0, scale: 1, duration: q(0.36), ease: 'back.out(1.6)' }, q(inAt))
      .to(sel,
        { opacity: 0, y: -18, scale: 0.97, duration: q(0.26), ease: 'power2.in' }, q(outAt));
  }

  window.__buildEcomiqAd = function buildEcomiqAd() {
    var tl = gsap.timeline({ paused: true });

    /* --- texture: never ship a flat-lit frame (Law #10) ------------------- */
    tl.fromTo('#grade',    { opacity: 0 }, { opacity: 0.30, duration: q(0.5), ease: 'sine.out' }, 0)
      .fromTo('#vignette', { opacity: 0 }, { opacity: 1,    duration: q(0.5), ease: 'sine.out' }, 0)
      // vignette breathes so the "still" layers are never actually still
      .to('#vignette', { opacity: 0.86, duration: q(6), ease: 'sine.inOut', yoyo: true, repeat: 2 }, q(0.5));

    /* --- persistent top-left logo, out before the card ------------------- */
    tl.fromTo('#logo-pos',
        { opacity: 0, y: -22 },
        { opacity: 1, y: 0, duration: q(0.52), ease: 'power3.out' }, q(0.40))
      .to('#logo-pos',
        { opacity: 0, y: -16, duration: q(0.30), ease: 'power2.in' }, q(19.14));

    /* --- callouts, each pinned to its line -------------------------------- */
    // "...but they're all small."            VO 3.77 – 4.11
    callout(tl, '#mg-small',      3.78,  4.40, 26);
    // "A few changes to how you sell..."     VO 5.83 – 6.50
    callout(tl, '#mg-sell',       5.50,  6.12, 26);
    // "We guarantee it."                     VO 9.51 – 10.37
    callout(tl, '#mg-guarantee',  9.58, 10.32, 26);
    // "Give us 90 days."                     VO 11.08 – 12.02
    callout(tl, '#mg-days',      11.16, 11.90, 30);
    // "...an EcomIQ strategist..."           VO 13.00 – 14.10
    callout(tl, '#mg-strategist',13.28, 14.06, 26);
    // "...get your order value climbing."    VO 17.68 – 18.53
    callout(tl, '#mg-climb',     17.70, 19.10, 26);

    // the bars climb on the word, staggered so the eye reads a rise
    tl.fromTo('#mg-climb .bars i',
        { scaleY: 0 },
        { scaleY: 1, duration: q(0.34), ease: 'power3.out', stagger: q(0.11) }, q(17.86));

    /* --- beat seams: every cut carries motion ----------------------------- */
    whip(tl,  4.50, 0.60);  // hook -> promise
    whip(tl,  9.47, 0.70);  // promise -> "We guarantee it."
    whip(tl, 10.47, 0.55);  // guarantee -> offer
    whip(tl, 11.13, 0.60);  // offer -> "Give us 90 days."
    whip(tl, 17.60, 0.65);  // mechanism -> the stat wall

    /* --- END CARD: cut on the word "Turn" --------------------------------- */
    whip(tl, MONTAGE_END, 0.85);
    tl.fromTo('#flash',
        { opacity: 0 },
        { opacity: 0.42, duration: q(0.07), ease: 'power2.out' }, q(MONTAGE_END - 0.07))
      .to('#flash', { opacity: 0, duration: q(0.24), ease: 'power2.in' }, q(MONTAGE_END));

    // push-in on the card so the hold still has camera movement (Law #4)
    tl.fromTo('#card-inner',
        { scale: 1.045 },
        { scale: 1, duration: q(1.10), ease: 'power3.out' }, q(MONTAGE_END))
      .fromTo('#card-bloom',
        { opacity: 0, yPercent: 12 },
        { opacity: 0.40, yPercent: 0, duration: q(1.30), ease: 'sine.out' }, q(MONTAGE_END))
      .to('#card-bloom',
        { yPercent: -6, duration: q(3.6), ease: 'sine.inOut' }, q(20.9));

    // logo returns centred — the callback the top-left mark set up
    tl.fromTo('#card-logo',
        { opacity: 0, scale: 0.86, y: 26 },
        { opacity: 1, scale: 1, y: 0, duration: q(0.58), ease: 'back.out(1.5)' }, q(19.56));

    tl.fromTo('#card-rule',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: q(0.44), ease: 'power3.out' }, q(19.84));

    // headline tracks the line he is speaking
    tl.fromTo('#card-h1',
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: q(0.54), ease: 'power3.out' }, q(19.90));

    // "bigger" gets the lift, on the word           VO 20.15 – 20.91
    tl.fromTo('#card-h1 .em',
        { scale: 1 },
        { scale: 1.12, duration: q(0.34), ease: 'back.out(2.2)' }, q(20.18))
      .to('#card-h1 .em', { scale: 1, duration: q(0.40), ease: 'power2.out' }, q(20.56));

    // CTA lands exactly on "Tap the link"            VO 21.55
    tl.fromTo('#card-cta',
        { opacity: 0, scale: 0.82, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: q(0.46), ease: 'back.out(1.9)' }, q(21.55))
      .to('#card-cta',
        { scale: 1.035, duration: q(0.80), ease: 'sine.inOut', yoyo: true, repeat: 3 }, q(22.30));

    // Law #11 / render-contract rule 7: the timeline must fill its slot or the
    // engine blanks the tail. Non-negotiable.
    tl.to({}, { duration: TOTAL }, 0);
    return tl;
  };

  window.__ECOMIQ_AD = { MONTAGE_END: MONTAGE_END, TOTAL: TOTAL };
})();
