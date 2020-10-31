import { useField } from 'formik'
import React from 'react'
import { situationFilter } from '../ListFilterAdvanced'
import SelectionGenerics from './SelectionGenerics'

const SelectionGenericsFormik: React.FC = () => {

    const [{ value: situacao, }, , { setValue: setSituacao }] = useField<situationFilter[]>("situacao")

    return (
        <SelectionGenerics situacao={situacao} setSituacao={setSituacao} />
    )
}

export default SelectionGenericsFormik
