import '../index.scss'
import './AnimatedSlider.scss'
import FadeSlider from '../FadeSlider/FadeSlider'
import domToImage from 'dom-to-image'
import animationMarkups from './AnimationMarkups'
import OptionsInterface from '../BasicSlider/OptionsInterface'

class AnimatedSlider extends FadeSlider {

  imageUrl: string
  overlay: HTMLElement
  currentAnimation: string
  animatedContainers: Array<HTMLElement> = []
  constructor(elementClassOrId: string, options: OptionsInterface) {
    super(elementClassOrId, options)
  }

  createSliderHtmlClass(): string {
    return 'rama-slider-animated'
  }

  getTransitionDuration(): number {
    return 0
  }

  goToNext(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransition()
    this.moveToNextItem()
    this.prepareAnimation()
    const currentOverlay = this.animatedContainers.shift()
    currentOverlay.className += ' animate-items'
    setTimeout(() => {
      currentOverlay.remove()
    }, this.options.animationSpeed * 1000 + 100)
  }

  goToPrev(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransition()
    this.moveToPrevItem()
    this.prepareAnimation()
    const currentOverlay = this.animatedContainers.shift()
    currentOverlay.className += ' animate-items'
    setTimeout(() => {
      currentOverlay.remove()
    }, this.options.animationSpeed * 1000 + 100)
  }

  toggleTransition(): void {
    this.isTransitionActive = true
    this.toggleButtonsState(true)
    setTimeout(() => {
      this.isTransitionActive = false
      this.toggleButtonsState(false)
    }, this.options.animationSpeed * 1000 + 100)
  }

  takeSnapshot(): void {
    domToImage.toBlob(this.trackContainer)
      .then(blobImage => {
        const url = URL.createObjectURL(blobImage)
        this.imageUrl = url
        this.createOverlay()
      })
  }

  createOverlay(): void {
    const { imageUrl, newContainer } = this;
    this.currentAnimation = this.options.animations.shift()
    this.options.animations.push(this.currentAnimation)
    const newOverlay = document.createElement('div')
    newOverlay.className = `overlay ${this.currentAnimation}`
    const markup = animationMarkups[this.currentAnimation](imageUrl, newContainer, this.options.animationSpeed)
    newOverlay.innerHTML = markup// get animated children
    this.newContainer.appendChild(newOverlay)
    this.animatedContainers.push(newOverlay)
  }

  prepareAnimation(): void {
    this.takeSnapshot()
  }

}

export default AnimatedSlider
