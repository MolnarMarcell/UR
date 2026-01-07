let kontener = document.createElement('div');
kontener.id = 'kontener';
document.body.appendChild(kontener);

// külön elem az űrhajósok számának
let astronautakSzama = document.createElement('h2');
astronautakSzama.id = 'astronauts';
document.body.insertBefore(astronautakSzama, kontener);

function megjelenitAdatok(adatok) {
    astronautakSzama.textContent = `Űrben tartózkodók száma: ${adatok.number}`;

    adatok.people.forEach(person => {
        let kartya = document.createElement('div');
        kartya.classList.add('kartya');

        kartya.innerHTML = `
            <p><strong>Név:</strong> ${person.name}</p>
            <p><strong>Űrállomás:</strong> ${person.craft}</p>
        `;

        kontener.appendChild(kartya);
    });
}

fetch('http://api.open-notify.org/astros.json')
    .then(response => response.json())
    .then(data => megjelenitAdatok(data))
    .catch(error => console.error('Hiba történt az adatok lekérése során:', error));
