import { readdir } from 'fs/promises'
import { config } from 'dotenv'
config()

const [,,example] = process.argv
run(example).catch(console.error)

async function run(example:string) {
	const files = await readdir(__dirname)

	const examples = files.reduce<{[key:string]:string}>((examples, file_name) => {
		const [n] = file_name.split('-')
		if (!isNaN(parseInt(n))) {
			examples[n] = file_name.replace('.ts', '')
		}

		return examples
	}, {})

	if (examples[example]) import(`./${examples[example]}.ts`)
	else import(`./${example}.ts`)
}