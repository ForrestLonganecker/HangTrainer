import Link from 'next/link';

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle} title="home page">Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle} title="about page">About</a>
    </Link>
  </div>
);

export default Header;