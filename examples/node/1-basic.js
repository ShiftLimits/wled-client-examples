const { WLEDClient } = require('wled-client')
const { sleep, toggleExample, setInitialState } = require('./common')

async function init() {
	console.log(`Running basic example on device ${ process.env.WLED_DEVICE_HOST }...`)

	const wled = new WLEDClient(process.env.WLED_DEVICE_HOST)
	await wled.isReady
	console.log(`Device ready: version ${wled.info.version}`)

	console.log('Setting initial state...')
	await setInitialState(wled)

	await sleep(1000)

	console.log('Running toggle example...')
	await toggleExample(wled)

	wled.disconnect()
}

init().catch(console.error)
