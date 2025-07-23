import './Header.css';

export default function Header({
  title,
  subtitle,
  left = null,
  right = null,
  className = '',
}) {
  return (
    <header className={`header ${className}`}>
      <div className="header-content">
        {left && <div className="header-side header-left">{left}</div>}

        <div className="header-main">
          <h1 className="header-title">{title}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>
        {right && <div className="header-side header-right">{right}</div>}
      </div>
    </header>
  );
}
