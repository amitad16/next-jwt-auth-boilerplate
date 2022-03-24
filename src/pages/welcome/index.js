import Link from "next/link";
import PageLayout from "../../components/layouts/PageLayout";
import Welcome from "../../components/welcome/Welcome";

function WelcomePage() {
  return (
    <PageLayout>
      <Welcome />
      <Link href="/welcome/show">
        <a>Go to welcome show page</a>
      </Link>
    </PageLayout>
  );
}

export default WelcomePage;
