function showLogin() {
  window.registerDialog.close();
  window.loginDialog.showModal();
}

function showRegister() {
  window.loginDialog.close();
  window.registerDialog.showModal();
}

new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints:{
        0:{
            slidesPerView: 1
        },
        768:{
            slidesPerView: 2
        },
        1024:{
            slidesPerView: 3
        },
    }
});

// Функция для закрытия диалога при клике вне его области
function setupDialogCloseOnOutsideClick(dialog) {
    dialog.addEventListener('click', function(e) {
        const dialogDimensions = dialog.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            dialog.close();
        }
    });
}

// Инициализация форм
document.addEventListener('DOMContentLoaded', function() {
    // Настройка закрытия при клике вне формы
    const loginDialog = document.getElementById('loginDialog');
    const registerDialog = document.getElementById('registerDialog');
    
    setupDialogCloseOnOutsideClick(loginDialog);
    setupDialogCloseOnOutsideClick(registerDialog);

    document.querySelectorAll('.auth-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Форма отправлена!');
            this.closest('dialog').close();
        });
    });
    
    // Открытие формы входа при клике на лого пользователя
    document.querySelector('.user_logo').addEventListener('click', function(e) {
        e.preventDefault();
        window.loginDialog.showModal();
    });
    document.querySelector('.head_line_text1').addEventListener('click', function(e) {
      e.preventDefault();
      window.loginDialog.showModal();
  });
});

function switcher(){
    [].forEach.call(document.body.querySelectorAll("[data-switcher]"),(a)=>{
        let b = a.querySelectorAll("[data-switcher-name]"),
            c = a.querySelectorAll("[data-switcher-show]");
        [].forEach.call(c,(d)=>{
            if (d.dataset.switcherSelected != undefined) {
                d.classList.add("selected");
                [].filter.call(b,(a)=>a.dataset.switcherName==d.dataset.switcherShow?a.classList.add("selected"):"");
            }
            d.addEventListener("click",()=>{
                [].forEach.call(c,(a)=>a!=d?a.classList.remove("selected"):a.classList.add("selected"));
                [].forEach.call(b,(a)=>a.dataset.switcherName!=d.dataset.switcherShow?a.classList.remove("selected"):a.classList.add("selected"));
            },true);
        });
    });
}
window.onload = function() {
    switcher();
}

// Бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.head_line');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
        
        // Блокировка прокрутки при открытом меню
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.head_line a').forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});

// Счетчик просмотров для видео
function setupVideoCounters() {
    document.querySelectorAll('[data-video-id]').forEach(counter => {
        const videoId = counter.getAttribute('data-video-id');
        let views = localStorage.getItem(`video_${videoId}_views`) || 0;
        views = parseInt(views) + 1;
        localStorage.setItem(`video_${videoId}_views`, views);
        counter.textContent = views;
    });
}

document.addEventListener('DOMContentLoaded', setupVideoCounters);

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация лайков
    document.querySelectorAll('.like-button').forEach(button => {
        const id = button.getAttribute('data-id');
        const countElement = button.nextElementSibling;
        
        // Проверяем, лайкал ли пользователь этот элемент
        const liked = localStorage.getItem(`liked_${id}`) === 'true';
        const currentCount = parseInt(localStorage.getItem(`likes_${id}`)) || 0;
        
        if (liked) {
            button.classList.add('liked');
        }
        countElement.textContent = currentCount;
        
        // Обработчик клика
        button.addEventListener('click', function() {
            let count = parseInt(countElement.textContent);
            const isLiked = button.classList.contains('liked');
            
            if (isLiked) {
                // Убираем лайк
                button.classList.remove('liked');
                count--;
                localStorage.removeItem(`liked_${id}`);
            } else {
                // Ставим лайк
                button.classList.add('liked');
                count++;
                localStorage.setItem(`liked_${id}`, 'true');
            }
            
            countElement.textContent = count;
            localStorage.setItem(`likes_${id}`, count);
        });
    });
});