export const template = /* html */ `
<style>
    @import '../component/login-window/login-window.css';
</style>

<div class="wrapper">
<div class="field">
  <input aria-label="gebruikersnaam" placeholder="E-mail adres" class="field__input" type="text">
</div>
<br>
</div>

<div class="wrapper">
  <div class="field">
    <input aria-label="warchtwoord" placeholder="wachtwoord" class="field__input" type="password">
  </div>
  <br>
</div>

<div class="wrapper">
  <div class="field">
    <button class="field__button" onclick="">Login
    </button>
  </div>
  <a class="register__link register__link--show" href="">Nog geen account? Registreer hier</a>
</div>
`;
