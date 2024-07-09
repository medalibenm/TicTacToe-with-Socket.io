const listDiv = document.getElementById('list');
const form = document.getElementById('form');
var p = 0
var pre = document.getElementById('pre');
var next = document.getElementById('next');
var nbElement = 0


function fetchC(page) {
    axios.get(`http://localhost:3000/characters?p=${p}`)
        .then(response => {
            const characters = response.data;
            nbElement = characters.length
            listDiv.innerHTML=''
            characters.forEach(character => {
                const id = character['_id']
                const name = character['name'];
                const level = character['level'];
                const characterElement = document.createElement('div');
                characterElement.innerHTML = `
                    <h1>Name: ${name}</h1>
                    <p>Level: ${level}</p>
                    <button type="button" class="update-btn">UPDATE</button>
                    <button type="button" class="delete-btn">DELETE</button>
                    <button type="button" onclick="window.location.href='./xo.html'">PLAY</button>
                `;
                listDiv.appendChild(characterElement);

                const updateBtn = characterElement.querySelector('.update-btn');
                updateBtn.addEventListener('click', () => {
                const updatedName = prompt('Enter updated name',name)
                const updatedLevel = prompt('Enter updated age',level)

                axios.put(`http://localhost:3000/characters/${id}`,{name:updatedName,level:updatedLevel}).then(response=>{
                    characterElement.innerHTML = `
                        <h1>Name: ${updatedName}</h1>
                        <p>Level: ${updatedLevel}</p>
                        <button type="button" class="update-btn">UPDATE</button>
                        <button type="button" class="delete-btn">DELETE</button>
                    `;
                    location.reload(true);
                })
                });
                

                const deleteBtn = characterElement.querySelector('.delete-btn');
deleteBtn.addEventListener('click', () => {
                        axios.delete(`http://localhost:3000/characters/${id}`).then(response=>{
                            characterElement.remove()
                        })

                               
});
            });

            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}


next.addEventListener('click', () => {
    if (nbElement != 0) {
        p = p+ 1;
    fetchC(p);
    console.log(p)
    }
});

pre.addEventListener('click', () => {
    if (p > 0) {
        p =p-1;
        console.log(p)
        fetchC(p);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fetchC(p);
    });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    var level = document.getElementById('level').value;
    level = parseInt(level,10)
    

    if (!name || !level) {
        alert('Name and level are required');
        return;
    }



    axios.post('http://localhost:3000/characters', { name, level })
        .then(response => {
            const characterElement = document.createElement('div');
            characterElement.innerHTML = `
                <h1>Name: ${name}</h1>
                <p>Level: ${level}</p>
                <button type="button" class="update-btn">UPDATE</button>
                <button type="button" class="delete-btn">DELETE</button>
            `;
            listDiv.appendChild(characterElement);
            form.reset();  
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
});





