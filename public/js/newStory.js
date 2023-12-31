
const makeCharacter = async(event)=>{
  console.log(event)
  const element = event.target;
  const id = element.getAttribute('data-id');
  let save = 1;
  if(Number(id) === 1) {
    save = 8;
  }
  console.log(id)
  const response = await fetch('/api/characters', {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const update = await fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify({save}),
      headers: { 'Content-Type': 'application/json' },
    });
    if(update.ok){
      if(Number(id) === 1) {
        document.location.replace('/Goose');
      }
      else {
        document.location.replace('/adventure');
      }
    }
    else{
      alert(update.statusText);
      return;
    }
  } 
  else {
    alert(response.statusText);
  }
}

document
    .querySelector('.chosen0')
    .addEventListener('click', makeCharacter);

document
  .querySelector('.chosen1')
  .addEventListener('click', makeCharacter);

document
  .querySelector('.chosen2')
  .addEventListener('click', makeCharacter);

document
  .querySelector('.chosen3')
  .addEventListener('click', makeCharacter);