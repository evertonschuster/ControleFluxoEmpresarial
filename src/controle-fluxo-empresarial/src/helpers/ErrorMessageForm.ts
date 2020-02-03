import { notification } from "antd";

// This component renders an error message if a field has
// an error and it's already been touched.
export function ErrorMessage(props: any) {
    // All FormikProps available on props.formik!


    console.log("props", props)


    Object.keys(props).forEach(async function (key, index, a) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object 

        notification.error({
            message: props[key],
            duration: 10
        });
    });


};


