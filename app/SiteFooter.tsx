// Shared footer: the full "CUEPA by ELIPAN GROUP" lockup (brand book: website,
// login, proposals), the brand line, and the one public contact address.
export const CONTACT_EMAIL = "marcoscuellar@elipangroup.com";

function Lockup(){
  return (
    <span className="lockup" aria-label="CUEPA by ELIPAN GROUP">
      {/* The mark grows to span both lines: top of CUEPA to bottom of "by ELIPAN GROUP". */}
      <svg className="lockup-mark" viewBox="0 0 74 72" aria-hidden="true">
        <rect x="0" y="0" width="30" height="72" fill="#fff"/>
        <rect x="42" y="0" width="30" height="72" fill="#2DD4BF"/>
      </svg>
      <span className="lockup-words">
        <span className="lockup-cuepa">CUEPA</span>
        <span className="lockup-by">by ELIPAN GROUP</span>
      </span>
    </span>
  );
}

export default function SiteFooter(){
  return (
    <footer className="site-footer">
      <p className="wordmark"><Lockup/></p>
      <p>MAKING ROOM FOR WHAT MATTERS.</p>
      <p>© 2026 CUEPA</p>
      <p className="footer-contact">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </footer>
  );
}
