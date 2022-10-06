import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import Movies from '../components/Movies/Movies';
import Footer from '../components/Footer/Footer';

function PageMovies(props) {
  const { savedMovies, handleSaveMovie, handleDeleteMovie, isProcessing, setIsProcessing, setServerResponse, serverResponse } = props;

  return (
    <>
      <Header />
      <Content>
        <Movies
          savedMovies={savedMovies}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          setServerResponse={setServerResponse}
          serverResponse={serverResponse}
        />
      </Content>
      <Footer />
    </>
  );
}

export default PageMovies;
