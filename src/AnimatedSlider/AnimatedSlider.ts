import './AnimatedSlider.scss'
import FadeSlider from '../FadeSlider/FadeSlider'
import domToImage from 'dom-to-image'
import animationMarkups from './AnimationMarkups'
import OptionsInterface from '../BasicSlider/OptionsInterface'

class AnimatedSlider extends FadeSlider {

  imageUrl: string
  overlay: HTMLElement
  currentAnimation: string
  animationTimeout = {
    StripesIn: 1000
  }
  constructor(elementClassOrId: string, options: OptionsInterface) {
    super(elementClassOrId, options)
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
    const markup = animationMarkups[this.currentAnimation](this.imageUrl)
    this.overlay.innerHTML = markup// get animated children
    this.newContainer.appendChild(this.overlay)
  }

  prepareAnimation(): void {
    this.takeSnapshot()
  }

}

export default AnimatedSlider
