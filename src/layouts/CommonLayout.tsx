import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';

type Props = {
  children: React.ReactNode;
};

export default function CommonLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
