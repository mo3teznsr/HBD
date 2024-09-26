import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { signUp } from 'src/auth/context/jwt';
import { useAuthContext } from 'src/auth/hooks';
import { useTranslation } from 'react-i18next';


// ----------------------------------------------------------------------

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
    company:zod.object({
      name:zod.object({
        en:zod.string().min(1, { message: 'Company name (English) is required!' }),
        ar:zod.string().min(1, { message: 'Company name (Arabic) is required!' }),
      }),
      city: zod.string().min(1, { message: 'City is required!' }),
      area:zod.string().min(1, { message: 'Area is required!' }),
      address: zod.string().min(1, { message: 'Address is required!' }),
    })
});

// ----------------------------------------------------------------------

export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext();

  const router = useRouter();

  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data);
      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error({error:error.error});
      setErrorMsg(error?.error? error?.error : error);
    }
  });

  const {t}=useTranslation()

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">{t("Create Company Profile")}</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t("Already have an account?")}
        </Typography>

        <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
          {t("Sign in")}
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <h3 className='text-heading font-semibold text-lg'>{t("Company Information")}</h3>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Field.Text name="company.name.en" label={t("Comapny name (English)")} placeholder={t("Comapny name (English)")} InputLabelProps={{ shrink: true }} />
        <Field.Text name="company.name.ar" label={t("Company name (Arabic)")} placeholder={t("Company name (Arabic)")} InputLabelProps={{ shrink: true }} />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Field.Text  name="company.city" label={t("City")} placeholder={t("City")} InputLabelProps={{ shrink: true }} />
        <Field.Text name="company.area" label={t("Area")} placeholder={t("Area")} InputLabelProps={{ shrink: true }} />
        <Field.Text name="company.address" label={t("Address")} placeholder={t("Address")} InputLabelProps={{ shrink: true }} />
      </Stack>

      <h3 className='text-heading font-semibold'>{t("Company Admin User")}</h3>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Field.Text name="firstName" label={t("First name")} placeholder={t("First name")} InputLabelProps={{ shrink: true }} />
        <Field.Text name="lastName" label={t("Last name")} placeholder={t("Last name")} InputLabelProps={{ shrink: true }} />
      </Stack>

      <Field.Text name="email" label={t("Email")} placeholder={t("Email")} InputLabelProps={{ shrink: true }} />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Field.Text
        name="password"
        label={t("Password")}
        placeholder={t("Password")}
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

<Field.Text
        name="confirmPassword"
        label={t("Password Confirmation")}
        placeholder={t("Password Confirmation")}
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      </Stack>
      <div className='flex '>
      <LoadingButton
        
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Create account..."
      >
        {t("Sign Up")}
      </LoadingButton>

      </div>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 3,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy policy
      </Link>
      .
    </Typography>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      {/* {renderTerms} */}
    </>
  );
}
