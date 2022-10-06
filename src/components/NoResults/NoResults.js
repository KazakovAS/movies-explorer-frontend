import './NoResults.css';

function NoResults() {
  return (
    <div className="no-results">
      <h1 className="no-results__header">
        Ничего не найдено.
      </h1>
      <p className="no-results__message">
        Попробуйте ввести другой запрос и повторить попытку!
      </p>
    </div>
  );
}

export default NoResults;
