import init from '..'

import { createMemberTable, dropMemberTable } from '../models/member'
import { createUserRoleTable, dropUserRoleTable } from '../models/user_role'
import { createSystemConfigTable, dropSystemConfigTable } from '../models/system_config'
import { createRecordTable, dropRecordTable } from '../models/record'

init().then(async () => {
  // drop
  await dropMemberTable()
  await dropUserRoleTable()
  await dropSystemConfigTable()
  await dropRecordTable()

  // create
  await Promise.all([
    createMemberTable(),
    createUserRoleTable(),
    createSystemConfigTable(),
    createRecordTable()
  ])
})

process.exit(0)
