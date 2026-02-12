const form = document.getElementById("signupForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");
const strength = document.getElementById("strength");

// Utility function to show error
function showError(input, message) {
    const error = input.parentElement.querySelector(".error");
    error.textContent = message;
}

// Clear error
function clearError(input) {
    const error = input.parentElement.querySelector(".error");
    error.textContent = "";
}

// Email validation
function validateEmail(emailValue) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
}

// Password strength checker
password.addEventListener("input", () => {
    const value = password.value;
    let strengthLevel = 0;

    if (value.length >= 8) strengthLevel++;
    if (/[A-Z]/.test(value)) strengthLevel++;
    if (/[0-9]/.test(value)) strengthLevel++;
    if (/[^A-Za-z0-9]/.test(value)) strengthLevel++;

    if (strengthLevel <= 1) {
        strength.style.background = "red";
        strength.style.width = "25%";
    } else if (strengthLevel === 2) {
        strength.style.background = "orange";
        strength.style.width = "50%";
    } else if (strengthLevel === 3) {
        strength.style.background = "yellow";
        strength.style.width = "75%";
    } else {
        strength.style.background = "green";
        strength.style.width = "100%";
    }
});

// Form submit validation
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    // Full Name
    if (fullname.value.trim().length < 3) {
        showError(fullname, "Name must be at least 3 characters.");
        valid = false;
    } else clearError(fullname);

    // Email
    if (!validateEmail(email.value)) {
        showError(email, "Enter a valid email address.");
        valid = false;
    } else clearError(email);

    // Phone
    if (!/^[0-9]{10}$/.test(phone.value)) {
        showError(phone, "Enter a valid 10-digit phone number.");
        valid = false;
    } else clearError(phone);

    // Password
    if (password.value.length < 8) {
        showError(password, "Password must be at least 8 characters.");
        valid = false;
    } else clearError(password);

    // Confirm Password
    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "Passwords do not match.");
        valid = false;
    } else clearError(confirmPassword);

    // Terms
    if (!terms.checked) {
        showError(terms, "You must accept the terms.");
        valid = false;
    }

    if (valid) {
        alert("Account created successfully!");
        form.reset();
        strength.style.width = "0";
    }
});
