import express, { Router } from 'express'
import { Transaction } from '~/src/models/pg'
import DateCustomized from '~/src/utils/date'
import authMiddleware from '../middleware/auth'
import { HttpRes } from '../utils/http'

const router: Router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    const { info } = req.query
    const _info = Boolean(info?.toString())
    const _startDate = startDate?.toString() || ''
    const _endDate = endDate?.toString() || ''
    if (!DateCustomized.isValid(_startDate) || !DateCustomized.isValid(_endDate)) {
      HttpRes.send400(res, 'input invalid')
      return
    }
    if (!DateCustomized.isValidRange({ startDate: _startDate, endDate: _endDate })) {
      HttpRes.send400(res, 'input invalid')
      return
    }    
    const _queryPayload = { startDateIso: _startDate, endDateIso: _endDate }
    let _rows = []
    if (_info) {
      _rows = await Transaction.getWithUserInfoInDateRange(_queryPayload)
    } else {
      _rows = await Transaction.getInDateRange(_queryPayload)
    }
    HttpRes.send200(res, 'success', { data: _rows })
    return
  } catch (e: unknown) {
    console.log('e', String(e));
    
    HttpRes.send500(res)
    return
  }
})

router.post('/', async (req, res) => {
  try {
    const { member_id, amount, direction, wallet_id } = req.body
    const _rows = await Transaction.create(
      member_id,
      Number(amount),
      direction,
      'system_payable_admin_to_artist',
      'system_payable_admin_to_artist',
      'system_payable_admin_to_artist',
      wallet_id
    )
    if (_rows) {
      HttpRes.send200(res, 'success', { data: _rows })
      return
    }
    HttpRes.send500(res)
    return
  } catch (e: unknown) {
    HttpRes.send500(res)
    return
  }
})

export default router
