import  "./Buttons.scss";

export default function ButtonSignIn() {
    return (
        <button onClick={() => window.location.href = '#contact'} className="button" >
            Inscription
        </button>
    );
}