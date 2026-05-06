export function formatDate(date: Date | string | undefined | null) {
  if (!date) return 'Hace un momento';

  const fileDate = new Date(date);
  if (isNaN(fileDate.getTime())) return 'Fecha inválida';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - fileDate.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Justo ahora';

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `Hace ${days} día${days > 1 ? 's' : ''}`;

  return new Intl.DateTimeFormat('es-AR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(fileDate);
}
