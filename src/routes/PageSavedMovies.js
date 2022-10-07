import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import SavedMovies from '../components/SavedMovies/SavedMovies';
import Footer from '../components/Footer/Footer';
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

function PageSavedMovies(props) {
  const { savedMovies, handleDeleteMovie, isProcessing, serverResponse } = props;

  return (
    <>
      <Header />
      <Content>
        <SavedMovies
          savedMovies={savedMovies}
          handleDeleteMovie={handleDeleteMovie}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
      </Content>
      <Footer />
    </>
  );
}

export default PageSavedMovies;
