import { UserMedia as ToneUserMedia, gainToDb as ToneGainToDb, Context as ToneContext} from "tone";

/**
 * Get sound from an input source, typically a computer microphone.
 * @class AudioIn
 * @constructor
 * @example
 * <div>
 * <code>
 * let mic, delay, filter;
 * 
 * function setup() {
 *   let cnv = createCanvas(100, 100);
 *   cnv.mousePressed(startMic);
 *   background(220);
 *   
 *   mic = new AudioIn();
 *   delay = new Delay(0.74, 0.1);
 *   filter = new Biquad(600, "bandpass");
 *   
 *   mic.disconnect();
 *   mic.connect(delay);
 *   delay.disconnect();
 *   delay.connect(filter);
 *   
 *   textAlign(CENTER);
 *   textWrap(WORD);
 *   textSize(10);
 *   text('click to open mic, watch out for feedback', 0, 20, 100);
 *   describe('a sketch that accesses the user\'s microphone and connects it to a delay line.')
 * }
 * 
 * function startMic() {
 *   mic.start();
 * }
 * 
 * function draw() {
 *   d = map(mouseX, 0, width, 0.0, 0.5);
 *   delay.delayTime(d);
 * }
 * </code>
 * </div>
 */
class AudioIn {
    constructor() {
        this.audioIn = new ToneUserMedia().toDestination();
    }
    
    /**
     * Start the audio input.
     * @method start
     * @for AudioIn
     */
    start() {
        Tone.start();
        this.audioIn.open().then(() => {
            // promise resolves when input is available
            console.log("mic open");
            // print the incoming mic levels in decibels
        }).catch(e => {
            // promise is rejected when the user doesn't have or allow mic access
            console.log("mic not open");
        });
    }
    /**
     * Stop the audio input.
     * @method stop
     * @for AudioIn
     */
    stop() {
        this.audioIn.close();
    }

    /**
     * Set amplitude (volume) of a mic input between 0 and 1.0.
     * @method amp
     * @for AudioIn
     * @param {Number} amplitudeAmount An amplitude value between 0 and 1.
     */
    amp(value) {
        let dbValue = ToneGainToDb(value);
        this.delay.volume.rampTo(dbValue, 0.1);
    }
    
    getNode() {
        return this.audioIn;
      }
    
    connect(destination) {
    this.audioIn.connect(destination.getNode());
    }
    
    disconnect() {
        this.audioIn.disconnect(ToneContext.destination);
    }
}

export default AudioIn;