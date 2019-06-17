// <ErrorSplash error={error} />

const ErrorSplash = ({ error }) => {
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