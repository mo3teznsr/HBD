import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { StaffListView } from 'src/sections/staff/view';


// ----------------------------------------------------------------------

const metadata = { title: `User list | Dashboard - ${CONFIG.site.name}` };

export default function StaffListPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StaffListView />
    </>
  );
}
