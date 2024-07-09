export async function getPokemonList() {
  // TODO
  const response = await fetch('https://pokeapi.co/api/v2/pokemon') // Extension: limit and offset
  const data = await response.json()
  //console.log(data)

  const getNames = data.results.map(pokemon => pokemon.name) // arrow functions, just the names of the items in the list
  return getNames

}


const data = await getPokemonList()
console.log(data)


/*
    should get a list of pokemon:

  - make a `GET` request to `https://pokeapi.co/api/v2/pokemon`
  - get the data out of the response
  - return an array of only the `name`s of the Pokémon in the results.

  --

Tech docs example:
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

--

.map to extract names from results array
https://tech-docs.corndel.com/js/array-map.html

--

go to https://pokeapi.co/api/v2/pokemon at the end! 

*/