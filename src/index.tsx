import * as React from 'react'
import styles from './styles.module.css'
import * as _ from 'lodash'

export interface Options {
  renderNulls?: boolean
  renderImages?: boolean
  renderLinks?: boolean
  renderHTML?: boolean
  humanizeKeys?: boolean
  filterKeys?: string[]
}

interface Props {
  data: any
  options?: Options
}

export const JSONUI = ({ data, options = {} }: Props) => {
  return render([], data, options)
}

export const listKeys = (data: any, prefix = '') => {
  const keys = new Set<string>()
  if (Array.isArray(data)) {
    data.forEach((item) => {
      listKeys(item, prefix).forEach((key) => keys.add(key))
    })
  } else if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      key = prefix !== '' ? `${prefix}.${key}` : key
      keys.add(key)
      listKeys(value, key).forEach((key) => keys.add(key))
    })
  }
  return Array.from(keys).sort()
}

const render = (position: string[], data: any, options: Options) => {
  if (data === null) {
    return renderNull(position, options)
  }

  if (Array.isArray(data)) {
    if (data.length > 10) {
      return (
        <details>
          <summary>{data.length} items</summary>
          {renderArray(position, data, options)}
        </details>
      )
    }

    return renderArray(position, data, options)
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data)
    if (entries.length === 0) {
      return renderNull(position, options)
    }

    const renderedEntries = entries
      .map((entry) =>
        renderEntry([...position, entry[0]], entry[0], entry[1], options),
      )
      .filter((renderedEntry) => renderedEntry !== null)

    if (renderedEntries.length === 0) {
      return renderNull(position, options)
    }

    return (
      <table className={styles.entries}>
        <tbody>{renderedEntries}</tbody>
      </table>
    )
  }

  if (typeof data === 'string') {
    return renderString(position, data, options)
  }

  if (typeof data === 'boolean') {
    return renderBoolean(position, data, options)
  }

  return <span>{data}</span>
}

const renderEntry = (
  position: string[],
  key: string,
  value: any,
  options: Options,
) => {
  if ((options?.filterKeys || []).includes(position.join('.'))) {
    return null
  }

  value = render(position, value, options)
  if (value === null) {
    return renderNull(position, options)
  }

  return (
    <tr className={styles.entry}>
      <td className={styles.entryKey} title={position.join('.')}>
        {options?.humanizeKeys ? (_.startCase(key) as string) : key}
      </td>
      <td className={styles.entryValue}>{value}</td>
    </tr>
  )
}

const renderArray = (position: string[], data: any[], options: Options) => {
  if (data.length === 0) {
    return renderNull(position, options)
  }

  if (
    data.every(
      (item) =>
        typeof item === 'string' &&
        (!options?.renderImages || !isImage(position, item)),
    )
  ) {
    if (position[position.length - 1].match(/tags/i)) {
      return (
        <ul className={styles.tags}>
          {data.map((item) => (
            <li className={styles.tag}>
              {renderString(position, item, options)}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <ul className={styles.list}>
        {data.map((item) => (
          <li>{renderString(position, item, options)}</li>
        ))}
      </ul>
    )
  }

  if (data.every((item) => typeof item === 'number')) {
    return (
      <ul className={styles.list}>
        {data.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    )
  }

  return (
    <div className={styles.items}>
      {data.map((item) => render(position, item, options))}
    </div>
  )
}

const renderNull = (_: string[], options: Options) =>
  options?.renderNulls ? <span>∅</span> : null

const renderBoolean = (_: string[], bool: boolean, __: Options) => (
  <input type='checkbox' checked={bool} readOnly={true} />
)

const renderString = (position: string[], str: string, options: Options) => {
  if (str.trim() === '') {
    return renderNull(position, options)
  }

  if (options?.renderImages && isImage(position, str)) {
    return <img className={styles.image} src={str} loading='lazy' />
  }

  if (options?.renderLinks && str.match(/^https?:\/\//)) {
    return <a href={str}>{str}</a>
  }

  return options?.renderHTML ? (
    <span dangerouslySetInnerHTML={{ __html: str }} />
  ) : (
    <span>{str}</span>
  )
}

const isImage = (position: string[], str: string) =>
  str.match(/\.(jpe?g|png)$/) ||
  (str.match(/^https?:\/\//) &&
    position[position.length - 1].match(/image|avatar/i))
