import { WLEDClient } from 'wled-client'
import { setInitialState } from './common'

async function init() {
	console.log(`Running color and effects example on device ${ process.env.WLED_DEVICE_HOST }...`)

	const wled = new WLEDClient(process.env.WLED_DEVICE_HOST!)
	await wled.init()

	console.log('Setting initial state...')
	await setInitialState(wled)

	console.log('Beginning effects rotation...')
	let effect_id = 0
	const rotateEffect = () => {
		console.log(`Updating effect to ${ wled.effects[effect_id] }`)
		wled.setEffect(effect_id)
		effect_id = (effect_id + 1) % wled.effects.length
	}

	let effect_rotator = setInterval(rotateEffect, 2500)
	rotateEffect()

	console.log('Beginning color rotation...')
	let palette_id = 0
	const rotatePalette = () => {
		console.log(`Updating palette to ${ wled.palettes[palette_id] }`)
		wled.setPalette(palette_id)
		palette_id = (palette_id + 1) % wled.palettes.length
	}

	let palette_rotator = setInterval(rotatePalette, 1000)
	rotatePalette()
}

init().catch(console.error)
