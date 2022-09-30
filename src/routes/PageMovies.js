import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import Movies from '../components/Movies/Movies';
import Footer from '../components/Footer/Footer';

function PageMovies() {
  return (
    <>
      <Header />
      <Content>
        <Movies />
      </Content>
      <Footer />
    </>
  );
}

export default PageMovies;
