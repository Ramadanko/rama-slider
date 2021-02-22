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
  initialized = false
  constructor(elementClassOrId: string, options: OptionsInterface) {
    super(elementClassOrId, options)
    this.isTransitionActive = true
    this.toggleButtonsState(true)
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
    this.toggleTransitionState()
    this.moveToNextItem()
    this.prepareAnimation()
    const currentOverlay = this.animatedContainers.shift()
    currentOverlay.className += ' animate-items'
    setTimeout(() => {
      currentOverlay.remove()
    }, this.options.animationSpeed * 1000)
  }

  goToPrev(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransitionState()
    this.moveToPrevItem()
    this.prepareAnimation()
    const currentOverlay = this.animatedContainers.shift()
    currentOverlay.className += ' animate-items'
    setTimeout(() => {
      currentOverlay.remove()
    }, this.options.animationSpeed * 1000)
  }

  toggleTransitionState(): void {
    this.isTransitionActive = true
    this.toggleButtonsState(true)
    setTimeout(() => {
      this.isTransitionActive = false
      this.toggleButtonsState(false)
    }, this.options.animationSpeed * 1000 + 500)
  }

  /**
   * @description create snapshot image for each silde
   */
  takeSnapshot(): void {
    if (!this.savedSlides[this.currentSlide]) {
      domToImage.toBlob(this.trackContainer)
        .then((blobImage: Blob) => {
          const url = URL.createObjectURL(blobImage)
          this.savedSlides[this.currentSlide] = url
          this.imageUrl = url
          this.createOverlay()
        })
    } else {
      this.imageUrl = this.savedSlides[this.currentSlide]
      this.createOverlay()
    }
  }

  /**
   * @description create an overlay slide item for the active to be animated
   */
  createOverlay(): void {
    const { imageUrl, newContainer } = this;
    this.currentAnimation = this.options.animations.shift()
    this.options.animations = [...this.options.animations, this.currentAnimation]
    const newOverlay = document.createElement('div')
    newOverlay.className = `overlay ${this.currentAnimation}`
    const markup = animationMarkups[this.currentAnimation](imageUrl, newContainer, this.options.animationSpeed)
    newOverlay.innerHTML = markup// get animated children
    this.newContainer.appendChild(newOverlay)
    this.animatedContainers = [...this.animatedContainers, newOverlay];
    if (!this.initialized) {
      this.enableInteractions()
    }
  }

  /**
   * called by init function from BasicSlider class
   */
  prepareAnimation(): void {
    this.takeSnapshot()
  }

  enableInteractions(): void {
    setTimeout(() => {
      this.initialized = true
      this.toggleButtonsState(false)
      this.isTransitionActive = false
    }, 0)
  }

}

export default AnimatedSlider
