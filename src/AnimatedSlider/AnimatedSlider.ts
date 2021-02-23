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
    this.moveToNextItem()
    this.overlayElement.classList.add('animate-items');
    this.toggleTransitionState()
    this.prepareAnimation()
  }

  goToPrev(): void {
    if (this.isTransitionActive)
      return
    this.moveToPrevItem()
    this.overlayElement.classList.add('animate-items');
    this.toggleTransitionState()
    this.prepareAnimation()
  }

  /**
   * @description disable prev & next buttons interactions
   */
  toggleTransitionState(): void {
    this.isTransitionActive = true
    this.toggleButtonsState(true)
    setTimeout(() => {
      this.updateOverlay();
      this.enableInteractions(500);
    }, this.options.animationSpeed * 1000 + 100)
  }

  /**
   * @description create snapshot image for each silde
   */
  takeSnapshot(): void {
    //console.log('activeElement', this.activeElement);
    //console.log('this.currentSlide', this.currentSlide);
    const element = this.activeElement ? this.activeElement : this.trackContainer.children[0];
    //console.log('element', element);
    if (!this.savedSlides[this.currentSlide]) {
      //console.log('activeElement', this.trackContainer.children[this.currentSlide - 1])
      //domToImage.toBlob(this.trackContainer)
      //domToImage.toBlob(this.trackContainer.children[this.currentSlide - 1])
      domToImage.toBlob(element)
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
    // console.log('updateOverlay ==>>',this.currentSlide)
    // console.log('updateOverlay ==>>',this.savedSlides)
    const { newContainer } = this;
    //this.overlayElement.classList.remove('animate-items', this.currentAnimation)
    this.currentAnimation = this.options.animations.splice(0, 1)[0];
    this.options.animations = [...this.options.animations, this.currentAnimation]
    this.overlayElement.replaceWith(this.createOverlay());
    setTimeout(() => {
      const blobUrl = this.savedSlides[this.currentSlide];
      this.overlayElement.innerHTML = animationMarkups[this.currentAnimation](blobUrl, newContainer, this.options.animationSpeed)
      this.overlayElement.classList.add(this.currentAnimation);
    }, 100)
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
  enableInteractions(timeout = 100): void {
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
      this.enableInteractions(1000)
    }
  }
}

export default AnimatedSlider
