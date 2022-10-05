import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import Movies from '../components/Movies/Movies';
import Footer from '../components/Footer/Footer';

function PageMovies(props) {
  const { handleSearchFormSubmit, isProcessing, serverResponse } = props;

  return (
    <>
      <Header />
      <Content>
        <Movies
          handleSearchFormSubmit={handleSearchFormSubmit}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </Content>
      <Footer />
    </>
  );
}

export default PageMovies;
