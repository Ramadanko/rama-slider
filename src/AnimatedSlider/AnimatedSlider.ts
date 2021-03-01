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
  imagePreload = document.createElement('img');
  constructor(elementClassOrId: string, options: OptionsInterface) {
    super(elementClassOrId, options)
    this.isTransitionActive = true
    this.toggleButtonsState(true)
    this.insertImagePreloader()
  }

  createSliderHtmlClass(): string {
    return 'rama-slider-animated'
  }

  getTransitionDuration(): number {
    return 0
  }

  /**
   * @description create image preloader to load snapshot images before animation transition
   */
  insertImagePreloader(): void {
    const styles = `position: absolute; z-index: -100; left: -100%; visibility:hidden`
    this.imagePreload.setAttribute('style', styles)
    document.body.appendChild(this.imagePreload)
  }

  /**
   * @description load snapshot image before animation transition
   * @param url String: snapshot image url saved in memory
   */
  loadSnapshotImage(url: string): void {
    this.imagePreload.onload = () => {
      this.createOverlay();
    }
    this.imagePreload.src = url
  }

  /**
   * @description create & insert css rules for each snapshot image
   * @param url String: snpashot image url
   */
  insertCssStyles(url: string): void {
    const sliderId = this.newContainer.getAttribute('data-rama-id')
    const cssStyle = `.overlay-number-${this.currentSlide}.${sliderId} .image-portion{background-image: url("${url}")}`
    const style = document.createElement('style')
    style.innerHTML = cssStyle
    document.body.appendChild(style)
  }

  /**
   * @description navigation to next slider
   */
  goToNext(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransitionState()
    this.moveToNextItem()
    this.prepareAnimation()
    const currentOverlay = this.animatedContainers.shift()
    currentOverlay.classList.add('animate-items')
    setTimeout(() => {
      currentOverlay.remove()
    }, this.options.animationSpeed * 1000)
  }

  /**
   * @description navigate to previous slider
   */
  goToPrev(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransitionState()
    this.moveToPrevItem()
    this.prepareAnimation()
    const currentOverlay = this.animatedContainers.shift()
    currentOverlay.classList.add('animate-items')
    setTimeout(() => {
      currentOverlay.remove()
    }, this.options.animationSpeed * 1000)
  }

  /**
   * @description disable user interaction during animation transition
   */
  toggleTransitionState(): void {
    this.isTransitionActive = true
    this.toggleButtonsState(true)
    setTimeout(() => {
      this.isTransitionActive = false
      this.toggleButtonsState(false)
    }, this.options.animationSpeed * 1000 + 100)
  }

  /**
   * @description create snapshot image for each silde
   */
  takeSnapshot(): void {
    if (!this.savedSlides[this.currentSlide]) {
      domToImage.toBlob(this.trackContainer.children[this.currentSlide - 1])
        .then((blobImage: Blob) => {
          const url = URL.createObjectURL(blobImage)
          this.loadSnapshotImage(url)
          this.insertCssStyles(url)
          this.savedSlides[this.currentSlide] = url
        })
    } else {
      this.createOverlay()
    }
  }

  /**
   * @description create an overlay slide item for the active slide item to be animated
   */
  createOverlay(): void {
    const { newContainer, currentSlide } = this;
    this.currentAnimation = this.options.animations.shift()
    this.options.animations = [...this.options.animations, this.currentAnimation]

    const newOverlay = document.createElement('div')
    newOverlay.className = `overlay ${this.currentAnimation} ${newContainer.getAttribute('data-rama-id')} overlay-number-${currentSlide}`
    const animatedElements = animationMarkups[this.currentAnimation](newContainer, this.options.animationSpeed)
    newOverlay.innerHTML = animatedElements
    this.newContainer.appendChild(newOverlay)
    this.animatedContainers = [...this.animatedContainers, newOverlay];
  }

  /**
   * called by init function from BasicSlider class
   */
  prepareAnimation(): void {
    this.takeSnapshot()
    if (!this.initialized) {
      setTimeout(() => this.enableInteractions())
    }
  }

  /**
   * @description enable user interaction to navigate between slides
   */
  enableInteractions(): void {
    this.initialized = true
    this.toggleButtonsState(false)
    this.isTransitionActive = false
  }

}

export default AnimatedSlider
