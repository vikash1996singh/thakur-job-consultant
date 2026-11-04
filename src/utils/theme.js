export const getThemeClasses = (theme) => {
  switch (theme) {
    case 'emerald':
      return {
        name: 'Emerald Growth',
        primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        primaryText: 'text-emerald-600',
        primaryBgSoft: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        primaryBorder: 'border-emerald-600',
        gradientHero: 'from-slate-900 via-emerald-950 to-slate-900',
        accentRing: 'focus:ring-emerald-500',
        badge: 'bg-emerald-100 text-emerald-800'
      };
    case 'slate':
      return {
        name: 'Midnight Pro',
        primary: 'bg-slate-900 hover:bg-slate-800 text-white',
        primaryText: 'text-slate-900',
        primaryBgSoft: 'bg-slate-100 text-slate-800 border-slate-300',
        primaryBorder: 'border-slate-900',
        gradientHero: 'from-gray-950 via-slate-900 to-black',
        accentRing: 'focus:ring-slate-700',
        badge: 'bg-slate-200 text-slate-800'
      };
    case 'indigo':
    default:
      return {
        name: 'Royal Indigo',
        primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        primaryText: 'text-indigo-600',
        primaryBgSoft: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        primaryBorder: 'border-indigo-600',
        gradientHero: 'from-slate-950 via-indigo-950 to-slate-900',
        accentRing: 'focus:ring-indigo-500',
        badge: 'bg-indigo-100 text-indigo-800'
      };
  }
};
