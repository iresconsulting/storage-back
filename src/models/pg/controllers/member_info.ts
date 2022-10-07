import { client } from '..'
import { querySuccessHandler } from './utils'
import Logger from '~/src/utils/logger'

namespace MemberInfo {
  export async function create({
    name = '',
    birthday = '',
    origin = '',
    member_id,
    about = ''
  }: {
    name: string,
    birthday: string,
    origin: string,
    member_id: string,
    about: string
  }): Promise<Array<any> | false> {
    const sql = `
      INSERT INTO member_info(name, birthday, origin, about, member_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `

    try {
      const { rows } = await client.query(sql, [
        name,
        birthday,
        origin,
        about,
        member_id
      ])
      return querySuccessHandler(rows)
    } catch (e: unknown) {
      Logger.generateTimeLog({ label: Logger.Labels.PG, message: `create Error ${(e as string).toString()}` })
      return false
    }
  }

  export async function update({
    name = '',
    birthday = '',
    origin = '',
    member_id,
    about = ''
  }: {
    name: string,
    birthday: string,
    origin: string,
    member_id: string,
    about: string
  }): Promise<Array<any> | false> {
    const sql = `
      UPDATE member_info
      SET name = $1, birthday = $2, origin = $3, about = $4
      WHERE member_id = $5
      RETURNING *
    `

    try {
      const { rows } = await client.query(sql, [
        name,
        birthday,
        origin,
        about,
        member_id
      ])
      return querySuccessHandler(rows)
    } catch (e: unknown) {
      Logger.generateTimeLog({ label: Logger.Labels.PG, message: `update Error ${(e as string).toString()}` })
      return false
    }
  }

  export async function updateAvatar({
    avatar,
    member_id,
  }: {
    avatar: string,
    member_id: string,
  }): Promise<Array<any> | false> {
    const sql = `
      UPDATE member_info
      SET avatar = $1
      WHERE member_id = $2
      RETURNING *
    `

    try {
      const { rows } = await client.query(sql, [
        avatar,
        member_id
      ])
      return querySuccessHandler(rows)
    } catch (e: unknown) {
      Logger.generateTimeLog({ label: Logger.Labels.PG, message: `updateAvatar Error ${(e as string).toString()}` })
      return false
    }
  }

  export async function updateCategory({
    category,
    member_id,
  }: {
    category: string,
    member_id: string,
  }): Promise<Array<any> | false> {
    const sql = `
      UPDATE member_info
      SET category = $1
      WHERE member_id = $2
      RETURNING *
    `

    try {
      const { rows } = await client.query(sql, [
        category,
        member_id
      ])
      return querySuccessHandler(rows)
    } catch (e: unknown) {
      Logger.generateTimeLog({ label: Logger.Labels.PG, message: `updateAvatar Error ${(e as string).toString()}` })
      return false
    }
  }

  // TODO pagination logic
  export async function getAllPagination(member_id: string): Promise<Array<any> | false> {
    const sql = `
      SELECT *
      FROM member_info
      WHERE member_id = $1
    `

    try {
      const { rows } = await client.query(sql, [member_id])
      return querySuccessHandler(rows)
    } catch (e: unknown) {
      Logger.generateTimeLog({ label: Logger.Labels.PG, message: `getAllPagination Error ${(e as string).toString()}` })
      return false
    }
  }

  export async function getAll(): Promise<Array<any> | false> {
    const sql = `
      SELECT
        member_info.about as about,
        member.id as id,
        member.allowed_login_status as allowed_login_status,
        member_info.avatar as avatar,
        member_info.category as category,
        member.description as description,
        member.email as email,
        member_info.name as name,
        member_info.origin as origin,
        member_info.username as username
      FROM member_info
      LEFT JOIN member
      ON member_info.member_id = member.id
      ORDER BY name
      ASC
    `

    try {
      const { rows } = await client.query(sql)
      return querySuccessHandler(rows)
    } catch (e: unknown) {
      Logger.generateTimeLog({ label: Logger.Labels.PG, message: `getAll Error ${(e as string).toString()}` })
      return false
    }
  }

  export async function getById(id: string): Promise<Array<any> | false> {
    const sql = `
      SELECT *
      FROM member_info
      WHERE member_id = $1
    `

    try {
      const { rows } = await client.query(sql, [id])
      return querySuccessHandler(rows)
    } catch (e: unknown) {
      Logger.generateTimeLog({ label: Logger.Labels.PG, message: `getAll Error ${(e as string).toString()}` })
      return false
    }
  }
}

export default MemberInfo
