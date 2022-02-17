const db = require('../../data/db-config')

const checkSchemeId = async (req, res, next) => {
  const scheme = await db('schemes').where('scheme_id', req.params.scheme_id).first()
  if(scheme) {
    next()
  } else {
    next({ status:404, message: `scheme with scheme_id ${req.params.scheme_id} not found`})
  }
}

const validateScheme = (req, res, next) => {
  if (typeof req.body.scheme_name !== 'string' || !req.body.scheme_name || !req.body.scheme_name.trim()) {
    res.status(400).json({ message: 'invalid scheme_name'})
  } else {
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body
  if (!instructions || !instructions.trim() || typeof instructions !== 'string' || typeof step_number !== 'number' || step_number < 1) {
    res.status(400).json({ message: 'invalid step'})
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
