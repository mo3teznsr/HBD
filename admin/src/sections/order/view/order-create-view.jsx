import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { OrderNewEditForm } from '../order-new-edit-form';
import { useTranslation } from 'react-i18next';



// ----------------------------------------------------------------------

export function OrderCreateView() {
  const {t}=useTranslation();
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={t("Create a new order")}
        links={[
          { name: t('Dashboard'), href: paths.dashboard.root },
          { name: t('Orders'), href: paths.dashboard.invoice.root },
          { name: t('New Order') },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <OrderNewEditForm />
    </DashboardContent>
  );
}
