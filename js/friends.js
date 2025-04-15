import data from '../media/friends.json' with {type: "json"};

console.log(data);


data.friends.forEach((friend, i) => {
    console.log(friend);
    
    const div = document.createElement('div');
    div.innerHTML = `
        <h2><a href="${friend.link}">${friend.name}</a></h2>
        <div>${friend.desc}</div>
        <div class='skills'>
            <span>Skills: ${friend.skills.map(s => `<span class="skill">${s}</span>`).join(' ')}</span>
        </div>
    `;
    div.classList.add('card');

    document.querySelector('.grid-container').appendChild(div);
});
