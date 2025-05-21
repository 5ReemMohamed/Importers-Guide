document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const langSwitchBtn = document.getElementById('langSwitch');
  const translatableElements = document.querySelectorAll('[data-en][data-ar]');

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("UserName");
  const emailInput = document.getElementById("UserEmail");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  const successMessage = document.getElementById("formSuccess");

  let validationErrors = {
    name: false,
    email: false,
    message: false
  };

  function updatePlaceholders(lang) {
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        const placeholder = input.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) input.placeholder = placeholder;
      }
    });
  }

  function updateErrorMessages(lang) {
    const isRTL = lang === 'ar';

    if (validationErrors.name) {
      nameError.innerHTML = isRTL ? "الاسم يجب أن يكون على الأقل 3 أحرف." : "Name must be at least 3 characters.";
    }

    if (validationErrors.email) {
      emailError.innerHTML = isRTL ? "يرجى إدخال بريد إلكتروني صالح." : "Please enter a valid email.";
    }

    if (validationErrors.message) {
      messageError.innerHTML = isRTL ? "يجب أن تكون الرسالة 10 أحرف على الأقل." : "Message must be at least 10 characters.";
    }
  }

  langSwitchBtn.addEventListener('click', () => {
    const currentLang = langSwitchBtn.getAttribute('data-lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';

    translatableElements.forEach(el => {
      const icon = el.querySelector('i');
      const text = el.getAttribute(`data-${newLang}`);

      if (icon) {
        el.innerHTML = '';
        el.appendChild(icon);
        el.append(' ' + text);
      } else {
        el.innerHTML = text;
      }
    });

    langSwitchBtn.innerHTML = newLang === 'ar' ? 'EN' : 'AR';
    langSwitchBtn.setAttribute('data-lang', newLang);

    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.style.textAlign = newLang === 'ar' ? 'right' : 'left';

    updatePlaceholders(newLang);
    updateErrorMessages(newLang);
  });

 
  const header = document.querySelector('#header');
  const headerHeight = header.offsetHeight;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href');
    return id.startsWith('#') ? document.querySelector(id) : null;
  }).filter(Boolean);

  function handleScroll() {
    
    header.classList.toggle('sticky', window.scrollY > 50);

    
    const scrollPos = window.scrollY + headerHeight + 5; 

    let currentSection = null;

    for (const section of sections) {
      if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
        currentSection = section;
        break;
      }
    }

    navLinks.forEach(link => {
      if (currentSection && link.getAttribute('href') === `#${currentSection.id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);

  handleScroll();


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    });
  });

     
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    let endTime = localStorage.getItem('countdownEndTime');
    
    if (!endTime || new Date(parseInt(endTime)) <= new Date()) {
        endTime = new Date().getTime() + (24 * 60 * 60 * 1000); 
        localStorage.setItem('countdownEndTime', endTime);
    }
   
    const countdownInterval = setInterval(updateCountdown, 1000);
    
   
    updateCountdown();
    
   
    function updateCountdown() {
        
        const now = new Date().getTime();
        const distance = parseInt(endTime) - now;
        
        if (distance <= 0) {  
            endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            localStorage.setItem('countdownEndTime', endTime);
            
           
            flashCountdown();
        }
        
       
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        hoursElement.innerHTML = formatTime(hours);
        minutesElement.innerHTML = formatTime(minutes);
        secondsElement.innerHTML = formatTime(seconds);
    }
    
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
   
    function flashCountdown() {
        const countdownItems = document.querySelectorAll('.countdown-item');
        
        // Add flash animation class
        countdownItems.forEach(item => {
            item.classList.add('shake');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                item.classList.remove('shake');
            }, 1000);
        });
    }

  // Back to Top
  const backToTopButton = document.querySelector('.back-to-top');

  window.addEventListener('scroll', function () {
    backToTopButton.classList.toggle('active', window.scrollY > 300);
  });

  backToTopButton.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });



  function validateAll() {
    let isValid = true;
    const dir = document.documentElement.getAttribute('dir');
    const isRTL = dir === 'rtl';

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    if (name.length < 3) {
      validationErrors.name = true;
      nameError.innerHTML = isRTL ? "الاسم يجب أن يكون على الأقل 3 أحرف." : "Name must be at least 3 characters.";
      isValid = false;
    } else {
      validationErrors.name = false;
      nameError.innerHTML = "";
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      validationErrors.email = true;
      emailError.innerHTML = isRTL ? "يرجى إدخال بريد إلكتروني صالح." : "Please enter a valid email.";
      isValid = false;
    } else {
      validationErrors.email = false;
      emailError.innerHTML = "";
    }

    if (message.length < 10) {
      validationErrors.message = true;
      messageError.innerHTML = isRTL ? "يجب أن تكون الرسالة 10 أحرف على الأقل." : "Message must be at least 10 characters.";
      isValid = false;
    } else {
      validationErrors.message = false;
      messageError.innerHTML = "";
    }

    return isValid;
  }

  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener("input", validateAll);
    }
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

      if (validateAll()) {
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim()
        };

        localStorage.setItem("contactFormData", JSON.stringify(formData));

        if (successMessage) {
          successMessage.innerHTML = isRTL ? "تم إرسال الرسالة بنجاح." : "Message sent successfully.";
          successMessage.classList.remove("d-none");
        }

        form.reset();
        validationErrors = { name: false, email: false, message: false };

        setTimeout(() => {
          if (successMessage) successMessage.classList.add("d-none");
        }, 3000);
      } else {
        if (successMessage) successMessage.classList.add("d-none");
      }
    });
  }

  // AOS Init
  AOS.init({
    offset: 120,
    duration: 1000,
    easing: 'ease-in-out',
  });
});
