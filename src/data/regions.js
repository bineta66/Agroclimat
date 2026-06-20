
/**
 * Données de référence pour les 14 régions du Sénégal.
 *
 * Source géographique : limites basées sur le SVG Simplemaps.com
 * (voir src/assets/svg/sn.svg, sous licence libre pour usage commercial).
 *
 * Les centroïdes (cx, cy) sont extraits automatiquement du groupe
 * <g id="label_points"> du SVG source, via src/data/regionsFromSvg.js.
 *
 * Coordonnées géographiques approximatives (lat, lon) pour référence :
 * - Dakar     : 14.6937°N, 17.4441°W
 * - Thiès     : 14.7833°N, 16.9167°W
 * - Diourbel  : 14.6500°N, 16.4000°W
 * - Fatick    : 14.3417°N, 16.4100°W
 * - Kaolack   : 14.1500°N, 16.1000°W
 * - Kaffrine  : 14.4500°N, 15.5500°W
 * - Louga     : 15.6167°N, 16.2167°W
 * - Saint-Louis : 16.0333°N, 16.5000°W
 * - Matam     : 15.1667°N, 13.2667°W
 * - Kolda     : 12.8833°N, 14.9333°W
 * - Ziguinchor : 12.5833°N, 16.2667°W
 * - Tambacounda : 13.7667°N, 13.6833°W
 * - Sédhiou   : 12.7083°N, 15.5500°W
 * - Kédougou  : 12.5500°N, 12.1833°W
 *
 * Note : ces coordonnées sont des approximations destinées à un usage
 * illustratif dans l'application. Pour des analyses scientifiques ou
 * professionnelles, utiliser un jeu de données officiel (ANSD, GADM,
 * Natural Earth, ou GeoJSON du Sénégal).
 */

/**
 * Liste des 14 régions du Sénégal avec méta-données statiques.
 */
export const REGIONS = [
  {
    id: 'SNDK',
    name: 'Dakar',
    code: 'dakar',
    population: '1 146 000',
    superficie: '47 km²',
    lat: 14.6937,
    lon: -17.4441,
  },
  {
    id: 'SNTH',
    name: 'Thiès',
    code: 'thies',
    population: '1 788',
    superficie: '6 670 km²',
    lat: 14.7833,
    lon: -16.9167,
  },
  {
    id: 'SNDB',
    name: 'Diourbel',
    code: 'diourbel',
    population: '1 497',
    superficie: '4 824 km²',
    lat: 14.65,
    lon: -16.4,
  },
  {
    id: 'SNFK',
    name: 'Fatick',
    code: 'fatick',
    population: '725',
    superficie: '7 229 km²',
    lat: 14.3417,
    lon: -16.41,
  },
  {
    id: 'SNKL',
    name: 'Kaolack',
    code: 'kaolack',
    population: '665',
    superficie: '16 010 km²',
    lat: 14.15,
    lon: -16.1,
  },
  {
    id: 'SNKA',
    name: 'Kaffrine',
    code: 'kaffrine',
    population: '280',
    superficie: '11 262 km²',
    lat: 14.45,
    lon: -15.55,
  },
  {
    id: 'SNLG',
    name: 'Louga',
    code: 'louga',
    population: '877',
    superficie: '24 889 km²',
    lat: 15.6167,
    lon: -16.2167,
  },
  {
    id: 'SNSL',
    name: 'Saint-Louis',
    code: 'saint-louis',
    population: '387',
    superficie: '19 241 km²',
    lat: 16.0333,
    lon: -16.5,
  },
  {
    id: 'SNMT',
    name: 'Matam',
    code: 'matam',
    population: '705',
    superficie: '29 305 km²',
    lat: 15.1667,
    lon: -13.2667,
  },
  {
    id: 'SNKD',
    name: 'Kolda',
    code: 'kolda',
    population: '662',
    superficie: '21 166 km²',
    lat: 12.8833,
    lon: -14.9333,
  },
  {
    id: 'SNZG',
    name: 'Ziguinchor',
    code: 'ziguinchor',
    population: '523',
    superficie: '7 352 km²',
    lat: 12.5833,
    lon: -16.2667,
  },
  {
    id: 'SNTC',
    name: 'Tambacounda',
    code: 'tambacounda',
    population: '976',
    superficie: '42 364 km²',
    lat: 13.7667,
    lon: -13.6833,
  },
  {
    id: 'SNSE',
    name: 'Sédhiou',
    code: 'sedhiou',
    population: '489',
    superficie: '7 149 km²',
    lat: 12.7083,
    lon: -15.55,
  },
  {
    id: 'SNKE',
    name: 'Kédougou',
    code: 'kedougou',
    population: '184',
    superficie: '16 800 km²',
    lat: 12.55,
    lon: -12.1833,
  },
]

/**
 * Mapping rapide id → objet région pour lookup O(1).
 */
export const REGION_MAP = Object.fromEntries(
  REGIONS.map((r) => [r.id, r])
)

/**
 * Retourne une région par son identifiant SVG.
 * @param {string} id - Identifiant SVG (ex: 'SNDK').
 * @returns {object | undefined}
 */
export function getRegionById(id) {
  return REGION_MAP[id]
}
