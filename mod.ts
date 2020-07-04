const MOTS_CHIFFRES = [
  'zéro',
  'un',
  'deux',
  'trois',
  'quatre',
  'cinq',
  'six',
  'sept',
  'huit',
  'neuf'
]
const MOTS_DIZAINES = [
  undefined,
  'dix',
  'vingt',
  'trente',
  'quarante',
  'cinquante',
  'soixante',
  'soixante-dix',
  'quatre-vingt',
  'quatre-vingt-dix'
]
const MOTS_NOMBRES_SPÉCIAUX = {
  11: 'onze',
  12: 'douze',
  13: 'treize',
  14: 'quatorze',
  15: 'quinze',
  16: 'seize'
} as any
const MOTS_MIL = [
  undefined,
  'mille',
  'million',
  'milliard',
  'billion',
  'billiard'
]

export function nombreEnLettres (number: number, options?: { reforme: boolean }): string {
  if (number === 0) return 'zéro'
  const reforme = options?.reforme ?? true
  const parties = []
  const triptiques = []
  for (let i = 0; i <= Math.log10(number) / 3; ++i) {
    triptiques.unshift(Math.floor(number / (1000 ** i)) % 1000)
  }
  for (const [i, number] of triptiques.entries()) {
    if (number === 0) continue
    const position = triptiques.length - 1 - i
    const chiffreDesUnités = number % 10
    const chiffreDesDizaines = Math.floor(number / 10) % 10
    const chiffreDesCentaines = Math.floor(number / 100) % 10
    const dernièreTriptique = triptiques.slice(i + 1).reduce((acc, v) => acc + v, 0) === 0
    // traitement des centaines
    if (chiffreDesCentaines !== 0) {
      if (chiffreDesCentaines >= 2) {
        parties.push(nombreEnLettres(chiffreDesCentaines))
        parties.push(' ')
      }
      parties.push('cent')
      if (chiffreDesDizaines !== 0 || chiffreDesUnités !== 0) {
        parties.push(' ')
      } else {
        if (chiffreDesCentaines >= 2) {
          parties.push('s')
        }
      }
    }
    // nombre spéciaux (zéro-seize)
    if (MOTS_NOMBRES_SPÉCIAUX[number % 100]) {
      parties.push(MOTS_NOMBRES_SPÉCIAUX[number % 100])
    } else {
      // traitement des dizaines
      if (chiffreDesDizaines !== 0) {
        if ([7,9].includes(chiffreDesDizaines)) {
          if (chiffreDesUnités !== 0) {
            parties.push(MOTS_DIZAINES[chiffreDesDizaines - 1])
          } else {
            parties.push(MOTS_DIZAINES[chiffreDesDizaines])
          }
        } else {
          parties.push(MOTS_DIZAINES[chiffreDesDizaines])
        }
        if (chiffreDesDizaines === 8 && chiffreDesUnités === 0 && position !== 1) {
          parties.push('s')
        }
      }
      // traitement des unités
      if (chiffreDesUnités !== 0) {
        if (chiffreDesUnités !== 1 || position !== 1) {
          if (chiffreDesUnités === 1 && ![0, 8, 9].includes(chiffreDesDizaines)) {
            parties.push(' ')
            parties.push('et')
            parties.push(' ')
          } else  if (chiffreDesDizaines !== 0) {
            parties.push('-')
          }
          if ([7,9].includes(chiffreDesDizaines)) {
            parties.push(nombreEnLettres(chiffreDesUnités + 10))
          } else {
            parties.push(MOTS_CHIFFRES[chiffreDesUnités])
          }
        }
      }
    }
    // mille / millions / etc.
    if (position >= 1) {
      const motMil = MOTS_MIL[position]
      if (number !== 1 || position !== 1) {
        parties.push(' ')
      }
      parties.push(motMil)
      if (position >= 2 && number >= 2) {
        parties.push('s')
      }
      if (!dernièreTriptique) {
        parties.push(' ')
      }
    }
  }
  const motDuNombre = parties.join('')
  if (reforme) {
    return motDuNombre.replace(/ /g, '-')
  } else {
    return motDuNombre
  }
}
