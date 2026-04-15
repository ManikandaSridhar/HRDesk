export const ini = (n) =>
  (n || '?')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const avColors = [
  ['#E1F5EE', '#0F6E56'],
  ['#E6F1FB', '#185FA5'],
  ['#EEEDFE', '#534AB7'],
  ['#FAEEDA', '#854F0B'],
  ['#FBEAF0', '#993556'],
];

export const av = (i) => avColors[i % avColors.length];

export const gradeBadge = (g) => {
  if (!g) return 'bgy';
  if (g.startsWith('A')) return 'bg';
  if (g.startsWith('B')) return 'bb';
  if (g === 'F') return 'br';
  return 'ba';
};

export const statusBadge = (s) => {
  if (s === 'Active') return 'bt';
  if (s === 'Warning') return 'ba';
  return 'br';
};

export const calcAvgGrade = (employees) => {
  const gMap = {
    'A+': 4.3,
    A: 4,
    'B+': 3.3,
    B: 3,
    'C+': 2.3,
    C: 2,
    F: 0,
  };
  if (!employees.length) return '—';
  const avg =
    employees.reduce((s, x) => s + (gMap[x.grade] || 0), 0) / employees.length;
  if (avg >= 4) return 'A';
  if (avg >= 3.3) return 'B+';
  if (avg >= 3) return 'B';
  if (avg >= 2) return 'C';
  return '—';
};

export const pwStrength = (pw) => {
  if (!pw)
    return { width: '0%', color: '#E5E3DC', label: 'Enter a password' };
  if (pw.length < 6)
    return { width: '25%', color: '#E57373', label: 'Too short' };
  if (pw.length < 8)
    return { width: '50%', color: '#FFB74D', label: 'Fair' };
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw))
    return { width: '100%', color: '#4CAF50', label: 'Strong' };
  return { width: '75%', color: '#1D9E75', label: 'Good' };
};
