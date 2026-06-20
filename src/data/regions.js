
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
    lat: 14.6937,
    lon: -17.4441,
  },
  {
    id: 'SNTH',
    name: 'Thiès',
    code: 'thies',
    lat: 14.7833,
    lon: -16.9167,
  },
  {
    id: 'SNDB',
    name: 'Diourbel',
    code: 'diourbel',
    lat: 14.65,
    lon: -16.4,
  },
  {
    id: 'SNFK',
    name: 'Fatick',
    code: 'fatick',
    lat: 14.3417,
    lon: -16.41,
  },
  {
    id: 'SNKL',
    name: 'Kaolack',
    code: 'kaolack',
    lat: 14.15,
    lon: -16.1,
  },
  {
    id: 'SNKA',
    name: 'Kaffrine',
    code: 'kaffrine',
    lat: 14.45,
    lon: -15.55,
  },
  {
    id: 'SNLG',
    name: 'Louga',
    code: 'louga',
    lat: 15.6167,
    lon: -16.2167,
  },
  {
    id: 'SNSL',
    name: 'Saint-Louis',
    code: 'saint-louis',
    lat: 16.0333,
    lon: -16.5,
  },
  {
    id: 'SNMT',
    name: 'Matam',
    code: 'matam',
    lat: 15.1667,
    lon: -13.2667,
  },
  {
    id: 'SNKD',
    name: 'Kolda',
    code: 'kolda',
    lat: 12.8833,
    lon: -14.9333,
  },
  {
    id: 'SNZG',
    name: 'Ziguinchor',
    code: 'ziguinchor',
    lat: 12.5833,
    lon: -16.2667,
  },
  {
    id: 'SNTC',
    name: 'Tambacounda',
    code: 'tambacounda',
    lat: 13.7667,
    lon: -13.6833,
  },
  {
    id: 'SNSE',
    name: 'Sédhiou',
    code: 'sedhiou',
    lat: 12.7083,
    lon: -15.55,
  },
  {
    id: 'SNKE',
    name: 'Kédougou',
    code: 'kedougou',
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
