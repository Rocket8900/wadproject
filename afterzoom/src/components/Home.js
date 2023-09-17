export function Home() {
    return <div>
        <section className="bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 order-2 order-lg-1">
                        <h1>Afterzoom</h1>
                        <p className="lead">Learning driving has never been easier </p>

                        <p><a href="#" className="btn btn-primary shadow mr-2">Log in</a><a href="#" className="btn btn-outline-primary">Sign up</a></p>
                    </div>
                <div className="col-lg-6 order-1 order-lg-2"><img src="img/fancyimage.jpg" alt="landing image" className="img-fluid"></img></div>
            </div>
        </div>
        </section>
        <section>
            <div className="container">
                <h2>Why join us</h2>
                <p className="text-muted mb-5">Learner</p>

          <div className="row">
                <div className="col-sm-6 col-lg-4 mb-3">

                    <h6>Find your best match</h6>
                    <p className="text-muted">Search through and filter to find the best driver for you</p>
                </div>
                <div className="col-sm-6 col-lg-4 mb-3">

                    <h6>Help book lessons</h6>
                    <p className="text-muted">Gone are the days of having to text teachers to ask when they are free</p>
                </div>
                <div className="col-sm-6 col-lg-4 mb-3">

                        <h6>Supplement your learning</h6>
                        <p className="text-muted">Practice our btt and ftt tips for guaranteed passes</p>
                </div>
      </div>
        </div>
      </section>

      <section>
            <div className="container">
                <p className="text-muted mb-5">Instructor</p>

          <div className="row">
                <div className="col-sm-6 col-lg-4 mb-3">

                    <h6>Find more students</h6>
                    <p className="text-muted">Employ our services to help find more students for you</p>
                </div>
                <div className="col-sm-6 col-lg-4 mb-3">

                    <h6>Help book lessons</h6>
                    <p className="text-muted">Chat with them using our chat feature for easier management</p>
                </div>
                <div className="col-sm-6 col-lg-4 mb-3">

                        <h6>Bookings with you</h6>
                        <p className="text-muted">Able to see your bookings anytime and anywhere</p>
                </div>
      </div>
        </div>
      </section>

      <div className="container-fluid px-2 px-md-4 py-5 mx-auto">
    <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-lg-9 col-xl-8">
            <div className="card card-main border-0 text-center">
                <h5 className="font-weight-bold mb-4">What our clients are sayingabout us.</h5>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item">
                            <div className="card border-0 card-0">
                                <div className="card profile py-3 px-4">
                                    <div className="text-center">

                                    </div>
                                    <h6 className="mb-0 mt-2">Marielle Haag</h6>
                                    <small>Backend Developer</small>
                                </div>

                                <p className="content mb-0">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                            </div>
                        </div>
                        <div className="carousel-item active">
                            <div className="card border-0 card-0">
                                <div className="card profile py-3 px-4">
                                    <div className="text-center">

                                    </div>
                                    <h6 className="mb-0 mt-2">Ximena Vegara</h6>
                                    <small>UI/UX Designer</small>
                                </div>

                                <p className="content mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua.</p>

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card border-0 card-0">
                                <div className="card profile py-3 px-4">
                                    <div className="text-center">

                                    </div>
                                    <h6 className="mb-0 mt-2">John Paul</h6>
                                    <small>UI/UX Designer</small>
                                </div>

                                <p className="content mb-0">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        {/*  Footer */}
        <div className="py-5 bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                    <h5>Bootstrap 101</h5>
                        <ul className="contact-info list-unstyled">
                            <li><a href="#" className="text-dark">hello@buddy.works</a></li>
                            <li><a href="#" className="text-dark">+00 000 00 000</a></li>
                        </ul>
                    <p className="text-muted">Some very vital disclaimer comes here.</p>
                    </div>
                <div className="col-lg-4 col-md-6">
                    <h5>Information</h5>
                        <ul className="links list-unstyled">
                            <li> <a href="#" className="text-muted">My Amazing Link</a></li>
                            <li> <a href="#" className="text-muted">My Amazing Link</a></li>
                            <li> <a href="#" className="text-muted">My Amazing Link</a></li>
                            <li> <a href="#" className="text-muted">My Amazing Link</a></li>
                        </ul>
                </div>
                <div className="col-lg-4 col-md-6">
                    <h5>More Info</h5>
                        <ul className="links list-unstyled">
                            <li> <a href="#" className="text-muted">My Amazing Link</a></li>
                            <li> <a href="#" className="text-muted">My Amazing Link</a></li>
                            <li> <a href="#" className="text-muted">My Amazing Link</a></li>
                            <li> <a href="#" className="text-muted">My Amazing Link</a></li>
                        </ul>
                </div>
            </div>
        </div>
    </div>
    <div className="py-3 bg-dark text-white">
        <div className="container">
            <div className="row">
                <div className="col-md-7 text-center text-md-left">
                    <p className="mb-md-0">(C) 2019 Buddy Corp. All rights reserved. </p>
                </div>
                <div className="col-md-5 text-center text-md-right">
                    <p className="mb-0">Bootstrap Landing Page by <a href="#" className="external text-white">Sufyan</a> </p>
                </div>
            </div>
        </div>
    </div>


    </div>
  }