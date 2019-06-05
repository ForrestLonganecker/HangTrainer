import Navbar from '../components/Navbar/Navbar';

// https://github.com/jimmylee/next-postgres/blob/3206c567e874c0438202fb84fab0f45809659f7c/components/CommentPreview.js#L45

const SignUp = () => (
  <section>
    <h1>Sign up</h1>
    <Navbar />
    <p>Sign up to start recording your hangs!</p>
    {/* action/method need to be defined as fn above */}
    <form action="users/create" method="post">
      <section>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
        <small>email address must be a valid address</small>
      </section>

      <section>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" aria-describedby="passwordHelp" placeholder="Enter password" />
        <small>password must match confirmation below</small>
      </section>

      <section>
        <label htmlFor="passwordConfirmation">Password confirmation</label>
        <input type="password" name="passwordConfirmation" aria-describedby="passwordHelp" placeholder="Enter password confirmation" />
      </section>

      <button type="submit">Sign up</button>
    </form>
  </section>
)

export default SignUp;