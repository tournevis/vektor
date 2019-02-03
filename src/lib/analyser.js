'use strict';

export default class Analyser {
	constructor (fftSize) {
		this.context = new (window.AudioContext || window.webkitAudioContext)()
		this.audioAnalyser = contexteAudio.createAnalyser()
		this.audioAnalyser.fftSize = fftSize
		this.bufferMemorySize = context.frequencyBinCount
		this.dataArray = new Uint8Array(bufferMemorySize)		
		console.log(bufferMemorySize)
	}
	getData () {
		return this.audioAnalyser.getByteFrequencyData(this.dataArray)
	}
}