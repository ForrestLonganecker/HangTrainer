// add logic to interpret error objects and display dynamic
// information rather than requiring string input

// <ErrorSplash error={error} />

const ErrorSplash = ({ error }) => {
  console.log('{ERROR SPLASH}: ', error);
    return(
      <section className="error">
        {error}
        <style jsx>{`
        .error {
          background-color: red;
          color: white;
        } 
        `}</style>
      </section>
    );
};

export default ErrorSplash;