import { useContext, useState } from 'react'
import { Link } from 'react-scroll';
import { Nav } from 'rsuite';
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import { ThemeContext } from '../../contexts/theme'
import { projects, skills, contact } from '../../portfolio'
import './Navbar.css'

const Navbar = () => {
    const [{ themeName, toggleTheme }] = useContext(ThemeContext)
    const [showNavList, setShowNavList] = useState(false)

    const toggleNavList = () => setShowNavList(!showNavList)

    return (
        <nav className='center nav'>
            <Nav
                style={{ display: showNavList ? 'flex' : null }}
                className='nav__list'
            >
                <Nav.Item>
                    <Link
                        activeClass="active"
                        to="mapPlot"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={toggleNavList}
                        className='link link--nav'
                    >
                        City Cartography
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link
                        activeClass="active"
                        to="bumpPlot"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={toggleNavList}
                        className='link link--nav'
                    >
                        Urban Evolution
                    </Link>
                </Nav.Item>

                <Nav.Item>
                    <Link
                        activeClass="active"
                        to="scatterPlot"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={toggleNavList}
                        className='link link--nav'
                    >
                        City Dynamics
                    </Link>
                </Nav.Item>

                <Nav.Item>
                    <Link
                        activeClass="active"
                        to="swarmPlot"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={toggleNavList}
                        className='link link--nav'
                    >
                        Global Living Standards
                    </Link>
                </Nav.Item>

                <Nav.Item>
                    <Link
                        activeClass="active"
                        to="radarPlot"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={toggleNavList}
                        className='link link--nav'
                    >
                        Interactive City Comparison
                    </Link>
                </Nav.Item>

                <Nav.Item>
                    <Link
                        activeClass="active"
                        to="conclusion"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={toggleNavList}
                        className='link link--nav'
                    >
                        Final Thoughts
                    </Link>
                </Nav.Item>
            </Nav>

            {/*<button*/}
            {/*    type='button'*/}
            {/*    onClick={toggleTheme}*/}
            {/*    className='btn btn--icon nav__theme'*/}
            {/*    aria-label='toggle theme'*/}
            {/*>*/}
            {/*    {themeName === 'dark' ? <WbSunnyRoundedIcon /> : <Brightness2Icon />}*/}
            {/*</button>*/}

            {/*<button*/}
            {/*    type='button'*/}
            {/*    onClick={toggleNavList}*/}
            {/*    className='btn btn--icon nav__hamburger'*/}
            {/*    aria-label='toggle navigation'*/}
            {/*>*/}
            {/*    {showNavList ? <CloseIcon /> : <MenuIcon />}*/}
            {/*</button>*/}
        </nav>
    )
}

export default Navbar
