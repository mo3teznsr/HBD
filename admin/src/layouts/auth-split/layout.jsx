import Alert from '@mui/material/Alert';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { Section } from './section';
import { Main, Content } from './main';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';
import { allLangs } from 'src/locales';

// ----------------------------------------------------------------------

export function AuthSplitLayout({ sx, section, children }) {
  const mobileNavOpen = useBoolean();

  const layoutQuery = 'md';

  return (
    <LayoutSection
      headerSection={
        /** **************************************
         * Header
         *************************************** */
        <HeaderBase
          disableElevation
          layoutQuery={layoutQuery}
          data={{
            langs: allLangs,
          }}
          onOpenNav={mobileNavOpen.onTrue}
          slotsDisplay={{
            signIn: false,
            account: false,
            purchase: false,
            contacts: false,
            searchbar: false,
            workspaces: false,
            menuButton: false,
            localization: true,
            notifications: false,
            settings: false,
            helpLink: false,
          }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
          }}
          slotProps={{ container: { maxWidth: false } }}
          sx={{ position: { [layoutQuery]: 'fixed' } }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      sx={sx}
      cssVars={{
        '--layout-auth-content-width': '100%',
      }}
    >
      <Main layoutQuery={layoutQuery}>
        <Section
          title={"HBD"}
          layoutQuery={layoutQuery}
          imgUrl={section?.imgUrl}
          method={CONFIG.auth.method}
          subtitle={section?.subtitle}
          methods={[
            // {
            //   label: 'Jwt',
            //   path: paths.auth.jwt.signIn,
            //   icon: `${CONFIG.site.basePath}/assets/icons/platforms/ic-jwt.svg`,
            // },
            // {
            //   label: 'Firebase',
            //   path: paths.auth.firebase.signIn,
            //   icon: `${CONFIG.site.basePath}/assets/icons/platforms/ic-firebase.svg`,
            // },
            // {
            //   label: 'Amplify',
            //   path: paths.auth.amplify.signIn,
            //   icon: `${CONFIG.site.basePath}/assets/icons/platforms/ic-amplify.svg`,
            // },
            // {
            //   label: 'Auth0',
            //   path: paths.auth.auth0.signIn,
            //   icon: `${CONFIG.site.basePath}/assets/icons/platforms/ic-auth0.svg`,
            // },
            // {
            //   label: 'Supabase',
            //   path: paths.auth.supabase.signIn,
            //   icon: `${CONFIG.site.basePath}/assets/icons/platforms/ic-supabase.svg`,
            // },
          ]}
        />
        <Content layoutQuery={layoutQuery}>
          <div className='p-4'>{children}
          </div></Content>
      </Main>
    </LayoutSection>
  );
}
