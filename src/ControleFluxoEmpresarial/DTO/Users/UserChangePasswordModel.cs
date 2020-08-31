namespace ControleFluxoEmpresarial.DTO.Users
{
    public class UserChangePasswordModel
    {
        public string CurrentPassword { get; set; }

        public string NewPassword { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
