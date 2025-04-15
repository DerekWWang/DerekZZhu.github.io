const roles = ["Pentester", "ML Engineer", "Software Developer", "Guitarist"]
const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>/?";
const intervalSpeed = 75
let roleIndex = 0;

function animateRole(role, onComplete) {
    let iteration = 0;
    const roleElem = document.getElementById('role');
    
    const interval = setInterval(() => {
        const output = role.split('').map((char, index) => {
        if (index < iteration) {
            return role[index];
        }
        return randomChars[Math.floor(Math.random() * randomChars.length)];
        }).join('');
        roleElem.textContent = output;

        if (iteration >= role.length) {
            clearInterval(interval);
            
            setTimeout(() => {
                let deleteIteration = role.length;
                const deletionInterval = setInterval(() => {
                deleteIteration--;
                roleElem.textContent = role.slice(0, deleteIteration);
                if (deleteIteration <= 0) {
                    clearInterval(deletionInterval);
                    onComplete();
                }
                }, intervalSpeed);
            }, 1200);
        }
        iteration += 1/3;
    }, intervalSpeed);
    }

function cycleRoles() {
    const role = roles[roleIndex % roles.length];
    animateRole(role, () => {
        roleIndex++;
        cycleRoles();
    })
}

document.addEventListener("DOMContentLoaded", cycleRoles);