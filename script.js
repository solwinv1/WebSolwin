// Firebase configuration and functionality
const firebaseConfig = {
    apiKey: "AIzaSyCo-PTm-FmBveqqUaHF0zOf0r30r4azNOE",
    authDomain: "solwinv1-68380.firebaseapp.com",
    databaseURL: "https://solwinv1-68380-default-rtdb.firebaseio.com",
    projectId: "solwinv1-68380",
    storageBucket: "solwinv1-68380.appspot.com",
    messagingSenderId: "687098585013",
    appId: "1:687098585013:web:0afd433f7e1775ed5483fc",
    measurementId: "G-53T2H66BWB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Helper function to check for "nan" or empty values and replace them with 0.0
function formatValue(value) {
    return (!value || value === "nan" || isNaN(value)) ? "0.0" : value;
}

function updateDataDisplay(data) {
    const solarButtonLabel = document.getElementById('solarButton').textContent;
    const windButtonLabel = document.getElementById('windButton').textContent;

    document.getElementById('Bat').textContent = formatValue(data.Bat);

    if (solarButtonLabel === 'Turn On Solar') {
        document.getElementById('SolVolt').textContent = '0.0';
        document.getElementById('SolCurrent').textContent = '0.0';
    } else {
        document.getElementById('SolVolt').textContent = formatValue(data.SolVolt);
        document.getElementById('SolCurrent').textContent = formatValue(data.SolCurrent);
    }

    if (windButtonLabel === 'Turn On Wind') {
        document.getElementById('WindVolt').textContent = '0.0';
        document.getElementById('WindCurrent').textContent = '0.0';
    } else {
        document.getElementById('WindVolt').textContent = formatValue(data.WindVolt);
        document.getElementById('WindCurrent').textContent = formatValue(data.WindCurrent);
    }
}

// Fetch data from Firebase Realtime Database
const dataRef = database.ref('/');
dataRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        updateDataDisplay(data);
    } else {
        updateDataDisplay({
            Bat: 0.0,
            SolCurrent: 0.0,
            SolVolt: 0.0,
            WindCurrent: 0.0,
            WindVolt: 0.0
        });
    }
});

// Button click events to toggle solar and wind systems
document.getElementById('solarButton').addEventListener('click', function() {
    const buttonLabel = document.getElementById('solarButton').textContent;

    if (buttonLabel === 'Turn On Solar') {
        document.getElementById('solarButton').textContent = 'Turn Off Solar';
        database.ref('/solarControl').set("turn on");
    } else {
        document.getElementById('solarButton').textContent = 'Turn On Solar';
        database.ref('/solarControl').set("turn off");
    }
});

document.getElementById('windButton').addEventListener('click', function() {
    const buttonLabel = document.getElementById
