import { Outlet } from 'react-router-dom';
import RestoreScroll from '../RestoreScroll/RestoreScroll';
import Header from '../Header/Header';
import ThemeContextProvider from '../../context/ThemeContext';
import ThemeProvider from '../../providers/ThemeProvider';
import HomePage from '../../pages/Home';

export default function RootLayout() {
  return (
    <>
      <ThemeContextProvider>
        <ThemeProvider>
          <Header />

          <HomePage />
          <Outlet />

          <RestoreScroll />
        </ThemeProvider>
      </ThemeContextProvider>
    </>
  );
}
