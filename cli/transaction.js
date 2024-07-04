import { Command } from 'commander'
import fs from 'fs/promises'
/*
import { Transactions } from '../models/Transactions.js'
import { Bank } from '../models/Bank.js'

const transactionController = new Command('transaction')

transactionController
  .command('log <from> <to> <amount>')
  .description('Log transaction data to the console')
  .action((from, to, amount) => {
    //console.log(`logging transaction of ${amount} from ${from} to ${to}`)
    Transactions.makeLog(from, to, amount)
  })

transactionController
  .command('summarise all')
  .description('output the names of each person, and the total amount of money they should receive from the bank')
  .action(async () => {
    const path = new url('../data/transactions2014.csv', import.meta.url)
    let content = await fs.readfile(path, 'utf-8')
    let lines = content.split('\n').slice(1) // splits each line, gets rid of header line 
    lines.forEach(line => {
      let transactionParts = line.split(',')
      let bank = new Bank()
      bank.processTransaction(transactionParts[1], transactionParts[2], transactionParts[4])// from, to and amount from csv
    })
    console.log(bank.accounts)
  })

export default transactionController
*/
const file = await fs.readFile("data/Transactions2014.csv", "utf-8")
const fileLines = file.split("\r\n")

const transactionController = new Command('transaction')

transactionController
  .command('log <from> <to> <amount>')
  .description('Log transaction data to the console')
  .action((from, to, amount) => {
    const now = new Date()

    console.log(`At ${now.toDateString()}, ${from} sent ${to} £${amount}`)
  })

class Transaction {
  constructor(date, from, to, narrative, amount) {
    this.date = date
    this.from = from
    this.to = to
    this.narrative = narrative
    this.amount = amount
  }
}

function readTransactionFromLine(line) {
  const lineSplit = line.split(",")
  return new Transaction(
    lineSplit[0],
    lineSplit[1],
    lineSplit[2],
    lineSplit[3],
    parseFloat(lineSplit[4])
  )
}

transactionController
  .command("summarise all")
  .description("Summarise all the transactions")
  .action(() => {
    const allButFirstLine = fileLines.slice(1)
    const names = {}

    for (let line of allButFirstLine) {
      const transaction = readTransactionFromLine(line)

      if (transaction.from in names) {
        names[transaction.from] -= transaction.amount
      } else {
        names[transaction.from] = -transaction.amount
      }

      if (transaction.to in names) {
        names[transaction.to] += transaction.amount
      } else {
        names[transaction.to] = transaction.amount
      }
    }

    for (let accountName in names) {
      console.log(`${accountName}: £${names[accountName].toFixed(2)}`)
    }
  })

export default transactionController

