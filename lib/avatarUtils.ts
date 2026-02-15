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
    'bg-gradient-to-br from-red-400 to-red-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-teal-400 to-teal-600',
    'bg-gradient-to-br from-orange-400 to-orange-600',
    'bg-gradient-to-br from-cyan-400 to-cyan-600'
  ];
  
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

// Generate random avatar image from placeholder API
export const getRandomAvatarImage = (name: string, size: number = 200): string => {
  const initials = getAvatarFallback(name);
  const colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E2'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];
  
  // Use placeholder service to generate beautiful avatars
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&size=${size}&backgroundColor=${bgColor}`;
};
