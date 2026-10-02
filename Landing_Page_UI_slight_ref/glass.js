// Progressive optical enhancement, using the library requested in the brief.
// CSS glass remains fully functional on file://, mobile, and without WebGL.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (location.protocol !== 'file:' && innerWidth >= 1100 && !reduce && 'IntersectionObserver' in window) {
  const hero = document.querySelector('.hero');
  const notice = document.querySelector('#hero-notice');
  let instance;
  let initializing = false;
  let visible = false;
  async function initialize() {
    if (instance || initializing || !visible || document.hidden) return;
    initializing = true;
    try {
      const probe = document.createElement('canvas');
      const context = probe.getContext('webgl2');
      if (!context) return;
      context.getExtension('WEBGL_lose_context')?.loseContext();
      await document.fonts.ready;
      const { LiquidGlass } = await import('./assets/vendor/liquidglass.js');
      instance = await LiquidGlass.init({ root: hero, glassElements: [notice], defaults: { blurAmount: 0.15, refraction: 0.12, chromAberration: 0, tintStrength: 0, saturation: -0.05, cornerRadius: 21, zRadius: 10, floating: false, button: true, shadowOpacity: 0.08 } });
      if (!visible || document.hidden) { instance.destroy(); instance = undefined; }
    } catch {
      // The accessible CSS material is the intended fallback.
    } finally { initializing = false; }
  }
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (!visible && instance) { instance.destroy(); instance = undefined; }
    else if (visible) initialize();
  }, { threshold: 0.1 }).observe(hero);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && instance) { instance.destroy(); instance = undefined; }
    else initialize();
  });
}
