import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'
import { nombreEnLettres } from './mod.ts'

const dataset = [
  [ 0, 'zéro' ],
  [ 1, 'un' ],
  [ 2, 'deux' ],
  [ 3, 'trois' ],
  [ 4, 'quatre' ],
  [ 5, 'cinq' ],
  [ 6, 'six' ],
  [ 7, 'sept' ],
  [ 8, 'huit' ],
  [ 9, 'neuf' ],
  [ 10, 'dix' ],
  [ 11, 'onze' ],
  [ 12, 'douze' ],
  [ 13, 'treize' ],
  [ 14, 'quatorze' ],
  [ 15, 'quinze' ],
  [ 16, 'seize' ],
  [ 17, 'dix-sept' ],
  [ 18, 'dix-huit' ],
  [ 19, 'dix-neuf' ],
  [ 20, 'vingt' ],
  [ 21, 'vingt et un' ],
  [ 22, 'vingt-deux' ],
  [ 23, 'vingt-trois' ],
  [ 24, 'vingt-quatre' ],
  [ 25, 'vingt-cinq' ],
  [ 26, 'vingt-six' ],
  [ 27, 'vingt-sept' ],
  [ 28, 'vingt-huit' ],
  [ 29, 'vingt-neuf' ],
  [ 30, 'trente' ],
  [ 31, 'trente et un' ],
  [ 41, 'quarante et un' ],
  [ 42, 'quarante-deux' ],
  [ 51, 'cinquante et un' ],
  [ 52, 'cinquante-deux' ],
  [ 61, 'soixante et un' ],
  [ 62, 'soixante-deux' ],
  [ 71, 'soixante et onze' ],
  [ 72, 'soixante-douze' ],
  [ 80, 'quatre-vingts' ],
  [ 81, 'quatre-vingt-un' ],
  [ 82, 'quatre-vingt-deux' ],
  [ 91, 'quatre-vingt-onze' ],
  [ 92, 'quatre-vingt-douze' ],
  [ 93, 'quatre-vingt-treize' ],
  [ 94, 'quatre-vingt-quatorze' ],
  [ 95, 'quatre-vingt-quinze' ],
  [ 96, 'quatre-vingt-seize' ],
  [ 97, 'quatre-vingt-dix-sept' ],
  [ 98, 'quatre-vingt-dix-huit' ],
  [ 99, 'quatre-vingt-dix-neuf' ],
  [ 100, 'cent' ],
  [ 200, 'deux cents' ],
  [ 250, 'deux cent cinquante' ],
  [ 255, 'deux cent cinquante-cinq' ],
  [ 280, 'deux cent quatre-vingts' ],
  [ 1000, 'mille' ],
  [ 1001, 'mille un' ],
  [ 1011, 'mille onze' ],
  [ 1200, 'mille deux cents' ],
  [ 1206, 'mille deux cent six' ],
  [ 1250, 'mille deux cent cinquante' ],
  [ 1256, 'mille deux cent cinquante-six' ],
  [ 1280, 'mille deux cent quatre-vingts' ],
  [ 2280, 'deux mille deux cent quatre-vingts' ],
  [ 80000, 'quatre-vingt mille'],
  [ 1000000, 'un million' ],
  [ 1000001, 'un million un' ],
  [ 1000011, 'un million onze' ],
  [ 1000200, 'un million deux cents' ],
  [ 1000206, 'un million deux cent six' ],
  [ 1000250, 'un million deux cent cinquante' ],
  [ 1000256, 'un million deux cent cinquante-six' ],
  [ 1001256, 'un million mille deux cent cinquante-six' ],
  [ 1011256, 'un million onze mille deux cent cinquante-six' ],
  [ 1111256, 'un million cent onze mille deux cent cinquante-six' ],
  [ 2111256, 'deux millions cent onze mille deux cent cinquante-six' ],
  [ 80000000, 'quatre-vingts millions'],
  [ 80000001, 'quatre-vingts millions un'],
  [ 80080080, 'quatre-vingts millions quatre-vingt mille quatre-vingts' ]
] as any

Deno.test('nombreEnLettres pré-réforme', () => {
  for (const [ nombre, nombreEnToutesLettres ] of dataset) {
    assertEquals(nombreEnLettres(nombre, { reforme: false }), nombreEnToutesLettres)
  }
})

Deno.test('nombreEnLettres post-réforme', () => {
  for (const [ nombre, nombreEnToutesLettres ] of dataset) {
    assertEquals(nombreEnLettres(nombre, { reforme: true }), nombreEnToutesLettres.replace(/ /g, '-'))
  }
})
