import PageLayout from "../components/layouts/PageLayout";
import ResetPassword from "../components/auth/ResetPassword";

function ResetPasswordPage() {
  return (
    <PageLayout pageTitle="Reset Password" showNav={false}>
      <ResetPassword />
    </PageLayout>
  );
}

export default ResetPasswordPage;
