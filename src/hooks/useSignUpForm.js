const SignUpPage = () => {
  const {
    formData,
    setFormData,
    allFieldsValid,
    getAvatar,
    getAvatarMessage,
    getProgressWidth,
    handleSubmit,
  } = useSignUpForm();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-0">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Avatar & Message */}
          <div className="flex flex-col items-center gap-2 mb-4 pt-12 sm:pt-0">
            <motion.img
              src={getAvatar()}
              alt="Signup avatar"
              className="w-24 h-24 rounded-full border-4 border-primary"
              initial={{ y: 0 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.p
              key={getAvatarMessage()}
              className="text-base text-base-content font-semibold text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {getAvatarMessage()}
            </motion.p>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: getProgressWidth() }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label htmlFor="fullName" className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  id="fullName" // Adding id to input
                  type="text"
                  className={getInputClassName("fullName", formData.fullName)}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* More form fields */}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp || !allFieldsValid}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-base-content/60">
              Rejoining the party?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <HomePageConnectGame
        title="Create an account"
        subtitle="Join us and start connecting with others!"
      />
    </div>
  );
};

export default SignUpPage;
