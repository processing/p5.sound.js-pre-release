/**
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";
import { Panner3D as TonePanner3D} from "tone/build/esm/component/channel/Panner3D.js";

/**
 * A 3D sound spatializer.
 * @class Panner3D
 * @constructor
 * @example
 * <div>
 * <code>
 * let radius = 10 ; 
 * let soundSource, spatializer;
 * let font;
 * let cnv;
 * 
 * let x = 0;
 * let y = 0;
 * let z = 100;
 * 
 * let vX;
 * let vY;
 * let vZ;
 * 
 * function preload() {
 *   soundSource = loadSound('assets/beat.mp3');
 *   font = loadFont('assets/SourceSansPro-Regular.otf');
 * }
 * 
 * function setup() {
 *   describe(
 *     'A 3D shape with a sound source attached to it. The sound source is spatialized using the Panner3D class. Click to play the sound.'
 *   );
 *   cnv = createCanvas(100, 100, WEBGL);
 *   cnv.mousePressed(playSound);
 * 
 *   camera(0, 0, 0, 0, 0, 1);
 *   
 *   textFont(font);
 *   textAlign(CENTER,CENTER);
 *   
 *   angleMode(DEGREES);
 * 
 *   vX = random(-0.5, 0.5);
 *   vY = random(-0.5, 0.5);
 *   vZ = random(-0.5, 0.5) * 1.5;
 * 
 *   spatializer = new p5.Panner3D();
 *   spatializer.maxDist(100);
 *   soundSource.loop();
 *   soundSource.disconnect();
 *   soundSource.connect(spatializer);
 * }
 * 
 * function playSound() {
 *   soundSource.play();
 * }
 * 
 * function draw() {
 *   background(220);
 *   push();
 *   textSize(5);
 *   fill(0);
 *   translate(0,0,100);
 *   //text('click to play', 0, 0);
 *   pop();
 *   // Update Box and Sound Source Position
 *   push();
 *   moveSoundBox();
 *   box(5, 5, 5);
 *   pop();
 * }
 * 
 * // Rotate 1 degree per frame along all three axes
 * function moveSoundBox() {
 *   x = x + vX;
 *   y = y + vY;
 *   z = z + vZ;
 * 
 *   if (x > radius || x < -radius) {
 *     vX = -vX;
 *   }
 *   if (y > radius || y < -radius) {
 *     vY = -vY;
 *   }
 *   if (z > 250 || z < 80) {
 *     vZ = -vZ;
 *   }
 *   //set the position of the 3D panner
 *   spatializer.set(x, y, z);
 *   //set the postion of the box
 *   translate(x, y, z);
 *   rotateX(45 + frameCount);
 *   rotateZ(45);
 * }
 * </code>
 * </div>
 */
class Panner3D {
  constructor() {
    this.panner3d= new TonePanner3D({
      coneInnerAngle:360,
      coneOuterAngle:360,
      coneOuterGain:1,
      positionX:0,
      positionY:0,
      positionZ:0,
    }).toDestination();
  }

  /**
   * Connects an input source to the 3D panner.
   * @method process
   * @for Panner3D
   * @param {Object} input an input source to process with the 3D panner.
   */
  process(input) {
    input.getNode().connect(this.panner3d);
  }

  /**
   * Set the x, y, and z position of the 3D panner.
   * @method set
   * @for Panner3D
   * @param {Number} xPosition the x coordinate of the panner.
   * @param {Number} yPosition the y coordinate of the panner.
   * @param {Number} zPosition the z coordinate of the panner.
   */
  set(x, y, z) {
    this.panner3d.positionX.rampTo(x, 0.01);
    this.panner3d.positionY.rampTo(y, 0.01);
    this.panner3d.positionZ.rampTo(z, 0.01);
  }
  
  /**
   * The rolloff rate of the panner.
   * @method setFalloff
   * @for Panner3D
   * @param {Number} rolloffFactor 
   * @param {Number} maxDistance 
   */
  setFalloff(rolloffFactor, maxDistance) {
    this.panner3d.rolloffFactor = rolloffFactor;
    this.panner3d.maxDistance = maxDistance;
  }

  /**
   * Set the maximum distance of the panner.
   * @method maxDist
   * @for Panner3D
   * @param {Number} distance the maximum distance that the sound source can be heard from.
   */
  maxDist(d) {
    this.panner3d.maxDistance = d;
  }

  /**
   * Set the rolloff rate of the panner.
   * @method rolloff
   * @for Panner3D
   * @param {Number} r the rolloff rate of the panner.
   */
  rolloff(r) {
    this.panner3d.rolloffFactor = r;
  }

  /**
   * Set the X position of the sound source.
   * @method positionX
   * @for Panner3D
   * @param {Number} positionX the x position of the sound source.
   */
  positionX(p) {
    this.panner3d.positionX.rampTo(p, 0.01);
  }

  /**
   * Set the Y position of the sound source.
   * @method positionY
   * @for Panner3D
   * @param {Number} positionY the y position of the sound source.
   */
  positionY(p) {
    this.panner3d.positionY.rampTo(p, 0.01);
  }

  /**
   * Set the Z position of the sound source.
   * @method positionZ
   * @for Panner3D
   * @param {Number} positionZ the z position of the sound source.
   */
  positionZ(p) {
    this.panner3d.positionZ.rampTo(p, 0.01);
  }

  connect(destination) {
    this.panner3d.connect(destination.getNode());
  }

  disconnect() {
    this.panner3d.disconnect(ToneContext.destination);
  }

  getNode() {
    return this.panner3d;
  }
}

export default Panner3D;