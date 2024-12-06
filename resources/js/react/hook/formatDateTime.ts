export default function formatDateTime(isoString: string): string {
  // Преобразуем строку ISO в объект Date
  const date = new Date(isoString);
  
  // Форматируем дату и время
  const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      timeZoneName: undefined 
  };
  
  return date.toLocaleString('ru-RU', options);
}