document.getElementById('viewSubscribers').addEventListener('click', function() {
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    const subscribersList = document.getElementById('subscribersList');

    // Clear previous list
    subscribersList.innerHTML = '';

    if (subscribers.length === 0) {
        subscribersList.innerHTML = '<p>No subscribers found.</p>';
        return;
    }

    const table = `
        <table>
            <thead>
                <tr>
                    <th>Serial Number</th>
                    <th>Full Name</th>
                    <th>Registration Number</th>
                    <th>Profile Code</th>
                    <th>Exam Town Code</th>
                    <th>Payment Image</th>
                    <th>Payment Method</th>
                    <th>Payment Type</th>
                    <th>Score</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${subscribers.map((subscriber, index) => `
                    <tr>
                        <td>${subscriber.serialNumber}</td>
                        <td>${subscriber.fullName}</td>
                        <td>${subscriber.registrationNumber || "NOT YET AVAILABLE"}</td>
                        <td>${subscriber.profileCode || "NOT YET AVAILABLE"}</td>
                        <td>${subscriber.examTownCode || "NOT YET AVAILABLE"}</td>
                        <td><img src="${subscriber.paymentImage}" alt="Payment Image" style="max-width: 100px;"/></td>
                        <td>${subscriber.paymentMethod}</td>
                        <td>${subscriber.paymentType}</td>
                        <td>${subscriber.score}</td>
                        <td><button onclick="editSubscriber(${index})">Edit</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    subscribersList.innerHTML = table;
});

function editSubscriber(index) {
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    const subscriber = subscribers[index];

    const fullName = prompt("Edit Full Name:", subscriber.fullName);
    const registrationNumber = prompt("Edit Registration Number:", subscriber.registrationNumber || "NOT YET AVAILABLE");
    const profileCode = prompt("Edit Profile Code:", subscriber.profileCode || "NOT YET AVAILABLE");
    const examTownCode = prompt("Edit Exam Town Code:", subscriber.examTownCode || "NOT YET AVAILABLE");
    const paymentMethod = prompt("Edit Payment Method (Direct System / Direct Mobile):", subscriber.paymentMethod);
    const paymentType = prompt("Edit Payment Type (Full Payment / Half Payment / Part Payment):", subscriber.paymentType);
    const score = prompt("Edit Score:", subscriber.score);

    const newPaymentImage = confirm("Would you like to upload a new image?");

    if (newPaymentImage) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = function() {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    subscribers[index] = { 
                        serialNumber: subscriber.serialNumber,
                        fullName: fullName || subscriber.fullName, 
                        registrationNumber: registrationNumber || "NOT YET AVAILABLE",
                        profileCode: profileCode || "NOT YET AVAILABLE",
                        examTownCode: examTownCode || "NOT YET AVAILABLE",
                        paymentImage: e.target.result, 
                        paymentMethod: paymentMethod || subscriber.paymentMethod, 
                        paymentType: paymentType || subscriber.paymentType, 
                        score: score || subscriber.score 
                    };
                    localStorage.setItem('subscribers', JSON.stringify(subscribers));
                    alert("Subscriber details updated!");
                    document.getElementById('viewSubscribers').click(); // Refresh the list
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click(); // Open file chooser
    } else {
        if (fullName || registrationNumber || profileCode || examTownCode || paymentMethod || paymentType || score) {
            subscribers[index] = { 
                serialNumber: subscriber.serialNumber,
                fullName: fullName || subscriber.fullName, 
                registrationNumber: registrationNumber || "NOT YET AVAILABLE",
                profileCode: profileCode || "NOT YET AVAILABLE",
                examTownCode: examTownCode || "NOT YET AVAILABLE",
                paymentImage: subscriber.paymentImage, 
                paymentMethod: paymentMethod || subscriber.paymentMethod, 
                paymentType: paymentType || subscriber.paymentType, 
                score: score || subscriber.score 
            };
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            alert("Subscriber details updated!");
            document.getElementById('viewSubscribers').click(); // Refresh the list
        } else {
            alert("No changes made.");
        }
    }
}
