interface SliderOptions {
  width?: string,
  speed?: number,
  timeout?: number,
  autoPlay?: boolean,
  itemsPerSlide?: number,
  afterChange?: Function,
  beforeChange?: Function,
  startAtItem?: number,
  nextButtonClass?: string,
  nextButtonContent?: string,
  prevButtonContent?: string,
  prevButtonClass?: string,
  animations?: Array<string>
}

export default SliderOptions
