function StripesOut(imageUrl: string, container?: HTMLElement, animationSpeed?: number): string {
  let markup = '';
  const styles = `
  background-size: 1000% 100%;
  transition-delay: .05s;
  background-repeat: no-repeat;
  transition-duration:${animationSpeed}s;
  background-position:`;
  for (let i = 0; i < 10; i++) {
    markup += `<div class="image-portion" style="${styles}${(i * 11.1).toFixed(1)}% 0px; float:left"></div>`
  }
  return markup
}

const BoxesOut = (imageUrl: string, container?: HTMLElement, animationSpeed?: number): string => {
  let markup = '', styles = ''
  const boxes = container.offsetHeight <= 650 ? 3 : 4
  const boxHeight = (100 / boxes).toFixed(1)
  const backgroundSize = '1000% ' + boxes * 100 + '%'
  styles = `
  background-repeat:no-repeat;
  background-size:${backgroundSize};
  float:left;
  width: 10%;
  height:${boxHeight}%;
  transition-duration:${animationSpeed}s;
  transition-delay: .05s;`;
  let x, y = 0, xCounter = 0
  for (let i = 0; i < boxes * 10; i++) {
    if (i % 10 === 0 && i !== 0) {
      xCounter = 0
      y = boxes === 3 ? y + 50 : y + 33.33333333
    }
    x = (xCounter * 11.1).toFixed(1) + '%'
    markup += `<div class="image-portion" style="${styles} background-position: ${x} ${y}%"></div>`
    xCounter++;
  }

  return markup
}

export default {
  StripesOut,
  BoxesOut
}
