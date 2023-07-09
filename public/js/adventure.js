const firstChoice = document.querySelector('.chosen0');
const secondChoice = document.querySelector('.chosen1');
const thirdChoice = document.querySelector('.chosen2');
const fourthChoice = document.querySelector('.chosen3');

const chosenOption = async(event)=>{
  const element = event.target;
  const effect = element.getAttribute('data-effect');
  const save = element.getAttribute('data-next');

  const response = await fetch('/api/characters', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
  });


  if(response.ok){
    const character = await response.json();
    switch(effect){
      case 'fight':
        //lose some healthpoints and determine wither you die or survive
        if(character.stat.Attack > 10 || (character.stat.Defense >10) || (character.stat.Agility) > 10 ){
          if(character.stat.hp > 0 ) character.stat.hp--;
          else character.healthpoints--;
        }
        else{
          character.healthpoints = character.healthpoints - (character.hp- (10-character.Defense));
        }

        if(character.healthpoints <= 0){
          document.location.replace(`/ending/1`)
        }
        break;

      case 'Positive':
        //gain a stat boost or gain equipment item to improve stats
        character.healthpoints++
        break;

      case 'negative':
        //lose either health points or an equipment item
        if(character.equipment_id) character.equipment_id = null;
        else character.healthpoints--;
        break;
    }
    if(effect !== 'Neutal'){
      const update = await fetch('/api/characters', {
        method: 'PUT',
        body: JSON.stringify({ ...character }),
        headers: { 'Content-Type': 'application/json' },
      });
      if(!update.ok){
        alert(update.statusText);
        return;
      }
    }
    const userData = await fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify({ save }),
      headers: { 'Content-Type': 'application/json' },
    })
    document.location.replace(`/adventure/${save}`);
  }
  else{
    alert(response.statusText);
  }
  return;
}

if(fourthChoice){
  firstChoice.addEventListener('click', chosenOption);
  secondChoice.addEventListener('click', chosenOption);
  thirdChoice.addEventListener('click', chosenOption);
  fourthChoice.addEventListener('click', chosenOption);
}
else if(thirdChoice){
  firstChoice.addEventListener('click', chosenOption);
  secondChoice.addEventListener('click', chosenOption);
  thirdChoice.addEventListener('click', chosenOption);
}
else {
  firstChoice.addEventListener('click', chosenOption);
  secondChoice.addEventListener('click', chosenOption);
}
