import Link from 'next/link';

const Navbar = () => (
  <section>
    <Link href="/">
      <a title="HangTrainer Home">Home</a>
    </Link>
    <Link href="/about">
      <a title="About HangTrainer">About</a>
    </Link>
  </section>
)

export default Navbar;