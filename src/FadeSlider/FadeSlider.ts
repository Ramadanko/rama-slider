import '../index.scss'
import './FadeSlider.scss'
import BasicSlider from '../BasicSlider/BasicSlider'
import OptionsInterface from '../BasicSlider/OptionsInterface'

class FadeSlider extends BasicSlider {

  protected activeElement: HTMLElement;
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
        item.className += ' active';
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
    trackContainer.children[currentSlide - 1].classList.remove('active')
    if (currentSlide === numberOfItems) {
      trackContainer.children[0].classList.add('active');
      this.currentSlide = 1
    } else {
      trackContainer.children[currentSlide].classList.add('active');
      ++this.currentSlide
    }
    this.activeElement =this.trackContainer.children[this.currentSlide - 1] as HTMLElement;
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
    trackContainer.children[currentSlide - 1].classList.remove('active')
    if (currentSlide === 1) {
      trackContainer.children[numberOfItems - 1].classList.add('active');
      this.currentSlide = numberOfItems
    } else {
      --currentSlide
      trackContainer.children[currentSlide - 1].classList.add('active');
      this.currentSlide = currentSlide
    }
    this.activeElement =this.trackContainer.children[this.currentSlide - 1] as HTMLElement;
  }
}

export default FadeSlider
