import DontImg from '../../assets/dont.jpg'; // adjust path relative to component

import './DontPlease.css'; // optional for styling

function DontPlease() {
    return (
        <>
            <div className="angryCat">
                <img src={DontImg} alt="I told you!!!" />
                <h1>I told you!!!</h1>
            </div>
        </>
    )
}

export default DontPlease;
