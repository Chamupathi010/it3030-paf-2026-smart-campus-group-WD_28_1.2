import AuthNavbar from "../components/AuthNavbar";
import SignInCard from "../components/SignInCard";
import Footer from "../components/Footer";

const SignInPage = () => {
  return (
    <div className="bg-background font-body text-on-surface-variant min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <AuthNavbar />

      <main className="flex-grow flex items-center justify-center py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-container/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl"></div>
        </div>

        <SignInCard />
      </main>

      <Footer />
    </div>
  );
};

export default SignInPage;