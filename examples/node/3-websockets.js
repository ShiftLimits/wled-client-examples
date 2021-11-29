const { WLEDClient } = require('wled-client')
const { sleep, toggleExample, setInitialState } = require('./common')

async function init() {
	console.log(`Running WebSockets example on device ${ process.env.WLED_DEVICE_HOST }...`)

	const wled = new WLEDClient(process.env.WLED_DEVICE_HOST)
	await wled.isReady

	wled.on('update:state', () => {
		console.log('WLED State Updated')
	})

	wled.on('live', ({ leds, n }) => {
		console.log('Got live event. LED count:', leds.length)
	})

	console.log('Starting live stream')
	await wled.startLiveStream()

	console.log('Setting initial state...')
	await setInitialState(wled)
	await wled.setEffect(8)
	await sleep(1000)
	await toggleExample(wled)
	await sleep(2500)

	console.log('Stopping live stream')
	await wled.stopLiveStream()

	await sleep(1000)
	console.log('Disconnecting from WebSocket...')
	wled.disconnect()
	await sleep(1000)

	console.log('Re-setting state...')
	await setInitialState(wled)
	await sleep(1000)

	console.log('Running toggle example via JSON...')
	await toggleExample(wled)

	await sleep(1000)

	console.log('Reconnecting to WebSocket...')
	await wled.connect()

	await sleep(1000)

	console.log('New client with WebSockets disabled from the start...')
	const wled_json = new WLEDClient({
		host: process.env.WLED_DEVICE_HOST,
		websocket: false
	})
	await wled_json.isReady
	console.log(`Device ready: version ${wled_json.info.version}`)

	console.log('Re-setting state...')
	await setInitialState(wled)

	await sleep(1000)

	console.log('Running toggle example...')
	await toggleExample(wled_json)

	await sleep(1000)

	wled.disconnect()
}

init().catch(console.error)