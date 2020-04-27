import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg ">
                <a className="navbar-brand" href="#"><img src="../img/father-united.png"/>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <i className="fas fa-align-right text-light"></i>
                </button>
                <div className=" collapse navbar-collapse" id="navbarNav">
                <div className="mr-auto"></div>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="../index.html" >Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Network</a>
                      </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Mail</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Skills</a>
                    </li>
                  </ul>
                </div>
              </nav>
    )
}

export default Navbar;
