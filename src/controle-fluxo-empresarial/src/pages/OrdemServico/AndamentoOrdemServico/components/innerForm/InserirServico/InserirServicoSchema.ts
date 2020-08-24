import * as Yup from 'yup';
import OrdemServicoItem from '../../../../../../models/OrdemServicos/OrdemServicoItem';


export const InserirServicoSchema = Yup.object().shape<OrdemServicoItem>({
    quantidade: Yup.number()
        .nullable()
        .typeError("Informe a quantidade")
        .min(1, "Quantidade inválida")
        .required("Informe a quantidade."),

    funcionarioId: Yup.number()
        .nullable()
        .typeError("Informe a quantidade")
        .required("Informe o funcionário.")
        .test("funcionario-teste", "Funcionário não encontrado", function () {
            return !!(this.parent as  OrdemServicoItem).funcionario;
        }),

    servicoId: Yup.number()
        .nullable()
        .typeError("Informe a quantidade")
        .required("Informe o serviço.")
        .test("servico-teste", "Serviço não encontrado", function () {
            return !!(this.parent as  OrdemServicoItem).servico;
        }),
})