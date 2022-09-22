import { NamingStrategyInterface, DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

/**
 * SnakeNamingStrategy
 * @export
 * @class SnakeNamingStrategy
 * @extends {DefaultNamingStrategy}
 * @implements {NamingStrategyInterface}
 */
export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  /**
   * tableName
   * @param {string} className
   * @param {string} customName
   * @return {string}
   * @memberof SnakeNamingStrategy
   */
  public tableName(className: string, customName: string): string {
    return customName ? customName : snakeCase(className);
  }

  /**
   * columnName
   * @param {string} propertyName
   * @param {string} customName
   * @param {string[]} embeddedPrefixes
   * @return {string}
   * @memberof SnakeNamingStrategy
   */
  public columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.join('_')) + (customName ? customName : snakeCase(propertyName));
  }

  /**
   * relationName
   * @param {string} propertyName
   * @return {string}
   * @memberof SnakeNamingStrategy
   */
  public relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  /**
   * joinColumnName
   * @param {string} relationName
   * @param {string} referencedColumnName
   * @return {string}
   * @memberof SnakeNamingStrategy
   */
  public joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(relationName + '_' + referencedColumnName);
  }

  /**
   * joinTableName
   * @param {string} firstTableName
   * @param {string} secondTableName
   * @param {string} firstPropertyName
   * @param {string} _secondPropertyName
   * @return {string}
   * @memberof SnakeNamingStrategy
   */
  public joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    _secondPropertyName: string,
  ): string {
    return snakeCase(firstTableName + '_' + firstPropertyName.replace(/\./gi, '_') + '_' + secondTableName);
  }

  /**
   * joinTableColumnName
   * @param {string} tableName
   * @param {string} propertyName
   * @param {string} [columnName]
   * @return {string}
   * @memberof SnakeNamingStrategy
   */
  public joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(tableName + '_' + (columnName ? columnName : propertyName));
  }

  /**
   * classTableInheritanceParentColumnName
   * @param {string} parentTableName
   * @param {string} parentTableIdPropertyName
   * @return {string}
   * @memberof SnakeNamingStrategy
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public classTableInheritanceParentColumnName(parentTableName: any, parentTableIdPropertyName: any): string {
    return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
  }
}
