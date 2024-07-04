export async function getPokemonList() {
  // TODO
  const response = await fetch('https://pokeapi.co/api/v2/pokemon')
  const data = await response.json()
  console.log(data)
}

/*
  - make a `GET` request to `https://pokeapi.co/api/v2/pokemon`

  - get the data out of the response

  - return an array of only the `name`s of the Pokémon in the results.

  --

const response = await fetch('https://www.boredapi.com/api/activity')
const data = await response.json()
console.log(data)
*/