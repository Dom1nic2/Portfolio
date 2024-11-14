// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
  let arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i);
    arr.push(i);
  }
  return arr;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random()*i + 1);
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(count) {
  const container = document.getElementById('container');
  const cardList = document.createElement('ul');
  cardList.classList.add('cardlist');
  container.append(cardList);
  const intArr = createNumbersArray(count);
  const mixArr = shuffle(intArr);
  console.log(mixArr);

  let firstNumber;
  let secondNumber;

  let k = 0;

  // создание карточки с номером внутри

  for (let i = 0; i < mixArr.length; i++) {
    const card = document.createElement('li');
    const cardContent = document.createElement('h1');
    cardContent.classList.add('number');
    cardContent.innerHTML = mixArr[i];
    card.classList.add('card');
    cardList.append(card);
    card.append(cardContent);
    card.addEventListener('click', () => {



      // блокировка нажатия повторной плитки

      if(cardContent.classList.contains('card-true') || cardContent.classList.contains('card-open')) {
        return;
      }

      // присваивание стилей открытой карточки

      cardContent.classList.add('card-open');

      // удаление стилей у не совпавших карточек

      if (firstNumber && secondNumber) {
        firstNumber.classList.remove('card-open');
        secondNumber.classList.remove('card-open');
        firstNumber = null;
        secondNumber = null;
      }

      // Проверка наличия значений в firstNumber и secondNumber

      if (!firstNumber) {
        firstNumber = cardContent;
      } else {
        secondNumber = cardContent;
      }

      // Проверка на совпадение двух карточек и применение стилей на совпавшие

      if (firstNumber && secondNumber) {
        if (firstNumber.textContent === secondNumber.textContent) {
          firstNumber.classList.add('card-true');
          secondNumber.classList.add('card-true');
          k += 1;
        }
      }

      // проверка окончания игры

      if (k === count) {
        const restartButton = document.createElement('button');
        restartButton.classList.add('restBtn');
        restartButton.textContent = 'Начать игру заново'
        container.append(restartButton);
        restartButton.addEventListener('click', () => {
          cardList.remove();
          startGame(count);
          restartButton.remove();
          return;
        })
      }
    })
  }

}




