require('dotenv').config()

const [,,example_name] = process.argv
run(example_name).catch(console.error)

async function run(example_name) {
	require(`./${example_name}`)
}