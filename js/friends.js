// import data from '../media/friends.json' with {type: "json"};

// console.log(data);

let data = {
    "friends": [
        {
            "name": "Alex Niu",
            "link": "https://www.linkedin.com/in/alexniu100/",
            "desc": "A highly motivated software engineer with strong leadership and management skills.",
            "skills": ["Fullstack Development", "Java", "Typescript"]
        },
        {
            "name": "Hoang Ngyuen",
            "link":"https://www.kipiiler.me/",
            "desc":"Vietnamese",
            "skills": ["C/C++", "Computer Graphics", "Ligma"]
        },
        {
            "name": "Joshua Jung",
            "link":"https://www.linkedin.com/in/joshua-jung04/",
            "desc":"Extremely strong software developer with knack for building scalable systems.",
            "skills": ["Fullstack Development", "Java", "Typescript"]
        },
        {
            "name": "Micheal Li",
            "link":"https://ml72.github.io/",
            "desc":"Strong and passionate software developer & AI researcher",
            "skills": ["Machine Learning", "AI Research", "Java"]
        },
        {
            "name": "Eric Bae",
            "link":"https://www.linkedin.com/in/ericbae1/",
            "desc":"Visionary 🔭",
            "skills": ["C/C++", "Computer Graphics", "Java"]
        }
    ]
};

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
