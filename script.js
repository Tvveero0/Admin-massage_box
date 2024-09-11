let customerMessages = [];
let adminMessages = [];
let adminLoggedIn = false;
let adminKey = "itsme";

// Function to send a message from the customer
function sendCustomerMessage() {
    let message = document.getElementById('customerInput').value;
    if (message) {
        customerMessages.push("Customer: " + message);
        updateChat('customer');
        document.getElementById('customerInput').value = '';
        if (!adminLoggedIn) {
            // Show "admin is offline" message only the first time
            if (adminMessages.length === 0) {
                adminMessages.push("Admin is offline. COME in after 10 minutes.");
                updateChat('admin');
            }
        }
    }
}

// Function to send a message from the admin
function sendAdminMessage() {
    let message = document.getElementById('adminInput').value;
    if (message) {
        adminMessages.push("Admin: " + message);
        updateChat('customer');
        updateChat('admin');
        document.getElementById('adminInput').value = '';
    }
}

// Update chat window for both customer and admin
function updateChat(user) {
    if (user === 'customer') {
        let chatBox = document.getElementById('customerChatBox');
        chatBox.innerHTML = '';
        customerMessages.concat(adminMessages).forEach(function(msg) {
            let msgElement = document.createElement('p');
            msgElement.textContent = msg;
            chatBox.appendChild(msgElement);
        });
    } else if (user === 'admin') {
        let chatBox = document.getElementById('adminChatBox');
        chatBox.innerHTML = '';
        customerMessages.concat(adminMessages).forEach(function(msg) {
            let msgElement = document.createElement('p');
            msgElement.textContent = msg;
            chatBox.appendChild(msgElement);
        });
    }
}

// Show admin login input
function showAdminLogin() {
    document.getElementById('adminLoginPanel').style.display = 'block';
    document.getElementById('adminLoginBtn').style.display = 'none';
}

// Check admin key for login
function checkAdminKey() {
    let enteredKey = document.getElementById('adminKeyInput').value;
    if (enteredKey === adminKey) {
        adminLoggedIn = true;
        document.getElementById('adminLoginPanel').style.display = 'none';
        document.getElementById('adminWindow').style.display = 'block';
        updateChat('admin');
    } else {
        alert('Incorrect key!');
    }
}

// Logout admin
function logoutAdmin() {
    adminLoggedIn = false;
    document.getElementById('adminWindow').style.display = 'none';
    document.getElementById('adminLoginBtn').style.display = 'block';
}