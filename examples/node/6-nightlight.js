const { WLEDClient, WLEDNightlightMode } = require('wled-client')
const { sleep, setInitialState } = require('./common')

async function init() {
	console.log(`Running nightlight example on device ${ process.env.WLED_DEVICE_HOST }...`)

	const wled = new WLEDClient(process.env.WLED_DEVICE_HOST)
	await wled.init()
	console.log(`Device ready: version ${wled.info.version}`)

	console.log('Setting initial state...')
	await setInitialState(wled)

	await sleep(1000)

	console.log('Activating nightlight for 1 minute. Should stay on for 1 minute while fading to dark.')
	await wled.nightlight.enable({
		targetBrightness: 0,
		mode: WLEDNightlightMode.FADE,
		duration: 1
	})

	console.log('Listening for brightness...')
	await new Promise(res => {
		wled.on('update:state', (state) => {
			console.log(`New brightness: ${ state.brightness }`)
			if (state.on == false) {
				console.log('Device turned off.')
				res(undefined)
			}
		})
	})

	wled.disconnect()
}

init().catch(console.error)
