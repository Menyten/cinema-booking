import React from 'react';

const Carousel = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active currentClick"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1" className="currentClick"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2" className="currentClick"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3" className="currentClick"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="4" className="currentClick"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
        <img src="/images/armageddonCarousel.jpg" className="d-block w-100" alt="..."/>
        </div>
      </div>
    </div>
  )
}

export default Carousel;

/*

                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="/images/armageddonCarousel.jpg" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="/images/astarisbornCarousel.jpg" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="/images/birdboxCarousel.jpg" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="/images/mebeforeyouCarousel.jpg" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="/images/thegreatestshowmanCarousel.jpg" class="d-block w-100" alt="...">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>

        */