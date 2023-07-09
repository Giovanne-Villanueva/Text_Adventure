const resume = document.querySelector('.continue');
const del = document.querySelector('.delete');
const newStory = document.querySelector('.newStory')

const setAdventure = (event)=>{
  const element = event.target;
  const story_id = element.getAttribute('data-story');
  if(story_id){
    document.location.replace(`/adventure/${story_id}`)
  }
}

const deleteAdventure = async(event)=>{
  const element = event.target;
  const id = element.getAttribute('data-character')
  const newStory = element.getAttribute('data-new')
  if(id){
    const response = await fetch('/api/characters', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok){
      if(newStory) document.location.replace('/newStory')

      else document.location.reload();
    }
    else{
      alert(response.statusText);
    }
  }
  else{
    document.location.replace('/newStory')
  }
}



if(resume && del){
  resume.addEventListener('click', setAdventure);
  del.addEventListener('click', deleteAdventure);
}

newStory.addEventListener('click', deleteAdventure);
