import React from "react";
import "./App.css";

function Certificate({ name, topic }) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="certificate">
      {/* Corner Borders */}
      <div className="corner top-left"></div>
      <div className="corner bottom-right"></div>

      {/* Header */}
      <div className="certificate-header">
  <div className="header-left">
    <div className="ieee-text">IEEE</div>
    <div className="scholarconnect-text">ScholarConnect</div>
  </div>

  <div className="header-center">
    <h2 className="kongu-title">Kongu Engineering College</h2>
    <h2 className="certificate-title">IEEE Conference</h2>
  </div>

  <div className="header-right">
    <img
      src="https://kongu.ac.in/static/media/kec.56c567670e372735fdb8.png"
      alt="Kongu Engineering College"
      className="kongu-logo"
    />
  </div>
</div>

      {/* Body */}
      <div className="certificate-body">
        <p className="intro-text">This is to certify that</p>
        <h2 className="highlight">{name}</h2>
        <p className="intro-text">has successfully presented the paper titled</p>
        <h3 className="highlight">"{topic}"</h3>
        <p className="details-text">
          at the <b>IEEE Conference on Innovations in Computer Applications</b> organised by 
          <b> Kongu Engineering College</b>, Tamil Nadu, India.
        </p>
      </div>

      {/* Footer */}
      <div className="certificate-footer">
        <div className="signature">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Signature.png"
            alt="Signature"
            className="signature-img"
          />
          <p>Conference Chair</p>
        </div>

        <div className="signature">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Signature_Example.png"
            alt="Signature"
            className="signature-img"
          />
          <p>General Chair</p>
        </div>
      </div>

      {/* Date */}
      <div className="issued-date">Issued on: {today}</div>
    </div>
  );
}

export default Certificate;
