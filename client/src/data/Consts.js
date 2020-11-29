export function getDayOfWeek(day) {
    const dayofweek = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];
    return dayofweek[Number(day)];
}

export function getMonth(mon) {
    const month = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ];
    return month[Number(mon)];
}

// export const LESSONS = [
//     {day: getDayOfWeek(1), name: 'Английский', num: 1},
//     {day: getDayOfWeek(1), name: 'Украинская мова', num: 2},
//     {day: getDayOfWeek(1), name: 'Математика', num: 3},
//     {day: getDayOfWeek(1), name: 'ИЗО', num: 4},
//     {day: getDayOfWeek(1), name: 'Русский язык', num: 5},
//     {day: getDayOfWeek(1), name: 'Украинская литература', num: 6},
  
//     {day: getDayOfWeek(2), name: 'Физкультура', num: 1},
//     {day: getDayOfWeek(2), name: 'Украинская мова', num: 2},
//     {day: getDayOfWeek(2), name: 'Основы здоровья', num: 3},
//     {day: getDayOfWeek(2), name: 'Природа', num: 4},
//     {day: getDayOfWeek(2), name: 'Информатика', num: 5},
//     {day: getDayOfWeek(2), name: 'Классный час', num: 6},
  
//     {day: getDayOfWeek(3), name: 'Музыка', num: 1},
//     {day: getDayOfWeek(3), name: 'Английский', num: 2},
//     {day: getDayOfWeek(3), name: 'Математика', num: 3},
//     {day: getDayOfWeek(3), name: 'Украинская мова', num: 4},
//     {day: getDayOfWeek(3), name: 'Зарубежная литература', num: 5},
//     {day: getDayOfWeek(3), name: 'Физкультура', num: 6},
  
//     {day: getDayOfWeek(4), name: 'Труд', num: 1},
//     {day: getDayOfWeek(4), name: 'Труд', num: 2},
//     {day: getDayOfWeek(4), name: 'История', num: 3},
//     {day: getDayOfWeek(4), name: 'Математика', num: 4},
//     {day: getDayOfWeek(4), name: 'Украинская литература', num: 5},
//     {day: getDayOfWeek(4), name: 'Русский язык', num: 6},
  
//     {day: getDayOfWeek(5), name: 'Математика', num: 1},
//     {day: getDayOfWeek(5), name: 'Английский', num: 2},
//     {day: getDayOfWeek(5), name: 'Зарубежная литература', num: 3},
//     {day: getDayOfWeek(5), name: 'Украинская мова', num: 4},
//     {day: getDayOfWeek(5), name: 'Природа', num: 5},
//     {day: getDayOfWeek(5), name: 'Физкультура', num: 6},
// ];

// export default LESSONS;