function mostrarAvisoLogin() {
  if (document.getElementById('avisoLoginOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'avisoLoginOverlay';
  overlay.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99999;' +
    'display:flex;align-items:center;justify-content:center;padding:1rem;';

  overlay.innerHTML = `
    <div style="background:#fff;color:#212529;border-radius:12px;max-width:420px;
                width:100%;padding:1.5rem;box-shadow:0 10px 40px rgba(0,0,0,.4);">
      <h5 style="margin:0 0 .75rem;"><i class="bi bi-lock me-2"></i>Inicia sesión</h5>
      <p style="margin:0 0 1.25rem;">Debes iniciar sesión primero para acceder al carrito.</p>
      <div style="display:flex;gap:.5rem;justify-content:flex-end;">
        <button type="button" id="avisoCancelar" class="btn btn-outline-secondary">Cancelar</button>
        <a href="iniciarsession.html" class="btn btn-brand">Iniciar sesión</a>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  const cerrar = () => overlay.remove();
  document.getElementById('avisoCancelar').addEventListener('click', cerrar);
  overlay.addEventListener('click', e => { if (e.target === overlay) cerrar(); });
}
document.addEventListener('click', function (e) {
  const cart = e.target.closest('.js-cart-link');
  if (!cart) return;
  e.preventDefault();

  const user = getCurrentUser();
  if (!user) {
    mostrarAvisoLogin();
  } else if (user.role === 'cliente') {
    window.location.href = 'cliente.html#carrito';
  } else {
    alert('El carrito es solo para cuentas de cliente.');
  }
});