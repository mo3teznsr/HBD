import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { OrderCreateView } from '../../../sections/order/view/order-create-view';



// ----------------------------------------------------------------------

const metadata = { title: `Create a new invoice | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrderCreateView />
    </>
  );
}
