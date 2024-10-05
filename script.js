// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_iktuz2ObIcBPEi3-_m2T7kfMBYkUt5s",
    authDomain: "database-4e74f.firebaseapp.com",
    projectId: "database-4e74f",
    storageBucket: "database-4e74f.appspot.com",
    messagingSenderId: "265280109467",
    appId: "1:265280109467:web:20142205ed7fe3fdbebf3e",
    measurementId: "G-JGBF0XTGTM"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById('subscriberForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const fullName = document.getElementById('fullName').value;
    const paymentImage = document.getElementById('paymentImage').files[0];
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const paymentType = document.getElementById('paymentType').value;
    const score = document.getElementById('score').value;

    if (!paymentImage) {
        alert("Please upload an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const subscriberData = {
            fullName,
            registrationNumber: "NOT YET AVAILABLE",
            profileCode: "NOT YET AVAILABLE",
            examTownCode: "NOT YET AVAILABLE",
            paymentImage: e.target.result, // Base64 encoded image
            paymentMethod,
            paymentType,
            score
        };

        // Push data to Firebase
        database.ref('subscribers').push(subscriberData)
            .then(() => {
                document.getElementById('message').innerText = 'Submission Successful!';
                document.getElementById('subscriberForm').reset(); // Reset the form
            })
            .catch((error) => {
                console.error("Error saving data:", error);
                alert("Failed to save data.");
            });
    };

    reader.readAsDataURL(paymentImage); // Convert image to Base64
});
