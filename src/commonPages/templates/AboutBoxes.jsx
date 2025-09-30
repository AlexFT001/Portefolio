import './AboutBoxes.css'

function AboutBoxes ({ title, description }) {
    return (
        <>
        <div className="box">
          <h2>{title}</h2>
          <p style={{ color: "black" }}>
            {description}
          </p>
        </div>
        </>
    )

}

export default AboutBoxes