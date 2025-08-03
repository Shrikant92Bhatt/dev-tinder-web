// Gender icon mapping
export const getGenderIcon = (gender) => {
  switch (gender?.toLowerCase()) {
    case 'male':
      return '👨';
    case 'female':
      return '👩';
    default:
      return '👤';
  }
};

// Age group color mapping
export const getAgeColor = (age) => {
  if (age < 25) return 'badge-primary';
  if (age < 35) return 'badge-secondary';
  if (age < 45) return 'badge-accent';
  return 'badge-neutral';
};

// Format user name
export const formatUserName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 120) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Get user display info
export const getUserDisplayInfo = (user) => {
  const { firstName, lastName, age, gender, about, skills } = user;
  
  return {
    fullName: formatUserName(firstName, lastName),
    ageColor: getAgeColor(age),
    genderIcon: getGenderIcon(gender),
    truncatedAbout: truncateText(about),
    skillCount: skills?.length || 0
  };
};

// Calculate profile completion percentage
export const getProfileCompletion = (user) => {
  if (!user) return 0;
  
  const fields = [
    user.firstName,
    user.lastName,
    user.email,
    user.age,
    user.gender,
    user.photoUrl,
    user.about,
    user.skills?.length > 0
  ];
  
  const filledFields = fields.filter(field => {
    if (typeof field === 'string') return field && field.trim().length > 0;
    if (typeof field === 'number') return field > 0;
    if (typeof field === 'boolean') return field;
    return false;
  });
  
  return Math.round((filledFields.length / fields.length) * 100);
};

// Get profile completion color based on percentage
export const getProfileCompletionColor = (percentage) => {
  if (percentage >= 80) return 'badge-success';
  if (percentage >= 60) return 'badge-warning';
  if (percentage >= 40) return 'badge-info';
  return 'badge-error';
}; 