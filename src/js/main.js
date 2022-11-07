window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    //сначала скрываем все контенты, то есть дисплэй none
    //также убираем у всех табов класс активности
    
    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    //добавляем класс активности первому элементу в списке, то есть в массиве это элемент[0]
    //показываем контент первого элемента, дисплэй блок
    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    //только когда target(элемент на который кликнули) совпадет с элементом всевдомассива tabs
                    //вызываем обе функции 
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });


    hideTabsContent();
    showTabContent();

    //Timer 

    const deadLine = '2022-11-03';
    
    function getTimeRemain(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              sec = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'sec': sec
        };
    }

    function addZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              sec = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateTime, 1000);

        updateTime();

        function updateTime(endtime) {
            const t = getTimeRemain(deadLine);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            sec.innerHTML = addZero(t.sec);

            if(t.total <= 0) {
                clearInterval(timeInterval);
                // const l = document.querySelector('.promotion__timer');
                // l.style.display = 'none';
                days.innerHTML = '-';
                hours.innerHTML = '-';
                minutes.innerHTML = '-';
                sec.innerHTML = '-';
            }
        }      
    }

    setClock('.timer', deadLine);

});