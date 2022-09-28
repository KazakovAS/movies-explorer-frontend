import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import Promo from '../components/Promo/Promo';
import NavTab from '../components/NavTab/NavTab';
import AboutProject from '../components/AboutProject/AboutProject';
import Techs from '../components/Techs/Techs';
import AboutMe from '../components/AboutMe/AboutMe';
import Portfolio from '../components/Portfolio/Portfolio';
import Footer from '../components/Footer/Footer';

function Main() {
  return (
    <>
      <Header />
      <Content>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </Content>
      <Footer />
    </>
  );
}

export default Main;
