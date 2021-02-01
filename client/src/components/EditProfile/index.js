import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import '../EditProfile/style.css';

export default function EditProfile() {

  const [collapse, setCollapse] = useState(false);
  // const [status, setStatus] = useState('Closed');


  const toggle = () => {
    setCollapse(!collapse);

  };

  return (

    <section className="section-page">
      <div className="section-inner">
        <div className="row side-left">
          <div className="row-body">
            <div className="row-border">
              <div className="title-secondary">
                <h2 className="title-text">Account Settings</h2>
                <p className="title-note">Control, protect, and secure your account.</p>
              </div>
              <div className="form-table">
                <div className="form-body">
                  <table>
                    <colgroup>
                      <col style={{
                        width: "180px",
                        display: "table-column"
                      }} />
                    </colgroup>
                    <tbody>
                      <tr className="name-section">
                        <td>
                          <label className="form-label">Name</label>
                        </td>
                        <td>
                          <div className="collapsed">
                            <div className="username-section">Maggie Simpson</div>
                            <button onClick={toggle} type="button" className="btn btn-mini btn-tertiary accordion-btn-edit trigger-expand" id="ProfileButton">Edit</button>
                          </div>
                          <div className="expanded">
                            <Collapse isOpen={collapse}>
                              <div className="form-cells">
                                <form id="formName" method="post">
                                  <div className="form-cell layout-two">
                                    <label className="form-cell-name">First Name</label>
                                    <input type="text" className="form-wide" required maxLength="80" />
                                    <span></span>
                                  </div>
                                </form>
                              </div>
                              <div className="form-cells">
                                <form id="formName" method="post">
                                  <div className="form-cell layout-two">
                                    <label className="form-cell-name">Last Name</label>
                                    <input type="text" className="form-wide" required maxLength="80" />
                                    <span></span>
                                  </div>
                                  <div className="button-area">
                                    <button type="button" className="btn accordion-trigger-collapse" onClick={toggle} id="ProfileButton">Cancel</button>
                                    <button id="ProfileButton" type="button" className="btn btn-primary">Save Changes</button>
                                  </div>
                                </form>
                              </div>
                            </Collapse>
                          </div>
                        </td>
                      </tr>
                      <tr className="name-section">
                        <td>
                          <label className="form-label">E-mail</label>
                        </td>
                        <td>
                          <div className="collapsed">
                            <div className="username-section">maggie@gmail.com</div>
                            <button type="button" className="btn btn-mini btn-tertiary accordion-btn-edit trigger-expand" onClick={toggle} id="ProfileButton">Edit</button>
                          </div>
                          <div className="expanded">
                            <Collapse isOpen={collapse}>
                              <div className="form-cells">
                                <form id="formName" method="post">
                                  <div className="form-cell layout-two">
                                    <label className="form-cell-name">Current Password</label>
                                    <input type="password" autocomplete="off" className="form-wide" required maxLength="30" />
                                    <span></span>
                                  </div>
                                </form>
                              </div>
                              <div className="form-cells">
                                <form id="formName" method="post">
                                  <div className="form-cell layout-two">
                                    <label className="form-cell-name">New E-mail</label>
                                    <input type="text" className="form-wide" required maxLength="80" />
                                    <span></span>
                                  </div>
                                </form>
                              </div>
                              <div className="form-cells">
                                <form id="formName" method="post">
                                  <div className="form-cell layout-two">
                                    <label className="form-cell-name">Re-Enter New E-mail</label>
                                    <input type="text" className="form-wide" required maxLength="80" />
                                    <span></span>
                                  </div>
                                  <div className="button-area">
                                    <button type="button" className="btn accordion-trigger-collapse" onClick={toggle} id="ProfileButton">Cancel</button>
                                    <button id="ProfileButton" type="button" className="btn btn-primary">Save Changes</button>
                                  </div>
                                </form>
                              </div>
                            </Collapse>
                          </div>
                        </td>
                      </tr>
                      <tr className="name-section">
                        <td>
                          <label className="form-label">Password</label>
                        </td>
                        <td>
                          <div className="collapsed">
                            <div className="username-section">*******</div>
                            <button type="button" className="btn btn-mini btn-tertiary accordion-btn-edit trigger-expand" id="ProfileButton">Edit</button>
                          </div>
                          <div className="expanded">
                            <Collapse isOpen={collapse}>
                              <div className="form-cells">
                                <form id="formName" method="post">
                                  <div className="form-cell layout-two">
                                    <label className="form-cell-name">Current Password</label>
                                    <input type="password" autocomplete="off" className="form-wide" required maxLength="30" />
                                    <span></span>
                                  </div>
                                </form>
                              </div>
                              <div className="form-cells">
                                <form id="formName" method="post">
                                  <div className="form-cell layout-two">
                                    <label className="form-cell-name">New Password</label>
                                    <input type="password" autocomplete="off" className="form-wide" required maxLength="30" />
                                    <span></span>
                                  </div>
                                </form>
                              </div>
                              <div className="form-cells">
                                <form id="formName" method="post">
                                  <div className="form-cell layout-two">
                                    <label className="form-cell-name">Confirm Password</label>
                                    <input type="password" autocomplete="off" className="form-wide" required maxLength="30" />
                                    <span></span>
                                  </div>
                                  <div className="button-area">
                                    <button type="button" className="btn accordion-trigger-collapse" onClick={toggle} id="ProfileButton">Cancel</button>
                                    <button id="ProfileButton" type="button" className="btn btn-primary">Save Changes</button>
                                  </div>
                                </form>
                              </div>
                            </Collapse>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}