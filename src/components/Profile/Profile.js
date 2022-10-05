import './Profile.css';

function Profile(props) {
  const { handleSignOutClick } = props;

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__header">Привет, Виталий!</h1>

        <dl className="profile__info">
          <div className="profile__item">
            <dt className="profile__term">Имя</dt>
            <dd className="profile__details">Виталий</dd>
          </div>
          <div className="profile__item">
            <dt className="profile__term">E-mail</dt>
            <dd className="profile__details">pochta@yandex.ru</dd>
          </div>
        </dl>

        <div className="profile__controls controls-profile">
          <button className="controls-profile__item">
            Редактировать
          </button>

          <button
            className="controls-profile__item controls-profile__item_type_logout"
            onClick={handleSignOutClick}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
