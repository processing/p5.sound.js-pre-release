/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";
import { Panner as TonePanner} from "tone/build/esm/component/channel/Panner.js";
import { clamp } from './Utils';

/**
 * A panning effect.
 * @class Panner
 * @constructor
 * @example
 * <div>
 * <code>
 * let panner, lfo, soundfile, cnv;
 * 
 * function preload() {
 *   soundfile = loadSound('assets/beat.mp3');
 * }
 * 
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   background(220);
 *   cnv.mousePressed(startSound);
 *   
 *   panner = new p5.Panner();
 *   lfo = new p5.Oscillator(1);
 *   //disconnect lfo from speakers because we don't want to hear it!
 *   lfo.disconnect();
 *   panner.pan(lfo);
 * 
 *   soundfile.loop();
 *   soundfile.disconnect();
 *   soundfile.connect(panner);
 *   
 * }
 * 
 * function startSound() {
 *   lfo.start();
 *   soundfile.start();
 * }
 * </code>
 * </div>
 */
class Panner {
  constructor() {
    this.panner= new TonePanner(0).toDestination();
  }
  
  /**
   * Pan a sound source left or right.
   * @method pan
   * @for Panner
   * @param {Number, Object}  panAmount Sets the pan position of the sound source. Can be a value between -1 and 1 or a an audio rate signal such as an LFO.
   */
  pan(p) {
    if (typeof p === "object") {
      p.getNode().connect(this.panner.pan);
      return;
    }
    this.panner.pan.rampTo(clamp(p, -1, 1), 0.01);
  }

  getNode() {
    return this.panner;
  }

  connect(destination) {
    this.panner.connect(destination.getNode());
  }

  disconnect() {
    this.panner.disconnect(ToneContext.destination);
  }
}

export default Panner;