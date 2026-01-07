let kontener = document.createElement('div');
kontener.className = 'cards-grid';
document.body.appendChild(kontener);

let select = document.getElementById("station-filter");

let astronautak = [];

let emberek = document.getElementById("emberek");

let db = 0;

function megjelenitKartyak(lista) {
    kontener.innerHTML = "";

    lista.forEach(person => {
        let kartya = document.createElement('div');
        kartya.classList.add('card');

        kartya.innerHTML = `
            <p><strong>Név:</strong> ${person.name}</p>
            <p><strong>Űrállomás:</strong> ${person.craft}</p>
        `;
        db++;
        emberek.textContent = `${db}`;

        kontener.appendChild(kartya);
    });
}

function feltoltAllomasok(lista) {
    let allomasok = [...new Set(lista.map(p => p.craft))];

    allomasok.forEach(allomas => {
        let option = document.createElement("option");
        option.value = allomas;
        option.textContent = allomas;
        select.appendChild(option);
    });
}

select.addEventListener("change", function () {
    let kivalasztott = this.value;

    if (kivalasztott === "all") {
        megjelenitKartyak(astronautak);
    } else {
        let szurt = astronautak.filter(p => p.craft === kivalasztott);
        megjelenitKartyak(szurt);
    }
});


let spinner = document.getElementById("spinner");

spinner.style.display = "block";

fetch('http://api.open-notify.org/astros.json')
    .then(response => response.json())
    .then(data => {
        astronautak = data.people;
        feltoltAllomasok(astronautak);
        megjelenitKartyak(astronautak);
    })
    .catch(error => {
        console.error('Hiba:', error);
        alert('Hiba történt az adatok lekérése során.');
    })
    .finally(() => {
        spinner.style.display = "none";
    });
