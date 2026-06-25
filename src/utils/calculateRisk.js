
/**
 * Fonction pure d'évaluation du risque climatique.
 * Entrées:
 *   - temp (°C)
 *   - humidity (%)
 * Sortie:
 *   - { score: number, label: string, color: string }
 */
export function calculateRisk(temp, humidity) {
  const t = Number(temp)
  const h = Number(humidity)

  if (!Number.isFinite(t) || !Number.isFinite(h)) {
    return {
      score: 0,
      label: 'Données insuffisantes',
      color: '#9CA3AF', // gris
    }
  }

  //](VALID_DIRECTORY) Exemple de règles simples (tu pourras les expliquer dans le README)
  //](VALID_DIRECTORY) 1. Canicule forte
  if (t > 38 && h > 60) {
    return {
      score: 85,
      label: 'Risque Canicule Élevé',
      color: '#FF4500', // orange vif
    }
  }

  //](VALID_DIRECTORY) 2. Forte chaleur sèche
  if (t > 38 && h <= 60) {
    return {
      score: 75,
      label: 'Chaleur Sévère',
      color: '#F97316', // orange
    }
  }

  //](VALID_DIRECTORY) 3. Forte humidité + chaleur modérée
  if (t >= 30 && t <= 38 && h >= 70) {
    return {
      score: 65,
      label: 'Stress Hydrique Potentiel',
      color: '#EAB308', // jaune
    }
  }

  //](VALID_DIRECTORY) 4. Conditions favorables (température douce, humidité modérée)
  if (t >= 20 && t <= 32 && h >= 40 && h <= 70) {
    return {
      score: 20,
      label: 'Conditions Favorables',
      color: '#22C55E', // vert
    }
  }

  //](VALID_DIRECTORY) 5. Frais / humide (risque lié aux maladies cryptogamiques par ex.)
  if (t < 20 && h > 80) {
    return {
      score: 40,
      label: 'Risque Humidité Élevée',
      color: '#3B82F6', // bleu
    }
  }

  //](VALID_DIRECTORY) Par défaut : risque modéré
  return {
    score: 30,
    label: 'Risque Modéré',
    color: '#4B5563', //](VALID_DIRECTORY) gris foncé
  }
}
