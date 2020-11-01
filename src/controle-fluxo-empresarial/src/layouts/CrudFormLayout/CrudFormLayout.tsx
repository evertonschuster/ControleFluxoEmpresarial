import React, { useRef } from 'react';
import { BreadcrumbProp } from '../BasicLayout/BasicLayout';
import { errorBack } from '../../utils/MessageApi';
import { Formik, FormikConfig, FormikHelpers, FormikProps } from 'formik';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import FormBasicLayout from '../FormBasicLayout/FormBasicLayout';
import FormikForm from './components/FormikForm';
import { useFormLocalStorage } from '../../services/CacheFormService';

export interface Props extends FormikConfig<any> {
    breadcrumbList?: BreadcrumbProp[];
    isLoading?: boolean;
    backPath: string;
    renderFooter?: (formik: FormikProps<any>) => React.ReactNode | null;
    renderActionFooter?: (formik: FormikProps<any>) => React.ReactNode | null;
    children?: ((props: FormikProps<any>) => React.ReactNode) | React.ReactNode;
}

const CrudFormBasicLayout: React.FC<Props & RouteComponentProps> = (props) => {

    const { removePathnameFormStorage } = useFormLocalStorage();
    const history = useHistory();

    async function onSubmit(values: any, formikHelpers: FormikHelpers<any>) {
        let pathname = history.location.pathname;

        try {
            await props.onSubmit(values, formikHelpers);
            removePathnameFormStorage(pathname);
        } catch (e) {
            errorBack(formikHelpers, e);
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
                    renderFooter={props.renderFooter}
                    renderActionFooter={props.renderActionFooter}
                    initialValues={props.initialValues}
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
