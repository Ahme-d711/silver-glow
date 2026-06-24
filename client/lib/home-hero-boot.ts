export const HOME_HERO_BOOT_SCRIPT = `
(function () {
  var path = window.location.pathname;
  if (/^\\/(en|ar)\\/?$/.test(path)) {
    document.documentElement.classList.add("home-hero-boot");
  }
})();
`;

export const HOME_HERO_BOOT_STYLES = `
html.home-hero-boot,
html.home-hero-boot body {
  background-color: #000 !important;
  overflow: hidden !important;
}

html.home-hero-boot [data-site-chrome] {
  display: none !important;
}
`;
