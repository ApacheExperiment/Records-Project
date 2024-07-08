import  "./Buttons.scss";

export default function ButtonLog() {
    return (
        <button onClick={() => window.location.href = '#contact'} className="button" >
            Connexion
        </button>
    );
}