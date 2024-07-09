export async function getPokemonList() {
  // TODO
  const response = await fetch('https://pokeapi.co/api/v2/pokemon')
  const data = await response.json()
  return data
}

/*
    should get a list of pokemon:

  - make a `GET` request to `https://pokeapi.co/api/v2/pokemon`

  - get the data out of the response

  - return an array of only the `name`s of the Pokémon in the results.

  --

Tech docs:
const response = await fetch('https://www.boredapi.com/api/activity')
const data = await response.json()
console.log(data)

--

async function makeApiRequest(){
const response = await fetch ('http web address')
const data = await response.json()
console.log(response)
}

makeApiRequest()

.map to extract names from results array

*/