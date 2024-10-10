/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";
import { PitchShift as TonePitchShift } from "tone/build/esm/effect/PitchShift.js";

/**
 * Change the pitch of a sound.
 * @class PitchShifter
 * @constructor
 * @example
 * <div>
 * <code>
 *  let cnv, soundFile, pitchShifter;
 *  
 * function preload() {
 *   soundFile = loadSound('assets/beatbox.mp3');
 * }
 *  
 * function setup() {
 *   cnv = createCanvas(100, 100);
 *   cnv.mousePressed(startSound);
 *   background(220);
 *   textAlign(CENTER);
 *   textSize(9);
 *   text('click to play sound', width/2, height/2);
 *   pitchShifter = new p5.PitchShifter();
 *   
 *   soundFile.disconnect();
 *   soundFile.connect(pitchShifter);
 *   //change the pitch and retrigger sample when done playing
 *   soundFile.onended(changePitch);
 * }
 * 
 * function startSound () {
 *   soundFile.play();
 * }
 *  
 * function changePitch () {
 *   let pitchValue = random(-12, 12);
 *   pitchShifter.shift(pitchValue);
 *   soundFile.play();
 * }
 * </code>
 * </div>
 */
class PitchShifter {
    constructor(shiftValue = 1) {
        this.pitchshifter = new TonePitchShift(shiftValue).toDestination();
    }
    
    /**
     * Shift the pitch of the source audio.
     * @method shift
     * @for PitchShifter
     * @param {Number} pitchValue amount of semitones to shift the pitch
     */
    shift (value) {
        if (value !== undefined) {
            this.pitchshifter.pitch = value;
        }
    }
    
    connect(destination) {
    this.pitchshifter.connect(destination.getNode());
    }

    disconnect() {
        this.pitchshifter.disconnect(ToneContext.destination);
    }

    getNode() {
        return this.pitchshifter;
    }
}

export default PitchShifter;