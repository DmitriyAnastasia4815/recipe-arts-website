/// <reference types="vite/client" />

// Добавь это объявление для SVG файлов
declare module '*.svg' {
  const content: string;
  export default content;
}

// Можешь добавить и для других типов изображений, если используешь
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}
