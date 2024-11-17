document.addEventListener('DOMContentLoaded', () => {
    const users = [
        { userId: 'Arib', password: 'Arib6303', role: 'user', details: 'Appointment with Dr. Smith at 10:00 AM, Room 305.' },
        { userId: 'Surendar', password: 'pijam123', role: 'user', details: 'Appointment with Dr. John at 11:00 AM, Room 204.' },
        { userId: 'Labeeb', password: '1234', role: 'user', details: 'Appointment with Dr. Alice at 12:00 PM, Room 101.' },
        { userId: 'Fahim', password: 'Pijam123', role: 'admin' },
        { userId: 'Ayoob', password: 'Pijam123', role: 'admin' }
    ];

    document.getElementById('userLogin')?.addEventListener('click', () => {
        window.location.href = 'login.html?role=user';
    });

    document.getElementById('adminLogin')?.addEventListener('click', () => {
        window.location.href = 'login.html?role=admin';
    });

    const loginForm = document.getElementById('loginForm');
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const userId = document.getElementById('userId').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = new URLSearchParams(window.location.search).get('role');

        const user = users.find(u => u.userId === userId && u.password === password && u.role === role);

        if (user) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'appointment.html';
        } else {
            document.getElementById('errorMessage').textContent = 'Invalid User ID or Password!';
        }
    });

    if (window.location.pathname.includes('appointment.html')) {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
        const appointmentDetails = document.getElementById('appointmentDetails');
        const adminOptions = document.getElementById('adminOptions');

        if (user.role === 'user') {
            appointmentDetails.textContent = user.details;
        } else if (user.role === 'admin') {
            appointmentDetails.textContent = 'Admin Panel';
            adminOptions.style.display = 'block';
        }
    }
});
