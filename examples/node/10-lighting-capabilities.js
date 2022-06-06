const { WLEDClient } = require('wled-client')
const { sleep, toggleExample, setInitialState } = require('./common')

async function init() {
	console.log(`Getting the lighting capabilities for device ${ process.env.WLED_DEVICE_HOST }...`)

	const wled = new WLEDClient(process.env.WLED_DEVICE_HOST)
	await wled.init()
	console.log(`Device ready: version ${wled.info.version}`)

	console.log('Setting initial state...')
	await setInitialState(wled)

	console.log(`Raw individual segment lighting capabilities: ${wled.info.leds.segmentLightCapabilities}`)
	console.log(`Raw combined lighting capabilities: ${wled.info.leds.lightCapabilities}`)
	console.log(`Parsed lighting capabilities: ${JSON.stringify(wled.lightCapabilities)}`)

	await sleep(1000)

	const { rgb, white, cct } = wled.lightCapabilities
	if (rgb) {
		console.log('The device supports RGB color light.')
		await wled.setColor([255,0,0])
		await sleep(1000)
		await wled.setColor([0,255,0])
		await sleep(1000)
		await wled.setColor([0,0,255])
		await sleep(1000)
		await wled.setColor([0,0,0])
		await sleep(1000)
	}
	if (white) {
		console.log('The device supports the white light channel.')
		await wled.setColor([0,0,0,255])
		await sleep(1000)
		await wled.setColor([0,0,0,128])
		await sleep(1000)
		await wled.setColor([0,0,0,64])
		await sleep(1000)
		await wled.setColor([128,0,0,255])
		await sleep(1000)
		await wled.setColor([0,0,0,0])
		await sleep(1000)
	}
	if (cct) {
		console.log('The device supports Correlated Color Temperature.')
		await wled.setColor([0,0,0,255])
		await sleep(1000)
		await wled.setCCT(0)
		await sleep(1000)
		await wled.setCCT(128)
		await sleep(1000)
		await wled.setCCT(255)
		await sleep(1000)
		await wled.setColor([0,0,0,0])
		await sleep(1000)
	}

	wled.disconnect()
}

init().catch(console.error)
