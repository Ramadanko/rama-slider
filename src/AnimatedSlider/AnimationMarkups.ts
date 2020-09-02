function StripesIn(imageUrl): string {
  let markup: string = '';
  let styles = `background-size: 1000% 100%; background-image: url(${imageUrl}); background-repeat: no-repeat; background-position:`;
  for (let i = 0; i < 10; i++) {
    markup += `<div class="image-portion" style="${styles}${(i * 11.1).toFixed(1)}% 0px"></div>`
  }
  return markup
}

module.exports = {
  StripesIn
}
