import toPromise from '../../lib/toPromise'
import isString from '../raw/isString'
import subset from '../raw/subset'
import skippable from '../core/skippable'

/**
 * Ensures the value of a given field is a subset of expected values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   include: 'subset:foo,bar,baz'
 * }
 *
 * // or
 * const rules = {
 *   include: [
 *     rule('subset', ['foo', 'bar', 'baz'])
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    let fieldValue = get(data, field)

    if (isString(fieldValue)) {
      fieldValue = fieldValue.split(',').map(val => val.trim())
    } else if (!Array.isArray(fieldValue)) {
      throw new TypeError('subset:field value must be a comma delimited string or an array')
    }

    if (!skippable(fieldValue) && !subset(fieldValue, args)) {
      return message
    }
  })
}
