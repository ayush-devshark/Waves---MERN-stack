import React, { useEffect, useState } from 'react';
import PickUpload from './upload';
import PickViewer from './picViewer';
import DashboardLayout from 'hoc/DashboardLayout';

import { useFormik } from 'formik';
import { errorHelper } from 'utils/tools';
import Loader from 'utils/loader';
import { validation, formValues, getValuesToEdit } from './formValues';

import { useSelector, useDispatch } from 'react-redux';
import { getAllBrands } from 'store/actions/brands.actions';
import { editProduct, productById } from 'store/actions/products.actions';
import { clearCurrentProduct } from 'store/actions';

import {
    TextField,
    Button,
    Divider,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
} from '@material-ui/core';

const EditProduct = props => {
    const [values, setValues] = useState(formValues);
    const [loading, setLoading] = useState(false);
    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notifications);
    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: validation,
        onSubmit: values => {
            handleSubmit(values);
        },
    });

    const handleSubmit = values => {
        setLoading(true);
        dispatch(editProduct(values, props.match.params.id));
    };

    const handlePicValue = pic => {
        const picArray = formik.values.images;
        picArray.push(pic.url);
        formik.setFieldValue('images', picArray);
    };

    const deletePic = idx => {
        const picArray = formik.values.images;
        picArray.splice(idx, 1);
        formik.setFieldValue('images', picArray);
    };

    useEffect(() => {
        if (notifications) {
            setLoading(false);
        }
    }, [notifications]);

    useEffect(() => {
        const params = props.match.params.id;
        dispatch(getAllBrands());
        if (params) {
            dispatch(productById(params));
        }
    }, [dispatch, props.match.params.id]);

    useEffect(() => {
        if (products && products.byId) {
            setValues(getValuesToEdit(products.byId));
        }
    }, [products]);

    useEffect(() => {
        return () => {
            dispatch(clearCurrentProduct());
        };
    }, [dispatch]);

    return (
        <DashboardLayout title='Add product'>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <PickViewer
                        formik={formik}
                        deletePic={idx => deletePic(idx)}
                    />
                    <PickUpload
                        picValue={pic => {
                            handlePicValue(pic);
                        }}
                    />
                    <Divider className='mt-3 mb-3' />
                    <form
                        className='mt-3 article_form'
                        onSubmit={formik.handleSubmit}
                    >
                        <div className='form-group'>
                            <TextField
                                style={{ width: '100%' }}
                                name='model'
                                label='Enter a model'
                                variant='outlined'
                                {...formik.getFieldProps('model')}
                                {...errorHelper(formik, 'model')}
                            />
                        </div>

                        <div className='form-group'>
                            <TextField
                                style={{ width: '100%' }}
                                name='frets'
                                label='Enter amount of frets'
                                variant='outlined'
                                type='number'
                                {...formik.getFieldProps('frets')}
                                {...errorHelper(formik, 'frets')}
                            />
                        </div>

                        <div className='form-group'>
                            <TextField
                                style={{ width: '100%' }}
                                name='woodtype'
                                label='Enter the woodtype'
                                variant='outlined'
                                {...formik.getFieldProps('woodtype')}
                                {...errorHelper(formik, 'woodtype')}
                            />
                        </div>

                        <div className='form-group'>
                            <FormControl variant='outlined'>
                                <h5>Select a brand</h5>
                                <Select
                                    name='brand'
                                    {...formik.getFieldProps('brand')}
                                    error={
                                        formik.errors.brand &&
                                        formik.touched.brand
                                            ? true
                                            : false
                                    }
                                >
                                    <MenuItem value=''>
                                        <em>None</em>
                                    </MenuItem>
                                    {brands && brands.all
                                        ? brands.all.map(item => (
                                              <MenuItem
                                                  key={item._id}
                                                  value={item._id}
                                              >
                                                  {item.name}
                                              </MenuItem>
                                          ))
                                        : null}
                                </Select>
                                {formik.errors.brand && formik.touched.brand ? (
                                    <FormHelperText error={true}>
                                        {formik.errors.brand}
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                        </div>

                        <div className='form-group'>
                            <TextField
                                style={{ width: '100%' }}
                                name='description'
                                label='Enter the description'
                                variant='outlined'
                                {...formik.getFieldProps('description')}
                                {...errorHelper(formik, 'description')}
                                multiline
                                rows={4}
                            />
                        </div>

                        <div className='form-group mt-3'>
                            <TextField
                                style={{ width: '100%' }}
                                name='price'
                                label='Enter the price'
                                variant='outlined'
                                type='number'
                                {...formik.getFieldProps('price')}
                                {...errorHelper(formik, 'price')}
                            />
                        </div>

                        <Divider className='mt-3 mb-3' />

                        <div className='form-group'>
                            <TextField
                                style={{ width: '100%' }}
                                name='available'
                                label='How many of this do we have in storage ?'
                                variant='outlined'
                                type='number'
                                {...formik.getFieldProps('available')}
                                {...errorHelper(formik, 'available')}
                            />
                        </div>

                        <Divider className='mt-3 mb-3' />

                        <div className='form-group'>
                            <FormControl variant='outlined'>
                                <h5>Do we offer free shipping ?</h5>
                                <Select
                                    name='shipping'
                                    {...formik.getFieldProps('shipping')}
                                    error={
                                        formik.errors.shipping &&
                                        formik.touched.shipping
                                            ? true
                                            : false
                                    }
                                >
                                    <MenuItem value={true}>
                                        <em>Yes</em>
                                    </MenuItem>
                                    <MenuItem value={false}>
                                        <em>No</em>
                                    </MenuItem>
                                </Select>
                                {formik.errors.shipping &&
                                formik.touched.shipping ? (
                                    <FormHelperText error={true}>
                                        {formik.errors.shipping}
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                        </div>

                        <Divider />
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            className='mt-3'
                        >
                            Edit product
                        </Button>
                    </form>
                </>
            )}
        </DashboardLayout>
    );
};

export default EditProduct;
