import React from "react";

function Registration() {
    return (
        <div>
            <div className="container-fluid">
                <div class="row main">

           
            <div className="col-5 qnMan align-self-center">
                <img src="questionMarkMan.jpg" alt=""/>
            </div>

  
            <div class="col-7 align-self-center">
                <h1>TELL ME MORE ABOUT YOURSELF</h1>
                <div class="text-center m-3" style="padding-top: 10px;">
                    <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off"/>
                    <label class="btn btn-dark btns" for="btn-check">LEARNER</label>
                    <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off"/>
                    <label class="btn btn-dark btns" for="btn-check">INSTRUCTOR</label>
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Full Name"/>
                </div>
                <div class="mb-3">
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email Address"/>
                </div>
                <div>
                    <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" placeholder="Password"/>
                </div>
                <div id="passwordHelpBlock" class="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
                <div class="text-center" style="padding-top: 10px;">
                    <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off"/>
                    <label class="btn btn-info btns" for="btn-check">Male</label>
                    <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off"/>
                    <label class="btn btn-danger btns" for="btn-check">Female</label>
                </div>
                <div style="padding-top: 10px;">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled>Language</option>
                        <option value="1">English</option>
                        <option value="2">Chinese</option>
                        <option value="3">Tamil</option>
                        <option value="4">Malay</option>
                  </select>
                </div>
                <div>
                    <a href="" class="arrow pt-5"><img src="right-arrow-50.png" alt=""/></a>
                </div>
            </div>
        </div>
    </div>
        </div>
    )    
}
    export default Registration;
