const tasks = [
    { question: "_____ Norden regnet es mehr als _____ Süden.", answer: "Im - im" },
    { question: "_____ Küste gibt es immer Wind.", answer: "An der" },
    { question: "Viele Familien mit kleinen Kindern wohnen _____ Land.", answer: "auf dem" },
    { question: "Bei schönem Wetter fahren wir _____ See.", answer: "an den" },
    { question: "Wir müssen _____ Hauptbahnhof aussteigen.", answer: "am" },
    { question: "Warst du schon mal _____ Wüste?", answer: "in der" },
    { question: "Am Wochenende fahren wir _____ Berge.", answer: "in die" },
    { question: "Am Abend sind wir _____ Strand gegangen.", answer: "an den" },
    { question: "_____ Schwarzwald gibt es viele Kuckucksuhren.", answer: "Im" },
    { question: "Ich möchte mal wieder _____ Land fahren.", answer: "aufs" },
    { question: "Wir machen _____ Bodensee ein Picknick.", answer: "am" },
    { question: "Im Sommer fahren wir _____ Meer.", answer: "ans" },
    { question: "Hamburg liegt _____ Elbe (die).", answer: "an der" },
    { question: "Viele Vögel fliegen im Winter _____ Süden.", answer: "in den" },
    { question: "Sibel hat eine Arbeit _____ Schweiz gefunden.", answer: "in der" },
    { question: "Unser Hotel liegt direkt _____ Meer.", answer: "am" },
    { question: "_____ Insel Sylt ist es wunderschön.", answer: "Auf der" },
    { question: "Mein Onkel lebt _____ USA.", answer: "in den" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);