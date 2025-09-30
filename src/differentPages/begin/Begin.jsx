import './Begin.css'
import AboutBoxes from '../../commonPages/templates/AboutBoxes'

function Begin() {
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="avatar"></div>
          <div className="talk-bubble triangle">
            <div className="talktext">
              <p style={{ color: "lightgreen", fontStyle: "italic" }}>
                I'm someone that lives in the planet Earth.
              </p>
              <p style={{ color: "lightcoral", fontStyle: "italic", fontWeight: "bold" }}>
                Believe me!!
              </p>
            </div>
          </div>
        </div>
        <AboutBoxes
          title="History"
          description="All started with the BrightStart program!!!"
        />
      </div>
    </>
  )
}

export default Begin
