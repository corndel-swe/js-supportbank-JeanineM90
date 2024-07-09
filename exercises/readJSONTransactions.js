import fs from 'fs/promises'

export async function readJSONTransactions() {
  // Read the Transactions2013.json file
  // Use JSON.parse to convert the string into an array of objects
  // and return it

  // read data
  const path = new URL('../data/Transactions2013.json', import.meta.url)
  const data = await fs.readFile(path, 'utf-8')
  //console.log(data)

  // parse into object

  const obj = JSON.parse(data)

  //console.log(obj)
  return obj
}

readJSONTransactions()

//data/Transactions2013.json
//SeefileIO
