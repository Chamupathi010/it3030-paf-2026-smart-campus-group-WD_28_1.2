import SignUpNavbar from "../components/SignUpNavbar";
import SignUpCard from "../components/SignUpCard";
import SignUpFooter from "../components/SignUpFooter";

const SignUpPage = () => {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col">
      <SignUpNavbar />

      <main className="flex-grow flex items-center justify-center py-16 px-6 bg-surface-container-low">
        <SignUpCard />
      </main>

      <SignUpFooter />
    </div>
  );
};

export default SignUpPage;