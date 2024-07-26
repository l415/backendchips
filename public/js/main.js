document.getElementById('chipForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const chipId = document.getElementById('chipId').value;
  
    try {
      const response = await fetch(`/check/${chipId}`);
      const data = await response.json();
  
      if (response.ok) {
        if (data.registered) {
          window.location.href = data.route;
        } else {
          window.location.href = data.route;
        }
      } else {
        alert(data.error || 'Error al verificar el chip');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  });
  