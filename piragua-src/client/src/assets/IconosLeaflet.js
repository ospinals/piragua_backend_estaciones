import L from "leaflet";

const SinLluvia = L.icon({
  iconUrl: "/iconos-lluvia/azulclaro.svg",

  iconSize: [33.6, 41.6], // size of the icon
  iconAnchor: [16.8, 41.6], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const LluviaBaja = L.icon({
  iconUrl: "/iconos-lluvia/azul.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const LluviaModerada = L.icon({
  iconUrl: "/iconos-lluvia/amarillo.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const LluviaAlta = L.icon({
  iconUrl: "/iconos-lluvia/naranja.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const LluviaExtrema = L.icon({
  iconUrl: "/iconos-lluvia/rojo.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const LluviaGris = L.icon({
  iconUrl: "/iconos-lluvia/gris.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

// ============================================

const Nivel = L.icon({
  // iconUrl: '/redes_nuevo/images/nivel2.png',
  // iconSize:     [34, 34],
  // iconAnchor:   [17, 34],
  iconUrl: "/iconos-nivel/azulclaro.svg",
  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const NivelGris = L.icon({
  iconUrl: "/iconos-nivel/gris.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const NivelAzul = L.icon({
  iconUrl: "/iconos-nivel/azul.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const NivelVerde = L.icon({
  iconUrl: "/iconos-nivel/verde.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const NivelAmarillo = L.icon({
  iconUrl: "/iconos-nivel/amarillo.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const NivelNaranja = L.icon({
  iconUrl: "/iconos-nivel/naranja.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const NivelRojo = L.icon({
  iconUrl: "/iconos-nivel/rojo.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

// ============================================

const HidroBiologico = L.icon({
  iconUrl: "/redes_nuevo/images/hidrobiologia-gris.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const HidroBiologicoAzul = L.icon({
  iconUrl: "/redes_nuevo/images/hidrobiologia-azul2.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const HidroBiologicoVerde = L.icon({
  iconUrl: "/redes_nuevo/images/hidrobiologia-verde.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const HidroBiologicoAmarillo = L.icon({
  iconUrl: "/redes_nuevo/images/hidrobiologia-amarillo.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const HidroBiologicoNaranja = L.icon({
  iconUrl: "/redes_nuevo/images/hidrobiologia-naranja.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const HidroBiologicoRojo = L.icon({
  iconUrl: "/redes_nuevo/images/hidrobiologia-rojo.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

// ============================================

const FisicoQuimico = L.icon({
  iconUrl: "/redes_nuevo/images/calidad-gris.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const FisicoQuimicoAzul = L.icon({
  iconUrl: "/redes_nuevo/images/calidad-azul2.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const FisicoQuimicoVerde = L.icon({
  iconUrl: "/redes_nuevo/images/calidad-verde.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const FisicoQuimicoAmarillo = L.icon({
  iconUrl: "/redes_nuevo/images/calidad-amarillo.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const FisicoQuimicoNaranja = L.icon({
  iconUrl: "/redes_nuevo/images/calidad-naranja.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const FisicoQuimicoRojo = L.icon({
  iconUrl: "/redes_nuevo/images/calidad-rojo.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

// ============================================

const Aire = L.icon({
  iconUrl: "/redes_nuevo/images/aire-azul1.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const AireAzul = L.icon({
  iconUrl: "/redes_nuevo/images/aire-azul2.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const AireVerde = L.icon({
  iconUrl: "/redes_nuevo/images/aire-verde.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const AireAmarillo = L.icon({
  iconUrl: "/redes_nuevo/images/aire-amarillo.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const AireNaranja = L.icon({
  iconUrl: "/redes_nuevo/images/aire-naranja.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const AireRojo = L.icon({
  iconUrl: "/redes_nuevo/images/aire-rojo.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const AireMorado = L.icon({
  iconUrl: "/redes_nuevo/images/aire-morado.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const AireVinotinto = L.icon({
  iconUrl: "/redes_nuevo/images/aire-vinotinto.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

// ============================================

const Social = L.icon({
  iconUrl: "/redes_nuevo/images/social-azul1.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const SocialAzul = L.icon({
  iconUrl: "/redes_nuevo/images/social-azul2.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const SocialVerde = L.icon({
  iconUrl: "/redes_nuevo/images/social-verde.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const SocialAmarillo = L.icon({
  iconUrl: "/redes_nuevo/images/social-amarillo.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const SocialNaranja = L.icon({
  iconUrl: "/redes_nuevo/images/social-naranja.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const SocialRojo = L.icon({
  iconUrl: "/redes_nuevo/images/social-rojo.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

// ============================================

const Lluviometro = L.icon({
  iconUrl: "/redes_nuevo/images/lluviometro-gris.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const LluviometroAzul = L.icon({
  iconUrl: "/redes_nuevo/images/lluviometro-azul2.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const LluviometroAmarillo = L.icon({
  iconUrl: "/redes_nuevo/images/luviometro-amarillo.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const LluviometroNaranja = L.icon({
  iconUrl: "/redes_nuevo/images/lluviometro-naranja.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const LluviometroRojo = L.icon({
  iconUrl: "/redes_nuevo/images/lluviometro-rojo.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

// ============================================

const Piezometro = L.icon({
  iconUrl: "/redes_nuevo/images/piezometro-azul1.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const PiezometroAzul = L.icon({
  iconUrl: "/redes_nuevo/images/piezometro-azul2.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const PiezometroGris = L.icon({
  iconUrl: "/redes_nuevo/images/piezometro-gris.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

// ============================================

const CalidadAgua = L.icon({
  iconUrl: "/redes_nuevo/images/calidad-agua-azul1.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const CalidadAguaAzul = L.icon({
  iconUrl: "/redes_nuevo/images/calidad-agua-azul2.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

const CalidadAguaGris = L.icon({
  iconUrl: "/redes_nuevo/images/calidad-agua-gris.png",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

// ============================================

const Meteorologia = L.icon({
  iconUrl: "/redes_nuevo/images/meteo.svg",

  iconSize: [33.6, 41.6],
  iconAnchor: [16.8, 41.6],
  popupAnchor: [-3, -76],
});

// ============================================

export const Iconos = {
  1: SinLluvia,
  2: LluviaBaja,
  3: LluviaModerada,
  4: LluviaAlta,
  5: LluviaExtrema,
  6: LluviaGris,
  7: Nivel,
  8: NivelGris,
  9: NivelAzul,
  10: NivelVerde,
  11: NivelAmarillo,
  12: NivelNaranja,
  13: NivelRojo,
  14: HidroBiologico,
  15: HidroBiologicoAzul,
  16: HidroBiologicoVerde,
  17: HidroBiologicoAmarillo,
  18: HidroBiologicoNaranja,
  19: HidroBiologicoRojo,
  20: FisicoQuimico,
  21: FisicoQuimicoAzul,
  22: FisicoQuimicoVerde,
  23: FisicoQuimicoAmarillo,
  24: FisicoQuimicoNaranja,
  25: FisicoQuimicoRojo,
  26: Aire,
  27: AireAzul,
  28: AireVerde,
  29: AireAmarillo,
  30: AireNaranja,
  31: AireRojo,
  32: AireMorado,
  33: AireVinotinto,
  34: Social,
  35: SocialAzul,
  36: SocialVerde,
  37: SocialAmarillo,
  38: SocialNaranja,
  39: SocialRojo,
  40: Lluviometro,
  41: LluviometroAzul,
  42: LluviometroAmarillo,
  43: LluviometroNaranja,
  44: LluviometroRojo,
  45: Piezometro,
  46: PiezometroAzul,
  47: PiezometroGris,
  48: CalidadAgua,
  49: CalidadAguaAzul,
  50: CalidadAguaGris,
  51: Meteorologia,
  52: Meteorologia,
  53: Meteorologia,
  54: Meteorologia,
  55: Meteorologia,
  56: Meteorologia,
  57: Meteorologia,
  58: Meteorologia,
  59: Meteorologia,
  60: Meteorologia,
  61: Meteorologia,
  62: Meteorologia,
  63: Meteorologia,
  64: Meteorologia,
};
