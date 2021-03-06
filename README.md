# FREEDRAG

Простая JavaScript функция-конструктор для перемещения блока по горизонтали внутри заданного контейнера.

Работает с событиями мышки и тачскрином.

Напоминает обычную карусель с той разницей, что карусели обычно работают с последовательностью слайдов, 
а *Freedrag* может свободно перемещать даже один блок/кадр в пределах заданного контейнера, частично заходя за него, 
но не покидая вьюпорта полностью.

Когда блок покидает контейнер более чем на 100px в одну из сторон, при отпускании указателя он плавно возвращается обратно.

Также добавлена плавная анимация замедления перемещения карусели при отпускании.

## HTML Разметка

В качестве разметки используется внешний контейнер-обёртка с классом `.freedrag`.

Внутри контейнера должен находиться сформированный блок `.freedrag__inner`.

### Пример разметки

    <div class="freedrag">
        <div class="freedrag__inner">
            <div class="freedrag__item">1</div>
            <div class="freedrag__item">2</div>
            <div class="freedrag__item">3</div>
        </div>
    </div>

## Инструкция по подключению

Подключите файл со скриптом `freedrag.js` перед закрывающим тегом `</body>`:

`<script src="freedrag.js"></script>`

После подключения скрипта, вызовите экземпляр функции, передав в качестве аргумента CSS селектор контейнера с блоком:

`const containerWithFreeBlock = new Freedrag('#containerSelector')`

## Демо

Файл index.html содержит пример с демонстрацией работы данного скрипта.
Клонируйте репозиторий на локальный компьютер или загрузите содержимое каталога в онлайн-песочницу и запустите index.html в браузере, чтобы посмотреть демонстрационный пример.