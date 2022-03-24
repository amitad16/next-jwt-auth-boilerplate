import Link from "next/link";
import PageLayout from "../../components/layouts/PageLayout";

function AdminShow() {
  return (
    <PageLayout>
      <Link href="/admin">
        <a>Go to admin page</a>
      </Link>
    </PageLayout>
  );
}

export default AdminShow;
