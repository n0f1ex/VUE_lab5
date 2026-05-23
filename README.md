# VUE_lab5
## Были сделаны приколы наподобие вставь запроси
## Про Vue будет поподробнее
### PixiJS (lab5-10)
app.ticker.add((time) => {
  rect.rotation += 0.02 * time.deltaTime;
});
Всё 
### Axios 
В папке /axios лежит README.txt и фоточки с описанием
### Postman
Фотки в папке /postman 
Из добавленного мной - ключ API во вкладку Headers (x-api-key)
### Vue (lab5-11)
Сделаны две папочки в /vue-lab5-11-1 сделан вариант через подключение к нему Vue.js через тег script
А в /vue-lab5-11-2 сделан вариант через npm init
Самое интересное - <div class="button-slot" role="button" tabindex="0" @click="handleClick" @keydown.enter="handleClick" @keydown.space.prevent="handleClick">
Реализация "Всё что внутри есть кнопка"
Ну и цикс собственна <Clicker
        v-for="n in 100"
        :key="n"
        :amount="n % 5 + 1"
        @button-clicked="() => onClickerClicked(n)"
      >
### Vue (lab5-12)
Еее ToDo list - это так сказать база.
Интересное - src/services/todoApi.js API слой. 
Ну и всё, localStorage и http взаимодействиями уже не удивить :)
