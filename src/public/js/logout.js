document.addEventListener('DOMContentLoaded', function() {
    var logoutButton = document.getElementById('logout');
  
    logoutButton.addEventListener('click', function() {
      console.log('Cerrando sesión');
  
      fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin'
      })
        .then(function(response) {
          if (response.redirected) {
            window.location.href = response.url;
          }
        })
        .catch(function(error) {
          console.log('Error al cerrar sesión:', error);
        });
    });
  });