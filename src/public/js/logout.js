document.addEventListener('DOMContentLoaded', function() {
    var logoutButton = document.getElementById('logout');

    logoutButton.addEventListener('click', function() {
        console.log('cerrando sesion');

        fetch('/logout', {
            method: 'GET', // O POST, según la configuración de tu servidor
            credentials: 'same-origin' // Si estás haciendo la solicitud desde el mismo origen
        })
        .then(function(response) {
            if (response.redirected) {
                window.location.href = response.url; // Redirigir al usuario a la página de inicio de sesión
            }
        })
        .catch(function(error) {
            console.log('Error al cerrar sesión:', error);
        });
    });
});
