import { config } from 'dotenv'
config()

const [,,example] = process.argv
run(example).catch(console.error)

async function run(example:string) {
	import(`./${example}.ts`)
}