export const getAvatarFallback = (name: string): string => {
  const initials = name
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  return initials;
};

export const getAvatarBackgroundColor = (name: string): string => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-600',
    'bg-yellow-500',
    'bg-teal-500'
  ];
  
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};
