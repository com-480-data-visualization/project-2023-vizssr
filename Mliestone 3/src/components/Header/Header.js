import { header } from '../../portfolio'
import Navbar from '../Navbar/Navbar'
import './Header.css'

const Header = () => {
  // const { homepage, title } = header
    const homepage = 'https://github.com/com-480-data-visualization/project-2023-vizssr';
    const title = 'VizSSR';
  return (
    <header className='header center'>
      <h3 className='header_teamname'>
        {homepage ? (
          <a href={homepage} className='link'>
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <Navbar />
    </header>
  )
}

export default Header
