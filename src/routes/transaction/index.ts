import express, { Router } from 'express'
import { Transaction } from '~/src/models/pg'
import DateCustomized from '~/src/utils/date'
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
    HttpRes.send500(res)
    return
  }
})

router.get('/', async (req, res) => {
  try {
    HttpRes.send200(res)
    return
  } catch (e: unknown) {
    HttpRes.send500(res)
    return
  }
})

export default router