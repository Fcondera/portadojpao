"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

const WHATSAPP =
  "https://wa.me/5592993661404?text=Olá!%20Quero%20agendar%20uma%20visita%20ao%20Portal%20do%20Japão.";
const MAP_QUERY = "Portal do Japão Manacapuru AM";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portal-do-japao.netlify.app";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Portal do Japão",
      url: SITE_URL,
      inLanguage: "pt-BR",
      description:
        "Café regional na Amazônia, experiências na natureza, pôr do sol e eventos em Manacapuru, Amazonas.",
    },
    {
      "@type": ["CafeOrCoffeeShop", "TouristAttraction", "LocalBusiness"],
      "@id": `${SITE_URL}/#portal-do-japao`,
      name: "Portal do Japão",
      alternateName: "Portal do Japonês",
      url: SITE_URL,
      image: [
        `${SITE_URL}/images/img-portal.jpeg`,
        `${SITE_URL}/images/img-mesa.jpeg`,
        `${SITE_URL}/images/xicara-rosa.jpeg`,
      ],
      telephone: "+5592993661404",
      priceRange: "$$",
      servesCuisine: ["Café regional", "Culinária amazônica", "Café da manhã regional"],
      description:
        "Portal do Japão é um destino em Manacapuru para café regional na Amazônia, contato com a natureza, pôr do sol, fotos e eventos.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Estrada de Novo Airão, km 07, Ramal do Japonês",
        addressLocality: "Manacapuru",
        addressRegion: "AM",
        addressCountry: "BR",
      },
      areaServed: [
        "Manacapuru",
        "Manaus",
        "Novo Airão",
        "Amazonas",
        "Amazônia",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday", "Sunday"],
          opens: "07:00",
          closes: "11:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday", "Sunday"],
          opens: "15:00",
          closes: "18:00",
        },
      ],
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`,
      sameAs: ["https://instagram.com/portaldojapao2026"],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Onde tomar café regional na Amazônia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "O Portal do Japão, em Manacapuru, Amazonas, oferece café regional em meio à natureza, com vista para o rio e experiência de pôr do sol.",
          },
        },
        {
          "@type": "Question",
          name: "Quais são os horários do Portal do Japão?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "O atendimento acontece das 7h00 às 11h00 e das 15h00 às 18h00, com reservas para sexta, sábado e domingo.",
          },
        },
        {
          "@type": "Question",
          name: "O Portal do Japão aluga espaço para eventos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. O Portal do Japão também aluga seu espaço para eventos em Manacapuru, Amazonas.",
          },
        },
      ],
    },
  ],
};

const gallery = [
  { src: "/images/img-portal.jpeg", alt: "Portal vermelho com vista para o rio" },
  { src: "/images/img-mesa.jpeg", alt: "Mesa posta no Portal do Japão" },
  { src: "/images/img-xicara.jpeg", alt: "Xícara de café regional" },
  { src: "/images/img-bolo.jpeg", alt: "Bolo servido no café regional" },
  { src: "/images/img-cadeira.jpeg", alt: "Cadeiras com vista para a natureza" },
  { src: "/images/img-gira.jpeg", alt: "Girassóis no Portal do Japão" },
  { src: "/images/img-girasol.jpeg", alt: "Detalhe de girassol ao ar livre" },
  { src: "/images/img-noiteportal.jpeg", alt: "Portal do Japão iluminado à noite" },
  { src: "/images/bolo-milho.jpeg", alt: "Bolo de milho servido no café regional" },
  { src: "/images/bolo.jpeg", alt: "Bolo artesanal servido no Portal do Japão" },
  { src: "/images/por-do-sol.jpeg", alt: "Pôr do sol visto do Portal do Japão" },
  { src: "/images/por-do-sol1.jpeg", alt: "Paisagem do pôr do sol na Amazônia" },
  { src: "/images/xicara-rosa.jpeg", alt: "Xícara rosa com café regional" },
];

function Torii({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 260" aria-hidden="true">
      <path d="M18 40 L282 18 L265 38 L35 58 Z" fill="currentColor" />
      <path d="M44 76 L256 59 L250 75 L50 91 Z" fill="currentColor" />
      <rect x="75" y="90" width="20" height="148" rx="3" fill="currentColor" />
      <rect x="205" y="80" width="20" height="158" rx="3" fill="currentColor" />
      <path d="M58 129 L244 113 L244 134 L58 150 Z" fill="currentColor" />
      <rect x="96" y="74" width="112" height="13" rx="2" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L4 20.3l1.1-4a8.4 8.4 0 1 1 15.4-4.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 8.2c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.3 0 .5-.1.7l-.6.7c-.2.2-.1.4 0 .6.5.9 1.2 1.7 2.1 2.2.3.2.5.2.7 0l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.5.3.5.5 0 .3-.2 1.4-.8 1.9-.5.5-1.3.8-2.1.7-1.1-.1-2.5-.5-4.4-2.2-2.3-2-3.7-4.6-3.8-5.1-.1-.5 0-.9.1-1.2Z" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const reservationPopupShown = useRef(false);
  const [showReservationPopup, setShowReservationPopup] = useState(false);

  useEffect(() => {
    const popupTimer = window.setTimeout(() => {
      if (reservationPopupShown.current) return;
      reservationPopupShown.current = true;
      setShowReservationPopup(true);
    }, 5000);

    const removeNetlifyBadge = () => {
      document
        .querySelectorAll<HTMLElement>('a[href*="netlify"], iframe[src*="netlify"], [class*="netlify"], [id*="netlify"], [aria-label*="Netlify"], [title*="Netlify"]')
        .forEach((el) => el.remove());

      document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
        if (el.children.length > 4) return;
        const text = el.textContent?.trim().toLowerCase();
        if (text?.includes("powered by netlify")) {
          el.closest("a, button, div, aside")?.remove();
        }
      });
    };

    removeNetlifyBadge();
    const badgeObserver = new MutationObserver(removeNetlifyBadge);
    badgeObserver.observe(document.body, { childList: true, subtree: true });

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.08, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        yPercent: 115,
        opacity: 0,
        filter: "blur(16px)",
        duration: 1.15,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from(".hero-small", { y: 22, opacity: 0, duration: 0.8, delay: 0.65 });

      gsap.to(".hero-photo img", {
        scale: 1.12,
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 },
      });
      gsap.to(".hero-content", {
        yPercent: -18,
        scale: 0.96,
        opacity: 0.82,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 },
      });

      gsap.utils.toArray<HTMLElement>("[data-kinetic]").forEach((el) => {
        gsap.fromTo(
          el,
          {
            "--text-progress": 0,
            y: 82,
            opacity: 0.18,
            filter: "blur(18px)",
            scale: 0.96,
          },
          {
            "--text-progress": 1,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "bottom 48%",
              scrub: 1.05,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.matches("[data-kinetic]")) return;
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 87%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".experience-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 92,
            rotate: index % 2 === 0 ? -2.8 : 2.8,
            clipPath: "inset(13% 0% 13% 0% round 14px)",
            opacity: 0.36,
          },
          {
            y: 0,
            rotate: 0,
            clipPath: "inset(0% 0% 0% 0% round 14px)",
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 96%",
              end: "top 43%",
              scrub: 1.1,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const img = el.querySelector("img");
        if (!img) return;
        gsap.fromTo(img, { scale: 1.08 }, {
          scale: 1,
          yPercent: -4,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });
    }, root);

    return () => {
      window.clearTimeout(popupTimer);
      badgeObserver.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <main ref={root}>
      <header className="site-nav">
        <a className="logo" href="#inicio" aria-label="Portal do Japão, início">
          <Torii className="logo-torii" />
          <span>Portal do Japão</span>
        </a>
      </header>
      <a className="floating-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer">
        <WhatsAppIcon /> Agende sua visita
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {showReservationPopup && (
        <aside className="reservation-popup" role="dialog" aria-modal="false" aria-labelledby="reservation-popup-title">
          <button className="reservation-popup-close" type="button" onClick={() => setShowReservationPopup(false)} aria-label="Fechar anúncio">
            ×
          </button>
          <p className="reservation-popup-kicker">Reservas sex, sáb e dom</p>
          <h2 id="reservation-popup-title">Você está precisando tomar um café no Portal do Japonês</h2>
          <a className="reservation-popup-button" href={WHATSAPP} target="_blank" rel="noreferrer">
            Fazer reserva
          </a>
        </aside>
      )}

      <section id="inicio" className="hero">
        <div className="hero-photo">
          <Image src="/images/img-portal.jpeg" alt="Vista do Portal do Japão" fill priority sizes="100vw" />
        </div>
        <div className="hero-vignette" />
        <div className="hero-content">
          <h1>
            <span className="hero-word">Portal</span>
            <span className="hero-word">do <em>Japão</em></span>
          </h1>
        </div>
        <a className="hero-reserve-button" href={WHATSAPP} target="_blank" rel="noreferrer">
          Fazer reserva
        </a>
        <p className="hero-small hero-tagline">Natureza, sabores e momentos<br />únicos no coração da Amazônia.</p>
        <div className="hero-address hero-small">
          <span className="pin-dot">⌖</span>
          <span>Estrada de Novo Airão, km 07<br />Ramal do Japonês, Manacapuru – AM</span>
        </div>
      </section>

      <section className="sunset-statement" aria-label="Pôr do sol no Portal do Japão">
        <Image src="/images/img-xicara.jpeg" alt="" fill sizes="100vw" />
        <div className="sunset-wash" />
        <h2 className="sunset-title" data-kinetic>
          <span>Pôr do sol</span>
          <span>no Portal</span>
          <span>do Japão</span>
        </h2>
      </section>

      <section className="video-section" aria-label="Vídeo do Portal do Japão">
        <div className="video-copy">
          <h2 data-kinetic>Venha viver<br />o melhor da natureza</h2>
        </div>
        <div className="video-frame" data-reveal>
          <video controls preload="metadata" poster="/images/img-portal.jpeg">
            <source src="/images/video/video-portal-japones.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section id="sobre" className="about split-section">
        <div className="split-media" data-parallax>
          <Image src="/images/img-mesa.jpeg" alt="Mesa de café regional no Portal do Japão" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="split-copy paper-texture">
          <h2 className="kinetic-title" data-kinetic>Um lugar especial<br />em meio à natureza</h2>
          <div className="copy-body">
            <p data-reveal>O Portal do Japão é um refúgio à beira do rio, onde a beleza da paisagem se encontra com a tradição, a boa gastronomia e momentos inesquecíveis.</p>
            <p data-reveal>Aqui, cada detalhe foi pensado para proporcionar uma experiência única, seja para um café especial, para contemplar o pôr do sol ou simplesmente desfrutar da tranquilidade da Amazônia.</p>
          </div>
        </div>
      </section>

      <section id="experiencias" className="experiences">
        <div className="experiences-intro">
          <h2 className="kinetic-title" data-kinetic>Muito mais<br />que um café</h2>
          <div className="copy-body">
            <p data-reveal>Viva momentos especiais em um cenário incrível, com sabores regionais e uma vista de tirar o fôlego.</p>
          </div>
        </div>
        <div className="experience-cards">
          {[
            ["/images/img-mesa.jpeg", "Café Regional", "Sabores únicos"],
            ["/images/img-portal.jpeg", "Pôr do Sol", "Um espetáculo à parte"],
            ["/images/img-cadeira.jpeg", "Relaxamento", "Natureza e tranquilidade"],
            ["/images/img-bolo.jpeg", "Encontros", "Para toda a família"],
          ].map(([src, title, text], i) => (
            <article className="experience-card" key={title} data-reveal>
              <Image src={src} alt={title} fill sizes="(max-width: 900px) 50vw, 25vw" />
              <div className="card-shade" />
              <div className="card-copy"><span>{text}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section id="galeria" className="gallery-section">
        <div className="gallery-copy">
          <h2 className="kinetic-title" data-kinetic>Vistas que<br />ficam na memória</h2>
          <div className="copy-body">
            <p data-reveal>A natureza aqui proporciona momentos únicos, com paisagens que encantam em qualquer hora do dia.</p>
          </div>
        </div>
        <div className="gallery-grid" aria-label="Galeria de fotos">
          {gallery.map((item, index) => (
            <figure className={`gallery-item gallery-item-${index + 1}`} key={item.src} data-reveal>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 28vw" />
            </figure>
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="info-copy">
          <h2 className="kinetic-title" data-kinetic>Horários<br />e eventos</h2>
          <p data-reveal>Planeje sua visita ao Portal do Japão com tranquilidade.</p>
        </div>
        <div className="info-cards">
          <article className="info-card" data-reveal>
            <span>Funcionamento</span>
            <strong>7h00 às 11h00</strong>
            <strong>15h00 às 18h00</strong>
          </article>
          <article className="info-card" data-reveal>
            <span>Reservas</span>
            <strong>Sexta, sábado e domingo</strong>
          </article>
          <article className="info-card" data-reveal>
            <span>Eventos</span>
            <strong>Alugamos nosso espaço para eventos</strong>
          </article>
        </div>
      </section>

      <section id="localizacao" className="location split-section">
        <div className="location-copy paper-texture">
          <h2 className="kinetic-title" data-kinetic>Como chegar</h2>
          <div className="copy-body">
            <p className="address-large" data-reveal>Estrada de Novo Airão, km 07<br />Ramal do Japonês, Manacapuru – AM</p>
            <p className="reservation-days" data-reveal>Reservas: sexta, sábado e domingo</p>
            <div className="location-actions" data-reveal>
              <a className="outline-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`} target="_blank" rel="noreferrer">Ver no mapa</a>
              <a className="outline-button" href={`https://waze.com/ul?q=${encodeURIComponent(MAP_QUERY)}&navigate=yes`} target="_blank" rel="noreferrer">Abrir no Waze</a>
            </div>
          </div>
        </div>
        <div className="map-visual">
          <iframe
            title="Mapa do Portal do Japão"
            src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <footer>
        <a className="footer-logo" href="#inicio"><Torii /><span>Portal do Japão</span></a>
        <div className="footer-info">
          <p>Natureza, café regional e pôr do sol em Manacapuru, Amazonas.</p>
          <p>Estrada de Novo Airão, km 07<br />Ramal do Japonês, Manacapuru – AM</p>
          <p>WhatsApp: (92) 99366-1404</p>
        </div>
        <div className="footer-links">
          <a href="https://instagram.com/portaldojapao2026" target="_blank" rel="noreferrer">Instagram</a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`} target="_blank" rel="noreferrer">Mapa</a>
        </div>
      </footer>
    </main>
  );
}
