import Link from "next/link";
import PageLayout from "../../components/layouts/PageLayout";
import Admin from "../../components/admin/Admin";

function AdminPage() {
  return (
    <PageLayout>
      <Admin />
      <Link href="/admin/show">
        <a>Go to admin show page</a>
      </Link>
    </PageLayout>
  );
}

export default AdminPage;
