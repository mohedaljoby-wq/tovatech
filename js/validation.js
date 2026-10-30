/* Client-side validation with HTML5 + jQuery custom checks and Toastify feedback. */
(function($){
  "use strict";
  function showError($field,message){
    $field.addClass("is-invalid");
    if(message)$field.siblings(".invalid-feedback").text(message);
  }
  function clearError($field){$field.removeClass("is-invalid").addClass("is-valid");}
  function validEmail(value){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);}
  function failToast(){if(window.novaToast)window.novaToast("Please correct the highlighted fields.","error");}

  $("#contactForm").on("submit",function(e){
    e.preventDefault();let ok=true;
    const fields=["#contactName","#contactEmail","#contactSubject","#contactMessage"];
    fields.forEach(sel=>{const $f=$(sel);if(!$f.val().trim()||($f.attr("type")==="email"&&!validEmail($f.val().trim()))||$f.val().trim().length<($f.attr("minlength")||0)){showError($f);ok=false}else clearError($f);});
    if(!ok){failToast();return;}
    window.novaToast("Message sent successfully! We'll be in touch soon.");this.reset();$(this).find(".is-valid").removeClass("is-valid");
  });

  $("#loginForm").on("submit",function(e){
    e.preventDefault();let ok=true;const $email=$("#loginEmail"),$pass=$("#loginPassword");
    [$email,$pass].forEach($f=>{if(!$f.val().trim()||($f.is($email)&&!validEmail($f.val()))||($f.is($pass)&&$f.val().length<6)){showError($f);ok=false}else clearError($f);});
    if(!ok){failToast();return;}window.novaToast("Login successful! Welcome back.");this.reset();$(this).find(".is-valid").removeClass("is-valid");
  });

  $("#registerForm").on("submit",function(e){
    e.preventDefault();let ok=true;const $name=$("#registerName"),$email=$("#registerEmail"),$pass=$("#registerPassword"),$confirm=$("#confirmPassword"),$terms=$("#terms");
    if(!$name.val().trim()||$name.val().trim().length<2){showError($name);ok=false}else clearError($name);
    if(!validEmail($email.val())){showError($email);ok=false}else clearError($email);
    if($pass.val().length<6){showError($pass);ok=false}else clearError($pass);
    if($confirm.val()!==$pass.val()||$confirm.val().length<6){showError($confirm,"Passwords must match.");ok=false}else clearError($confirm);
    if(!$terms.is(":checked")){$terms.addClass("is-invalid");ok=false}else{$terms.removeClass("is-invalid").addClass("is-valid");}
    if(!ok){failToast();return;}window.novaToast("Registration successful! Your account is ready.");this.reset();$(this).find(".is-valid").removeClass("is-valid");
  });

  $(".password-toggle").on("click",function(){const $input=$(this).siblings("input");const isPassword=$input.attr("type")==="password";$input.attr("type",isPassword?"text":"password");$(this).find("i").toggleClass("fa-eye fa-eye-slash");$(this).attr("aria-label",isPassword?"Hide password":"Show password");});
})(jQuery);