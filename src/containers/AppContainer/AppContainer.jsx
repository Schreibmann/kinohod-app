import React from "react";
import axios from "axios";
import injectSheet from "react-jss";
import styles from "./style";
import Modal from "react-awesome-modal";
import ToolBar from "../../components/ToolBar/ToolBar";
import CityFilter from "../../components/CityFilter/CityFilter";
import DistanceFilter from "../../components/DistanceFilter/DistanceFilter";
import CardList from "../CardList/CardList";

const CITIES = "https://api.kinohod.ru/api/restful/v1/cities";
const CITY_CINEMAS = "https://api.kinohod.ru/api/restful/v1/cinemas?city=";

class AppContiner extends React.Component {
  state = {
    showModal: false,
    sortByDistance: false,
    positionRequestConfirmed:undefined,
    isLoading: false,
    position: undefined,
    cinemas: [],
    cities: [],
    cityID: undefined,
  };

  componentDidMount() {
    this.reset();
    this.init();
  }

  reset = () => {
    this.offset = 600;
    this.limit = 10;
  }

  init = () => {
    let cityID = localStorage.getItem('cityID');
    const sortByDistance = localStorage.getItem('sortByDistance');
    const positionRequestConfirmed = localStorage.getItem('positionRequestConfirmed');
    this.setState(
        {
          positionRequestConfirmed: !!positionRequestConfirmed,
          sortByDistance: !!sortByDistance,
          cityID: cityID || 1,
        }, () => { 
              this.setCities();
              if (sortByDistance && positionRequestConfirmed) {
                this.requestPosition();
                return;
                
              } 
                const { cityID } = this.state;
                this.setCinemas(cityID, this.limit);
            }
      );
    window.onscroll = () => {
      cityID = this.state;
      if (window.pageYOffset >= this.offset) {
        this.offset += 600;
        this.limit += 10;
        this.setCinemas(cityID, this.limit);
      }
    }
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal
    });
  };

  toggleFilter = () => {
    this.reset();
    const { positionRequestConfirmed, sortByDistance, cityID } = this.state;
    if (sortByDistance) {
      this.setState(
        {
          sortByDistance: false,
        }, () => {    
                    this.setCinemas(cityID);
                    localStorage.removeItem('sortByDistance');
                  }
      );
      return;
    } 
    if (positionRequestConfirmed) {
      this.requestPosition();
      return;
    } 
    this.toggleModal();
  };

  confirmPositionRequest = () => {
    this.toggleModal();
    this.requestPosition();
  };

  requestPosition = () => {
    if (!navigator.geolocation) {
      alert("Ваше устройство не поддерживает определение геопозиции!");
    } else {
      const { cityID } = this.state;
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.setState(
          {
            positionRequestConfirmed: true,
            sortByDistance: true,
            position: {
              lat: latitude,
              lon: longitude
            },
          }, () => { 
                      this.setCinemas(cityID);
                      localStorage.setItem('sortByDistance', true);
                      localStorage.setItem('positionRequestConfirmed', true);
                    }
        ) 
      });
      
    }
  };

  setCity = event => {
    this.reset();
    const id = event.target.value;
      this.setState({
          cityID: id
        }, () => { this.setCinemas(id, 10) }
      );
    localStorage.setItem('cityID', id);
  };

  setCities = () => {
    axios
      .get(CITIES)
      .then(response => {
        this.setState({
          cities: response.data.data
        });
      })
      .catch(error => 
        console.log(error)
      );
  };

  setCinemas = (cityId, limit) => {
    this.setState({
      isLoading: true
    });
    const { sortByDistance, position } = this.state;
    const filter = sortByDistance
      ? `distance&latitude=${position.lat}&longitude=${position.lon}`
      : "title";
    axios
      .get(`${CITY_CINEMAS}${cityId}&sort=${filter}&limit=${limit}`)
      .then(response => {
        this.setState(
          {
            cinemas: response.data.data
          }, () => {
                this.setState({
                isLoading: false
              });
          }
          
        );
      })
      .catch(error =>
        console.log(error)
      );
  };

  render() {
    const {
      showModal,
      isLoading,
      cinemas,
      cities,
      cityID,
      sortByDistance
    } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        {showModal && (
          <Modal
            visible={showModal}
            width="640px"
            effect="fadeInDown"
            onClickAway={this.toggleModal}
          >
            <div className={`${classes.modalContentWrapper} ${classes.col}`}>
              <div className={styles.col}>
                <p>
                  Для того чтобы показать ближайшие к Вам кинотеатры, нам
                  необходимо знать где Вы находитесь. Для этого нам нужно
                  разрешение на определение Вашего местоположения
                </p>
              </div>
              <div className={styles.col}>
                <button className="btn" onClick={this.toggleModal}>
                  Отмена
                </button>
                <button className="btn" onClick={this.confirmPositionRequest}>
                  Ok
                </button>
              </div>
            </div>
          </Modal>
        )}
        <div className={classes.container}>
          <ToolBar>
            <CityFilter
              cityID={cityID}
              cities={cities}
              setCity={this.setCity}
            />
            <DistanceFilter
              sortByDistance={sortByDistance}
              toggleFilter={this.toggleFilter}
            />
            {isLoading ? <span className={classes.loading}>Данные загружаются...</span> : null }
          </ToolBar>
          <CardList cinemas={cinemas} />
        </div>
      </React.Fragment>
    );
  }
}

const component = injectSheet(styles)(AppContiner);

export default component;

