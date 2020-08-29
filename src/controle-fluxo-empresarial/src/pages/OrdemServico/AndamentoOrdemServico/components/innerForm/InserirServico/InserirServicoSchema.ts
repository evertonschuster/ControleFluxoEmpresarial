import * as Yup from 'yup';
import { OrdemServicoServico } from './../../../../../../models/OrdemServicos/OrdemServicoItem';


export const InserirServicoSchema = Yup.object().shape<OrdemServicoServico>({
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
            return !!(this.parent as  OrdemServicoServico).funcionario;
        }),

    servicoId: Yup.number()
        .nullable()
        .typeError("Informe a quantidade")
        .required("Informe o serviço.")
        .test("servico-teste", "Serviço não encontrado", function () {
            return !!(this.parent as  OrdemServicoServico).servico;
        }),
})