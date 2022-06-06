import { WLEDClient } from 'wled-client'

async function init() {
	console.log(`Running error handling example on device ${ process.env.WLED_DEVICE_HOST }...`)

	const wled = new WLEDClient('not.a.valid.ip')
	wled.on('error', e => console.log('Error event', e))

	try {
		await wled.init()
	} catch(e) {
		console.log(`Caught rejected 'init' promise.`)
	}
}

init().catch(console.error)