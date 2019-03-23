import React, { Component } from 'react';
import './AdminPage.scss';
import {
  Container,
  Button,
  DropdownToggle,
  DropdownMenu,
  ButtonDropdown,
  DropdownItem,
  Row,
  Col,
  Table,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import REST from '../../REST';

class Movie extends REST { }
class Showtime extends REST { }
class Auditorium extends REST { }

class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.choseMovie = this.choseMovie.bind(this);
    this.deleteShowtime = this.deleteShowtime.bind(this);
    this.changeShowtime = this.changeShowtime.bind(this);
    this.editingShowtime = this.editingShowtime.bind(this);
    this.addingNewShowtime = this.addingNewShowtime.bind(this);
    this.addNewShowtime = this.addNewShowtime.bind(this);
    this.saveNewShowtime = this.saveNewShowtime.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.toggleAddShowtimeModal = this.toggleAddShowtimeModal.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.saveEditedShowtime = this.saveEditedShowtime.bind(this);
    this.generateShows = this.generateShows.bind(this);
    this.shuffleArr = this.shuffleArr.bind(this);

    this.state = {
      isOpen: false,
      movies: [],
      showtimes: [],
      selectedMovie: false,
      selectedValue: "",


    }

    this.showtimes = [];
    this.movie = [];
    this.saveShowtime = [];
  }

  async generateShows() {
    let date = new Date();
    let movies = ["The Greatest Showman", "Bird Box", "A Star Is Born", "Me Before You", "Armageddon"];
    let auditorium = await Auditorium.find();

    for (let i = 0; i < 84; i++) {
      if (i % 3 == 0) {
        date.setDate(date.getDate() + 1);
        movies = ["The Greatest Showman", "Bird Box", "A Star Is Born", "Me Before You", "Armageddon"];
        auditorium = await Auditorium.find();
      }

      let showtime = new Showtime({
        "auditorium": auditorium.pop()._id,
        "film": this.shuffleArr(movies).pop(),
        "date": date,
        "time": 17 + Math.floor(Math.random() * 3) + ':' + (Math.round(Math.random() < 0.5 ? 15 : 45))
      });
      console.log(await showtime.save());
    }
  }

  shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  async componentDidMount() {
    this.movie = await Movie.find();

    this.setState({ movies: this.movie });
    await this.render();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleAddShowtimeModal() {
    this.setState({
      addModal: !this.state.addModal
    });
  }

  toggleInput() {
    this.setState({
      inputModal: !this.state.inputModal
    });
  }

  choseMovie = async event => {
    this.showtimes.length = 0;
    await this.setState({
      selectedValue: event.target.value,
      title: event.target.value,
      selectedMovie: false
    });

    this.movieShowtime = await Showtime.find(`.find({film:"${this.state.title}"}).populate('auditorium.name').exec()`);
    await this.movieSelect(this.movieShowtime);
  };

  onDismiss() {
    this.setState({ modal: false, inputModal: false, addModal: false });
  }

  async deleteShowtime(event) {
    let delShowtime = event.currentTarget.value;
    this.infoShowtime = await Showtime.find(`.find({_id:"${delShowtime}"})`);

    this.delShowtimeTitle = this.infoShowtime[0].film;
    this.delShowtimeDate = this.infoShowtime[0].date;
    this.delShowtimeTime = this.infoShowtime[0].time;

    this.deletedShowtime = await Showtime.find(
      `.findOneAndDelete({_id:"${delShowtime}"})`
    );

    this.setState({ modal: true });
    this.getNewData(this.delShowtimeTitle)

  }

  async changeShowtime(event) {
    let editShowtime = event.currentTarget.value;
    this.editThisShowtime = await Showtime.find(`.find({_id:"${editShowtime}"})`);
    let showtimeId = this.editThisShowtime;
    this.editTitle = this.editThisShowtime[0].film;
    this.editDate = this.editThisShowtime[0].date;
    this.editAudit = this.editThisShowtime[0].auditorium;
    this.editTime = this.editThisShowtime[0].time;

    this.setState({ inputModal: true });
    this.saveShowtime.push(showtimeId);
  }

  async editingShowtime(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  async saveEditedShowtime() {
    let { auditorium, time, date } = this.state;
    let showtimeId = this.saveShowtime[0][0]._id;
    let showtimeTitle = this.saveShowtime[0][0].film;

    let saveThisShowtime = await Showtime.find(`.findOneAndReplace({_id:'${showtimeId}' },
        {  "$set": {
          "date": '${date}',
          "auditorium": '${auditorium}',
          "time":'${time}' ,
      }
    },
        function(err,result){
            if (!err) {
                console.log(result);
            }
        })`);

    await this.setState({
      inputModal: false
    });

    this.getNewData(showtimeTitle);
  }

  async addingNewShowtime(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  async addNewShowtime() {
    this.setState({ addModal: true });
  }

  async saveNewShowtime() {
    let { title, timeAdd, salongAdd, dateAdd } = this.state;
    let toBeAdded = await Showtime.find(`.find({film:"${title}"})`);

    let newAddedShowtime = await new Showtime({
      film: title,
      auditorium: salongAdd,
      time: timeAdd,
      date: dateAdd
    });

    await newAddedShowtime.save();

    this.setState({
      addModal: false
    });

    this.getNewData(title);
  }

  async getNewData(showtimeTitle) {
    this.showtimes.length = 0;
    let newTitle = showtimeTitle;
    this.newData = await Showtime.find(`.find({film:"${newTitle}"})`);
    await this.movieSelect(this.newData);
    this.showtimes.push(this.newData);
    this.setState({
      selectedMovie: true
    });
  }

  movieSelect(movie) {
    if (this.showtimes.length < 1) {
      this.showtimes.push(movie);
    }
    if (this.state.selectedMovie === true) {
      return (
        <Container className="viewings-list">
          {this.showtimes[0].map(listitem => (
            <React.Fragment key={listitem._id}>
              <div className="view-select" />
              <Row className="adminShowtimes">
                <Col lg="10">
                  <Table className="adminviewings-table">
                    <tbody>
                      <tr>
                        <td>{listitem.film} </td>
                        <td>{listitem.auditorium} </td>
                        <td>{listitem.date.slice(0, 10)} </td>
                        <td>{listitem.time} </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="admin-box">
                    <button
                      value={listitem._id}
                      onClick={this.deleteShowtime}
                      role="img"
                      className="view-delete deleteAndAddButton"
                    >
                      ❌
                  </button>
                    <button
                      value={listitem._id}
                      onClick={this.changeShowtime}
                      role="img"
                      className="view-modify deleteAndAddButton"
                    >
                      ✎
                  </button>
                  </div>
                </Col>
              </Row>
            </React.Fragment>
          ))}
          <Button onClick={this.addNewShowtime} role="img" className="view-add mt-3 mb-4 adminChoseMovieButton">
            Lägg till en visning
          </Button>
        </Container>
      );
    }
    this.setState({ selectedMovie: true });
  }


  render() {
    return (
      <Container>
        {this.props.allUsers.admin === true ?
          <Container>
            <h1 className="frontParagraph adminText mt-3">Välkommen till Adminsidan</h1>
            <h4 className="frontParagraph adminText mt-1">Här kan du ändra, lägga till eller ta bort visningar</h4>
            <h4 className="frontParagraph adminText adminTextSize">VIP Salongen (ID): 5c6a8a173a65501db0956332 </h4>
            <h4 className="frontParagraph adminText adminTextSize">Lilla Salongen (ID): 5c6a8a173a65501db0956331 </h4>
            <h4 className="frontParagraph adminText adminTextSize">Stora Salongen (ID): 5c6a8a173a65501db0956330 </h4>
            <Row className="adminMovies">
              <Col md="12 mt-3">
                <Button className='adminChoseMovieButton' onClick={this.generateShows}>Generera visningar</Button>
              </Col>
              <Col md="12 mt-3">
                <ButtonDropdown
                  className="dropbutton-style"
                  isOpen={this.state.isOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle caret size="lg" className="adminChoseMovieButton mb-3">
                    {this.state.title ? this.state.selectedValue : "Välj film att redigera"}
                  </DropdownToggle>

                  <DropdownMenu className="adminDropdownMenu">
                    {this.state.movies.map(movie => (
                      <DropdownItem
                        value={movie.title}
                        onClick={this.choseMovie}
                        key={movie._id}
                        className="dropdown-item adminListItem"
                      >
                        {movie.title}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
                {this.state.selectedMovie === false ? '' : this.movieSelect()}
              </Col>
            </Row>
            <div>
              <Modal
                className="inputmodalstyle"
                isOpen={this.state.addModal}
                toggle={this.toggleAddShowtimeModal}
              >
                <ModalHeader
                  className="inputmodalstyle"
                  toggle={this.toggleAddShowtimeModal}
                >
                  Lägg till visning
            </ModalHeader>
                <ModalBody className="inputmodalstyle">
                  <div>
                    <p className="title-style-modal">
                      Lägg till en visning för filmen
                  <br /> {this.state.selectedValue}
                    </p>
                    <InputGroup className="input-box">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText className="input-styling">
                          Salong
                    </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.addingNewShowtime}
                        name="salongAdd"
                        className="underline-styling"
                        placeholder="Välj ID på salongen"
                      />
                    </InputGroup>
                    <InputGroup className="input-box">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText className="input-styling">
                          Tid
                    </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.addingNewShowtime}
                        name="timeAdd"
                        className="underline-styling"
                        placeholder="13:00"
                      />
                    </InputGroup>
                    <InputGroup className="input-box">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText className="input-styling">
                          Datum
                    </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type='date'
                        onChange={e => this.setState({ dateAdd: new Date(e.currentTarget.value).toISOString() })}
                        className="underline-styling"
                      />
                    </InputGroup>
                  </div>
                </ModalBody>
                <ModalFooter className="inputmodalstyle">
                  <Button color="primary" onClick={this.saveNewShowtime}>
                    Spara
              </Button>{" "}
                  <Button color="secondary" onClick={this.onDismiss}>
                    Cancel
              </Button>
                </ModalFooter>
              </Modal>
            </div>

            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="delete-modal"
            >
              <ModalHeader className="delete-modal" toggle={this.toggle}>
                Raderad visning
          </ModalHeader>
              <ModalBody className="delete-modal">
                <p className="deletedView-text"> Titel: {this.delShowtimeTitle}</p>
                <p className="deletedView-text"> Datum: {this.delShowtimeDate}</p>
                <p className="deletedView-text"> Tid: {this.delShowtimeTime}</p>
              </ModalBody>
              <ModalFooter className="delete-modal">
                <Button color="primary" onClick={this.onDismiss}>
                  Stäng
            </Button>
              </ModalFooter>
            </Modal>

            <div>
              <Modal
                className="inputmodalstyle"
                isOpen={this.state.inputModal}
                toggle={this.toggleInput}
              >
                <ModalHeader className="inputmodalstyle" toggle={this.toggleInput}>
                  Redigera visning
            </ModalHeader>
                <ModalBody className="inputmodalstyle">
                  <div>
                    <p className="title-style-modal">
                      Redigera visning för filmen
                  <br /> {this.editTitle}
                    </p>
                    <InputGroup className="input-box">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText className="input-styling">
                          Salong
                    </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.editingShowtime}
                        name="auditorium"
                        className="underline-styling"
                        placeholder={this.editAudit}
                      />
                    </InputGroup>
                    <InputGroup className="input-box">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText className="input-styling">
                          Tid
                    </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.editingShowtime}
                        name="time"
                        className="underline-styling"
                        placeholder={this.editTime}
                      />
                    </InputGroup>
                    <InputGroup className="input-box">
                      <Input
                        type='date'
                        onChange={e => this.setState({ date: new Date(e.currentTarget.value).toISOString() })}
                        className="underline-styling"
                      />
                    </InputGroup>
                  </div>
                </ModalBody>
                <ModalFooter className="inputmodalstyle">
                  <Button color="primary" onClick={this.saveEditedShowtime}>
                    Spara
              </Button>{" "}
                  <Button color="secondary" onClick={this.onDismiss}>
                    Cancel
              </Button>
                </ModalFooter>
              </Modal>
            </div>
          </Container>
          : <p className="auth">åtkomst nekad!</p>}
      </Container>
    )
  }


}

export default AdminPage;