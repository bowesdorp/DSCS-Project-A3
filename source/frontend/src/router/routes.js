import HomePage from '../page/HomePage';
import Result from '../page/Result';

export const RouteNames = {
  HOME: 'home',
  RESULT: 'Result',
};

export default [
  {
    path: '/',
    component: HomePage,
    name: RouteNames.HOME,
  },
  {
    path: '/result',
    component: Result,
    name: RouteNames.RESULT,
  },
];
