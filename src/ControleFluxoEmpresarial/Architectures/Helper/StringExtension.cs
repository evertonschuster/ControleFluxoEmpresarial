using System.ComponentModel;

namespace ControleFluxoEmpresarial.Architectures.Helper
{
    public static class StringExtension
    {

        public static TId ConvertValue<TId>(this string? value)
        {
            TypeConverter converter = TypeDescriptor.GetConverter(typeof(TId));

            try
            {
                return (TId)converter.ConvertFrom(value);
            }
            catch
            {
            }
            return default;
        }

    }
}
