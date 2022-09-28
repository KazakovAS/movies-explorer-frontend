import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import SearchForm from "../components/SearchForm/SearchForm";
import Footer from '../components/Footer/Footer';

function Movies() {
  return (
    <>
      <Header />
      <Content>
        <SearchForm />
      </Content>
      <Footer />
    </>
  );
}

export default Movies;
