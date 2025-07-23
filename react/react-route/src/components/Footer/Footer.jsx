import "./Footer.css"; // optional, for styling

export default function Footer({
  children,
  appName = "This Website",
  company = "SaraWebs",
  site = "https://sarawebs.com",
  year = new Date().getFullYear(),
}) {
  return (
    <footer className="footer">
      <div className="footer-content">
        {children}
        <div className="sb-copyright">
          <p>
            {appName} © {year}
            <br />
            Built with ❤️ by
            <a
              href={site}
              target="_blank"
              rel="noopener"
              style={{ color: "#207de9", textDecoration: "none" }}
            >
              {company}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
