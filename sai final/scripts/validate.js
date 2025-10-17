
(function(){
  const form = document.getElementById('pwdForm');
  const current = document.getElementById('current');
  const pwd = document.getElementById('new');
  const confirm = document.getElementById('confirm');
  const status = document.getElementById('formStatus');
  const changeAddressBtn = document.getElementById('changeAddress');

  const show = (msg, cls='help') => { status.textContent = msg; status.className = cls; };

  function explain(value){
    if(value.length < 9) return "Password must be at least 9 characters.";
    const upper = (value.match(/[A-Z]/g)||[]).length;
    if(upper < 2) return "Password must have at least 2 uppercase letters.";
    const specials = (value.match(/[!@#$%^&*]/g)||[]).length;
    if(specials < 1) return "Password must have at least 1 special symbol (!@#$%^&*).";
    const invalid = value.match(/[^A-Za-z0-9!@#$%^&*]/);
    if(invalid) return "Only letters, digits, and !@#$%^&* are allowed.";
    return "";
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!current.value || !pwd.value || !confirm.value){
      show("All fields are required.", "error"); return;
    }
    const msg = explain(pwd.value);
    if(msg){ show(msg, "error"); pwd.focus(); return; }
    if(pwd.value !== confirm.value){ show("New Password and Confirm Password must match.", "error"); confirm.focus(); return; }
    show("Success! Your password was changed.", "success"); form.reset();
  });

  changeAddressBtn.addEventListener('click', ()=>{
    alert("Address changed successful.");
  });
})();
