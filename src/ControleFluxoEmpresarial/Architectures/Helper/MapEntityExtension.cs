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
    public static class MapEntityExtension
    {

        public static TEntity MapEntity<TEntity, TId>(this DbDataReader reader, List<string> properties, string idProperty = "id", string prefixProperty = "") where TEntity : class, IBaseEntity<TId>, new()
        {
            var entity = new TEntity();
            return reader.MapEntity<TEntity, TId>(entity, properties, idProperty, prefixProperty);
        }
        public static TEntity MapEntity<TEntity, TId>(this DbDataReader reader, TEntity entity, List<string> properties, string idProperty = "id", string prefixProperty = "") where TEntity : class, IBaseEntity<TId>
        {
            return reader.MapEntity(entity, properties, idProperty, prefixProperty) as TEntity;
        }

        public static Object MapEntity(this DbDataReader reader, Object entity, List<string> properties, string idProperty = "id", string prefixProperty = "")
        {
            var propertiesWithId = new List<string>(properties)
            {
                idProperty
            };

            foreach (var propertyName in propertiesWithId)
            {
                var propertyNameWithPrefix = prefixProperty + propertyName;
                if (!reader.HasColumn(propertyNameWithPrefix))
                {
                    continue;
                }

                var property = entity.GetType().GetProperty(propertyName);
                if (reader.GetValue(propertyNameWithPrefix) == DBNull.Value)
                {

                }
                else if (property.PropertyType.IsEnum)
                {
                    var value = Enum.Parse(property.PropertyType, reader.GetValue(propertyNameWithPrefix).ToString(), true);
                    property.SetValue(entity, value);
                }
                else if (Nullable.GetUnderlyingType(property.PropertyType)?.IsEnum == true)
                {
                    var value = Enum.Parse(Nullable.GetUnderlyingType(property.PropertyType), reader.GetValue(propertyNameWithPrefix).ToString(), true);
                    property.SetValue(entity, value);
                }
                else
                {
                    var value = Convert.ChangeType(reader.GetValue(propertyNameWithPrefix), property.PropertyType);
                    property.SetValue(entity, value);
                }
            }

            return entity;
        }


    }
}
