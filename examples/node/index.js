const { readdir } = require('fs/promises')
require('dotenv').config()

const [,,example_name] = process.argv
run(example_name).catch(console.error)

async function run(example_name) {
	const files = await readdir(__dirname)

	const examples = files.reduce((examples, file_name) => {
		const [n] = file_name.split('-')
		if (!isNaN(parseInt(n))) {
			examples[n] = file_name.replace('.js', '')
		}

		return examples
	}, {})

	if (examples[example_name]) require(`./${examples[example_name]}`)
	else require(`./${example_name}`)
}