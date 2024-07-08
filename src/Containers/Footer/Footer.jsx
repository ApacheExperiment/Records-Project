import { Link } from 'react-router-dom'
import Logo from "../../assets/img/Icon/vinyl-run.png"
import './footer.scss'


function Footer () {
    return ( 
        <footer>               
            <Link to="/" id="header">
                <img src={Logo} alt="logo kasa" className='logo' />
            </Link>
            <div className="copyrightWrap infoFooter">
                <p className="copyrightGap">© 2024 Records.</p> 
                <p className="copyrightGap">All rights reserved</p>
            </div>
            <Link>
                <ul className="infoFooter">
                    <li>A propos</li>
                    <li>Aide & Support</li>
                </ul>
            </Link>
            <Link>
                <ul className="infoFooter">
                    <li>Mentions Légales</li>
                    <li>Conditions Générales</li>
                </ul>
            </Link>
            <Link>
                <ul className="infoFooter">
                    <li>Contact</li>
                    <li>Réseaux</li>
                </ul>
            </Link>
                <div className="newsletterContainer">
                    <div className="newsletter">
                        <label htmlFor="email" className="newsletter__Text">Newsletter</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="hello@world.com" 
                            required 
                            className="newsletter__Input" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        value="Envoyer" 
                        className="newsletterBtn"
                    >S'abonner</button>
                </div>
        </footer>
    )
}

export default Footer