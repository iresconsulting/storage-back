import init from '..'

import { createWalletTable, dropWalletTable } from '../models/wallet'
import { createTransactionTable, dropTransactionTable } from '../models/transaction'
import { createAdminWhitelistTable, dropAdminWhitelistTable } from '../models/admin_whitelist'
import { createMemberTable, dropMemberTable } from '../models/member'
import { createAccessLevelTable, defineAccessLevel } from '../models/access_level'

import Member from '../controllers/member'

// import configController from '~/src/models/mongo/controllers/config'
// import settingController from '~/src/models/mongo/controllers/setting'
// import systemController from '~/src/models/mongo/controllers/system'
// import initMongo from '~/src/models/mongo'

// await initMongo()
// const { _doc: config } = await configController.createConfig()
// console.log('CONFIG_ID:', config._id)
// const { _doc: setting } = await settingController.createSetting()
// console.log('SETTING_ID:', setting._id)
// const { _doc: system } = await systemController.createSystem()
// console.log('SYSTEM_ID:', system._id)

await init()

await createAccessLevelTable()
await defineAccessLevel()

// await dropAdminWhitelistTable()
// await dropTransactionTable()
// await dropWalletTable()
// await dropMemberTable()

await createAdminWhitelistTable()
await createMemberTable()
await createWalletTable()
await createTransactionTable()

await Member.create('', '', 'local', '6', 'root1', 'root1')
await Member.create('', '', 'local', '5', 'admin1', 'admin1')

process.exit(0)
