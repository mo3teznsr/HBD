import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Field,schemaHelper } from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { IconPlaneArrival,IconPlaneDeparture,IconSearch } from '@tabler/icons-react';
import { useBoolean } from 'src/hooks/use-boolean';

import { today, fIsAfter } from 'src/utils/format-time';

import { _addressBooks } from 'src/_mock';



import { InvoiceNewEditDetails } from '../invoice/invoice-new-edit-details';
import { InvoiceNewEditAddress } from '../invoice//invoice-new-edit-address';
import { InvoiceNewEditStatusDate } from '../invoice//invoice-new-edit-status-date';
import { Button, InputAdornment, MenuItem } from '@mui/material';

export const NewInvoiceSchema = zod
  .object({
    invoiceTo: zod.custom().refine((data) => data !== null, { message: 'Invoice to is required!' }),
    createDate: schemaHelper.date({ message: { required_error: 'Create date is required!' } }),
    dueDate: schemaHelper.date({ message: { required_error: 'Due date is required!' } }),
    items: zod.array(
      zod.object({
        title: zod.string().min(1, { message: 'Title is required!' }),
        service: zod.string().min(1, { message: 'Service is required!' }),
        quantity: zod.number().min(1, { message: 'Quantity must be more than 0' }),
        // Not required
        price: zod.number(),
        total: zod.number(),
        description: zod.string(),
      })
    ),
    // Not required
    taxes: zod.number(),
    status: zod.string(),
    discount: zod.number(),
    shipping: zod.number(),
    totalAmount: zod.number(),
    invoiceNumber: zod.string(),
    invoiceFrom: zod.custom().nullable(),
  })
  .refine((data) => !fIsAfter(data.createDate, data.dueDate), {
    message: 'Due date cannot be earlier than create date!',
    path: ['dueDate'],
  });

// ----------------------------------------------------------------------

export function OrderNewEditForm({ currentInvoice }) {
  const router = useRouter();

  const loadingSave = useBoolean();

  const loadingSend = useBoolean();

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentInvoice?.invoiceNumber || 'INV-1990',
      createDate: currentInvoice?.createDate || today(),
      dueDate: currentInvoice?.dueDate || null,
      taxes: currentInvoice?.taxes || 0,
      shipping: currentInvoice?.shipping || 0,
      status: currentInvoice?.status || 'draft',
      discount: currentInvoice?.discount || 0,
      invoiceFrom: currentInvoice?.invoiceFrom || _addressBooks[0],
      invoiceTo: currentInvoice?.invoiceTo || null,
      totalAmount: currentInvoice?.totalAmount || 0,
      items: currentInvoice?.items || [
        {
          title: '',
          description: '',
          service: '',
          quantity: 1,
          price: 0,
          total: 0,
        },
      ],
    }),
    [currentInvoice]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSaveAsDraft = handleSubmit(async (data) => {
    loadingSave.onTrue();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      loadingSave.onFalse();
      router.push(paths.dashboard.invoice.root);
      console.info('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      loadingSave.onFalse();
    }
  });

  const handleCreateAndSend = handleSubmit(async (data) => {
    loadingSend.onTrue();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      loadingSend.onFalse();
      router.push(paths.dashboard.invoice.root);
      console.info('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      loadingSend.onFalse();
    }
  });

  const isOneWay=useBoolean(true);

  return (
    <Form methods={methods}>
        <div className='bg-white p-4 mb-4 rounded-2xl'>
        <div className='flex justify-between items-center gap-8 mb-4'>

            <div className='bg-slate-50 flex items-center font-medium py-3 px-4 rounded-full gap-2'>
                <div  onClick={isOneWay.onTrue} className={`px-6 py-4 rounded-full cursor-pointer ${isOneWay.value&&'bg-white'}`}>One Way</div>
                <div onClick={isOneWay.onFalse} className={`px-6 py-4 rounded-full cursor-pointer ${!isOneWay.value&&'bg-white'}`}>Round Trip</div>
            </div>

            <div className='flex-1 flex gap-2'>
                <Field.Select name="class" label="Class">
                    <MenuItem value="economy">Economy</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                    <MenuItem value="first">First</MenuItem>
                </Field.Select>
                <Field.Select name="adults" label="adults">
                    {Array.from({ length: 10 }, (_, i) => (
                      <MenuItem value={i } key={i}>{i }</MenuItem>
                    ))}
                </Field.Select>
                <Field.Select name="children" label="chilren">
                {Array.from({ length: 10 }, (_, i) => (
                      <MenuItem value={i } key={i}>{i }</MenuItem>
                    ))}
                </Field.Select>
                <Field.Select name="infants" label="infants">
                {Array.from({ length: 2 }, (_, i) => (
                      <MenuItem value={i } key={i}>{i }</MenuItem>
                    ))}
                </Field.Select>
            </div>

        </div>
        <div className='flex items-center  gap-3 mb-4'>
            <Field.Text name="from" InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconPlaneDeparture />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconSearch />
            </InputAdornment>
          ),
        }} label="From"></Field.Text>
            <Field.Text
             InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconPlaneArrival />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
             name="to" label="To"></Field.Text>

             <Field.DatePicker name="dateFrom" label="Date From"></Field.DatePicker>

             {!isOneWay.value && <Field.DatePicker name="dateTo" label="Date To"></Field.DatePicker>}

             <Button variant="contained" className=' h-10 '> search</Button>

        </div>

        </div>
      <Card>
        {/* <InvoiceNewEditAddress /> */}

        {/* <InvoiceNewEditStatusDate /> */}

        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          color="inherit"
          size="large"
          variant="outlined"
          loading={loadingSave.value && isSubmitting}
          onClick={handleSaveAsDraft}
        >
          Save as draft
        </LoadingButton>

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend.value && isSubmitting}
          onClick={handleCreateAndSend}
        >
          {currentInvoice ? 'Update' : 'Create'} & send
        </LoadingButton>
      </Stack>
    </Form>
  );
}
