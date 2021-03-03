document.addEventListener('DOMContentLoaded', function () {
    new WOW().init(); //wow js animanted

    /* Check the location of each element */
$('.content').each( function(i){
  
    let bottomOfObject= $(this).offset().top + $(this).outerHeight();
    let bottomOfWindow = $(window).height();
    
    if( bottomOfObject > bottomOfWindow){
      $(this).addClass('bottomOfWindow');
    }
  });
  
  
  $(window).scroll( function(){
      /* Check the location of each element hidden */
      $('.hidden').each( function(i){
        
          let bottomOfObject = $(this).offset().top + $(this).outerHeight();
          let bottomOfWindow = $(window).scrollTop() + $(window).height();
        
          /* If the object is completely visible in the window, fadeIn it */
          if( bottomOfWindow > bottomOfObject ){
            $(this).animate({'opacity':'1'},700);
          }
      });
  });


    let mode; // глобальная переменная выбора режима
    const container = document.querySelector('.container'); //глобальный контейнер
  

                                //1экран
    const btnStart = document.querySelector('#btn-start'), //получаем кнопку Приступим
        startHeader = document.querySelector('.promo__header'), //заголовок
        startSubheader = document.querySelector('.promo__subheader'), //подзаголовок
        startPic = document.querySelector('.promo__image-start'); //картинка 





                                //2 экран
    const chooseHeader = document.querySelector('.choose__header'),
        recordModeTitle = document.querySelector('.choose__mode-record'),
        recordModeDescr = document.querySelector('.choose__mode-record_descr'),
        chooseImg = document.querySelector('.choose__img'),
        borderModeRecord = document.querySelector('.choose__border-record'),
        borderModeMemory = document.querySelector('.choose__border-memory'),
        memoryModeTitle = document.querySelector('.choose__mode-memory'),
        memoryModeDescr = document.querySelector('.choose__mode-memory_descr'),
        btnRecord = document.getElementById('btn-record'),
        btnMemory = document.getElementById('btn-memory');



        const recordWrap = document.querySelector('.record__wrap'), // врапер для Привет, время и картинки
        helloMessage = document.querySelector('.record__hello'),

          //правая сторона
        recordMessagebar = document.querySelector('.record__messagebar'), // див винного цвета
        textArea = document.getElementById('record-input'), // area с текстом заметки

          //ярлыки
        recordForm = document.querySelector('.form-write'), // FORM
        radioNone = document.querySelector('#radio-none'), // ярлык none
        radioRed = document.querySelector('#radio-red'), // ярлык красный
        radioYellow = document.querySelector('#radio-yellow'), // ярлые желтый
        radioGreen = document.querySelector('#radio-green'), // ярлык зеленый

        sendMessage = document.querySelector('button.btn-write'), // кнопка ЗАПИСАТЬ
        recordTooltip = document.querySelector('.record__tooltip'); // подсказка внизу(tooltip)
       

    
    


    // модальное окно    
    const overlay = document.querySelector('.overlay'), // подложка
        modalParent = document.querySelector('.modal'),
        modalClose = document.getElementById('modal_close'), //крестик
        modalSubmit = document.getElementById('modal-submit'), // кнопка подтверждения
        modalName = document.getElementById('modal-name'), // инпут с именем   
        modalSexMale = document.getElementById('r1'), //интуп с полом
        modalSexFemale = document.getElementById('r2'), //интуп с полом
        promoWrapper = document.querySelector('.promo__wrapper');




    // класс сообщения
    class Message {   
        constructor(date, label = 'none', text) {
            this.date = date;
            this.label = label;
            this.text = text;
        }
        postMessage() {

        }

        deleteMessage(index) {

        }
 

    }



    //обьект пользователь
    const user = {
        name: ' ',
        sex: ' ',
        mode: ' '
    };



    //пока не решил где и как использовать
    // localStorage.setItem('session', 'true'); // session: true; записывает в localStorage = true

 //=============================================================//
    // 1 экран полностью отображен.
    // кликаем на Приступим и всё улетает 
    btnStart.addEventListener('click', function (event) {
        event.preventDefault();


        // 1 экран
        //анимация улетания элементов

        //убираем заголовок
        startHeader.classList.remove('fadeInDownBig');
        startHeader.style.transition = '0.6s all ';
        startHeader.style.top = "-105px";

         //убираем подзаголовок
        startSubheader.classList.remove('fadeInDownBig');
        startSubheader.style.transition = '0.6s all ';
        startSubheader.style.left = "-475px";

         //убираем картинку
        startPic.classList.remove('fadeInDownBig');
        startPic.style.transition = '0.6s all ';
        startPic.style.right = "-550px";

         //убираем кнопку
        btnStart.classList.remove('fadeInDownBig');
        btnStart.style.transition = '0.6s all ';
        btnStart.style.bottom = "-60px";






        //2 экран
        //появление второго экрана с выбором режимов
        // центральный заголовок страницы выбора режимов.
        setTimeout(function () {
            chooseHeader.style.top = '15px'; 
            // recordModeTitle.style.top = '50px';
        }, 900);

        //появление "режимов":
        setTimeout(function () {

            // режим Записи
            //анимация появления
            chooseImg.style.right = '1px'; //меняем картинку 
            recordModeTitle.style.top = '70px'; // тайтл режима записи
            recordModeDescr.style.left = '50px'; // сабтайтл режима записи
            borderModeRecord.style.left = '30px'; // бордер режима записи
            btnRecord.style.left = '220px'; // кнопка выбора режима записи

            // режим памяти
            //анимация появления
            borderModeMemory.style.left = '30px'; //бордер режима памяти
            memoryModeTitle.style.bottom = '175px'; // тайтл режима памяти
            memoryModeDescr.style.left = '50px'; // сабтайтл режима памяти
            btnMemory.style.left = '220px'; // кнопка выбора режима памяти
        }, 600);



    });

    //выбор режима ЗАПИСЬ и запись этого значения в обьект
    btnRecord.addEventListener('click', function () {
        openModal();
        user.mode = 'record';
        console.log(user);
    });

    //выбор режима ПАМЯТЬ и запись этого значения в обьект
    btnMemory.addEventListener('click', function () {
        openModal();
        user.mode = 'memory';
        console.log(user);
    });



 //=============================================================//
    





  //=============================================================//
    //модальное окно с выбором пола и вводам имени.

    // закрываем модальное на крестик
    modalClose.addEventListener('click', function () {
        closeModal();

    });


    // закрываем модальное на esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('hide') && !modalParent.classList.contains('hide')) {
            closeModal();

        }
    });

    //закрываем модальное на подложку
    overlay.addEventListener('click', () => {
        closeModal();
    });


    //кнопка модального окна
    modalSubmit.addEventListener('click', (e) => {
        e.preventDefault();

         //добавляем имя в обьект
        user.name = modalName.value;
        localStorage.setItem('name', user.name);

        if (modalSexMale.checked) {
            user.sex = modalSexMale.value; //добавляем пол в обьект если чекнут - мужчина
        } else {
            user.sex = modalSexFemale.value; // добавляем пол в обьект если чекнут - женщина
        }


        //если в инпуты всё ввели - ок, закрываем модалку
        if (user.name != '' && user.sex != '' && user.mode != '') {

            //закрываем модалку
            closeModal();


            //отчищаем верстку
            promoWrapper.innerHTML = '';

            //если пользователь выбрал режим ЗАПИСИ
            //то подгружаем эту верстку:
            if (user.mode == 'record') {
                // container.innerHTML = `
                //     <div class="promo__wrapper">
                //     <!-- <div class="choose__header">Отлично! Выбери режим и начнем</div> -->
                //     <div class="record__wrap">
                //     <div class="record__hello">Привет, ${user.name}</div>
                //     <div class="record__time"></div>
                //     <img src="img/write.jpg" alt="writer" class="record__img">
                // </div>
                
                //     <div class="promo__wrapper-content">
                //         <div class="record__messagebar">
                //             <div class="record__messagebar-title"> записываю с твоих слов...</div>
                            
                //             <form class="form-write" action="#">
                
                //                 <textarea name="record-input" id="record-input" cols="10" rows="2" required autocomplete
                //                 ></textarea>
                //                 <div  class="record__messagebar-subtitle"> Как подчеркнем?</div>
                //                 <div class="label__wrap">
                //                 <input id="radio-none" class="rbtn-write"  name='radio-write' type="radio"
                //                  value="none" checked>
                //                 <label class='label__radio' for="radio-none">Никак</label>
                
                //             </div>
                        
                //             <div class="label__wrap">
                //                 <input id="radio-red" class="rbtn-write" name='radio-write'  type="radio" value="red">
                //                 <label class='label__radio' for="radio-red">Очень важно</label>
                //             </div>
                
                //             <div class="label__wrap">
                //                 <input id="radio-yellow" class="rbtn-write" name='radio-write'  type="radio"
                //                  value="yellow">
                //                 <label class='label__radio' for="radio-yellow">Не важно, но надо вспомнить</label>
                //             </div>
                
                //             <div class="label__wrap" >
                //                 <input id="radio-green" class="rbtn-write" name='radio-write'  type="radio"
                //                  value="green">
                //                 <label class='label__radio' for="radio-green">Новое знакомство</label>
                //             </div>
                
                //             <button class="btn-write">Записать</button>
                
                //              </form>
                //         </div>
                //         <div class="record__tooltip"><b>подсказка: </b><s>в краце опиши своё состояние...
                //         </s> добавь описание того, что происходит вокруг.укажи место, атмосферу.<br>
                //          По необходимости, добавь лейб. если не хочешь, не добавляй его.</div>
                        
                //         </div>
                
                // </div>
                    
                //     `;
                window.open("writing.html");
                           //3 экран: режим ЗАПИСИ

            //левая сторона
            const recordWrap = document.querySelector('.record__wrap'), // врапер для Привет, время и картинки
            helloMessage = document.querySelector('.record__hello'),
  
              //правая сторона
            recordMessagebar = document.querySelector('.record__messagebar'), // див винного цвета
            textArea = document.querySelector('textarea'), // area с текстом заметки
  
              //ярлыки
            recordForm = document.querySelector('.form-write'), // FORM
            radioNone = document.querySelector('#radio-none'), // ярлык none
            radioRed = document.querySelector('#radio-red'), // ярлык красный
            radioYellow = document.querySelector('#radio-yellow'), // ярлые желтый
            radioGreen = document.querySelector('#radio-green'), // ярлык зеленый
  
            sendMessage = document.querySelector('button.btn-write'), // кнопка ЗАПИСАТЬ
            recordTooltip = document.querySelector('.record__tooltip'); // подсказка внизу(tooltip)
  
                
                let label = 'none';
                let textMessage = '';
                textArea.addEventListener('change', () => {

                });
                
                radioNone.addEventListener('change', () => {
                    textArea.style.border = '3px solid black';
                    label = 'none';
                    // let post = new Message(times, 'none', textArea.input);
                    // console.log(post);
                });
                radioRed.addEventListener('change', () => {
                    textArea.style.border = '3px solid red';
                    label = 'red';
                    // let post = new Message(times, 'red', textArea.input);
                    // console.log(post);
                });
                radioYellow.addEventListener('change', () => {
                    textArea.style.border = '3px solid yellow';
                    label = 'yellow';
                    // let post = new Message(times, 'yellow', textArea.input);
                    // console.log(post);
                });
                radioGreen.addEventListener('change', () => {
                    textArea.style.border = '3px solid green';
                    label = 'green';
                    // let post = new Message(times, 'green', textArea.input);
                    // console.log(post);
                });

                sendMessage.addEventListener('click', (event) => {
                    event.preventDefault();
                    let post = new Message(times, label, textArea.value);
                    localStorage.setItem('message', `${times}, ${label}, ${textArea.value}`);
                    console.log(post);

                });

            } else if (user.mode == 'memory') {
                window.open("morning.html");
            }





        //продолжение к "если в инпуты всё ввели - ок, закрываем модалку"
        //else:
        } else { // а если нет, то вылетает баннер 'заполните данные'

             //сам баннер
            const alertModal = document.querySelector('.modal__alert ');
            alertModal.style.display = 'block'; // показываем его


            //скрытие баннера о заполнении всех данных
            function alertClose() { //функция на его скрытие
                alertModal.style.display = 'none'; //скрываем
            }
            setTimeout(alertClose, 1000); // скрываем его через 1сек после появления
        }


 
        
    });



   



 
    // function hideRecord() {
    //     recordWrap.classList.add('hide');
    //     recordMessagebar.classList.add('hide');
    //     recordTooltip.classList.add('hide');
    // }
    // hideRecord();




    

  


 //============================================

  //время из системы
//   function time() {
    var date = new Date();
    var Year = date.getFullYear(),
        month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
        day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    var times = day + '-' + month + '-' + Year + '  ' + hours + ':' + minutes + ':' + seconds;
    // document.querySelector('.record__time').innerHTML = `На часах сейчас ${times}`;
// }

//относиться к времени из системы. что бы секунды двигались.
// setInterval(function () {
//     time();
// }, 1);







     // показывает 3 экран
     function showRecord() {
        recordWrap.classList.remove('hide');
        recordMessagebar.classList.remove('hide');
            recordTooltip.classList.remove('hide');
    }


    // скрыть все элементы в промо контейнере promo__wrapper(все)
    function hidePromoAllElements() {
        const promoWrapper = document.querySelector('.promo__wrapper');
        promoWrapper.classList.add('hide');
    }



    //модальное окно ввода имени и выбора пола.
    // изначально с слассом hide.

    //открыть модалку
    function openModal() {
        overlay.classList.remove('hide');
        modalParent.classList.remove('hide');
    }


    //закрыть модалку
    function closeModal() {
        overlay.classList.add('hide');
        modalParent.classList.add('hide');
    }






    //приветствие
    // document.querySelector('.morning__hello').innerHTML = `Привет, ${user.name}`;
    let hello;
    hello = document.createElement('div');
    let name = localStorage.getItem('name');
    // hello.innerHTML = `Привет, ${name}`;
    document.querySelector('#morning-hello').textContent = `Привет, ${name}`;




 console.log(hello);





}); //конец главной функции