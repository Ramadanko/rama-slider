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
    this.overlayElement.className += ' animate-items'
  }

  goToPrev(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransitionState()
    this.moveToPrevItem()
    this.prepareAnimation()
    this.overlayElement.className += ' animate-items'
  }

  /**
   * @description disable prev & next buttons interactions
   */
  toggleTransitionState(): void {
    this.isTransitionActive = true
    this.toggleButtonsState(true)
    setTimeout(() => {
      this.updateOverlay();
      this.enableInteractions(250);
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
          this.imageUrl = url;
          this.firstLaunch();
        })
    } else {
      this.imageUrl = this.savedSlides[this.currentSlide]
    }
  }

  /**
   * @description create an overlay slide item for the next slide to be animated
   */
  updateOverlay(): void {
    const { imageUrl, newContainer } = this;
    this.currentAnimation = this.options.animations.shift()
    this.options.animations = [...this.options.animations, this.currentAnimation]
    this.overlayElement.className = `overlay ${this.currentAnimation}`
    const markup = animationMarkups[this.currentAnimation](imageUrl, newContainer, this.options.animationSpeed)
    this.overlayElement.innerHTML = markup// get animated children
  }

  /**
   * @description
   * - called by init function from BasicSlider class on initialization
   */
  prepareAnimation(): void {
    this.takeSnapshot()
  }

  /**
   * @description enable user interaction after overlay element to be animated
   */
  enableInteractions(timeout= 100): void {
    setTimeout(() => {
      this.toggleButtonsState(false)
      this.isTransitionActive = false;
    }, timeout);
  }

  /**
   * @description runs once after creating first snapshot
   */
  firstLaunch(): void {
    if (!this.initialized) {
      this.initialized = true;
      this.updateOverlay();
      this.enableInteractions()
    }
  }
}

export default AnimatedSlider
