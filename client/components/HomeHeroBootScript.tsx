import Script from "next/script";

const HOME_HERO_BOOT_SCRIPT = `
(function () {
  var path = window.location.pathname;
  if (/^\\/(en|ar)$/.test(path)) {
    document.documentElement.classList.add("home-hero-boot");
  }
})();
`;

export function HomeHeroBootScript() {
  return (
    <Script id="home-hero-boot" strategy="beforeInteractive">
      {HOME_HERO_BOOT_SCRIPT}
    </Script>
  );
}
