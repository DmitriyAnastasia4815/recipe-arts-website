/**
 * Функция для определения как склонить минуты
 */
export function declinationOfUnits (minutes: number): string {
    const decTen = minutes % 10;
    const decThous = minutes % 100;

    if (decThous >= 11 && decThous <= 19){
        return 'минут'
    }

    if (decTen === 1){
        return 'минута'
    }

    if (decTen >= 2 && decTen <= 4){
        return "минуты"
    }
    return 'минут'
}