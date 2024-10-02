document.getElementById('subscriberForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const registrationNumber = "NOT YET AVAILABLE"; // Default value
    const profileCode = "NOT YET AVAILABLE"; // Default value
    const examTownCode = "NOT YET AVAILABLE"; // Default value

    // Check if the subscriber already exists
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    const exists = subscribers.some(subscriber => subscriber.fullName.toLowerCase() === fullName.toLowerCase());

    if (exists) {
        alert("You have already subscribed!");
        return;
    }

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
        const serialNumber = subscribers.length + 1; // Generate serial number
        subscribers.push({
            serialNumber,
            fullName,
            registrationNumber,
            profileCode,
            examTownCode,
            paymentImage: e.target.result,
            paymentMethod,
            paymentType,
            score
        });
        localStorage.setItem('subscribers', JSON.stringify(subscribers));

        document.getElementById('message').innerText = 'Subscribed successfully!';
        document.getElementById('subscriberForm').reset();
    };
    
    reader.readAsDataURL(paymentImage);
});
