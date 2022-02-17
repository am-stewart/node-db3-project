const db = require('../../data/db-config');

function find() {
  return db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.*')
    .count('st.step_id as number_of_steps')
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id')
}

async function findById(scheme_id) {
  const result = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.scheme_name', 'st.*')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number')

    const scheme = {
    scheme_id: result[0].scheme_id,
    scheme_name: result[0].scheme_name,
    steps: []
  };

  if(result[0].step_id === null) {
    return scheme
  }

  for(let step of result) {
    scheme.steps.push({
      step_id: step.step_id,
      step_number: step.step_number,
      instructions: step.instructions
    })
  }

  return scheme;
  
}

async function findSteps(scheme_id) { // EXERCISE C

  const result = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.scheme_name', 'st.step_id', 'st.step_number', 'st.instructions')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number')

    if(result[0].step_id === null) {
      return []
    }

  return result;
}

async function add(scheme) { // EXERCISE D
  const [scheme_id] = await db('schemes').insert(scheme);
    console.log(scheme_id)
    return findById(scheme_id)
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
