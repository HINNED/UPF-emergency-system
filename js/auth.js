// Authentication Logic
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            const stationKey = document.getElementById('stationKey') ? document.getElementById('stationKey').value : '';
            
            // Simple validation
            if (!username || !password || !role) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Check station key for station role
            if (role === 'station' && !stationKey) {
                alert('Please enter your station key');
                return;
            }
            
            // Mock authentication - in a real system, this would be an API call
            if (username && password) {
                // Store user session
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', username);
                localStorage.setItem('currentRole', role);
                
                // Redirect based on role
                switch(role) {
                    case 'officer':
                        window.location.href = 'officer-dashboard.html';
                        break;
                    case 'station':
                        window.location.href = 'station-dashboard.html';
                        break;
                    case 'admin':
                        window.location.href = 'admin-dashboard.html';
                        break;
                    default:
                        alert('Invalid role selected');
                }
            } else {
                alert('Invalid credentials');
            }
        });
    }
    
    // Logout functionality
    const logoutButtons = document.querySelectorAll('#logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentRole');
            window.location.href = ('index.html');
        });
    });
    
    // Check authentication on protected pages
    const protectedPages = ['officer-dashboard.html', 'station-dashboard.html', 'admin-dashboard.html'];
    if (protectedPages.some(page => window.location.pathname.endsWith(page))) {
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'index.html';
        } else {
            // Verify role access
            const currentRole = localStorage.getItem('currentRole');
            const currentPage = window.location.pathname.split('/').pop();
            
            if (
                (currentRole === 'officer' && currentPage !== 'officer-dashboard.html') ||
                (currentRole === 'station' && currentPage !== 'station-dashboard.html') ||
                (currentRole === 'admin' && currentPage !== 'admin-dashboard.html')
            ) {
                window.location.href = 'index.html';
            }
        }
    }
});
// In auth.js or a new validation.js file
function validateUgandanPhoneNumber(phone) {
    // Ugandan phone numbers: +256 or 0 followed by 7, 7, or 3 then 8 digits
    const regex = /^(?:\+256|0)(7[0-9]|3[0-9]|4[0-9]|9[0-9])[0-9]{7}$/;
    return regex.test(phone);
}

// Usage in forms:
document.getElementById('caller-phone').addEventListener('blur', function() {
    if (!validateUgandanPhoneNumber(this.value)) {
        showError(this, 'Please enter a valid Ugandan phone number (e.g., 0772123456 or +256772123456)');
    }
});// Create a validation.js file
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.rules = {};
        this.init();
    }

    addRule(field, rule, message) {
        if (!this.rules[field]) this.rules[field] = [];
        this.rules[field].push({ rule, message });
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validate()) {
                e.preventDefault();
            }
        });
    }

    validate() {
        let isValid = true;
        Object.keys(this.rules).forEach(field => {
            const input = this.form.querySelector(`[name="${field}"]`);
            const value = input.value.trim();

            this.rules[field].forEach(({ rule, message }) => {
                if (!rule(value)) {
                    showError(input, message);
                    isValid = false;
                }
            });
        });
        return isValid;
    }
}

// Usage example:
const caseValidator = new FormValidator('case-entry-form');
caseValidator.addRule('caller-phone', validateUgandanPhoneNumber, 'Invalid phone number');
// auth.js with enhanced security
document.addEventListener('DOMContentLoaded', function() {
    // Secure session management
    if (localStorage.getItem('authToken') && !isTokenValid(localStorage.getItem('authToken'))) {
        logout();
    }

    // Login form submission with token handling
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                role: document.getElementById('role').value,
                stationKey: document.getElementById('stationKey')?.value
            };

            try {
                const response = await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': getCSRFToken()
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                
                if (data.success) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('currentUser', data.user.username);
                    localStorage.setItem('currentRole', data.user.role);
                    
                    // Redirect based on role
                    redirectToDashboard(data.user.role);
                } else {
                    showError(data.message);
                }
            } catch (error) {
                showError('Network error. Please try again.');
            }
        });
    }
});

// Secure token validation
async function isTokenValid(token) {
    try {
        const response = await fetch('/api/validate-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}