export const loadImage = async (url:string) => {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
  } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
  }
};