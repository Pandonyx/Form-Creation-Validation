document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const feedbackDiv = document.getElementById('form-feedback');

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    function showIndividualFeedback(inputElement, message, isError = true) {
        let feedbackElement = inputElement.nextElementSibling;
        if (!feedbackElement || !feedbackElement.classList.contains('input-feedback')) {
            feedbackElement = document.createElement('div');
            feedbackElement.classList.add('input-feedback');
            inputElement.parentNode.insertBefore(feedbackElement, inputElement.nextSibling);
        }
        feedbackElement.textContent = message;
        feedbackElement.style.color = isError ? '#dc3545' : '#28a745';
        feedbackElement.style.display = 'block';
    }

    function hideIndividualFeedback(inputElement) {
        const feedbackElement = inputElement.nextElementSibling;
        if (feedbackElement && feedbackElement.classList.contains('input-feedback')) {
            feedbackElement.style.display = 'none';
        }
    }

    usernameInput.addEventListener('input', () => {
        const username = usernameInput.value.trim();
        if (username.length < 3) {
            showIndividualFeedback(usernameInput, 'Username must be at least 3 characters long.');
        } else {
            hideIndividualFeedback(usernameInput);
        }
    });

    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showIndividualFeedback(emailInput, 'Please enter a valid email address (e.g., user@example.com).');
        } else {
            hideIndividualFeedback(emailInput);
        }
    });

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value.trim();
        // Password strength regex: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

        if (password.length < 8) {
            showIndividualFeedback(passwordInput, 'Password must be at least 8 characters long.');
        } else if (!passwordRegex.test(password)) {
            showIndividualFeedback(passwordInput, 'Password must include uppercase, lowercase, number, and special character.');
        } else {
            hideIndividualFeedback(passwordInput);
        }
    });


    // --- Form Submission Validation ---
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        let isValid = true;
        const messages = [];

        feedbackDiv.style.display = 'none';
        feedbackDiv.textContent = '';
        document.querySelectorAll('.input-feedback').forEach(el => el.style.display = 'none');


        // Validate Username
        if (username.length === 0) {
            isValid = false;
            messages.push('Username cannot be empty.');
            showIndividualFeedback(usernameInput, 'Username cannot be empty.');
        } else if (username.length < 3) {
            isValid = false;
            messages.push('Username must be at least 3 characters long.');
            showIndividualFeedback(usernameInput, 'Username must be at least 3 characters long.');
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) { // Allow letters, numbers, and underscores
            isValid = false;
            messages.push('Username can only contain letters, numbers, and underscores.');
            showIndividualFeedback(usernameInput, 'Username can only contain letters, numbers, and underscores.');
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length === 0) {
            isValid = false;
            messages.push('Email cannot be empty.');
            showIndividualFeedback(emailInput, 'Email cannot be empty.');
        } else if (!emailRegex.test(email)) {
            isValid = false;
            messages.push('Please enter a valid email address (e.g., user@example.com).');
            showIndividualFeedback(emailInput, 'Please enter a valid email address (e.g., user@example.com).');
        }

        // Validate Password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        if (password.length === 0) {
            isValid = false;
            messages.push('Password cannot be empty.');
            showIndividualFeedback(passwordInput, 'Password cannot be empty.');
        } else if (password.length < 8) {
            isValid = false;
            messages.push('Password must be at least 8 characters long.');
            showIndividualFeedback(passwordInput, 'Password must be at least 8 characters long.');
        } else if (!passwordRegex.test(password)) {
            isValid = false;
            messages.push('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            showIndividualFeedback(passwordInput, 'Password must include uppercase, lowercase, number, and special character.');
        }

        // Display overall feedback
        feedbackDiv.style.display = 'block';
        if (isValid) {
            feedbackDiv.textContent = 'Registration successful!';
            feedbackDiv.style.color = '#28a745';
            console.log('Form submitted successfully:', { username, email, password });
            form.submit();
        } else {
            if (messages.length > 0) {
                feedbackDiv.innerHTML = 'Please correct the following errors:<br>' + messages.join('<br>');
                feedbackDiv.style.color = '#dc3545';
            } else {
                feedbackDiv.style.display = 'none'; // Hide if no general messages but individual errors shown
            }
        }
    });
});