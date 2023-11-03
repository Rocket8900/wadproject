import React, { Component } from "react";
import styles from "./ErrorPage.module.css";

export class ErrorPageContainer extends Component {
  goHome = () => {
    // Add your logic to navigate to the home page here
  };

  render() {
    return (
      <div>
        <section className={styles.page_404}>
          <div className={`container ${styles.container}`}>
            <div className={`row ${styles.row}`}>
              <div className={`col-sm-12 ${styles.column}`}>
                <div className={` text-center ${styles.columnCentered}`}>
                  <div className={styles.four_zero_four_bg}>
                    <h1 className="text-center ">404 ERROR</h1>
                  </div>
                  <div className={styles.contentBox}>
                    <h3 className={`h2 ${styles.heading}`}>Something Went Wrong..!</h3>
                    <p>The page is not available!</p>
                    <a href={"/"} className={`link_404 ${styles.link}`} onClick={this.goHome}>
                      Go to Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ErrorPageContainer;
