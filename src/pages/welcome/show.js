import Link from "next/link";
import PageLayout from "../../components/layouts/PageLayout";

function WelcomeShow() {
  return (
    <PageLayout>
      <Link href="/welcome">
        <a>Go to welcome page</a>
      </Link>
    </PageLayout>
  );
}

export default WelcomeShow;
