export default interface UserChangePasswordModel {
    currentPassword?: string | null;
    newPassword?: string | null;
    confirmPassword?: string | null;
}