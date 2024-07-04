import fs from 'fs/promises'

export async function readJSONTransactions() {
  // Read the Transactions2013.json file
  // Use JSON.parse to convert the string into an array of objects
  // and return it

  // read data
  const path = new URL('./config.json', import.meta.url)
  const data = await fs.readFile(path)

  // parse into js object
  const obj = JSON.parse(data)
  console.log(obj)
}
