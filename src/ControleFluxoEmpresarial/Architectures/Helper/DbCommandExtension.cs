using ControleFluxoEmpresarial.Architectures.Exceptions;
using ControleFluxoEmpresarial.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ControleFluxoEmpresarial.Architectures.Helper
{
    public static class DbCommandExtension
    {

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

        public static void AddParameterValues(this DbCommand command, object @params)
        {
            if (@params == null || command == null)
            {
                return;
            }

            var properties = @params.GetType().GetProperties();

            foreach (var property in properties)
            {
                if (property.GetValue(@params) == null || property.GetValue(@params) is IBaseEntity)
                {
                    continue;
                }
                DbParameter dbParameter = command.CreateParameter();
                dbParameter.ParameterName = property.Name;
                dbParameter.Value = property.GetValue(@params);
                command.Parameters.Add(dbParameter);
            }
        }

        public static bool HasColumn(this IDataRecord r, string columnName)
        {
            try
            {
                return r.GetOrdinal(columnName) >= 0;
            }
            catch (IndexOutOfRangeException)
            {
                return false;
            }
        }

        public static List<PropertyInfo> PropertyIBaseEntity(this Type type)
        {
            var properties = type.GetProperties();

            return properties.Where(e => typeof(IBaseEntity<Object>).IsAssignableFrom(e.PropertyType)).ToList();
        }

        public static List<string> Property(this Type type, string idProperty = "Id")
        {
            var properties = type.GetProperties();

            return properties.Where(e => e.Name.ToLower() != idProperty.ToLower() &&
            (
                e.PropertyType.IsPrimitive ||
                e.PropertyType == typeof(string) ||
                e.PropertyType == typeof(decimal) ||
                e.PropertyType == typeof(float) ||
                e.PropertyType == typeof(double) ||
                e.PropertyType == typeof(DateTime) ||
                e.PropertyType == typeof(DateTimeOffset)
            )).Select(e => e.Name).ToList();
        }

        public static TEntity MapEntity<TEntity>(this DbDataReader reader, List<string> properties, string idProperty = "id", string prefixProperty = "") where TEntity : IBaseEntity<Object>, new()
        {
            var entity = new TEntity();
            return reader.MapEntity(entity, properties, idProperty, prefixProperty);
        }

        public static TEntity MapEntity<TEntity>(this DbDataReader reader, TEntity entity, List<string> properties, string idProperty = "id", string prefixProperty = "") where TEntity : IBaseEntity<Object>
        {
            if (reader.HasColumn(prefixProperty + idProperty))
            {
                entity.Id = reader.GetInt32(prefixProperty + idProperty);
            }
            foreach (var propertyName in properties)
            {
                var propertyNameWithPrefix = prefixProperty + propertyName;
                if (!reader.HasColumn(propertyNameWithPrefix))
                {
                    continue;
                }

                var property = entity.GetType().GetProperty(propertyName);
                if (property.PropertyType == typeof(int))
                {
                    property.SetValue(entity, reader.GetInt32(propertyNameWithPrefix));
                }if (property.PropertyType == typeof(bool))
                {
                    property.SetValue(entity, reader.GetBoolean(propertyNameWithPrefix));
                }
                else if (property.PropertyType == typeof(decimal))
                {
                    property.SetValue(entity, reader.GetDecimal(propertyNameWithPrefix));
                }
                else if (property.PropertyType == typeof(double))
                {
                    property.SetValue(entity, reader.GetDouble(propertyNameWithPrefix));
                }
                else if (property.PropertyType == typeof(string))
                {
                    property.SetValue(entity, reader.GetString(propertyNameWithPrefix));
                }
                else if (property.PropertyType == typeof(DateTime))
                {
                    property.SetValue(entity, reader.GetDateTime(propertyNameWithPrefix));
                }else if (property.PropertyType == typeof(DateTimeOffset))
                {
                    property.SetValue(entity, reader.GetDateTime(propertyNameWithPrefix));
                }
                else
                {
                    throw new BusinessException("Deu Muito RUIM");
                }
            }


            return entity;
        }
    }
}
