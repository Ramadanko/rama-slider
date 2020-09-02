import './AnimatedSlider.scss'
const FadeSlider = require('../FadeSlider/FadeSlider')
const domToImage = require('dom-to-image')
const animationMarkups = require('./AnimationMarkups')

class AnimatedSlider extends FadeSlider {

  overlay: HTMLElement
  currentAnimation: string
  animationTimeout: object = {
    StripesIn: 1000
  }
  constructor(container: any, options: object) {
    super(container, options)
  }

  createSliderHtmlClass(): string {
    return 'rama-slider-animated'
  }

  goToNext(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransition()
    this.overlay.className += ' animate-items'
    this.moveToNextItem()
    setTimeout(() => {
      this.overlay.remove()
      this.prepareAnimation()
    }, this.animationTimeout[this.currentAnimation])
  }

  goToPrev(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransition()
    this.overlay.className += ' animate-items'
    this.moveToPrevItem()
    setTimeout(() => {
      this.overlay.remove()
      this.prepareAnimation()
    }, this.animationTimeout[this.currentAnimation])
  }

  toggleTransition(): void {
    this.isTransitionActive = true
    setTimeout(() => {
      this.isTransitionActive = false
    }, this.animationTimeout[this.currentAnimation] + 750)
  }

  takeSnapshot(): void {
    domToImage.toPng(this.trackContainer)
      .then(dataUrl => {
        this.imageUrl = dataUrl
        this.createOverlay()
      })
  }

  createOverlay(): void {
    this.currentAnimation = this.options.animations.shift()
    this.options.animations.push(this.currentAnimation)
    this.overlay = this.overlay ? this.overlay : document.createElement('div')
    this.overlay.className = `overlay ${this.currentAnimation}`
    let markup = animationMarkups[this.currentAnimation](this.imageUrl)
    this.overlay.innerHTML = markup// get animated children
    this.newContainer.appendChild(this.overlay)
  }

  prepareAnimation(): void {
    this.takeSnapshot()
  }

}

module.exports = AnimatedSlider
