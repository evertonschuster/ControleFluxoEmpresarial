using ControleFluxoEmpresarial.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures.Helper
{
    public static class PropertyExtension
    {

        public static List<PropertyInfo> PropertyIBaseEntity<TId>(this Type type)
        {
            var properties = type.GetProperties();

            return properties.Where(e => typeof(IBaseEntity<TId>).IsAssignableFrom(e.PropertyType)).ToList();
        }

        public static List<string> Property(this Type type, string idProperty = "Id")
        {
            var properties = type.GetProperties();

            return properties.Where(e => e.Name.ToLower() != idProperty.ToLower() &&
            (
                e.PropertyType.IsPrimitive ||
                e.PropertyType.IsEnum ||
                Nullable.GetUnderlyingType(e.PropertyType)?.IsEnum == true||
                e.PropertyType == typeof(string) ||
                e.PropertyType == typeof(decimal) ||
                e.PropertyType == typeof(float) ||
                e.PropertyType == typeof(double) ||
                e.PropertyType == typeof(DateTime) ||
                e.PropertyType == typeof(DateTimeOffset)
            )).Select(e => e.Name).ToList();
        }

        public static string FormatProperty(this IEnumerable<string> properties, Func<string, string> func = null)
        {
            var str = "";
            var propertiesList = properties.ToList();
            for (int i = 0; i < propertiesList.Count; i++)
            {
                var property = propertiesList[i];
                if (func != null)
                {
                    str += func(property);
                }
                else
                {
                    str += property;
                }

                if (i < propertiesList.Count - 1)
                {
                    str += ", ";
                }
            }

            return str;
        }
    }
}
