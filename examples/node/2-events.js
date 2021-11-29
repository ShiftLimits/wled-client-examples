const { WLEDClient } = require('wled-client')
const { sleep, toggleExample, setInitialState } = require('./common')

function init() {
	console.log(`Running events example on device ${ process.env.WLED_DEVICE_HOST }...`)

	const wled = new WLEDClient(process.env.WLED_DEVICE_HOST)
	wled.on('ready', () => {
		console.log(`Device ready: version ${wled.info.version}`)

		wled.on('update:state', () => {
			console.log('WLED State Updated')
		})

		console.log('Setting initial state...')
		setInitialState(wled)
		.then(() => sleep(1000))
		.then(() => {
			console.log('Running toggle example...')
			return toggleExample(wled)
		})
		.then(() => wled.disconnect())
		.catch(console.error) // Make sure you add catch to your promises!
	})
}

init()
