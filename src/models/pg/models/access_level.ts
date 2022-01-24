import Logger from '~/src/utils/logger'
import { client } from '..'
import { isRowsExist } from '../utils/helpers'

export enum AppAccessLevel {
  guest = '1',
  user = '2',
  admin1 = '3',
  admin2 = '4',
  admin3 = '5',
  root = '6'
}

export async function createAccessLevelTable(): Promise<void | false> {
  const sql: string = `
    CREATE TABLE IF NOT EXISTS access_level (
      id text PRIMARY KEY,
      description text NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  try {
    await client.query(sql)
    Logger.generateTimeLog({ label: Logger.Labels.PG, message: 'createAccessLevelTable success.' })
  } catch (e: unknown) {
    Logger.generateTimeLog({ label: Logger.Labels.PG, message: `createAccessLevelTable error: ${(e as string).toString()}` })
    return false
  }
}

export async function defineAccessLevel(): Promise<void | false> {
  const sql: string = `
    INSERT INTO access_level(id, description)
    VALUES($1, $2)
    RETURNING *
  `

  const accessLevel: { id: string, description: string }[] = [
    { id: AppAccessLevel.guest, description: 'guest' },
    { id: AppAccessLevel.user, description: 'user' },
    { id: AppAccessLevel.admin1, description: 'admin_1' },
    { id: AppAccessLevel.admin2, description: 'admin_2' },
    { id: AppAccessLevel.admin3, description: 'admin_3' },
    { id: AppAccessLevel.root, description: 'root' }
  ]

  try {
    let res = []
    for await (let item of accessLevel) {
      const { id, description } = item
      const { rows } = await client.query(sql, [id, description])
      if (isRowsExist(rows) && rows) {
        res.push(rows[0])
      }
    }
    Logger.generateTimeLog({ label: Logger.Labels.PG, message: `defineAccessLevel success. ${res}` })
  } catch (e: unknown) {
    Logger.generateTimeLog({ label: Logger.Labels.PG, message: `defineAccessLevel error: ${(e as string).toString()}` })
    return false
  }
}

export async function dropAccessLevelTable(): Promise<void | false> {
  const sql: string = `
    DROP TABLE cmsUsers
  `

  try {
    await client.query(sql)
    Logger.generateTimeLog({ label: Logger.Labels.PG, message: 'dropAccessLevelTable success.' })
  } catch (e: unknown) {
    Logger.generateTimeLog({ label: Logger.Labels.PG, message: `dropAccessLevelTable error: ${(e as string).toString()}` })
    return false
  }
}
