
const makeCharacter = async(event)=>{
  console.log(event)
  const element = event.target;
  const id = element.getAttribute('data-id');
  console.log(id)
  const response = await fetch('/api/characters', {
    method: 'PUT',
    body: JSON.stringify({id}),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/adventure');
  } else {
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