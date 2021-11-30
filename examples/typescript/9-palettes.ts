import { WLEDClient } from 'wled-client'

async function init() {
	console.log(`Running palette example on device ${ process.env.WLED_DEVICE_HOST }...`)

	const wled = new WLEDClient(process.env.WLED_DEVICE_HOST!)
	await wled.isReady

	let page_2 = await wled.getPalettesData(2)
	console.log(`Got page 2 data. IDs: ${Object.keys(page_2)}`)

	let palette_data = await wled.getPalettesData()
	let palette_keys = Object.keys(palette_data)
	console.log(`Got all palette data. Start ID: ${ palette_keys[0] }, End ID: ${ palette_keys[palette_keys.length-1] }`)

	let palette_id = Math.round(Math.random() * wled.palettes.length)
	console.log(`Palette data for '${ wled.palettes[palette_id] }': ${ palette_data[palette_id] }`)

	let cached_palette_data = await wled.getPalettesData()
	palette_id = Math.round(Math.random() * wled.palettes.length)
	console.log(`Cached palette data for '${ wled.palettes[palette_id] }': ${ cached_palette_data[palette_id] }`)

	wled.disconnect()
}

init().catch(console.error)