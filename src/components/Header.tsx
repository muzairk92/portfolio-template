import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = ['Home', 'About Me', 'Works', 'Blog'];

function Header() {
  return (
    <header className="site-header">
      <div className="logo-pill">Uzair.</div>
      <nav className="nav-pill-group" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <a className="nav-pill" key={item} href="#">
            {item}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <button className="cta-button" type="button">
          Schedule a Call
        </button>
      </div>
    </header>
  );
}

export default Header;
