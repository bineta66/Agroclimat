
/**
 * Génération automatique des régions à partir du fichier sn.svg
 * On importe le SVG brut comme texte et on extrait les balises <path>.
 *
 * Limitations :
 * - On ne récupère que id, name et d.
 * - Le "code" métier (dakar, thies, etc.) est dérivé du name, tu peux l’ajuster si besoin.
 */

import svgRaw from '../assets/svg/sn.svg?raw'

function parseRegionsFromSvg(rawSvg) {
  const regions = []

  // On cherche toutes les balises <path ...> ... </path>
  const pathRegex = /<path\s+([^>]+)>/g
  let match

  while ((match = pathRegex.exec(rawSvg)) !== null) {
    const attrs = match[1]

    const idMatch = attrs.match(/id="([^"]+)"/)
    const nameMatch = attrs.match(/name="([^"]+)"/)
    const dMatch = attrs.match(/d="([^"]+)"/)

    if (!idMatch || !dMatch) {
      continue
    }

    const id = idMatch[1]
    const name = nameMatch ? nameMatch[1] : id
    const d = dMatch[1]

    // On dérive un "code" métier simple à partir du nom (minuscules, sans accents approximatif)
    const code = normalizeNameToCode(name)

    regions.push({ id, name, d, code })
  }

  return regions
}

function normalizeNameToCode(name) {
  // Simplification pour ton cas ; adapte si nécessaire
  return name
    .toLowerCase()
    .normalize('NFD') // enlever les accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-') // espaces -> tirets
}

export const senegalRegionsFromSvg = parseRegionsFromSvg(svgRaw)

