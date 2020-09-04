import './FadeSlider.scss'
import BasicSlider from '../BasicSlider/BasicSlider'
import OptionsInterface from '../BasicSlider/OptionsInterface'

class FadeSlider extends BasicSlider {

  constructor(elementClassOrId: string, options: OptionsInterface) {
    super(elementClassOrId, options)
  }

  createSliderHtmlClass(): string {
    return 'rama-slider-fade'
  }

  markSliderItems(): void {
    Array.from(this.container.children).forEach((item: HTMLElement, index: number) => {
      item.className = item.className.length ? `${item.className} rama-slider-item-${index}` : `rama-slider-item-${index}`;
      if (this.currentSlide === (index + 1)) {
        item.className += ' active'
      }
      item.style.zIndex = `${index + 1}`
      item.style.transitionDuration = this.getTransitionDuration() + 's'
    })
  }

  getTransitionDuration(): number {
    return this.options.speed
  }

  goToNext(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransition()
    this.moveToNextItem()
  }

  moveToNextItem(): void {
    const { trackContainer, currentSlide, numberOfItems } = this
    trackContainer.children[currentSlide - 1].className = trackContainer.children[currentSlide - 1].className.replace("active", '').trim()
    if (currentSlide === numberOfItems) {
      trackContainer.children[0].className = (trackContainer.children[0].className + ' active').trim()
      this.currentSlide = 1
    } else {
      trackContainer.children[currentSlide].className = (trackContainer.children[currentSlide].className + ' active').trim()
      this.currentSlide++
    }
  }

  goToPrev(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransition()
    this.moveToPrevItem();
  }

  moveToPrevItem(): void {
    const { trackContainer, numberOfItems } = this
    let currentSlide = this.currentSlide
    trackContainer.children[currentSlide - 1].className = trackContainer.children[currentSlide - 1].className.replace("active", '').trim()
    if (currentSlide === 1) {
      trackContainer.children[numberOfItems - 1].className = (trackContainer.children[numberOfItems - 1].className + ' active').trim()
      this.currentSlide = numberOfItems
    } else {
      --currentSlide
      trackContainer.children[currentSlide - 1].className = (trackContainer.children[currentSlide - 1].className + ' active').trim()
      this.currentSlide = currentSlide
    }
  }
}

export default FadeSlider
