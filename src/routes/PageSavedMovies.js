import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import SavedMovies from '../components/SavedMovies/SavedMovies';
import Footer from '../components/Footer/Footer';

function PageSavedMovies() {
  return (
    <>
      <Header />
      <Content>
        <SavedMovies />
      </Content>
      <Footer />
    </>
  );
}

export default PageSavedMovies;
