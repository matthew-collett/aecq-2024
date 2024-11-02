export const navRoutes = {
  dashboard: { path: '/', icon: 'table-columns', label: 'Dashboard' },
}

export const routes = {
  ...navRoutes,
}

export const getTitle = pathname => {
  const key = pathname.replace('/', '')
  return key === '' ? routes.dashboard.label : routes[key].label
}
