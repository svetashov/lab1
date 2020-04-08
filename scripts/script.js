// считываение одного спортсмена
function readPlayer() {
    player = {};
    let str = prompt("Новый спортсмен", "");
    let arr = str.split(", ");
    player.name = arr[0];
    player.marks = arr.map((_, i, a) => a.slice(i * 5 + 1, (i + 1) * 5 + 1)).filter((el) => el.length);
    
    return player
}

// считывает и возвращает массив спортсменов
function readPlayers() {
    let players = [];
    players.push(readPlayer());
    while (confirm("Хотите ввести еще спортсмена?")) {
        players.push(readPlayer());
    }

    return players;
}

// среднее значение чисел массива
function getAverage(arr) {
    return arr.reduce((acc, curr) => acc + Number(curr), 0) / arr.length; 
}

 // получить массив средних значений
 // на входе двумерный массив чисел, на выходе одномерный массив средних значений соответсвующих массивов
function getAverages(arr) {
    return arr.map((value) => getAverage(value));
}

// получить среднюю оценку спортсмена с учетом удаления max и min оченок судей
function getAverageMark(player) {
    // получаем средние значения оценок каждого судьи
    let averages = getAverages(player.marks)

    // ищем индексы минимальной и максимальной средней оценки
    let max = averages.indexOf(Math.max.apply(null, averages));
    let min = averages.indexOf(Math.min.apply(null, averages));

    // удаляем
    averages.splice(min, 1);
    averages.splice(max, 1);

    return getAverage(averages)
}

// возвращает победителя из массива игроков
function getWinner(players) {
    return players.reduce((acc, curr) => getAverageMark(acc) > getAverageMark(curr) ? acc : curr);
}

// функция, выполняющая задачу
function executeTask() {
    let players = readPlayers();
    alert(getWinner(players).name);
}

executeTask();