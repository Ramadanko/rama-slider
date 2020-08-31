import './BasicSlider.scss'
import OptionsInterface from './OptionsInterface'
class BasicSlider {

  container: any
  newContainer: HTMLElement
  containerClass: string = 'rama-slider-basic'
  trackContainer: HTMLElement
  nextButton: HTMLElement
  prevButton: HTMLElement
  numberOfItems: number
  currentSlide: number
  isTransitionActive: boolean
  options: OptionsInterface = {
    width: '600px',
    speed: .5,
    timeout: 5,
    autoPlay: true,
    itemsPerSlide: 1,
    afterChange: null,
    beforeChange: null,
    startAtItem: 1,
    nextButtonClass: 'rama-slider-next',
    nextButtonContent: 'Next',
    prevButtonContent: 'Prev',
    prevButtonClass: 'rama-slider-prev'
  };

  constructor(container: any, options: object) {
    this.container = container
    this.options = Object.assign(this.options, options)
    this.currentSlide = this.options.startAtItem
    this.init()
  }

  init(): void {
    let element = this.container
    if (typeof element === 'string') {
      let name = element.substring(1)
      this.container = element[0] === '.' ? document.getElementsByClassName(name)[0] : document.getElementById(name)
    }
    this.wrapItems()
    this.listenToFullScreenChange()
  }

  wrapItems(): void {
    this.newContainer = this.container.cloneNode()
    this.newContainer.className += ` ${this.containerClass}`
    this.numberOfItems = this.container.children.length
    let trackWidth: number = this.container.children.length * 100
    this.newContainer.style.width = this.options.width
    this.markSliderItems()
    this.newContainer.appendChild(this.createTrack(trackWidth))
    this.newContainer.appendChild(this.createNextButton())
    this.newContainer.appendChild(this.createPrevButton())
    this.container.replaceWith(this.newContainer)
  }

  markSliderItems(): void {
    Array.from(this.container.children).forEach((item: HTMLElement, index: number) => {
      item.className = item.className.length ? `${item.className} rama-slider-item-${index}` : `rama-slider-item-${index}`;
    })
  }

  createTrack(trackWidth: number): HTMLElement {
    let translateValue: number =
      this.options.startAtItem <= this.numberOfItems ? (this.options.startAtItem - 1) / this.numberOfItems * 100 : 0
    this.trackContainer = document.createElement('div')
    this.trackContainer.className = 'rama-slider-track'
    this.trackContainer.style.width = trackWidth + '%'
    this.trackContainer.style.transform = `translateX(-${translateValue}%)`
    this.trackContainer.style.transitionDuration = this.options.speed + 's'
    this.trackContainer.innerHTML = this.container.innerHTML
    return this.trackContainer
  }

  createNextButton(): HTMLElement {
    let { nextButtonClass, nextButtonContent } = this.options
    let nextWrapper = document.createElement('div')
    nextWrapper.className = 'rama-slider-next-wrapper'
    let nextButton = document.createElement('span')
    nextButton.className = nextButtonClass
    nextButton.innerHTML = nextButtonContent
    this.nextButton = nextButton
    nextWrapper.appendChild(nextButton)
    nextButton.onclick = () => { this.goToNext(); this.toggleTransition() }
    return nextWrapper
  }

  toggleTransition(): void {
    this.isTransitionActive = true
    setTimeout(() => {
      this.isTransitionActive = false
    }, this.options.speed * 1000)
  }

  createPrevButton(): HTMLElement {
    let { prevButtonClass, prevButtonContent } = this.options
    let prevWrapper = document.createElement('div')
    prevWrapper.className = 'rama-slider-prev-wrapper'
    let prevButton = document.createElement('span')
    prevButton.className = prevButtonClass
    prevButton.innerHTML = prevButtonContent
    this.prevButton = prevButton
    prevWrapper.appendChild(prevButton)
    prevButton.onclick = () => { this.goToPrev(); this.toggleTransition() }
    return prevWrapper
  }

  goToNext(): void {
    if (this.isTransitionActive)
      return
    let translateValue: number = 0
    this.currentSlide = this.currentSlide < this.numberOfItems ? ++this.currentSlide : 1
    translateValue = (this.currentSlide - 1) / this.numberOfItems * 100
    this.trackContainer.style.transform = `translateX(-${translateValue}%)`
  }

  goToPrev(): void {
    if (this.isTransitionActive)
      return
    let translateValue: number = 0
    this.currentSlide = this.currentSlide > 1 ? --this.currentSlide : this.numberOfItems
    translateValue = (this.currentSlide - 1) / this.numberOfItems * 100
    this.trackContainer.style.transform = `translateX(-${translateValue}%)`
  }

  fullScreenMode(): void {
    this.newContainer.className += ' in-fullScreenMode'
    this.newContainer.requestFullscreen()
  }

  listenToFullScreenChange(): void {
    this.newContainer.onfullscreenchange = () => {
      if (document.fullscreenElement === null)
        this.newContainer.className = this.newContainer.className.replace("in-fullScreenMode", '')
    }
  }
}

module.exports = BasicSlider
