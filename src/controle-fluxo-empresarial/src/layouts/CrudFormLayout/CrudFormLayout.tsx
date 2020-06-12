import React, { useRef } from 'react';
import { Formik, FormikConfig, FormikHelpers, FormikProps, FormikContextType } from 'formik';
import FormBasicLayout from '../FormBasicLayout/FormBasicLayout';
import { BreadcrumbProp } from '../BasicLayout/BasicLayout';
import { errorBack } from '../../utils/MessageApi';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import FormikForm, { FormikFormRef } from './components/FormikForm';

export interface Props extends FormikConfig<any> {
    breadcrumbList?: BreadcrumbProp[];
    isLoading?: boolean;
    backPath: string;
    children?: ((props: FormikProps<any>) => React.ReactNode) | React.ReactNode;
}

const CrudFormBasicLayout: React.FC<Props & RouteComponentProps> = (props) => {

    const childRef = useRef<FormikFormRef>();

    async function onSubmit(values: any, formikHelpers: FormikHelpers<any>) {
        try {
            childRef.current?.removeSavedFormLocalStorageForm();
            await props.onSubmit(values, formikHelpers);
        } catch (e) {
            errorBack(formikHelpers, e)
            throw e;
        }
    }

    function onKeyDown(keyEvent: React.KeyboardEvent<HTMLFormElement>) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    return (
        <FormBasicLayout breadcrumbList={props.breadcrumbList} >
            <Formik
                {...props}
                onSubmit={onSubmit}
                enableReinitialize={true}  >
                <FormikForm
                    ref={childRef}
                    backPath={props.backPath}
                    isLoading={props.isLoading}
                    children={props.children}
                    onKeyDown={onKeyDown}
                />
            </Formik>
        </FormBasicLayout >
    );

}

export default withRouter(CrudFormBasicLayout);
