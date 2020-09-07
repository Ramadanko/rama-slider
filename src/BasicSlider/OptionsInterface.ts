interface SliderOptions {
  width?: string,
  speed?: number,
  timeout?: number,
  autoPlay?: boolean,
  itemsPerSlide?: number,
  afterChange?: () => void,
  beforeChange?: () => void,
  startAtItem?: number,
  nextButtonClass?: string,
  nextButtonContent?: string,
  prevButtonContent?: string,
  prevButtonClass?: string,
  animations?: Array<string>,
  animationSpeed: number
}

export default SliderOptions
