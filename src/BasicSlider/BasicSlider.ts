import './BasicSlider.scss'
import OptionsInterface from './OptionsInterface'
class BasicSlider {

  protected container: string | HTMLElement | any
  protected newContainer: HTMLElement
  protected containerClass: string
  protected trackContainer: HTMLElement
  protected nextButton: HTMLElement
  protected prevButton: HTMLElement
  protected numberOfItems: number
  protected currentSlide: number
  protected isTransitionActive: boolean = false
  protected options: OptionsInterface = {
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
    prevButtonClass: 'rama-slider-prev',
    animations: ['StripesIn'] //'StripesOut', 'SquaresIn', 'SquaresOut'
  };

  constructor(container: any, options: object) {
    this.container = container
    this.options = Object.assign(this.options, options)
    this.currentSlide = this.options.startAtItem
    this.init()
  }

  protected init(): void {
    let element = this.container
    this.containerClass = this.createSliderHtmlClass();
    if (typeof element === 'string') {
      let name = element.substring(1)
      this.container = element[0] === '.' ? document.getElementsByClassName(name)[0] : document.getElementById(name)
    }
    this.wrapItems()
    this.listenToFullScreenChange()
    this.done()
    this.prepareAnimation()
  }

  protected createSliderHtmlClass(): string {
    return 'rama-slider-basic'
  }

  protected wrapItems(): void {
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

  protected markSliderItems(): void {
    Array.from(this.container.children).forEach((item: HTMLElement, index: number) => {
      item.className = item.className.length ? `${item.className} rama-slider-item-${index}` : `rama-slider-item-${index}`;
    })
  }

  protected createTrack(trackWidth: number): HTMLElement {
    let translateValue: number =
      this.options.startAtItem <= this.numberOfItems ? (this.options.startAtItem - 1) / this.numberOfItems * 100 : 0
    this.trackContainer = document.createElement('div')
    this.trackContainer.className = 'rama-slider-track'
    if (this.containerClass === 'rama-slider-basic') {
      this.trackContainer.style.width = trackWidth + '%'
      this.trackContainer.style.transform = `translateX(-${translateValue}%)`
      this.trackContainer.style.transitionDuration = this.options.speed + 's'
    }
    this.trackContainer.innerHTML = this.container.innerHTML
    return this.trackContainer
  }

  protected createNextButton(): HTMLElement {
    let { nextButtonClass, nextButtonContent } = this.options
    let nextWrapper = document.createElement('div')
    nextWrapper.className = 'rama-slider-next-wrapper'
    let nextButton = document.createElement('span')
    nextButton.className = nextButtonClass
    nextButton.innerHTML = nextButtonContent
    this.nextButton = nextButton
    nextWrapper.appendChild(nextButton)
    nextButton.onclick = () => { this.goToNext(); }
    return nextWrapper
  }

  protected toggleTransition(): void {
    this.isTransitionActive = true
    setTimeout(() => {
      this.isTransitionActive = false
    }, this.options.speed * 1000)
  }

  protected createPrevButton(): HTMLElement {
    let { prevButtonClass, prevButtonContent } = this.options
    let prevWrapper = document.createElement('div')
    prevWrapper.className = 'rama-slider-prev-wrapper'
    let prevButton = document.createElement('span')
    prevButton.className = prevButtonClass
    prevButton.innerHTML = prevButtonContent
    this.prevButton = prevButton
    prevWrapper.appendChild(prevButton)
    prevButton.onclick = () => { this.goToPrev(); }
    return prevWrapper
  }

  goToNext(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransition()
    let translateValue: number = 0
    this.currentSlide = this.currentSlide < this.numberOfItems ? ++this.currentSlide : 1
    translateValue = (this.currentSlide - 1) / this.numberOfItems * 100
    this.trackContainer.style.transform = `translateX(-${translateValue}%)`
  }

  goToPrev(): void {
    if (this.isTransitionActive)
      return
    this.toggleTransition()
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
  protected done(): void {
    this.newContainer.style.display = 'block'
    this.newContainer.style.opacity = '1'
    this.newContainer.style.height = 'auto'
  }

  protected prepareAnimation(): void { }
}

module.exports = BasicSlider
