export const navRoutes = {
  dashboard: { path: '/', icon: 'table-columns', label: 'Dashboard' },
  journal: { path: '/journal', icon: 'newspaper', label: 'Journal' },
  prediction: { path: '/prediction', icon: 'bolt', label: 'Planning' },
  cropinfo: { path: '/cropinfo', icon: 'plus', label: 'Crop Rotation Suggestions' },
}

export const routes = {
  ...navRoutes,
}

export const getTitle = pathname => {
  const key = pathname.replace('/', '')
  return key === '' ? routes.dashboard.label : routes[key].label
}
