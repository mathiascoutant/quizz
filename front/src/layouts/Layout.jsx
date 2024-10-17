import Footer from '../components/Footer';
import Header from '../components/Header';

export const Layout = ({ children, isQuizzPage }) => {
  if (isQuizzPage) return children;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
