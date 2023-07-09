
const chosenOption = async(event)=>{
  const element = event.target;
  const effect = element.getAttribute('data-effect');
  const next_id = element.getAttribute('data-next');
  switch(effect){
    case 'fight':
      //lose some healthpoints and determine wither you die or survive
      const response = await fetch('/api/characters', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
      });
      if(response){
        const character = await response.json();
        console.log(character)
      }
      break;
    case 'Neutral':
      //do nothing procced to the next scene
      response = await fetch('/api') {
        method: 'GET',
        headers: 
      }
      break;
    case 'Positive':
      //gain an equipment item to improve stats
      break;
    case 'negative':
      //lose either health points or an equipment item
      break;
  }
  return;
}

document.querySelector('.chosen0')
  .addEventListener('click', chosenOption);

document.querySelector('.chosen1')
  .addEventListener('click', chosenOption);

document.querySelector('.chosen2')
  .addEventListener('click', chosenOption);

document.querySelector('.chosen3')
  .addEventListener('click', chosenOption);