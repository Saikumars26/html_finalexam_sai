document.getElementById("passwordForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const current = document.getElementById("currentPassword").value.trim();
  const newPass = document.getElementById("newPassword").value.trim();
  const confirm = document.getElementById("confirmPassword").value.trim();
  const message = document.getElementById("message");

  // Password pattern: min 9 chars, exactly 2 uppercase, 1 special char
  const pattern = /^(?=(?:.*[A-Z]){2})(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;

  if (!current || !newPass || !confirm) {
    message.textContent = "All fields are required.";
    message.className = "error";
    return;
  }

  if (!pattern.test(newPass)) {
    message.textContent = "New password must have at least 9 characters, exactly 2 uppercase letters, and 1 special symbol.";
    message.className = "error";
    return;
  }

  if (newPass !== confirm) {
    message.textContent = "Passwords do not match.";
    message.className = "error";
    return;
  }

  message.textContent = "Password changed successfully!";
  message.className = "success";
  document.getElementById("passwordForm").reset();
});
