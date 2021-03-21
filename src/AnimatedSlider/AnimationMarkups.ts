const calculateVariables = (container: HTMLElement) => {
  let stripesWidth: string, backgroundSize: string, counter: number;
  if (container.offsetWidth > 300) {
    counter = 20;
    stripesWidth = '5%';
    backgroundSize = '2000%';
  } else {
    counter = 10;
    stripesWidth = '10%';
    backgroundSize = '1000%';
  }
  return {
    counter,
    stripesWidth,
    backgroundSize,
  };
};

function StripesOut(container?: HTMLElement, animationSpeed?: number, sequential?: boolean): string {
  const { counter, stripesWidth, backgroundSize } = calculateVariables(container);
  let markup = '';
  const styles = `
  float:left;width: ${stripesWidth};background-size: ${backgroundSize} 100%;
  transition-duration:${animationSpeed}s`;
  let position: number;
  if (sequential) {
    for (let i = 0; i < counter; i++) {
      position = (i / counter) * 105.25;
      markup += `
      <div class="image-portion" style="${styles};transition-delay: ${(i * 0.1).toFixed(1)}s;
      background-position:${position.toFixed(2)}% 0;"></div>`;

      // position = (i / 20) * container.offsetWidth;
      // markup += `
      // <div class="image-portion" style="${styles};transition-delay: ${(i * 0.1).toFixed(1)}s;
      // background-position:${-position}px 0;"></div>`;
    }
  } else {
    for (let i = 0; i < counter; i++) {
      position = (i / counter) * 100;
      markup += `
      <div class="image-portion" style="${styles};background-position:${position}% 0px;"></div>`;
    }
  }
  return markup;
}
function StripesOutSequential(container?: HTMLElement, animationSpeed?: number): string {
  return StripesOut(container, animationSpeed, true);
}

const BoxesOut = (container?: HTMLElement, animationSpeed?: number): string => {
  let markup = '';
  let styles = '';
  const boxes = container.offsetHeight <= 650 ? 3 : 4;
  const boxHeight = (100 / boxes).toFixed(1);
  const backgroundSize = '1000% ' + boxes * 100 + '%';
  styles = `float:left;width: 10%;height:${boxHeight}%;background-size:${backgroundSize};
  transition-duration:${animationSpeed}s;transition-delay: .05s;`;
  let x,
    y = 0,
    xCounter = 0;
  for (let i = 0; i < boxes * 10; i++) {
    if (i % 10 === 0 && i !== 0) {
      xCounter = 0;
      y = boxes === 3 ? y + 50 : y + 33.33333333;
    }
    x = (xCounter * 11.1).toFixed(1) + '%';
    //styles = styles.replace(/[\n|\r|\s]*/g, '');
    markup += `<div class="image-portion"
    style="${styles} background-position: ${x} ${y}%"></div>`;
    xCounter++;
  }

  return markup;
};

export default {
  StripesOut,
  BoxesOut,
  StripesOutSequential,
};
