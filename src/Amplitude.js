/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Meter as ToneMeter } from "tone/build/esm/component/analysis/Meter.js";
import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";

/**
 * Get the current volume of a sound.
 * @class Amplitude
 * @constructor
 * @example
 * <div>
 * <code>
 * let sound, amp, cnv;
 *   
 * function preload() {
 *   //replace this sound with something local with rights to distribute
 *   sound = loadSound('assets/Damscray_DancingTiger.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(playSound);
 *   textAlign(CENTER);
 *   fill(255);
 *   amp = new p5.Amplitude();
 *   sound.connect(amp);
 * }
 * 
 * function playSound() {
 *   sound.play();
 * }
 * 
 * function draw() {
 *   let level = amp.getLevel();
 *   level = map(level, 0, 0.2, 0, 255);
 *   background(level, 0, 0);
 *   text('tap to play', width/2, 20);
 *   describe('The color of the background changes based on the amplitude of the sound.');
 * }
 * </code>
 * </div>
 */
class Amplitude {
  constructor() {
    this.amplitude = new ToneMeter({normalRange:true});
  }

  /**
   * Connect an audio source to the amplitude object.
   * @method setInput
   * @for Amplitude
   * @param {Object} input - An object that has audio output.
   */
  setInput(input) {
    input.getNode().connect(this.amplitude);
  }

  /**
   * Get the current amplitude value of a sound.
   * @method getLevel
   * @for Amplitude
   * @return {Number} Amplitude level (volume) of a sound.
   */
  getLevel() {
    return this.amplitude.getValue();
  }

  connect(destination) {
    this.amplitude.connect(destination.getNode());
  }

  disconnect() {
    this.amplitude.disconnect(ToneContext.destination);
  }

  getNode() {
    return this.amplitude;
  }
}

export default Amplitude;