import { strict as assert } from 'assert'
import {
    makeToast,
    makeCoffee,
    makeBreakfast,
} from '../../exercises/breakfast.js'
import { setTimeout } from 'timers/promises'

function promiseState(promise) {
    const t = Symbol()
    return Promise.race([promise, t])
        .then((v) => (v === t ? 'pending' : 'resolved'))
        .catch(() => 'rejected')
}

describe('breakfast', () => {
    describe('makeToast', () => {
        it('should be an async function', () => {
            assert.equal(
                makeToast.constructor.name,
                'AsyncFunction',
                'makeToast is not an async function'
            )
        })

        it('should not resolve if toaster is still toasting', async () => {
            const bread = {}

            const toaster = {
                add: () => { },
                toast: () => new Promise(() => { }),
                pop: () => bread,
            }

            const makeToastPromise = makeToast(bread, toaster)

            // Wait for the promise to have started properly
            await setTimeout(1)

            assert.equal(
                await promiseState(makeToastPromise),
                'pending',
                'makeToast should wait for the toaster to finish toasting'
            )
        })

        it('should resolve when toasting is finished', async () => {
            const bread = {}

            const toaster = {
                add: () => { },
                toast: () => Promise.resolve(),
                pop: () => bread,
            }

            const makeToastPromise = makeToast(bread, toaster)

            // Wait for the promise to resolve
            await setTimeout(1)

            assert.equal(
                await promiseState(makeToastPromise),
                'resolved',
                'makeToast should finish after the toaster finishes toasting'
            )
        })
    })

    describe('makeCoffee', () => {
        it('should be an async function', () => {
            assert.equal(
                makeCoffee.constructor.name,
                'AsyncFunction',
                'makeCoffee is not an async function'
            )
        })

        it('should not resolve if coffee is still brewing', async () => {
            const beans = {}

            const grinder = {
                add: () => { },
                grind: () => { },
                dump: () => beans,
            }

            const coffeeMaker = {
                add: () => { },
                brew: () => new Promise(() => { }),
                pour: () => { },
            }

            const cup = {
                fill: () => { },
            }

            const makeCoffeePromise = makeCoffee(
                beans,
                grinder,
                coffeeMaker,
                cup
            )

            // Wait for the promise to have started properly
            await setTimeout(1)

            assert.equal(
                await promiseState(makeCoffeePromise),
                'pending',
                'makeCoffee should wait for the coffee to finish brewing'
            )
        })

        it('should resolve when brewing is finished', async () => {
            const beans = {}

            const grinder = {
                add: () => { },
                grind: () => { },
                dump: () => beans,
            }

            const coffeeMaker = {
                add: () => { },
                brew: () => Promise.resolve(),
                pour: () => { },
            }

            const cup = {
                fill: () => { },
            }

            const makeCoffeePromise = makeCoffee(
                beans,
                grinder,
                coffeeMaker,
                cup
            )

            // Wait for the promise to resolve
            await setTimeout(1)

            assert.equal(
                await promiseState(makeCoffeePromise),
                'resolved',
                'makeCoffee should finish after the coffee finishes brewing'
            )
        })

        it('should not resolve if beans are still being ground', async () => {
            const beans = {}

            const grinder = {
                add: () => { },
                grind: () => new Promise(() => { }),
                dump: () => beans,
            }

            const coffeeMaker = {
                add: () => { },
                brew: () => { },
                pour: () => { },
            }

            const cup = {
                fill: () => { },
            }

            const makeCoffeePromise = makeCoffee(
                beans,
                grinder,
                coffeeMaker,
                cup
            )

            // Wait for the promise to have started properly
            await setTimeout(1)

            assert.equal(
                await promiseState(makeCoffeePromise),
                'pending',
                'makeCoffee should wait for the grinder to finish grinding'
            )
        })

        it('should resolve when grinding is finished', async () => {
            const beans = {}

            const grinder = {
                add: () => { },
                grind: () => Promise.resolve(),
                dump: () => beans,
            }

            const coffeeMaker = {
                add: () => { },
                brew: () => { },
                pour: () => { },
            }

            const cup = {
                fill: () => { },
            }

            const makeCoffeePromise = makeCoffee(
                beans,
                grinder,
                coffeeMaker,
                cup
            )

            // Wait for the promise to resolve
            await setTimeout(1)

            assert.equal(
                await promiseState(makeCoffeePromise),
                'resolved',
                'makeCoffee should finish after the grinder finishes grinding'
            )
        })
    })

    describe('makeBreakfast', () => {
        it('should be an async function', () => {
            assert.equal(
                makeBreakfast.constructor.name,
                'AsyncFunction',
                'makeBreakfast is not an async function'
            )
        })

        it('should use makeToast and makeCoffee', async () => {
            const bread = {}
            const beans = {}

            const toaster = {
                add: () => { },
                toast: () => Promise.resolve(),
                pop: () => bread,
            }

            const grinder = {
                add: () => { },
                grind: () => Promise.resolve(),
                dump: () => beans,
            }

            const coffeeMaker = {
                add: () => { },
                brew: () => Promise.resolve(),
                pour: () => { },
            }

            const cup = {
                fill: () => cup,
            }

            const breakfast = await makeBreakfast(
                bread,
                toaster,
                beans,
                grinder,
                coffeeMaker,
                cup
            )

            assert.equal(
                breakfast.toast,
                bread,
                'makeBreakfast should use makeToast'
            )

            assert.equal(
                breakfast.coffee,
                cup,
                'makeBreakfast should use makeCoffee'
            )
        })
    })
})
