import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import './SavedMovies.css';
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";

function SavedMovies(props) {
  const { savedMovies, handleDeleteMovie, isProcessing, serverResponse } = props;

  return (
    <section className="saved-movies">
      <div className="saved-movies__wrapper">
        <SearchForm
          handleSearchForm={handleSearchForm}
          handleShortFilms={handleShortFilms}
          shortMoviesStatus={shortMoviesStatus}
          isProcessing={isProcessing}
          serverResponse={serverResponse}
        />
        <>
          { isProcessing && <Preloader /> }

          { notFound
            ? <NoResults />
            : <MoviesCardList
              movies={ shortMoviesStatus ? filteredShortMovies : searchesMovies }
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />
          }
        </>
      </div>
    </section>
  );
}

export default SavedMovies;
