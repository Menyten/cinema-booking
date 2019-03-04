import React from 'react';
import FrontpageCarousel from '../FrontpageCarousel';
import { Container, Row, Col} from 'reactstrap';
import './startpage.scss';
import auditoriumSeatImage from '../../images/testaudii.jpg';

const Startpage = () => {
  return (
    <Container>
      <Row>
        <Col xs="12" lg="7">
        <div>
          <h1 className="frontHeadline">Filmvisarna AB</h1>
          <p className="frontParagraph">Våra nuvarande filmer:</p>
        </div>
        <FrontpageCarousel />
        </Col>
        <Col xs="12" lg="5">
        <h1 className=" frontHeadline auditoriumInfo text-center">Våra salonger</h1>
        <img src={auditoriumSeatImage} className="audi-image mx-auto d-block" alt=""/>
        <p className="frontParagraph infoAudiText text-center">Stora Salongen: 81st <i className="fas fa-couch "></i> - IMAX</p>
        <p className="frontParagraph infoAudiText text-center">Lilla Salongen: 55st <i className="fas fa-couch "></i> - IMAX</p>
        <p className="frontParagraph infoAudiText text-center">VIP Salongen: 15st <i className="fas fa-couch "></i> - IMAX</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Startpage;

/*
    </div>
    <div class="row ">
        <div class="col-12 col-lg-6 ">
            <h1 class="frontHeadline visitor-info ">Information till våra besökare</h1>
            <p class="frontParagraph infoForAll ">För allas trivsel har vi en del regler på denna biograf som måste följas vilket är följande:</p>
            <p class="frontParagraph ">
                <i class="fas fa-user-slash "></i> När fimen startat ska alla mobiltelefoner vara på ljudlöst läge eller avstängda.
            </p>
            <p class="frontParagraph ">
                <i class="fas fa-user-slash "></i> Ta med allt skräp och släng det i våra papperskorgar som är lokerade vid utgången när filmen är slut.
            </p>
            <p class="frontParagraph ">
                <i class="fas fa-user-slash "></i> Visa respekt för alla i salongen genom att vara tyst under filmens gång.
            </p>
            <h1 class="frontHeadline ">IMAX Ljud och Bild</h1>
            <p class="frontParagraph ">En förvånansvärt stor del av IMAX-upplevelsen utgörs av ljudet. Det är det som gör en IMAX-film till en fysisk upplevelse. En IMAX-film är inte bara något du ser – den känns i hela kroppen. En bidragande orsak till det är den rena kraften
                i det skräddarsydda, patentskyddade högtalarsystemet i en IMAX-salong. En annan är det utökade frekvensregistret, som ger högre höga ljud och så låga lägre ljud att de upplevs som vibrationer lika mycket som ljud. Hos oss har vi dessutom
                IMAX mest moderna 12-kanaliga ljudsystem. Systemet bygger på befintlig teknik men med ytterligare högtalare i taket ovanför publiken och på sidorna i salongen. Det här ger dig en ljudupplevelse som känns in ända in i benmärgen.</p>
            <p class="frontParagraph ">Allt fler ledande filmskapare använder patentskyddade IMAXkameror för att filma delar av sina filmer. IMAXkameror har världens högsta upplösning och används med 70 mm-film som projicerar en bild med tio gånger högre upplösning än 35 mm-film.
                Sekvenser som filmats med IMAX-kamera kan utvidgas så att de täcker hela filmduken, vilket är exklusivt för IMAX och gör att biobesökarna kan se upp till 40 procent mer av bilden med oöverträffad skärpa, klarhet och färgmättnad för en
                fängslande upplevelse. IMAX har också utvecklat en ny, högupplöst digital IMAX®3D-kamera.</p>
        </div>
        <div class="col-12 col-lg-6 ">
            <h1 class="frontHeadline visitor-info ">Vi har godis och popcorn!</h1>
            <img class="candyShop img-fluid" src="/images/godisbutik.jpg ">
            <p class="frontParagraph candyInfo ">Vi har en godisbutik med allt från godis till popcorn. Denna butik öppnar en timme innan den första visningen och stänger när den sista visningen för dagen börjat. Vi har olika popcorn menyer där dryck ingår, och dessa just nu säljs mest.
                En prislista på allting finns framme men om ni ändå har frågor finns vår personal redo för att besvara dem. Vi hoppas givetvis att ni har en trevlig vistelse hos oss! </p>
        </div>
    </div>
</div>

*/