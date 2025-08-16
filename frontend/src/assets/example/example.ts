import { noServer } from "@/styles/import-image";
import recipeImage from '@image/ReipeImage.svg'


export const initialEmptyRecipe= {
  id: 0,
  categories: ['категория блюда', 'категория блюда'],
  image: '',
    description: '',
  name: 'Название блюда',
  energy_value: { protein: 0, fat: 0, carb: 0 },
  ingredients: { portion: 1, list_ingredients: [] },
  recipe_steps: { time: { hours: 0, minutes: 0 }, steps: {} },
    advance: {
    image: noServer.advanceImage,
    hero_advance: 'Расскажите о самом главном',
    main: '',
  },
};

export const initialRecipe= {
  id: 1,
  categories: [
    'Выпечка и десерты',
    'Русская кухня',
    'Русская кухня',
    'Русская кухня',
  ],
  image: recipeImage,
  name: 'Классическая шарлотка',
  description:
    'Классическая шарлотка с яблоками — пирог очень простой в приготовлении, но при этом вкусный, потому невероятно популярный. Печь его лучше осенью, так как именно местные сезонные фрукты зимних сортов идеально подходят для начинки.',
  energy_value: {
    protein: 30,
    fat: 20,
    carb: 120,
  },
  ingredients: {
    portion: 4,
    list_ingredients: [
      { id: 1, name: 'Яблоки', amount: 450 },
      { id: 2, name: 'Пшеничная мука хлебопекарная', amount: 130 },
      { id: 3, name: 'Куриное яйцо', amount: 180 },
      { id: 4, name: 'Сахар', amount: 180 },
      { id: 5, name: 'Ванилин', amount: 2 },
    ],
  },
  recipe_steps: {
    time: {
      hours: 2,
      minutes: 40,
    },
    steps: {
      step_1: {
        image: noServer.step1,
        description:
          'Готовим тесто классической шарлотки. В чашу миксера вбиваем яйца. Добавляем сахар. Взбиваем миксером сначала на средней, затем на высокой скорости до получения светло-желтой массы однородной консистенции.',
      },
      step_2: {
        image: noServer.step2,
        description:
          'В сладкую яичную смесь добавляем муку, предварительно просеянную через мелкое сито со щепоткой соды и ванилином (ванильным сахаром). Снова взбиваем миксером. Тесто шарлотки готово.',
      },
      step_3: {
        image: noServer.step3,
        description:
          'Готовим начинку шарлотки. Яблоки моем и каждое разрезаем пополам. Удаляем сердцевины с семенами. Мякоть очищаем и нарезаем небольшими кубиками или ломтиками произвольной формы.',
      },
      step_4: {
        image: noServer.step4,
        description:
          'Яблоки добавляем в тесто шарлотки и осторожно перемешиваем. Выливаем получившуюся массу в форму, смазанную любым жиром, и отправляем в духовку, нагретую до 190°C, на 30 минут.',
      },
    },
  },
  advance: {
    image: noServer.advanceImage,
    hero_advance: 'Используйте только яблоки Голден',
    main: 'При приготовлении шарлотки обязательно используйте перчатки при доставании из духовки. Дайте шарлотке остыть после приготовления около часа. Подавайте с шариком мороженого и хорошим настроением:)',
  },
};



export const initialIngredient = {
  id: 1,
  name: 'Яблоки',
  protein: 0.3,
  fat: 0.2,
  carbs: 13.8,
  calories: 52,
};

export const initialIngredients = [
 { id: 1, name: 'Яблоки', protein: 0.3, fat: 0.2, carbs: 13.8, calories: 52 },
 { id: 2, name: 'Бананы', protein: 1.1, fat: 0.3, carbs: 22.8, calories: 89 },
 { id: 3, name: 'Морковь', protein: 0.9, fat: 0.2, carbs: 9.6, calories: 41 },
 { id: 4, name: 'Брокколи', protein: 2.8, fat: 0.4, carbs: 7.0, calories: 35 },
 { id: 5, name: 'Куриная грудка', protein: 31.0, fat: 3.6, carbs: 0.0, calories: 165 },
 { id: 6, name: 'Гречка', protein: 13.3, fat: 3.4, carbs: 71.5, calories: 343 },
 { id: 7, name: 'Яйца', protein: 12.6, fat: 9.5, carbs: 1.1, calories: 143 },
 { id: 8, name: 'Лосось', protein: 25.0, fat: 13.0, carbs: 0.0, calories: 208 },
 { id: 9, name: 'Рис белый', protein: 7.1, fat: 0.7, carbs: 78.9, calories: 365 },
 { id: 10, name: 'Шпинат', protein: 2.9, fat: 0.4, carbs: 3.6, calories: 23 },
 { id: 11, name: 'Картофель', protein: 2.0, fat: 0.1, carbs: 17.0, calories: 77 },
 { id: 12, name: 'Томаты', protein: 0.9, fat: 0.2, carbs: 3.9, calories: 18 },
 { id: 13, name: 'Огурцы', protein: 0.7, fat: 0.1, carbs: 3.6, calories: 16 },
 { id: 14, name: 'Авокадо', protein: 2.0, fat: 14.7, carbs: 8.5, calories: 160 },
 { id: 15, name: 'Овсянка', protein: 11.7, fat: 7.2, carbs: 66.3, calories: 389 },
 { id: 16, name: 'Говядина', protein: 26.1, fat: 17.0, carbs: 0.0, calories: 250 },
 { id: 17, name: 'Капуста', protein: 1.3, fat: 0.1, carbs: 5.8, calories: 25 },
 { id: 18, name: 'Перец болгарский', protein: 1.0, fat: 0.2, carbs: 6.0, calories: 27 },
 { id: 19, name: 'Творог 5%', protein: 21.0, fat: 5.0, carbs: 1.8, calories: 121 },
 { id: 20, name: 'Грибы шампиньоны', protein: 4.3, fat: 1.0, carbs: 1.0, calories: 27 },
 { id: 21, name: 'Чечевица', protein: 24.6, fat: 1.1, carbs: 60.1, calories: 352 },
 { id: 22, name: 'Миндаль', protein: 21.2, fat: 49.9, carbs: 21.6, calories: 579 },
 { id: 23, name: 'Клубника', protein: 0.7, fat: 0.3, carbs: 7.7, calories: 33 },
 { id: 24, name: 'Греческий йогурт', protein: 10.0, fat: 3.8, carbs: 4.0, calories: 59 },
 { id: 25, name: 'Лук репчатый', protein: 1.1, fat: 0.1, carbs: 9.3, calories: 40 },
 { id: 26, name: 'Чеснок', protein: 6.4, fat: 0.5, carbs: 33.1, calories: 149 },
 { id: 27, name: 'Кабачок', protein: 1.2, fat: 0.3, carbs: 3.4, calories: 17 },
 { id: 28, name: 'Тунец', protein: 29.0, fat: 1.0, carbs: 0.0, calories: 130 },
 { id: 29, name: 'Киноа', protein: 14.1, fat: 6.1, carbs: 64.2, calories: 368 },
 { id: 30, name: 'Мед', protein: 0.3, fat: 0.0, carbs: 82.4, calories: 304 },
];
