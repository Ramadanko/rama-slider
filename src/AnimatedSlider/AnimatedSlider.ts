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
      console.log('this.trackContainer', this.trackContainer.children[this.currentSlide - 1])
      //domToImage.toBlob(this.trackContainer)
      domToImage.toBlob(this.trackContainer.children[this.currentSlide - 1])
        .then((blobImage: Blob) => {
          const url = URL.createObjectURL(blobImage)
          this.imagePreload.onload = () => {
            console.log('image-loaded');
            this.createOverlay();
          }
          this.imagePreload.src = url;
          this.imagePreload.style.display = 'none';
          document.body.appendChild(this.imagePreload);
          const cssStyle = `.overlay-number-${this.currentSlide} .image-portion{background-image: url("${url}")}`;
          const style = document.createElement('style')
          style.innerHTML = cssStyle;
          document.body.appendChild(style);

          this.savedSlides[this.currentSlide] = url
          // this.imageUrl = url
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
    const { imageUrl, newContainer, currentSlide } = this;
    this.currentAnimation = this.options.animations.shift()
    this.options.animations = [...this.options.animations, this.currentAnimation]
    const newOverlay = document.createElement('div')
    newOverlay.className = `overlay ${this.currentAnimation} ${newContainer.getAttribute('data-rama-id')} overlay-number-${currentSlide}`
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
